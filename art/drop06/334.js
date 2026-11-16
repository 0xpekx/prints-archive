// Mars Sunset: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/334.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Pe){Pe&&Pe.add({num:334,name:"Mars Sunset",fam:"Worlds",recipe:"A rover's camera on Mars as the sun sets, with a small white sun in a cold blue glow, a dull butterscotch sky and rocks in silhouette. The spot and the odd thing in the sky (Earth, a moon crossing the sun, an icy cloud) change every mint. Drag to pan the camera, tap to take the next shot a few minutes later, or hold to let a dust storm thicken until it goes dark.",interactive:"Drag to pan the mast along the horizon; tap to take the next exposure a few minutes later; hold to let the dust storm thicken",music:!0,gl:!0,fps:30,seed:0,make(F){const t=F.gl,yt=F.size,st=!!F.home;let dt=860685729;for(let e=2;e<66;e+=8)dt=Math.imul(dt^parseInt(F.hash.slice(e,e+8),16),2246822507)^dt>>>13;const d=()=>{dt=dt+1831565813|0;let e=Math.imul(dt^dt>>>15,1|dt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Lt=e=>{let a=0;for(const s in e)a+=e[s];let o=d()*a;for(const s in e)if(o-=e[s],o<0)return s;return Object.keys(e)[0]},h=Math.PI/180;let R=st?"None":Lt({None:46,Earth:28,"Phobos transit":13,"Twilight ice cloud":13}),tt=st?"Gale rim":Lt({"Gale rim":32,"Gusev plain":28,"Jezero delta":26,"Dune crests":14}),A=st?"Clear":Lt({Clear:48,Hazy:38,"Global storm":14}),N=st?"Before sunset":Lt({"Before sunset":56,"After sunset":32,"Frosty sunrise":12}),Y=st?"Mastcam-34":Lt({"Mastcam-34":50,"Pancam mosaic":36,"Mastcam-100":14});const Nt=st?"Dusty":Lt({Clean:38,Dusty:47,"Dust ring":15});R==="Phobos transit"&&(Y="Mastcam-100",N==="After sunset"&&(N="Before sunset")),R==="Phobos transit"&&A==="Global storm"&&(A="Hazy"),A==="Global storm"&&N==="After sunset"&&(N="Before sunset"),R==="Earth"&&N!=="After sunset"&&(R="None");let mt=860818333;for(let e=2;e<66;e+=8)mt=Math.imul(mt^parseInt(F.hash.slice(e,e+8),16),374761393)^mt>>>13;const L=()=>{mt=mt+1831565813|0;let e=Math.imul(mt^mt>>>15,1|mt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ga=L(),va=L(),wa=L();!st&&R!=="Phobos transit"&&Y!=="Mastcam-100"&&(tt==="Gale rim"||tt==="Gusev plain")&&ga<.33&&(tt="Gediz valley");const it=tt==="Gediz valley";!st&&N==="Before sunset"&&R==="None"&&Y!=="Mastcam-100"&&A==="Clear"&&va<.8&&(N="Late afternoon");const Mt=N==="Late afternoon";let ut=860773655;for(let e=2;e<66;e+=8)ut=Math.imul(ut^parseInt(F.hash.slice(e,e+8),16),739982445)^ut>>>12;const ya=(()=>{ut=ut+1831565813|0;let e=Math.imul(ut^ut>>>15,1|ut);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296})(),Ma=tt;!st&&R!=="Phobos transit"&&Y!=="Mastcam-100"&&N!=="Frosty sunrise"&&N!=="After sunset"&&A!=="Global storm"&&(tt==="Gale rim"||tt==="Gusev plain"||tt==="Jezero delta")&&ya<.22&&(tt="Dune crests"),F.trait("Site",tt),F.trait("Dust",A),F.trait("Time",N),F.trait("Camera",Y),F.trait("Sky extra",R),F.trait("Window",Nt);let pt=860494430;for(let e=2;e<66;e+=8)pt=Math.imul(pt^parseInt(F.hash.slice(e,e+8),16),2654435761)^pt>>>15;const pe=()=>{pt=pt+1831565813|0;let e=Math.imul(pt^pt>>>15,1|pt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let Et=st?"Horizon":(()=>{const e=pe()*100;return e<62?"Horizon":e<88?"Low horizon":"High horizon"})();(Y==="Mastcam-100"||A==="Global storm"||N==="Late afternoon")&&Et==="Low horizon"&&(Et="Horizon"),tt==="Dune crests"&&Et==="High horizon"&&(Et="Horizon"),F.trait("Aim",Et);const te=Et==="Low horizon"?1:Et==="High horizon"?2:0;let xt=860650045;for(let e=2;e<66;e+=8)xt=Math.imul(xt^parseInt(F.hash.slice(e,e+8),16),668265263)^xt>>>14;const I=()=>{xt=xt+1831565813|0;let e=Math.imul(xt^xt>>>15,1|xt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};I()<.11&&!st&&R==="None"&&N==="After sunset"&&(R="Twilight rays",F.trait("Sky extra",R));const P={"Gale rim":0,"Gusev plain":1,"Jezero delta":2,"Dune crests":3,"Gediz valley":0}[tt],ee={"Gale rim":0,"Gusev plain":1,"Jezero delta":2}[Ma]??P,G=(R==="Phobos transit"?5:{"Mastcam-34":20,"Pancam mosaic":30,"Mastcam-100":7}[Y])*h,Tt=Math.tan(G/2),Bt=Math.atan(te===0?Tt/3:Tt*(te===1?.68+.08*pe():-.12-.08*pe())),Ea=te===0?1:(.5+.5*Math.tan(Bt)/Tt)/(.5+.5/3),V=d()<.5?-1:1,Ht=V*(Y==="Mastcam-100"?.1:.17)*G,Rt=Ht-1.45*G,bt=2.9*G,It=1.95,C=1024,et=new Float32Array(C*4).fill(-.5),X=[9,20,40,80],at=[.2,.2,.2,.2],ot=new Float32Array(64*8);for(let e=0;e<ot.length;e++)ot[e]=d();const Ta=(e,a)=>{const o=Math.floor(e),s=e-o,n=s*s*(3-2*s),l=ot[a*64+(o%64+64)%64],i=ot[a*64+((o+1)%64+64)%64];return l+(i-l)*n},y=(e,a,o)=>{let s=0,n=.5,l=0;for(let i=0;i<o;i++)s+=n*Ta(e,a+i&7),l+=n,e=e*2.03+3.1,n*=.5;return s/l},B=(e,a,o)=>{const s=Math.max(0,Math.min(1,(o-e)/(a-e)));return s*s*(3-2*s)},K=G/h,ae=Math.min(1,G/(20*h)),Ra=d(),ka=d(),Fe=d(),Le=d(),Ne=d(),Be=d(),za=-V*(2+5*Ra),Da=1.2+1.6*ka,xe=e=>.45*Math.pow(Math.max(0,1-Math.abs(e-za)/Da),1.4),Aa=Array.from({length:4},()=>Array.from({length:5},()=>[(I()-.5)*2.4*K,.06+.3*I(),(.04+.16*I())*(I()<.3?-1:1)])),Ie=(e,a,o)=>{let s=0;for(const[n,l,i]of Aa[a]){const m=(e-n)/(l*o);m*m<12&&(s+=i*o*Math.exp(-m*m*(i>0?1:2.5)))}return s},_a=(I()-.5)*1.6*K,Ua=1.5+2.5*I(),Pa=.12+.16*I(),Fa=.02+.05*I(),La=Array.from({length:6},()=>[(I()-.5)*2.6*K,.03+.05*I(),.03+.06*I()]),Na=e=>{let a=.01+Fa*5.5*(y(e/2.2,3,4)-.3)+.05*(y(e/.35,6,2)-.5);const o=(e-_a)/Ua;return Math.abs(o)<1.3&&(a=Math.max(a,-.05+Pa*Math.sqrt(Math.max(0,1-o*o))*(.8+.4*Math.pow(Math.abs(o),3))+.02*(y(e/.2,4,2)-.5))),P===3&&(a=Math.max(a,.03+.24*Math.pow(Math.max(0,Math.sin(e/1.1+4*y(e/3,5,3))),2.5)*(.5+y(e/5,2,2)))),a},Ct=new Float32Array(C/4+2);if(!(t.__p334&&t.__p334.has(F.hash)))for(let e=0;e<Ct.length;e++)Ct[e]=Na((Rt+bt*Math.min(e*4,C-1)/(C-1))/h);const Ba=(e,a)=>{const o=a/4,s=Math.floor(o);let n=Ct[s]+(Ct[s+1]-Ct[s])*(o-s);for(const[l,i,m]of La){const c=(e-l)/i;Math.abs(c)<1&&(n=Math.max(n,Math.max(n,0)+m*Math.pow(1-c*c,.6)))}return n},Se=L()<.5?-1:1,be=(L()-.5)*.12*K,oe=K*(.12+.11*L()),ge=K*(.3+.22*L()),qe=ge*(.38+.2*L()),Ia=K*(.35+.3*L()),Sa=K*(.3+.3*L()),qa=4+Math.floor(4*L()),Ga=3+Math.floor(3*L()),Xa=.32+.2*L(),Ha=1.3+.8*L(),ve=[L(),L(),L(),L(),L(),L()],Ge=(e,a,o,s,n)=>{const l=B(-oe*(.45+.25*ve[n+2]),o*.05,e),i=-1.2+(a*.22+1.2)*Math.pow(l,1.6),m=Math.max(0,Math.min(e/o,1)),c=m*s+.5*(y(e/1.7+n*9,2,3)-.5),w=Math.floor(c),p=c-w,M=ve[(w%6+6+n*3)%6],u=Math.min((w+B(.25+.3*M,.7+.25*M,p))/s,1),x=1-Math.pow(1-m,1.8),r=a*(.92+.12*ve[n]+.08*(y(e/4+n*5,3,3)-.5)),g=a*.22+(r-a*.22)*(.55*x+.45*Math.max(u,0));return Math.max(i,i+(g-i)*B(-.03*o,.03*o,e))},Xe=[.55+.9*I(),.55+.9*I()],Ca=I()<.5?-1:1,Wa=.35+.3*I(),Oa=(I()-.5)*1.2,Va=(I()-.5)*.5,Wt=t.__p334||(t.__p334=new Map),He=F.hash,Ot=Wt.get(He);if(Ot){et.set(Ot.prof);for(let e=0;e<4;e++)X[e]=Ot.dist[e],at[e]=Ot.albL[e]}else for(let e=0;e<C;e++){const a=(Rt+bt*e/(C-1))/h,o=[-9,-9,-9,-9];if(it){const s=Se*(a-be)-oe,n=-Se*(a-be)-oe*(.8+.5*Be);o[0]=Ge(s+.6*(y(a/.9,1,4)-.5)*K/20,ge,Ia,qa,0)+.012*ge*(y(a/.35,7,2)-.5),o[1]=Ge(n+.5*(y(a/1.3,5,4)-.5)*K/20,qe,Sa,Ga,1)+.012*qe*(y(a/.45,6,2)-.5),o[2]=-9,o[3]=.12+.3*Math.pow(y(a/4.5,3,5),1.3)+.06*(y(a/.6,4,3)-.5)-.5*xe(a),X[0]=Xa,X[1]=Ha,X[2]=14,X[3]=48,at[0]=.21,at[1]=.21,at[2]=.26,at[3]=.24}else if(ee===0){const s=K*(.12+.2*Fe);let n=-.4+B(s,s+9+6*Le,V*a)*(3+1.4*Ne)+.35*(y(a/1.6,1,4)-.5);const l=.45+.25*y(a/4,6,2),i=l*(Math.floor(n/l)+B(.5,1,n/l-Math.floor(n/l)));o[0]=n>0?n*.7+i*.3+.12*(y(a/.3,7,3)-.5):n,o[1]=-.25+.75*Math.pow(y(a/3.3+7,2,4),1.6),o[2]=1.15+.7*(y(a/2.4,3,5)-.5)+.25*(y(a/.5,4,3)-.5)-xe(a),X[0]=5,X[1]=11,X[2]=31,at[0]=.21,at[1]=.2,at[2]=.22}else if(ee===1){let s=-.6;for(let n=0;n<3;n++){const l=V*K*(.15+.45*ot[n*3])+n*2.5*V,i=2+3*ot[n*3+1],m=.8+1.4*ot[n*3+2];s=Math.max(s,-.6+m*Math.exp(-Math.pow((a-l)/i,2)))}o[0]=s+(.25+.2*Math.max(s,0))*(y(a/.8,1,5)-.5)-.3*Math.max(s,0)*Math.pow(y(a/1.9,5,3),2),o[1]=.12+.35*(y(a/4,2,4)-.3),o[2]=.42+.2*(y(a/3,3,4)-.5),X[0]=3.6,X[1]=14,X[2]=55,at[0]=.22}else if(ee===2){const s=1.6+.9*Fe,n=V*K*(.08+.2*Le),l=.9+2.2*ot[500],i=4+Math.floor(5*ot[501]),m=(ot[502]-.5)*.5,c=(H,rt,q)=>{const b=B(-q*(2.2+1.5*ot[504]),-q*.3,H),f=B(-q*.75,q*.12,H);let D=.45*Math.pow(b,.7)+.55*f;const lt=D*i+m*f*Math.min(Math.max(H/q,-1),1);return D=.72*D+.28*(Math.floor(lt)+B(.6,1,lt-Math.floor(lt)))/i,-.5+(rt+.5)*D},w=.5*(y(a/.45,1,4)-.5)+.9*(y(a/1.6,5,3)-.5),p=V*(a-n)+w;let M=c(p,s+.35*(y(a/1.1,2,4)-.5),l)+.05*(y(a/.1,7,2)-.5)*B(-l,0,p);const u=n-V*(2.2+2.6*Ne),x=.35+.8*Be,r=a-u-Va*x*.6,g=x-Math.abs(r)/(r<0?Xe[0]:Xe[1])+.25*(y(a/.4,3,3)-.5),E=s*(.5+.35*ot[503]);let U=c(g,E,l*.55)+.04*(y(a/.1,6,2)-.5)*B(-l*.5,0,g);const z=(a-u-Oa*x)/(.14*x+.05);U-=(E+.5)*.16*Math.exp(-z*z)*B(-.2,.3,g);const $=x*.55+.35-Math.abs(a-u-Ca*x*1.05)*1.3+.2*(y(a/.3,2,3)-.5);U=Math.max(U,c($,-.5+(E+.5)*Wa,l*.45)),M=Math.max(M,U),o[0]=M,o[1]=.95+.5*(y(a/2.6,4,5)-.5)-xe(a),X[0]=1.7,X[1]=24,at[0]=.24}else o[1]=.45+.25*(y(a/3,4,5)-.5),X[1]=45;ee===3&&(X[0]=3.2),it||(o[0]=Math.max(o[0]+(o[0]>0?Ie(a,0,.7):0),Ba(a,e)));for(let s=it?2:1;s<4;s++)o[s]>-5&&(o[s]+=Ie(a,s,1/(1+s*.5)));for(let s=0;s<4;s++)et[e*4+s]=o[s]*h}Ot||(Wt.set(He,{prof:et.slice(),dist:X.slice(),albL:at.slice()}),Wt.size>24&&Wt.delete(Wt.keys().next().value));let k=-1,we=.5*h;{const e=Math.round((0-Rt)/bt*(C-1));for(let a=0;a<4;a++)k=Math.max(k,et[e*4+a]);k=Math.max(k,0)}for(let e=0;e<C*4;e++)we=Math.max(we,et[e]);const Vt=Bt-G/2-.3*h,ye=Math.min(Bt+G/2+.2*h,we+.35*h),J=.175*h;let S,ht=-1;N==="Before sunset"||Mt?S=k+G*(A==="Global storm"?.2:Y==="Mastcam-100"?R==="Phobos transit"?.22:.1:.06+.03*d()):N==="After sunset"?S=k-(R==="Earth"?A==="Hazy"?1.3+.7*d():1.8+1.2*d():A==="Hazy"?.6+.8*d():.8+1.6*d())*h:(S=k-.1*h,ht=1),Mt&&(S=k+(9+5*wa)*h);const ja={"Mastcam-34":.2,"Pancam mosaic":.25,"Mastcam-100":.07}[Y],Me=.2*h,kt={Clear:.45+.2*d(),Hazy:.95+.4*d(),"Global storm":1.65+.25*d()}[A],se=A==="Global storm"?13:11,Ee=it?1:P===3?2:0,Ya=R==="Earth"||R==="Phobos transit"||R==="Twilight ice cloud"?1:0,Ce=N==="Frosty sunrise"&&R!=="Phobos transit"?1:0,Te=Ya+2*Ce+(it?4:0),W=t.__c334||(t.__c334=(()=>{const e=`#version 300 es
precision highp float; precision highp int;
void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }`,a=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
uint hu(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
`,o=a+`#define VALLEY 0
#define DUNE 0
layout(std140) uniform B { vec4 b[13]; };
uniform sampler2D uN; uniform sampler2D uP; uniform sampler2D uW;
out vec4 o;
vec4 nf(vec2 p, float f){ return textureLod(uN, (p + b[7].zw) / (f * 32.), 0.); }
// one rock per cell; its 20 random numbers come from a white-noise table, the shape from the site's style
// (b[10]: x roundness, y platy layering, z burial, w lee drift)
vec4 rk(vec2 p, float cs, float pr, float r0, float r1, float pw, int salt){
  vec2 ci = floor(p / cs); vec2 f = p - (ci + .5) * cs;
  ivec2 ic = (ivec2(ci) + ivec2(salt * 37, salt * 61)) & 127;
  vec4 w0 = texelFetch(uW, ic, 0), w1 = texelFetch(uW, (ic + ivec2(64, 0)) & 127, 0), w2 = texelFetch(uW, (ic + ivec2(0, 64)) & 127, 0), w3 = texelFetch(uW, (ic + ivec2(64, 64)) & 127, 0), w4 = texelFetch(uW, (ic + ivec2(32, 96)) & 127, 0);
  vec4 res = vec4(0., -1., 0., 0.);
  if (w0.x < pr) {
    float rad = min(mix(r0, r1, pow(w0.y, pw)), cs * .42);
    vec2 off = (w0.zw - .5) * (cs - 2. * rad);
    vec2 dv = (f - off) / rad; float l = length(dv); vec2 cd = dv / max(l, 1e-5);
    float c2 = cd.x * cd.x - cd.y * cd.y, s2 = 2. * cd.x * cd.y, c3 = cd.x * c2 - cd.y * s2, s3 = cd.x * s2 + cd.y * c2;
    vec4 wq = w1 - .5;
    float wob = 1. + .4 * (wq.x * cd.x + wq.y * cd.y) + .36 * (wq.z * c2 + wq.w * s2) + .2 * ((w2.x - .5) * c3 + (w2.y - .5) * s3);
    vec4 rn = nf(p * 9. / rad, 8.);
    float nk = 1. - .65 * b[12].x;   // n12: through the long lens a rock's crumbly grain would read as a gravel heap
    float rr = l / wob + .14 * nk * (rn.r - .5);
    float hgt = rad * mix(.45, 1.05, w2.z) * (1. - .55 * b[10].y);
    float a1 = 6.2832 * w2.w; vec2 n1 = vec2(cos(a1), sin(a1)); vec2 n2 = vec2(-n1.y, n1.x) * (w3.x < .5 ? 1. : -1.);
    // angular: a cone cut by three planes; rounded: a dome; platy: low, tilted, in steps of bedding
    float hh = hgt * (2.2 + 3. * w3.y) * (1. + .6 * nk * (rn.g - .5)) * (1. - rr);
    hh = min(hh, hgt * (.85 + (.35 + .4 * w3.z) * dot(dv, n1)));
    hh = min(hh, hgt * (1.05 - (.5 + .5 * w3.w) * dot(dv, n2)));
    hh = min(hh, hgt * (1.5 + .2 * w4.x + dot(dv, n1 - n2) * (.9 + .8 * w4.y)));
    hh = min(hh, hgt * (1.25 + .3 * w0.w - dot(dv, n1 + n2) * (.55 + .6 * w4.z)));   // two more facets: never a bun
    hh = min(hh, hgt * (1.7 + .3 * w1.x + dot(dv, vec2(n1.y, -n1.x) * 1.3 - n2 * .4) * (.7 + .6 * w0.z)));
    float dome = hgt * 1.15 * sqrt(max(1. - rr * rr, 0.)) * (1. + .25 * (rn.b - .5));
    hh = mix(hh, dome, b[10].x);
    float lay = hgt * .2; float hl = hh + .35 * hgt * dot(dv, n1) * b[10].y;
    hh = mix(hh, min(hh, lay * (floor(hl / lay) + smoothstep(.75, 1., fract(hl / lay)))), b[10].y);
    hh += hgt * .12 * nk * (rn.b - .5) * step(rr, .95);
    hh -= hgt * (.15 + b[10].z * w4.w);
    // fine drift in the rock's lee, a scoured hollow to windward (soil, not rock)
    vec2 wd = b[7].xy; float al = dot(dv, wd), lt = dot(dv, vec2(-wd.y, wd.x));
    vec2 eb = (cs * .5 - off * sign(wd)) / max(abs(wd), vec2(1e-3)); float alM = min(eb.x, eb.y) / rad;   // the tail ends inside its cell
    float dr = b[10].w * hgt * (al > 0. ? .45 * exp(-al / 1.05) * exp(-lt * lt / (.4 + .1 * al)) * smoothstep(.6, 1.1, l) * smoothstep(alM, .55 * alM, al) : -.18 * exp(-al * al * 1.5 - lt * lt) * smoothstep(.8, 1.3, l));
    dr *= smoothstep(.5 * cs, .4 * cs, max(abs(f.x), abs(f.y))) * step(.5, cs);
    res = vec4(max(hh, 0.), (.09 + .08 * w4.y) * (.75 + .5 * rn.a), smoothstep(1.5, .95, rr), dr);
  }
  return res;
}
#if DUNE
float dzf = 0.;   // dn: how much the last ground sample lay on a floor between dunes (the pebbles lie there)
#endif
// three sizes of rock: few large, more middling, many pebbles, clustered by a slow noise
vec4 rocks(vec2 p, float t){
  vec4 a = vec4(0., -1., 0., 0.);
  float cp = b[11].y;
  int ng = int(b[9].w);   // a uniform bound, so the loop stays rolled and rk() is compiled once
  for (int g = 0; g < ng && !(g == 2 && t > 25.); g++) {
    float fg = float(g);
    float cs = g == 0 ? 4.2 : g == 1 ? .9 : .28;
    float dn = g == 0 ? .2 * (1. + 1.2 * exp(-length(p) / 22.)) * (.3 + 1.4 * pow(nf(p, 30.).r * 1.25, cp)) : g == 1 ? .42 * (.08 + 2. * pow(nf(p, 12.).g * 1.2, cp)) : .6 * pow(nf(p, 4.).b * 1.3, 2. + cp);
#if DUNE
    dn *= .2 + 7. * dzf;   // dn: the pebbles lie on the floors between the dunes
#endif
    vec4 q = rk(p, cs, dn * b[3].w, g == 0 ? .22 : g == 1 ? .035 : .015, g == 0 ? 1.1 : g == 1 ? .3 : .07, g == 0 ? 2.6 : g == 1 ? 2.4 : 1.5, 11 + 12 * g);
    if (q.x > a.x) a = vec4(q.xyz, a.w); a.z = max(a.z, q.z); a.w += q.w;
  }
  return a;
}
float dph = 0.;   // n12c: the dune phase at the rover, so it stands on a crest
float gB(vec2 p){
#if DUNE
  float h = 1.6 * (nf(p, 300.).r - .5) + 2.2 * (nf(p, 110.).g - .5) * smoothstep(60., 200., length(p));   // dn: the small undulations are the dunes' own
#elif VALLEY
  float h = 1.6 * (nf(p, 300.).r - .5) + 2.2 * (nf(p, 110.).g - .5) * smoothstep(200., 500., length(p)) + .18 * (nf(p, 22.).b - .5) + .05 * (nf(p, 5.).a - .5);   // n13: the rise's own knolls make its edge
#else
  float h = 1.6 * (nf(p, 300.).r - .5) + 2.2 * (nf(p, 110.).g - .5) * smoothstep(60., 200., length(p)) + .18 * (nf(p, 22.).b - .5) + .05 * (nf(p, 5.).a - .5);
#endif
  vec2 fw = b[3].xy, sd = vec2(fw.y, -fw.x);
  if (b[1].y > 2.5) {
#if DUNE
    // dn: crests run into the view, 6-18 degrees off it (b[7].xy is the wind, across the view, toward the slip faces);
    // the phase bends only at long wavelengths; each crest rises to peaks and sinks to saddles and ends in a horn that
    // curls downwind, its footprint shrinking with its height (so the slip face keeps its angle); floors between
    vec2 dd = b[7].xy; float lam = b[5].w, r2 = dot(p, p) / (lam * lam);
    vec4 nA = nf(p, lam * 2.4), nB = nf(p, lam * .9);
    float g = smoothstep(.36, .66, .62 * nB.g + .38 * nA.g);
    g = max(g, exp(-r2 * 1.2));   // the rover's own dune runs on past it
    float ph = dot(p, dd) / lam + .9 * (nA.r - .5) - .2 * (1. - g) - dph;
    float x = fract(ph) - .8, Sp = .52 * g + .002, Lp = .1 * g + .002;
    float s = clamp(1. + x / Sp, 0., 1.), l = clamp(x / Lp, 0., 1.);
    float pr = x < 0. ? s * s * (3. - 2. * s) : l < .75 ? 1. - 1.143 * l : 2.29 * (1. - l) * (1. - l);   // a convex back, a straight slip face, a soft apron
    float hd = b[6].w * g * (.75 + .5 * nB.b) * (1. + .35 * exp(-r2));   // the rover's dune the tallest near it
    h += hd * pr;
    dzf = smoothstep(.04, .0, pr * g);
#else
    vec2 dd = b[7].xy; float lam = b[5].w;
    float ph = dot(p, dd) / lam + .7 * (nf(p, lam * 1.3).r - .5) + .25 * (nf(p, lam * .4).g - .5);
    float f = fract(ph);
    float pr = f < .74 ? pow(f / .74, 1.7) : pow((1. - f) / .26, .75);
    h += b[6].w * pr * (.25 + 1.2 * smoothstep(.2, .85, nf(p, lam * 7.).b));   // dune fields rise and fall, so the far crests never make a ruled skyline
#endif
  } else {
#if VALLEY
    vec4 cn = nf(vec2(dot(p, sd) * .55, 7.), 4.);   // n13: the valley's rise in longer knolls and saddles
#else
    vec4 cn = nf(vec2(dot(p, sd), 7.), 4.);
#endif
    float s = dot(p, fw) - b[2].x - .3 * b[3].z * (cn.r - .5);
    float w = b[2].z * (s < 0. ? 1. : .55);
    // the crest rises and falls along its length (knolls and saddles), so its skyline is never a ruled line
    h += b[2].y * (.82 + .3 * smoothstep(.2, .8, cn.g)) * exp(-s * s / (w * w)) - b[2].w * smoothstep(0., b[2].z * 3., s);
#if VALLEY
    h += 1.98 * b[0].y * (cn.b - .45) * exp(-s * s / (w * w));   // n13: knolls along the valley's low rise, so its edge rises and falls (taller under the wider lens)
#endif
  }
  return h;
}
float lay(float e, vec4 pr, out float pk, out float al){
  float dk = -1.; pk = 0.; al = .2;
  if (e < pr.x) { dk = b[4].x; pk = pr.x; al = b[8].x; }
  else if (e < pr.y) { dk = b[4].y; pk = pr.y; al = b[8].y; }
  else if (e < pr.z) { dk = b[4].z; pk = pr.z; al = b[8].z; }
  else if (e < pr.w) { dk = b[4].w; pk = pr.w; al = b[8].w; }
  return dk;
}
void main(){
  vec2 tc = gl_FragCoord.xy / b[9].xy;
  float az = b[0].x + tc.x * b[0].y, el = b[0].z + tc.y * b[0].w;
  vec3 d = vec3(sin(az) * cos(el), sin(el), cos(az) * cos(el));
  vec4 pr = texture(uP, vec2(tc.x, .5));
  // the distant ridges, antialiased: the layer under the texel's lower edge, covered up to the ridge line
  float te = b[11].x, pk, alb, pk2, alb2;
  float dk = lay(el - .5 * te, pr, pk, alb), dk2 = lay(el + .5 * te, pr, pk2, alb2);
  float fc = clamp((pk - el + .5 * te) / te, 0., 1.);
  float tmax = dk > 0. ? min(6500., dk * 1000.) : 6500.;
#if DUNE
  dph = b[12].w; float y0 = b[12].z;   // dn: the rover on its dune's back just short of the brink, the lens at mast height (both from JS: one call of the ground fewer)
#else
  float y0 = b[1].x + gB(vec2(0.)) + (b[1].y > 2.5 ? b[6].w * 1.2 : 0.);   // in the dunes the rover stands on a dune's back, looking over the field
#endif
  // one loop, one call of the ground: march, bisect, five taps for the normal, then a soft shadow toward the sun
  float t = .3, tp = .3, bb = 0., ph = 0., nb = 0., ts = 0., shd = 1., e = 0., hx = 0., hz = 0., nmax = b[1].z + 8.;
  vec3 P = vec3(0.), sdir = b[6].xyz; vec4 h0 = vec4(0.);
  float kS = .5 / (.9 * sdir.y + .01) + 10. * b[12].y;   // n12: the late sun's shadows are crisper than the glow's
  bool go = true;
  for (int i = 0; i < 640 && go && float(i) < nmax; i++) {
    vec2 q; float yq;
    if (ph < 1.5) { vec3 p = d * t; q = p.xz; yq = y0 + p.y + t * t * 1.475e-7; }
    else if (ph < 2.5) { q = P.xz + (nb == 1. ? vec2(e, 0.) : nb == 2. ? vec2(-e, 0.) : nb == 3. ? vec2(0., e) : nb == 4. ? vec2(0., -e) : vec2(0.)); yq = 0.; }
    else { vec3 p = P + sdir * ts; q = p.xz; yq = p.y; }
    float tt = ph < 1.5 ? t : bb;
    float g = gB(q);
#if DUNE
#else
    if (ph > 1.5 && ph < 2.5 && tt < 40.) { float sand = smoothstep(.5, .65, nf(q, 6.).g); g += (.0015 + .018 * sand) * sin(dot(q, vec2(.8, .6)) * 11. + 7. * nf(q, 1.5).r) + .01 * sand * sin(dot(q, vec2(-.3, .95)) * 17. + 5. * nf(q, .9).b); }
#endif
    vec4 r = vec4(0., -1., 0., 0.);
    if (tt < b[5].y && (ph > .5 || yq - g < 1.3)) r = rocks(q, tt);
    float hg = g + r.x + (ph > 2.5 ? 0. : r.w), cl = yq - hg;
    if (ph < .5) {
      float st = tt < b[5].y && yq - g < 1.3 ? max(.45 * cl, .015 + (.004 * t + .00004 * t * t) * b[11].w) : clamp(.6 * cl / (max(-d.y, 0.) + b[5].z), .004 * t + .02, .25 * t + 2.);
      if (cl < 0.) { ph = 1.; bb = t; t = .5 * (tp + bb); nb = 1.; }
      else if (t > tmax || (d.y > 0. && yq > b[5].x)) go = false;
      else { tp = t; t += st; }
    } else if (ph < 1.5) {
      if (cl < 0.) bb = t; else tp = t;
      nb += 1.; t = .5 * (tp + bb);
      if (nb > 7.) { ph = 2.; nb = 0.; P = d * bb; e = .002 * bb * b[11].w + .004; nmax = float(i) + 6. + b[11].z; }
    } else if (ph < 2.5) {
      if (nb == 0.) h0 = vec4(hg, r.y, r.z, r.x); else if (nb == 1.) hx += hg; else if (nb == 2.) hx -= hg; else if (nb == 3.) hz += hg; else hz -= hg;
      nb += 1.;
#if DUNE
      if (nb > 4.5) { ph = 3.; P.y = h0.x + .01; ts = (.03 + .004 * bb) * mix(.6 + .8 * texelFetch(uW, ivec2(gl_FragCoord.xy) & 127, 0).r, 1., smoothstep(150., 500., bb)); }   // dn: no dither far off (it stitched the far crests)
#else
      if (nb > 4.5) { ph = 3.; P.y = h0.x + .01; ts = (.03 + .004 * bb) * (.6 + .8 * texelFetch(uW, ivec2(gl_FragCoord.xy) & 127, 0).r); }
#endif
    } else {
      shd = min(shd, clamp(.5 + cl * kS / ts, 0., 1.));
#if DUNE
      ts += clamp(.5 * cl, .02 + .02 * ts, 6.);
      if (shd < .02 || ts > 90.) go = false;   // dn: a dune's shadow lies across its floor
#else
      ts += clamp(.5 * cl, .02 + .02 * ts, 3.);
      if (shd < .02 || ts > 12.) go = false;
#endif
    }
  }
  if (ph < .5 && d.y < 0. && t < tmax) { ph = 1.; bb = t; }   // out of steps short of the far layer: still the ground
  if (ph > .5) {
    if (ph < 1.5) { P = d * bb; e = .002 * bb * b[11].w + .004; hx = 0.; hz = 0.; h0 = vec4(0., -1., 0., 0.); }
    t = bb;
    vec3 n = normalize(vec3(-hx, 2. * e, -hz));
#if DUNE
    // dn: ripples 1-3 m apart on the backs and the floors (oblique to the crest, so the low light finds them; bending and
    // breaking in patches) and grainflow tongues down the slip faces, as a turn of the light here, after the march (the
    // march program stays small; a bump on the normal, or tongues from a noise, cost tens of ms of Windows first make)
    vec2 dd = b[7].xy, kr = normalize(dd + vec2(0., 1.3)); vec4 rn = nf(P.xz, 5.);
    float lm = smoothstep(.06, .12, 1. - n.y) * smoothstep(.0, .15, dot(n.xz, dd));   // the slip faces from their slope and facing
    float lr = 1.5 + .9 * rn.b, tw = .4 + .8 * rn.b;
    float rm = (1. - lm) * smoothstep(.2, .5, rn.g) * smoothstep(150., 40., bb) * .06;
    float tp = 6.2832 * (dot(P.xz, vec2(-dd.y, dd.x)) / (.8 * tw) + 2.2 * rn.a + 1.4 * rn.r), tg = .5 + .5 * sin(tp) * (.5 + rn.g);   // one noise lookup for all of it
    float rc = rm * cos(6.2832 * (dot(P.xz, kr) / lr + 1.3 * rn.r));
    vec2 gr = rc * 6.2832 / lr * kr + lm * smoothstep(250., 80., bb) * .04 * 7.85 / tw * cos(tp) * (.5 + rn.g) * vec2(-dd.y, dd.x);
    float ddl = h0.w > .003 ? 0. : -dot(gr, normalize(sdir.xz)) * n.y;   // the bump only turns the faces toward or from the light
#endif
    bool isR = h0.w > .003;
    vec2 pz = P.xz;
    float al = .24 + .2 * (nf(pz, 420.).a - .5) + .12 * (nf(pz, 160.).b - .5) + .08 * (nf(pz, 40.).r - .5) + .09 * (nf(pz, 12.).g - .5) + .06 * (nf(pz, 2.5).b - .5) + .04 * (nf(pz, .4).a - .5);
    // site ground: Jezero pale cracked bedrock, Gale dark sand pooled in the hollows, Gusev a pebbly pavement
    float m = b[1].y, cr = nf(pz, 3.).r, cr2 = nf(pz * 1.7 + 9., 3.).g;
    if (m > 1.5 && m < 2.5) al *= 1.2 + .25 * smoothstep(.4, .7, cr) - .2 * smoothstep(.55, .75, cr2);
    else if (m < .5) al *= 1. - .32 * smoothstep(.5, .62, nf(pz, 6.).g);
    else if (m < 1.5) al *= .9 + .25 * smoothstep(.55, .7, nf(pz * 7., 1.).r);
    if (isR) al = h0.y * (m > 1.5 && m < 2.5 ? 1.35 : 1.);
    if (isR) al *= mix(.72, 1.3, smoothstep(.45, .85, n.y)) * (1. + .8 * b[12].x);   // a pale coat of dust on the upward faces over dark flanks (n12: the long lens sees the faces, not a silhouette)
    float ao = isR ? .75 + .25 * n.y : 1. - .6 * h0.z * smoothstep(b[5].y, .55 * b[5].y, t);
    vec3 sg = normalize(sdir + vec3(0., .3, 0.));
    float dl = dot(normalize(vec3(sdir.x, 0., sdir.z)), n);
#if DUNE
    dl += ddl;
#endif
#if DUNE
    // dn: grainflow tongues in tone; a slip face (in the glow's shade) keeps the light of the whole sky behind the viewer,
    // never one flat value
    if (!isR) al *= .84 * mix(1., .6, b[12].y) * (1. + .45 * lm * (tg - .5)) * (1. + 3. * rc);   // dune sand darker than the plain; a ripple's lee a shade darker
    float sh = al * (.45 + .55 * n.y) * ao * max(.7 + .9 * dl, .6) * (1. + .35 * lm) * (.78 + .22 * shd);
#else
    float sh = al * (.45 + .55 * n.y) * ao * clamp(.7 + .9 * dl, mix(.12 + .3 * float(DUNE), .5, b[12].x), 1.4) * (mix(.45, .8, b[12].x) + mix(.55, .2, b[12].x) * shd);
#endif
    // rim of the glow on the tops and sunward faces of rocks; on the soil a forward-scattered sheen toward the sun
    // the soil's sheen grows toward the far plain (grazing view, dust scatters forward), on ripple faces turned to the glow
#if DUNE
    float rim = isR ? al * 2.6 * pow(max(dot(n, sg), 0.), 3. - 1.6 * b[12].x) : (.16 + .1 * smoothstep(2.2, 6.4, log(t))) * mix(clamp(.85 + 4.5 * dl, .45, 1.7), 1., smoothstep(3.4 + 1.8 * float(DUNE), 4.6 + 2. * float(DUNE), log(t))) * mix(min(al * al * 17.4, 2.2), 1., .4) * (.5 + .5 * n.y);   // dn: the slip faces keep some of the sheen
#else
    float rim = isR ? al * 2.6 * pow(max(dot(n, sg), 0.), 3. - 1.6 * b[12].x) : (.16 + .1 * smoothstep(2.2, 6.4, log(t))) * mix(clamp(.85 + 5.5 * dl, .2, 1.7), 1., smoothstep(3.4 + 1.8 * float(DUNE), 4.6 + 2. * float(DUNE), log(t))) * mix(min(al * al * 17.4, 2.2), 1., .4) * (.5 + .5 * n.y);
#endif
#if DUNE
    rim *= isR ? shd : mix(.3, 1., shd);   // dn: the sheen is skylight from the whole glow, so a dune's shade keeps some of it
#else
    rim *= isR ? mix(shd, 1., .4 * b[12].x) : shd;
#endif
    sh += b[12].y * al * (isR ? 1.2 : 2.2) * max(dot(n, sdir), 0.) * shd;   // n12: the late-afternoon sun itself on the ground, with its long shadows
    sh *= 1. - .35 * b[12].y * (1. - shd);
    float fr = 0.;
    if (b[1].w > .5) fr = .22 * smoothstep(.0, -12., t - 26.) * smoothstep(.66, .9, .55 * nf(pz, .5).r + .45 * nf(pz, 2.5).g + .35 * (1. - n.y) + (isR ? .05 : .3 * h0.z)) * (1. - shd * smoothstep(0., .25, dot(n, sdir)));
    float G = fr > .04 ? .5 + .5 * fr : .5 * clamp(rim * 2., 0., .99);
#if VALLEY
    t *= pow(b[9].z * .15385, smoothstep(250., 4000., t));   // n13: the floor far off goes into the same air as the far rim
#endif
    o = vec4(clamp(sh * 1.6, 0., 1.), G, clamp(log(t / .5) / 12.206, 0., 1.), 1.);
  } else if (dk > 0.) {
    float Dm = dk * 1000.; vec2 sp = vec2(az * Dm, el * Dm);
    float base = -.005; if (pr.x <= el) base = max(base, pr.x); if (pr.y <= el) base = max(base, pr.y); if (pr.z <= el) base = max(base, pr.z);
    if (dk2 > 0. && dk2 != dk) { float f2 = 1. - fc; Dm = exp(mix(log(Dm), log(dk2 * 1000.), f2)); alb = mix(alb, alb2, f2); }
    float cov = dk2 > 0. ? 1. : fc;
    float gul = nf(vec2(sp.x, sp.y * .25), 60.).r, str = nf(vec2(sp.x * .05, sp.y), 25.).g, fine = nf(sp, 12.).b;
    float sh = alb * (.55 + .4 * gul + .3 * (str - .5) + .15 * (fine - .5)) * (.85 + .15 * smoothstep(0., .003, pk - el));
    Dm *= 1. + (1.3 + 2.5 * b[1].w) * exp(-max(el - base, 0.) / .0045);
    float Do = Dm;
#if VALLEY
    // n13: the far land takes the air: the far butte some, the rim as much as the floor's far end
    Do = b[9].z * (dk > 3. ? 1000. : dk > 1. ? 450. : 0.) + (dk > 1. ? 0. : Dm);
#endif
    float rr = .42 * smoothstep(2.2 * te, 0., pk - el) * exp(-az * az / .02) * cov;
#if VALLEY
    if (dk < 3.) {   // the buttes: dusty ledges in level beds, a pale talus apron, a dark cap, the faces toward the gap in the glow
      float hr = clamp((el - b[12].z) / max(pk - b[12].z, .002), 0., 1.);
      // n12c: beds of uneven thickness; each ledge runs out along the face and starts again, some stand out more
      float yb = (el - b[12].z) * Dm / b[12].w;
      yb += 1.1 * (nf(vec2(yb * 3., 1.7), 2.).r - .5) + .9 * (gul - .5) + .6 * (str - .5) + .3 * (fine - .5);
      float jb = floor(yb), fb = yb - jb; vec4 wj = texelFetch(uW, ivec2(int(jb) & 127, 77), 0);
      float thb = .1 + .2 * wj.x;
      float led = smoothstep(.86 - thb, .97 - thb, fb) * smoothstep(1., .96, fb) * smoothstep(.4, .62, nf(vec2(sp.x * .5 + 40. * wj.y, jb * 1.3), 3.).g + .3 * (wj.z - .5)) * (.45 + 1.1 * wj.w);
      sh *= (1. + .7 * led) * mix(1.45, 1., smoothstep(.12, .4, hr + .15 * (str - .5))) * mix(1., .7, smoothstep(.88, .98, hr));
      rr += .5 * exp(-az * az / .01) * cov * (.35 + .65 * hr) * (dk < 1. ? 1. : .6);
      rr *= 1. + .8 * led;   // the ledges catch the glow too
    }
#endif
    o = vec4(clamp(sh * 1.6, 0., 1.), .5 * clamp(rr * 2., 0., .99), mix(1., clamp(log(Do / .5) / 12.206, 0., 1.), cov), cov);
  } else o = vec4(0., 0., 1., 0.);
}`,s=a+`#define VIS 0
#define FOG 0
layout(std140) uniform P { vec4 u[21]; };
uniform sampler2D uT; uniform sampler2D uN;
out vec4 o;
const float RP = 3390.;
float hg(float g, float c){ float g2 = g * g; return (1. - g2) / (12.566371 * pow(max(1. + g2 - 2. * g * c, 1e-7), 1.5)); }
float chap(float X, float h, float mu){
  float c = sqrt(X + h), r;
  if (mu >= 0.) r = c / (c * mu + 1.) * exp(-h);
  else { float x0 = sqrt(max(1. - mu * mu, 0.)) * (X + h); r = 2. * sqrt(x0) * exp(min(X - x0, 60.)) - c / (1. - c * mu) * exp(-h); }
  return r;
}
void main(){
  float S = u[1].w; vec2 q = gl_FragCoord.xy / S * 2. - 1.;
  float tf = u[1].z, cp = cos(u[1].y), sp = sin(u[1].y), cy = cos(u[1].x), sy = sin(u[1].x);
  vec3 c0 = normalize(vec3(q * tf, 1.));
  float yv = c0.y * cp + c0.z * sp, zv = -c0.y * sp + c0.z * cp;
  vec3 d = vec3(c0.x * cy + zv * sy, yv, -c0.x * sy + zv * cy);
  float el = asin(clamp(d.y, -1., 1.)), az = u[1].x + atan(c0.x / zv);
  vec2 tc = vec2((az - u[4].x) * u[4].y, (el - u[4].z) * u[4].w);
  vec4 T = tc.y < 1. ? texture(uT, tc) : vec4(0., 0., 1., 0.);
  float H = u[3].w, X = RP / H, tau = u[0].w; vec3 tl = tau * vec3(1., 1., .97); vec3 sd = u[0].xyz;
  float dk = T.b > .996 ? 1e6 : .0005 * exp(T.b * 12.206) * u[13].x;
  float Xm = min(dk, 12. * H / (max(d.y, 0.) + sqrt(24. * H / RP)));
#ifdef VAL
  // n13 (valley mints only): the far rim and the floor's far end stand in the air, the sky's own colour a step darker
  // (the twilight's light comes from the high dust far along the line, so the march runs the sky's whole length there)
  float vs = .06 * smoothstep(.005, -.015, sd.y);   // after sunset the veil reaches nearer (the far butte too)
  float vl = smoothstep(.87 - vs, .955 - vs, T.b) * step(T.b, .996);
  Xm = mix(Xm, 12. * H / (max(d.y, 0.) + sqrt(24. * H / RP)), vl);
#endif
  vec3 I1 = vec3(0.), I2 = vec3(0.); float od = 0., N = u[10].y, soft = u[7].w;
  int nI = int(N);   // uniform bounds: both loops stay rolled on D3D
  for (int i = 0; i < nI; i++) {
    float s = (float(i) + .5) / N, x = Xm * s * s, dx = Xm * 2. * s / N;
    vec3 Q = vec3(0., RP, 0.) + x * d; float r = length(Q), hh = max(r - RP, 0.) / H, rho = exp(-hh) / H * dx;
    float mu = dot(sd, Q) / r;
    vec3 tv = exp(-tl * (od + .5 * rho));
    I1 += rho * tv * exp(-tl * chap(X, hh, mu));
    I2 += rho * tv * exp(-tl * (.45 * chap(X, hh + 1., min(mu + soft, 1.))));
    od += rho;
  }
  float cth = dot(d, sd);
  vec3 P1 = u[13].y * u[12].w * vec3(hg(.92, cth), hg(.935, cth), hg(.95, cth)) + .6 * vec3(hg(.62, cth), hg(.6, cth), hg(.55, cth)) + .05 * hg(-.3, cth);
  float Pb = .03 + .6 * hg(.55, cth);
  vec3 OM = vec3(.97, .88, .6);
  vec3 L = tau * (OM * P1 * I1 + u[7].xyz * Pb * I2);
  // twilight rays (no branch: strength 0 on other mints): the ridge's skyline round the sun's bearing as a short
  // Fourier series made in JS, traced back along the line to the sun below it
  float xr = clamp((az - u[14].x) * (u[14].z - u[14].y) / max(el - u[14].y, 1e-3) / u[15].y, -1., 1.);
  vec4 w1 = 3.14159 * xr * vec4(1., 2., 3., 4.), w2 = w1 + 3.14159 * xr * 4.;
  float rh = dot(u[16], cos(w1)) + dot(u[17], cos(w2)) + dot(u[18], sin(w1)) + dot(u[19], sin(w2));
  L *= 1. - u[13].w * clamp(rh / u[14].w, -1., 1.) * smoothstep(.0, .04, el - u[14].z) * smoothstep(1., .6, abs(xr));
  vec3 Tv = exp(-tl * od), Ts = u[5].xyz, amb = u[3].xyz;
  float A = T.a, fr = max(T.g - .5, 0.) * 2., rim = T.g < .5 ? T.g * 2. : 0.;
  vec3 soil = vec3(1., .56, .34);
  float fwd = .25 + 1.1 * exp(-max(1. - cth, 0.) * 160.);
  vec3 Ls = (T.r / 1.6) * u[15].x * amb * soil + rim * (Ts * .35 * soil + u[11].xyz * u[11].w * fwd * mix(vec3(1.), soil, .45));
  Ls = mix(Ls, (.12 + T.r) * .3 * amb * vec3(.95, 1., 1.06), fr);
  float pw = 2. * tf / S;
#if VIS
  // twilight ice cloud: thin wisps high above the dust, still sunlit after the ground is dark, finely rippled
  if (u[8].x == 3. && A < 1. && d.y > 0.) {
    float hc = u[8].y, xc = -RP * d.y + sqrt(RP * RP * d.y * d.y + 2. * RP * hc + hc * hc);
    vec3 Qc = vec3(0., RP, 0.) + xc * d; vec2 cp2 = (xc * d).xz + u[9].zw * u[10].w;
    vec2 wq = vec2(dot(cp2, u[9].xy), dot(cp2, vec2(-u[9].y, u[9].x)));
    wq += 14. * (textureLod(uN, wq * .0016 + .2, 0.).ba - .5);
    vec4 n1 = textureLod(uN, wq * vec2(.0032, .0075) + .37, 0.), n2 = textureLod(uN, wq * vec2(.02, .03) + .61, 0.);
    float rib = .5 + .5 * sin(wq.x * 2.6 + 9. * n2.b);
    float wisp = smoothstep(.6, .9, n1.r + .3 * (n2.g - .5)) * (.25 + .75 * rib * rib) * smoothstep(.0, .06, d.y);
    float muc = dot(sd, Qc) / length(Qc);
    vec3 Tc = exp(-tl * chap(X, hc / H, muc));
    vec3 pearl = (1. + .22 * exp(-length(d - sd) * 6.) * cos(6.2832 * (n2.a * 1.3 + 4. * length(d - sd) + vec3(0., .33, .67)))) * vec3(.92, .97, 1.08);
    L += (1. - A) * u[8].z * wisp * Tc * Tv * (hg(.75, cth) + .04) * pearl;
  }
#endif
  L += A * Ls * Tv;
#ifdef VAL
  L *= 1. - .2 * vl * A;
#endif
#if FOG
  // n12c: water-ice ground fog on a frosty morning, lying on the low ground beyond the near crest. Its density falls off
  // with height (so it has no top edge), its floor rises and falls and it tears open with a slow noise, it is lit by the
  // sky and the glow, and it thins as the sun climbs (u[19]: strength, floor, start distance, scale height)
  {
    float tR = T.b > .996 ? 8000. : min(.5 * exp(T.b * 12.206), 8000.), s0 = u[19].z, Hf = u[19].w;
    // banks of it seen as soft blobs, wide and low, drifting slowly (in view angles, so no column repeats down the frame)
    vec4 fn = textureLod(uN, vec2(az * .8, el * 4.) + vec2(.0016, .0003) * u[10].w + .3, 0.), fn2 = textureLod(uN, vec2(az * 2.6, el * 11.) + vec2(-.0011, .0005) * u[10].w + .7, 0.);
    float yF = u[19].y + 32. * (fn.r - .5) + 12. * (fn2.g - .5);
    float bq = -d.y / Hf, sp0 = max(tR - s0, 0.);
    float ig = abs(bq) * sp0 < 1e-3 ? sp0 : (exp(min(bq * tR, 60.)) - exp(min(bq * s0, 60.))) / bq;
    float od = u[19].x * exp((yF - 1.95) / Hf) * max(ig, 0.) * smoothstep(.15, .6, fn.b + .4 * (fn2.a - .5)) * smoothstep(.034, -.004, el + .016 * (fn2.r - .5) + .01 * (fn.g - .5));   // it lies low: thins out over the first degree above the line, wavering
    vec3 fc = u[3].xyz * .62 * vec3(.88, 1., 1.16) + u[11].xyz * u[11].w * fwd * .25;
    L = mix(L, fc, .88 * (1. - exp(-od)));
  }
#endif
  // the sun's disc, limb darkened, extincted by the airmass
  vec3 dv = d - sd; float th = length(dv), rs = u[5].w;
  // after sunset the high dust still in the sun stands as a fan over the place it went down (blue-white at its foot)
  L += (1. - A) * u[15].z * vec3(.8, .9, 1.) * exp(-th / u[15].w);
#ifdef VAL
  L += A * vl * .86 * u[15].z * vec3(.8, .9, 1.) * exp(-th / u[15].w);   // the air in front of the far land is in the fan's light too
#endif
  float disc = smoothstep(rs + pw * .75, rs - pw * .75, th);
  if (disc > 0.) {
    float r2 = min(th * th / (rs * rs), 1.);
    float limb = 1. - .6 * (1. - sqrt(1. - r2));
#if VIS
    if (u[8].x == 2.) {
      vec3 e1 = normalize(cross(vec3(0., 1., 0.), sd)), e2 = cross(sd, e1);
      vec2 lp = vec2(dot(dv, e1), dot(dv, e2)) - u[8].yz;
      float ca = cos(u[8].w), sa = sin(u[8].w);
      vec2 v = vec2(ca * lp.x + sa * lp.y, -sa * lp.x + ca * lp.y) / u[9].xy;
      float lv = length(v); vec2 cv = v / max(lv, 1e-6);
      // a lump, not an ellipse: low harmonics with odd terms (no axis of symmetry), two flatter facets, and the bite of
      // Stickney out of one end
      float c2 = cv.x * cv.x - cv.y * cv.y, s2 = 2. * cv.x * cv.y, c3 = cv.x * c2 - cv.y * s2, s3 = cv.x * s2 + cv.y * c2;
      float rr = lv * (1. - .06 * cv.x + .04 * cv.y + .07 * s2 + .06 * c3 - .05 * s3 + .03 * (c2 * c2 - s2 * s2));
      rr = max(rr, max(dot(v, vec2(-.8, .6)) / .94, dot(v, vec2(.28, -.96)) / .95));
      rr = max(rr, 1. + (.36 - length(v - vec2(1., .08))) * 2.2);
      disc *= smoothstep(1. - pw / u[9].y * .8, 1. + pw / u[9].y * .8, rr);
    }
#endif
    L += (1. - A) * disc * limb * u[12].w * Ts / (3.14159 * rs * rs) * u[20].xyz;
  }
#if VIS
  // Earth as an evening star
  if (u[8].x == 1.) { float te = length(d - u[9].xyz), tm2 = length(d - u[12].xyz), sg = pw * 1.05; L += (1. - A) * u[8].y * (exp(-te * te / (2. * sg * sg)) + .03 * exp(-te * te / (18. * sg * sg)) + .12 * exp(-tm2 * tm2 / (2. * sg * sg)) * vec3(1.05, 1., .95)) / (6.2832 * sg * sg) * vec3(.85, .95, 1.1); }
#endif
  // veiling glare from the dusty window
  L += u[6].z * u[12].w * (.00012 * Ts / (th * th + .0009) + u[6].z * .0032 * Ts / (th * th + .02));
  // ---- camera ----
  vec3 col = L * u[2].xyz * u[2].w;
  // the saturated disc blooms a pixel or two into the glow
  float sl = (1. - exp(-dot(Ts * u[2].xyz, vec3(.3, .55, .15)) * u[2].w / (3.14159 * rs * rs))) * step(.99, u[12].w);
  col += (1. - A) * (1. - disc) * sl * sl * .9 * exp(-max(th - rs, 0.) / (pw * 1.3)) * vec3(.97, 1., 1.04);
  vec2 sc = gl_FragCoord.xy / S;
  col *= 1. - .025 * dot(q, q);
  float nd = u[6].w;
  int nD = int(nd);
  for (int i = 0; i < nD; i++) {
    uint h = hu(uint(i) * 7919u + uint(u[10].z));
    vec2 cc = vec2(float(h & 1023u), float((h >> 10) & 1023u)) / 1023.;
    float rad = .018 + .045 * float((h >> 20) & 255u) / 255.;
    if (i == 0 && u[10].x > .5) rad = .12;
    float r = length(sc - cc) / rad;
    float ring = smoothstep(.62, .85, r) * smoothstep(1.06, .9, r) + .35 * smoothstep(1., .5, r);
    col *= 1. - (.02 + .03 * float((h >> 28) & 3u) / 3.) * ring * (.3 + .7 * exp(-th / .12));
  }
  uvec2 ip = uvec2(gl_FragCoord.xy);
  uint hh = hu(ip.x * 1973u + hu(ip.y * 9277u + uint(u[6].x)));
  vec3 gn = vec3(float(hh & 1023u), float((hh >> 10) & 1023u), float((hh >> 20) & 1023u)) / 1023. - .5;
  uint h2 = hu(hh);
  float gl0 = float(h2 & 1023u) / 1023. - .5;
  col += (gn * .5 + gl0 * .8) * u[6].y * (sqrt(max(col, 0.)) + .06);
  col = 1. - exp(-max(col, 0.));
  float lum = dot(col, vec3(.3, .55, .15));
  col = mix(vec3(lum), col, u[13].z);
  col = pow(col, vec3(1. / 2.2));
  uint h3 = hu(h2 ^ 0x9e3779b9u);
  col += 1.5 * (float(h3 & 255u) + float((h3 >> 8) & 255u) - 255.) / (255. * 255.);
  o = vec4(col, 1.);
}`,n=(b,f)=>{const D=t.createShader(f);return t.shaderSource(D,b),t.compileShader(D),D},l=n(e,t.VERTEX_SHADER),i=[],m=b=>{const f=n(b?o.replace(`#define VALLEY 0
#define DUNE 0`,"#define VALLEY "+(b&1)+`
#define DUNE `+(b>>1)):o,t.FRAGMENT_SHADER),D=t.createProgram();t.attachShader(D,l),t.attachShader(D,f),t.linkProgram(D),t.flush(),i[b]={p:D,f,ready:!1}},c=b=>{i[b]||m(b);const f=i[b];if(!f.ready){if(!t.getProgramParameter(f.p,t.LINK_STATUS))throw new Error("334 bake: "+(t.getShaderInfoLog(f.f)||t.getProgramInfoLog(f.p)));t.useProgram(f.p),t.uniform1i(t.getUniformLocation(f.p,"uN"),1),t.uniform1i(t.getUniformLocation(f.p,"uP"),2),t.uniform1i(t.getUniformLocation(f.p,"uW"),3),t.uniformBlockBinding(f.p,t.getUniformBlockIndex(f.p,"B"),1),f.ready=!0}return f.p};m(Ee);const w=[],p=b=>{const f=n(b?s.replace(`#define VIS 0
#define FOG 0`,"#define VIS "+(b&1)+`
#define FOG `+(b>>1&1)+(b&4?`
#define VAL 1`:"")):s,t.FRAGMENT_SHADER),D=t.createProgram();t.attachShader(D,l),t.attachShader(D,f),t.linkProgram(D),t.flush(),w[b]={p:D,f,ready:!1}},M=b=>{w[b]||p(b);const f=w[b];if(!f.ready){if(!t.getProgramParameter(f.p,t.LINK_STATUS))throw new Error("334 comp: "+(t.getShaderInfoLog(f.f)||t.getProgramInfoLog(f.p)));t.useProgram(f.p),t.uniform1i(t.getUniformLocation(f.p,"uT"),0),t.uniform1i(t.getUniformLocation(f.p,"uN"),1),t.uniformBlockBinding(f.p,t.getUniformBlockIndex(f.p,"P"),0),f.ready=!0}return f.p};p(Te),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1);const u=256,x=new Float32Array(u*u),r=new Float32Array(u*u),g=new Uint8Array(u*u*4),E=(b,f,D,lt)=>{for(let Pt=0;Pt<u;Pt++){const Ft=Pt*lt;let Ue=0;for(let ft=-2;ft<=2;ft++)Ue+=b[Ft+(ft+u&255)*D];for(let ft=0;ft<u;ft++)f[Ft+ft*D]=Ue*.2,Ue+=b[Ft+(ft+3&255)*D]-b[Ft+(ft-2+u&255)*D]}};let U=3361566;for(let b=0;b<4;b++){for(let f=0;f<u*u;f++)U=Math.imul(U^U>>>15,739982445)+1831565813|0,x[f]=(U>>>8&65535)/65535-.5;E(x,r,1,u),E(r,x,1,u),E(x,r,1,u),E(r,x,u,1),E(x,r,u,1),E(r,x,u,1);for(let f=0;f<u*u;f++)g[f*4+b]=Math.max(0,Math.min(255,127.5+x[f]*1230))}const z=t.createTexture();t.bindTexture(t.TEXTURE_2D,z),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,u,u,0,t.RGBA,t.UNSIGNED_BYTE,g),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const $=new Uint8Array(128*128*4);for(let b=0;b<$.length;b++)U=Math.imul(U^U>>>15,739982445)+1831565813|0,$[b]=U>>>12&255;const H=t.createTexture();t.bindTexture(t.TEXTURE_2D,H),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,128,128,0,t.RGBA,t.UNSIGNED_BYTE,$),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null),c(Ee),M(Te);const rt=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,rt),t.bufferData(t.UNIFORM_BUFFER,13*16,t.DYNAMIC_DRAW);const q=t.createBuffer();return t.bindBuffer(t.UNIFORM_BUFFER,q),t.bufferData(t.UNIFORM_BUFFER,21*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),{nz:g,useB:c,useC:M,tN:z,tW:H,ub:rt,uc:q,vao:t.createVertexArray(),MT:t.getParameter(t.MAX_TEXTURE_SIZE)|0}})());let zt=yt>300?2560:640,jt=yt>300?512:128;zt>W.MT&&(zt=W.MT,jt=Math.round(zt/5));const Q={w:zt};Q.tT=t.createTexture(),t.bindTexture(t.TEXTURE_2D,Q.tT),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,zt,jt,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),Q.fb=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,Q.fb),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Q.tT,0),Q.tP=t.createTexture(),t.bindTexture(t.TEXTURE_2D,Q.tP),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,C,1,0,t.RGBA,t.HALF_FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const St=[Math.sin(.15*V*d()),Math.cos(.15*V*d())],We={0:30+20*d(),1:120+60*d(),2:28+15*d(),3:80},Oe=d(),Yt=it?90+3*(We[0]-30):We[P],Ve=it?-(.1+.16*Oe)*h:-(.5+.6*Oe)*h*(P===1?.4:1)*G/(20*h),Ka=It+Yt*Math.tan(Ve),Ja=Yt*.45,je=it?4+8*d():{0:4+3*d(),1:2+d(),2:3+2*d(),3:0}[P],Qa={0:1,1:1.35,2:.85,3:.04}[P],Ye=d(),Ke=d(),ne=P===3?120+70*Ye:55+35*Ye,re=P===3?ne*(.06+.025*Ke):3.5+3*Ke,Re=d()-.5,qt=P===3?Math.sign(Re)*(6+24*Math.abs(Re))*h:Re*.8,Z=(e,a)=>[Math.sin(e)*Math.cos(a),Math.sin(a),Math.cos(e)*Math.cos(a)],Za=Z(0,Math.max(S,.02)),le=Z(0,Math.max(S,0)+5*h),Je=e=>Mt?Z(0,Math.max(e,Math.max(e,0)+5*h*B(k+6*h,k+2*h,e))):le,ke=e=>Mt?Math.round(e/h):0,ze=[d(),d(),d()];{const e=new Uint16Array(C*4),a=new Float32Array(1),o=new Uint32Array(a.buffer);for(let s=0;s<C*4;s++){a[0]=et[s];const n=o[0],l=n>>>16&32768,i=(n>>>23&255)-112,m=n&8388607;e[s]=i<=0?l:i>=31?l|31743:l|Math.min((i<<10)+(m+4096>>>13),31743)}t.bindTexture(t.TEXTURE_2D,Q.tP),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.texSubImage2D(t.TEXTURE_2D,0,0,0,C,1,t.RGBA,t.HALF_FLOAT,e)}const T=new Float32Array(52);if(T.set([Rt,bt,Vt,ye-Vt],0),T.set([It,P,P===3?640:ae<.5?580:460,N==="Frosty sunrise"?1:0],4),T.set([Yt,Ka,Ja,je],8),T.set([St[0],St[1],14+10*ze[0],Qa],12),T.set(X,16),T.set([P===3?It+re*2.8+2:It+2.4,P===3?90:150,P===3?.45:.1,ne],20),T.set([le[0],le[1],le[2],re],24),T.set(P===3?[Math.sign(qt)*Math.cos(qt),-Math.sign(qt)*Math.sin(qt)]:[Math.sin(qt),Math.cos(qt)],28),T[30]=ze[1]*4e3,T[31]=ze[2]*4e3,T.set(at,32),T.set([zt,jt,it?32:5,3],36),T.set([[.1,.75,.25,.5],[0,0,.45,1],[.8,0,.3,.4],[.4,0,.5,.8]][P],40),ae<.5&&(T[41]*=.6,T[40]=Math.max(T[40],.45)),T.set([ae<.5?1:0,0,Ve-.2*h,11],48),it){const e=(n,l,i,m)=>{const c=(n+T[30])/(i*32)*256-.5,w=(l+T[31])/(i*32)*256-.5,p=Math.floor(c),M=Math.floor(w),u=c-p,x=w-M,r=(g,E)=>W.nz[(((E&255)<<8)+(g&255))*4+m]/255;return(r(p,M)*(1-u)+r(p+1,M)*u)*(1-x)+(r(p,M+1)*(1-u)+r(p+1,M+1)*u)*x},a=(n,l)=>1.6*(e(n,l,300,0)-.5)+2.2*(e(n,l,110,1)-.5)*B(200,500,Math.hypot(n,l))+.18*(e(n,l,22,2)-.5)+.05*(e(n,l,5,3)-.5),o=It+a(0,0);let s=0;for(let n=0;n<=24;n++){const l=(be+oe*1.4*(n/12-1))*h,i=Math.round((l-Rt)/bt*(C-1));if(i<0||i>=C||Math.max(et[i*4],et[i*4+1])>.3*h)continue;const m=Math.sin(l),c=Math.cos(l),w=Yt/Math.max(m*St[0]+c*St[1],.5),p=m*w,M=c*w,u=(p*St[1]-M*St[0])*.55,x=.82+.3*B(.2,.8,e(u,7,4,1)),r=1.98*bt*(e(u,7,4,2)-.45);s=Math.max(s,(w*Math.tan(.1*h)+o-a(p,M)-r)/x)}T[9]=s}if(P===3){const e=(s,n)=>{const l=T[30]/(s*32)*256-.5,i=T[31]/(s*32)*256-.5,m=Math.floor(l),c=Math.floor(i),w=l-m,p=i-c,M=(u,x)=>W.nz[(((x&255)<<8)+(u&255))*4+n]/255;return(M(m,c)*(1-w)+M(m+1,c)*w)*(1-p)+(M(m,c+1)*(1-w)+M(m+1,c+1)*w)*p},o=.8275862068965517;T[51]=.9*(e(ne*2.4,0)-.5)-(.8-.09),T[50]=It+1.6*(e(300,0)-.5)+re*(.75+.5*e(ne*.9,2))*1.35*o*o*(3-2*o)}const ie=e=>Mt?B(k+2*h,k+8*h,e):0;T.set([(ye-Vt)/jt,[2.4,1.6,2.8,1][P],P===3?72:48,Math.pow(ae,1.5)],44);const Qe=(e,a)=>{T.set(a,24),T[49]=ie(e*h),Q.st=e,t.bindFramebuffer(t.FRAMEBUFFER,Q.fb),t.viewport(0,0,zt,jt),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(W.useB(Ee)),t.bindBuffer(t.UNIFORM_BUFFER,W.ub),t.bufferSubData(t.UNIFORM_BUFFER,0,T),t.bindBufferBase(t.UNIFORM_BUFFER,1,W.ub),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,W.tN),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Q.tP),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,W.tW),t.bindVertexArray(W.vao),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush()};Qe(ke(S),Je(S));const Gt=3390,gt=[.97,.88,.6],Ze=[1,1,.97],$a=[.92,.935,.95],t0=[.62,.6,.55],he=(e,a)=>(1-e*e)/(12.566371*Math.pow(Math.max(1+e*e-2*e*a,1e-7),1.5)),Kt=(e,a,o)=>{const s=Math.sqrt(e+a);if(o>=0)return s/(s*o+1)*Math.exp(-a);const n=Math.sqrt(Math.max(1-o*o,0))*(e+a);return 2*Math.sqrt(n)*Math.exp(Math.min(e-n,60))-s/(1-s*o)*Math.exp(-a)},ce=10,$e=A==="Global storm"?.08:A==="Hazy"?.28:N==="Frosty sunrise"?.45:.35,v={tau:kt,sd:Za,ms:[0,0,0],soft:.08},fe=(e,a)=>{const o=se,s=Gt/o,n=v.tau,l=v.sd,i=12*o/(Math.max(e[1],0)+Math.sqrt(24*o/Gt));let m=0;const c=[0,0,0],w=[0,0,0];for(let x=0;x<ce;x++){const r=(x+.5)/ce,g=i*r*r,E=i*2*r/ce,U=g*e[0],z=Gt+g*e[1],$=g*e[2],H=Math.hypot(U,z,$),rt=Math.max(H-Gt,0)/o,q=Math.exp(-rt)/o*E,b=(l[0]*U+l[1]*z+l[2]*$)/H,f=Kt(s,rt,b),D=Kt(s,rt+1,Math.min(b+v.soft,1));for(let lt=0;lt<3;lt++){const Pt=n*Ze[lt],Ft=Math.exp(-Pt*(m+.5*q));c[lt]+=q*Ft*Math.exp(-Pt*f),w[lt]+=q*Ft*Math.exp(-Pt*.45*D)}m+=q}const p=e[0]*l[0]+e[1]*l[1]+e[2]*l[2],M=.03+.6*he(.55,p),u=.05*he(-.3,p);for(let x=0;x<3;x++)a[x]=n*(gt[x]*($e*he($a[x],p)+.6*he(t0[x],p)+u)*c[x]+v.ms[x]*M*w[x]);return a},ta=(e,a,o)=>{const s=(e*2-1)*Tt,n=(1-a*2)*Tt,l=Math.hypot(s,n,1),i=s/l,m=n/l,c=1/l,w=Math.cos(Bt),p=Math.sin(Bt),M=m*w+c*p,u=-m*p+c*w;return[i*Math.cos(o)+u*Math.sin(o),M,-i*Math.sin(o)+u*Math.cos(o)]},O=A==="Global storm"?[1.1,.86,.98]:N==="Frosty sunrise"?[1.05,.94,1.3]:[1,.98,1.3],Jt=[[.5,.12],[.2,.2],[.8,.2],[.35,.4],[.65,.4],[.5,.55]];if(te)for(const e of Jt)e[1]*=Ea;const j=[0,0,0],ea=[[0,1,0],Z(0,.35),Z(1.57,.35),Z(-1.57,.35),Z(3.14,.35)],e0=[.3,.22,.16,.16,.16],de=new Float32Array(84),a0=.75,aa=8*h;let oa=1e9,sa=k;const _=(e,a,o,s,n)=>de.set([a,o,s,n],e*4),o0=Nt==="Clean"?0:Nt==="Dusty"?5:9,s0=d()*65535|0,me=[V*(.12+.12*d())*G,(.28+.12*d())*G],Dt={b:(d()<.5?-1:1)*(.06+.24*d())*J,ang:(d()-.5)*1.2,rot:d()*3.14},Qt={a:V*(.22+.25*d())*G,D:1.8+2*d(),v:(d()<.5?-1:1)*(.25+.35*d())*h,H:.25+.25*d(),w:.035+.035*d()},na=e=>{let a=0;for(const o of Jt)fe(ta(o[0],o[1],e),j),a+=.3*j[0]*O[0]+.55*j[1]*O[1]+.15*j[2]*O[2];return Math.max(a/Jt.length,1e-30)};let ue=1,ra="",la=1,ia=1e30;const De=(e,a)=>{v.tau=e,v.sd=Z(0,a),v.soft=.01+.01*Math.min(e,2);const o=.12*(1-Math.exp(-1.5*e));for(let i=0;i<3;i++)v.ms[i]=o*gt[i]*gt[i]/(1-.6*gt[i]);let s=0;for(const i of Jt)fe(ta(i[0],i[1],Ht),j),s+=.3*j[0]*O[0]+.55*j[1]*O[1]+.15*j[2]*O[2];const n=Kt(Gt/se,0,Math.sin(a));return .5*(.3*O[0]*Math.exp(-e*n)+.55*O[1]*Math.exp(-e*n)+.15*O[2]*Math.exp(-e*.97*n))/(Math.PI*J*J)/Math.max(s/Jt.length,1e-30)};if(A==="Global storm")for(S=k+.4*h;S<k+14*h&&De(kt,S)<2.2;)S+=.3*h;let ha=0;const n0=()=>{const e=Math.max(_t(ct).e,.004);let a=kt,o=4;if(De(a,e)<1.4)return 0;for(let s=0;s<9;s++){const n=.5*(a+o);De(n,e)>1.4?a=n:o=n}return a-kt};let vt=Ht,ct=0,Xt=0,wt=0,At=0,Ae=1,Zt=[0,0,0];const _t=e=>{const a=S+ht*Me*e;return{e:a,a:-V*.35*(a-S)*ht}},ca=(e,a)=>{const o=_t(ct);v.sd=Z(o.a,o.e),v.tau=kt+wt;const s=v.tau,n=.12*(1-Math.exp(-1.5*s))*(.12+.88*B(-2.6*h,1.2*h,o.e));for(let r=0;r<3;r++)v.ms[r]=n*gt[r]*gt[r]/(1-.6*gt[r]);v.soft=.01+.01*Math.min(s,2);const l=Gt/se,i=Kt(l,0,Math.sin(o.e)),m=Ze.map(r=>Math.exp(-s*r*i));let c=.5/na(vt);const w=Math.max(o.e,k+1.2*h),p=Math.round(w*3e3)+":"+Math.round(vt*400);if(p!==ra){ra=p;const r=[v.tau,v.sd,v.soft,v.ms.slice()];v.tau=Math.min(kt,.6),v.sd=Z(o.a,w),v.soft=.01+.01*v.tau;const g=.12*(1-Math.exp(-1.5*v.tau));v.ms=gt.map(E=>g*E*E/(1-.6*E)),ue=.5/na(vt),[v.tau,v.sd,v.soft,v.ms]=r}if(c>ue&&(c=ue*Math.pow(c/ue,.4)),c*=(A==="Global storm"?.42:A==="Hazy"?.85:1)*(1-.15*ie(o.e)),Y==="Mastcam-100"){const r=(R==="Phobos transit"?.9:2.5)*Math.PI*J*J/Math.max(.3*m[0]*O[0]+.55*m[1]*O[1]+.15*m[2]*O[2],1e-30);r<c&&(c=R==="Phobos transit"?Math.pow(c,.72)*Math.pow(r,.28):Math.sqrt(c*r)),la=R==="Phobos transit"?Math.min(1,r/c):1}wt<.01?ia=c:c=Math.min(c,ia*(1+(o.e>k?.6:3.5)*Math.min(wt,1.2))),At=a||!At?c:At*Math.exp(Math.log(c/At)*.12);for(let r=0;r<3;r++)Zt[r]=0;for(let r=0;r<ea.length;r++){fe(ea[r],j);for(let g=0;g<3;g++)Zt[g]+=e0[r]*j[g]}_(0,v.sd[0],v.sd[1],v.sd[2],s),_(1,vt,Bt,Tt,yt),_(2,O[0],O[1],O[2],At);{const r=ie(o.e)*1.6;_(3,Zt[0]+r*m[0],Zt[1]+r*.86*m[1],Zt[2]+r*.66*m[2],se)}if(_(4,Rt,1/bt,Vt,1/(ye-Vt)),_(5,m[0],m[1],m[2],J),_(6,Ae,.024*Math.pow(yt/1e3,.3)*Math.sqrt(1+.4*wt),Nt==="Dusty"?1:Nt==="Dust ring"?.55:.06,o0),_(7,v.ms[0],v.ms[1],v.ms[2],v.soft),R==="Earth"){const r=o.e+me[1],g=o.a+me[0],E=Z(g,r),U=Kt(l,0,Math.sin(Math.max(r,-.01)));_(8,1,4*6.2832*Math.pow(1.5*Tt/yt,2)/Math.max(At,1e-30)*Math.exp(-.15*s*Math.min(U,7)),0,0),_(9,E[0],E[1],E[2],0)}else if(R==="Phobos transit"){const r=-.2*J+.07*J*(e-4);_(8,2,Math.cos(Dt.ang)*r-Math.sin(Dt.ang)*Dt.b,Math.sin(Dt.ang)*r+Math.cos(Dt.ang)*Dt.b,Dt.rot),_(9,.5*J,.37*J,0,0)}else if(R==="Twilight ice cloud"){const r=Qt.a/G*3+(Qt.v>0?.4:-.4);_(8,3,45+50*(Qt.H-.25),.45*(.7+.6*(Qt.D-1.8)/2),0),_(9,Math.cos(r),Math.sin(r),.012*Math.sign(Qt.v),.006)}else _(8,0,0,0,0);fe(Z(o.a,Math.max(o.e,k)+.12),j);const M=ie(o.e);_(11,j[0],j[1],j[2],.42*(1+1.5*M));{const r=o.e+me[1]+.006,g=o.a+me[0]+.004*V,E=Z(g,r);_(12,E[0],E[1],E[2],la)}_(10,Nt==="Dust ring"?1:0,ce,s0,e),_(13,A==="Global storm"?6:1,$e,Y==="Pancam mosaic"?1.18:.95,R==="Twilight rays"?.55*B(1*h,-.5*h,o.e-k):0);const u=k-o.e,x=ht<0?.3/Math.max(At,1e-30)*B(-1*h,.4*h,u)*Math.exp(-Math.max(u,0)/(3.2*h))*(A==="Hazy"?.8:1):0;if(_(20,...R==="Phobos transit"?[1.16,.88,.52]:A==="Global storm"?[1.12,.92,.66]:A==="Hazy"?[1.05,.97,.88]:[1,1,1],0),_(15,a0*(1+3*M),aa,x,(A==="Hazy"?7:5)*h),R==="Twilight rays"){const r=Math.round(o.a*2e3);if(r!==oa){oa=r;const g=128,E=new Float32Array(g);let U=0;for(let z=0;z<g;z++){const $=o.a+aa*(2*(z+.5)/g-1),H=Math.max(0,Math.min(C-1,Math.round(($-Rt)/bt*(C-1))));E[z]=Math.max(et[H*4],et[H*4+1],et[H*4+2],et[H*4+3]),U+=E[z]/g}for(let z=1;z<=8;z++){let $=0,H=0;for(let q=0;q<g;q++){const b=2*(q+.5)/g-1,f=E[q]-U;$+=f*Math.cos(Math.PI*z*b),H+=f*Math.sin(Math.PI*z*b)}const rt=z===1?.25:z===2?.55:1.3;de[(z<=4?64:68)+(z-1)%4]=2*rt*$/g,de[(z<=4?72:76)+(z-1)%4]=2*rt*H/g}sa=U}}_(14,o.a,o.e,sa,.3*h),Ce&&_(19,.0024*(1-.85*B(S,S+2.4*h,o.e)),P===3?-.6*re:-.5*je-4,.5*Yt,18)},fa=()=>{t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,yt,yt),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(W.useC(Te)),t.bindBuffer(t.UNIFORM_BUFFER,W.uc),t.bufferSubData(t.UNIFORM_BUFFER,0,de),t.bindBufferBase(t.UNIFORM_BUFFER,0,W.uc),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Q.tT),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,W.tN),t.bindVertexArray(W.vao),t.drawArrays(t.TRIANGLES,0,3)},$t=F.sound;let Ut=!1,nt="",_e=0,da=0,ma=0,ua=0,pa=0,xa=0,ba=!1;const r0=Ht-.85*G,l0=Ht+.85*G;return ca(0,!0),fa(),(e,a)=>{a=Math.min(a||0,.1);const o=F.input,s=o.taps();let n=!1;const l=()=>{const p=ht<0?_t(ct+Xt).e-J>k:!0;Xt+=(Y==="Mastcam-100"?.5:1)*(p?1.4+.6*d():4+2*d())*(Mt&&_t(ct+Xt).e>k+2.5*h?6:1),n=!0,$t.hit("click",.45),$t.hit("noise",.08,{dur:.18,cutoff:1800})};if(!o.down&&!Ut&&s.length&&l(),o.down&&!Ut&&(Ut=!0,_e=o.x,da=o.y,ma=vt,ua=e,nt="tap"),o.down){if(nt!=="drag"&&nt!=="hold"&&Math.hypot(o.x-_e,o.y-da)>.012&&(nt="drag"),nt==="tap"&&e-ua>.35&&(nt="hold",ha=n0()),nt==="drag"){const p=Math.max(r0,Math.min(l0,ma-(o.x-_e)*G));Math.abs(p-vt)>1e-4&&e-xa>.12&&(xa=e,$t.note(33+Math.abs(p-vt)*400,{dur:.16,vel:.05,wave:"sawtooth",cutoff:500})),vt=p}}else Ut&&(Ut=!1,nt==="tap"&&l(),nt="");const i=_t(ct).e>k?ha:Math.max(0,2.6-kt);Ut&&nt==="hold"?wt+=Math.max(0,i-wt)*Math.min(1,a*.24):wt*=Math.exp(-a/9),Ut&&nt==="hold"&&e-pa>.22&&(pa=e,$t.hit("noise",.04+.1*Math.min(1,wt),{dur:.6,cutoff:280+260*d()}));const m=Xt*Math.min(1,a*4);Xt-=m,ct+=a*ja+m;const c=_t(ct).e;(ht<0&&c<-9.5*h||ht>0&&c>k+9*h)&&(ct=ht<0?(S+9.5*h)/Me:(k+9*h-S)/Me,Xt=0);const w=ht<0?c-J<k:c-J>k;if(w&&!ba&&$t.note(38,{dur:4,vel:.12,wave:"sine",attack:.8}),ba=w,n&&(Ae=(Ae*1103+7)%65521),ca(e,n),Mt){const p=_t(ct).e;ke(p)!==Q.st&&Qe(ke(p),Je(p))}fa()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
