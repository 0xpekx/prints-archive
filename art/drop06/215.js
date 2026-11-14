// Mirror Flask: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/215.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(St){St&&function(){const Ft=new WeakMap;St.add({num:215,name:"Mirror Flask",fam:"Worlds",recipe:"A flask of silvering solution in a warm water bath. The metal grows on the glass wherever the liquid has touched, until the flask reflects the lab around it. The metal and the flask shape change every mint. Drag to swirl the liquid higher up the glass, hold to warm the bath, or tap a finished flask to pour in acid that eats the coat away in clear windows, and it starts again.",interactive:"Drag to swirl the flask and carry the liquid up the glass, hold to warm the bath and speed the reaction, tap a finished flask to pour in acid, which eats the silver away in clear windows that spread and join, and start again with a fresh charge",music:!0,gl:!0,fps:30,seed:0,make(p){const e=p.gl;let l0=0;const At=p.hash.slice(2);for(let t=0;t<At.length;t+=8)l0=Math.imul(l0,31)+parseInt(At.slice(t,t+8),16)|0;let m0=l0>>>0;const Se=()=>{m0=m0+1831565813|0;let t=Math.imul(m0^m0>>>15,1|m0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},X=(t,o)=>t+(o-t)*Se(),le=(t,o,a)=>{let r=0;for(const i of o)r+=i[1];let n=Se()*r,f=o[0][0];for(const i of o)if(n-=i[1],n<=0){f=i[0];break}return p.home&&(f=a),p.trait(t,f),f},me=le("Flask",[["Round",62],["Pear",24],["Conical",14]],"Round"),S0=le("Fill",[["Half",24],["Two Thirds",56],["Brimming",20]],"Two Thirds"),ae=le("Reducer",[["Glucose",55],["Formalin",31],["Rochelle Salt",14]],"Glucose"),Fe=le("Metal",[["Silver",87],["Gold",8],["Copper",5]],"Silver"),Lt=le("Glass",[["Clean",74],["Greasy",18],["Etched",8]],"Clean"),k=le("Weather",[["Overcast",52],["Bright Haze",28],["Low Sun",13],["Snow",7]],"Overcast"),re=le("Room",[["Three Bays",52],["Two Bays",34],["Skylight",14]],"Three Bays"),Ae=le("Bath",[["Graniteware",50],["Steel",26],["White Enamel",14],["Copper",10]],"Graniteware");let Oe=le("Angle",[["Level",54],["Low",26],["Over",20]],"Level"),v0=l0^739982445|0;const ve=()=>{v0=v0+1831565813|0;let t=Math.imul(v0^v0>>>15,1|v0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},zt=ve(),Ro=ve(),la=ve(),j0=Ro<.5?-1:1,Eo=ve(),Po=ve(),F0=!p.home&&zt>=.26&&zt<.36&&(Ae==="Graniteware"||Ae==="Copper");F0&&(Oe="Over the neck",p.trait("Angle",Oe));const Mo=ve(),So=ve(),Fo=ve(),ma=ve(),Q0=(t,o,a,r)=>{let n=0;for(const m of o)n+=m[1];let f=a*n,i=o[0][0];for(const m of o)if(f-=m[1],f<=0){i=m[0];break}return p.home?r:i};let Z=Q0("Side",[["Shelf wall",52],["From the windows",24],["Against the light",24]],Mo,"Shelf wall");(F0||Z==="Against the light"&&re==="Skylight")&&(Z="Shelf wall");const J0=Q0("Hour",[["Day",80],["Lamps on",20]],So,"Day");J0==="Lamps on"&&Z==="Against the light"&&(Z="From the windows");let et=Q0("Stage",[["Growing",76],["Finished",24]],Fo,"Growing");Fe==="Gold"&&!p.home&&(et="Finished"),p.trait("Side",Z),p.trait("Hour",J0),p.trait("Stage",et);const H=J0==="Lamps on",A0=et==="Finished",h=me==="Conical"?.082:me==="Pear"?.066:.075,tt=me==="Pear"?X(.016,.019):X(.019,.024),ot=.34,B=me==="Conical"?.042:me==="Pear"?.04:.05,L0=(t,o,a)=>{const r=Math.max(a-Math.abs(t-o),0)/a;return Math.min(t,o)-r*r*a*.25},Ao=(t,o,a,r)=>{const n=Math.abs(t)-a,f=Math.abs(o)-r;return Math.hypot(Math.max(n,0),Math.max(f,0))+Math.min(Math.max(n,f),0)},de=me==="Conical"?2:me==="Pear"?1:0,Nt=(t,o)=>{const a=Ao(t,o-ot*.5,tt,ot*.5);if(de===0)return L0(Math.hypot(t,o)-h,a,.018);if(de===1)return L0(L0(Math.hypot(t,o)-h,Math.hypot(t,o-.78*h)-.5*h,.07),a,.03);const r=.075,n=h*1.08,f=tt,i=o-0,m=f,E=r,P=f-n,I=2*r,Ge=t-Math.min(t,i<0?n:f),pe=Math.abs(i)-r,be=Math.max(0,Math.min(1,((m-t)*P+(E-i)*I)/(P*P+I*I))),z=t-m+P*be,M=i-E+I*be,T=z<0&&pe<0?-1:1;return L0(T*Math.sqrt(Math.min(Ge*Ge+pe*pe,z*z+M*M))-.006,a,.016)},d0=-h*1.2,kt=.2,Ut=S0==="Half"?.3:S0==="Brimming"?.62:.43,J=me==="Conical"?S0==="Half"?-.01:S0==="Brimming"?.04:.018:me==="Pear"?h*(Ut+.12):h*Ut,Lo=Oe==="Low"?.072:Oe==="Over"?.29:.118,zo=.445,Xe=F0?.3:.235,g=[X(.03,.06)*(p.home?.8:1),Lo,zo],Le=[-.033-(p.home?.003:X(-.012,.012)),Oe==="Low"?.078:Oe==="Over"?.052:.074,0];if(F0&&(g[0]=j0*(.07+.04*Eo),g[1]=.5,g[2]=.17+.05*Po,Le[0]=-j0*.012,Le[1]=B+J*.5,Le[2]=-.01),Z!=="Shelf wall"){const t=re==="Two Bays"?j0<0?-1.1:1.3:.05,o=(Z==="From the windows"?Math.atan2(.42,.12):Math.atan2(-.42,-t*.42/3.3))-Math.atan2(g[0],g[2]),a=Math.cos(o),r=Math.sin(o);for(const n of[g,Le]){const f=n[0],i=n[2];n[0]=f*a+i*r,n[2]=-f*r+i*a}}const z0=t=>{const o=Math.hypot(t[0],t[1],t[2]);return[t[0]/o,t[1]/o,t[2]/o]},_t=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],W=z0([Le[0]-g[0],Le[1]-g[1],Le[2]-g[2]]);let b=z0(_t(W,[0,1,0])),N=_t(b,W);{const t=p.home?-.018:X(-.03,.02),o=Math.cos(t),a=Math.sin(t),r=[b[0]*o+N[0]*a,b[1]*o+N[1]*a,b[2]*o+N[2]*a],n=[N[0]*o-b[0]*a,N[1]*o-b[1]*a,N[2]*o-b[2]*a];b=r,N=n}const N0=(t,o,a)=>{const r=[t-g[0],o-g[1],a-g[2]],n=r[0]*W[0]+r[1]*W[1]+r[2]*W[2];return[(r[0]*b[0]+r[1]*b[1]+r[2]*b[2])/(n*Xe)*.5+.5,(r[0]*N[0]+r[1]*N[1]+r[2]*N[2])/(n*Xe)*.5+.5]},k0=[];let U0=0;const s=(t,o,a,r,n,f,i,m,E,P,I)=>{k0.push(Math.min(t,r),Math.min(o,n),Math.min(a,f),0,Math.max(t,r),Math.max(o,n),Math.max(a,f),i,m,E,P,I||0),U0++},F=(t,o,a,r,n,f,i,m,E,P)=>{k0.push(t,o,a,1,r,n,0,f,i,m,E,P||0),U0++},A=3.3,y=-3.1,ge=-3.4,L=3.2,ee=-.95,_0=2.25,qt=[[.3,.14,.05],[.34,.17,.06],[.42,.45,.42],[.62,.66,.63],[.1,.17,.42],[.2,.34,.22],[.7,.68,.6],[.12,.09,.07]],ze=(t,o,a,r,n,f)=>{const i=qt[f],m=f===6?8:5;F(t,o,a,r,o+n*.72,m,i[0],i[1],i[2]),a>-2&&F(t,o+n*.7,a,r*.72,o+n*.78,m,i[0],i[1],i[2]),F(t,o+n*.78,a,r*.42,o+n*.98,m,i[0],i[1],i[2]),n>.14&&a>-2&&Se()<.7&&F(t,o+n*.98,a,r*.5,o+n*1.04,0,.75,.74,.7)},Te=(t,o,a,r,n)=>{let f=t+X(.02,.08);for(;f<o-.05&&U0<554;){const i=X(.028,.055),m=Math.min(n,X(.11,.26)),E=Se()<.42?Se()<.5?0:1:Math.floor(Se()*qt.length);ze(f+i,a,r+X(-.015,.015),i,m,E),f+=i*2+(Se()<.16?X(.14,.3):X(.006,.04))}},he=[.7,.71,.63],c=[.26,.17,.1],at=[.42,.45,.4];for(const t of[-.3,.14,.58,1.02,1.46])Te(-.98,.86,t,2.98,.38);s(-1.9,-.09,-.56,1.7,-.05,.96,11,.5,.53,.5),s(-1.84,ee,-.5,1.64,-.09,.9,0,at[0],at[1],at[2]);const K=.165,Y=.128,D=-.02,G=-.005,No=-.04,h0=.013,ye=.0085,U=Ae==="Steel"?[.4,.41,.42]:Ae==="Copper"?[.52,.27,.15]:Ae==="Graniteware"?[.15,.2,.27]:re==="Skylight"?[.38,.39,.37]:k==="Bright Haze"?[.5,.51,.49]:[.7,.71,.68],x0=Ae==="White Enamel"?6:Ae==="Graniteware"?7:4;s(D-K,-.05,G-Y,D+K,No,G+Y,x0,U[0],U[1],U[2]),s(D-K-ye,-.05,G-Y-ye,D-K,h0,G+Y+ye,x0,U[0],U[1],U[2]),s(D+K,-.05,G-Y-ye,D+K+ye,h0,G+Y+ye,x0,U[0],U[1],U[2]),s(D-K,-.05,G-Y-ye,D+K,h0,G-Y,x0,U[0],U[1],U[2]),s(D-K,-.05,G+Y,D+K,h0,G+Y+ye,x0,U[0],U[1],U[2]),ze(-.335,-.05,-.335,.05,.215,0),s(-.378,.03,-.287,-.292,.09,-.2865,0,.84,.82,.74),ze(.3,-.05,-.4,.042,.17,2),F(.17,-.05,-.36,.035,.065,5,.66,.7,.68),ze(.4,-.05,.34,.085,.13,6),ze(-.52,-.05,.42,.045,.17,1),F(-.34,-.05,.55,.05,-.04,4,.2,.2,.22),F(-.34,-.04,.55,.0065,.13,4,.56,.55,.5),F(.62,-.05,-.2,.09,0,8,.8,.8,.76),F(.75,-.05,.42,.05,.1,5,.42,.45,.42),s(y,-.09,ge,A,-.05,-2.74,11,.74,.75,.72),s(y,ee,ge,A,-.09,-2.8,0,he[0]*.82,he[1]*.82,he[2]*.82);for(let t=y+.5;t<A;t+=.72)s(t,ee+.1,-2.79,t+.02,-.12,-2.78,0,.25,.25,.22);s(y,.56,ge,A,.59,-3.1,1,c[0],c[1],c[2]),s(y,.98,ge,A,1.01,-3.1,1,c[0],c[1],c[2]),s(y,1.4,ge,A,1.43,-3.1,1,c[0],c[1],c[2]),Te(-1.9,.6,.59,-3.24,.36),Te(-1.2,.2,1.01,-3.24,.3),Te(-1.2,-.3,-.05,-3,.5),Te(.28,1.25,-.05,-3.02,.5),F(.02,-.05,-3.18,.016,.42,4,.62,.52,.28),s(0,.4,-3.19,.04,.43,-2.92,4,.62,.52,.28),F(.02,.28,-2.92,.012,.42,4,.62,.52,.28),s(-.18,-.05,-3.1,.24,-.042,-2.76,4,.34,.35,.35),s(-2.95,-.05,-3.38,-2,1.28,-3.32,0,.24,.25,.24),s(-3.02,-.05,-3.4,-2.95,1.42,-2.82,0,.6,.62,.55),s(-2,-.05,-3.4,-1.93,1.42,-2.82,0,.6,.62,.55),s(-3.02,1.28,-3.4,-1.93,1.45,-2.82,0,.62,.64,.57),s(-2.95,.55,-2.87,-2,.59,-2.83,4,.42,.42,.4),s(-1.86,.22,ge,.3,.245,-3.14,1,c[0],c[1],c[2]),Te(-1.84,.28,.245,-3.26,.27),Te(-1.78,-.42,-.05,-3.02,.26),s(-.34,-.05,-3.2,.1,.13,-2.9,0,.3,.31,.29),F(-.12,.13,-3.05,.075,.2,4,.5,.5,.48),s(.32,.26,ge,1.7,.285,-3.16,1,c[0],c[1],c[2]),Te(.34,1.66,.285,-3.28,.24),s(-2.5,ee,L-.04,-1.4,1.36,L,1,c[0]*1.25,c[1]*1.25,c[2]*1.25),s(-2.42,.45,L-.05,-1.48,1.28,L-.04,2,.75,.78,.74,1.1),s(-1.97,.45,L-.06,-1.93,1.28,L-.04,1,c[0],c[1],c[2]),s(-2.42,.85,L-.06,-1.48,.89,L-.04,1,c[0],c[1],c[2]),s(-1.05,-.3,L-.03,.95,1.92,L,0,.3,.27,.22),s(-1.05,-.3,2.78,-.99,1.92,2.84,1,c[0],c[1],c[2]),s(.89,-.3,2.78,.95,1.92,2.84,1,c[0],c[1],c[2]),s(-.06,-.3,2.78,0,1.92,2.84,1,c[0],c[1],c[2]),s(-1.05,1.92,2.76,.95,1.99,2.84,1,c[0],c[1],c[2]),s(-1.08,ee,2.75,.98,-.3,L,0,he[0],he[1],he[2]);for(const t of[-.3,.14,.58,1.02,1.46])s(-1,t-.02,2.84,.9,t,L,1,c[0]*.9,c[1]*.9,c[2]*.9);s(1.05,-.09,2.62,A,-.05,L,11,.74,.75,.72),s(1.05,ee,2.68,A,-.09,L,0,he[0]*.8,he[1]*.8,he[2]*.8),F(1.9,-.05,3.08,.018,.46,4,.62,.52,.28),s(1.88,.44,2.82,1.92,.47,3.08,4,.62,.52,.28),F(1.9,.33,2.82,.012,.46,4,.62,.52,.28),ze(2.5,-.05,2.9,.09,.42,6),ze(1.32,-.05,2.95,.07,.3,3),s(y,.2,-1.8,y+.03,1.72,1.4,3,.055,.075,.068),s(y,.15,-1.86,y+.05,.2,1.46,1,c[0],c[1],c[2]),s(y,.2,-1.86,y+.04,1.77,-1.8,1,c[0],c[1],c[2]),s(y,.2,1.4,y+.04,1.77,1.46,1,c[0],c[1],c[2]),s(y,1.72,-1.86,y+.04,1.77,1.46,1,c[0],c[1],c[2]),re!=="Skylight"&&s(A-.22,.2,-3.2,A,.24,3,0,.72,.72,.66),s(A-.15,-.7,-3,A-.05,-.1,-.8,0,.55,.55,.5),s(A-.15,-.7,.4,A-.05,-.1,2.6,0,.55,.55,.5);for(const t of[[-.72,1.42],[.62,1.55],[-1.5,-1.5]])F(t[0],-.3,t[1],.16,-.26,1,c[0]*1.5,c[1]*1.5,c[2]*1.5),F(t[0],ee,t[1],.018,-.3,4,.18,.18,.18),F(t[0],ee,t[1],.16,ee+.012,4,.2,.2,.2);for(const t of[-1.25,1.15])s(t-.13,2.12,-2.7,t+.13,2.25,2.7,0,.62,.62,.58),s(t-.085,2.095,-2.65,t+.085,2.12,2.65,2,.95,.98,1,H?3.2:.5);s(y,1.98,.85,A,2.07,.97,0,.56,.57,.53),s(y+.8,ee,L-.05,y+.84,_0,L-.01,0,.45,.45,.42);const q0=U0,we=[];let He=re==="Two Bays"?[-1.1,1.3]:re==="Three Bays"?[-2.05,.05,2.15]:[];const It=re==="Two Bays"?1.1:.78;for(const t of He)we.push([A,1.12,t,It*2*1.7,-1,0,0]);re==="Skylight"&&(we.push([-.1,_0,-.6,4.2,0,-1,0],[1.3,_0,1.4,3.2,0,-1,0]),He=[-1.1,1.3].map(t=>t));const rt=k==="Overcast"?7:k==="Bright Haze"?11:k==="Low Sun"?8:9,nt=k==="Overcast"?[.93,.97,1]:k==="Bright Haze"?[.8,.9,1]:k==="Low Sun"?[1,.92,.8]:[.92,.96,1],ko=H?rt*.1:rt,Uo=H?k==="Overcast"?[.42,.52,.72]:k==="Bright Haze"?[.26,.42,1]:k==="Low Sun"?[1,.56,.42]:[.46,.6,1]:nt,_o=H?2.4:rt,Ct=H?[1,.86,.66]:nt;if(H){we.length=0;for(const t of[-1.25,1.15])for(const o of[-1.35,1.35])we.push([t,2.09,o,1.3,0,-1,0])}let l=Ft.get(e),ne=l?l.fl:!1;if(!l&&(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"))){const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,4,4);const o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),ne=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE,e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(o),e.deleteTexture(t)}const qo=`#version 300 es
out vec2 vUv; void main(){ vec2 p=vec2((gl_VertexID<<1)&2, gl_VertexID&2); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,Io=`#version 300 es
#define E8 ${ne?0:1}
precision highp float; precision highp int; precision highp sampler2D; precision highp samplerCube;
in vec2 vUv;
`,Bt=(t,o)=>{const a=e.createShader(t);return e.shaderSource(a,o),e.compileShader(a),a},Re=t=>{const o=e.createProgram(),a=Bt(e.FRAGMENT_SHADER,Io+t);return e.attachShader(o,l.vs),e.attachShader(o,a),e.linkProgram(o),e.flush(),o.f=a,o},Ee=(t,o)=>{e.getProgramParameter(t,e.LINK_STATUS)||console.error("215 "+o+": "+e.getShaderInfoLog(t.f)+" "+e.getProgramInfoLog(t));const a={},r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<r;n++){const f=e.getActiveUniform(t,n);a[f.name.replace("[0]","")]=e.getUniformLocation(t,f.name)}return t.u=a,t};l||(l={fl:ne,vs:Bt(e.VERTEX_SHADER,qo),pFl:[],vao:e.createVertexArray(),bakes:new Map,sims:[],simI:0,ubo:e.createBuffer()},Ft.set(e,l));const Co=l.vao,_=(t,o,a)=>{e.bindVertexArray(Co),e.bindFramebuffer(e.FRAMEBUFFER,a),e.viewport(0,0,t,o),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!1)},d=(t,o,a)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(a?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,o)},V=(t,o,a,r,n,f,i,m)=>{const E=e.createTexture();return e.bindTexture(e.TEXTURE_2D,E),e.texStorage2D(e.TEXTURE_2D,1,a,t,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,m||e.CLAMP_TO_EDGE),E},ce=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},q=()=>e.drawArrays(e.TRIANGLES,0,3),Ne=p.size>512,ct=ne?e.RGBA16F:e.RGBA8,ke=Ne?384:256,Dt=Ne?Math.log2(512/384):0,I0=Z==="Shelf wall"?[h*1.1,0]:[h*1.1*b[0]/Math.hypot(b[0],b[2]),h*1.1*b[2]/Math.hypot(b[0],b[2])],We=Math.max(.5-.59,N0(-I0[0],B,-I0[1])[0]-.125),C0=Math.min(.5+.59,N0(I0[0],B,I0[1])[0]+.125),Bo=`
uniform uint uSeed; uniform float uPer; out vec4 o;
uint hsh(uvec3 v){ v=v*1664525u+1013904223u; v.x+=v.y*v.z; v.y+=v.z*v.x; v.z+=v.x*v.y; v^=v>>16u; v.x+=v.y*v.z; return v.x; }
float vn(vec2 p,float per,uint s){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); float r=0.;
  for(int y=0;y<2;y++) for(int x=0;x<2;x++){ vec2 q=mod(i+vec2(x,y),per); float h=float(hsh(uvec3(uint(q.x),uint(q.y),s))>>8u)/16777215.; r+=h*(x==0?1.-f.x:f.x)*(y==0?1.-f.y:f.y); }
  return r; }
uniform int uOct;
float fbm(vec2 uv,float per,uint s){ float a=.5,r=0.,w=0.; for(int i=0;i<uOct;i++){ r+=a*vn(uv*per,per,s+uint(i)*17u); w+=a; a*=.55; per*=2.; } return r/w; }
void main(){ float v=fbm(vUv,uPer,uSeed); o=vec4(v,v,v,float(hsh(uvec3(uvec2(gl_FragCoord.xy),uSeed+7u))>>8u)/16777215.); }`,B0=`
#if E8
vec4 enS(vec3 c,float a){ return vec4(sqrt(min(c,vec3(4.))/4.),(a<0.?0.:.5)+.5*clamp(.3/max(abs(a),.001),0.,1.)); }
vec4 deS(vec4 v){ float k=max(v.a<.5?v.a*2.:v.a*2.-1.,.02); return vec4(v.rgb*v.rgb*4.,(v.a<.5?-.3:.3)/k); }
#else
vec4 enS(vec3 c,float a){ return vec4(c,a); }
vec4 deS(vec4 v){ return v; }
#endif
`,Do=t=>`#define SUN ${t&1} 
#define SKYL ${t>>1&1}
#define BAYS ${t>>2&1}
#define M5 ${t>>3&1}
#define M6 ${t>>4&1}
#define M7 ${t>>5&1}
#define M8 ${t>>6&1}
uniform sampler2D uPrim,uN,uArt,uOut; uniform int uCount,uMode,uNW,uBnc;
const float ART_X=1.2,ART_Y=.56,ART_W=1.7,ART_H=1.28;
uniform vec3 uF,uR,uU,uRo; uniform float uTan,uSkyI,uBathM,uSun,uSkyl,uAmb; uniform vec3 uSkyC,uTub;
uniform vec4 uLP[4]; uniform vec3 uLN[4]; uniform vec4 uBay; uniform float uWH;
uniform vec4 uTray;
out vec4 o;
${B0}
const float XR=${A.toFixed(3)},XL=${y.toFixed(3)},ZB=${ge.toFixed(3)},ZF=${L.toFixed(3)},FY=${ee.toFixed(3)},CE=${_0.toFixed(3)};
vec3 gN; int gI;
float at2(float y,float x){ float ax=abs(x),ay=abs(y),a=atan(min(ax,ay)/max(max(ax,ay),1e-20)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
float nz0(vec2 p){ return textureLod(uN,p,0.).r; }
float nz1(vec2 p){ return textureLod(uN,p,0.).g; }
float nz2(vec2 p){ return textureLod(uN,p,0.).b; }
float nz3(vec2 p){ return textureLod(uN,p,0.).a; }
#if M7
// one white speck per chosen cell of the noise's white channel, of its own size and place in the cell
// one white speck in about one cell in five of the noise's white channel, each of its own size (a pin's head to a lentil) and place
float specks(vec2 q){ vec2 c=q*.62*512.,i=floor(c),f=fract(c)-.5; float v=textureLod(uN,(i+.5)/512.,0.).a,r=.06+.3*fract(v*13.7)*fract(v*7.31);
  return step(.72,v)*(.7+.3*fract(v*3.7))*smoothstep(r,r*.45,length(f-(fract(v*vec2(97.13,41.7))-.5)*.45)); }
#endif
float hitPrims(vec3 ro,vec3 rd,float tb){
  gI=-1; vec3 inv=1./rd;
  for(int i=0;i<uCount;i++){
    vec4 a=texelFetch(uPrim,ivec2(0,i),0),b=texelFetch(uPrim,ivec2(1,i),0);
    if(a.w<.5){
      vec3 t0=(a.xyz-ro)*inv,t1=(b.xyz-ro)*inv,mn=min(t0,t1),mx=max(t0,t1);
      float tn=max(max(mn.x,mn.y),mn.z),tf=min(min(mx.x,mx.y),mx.z);
      if(tn<tf&&tn>1e-4&&tn<tb){ tb=tn; gI=i; gN=-sign(rd)*step(mn.yzx,mn.xyz)*step(mn.zxy,mn.xyz); }
    } else {
      vec2 oc=ro.xz-a.xz; float A=dot(rd.xz,rd.xz),B=dot(oc,rd.xz),C=dot(oc,oc)-b.x*b.x,D=B*B-A*C;
      if(D>0.){ float s=(-B-sqrt(D))/A,y=ro.y+rd.y*s;
        if(s>1e-4&&s<tb&&y>a.y&&y<b.y){ tb=s; gI=i; gN=vec3((oc.x+rd.x*s)/b.x,0.,(oc.y+rd.z*s)/b.x); }
        else { float yc=rd.y<0.?b.y:a.y,s2=(yc-ro.y)/rd.y; vec2 q=oc+rd.xz*s2;
          if(s2>1e-4&&s2<tb&&dot(q,q)<b.x*b.x){ tb=s2; gI=i; gN=vec3(0.,-sign(rd.y),0.); } } }
    }
  }
  return tb;
}
bool blocked(vec3 ro,vec3 rd,float tb){
  vec3 inv=1./rd; bool b0=false;
  for(int i=0;i<uCount;i++){ vec4 a=texelFetch(uPrim,ivec2(0,i),0); if(a.w<.5){ vec3 c=texelFetch(uPrim,ivec2(1,i),0).xyz,t0=(a.xyz-ro)*inv,t1=(c-ro)*inv,mn=min(t0,t1),mx=max(t0,t1); float tn=max(max(mn.x,mn.y),mn.z),tf=min(min(mx.x,mx.y),mx.z); if(tn<tf&&tn>1e-4&&tn<tb) b0=true; } }
  return b0;
}
vec3 irr(vec3 P,vec3 N){
  vec3 E=mix(vec3(.15,.145,.13),vec3(.46,.48,.48),N.y*.5+.5)*uAmb;
  for(int i=0;i<uNW;i++){
    vec3 d=uLP[i].xyz-P; float d2=dot(d,d); vec3 l=d/sqrt(d2);
    float c1=max(dot(N,l),0.),c2=max(-dot(uLN[i],l)*1.,0.)+.0;
    float A=uLP[i].w; float g=c1*c2*A/(d2+A*.4);
    // (the bath's floor is not shadowed by its own low walls: that hard edge fell right under the flask, a step down the bulb's mirror)
    if(g>.001&&(P.y<-.045||P.y>-.02)&&blocked(P+N*.0015,l,sqrt(d2)-.05)) g*=.26;
    E+=uSkyC*uSkyI*g*.80;
  }
  // long strip lights
  // the two long strip lights, both, so nothing steps where one hands over to the other (dim by day, the room's light at dusk)
  for(int k=0;k<2;k++){ vec3 q=vec3(k==0?-1.25:1.15,2.1,clamp(P.z,-2.6,2.6)); vec3 d=q-P; float d2=dot(d,d); vec3 l=d/sqrt(d2); E+=uTub*max(dot(N,l),0.)*max(l.y,0.)/(d2*.35+.3); }
  return E;
}
vec3 wallAlb(vec3 P,vec3 N,inout vec3 em,float id){
  vec3 c=vec3(.70,.74,.66);
  vec2 q=abs(N.x)>.5?P.zy:P.xy;
  float y=P.y;
  if(abs(N.y)>.5){
    if(N.y>0.){ // lino chequer
      vec2 g=floor(P.xz/.46); float k=mod(g.x+g.y,2.);
      c=k>.5?vec3(.60,.61,.55):vec3(.10,.15,.13);
      c*=.86+.3*nz1(P.xz*.13); c*=.93+.14*nz0(P.xz*.03);
    } else { // ceiling boards
      c=vec3(.60,.60,.56); c*=1.-.45*smoothstep(.012,.0,abs(fract(P.z/.9)-.5)*.9);
    }
    return c;
  }
  if(y<.54){ // glazed tile dado
    vec2 t=q/vec2(.152,.076); float r=floor(t.y); t.x+=.5*mod(r,2.); vec2 f=fract(t);
    float g=min(min(f.x,1.-f.x)*.152,min(f.y,1.-f.y)*.076);
    c=vec3(.80,.82,.75)*(.93+.1*nz3(floor(t)/37.)); c=mix(vec3(.27,.27,.25),c,smoothstep(.0012,.0028,g));
    if(y>.50) c=vec3(.26,.40,.34)*(.8+.3*nz1(q*.5));
  } else {
    c=vec3(.71,.75,.68)*(.82+.28*nz0(q*.11))*(.96+.08*nz1(q*.5));
  }
  if(N.z<-.5){ vec2 au=(P.xy-vec2(ART_X,ART_Y))/vec2(ART_W,ART_H); if(all(greaterThan(au,vec2(0.)))&&all(lessThan(au,vec2(1.)))){ vec4 w=textureLod(uArt,au,0.); c=mix(c,w.rgb,w.a); } }
  return c;
}
void main(){
  vec2 ndc=vUv*2.-1.;
  vec3 ro=uRo, rd=normalize(uF+(ndc.x*uR+ndc.y*uU)*uTan);
  vec3 col=vec3(0.),thr=vec3(1.); float depth=-1.,mask=0.;
  for(int bnc=0;bnc<uBnc;bnc++){
    // room shell
    vec3 tA=(vec3(XL,FY,ZB)-ro)/rd,tB=(vec3(XR,CE,ZF)-ro)/rd,tM=max(tA,tB);
    float tR=min(min(tM.x,tM.y),tM.z);
    vec3 Nr=tR==tM.x?vec3(-sign(rd.x),0.,0.):tR==tM.y?vec3(0.,-sign(rd.y),0.):vec3(0.,0.,-sign(rd.z));
    float t=hitPrims(ro,rd,tR);
    int id=gI; vec3 N=id>=0?gN:Nr;
    // the bath's water surface
    bool water=false;
    if(rd.y<0.&&ro.y>0.){ float tw=-ro.y/rd.y; vec3 pw=ro+rd*tw; if(tw<t&&abs(pw.x-uTray.x)<uTray.z&&abs(pw.z-uTray.y)<uTray.w){ water=true; t=tw; } }
    vec3 P=ro+rd*t;
    if(bnc==0) depth=t;
    if(water){
      // the lens's view marks the water (main ripples it and adds its surface); seen from the flask (the mirror's lower half)
      // it is clear water over the tray's floor with a little sky on its surface
      float f=uMode==0?.02+.98*pow(1.-abs(rd.y),5.):0.;
      if(uMode==1) mask=1.;
      col+=thr*f*uSkyC*uSkyI*.10; thr*=uMode==1?vec3(.955,.975,.985):(1.-f)*vec3(.90,.96,.97);
      rd=refract(rd,vec3(0.,1.,0.),1./1.33); ro=P+rd*1e-4; continue;
    }
    vec3 alb,em=vec3(0.),extra=vec3(0.); float gloss=0.,mat=-1.,sky=0.;
    if(id<0){
      alb=wallAlb(P,N,em,0.);
#if BAYS
      if(abs(N.x)>.5&&N.x<0.&&uNW>0&&uSkyl<.5){ // window bays in the right wall
        for(int w=0;w<int(uBay.w);w++){
          float zc=w==0?uBay.x:w==1?uBay.y:uBay.z;
          vec2 q=vec2(P.z-zc,P.y-1.12); vec2 hw=vec2(uWH,.86);
          if(all(lessThan(abs(q),hw+.09))) alb=vec3(.70,.70,.64);
          if(all(lessThan(abs(q),hw))){
            vec2 q2=q+rd.zy/abs(rd.x)*.22;
            if(all(lessThan(abs(q2),hw))){
              vec2 pn=vec2(uWH*2./3.,1.72/5.),e=abs(fract((q2+hw)/pn+.5)-.5)*pn; float m=min(e.x,e.y);
              if(any(lessThan(hw-abs(q2),vec2(.035)))||m<.012) alb=vec3(.52,.52,.47);
              else { sky=.96; alb=vec3(0.); }
            } else { alb=vec3(.74,.74,.68); }
          }
        }
      }
#endif
#if SKYL
      if(N.y<-.5&&uSkyl>.5){ // skylights
        for(int w=0;w<2;w++){ vec2 q=P.xz-(w==0?vec2(-.1,-.6):vec2(1.3,1.4)); vec2 hw=vec2(1.1,.9);
          if(all(lessThan(abs(q),hw))){ vec2 e=abs(fract((q+hw)/vec2(.44,.45)+.5)-.5)*vec2(.44,.45); if(min(e.x,e.y)<.016) alb=vec3(.36); else { sky=1.1; alb=vec3(0.); } } }
      }
#endif
      if(sky>0.){ float sl=rd.y/max(length(rd.xz),.001); vec3 e=textureLod(uOut,vec2(at2(rd.z,rd.x)/6.2831853+.5,sl/(1.+abs(sl))*.5+.5),0.).rgb; em=e*e*16.*sky*(uMode==0?.14:.17); }
      if(N.y>.5) gloss=.42; if(N.y>.5) mat=20.;
      if(abs(N.y)<.5&&P.y<.5) gloss=.5;
    } else {
      vec4 pc=texelFetch(uPrim,ivec2(2,id),0); mat=texelFetch(uPrim,ivec2(1,id),0).w; if(texelFetch(uPrim,ivec2(0,id),0).w>.5) mat=texelFetch(uPrim,ivec2(1,id),0).w;
      alb=pc.rgb;
      if(mat<.5){ alb*=.92+.16*nz1(P.xy*.7+P.z*.3); }
      else if(mat<1.5){ float gr=nz1(vec2((P.x+P.z)*.9,P.y*11.)); alb*=.72+.6*gr; gloss=.25; }
      else if(mat<2.5){ em=alb*pc.w; alb=vec3(0.); }
      else if(mat<3.5){ float sm=nz0(P.zy*.28),s2=nz1(P.zy*vec2(1.2,.8)); alb+=vec3(.2,.22,.2)*smoothstep(.5,.85,sm)*(.4+s2); alb+=vec3(.22)*smoothstep(.74,.76,nz1(P.zy*vec2(.45,1.)))*step(.5,sm); gloss=.1; }
      else if(mat<4.5){ alb*=.8+.4*nz1(P.xz*1.3+P.y); gloss=.65; }
#if M5
      else if(mat<5.5){ float nv=abs(dot(N,rd)); float lq=step(P.y,pc.w>0.?pc.w:9.); extra=alb*mix(.28,1.25,nv*nv)*(.55+.45*max(N.x,0.)+.25*max(N.y,0.)); alb*=.10; gloss=.7; }
#endif
#if M6
      else if(mat<6.5){ // enamel: blue rim
        if(N.y>.5&&P.y>0.005){ alb=vec3(.07,.11,.27); float chip=smoothstep(.71,.74,nz1(P.xz*.7)); alb=mix(alb,vec3(.20,.13,.09),chip); }
        else if(P.y>0.006&&abs(N.y)<.5){ alb=mix(alb,vec3(.09,.13,.3),smoothstep(.0078,.0092,P.y)); }
        alb*=.93+.12*nz1(P.xz*1.7+P.y);
        alb*=1.-.4*smoothstep(.72,.8,nz2(P.xz*4.5));
        gloss=.9;
      }
#endif
#if M7
      else if(mat<7.5){ // speckled blue-grey enamel
        vec2 q=P.xz+P.y*.7; // dark blue enamel spattered white, specks from a lentil down to a pin's head
        alb=vec3(.045,.066,.13)*(.8+.4*nz1(q*.5));
        float sk=specks(q);
        alb=mix(alb,vec3(.66,.69,.71)*(.8+.3*nz1(q*3.)),sk*.55);
        if(N.y>.5&&P.y>.005){ alb=vec3(.05,.07,.13); alb=mix(alb,vec3(.18,.12,.08),smoothstep(.71,.74,nz1(P.xz*.7))); }
        gloss=.9;
      }
#endif
#if M8
      else if(mat<8.5){ gloss=.6; }
#endif
      else { // glazed bench tile
        vec2 tc=P.xz/.152+.5; vec2 ti=floor(tc),f=fract(tc); float g=min(min(f.x,1.-f.x),min(f.y,1.-f.y))*.152;
        float tv=nz3(ti/41.);
        vec3 tn=normalize(vec3((nz3(ti/29.)-.5)*.012,1.,(nz3(ti/31.+.3)-.5)*.012));
        alb*=.9+.14*tv; alb*=.92+.1*nz1(P.xz*.6); float sc=nz2(P.xz*vec2(4.2,1.3));
        alb=mix(vec3(.17,.165,.15)+.05*nz2(P.xz*3.),alb,smoothstep(.0012,.0028,g));
        alb*=1.-.22*smoothstep(.56,.72,nz0(P.xz*.35));
        if(N.y>.5){ N=tn; }
        gloss=g>.0026?.62:0.;
      }
    }
    vec3 lit=irr(P,N);
    // sun patch through the panes
#if SUN
    if(uSun>.5&&N.y>.5){ vec3 sd=normalize(vec3(1.,.42,-.28)); float s=(XR-P.x)/sd.x; vec3 w=P+sd*s; bool hitw=false;
      for(int j=0;j<int(uBay.w);j++){ float zc=j==0?uBay.x:j==1?uBay.y:uBay.z; vec2 q=vec2(w.z-zc,w.y-1.12),hw=vec2(uWH,.86); if(all(lessThan(abs(q),hw))){ vec2 pn=vec2(uWH*2./3.,1.72/5.),e=abs(fract((q+hw)/pn+.5)-.5)*pn; if(min(e.x,e.y)>.016) hitw=true; } }
      if(hitw) lit+=vec3(5.,4.2,3.)*sd.y; }
#endif
    // darkening under benches and in corners
    float ao=1.; if(id<0&&N.y>.5) ao=mix(.55,1.,smoothstep(0.,.5,min(min(P.x-XL,XR-P.x),min(P.z-ZB,ZF-P.z))));
    // under the flask (seen in its mirror): a small soft shade, and round it the ring of light the filled bulb focuses on the floor
    if(uMode==0&&N.y>.5&&P.y<-.02){ float cr=length(P.xz); ao*=mix(.6,1.,smoothstep(.006,.026,cr))*(1.+1.2*exp(-pow((cr-.06)/.03,2.))*clamp(1.-2.*alb.g,0.,1.)); }
    { // the room's grade, in the lens's view and the mirror alike: warm and a stop down away from the windows, cool beside them; brown shade under the far shelves
      lit*=mix(vec3(1.06,.95,.80)*.74,vec3(.93,.99,1.07),smoothstep(-1.4,2.8,P.x));
      if(id<0&&N.z>.5){ vec4 yb=vec4(.56,.98,1.40,(P.x<-1.86||P.x>1.7)?-9.:P.x<.31?.22:.26)-P.y; vec4 e=exp(-yb/.13)*step(0.,yb); float sh=max(max(e.x,e.y),max(e.z,e.w));
        lit*=mix(vec3(1.),vec3(.40,.31,.24),sh*.7); }
    }
    col+=thr*(alb*lit*ao*.62+em+extra*lit*.5);
    if(gloss<=0.) { thr*=0.; break; }
    float nv=abs(dot(rd,N)),f=mix(.04,.5,gloss*.0)+.96*pow(1.-nv,5.);
    f=.04+(gloss-.04)*.0+.96*pow(1.-nv,5.); f*=gloss;
    if(mat>=4.&&mat<4.5) f=mix(alb.g*.6,1.,pow(1.-nv,5.));
    thr*=f; if(max(thr.r,max(thr.g,thr.b))<.015) break;
    rd=reflect(rd,N); ro=P+N*1e-3;
  }
  if(uMode==0) o=vec4(sqrt(clamp(col/16.,0.,1.)),1.);
  else o=enS(col,mask>.5?-depth:depth);
}`,Go=`
uniform sampler2D uN; uniform vec3 uSkyC; uniform float uSkyI,uSnow,uTree; out vec4 o;
float nz0(vec2 p){ return textureLod(uN,p,0.).r; }
float nz1(vec2 p){ return textureLod(uN,p,0.).g; }
void main(){
  float az=(vUv.x-.5)*6.2831853*.31, q=vUv.y*2.-1., sl=q/max(1.-abs(q),.001);
  vec3 c=uSkyC*uSkyI*mix(.72,1.15,smoothstep(-.05,.9,sl));
  c*=.86+.3*nz0(vec2(az*1.4,sl*.8));
  float tree=(.02+.17*nz0(vec2(az*.9,.3))+.07*nz1(vec2(az*4.,.7)))*uTree;
  float roof=step(.42,fract(az*2.3+.2))*(.11+.03*step(.5,fract(az*7.)))*uTree;
  float t=smoothstep(tree+.012,tree-.012,sl), bb=step(sl,roof);
  vec3 tc=mix(vec3(.32,.38,.24),vec3(.5,.54,.42),nz1(vec2(az*7.,sl*6.)))*(uSnow>.5?1.7:1.);
  if(uSnow>.5) tc=mix(tc,vec3(1.5,1.55,1.6),.55);
  c=mix(c,vec3(.55,.46,.42)*(uSnow>.5?1.5:1.2),bb);
  c=mix(c,tc,t);
  if(sl<-.12) c=uSnow>.5?vec3(2.6,2.7,2.85):vec3(.42,.46,.36);
  o=vec4(sqrt(min(c,vec3(16.))/16.),1.);
}`,Oo=`
out vec4 o;
float at2(float y,float x){ float ax=abs(x),ay=abs(y),a=atan(min(ax,ay)/max(max(ax,ay),1e-20)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
void main(){
  vec2 P=vec2(1.2,.56)+vUv*vec2(1.7,1.28); vec3 c=vec3(0.); float on_=0.;
  vec2 ck=vec2(1.42,1.62)-P; float r=length(ck);
  if(r<.19){ c=r>.17?vec3(.1,.08,.07):vec3(.92,.91,.84); on_=1.;
    float a=at2(ck.x,ck.y)/6.2832*12.; if(r>.135&&r<.163&&abs(fract(a+.5)-.5)<.1) c=vec3(.07);
    vec2 h1=normalize(vec2(.62,.78)),h2=normalize(vec2(-.86,.5));
    float d1=abs(dot(ck,vec2(h1.y,-h1.x))),d2=abs(dot(ck,vec2(h2.y,-h2.x)));
    if(d1<.007&&dot(ck,h1)<.0&&dot(ck,h1)>-.11) c=vec3(.05); if(d2<.005&&dot(ck,h2)<.0&&dot(ck,h2)>-.15) c=vec3(.05);
  }
  vec2 ch=(P-vec2(1.78,.62))/vec2(1.05,.86);
  if(ch.x>0.&&ch.x<1.&&ch.y>0.&&ch.y<1.){ c=vec3(.88,.86,.76)*.95; on_=1.;
    vec2 cell=ch*vec2(18.,9.); vec2 ci=floor(cell),cf=fract(cell);
    bool on=(ci.x<2.&&ci.y>0.5&&ci.y<7.5)||(ci.x>15.5&&ci.y>0.5&&ci.y<7.5)||(ci.x>11.5&&ci.y>1.5&&ci.y<7.5)||(ci.y>.5&&ci.y<5.5&&ci.x>1.5&&ci.x<11.5);
    if(on&&cf.x>.07&&cf.y>.07){ float k=fract(ci.x*.137+ci.y*.071); vec3 a=mix(vec3(.74,.48,.40),vec3(.45,.60,.68),smoothstep(.1,1.,ci.x/17.)); c=mix(a,vec3(.86,.78,.5),step(.68,k)*.7); }
  }
  if(all(lessThan(abs(ch-.5),vec2(.53)))&&any(greaterThan(abs(ch-.5),vec2(.5)))){ c=vec3(.2,.13,.08); on_=1.; }
  o=vec4(c,on_);
}`,Xo=`
uniform sampler2D uS; uniform float uFoc,uK; uniform int uTaps; out vec4 o;
${B0}
void main(){
  vec4 c0=deS(textureLod(uS,vUv,0.)); float d0=abs(c0.a); float coc0=clamp(uK*abs(1./d0-1./uFoc),0.,.024);
  vec3 sum=min(c0.rgb,vec3(1.9)); float w=1.,m=c0.a<0.?1.:0.;
  for(int i=1;i<uTaps;i++){
    float a=float(i)*2.39996,r=sqrt(float(i)/float(uTaps));
    vec2 off=vec2(cos(a),sin(a))*r;
    vec4 c=deS(textureLod(uS,vUv+off*.024,0.));
    float d=abs(c.a),coc=clamp(uK*abs(1./d-1./uFoc),0.,.024),dist=r*.024;
    // a sample counts if its own blur reaches here (near blur spreads over what's behind) or ours reaches it
    float reach=d>d0+.02?min(coc,coc0):coc;
    float wi=smoothstep(dist-.0035,dist+.0015,reach);
    sum+=min(c.rgb,vec3(1.9))*wi; w+=wi; m+=(c.a<0.?1.:0.)*wi;
  }
  sum/=w; m/=w;
  o=enS(sum,m>.5?-d0:d0);
}`,Ho=`
uniform sampler2D uS; uniform float uFoc,uK; uniform int uTaps; out vec4 o;
${B0}
void main(){
  vec4 c0=deS(textureLod(uS,vUv,0.)); float d0=abs(c0.a),coc=clamp(uK*abs(1./d0-1./uFoc),0.,.024);
  float rad=max(coc*.34,1.2/float(textureSize(uS,0).x)); vec3 s=c0.rgb; float w=1.,m=c0.a<0.?1.:0.;
  for(int i=1;i<uTaps;i++){ float a=float(i)*2.39996,r=sqrt(float(i)/float(uTaps)); vec4 c=deS(textureLod(uS,vUv+vec2(cos(a),sin(a))*r*rad,0.)); s+=c.rgb; w+=1.; m+=c.a<0.?1.:0.; }
  o=vec4(sqrt(clamp(s/w/4.,0.,1.)),m/w);
}`,p0=1.18,Wo=de===0?"smn(length(q)-R,neck,.018)":de===1?"smn(smn(length(q)-R,length(q-vec2(0.,.78*R))-.5*R,.07),neck,.03)":"smn(cone(q),neck,.016)",Ko=`
uniform vec3 uF,uR,uU,uRo,uC; uniform float uTan,uPx,uGx,uGw,uLB,R,RN; uniform vec2 uTxl; uniform int uPass,uAA,uIt,uG3; uniform samplerCube uEnv; out vec4 o;
const float YT=${ot.toFixed(3)},W=.0017,GM=${p0.toFixed(3)};
float smn(float a,float b,float k){ float h=max(k-abs(a-b),0.)/k; return min(a,b)-h*h*k*.25; }
float bx(vec2 p,vec2 b){ vec2 d=abs(p)-b; return length(max(d,0.))+min(max(d.x,d.y),0.); }
${de===2?`float cone(vec2 q){ float he=.075,r1=R*1.08,r2=RN; vec2 k1=vec2(r2,he),k2=vec2(r2-r1,2.*he);
  vec2 ca=vec2(q.x-min(q.x,q.y<0.?r1:r2),abs(q.y)-he); vec2 cb=q-k1+k2*clamp(dot(k1-q,k2)/dot(k2,k2),0.,1.);
  float sg=(cb.x<0.&&ca.y<0.)?-1.:1.; return sg*sqrt(min(dot(ca,ca),dot(cb,cb)))-.006; }`:""}
float prof(vec2 q){ float neck=bx(q-vec2(0.,YT*.5),vec2(RN,YT*.5)); return ${Wo}; }
float Fd(vec3 p){ return prof(vec2(length(p.xz),p.y)); }
const vec2 GE[3]=vec2[3](vec2(.0005,0.),vec2(-.00025,.000433),vec2(-.00025,-.000433));
// one rolled loop (bounded by a uniform) so the profile is compiled once per gradient, not three times
vec2 Gq(vec2 q){ vec2 g=vec2(0.); for(int i=0;i<uG3;i++){ vec2 e=GE[i]; g+=e*prof(q+e); } return g; }
vec3 Gd(vec3 p){ vec2 q=vec2(length(p.xz),p.y),g=Gq(q); return normalize(vec3(p.xz/max(q.x,1e-6)*g.x,g.y).xzy); }
vec2 oct(vec3 n){ n/=abs(n.x)+abs(n.y)+abs(n.z); vec2 p=n.xy; if(n.z<0.) p=(1.-abs(p.yx))*vec2(p.x>=0.?1.:-1.,p.y>=0.?1.:-1.); return p; }
void main(){
  vec2 c0=vec2(uGx+vUv.x*uGw,(vUv.y*2.-1.)*GM);
  vec3 ro=uRo-uC; float rl=length(ro),fp=uPx*uTan*2.,nI=(uPass==2||uPass==4)?1.333:1.,cnt=0.,sp=0.;
  vec4 acc=vec4(0.); vec3 D0=vec3(0.);
  int n=uPass==0?1:4;
  for(int s=0;s<n;s++){
    vec2 ndc=c0; if(uPass>0) ndc+=(fract((float(s)+.5)*vec2(.7548777,.5698403))-.5)*uTxl;
    vec3 V=normalize(uF+(ndc.x*uR+ndc.y*uU)*uTan);
    float t=rl-.42,best=1e9,tb=t; bool hit=false;
    for(int i=0;i<uIt;i++){ float d=Fd(ro+V*t); float rel=d/(t*fp); if(rel<best){best=rel;tb=t;} if(d<.00003){hit=true;tb=t;break;} t+=d; if(t>rl+.42) break; }
    if(uPass==0){ if(hit||best<3.){ acc=vec4(oct(Gd(ro+V*tb)),hit?1.:clamp(1.-best*1.3,0.,1.),tb); cnt=1.; } }
    else if(hit||best<3.){
      vec3 Pf=ro+V*tb,N=Gd(Pf);
      vec3 d=refract(V,N,1./1.5); if(dot(d,d)<.1) d=reflect(V,N);
      vec3 p=Pf+d*.00012; float gl1=0.; bool ent=false;
      for(int i=0;i<uIt;i++){ float f=Fd(p); if(f>.00002) break; if(f+W<.00002){ent=true;break;} float st=max(min(-f,f+W),.00008); p+=d*st; gl1+=st; }
      vec3 Dout=d,Dmir=d,na=Gd(p); float L=0.;
      if(!ent){ vec3 q=refract(d,-na,1.5); Dout=dot(q,q)<.1?reflect(d,-na):q; Dmir=Dout; }
      else {
        vec3 d2=refract(d,na,1.5/nI);
        if(dot(d2,d2)<.1){ Dout=reflect(d,na); Dmir=Dout; }
        else {
          d=d2; p+=d*.0002;
          for(int i=0;i<uIt;i++){ float g=-(Fd(p)+W); if(g<.00006&&L>.0006) break; g=max(g,.0001); p+=d*g; L+=g; }
          vec3 nb=Gd(p);
          vec3 q=refract(d,-nb,nI); Dout=dot(q,q)<.1?reflect(d,-nb):q;
          // the bounce off a silvered back wall, carried back through the flask and out
          if(uPass==3||uPass==4){
            vec3 rm=reflect(d,-nb),pm=p+rm*.0003;
            for(int i=0;i<uIt;i++){ float g=-(Fd(pm)+W); if(g<.00006) break; pm+=rm*g; }
            vec3 nf=Gd(pm); vec3 q2=refract(rm,-nf,nI); Dmir=dot(q2,q2)<.1?reflect(rm,-nf):q2;
          }
        }
      }
      vec2 off=vec2(dot(Dout-V,uR),dot(Dout-V,uU))/(uTan*2.)*.88;
      float em=smoothstep(.16,.42,length(off));
      if(uPass==1){ vec3 e=vec3(0.); if(em>.001){ e=textureLod(uEnv,Dout,max(2.6-uLB,0.)).rgb; e=e*e*16.; } acc+=vec4(e*em,1.-em); }
      else if(uPass==5) acc+=vec4(off*(1.-em),L,gl1/W);
      else if(uPass==2){ vec3 e=textureLod(uEnv,Dout,max(1.3-uLB,0.)).rgb; acc+=vec4(e*e*16.,L); }
      else acc.xyz+=Dmir;
      cnt+=1.;
      if(cnt<1.5) D0=Dout; sp=max(sp,1.-dot(Dout,D0));
      if(s==3&&sp>.0012) n=uAA;
    }
    else if(s==0&&best>6.) n=0;
  }
  acc/=max(cnt,1.);
  float ign=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))-.5;
  if(uPass==1) o=vec4(sqrt(min(acc.rgb,vec3(4.))/4.)+ign/255.,cnt>0.?acc.a:0.);
  else if(uPass==3||uPass==4){ vec2 e=cnt>0.?oct(normalize(acc.xyz)):vec2(0.); o=vec4(e,e); }
  else o=acc;
#if E8
  if(uPass==0) o=vec4(o.rg*.5+.5,(o.a-.2)/.5,o.b);
  else if(uPass==5) o=vec4(o.rg+.5,o.b/.25,o.a/9.);
  else if(uPass==2) o=vec4(sqrt(o.rgb/16.),1.);
  else if(uPass>1) o=o*.5+.5;
#endif
}`,Yo=`
uniform vec3 uF,uR,uU,uRo,uC,uL; uniform float uTan,uRad,uKcau; out vec4 o;
void main(){ vec2 ndc=vUv*2.-1.; vec3 rd=normalize(uF+(ndc.x*uR+ndc.y*uU)*uTan);
  float t=(-.03-uRo.y)/rd.y; vec3 P=uRo+rd*t; if(rd.y>=0.){ o=vec4(0.); return; }
  vec3 d=uC-P; float dl=length(d); vec3 u=d/dl; float ang=acos(clamp(dot(u,uL),-1.,1.)), rad=asin(clamp(uRad/dl,0.,1.));
  float occ=smoothstep(rad+.26,rad-.12,ang);
  // the contact blob under the flask lit from all over the room
  float cr=length(P.xz-uC.xz); float ao=exp(-pow(max(cr-uRad*.45,0.)/(uRad*.62),1.5));
  // a water sphere focuses the window about one diameter past itself
  vec3 fc=uC-uL*uRad*2.; vec3 dpt=P-fc; float along=dot(dpt,-uL); vec3 prp=dpt-(-uL)*along; float w=uRad*(.16+abs(along)/uRad*.42);
  float cau=exp(-dot(prp,prp)/(w*w))*step(0.,dot(P-uC,-uL))*(.14/(.14+abs(along)/uRad));
  o=vec4(occ,cau*uKcau,ao,1.); }`,Vo=`
uniform sampler2D uS,uP,uN; uniform vec4 uH,uA,uB,uI; uniform float uDrop; uniform vec2 uTx; out vec4 o;
void main(){
  vec4 pr=texelFetch(uP,ivec2(0,int(vUv.y*511.+.5)),0);
  float th=vUv.x*6.2831853, x=pr.r*sin(th), z=pr.r*cos(th), y=pr.g, r2=pr.r*pr.r;
  float H=uH.x+uH.y*x+uH.z*z+uH.w*(r2*uB.z-.45);
  vec4 n0=textureLod(uN,vUv*vec2(4.,2.),0.),n1=textureLod(uN,vUv*vec2(9.,1.),0.);
  float grease=uB.y>0.?smoothstep(.60,.72,n0.r*.75+n1.r*.2+n0.b*.12)*uB.y:0.;
  float wet=smoothstep(.002,-.0015,y-H-(n0.b-.5)*.0016);
  if(uI.x>.5){ // the opening state: already coated part way up from the bottom, to the liquid's line at most
    float fr=uI.y+(n0.r-.5)*.022+(n0.g-.5)*.012;
    float dd=smoothstep(fr+.013,fr-.012,y)*uI.z;
    float sites=smoothstep(.45,.85,n0.b+n0.g*.3);
    dd*=mix(1.,.55+.45*sites,smoothstep(fr-.025,fr+.005,y));
    dd*=1.-grease;
    dd*=smoothstep(.0008,-.0022,y-H);
    o=vec4(dd,wet,smoothstep(fr+.03,fr-.02,y)*(1.-grease),0.); return;
  }
  vec4 c=textureLod(uS,vUv,0.);
  vec4 l=textureLod(uS,vUv-vec2(uTx.x,0.),0.),rr=textureLod(uS,vUv+vec2(uTx.x,0.),0.),d=textureLod(uS,vUv-vec2(0.,uTx.y),0.),u=textureLod(uS,vUv+vec2(0.,uTx.y),0.);
  float dt=uA.x,G=uA.y;
  // the wet film: left behind by a passing liquid, thins and runs back down in rivulets
  float drain=uA.z*(.35+1.5*n1.g*n1.g*2.);
  float f=max(wet,max(c.g-dt*drain,u.g-dt*(.05+drain*.8)-.002));
  // silver nuclei light up on the wet glass at scattered sites, and spread from what is already silver
  float sites=smoothstep(.56,.74,n0.b+n0.g*.3);
  float avg=(l.b+rr.b+d.b+u.b)*.25;
  float ni=c.b+dt*G*f*(sites*uB.x+3.6*max(avg-c.b,0.)+.05+c.b*(1.-c.b)*1.1)*(1.-grease);
  // the coat thickens fastest low down, where the colloid is densest
  float low=1.+clamp((uH.x-y)*16.,-.3,1.8);
  float dd=dt*G*f*ni*low*(1.-c.r*.86)*(.75+.5*n0.g)*(1.-grease);
  float nd=c.r+dd;
  if(uA.w>0.){ float hole=smoothstep(.60,.34,n0.r*.65+n1.b*.35), nb=min(min(l.r,rr.r),min(d.r,u.r));
    float ac=dt*uA.w*((.3+.3*f)*(.35+1.5*hole)+8.*max(c.r-nb,0.)); nd=max(0.,c.r-ac*(.6+.8*n0.g)); ni=max(0.,ni-ac*2.); }
  o=vec4(clamp(nd+(uB.w*(fract(dot(gl_FragCoord.xy,vec2(.7548,.5698))+uDrop)-.5)/255.),0.,1.),clamp(f,0.,1.),clamp(ni,0.,1.),1.);
}`,$o=`
uniform sampler2D uS,uN; uniform vec4 uA,uB; out vec4 o;
void main(){
  vec2 p=vUv*2.-1.; float r2=dot(p,p);
  float dt=uA.x; float w=uA.y*(1.-.45*r2);
  vec2 nq=vUv*1.3+uB.xy;
  vec4 nA=textureLod(uN,nq,0.),nB=textureLod(uN,nq*.6-uB.yx*1.3+.37,0.);
  vec2 curl=vec2(nA.r-.5,nB.r-.5)*(uA.w);
  vec2 v=vec2(-p.y,p.x)*w+curl+uB.zw*(1.-r2*.5);
  vec2 q=p-dt*v;
  vec4 c=textureLod(uS,q*.5+.5,0.);
  float src=dt*uA.z*smoothstep(.34,.72,nB.r+nA.g*.12)*2.;
  float dens=c.r+src;
  dens+=(1.-dens)*dt*.05;
  float g=c.g+(nA.g-c.g)*dt*.03;
  o=vec4(clamp(dens,0.,2.5),g,0.,1.);
}`,Zo=`
uniform sampler2D uS; uniform vec2 uTx,uBox; uniform vec4 uF,uK0,uK1; out vec4 o;
void main(){
  vec4 c=textureLod(uS,vUv,0.); float l=textureLod(uS,vUv-vec2(uTx.x,0.),0.).r,rr=textureLod(uS,vUv+vec2(uTx.x,0.),0.).r,d=textureLod(uS,vUv-vec2(0.,uTx.y),0.).r,u=textureLod(uS,vUv+vec2(0.,uTx.y),0.).r;
  float h=c.r,p=c.g,nh=(2.*h-p+.46*(l+rr+d+u-4.*h))*.9965;
  vec2 P=(vUv-.5)*uBox*2.;
  vec2 dq=P-uF.xy; float dl=length(dq); float rw=uK1.w;
  float wall=smoothstep(rw-.002,rw+.004,dl);
  nh=mix(0.,nh,wall);
  nh+=(dot(dq/max(dl,.001),uF.zw))*exp(-pow((dl-rw)/.008,2.));
  if(uK0.z>0.){ vec2 e=P-uK0.xy; nh+=uK0.z*exp(-dot(e,e)/(.0035*.0035)); }
  if(uK1.z>0.){ vec2 e=P-uK1.xy; nh+=uK1.z*exp(-dot(e,e)/(.0035*.0035)); }
  o=vec4(nh,h,(rr-l),(u-d));
}`,jo=`
layout(std140) uniform U { vec4 u[16]; };
uniform sampler2D uBase,uG0,uG1,uGb,uG2,uG3,uWall,uCloud,uRip,uN,uShade,uLayer; uniform samplerCube uEnv; uniform int uLay; out vec4 o;
#define RO u[0].xyz
#define TANH u[0].w
#define CR u[1].xyz
#define TIME u[1].w
#define CU u[2].xyz
#define TEMP u[2].w
#define CF u[3].xyz
#define PROG u[3].w
#define CEN u[4].xyz
#define LODB u[4].w
#define GX0 u[7].w
#define GXW u[8].w
#define HH u[5]
#define CLOUDN u[6].x
#define PHASE u[6].y
#define RINSE u[6].z
#define RTINT u[7].rgb
#define TTINT u[8].rgb
#define LAYN u[9].xyz
#define DLT u[10].xy
#define PIV u[10].zw
#define CSROT u[11].xy
#define SKYAMB u[11].z
#define COLRW u[11].w
#define TRAYT u[12]
#define YR u[13].xy
#define EXPO u[13].z
#define R0 u[13].w
#define SKYC u[14].rgb
#define STM u[14].w
#define CLNT u[15].rgb
#define ETCH u[15].w
#define IMPF u[6].w
float at2(float y,float x){ float ax=abs(x),ay=abs(y),a=atan(min(ax,ay)/max(max(ax,ay),1e-20)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
const float TAU=6.2831853,GMARGIN=${p0.toFixed(3)};
vec3 env(vec3 d,float l){ vec3 v=textureLod(uEnv,d,max(l-LODB,0.)).rgb; return v*v*16.; }
vec3 oct(vec2 e){ vec3 v=vec3(e,1.-abs(e.x)-abs(e.y)); if(v.z<0.) v.xy=(1.-abs(v.yx))*vec2(v.x>=0.?1.:-1.,v.y>=0.?1.:-1.); return normalize(v); }
vec3 ray(vec2 uv){ vec2 n=uv*2.-1.; return normalize(CF+(n.x*CR+n.y*CU)*TANH); }
vec2 wallUv(vec3 p){ return vec2(at2(p.x,p.z)/TAU,(p.y-YR.x)/YR.y); }
float HAt(vec3 p){ float r2=dot(p.xz,p.xz); return HH.x+HH.y*p.x+HH.z*p.z+HH.w*(r2/(R0*R0)-.45); }
void main(){
  vec2 uv=vUv;
  bool lay=uLay>0;
  vec4 bt=textureLod(uBase,uv,0.); float wm=lay?0.:bt.a;
  vec3 rd=ray(uv); vec3 wp=vec3(0.); vec2 rip=vec2(0.); float rh=0.;
  vec3 bcol;
  vec2 uvq=uv;
  if(wm>.02){
    float tw=-RO.y/rd.y; wp=RO+rd*tw;
    vec4 rr=textureLod(uRip,(wp.xz-TRAYT.xy)/TRAYT.zw*.5+.5,0.);
    vec4 nw=textureLod(uN,wp.xz*vec2(1.4,1.8)+TIME*vec2(.017,.011),0.);
    rh=rr.r; rip=clamp(rr.ba*60.,-.35,.35)+(nw.gb-.5)*(.010+TEMP*.018);
    uvq=uv+rip*vec2(.012,.018)*wm; uvq.y+=.0012*wm;
    bt=textureLod(uBase,uvq,0.);
  }
  bcol=bt.rgb*bt.rgb*4.;
  // the flask's shadow and caustic move with it
  vec2 uvs=uvq-DLT;
  vec4 sh=textureLod(uShade,uvs,0.);
  float tm=PROG;
  bcol*=(1.-sh.r*mix(.24,.70,tm))*(1.-sh.b*mix(.34,.58,tm));
  bcol+=SKYC*sh.g*(1.-tm)*(1.-CLOUDN*.8)*(1.+rh*160.);
  if(wm>.02) bcol*=1.+clamp(-rh*260.,-.25,.5);
  // ----- flask -----
  vec2 fq=(wm>.5?uvq:uv)-DLT-PIV; fq=vec2(CSROT.x*fq.x+CSROT.y*fq.y,-CSROT.y*fq.x+CSROT.x*fq.y)+PIV;
  vec2 gq=vec2((fq.x-GX0)/GXW,(fq.y-.5)/GMARGIN+.5);
  vec4 g0=textureLod(uG0,gq,0.);
#if E8
  g0=vec4(g0.rg*2.-1.,g0.a,g0.b*.5+.2);
#endif
  float cov=g0.b;
  vec3 S=vec3(0.); float submerged=0.;
  if(cov>.003){
    vec3 N=oct(g0.rg); vec3 V=ray(fq); vec3 Pf=RO+V*g0.a-vec3(0.,COLRW,0.);
    vec2 wu=wallUv(Pf);
    vec4 sw=textureLod(uWall,wu,0.);
    vec4 n0=textureLod(uN,wu*vec2(8.,4.),0.),n1=textureLod(uN,wu*vec2(2.,1.),0.);
    submerged=step(Pf.y+COLRW,0.);
    // hand-blown waviness in the glass
    vec4 nW=textureLod(uN,wu*vec2(1.,.5)+.17,0.);
    vec3 Nb=normalize(N+(CR*(nW.r-.5)+CU*(nW.g-.5))*.075+(CR*(n1.g-.5)+CU*(n1.r-.5))*.022+(CR*(n0.r-.5)-CU*(n0.g-.5))*.005);
    // silver film: thin it is smoky and grainy, thick it is a mirror, and it transmits a little blue
    float d=sw.r; float gr=n0.b; float mott=n1.g;
    float fine=d*(1.+(gr-.5)*2.2*exp(-d*3.2))*(.97+.08*mott);
    fine*=1.-.8*smoothstep(.985,.998,textureLod(uN,wu*vec2(9.,4.5),0.).a)*smoothstep(.45,.6,n0.b);
    fine=max(fine,0.);
    float ptc=smoothstep(.42,.66,nW.r*.55+n1.r*.5);
    fine*=mix(1.,.76,ptc*IMPF);
    float Rf=pow(1.-exp(-3.6*fine),1.45)*.955;
    vec3 Ts=pow(TTINT,vec3(fine*3.))*exp(-3.4*fine);
    float nv=max(dot(-V,N),0.),Fr=.04+.96*pow(1.-nv,5.);
    vec3 Rg=reflect(V,Nb);
    vec3 eG=env(Rg,1.0+n1.g*.8+ETCH*3.2+2.6*smoothstep(.5,.05,nv));
    float lodS=ETCH*2.3+mix(4.0,.55,smoothstep(.12,.80,fine))+ptc*IMPF*.8+smoothstep(.56,.75,mott)*.3;
    vec3 Ni=normalize(Nb+(N+V)*.007);
    vec3 eS=(fine>.002)?env(reflect(V,Ni),lodS):vec3(0.);
    eS=mix(eS,vec3(.50,.51,.50)*SKYAMB,.03+.045*ptc*IMPF+.05*(1.-smoothstep(.2,.9,fine)));
    // what lies behind the front glass
    vec4 g1=textureLod(uG1,gq,0.),gb=textureLod(uGb,gq,0.),g2=textureLod(uG2,gq,0.),g3=textureLod(uG3,gq,0.);
#if E8
    gb=vec4(gb.rg-.5,gb.b*.25,gb.a*9.); g2=vec4(g2.rgb*g2.rgb*16.,gb.b); g3=g3*2.-1.;
#endif
    float hf=HAt(Pf);
    bool under=Pf.y<hf;
    float ts=V.y<0.?(hf-Pf.y)/V.y:-1.;
    if(ts>0.){ vec3 q=Pf+V*ts; float hq=HAt(q); ts=(hq-Pf.y)/V.y; }
    bool crossL=!under&&ts>0.&&ts<gb.b;
    bool liq=under||crossL;
    vec3 Dm=oct(liq?g3.ba:g3.rg);
    float L=liq?g2.a:gb.b;
    vec3 vI=under?refract(V,N,.75):V;
    vec3 Pb=Pf+vI*L; vec2 wb=wallUv(Pb); float db=textureLod(uWall,wb,0.).r;
    float nb0=textureLod(uN,wb*vec2(8.,4.),0.).b;
    db=db*(1.+(nb0-.5)*2.*exp(-db*3.));
    float Rb=pow(1.-exp(-3.6*db),1.45)*.92;
    vec3 Tb=pow(TTINT,vec3(db*3.))*exp(-3.4*db);
    // the liquid's far line is blended over about a pixel, and the air and liquid views come resolved from the bake
    float lq=under?1.:(ts>0.?clamp((gb.b-ts)/.0016+.5,0.,1.):0.);
    vec3 thru=g2.rgb;
    if(lq<1.){
      vec3 a=g1.rgb*g1.rgb*4.;
      if(g1.a>.002){ vec4 bb=textureLod(uBase,clamp(uv+gb.rg/g1.a,.002,.998),0.); a+=g1.a*bb.rgb*bb.rgb*4.; }
      thru=mix(a,thru,lq);
    }
    vec3 I=Tb*thru;
    if(db>.004){ float lb=mix(5.,.5,smoothstep(.12,.8,db)); I+=Rb*RTINT*mix(vec3(.78,.60,.43),vec3(1.),smoothstep(.10,.55,db))*env(Dm,lb); }
    // colloid cloud along the path through the liquid
    float T=1.;
    if(liq&&CLOUDN>.002){
      vec3 p1=(under?Pf:Pf+V*max(ts,0.))+vI*L*.32,p2=(under?Pf:Pf+V*max(ts,0.))+vI*L*.72;
      float tw1=(p1.y)*2.6,tw2=(p2.y)*2.6;
      vec2 q1=p1.xz/(R0*2.3)+.5,q2=p2.xz/(R0*2.3)+.5;
      vec4 c1=textureLod(uCloud,q1+vec2(p1.y*.8,-p1.y*.5),0.),c2=textureLod(uCloud,q2+vec2(-p2.y*.6,p2.y*.7),0.);
      float dn=c1.r*.55+c2.r*.45;
      float vert=.72+.56*textureLod(uN,vec2(q1.x*.5,p1.y*3.)+TIME*.004,0.).r;
      float dep=clamp((hf-Pf.y)/(R0*.75),0.,1.);
      dn=mix(1.,max(dn,0.),.5)*vert*(.7+.8*dep);
      float sig=CLOUDN*dn*(L/(R0*1.5)+.25)*2.5;
      T=exp(-sig);
      vec3 sc=CLNT*(.46+.55*max(-N.y*.2+dot(N,normalize(vec3(.72,.42,.22))),0.)*.8)*SKYAMB;
      I=mix(sc,I,T);
    }
    if(crossL){ vec3 ns=normalize(vec3(-HH.y,1.,-HH.z)); float nvs=max(dot(-V,ns),0.),Fs=.02+.98*pow(1.-nvs,5.); I=mix(I,env(reflect(V,ns),1.5)*.85,Fs); }
    // meniscus: the front and back contact lines
    float mfr=abs(Pf.y-hf); I*=1.-.55*exp(-mfr*mfr/(.0008*.0008))*(1.-fine); I+=.12*SKYC*exp(-pow((Pf.y-hf-.0012)/.0007,2.))*(1.-fine);
    // the wet film above the liquid is a thin distorted sheen
    float film=sw.g*(under?0.:1.);
    I*=1.-film*.06;
    I=mix(I,vec3(.62,.64,.63)*SKYAMB,ETCH*.30);
    // glass absorbs most where the path through it is long: dark edges
    float ep=max(gb.a-1.,0.);
    I*=mix(vec3(1.),vec3(.40,.52,.47),clamp(ep*.09,0.,1.));
    // grime on the outer glass catches the light
    float dust=smoothstep(.62,.8,textureLod(uN,wu*vec2(2.,1.)+.31,0.).g)*.035+smoothstep(.985,1.,n0.a)*.08;
    float smg=smoothstep(.50,.72,textureLod(uN,wu*vec2(3.,1.5)+.61,0.).r);
    vec3 inner=Rf*RTINT*mix(vec3(.78,.60,.43),vec3(1.),smoothstep(.10,.55,fine))*eS+Ts*I;
    S=eG*Fr*(1.+dust*3.)*(1.+smg*.6)+(1.-Fr)*inner+SKYC*(dust*.20+smg*.018);
    float fogB=smoothstep(.020,.001,Pf.y+COLRW)*step(0.,Pf.y+COLRW)*(.35+.65*n1.g);
    S=mix(S,vec3(.60,.62,.62)*SKYAMB,fogB*(.06+.20*clamp(TEMP*1.6,0.,1.)));
    S=mix(S,S*vec3(.93,.96,.97),submerged);
    if(lay){ o=vec4(sqrt(clamp(S/4.,0.,1.)),cov*(1.-submerged)); return; }
  }
  if(lay){ o=vec4(0.); return; }
  vec3 col=bcol;
  // ----- water surface -----
  if(wm>.02){
    vec3 n=normalize(vec3(-rip.x,1.,-rip.y));
    float nv=max(dot(-rd,n),0.),Fw=.02+.98*pow(1.-nv,5.);
    vec3 R=reflect(rd,n); if(R.y<.015) R.y=.015;
    vec3 er=env(R,.8);
    float rn=dot(R,LAYN),sq=dot(CEN-wp,LAYN)/max(rn,.02);
    vec3 Q=wp+R*sq; vec3 dq=Q-RO; float wq=dot(dq,CF);
    vec2 uq=vec2(dot(dq,CR),dot(dq,CU))/(wq*TANH)*.5+.5;
    vec4 lyr=textureLod(uLayer,clamp(uq,.0,1.),0.);
    er=mix(er,lyr.rgb*lyr.rgb*4.,lyr.a*step(0.,rn)*step(sq,1.));
    vec3 under=(cov>.003&&submerged>.5)?mix(bcol,S,cov):bcol;
    vec3 w=mix(under,er,Fw);
    // meniscus ring where the water climbs the glass
    float dr=length(wp.xz-CEN.xz)-sqrt(max(R0*R0-COLRW*COLRW,0.));
    float mring=exp(-pow(max(dr,0.)/.0024,2.))*step(-.004,dr);
    w=mix(w,env(reflect(rd,normalize(vec3(wp.x-CEN.x,dr<0.?1.:.0012/max(dr,.0006)+1.,wp.z-CEN.z))),1.2)*.92,mring*.75);
    col=mix(bcol,w,wm);
    if(cov>.003&&submerged<.5) col=mix(col,S,cov);
  } else if(cov>.003) col=mix(col,S,cov);
  // ----- steam over warm water -----
  if(STM>.01){
    vec2 sp=uv*vec2(1.0,.62);
    vec2 w0=textureLod(uN,sp*.5+vec2(TIME*.008,-TIME*.02),0.).rg-.5;
    float sv=textureLod(uN,sp*.62+w0*.42+vec2(-TIME*.005,-TIME*.038),0.).r;
    float dn=smoothstep(.47,.70,sv)*smoothstep(.22,.36,uv.y)*smoothstep(.92,.40,uv.y);
    col=mix(col,vec3(.95,.97,.98),dn*STM*.09*(1.-.55*cov));
  }
  // ----- camera -----
  col*=EXPO;
  col*=.95+.10*textureLod(uN,vec2(TIME*.0023,.37),0.).r;
  vec3 mapped=col*(1.+col*.10)/(1.+col*.62);
  mapped=clamp(mapped*1.34,0.,1.);
  vec3 g=pow(mapped,vec3(1./2.2));
  g=g*g*(3.-2.*g)*.22+g*.78;
  g+=(fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))-.5)/255.;
  o=vec4(g,1.);
}`,b0=(t,o)=>t.replace(/ ?out vec4 o;/,"").replace("void main(){","void "+o+"(){"),Qo=`uniform int uMode; out vec4 o;
`+b0(Bo,"mNoise")+b0(Oo,"mArt")+b0(Go,"mOut")+b0(Yo,"mShade")+`
void main(){ if(uMode==0) mNoise(); else if(uMode==1) mArt(); else if(uMode==2) mOut(); else mShade(); }`,Jo=`uniform int uMode; out vec4 o;
`+b0(Xo,"mDof").replace("${PACK_S}","")+Ho.replace(/^\s*uniform sampler2D uS; uniform float uFoc,uK; uniform int uTaps; out vec4 o;/,"").replace(B0,"").replace("void main(){","void mDof2(){")+`
void main(){ if(uMode==0) mDof(); else mDof2(); }`,it=p.hash+"|"+(Ne?1:0);let $=l.bakes.get(it);l.pM||e.getExtension("KHR_parallel_shader_compile");let D0=(k==="Low Sun"&&!H?1:0)|(re==="Skylight"?2:4);for(let t=0;t<q0;t++){const o=k0[t*12+7];o>=5&&o<=8&&(D0|=8<<o-5)}l.pSv=l.pSv||[];let R=l.pSv.find(t=>(t.mk&D0)===D0),ut=null;if(!R){const t=l.pSv.length?127:D0;R=ut=Re(Do(t)),R.mk=t,l.pSv.push(R)}const st=!$&&!l.pFl[de]?Re(Ko):null;if(!l.pM){const t=Re(Qo),o=Re(Jo),a=Re(Vo),r=Re($o),n=Re(jo),f=t,i=t,m=t,E=o;Ee(t,"bake"),Ee(o,"blur"),Ee(a,"wall"),Ee(r,"cloud"),Ee(n,"main"),Object.assign(l,{pN:t,pA:f,pO:i,pD:o,pD2:E,pSh:m,pW:a,pC:r,pM:n}),e.uniformBlockBinding(n,e.getUniformBlockIndex(n,"U"),0),e.useProgram(n),[["uBase",0],["uG0",1],["uG1",2],["uG2",3],["uG3",4],["uWall",5],["uCloud",6],["uRip",7],["uN",8],["uShade",9],["uLayer",10],["uEnv",11],["uGb",12]].forEach(P=>e.uniform1i(n.u[P[0]],P[1]))}st&&(Ee(st,"flask"),l.pFl[de]=st);const w=l.pFl[de];ut&&Ee(ut,"scene");const{pN:Ke,pA:Gt,pO:Ye,pD:Ve,pD2:$e,pSh:te,pW:S,pC:Ze,pM:Ot}=l,ea=()=>{if(!l.pR){const t=Ee(Re(Zo),"ripple");e.useProgram(t),e.uniform1i(t.u.uS,0),e.uniform2f(t.u.uTx,1/128,1/96),l.pR=t}return l.pR},Xt=()=>{const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texStorage2D(e.TEXTURE_2D,10,e.RGBA8,512,512),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);{const u=ce(t);_(512,512,u),d(13,null),e.activeTexture(e.TEXTURE0),e.useProgram(Ke),e.uniform1i(Ke.u.uN,13),e.uniform1i(Ke.u.uMode,0),e.uniform1i(Ke.u.uOct,5);const v=l0>>>8&65535;[[6,0,!0,!1,!1,!0],[26,101,!1,!0,!1,!1],[90,211,!1,!1,!0,!1]].forEach(x=>{e.colorMask(x[2],x[3],x[4],x[5]),e.uniform1f(Ke.u.uPer,x[0]),e.uniform1ui(Ke.u.uSeed,v+x[1]),q()}),e.colorMask(!0,!0,!0,!0),e.deleteFramebuffer(u),e.bindTexture(e.TEXTURE_2D,t),e.generateMipmap(e.TEXTURE_2D)}const o=e.createTexture();d(0,o),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA32F,3,q0),e.texSubImage2D(e.TEXTURE_2D,0,0,0,3,q0,e.RGBA,e.FLOAT,new Float32Array(k0)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const a=V(272,204,e.RGBA8,0,0,e.LINEAR);{const u=ce(a);_(272,204,u),e.useProgram(Gt),e.uniform1i(Gt.u.uMode,1),q(),e.deleteFramebuffer(u)}const r=V(512,256,e.RGB10_A2,0,0,e.LINEAR);{const u=ce(r);_(512,256,u),e.useProgram(Ye),e.uniform1i(Ye.u.uMode,2),d(13,t),e.uniform3fv(Ye.u.uSkyC,Uo),e.uniform1f(Ye.u.uSkyI,ko),e.uniform1f(Ye.u.uSnow,k==="Snow"?1:0),e.uniform1f(Ye.u.uTree,Z==="Against the light"?.3:1),q(),d(13,null),e.activeTexture(e.TEXTURE0),e.deleteFramebuffer(u)}const n=()=>{e.useProgram(R);const u=R.u;e.uniform1i(u.uPrim,0),e.uniform1i(u.uN,1),e.uniform1i(u.uArt,2),e.uniform1i(u.uOut,3),e.uniform1i(u.uCount,q0),e.uniform1f(u.uSkyI,_o),e.uniform3fv(u.uSkyC,Ct),e.uniform1f(u.uSun,k==="Low Sun"&&!H?1:0),e.uniform1f(u.uAmb,H?.12:1),e.uniform3fv(u.uTub,H?[.16,.135,.095]:[.07,.072,.07]),e.uniform1f(u.uSkyl,re==="Skylight"?1:0),e.uniform1i(u.uNW,we.length),e.uniform1i(u.uBnc,2);const v=new Float32Array(16),x=new Float32Array(12);we.forEach((O,C)=>{v.set([O[0],O[1],O[2],O[3]],C*4),x.set([O[4],O[5],O[6]],C*3)}),e.uniform4fv(u.uLP,v),e.uniform3fv(u.uLN,x),e.uniform4f(u.uBay,He[0]||0,He[1]||0,He[2]||0,He.length),e.uniform1f(u.uWH,It),e.uniform4f(u.uTray,D,G,K,Y),d(0,o),d(1,t),d(2,a),d(3,r)},f=e.createTexture();e.bindTexture(e.TEXTURE_CUBE_MAP,f);const i=Math.floor(Math.log2(ke))+1;e.texStorage2D(e.TEXTURE_CUBE_MAP,i,e.RGB10_A2,ke,ke),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR);{const u=e.createFramebuffer(),v=[[[1,0,0],[0,0,-1],[0,-1,0]],[[-1,0,0],[0,0,1],[0,-1,0]],[[0,1,0],[1,0,0],[0,0,1]],[[0,-1,0],[1,0,0],[0,0,-1]],[[0,0,1],[1,0,0],[0,-1,0]],[[0,0,-1],[-1,0,0],[0,-1,0]]];n(),e.uniform1i(R.u.uMode,0),e.uniform3f(R.u.uRo,0,B,0),e.uniform1f(R.u.uTan,1);for(let x=0;x<6;x++)e.bindFramebuffer(e.FRAMEBUFFER,u),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+x,f,0),_(ke,ke,u),e.useProgram(R),e.uniform3fv(R.u.uF,v[x][0]),e.uniform3fv(R.u.uR,v[x][1]),e.uniform3fv(R.u.uU,v[x][2]),q();e.deleteFramebuffer(u),e.bindTexture(e.TEXTURE_CUBE_MAP,f),e.generateMipmap(e.TEXTURE_CUBE_MAP)}const m=Ne?1024:512,E=V(m,m,ct,0,0,e.LINEAR),P=ce(E);_(m,m,P),n(),e.uniform1i(R.u.uMode,1),e.uniform3fv(R.u.uRo,g),e.uniform3fv(R.u.uF,W),e.uniform3fv(R.u.uR,b),e.uniform3fv(R.u.uU,N),e.uniform1f(R.u.uTan,Xe),q();const I=V(m,m,ct,0,0,e.LINEAR),Ge=ce(I),pe=Math.hypot(g[0],g[1]-B,g[2])-h*.3;_(m,m,Ge),e.useProgram(Ve),e.uniform1i(Ve.u.uMode,0),e.uniform1i(Ve.u.uS,0),d(0,E),e.uniform1f(Ve.u.uFoc,pe),e.uniform1f(Ve.u.uK,.0105),e.uniform1i(Ve.u.uTaps,36),q();const be=V(m,m,e.RGB10_A2,0,0,e.LINEAR),z=ce(be);_(m,m,z),e.useProgram($e),e.uniform1i($e.u.uMode,1),e.uniform1i($e.u.uS,0),d(0,I),e.uniform1f($e.u.uFoc,pe),e.uniform1f($e.u.uK,.0105),e.uniform1i($e.u.uTaps,14),q(),e.deleteFramebuffer(z),e.deleteFramebuffer(P),e.deleteTexture(E),e.deleteFramebuffer(Ge),e.deleteTexture(I);const M=Ne?1200:512,T=Ne?720:256,oe=Ne?460:256,Et=(C0-We)/p0,fe=u=>Math.round(u*Et),Pt=ne?e.RGBA16F:e.RGB10_A2,fa=ne?e.RGBA16F:e.RGBA8,vo=V(fe(M),M,Pt,0,0,e.LINEAR),ho=V(fe(T),T,e.RGBA8,0,0,e.LINEAR),xo=V(fe(T),T,Pt,0,0,e.LINEAR),po=V(fe(T),T,Pt,0,0,e.LINEAR),Mt=V(fe(oe),oe,fa,0,0,e.LINEAR);e.useProgram(w),e.uniform1i(w.u.uEnv,0),d(0,f,!0),e.uniform1f(w.u.uLB,Dt),e.uniform1i(w.u.uIt,96),e.uniform1i(w.u.uG3,3),e.uniform1f(w.u.uGx,We*2-1),e.uniform1f(w.u.uGw,(C0-We)*2),e.uniform1f(w.u.R,h),e.uniform1f(w.u.RN,tt),e.uniform3fv(w.u.uRo,g),e.uniform3fv(w.u.uF,W),e.uniform3fv(w.u.uR,b),e.uniform3fv(w.u.uU,N),e.uniform1f(w.u.uTan,Xe),e.uniform3f(w.u.uC,0,B,0);const s0=(u,v,x,O,C)=>{const f0=ce(u),wo=fe(v);_(wo,v,f0),e.useProgram(w),C&&e.colorMask(C[0],C[1],C[2],C[3]),e.uniform1f(w.u.uPx,p0/v),e.uniform2f(w.u.uTxl,(C0-We)*2/wo,p0*2/v),e.uniform1i(w.u.uPass,x),e.uniform1i(w.u.uAA,O),q(),e.colorMask(!0,!0,!0,!0),e.deleteFramebuffer(f0)};s0(vo,M,0,1),s0(ho,T,1,16),s0(xo,T,5,16),s0(po,T,2,16),s0(Mt,oe,3,4,[!0,!0,!1,!1]),s0(Mt,oe,4,4,[!1,!1,!0,!0]);const bo=V(256,256,e.RGBA8,0,0,e.LINEAR),go=ce(bo);_(256,256,go),e.useProgram(te),e.uniform1i(te.u.uMode,3),e.uniform3fv(te.u.uRo,g),e.uniform3fv(te.u.uF,W),e.uniform3fv(te.u.uR,b),e.uniform3fv(te.u.uU,N),e.uniform1f(te.u.uTan,Xe),e.uniform3f(te.u.uC,0,B,0),e.uniform1f(te.u.uRad,h);{const u=we[Math.min(1,we.length-1)],v=z0([u[0],u[1]-B,u[2]]);e.uniform3fv(te.u.uL,v),e.uniform1f(te.u.uKcau,1)}q(),e.deleteFramebuffer(go);const M0=new Float32Array(512*4);for(let u=0;u<512;u++){const v=d0+(kt-d0)*u/511;let x=0,O=h*1.5;if(Nt(0,v)>0){M0[u*4]=0,M0[u*4+1]=v;continue}for(let C=0;C<18;C++){const f0=(x+O)/2;Nt(f0,v)<0?x=f0:O=f0}M0[u*4]=x,M0[u*4+1]=v}const To=e.createTexture();d(0,To),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA32F,1,512),e.texSubImage2D(e.TEXTURE_2D,0,0,0,1,512,e.RGBA,e.FLOAT,M0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),$={noiseT:t,cube:f,baseT:be,g0:vo,g1:ho,gb:xo,g2:po,g3:Mt,shadeT:bo,profT:To},e.deleteTexture(o),e.deleteTexture(a),e.deleteTexture(r);const yo=(u,v)=>{e.deleteTexture(v.noiseT),e.deleteTexture(v.cube),e.deleteTexture(v.baseT),e.deleteTexture(v.g0),e.deleteTexture(v.g1),e.deleteTexture(v.gb),e.deleteTexture(v.g2),e.deleteTexture(v.g3),e.deleteTexture(v.shadeT),e.deleteTexture(v.profT),v.dead=!0,l.bakes.delete(u)};for(const[u,v]of l.bakes){if(l.bakes.size<3)break;l.tick-v.last<300||yo(u,v)}for($.mb=(512*512*4*1.34+ke*ke*24*1.34+m*m*4+65536*4+fe(T)*T*4+(fe(M)*M+2*fe(T)*T+fe(oe)*oe)*(ne?8:4))/1048576;;){let u=$.mb,v=null,x=null;for(const[O,C]of l.bakes)u+=C.mb||0,(!x||C.last<x.last)&&(v=O,x=C);if(!x||l.bakes.size<10&&u<=160)break;yo(v,x)}$.last=l.tick,l.bakes.set(it,$)};l.tick=l.tick||0,$||Xt();let{noiseT:je,cube:Ht,baseT:Wt,g0:Kt,g1:Yt,gb:Vt,g2:$t,g3:Zt,shadeT:jt,profT:G0}=$;const Qe=512,Je=256,e0=(t,o,a)=>{const r=V(t,o,ct,0,0,e.LINEAR,a,e.CLAMP_TO_EDGE);return{t:r,f:ce(r)}},Qt={},Jt=()=>{let t=l.sims.find(o=>l.tick-o.last>=3e3);return!t&&l.sims.length>=10&&(t=l.sims.reduce((o,a)=>a.last<o.last?a:o)),t||(t={wa:e0(Qe,Je,e.REPEAT),wb:e0(Qe,Je,e.REPEAT),ca:e0(128,128),cb:e0(128,128),ra:e0(128,96),rb:e0(128,96)},t.layT=V(256,256,e.RGBA8,0,0,e.LINEAR),t.layF=ce(t.layT),l.sims.push(t)),t.last=l.tick,t.own=Qt,t};let g0=Jt(),{wa:Ue,wb:t0,ca:_e,cb:o0,ra:qe,rb:a0,layT:eo,layF:to}=g0;const ta=!!ne;e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0);for(const t of[qe,a0,_e,o0])e.bindFramebuffer(e.FRAMEBUFFER,t.f),e.clear(e.COLOR_BUFFER_BIT);const oo=ae==="Formalin"?1.5:ae==="Rochelle Salt"?.8:1,ao=ae==="Formalin"?1.3:ae==="Rochelle Salt"?.55:.42,ft=Fe==="Gold"?[1,.8,.42]:Fe==="Copper"?[.98,.64,.5]:[.975,.958,.915],lt=Fe==="Gold"?[.72,.92,.62]:Fe==="Copper"?[.92,.62,.48]:[.72,.76,.95],oa=Fe==="Gold"?[.46,.11,.15]:Fe==="Copper"?[.42,.23,.15]:ae==="Formalin"?[.1,.092,.085]:ae==="Rochelle Salt"?[.3,.312,.335]:[.2,.155,.11];let xe=0,mt=0,O0=0,T0=0,Ie=0,r0=0,n0=0,y0=0,X0=0,Pe=0,Ce=0,c0=0,i0=0,ie=0,j=40,Be=.82,ue=.52,se=.45,De=1,Q=0,H0=!1,ro=.5,no=.5,W0=0,K0=0,w0=0,R0=0,E0=[0,0,0],Y0=[0,0,0],vt=1.1,dt=0,V0=0;const $0=2*Math.sqrt(1.1*9.81/h),aa=3.6;let Me=J;const co=new Float32Array(16*4),ht=l.ubo;e.bindBuffer(e.UNIFORM_BUFFER,ht),e.bufferData(e.UNIFORM_BUFFER,co.byteLength,e.DYNAMIC_DRAW),e.useProgram(S),e.uniform1i(S.u.uS,0),e.uniform1i(S.u.uP,1),e.uniform1i(S.u.uN,2),e.uniform2f(S.u.uTx,1/Qe,1/Je),e.useProgram(Ze),e.uniform1i(Ze.u.uS,0),e.uniform1i(Ze.u.uN,1);const da=h0,io=Lt==="Greasy"?1:0,ra=Lt==="Etched",xt=()=>{const t=S.u;e.uniform4f(t.uH,Me,Pe,Ce,ie*ie*h*h/19.6*1),e.uniform1f(t.uDrop,Ie*.618)},pt=p.home?0:(X(-.08,.26)+.08)/.34,bt=p.home?J+.014:A0?h*(de===1?1+.2*pt:.6+.2*pt):J-.004+.024*pt,uo=d0-.01;let u0=A0?uo:J,gt=!1;A0&&(ue=0,se=1,Be=.04,V0=5);const so=p.home?J:Math.max(J,bt+.003);_(Qe,Je,Ue.f),e.useProgram(S),d(0,t0.t),d(1,G0),d(2,je);const fo=p.home?.95:A0?1:X(.78,.98);Me=so,e.uniform4f(S.u.uI,1,bt,fo,0),e.uniform4f(S.u.uB,ao,io,1/(h*h),ne?0:1),e.uniform4f(S.u.uA,0,0,0,0),xt(),q(),e.uniform4f(S.u.uI,0,0,0,0),Me=u0;const na=(t,o,a,r)=>{_(Qe,Je,t0.f),e.useProgram(S),d(0,Ue.t),d(1,G0),d(2,je),e.uniform4f(S.u.uA,t,o,a,r),xt(),q();const n=Ue;Ue=t0,t0=n},Tt=t=>{_(128,128,o0.f),e.useProgram(Ze),d(0,_e.t),d(1,je),e.uniform4f(Ze.u.uA,t,ie,Be*.11*Math.pow(2,(j-40)/15),.05+j*.0016),e.uniform4f(Ze.u.uB,xe*.021,-xe*.017,c0*.25,i0*.25),q();const o=_e;_e=o0,o0=o},ca=()=>{const t=ea();_(128,96,a0.f),e.useProgram(t),e.uniform2f(t.u.uBox,K,Y),d(0,qe.t);const o=22e-5;e.uniform4f(t.u.uF,.017*Math.tanh(r0/.03)-D,.017*Math.tanh(n0/.03)-G,y0*o,X0*o),e.uniform4f(t.u.uK0,E0[0],E0[1],E0[2],0),e.uniform4f(t.u.uK1,Y0[0],Y0[1],Y0[2],Math.sqrt(Math.max(h*h-B*B,8e-4))),q();const a=qe;qe=a0,a0=a,E0[2]=0,Y0[2]=0};for(let t=0;t<8;t++)Tt(.6);const Z0=N0(0,B,0),yt=Z==="Shelf wall"?[0,0,-1]:z0([W[0],0,W[2]]),ha=g.slice(),lo=(t,o,a)=>{_(o,o,t),e.useProgram(Ot),e.uniform1i(Ot.u.uLay,a),e.bindBufferBase(e.UNIFORM_BUFFER,0,ht),d(0,Wt),d(1,Kt),d(2,Yt),d(3,$t),d(4,Zt),d(5,Ue.t),d(6,_e.t),d(7,qe.t),d(8,je),d(9,jt),d(10,a?null:eo),d(11,Ht,!0),d(12,Vt),q()},ia=(k==="Bright Haze"?1.1:1)*(H?.7:1),ua=Z==="Against the light"?.62:Z==="From the windows"&&!H?.86:1,wt=H?Ct.map(t=>t*.7):nt,Rt=oa,sa=()=>{const t=co;t.set([g[0],g[1],g[2],Xe,b[0],b[1],b[2],xe%1e3,N[0],N[1],N[2],(j-38)/40,W[0],W[1],W[2],se],0),t.set([.017*Math.tanh(r0/.03),B,.017*Math.tanh(n0/.03),Dt,Me,Pe,Ce,ie*ie*h*h/19.6,ue*(ae==="Formalin"?1.3:ae==="Rochelle Salt"?.72:1),De,Q,ae==="Rochelle Salt"?.25:ae==="Formalin"?1:.7,ft[0],ft[1],ft[2],We,lt[0],lt[1],lt[2],C0-We],16);const o=.017*Math.tanh(r0/.03),a=.017*Math.tanh(n0/.03),r=N0(o,B,a),n=.045*Math.tanh(-y0*1.1),f=Math.cos(n),i=Math.sin(n);t.set([yt[0],yt[1],yt[2],0,r[0]-Z0[0],r[1]-Z0[1],Z0[0],Z0[1],f,i,ia,B,D,G,K,Y,d0,kt-d0,(k==="Snow"?.96:1.04)*ua,h,wt[0],wt[1],wt[2],Math.max(0,(j-44)/26),.36+(Rt[0]-.36)*De,.27+(Rt[1]-.27)*De,.15+(Rt[2]-.15)*De,ra?1:0],36),e.bindBuffer(e.UNIFORM_BUFFER,ht),e.bufferSubData(e.UNIFORM_BUFFER,0,t)},mo=()=>{sa(),lo(to,256,1),lo(null,p.size,0)};mo();const P0=[.613,1.27,.37,1.71,.91];return(t,o)=>{if($.dead&&($=l.bakes.get(it),$||Xt(),{noiseT:je,cube:Ht,baseT:Wt,g0:Kt,g1:Yt,gb:Vt,g2:$t,g3:Zt,shadeT:jt,profT:G0}=$),g0.own!==Qt){g0=Jt(),{wa:Ue,wb:t0,ca:_e,cb:o0,ra:qe,rb:a0,layT:eo,layF:to}=g0,e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0);for(const M of[qe,a0,_e,o0])e.bindFramebuffer(e.FRAMEBUFFER,M.f),e.clear(e.COLOR_BUFFER_BIT);_(Qe,Je,Ue.f),e.useProgram(S),d(0,t0.t),d(1,G0),d(2,je);const z=Me;Me=so,e.uniform4f(S.u.uI,1,bt,fo,0),e.uniform4f(S.u.uB,ao,io,1/(h*h),ne?0:1),e.uniform4f(S.u.uA,0,0,0,0),xt(),q(),e.uniform4f(S.u.uI,0,0,0,0),Me=z;for(let M=0;M<8;M++)Tt(.6)}$.last=g0.last=l.tick=l.tick+1,o=Math.min(o,.25);const a=p.input;let r=0;const n=a.taps().length>0;(H0&&!a.down||n&&!a.down&&!H0)&&R0<.02&&w0<.3&&se>.5&&Q<=0&&(Q=aa,p.sound.hit("noise",.35,{cutoff:2400,dur:.7})),a.down?(H0||(ro=a.x,no=a.y,W0=0,K0=0,w0=0,R0=0),W0=a.x-ro,K0=a.y-no,R0=Math.max(R0,Math.hypot(W0,K0)),w0+=o,w0>.2&&(r=1)):(w0=0,R0=0),H0=a.down,mt+=o;let f=0;const i=1/90,m=a.down?Math.max(-.05,Math.min(.05,W0*.11)):.0016*(Math.sin(xe*.61)+.7*Math.sin(xe*.97+1.3)),E=a.down?Math.max(-.05,Math.min(.05,K0*.11)):.0016*(Math.sin(xe*.53+2)+.6*Math.sin(xe*1.13));for(;mt>=i&&f<30;){mt-=i,f++,xe+=i;const z=(m-r0)*240-y0*22,M=(E-n0)*240-X0*22;y0+=z*i,X0+=M*i,r0+=y0*i,n0+=X0*i;const T=1+(Pe*Pe+Ce*Ce)*2.2,oe=$0*$0/4;c0+=(-oe*Pe*T-2*.055*($0/2)*c0-z*1.25/9.81*oe*.92)*i,i0+=(-oe*Ce*T-2*.055*($0/2)*i0-M*1.25/9.81*oe*.92)*i,Pe+=c0*i,Ce+=i0*i;const Et=Pe*i0-Ce*c0;ie+=(Et*.9-ie*.17)*i,ie=Math.max(-16,Math.min(16,ie))}const P=Math.hypot(c0,i0);j+=((r?82:39)-j)*o*(r?.13:.016);const I=Math.pow(2,(j-40)/15),Ge=1+1.1*Math.sqrt(Math.min(1,Math.abs(ie)/7+P*.5));Q>0?(Q-=o,ue+=(0-ue)*o*2.2,se+=(0-se)*o*1.1,Q<=0&&(Q=0,Be=1,ue=0,se=0,De=0,j=Math.min(j,44),gt=u0<J)):(Be+=-Be*I*.0025*o,ue+=(Math.min(1,Be*.9)-ue)*o*.028*I*oo,ue=Math.min(.95,ue),De=Math.min(1,De+o*.05*I));const pe=.0115*I*Ge*oo*(.35+Be)*(.015+ue*1.25);if(Q<=0&&(se=Math.min(1,se+pe*.42*o*(1-se*.4))),O0+=o,Ie++,gt&&(u0=Math.min(J,u0+(J-uo)*o/2),u0>=J&&(gt=!1)),Me=u0,O0>1/16){const z=Math.min(O0,.2);O0=0,na(z,Q>0?0:pe*3,.28,Q>0?2.5:0),Tt(z)}if(ta){if(vt-=o,vt<0&&r+(j-42)/20>0){vt=.26+.9*P0[Ie%5]/(.4+(j-40)*.05);const M=xe*2.399,T=.03+.05*P0[(Ie+2)%5]/1.71;E0=[r0-D+Math.cos(M)*(.066+T),n0-G+Math.sin(M)*(.066+T),16e-5+11e-5*P0[(Ie+1)%5]],p.sound.hit("blip",.05+.08*(j-40)/40,{freq:620+1400*P0[Ie%5]/1.71,pan:.1})}T0+=o;let z=0;for(;T0>=1/60&&z<3;)T0-=1/60,z++,ca();T0>.1&&(T0=0)}dt-=o,dt<0&&P>.25&&(dt=.14+.1*P0[Ie%5],p.sound.hit("noise",Math.min(.5,P*.3),{cutoff:500+P*900,dur:.22,pan:Pe*.6}));const be=Math.floor(se*5);be>V0&&Q<=0&&(V0=be,p.sound.note(84+[0,3,7,10,14][Math.min(4,be)],{dur:1.8,vel:.14,wave:"sine"})),Q>0&&(V0=0),mo()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
