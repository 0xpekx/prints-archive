// Under the Scope: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/010.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(De){De&&De.add({num:10,name:"Under the Scope",fam:"Worlds",recipe:"Made-up glowing creatures under a microscope that swim, pulse, eat, merge and bud. Each kind has its own body, and no two are at the same point in their lives. The species, the zoom, how they start out and what else is on the slide change every mint. Drag to stir them, tap to drop a spore, or hold to shine a light they swim toward or away from.",interactive:"Drag to stir and smear the culture, tap to drop a spore, hold to shine light that the creatures swim toward or flee.",music:!0,gl:!0,fps:30,seed:0,make(E){const e=E.gl,v0=E.size;let V=0;for(let t=2;t<66;t+=8)V=(V^parseInt(E.hash.slice(t,t+8),16))*2654435761>>>0;let g0=V||1;const x=()=>{g0=g0+1831565813|0;let t=Math.imul(g0^g0>>>15,1|g0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},e0=t=>{let o=0;for(const r of t)o+=r[1];let a=x()*o;for(const r of t)if(a-=r[1],a<=0)return r[0];return t[t.length-1][0]},bt={gH:"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006cfd4000000000000000000007effe000000000000000004fffffff000000000000000ff0000dff60000000000000ffa4ff00fff0000000000000ffadf824faf0000000000000fff40000f5f0000000000000fffa0001aff1000000000000f0fffff10ff1000000000000055d00f04f0000000000000006ff00eff70000000000000000019bfff0000000000000000062001f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",gF:"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005feffb00000000000000000010ffff70000000000000000a2f03df960000000000000fa300001ff9000000000000700f00a9010f85000000000070ff03df040bcf7000000000708f00d00f029fc000000000d0e00df0af00ffb0000000000dc03cf07a008f800000000000260000300fbd2000000000005d000a10e3f900000000000007fffcfd55a0000000000000bffff798010000000000000000a9fd90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",gG:"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000efff300000000000000000dfffffff000000000000000ffffffffff00000000000006fff6100fffe000000000000fff50a300bf4a00000000002fff0fffff0fa00000000000bfff0d000f03d000000000004ff80f003f02d000000000000ff80ff7ff0b5000000000000fff005ff80f0000000000000dfef00017f700000000000000f06fffffc2000000000000000805873350000000000000000008500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",pD:"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005400000000000000000000fffffc0000000000000000ffff4fff000000000000000efff30cff900000000000000ffffffffff00000000000000ff9efff4cf00000000000000af50ffe0cf000000000000000ffadffcff0000000000000000fffffff4000000000000000000ffff800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",gA:"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007b000000000000000cfbd8bebaf000000000000000af00006ff000000000000070ff76f00fff000000000000b2a41f7c0fff000000000000e05f5df30fbf000000000000b05ffa00afbf0000000000004f04fffef0f00000000000000f10018f60f0000000000000f6ff84000c80000000000000afffffccff0000000000000000fffffff600000000000000000047855000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},q0=[{name:"pilgrims",w:26,b:[1,1,.5],m:.2515,s:.0279,pat:"gH",light:1,food:[.2,.01,.15,.15],dm:.14},{name:"drifters",w:24,b:[1,.75,1],m:.1932,s:.0177,pat:"gF",light:1,food:[.08,.02,.06,.15],dm:.14,tc:1.5,tth:.12},{name:"tumblers",w:20,b:[.5,.75,.667],m:.2593,s:.0308,pat:"gG",light:-1,food:[.2,.01,.15,.15],dm:.14},{name:"lanterns",w:16,b:[1,.5],m:.2972,s:.034,pat:"pD",light:1,food:[.05,.01,.04,.15],dm:.08},{name:"tissue bloom",w:14,b:[1,.5,.667],m:.2408,s:.0247,pat:"gA",light:-1,food:[.08,.02,.06,.15],maxMass:.1,pop:.5,maxCrowd:.3,crowdRate:.02,dm:.08,tc:.9,tth:.22}];let u=e0(q0.map(t=>[t,t.w]));const wt={pilgrims:[.7,.8,2.1,1.6],drifters:[0,0,1.7,1.2],tumblers:[1,.6,2.4,2.2],lanterns:[0,0,3,1.4],"tissue bloom":[.35,.5,0,2]};let C=e0([["dark field",38],["ink bloom",30],["stained slide",24],["polarised",8]]);const he={"dark field":[["moonlit",[.55,.75,1],[.95,.98,1],[.25,.45,.9]],["amber",[1,.62,.25],[1,.92,.75],[.9,.35,.12]],["verdigris",[.3,.95,.75],[.85,1,.9],[.1,.55,.6]]],"ink bloom":[["abyssal",[.1,.55,1],[.6,1,.95],[.3,.2,.9]],["coral",[1,.3,.45],[1,.85,.55],[.75,.15,.5]],["foxfire",[.45,1,.35],[.95,1,.6],[.1,.6,.5]]],"stained slide":[["eosin",[.1,.85,.45],[.35,.9,.5],[.75,.75,.15]],["methylene",[.85,.45,.08],[.9,.6,.1],[.6,.45,.05]],["gram",[.35,.95,.15],[.5,.9,.2],[.3,.75,.1]]],polarised:[["first order",[1,1,1],[1,1,1],[1,1,1]],["second order",[1,1,1],[1,1,1],[1,1,1]]],"phase contrast":[["green filter",[.47,.5,.45],[.96,.98,.9],[.13,.16,.12]]],"interference contrast":[["slate",[.44,.47,.52],[.98,.97,.93],[.04,.05,.09]],["olive",[.46,.5,.36],[1,.97,.8],[.06,.08,.03]],["tint plate",[.6,.25,.55],[.98,.86,.3],[.1,.25,.8]]]};E.home&&(u=q0.find(t=>t.name==="drifters")||u,C="dark field");let b0=(V^625341585)>>>0||3;const yt=()=>{b0=b0+1831565813|0;let t=Math.imul(b0^b0>>>15,1|b0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};!E.home&&(C==="dark field"||C==="ink bloom")&&yt()<.25&&(C="interference contrast");let w0=(V^1759714724)>>>0||5;const Tt=()=>{w0=w0+1831565813|0;let t=Math.imul(w0^w0>>>15,1|w0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};!E.home&&C==="dark field"&&Tt()<.12&&(C="phase contrast");const Et=0,M=Et?[{PRES:"dark field",MAG:"single cell",POP:"sparse",LENS:"vignetted"},{PRES:"ink bloom",pal:0,MAG:"oil immersion",MED:"still"},{PRES:"interference contrast",pal:0,POP:"teeming",MAG:"low power"},{PRES:"polarised",POP:"sparse"},{PRES:"stained slide",MUT:"giant",MAG:"single cell"},{MUT:"predators",FORM:"milling ring",MAG:"high power"},{PRES:"phase contrast",MAG:"oil immersion",POP:"sparse"},{PRES:"stained slide",LENS:"clean",MAG:"low power"}][(V>>>11)%8]:{};M.PRES&&(C=M.PRES);let a0=he[C][Math.floor(x()*he[C].length)];M.pal!==void 0&&(a0=he[C][M.pal]);let q=e0([["sparse",22],["thriving",50],["teeming",28]]),I0=e0([["still",36],["drifting current",38],["swirling",26]]),X0=e0([["clean",35],["vignetted",43],["dusty slide",22]]),f0=e0([["gliding",45],["spinning",30],["darting",25]]),j=e0([["none",66],["giant",9],["crimson strain",9],["twin lineages",6],["predators",10]]);E.home&&(q="teeming",f0="spinning");let y0=(V^1540483477)>>>0||7;const W=()=>{y0=y0+1831565813|0;let t=Math.imul(y0^y0>>>15,1|y0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ne=t=>{let o=0;for(const r of t)o+=r[1];let a=W()*o;for(const r of t)if(a-=r[1],a<=0)return r[0];return t[t.length-1][0]};let U=Ne([["scattered",46],["colony",24],["procession",18],["milling ring",12]]),F=Ne([["low power",58],["high power",30],["oil immersion",12],["single cell",14]]);E.home&&(U="scattered",F="low power"),C==="polarised"&&q==="sparse"&&(q="thriving"),M.sp&&(u=q0.find(t=>t.name===M.sp)),M.POP&&(q=M.POP),M.FORM&&(U=M.FORM),M.MAG&&(F=M.MAG),M.MUT&&(j=M.MUT),M.LENS&&(X0=M.LENS),M.MED&&(I0=M.MED),E.trait("species",u.name),E.trait("optics",C+", "+a0[0]),E.trait("population",q),E.trait("formation",U),E.trait("magnification",F),E.trait("medium",I0),E.trait("gait",f0),E.trait("lens",X0),E.trait("mutation",j);let T0=(V^461845907)>>>0||9;const b=()=>{T0=T0+1831565813|0;let t=Math.imul(T0^T0>>>15,1|T0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},H0=b(),I=M.OBJ||(E.home||F==="single cell"||H0<.4?"none":H0<.62?"strand":H0<.84?"diatoms":H0<.92?"bubble":"strand and diatoms"),_e=j==="giant",Z0=j==="predators",ue=10,s=_e?96:128,$=Math.max(3,Math.round((q==="sparse"?6:q==="thriving"?10:15)*(u.pop||1)*(_e?.6:1))),E0=e.getExtension("EXT_color_buffer_float"),t0=E0?e.RGBA16F:e.RGBA8,o0=E0?e.HALF_FLOAT:e.UNSIGNED_BYTE,Rt=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}`,ke=e.__p010||(e.__p010=new Map),X=t=>ke.get(t)||ke.set(t,Mt(t)).get(t),Be={},me=t=>t.owner===Be?!1:(t.owner=Be,!0),Mt=t=>{const o=e.createProgram(),a=[];for(const[r,c]of[[e.VERTEX_SHADER,Rt],[e.FRAGMENT_SHADER,`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;precision highp int;
`+t]]){const l=e.createShader(r);e.shaderSource(l,c),e.compileShader(l),e.attachShader(o,l),a.push(l)}return e.linkProgram(o),{p:o,u:null,sh:a}},Ue=t=>{if(t.u)return;const o=t.p;if(!e.getProgramParameter(o,e.LINK_STATUS))throw new Error("010 link: "+e.getProgramInfoLog(o)+" "+t.sh.map(c=>e.getShaderInfoLog(c)).join(" "));const a={},r=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let c=0;c<r;c++){const l=e.getActiveUniform(o,c),n=l.name.replace("[0]","");a[n]=e.getUniformLocation(o,l.name)}t.u=a,t.sh=null},B=(t,o,a,r,c,l,n,i)=>{const d=e.createTexture();return e.bindTexture(e.TEXTURE_2D,d),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,r,c,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,i),d},Y=(...t)=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),t.forEach((a,r)=>e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+r,e.TEXTURE_2D,a,0)),o},ze=e.createVertexArray(),St=E0?(()=>{const t=new Uint16Array(s*s*4);for(let o=0;o<s*s;o++)t[o*4+2]=15360;return t})():(()=>{const t=new Uint8Array(s*s*4);for(let o=0;o<s*s;o++)t[o*4+2]=255;return t})(),Ge=(t,o)=>{const a=e.createTexture();return e.bindTexture(e.TEXTURE_2D,a),e.texStorage2D(e.TEXTURE_2D,o,t0,s,s),t&&e.texSubImage2D(e.TEXTURE_2D,0,0,0,s,s,e.RGBA,o0,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),a},K=[0,1].map(()=>Ge(St,6)),xe=[0,1].map(()=>B(s,s,t0,e.RGBA,o0,null,e.LINEAR,e.REPEAT)),Oe=[0,1].map(t=>Y(K[t],xe[t])),ve=[0,1].map(()=>Ge(null,1)),At=ve.map(t=>Y(t));let A=0,R0=0;const s0=[];{let t=0;const o=u.b.length,a=Math.ceil(ue);for(let r=-a;r<=a;r++){let c=null;for(let l=-a;l<=a+1;l++){const n=Math.hypot(l,r)/ue;let i=0;if(l<=a&&n<1){const d=n*o,h=Math.min(o-1,Math.floor(d)),p=d-h;i=p>0&&p<1?u.b[h]*Math.exp(4-1/(p*(1-p))):0}i>1e-6?(t+=i,c?(s0.push(c[0]+i/(c[1]+i),r,c[1]+i,0),c=null):c=[l,i]):c&&(s0.push(c[0],r,c[1],0),c=null)}}for(let r=2;r<s0.length;r+=4)s0[r]/=t}const qe=s0.length/4,Ft=B(qe,1,e.RGBA32F,e.RGBA,e.FLOAT,new Float32Array(s0),e.NEAREST,e.CLAMP_TO_EDGE),r0=24,Ie=bt[u.pat]||"",Xe=new Uint8Array(r0*r0);for(let t=0;t<r0*r0;t++)Xe[t]=Ie?parseInt(Ie[t],16)*17:0;e.pixelStorei(e.UNPACK_ALIGNMENT,1);const Lt=B(r0,r0,e.R8,e.RED,e.UNSIGNED_BYTE,Xe,e.LINEAR,e.CLAMP_TO_EDGE);e.pixelStorei(e.UNPACK_ALIGNMENT,4);const M0=8,He=B(M0,M0,t0,e.RGBA,o0,null,e.LINEAR,e.REPEAT),Pt=Y(He),f=16,Ct=B(f,f,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST,e.CLAMP_TO_EDGE),Dt=Y(Ct),c0=new Uint8Array(f*f*4),Ze=B(s,s,t0,e.RGBA,o0,null,e.LINEAR,e.REPEAT),Nt=Y(Ze),ge=[0,1].map(()=>B(s,s,t0,e.RGBA,o0,null,e.LINEAR,e.REPEAT)),_t=ge.map(t=>Y(t)),kt=e.__n010||(e.__n010=(()=>{const o=new Uint8Array(65536),a=[8,20,48,96],r=(c,l,n)=>{let i=Math.imul(c,374761393)+Math.imul(l,668265263)+Math.imul(n+1,1013904223)|0;return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296};for(let c=0;c<4;c++){const l=a[c];for(let n=0;n<128;n++)for(let i=0;i<128;i++){const d=i*l/128,h=n*l/128,p=Math.floor(d),m=Math.floor(h),g=(p+1)%l,S=(m+1)%l;let k=d-p,P=h-m;k=k*k*(3-2*k),P=P*P*(3-2*P);const O0=r(p,m,c),pe=r(g,m,c),Z=r(p,S,c),Zt=r(g,S,c),gt=O0+(pe-O0)*k;o[(n*128+i)*4+c]=Math.round(255*(gt+(Z+(Zt-Z)*k-gt)*P))}}return B(128,128,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,o,e.LINEAR,e.REPEAT)})()),l0=e.__lw010||(e.__lw010=new Map),S0=Math.min(v0,l0.mx||(l0.mx=e.getParameter(e.MAX_TEXTURE_SIZE))),A0=Math.max(S0,Math.min(1024,l0.mx));if(!l0.has(A0)){const t=B(A0,A0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.NEAREST,e.CLAMP_TO_EDGE);l0.set(A0,[t,Y(t)])}const[Bt,Ut]=l0.get(A0);e.bindFramebuffer(e.FRAMEBUFFER,null);const w=X((t=>`
const float PRD=${t}.;uniform sampler2D F,H,T,D;uniform int nT;uniform float N,dt,crowd,tm,SR;
uniform vec4 G1,FD,ST,LI,MD,MO,PR,GA,TC;
layout(location=0) out vec4 o;layout(location=1) out vec4 oh;
vec4 smp(vec2 q){return textureLod(F,q/N,0.);}
vec4 cr(vec2 q){q-=.5;vec2 i=floor(q),f=q-i;
  vec2 w0=f*(-.5+f*(1.-.5*f)),w1=1.+f*f*(-2.5+1.5*f),w2=f*(.5+f*(2.-1.5*f)),w3=f*f*(-.5+.5*f),w12=w1+w2;
  vec2 a=(i-.5)/N,b=(i+.5+w2/w12)/N,d=(i+2.5)/N;
  return (textureLod(F,vec2(a.x,a.y),0.)*w0.x+textureLod(F,vec2(b.x,a.y),0.)*w12.x+textureLod(F,vec2(d.x,a.y),0.)*w3.x)*w0.y
        +(textureLod(F,vec2(a.x,b.y),0.)*w0.x+textureLod(F,vec2(b.x,b.y),0.)*w12.x+textureLod(F,vec2(d.x,b.y),0.)*w3.x)*w12.y
        +(textureLod(F,vec2(a.x,d.y),0.)*w0.x+textureLod(F,vec2(b.x,d.y),0.)*w12.x+textureLod(F,vec2(d.x,d.y),0.)*w3.x)*w3.y;}
float cx2(vec2 a,vec2 b){return a.x*b.y-a.y*b.x;}
vec2 rot(vec2 v,float a){float c=cos(a),s=sin(a);return vec2(c*v.x-s*v.y,s*v.x+c*v.y);}
vec2 nrm(vec2 v){float l=length(v);return l>1e-4?v/l:vec2(0.);}
void main(){
  vec2 p=gl_FragCoord.xy,vm=vec2(0.),k6=6.2832*p/N;
  if(MD.x>.5&&MD.x<1.5)vm=MD.y*vec2(cos(MD.w),sin(MD.w))*(.8+.2*sin(k6.y+MD.z*.02));
  else if(MD.x>1.5)vm=MD.y*vec2(sin(k6.y+MD.z*.011),cos(k6.x-MD.z*.008));
  vec2 d=p-ST.xy;d-=N*floor(d/N+.5);float sw=exp(-dot(d,d)/SR);vec2 vs=ST.zw*sw;vm+=vs;
  // heading: mass-weighted average of the neighbourhood
  vec4 hs=vec4(0.);vec2 ws=vec2(1e-4);
  for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 q=p+vec2(x,y);vec4 f=smp(q),hh=textureLod(H,q/N,0.);hs+=hh*f.rrgg;ws+=f.rg;}
  vec4 h0=textureLod(H,p/N,0.),cf0=smp(p);
  vec2 hr=nrm((hs.xy+h0.xy*1e-4)/ws.x),hg=nrm((hs.zw+h0.zw*1e-4)/ws.y);
  // kernel
  float u=0.,ug=0.,ud=0.;vec2 gR=vec2(0.),gG=vec2(0.);
  for(int i=0;i<nT;i++){vec4 k=texelFetch(T,ivec2(i,0),0);vec4 f=smp(p+k.xy);u+=k.z*f.r;ug+=k.z*f.g;ud+=k.z*f.r*f.a;gR+=k.z*f.r*k.xy;gG+=k.z*f.g*k.xy;}
  // steering: wander field, constant spin, light, stir, predators and prey
  vec2 l=LI.xy-p;l-=N*floor(l/N+.5);float lw=exp(-dot(l,l)/(LI.z*LI.z));
  float wn=sin(p.x*.047+tm*.37+sin(p.y*.061+tm*.13)*2.)*cos(p.y*.039-tm*.29)+.7*sin((p.x-p.y)*.031+tm*.21);
  float ang=MO.y*wn+MO.z+LI.w*lw*cx2(hr,nrm(l))*9.+length(vs)*3.*cx2(hr,nrm(vs));
  if(PRD>.5)ang+=PR.w*min(1.,ug*12.)*cx2(hr,-nrm(gG));
  hr=nrm(rot(hr,ang*dt));
  if(length(hr)<.5)hr=vec2(cos(h0.x*7.+p.y),sin(h0.y*7.+p.x));
  float angG=MO.y*.6*wn+PR.z*min(1.,u*12.)*cx2(hg,nrm(gR))+length(vs)*3.*cx2(hg,nrm(vs));
  hg=nrm(rot(hg,angG*dt));if(length(hg)<.5)hg=vec2(1.,0.);
  float boost=1.+1.4*lw*abs(LI.w)/.5*(1.-exp(-dot(l,l)/180.));
  float dsp=GA.x>1.5?.35+1.4*pow(max(0.,sin(tm*5.5+h0.x*3.+cf0.a*40.)),4.):1.;
  vec2 vr=vm+MO.x*boost*dsp*hr,vg=vm+MO.x*1.25*hg;
  if(GA.x>.5&&GA.x<1.5){vec2 rc=gR/max(u,.03);vr+=GA.y*(cf0.a<.5?-1.:1.)*vec2(-rc.y,rc.x)*smoothstep(.01,.06,u);}
  vec4 c=cr(p-vr);
  float P=0.;if(PRD>.5)P=clamp(cr(p-vg).g,0.,1.);
  vec4 cf=smp(p-vm);
  float m=G1.x*(1.+MO.w*(c.a-.5));
  float g=2.*exp(-(u-m)*(u-m)/(2.*G1.y*G1.y))-1.;
  vec2 dq=p/N;float dB=16./N;
  float dn=(textureLod(D,dq,0.).r*2.+textureLod(D,dq+vec2(dB,0.),0.).r+textureLod(D,dq-vec2(dB,0.),0.).r+textureLod(D,dq+vec2(0.,dB),0.).r+textureLod(D,dq-vec2(0.,dB),0.).r)/6.;
  g-=FD.z*(1.-cf.b)+crowd+PR.y*ug*4.+TC.x*smoothstep(TC.y,TC.y+.12,dn)*(1.-.7*lw*min(1.,abs(LI.w)*3.));
  float A=clamp(c.r+dt*g,0.,1.);
  if(PRD>.5){float gp=2.*exp(-(ug-G1.x)*(ug-G1.x)/(2.*G1.y*G1.y))-1.;gp+=PR.y*u*3.-G1.z;P=clamp(P+dt*gp,0.,1.);}
  float lap=smp(p+vec2(1.,0.)).b+smp(p-vec2(1.,0.)).b+smp(p+vec2(0.,1.)).b+smp(p-vec2(0.,1.)).b-4.*cf.b;
  float fd=clamp(cf.b+dt*(FD.y*(1.-cf.b)-FD.x*(A+P)*cf.b)+FD.w*lap,0.,1.);
  float dy=u>.004?ud/u:clamp(c.a,0.,1.);
  o=vec4(A,P,fd,dy);oh=vec4(hr,hg);
}`)(Z0?1:0)),D=X(`
uniform sampler2D F,H,PT;uniform vec4 SP[8],SQ[8],SH[8];uniform int nS;uniform float N,PS;
layout(location=0) out vec4 o;layout(location=1) out vec4 oh;
float h(vec2 p){p=fract(p*vec2(.1031,.1030));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}
void main(){
  vec2 p=gl_FragCoord.xy;vec4 c=texelFetch(F,ivec2(p),0),hh=texelFetch(H,ivec2(p),0);
  for(int i=0;i<nS;i++){
    vec2 d=p-SP[i].xy;d-=N*floor(d/N+.5);
    if(length(d)>SH[i].z)continue;
    float ca=cos(SP[i].z),sa=sin(SP[i].z);vec2 q=vec2(ca*d.x+sa*d.y,-sa*d.x+ca*d.y)/SP[i].w;
    float val=0.;
    if(SQ[i].x<.5){vec2 uv=(q+PS*.5)/PS;if(all(greaterThan(uv,vec2(0.)))&&all(lessThan(uv,vec2(1.))))val=texture(PT,uv).r*SQ[i].z;}
    else{float r=length(d)/SQ[i].w;if(r<1.)val=step(.35,h(p+SP[i].xy*7.))*h(p*1.7+SP[i].xy)*SQ[i].z*smoothstep(1.,.6,r);}
    if(val>.02){vec2 hd=vec2(cos(SH[i].x),sin(SH[i].x));
      if(SH[i].y<.5){c.r=max(c.r,val);c.a=SQ[i].y;hh.xy=hd;}else{c.g=max(c.g,val);hh.zw=hd;}}
  }
  o=c;oh=hh;
}`),V0=X(`
uniform sampler2D F;uniform float B;out vec4 o;
void main(){ivec2 b=ivec2(gl_FragCoord.xy)*int(B);float s=0.;
  for(int y=0;y<int(B);y++)for(int x=0;x<int(B);x++)s+=texelFetch(F,b+ivec2(x,y),0).r;
  o=vec4(s/(B*B),0.,0.,1.);}`),n0=X(`
uniform sampler2D F,TR;uniform float k,k2,D;out vec4 o;
void main(){ivec2 p=ivec2(gl_FragCoord.xy),n=textureSize(TR,0),x=ivec2(1,0),y=ivec2(0,1);vec4 f=texelFetch(F,p,0),t=texelFetch(TR,p,0);
  // the dye left behind spreads into the water as it ages (the slow memory in a stays put)
  vec4 s=texelFetch(TR,(p+x)%n,0)+texelFetch(TR,(p+n-x)%n,0)+texelFetch(TR,(p+y)%n,0)+texelFetch(TR,(p+n-y)%n,0);
  t.rgb=mix(t.rgb,s.rgb*.25,D);
  o=max(t*vec4(k,k,k,k2),vec4(f.r,f.g,f.r*f.a,f.r));}`),j0=X(`
uniform sampler2D F;uniform float B;out vec4 o;
void main(){ivec2 b=ivec2(gl_FragCoord.xy)*int(B);vec4 s=vec4(0.);
  for(int y=0;y<int(B);y++)for(int x=0;x<int(B);x++)s+=texelFetch(F,b+ivec2(x,y),0);
  s/=B*B;o=vec4(clamp(s.r*4.,0.,1.),clamp(s.g*4.,0.,1.),s.b,clamp(s.a,0.,1.));}`),Ve=["dark field","ink bloom","stained slide","polarised","interference contrast","phase contrast"].indexOf(C),v=X(((t,o)=>`
const float pres=${t}.;uniform sampler2D F,TR,SS,NZ,LW;uniform float N,SZ,t,mut,foc,LSC;uniform vec3 C0,C1,C2;uniform vec4 LI,LN,TP[4],SC[5],ZM,SPR,SPX,SPY;uniform int nC,nG,nTP;out vec4 o;
float h(vec2 p){p=fract(p*vec2(.1031,.1030));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}
vec3 hue(float x){return .5+.5*cos(6.2832*(x+vec3(0.,.33,.67)));}
float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;return length(pa-ba*clamp(dot(pa,ba)/dot(ba,ba),0.,1.));}
// the field through a cubic B-spline: value and exact gradient, so contours stay smooth and sharp at any screen size
void bsp(vec2 q,out vec4 v,out vec2 g){q-=.5;vec2 i=floor(q),f=q-i,f2=f*f,f3=f2*f;
  vec2 w0=(1.-3.*f+3.*f2-f3)/6.,w1=(4.-6.*f2+3.*f3)/6.,w2=(1.+3.*f+3.*f2-3.*f3)/6.,w3=f3/6.;
  vec2 g0=w0+w1,g1=w2+w3,p0=(i-.5+w1/g0)/N,p1=(i+1.5+w3/g1)/N;
  vec2 d0=-.5*(1.-f)*(1.-f),d1=.5*f*(3.*f-4.),d2=.5*(1.-f)*(1.+3.*f),d3=.5*f2;
  vec2 e0=d0+d1,e1=d2+d3,r0=(i-.5+d1/e0)/N,r1=(i+1.5+d3/e1)/N;
  v=g0.y*(g0.x*textureLod(F,vec2(p0.x,p0.y),0.)+g1.x*textureLod(F,vec2(p1.x,p0.y),0.))+g1.y*(g0.x*textureLod(F,vec2(p0.x,p1.y),0.)+g1.x*textureLod(F,vec2(p1.x,p1.y),0.));
  vec2 a=g0.y*(e0.x*textureLod(F,vec2(r0.x,p0.y),0.).rg+e1.x*textureLod(F,vec2(r1.x,p0.y),0.).rg)+g1.y*(e0.x*textureLod(F,vec2(r0.x,p1.y),0.).rg+e1.x*textureLod(F,vec2(r1.x,p1.y),0.).rg);
  vec2 b=e0.y*(g0.x*textureLod(F,vec2(p0.x,r0.y),0.).rg+g1.x*textureLod(F,vec2(p1.x,r0.y),0.).rg)+e1.y*(g0.x*textureLod(F,vec2(p0.x,r1.y),0.).rg+g1.x*textureLod(F,vec2(p1.x,r1.y),0.).rg);
  g=vec2(a.x+a.y,b.x+b.y);}
void bis(vec2 q,out vec4 s4,out vec4 tr){q-=.5;vec2 i=floor(q),f=q-i,f2=f*f,f3=f2*f;
  vec2 w0=(1.-3.*f+3.*f2-f3)/6.,w1=(4.-6.*f2+3.*f3)/6.,w2=(1.+3.*f+3.*f2-3.*f3)/6.,w3=f3/6.;
  vec2 g0=w0+w1,g1=w2+w3,p0=(i-.5+w1/g0)/N,p1=(i+1.5+w3/g1)/N;
  s4=g0.y*(g0.x*textureLod(SS,vec2(p0.x,p0.y),0.)+g1.x*textureLod(SS,vec2(p1.x,p0.y),0.))+g1.y*(g0.x*textureLod(SS,vec2(p0.x,p1.y),0.)+g1.x*textureLod(SS,vec2(p1.x,p1.y),0.));
  ${t===1?"tr=g0.y*(g0.x*textureLod(TR,vec2(p0.x,p0.y),0.)+g1.x*textureLod(TR,vec2(p1.x,p0.y),0.))+g1.y*(g0.x*textureLod(TR,vec2(p0.x,p1.y),0.)+g1.x*textureLod(TR,vec2(p1.x,p1.y),0.));}":"tr=vec4(0.);}"}
void main(){
  vec2 su=gl_FragCoord.xy/SZ,uv=ZM.xy+su*ZM.z,q=uv*N,cc=su-.5,sh=vec2(-.7071,.7071);
  float rad=length(cc),ppc=SZ/(N*ZM.z),px=SZ*.001;
  vec4 f;vec2 g;bsp(q,f,g);f=clamp(f,0.,1.);
  vec4 s4,tr;bis(q,s4,tr);if(pres<.5||pres>1.5)tr=textureLod(TR,uv,0.);
  vec2 sg=s4.xy;float Bw=s4.z,halo=s4.w,rs=length(sg);
  float sst=length(fwidth(sg))*ppc;vec2 jx=dFdx(sg),jy=dFdy(sg);float ani=2.*abs(jx.x*jy.y-jx.y*jy.x)/(dot(jx,jx)+dot(jy,jy)+1e-9);
  float M=min(f.r+f.g,1.),pf=clamp(f.g/(f.r+f.g+.02),0.,1.),dye=f.a,food=f.b,lin=sin(dye*6.2832);
  // every body is at its own point of its life, read from its lineage dye through triangle waves (continuous, so where two
  // bodies' dyes blend the build changes smoothly): x fullness (granules, food vacuoles, fill), y nucleus, z wall (the
  // thickest fifth encysted: thick double wall, no fringe), w fringe (one in four bare); bt the tint along the palette
  vec4 bq=abs(fract(dye*vec4(6.9,5.8,5.3,4.)+vec4(.77,.15,.51,.95))*2.-1.);float bt=abs(fract(dye*6.1+.3)*2.-1.)*2.-1.;
  float enc=smoothstep(.8,.86,bq.z)*SPX.w,fu=bq.x*(1.-.4*enc),fon=smoothstep(.22,.28,bq.w)*(1.-enc),fk=.4+.9*clamp((bq.w-.25)/.75,0.,1.);
  // inr: inside the outer rim (folds and holes, where the wide blur outweighs the tight one); hol: the same, only within a body
  float inr=smoothstep(-.02,.12,s4.z-.7*s4.w),hol=inr*smoothstep(.12,.28,s4.z);
  // every lineage rides at its own depth in the mount; the focus drifts slowly through them
  float kf=smoothstep(.12,.5,abs(abs(fract(dye*3.7)*2.-1.)-foc))*smoothstep(.0,.02,halo);
  float gm=length(g),d0=(M-.1)/max(gm,1e-4)*ppc;
  float wm=max(.07*ppc,.75*px)*(1.+2.*kf)*(1.+.8*bq.z),we=max(wm,.7);
  float d2=d0-2.4*we,Lm=(exp(-d0*d0/(we*we))+.4*enc*exp(-d2*d2/(we*we)))*wm/we/(1.+1.2*kf)*inversesqrt(1.+.8*bq.z)*(.35+.65*min(gm*3.,1.));
  float body=clamp(d0/(we*1.5)+.5,0.,1.),thick=smoothstep(.1,1.,M),rel=min(gm*2.6,1.)*(1.-.5*kf);
  // body frame: sg is a smooth position relative to the body's own centre, so what is drawn in it travels with the body
  float nuc=0.,Ln=0.,nol=0.,gran=0.,gdip=0.,cil=0.,cfr=0.,vac=0.,vk=0.,cvi=0.,cvr=0.,grv=0.,glp=0.,chl=0.,chd=0.;vec2 zn=vec2(1.,0.);
  if(halo>.003${o===1?"||Bw>.006":""}){
    float cpt=smoothstep(.35,.7,ani),inb=smoothstep(.3,.6,M)*step(.01,SPR.z)*cpt,nz=SPR.z*(.7+.7*bq.y),nd=(nz-rs)*ppc,wn=max(.07*ppc,.7)*(1.+kf);
    nuc=clamp(nd/(wn*1.5)+.5,0.,1.)*inb;Ln=exp(-nd*nd/(wn*wn))*inb/(1.+kf)*(1.4-.8*fu);
    float oa=dye*20.73;vec2 gd=vec2(cos(oa),sin(oa));nol=smoothstep(.34,.2,length(sg+gd*.58)/max(nz,.1))*inb;
    // granules: two lattices in the body frame, each jiggling in place
    float gsc=SPR.w,gth=1.-min((1.-mix(.84,.3,thick))*(.5+1.5*fu),.9);vec2 gp=sg*SPR.w;
    for(int i=0;i<nG;i++){vec2 gi=floor(gp),gf=gp-gi;float hh=h(gi+17.+float(i)*7.),h1=h(gi+1.3);
      vec2 gc=.3+.4*vec2(h(gi+3.1),h(gi+7.7))+.07*vec2(sin(t*(1.+hh)+hh*40.),cos(t*(1.3-hh)+hh*31.));
      float gr=.05+.25*h1*h1,rp=gr*ppc/gsc,gd=(length(gf-gc)-gr)*ppc/gsc;
      float cv=clamp(.5-gd/1.4,0.,1.)*step(gth,hh)*(.3+.7*hh)*min(1.,rp*rp+.08);
      float fv1=float(i==0)*step(.999-.42*fu*fu,h1);vac+=cv*fv1;vk+=cv*fv1*step(.5,fract(hh*7.));cv*=1.-fv1;
      gran+=cv*(.7+.3*sin(t*(2.+3.*hh)+hh*70.));gdip+=cv*clamp(dot(gf-gc,sh)/gr,-1.,1.);
      gp=mat2(.8,.6,-.6,.8)*gp*2.3+5.;gsc*=2.3;}
    // the contractile vacuole: a clear round hole that swells for several seconds and snaps shut, each body on its own beat
    vec2 cvp=vec2(-.55,.42)*(SPR.z+2.6);float cph=fract(t/(6.5+3.*fract(dye*7.3))+dye*5.);
    float cvR=(.45+1.35*smoothstep(0.,.93,cph))*(1.-smoothstep(.93,.985,cph))*SPX.z,cvd=(length(sg-cvp)-cvR)*ppc;
    float inc=smoothstep(.35,.7,M)*step(.01,SPR.z)*(1.-kf)*smoothstep(.5,1.5,sst)*cpt;
    vec2 cvn=normalize(sg-cvp+1e-5);cvi=smoothstep(1.4,-2.2,cvd)*inc;cvr=exp(-(cvd+.8)*(cvd+.8)/3.5)*inc*smoothstep(.15,.4,cvR)*(.2+.8*smoothstep(-.7,.9,dot(cvn,vec2(-.6,.8))));
    float gfade=smoothstep(.25,.6,sst)*smoothstep(7.,3.,sst)*smoothstep(.25,.5,M)*(1.-.6*kf)*(1.-nuc*.7)*(1.-cvi)*smoothstep(.3,.65,ani);
    gran*=gfade;gdip*=gfade;vac*=gfade;vk*=gfade;
    // ciliary fringe: fine rays from the body centre, just outside the membrane, swaying
    vec2 z=rs>1e-3?sg/rs:vec2(1.,0.);zn=z;
    z+=vec2(-z.y,z.x)*.035*sin(t*7.+dot(z,vec2(9.,5.))+rs*.9);z=normalize(z);
    for(int i=0;i<nC;i++)z=vec2(z.x*z.x-z.y*z.y,2.*z.x*z.y);
    float cth=max(.14-.11*SPR.x*fk,.015),rpx=rs*inversesqrt(.5*(dot(jx,jx)+dot(jy,jy))+1e-9);
    cfr=(1.-body)*(1.-hol)*smoothstep(cth,cth+.1,halo)*SPR.y*(1.-.6*kf)*fon;
    cil=pow(max(z.x,0.),5.)*cfr*smoothstep(2.,3.5,6.2832*rpx/exp2(float(nC)));
    // each kind known by its build, drawn in the body frame (Rb: the rim's distance in it): pilgrims a mouth groove, tumblers an
    // inner wall and a few long stiff rays, lanterns a ring of round green bodies about the nucleus; drifters naked and clear
    float kpx=rpx/max(rs,1e-3),ang=acos(clamp(zn.x,-1.,1.))*(zn.y<0.?-1.:1.),Rb=7.5;
    ${o===0?`{float al=dot(sg,gd)/Rb,ac=dot(sg,vec2(-gd.y,gd.x))/Rb-.25*(al-.55)*(al-.55)+.03,gw=.03+.05*smoothstep(.3,.9,al),gx=(abs(ac)-gw)*Rb*kpx;
      float ge=smoothstep(.22,.34,al)*smoothstep(.97,.86,al)*body*(1.-enc)*cpt;
      grv=smoothstep(1.,-1.5,gx)*ge;glp=exp(-(gx-.8)*(gx-.8)/1.2)*ge*(ac>0.?.9:.35);Ln+=glp;}`:""}
    ${o===1?`{float rw=.8*Rb*(1.+.05*(zn.x*sin(dye*17.)+zn.y*cos(dye*23.))+.04*sin(2.*ang+dye*29.)),wd=(rs-rw)*kpx;
      Ln+=exp(-wd*wd/(wn*wn*1.4))*body*(1.-hol)*(.45+.55*smoothstep(-.8,.8,dot(zn,vec2(.6,-.8))))*smoothstep(-.1,.5,sin(2.*ang+dye*31.)+.45*sin(5.*ang+dye*13.))*1.1;}
    {float nr=floor(8.+4.99*bq.y),ra=ang+.04*sin(t*.6+dye*30.),da=(fract(ra*nr/6.2832+.5)-.5)*6.2832/nr*rpx;
      cil=exp(-da*da/1.1)*(1.-body)*(1.-hol)*smoothstep(.015,.09,Bw)*(.4+.6*smoothstep(0.,.3,Bw))*(1.-.6*kf)*fon*SPR.y;}`:""}
    ${o===2?`{float nb=floor(6.+3.99*bq.x),a0=floor(ang*nb/6.2832+.5)*6.2832/nb;vec2 dc=sg-(nz+1.7)*vec2(cos(a0),sin(a0));
      float cd=(length(dc)-.85)*kpx;chl=smoothstep(1.3,-1.3,cd)*inb*(1.-.5*enc);chd=chl*clamp(dot(dc,sh)/.85,-1.,1.);}`:""}
  }
  // spores: a cyst with a double wall settles where one was dropped, swells and hatches; the lawn is pushed aside round it
  float cyw=0.,cyf=0.;
  for(int i=0;i<nTP;i++){float a=TP[i].z,on=step(0.,a)*step(a,3.);vec2 dv=(uv-TP[i].xy)*N;float dl=length(dv);
    float cr=(.8+.7*smoothstep(0.,1.1,a))*(1.-smoothstep(1.1,1.5,a)),dd=(dl-cr)*ppc,ww=max(.07*ppc,.8);
    float ok=on*step(.05,cr);cyw+=exp(-(dd+.4*ww)*(dd+.4*ww)/(ww*ww*2.2))*(.3+.7*smoothstep(-.7,.9,dot(dv,vec2(-.6,.8))/max(dl,1e-3)))*ok;cyf+=clamp(.5-dd/1.2,0.,1.)*ok;}
  // the medium (drawn by its own program, below): r lawn/2, g debris, b relief or rod hue, a debris relief
  float lawn=0.,ldip=0.,lh=0.,deb=0.,bdip=0.,fv=food;
  {vec4 lw=texelFetch(LW,ivec2(gl_FragCoord.xy*LSC),0);float ib=1.-body;lawn=lw.r*2.*ib;deb=lw.g*ib;bdip=(lw.a*2.-1.)*ib;
    if(pres>3.5&&pres<4.5)ldip=(lw.b*4.-2.)*ib;else lh=lw.b*2.;}
  // the lamp under the pointer (hold)
  vec2 lp=uv-LI.xy;float lg=exp(-dot(lp,lp)/(LI.z*LI.z))*LI.w,lit=1.+2.4*lg;
  vec3 tint=vec3(1.);
  if(mut>.5&&mut<1.5)tint=mix(vec3(1.),vec3(1.6,.35,.45),smoothstep(.55,.75,dye));
  if(mut>1.5&&mut<2.5)tint=mix(vec3(1.),vec3(.45,1.2,1.5),smoothstep(.4,.6,dye));
  {vec3 ta=mix(C0,bt<0.?C1:C2,.2*abs(bt))+.04,tb=ta/(C0+.04);tb*=dot(C0+.04,vec3(.3,.59,.11))/dot(ta,vec3(.3,.59,.11))*(1.+.22*(bq.w-.5));
    tint=pres>1.5&&pres<2.5?2.-(2.-tint)*tb:tint*tb;}
  vec3 PC=vec3(1.5,.5,.18);
  // the outer rim faces open water and catches the light where it turns toward the lamp; folds and holes inside the
  // mass are lit far less, so a body reads by its edge and its contents, not by a cord round every fold
  float fc=.5+.5*dot(gm>1e-4?g/gm:vec2(0.),vec2(-.6,.8)),rimL=(.2+.8*fc*fc)*(1.-.85*inr);
  float relF=pow(rel,2.)*(1.-.6*inr),opn=(1.-.85*cvi)*(.45+1.05*fu)*SPY.w*(1.-.7*grv);gran*=1.-grv;
  vec3 col;
  if(pres<.5){ // dark field: the cell is clear glass, nearly as black as the field; only what scatters shows
    vec3 s0=mix(mix(C0,C0.gbr,.18*lin)*tint,PC,pf),s1=mix(mix(C1,C1*tint,.6),PC*.8+.3,pf);
    vec3 LC=mix(vec3(.58,.62,.7),C1,.3);
    // the ramp inside a body: rust-black where it is thin, a deep amber glow where it is thick, granules amber to pale gold
    float rb=sqrt(we/wm),rf=(1.+1.2*kf)/(1.+.1*kf),rg=min(1.3+10.*(rb-1.),6.)*rf;
    vec3 e=mix(C2*C2*.02,C0*C2*.075,thick*thick)*tint*body*opn+s1*body*relF*rimL*(.035+min(.9*(rb-1.),.55))+s1*Lm*rimL*rg+mix(s0,s1,.4)*gran*body*1.3
      +mix(vec3(.3,.75,.25),vec3(.85,.35,.1),vk/max(vac,1e-3))*vac*body*.4+s1*cvr*body*.18
      +mix(C2,s1,.5)*(nuc*.05+Ln*.16+nol*.1)+s1*cil*.5+C2*tint*(halo*.1+Bw*.05)*(1.-.6*body)
      +LC*(lawn*.6+deb*.3)+s1*(cyw*.35+cyf*.06)+C2*tint*chl*body*.4+s1*glp*body*.3;
    col=vec3(.004,.005,.008)+C2*.012*(1.-rad*1.2)+e*lit+lg*(vec3(.13,.1,.07)+s0*body*(.25+.5*thick));
    col+=vec3(.6,-.05,-.6)*dot(g,cc)*Lm*rimL*1.5*rg/1.3;
    col=1.-exp(-max(col,0.)*2.);
  }else if(pres<1.5){ // ink bloom: luminous ink in black water; each body leaves threads (its own outline a moment ago)
    vec3 ink=mix(C2,C0,smoothstep(.1,.8,M));ink=mix(mix(ink,ink.gbr,.1+.1*lin)*tint,PC,pf);
    float tdy=tr.r>.01?tr.b/tr.r:.5;vec3 tc=mix(C2,C0,.35+.3*sin(tdy*6.2832))*tint;
    vec3 e=ink*body*(.06+.45*thick*thick)*opn+mix(C0,C1,.5)*tint*body*relF*.2+C1*Lm*rimL*1.2+C1*gran*body*.8
      +mix(C1,vec3(1.),.4)*(nuc*.12+Ln*.22+nol*.15)+C1*cil*.35+C0*tint*halo*.1*(1.-.5*body)+C2*Bw*.1+C1*cvr*body*.25
      +tc*(tr.r*(.2+.25*tr.r)+tr.g*.12)*(1.-body)*(1.-hol)+mix(C2,C1,.4)*lawn*.5+C1*deb*.2+C1*(cyw*.3+cyf*.05)+C2*chl*body*.6;
    col=vec3(.003,.006,.016)+e*lit+lg*vec3(.06,.07,.09);
    col=1.-exp(-col*1.8);
  }else if(pres<2.5){ // stained specimen on a backlit slide: what the stain absorbs
    vec2 nn=texture(NZ,uv*.625+.3).rg;float n1=nn.x,n2=nn.y;
    vec3 light=mix(vec3(.84,.8,.78),vec3(.98,.95,.88),1.-rad*1.4)*(1.-.35*rad*rad)+vec3(-.02,0.,.03)*cc.x;
    vec3 wash=C0*(.1*smoothstep(.4,.8,n1)+.04*n2+.07*fv*fv)+C0*.08*tr.r*(1.-body);
    vec3 ab=C0*(2.-tint)*body*(.22+.8*thick)*(1.+.3*lin)*opn+C0*body*pow(rel,1.3)*.3+C1*Lm*1.7+C0*gran*body*.5
      +C2*(nuc*1.5*(1.-.5*nol)+Ln*.8)+C1*cil*.4+C0*halo*.25*(1.-body)+C1*lawn*.5+vec3(.5,.45,.25)*deb*.7
      +vec3(.15,.8,.9)*pf*body*1.2+C1*cyw*.6+C2*chl*1.3;
    col=light*exp(-(ab+wash)*1.3)*(1.+.25*lg);
  }else if(pres<3.5){ // polarised light: interference colours from thickness, crossed polarisers
    float th=thick*1.5+rel*.3+dye*.35+.06*sin(t*.25)+LN.w+nuc*.3+pf*.4;
    vec3 e=hue(th)*body*(.08+.4*thick+.3*relF)*opn+hue(th+.3)*Lm*rimL*1.1+hue(th*2.+gran*3.)*gran*body*.9
      +hue(th+.5)*(Ln*.5+nol*.4)+hue(th+.15)*cil*.4+hue(th+.3)*halo*.2*(1.-body)+hue(lh*9.)*lawn*.7+vec3(.5)*deb*.08+vec3(.6)*cyw*.3+hue(th+.6)*chl*.5;
    col=vec3(.004,.005,.009)+e*lit;
    col+=vec3(.6,-.05,-.6)*dot(g,cc)*Lm;
    col=1.-exp(-max(col,0.)*1.5);
  }else if(pres<4.5){ // interference contrast: the gradient of thickness along the shear axis, as relief
    float dv=dot(g,sh)*2.3*(1.-.5*kf)-dot(zn,sh)*Ln*.5+gdip*body*.7+ldip*.5+bdip*.25+(cil-.25*cfr)*.35+cyw*.3+chd*.6;
    dv=dv/sqrt(1.+dv*dv);
    vec3 bg=C0*(1.+.08*(texture(NZ,uv*.625+.3).r-.5)+.12*dot(cc,sh))*(1.-.12*rad*rad);
    col=mix(bg,C1,max(dv,0.));col=mix(col,C2,max(-dv,0.));
    col*=mix(vec3(1.),min(mix(tint,PC,pf),1.),.6*body*thick)*(1.-.1*body*thick-.08*nuc)*(1.+.3*lg);
  }else{ // phase contrast: a mid-grey field, every body darker than it with a bright halo hugging its edge, granules black
    float hw=max(.9*ppc,4.),ho=(1.-body)*exp(-max(-d0,0.)/hw)*(1.-.5*kf);
    vec3 bg=C0*(1.+.06*(texture(NZ,uv*.625+.3).r-.5))*(1.-.18*rad*rad);
    col=bg*(1.-body*(.3+.4*thick)*opn*mix(vec3(1.),min(mix(tint,PC,pf),1.4),.25))-C0*(nuc*.25+Ln*.2)+C1*(ho*.45+Lm*.15+cvi*.2+lg*.2);
    col*=1.-.75*gran*body-.55*lawn-.35*deb-.4*cyw-.45*chl;
    col=mix(col,C2,.5*vac*body);
  }
  // the lens: field stop, dust on the eyepiece, scratches, sensor grain (fixed in the sensor, so it never crawls)
  float bright=pres>1.5&&pres<2.5||pres>3.5?1.:0.;
  if(LN.y>.5){
    vec2 dg=floor(su*9.),fr=fract(su*9.);float hh=h(dg+3.1);
    vec2 dp=vec2(h(dg+7.),h(dg+11.))*.6+.2;float sr=.03+.1*h(dg+5.),dd=length(fr-dp);
    float dust=hh>.5?(smoothstep(sr,sr*.3,dd)*.6+exp(-(dd-sr*.8)*(dd-sr*.8)/(sr*sr*.05))*.4)*(.4+.6*hh):0.;
    float sc=0.;for(int i=0;i<5;i++)sc+=exp(-pow(seg(su,SC[i].xy,SC[i].zw)*1000./1.1,2.))*.5;
    if(bright>.5)col*=1.-.22*dust-.16*sc;else col+=vec3(.5,.55,.6)*(.05*dust+.09*sc);
  }
  if(LN.x>.5){vec3 m=smoothstep(.492,.468,rad*vec3(1.004,1.,.996));col*=m;col+=vec3(.006,.008,.016)*smoothstep(.56,.49,rad)*(1.-m.g);}
  else col*=1.-.22*rad*rad;
  col+=(h(gl_FragCoord.xy)-.5)*.016;
  o=vec4(clamp(col,0.,1.),1.);
}`)(Ve,["pilgrims","tumblers","lanterns"].indexOf(u.name))),y=X((t=>`
uniform sampler2D F,TR,NZ,DS;uniform float N,SZ,t,pk;uniform vec4 LN,TP[4],MV,ZM${t?",OS[6],OD[10],OE[10],OB":""};uniform int nG,nTP${t?",nS,nD":""};out vec4 o;${t&4?`
vec2 dqf(vec2 q){vec2 k6=6.2832*q/N;return MV.xy+MV.z*vec2(-cos(k6.y+MV.w*.011)/.011,-sin(k6.x-MV.w*.008)/.008);}`:""}
float h(vec2 p){p=fract(p*vec2(.1031,.1030));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}
void main(){
  vec2 su=gl_FragCoord.xy/SZ,uv=ZM.xy+su*ZM.z,q=uv*N,sh=vec2(-.7071,.7071);float ppc=SZ/(N*ZM.z);
  float food=clamp(texture(F,uv).b,0.,1.);vec4 tr=texture(TR,uv);
  // a dropped cyst pushes the lawn aside round it
  float cyc=0.;
  for(int i=0;i<nTP;i++){float a=TP[i].z,on=step(0.,a)*step(a,3.),dl=length((uv-TP[i].xy)*N);
    float cr=(.8+.7*smoothstep(0.,1.1,a))*(1.-smoothstep(1.1,1.5,a));cyc+=on*smoothstep(cr+5.,cr+1.5,dl)*(1.-smoothstep(2.,3.,a));}
  cyc=min(cyc,1.);
  // the medium: bacteria as rods and dots in clouds that drift with the water (thick round flocs of debris, thin
  // elsewhere), lined up with the current; where a body grazed in the last half minute a clean lane, banked at its sides
  float lawn=0.,ldip=0.,lh=0.,deb=0.,bdip=0.,fv=food;
  vec2 k6=6.2832*q/N,dq=MV.xy+MV.z*vec2(-cos(k6.y+MV.w*.011)/.011,-sin(k6.x-MV.w*.008)/.008);
  vec2 mq=q-dq-texture(DS,uv).xy,sv=vec2(sin(k6.y+MV.w*.011),cos(k6.x-MV.w*.008));
  float mt=floor(LN.z*.1+.01),al=mt>.5?.75:0.;vec2 fd=mt>1.5?sv/max(length(sv),1e-3):vec2(cos(LN.z-10.),sin(LN.z-10.));
  vec2 sq=mq+fd*dot(mq,fd)*(-.55*al),bq=mq/16.,bi=floor(bq),bf=bq-bi;bi=mod(bi,N/16.);
  vec4 nzc=texture(NZ,sq*.007+.31);vec2 nf=texture(NZ,(bf*80.+bi*7.)/128.).ba;
${t?`  float ob=0.,orl=0.,bin=0.;
`:""}${t&1?`  {vec2 bp=q-MV.xy-OB.xy;bp-=N*floor(bp/N+.5);float r=length(bp),R=OB.z,dr=(r-R)*ppc,rw=max(.1*R*ppc,2.),rm=dr+.55*rw;vec2 bn=bp/max(r,1e-3);
    float rim=exp(-rm*rm/(rw*rw*.3))*(.85+.15*dot(bn,vec2(-.6,.8))),r2=(r-.8*R)*ppc/max(.08*ppc,1.1);
    ob+=rim+.28*exp(-r2*r2);orl+=rim*dot(bn,sh)*1.4;bin=smoothstep(-.4*rw,-1.4*rw,dr);}
`:""}  {
    float cl=nzc.r*.62+nzc.g*.38,cloud=smoothstep(.3,.78,cl);
    float bh=h(bi+91.),flo=step(.91,bh),b3=h(bi+3.);
    float br=mix(.06+.15*b3,.035+.06*b3,flo);
    vec2 bc=mix(.24+.52*vec2(h(bi+5.),h(bi+9.)),.42+.16*vec2(h(bi+5.),h(bi+9.)),flo),bv=bf-bc;float bl=length(bv);
    float near=flo*smoothstep(.4,.06,bl),lane=smoothstep(.07,.2,tr.a),bank=smoothstep(.015,.05,tr.a)*(1.-lane);
    float dens=(.04+.75*cloud*cloud+.9*near*near)*(1.-.94*lane)*(1.+1.6*bank)*(.35+.65*fv)*(1.-cyc)${t&1?"*(1.-bin)":""};
    vec2 lq=mq*2.;float lk=2.;
    for(int i=0;i<nG;i++){vec2 li=floor(lq),lf=lq-li;li=mod(li,lk*N);float hh=h(li+41.+float(i)*13.),h2=h(li+5.3);
      float rr=.025+.075*h2*h2*h2,ed=rr*4.6+.02;
      vec2 lc=ed+(1.-2.*ed)*vec2(h(li+13.),h(li+29.))+.02*vec2(sin(t*(2.+hh*3.)+hh*50.),cos(t*(1.7+hh*2.)+hh*23.));
      vec2 ld=lf-lc,ax=normalize(mix(vec2(cos(hh*37.),sin(hh*37.)),fd,al*step(.3,fract(hh*5.)))+vec2(1e-4,0.));
      vec2 lr=vec2(ax.x*ld.x+ax.y*ld.y,-ax.y*ld.x+ax.x*ld.y);
      float lrp=rr*ppc/lk,lpx=(length(vec2(max(abs(lr.x)-rr*(2.2+1.3*al),0.),lr.y))-rr)*ppc/lk;
      float cv=clamp(.5-lpx/1.2,0.,1.)*step(hh,dens*.5)*min(1.,lrp*2.5+.15)*(.35+.65*h2);
      lawn+=cv;ldip+=cv*clamp(dot(ld,sh)/(rr*2.),-1.,1.);lh+=hh*cv;
      lq=lq*.5+.37;lk*=.5;}
    float bd=(bl-br-flo*(nf.x-.5)*.06)*16.*ppc,bs=mix(br*16.*ppc*.35+1.,max(.06*ppc,.8),flo);
    deb=step(.8,bh)*mix(smoothstep(bs,-bs,bd)*.3+exp(-(bd+bs*.6)*(bd+bs*.6)/(bs*bs*.3))*.18,smoothstep(bs,-bs,bd)*(.4+.6*nf.y),flo);
    bdip=deb*clamp(dot(bv,sh)/br,-1.,1.);
  }
${t?`  float ww=max(.09*ppc,.9);
`:""}${t&2?`  for(int i=0;i<nS;i++){vec4 A=OS[i*3],B=OS[i*3+1],C=OS[i*3+2];vec2 sp=q-MV.xy-.35*(dq-MV.xy)-texture(DS,uv).xy-A.xy,nv=vec2(-A.w,A.z);
    float s=dot(sp,A.zw),n=dot(sp,nv)-B.z*sin(s*B.w+C.x)-C.y*sin(s*C.z+C.w),sl=B.z*B.w*cos(s*B.w+C.x)+C.y*C.z*cos(s*C.z+C.w);
    n*=inversesqrt(1.+sl*sl);vec2 nw=normalize(nv-A.zw*sl);
    float hw0=B.x*.5,u=s/B.y,ci=floor(u),uf=u-ci,ue=min(uf,1.-uf)*B.y,hc=h(vec2(ci,A.x+3.));
    float hw=hw0*(1.-.13*exp(-ue*ue/(hw0*hw0*.4))+.035*sin(3.1416*uf)),side=n>0.?1.:-1.,npx=(abs(n)-hw)*ppc;
    float ins=smoothstep(.8,-.8,npx),wall=exp(-npx*npx/(ww*ww))*(.62+.38*side*dot(nw,vec2(-.6,.8)))*(.85+.15*sin(s*1.3+hc*9.));
    float endw=exp(-ue*ue*ppc*ppc/(ww*ww))*ins*.5;
    float pP=(1.9+.9*hc)*B.x,ph=6.2832*s/pP+hc*6.2832,cp=cos(ph),nb=hw*.75*sin(ph),bs=hw*.75*6.2832/pP*cp,bd=(n-nb)*ppc*inversesqrt(1.+bs*bs),bw=max(.2*B.x*ppc,1.2);
    float band=exp(-bd*bd/(bw*bw))*ins*(cp>0.?.3:.1)*smoothstep(0.,.3*B.x,ue);
    ob+=wall*.85+endw+band+.1*ins;orl+=wall*side*(.8+1.*dot(nw,sh))+band*.25*clamp((n-nb)*ppc/bw,-1.,1.);}
`:""}${t&4?`  for(int i=0;i<nD;i++){vec4 A=OD[i],B=OE[i];vec2 p=q-A.xy-dqf(A.xy)-texture(DS,A.xy/N).xy;p-=N*floor(p/N+.5);
    vec2 pr=vec2(dot(p,A.zw),dot(p,vec2(-A.w,A.z)));float a=B.x,b=B.y,dpx,rib=0.,mid=0.;vec2 nr;
    if(B.z<.5){float xa=pr.x/a,tp=1.-.3*xa*xa,ya=pr.y/(b*tp),e=length(vec2(xa,ya));vec2 ge=vec2(xa/a,ya/(b*tp));
      dpx=(e-1.)*e/max(length(ge),1e-4)*ppc;nr=normalize(A.zw*ge.x+vec2(-A.w,A.z)*ge.y+1e-6);
      float pt=max(b*.5,.18),rx=pr.x+.35*pr.y*xa;
      rib=pow(.5+.5*cos(6.2832*rx/pt),4.)*smoothstep(.15,.4,abs(ya))*smoothstep(1.,.75,e)*smoothstep(3.,5.,pt*ppc)*(.7+.3*h(vec2(floor(rx/pt),B.w*50.)));
      mid=exp(-pr.y*pr.y*ppc*ppc/(ww*ww*.5))*smoothstep(.9,.78,abs(xa))*smoothstep(.05,.12,abs(xa))*.45+.3*exp(-(xa*xa*30.+ya*ya*3.));}
    else{float r=length(pr);dpx=(r-a)*ppc;nr=p/max(r,1e-4);float ca=acos(clamp(pr.x/max(r,1e-4),-1.,1.))*(pr.y<0.?-1.:1.),nk=floor(20.+B.w*10.);
      rib=pow(.5+.5*cos(ca*nk),4.)*smoothstep(.25*a,.45*a,r)*smoothstep(a,.85*a,r)*smoothstep(3.,5.,6.2832*r*ppc/nk);
      float r3=(r-.55*a)*ppc/ww;mid=.3*exp(-r3*r3);}
    float ins=smoothstep(.8,-.8,dpx),edge=exp(-dpx*dpx/(ww*ww))*(.65+.35*dot(nr,vec2(-.6,.8)));
    ob+=edge*.95+rib*.3*ins+mid*ins+.07*ins;orl+=edge*dot(nr,sh)*1.2+rib*.2*ins;}
`:""}${t?`  deb=min(deb+ob,1.);bdip=clamp(bdip+orl*.6,-1.,1.);ldip+=orl;
`:""}  o=vec4(lawn*.5,deb,pk>3.5&&pk<4.5?ldip*.25+.5:lh*.5,bdip*.5+.5);
}`)((I==="bubble"?1:0)|(I.startsWith("strand")?2:0)|(I.endsWith("diatoms")?4:0))),F0=X(`
uniform sampler2D F;uniform float N;uniform int nI;out vec4 o;
vec4 bl(vec2 q,float l){float s=exp2(l),n=N/s;q=q/s-.5;vec2 i=floor(q),f=q-i,f2=f*f,f3=f2*f;
  vec2 w0=(1.-3.*f+3.*f2-f3)/6.,w1=(4.-6.*f2+3.*f3)/6.,w2=(1.+3.*f+3.*f2-3.*f3)/6.,w3=f3/6.;
  vec2 g0=w0+w1,g1=w2+w3,p0=(i-.5+w1/g0)/n,p1=(i+1.5+w3/g1)/n;
  return g0.y*(g0.x*textureLod(F,vec2(p0.x,p0.y),l)+g1.x*textureLod(F,vec2(p1.x,p0.y),l))+g1.y*(g0.x*textureLod(F,vec2(p0.x,p1.y),l)+g1.x*textureLod(F,vec2(p1.x,p1.y),l));}
void main(){vec2 p=gl_FragCoord.xy,gd=vec2(0.);float bc=0.,hv=0.;
  for(int i=0;i<nI;i++){float a=float(i==1)-float(i==2),b=float(i==3)-float(i==4);vec4 v=bl(p+vec2(a,b)*2.,i<5?3.:1.);float m=v.r+v.g;
    if(i==0)bc=m;if(i==5)hv=m;else gd+=vec2(a,b)*m;}
  o=vec4(-gd/4./(bc+.004)*42.,bc,hv);}`),d0=X(`
uniform sampler2D DS;uniform vec4 ST;uniform float N,k;out vec4 o;
void main(){vec2 p=gl_FragCoord.xy,d=p-ST.xy;d-=N*floor(d/N+.5);float w=exp(-dot(d,d)/500.);
  o=vec4(texture(DS,(p-ST.zw*w)/N).xy*k+ST.zw*w,0.,1.);}`);if(e.flush(),[w,D].forEach(Ue),!w.mrt){const t=B(1,1,t0,e.RGBA,o0,null,e.NEAREST,e.CLAMP_TO_EDGE),o=B(1,1,t0,e.RGBA,o0,null,e.NEAREST,e.CLAMP_TO_EDGE);e.bindTexture(e.TEXTURE_2D,null);const a=Y(t,o);e.bindVertexArray(ze),e.viewport(0,0,1,1),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]);for(const r of[w,D])e.useProgram(r.p),e.drawArrays(e.TRIANGLES,0,3),r.mrt=1;e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(a),e.deleteTexture(t),e.deleteTexture(o)}[V0,n0,j0,v,y,F0,d0].forEach(Ue);const W0=u.food||[.2,.01,.15,.15],H=I0==="still"?0:I0==="drifting current"?1:2,L0=x()*6.2832,be=H===1?.05:H===2?.06:0,zt=(u.speed||.13)*(f0==="spinning"?.7:1),Gt=u.wander||.5,Ot=(f0==="spinning"?.9:u.spin||0)*(x()<.5?-1:1),je=new Float32Array(20);for(let t=0;t<5;t++){const o=x(),a=x(),r=x()*3.14,c=.1+x()*.4;je.set([o,a,o+Math.cos(r)*c,a+Math.sin(r)*c],t*4)}const Q=new Float32Array(16).fill(-1),z=[];let we=0;const $0=()=>(we++,j==="crimson strain"?we%3===0?.85:.1+x()*.3:j==="twin lineages"?we%2?.2:.8:.15+x()*.7),ye=(t,o,a=0)=>{u.soup?z.push([t,o,0,ue*1.3,1,$0(),.8,x()*6.2832,a,99]):z.push([t,o,x()*6.2832,1,0,$0(),1,x()*6.2832,a,99])},Y0=s*(.4+W()*.2),K0=s*(.4+W()*.2),i0=W()*6.2832,qt=W()<.5?-1:1;{const t=Math.ceil(Math.sqrt($)),o=[];for(let a=0;a<t*t;a++)o.push(a);for(let a=o.length-1;a>0;a--){const r=Math.floor(x()*(a+1));[o[a],o[r]]=[o[r],o[a]]}for(let a=0;a<$;a++){const r=o[a];ye((r%t+.2+x()*.6)/t*s,(Math.floor(r/t)+.2+x()*.6)/t*s)}for(let a=0;a<$&&U!=="scattered";a++){const r=z[a];let c,l,n;if(U==="colony"){const i=13*Math.sqrt(a+.6),d=a*2.39996+i0;c=Y0+Math.cos(d)*i,l=K0+Math.sin(d)*i,n=d+(W()-.5)*.8}else if(U==="procession"){const i=Math.ceil($*26/(s*.85)),d=Math.ceil($/i),h=(a%d-(d-1)/2)*26,p=(Math.floor(a/d)-(i-1)/2)*30+(W()-.5)*6;c=Y0+Math.cos(i0)*h-Math.sin(i0)*p,l=K0+Math.sin(i0)*h+Math.cos(i0)*p,n=i0+(W()-.5)*.5}else{const i=Math.max(26,Math.min(s*.36,$*23/6.2832)),d=i0+a/$*6.2832;c=Y0+Math.cos(d)*i,l=K0+Math.sin(d)*i,n=d+qt*1.5708}r[0]=(c%s+s)%s,r[1]=(l%s+s)%s,r[7]=n}if(Z0)for(let a=0;a<2;a++)ye(x()*s,x()*s,1)}const T=F==="single cell"?.2:F==="high power"?.58:F==="oil immersion"?.4:.8,We=F==="low power"&&U==="scattered",$e=U==="scattered"||U==="milling ring"&&F!=="low power";let N=(We?.5:($e?z[0][0]:Y0)/s)-T/2,_=(We?.5:($e?z[0][1]:K0)/s)-T/2;const Q0=F==="single cell"||F==="oil immersion";F==="single cell"&&(N=z[0][0]/s-T/2,_=z[0][1]/s-T/2);let G=N+T/2,O=_+T/2,P0=G,C0=O;const J0=(t,o)=>t-Math.round(t-o-T/2);let Te=!1,ee=0,te=0,oe=0,Ye=0;const Ke=()=>{for(;z.length;){Te=!1;const t=z.splice(0,8),o=new Float32Array(32),a=new Float32Array(32),r=new Float32Array(32);t.forEach((c,l)=>{o.set([c[0],c[1],c[2],c[3]],l*4),a.set([c[4],c[5],c[6],c[3]],l*4),r.set([c[7],c[8],c[9],0],l*4)}),e.useProgram(D.p),e.bindFramebuffer(e.FRAMEBUFFER,Oe[1-A]),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]),e.viewport(0,0,s,s),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,K[A]),e.uniform1i(D.u.F,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,xe[A]),e.uniform1i(D.u.H,1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Lt),e.uniform1i(D.u.PT,2),e.uniform4fv(D.u.SP,o),e.uniform4fv(D.u.SQ,a),e.uniform4fv(D.u.SH,r),e.uniform1i(D.u.nS,t.length),e.uniform1f(D.u.N,s),e.uniform1f(D.u.PS,r0),e.drawArrays(e.TRIANGLES,0,3),A=1-A}};let p0=[0,0,0,0],D0=[0,0],N0=0,_0=0;const It=(t,o)=>{e.useProgram(d0.p),e.bindFramebuffer(e.FRAMEBUFFER,_t[1-N0]),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.viewport(0,0,s,s),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,ge[N0]),e.uniform1i(d0.u.DS,0),e.uniform4f(d0.u.ST,t[0],t[1],t[2],t[3]),e.uniform1f(d0.u.N,s),e.uniform1f(d0.u.k,o),e.drawArrays(e.TRIANGLES,0,3),N0=1-N0},Qe=()=>{e.useProgram(w.p),e.bindFramebuffer(e.FRAMEBUFFER,Oe[1-A]),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]),e.viewport(0,0,s,s),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,K[A]),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,xe[A]),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ft),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,He),me(w)&&(e.uniform1i(w.u.F,0),e.uniform1i(w.u.H,1),e.uniform1i(w.u.T,2),e.uniform1i(w.u.D,3),e.uniform4f(w.u.TC,u.tc||1.3,u.tth||.17,0,0),e.uniform1i(w.u.nT,qe),e.uniform1f(w.u.N,s),e.uniform1f(w.u.dt,.1),e.uniform1f(w.u.SR,900),e.uniform4f(w.u.G1,u.m,u.s,u.hunger||.05,0),e.uniform4f(w.u.FD,W0[0],W0[1],W0[2],W0[3]),e.uniform4f(w.u.MO,zt,Gt,Ot,u.dm||0),e.uniform4f(w.u.GA,f0==="spinning"?1:f0==="darting"?2:0,.014,0,0),e.uniform4f(w.u.PR,Z0?1:0,u.eat||.06,1.6,2.2)),e.uniform1f(w.u.crowd,te),e.uniform1f(w.u.tm,Ye),e.uniform4f(w.u.ST,p0[0],p0[1],p0[2],p0[3]),e.uniform4f(w.u.LI,D0[0],D0[1],62,oe*(u.light||1)*.5),e.uniform4f(w.u.MD,H,be,ee,L0),e.drawArrays(e.TRIANGLES,0,3),A=1-A,ee++,Ye+=.011},Ee=()=>{e.useProgram(V0.p),e.bindFramebuffer(e.FRAMEBUFFER,Pt),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.viewport(0,0,M0,M0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,K[A]),e.uniform1i(V0.u.F,0),e.uniform1f(V0.u.B,s/M0),e.drawArrays(e.TRIANGLES,0,3)},Je=(t,o,a)=>{e.useProgram(n0.p),e.bindFramebuffer(e.FRAMEBUFFER,At[1-R0]),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.viewport(0,0,s,s),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,K[A]),e.uniform1i(n0.u.F,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,ve[R0]),e.uniform1i(n0.u.TR,1),e.uniform1f(n0.u.k,t),e.uniform1f(n0.u.k2,o),e.uniform1f(n0.u.D,Math.min(.8,a*.16)),e.drawArrays(e.TRIANGLES,0,3),R0=1-R0},et=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(ze)};let k0=0,re=0,tt=0,ot=0,Re=.5,B0=0,Me=.5,Se=.5;const ne=new Int16Array(f*f),ie=new Int16Array(f*f),h0=new Uint8Array(f*f),rt=new Uint8Array(f*f),nt=()=>{e.useProgram(j0.p),e.bindFramebuffer(e.FRAMEBUFFER,Dt),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.viewport(0,0,f,f),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,K[A]),e.uniform1i(j0.u.F,0),e.uniform1f(j0.u.B,s/f),e.drawArrays(e.TRIANGLES,0,3)},it=()=>{let t=0,o=0,a=0,r=0,c=0;rt.set(h0);for(let i=0;i<f*f;i++){const d=c0[i*4]/255;t+=d,o+=c0[i*4+1]/255,h0[i]=d>.12?1:0,a+=Math.abs(h0[i]-rt[i]);const h=i%f/f*6.2832;r+=d*Math.cos(h),c+=d*Math.sin(h)}re=t/(f*f)/4,tt=o/(f*f)/4,ot=a,Re=(Math.atan2(c,r)/6.2832+1)%1;const l=new Uint8Array(f*f);let n=0;B0=0;for(let i=0;i<f*f;i++)if(h0[i]&&!l[i]){n++;const d=[i];l[i]=1,ne[i]=i%f,ie[i]=i/f|0;let h=0,p=0,m=0;for(;d.length;){const g=d.pop(),S=g%f,k=g/f|0,P=c0[g*4]/255;h+=P,p+=P*ne[g],m+=P*ie[g];for(const[O0,pe]of[[1,0],[-1,0],[0,1],[0,-1]]){const Z=(k+pe+f)%f*f+(S+O0+f)%f;h0[Z]&&!l[Z]&&(l[Z]=1,ne[Z]=ne[g]+O0,ie[Z]=ie[g]+pe,d.push(Z))}}h>B0&&(B0=h,Me=(p/h+.5)/f,Se=(m/h+.5)/f)}return n},at=()=>(nt(),e.readPixels(0,0,f,f,e.RGBA,e.UNSIGNED_BYTE,c0),it());let U0=null,ae=null,fe=-1;const Xt=()=>{nt(),U0=e.createBuffer(),e.bindBuffer(e.PIXEL_PACK_BUFFER,U0),e.bufferData(e.PIXEL_PACK_BUFFER,f*f*4,e.STREAM_READ),e.readPixels(0,0,f,f,e.RGBA,e.UNSIGNED_BYTE,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),ae=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0)},Ht=()=>(e.getSyncParameter(ae,e.SYNC_STATUS),e.bindBuffer(e.PIXEL_PACK_BUFFER,U0),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,c0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.deleteBuffer(U0),e.deleteSync(ae),U0=ae=null,it());let ft=.5;const st=t=>{e.bindTexture(e.TEXTURE_2D,K[A]),e.generateMipmap(e.TEXTURE_2D),Ee(),Te=!0,e.useProgram(F0.p),e.bindFramebuffer(e.FRAMEBUFFER,Nt),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.viewport(0,0,s,s),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,K[A]),e.uniform1i(F0.u.F,0),e.uniform1f(F0.u.N,s),e.uniform1i(F0.u.nI,6),e.drawArrays(e.TRIANGLES,0,3);const o=H===1?be*.8*ee:0,a=Math.cos(L0)*o%s,r=Math.sin(L0)*o%s,c=H===2?be:0,l=ee%6283185;if(e.useProgram(y.p),e.bindFramebuffer(e.FRAMEBUFFER,Ut),e.viewport(0,0,S0,S0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,ve[R0]),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,kt),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,ge[N0]),me(y)&&(e.uniform1i(y.u.F,0),e.uniform1i(y.u.TR,1),e.uniform1i(y.u.NZ,3),e.uniform1i(y.u.DS,4),e.uniform1i(y.u.nTP,4),e.uniform1i(y.u.nG,2),e.uniform1f(y.u.N,s),e.uniform1f(y.u.SZ,S0),e.uniform1f(y.u.pk,Ve),e.uniform4f(y.u.LN,0,0,H===0?0:H===1?10+L0:20,0),I!=="none"&&(e.uniform4fv(y.u.OS||null,ct),e.uniform4fv(y.u.OD||null,lt),e.uniform4fv(y.u.OE||null,dt),e.uniform4fv(y.u.OB||null,pt),e.uniform1i(y.u.nS||null,Fe),e.uniform1i(y.u.nD||null,se))),e.uniform4f(y.u.ZM,N,_,T,0),e.uniform1f(y.u.t,t),e.uniform4f(y.u.MV,a,r,c,l),e.uniform4fv(y.u.TP,Q),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(v.p),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,v0,v0),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ze),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Bt),me(v)){e.uniform1i(v.u.LW,4),e.uniform1f(v.u.LSC,S0/v0),e.uniform1i(v.u.F,0),e.uniform1i(v.u.TR,1),e.uniform1i(v.u.SS,2),e.uniform1i(v.u.NZ,3),e.uniform1i(v.u.nTP,4),e.uniform1f(v.u.N,s),e.uniform1f(v.u.SZ,v0),e.uniform4fv(v.u.SPR,wt[u.name]||[0,0,2,1.5]);const n=u.name;e.uniform4f(v.u.SPX,q0.indexOf(u),n==="tumblers"?1:0,n==="drifters"?1.5:1,F==="single cell"?0:1),e.uniform4f(v.u.SPY,n==="pilgrims"?1:0,n==="tumblers"?1:0,n==="lanterns"?1:0,n==="drifters"?.7:1),e.uniform1i(v.u.nG,2),e.uniform1i(v.u.nC,(T>.7?6:T>.3?7:8)-(u.name==="tumblers"?1:0)),e.uniform1f(v.u.mut,j==="crimson strain"?1:j==="twin lineages"?2:0),e.uniform3fv(v.u.C0,a0[1]),e.uniform3fv(v.u.C1,a0[2]),e.uniform3fv(v.u.C2,a0[3]),e.uniform4f(v.u.LN,X0==="clean"?0:1,X0==="dusty slide"?1:0,H===0?0:H===1?10+L0:20,a0[0]==="second order"?.5:0),e.uniform4fv(v.u.SC,je),e.uniform4f(v.u.ZM,N,_,T,0)}(Q0||Ae)&&e.uniform4f(v.u.ZM,N,_,T,0),e.uniform1f(v.u.t,t),e.uniform1f(v.u.foc,ft),e.uniform4f(v.u.LI,D0[0]/s,D0[1]/s,.16,oe*.8),e.uniform4fv(v.u.TP,Q),e.drawArrays(e.TRIANGLES,0,3)};et(),Ke();for(let t=0;t<(u.warm||40);t++)t%6===0&&Ee(),Qe(),t%4===3&&Je(.9,.985,4);k0=at();const Ae=F==="low power";Ae&&U==="scattered"&&B0>0&&(G=E.home?.83:Me,O=E.home?.84:Se,N=G-T/2,_=O-T/2);let z0=0,G0=0;const ct=new Float32Array(24),lt=new Float32Array(40),dt=new Float32Array(40),pt=new Float32Array(4);let Fe=0,se=0;{const t=G*s,o=O*s,a=T*s,r=()=>{const n=b()*Math.PI,i=Math.cos(n),d=Math.sin(n),h=(b()-.5)*.5*a,p=1.2+b()*.4,m=p*(3+b()),g=(.03+b()*.05)*a,S=6.2832/((.9+b()*.9)*a),k=g*(.2+b()*.3),P=S*(2.3+b());ct.set([t-d*h,o+i*h,i,d,p,m,g,S,b()*6.2832,k,P,b()*6.2832],Fe*12),Fe++},c=()=>{const n=4+Math.floor(b()*6),i=b()<.5?2:1;for(let d=0;d<n+i;d++){const h=d>=n,p=t+(b()-.5)*1.05*a,m=o+(b()-.5)*1.05*a,g=b()*6.2832,S=6+b()*6,k=6+b()*4,P=1.2+b()*.8;lt.set([p,m,Math.cos(g),Math.sin(g)],se*4),dt.set(h?[P,P,1,b()]:[S/2,S/2/k,0,b()],se*4),se++}},l=()=>{const n=8+b()*5,i=b()*6.2832,d=.46*a-.9*n+b()*.9*n;pt.set([t+Math.cos(i)*d,o+Math.sin(i)*d,n,1])};(I==="strand"||I==="strand and diatoms")&&(r(),b()<.25&&r()),(I==="diatoms"||I==="strand and diatoms")&&c(),I==="bubble"&&l()}st(0);const L=E.input,u0=E.sound,J=[0,2,4,7,9,12,14,16,19,21],m0=45+Math.floor(x()*7);let Le=0,Pe=0,ce=0,ht=0,R=null,ut=!1,mt=0,xt=0,le=3;const x0=[],vt=(t,o)=>{if(Q0){const r=P0*f-.5,c=C0*f-.5;let l=0,n=0,i=0,d=0,h=-1;for(let p=0;p<f*f;p++){const m=c0[p*4]/255;m>d&&(d=m,h=p);let g=p%f-r,S=(p/f|0)-c;g-=Math.round(g/f)*f,S-=Math.round(S/f)*f,g*g+S*S<5&&(l+=m,n+=m*g,i+=m*S)}if(l>.4)P0+=n/l/f,C0+=i/l/f;else if(h>=0){const p=(h%f+.5)/f,m=((h/f|0)+.5)/f;P0=p+Math.round(P0-p),C0=m+Math.round(C0-m)}}if(o>k0&&k0>0&&u0.hit("blip",.22,{freq:440*Math.pow(2,(m0+24+J[o*3%J.length]-69)/12),pan:Re*2-1}),o<k0&&u0.note(m0+J[o%5],{dur:1.5,vel:.18,wave:"sine",cutoff:700}),k0=o,o<Math.max(2,Math.round($*.8))&&t-ce>(q==="sparse"?.7:1.4)&&x0.length<(q==="sparse"?3:2)){ce=t;let r=-1,c=-1;for(let i=0;i<12;i++){const d=Math.floor(x()*f*f);let h=99;for(let p=0;p<f*f;p++)if(h0[p]){let m=Math.abs(p%f-d%f),g=Math.abs((p/f|0)-(d/f|0));m=Math.min(m,f-m),g=Math.min(g,f-g),h=Math.min(h,m*m+g*g)}h>c&&(c=h,r=d)}const l=(r%f+.5)/f*s,n=((r/f|0)+.5)/f*s;x0.push({x:l,y:n,a:x()*6.2832,h:x()*6.2832,dye:$0(),t0:t}),Q.copyWithin(4,0,12),Q.set([J0(l/s,N),J0(n/s,_),0,0],0),u0.note(m0+19+J[Math.floor(x()*5)],{dur:1.4,vel:.12,wave:"sine",pan:l/s*2-1,cutoff:1400})}Z0&&tt<.0015&&t-ce>3&&(ce=t,ye(x()*s,2,1));const a=u.maxMass||.09;te=re>a?Math.min(u.maxCrowd||.12,te+(u.crowdRate||.01)):Math.max(0,te*.8-.002)},Ce=t=>{t>ht&&(le=Math.max(0,Math.min(J.length-1,le+(x()<.5?-1:1)+Math.round((re*40-2)*.2))),u0.note(m0+12+J[le],{dur:3,vel:.12+Math.min(.2,re*3),wave:"sine",pan:Re*2-1,cutoff:900,attack:.4}),x()<.4&&u0.note(m0+J[le%5],{dur:3.5,vel:.1,wave:"triangle",cutoff:500,attack:.6}),ht=t+1.6-Math.min(1,ot/40))},de=(t,o)=>[(N+t*T)*s,(_+(1-o)*T)*s];return(t,o)=>{if(et(),fe>=0){const n=fe;fe=-1,vt(n,Ht()),Ce(n)}ft=.5+.12*Math.sin(t*.23)+.05*Math.sin(t*.61);const a=L.taps();for(const n of a)R={x:n.x,y:n.y,t0:t,mode:"pending"};let r=[0,0,0,0];if(R)if(L.down){const n=Math.hypot(L.x-R.x,L.y-R.y);R.mode==="pending"&&n>.025&&(R.mode="drag"),R.mode==="pending"&&t-R.t0>.3&&(R.mode="light")}else{if(R.mode==="pending"){const[n,i]=de(R.x,R.y);x0.push({x:n,y:i,a:x()*6.2832,h:x()*6.2832,dye:$0(),t0:t+1.2}),Q.copyWithin(4,0,12),Q.set([N+R.x*T,_+(1-R.y)*T,0,0],0),u0.note(m0+24+J[Math.floor(x()*5)],{dur:1.2,vel:.35,wave:"sine",pan:R.x*2-1})}R=null}for(let n=x0.length-1;n>=0;n--){const i=x0[n];if(t<i.t0)continue;const d=Math.min(1,(t-i.t0)/.9);z.push([i.x,i.y,i.a,1,0,i.dye,1,i.h,0,2+d*14]),d>=1&&x0.splice(n,1)}const c=R&&R.mode==="light"&&L.down;if(oe+=((c?1:0)-oe)*Math.min(1,o*4),L.down&&(D0=de(L.x,L.y)),L.down&&ut&&(!R||R.mode==="drag")){const[n,i]=de(mt,xt),[d,h]=de(L.x,L.y);r=[d,h,d-n,h-i]}ut=L.down,mt=L.x,xt=L.y;for(let n=0;n<4;n++)Q[n*4+2]>=0&&(Q[n*4+2]+=o);Le+=Math.min(o,.2)*90;let l=Math.min(9,Math.floor(Le));if(Le-=l,l>0&&r[2]*r[2]+r[3]*r[3]>0){const n=2.2/l,i=Math.hypot(r[2],r[3])*n,d=i>2.2?2.2/i:1;p0=[r[0],r[1],r[2]*n*d,r[3]*n*d]}else p0=[0,0,0,0];Ke(),Te||Ee();for(let n=0;n<l;n++)Qe();if(l>0&&Je(Math.exp(-l/90/3.5),Math.exp(-l/90/(E0?12:3.5)),l),Pe+=Math.max(1,Math.round(Math.min(o,.2)*300)),Pe>=60?(Pe-=60,Q0?(vt(t,at()),Ce(t)):(Xt(),fe=t)):Ce(t),Q0){const n=Math.min(1,Math.min(o,.2)*2.5);G+=(P0-G)*n,O+=(C0-O)*n,N=G-T/2,_=O-T/2}else if(Ae&&B0>0){const n=Math.min(o,.2),i=J0(Me,N)-G,d=J0(Se,_)-O,h=Math.hypot(i,d),p=Math.max(0,h-.06)/(h+1e-6)*.5;z0+=(i*p-z0)*Math.min(1,n*1.2),G0+=(d*p-G0)*Math.min(1,n*1.2);const m=Math.hypot(z0,G0);m>.03&&(z0*=.03/m,G0*=.03/m),G+=z0*n,O+=G0*n,N=G-T/2,_=O-T/2}if(E0&&(_0>0||r[2]*r[2]+r[3]*r[3]>0)){const n=Math.hypot(r[2],r[3]),i=n>6?6/n:1;n>0?_0=40:_0=Math.max(0,_0-o),It([r[0],r[1],r[2]*i*.9,r[3]*i*.9],_0>0?Math.exp(-Math.min(o,.2)/9):0)}st(t)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
