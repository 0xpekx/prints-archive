// Mirror Flask: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/215.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(yt){yt&&function(){const Tt=new WeakMap;yt.add({num:215,name:"Mirror Flask",fam:"Worlds",recipe:"A flask of silvering solution in a warm water bath. The metal grows on the glass wherever the liquid has touched, until the flask reflects the lab around it. The metal and the flask shape change every mint. Drag to swirl the liquid higher up the glass, hold to warm the bath, or tap a finished flask to pour in acid that eats the coat away in clear windows, and it starts again.",interactive:"Drag to swirl the flask and carry the liquid up the glass, hold to warm the bath and speed the reaction, tap a finished flask to pour in acid, which eats the silver away in clear windows that spread and join, and start again with a fresh charge",music:!0,gl:!0,fps:30,seed:0,make(d){const e=d.gl;let e0=0;const wt=d.hash.slice(2);for(let t=0;t<wt.length;t+=8)e0=Math.imul(e0,31)+parseInt(wt.slice(t,t+8),16)|0;let t0=e0>>>0;const Pe=()=>{t0=t0+1831565813|0;let t=Math.imul(t0^t0>>>15,1|t0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},B=(t,o)=>t+(o-t)*Pe(),ie=(t,o,a)=>{let r=0;for(const i of o)r+=i[1];let n=Pe()*r,s=o[0][0];for(const i of o)if(n-=i[1],n<=0){s=i[0];break}return d.home&&(s=a),d.trait(t,s),s},ue=ie("Flask",[["Round",62],["Pear",24],["Conical",14]],"Round"),T0=ie("Fill",[["Half",24],["Two Thirds",56],["Brimming",20]],"Two Thirds"),te=ie("Reducer",[["Glucose",55],["Formalin",31],["Rochelle Salt",14]],"Glucose"),Me=ie("Metal",[["Silver",87],["Gold",8],["Copper",5]],"Silver"),Rt=ie("Glass",[["Clean",74],["Greasy",18],["Etched",8]],"Clean"),L=ie("Weather",[["Overcast",52],["Bright Haze",28],["Low Sun",13],["Snow",7]],"Overcast"),oe=ie("Room",[["Three Bays",52],["Two Bays",34],["Skylight",14]],"Three Bays"),Se=ie("Bath",[["Graniteware",50],["Steel",26],["White Enamel",14],["Copper",10]],"Graniteware");let qe=ie("Angle",[["Level",54],["Low",26],["Over",20]],"Level"),o0=e0^739982445|0;const se=()=>{o0=o0+1831565813|0;let t=Math.imul(o0^o0>>>15,1|o0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Et=se(),ao=se(),na=se(),V0=ao<.5?-1:1,ro=se(),no=se(),w0=!d.home&&Et>=.26&&Et<.36&&(Se==="Graniteware"||Se==="Copper");w0&&(qe="Over the neck",d.trait("Angle",qe));const co=se(),io=se(),uo=se(),ca=se(),$0=(t,o,a,r)=>{let n=0;for(const l of o)n+=l[1];let s=a*n,i=o[0][0];for(const l of o)if(s-=l[1],s<=0){i=l[0];break}return d.home?r:i};let K=$0("Side",[["Shelf wall",52],["From the windows",24],["Against the light",24]],co,"Shelf wall");(w0||K==="Against the light"&&oe==="Skylight")&&(K="Shelf wall");const Z0=$0("Hour",[["Day",80],["Lamps on",20]],io,"Day");Z0==="Lamps on"&&K==="Against the light"&&(K="From the windows");let j0=$0("Stage",[["Growing",76],["Finished",24]],uo,"Growing");Me==="Gold"&&!d.home&&(j0="Finished"),d.trait("Side",K),d.trait("Hour",Z0),d.trait("Stage",j0);const D=Z0==="Lamps on",R0=j0==="Finished",h=ue==="Conical"?.082:ue==="Pear"?.066:.075,Q0=ue==="Pear"?B(.016,.019):B(.019,.024),J0=.34,_=ue==="Conical"?.042:ue==="Pear"?.04:.05,E0=(t,o,a)=>{const r=Math.max(a-Math.abs(t-o),0)/a;return Math.min(t,o)-r*r*a*.25},so=(t,o,a,r)=>{const n=Math.abs(t)-a,s=Math.abs(o)-r;return Math.hypot(Math.max(n,0),Math.max(s,0))+Math.min(Math.max(n,s),0)},fe=ue==="Conical"?2:ue==="Pear"?1:0,Pt=(t,o)=>{const a=so(t,o-J0*.5,Q0,J0*.5);if(fe===0)return E0(Math.hypot(t,o)-h,a,.018);if(fe===1)return E0(E0(Math.hypot(t,o)-h,Math.hypot(t,o-.78*h)-.5*h,.07),a,.03);const r=.075,n=h*1.08,s=Q0,i=o-0,l=s,R=r,E=s-n,N=2*r,_e=t-Math.min(t,i<0?n:s),me=Math.abs(i)-r,de=Math.max(0,Math.min(1,((l-t)*E+(R-i)*N)/(E*E+N*N))),U=t-l+E*de,$=i-R+N*de,F=U<0&&me<0?-1:1;return E0(F*Math.sqrt(Math.min(_e*_e+me*me,U*U+$*$))-.006,a,.016)},a0=-h*1.2,Mt=.2,St=T0==="Half"?.3:T0==="Brimming"?.62:.43,j=ue==="Conical"?T0==="Half"?-.01:T0==="Brimming"?.04:.018:ue==="Pear"?h*(St+.12):h*St,fo=qe==="Low"?.072:qe==="Over"?.29:.118,lo=.445,ke=w0?.3:.235,p=[B(.03,.06)*(d.home?.8:1),fo,lo],Fe=[-.033-(d.home?.003:B(-.012,.012)),qe==="Low"?.078:qe==="Over"?.052:.074,0];if(w0&&(p[0]=V0*(.07+.04*ro),p[1]=.5,p[2]=.17+.05*no,Fe[0]=-V0*.012,Fe[1]=_+j*.5,Fe[2]=-.01),K!=="Shelf wall"){const t=oe==="Two Bays"?V0<0?-1.1:1.3:.05,o=(K==="From the windows"?Math.atan2(.42,.12):Math.atan2(-.42,-t*.42/3.3))-Math.atan2(p[0],p[2]),a=Math.cos(o),r=Math.sin(o);for(const n of[p,Fe]){const s=n[0],i=n[2];n[0]=s*a+i*r,n[2]=-s*r+i*a}}const P0=t=>{const o=Math.hypot(t[0],t[1],t[2]);return[t[0]/o,t[1]/o,t[2]/o]},Ft=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],G=P0([Fe[0]-p[0],Fe[1]-p[1],Fe[2]-p[2]]);let x=P0(Ft(G,[0,1,0])),A=Ft(x,G);{const t=d.home?-.018:B(-.03,.02),o=Math.cos(t),a=Math.sin(t),r=[x[0]*o+A[0]*a,x[1]*o+A[1]*a,x[2]*o+A[2]*a],n=[A[0]*o-x[0]*a,A[1]*o-x[1]*a,A[2]*o-x[2]*a];x=r,A=n}const M0=(t,o,a)=>{const r=[t-p[0],o-p[1],a-p[2]],n=r[0]*G[0]+r[1]*G[1]+r[2]*G[2];return[(r[0]*x[0]+r[1]*x[1]+r[2]*x[2])/(n*ke)*.5+.5,(r[0]*A[0]+r[1]*A[1]+r[2]*A[2])/(n*ke)*.5+.5]},S0=[];let F0=0;const u=(t,o,a,r,n,s,i,l,R,E,N)=>{S0.push(Math.min(t,r),Math.min(o,n),Math.min(a,s),0,Math.max(t,r),Math.max(o,n),Math.max(a,s),i,l,R,E,N||0),F0++},P=(t,o,a,r,n,s,i,l,R,E)=>{S0.push(t,o,a,1,r,n,0,s,i,l,R,E||0),F0++},M=3.3,g=-3.1,pe=-3.4,S=3.2,Q=-.95,A0=2.25,At=[[.3,.14,.05],[.34,.17,.06],[.42,.45,.42],[.62,.66,.63],[.1,.17,.42],[.2,.34,.22],[.7,.68,.6],[.12,.09,.07]],Ae=(t,o,a,r,n,s)=>{const i=At[s],l=s===6?8:5;P(t,o,a,r,o+n*.72,l,i[0],i[1],i[2]),a>-2&&P(t,o+n*.7,a,r*.72,o+n*.78,l,i[0],i[1],i[2]),P(t,o+n*.78,a,r*.42,o+n*.98,l,i[0],i[1],i[2]),n>.14&&a>-2&&Pe()<.7&&P(t,o+n*.98,a,r*.5,o+n*1.04,0,.75,.74,.7)},be=(t,o,a,r,n)=>{let s=t+B(.02,.08);for(;s<o-.05&&F0<554;){const i=B(.028,.055),l=Math.min(n,B(.11,.26)),R=Pe()<.42?Pe()<.5?0:1:Math.floor(Pe()*At.length);Ae(s+i,a,r+B(-.015,.015),i,l,R),s+=i*2+(Pe()<.16?B(.14,.3):B(.006,.04))}},le=[.7,.71,.63],c=[.26,.17,.1],et=[.42,.45,.4];for(const t of[-.3,.14,.58,1.02,1.46])be(-.98,.86,t,2.98,.38);u(-1.9,-.09,-.56,1.7,-.05,.96,11,.5,.53,.5),u(-1.84,Q,-.5,1.64,-.09,.9,0,et[0],et[1],et[2]);const O=.165,X=.128,q=-.02,k=-.005,vo=-.04,r0=.013,ge=.0085,z=Se==="Steel"?[.4,.41,.42]:Se==="Copper"?[.52,.27,.15]:Se==="Graniteware"?[.15,.2,.27]:oe==="Skylight"?[.38,.39,.37]:L==="Bright Haze"?[.5,.51,.49]:[.7,.71,.68],n0=Se==="White Enamel"?6:Se==="Graniteware"?7:4;u(q-O,-.05,k-X,q+O,vo,k+X,n0,z[0],z[1],z[2]),u(q-O-ge,-.05,k-X-ge,q-O,r0,k+X+ge,n0,z[0],z[1],z[2]),u(q+O,-.05,k-X-ge,q+O+ge,r0,k+X+ge,n0,z[0],z[1],z[2]),u(q-O,-.05,k-X-ge,q+O,r0,k-X,n0,z[0],z[1],z[2]),u(q-O,-.05,k+X,q+O,r0,k+X+ge,n0,z[0],z[1],z[2]),Ae(-.335,-.05,-.335,.05,.215,0),u(-.378,.03,-.287,-.292,.09,-.2865,0,.84,.82,.74),Ae(.3,-.05,-.4,.042,.17,2),P(.17,-.05,-.36,.035,.065,5,.66,.7,.68),Ae(.4,-.05,.34,.085,.13,6),Ae(-.52,-.05,.42,.045,.17,1),P(-.34,-.05,.55,.05,-.04,4,.2,.2,.22),P(-.34,-.04,.55,.0065,.13,4,.56,.55,.5),P(.62,-.05,-.2,.09,0,8,.8,.8,.76),P(.75,-.05,.42,.05,.1,5,.42,.45,.42),u(g,-.09,pe,M,-.05,-2.74,11,.74,.75,.72),u(g,Q,pe,M,-.09,-2.8,0,le[0]*.82,le[1]*.82,le[2]*.82);for(let t=g+.5;t<M;t+=.72)u(t,Q+.1,-2.79,t+.02,-.12,-2.78,0,.25,.25,.22);u(g,.56,pe,M,.59,-3.1,1,c[0],c[1],c[2]),u(g,.98,pe,M,1.01,-3.1,1,c[0],c[1],c[2]),u(g,1.4,pe,M,1.43,-3.1,1,c[0],c[1],c[2]),be(-1.9,.6,.59,-3.24,.36),be(-1.2,.2,1.01,-3.24,.3),be(-1.2,-.3,-.05,-3,.5),be(.28,1.25,-.05,-3.02,.5),P(.02,-.05,-3.18,.016,.42,4,.62,.52,.28),u(0,.4,-3.19,.04,.43,-2.92,4,.62,.52,.28),P(.02,.28,-2.92,.012,.42,4,.62,.52,.28),u(-.18,-.05,-3.1,.24,-.042,-2.76,4,.34,.35,.35),u(-2.95,-.05,-3.38,-2,1.28,-3.32,0,.24,.25,.24),u(-3.02,-.05,-3.4,-2.95,1.42,-2.82,0,.6,.62,.55),u(-2,-.05,-3.4,-1.93,1.42,-2.82,0,.6,.62,.55),u(-3.02,1.28,-3.4,-1.93,1.45,-2.82,0,.62,.64,.57),u(-2.95,.55,-2.87,-2,.59,-2.83,4,.42,.42,.4),u(-1.86,.22,pe,.3,.245,-3.14,1,c[0],c[1],c[2]),be(-1.84,.28,.245,-3.26,.27),be(-1.78,-.42,-.05,-3.02,.26),u(-.34,-.05,-3.2,.1,.13,-2.9,0,.3,.31,.29),P(-.12,.13,-3.05,.075,.2,4,.5,.5,.48),u(.32,.26,pe,1.7,.285,-3.16,1,c[0],c[1],c[2]),be(.34,1.66,.285,-3.28,.24),u(-2.5,Q,S-.04,-1.4,1.36,S,1,c[0]*1.25,c[1]*1.25,c[2]*1.25),u(-2.42,.45,S-.05,-1.48,1.28,S-.04,2,.75,.78,.74,1.1),u(-1.97,.45,S-.06,-1.93,1.28,S-.04,1,c[0],c[1],c[2]),u(-2.42,.85,S-.06,-1.48,.89,S-.04,1,c[0],c[1],c[2]),u(-1.05,-.3,S-.03,.95,1.92,S,0,.3,.27,.22),u(-1.05,-.3,2.78,-.99,1.92,2.84,1,c[0],c[1],c[2]),u(.89,-.3,2.78,.95,1.92,2.84,1,c[0],c[1],c[2]),u(-.06,-.3,2.78,0,1.92,2.84,1,c[0],c[1],c[2]),u(-1.05,1.92,2.76,.95,1.99,2.84,1,c[0],c[1],c[2]),u(-1.08,Q,2.75,.98,-.3,S,0,le[0],le[1],le[2]);for(const t of[-.3,.14,.58,1.02,1.46])u(-1,t-.02,2.84,.9,t,S,1,c[0]*.9,c[1]*.9,c[2]*.9);u(1.05,-.09,2.62,M,-.05,S,11,.74,.75,.72),u(1.05,Q,2.68,M,-.09,S,0,le[0]*.8,le[1]*.8,le[2]*.8),P(1.9,-.05,3.08,.018,.46,4,.62,.52,.28),u(1.88,.44,2.82,1.92,.47,3.08,4,.62,.52,.28),P(1.9,.33,2.82,.012,.46,4,.62,.52,.28),Ae(2.5,-.05,2.9,.09,.42,6),Ae(1.32,-.05,2.95,.07,.3,3),u(g,.2,-1.8,g+.03,1.72,1.4,3,.055,.075,.068),u(g,.15,-1.86,g+.05,.2,1.46,1,c[0],c[1],c[2]),u(g,.2,-1.86,g+.04,1.77,-1.8,1,c[0],c[1],c[2]),u(g,.2,1.4,g+.04,1.77,1.46,1,c[0],c[1],c[2]),u(g,1.72,-1.86,g+.04,1.77,1.46,1,c[0],c[1],c[2]),oe!=="Skylight"&&u(M-.22,.2,-3.2,M,.24,3,0,.72,.72,.66),u(M-.15,-.7,-3,M-.05,-.1,-.8,0,.55,.55,.5),u(M-.15,-.7,.4,M-.05,-.1,2.6,0,.55,.55,.5);for(const t of[[-.72,1.42],[.62,1.55],[-1.5,-1.5]])P(t[0],-.3,t[1],.16,-.26,1,c[0]*1.5,c[1]*1.5,c[2]*1.5),P(t[0],Q,t[1],.018,-.3,4,.18,.18,.18),P(t[0],Q,t[1],.16,Q+.012,4,.2,.2,.2);for(const t of[-1.25,1.15])u(t-.13,2.12,-2.7,t+.13,2.25,2.7,0,.62,.62,.58),u(t-.085,2.095,-2.65,t+.085,2.12,2.65,2,.95,.98,1,D?3.2:.5);u(g,1.98,.85,M,2.07,.97,0,.56,.57,.53),u(g+.8,Q,S-.05,g+.84,A0,S-.01,0,.45,.45,.42);const L0=F0,ye=[];let Ce=oe==="Two Bays"?[-1.1,1.3]:oe==="Three Bays"?[-2.05,.05,2.15]:[];const Lt=oe==="Two Bays"?1.1:.78;for(const t of Ce)ye.push([M,1.12,t,Lt*2*1.7,-1,0,0]);oe==="Skylight"&&(ye.push([-.1,A0,-.6,4.2,0,-1,0],[1.3,A0,1.4,3.2,0,-1,0]),Ce=[-1.1,1.3].map(t=>t));const tt=L==="Overcast"?7:L==="Bright Haze"?11:L==="Low Sun"?8:9,ot=L==="Overcast"?[.93,.97,1]:L==="Bright Haze"?[.8,.9,1]:L==="Low Sun"?[1,.92,.8]:[.92,.96,1],mo=D?tt*.1:tt,ho=D?L==="Overcast"?[.42,.52,.72]:L==="Bright Haze"?[.26,.42,1]:L==="Low Sun"?[1,.56,.42]:[.46,.6,1]:ot,xo=D?2.4:tt,zt=D?[1,.86,.66]:ot;if(D){ye.length=0;for(const t of[-1.25,1.15])for(const o of[-1.35,1.35])ye.push([t,2.09,o,1.3,0,-1,0])}let m=Tt.get(e),Te=m?m.fl:!1;if(!m&&(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float"))){const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,4,4);const o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),Te=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE,e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(o),e.deleteTexture(t)}const po=`#version 300 es
out vec2 vUv; void main(){ vec2 p=vec2((gl_VertexID<<1)&2, gl_VertexID&2); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,bo=`#version 300 es
#define E8 ${Te?0:1}
precision highp float; precision highp int; precision highp sampler2D; precision highp samplerCube;
in vec2 vUv;
`,Nt=(t,o)=>{const a=e.createShader(t);return e.shaderSource(a,o),e.compileShader(a),a},we=t=>{const o=e.createProgram(),a=Nt(e.FRAGMENT_SHADER,bo+t);return e.attachShader(o,m.vs),e.attachShader(o,a),e.linkProgram(o),e.flush(),o.f=a,o},Re=(t,o)=>{e.getProgramParameter(t,e.LINK_STATUS)||console.error("215 "+o+": "+e.getShaderInfoLog(t.f)+" "+e.getProgramInfoLog(t));const a={},r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<r;n++){const s=e.getActiveUniform(t,n);a[s.name.replace("[0]","")]=e.getUniformLocation(t,s.name)}return t.u=a,t};m||(m={fl:Te,vs:Nt(e.VERTEX_SHADER,po),pFl:[],vao:e.createVertexArray(),ubo:e.createBuffer()},Tt.set(e,m));const go=m.vao,C=(t,o,a)=>{e.bindVertexArray(go),e.bindFramebuffer(e.FRAMEBUFFER,a),e.viewport(0,0,t,o),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!1)},v=(t,o,a)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(a?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,o)},H=(t,o,a,r,n,s,i,l)=>{const R=e.createTexture();return e.bindTexture(e.TEXTURE_2D,R),e.texStorage2D(e.TEXTURE_2D,1,a,t,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,i||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l||e.CLAMP_TO_EDGE),R},ae=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},I=()=>e.drawArrays(e.TRIANGLES,0,3),Ie=d.size>512,at=Te?e.RGBA16F:e.RGBA8,c0=Ie?384:256,Ut=Ie?Math.log2(512/384):0,z0=K==="Shelf wall"?[h*1.1,0]:[h*1.1*x[0]/Math.hypot(x[0],x[2]),h*1.1*x[2]/Math.hypot(x[0],x[2])],Be=Math.max(.5-.59,M0(-z0[0],_,-z0[1])[0]-.125),N0=Math.min(.5+.59,M0(z0[0],_,z0[1])[0]+.125),yo=`
uniform uint uSeed; uniform float uPer; out vec4 o;
uint hsh(uvec3 v){ v=v*1664525u+1013904223u; v.x+=v.y*v.z; v.y+=v.z*v.x; v.z+=v.x*v.y; v^=v>>16u; v.x+=v.y*v.z; return v.x; }
float vn(vec2 p,float per,uint s){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); float r=0.;
  for(int y=0;y<2;y++) for(int x=0;x<2;x++){ vec2 q=mod(i+vec2(x,y),per); float h=float(hsh(uvec3(uint(q.x),uint(q.y),s))>>8u)/16777215.; r+=h*(x==0?1.-f.x:f.x)*(y==0?1.-f.y:f.y); }
  return r; }
uniform int uOct;
float fbm(vec2 uv,float per,uint s){ float a=.5,r=0.,w=0.; for(int i=0;i<uOct;i++){ r+=a*vn(uv*per,per,s+uint(i)*17u); w+=a; a*=.55; per*=2.; } return r/w; }
void main(){ float v=fbm(vUv,uPer,uSeed); o=vec4(v,v,v,float(hsh(uvec3(uvec2(gl_FragCoord.xy),uSeed+7u))>>8u)/16777215.); }`,U0=`
#if E8
vec4 enS(vec3 c,float a){ return vec4(sqrt(min(c,vec3(4.))/4.),(a<0.?0.:.5)+.5*clamp(.3/max(abs(a),.001),0.,1.)); }
vec4 deS(vec4 v){ float k=max(v.a<.5?v.a*2.:v.a*2.-1.,.02); return vec4(v.rgb*v.rgb*4.,(v.a<.5?-.3:.3)/k); }
#else
vec4 enS(vec3 c,float a){ return vec4(c,a); }
vec4 deS(vec4 v){ return v; }
#endif
`,To=t=>`#define SUN ${t&1} 
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
${U0}
const float XR=${M.toFixed(3)},XL=${g.toFixed(3)},ZB=${pe.toFixed(3)},ZF=${S.toFixed(3)},FY=${Q.toFixed(3)},CE=${A0.toFixed(3)};
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
}`,wo=`
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
}`,Ro=`
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
}`,Eo=`
uniform sampler2D uS; uniform float uFoc,uK; uniform int uTaps; out vec4 o;
${U0}
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
}`,Po=`
uniform sampler2D uS; uniform float uFoc,uK; uniform int uTaps; out vec4 o;
${U0}
void main(){
  vec4 c0=deS(textureLod(uS,vUv,0.)); float d0=abs(c0.a),coc=clamp(uK*abs(1./d0-1./uFoc),0.,.024);
  float rad=max(coc*.34,1.2/float(textureSize(uS,0).x)); vec3 s=c0.rgb; float w=1.,m=c0.a<0.?1.:0.;
  for(int i=1;i<uTaps;i++){ float a=float(i)*2.39996,r=sqrt(float(i)/float(uTaps)); vec4 c=deS(textureLod(uS,vUv+vec2(cos(a),sin(a))*r*rad,0.)); s+=c.rgb; w+=1.; m+=c.a<0.?1.:0.; }
  o=vec4(sqrt(clamp(s/w/4.,0.,1.)),m/w);
}`,i0=1.18,Mo=fe===0?"smn(length(q)-R,neck,.018)":fe===1?"smn(smn(length(q)-R,length(q-vec2(0.,.78*R))-.5*R,.07),neck,.03)":"smn(cone(q),neck,.016)",So=`
uniform vec3 uF,uR,uU,uRo,uC; uniform float uTan,uPx,uGx,uGw,uLB,R,RN; uniform vec2 uTxl; uniform int uPass,uAA,uIt,uG3; uniform samplerCube uEnv; out vec4 o;
const float YT=${J0.toFixed(3)},W=.0017,GM=${i0.toFixed(3)};
float smn(float a,float b,float k){ float h=max(k-abs(a-b),0.)/k; return min(a,b)-h*h*k*.25; }
float bx(vec2 p,vec2 b){ vec2 d=abs(p)-b; return length(max(d,0.))+min(max(d.x,d.y),0.); }
${fe===2?`float cone(vec2 q){ float he=.075,r1=R*1.08,r2=RN; vec2 k1=vec2(r2,he),k2=vec2(r2-r1,2.*he);
  vec2 ca=vec2(q.x-min(q.x,q.y<0.?r1:r2),abs(q.y)-he); vec2 cb=q-k1+k2*clamp(dot(k1-q,k2)/dot(k2,k2),0.,1.);
  float sg=(cb.x<0.&&ca.y<0.)?-1.:1.; return sg*sqrt(min(dot(ca,ca),dot(cb,cb)))-.006; }`:""}
float prof(vec2 q){ float neck=bx(q-vec2(0.,YT*.5),vec2(RN,YT*.5)); return ${Mo}; }
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
}`,Fo=`
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
  o=vec4(occ,cau*uKcau,ao,1.); }`,Ao=`
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
}`,Lo=`
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
}`,zo=`
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
}`,No=`
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
const float TAU=6.2831853,GMARGIN=${i0.toFixed(3)};
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
}`,u0=(t,o)=>t.replace(/ ?out vec4 o;/,"").replace("void main(){","void "+o+"(){"),Uo=`uniform int uMode; out vec4 o;
`+u0(yo,"mNoise")+u0(Ro,"mArt")+u0(wo,"mOut")+u0(Fo,"mShade")+`
void main(){ if(uMode==0) mNoise(); else if(uMode==1) mArt(); else if(uMode==2) mOut(); else mShade(); }`,_o=`uniform int uMode; out vec4 o;
`+u0(Eo,"mDof").replace("${PACK_S}","")+Po.replace(/^\s*uniform sampler2D uS; uniform float uFoc,uK; uniform int uTaps; out vec4 o;/,"").replace(U0,"").replace("void main(){","void mDof2(){")+`
void main(){ if(uMode==0) mDof(); else mDof2(); }`;let _t=null;m.pM||e.getExtension("KHR_parallel_shader_compile");let _0=(L==="Low Sun"&&!D?1:0)|(oe==="Skylight"?2:4);for(let t=0;t<L0;t++){const o=S0[t*12+7];o>=5&&o<=8&&(_0|=8<<o-5)}m.pSv=m.pSv||[];let w=m.pSv.find(t=>(t.mk&_0)===_0),rt=null;if(!w){const t=m.pSv.length?127:_0;w=rt=we(To(t)),w.mk=t,m.pSv.push(w)}const nt=m.pFl[fe]?null:we(So);if(!m.pM){const t=we(Uo),o=we(_o),a=we(Ao),r=we(Lo),n=we(No),s=t,i=t,l=t,R=o;Re(t,"bake"),Re(o,"blur"),Re(a,"wall"),Re(r,"cloud"),Re(n,"main"),Object.assign(m,{pN:t,pA:s,pO:i,pD:o,pD2:R,pSh:l,pW:a,pC:r,pM:n}),e.uniformBlockBinding(n,e.getUniformBlockIndex(n,"U"),0),e.useProgram(n),[["uBase",0],["uG0",1],["uG1",2],["uG2",3],["uG3",4],["uWall",5],["uCloud",6],["uRip",7],["uN",8],["uShade",9],["uLayer",10],["uEnv",11],["uGb",12]].forEach(E=>e.uniform1i(n.u[E[0]],E[1]))}nt&&(Re(nt,"flask"),m.pFl[fe]=nt);const y=m.pFl[fe];rt&&Re(rt,"scene");const{pN:De,pA:qt,pO:Ge,pD:Oe,pD2:Xe,pSh:J,pW:W,pC:He,pM:kt}=m,qo=()=>{if(!m.pR){const t=Re(we(zo),"ripple");e.useProgram(t),e.uniform1i(t.u.uS,0),e.uniform2f(t.u.uTx,1/128,1/96),m.pR=t}return m.pR};{const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texStorage2D(e.TEXTURE_2D,10,e.RGBA8,512,512),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);{const f=ae(t);C(512,512,f),v(13,null),e.activeTexture(e.TEXTURE0),e.useProgram(De),e.uniform1i(De.u.uN,13),e.uniform1i(De.u.uMode,0),e.uniform1i(De.u.uOct,5);const T=e0>>>8&65535;[[6,0,!0,!1,!1,!0],[26,101,!1,!0,!1,!1],[90,211,!1,!1,!0,!1]].forEach(b=>{e.colorMask(b[2],b[3],b[4],b[5]),e.uniform1f(De.u.uPer,b[0]),e.uniform1ui(De.u.uSeed,T+b[1]),I()}),e.colorMask(!0,!0,!0,!0),e.deleteFramebuffer(f),e.bindTexture(e.TEXTURE_2D,t),e.generateMipmap(e.TEXTURE_2D)}const o=e.createTexture();v(0,o),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA32F,3,L0),e.texSubImage2D(e.TEXTURE_2D,0,0,0,3,L0,e.RGBA,e.FLOAT,new Float32Array(S0)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const a=H(272,204,e.RGBA8,0,0,e.LINEAR);{const f=ae(a);C(272,204,f),e.useProgram(qt),e.uniform1i(qt.u.uMode,1),I(),e.deleteFramebuffer(f)}const r=H(512,256,e.RGB10_A2,0,0,e.LINEAR);{const f=ae(r);C(512,256,f),e.useProgram(Ge),e.uniform1i(Ge.u.uMode,2),v(13,t),e.uniform3fv(Ge.u.uSkyC,ho),e.uniform1f(Ge.u.uSkyI,mo),e.uniform1f(Ge.u.uSnow,L==="Snow"?1:0),e.uniform1f(Ge.u.uTree,K==="Against the light"?.3:1),I(),v(13,null),e.activeTexture(e.TEXTURE0),e.deleteFramebuffer(f)}const n=()=>{e.useProgram(w);const f=w.u;e.uniform1i(f.uPrim,0),e.uniform1i(f.uN,1),e.uniform1i(f.uArt,2),e.uniform1i(f.uOut,3),e.uniform1i(f.uCount,L0),e.uniform1f(f.uSkyI,xo),e.uniform3fv(f.uSkyC,zt),e.uniform1f(f.uSun,L==="Low Sun"&&!D?1:0),e.uniform1f(f.uAmb,D?.12:1),e.uniform3fv(f.uTub,D?[.16,.135,.095]:[.07,.072,.07]),e.uniform1f(f.uSkyl,oe==="Skylight"?1:0),e.uniform1i(f.uNW,ye.length),e.uniform1i(f.uBnc,2);const T=new Float32Array(16),b=new Float32Array(12);ye.forEach((Z,ee)=>{T.set([Z[0],Z[1],Z[2],Z[3]],ee*4),b.set([Z[4],Z[5],Z[6]],ee*3)}),e.uniform4fv(f.uLP,T),e.uniform3fv(f.uLN,b),e.uniform4f(f.uBay,Ce[0]||0,Ce[1]||0,Ce[2]||0,Ce.length),e.uniform1f(f.uWH,Lt),e.uniform4f(f.uTray,q,k,O,X),v(0,o),v(1,t),v(2,a),v(3,r)},s=e.createTexture();e.bindTexture(e.TEXTURE_CUBE_MAP,s);const i=Math.floor(Math.log2(c0))+1;e.texStorage2D(e.TEXTURE_CUBE_MAP,i,e.RGB10_A2,c0,c0),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR);{const f=e.createFramebuffer(),T=[[[1,0,0],[0,0,-1],[0,-1,0]],[[-1,0,0],[0,0,1],[0,-1,0]],[[0,1,0],[1,0,0],[0,0,1]],[[0,-1,0],[1,0,0],[0,0,-1]],[[0,0,1],[1,0,0],[0,-1,0]],[[0,0,-1],[-1,0,0],[0,-1,0]]];n(),e.uniform1i(w.u.uMode,0),e.uniform3f(w.u.uRo,0,_,0),e.uniform1f(w.u.uTan,1);for(let b=0;b<6;b++)e.bindFramebuffer(e.FRAMEBUFFER,f),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+b,s,0),C(c0,c0,f),e.useProgram(w),e.uniform3fv(w.u.uF,T[b][0]),e.uniform3fv(w.u.uR,T[b][1]),e.uniform3fv(w.u.uU,T[b][2]),I();e.deleteFramebuffer(f),e.bindTexture(e.TEXTURE_CUBE_MAP,s),e.generateMipmap(e.TEXTURE_CUBE_MAP)}const l=Ie?1024:512,R=H(l,l,at,0,0,e.LINEAR),E=ae(R);C(l,l,E),n(),e.uniform1i(w.u.uMode,1),e.uniform3fv(w.u.uRo,p),e.uniform3fv(w.u.uF,G),e.uniform3fv(w.u.uR,x),e.uniform3fv(w.u.uU,A),e.uniform1f(w.u.uTan,ke),I();const N=H(l,l,at,0,0,e.LINEAR),_e=ae(N),me=Math.hypot(p[0],p[1]-_,p[2])-h*.3;C(l,l,_e),e.useProgram(Oe),e.uniform1i(Oe.u.uMode,0),e.uniform1i(Oe.u.uS,0),v(0,R),e.uniform1f(Oe.u.uFoc,me),e.uniform1f(Oe.u.uK,.0105),e.uniform1i(Oe.u.uTaps,36),I();const de=H(l,l,e.RGB10_A2,0,0,e.LINEAR),U=ae(de);C(l,l,U),e.useProgram(Xe),e.uniform1i(Xe.u.uMode,1),e.uniform1i(Xe.u.uS,0),v(0,N),e.uniform1f(Xe.u.uFoc,me),e.uniform1f(Xe.u.uK,.0105),e.uniform1i(Xe.u.uTaps,14),I(),e.deleteFramebuffer(U),e.deleteFramebuffer(E),e.deleteTexture(R),e.deleteFramebuffer(_e),e.deleteTexture(N);const $=Ie?1200:512,F=Ie?720:256,he=Ie?460:256,pt=(N0-Be)/i0,je=f=>Math.round(f*pt),bt=Te?e.RGBA16F:e.RGB10_A2,ra=Te?e.RGBA16F:e.RGBA8,$t=H(je($),$,bt,0,0,e.LINEAR),Zt=H(je(F),F,e.RGBA8,0,0,e.LINEAR),jt=H(je(F),F,bt,0,0,e.LINEAR),Qt=H(je(F),F,bt,0,0,e.LINEAR),gt=H(je(he),he,ra,0,0,e.LINEAR);e.useProgram(y),e.uniform1i(y.u.uEnv,0),v(0,s,!0),e.uniform1f(y.u.uLB,Ut),e.uniform1i(y.u.uIt,96),e.uniform1i(y.u.uG3,3),e.uniform1f(y.u.uGx,Be*2-1),e.uniform1f(y.u.uGw,(N0-Be)*2),e.uniform1f(y.u.R,h),e.uniform1f(y.u.RN,Q0),e.uniform3fv(y.u.uRo,p),e.uniform3fv(y.u.uF,G),e.uniform3fv(y.u.uR,x),e.uniform3fv(y.u.uU,A),e.uniform1f(y.u.uTan,ke),e.uniform3f(y.u.uC,0,_,0);const Qe=(f,T,b,Z,ee)=>{const Je=ae(f),oo=je(T);C(oo,T,Je),e.useProgram(y),ee&&e.colorMask(ee[0],ee[1],ee[2],ee[3]),e.uniform1f(y.u.uPx,i0/T),e.uniform2f(y.u.uTxl,(N0-Be)*2/oo,i0*2/T),e.uniform1i(y.u.uPass,b),e.uniform1i(y.u.uAA,Z),I(),e.colorMask(!0,!0,!0,!0),e.deleteFramebuffer(Je)};Qe($t,$,0,1),Qe(Zt,F,1,16),Qe(jt,F,5,16),Qe(Qt,F,2,16),Qe(gt,he,3,4,[!0,!0,!1,!1]),Qe(gt,he,4,4,[!1,!1,!0,!0]);const Jt=H(256,256,e.RGBA8,0,0,e.LINEAR),eo=ae(Jt);C(256,256,eo),e.useProgram(J),e.uniform1i(J.u.uMode,3),e.uniform3fv(J.u.uRo,p),e.uniform3fv(J.u.uF,G),e.uniform3fv(J.u.uR,x),e.uniform3fv(J.u.uU,A),e.uniform1f(J.u.uTan,ke),e.uniform3f(J.u.uC,0,_,0),e.uniform1f(J.u.uRad,h);{const f=ye[Math.min(1,ye.length-1)],T=P0([f[0],f[1]-_,f[2]]);e.uniform3fv(J.u.uL,T),e.uniform1f(J.u.uKcau,1)}I(),e.deleteFramebuffer(eo),m.profs=m.profs||new Map;let xe=m.profs.get(d.hash);if(xe)m.profs.delete(d.hash),m.profs.set(d.hash,xe);else{xe=new Float32Array(512*4);for(let f=0;f<512;f++){const T=a0+(Mt-a0)*f/511;let b=0,Z=h*1.5;if(Pt(0,T)>0){xe[f*4]=0,xe[f*4+1]=T;continue}for(let ee=0;ee<18;ee++){const Je=(b+Z)/2;Pt(Je,T)<0?b=Je:Z=Je}xe[f*4]=b,xe[f*4+1]=T}m.profs.set(d.hash,xe),m.profs.size>8&&m.profs.delete(m.profs.keys().next().value)}const to=e.createTexture();v(0,to),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA32F,1,512),e.texSubImage2D(e.TEXTURE_2D,0,0,0,1,512,e.RGBA,e.FLOAT,xe),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),_t={noiseT:t,cube:s,baseT:de,g0:$t,g1:Zt,gb:jt,g2:Qt,g3:gt,shadeT:Jt,profT:to},e.deleteTexture(o),e.deleteTexture(a),e.deleteTexture(r)}const{noiseT:q0,cube:ko,baseT:Co,g0:Io,g1:Bo,gb:Do,g2:Go,g3:Oo,shadeT:Xo,profT:Ct}=_t,s0=512,f0=256,We=(t,o,a)=>{const r=H(t,o,at,0,0,e.LINEAR,a,e.CLAMP_TO_EDGE);return{t:r,f:ae(r)}};let l0=We(s0,f0,e.REPEAT),k0=We(s0,f0,e.REPEAT),v0=We(128,128),C0=We(128,128),m0=We(128,96),I0=We(128,96);const It=H(256,256,e.RGBA8,0,0,e.LINEAR),Ho=ae(It),Wo=!!Te;e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0);for(const t of[m0,I0,v0,C0])e.bindFramebuffer(e.FRAMEBUFFER,t.f),e.clear(e.COLOR_BUFFER_BIT);const Bt=te==="Formalin"?1.5:te==="Rochelle Salt"?.8:1,Ko=te==="Formalin"?1.3:te==="Rochelle Salt"?.55:.42,ct=Me==="Gold"?[1,.8,.42]:Me==="Copper"?[.98,.64,.5]:[.975,.958,.915],it=Me==="Gold"?[.72,.92,.62]:Me==="Copper"?[.92,.62,.48]:[.72,.76,.95],Yo=Me==="Gold"?[.46,.11,.15]:Me==="Copper"?[.42,.23,.15]:te==="Formalin"?[.1,.092,.085]:te==="Rochelle Salt"?[.3,.312,.335]:[.2,.155,.11];let ve=0,ut=0,B0=0,d0=0,Le=0,Ke=0,Ye=0,h0=0,D0=0,Ee=0,ze=0,Ve=0,$e=0,re=0,Y=40,Ne=.82,ne=.52,ce=.45,Ue=1,V=0,G0=!1,Dt=.5,Gt=.5,O0=0,X0=0,x0=0,p0=0,b0=[0,0,0],H0=[0,0,0],st=1.1,ft=0,W0=0;const K0=2*Math.sqrt(1.1*9.81/h),Vo=3.6;let g0=j;const Ot=new Float32Array(16*4),lt=m.ubo;e.bindBuffer(e.UNIFORM_BUFFER,lt),e.bufferData(e.UNIFORM_BUFFER,Ot.byteLength,e.DYNAMIC_DRAW),e.useProgram(W),e.uniform1i(W.u.uS,0),e.uniform1i(W.u.uP,1),e.uniform1i(W.u.uN,2),e.uniform2f(W.u.uTx,1/s0,1/f0),e.useProgram(He),e.uniform1i(He.u.uS,0),e.uniform1i(He.u.uN,1);const ua=r0,$o=Rt==="Greasy"?1:0,Zo=Rt==="Etched",Xt=()=>{const t=W.u;e.uniform4f(t.uH,g0,Ee,ze,re*re*h*h/19.6*1),e.uniform1f(t.uDrop,Le*.618)},vt=d.home?0:(B(-.08,.26)+.08)/.34,Ht=d.home?j+.014:R0?h*(fe===1?1+.2*vt:.6+.2*vt):j-.004+.024*vt,Wt=a0-.01;let Ze=R0?Wt:j,mt=!1;R0&&(ne=0,ce=1,Ne=.04,W0=5);const jo=d.home?j:Math.max(j,Ht+.003);C(s0,f0,l0.f),e.useProgram(W),v(0,k0.t),v(1,Ct),v(2,q0);const Qo=d.home?.95:R0?1:B(.78,.98);g0=jo,e.uniform4f(W.u.uI,1,Ht,Qo,0),e.uniform4f(W.u.uB,Ko,$o,1/(h*h),Te?0:1),e.uniform4f(W.u.uA,0,0,0,0),Xt(),I(),e.uniform4f(W.u.uI,0,0,0,0),g0=Ze;const Jo=(t,o,a,r)=>{C(s0,f0,k0.f),e.useProgram(W),v(0,l0.t),v(1,Ct),v(2,q0),e.uniform4f(W.u.uA,t,o,a,r),Xt(),I();const n=l0;l0=k0,k0=n},Kt=t=>{C(128,128,C0.f),e.useProgram(He),v(0,v0.t),v(1,q0),e.uniform4f(He.u.uA,t,re,Ne*.11*Math.pow(2,(Y-40)/15),.05+Y*.0016),e.uniform4f(He.u.uB,ve*.021,-ve*.017,Ve*.25,$e*.25),I();const o=v0;v0=C0,C0=o},ea=()=>{const t=qo();C(128,96,I0.f),e.useProgram(t),e.uniform2f(t.u.uBox,O,X),v(0,m0.t);const o=22e-5;e.uniform4f(t.u.uF,.017*Math.tanh(Ke/.03)-q,.017*Math.tanh(Ye/.03)-k,h0*o,D0*o),e.uniform4f(t.u.uK0,b0[0],b0[1],b0[2],0),e.uniform4f(t.u.uK1,H0[0],H0[1],H0[2],Math.sqrt(Math.max(h*h-_*_,8e-4))),I();const a=m0;m0=I0,I0=a,b0[2]=0,H0[2]=0};for(let t=0;t<8;t++)Kt(.6);const Y0=M0(0,_,0),dt=K==="Shelf wall"?[0,0,-1]:P0([G[0],0,G[2]]),sa=p.slice(),Yt=(t,o,a)=>{C(o,o,t),e.useProgram(kt),e.uniform1i(kt.u.uLay,a),e.bindBufferBase(e.UNIFORM_BUFFER,0,lt),v(0,Co),v(1,Io),v(2,Bo),v(3,Go),v(4,Oo),v(5,l0.t),v(6,v0.t),v(7,m0.t),v(8,q0),v(9,Xo),v(10,a?null:It),v(11,ko,!0),v(12,Do),I()},ta=(L==="Bright Haze"?1.1:1)*(D?.7:1),oa=K==="Against the light"?.62:K==="From the windows"&&!D?.86:1,ht=D?zt.map(t=>t*.7):ot,xt=Yo,aa=()=>{const t=Ot;t.set([p[0],p[1],p[2],ke,x[0],x[1],x[2],ve%1e3,A[0],A[1],A[2],(Y-38)/40,G[0],G[1],G[2],ce],0),t.set([.017*Math.tanh(Ke/.03),_,.017*Math.tanh(Ye/.03),Ut,g0,Ee,ze,re*re*h*h/19.6,ne*(te==="Formalin"?1.3:te==="Rochelle Salt"?.72:1),Ue,V,te==="Rochelle Salt"?.25:te==="Formalin"?1:.7,ct[0],ct[1],ct[2],Be,it[0],it[1],it[2],N0-Be],16);const o=.017*Math.tanh(Ke/.03),a=.017*Math.tanh(Ye/.03),r=M0(o,_,a),n=.045*Math.tanh(-h0*1.1),s=Math.cos(n),i=Math.sin(n);t.set([dt[0],dt[1],dt[2],0,r[0]-Y0[0],r[1]-Y0[1],Y0[0],Y0[1],s,i,ta,_,q,k,O,X,a0,Mt-a0,(L==="Snow"?.96:1.04)*oa,h,ht[0],ht[1],ht[2],Math.max(0,(Y-44)/26),.36+(xt[0]-.36)*Ue,.27+(xt[1]-.27)*Ue,.15+(xt[2]-.15)*Ue,Zo?1:0],36),e.bindBuffer(e.UNIFORM_BUFFER,lt),e.bufferSubData(e.UNIFORM_BUFFER,0,t)},Vt=()=>{aa(),Yt(Ho,256,1),Yt(null,d.size,0)};Vt();const y0=[.613,1.27,.37,1.71,.91];return(t,o)=>{o=Math.min(o,.25);const a=d.input;let r=0;const n=a.taps().length>0;(G0&&!a.down||n&&!a.down&&!G0)&&p0<.02&&x0<.3&&ce>.5&&V<=0&&(V=Vo,d.sound.hit("noise",.35,{cutoff:2400,dur:.7})),a.down?(G0||(Dt=a.x,Gt=a.y,O0=0,X0=0,x0=0,p0=0),O0=a.x-Dt,X0=a.y-Gt,p0=Math.max(p0,Math.hypot(O0,X0)),x0+=o,x0>.2&&(r=1)):(x0=0,p0=0),G0=a.down,ut+=o;let s=0;const i=1/90,l=a.down?Math.max(-.05,Math.min(.05,O0*.11)):.0016*(Math.sin(ve*.61)+.7*Math.sin(ve*.97+1.3)),R=a.down?Math.max(-.05,Math.min(.05,X0*.11)):.0016*(Math.sin(ve*.53+2)+.6*Math.sin(ve*1.13));for(;ut>=i&&s<30;){ut-=i,s++,ve+=i;const U=(l-Ke)*240-h0*22,$=(R-Ye)*240-D0*22;h0+=U*i,D0+=$*i,Ke+=h0*i,Ye+=D0*i;const F=1+(Ee*Ee+ze*ze)*2.2,he=K0*K0/4;Ve+=(-he*Ee*F-2*.055*(K0/2)*Ve-U*1.25/9.81*he*.92)*i,$e+=(-he*ze*F-2*.055*(K0/2)*$e-$*1.25/9.81*he*.92)*i,Ee+=Ve*i,ze+=$e*i;const pt=Ee*$e-ze*Ve;re+=(pt*.9-re*.17)*i,re=Math.max(-16,Math.min(16,re))}const E=Math.hypot(Ve,$e);Y+=((r?82:39)-Y)*o*(r?.13:.016);const N=Math.pow(2,(Y-40)/15),_e=1+1.1*Math.sqrt(Math.min(1,Math.abs(re)/7+E*.5));V>0?(V-=o,ne+=(0-ne)*o*2.2,ce+=(0-ce)*o*1.1,V<=0&&(V=0,Ne=1,ne=0,ce=0,Ue=0,Y=Math.min(Y,44),mt=Ze<j)):(Ne+=-Ne*N*.0025*o,ne+=(Math.min(1,Ne*.9)-ne)*o*.028*N*Bt,ne=Math.min(.95,ne),Ue=Math.min(1,Ue+o*.05*N));const me=.0115*N*_e*Bt*(.35+Ne)*(.015+ne*1.25);if(V<=0&&(ce=Math.min(1,ce+me*.42*o*(1-ce*.4))),B0+=o,Le++,mt&&(Ze=Math.min(j,Ze+(j-Wt)*o/2),Ze>=j&&(mt=!1)),g0=Ze,B0>1/16){const U=Math.min(B0,.2);B0=0,Jo(U,V>0?0:me*3,.28,V>0?2.5:0),Kt(U)}if(Wo){if(st-=o,st<0&&r+(Y-42)/20>0){st=.26+.9*y0[Le%5]/(.4+(Y-40)*.05);const $=ve*2.399,F=.03+.05*y0[(Le+2)%5]/1.71;b0=[Ke-q+Math.cos($)*(.066+F),Ye-k+Math.sin($)*(.066+F),16e-5+11e-5*y0[(Le+1)%5]],d.sound.hit("blip",.05+.08*(Y-40)/40,{freq:620+1400*y0[Le%5]/1.71,pan:.1})}d0+=o;let U=0;for(;d0>=1/60&&U<3;)d0-=1/60,U++,ea();d0>.1&&(d0=0)}ft-=o,ft<0&&E>.25&&(ft=.14+.1*y0[Le%5],d.sound.hit("noise",Math.min(.5,E*.3),{cutoff:500+E*900,dur:.22,pan:Ee*.6}));const de=Math.floor(ce*5);de>W0&&V<=0&&(W0=de,d.sound.note(84+[0,3,7,10,14][Math.min(4,de)],{dur:1.8,vel:.14,wave:"sine"})),V>0&&(W0=0),Vt()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
