// Striker Board: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/233.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(po){po&&po.add({num:233,name:"Striker Board",fam:"Worlds",recipe:"A worn carrom board under a single hanging bulb, where the flat wooden coins and the heavy striker really slide, spin, crash and drop into the pockets. A patient opponent takes turns with you. The wood, the coins and the state of the game change every mint. Press where you want to hit, drag back and let go to flick the striker, or tap the board to slide it along your line.",interactive:"Press where you want to strike, drag back and let go to flick the striker through that spot; tap the board to slide it along your line.",music:!0,gl:!0,fps:30,seed:0,make(g){const e=g.gl,O=g.size;let pe=2166136261;for(let t=2;t<g.hash.length;t++)pe=Math.imul(pe^g.hash.charCodeAt(t),16777619)>>>0;const w=()=>{pe=pe+1831565813|0;let t=Math.imul(pe^pe>>>15,1|pe);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ue=(t,o,a)=>{let n=w(),r=0;if(g.home&&a)return g.trait(t,a),a;for(const c of o)r+=c[1];n*=r;for(const c of o)if(n-=c[1],n<=0)return g.trait(t,c[0]),c[0];const i=o[o.length-1][0];return g.trait(t,i),i},G=()=>(w()+w()+w()+w()-2)*.87,bo=ue("Board",[["Birch",48],["Teak",24],["Satinwood",20],["Rosewood inlay",8]],"Birch"),yo=ue("Coins",[["Boxwood and ebony",48],["Bone and rosewood",26],["Lacquered",20],["Odd set",6]],"Boxwood and ebony"),Ft=ue("Striker",[["Ivory white",50],["Turned wood",28],["Grey stone",15],["Old bakelite",7]],"Ivory white"),St=ue("Powder",[["Light dusting",48],["Heavy",30],["Fresh drift",16],["Damp",6]],"Light dusting"),Ve=ue("Lamp",[["Bare bulb",46],["Enamel shade",28],["Tin cone",20],["Low and swinging",6]],"Bare bulb"),it=ue("View",[["Striker's eye",48],["Leaning in",30],["Across the corner",22]],"Striker's eye"),Ae=ue("Game",[["Fresh rack",46],["Mid game",36],["Endgame",18]],"Fresh rack"),Ho=ue("Wear",[["Played",50],["Well loved",34],["Ancient",16]],"Well loved");let be=2654435769;for(let t=2;t<g.hash.length;t++)be=Math.imul(be^g.hash.charCodeAt(t),2246822507)>>>0;const S=()=>{be=be+1831565813|0;let t=Math.imul(be^be>>>15,1|be);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Oo=(()=>{const t=S(),o=g.home||t<.44?"Limewash":t<.68?"Green distemper":t<.88?"Ochre":"Indigo wash";return g.trait("Wall",o),o})(),J=g.home||S()<.5?1:-1;let ye=625341585;for(let t=2;t<g.hash.length;t++)ye=Math.imul(ye^g.hash.charCodeAt(t),668265263)>>>0;const Dt=()=>{ye=ye+1831565813|0;let t=Math.imul(ye^ye>>>15,1|ye);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Go=g.home?0:(Dt()-.5)*9,Ko=g.home?0:(Dt()-.5)*2.4,Qo=g.home||Dt()<.5,I=37,go=2.25,ge=34.75,j=25.26,A=23.2,ct=981,st=1.59,Yo=.8,_t={"Ivory white":[2.06,.72,15],"Turned wood":[2.1,.78,11],"Grey stone":[2,.7,22],"Old bakelite":[2.06,.74,16]}[Ft],wo={"Light dusting":.15,Heavy:.125,"Fresh drift":.105,Damp:.21}[St],jo={"Light dusting":1.15,Heavy:1.8,"Fresh drift":1.5,Damp:1.3}[St],Ut={Played:.45,"Well loved":.72,Ancient:1}[Ho],To=.86,lt=.62,Wo=.1,ft=.16,b=20,s=19,dt=18,d=new Float64Array(b),m=new Float64Array(b),D=new Float64Array(b),_=new Float64Array(b),N=new Float64Array(b),ut=new Float64Array(b),ee=new Float64Array(b),Nt=new Float64Array(b),mt=new Float64Array(b),ht=new Float64Array(b),y=new Int8Array(b),W=new Int8Array(b),q=new Float64Array(b),te=new Float64Array(b),qt=new Float64Array(b),vt=new Float64Array(b);for(let t=0;t<b;t++)W[t]=t<9?0:t<18?1:t===dt?2:3,q[t]=t===s?_t[0]:st,qt[t]=t===s?_t[1]:Yo*(.96+.08*w()),te[t]=t===s?_t[2]:5.5,vt[t]=w(),ut[t]=w()*6.283;yo==="Odd set"&&(W[2+(w()*6|0)]=4,W[10+(w()*6|0)]=5);const He=[];{for(let t=0;t<5;t++){const o=t*1.2566+.3;He.push(Math.cos(o)*.45,Math.sin(o)*.45)}for(let t=0;t<9;t++){const o=t*.6981;He.push(Math.cos(o)*.85,Math.sin(o)*.85)}}const xt=He.length/2,Bt=t=>{const o=(r,i,c)=>{d[r]=i+G()*.015,m[r]=c+G()*.015,D[r]=_[r]=N[r]=0,ee[r]=0,y[r]=0};o(dt,0,0);let a=0,n=9;for(let r=0;r<6;r++){const i=t+r*Math.PI/3,c=2*st+.01;r%2===0?o(a++,Math.cos(i)*c,Math.sin(i)*c):o(n++,Math.cos(i)*c,Math.sin(i)*c)}for(let r=0;r<6;r++){const i=t+r*Math.PI/3,c=4*st+.02;r%2===1?o(a++,Math.cos(i)*c,Math.sin(i)*c):o(n++,Math.cos(i)*c,Math.sin(i)*c)}for(let r=0;r<6;r++){const i=t+r*Math.PI/3+Math.PI/6,c=2*Math.sqrt(3)*st+.02;r%2===0?o(a++,Math.cos(i)*c,Math.sin(i)*c):o(n++,Math.cos(i)*c,Math.sin(i)*c)}};let Pe=0,ke=0,Fe=0,Eo=0;const Se=[],Oe=(t,o,a,n,r,i)=>{const c=q[t],f=1/te[t],u=2/(te[t]*c*c),h=-n,l=a;let x=-(D[t]+N[t]*c*h),p=-(_[t]+N[t]*c*l),v=0,F=0,E=0;o>=0&&(E=q[o],v=1/te[o],F=2/(te[o]*E*E),x+=D[o]-N[o]*E*h,p+=_[o]-N[o]*E*l);const L=x*a+p*n;if(L>=0)return 0;const P=-(1+r)*L/(f+v),Q=x*h+p*l,oe=f+v+c*c*u+E*E*F;let C=-Q/oe;const Y=i*P;C>Y?C=Y:C<-Y&&(C=-Y);const ae=P*a+C*h,de=P*n+C*l;return D[t]-=ae*f,_[t]-=de*f,N[t]-=C*c*u,o>=0&&(D[o]+=ae*v,_[o]+=de*v,N[o]-=C*E*F),P},Ro=-2.6,Ct=t=>{if(y[t]=2,t===s){ee[t]=-100;return}let o=0;for(let r=0;r<19;r++)r!==t&&y[r]===2&&Math.abs(d[r]-mt[t])<2&&Math.abs(m[r]-ht[t])<2&&o++;const a=vt[t]*6.283,n=.45*Math.min(1,o*.5);d[t]=mt[t]+Math.cos(a)*n,m[t]=ht[t]+Math.sin(a)*n,ee[t]=Ro+o*qt[t]*.9},Mo=t=>{const o=wo*ct;for(let a=0;a<b;a++){if(y[a]===1){Nt[a]+=ct*t,ee[a]-=Nt[a]*t;const l=Math.min(1,14*t);d[a]+=(mt[a]-d[a])*l,m[a]+=(ht[a]-m[a])*l,ut[a]+=N[a]*t,ee[a]<Ro+.05&&Ct(a);continue}if(y[a]!==0)continue;const n=D[a],r=_[a],i=N[a],c=q[a];if(n*n+r*r+i*i*c*c<.04){D[a]=_[a]=N[a]=0;continue}let f=0,u=0,h=0;for(let l=0;l<xt;l++){const x=He[2*l]*c,p=He[2*l+1]*c,v=n-i*p,F=r+i*x,E=1/Math.sqrt(v*v+F*F+.25),L=-v*E,P=-F*E;f+=L,u+=P,h+=x*P-p*L}D[a]+=f/xt*o*t,_[a]+=u/xt*o*t,N[a]+=h/xt*o*2/(c*c)*t,d[a]+=D[a]*t,m[a]+=_[a]*t,ut[a]+=N[a]*t}for(let a=0;a<b;a++){if(y[a]!==0)continue;for(let f=a+1;f<b;f++){if(y[f]!==0||D[a]===0&&_[a]===0&&D[f]===0&&_[f]===0)continue;const u=d[f]-d[a],h=m[f]-m[a],l=q[a]+q[f],x=u*u+h*h;if(x>=l*l||x<1e-9)continue;const p=Math.sqrt(x),v=u/p,F=h/p,E=l-p,L=te[f]/(te[a]+te[f]);d[a]-=v*E*L,m[a]-=F*E*L,d[f]+=v*E*(1-L),m[f]+=F*E*(1-L);const P=Oe(a,f,v,F,To,Wo);P>Pe&&(Pe=P)}const n=q[a];let r=0;d[a]-n<-I&&(d[a]=-I+n,r=Math.max(r,Oe(a,-1,-1,0,lt,ft))),d[a]+n>I&&(d[a]=I-n,r=Math.max(r,Oe(a,-1,1,0,lt,ft))),m[a]-n<-I&&(m[a]=-I+n,r=Math.max(r,Oe(a,-1,0,-1,lt,ft))),m[a]+n>I&&(m[a]=I-n,r=Math.max(r,Oe(a,-1,0,1,lt,ft))),r>ke&&(ke=r);const i=Math.abs(d[a])-ge,c=Math.abs(m[a])-ge;if(i*i+c*c<go*go*.96){y[a]=1,Nt[a]=0,mt[a]=Math.sign(d[a])*ge,ht[a]=Math.sign(m[a])*ge,Se.push(a);const f=Math.hypot(D[a],_[a]);f+20>Fe&&(Fe=f+20,Eo=d[a])}}},Lo=()=>{for(let t=0;t<b;t++)if(y[t]===1||y[t]===0&&(D[t]*D[t]+_[t]*_[t]>.04||Math.abs(N[t])>.05))return!0;return!1},re=t=>t===0?1:-1,zo=(t,o,a,n,r,i,c)=>{const f=a-t,u=n-o,h=f*f+u*u||1e-6;for(let l=0;l<b;l++){if(l===i||l===c||l===s||y[l]!==0)continue;let x=((d[l]-t)*f+(m[l]-o)*u)/h;x=x<0?0:x>1?1:x;const p=t+f*x-d[l],v=o+u*x-m[l];if(p*p+v*v<(r+q[l])*(r+q[l]))return!1}return!0},me=(t,o)=>{const a=j*re(o);for(let n=0;n<b;n++)if(!(n===s||y[n]!==0)&&Math.hypot(d[n]-t,m[n]-a)<q[s]+q[n]+.05)return!1;return!0},pt=(t,o)=>{const a=j*re(t),n=q[s],r=te[s],i=wo*ct;let c=null;const f=t===0?[0,9]:[9,18],u=[];for(let h=0;h<11;h++)u.push(me(-A+2*A*h/10,t));for(let h=0;h<2&&!c;h++)for(let l=0;l<19;l++){if(y[l]!==0)continue;const x=l>=f[0]&&l<f[1]||W[l]===4&&t===0||W[l]===5&&t===1;if(!(h===0&&o&&!x&&l!==dt))for(let p=0;p<4;p++){const v=(p&1?1:-1)*ge,F=(p&2?1:-1)*ge,E=v-d[l],L=F-m[l],P=Math.hypot(E,L),Q=E/P,oe=L/P,C=d[l]-Q*(n+q[l]),Y=m[l]-oe*(n+q[l]);if(!(Math.abs(C)>I-n||Math.abs(Y)>I-n))for(let ae=0;ae<11;ae++){const de=-A+2*A*ae/10;if(!u[ae])continue;const H=C-de,X=Y-a,Me=Math.hypot(H,X),nt=H/Me,Le=X/Me;if(Le*re(t)>-.12)continue;const Ie=nt*Q+Le*oe;if(Ie<.3||!zo(de,a,C,Y,n*.98,l,-1)||!zo(d[l],m[l],v,F,q[l]*.98,l,-1))continue;const Xe=(1-Ie)*2.2+Me/90+P/70+(x?0:.8);if(!c||Xe<c.sc){const kt=Math.sqrt(2*i*P+1225)*1.12,ze=kt/((1+To)*r/(r+te[l])*Ie);c={sc:Xe,sx:de,ang:Math.atan2(Le,nt),v:Math.min(560,Math.sqrt(ze*ze+2*i*Me))}}}}}if(!c){let h=0,l=0,x=0;for(let v=0;v<19;v++)y[v]===0&&(h+=d[v],l+=m[v],x++);x?(h/=x,l/=x):l=-a;let p=Math.max(-A,Math.min(A,h+G()*6));for(let v=0;v<8&&!me(p,t);v++)p=Math.max(-A,Math.min(A,p+(v%2?4:-4)*(v+1)));c={sc:9,sx:p,ang:Math.atan2(l-a,h-p),v:330+60*w()}}return c},bt=t=>{const o=j*re(t),a=(w()-.5)*10;return{sx:a,ang:Math.atan2(-o+G()*.3,-a),v:470+50*w()}},ne=new Float32Array(4096*8);let we=0;const Ao=(t,o,a,n,r,i,c)=>{if(we>=4096)return;const f=we*8;ne[f]=t,ne[f+1]=o,ne[f+2]=a,ne[f+3]=n,ne[f+4]=r,ne[f+5]=i,ne[f+6]=c,ne[f+7]=0,we++},It=new Float64Array(b),Xt=new Float64Array(b),ie=()=>{for(let t=0;t<b;t++)It[t]=d[t],Xt[t]=m[t]},Vt=t=>{for(let o=0;o<b;o++){if(y[o]>=2)continue;const a=d[o]-It[o],n=m[o]-Xt[o];a*a+n*n>1e-4&&Ao(It[o],Xt[o],d[o],m[o],q[o],vt[o],y[o]===0?t:t*.5)}ie()},Po=`#version 300 es
precision highp float;
precision highp int;
`,z=e.__c233||(e.__c233={}),ko=(t,o)=>{const a=e.createShader(t);return e.shaderSource(a,o),e.compileShader(a),a},he="out vec2 vUV; void main(){ vec2 p=vec2(float((gl_VertexID&1)*4-1),float((gl_VertexID&2)*2-1)); vUV=p*.5+.5; gl_Position=vec4(p,0,1); }",Zo=`layout(std140) uniform C { vec4 uCam; vec4 uCR; vec4 uCU; vec4 uCF; vec4 uL; vec4 uLc; vec4 uP; vec4 uSh; vec4 uFr; vec4 uML; vec4 uMD; vec4 uQ; vec4 uSk; vec4 uRm; vec4 uX; vec4 uG; vec4 uD[20]; vec4 uE[20]; };
`,$o=`in vec2 vUV; out vec4 o;
float h(vec2 p,float per,float s){ uvec2 q=uvec2(mod(p,per)); uint n=q.x*1973u+q.y*9277u+uint(s)*26699u; n=(n<<13u)^n; n=n*(n*n*15731u+789221u)+1376312589u; return float(n&0x7fffffffu)/2147483647.; }
float vn(vec2 uv,float per,float s){ vec2 i=floor(uv),f=uv-i; f=f*f*(3.-2.*f);
  return mix(mix(h(i,per,s),h(i+vec2(1,0),per,s),f.x),mix(h(i+vec2(0,1),per,s),h(i+vec2(1,1),per,s),f.x),f.y); }
void main(){ vec4 r=vec4(0); for(int c=0;c<4;c++){ float per=c<2?8.:32.,amp=.5,n=0.,s=float(c)*7.+1.; int oc=c<2?5:3;
  for(int i=0;i<oc;i++){ n+=amp*vn(vUV*per,per,s+float(i)*3.); per*=2.; amp*=.5; } r[c]=clamp(.5+(n-.48)*1.6,0.,1.); } o=r; }`,Jo=`in vec2 vUV; out vec4 o;
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
}`,ea=`layout(location=0) in vec4 aS; layout(location=1) in vec4 aT;
out vec2 vP; flat out vec4 vS; flat out vec4 vT;
void main(){ vec2 a=aS.xy,b=aS.zw; float r=aT.x+.55; vec2 d=b-a; float l=length(d); vec2 u=l>1e-4?d/l:vec2(1,0), n=vec2(-u.y,u.x);
  int id=gl_VertexID; vec2 c=id==0?vec2(-1,-1):id==1?vec2(1,-1):id==2?vec2(-1,1):vec2(1,1);
  vec2 p=(c.x<0.?a-u*r:b+u*r)+n*c.y*r; vP=p; vS=aS; vT=aT; gl_Position=vec4(p/37.,0,1); }`,ta=`in vec2 vP; flat in vec4 vS; flat in vec4 vT; out vec4 o;
float ov(float t,float L,float d,float R){ float h2=R*R-d*d; if(h2<=0.) return 0.; float h=sqrt(h2); return max(0.,min(t+h,L)-max(t-h,0.)); }
void main(){ vec2 a=vS.xy,b=vS.zw,d=b-a; float L=length(d); vec2 u=L>1e-4?d/L:vec2(1,0); vec2 q=vP-a; float t=dot(q,u), dn=dot(q,vec2(-u.y,u.x));
  float R=vT.x, k=vT.z;
  float l0=ov(t,L,dn,R*.97), l1=ov(t,L,dn,R+.5);
  float st=fract(sin(floor(dn*9.+vT.y*40.)*12.9898+vT.y*78.2)*43758.5)*.9+.4;
  float wipe=exp(-k*1.6*st*l0/(2.*R));
  float pile=k*.11*(l1-l0)/(2.*R);
  o=vec4(vec3(pile),wipe); }`,Ht=Zo+`in vec2 vUV; out vec4 o;
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
}`,oa=`in vec2 vUV; out vec4 o; uniform sampler2D uS; uniform vec4 uQ;
void main(){ float m=0.; for(int j=0;j<25;j++){ vec2 off=vec2(float(j%5)-2.,float(j/5)-2.)*uQ.y; float c=(textureLod(uS,vUV+off,0.).a-.5)*2.*24.; m=max(m,-c); } o=vec4(m/24.,0,0,1); }`,aa=`in vec2 vUV; out vec4 o; uniform sampler2D uS; uniform sampler2D uT; uniform vec4 uQ;
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
}`,Ot=(t,o)=>[0,1,2,3,4,5].map(a=>"#define H"+a+(t.includes(a)?` 1
`:` 0
`)).join("")+(o?"#define PART "+o+`
`:"");let Gt=null;if(!z.progs){const t=(o,a)=>{const n=e.createProgram(),r=ko(e.VERTEX_SHADER,Po+o),i=ko(e.FRAGMENT_SHADER,Po+a);return e.attachShader(n,r),e.attachShader(n,i),e.linkProgram(n),{p:n,a:r,b:i}};Gt={noise:t(he,$o),bake:t(he,Jo),stamp:t(ea,ta),scene:t(he,`#define EARLY02
`+Ot([0,2],"K==0||K==2")+Ht),scene2:t(he,`#define EARLY3
`+Ot([3],"K==3")+Ht),scene3:t(he,`#define EARLY145
`+Ot([1,4,5],"K==1||K==4||K==5")+Ht),tile:t(he,oa),post:t(he,aa),fill:t(he,"uniform vec4 uC; out vec4 o; void main(){ o=uC; }")}}const ra=(t,o)=>{d[s]=o.sx,m[s]=j*re(t),ee[s]=0,y[s]=0,D[s]=Math.cos(o.ang)*o.v,_[s]=Math.sin(o.ang)*o.v,N[s]=G()*3},yt=(t,o,a)=>{ra(t,o),ie();let n=0;for(;n<600*7&&(Mo(1/600),n++,!(n%20===0&&(Vt(a),!Lo()))););Vt(a)};let Ge=0;const Fo=w()*1.047;Bt(Fo),yt(0,bt(0),1),yt(1,pt(1,!0),1),Ge=we,Bt(Fo);let B=0;if(Ae!=="Fresh rack"){yt(0,bt(0),1);const t=Ae==="Mid game"?4+(w()*3|0):11+(w()*4|0);for(let o=0;o<t;o++){Se.length=0,yt(B,pt(B,!0),1);let a=!1;for(const r of Se)r!==s&&(W[r]===1||W[r]===5)==(B===1)&&(a=!0);a||(B=1-B);let n=0;for(let r=0;r<18;r++)y[r]===0&&n++;if(n<4)break}for(let o=0;o<b;o++)y[o]===1&&Ct(o);B=0}Se.length=0,Pe=ke=Fe=0;{let t=g.home?-2:(w()-.5)*2*A*.7;for(let o=0;o<10&&!me(t,0);o++)t=Math.max(-A,Math.min(A,t+(o%2?3.5:-3.5)*(o+1)));d[s]=t,m[s]=j,D[s]=_[s]=N[s]=0,y[s]=0,ee[s]=0}ie();const De=(t,o,a)=>[t,o,a],Kt=(t,o)=>[t[0]-o[0],t[1]-o[1],t[2]-o[2]],So=t=>{const o=Math.hypot(t[0],t[1],t[2]);return[t[0]/o,t[1]/o,t[2]/o]},Do=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],Qt=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],_e=()=>G();let U,Ke,gt,ce,wt=9;const Yt=it==="Across the corner",Ue=[0,0],Ne=[0,0],jt=_e(),Wt=_e(),Zt=_e(),k={"Enamel shade":0,"Bare bulb":1,"Tin cone":2,"Low and swinging":1}[Ve];if(it==="Striker's eye")U=De(-10+jt*.5,14+Wt*.3,48+Zt*.5),Ke=De(6,-3,-16),gt=38,wt=4.5,ce=k===0?[-5,15,-18]:k===2?[-5,13,-27]:Ve==="Low and swinging"?[-3,11.2,-24]:[-4,12.6,-31];else if(it==="Leaning in")U=De(6+jt,35+Wt,60+Zt),Ke=De(0,0,-9),gt=42,wt=4.5,ce=k===0?[-16,19,-22]:k===2?[-12,15,-34]:Ve==="Low and swinging"?[-10,11.6,-28]:[-12,13.5,-33];else{const t=36*Math.SQRT1_2+ge;let o=J;if(Ae!=="Fresh rack"){const Q=(H,X)=>Math.exp(-((d[H]-d[X])**2+(m[H]-m[X])**2)/128);let oe=-1,C=18;for(const H of[J,-J])for(let X=0;X<19;X++)if(y[X]===0){const Me=d[X]-H*t,nt=m[X]-t,Le=Math.hypot(Me,nt),Ie=Math.acos(Math.min(1,(-H*Me-nt)*Math.SQRT1_2/Le));let Xe=Math.exp(-Ie*Ie/.12)*4900/Math.max(Le*Le,3600),kt=0;for(let ze=0;ze<19;ze++)y[ze]===0&&(kt+=Q(X,ze));Xe*=kt,Xe>oe&&(oe=Xe,C=X,o=H)}let Y=0,ae=0,de=0;for(let H=0;H<19;H++)if(y[H]===0){const X=Q(C,H);ae+=d[H]*X,de+=m[H]*X,Y+=X}Y>0&&(Ue[0]=ae/Y,Ue[1]=de/Y)}const a=Ue[0],n=Ue[1],r=o*t,i=a-r,c=n-t,f=Math.hypot(i,c),u=-o*Math.SQRT1_2,h=-Math.SQRT1_2,l=Math.max(-.1,Math.min(.1,.6*Math.atan2(u*c-h*i,u*i+h*c))),x=u*Math.cos(l)-h*Math.sin(l),p=u*Math.sin(l)+h*Math.cos(l);U=De((r+jt*.4)*J,18+Wt*.3,t+Zt*.4),Ke=De((r+x*t*1.2021)*J,0,t+p*t*1.2021),gt=32,wt=2.8,Ne[0]=r+x*t*Math.SQRT2,Ne[1]=t+p*t*Math.SQRT2;const v=k===0?[4,18,6]:k===2?[-2,15,8]:Ve==="Low and swinging"?[0,11.6,10]:[-4,14.5,6],F=-x,E=-p,L=(v[0]+v[2])*Math.SQRT1_2,P=(v[0]-v[2])*Math.SQRT1_2;ce=[(Ne[0]+L*F+P*o*E)*J,v[1],Ne[1]+L*E-P*o*F]}ce[0]+=Go,ce[1]+=Ko,U[0]*=J,Ke[0]*=J,ce[0]*=J;const se=So(Kt(Ke,U)),ve=So(Do(se,[0,1,0])),Te=Do(ve,se),le=Math.tan(gt*Math.PI/360);let $t=Math.hypot(...Kt([0,0,0],U));if(Ae!=="Fresh rack"){let t=0,o=0,a=0;for(let n=0;n<19;n++)y[n]===0&&(t+=d[n],o+=m[n],a++);a&&($t=Math.hypot(t/a*.6-U[0],U[1],o/a*.6-U[2]))}Yt&&($t=Math.hypot(Ue[0]-U[0],U[1],Ue[1]-U[2]));const Jt=ce[1],Qe=[ce[0]+_e()*.8,Jt+_e()*.3,ce[2]+_e()*.8],eo=k===1?[1,.76,.52]:k===0?[1,.82,.62]:[1,.79,.56],to=Math.hypot(Qe[0]-Ne[0],Jt,Qe[2]-Ne[1]),Ye=(k===1?.4:k===0?.62:.42)*to*to*to/Jt,oo={Limewash:[.56,.5,.4],"Green distemper":[.19,.26,.16],Ochre:[.58,.34,.085],"Indigo wash":[.09,.15,.36]}[Oo],Tt=t=>{const o=Kt(t,U),a=Qt(o,se);return a<.1?null:[.5+.5*Qt(o,ve)/(a*le),.5-.5*Qt(o,Te)/(a*le)]},_o=(t,o)=>{const a=t*2-1,n=1-o*2,r=[se[0]+ve[0]*a*le+Te[0]*n*le,se[1]+ve[1]*a*le+Te[1]*n*le,se[2]+ve[2]*a*le+Te[2]*n*le];if(r[1]>-.001)return null;const i=-U[1]/r[1];return[U[0]+r[0]*i,U[2]+r[2]*i]},ao={"Boxwood and ebony":[[.82,.62,.28,.74],[.045,.032,.026,.78],[.58,.025,.03,.8]],"Bone and rosewood":[[.84,.79,.66,.62],[.27,.075,.055,.62],[.56,.03,.035,.7]],Lacquered:[[.7,.21,.07,.93],[.022,.02,.02,.94],[.6,.015,.045,.94]],"Odd set":[[.72,.54,.32,.5],[.08,.06,.05,.55],[.48,.06,.045,.55]]}[yo],na={"Ivory white":[.86,.83,.74,.85],"Turned wood":[.5,.3,.15,.55],"Grey stone":[.4,.4,.38,.7],"Old bakelite":[.3,.095,.045,.88]}[Ft],ro={Birch:[.22,.1,.045],Teak:[.16,.07,.035],Satinwood:[.26,.12,.05],"Rosewood inlay":[.13,.05,.035]}[bo];if(!z.progs){const t={};for(const a in Gt){const n=Gt[a];e.getProgramParameter(n.p,e.LINK_STATUS)||console.error("233 "+a,e.getProgramInfoLog(n.p),e.getShaderInfoLog(n.a),e.getShaderInfoLog(n.b)),e.deleteShader(n.a),e.deleteShader(n.b);const r={},i=e.getProgramParameter(n.p,e.ACTIVE_UNIFORMS);for(let f=0;f<i;f++){const u=e.getActiveUniform(n.p,f),h=u.name.replace(/\[0\]$/,"");r[h]=e.getUniformLocation(n.p,u.name)}const c=e.getUniformBlockIndex(n.p,"C");c!==e.INVALID_INDEX&&e.uniformBlockBinding(n.p,c,3),t[a]={p:n.p,u:r}}z.progs=t,z.vao=e.createVertexArray(),z.svao=e.createVertexArray(),z.sbuf=e.createBuffer(),e.bindVertexArray(z.svao),e.bindBuffer(e.ARRAY_BUFFER,z.sbuf),e.bufferData(e.ARRAY_BUFFER,4096*32,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(1,1),e.bindVertexArray(null),z.noise=e.createTexture(),e.bindTexture(e.TEXTURE_2D,z.noise),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,z.noise,0),e.viewport(0,0,256,256),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.useProgram(t.noise.p),e.bindVertexArray(z.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(o),e.bindTexture(e.TEXTURE_2D,z.noise),e.generateMipmap(e.TEXTURE_2D)}const M=z.progs,je=(t,o,a,n)=>{const r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,o,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n?e.LINEAR_MIPMAP_LINEAR:a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),r},We=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},Ee=O>600?1024:512,xe=512,Ze=100,Et=je(Ee,Ee,e.LINEAR,!0),Rt=je(Ee,Ee,e.LINEAR,!0),Uo=je(xe,xe,e.LINEAR,!1),no=je(O,O,e.LINEAR,!1),No=je(Ze,Ze,e.LINEAR,!1),ia=We(Et),ca=We(Rt),io=We(Uo),sa=We(no),la=We(No);e.bindFramebuffer(e.FRAMEBUFFER,null);const co=e.createBuffer(),Z=new Float32Array(56*4);e.bindBuffer(e.UNIFORM_BUFFER,co),e.bufferData(e.UNIFORM_BUFFER,Z.byteLength,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);{const t={Birch:0,Teak:1,Satinwood:2,"Rosewood inlay":3}[bo],o={"Light dusting":0,Heavy:1,"Fresh drift":2,Damp:3}[St],a=new Float32Array(32);for(let r=0;r<8;r++){const i=w()*6.283,c=6+w()*24;a[r*4]=Math.cos(i)*c*.8,a[r*4+1]=Math.sin(i)*c*.8,a[r*4+2]=9+w()*16,a[r*4+3]=(.4+.6*w())*(r<5?1:.5)}const n=[w(),w(),w(),w()];e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.useProgram(M.bake.p),e.bindVertexArray(z.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,z.noise),e.uniform1i(M.bake.u.uN,0),e.uniform4f(M.bake.u.uS,...n),e.uniform4fv(M.bake.u.uArc,a),e.uniform4f(M.bake.u.uTx,2*I/Ee,0,0,0),e.viewport(0,0,Ee,Ee),e.bindFramebuffer(e.FRAMEBUFFER,ca),e.uniform4f(M.bake.u.uK,t,Ut,1,o),e.uniform1i(M.bake.u.uDt,1),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Et),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,ia),e.uniform4f(M.bake.u.uK,t,Ut,0,o),e.bindTexture(e.TEXTURE_2D,Rt),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,Et),e.generateMipmap(e.TEXTURE_2D),e.bindTexture(e.TEXTURE_2D,Rt),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,io),e.viewport(0,0,xe,xe),e.clearColor(.5,.5,.5,1),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)}const so=(t,o)=>{o<=t||(e.bindFramebuffer(e.FRAMEBUFFER,io),e.viewport(0,0,xe,xe),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.SRC_ALPHA),e.useProgram(M.stamp.p),e.bindVertexArray(z.svao),e.bindBuffer(e.ARRAY_BUFFER,z.sbuf),e.bufferSubData(e.ARRAY_BUFFER,0,ne,t*8,(o-t)*8),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,o-t),e.disable(e.BLEND),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,null))},qo=t=>{e.bindFramebuffer(e.FRAMEBUFFER,io),e.viewport(0,0,xe,xe),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendColor(0,0,0,t),e.blendFunc(e.ONE_MINUS_CONSTANT_ALPHA,e.CONSTANT_ALPHA),e.useProgram(M.fill.p),e.uniform4f(M.fill.u.uC,.5,.5,.5,1),e.bindVertexArray(z.vao),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null)},fa=()=>{Ge?(so(0,Ge),qo(.72),so(Ge,we),Ge=0):so(0,we),we=0},da=70,qe=Math.sqrt(ct/da);let $e=0,Je=0,et=0,tt=0,Mt=Ve==="Low and swinging"?1:.22;{const t=w()*6.283;$e=Math.cos(t)*1.2*Mt,Je=Math.sin(t)*1.2*Mt,et=-Je*qe*.6,tt=$e*qe*.6}let lo=0,T="aim",R=0,fo=0,Lt=0,zt=!1,ot=0,Be=null,At=!1,Ce=!1,uo=0,mo=0,ho=0,vo=0,at=!1,$=null,Pt=g.home?2.3:1.2+w()*1.2;Yt&&(Pt+=3.4);let fe=0,K=null,rt=null,Re=0;const ua=()=>{let t=0,o=0;for(let a=0;a<18;a++)y[a]===0&&(W[a]===1||W[a]===5?o++:t++);return[t,o]},ma=(t,o)=>{t=Math.max(-A,Math.min(A,t));for(let a=0;a<10&&!me(t,o);a++)t=Math.max(-A,Math.min(A,t+(a%2?3.5:-3.5)*(a+1)));return t},Bo=(t,o)=>{const a=j*re(t);let n=d[s],r=m[s],i=0;y[s]!==0&&(n=o+(S()-.5)*8,r=re(t)*(I+14),i=5);const c=Math.hypot(o-n,a-r);if(c<.05&&i===0){T=V?"aim2":"aim",R=0;return}K={x0:n,z0:r,y0:i,x1:o,z1:a,h:Math.min(1.4,.5+c*.012),T:Math.min(.33,.2+c*.0025+S()*.05),s:t},y[s]=3,D[s]=_[s]=N[s]=0,T="place",R=0},ha=(t,o,a)=>{const n=o+a*(q[s]+.5);for(const r of[-.75,.7]){const i=t+r+G()*.15;Ao(i,n,i+G()*.2,n+a*(.7+.3*w()),.32,w(),1.4)}},Co=t=>{rt={x0:d[s],x1:t,T:.2+Math.abs(t-d[s])*.022},T="slide",R=0},Io=t=>{D[s]=Math.cos(t.ang)*t.v,_[s]=Math.sin(t.ang)*t.v,N[s]=(t.spin||0)+G()*2,T="move",R=0,Se.length=0,zt=!0,ie(),g.sound.hit("click",Math.min(1,.25+t.v/700),{pan:d[s]/I*.6}),g.sound.hit("hat",.15)},va=()=>{Bt(w()*1.047),d[s]=0,m[s]=j,y[s]=0,ee[s]=0,D[s]=_[s]=N[s]=0,B=0,T="aim",R=0,Pt=2+2.2*S(),zt=!1,xo=1,V=null,ie()};let xo=0,V=null;if(Ae==="Fresh rack"&&Qo){const t=bt(1);t.v*=.62,B=1,d[s]=t.sx,m[s]=-j,ie(),V=t,fe=Pt,Re=0,T="aim2",R=0}const Xo=()=>{let t=0;const o=(r,i,c,f)=>{Z[t++]=r,Z[t++]=i,Z[t++]=c,Z[t++]=f},a=[Qe[0]+$e,Qe[1],Qe[2]+Je],n=(1-ot)*(1-ot);o(U[0],U[1],U[2],le),o(ve[0],ve[1],ve[2],1),o(Te[0],Te[1],Te[2],b),o(se[0],se[1],se[2],0),o(a[0],a[1],a[2],2.6),o(eo[0]*Ye,eo[1]*Ye,eo[2]*Ye,n),o($t,wt,fo,jo),o(k===1?1:k===2?2:0,k===2?10.5:7.6,k===2?7.7:2.7,k===2?.3:.42),o(ro[0],ro[1],ro[2],Ut),o(...ao[0]),o(...ao[1]),o(...ao[2]),o(...na),o(oo[0],oo[1],oo[2],Ft==="Grey stone"?1:0),o(9e-5*1500/Ye,k===2?2.5:3.5,k===1?1:k===2?1.6:2.6,Ye),o(k===1?1:k===2?.6:.25,Yt?.07:0,0,0);for(let r=0;r<b;r++)o(d[r],y[r]===2&&r===s?-100:ee[r],m[r],ut[r]);for(let r=0;r<b;r++)o(q[r],qt[r],W[r],vt[r])},xa=()=>{if(Ce){const t=d[s],o=m[s];d[s]+=ho,m[s]+=vo,Xo(),d[s]=t,m[s]=o}else Xo()},Vo=()=>{fa(),xo>0&&(qo(.25),xo=0),xa(),e.bindBuffer(e.UNIFORM_BUFFER,co),e.bufferSubData(e.UNIFORM_BUFFER,0,Z),e.bindBufferBase(e.UNIFORM_BUFFER,3,co),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,sa),e.viewport(0,0,O,O),e.useProgram(M.scene.p),e.bindVertexArray(z.vao);const t=(o,a,n)=>{e.activeTexture(e.TEXTURE0+o),e.bindTexture(e.TEXTURE_2D,a),e.uniform1i(M.scene.u[n],o)};t(0,Et,"uBoard"),t(1,Rt,"uDet"),t(2,Uo,"uPow"),t(3,z.noise,"uN"),e.drawArrays(e.TRIANGLES,0,3);{let o=1e9,a=1e9,n=-1e9,r=-1e9,i=!1,c=!1;for(let f=0;f<b&&!i;f++){const u=64+f*4,h=64+4*b+f*4,l=Z[u+1];if(!(l<-20)){c=!0;for(let x=0;x<8;x++){const p=Tt([Z[u]+(x&1?1:-1)*Z[h],l+(x&2?Z[h+1]:0),Z[u+2]+(x&4?1:-1)*Z[h]]);if(!p){i=!0;break}o=Math.min(o,p[0]),n=Math.max(n,p[0]),a=Math.min(a,p[1]),r=Math.max(r,p[1])}}}if(c){if(!i){const f=Math.max(0,Math.floor(o*O)-2),u=Math.max(0,Math.floor((1-r)*O)-2),h=Math.min(O,Math.ceil(n*O)+2),l=Math.min(O,Math.ceil((1-a)*O)+2);e.enable(e.SCISSOR_TEST),e.scissor(f,u,Math.max(h-f,0),Math.max(l-u,0))}e.useProgram(M.scene2.p);for(const[f,u]of[[0,"uBoard"],[1,"uDet"],[2,"uPow"],[3,"uN"]])e.uniform1i(M.scene2.u[u],f);(i||n>o&&r>a)&&e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST)}}e.useProgram(M.scene3.p);for(const[o,a]of[[0,"uBoard"],[1,"uDet"],[2,"uPow"],[3,"uN"]])e.uniform1i(M.scene3.u[a],o);e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,la),e.viewport(0,0,Ze,Ze),e.useProgram(M.tile.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,no),e.uniform1i(M.tile.u.uS,0),e.uniform4f(M.tile.u.uQ,0,1/Ze,0,0),e.drawArrays(e.TRIANGLES,0,3),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,O,O),e.useProgram(M.post.p),e.bindVertexArray(z.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,no),e.uniform1i(M.post.u.uS,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,No),e.uniform1i(M.post.u.uT,1),e.uniform4f(M.post.u.uQ,1/O,0,(fo*30|0)%61,O/1e3),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)};Vo();const pa=()=>{if(Pe>40){const t=Math.min(1,Pe/2600);g.sound.hit("click",.3+.7*t),g.sound.note(93+(w()*4|0),{dur:.05,vel:.25*t,wave:"triangle",cutoff:3500})}if(ke>40){const t=Math.min(1,ke/2600);g.sound.hit("kick",.25*t+.05),g.sound.hit("click",.25*t)}Fe>0&&(g.sound.hit("noise",.3+Math.min(.5,Fe/600),{cutoff:700,dur:.3,pan:Eo/I*.7}),g.sound.hit("kick",.12)),Pe=ke=Fe=0};return(t,o)=>{o=Math.min(Math.max(o||0,0),.15),fo+=o,R+=o;const a=g.input;let n=!1;if(a.down){Ce||(Ce=!0,uo=a.x,mo=a.y,at=!1,$=_o(uo,mo),$&&(Math.abs($[0])>I||$[1]>j-1.5||$[1]<-I)&&($=null));const r=a.x-uo,i=a.y-mo;if(Math.hypot(r,i)>.02&&(at=!0),At=!0,Lt=0,B===0&&at&&(T==="aim"||T==="slide"||T==="aim2")){T!=="aim"&&(T="aim",V=null,R=0);const c=$||[d[s],m[s]],f=Tt([c[0],0,c[1]]),u=Tt([c[0]+1,0,c[1]]),h=Tt([c[0],0,c[1]+1]);if(f&&u&&h){const l=u[0]-f[0],x=h[0]-f[0],p=u[1]-f[1],v=h[1]-f[1],F=l*v-x*p;let E=(v*r-x*i)/F,L=(-p*r+l*i)/F;const P=Math.hypot(E,L)||1;E/=P,L/=P;const Q=Math.min(1,Math.hypot(r,i)/.3);let oe=Math.atan2(-L,-E);if($&&L>.2){const C=Math.max(-A,Math.min(A,$[0]+E*(j-$[1])/L));me(C,0)&&(d[s]=C),oe=Math.atan2($[1]-j,$[0]-d[s])}ho=E*Q*1.6,vo=L*Q*1.6,Be={ang:oe,v:30+540*Q*Q,pw:Q}}}}else Ce&&(Ce=!1,ho=vo=0,T==="aim"&&B===0&&at&&Be&&Be.pw>.06&&(n=!0,Io(Be),Be=null),Be=null);for(const r of a.taps())if(!at&&(At=!0,Lt=0,T==="aim"&&B===0)){const i=_o(r.x,r.y);if(i){const c=Math.max(-A,Math.min(A,i[0]));me(c,0)&&(d[s]=c)}}if(a.down||(Lt+=o),T==="aim"){const r=zt?At&&a.inside?9:fe:Pt;R>r&&!Ce&&Lt>(At?6:0)&&(V=!zt&&Ae==="Fresh rack"?bt(0):pt(0,!0),fe=.35+S(),Re=0,Math.abs(V.sx-d[s])>.05?Co(V.sx):(T="aim2",R=0))}else if(T==="think"){if(R>fe)if(B===1){const r=pt(1,!0);V=r,Re=0;let i=r.sx;if(S()<.42){const c=Math.max(-A,Math.min(A,r.sx+(S()<.5?-1:1)*(1+2.5*S())));me(c,1)&&(i=c,Re=.25+.6*S())}fe=.5+1.7*S(),Bo(1,i)}else{V=null,fe=1.2+2.2*S();const r=y[s]===0?d[s]:(S()-.5)*20;Bo(0,ma(it==="Striker's eye"?Math.max(-10,Math.min(4,r*J))*J:r,0))}}else if(T==="place"){const r=Math.min(1,R/K.T),i=r*r*(3-2*r);d[s]=K.x0+(K.x1-K.x0)*i,m[s]=K.z0+(K.z1-K.z0)*i,ee[s]=K.y0*(1-i)+4*K.h*i*(1-i),r>=1&&(y[s]=0,ee[s]=0,ha(d[s],K.z1,re(K.s)),K=null,ie(),g.sound.hit("click",.16,{pan:d[s]/I*.5}),g.sound.hit("noise",.05,{cutoff:2500,dur:.08}),T=V?"aim2":"aim",R=0)}else if(T==="slide"){const r=Math.min(1,R/rt.T),i=r*r*(3-2*r);d[s]=rt.x0+(rt.x1-rt.x0)*i,r>=1&&(ie(),T=V?"aim2":"aim",R=0)}else if(T==="aim2"){if(Re&&R>Re)Re=0,fe=.3+1.1*S(),Math.abs(V.sx-d[s])>.05&&me(V.sx,B)&&Co(V.sx);else if(R>fe){const r=V;if(V=null,Math.abs(r.sx-d[s])>.05){const i=j*re(B);r.ang=Math.atan2(m[s]+Math.sin(r.ang)*30-i,r.sx+Math.cos(r.ang)*30-d[s])}r.ang+=G()*.009,r.v*=1+G()*.04,Io(r)}}else if(T==="dim"){const r=Math.max(0,Math.min(1,(R-1.4)/1.3));ot=r*r*(3-2*r),R>3.1&&(va(),T="undim",R=0)}else if(T==="undim"){const r=Math.max(0,1-R/1.5);ot=r*r*(3-2*r),R>1.5&&(ot=0,T="aim",R=0)}if(T==="move"){const r=Math.max(1,Math.min(90,Math.round(o*600)));for(let i=0;i<r;i++)Mo(1/600);if(Vt(1),pa(),R>.3&&!Lo()){for(let u=0;u<b;u++)y[u]===1&&Ct(u);let i=!1;for(const u of Se)u!==s&&u!==dt&&(W[u]===1||W[u]===5)==(B===1)&&(i=!0);i||(B=1-B);const[c,f]=ua();c===0||f===0||c+f<4?(T="dim",R=0):(T="think",R=0,fe=B===1?.5+2.6*S()*S()+(S()<.14?1.5+1.6*S():0):.3+.4*S())}}else ie();{const r=Math.max(1,Math.round(o*120)),i=o/r;for(let c=0;c<r;c++)lo+=i,lo>.35&&(lo=0,et+=G()*1.4*Mt,tt+=G()*1.4*Mt),et+=(-qe*qe*$e-.25*et)*i,tt+=(-qe*qe*Je-.25*tt)*i,$e+=et*i,Je+=tt*i}Vo()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
