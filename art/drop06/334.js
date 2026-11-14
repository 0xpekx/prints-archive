// Mars Sunset: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/334.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Fe){Fe&&Fe.add({num:334,name:"Mars Sunset",fam:"Worlds",recipe:"A rover's camera on Mars as the sun sets, with a small white sun in a cold blue glow, a dull butterscotch sky and rocks in silhouette. The spot and the odd thing in the sky (Earth, a moon crossing the sun, an icy cloud) change every mint. Drag to pan the camera, tap to take the next shot a few minutes later, or hold to let a dust storm thicken until it goes dark.",interactive:"Drag to pan the mast along the horizon; tap to take the next exposure a few minutes later; hold to let the dust storm thicken",music:!0,gl:!0,fps:30,seed:0,make(F){const t=F.gl,Mt=F.size,st=!!F.home;let mt=860685729;for(let e=2;e<66;e+=8)mt=Math.imul(mt^parseInt(F.hash.slice(e,e+8),16),2246822507)^mt>>>13;const d=()=>{mt=mt+1831565813|0;let e=Math.imul(mt^mt>>>15,1|mt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Lt=e=>{let a=0;for(const s in e)a+=e[s];let o=d()*a;for(const s in e)if(o-=e[s],o<0)return s;return Object.keys(e)[0]},h=Math.PI/180;let R=st?"None":Lt({None:46,Earth:28,"Phobos transit":13,"Twilight ice cloud":13}),tt=st?"Gale rim":Lt({"Gale rim":32,"Gusev plain":28,"Jezero delta":26,"Dune crests":14}),_=st?"Clear":Lt({Clear:48,Hazy:38,"Global storm":14}),I=st?"Before sunset":Lt({"Before sunset":56,"After sunset":32,"Frosty sunrise":12}),K=st?"Mastcam-34":Lt({"Mastcam-34":50,"Pancam mosaic":36,"Mastcam-100":14});const Nt=st?"Dusty":Lt({Clean:38,Dusty:47,"Dust ring":15});R==="Phobos transit"&&(K="Mastcam-100",I==="After sunset"&&(I="Before sunset")),R==="Phobos transit"&&_==="Global storm"&&(_="Hazy"),_==="Global storm"&&I==="After sunset"&&(I="Before sunset"),R==="Earth"&&I!=="After sunset"&&(R="None");let ut=860818333;for(let e=2;e<66;e+=8)ut=Math.imul(ut^parseInt(F.hash.slice(e,e+8),16),374761393)^ut>>>13;const B=()=>{ut=ut+1831565813|0;let e=Math.imul(ut^ut>>>15,1|ut);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},wa=B(),ya=B(),Ma=B();!st&&R!=="Phobos transit"&&K!=="Mastcam-100"&&(tt==="Gale rim"||tt==="Gusev plain")&&wa<.33&&(tt="Gediz valley");const it=tt==="Gediz valley";!st&&I==="Before sunset"&&R==="None"&&K!=="Mastcam-100"&&_==="Clear"&&ya<.8&&(I="Late afternoon");const Et=I==="Late afternoon";let pt=860773655;for(let e=2;e<66;e+=8)pt=Math.imul(pt^parseInt(F.hash.slice(e,e+8),16),739982445)^pt>>>12;const Ea=(()=>{pt=pt+1831565813|0;let e=Math.imul(pt^pt>>>15,1|pt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296})(),Ta=tt;!st&&R!=="Phobos transit"&&K!=="Mastcam-100"&&I!=="Frosty sunrise"&&I!=="After sunset"&&_!=="Global storm"&&(tt==="Gale rim"||tt==="Gusev plain"||tt==="Jezero delta")&&Ea<.22&&(tt="Dune crests"),F.trait("Site",tt),F.trait("Dust",_),F.trait("Time",I),F.trait("Camera",K),F.trait("Sky extra",R),F.trait("Window",Nt);let xt=860494430;for(let e=2;e<66;e+=8)xt=Math.imul(xt^parseInt(F.hash.slice(e,e+8),16),2654435761)^xt>>>15;const xe=()=>{xt=xt+1831565813|0;let e=Math.imul(xt^xt>>>15,1|xt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let Tt=st?"Horizon":(()=>{const e=xe()*100;return e<62?"Horizon":e<88?"Low horizon":"High horizon"})();(K==="Mastcam-100"||_==="Global storm"||I==="Late afternoon")&&Tt==="Low horizon"&&(Tt="Horizon"),tt==="Dune crests"&&Tt==="High horizon"&&(Tt="Horizon"),F.trait("Aim",Tt);const te=Tt==="Low horizon"?1:Tt==="High horizon"?2:0;let bt=860650045;for(let e=2;e<66;e+=8)bt=Math.imul(bt^parseInt(F.hash.slice(e,e+8),16),668265263)^bt>>>14;const G=()=>{bt=bt+1831565813|0;let e=Math.imul(bt^bt>>>15,1|bt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};G()<.11&&!st&&R==="None"&&I==="After sunset"&&(R="Twilight rays",F.trait("Sky extra",R));const L={"Gale rim":0,"Gusev plain":1,"Jezero delta":2,"Dune crests":3,"Gediz valley":0}[tt],ee={"Gale rim":0,"Gusev plain":1,"Jezero delta":2}[Ta]??L,H=(R==="Phobos transit"?5:{"Mastcam-34":20,"Pancam mosaic":30,"Mastcam-100":7}[K])*h,Rt=Math.tan(H/2),Bt=Math.atan(te===0?Rt/3:Rt*(te===1?.68+.08*xe():-.12-.08*xe())),Ra=te===0?1:(.5+.5*Math.tan(Bt)/Rt)/(.5+.5/3),j=d()<.5?-1:1,Ht=j*(K==="Mastcam-100"?.1:.17)*H,kt=Ht-1.45*H,gt=2.9*H,It=1.95,O=1024,et=new Float32Array(O*4).fill(-.5),C=[9,20,40,80],at=[.2,.2,.2,.2],ot=new Float32Array(64*8);for(let e=0;e<ot.length;e++)ot[e]=d();const ka=(e,a)=>{const o=Math.floor(e),s=e-o,n=s*s*(3-2*s),l=ot[a*64+(o%64+64)%64],i=ot[a*64+((o+1)%64+64)%64];return l+(i-l)*n},y=(e,a,o)=>{let s=0,n=.5,l=0;for(let i=0;i<o;i++)s+=n*ka(e,a+i&7),l+=n,e=e*2.03+3.1,n*=.5;return s/l},S=(e,a,o)=>{const s=Math.max(0,Math.min(1,(o-e)/(a-e)));return s*s*(3-2*s)},J=H/h,ae=Math.min(1,H/(20*h)),za=d(),Da=d(),Le=d(),Ne=d(),Be=d(),Ie=d(),Aa=-j*(2+5*za),_a=1.2+1.6*Da,be=e=>.45*Math.pow(Math.max(0,1-Math.abs(e-Aa)/_a),1.4),Ua=Array.from({length:4},()=>Array.from({length:5},()=>[(G()-.5)*2.4*J,.06+.3*G(),(.04+.16*G())*(G()<.3?-1:1)])),Se=(e,a,o)=>{let s=0;for(const[n,l,i]of Ua[a]){const m=(e-n)/(l*o);m*m<12&&(s+=i*o*Math.exp(-m*m*(i>0?1:2.5)))}return s},Pa=(G()-.5)*1.6*J,Fa=1.5+2.5*G(),La=.12+.16*G(),Na=.02+.05*G(),Ba=Array.from({length:6},()=>[(G()-.5)*2.6*J,.03+.05*G(),.03+.06*G()]),Ia=e=>{let a=.01+Na*5.5*(y(e/2.2,3,4)-.3)+.05*(y(e/.35,6,2)-.5);const o=(e-Pa)/Fa;return Math.abs(o)<1.3&&(a=Math.max(a,-.05+La*Math.sqrt(Math.max(0,1-o*o))*(.8+.4*Math.pow(Math.abs(o),3))+.02*(y(e/.2,4,2)-.5))),L===3&&(a=Math.max(a,.03+.24*Math.pow(Math.max(0,Math.sin(e/1.1+4*y(e/3,5,3))),2.5)*(.5+y(e/5,2,2)))),a},Ct=new Float32Array(O/4+2);if(!(t.__p334&&t.__p334.has(F.hash)))for(let e=0;e<Ct.length;e++)Ct[e]=Ia((kt+gt*Math.min(e*4,O-1)/(O-1))/h);const Sa=(e,a)=>{const o=a/4,s=Math.floor(o);let n=Ct[s]+(Ct[s+1]-Ct[s])*(o-s);for(const[l,i,m]of Ba){const c=(e-l)/i;Math.abs(c)<1&&(n=Math.max(n,Math.max(n,0)+m*Math.pow(1-c*c,.6)))}return n},qe=B()<.5?-1:1,ge=(B()-.5)*.12*J,oe=J*(.12+.11*B()),ve=J*(.3+.22*B()),Ge=ve*(.38+.2*B()),qa=J*(.35+.3*B()),Ga=J*(.3+.3*B()),Xa=4+Math.floor(4*B()),Ha=3+Math.floor(3*B()),Ca=.32+.2*B(),Wa=1.3+.8*B(),we=[B(),B(),B(),B(),B(),B()],Xe=(e,a,o,s,n)=>{const l=S(-oe*(.45+.25*we[n+2]),o*.05,e),i=-1.2+(a*.22+1.2)*Math.pow(l,1.6),m=Math.max(0,Math.min(e/o,1)),c=m*s+.5*(y(e/1.7+n*9,2,3)-.5),w=Math.floor(c),p=c-w,M=we[(w%6+6+n*3)%6],u=Math.min((w+S(.25+.3*M,.7+.25*M,p))/s,1),x=1-Math.pow(1-m,1.8),r=a*(.92+.12*we[n]+.08*(y(e/4+n*5,3,3)-.5)),g=a*.22+(r-a*.22)*(.55*x+.45*Math.max(u,0));return Math.max(i,i+(g-i)*S(-.03*o,.03*o,e))},He=[.55+.9*G(),.55+.9*G()],Oa=G()<.5?-1:1,Va=.35+.3*G(),ja=(G()-.5)*1.2,Ya=(G()-.5)*.5,Wt=t.__p334||(t.__p334=new Map),Ce=F.hash,Ot=Wt.get(Ce);if(Ot){et.set(Ot.prof);for(let e=0;e<4;e++)C[e]=Ot.dist[e],at[e]=Ot.albL[e]}else for(let e=0;e<O;e++){const a=(kt+gt*e/(O-1))/h,o=[-9,-9,-9,-9];if(it){const s=qe*(a-ge)-oe,n=-qe*(a-ge)-oe*(.8+.5*Ie);o[0]=Xe(s+.6*(y(a/.9,1,4)-.5)*J/20,ve,qa,Xa,0)+.012*ve*(y(a/.35,7,2)-.5),o[1]=Xe(n+.5*(y(a/1.3,5,4)-.5)*J/20,Ge,Ga,Ha,1)+.012*Ge*(y(a/.45,6,2)-.5),o[2]=-9,o[3]=.12+.3*Math.pow(y(a/4.5,3,5),1.3)+.06*(y(a/.6,4,3)-.5)-.5*be(a),C[0]=Ca,C[1]=Wa,C[2]=14,C[3]=48,at[0]=.21,at[1]=.21,at[2]=.26,at[3]=.24}else if(ee===0){const s=J*(.12+.2*Le);let n=-.4+S(s,s+9+6*Ne,j*a)*(3+1.4*Be)+.35*(y(a/1.6,1,4)-.5);const l=.45+.25*y(a/4,6,2),i=l*(Math.floor(n/l)+S(.5,1,n/l-Math.floor(n/l)));o[0]=n>0?n*.7+i*.3+.12*(y(a/.3,7,3)-.5):n,o[1]=-.25+.75*Math.pow(y(a/3.3+7,2,4),1.6),o[2]=1.15+.7*(y(a/2.4,3,5)-.5)+.25*(y(a/.5,4,3)-.5)-be(a),C[0]=5,C[1]=11,C[2]=31,at[0]=.21,at[1]=.2,at[2]=.22}else if(ee===1){let s=-.6;for(let n=0;n<3;n++){const l=j*J*(.15+.45*ot[n*3])+n*2.5*j,i=2+3*ot[n*3+1],m=.8+1.4*ot[n*3+2];s=Math.max(s,-.6+m*Math.exp(-Math.pow((a-l)/i,2)))}o[0]=s+(.25+.2*Math.max(s,0))*(y(a/.8,1,5)-.5)-.3*Math.max(s,0)*Math.pow(y(a/1.9,5,3),2),o[1]=.12+.35*(y(a/4,2,4)-.3),o[2]=.42+.2*(y(a/3,3,4)-.5),C[0]=3.6,C[1]=14,C[2]=55,at[0]=.22}else if(ee===2){const s=1.6+.9*Le,n=j*J*(.08+.2*Ne),l=.9+2.2*ot[500],i=4+Math.floor(5*ot[501]),m=(ot[502]-.5)*.5,c=(W,rt,X)=>{const b=S(-X*(2.2+1.5*ot[504]),-X*.3,W),f=S(-X*.75,X*.12,W);let A=.45*Math.pow(b,.7)+.55*f;const lt=A*i+m*f*Math.min(Math.max(W/X,-1),1);return A=.72*A+.28*(Math.floor(lt)+S(.6,1,lt-Math.floor(lt)))/i,-.5+(rt+.5)*A},w=.5*(y(a/.45,1,4)-.5)+.9*(y(a/1.6,5,3)-.5),p=j*(a-n)+w;let M=c(p,s+.35*(y(a/1.1,2,4)-.5),l)+.05*(y(a/.1,7,2)-.5)*S(-l,0,p);const u=n-j*(2.2+2.6*Be),x=.35+.8*Ie,r=a-u-Ya*x*.6,g=x-Math.abs(r)/(r<0?He[0]:He[1])+.25*(y(a/.4,3,3)-.5),E=s*(.5+.35*ot[503]);let P=c(g,E,l*.55)+.04*(y(a/.1,6,2)-.5)*S(-l*.5,0,g);const D=(a-u-ja*x)/(.14*x+.05);P-=(E+.5)*.16*Math.exp(-D*D)*S(-.2,.3,g);const $=x*.55+.35-Math.abs(a-u-Oa*x*1.05)*1.3+.2*(y(a/.3,2,3)-.5);P=Math.max(P,c($,-.5+(E+.5)*Va,l*.45)),M=Math.max(M,P),o[0]=M,o[1]=.95+.5*(y(a/2.6,4,5)-.5)-be(a),C[0]=1.7,C[1]=24,at[0]=.24}else o[1]=.45+.25*(y(a/3,4,5)-.5),C[1]=45;ee===3&&(C[0]=3.2),it||(o[0]=Math.max(o[0]+(o[0]>0?Se(a,0,.7):0),Sa(a,e)));for(let s=it?2:1;s<4;s++)o[s]>-5&&(o[s]+=Se(a,s,1/(1+s*.5)));for(let s=0;s<4;s++)et[e*4+s]=o[s]*h}Ot||(Wt.set(Ce,{prof:et.slice(),dist:C.slice(),albL:at.slice()}),Wt.size>24&&Wt.delete(Wt.keys().next().value));let k=-1,ye=.5*h;{const e=Math.round((0-kt)/gt*(O-1));for(let a=0;a<4;a++)k=Math.max(k,et[e*4+a]);k=Math.max(k,0)}for(let e=0;e<O*4;e++)ye=Math.max(ye,et[e]);const Vt=Bt-H/2-.3*h,Me=Math.min(Bt+H/2+.2*h,ye+.35*h),Q=.175*h;let q,ht=-1;I==="Before sunset"||Et?q=k+H*(_==="Global storm"?.2:K==="Mastcam-100"?R==="Phobos transit"?.22:.1:.06+.03*d()):I==="After sunset"?q=k-(R==="Earth"?_==="Hazy"?1.3+.7*d():1.8+1.2*d():_==="Hazy"?.6+.8*d():.8+1.6*d())*h:(q=k-.1*h,ht=1),Et&&(q=k+(9+5*Ma)*h);const Ka={"Mastcam-34":.2,"Pancam mosaic":.25,"Mastcam-100":.07}[K],Ee=.2*h,zt={Clear:.45+.2*d(),Hazy:.95+.4*d(),"Global storm":1.65+.25*d()}[_],se=_==="Global storm"?13:11,Te=it?1:L===3?2:0,Ja=R==="Earth"||R==="Phobos transit"||R==="Twilight ice cloud"?1:0,We=I==="Frosty sunrise"&&R!=="Phobos transit"?1:0,Re=Ja+2*We+(it?4:0),N=t.__c334||(t.__c334=(()=>{const e=`#version 300 es
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
}`,n=(b,f)=>{const A=t.createShader(f);return t.shaderSource(A,b),t.compileShader(A),A},l=n(e,t.VERTEX_SHADER),i=[],m=b=>{const f=n(b?o.replace(`#define VALLEY 0
#define DUNE 0`,"#define VALLEY "+(b&1)+`
#define DUNE `+(b>>1)):o,t.FRAGMENT_SHADER),A=t.createProgram();t.attachShader(A,l),t.attachShader(A,f),t.linkProgram(A),t.flush(),i[b]={p:A,f,ready:!1}},c=b=>{i[b]||m(b);const f=i[b];if(!f.ready){if(!t.getProgramParameter(f.p,t.LINK_STATUS))throw new Error("334 bake: "+(t.getShaderInfoLog(f.f)||t.getProgramInfoLog(f.p)));t.useProgram(f.p),t.uniform1i(t.getUniformLocation(f.p,"uN"),1),t.uniform1i(t.getUniformLocation(f.p,"uP"),2),t.uniform1i(t.getUniformLocation(f.p,"uW"),3),t.uniformBlockBinding(f.p,t.getUniformBlockIndex(f.p,"B"),1),f.ready=!0}return f.p};m(Te);const w=[],p=b=>{const f=n(b?s.replace(`#define VIS 0
#define FOG 0`,"#define VIS "+(b&1)+`
#define FOG `+(b>>1&1)+(b&4?`
#define VAL 1`:"")):s,t.FRAGMENT_SHADER),A=t.createProgram();t.attachShader(A,l),t.attachShader(A,f),t.linkProgram(A),t.flush(),w[b]={p:A,f,ready:!1}},M=b=>{w[b]||p(b);const f=w[b];if(!f.ready){if(!t.getProgramParameter(f.p,t.LINK_STATUS))throw new Error("334 comp: "+(t.getShaderInfoLog(f.f)||t.getProgramInfoLog(f.p)));t.useProgram(f.p),t.uniform1i(t.getUniformLocation(f.p,"uT"),0),t.uniform1i(t.getUniformLocation(f.p,"uN"),1),t.uniformBlockBinding(f.p,t.getUniformBlockIndex(f.p,"P"),0),f.ready=!0}return f.p};p(Re),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1);const u=256,x=new Float32Array(u*u),r=new Float32Array(u*u),g=new Uint8Array(u*u*4),E=(b,f,A,lt)=>{for(let Pt=0;Pt<u;Pt++){const Ft=Pt*lt;let Pe=0;for(let dt=-2;dt<=2;dt++)Pe+=b[Ft+(dt+u&255)*A];for(let dt=0;dt<u;dt++)f[Ft+dt*A]=Pe*.2,Pe+=b[Ft+(dt+3&255)*A]-b[Ft+(dt-2+u&255)*A]}};let P=3361566;for(let b=0;b<4;b++){for(let f=0;f<u*u;f++)P=Math.imul(P^P>>>15,739982445)+1831565813|0,x[f]=(P>>>8&65535)/65535-.5;E(x,r,1,u),E(r,x,1,u),E(x,r,1,u),E(r,x,u,1),E(x,r,u,1),E(r,x,u,1);for(let f=0;f<u*u;f++)g[f*4+b]=Math.max(0,Math.min(255,127.5+x[f]*1230))}const D=t.createTexture();t.bindTexture(t.TEXTURE_2D,D),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,u,u,0,t.RGBA,t.UNSIGNED_BYTE,g),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const $=new Uint8Array(128*128*4);for(let b=0;b<$.length;b++)P=Math.imul(P^P>>>15,739982445)+1831565813|0,$[b]=P>>>12&255;const W=t.createTexture();t.bindTexture(t.TEXTURE_2D,W),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,128,128,0,t.RGBA,t.UNSIGNED_BYTE,$),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null),c(Te),M(Re);const rt=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,rt),t.bufferData(t.UNIFORM_BUFFER,13*16,t.DYNAMIC_DRAW);const X=t.createBuffer();return t.bindBuffer(t.UNIFORM_BUFFER,X),t.bufferData(t.UNIFORM_BUFFER,21*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),{nz:g,useB:c,useC:M,tN:D,tW:W,ub:rt,uc:X,vao:t.createVertexArray(),pool:[],MT:t.getParameter(t.MAX_TEXTURE_SIZE)|0}})());let ct=Mt>300?2560:640,jt=Mt>300?512:128;ct>N.MT&&(ct=N.MT,jt=Math.round(ct/5));const ke=F.hash+":"+ct;let z=N.pool.find(e=>e.key===ke);const Oe=!z;z?N.pool.splice(N.pool.indexOf(z),1):(N.pool.length>=10&&(z=N.pool.shift(),z.w!==ct&&(t.deleteTexture(z.tT),t.deleteFramebuffer(z.fb),z=null)),z||(z={w:ct},z.tT=t.createTexture(),t.bindTexture(t.TEXTURE_2D,z.tT),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,ct,jt,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),z.fb=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,z.fb),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,z.tT,0),z.tP=t.createTexture(),t.bindTexture(t.TEXTURE_2D,z.tP),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,O,1,0,t.RGBA,t.HALF_FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)),z.key=ke),N.pool.push(z);const St=[Math.sin(.15*j*d()),Math.cos(.15*j*d())],Ve={0:30+20*d(),1:120+60*d(),2:28+15*d(),3:80},je=d(),Yt=it?90+3*(Ve[0]-30):Ve[L],Ye=it?-(.1+.16*je)*h:-(.5+.6*je)*h*(L===1?.4:1)*H/(20*h),Qa=It+Yt*Math.tan(Ye),Za=Yt*.45,Ke=it?4+8*d():{0:4+3*d(),1:2+d(),2:3+2*d(),3:0}[L],$a={0:1,1:1.35,2:.85,3:.04}[L],Je=d(),Qe=d(),ne=L===3?120+70*Je:55+35*Je,re=L===3?ne*(.06+.025*Qe):3.5+3*Qe,ze=d()-.5,qt=L===3?Math.sign(ze)*(6+24*Math.abs(ze))*h:ze*.8,Z=(e,a)=>[Math.sin(e)*Math.cos(a),Math.sin(a),Math.cos(e)*Math.cos(a)],to=Z(0,Math.max(q,.02)),le=Z(0,Math.max(q,0)+5*h),Ze=e=>Et?Z(0,Math.max(e,Math.max(e,0)+5*h*S(k+6*h,k+2*h,e))):le,ie=e=>Et?Math.round(e/h):0,De=[d(),d(),d()];if(Oe){const e=new Uint16Array(O*4),a=new Float32Array(1),o=new Uint32Array(a.buffer);for(let s=0;s<O*4;s++){a[0]=et[s];const n=o[0],l=n>>>16&32768,i=(n>>>23&255)-112,m=n&8388607;e[s]=i<=0?l:i>=31?l|31743:l|Math.min((i<<10)+(m+4096>>>13),31743)}t.bindTexture(t.TEXTURE_2D,z.tP),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.texSubImage2D(t.TEXTURE_2D,0,0,0,O,1,t.RGBA,t.HALF_FLOAT,e)}const T=new Float32Array(52);if(T.set([kt,gt,Vt,Me-Vt],0),T.set([It,L,L===3?640:ae<.5?580:460,I==="Frosty sunrise"?1:0],4),T.set([Yt,Qa,Za,Ke],8),T.set([St[0],St[1],14+10*De[0],$a],12),T.set(C,16),T.set([L===3?It+re*2.8+2:It+2.4,L===3?90:150,L===3?.45:.1,ne],20),T.set([le[0],le[1],le[2],re],24),T.set(L===3?[Math.sign(qt)*Math.cos(qt),-Math.sign(qt)*Math.sin(qt)]:[Math.sin(qt),Math.cos(qt)],28),T[30]=De[1]*4e3,T[31]=De[2]*4e3,T.set(at,32),T.set([ct,jt,it?32:5,3],36),T.set([[.1,.75,.25,.5],[0,0,.45,1],[.8,0,.3,.4],[.4,0,.5,.8]][L],40),ae<.5&&(T[41]*=.6,T[40]=Math.max(T[40],.45)),T.set([ae<.5?1:0,0,Ye-.2*h,11],48),it){const e=(n,l,i,m)=>{const c=(n+T[30])/(i*32)*256-.5,w=(l+T[31])/(i*32)*256-.5,p=Math.floor(c),M=Math.floor(w),u=c-p,x=w-M,r=(g,E)=>N.nz[(((E&255)<<8)+(g&255))*4+m]/255;return(r(p,M)*(1-u)+r(p+1,M)*u)*(1-x)+(r(p,M+1)*(1-u)+r(p+1,M+1)*u)*x},a=(n,l)=>1.6*(e(n,l,300,0)-.5)+2.2*(e(n,l,110,1)-.5)*S(200,500,Math.hypot(n,l))+.18*(e(n,l,22,2)-.5)+.05*(e(n,l,5,3)-.5),o=It+a(0,0);let s=0;for(let n=0;n<=24;n++){const l=(ge+oe*1.4*(n/12-1))*h,i=Math.round((l-kt)/gt*(O-1));if(i<0||i>=O||Math.max(et[i*4],et[i*4+1])>.3*h)continue;const m=Math.sin(l),c=Math.cos(l),w=Yt/Math.max(m*St[0]+c*St[1],.5),p=m*w,M=c*w,u=(p*St[1]-M*St[0])*.55,x=.82+.3*S(.2,.8,e(u,7,4,1)),r=1.98*gt*(e(u,7,4,2)-.45);s=Math.max(s,(w*Math.tan(.1*h)+o-a(p,M)-r)/x)}T[9]=s}if(L===3){const e=(s,n)=>{const l=T[30]/(s*32)*256-.5,i=T[31]/(s*32)*256-.5,m=Math.floor(l),c=Math.floor(i),w=l-m,p=i-c,M=(u,x)=>N.nz[(((x&255)<<8)+(u&255))*4+n]/255;return(M(m,c)*(1-w)+M(m+1,c)*w)*(1-p)+(M(m,c+1)*(1-w)+M(m+1,c+1)*w)*p},o=.8275862068965517;T[51]=.9*(e(ne*2.4,0)-.5)-(.8-.09),T[50]=It+1.6*(e(300,0)-.5)+re*(.75+.5*e(ne*.9,2))*1.35*o*o*(3-2*o)}const he=e=>Et?S(k+2*h,k+8*h,e):0;T.set([(Me-Vt)/jt,[2.4,1.6,2.8,1][L],L===3?72:48,Math.pow(ae,1.5)],44);const $e=(e,a)=>{T.set(a,24),T[49]=he(e*h),z.st=e,t.bindFramebuffer(t.FRAMEBUFFER,z.fb),t.viewport(0,0,ct,jt),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(N.useB(Te)),t.bindBuffer(t.UNIFORM_BUFFER,N.ub),t.bufferSubData(t.UNIFORM_BUFFER,0,T),t.bindBufferBase(t.UNIFORM_BUFFER,1,N.ub),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,N.tN),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,z.tP),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,N.tW),t.bindVertexArray(N.vao),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush()};(Oe||z.st!==ie(q))&&$e(ie(q),Ze(q));const Gt=3390,vt=[.97,.88,.6],ta=[1,1,.97],eo=[.92,.935,.95],ao=[.62,.6,.55],ce=(e,a)=>(1-e*e)/(12.566371*Math.pow(Math.max(1+e*e-2*e*a,1e-7),1.5)),Kt=(e,a,o)=>{const s=Math.sqrt(e+a);if(o>=0)return s/(s*o+1)*Math.exp(-a);const n=Math.sqrt(Math.max(1-o*o,0))*(e+a);return 2*Math.sqrt(n)*Math.exp(Math.min(e-n,60))-s/(1-s*o)*Math.exp(-a)},fe=10,ea=_==="Global storm"?.08:_==="Hazy"?.28:I==="Frosty sunrise"?.45:.35,v={tau:zt,sd:to,ms:[0,0,0],soft:.08},de=(e,a)=>{const o=se,s=Gt/o,n=v.tau,l=v.sd,i=12*o/(Math.max(e[1],0)+Math.sqrt(24*o/Gt));let m=0;const c=[0,0,0],w=[0,0,0];for(let x=0;x<fe;x++){const r=(x+.5)/fe,g=i*r*r,E=i*2*r/fe,P=g*e[0],D=Gt+g*e[1],$=g*e[2],W=Math.hypot(P,D,$),rt=Math.max(W-Gt,0)/o,X=Math.exp(-rt)/o*E,b=(l[0]*P+l[1]*D+l[2]*$)/W,f=Kt(s,rt,b),A=Kt(s,rt+1,Math.min(b+v.soft,1));for(let lt=0;lt<3;lt++){const Pt=n*ta[lt],Ft=Math.exp(-Pt*(m+.5*X));c[lt]+=X*Ft*Math.exp(-Pt*f),w[lt]+=X*Ft*Math.exp(-Pt*.45*A)}m+=X}const p=e[0]*l[0]+e[1]*l[1]+e[2]*l[2],M=.03+.6*ce(.55,p),u=.05*ce(-.3,p);for(let x=0;x<3;x++)a[x]=n*(vt[x]*(ea*ce(eo[x],p)+.6*ce(ao[x],p)+u)*c[x]+v.ms[x]*M*w[x]);return a},aa=(e,a,o)=>{const s=(e*2-1)*Rt,n=(1-a*2)*Rt,l=Math.hypot(s,n,1),i=s/l,m=n/l,c=1/l,w=Math.cos(Bt),p=Math.sin(Bt),M=m*w+c*p,u=-m*p+c*w;return[i*Math.cos(o)+u*Math.sin(o),M,-i*Math.sin(o)+u*Math.cos(o)]},V=_==="Global storm"?[1.1,.86,.98]:I==="Frosty sunrise"?[1.05,.94,1.3]:[1,.98,1.3],Jt=[[.5,.12],[.2,.2],[.8,.2],[.35,.4],[.65,.4],[.5,.55]];if(te)for(const e of Jt)e[1]*=Ra;const Y=[0,0,0],oa=[[0,1,0],Z(0,.35),Z(1.57,.35),Z(-1.57,.35),Z(3.14,.35)],oo=[.3,.22,.16,.16,.16],me=new Float32Array(84),so=.75,sa=8*h;let na=1e9,ra=k;const U=(e,a,o,s,n)=>me.set([a,o,s,n],e*4),no=Nt==="Clean"?0:Nt==="Dusty"?5:9,ro=d()*65535|0,ue=[j*(.12+.12*d())*H,(.28+.12*d())*H],Dt={b:(d()<.5?-1:1)*(.06+.24*d())*Q,ang:(d()-.5)*1.2,rot:d()*3.14},Qt={a:j*(.22+.25*d())*H,D:1.8+2*d(),v:(d()<.5?-1:1)*(.25+.35*d())*h,H:.25+.25*d(),w:.035+.035*d()},la=e=>{let a=0;for(const o of Jt)de(aa(o[0],o[1],e),Y),a+=.3*Y[0]*V[0]+.55*Y[1]*V[1]+.15*Y[2]*V[2];return Math.max(a/Jt.length,1e-30)};let pe=1,ia="",ha=1,ca=1e30;const Ae=(e,a)=>{v.tau=e,v.sd=Z(0,a),v.soft=.01+.01*Math.min(e,2);const o=.12*(1-Math.exp(-1.5*e));for(let i=0;i<3;i++)v.ms[i]=o*vt[i]*vt[i]/(1-.6*vt[i]);let s=0;for(const i of Jt)de(aa(i[0],i[1],Ht),Y),s+=.3*Y[0]*V[0]+.55*Y[1]*V[1]+.15*Y[2]*V[2];const n=Kt(Gt/se,0,Math.sin(a));return .5*(.3*V[0]*Math.exp(-e*n)+.55*V[1]*Math.exp(-e*n)+.15*V[2]*Math.exp(-e*.97*n))/(Math.PI*Q*Q)/Math.max(s/Jt.length,1e-30)};if(_==="Global storm")for(q=k+.4*h;q<k+14*h&&Ae(zt,q)<2.2;)q+=.3*h;let fa=0;const lo=()=>{const e=Math.max(_t(ft).e,.004);let a=zt,o=4;if(Ae(a,e)<1.4)return 0;for(let s=0;s<9;s++){const n=.5*(a+o);Ae(n,e)>1.4?a=n:o=n}return a-zt};let wt=Ht,ft=0,Xt=0,yt=0,At=0,_e=1,Zt=[0,0,0];const _t=e=>{const a=q+ht*Ee*e;return{e:a,a:-j*.35*(a-q)*ht}},da=(e,a)=>{const o=_t(ft);v.sd=Z(o.a,o.e),v.tau=zt+yt;const s=v.tau,n=.12*(1-Math.exp(-1.5*s))*(.12+.88*S(-2.6*h,1.2*h,o.e));for(let r=0;r<3;r++)v.ms[r]=n*vt[r]*vt[r]/(1-.6*vt[r]);v.soft=.01+.01*Math.min(s,2);const l=Gt/se,i=Kt(l,0,Math.sin(o.e)),m=ta.map(r=>Math.exp(-s*r*i));let c=.5/la(wt);const w=Math.max(o.e,k+1.2*h),p=Math.round(w*3e3)+":"+Math.round(wt*400);if(p!==ia){ia=p;const r=[v.tau,v.sd,v.soft,v.ms.slice()];v.tau=Math.min(zt,.6),v.sd=Z(o.a,w),v.soft=.01+.01*v.tau;const g=.12*(1-Math.exp(-1.5*v.tau));v.ms=vt.map(E=>g*E*E/(1-.6*E)),pe=.5/la(wt),[v.tau,v.sd,v.soft,v.ms]=r}if(c>pe&&(c=pe*Math.pow(c/pe,.4)),c*=(_==="Global storm"?.42:_==="Hazy"?.85:1)*(1-.15*he(o.e)),K==="Mastcam-100"){const r=(R==="Phobos transit"?.9:2.5)*Math.PI*Q*Q/Math.max(.3*m[0]*V[0]+.55*m[1]*V[1]+.15*m[2]*V[2],1e-30);r<c&&(c=R==="Phobos transit"?Math.pow(c,.72)*Math.pow(r,.28):Math.sqrt(c*r)),ha=R==="Phobos transit"?Math.min(1,r/c):1}yt<.01?ca=c:c=Math.min(c,ca*(1+(o.e>k?.6:3.5)*Math.min(yt,1.2))),At=a||!At?c:At*Math.exp(Math.log(c/At)*.12);for(let r=0;r<3;r++)Zt[r]=0;for(let r=0;r<oa.length;r++){de(oa[r],Y);for(let g=0;g<3;g++)Zt[g]+=oo[r]*Y[g]}U(0,v.sd[0],v.sd[1],v.sd[2],s),U(1,wt,Bt,Rt,Mt),U(2,V[0],V[1],V[2],At);{const r=he(o.e)*1.6;U(3,Zt[0]+r*m[0],Zt[1]+r*.86*m[1],Zt[2]+r*.66*m[2],se)}if(U(4,kt,1/gt,Vt,1/(Me-Vt)),U(5,m[0],m[1],m[2],Q),U(6,_e,.024*Math.pow(Mt/1e3,.3)*Math.sqrt(1+.4*yt),Nt==="Dusty"?1:Nt==="Dust ring"?.55:.06,no),U(7,v.ms[0],v.ms[1],v.ms[2],v.soft),R==="Earth"){const r=o.e+ue[1],g=o.a+ue[0],E=Z(g,r),P=Kt(l,0,Math.sin(Math.max(r,-.01)));U(8,1,4*6.2832*Math.pow(1.5*Rt/Mt,2)/Math.max(At,1e-30)*Math.exp(-.15*s*Math.min(P,7)),0,0),U(9,E[0],E[1],E[2],0)}else if(R==="Phobos transit"){const r=-.2*Q+.07*Q*(e-4);U(8,2,Math.cos(Dt.ang)*r-Math.sin(Dt.ang)*Dt.b,Math.sin(Dt.ang)*r+Math.cos(Dt.ang)*Dt.b,Dt.rot),U(9,.5*Q,.37*Q,0,0)}else if(R==="Twilight ice cloud"){const r=Qt.a/H*3+(Qt.v>0?.4:-.4);U(8,3,45+50*(Qt.H-.25),.45*(.7+.6*(Qt.D-1.8)/2),0),U(9,Math.cos(r),Math.sin(r),.012*Math.sign(Qt.v),.006)}else U(8,0,0,0,0);de(Z(o.a,Math.max(o.e,k)+.12),Y);const M=he(o.e);U(11,Y[0],Y[1],Y[2],.42*(1+1.5*M));{const r=o.e+ue[1]+.006,g=o.a+ue[0]+.004*j,E=Z(g,r);U(12,E[0],E[1],E[2],ha)}U(10,Nt==="Dust ring"?1:0,fe,ro,e),U(13,_==="Global storm"?6:1,ea,K==="Pancam mosaic"?1.18:.95,R==="Twilight rays"?.55*S(1*h,-.5*h,o.e-k):0);const u=k-o.e,x=ht<0?.3/Math.max(At,1e-30)*S(-1*h,.4*h,u)*Math.exp(-Math.max(u,0)/(3.2*h))*(_==="Hazy"?.8:1):0;if(U(20,...R==="Phobos transit"?[1.16,.88,.52]:_==="Global storm"?[1.12,.92,.66]:_==="Hazy"?[1.05,.97,.88]:[1,1,1],0),U(15,so*(1+3*M),sa,x,(_==="Hazy"?7:5)*h),R==="Twilight rays"){const r=Math.round(o.a*2e3);if(r!==na){na=r;const g=128,E=new Float32Array(g);let P=0;for(let D=0;D<g;D++){const $=o.a+sa*(2*(D+.5)/g-1),W=Math.max(0,Math.min(O-1,Math.round(($-kt)/gt*(O-1))));E[D]=Math.max(et[W*4],et[W*4+1],et[W*4+2],et[W*4+3]),P+=E[D]/g}for(let D=1;D<=8;D++){let $=0,W=0;for(let X=0;X<g;X++){const b=2*(X+.5)/g-1,f=E[X]-P;$+=f*Math.cos(Math.PI*D*b),W+=f*Math.sin(Math.PI*D*b)}const rt=D===1?.25:D===2?.55:1.3;me[(D<=4?64:68)+(D-1)%4]=2*rt*$/g,me[(D<=4?72:76)+(D-1)%4]=2*rt*W/g}ra=P}}U(14,o.a,o.e,ra,.3*h),We&&U(19,.0024*(1-.85*S(q,q+2.4*h,o.e)),L===3?-.6*re:-.5*Ke-4,.5*Yt,18)},ma=()=>{t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,Mt,Mt),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(N.useC(Re)),t.bindBuffer(t.UNIFORM_BUFFER,N.uc),t.bufferSubData(t.UNIFORM_BUFFER,0,me),t.bindBufferBase(t.UNIFORM_BUFFER,0,N.uc),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,z.tT),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,N.tN),t.bindVertexArray(N.vao),t.drawArrays(t.TRIANGLES,0,3)},$t=F.sound;let Ut=!1,nt="",Ue=0,ua=0,pa=0,xa=0,ba=0,ga=0,va=!1;const io=Ht-.85*H,ho=Ht+.85*H;return da(0,!0),ma(),(e,a)=>{a=Math.min(a||0,.1);const o=F.input,s=o.taps();let n=!1;const l=()=>{const p=ht<0?_t(ft+Xt).e-Q>k:!0;Xt+=(K==="Mastcam-100"?.5:1)*(p?1.4+.6*d():4+2*d())*(Et&&_t(ft+Xt).e>k+2.5*h?6:1),n=!0,$t.hit("click",.45),$t.hit("noise",.08,{dur:.18,cutoff:1800})};if(!o.down&&!Ut&&s.length&&l(),o.down&&!Ut&&(Ut=!0,Ue=o.x,ua=o.y,pa=wt,xa=e,nt="tap"),o.down){if(nt!=="drag"&&nt!=="hold"&&Math.hypot(o.x-Ue,o.y-ua)>.012&&(nt="drag"),nt==="tap"&&e-xa>.35&&(nt="hold",fa=lo()),nt==="drag"){const p=Math.max(io,Math.min(ho,pa-(o.x-Ue)*H));Math.abs(p-wt)>1e-4&&e-ga>.12&&(ga=e,$t.note(33+Math.abs(p-wt)*400,{dur:.16,vel:.05,wave:"sawtooth",cutoff:500})),wt=p}}else Ut&&(Ut=!1,nt==="tap"&&l(),nt="");const i=_t(ft).e>k?fa:Math.max(0,2.6-zt);Ut&&nt==="hold"?yt+=Math.max(0,i-yt)*Math.min(1,a*.24):yt*=Math.exp(-a/9),Ut&&nt==="hold"&&e-ba>.22&&(ba=e,$t.hit("noise",.04+.1*Math.min(1,yt),{dur:.6,cutoff:280+260*d()}));const m=Xt*Math.min(1,a*4);Xt-=m,ft+=a*Ka+m;const c=_t(ft).e;(ht<0&&c<-9.5*h||ht>0&&c>k+9*h)&&(ft=ht<0?(q+9.5*h)/Ee:(k+9*h-q)/Ee,Xt=0);const w=ht<0?c-Q<k:c-Q>k;if(w&&!va&&$t.note(38,{dur:4,vel:.12,wave:"sine",attack:.8}),va=w,n&&(_e=(_e*1103+7)%65521),da(e,n),Et&&z.key===ke){const p=_t(ft).e;ie(p)!==z.st&&$e(ie(p),Ze(p))}ma()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
