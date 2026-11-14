// Iceberg Lagoon: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/502.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Tt){if(!Tt)return;function ro(w,e,R,Y,de,ge){for(let N=0;N<w;N++){const G=de[N],Ee=Y[N],r=ge[N];for(let k=N+1;k<w;k++){const z=de[k];if(G<1.5&&z<1.5)continue;const A=e[k]-e[N],$=R[k]-R[N],ae=(Ee+Y[k])*.8;if(A>ae||A<-ae||$>ae||$<-ae)continue;const _=Math.hypot(A,$);if(_<ae&&_>.001){const pe=(ae-_)*.04,ve=r?0:z/(G+z),Be=ge[k]?0:G/(G+z);e[N]-=A/_*pe*ve,R[N]-=$/_*pe*ve,e[k]+=A/_*pe*Be,R[k]+=$/_*pe*Be}}}}Tt.add({num:502,name:"Iceberg Lagoon",fam:"Vistas",recipe:"Sitting in a little boat on a glacier lagoon in the long northern dusk, with blue and white bergs drifting under the glacier front and seals popping up. The light, the shape of the big berg and the mist change every mint. Tap a berg to rock it (one near its balance may roll over), tap the glacier to make the next calving come sooner, or tap the water for ripples. Drag to send a breeze across, or hold to drift slowly forward.",interactive:"Tap a berg and it rocks and creaks, and a berg near its balance rolls over a few seconds later; tap the glacier face and the next calving comes sooner there; tap open water for a ring of ripples that sets the brash bobbing. Drag pushes a breeze across the lagoon that ruffles the water and turns the bergs. Hold to drift slowly forward in the boat.",music:!0,gl:!0,fps:30,seed:0,make(w){const e=w.gl,R=w.size,Y=Math.PI/180,de=w.hash.slice(2);let ge=parseInt(de.slice(0,8),16)>>>0,N=parseInt(de.slice(8,16),16)>>>0,G=parseInt(de.slice(16,24),16)>>>0,Ee=parseInt(de.slice(24,32),16)>>>0;const r=()=>{ge>>>=0,N>>>=0,G>>>=0,Ee>>>=0;let t=ge+N|0;return ge=N^N>>>9,N=G+(G<<3)|0,G=G<<21|G>>>11,Ee=Ee+1|0,t=t+Ee|0,G=G+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)r();const k=t=>{let a=0;for(const s of t)a+=s;let o=r()*a;for(let s=0;s<t.length;s++)if(o-=t[s],o<0)return s;return t.length-1},z=!!w.home,A=z?0:k([60,24,10,6]),$=z?1:k([22,53,25]),ae=z?0:k([32,46,22]),_=z?0:k([42,26,14,18]),pe=z?1:k([48,40,12]),ve=z?1:k([28,55,17]),Be=z?1:k([30,50,20]);w.trait("Light",["midnight-sun dusk","overcast blue","aurora night","winter snow"][A]),w.trait("Bergs",["sparse","drifting","packed"][$]),w.trait("Glacier",["near","mid","far"][ae]),w.trait("Calls",["seals","seals and terns","terns","quiet"][_]),w.trait("Mist",["clear","low mist","thick mist"][pe]),w.trait("Ash",["clean ice","ash-banded","heavy ash"][ve]),w.trait("Rolled bergs",["few","some","many"][Be]);const no=_===0||_===1,Rt=_===1||_===2;let B=1344975333;for(let t=2;t<66;t+=8)B=Math.imul(B^parseInt(w.hash.slice(t,t+8),16),2654435761)^B>>>15;B=Math.imul(B^B>>>16,2246822507),B=Math.imul(B^B>>>13,3266489909),B^=B>>>16;const b=()=>{B=B+1831565813|0;let t=Math.imul(B^B>>>15,1|B);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},rt={"From the boat":[1.1,-3.5,28],"Beside a big berg":[.45,7,22],"Between two bergs":[1,2,18],"Down into the brash":[2.6,-27,14],"Looking down the lagoon":[1.2,-8,11],"Toward the outlet":[1.5,-2,7]},le=w.trait("View",z?"From the boat":(()=>{let t=b()*100;for(const a in rt)if(t-=rt[a][2],t<0)return a;return"From the boat"})());let Le=B^98693133;const Mt=()=>{Le=Le+1831565813|0;let t=Math.imul(Le^Le>>>15,1|Le);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ft=Mt(),kt=Math.floor(Mt()*97),nt=A===1||A===3?3:A===2?0:z?1:Ft<.3?0:Ft<.75?1:2;w.trait("Sky",A===2?"clear night":["clear","cloud bars","high veil","low ceiling"][nt]);let U=84065881;for(let t=2;t<66;t+=8)U=Math.imul(U^parseInt(w.hash.slice(t,t+8),16),2246822507)^U>>>13;U=Math.imul(U^U>>>16,2654435761),U=Math.imul(U^U>>>13,3266489909),U^=U>>>16;const Se=()=>{U=U+1831565813|0;let t=Math.imul(U^U>>>15,1|U);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},io=["Pinnacled","Tabular","Tilted","Blue dome","Dry-dock","Striped","Arch"],se=z?0:(()=>{const t=[30,20,18,14,10,5,3];let a=Se()*100;for(let o=0;o<7;o++)if(a-=t[o],a<0)return o;return 0})();w.trait("Berg",io[se]);const Pt=rt[le],At=Pt[0],Bt=Pt[1]*Math.PI/180,ze=b()<.5?-1:1,it={"From the boat":0,"Beside a big berg":ze*(.5+.35*b()),"Between two bergs":ze*(.35+.3*b()),"Down into the brash":ze*(.25+.65*b()),"Looking down the lagoon":ze*(1.25+.4*b()),"Toward the outlet":Math.PI+ze*(.2+.25*b())}[le],Te=[950,1400,2100][ae]+r()*150,lt=27+r()*12,J=[r()*6.28,r()*6.28,r()*6.28],Xe=(r()-.5)*260,Ge=-40+(r()-.5)*60,Lt=(t,a,o)=>{const s=Math.min(1,Math.max(0,(o-t)/(a-t)));return s*s*(3-2*s)},lo=t=>{const a=Lt(2.2,2.5,Math.abs(t));return(360+60*Math.sin(3*t+J[0])+40*Math.sin(5*t+J[1])+22*Math.sin(9*t+J[2]))*(1-a)+210*a},St=t=>Xe+160*Math.sin(t*27e-5+1.3),Nt=t=>1250-450*Lt(Te,Te+9e3,t)+120*Math.sin(t*.0021+J[2])+70*Math.sin(t*.009+J[0])+35*Math.sin(t*.023+J[1]),Ut=t=>Te+45*Math.sin(t*.0041+J[0]*2)+25*Math.sin(t*.011+J[1])+11e-5*(t-Xe)*(t-Xe),Re=(t,a,o)=>{const s=Math.hypot(t,a),n=Math.atan2(t,a);return s<lo(n)-o?!0:a>0&&Math.abs(t-St(a))<Nt(a)-o&&a<Ut(t)-o},F=[{az:100,el:2.2,sun:[1,.56,.32],si:2.5,vis:1,zen:[.07,.12,.27],hs:[1.25,.62,.29],ha:[.36,.33,.47],belt:[.26,.12,.17],amb:[.22,.28,.42],cl:[1,.6,.45],cd:[.2,.2,.3],cov:.56,fog:8e-5,exp:1,water:[.025,.055,.06]},{az:95,el:14,sun:[.62,.66,.74],si:.55,vis:0,zen:[.36,.42,.52],hs:[.6,.64,.7],ha:[.52,.57,.65],belt:[0,0,0],amb:[.5,.6,.8],cl:[.62,.66,.72],cd:[.36,.4,.48],cov:.3,fog:16e-5,exp:1.05,water:[.02,.04,.045]},{az:-62,el:16,sun:[.55,.62,.8],si:.55,vis:0,zen:[.004,.009,.026],hs:[.025,.04,.075],ha:[.02,.032,.06],belt:[0,0,0],amb:[.05,.1,.12],cl:[.06,.08,.12],cd:[.01,.015,.03],cov:.66,fog:1e-4,exp:2.3,water:[.003,.008,.01]},{az:105,el:9,sun:[.66,.68,.74],si:.5,vis:0,zen:[.4,.44,.5],hs:[.62,.64,.68],ha:[.56,.59,.64],belt:[0,0,0],amb:[.55,.62,.76],cl:[.6,.62,.66],cd:[.42,.45,.5],cov:.25,fog:4e-4,exp:1,water:[.018,.032,.036]}][A],co=[Math.cos(F.el*Y)*Math.sin(F.az*Y),Math.sin(F.el*Y),Math.cos(F.el*Y)*Math.cos(F.az*Y)],fo=[2e-4,6e-4,.0018][pe]*(A===3?1.6:1),ho=[.08,.17,.3][$],Oe=new Float32Array([...co,F.vis,...F.sun.map(t=>t*F.si),A,...F.zen,fo,...F.hs,F.fog,...F.ha,F.exp,...F.belt,A===3?1:0,...F.amb,F.cov,...F.cl,.22,...F.cd,ho,...F.water,A===2?1:0]),me=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,We=`
uniform vec4 uL[10]; uniform int uZ0;
#define SUN uL[0].xyz
#define SUNVIS uL[0].w
#define SUNC uL[1].xyz
#define MODE uL[1].w
#define ZEN uL[2].xyz
#define MIST uL[2].w
#define HORS uL[3].xyz
#define FOG uL[3].w
#define HORA uL[4].xyz
#define EXPO uL[4].w
#define BELT uL[5].xyz
#define SNOW uL[5].w
#define AMB uL[6].xyz
#define CCOV uL[6].w
#define CLIT uL[7].xyz
#define CDARK uL[8].xyz
#define BRASH uL[8].w
#define WCOL uL[9].xyz
#define AUR uL[9].w
float sq(float x){ return x*x; }
float azim(vec2 v){ float ax = abs(v.x), az = abs(v.y);
  float a = atan(min(ax, az) / max(max(ax, az), 1e-9));
  a = ax > az ? 1.5707963 - a : a; a = v.y < 0. ? 3.1415927 - a : a; return v.x < 0. ? -a : a; }
vec3 skyBase(vec3 rd){
  float e = max(rd.y, 0.);
  vec2 h = normalize(rd.xz + vec2(1e-5)), hs = normalize(SUN.xz + vec2(1e-5));
  float sd = dot(h, hs) * .5 + .5;
  vec3 hor = mix(HORA, HORS, pow(sd, 3.));
  vec3 col = mix(hor, ZEN, pow(smoothstep(0., .62, e), .5));
  col += BELT * (1. - sd) * exp(-sq((e - .13) / .07));
  float cs = max(dot(rd, SUN), 0.);
  col += SUNC * SUNVIS * (.05 * pow(cs, 6.) + .22 * pow(cs, 48.));
  return col; }
`,Ke=me+"void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p * 2. - 1., 0., 1.); }",Q=[[1,.95,.85],[.75,1,.75],[1,.62,.82],[1,.8,.7],[1,.7,.9]],Me=.35,Ve=Q.map(t=>Me*t[1]-.05),uo=me+`
uniform float uZ; uniform int uP; uniform vec4 uX; uniform vec2 uEnc; uniform int uZ0; uniform vec4 uH;
// uK.x: 0 the pinnacled, dome and striped heroes as they were; 1 one exact cut face, the rest worn; 2 every cut worn.
// uK.yz the tabular top's tilt, uK.w the angle its bay, prow and foot are laid out by
uniform vec4 uK;
out vec4 o;
float h3(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.x + p.y) * p.z); }
float vn3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z); }
float fb3(vec3 p, float lim){ float s = 0., a = .5, f = 1.; for (int i = 0; i < 5 + uZ0; i++){ if (f > lim) { s += a * .5; f = 1e9; } else s += a * vn3(p); p = p * 2.03 + vec3(1.7, 9.2, 4.1); a *= .5; f *= 2.03; } return s; }
float sdE(vec3 p, vec3 r){ float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.) / k1; }
float sdRB(vec3 p, vec3 b, float r){ vec3 q = abs(p) - b + r; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.) - r; }
float smin(float a, float b, float k){ float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
float smax(float a, float b, float k){ return -smin(-a, -b, k); }
// the 32^3 detail texture: value noise, worley F2-F1 (scallop edges), worley F1, value noise; tiles every 8 cells
vec4 detail(){
  vec3 v = vec3(floor(gl_FragCoord.xy), uZ), pc = (v + .5) / 4., ci = floor(pc);
  float f1 = 99., f2 = 99.;
  for (int k = 0; k < 27 + uZ0; k++){
    vec3 g = ci + vec3(float(k % 3), float((k / 3) % 3), float(k / 9)) - 1., gw = mod(g, 8.);
    vec3 e = g + vec3(h3(gw + 11.1), h3(gw + 23.7), h3(gw + 37.3)) - pc; float dd = dot(e, e);
    if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
  }
  f1 = sqrt(f1); f2 = sqrt(f2);
  float id = v.x + v.y * 32. + v.z * 1024.;
  return vec4(h3(vec3(id, 1.7, 3.1)), min(1., (f2 - f1) / .7), min(1., f1), h3(vec3(id * .37, 5.3, 7.9)));
}
void protoMain(){
  vec2 uv = fract(gl_FragCoord.xy / uH.x);   // fract: the packed layout bakes the odd forms at x 64..127
  vec3 p = vec3(uv * 2. - 1., uZ);
  float sd = float(uP) * 7.31 + 2. + uH.y;
  float wash = smoothstep(uX.w + .04, uX.w - .14, p.y);
  // all eight noise values from one call site (keeps the compile small)
  float F0 = 0., F1 = 0., F2 = 0., F3 = 0., F4 = 0., F5 = 0., F6 = 0., F7 = 0.;
  // (a value nobody reads is skipped: the tabular form's warp is in plan only, the washed skin and the dry relief are exclusive)
  bool TAB = uP == 5 || uP == 8;
  for (int k = 0; k < 8 + uZ0; k++){
    if ((k < 3 && TAB) || (k == 7 && wash <= 0.) || ((k == 5 || k == 6) && wash >= 1.)) continue;
    // k 5 and 6: stretched up the face, so the medium relief runs as vertical flutes and runnels, never as lumps
    vec3 x = k < 3 ? p * 1.6 + sd + 5. * float(k) - (k == 2 ? 1. : 0.) : (k == 3 ? vec3(p.xz * 2.4, sd + 4.) : (k == 4 ? vec3(p.xz * 5., sd) : (k == 5 ? p * vec3(4.2, TAB ? .7 : .9, 4.2) + sd : (k == 6 ? p * vec3(9., TAB ? 1.2 : 1.6, 9.) + sd + 3. : p * 2. + sd))));
    float fq = k < 3 ? 1.6 : (k == 3 ? 2.4 : (k == 4 ? 5. : (k == 5 ? 4.2 : (k == 6 ? 9. : 2.))));
    float v = fb3(x, uH.z / fq);
    if (k == 0) F0 = v; else if (k == 1) F1 = v; else if (k == 2) F2 = v; else if (k == 3) F3 = v; else if (k == 4) F4 = v; else if (k == 5) F5 = v; else if (k == 6) F6 = v; else F7 = v;
  }
  // a tabular berg: warped in plan at a low frequency, the warp leaning a little with height (the walls lean in or out
  // by a few degrees, never a ruled extrusion)
  float ca = cos(uK.w), sa = sin(uK.w);
  float lean = TAB ? p.y * (.14 + .6 * abs(F3 - .5)) : 0.;
  vec3 q = TAB ? vec3(p.x + (F3 - .5) * .34 + .07 * sin(p.z * 2.1 + uK.w) + lean * sa, p.y, p.z + (F3 - .5) * .22 + .06 * sin(p.x * 1.7 - uK.w) + lean * ca) : p + (vec3(F0, F1, F2) - .5) * .42;
  // every cut plane is baked fat by two cells: the berg shader cuts it again exactly, so its arris stays crisp at any size
  float fat = 4. / uH.x;
  float d;
  if (uP == 0) {
    // (as a small piece: a lump with no box left in it and a knob of a top; the striped hero keeps its old form)
    bool SM = uK.x > 1.5;
    d = sdRB(q - vec3(0., -.25, 0.), vec3(.8, .52, .62), SM ? .4 : .2);
    d = smin(d, sdE(q - vec3(.36, .22, .1), vec3(.3, .66, .3)), .16);
    d = smin(d, sdE(q - vec3(-.42, .1, -.15), vec3(.26, .45, .3)), .12);
    d = smax(d, dot(q, normalize(vec3(.3, 1., .1))) - .55 + (SM ? .35 * dot(q.xz, q.xz) : 0.), SM ? .16 : .06);
  } else if (uP == 1) {
    d = sdE(q - vec3(0., -.15, 0.), vec3(.58, .85, .56));
    d = smin(d, sdE(q - vec3(-.16, .45, .06), vec3(.22, .52, .24)), .18);
    d = smax(d, -sdE(q - vec3(.5, .35, .1), vec3(.3, .4, .5)), .08);
  } else if (uP == 2) {
    d = sdE(q, vec3(.9, .5, .74));
    d = smin(d, sdE(q - vec3(.35, .18, .1), vec3(.45, .32, .5)), .2);
  } else if (uP == 3) {
    d = sdRB(q, vec3(.86, .66, .56), .2);
    d = smax(d, dot(q, normalize(vec3(.55, 1., 0.))) - .38, .09);
    d = smax(d, -sdE(q - vec3(-.32, .12, 0.), vec3(.26, .24, 1.4)), .05);
  } else if (uP == 4) {
    d = sdE(q, vec3(.85, .58, .76));
    d = smax(d, dot(q, normalize(vec3(-.4, 1., .3))) - .38, .1);
  } else if (uP == 5 || uP == 8) {
    // tabular: a slab rounded in plan, with a bay where a corner broke away and a prow running out on another side
    // (the walls bow out a little between the shoulder and the waterline, and recede below the water)
    float bw = p.y - .525 * uX.y; bw = 1. + 1.8 * bw * bw;
    d = sdRB(q * vec3(bw, 1., bw), vec3(.76, 1.1, .62), .3) / bw;
    vec2 bc = vec2(ca, sa) * vec2(.92, .78), pc = vec2(-sa, ca) * min(uX.xz, vec2(1.)) * vec2(.58, .56);
    d = smax(d, -sdE(q - vec3(bc.x, 0., bc.y), vec3(.36, 2.2, .3)), .14);
    d = smin(d, sdE(q - vec3(pc.x, -.1, pc.y), vec3(.3, 1.2, .26)), .28);
    // the arch: a ragged, lopsided hole bent through the body, wider toward the water, its edges worn back
    if (uP == 8) {
      vec2 ah = q.xy - vec2(.05 + .14 * q.z + .1 * (F3 - .5), .3);
      ah.x -= .3 * ah.y * ca;
      float rx = .2 + .14 * smoothstep(.1, -.25, ah.y);
      d = smax(d, -((length(ah / vec2(rx, .27)) - 1.) * min(rx, .27) - .05 * (F4 - .5)), .1);
    }
  } else if (uP == 6) {
    // tilted: a wedge whose bed stands steep, one long sloping back and a sheer broken face
    // (rounded, and twisted along its length so the back is never one plane)
    vec3 r = vec3(q.x * .82 + q.y * .57, q.y * .82 - q.x * .57, q.z);
    float tw = .32 * r.x; r.yz = mat2(cos(tw), sin(tw), -sin(tw), cos(tw)) * r.yz;
    d = sdRB(r - vec3(0., -.1, 0.), vec3(.95, .42, .7), .15);
    d = smax(d, -q.x * .7 - .62, .04);
  } else {
    // dry-dock: two towers on one foot, a slot of open water between them
    d = sdE(q - vec3(-.5, .12, -.05), vec3(.4, .82, .55));
    d = min(d, sdE(q - vec3(.55, .02, .1), vec3(.36, .66, .5)));
    // (a channel that bends through and narrows toward the water, its edges worn: never a box cut)
    vec3 sl = q - vec3(.04 + .12 * sin(q.z * 2.3 + uH.y), .2, 0.);
    d = smax(d, -max(abs(sl.x) - .06 - .1 * smoothstep(-.5, .7, sl.y), -.7 - sl.y), .1);
  }
  // fresh fracture faces and a broken summit (not for the rolled, washed form)
  // fresh fracture planes: nearly flat (little warp) and crisp-edged; the rolled form keeps one broken face
  // a worn one (uK) is bent and rounded: old breaks melt back into curved faces; at most one stays exact and crisp
  vec3 qf = mix(p, q, .22), qw = mix(p, q, .6);
  float fz = 1.;
  for (int i = 0; i < 3 + uZ0; i++){
    float fi = float(i) + sd;
    vec3 nf = normalize(vec3(sin(fi * 2.3), (.35 + .5 * h3(vec3(fi))) * uH.w, cos(fi * 3.1)));
    float pd = (.55 + .25 * h3(vec3(fi, 1., 2.))) * length(uX.xyz * nf), pl = dot(qf, nf) - pd;
    if (i == 0 || uP != 2) {
      if (uK.x < .5 || (i == 0 && uK.x < 1.5)) { d = smax(d, pl - fat, .012); fz = min(fz, abs(pl)); }
      else d = smax(d, dot(qw, nf) - pd * 1.06, .08 + .07 * h3(vec3(fi, 3., 1.)));
    }
  }
  // the tabular top: tilted a few degrees, sagging and swelling, met by the walls through a shoulder whose radius
  // changes round the rim (the firn beds on it stay level)
  if (TAB) { float tH = uX.y * .7 + dot(p.xz, uK.yz) + (F3 - .5) * .15 + .04 * sin(p.x * 2.6 + uK.w) + .02 * sin(p.z * 5.3 + p.x * 4.1 - uK.w) + .02 * sin(p.x * 9. + uK.w * 3.) * (.6 + .4 * sin(p.z * 3. - uK.w)); d = smax(d, p.y - tH, .05 + .11 * F4); fz = min(fz, abs(p.y - tH)); }
  else if (uP != 2 && uP != 7) {
    float sm = F3;
    d = smax(d, p.y - uX.y * (.38 + .75 * sm * sm + .25 * smoothstep(.55, .75, F4)), .05);
  }
  // the underwater foot: broad and smooth
  // (a tabular berg's runs out further on one side)
  vec2 fo = TAB ? vec2(cos(uK.w + 2.), sin(uK.w + 2.)) * .2 : vec2(0.);
  d = smin(d, sdE(p - vec3(fo.x, (TAB ? -.25 : -.5) * uX.y, fo.y), uX.xyz * (TAB ? vec3(.74, .36, .72) : vec3(.88, .38, .86))), .2);
  // flutes: concave channels with sharp ridges between them (ridged), low where the wall is a tabular berg's
  float rough = (abs(F5 - .5) - .25) * (TAB ? .05 : .11) + abs(F6 - .5) * (TAB ? .03 : .06) * (1. + smoothstep(0., 1., p.y));
  float smo = (F7 - .5) * .06;
  d += mix(rough * mix(.2, 1., smoothstep(.0, .07, fz)), smo, wash) * (uP == 2 ? .45 : 1.);
  // (the bake covers -1..1: a wider proxy box must not let the edge texels run out to its walls)
  d = max(d, uK.x > .5 ? sdRB(p, min(uX.xyz, vec3(1.)) - .05, .15) : sdRB(p, uX.xyz - .03, 0.));
  o = vec4(d * uEnc.x + uEnc.y);
}
void main(){ if (uP < 0) o = detail(); else protoMain(); }`,po=me+We+`
uniform sampler2D uN; uniform vec4 uG; uniform vec4 uGp; uniform vec4 uBR;
out vec4 o;
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
vec2 fbm2(vec2 p, vec2 r){ vec2 s = vec2(0.); float a = .5; for (int i = 0; i < 6 + uZ0; i++){ s += a * vec2(vn(p), vn(r)); p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(17.3, 9.1); r = mat2(1.6, 1.2, -1.2, 1.6) * r + vec2(17.3, 9.1); a *= .5; } return s; }
float rdg(vec2 p){ float s = 0., a = .5, w = 1.; for (int i = 0; i < 7 + uZ0; i++){ float n = 1. - abs(vn(p) * 2. - 1.); n *= n; s += a * n * w; w = clamp(n * 1.7, 0., 1.); p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(3.1, 7.7); a *= .5; } return s; }
float RsF(float az){ float s = smoothstep(2.2, 2.5, abs(az)); return (360. + 60. * sin(3. * az + uGp.x) + 40. * sin(5. * az + uGp.y) + 22. * sin(9. * az + uGp.z)) * (1. - s) + 210. * s; }
float xcF(float z){ return uG.z + 160. * sin(z * .00027 + 1.3); }
float WF(float z){ return 1250. - 450. * smoothstep(uG.x, uG.x + 9000., z) + 120. * sin(z * .0021 + uGp.z) + 70. * sin(z * .009 + uGp.x) + 35. * sin(z * .023 + uGp.y); }
float frF(float x){ return uG.x + 45. * sin(x * .0041 + uGp.x * 2.) + 25. * sin(x * .011 + uGp.y) + .00011 * sq(x - uG.z); }
float hgt(vec2 p, out float m){
  float r = length(p), az = azim(p);
  float sea = smoothstep(2.2, 2.5, abs(az));
  float vx = abs(p.x - xcF(p.y)), W = WF(p.y), fr = frF(p.x);
  float dL = r - RsF(az);
  // the valley's south shore curves away north: a straight shore along z = 0 ran through the boat and stood edge-on
  // in the side views as a cut slab of land
  float dV = max(max(vx - W, p.y - fr), .00012 * sq(max(abs(p.x) - 300., 0.)) - p.y);
  float dw = min(dL, dV);
  vec2 ff = fbm2(p * .005, p * vec2(.045, .03)); float f1 = ff.x, f2 = ff.y;
  float res;
  // one return only (FXC compiles early returns inside the march loop very slowly)
  if (p.y > 0. && vx < W && p.y >= fr) {
    m = 1.;
    float k = p.y - fr;
    // the front: a ragged top line (towers and notches of every width) cut by leaning clefts at irregular spacing
    float rag = vn(vec2(p.x * .021, 3.)) * .55 + vn(vec2(p.x * .067 + k * .01, 5.)) * .3 + vn(vec2(p.x * .19, 6.)) * .15;
    float cl = smoothstep(.62, .8, vn(vec2(p.x * .045 + k * .012, 8.)));
    float ser = smoothstep(140., 15., k) * ((rag - .5) * 26. - 16. * cl) - 6. * exp(-sq((k - 40. - 30. * rag) / 9.));
    res = uG.y + min(k, 2500.) * .07 + k * .02 + 24. * (1. - sq(vx / W)) * smoothstep(0., 600., k) + 5. * f2 * smoothstep(0., 40., k) + 3. * smoothstep(0., 8., k) + 3. * (vn(p * .05) - .4) * smoothstep(0., 5., k) + ser;
  } else {
    m = 2.;
    float low = smoothstep(0., 120., dw) * (2.5 + 15. * f1) + 1.4 * f2 + .3;
    float mm = 1500. * pow(rdg(p * .00021 + 3.), 1.4) * smoothstep(1400., 7000., r) * (1. - sea) * (1. - .85 * exp(-sq((az - 1.75) / .45)));
    mm *= p.y > 0. ? smoothstep(0., 600., vx - W) : 1.;
    mm = min(mm, .2 * r);
    float bar = (1.5 + 7. * f1 + .8 * f2) * smoothstep(0., 40., dw) * smoothstep(0., 30., abs(p.x - uG.w) - 30.);
    res = mix(low + mm, bar, sea);
    bool out1 = sea > .5 && (dw > 250. + 25. * sin(p.x * .01) || (abs(p.x - uG.w) < 32. && p.y < 0.));
    if (dw < 0. || out1) { m = 0.; res = dw < 0. ? -6. : -4.; }
  }
  return res;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uBR.zw;
  float az = (uv.x - .5) * 6.2831853, el = mix(uBR.x, uBR.y, uv.y);
  vec3 d = vec3(cos(el) * sin(az), sin(el), cos(el) * cos(az));
  vec3 ro = vec3(0., 1.4, 0.);
  // one loop and one height call: the march, then four normal taps, then the shadow ray toward the sun
  float t = 25., m = 0., lt = 25., ly = 1., e = 1., st = 6., shv = 1.;
  bool hit = false;
  int ph = 0, k = 0;
  vec3 P = vec3(0.), N = vec3(0., 1., 0.), S0 = vec3(0.);
  vec4 hn = vec4(0.);
  for (int i = 0; i < 232 + uZ0; i++){
    vec2 o2 = vec2(k == 0 ? -e : (k == 1 ? e : 0.), k == 2 ? -e : (k == 3 ? e : 0.));
    vec3 p = ph == 0 ? ro + d * t : (ph == 1 ? vec3(P.x + o2.x, 0., P.z + o2.y) : S0 + SUN * st);
    float mq; float h = hgt(p.xz, mq);
    if (ph == 0) {
      m = mq;
      if (p.y < 0. && m < .5) break;
      if (p.y < h) { hit = true; t = lt + (t - lt) * ly / max(ly - (p.y - h), 1e-3); P = ro + d * t; e = .5 + .0012 * t; ph = 1; k = 0; }
      else { ly = p.y - h; lt = t; t += max(.004 * t, .5 * (p.y - h)); if (t > 32000.) break; }
    } else if (ph == 1) {
      if (k == 0) hn.x = h; else if (k == 1) hn.y = h; else if (k == 2) hn.z = h; else hn.w = h;
      k++;
      if (k == 4) { N = normalize(vec3(hn.x - hn.y, 2. * e, hn.z - hn.w)); S0 = P + N * 1.5; ph = 2; k = 0; }
    } else {
      shv = min(shv, 10. * (p.y - h) / st); st *= 1.3; k++;
      if (k == 26) break;
    }
  }
  if (!hit) { o = vec4(0.); return; }
  shv = clamp(shv, 0., 1.);
  vec3 col; float spec = 0.;
  float n1 = vn(P.xz * .05), n2 = vn(P.xz * .4 + 7.);
  if (m == 1.) {
    float vx = P.x - xcF(P.z), W = WF(P.z);
    float mor = 0.;
    for (int i = 0; i < 4 + uZ0; i++){ float xi = (-.62 + .42 * float(i)) * W + 70. * sin(P.z * .0017 + float(i) * 2.1); mor = max(mor, exp(-sq((vx - xi) / (9. + 7. * float(i & 1) + 6. * vn(P.xz * .01)))) * (.55 + .45 * smoothstep(0., 600., P.z - frF(P.x)))); }
    float fpz = t * .00097 / max(abs(dot(d, N)), .02);
    float crev = smoothstep(.62, .9, vn(vec2(P.x * .012, P.z * .11))) * (.4 + .6 * smoothstep(80., 0., P.z - frF(P.x)) + .5 * smoothstep(.6, 1., abs(vx) / W));
    crev = mix(.13, crev, smoothstep(5., 2., fpz));
    col = mix(vec3(.8, .84, .9), vec3(.62, .66, .7), mix(.5, n2, smoothstep(4., 1.5, fpz)) * .5 + .25 * vn(P.xz * .004));
    col = mix(col, vec3(.13, .12, .11), mor * .85);
    col = mix(col, vec3(.08, .2, .34), crev * .8);
    if (N.y < .55) {
      // old faces grey-white, fresh breaks and the clefts' depths a clean saturated blue, dirt bands dipping down the face
      float cl = smoothstep(.55, .85, vn(vec2(P.x * .045 + (P.z - frF(P.x)) * .012, 8.)));
      float st = vn(vec2(P.x * .09 + vn(P.xz * .02) * 3., P.y * .05)) * .65 + vn(vec2(P.x * .31, P.y * .12)) * .35;
      col = mix(vec3(.66, .72, .8), vec3(.86, .89, .93), smoothstep(.35, .75, st));
      col = mix(col, vec3(.12, .38, .66), max(cl * .9, smoothstep(.7, .85, vn(vec2(P.x * .06, P.y * .04) + 3.)) * .8));
      col *= 1. - .35 * smoothstep(.8, .97, sin(P.y * .33 + P.x * .004 + vn(P.xz * .01) * 6.));
      col *= mix(.55, 1., smoothstep(0., 9., P.y + 4. * n1));
      col = mix(col, vec3(.06, .055, .05), mor * .85);
    }
    spec = .25;
  } else {
    float dw = min(length(P.xz) - RsF(azim(P.xz)), 1e4);
    float sand = smoothstep(7., 3., P.y + 2. * n1);
    vec3 moss = mix(vec3(.1, .11, .06), vec3(.085, .08, .07), smoothstep(.3, .7, n2));
    vec3 rock = mix(vec3(.045, .045, .05), vec3(.08, .075, .07), n2);
    col = mix(moss, rock, smoothstep(.85, .6, N.y));
    col = mix(col, vec3(.03, .03, .035), sand);
    float snowl = smoothstep(.5, .75, N.y) * smoothstep(560. + 300. * n1, 760. + 300. * n1, P.y);
    snowl = max(snowl, smoothstep(.62, .9, n2 * N.y) * smoothstep(300., 700., P.y));
    col = mix(col, vec3(.86, .88, .92), snowl);
    // stranded ice on the black sand near the outlet
    vec2 cc = P.xz / 5.; vec2 ci = floor(cc), cf = fract(cc) - .5;
    vec4 hh = textureLod(uN, (ci + .5) / 256., 0.);
    float near = smoothstep(300., 60., length(P.xz - vec2(uG.w, -230.)));
    float chunk = step(hh.r, .1 + .35 * near) * smoothstep(.5, .3, length(cf - (hh.gb - .5) * .5) / (.25 + .4 * hh.a)) * sand;
    col = mix(col, mix(vec3(.75, .86, .95), vec3(.25, .55, .8), hh.a * hh.a), chunk);
    spec = sand * .35 + chunk * .8;
    if (SNOW > .5) col = mix(col, vec3(.84, .86, .9), smoothstep(.45, .7, N.y) * smoothstep(.6, 2.5, P.y) * (1. - chunk));
  }
  float sh = mix(1., shv, SUNVIS * .9 + .1);
  float dif = max(dot(N, SUN), 0.) * sh;
  vec3 lit = col * (SUNC * dif + AMB * (.45 + .55 * N.y) * .9);
  vec3 rf = reflect(d, N);
  lit += spec * SUNC * pow(max(dot(rf, SUN), 0.), 40.) * sh * 2.;
  float f = 1. - exp(-t * FOG);
  vec3 fc = skyBase(vec3(d.x, .02, d.z));
  lit = mix(lit, fc, f);
  o = vec4(lit * .5, 1.);
}`,vo=me+`
layout(location=0) in vec3 aC;
layout(location=1) in vec4 iPos; layout(location=2) in vec3 iR0; layout(location=3) in vec3 iR1; layout(location=4) in vec3 iR2;
layout(location=5) in vec4 iExt; layout(location=6) in vec4 iPar;
uniform mat4 uVP; uniform vec4 uM; uniform vec4 uHB[3];
out vec3 vW; flat out vec4 vPos; flat out vec3 vR0; flat out vec3 vR1; flat out vec3 vR2; flat out vec4 vExt; flat out vec4 vPar;
flat out vec4 vPL0; flat out vec4 vPL1; flat out vec4 vPL2; flat out vec4 vPLX;
float h3(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.x + p.y) * p.z); }
// the berg's cut planes (its fracture faces: the same as the bake's), worked out once per instance here, not per pixel
vec4 plane(float fi, float yk){ vec3 nf = normalize(vec3(sin(fi * 2.3), (.35 + .5 * h3(vec3(fi))) * yk, cos(fi * 3.1))); return vec4(nf, (.55 + .25 * h3(vec3(fi, 1., 2.))) * length(iExt.xyz * nf)); }
void main(){
  {
    bool hero = iExt.w > 4.5, floe = !hero && iPar.x < .5 && iPos.w < 1.5;
    // small floes: cuts of their own seed (no two neighbours share an outline)
    float sdp = hero ? uHB[0].x : (floe ? 11. + iPar.z * 3.7 : iExt.w * 7.31 + 2.), yk = hero ? uHB[0].y : 1.;
    vPL0 = plane(sdp, yk); vPL1 = plane(sdp + 1., yk); vPL2 = plane(sdp + 2., yk);
    // a small piece is the most melted ice there is: most have no cut face at all, one in five a single fresh break
    // (at its true distance); every other berg keeps at most one exact face (the rest are baked worn), the pinnacled,
    // striped heroes (uHB[0].w 0) all three
    if (floe) { if (fract(iPar.z * 3.17) > .2) vPL0.w = 1e3; vPL1.w = 1e3; vPL2.w = 1e3; }
    else if (!hero || uHB[0].w > .5) { vPL1.w = 1e3; vPL2.w = 1e3; if (hero && uHB[0].w > 1.5) vPL0.w = 1e3; }
    vPLX = vec4(0., floe ? 1. : 0., 0., 0.);
  }
  vec3 w = iPos.xyz + mat3(iR0, iR1, iR2) * (aC * iExt.xyz * iPos.w);
  vW = w; vPos = iPos; vR0 = iR0; vR1 = iR1; vR2 = iR2; vExt = iExt; vPar = iPar;
  if (uM.x > .5) w.y = -w.y;
  gl_Position = uVP * vec4(w, 1.);
}`,Dt=me+We+`
uniform sampler3D uVol; uniform sampler3D uDet; uniform sampler3D uHv; uniform mat4 uVP; uniform vec4 uC[4]; uniform vec4 uM; uniform vec4 uHB[3];
in vec3 vW; flat in vec4 vPos; flat in vec3 vR0; flat in vec3 vR1; flat in vec3 vR2; flat in vec4 vExt; flat in vec4 vPar;
flat in vec4 vPL0; flat in vec4 vPL1; flat in vec4 vPL2; flat in vec4 vPLX;
#define PL0 vPL0
#define PL1 vPL1
#define PL2 vPL2
// a tabular hero's top (worn, not cut): its mean height and tilt, for the whiter top band
#define TOPS (uHB[2].y + dot(p.xz, uHB[2].zw))
out vec4 o;
vec4 P, E, Q; vec3 YV; float DS, NR, NL, GM;
float h3(vec3 p){ p = fract(p * vec3(.1031, .1030, .0973)); p += dot(p, p.yxz + 33.33); return fract((p.x + p.y) * p.z); }
bool HERO;
// the 32^3 detail block read through an eased cell coordinate: plain linear reads kink at every cell wall (zigzag layers)
vec4 dq(vec3 x){ vec3 c = x * 32. - .5, i = floor(c), f = fract(c); f = f * f * (3. - 2. * f); return textureLod(uDet, (i + f + .5) / 32., 0.); }
float facet(vec3 p){ return min(min(abs(dot(p, PL0.xyz) - PL0.w), abs(dot(p, PL1.xyz) - PL1.w)), abs(dot(p, PL2.xyz) - PL2.w)); }
// the cut planes (fresh fracture faces: at most one on a berg), applied exactly: the volume holds them baked
// two cells fat, so the arris where a plane meets the body is crisp at any size. They clip the ray before the march
// (nothing is added inside the loop): a ray that starts on a plane inside the body has hit that plane's face.
void clip(vec4 pl, vec3 lo, vec3 ld, inout float t0, inout float t1){
  float s = dot(lo, pl.xyz) - pl.w, k = dot(ld, pl.xyz);
  k = abs(k) < 1e-7 ? 1e-7 : k;
  float tc = -s / k;
  if (k > 0.) t1 = min(t1, tc); else t0 = max(t0, tc); }
// after the march: the cut plane the point lies on, if any (w 1), so nothing has to be carried through the loop
vec4 onPlane(vec3 p, float tol){
  vec4 r = vec4(0.);
  if (abs(dot(p, PL0.xyz) - PL0.w) < tol) r = vec4(PL0.xyz, 1.);
  if (abs(dot(p, PL1.xyz) - PL1.w) < tol) r = vec4(PL1.xyz, 1.);
  if (abs(dot(p, PL2.xyz) - PL2.w) < tol) r = vec4(PL2.xyz, 1.);
  return r; }
float sdE(vec3 p, vec3 r){ float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.) / k1; }
float smin(float a, float b, float k){ float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
float base(vec3 p){
  // the seal is a far head (a few pixels): one ellipsoid is all it needs, and every base() call site compiles it again
  if (Q.x > .5) return sdE(p - vec3(0., -.05, .3), vec3(.85, .85, 1.3));
  if (HERO) return textureLod(uHv, p * .5 + .5, 0.).r * uM.z + uM.w;
#ifdef VOLPACK
  vec3 tc = vec3((clamp(p.x * .5 + .5, .008, .992) + mod(E.w, 2.)) * .5, p.y * .5 + .5, (clamp(p.z * .5 + .5, .008, .992) + floor(E.w * .5 + .01)) / 3.);
#else
  vec3 tc = vec3(p.xy * .5 + .5, (clamp(p.z * .5 + .5, .008, .992) + E.w) * .2);
#endif
  return textureLod(uVol, tc, 0.).r * uM.z + uM.w;
}
// the wave-cut notch: its depth changes round the berg (NR: deep on the weather side, gone in the lee) and its lip
// rises and droops along it (NL); both are read once per pixel (see main)
float notch(float yw){ return smoothstep(.36 + NL, .2 + NL, yw) * exp(-sq(min(yw + .25, 0.) / .5)) * NR; }
float map(vec3 p, vec4 o){
  float d = base(p + o.xyz), d0 = d;
  float yw = P.y + P.w * dot(YV, p);
  // the wave-cut notch: a slot round the waterline under a sharp overhanging lip, smooth inside (no cups)
  float nt = notch(yw);
  if (d < .1 && Q.x < .5) {
    float wash = smoothstep(Q.w + .04, Q.w - .14, p.y);
    vec3 q = p * P.w + Q.z * 13.1;
    float cg = clamp(textureLod(uDet, q * mix(.32, .17, wash), 0.).g * 1.6, 0., 1.);
    float cup = 1. - (1. - cg) * (1. - cg);
    // runnels where meltwater drains off: unevenly spaced, and on a tabular berg in groups with plain dimpled wall
    // between, starting below the rim and deepening toward the water
    // (the group mask GM is read once per pixel; one runnel in three or so is dropped by the same read's random channel)
    vec4 fr = textureLod(uDet, q * vec3(.11, .006, .11) + Q.z, 0.);
    float gro = smoothstep(.1, 0., fr.g) * (1. - wash) * .6;
    float wf = clamp((uHB[2].y - p.y) / max(uHB[2].y - Q.w, .05), 0., 1.);
    gro *= HERO && uHB[0].y < .5 ? GM * smoothstep(.25, .45, fr.r) * smoothstep(0., .22, wf) * (.55 + wf) : smoothstep(.015, .07, facet(p));
    d += (cup * mix(.045, .06, wash) * smoothstep(.015, .07, facet(p)) + gro * .12) * (1. - nt) * DS / P.w;
  }
  d += .62 * nt * DS * smoothstep(2., 6., P.w) / P.w;
  d = d0 + (d - d0) * o.w;
  d = max(d, (uM.x > .5 ? -yw : -(yw + 4.)) / P.w);
  return d;
}
void main(){
  P = vPos; E = vExt; Q = vPar; YV = vec3(vR0.y, vR1.y, vR2.y);
  HERO = E.w > 4.5;
  DS = Q.x > .5 ? 0. : min(1., .35 + P.w * .2) * min(1., P.w * .3);
  mat3 Rm = mat3(vR0, vR1, vR2), Rt = transpose(Rm);
  vec3 cam = uC[0].xyz, ro = cam; if (uM.x > .5) ro.y = -ro.y;
  vec3 rd = normalize(vW - ro);
  vec3 lo = Rt * (ro - P.xyz) / P.w, ld = Rt * rd;
  vec3 inv = 1. / ld, t1 = (-E.xyz - lo) * inv, t2 = (E.xyz - lo) * inv;
  vec3 tmn = min(t1, t2), tmx = max(t1, t2);
  float tN = max(max(tmn.x, tmn.y), tmn.z), tF = min(min(tmx.x, tmx.y), tmx.z);
  float tf = length(vW - ro) / P.w;
  if (tF < max(tN, 0.) || abs(tf - tF) > 2e-3 * tF + 1e-3) discard;
  // the water plane: the mirror pass needs nothing below it, the main pass only the first few metres
  float tw0 = uM.x > .5 ? (rd.y > 1e-4 ? -ro.y / rd.y : 1e9) : (rd.y < -1e-4 ? ro.y / -rd.y : 1e9);
  float t = max(tN, 0.), d = 1., pa = uM.y;
  if (uM.x > .5) t = max(t, tw0 / P.w - .002); else tF = min(tF, (tw0 + 4.) / P.w);
  if (Q.x < .5) { clip(PL0, lo, ld, t, tF); clip(PL1, lo, ld, t, tF); clip(PL2, lo, ld, t, tF); }
  if (t > tF) discard;
  // read once per pixel, not in the march: the notch's depth round the berg, its lip's rise and fall and the runnel
  // groups, all where the ray enters the box (they change slowly round a berg whose walls stand close inside it)
  {
    vec3 pw = lo + ld * t, pe = pw * P.w * .11;
    NR = smoothstep(-.25, .6, dot(normalize(pw.xz + 1e-4), vec2(sin(Q.z * 3.1), cos(Q.z * 3.1))));
    NL = .12 * sin(pw.x * 7.1 + Q.z) + .08 * sin(pw.z * 9.3 - Q.z * 2.);
    GM = smoothstep(.45, 1.3, sin(pe.x * 9.7 + 1.6 * sin(pe.x * 3.1 + Q.z)) + sin(pe.z * 8.3 - Q.z * 1.7));
  }
  // one loop and one map() call site (each call site is compiled again): the march, then the four normal taps.
  // the baked form's slope is taken across most of a grid cell (a tap inside one cell lights it as one flat facet);
  // the fine relief added in map() keeps the pixel's own footprint
  bool hit = false;
  int k = 0;
  vec3 p = vec3(0.), n = vec3(0.);
  float epB = 0., epD = 0.;
  for (int i = 0; i < 56 + uZ0; i++){
    vec3 e = 2. * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.;
    float v = map(hit ? p + e * epD : lo + ld * t, hit ? vec4(e * (epB - epD), epB / epD) : vec4(0., 0., 0., 1.));
    if (hit) { n += e * v; k++; if (k == 4) break; }
    else {
      d = v;
      if (d < max(3e-4, .45 * pa * t)) { hit = true; p = lo + ld * t; float ep = max(.0015, pa * t * 1.2); epB = max(ep, (HERO ? uHB[0].z : .03125) * .7); epD = max(ep, .07 / P.w); }
      else { t += d * .9; if (t > tF) break; }
    }
  }
  if (k < 4) discard;
  n = normalize(n);
  // a ray stopped where it entered a cut plane is on that plane's face: its exact normal, blended into the body's over
  // the pixel at the arris (where the body's own distance comes up to zero)
  vec4 pla = Q.x < .5 ? onPlane(p, 1e-5 + 1e-4 * t) : vec4(0.);
  if (pla.w > .5) n = normalize(mix(n, pla.xyz, smoothstep(0., pa * t * 2. + 1e-5, -d)));
  vec3 N = Rm * n, W = ro + rd * t * P.w, Ls = Rt * SUN;
  float wash = smoothstep(Q.w + .04, Q.w - .14, p.y);
  vec3 q = p * P.w;
  vec4 dn = textureLod(uDet, q * .035 + Q.z, 0.);
  // shadow toward the sun, ambient occlusion, thickness
  // one loop, one base() call site (each call site is compiled again): tap 0 the surface, 1..7 the shadow toward the
  // sun (3 in the mirror), 8..10 occlusion and thickness
  float b0 = 0., sh = 1., st = .03, kth = min(.5, 1.6 / P.w), ao = 0., th = 0.;
  int nsh = uM.x > .5 ? 3 : 7;
  for (int i = 0; i < 11 + uZ0; i++){
    if (i <= nsh || i >= 8) {
      int j = i - 8;
      float dk = j == 0 ? .05 : (j == 1 ? .18 : -kth);
      vec3 x = i == 0 ? p : (i < 8 ? p + Ls * st : p + n * dk);
      float h = base(x);
      if (i == 0) b0 = h;
      else if (i < 8) { h -= b0 * .9; sh = min(sh, 7. * h / st); st += clamp(h, .03, .25); }
      else { float v = clamp((h - b0) / dk, 0., 1.); if (j < 2) ao += v * (j == 0 ? .4 : .6); else th = v; }
    }
  }
  sh = clamp(sh, 0., 1.);
  // a cut face is open and thick: the fat body behind it must not mottle its occlusion and glow
  if (pla.w > .5) { ao = max(ao, .85); th = max(th, .9); }
  float tr = pow(max(dot(rd, SUN), 0.), 2.);
  vec3 col;
  if (Q.x > .5) {
    vec3 fur = mix(vec3(.035, .032, .03), vec3(.09, .085, .075), smoothstep(.45, .7, dn.r) * step(.0, p.y));
    col = fur * (SUNC * max(dot(N, SUN), 0.) * sh + AMB * (.5 + .5 * N.y));
    float F = .04 + .96 * pow(1. - max(dot(N, -rd), 0.), 5.);
    col = mix(col, skyBase(reflect(rd, N)), F * .7);
    col += SUNC * pow(max(dot(reflect(rd, N), SUN), 0.), 90.) * sh;
    col *= 1. - .8 * smoothstep(.12, .05, length(vec2(abs(p.x) - .42, p.y - .22) * vec2(1., 1.3))) * step(.3, p.z);
  } else {
    float fine = smoothstep(.12, .03, pa * t * P.w) * (1. - uM.x);      // fine detail fades with distance
    bool TABH = HERO && uHB[0].y < .5;
    // a tabular berg's walls are old calved firn, not glassy fresh breaks: white-blue in level beds
    float fac = smoothstep(.07, .015, facet(p)) * smoothstep(.75, .92, max(max(dot(n, PL0.xyz), dot(n, PL1.xyz)), dot(n, PL2.xyz))) * (TABH ? .3 : 1.);
    // ice classes: white bubbly ice, old dense blue ice in patches, fresh fracture faces, the washed underside
    // the berg's layering: dense blue strata, and the ash bands further down
    vec3 ad = HERO ? uHB[1].xyz : normalize(vec3(sin(Q.z * 7.), 2.6, cos(Q.z * 5.)));
    // the layers bend in one slow fold across a berg, never in zigzags
    float lay = dot(q, ad) + (dq(q * .006 + 3.1).r - .5) * (TABH ? .5 : 3.2) + (dq(q * .03 + 1.7).a - .5) * .35;
    float per = 1.7 + 1.8 * fract(Q.z * 3.7), lu = lay / per + Q.z * 3., bb = fract(Q.z * 7.13);
    float bw = .012 + .035 * bb, bl = abs(fract(lay / (per * 1.37) + Q.z * 1.7) - .5);
    float blueL = smoothstep(bw, bw - .03, bl) * smoothstep(.52, .68, dq(q * .009 + Q.z * 2.1).r);
    float hm = HERO ? uHB[1].w : 0.;
    // a striped berg: broad bands of dense blue (and dark) ice from refrozen meltwater, straight through it
    float zs = hm > 1.5 ? smoothstep(.3, .22, abs(fract(lay / 3.1 + Q.z) - .5)) : 0.;
    blueL = max(blueL, zs);
    float clear = clamp(max(max(wash * .9 * smoothstep(.4, 2., P.w), fac * .8), max(blueL * .9, max(step(vPLX.y > .5 ? .62 : (TABH ? 2. : .9), bb), step(.5, hm) * step(hm, 1.5) * (1. - .7 * smoothstep(.6, .9, N.y)) * 1.15) * .75)), 0., 1.);
    // melt scallops: concave cups with sharp ridges (worley F1 as height); broad pitted dimples where washed
    // (on a tabular berg's dry walls the same cells a little drawn out upright: cups, never an even pleating)
    vec3 qs = q * (TABH ? mix(vec3(.42, .17, .42), vec3(.2), wash) : vec3(mix(.42, .3, wash) * max(1., 1.1 / P.w))) + Q.z * 5.3;
    float f0 = .5; vec3 gF = vec3(0.);
    if (fine > 0.) { f0 = textureLod(uDet, qs, 0.).b;
    gF = (vec3(textureLod(uDet, qs + vec3(.03, 0., 0.), 0.).b, textureLod(uDet, qs + vec3(0., .03, 0.), 0.).b, textureLod(uDet, qs + vec3(0., 0., .03), 0.).b) - f0) / .125; }
    float kb = fine * (1. - fac) * mix(TABH ? .17 : .22, .32, wash) * (1. - clear * .4);
    kb *= 1. - smoothstep(.45, .25, W.y) * smoothstep(-.7, -.3, W.y) * smoothstep(2., 6., P.w);   // the notch's roof stays smooth
    vec3 nb = normalize(n - kb * (gF - n * dot(gF, n)));
    vec3 Nb = Rm * nb;
    float gr = textureLod(uDet, q * 1.1 + 7., 0.).a;
    float NL = dot(Nb, SUN);
    float dif = clamp((NL + .12) / 1.12, 0., 1.) * sh;
    float aoS = mix(.35, 1., ao) * (1. - .25 * kb * smoothstep(.15, .6, f0));
    vec3 skyA = AMB * (.6 + .4 * Nb.y);
    // white ice: matte and granular, warm in the low sun, blue where light comes back out of the cavities
    // under cloud there is no warm light to wash the ice out: chalky white with blue shadows, the dense ice glowing
    float ov = 1. - SUNVIS;
    // firn layers: each bed of the old snow its own whiteness, in straight bands
    float fl2 = lay / .55 + Q.z * 9.; float fi2 = floor(fl2), ff2 = smoothstep(.0, .25, fract(fl2)) ;
    float lw = mix(textureLod(uDet, vec3(fi2 * .137 - .137, .71, Q.z * .1), 0.).r, textureLod(uDet, vec3(fi2 * .137, .71, Q.z * .1), 0.).r, ff2);
    vec3 wAlb = vec3(.9, .93, .97) * (1. - .14 * ov) * (1. + (gr - .5) * .16 * fine) * (TABH ? (.64 + .58 * lw + .2 * smoothstep(TOPS - 1.4 / P.w, TOPS - .25 / P.w, p.y)) * mix(vec3(1.), vec3(.8, .89, 1.02), (1. - lw) * .7 * (1. - smoothstep(.85, .97, Nb.y))) : vec3(.86 + .22 * lw));
    if (TABH) clear *= 1. - .85 * smoothstep(TOPS - 1.4 / P.w, TOPS - .25 / P.w, p.y);
    vec3 cav = mix(mix(vec3(.42, .64, .95), vec3(.2, .48, .92), ov), vec3(1.), aoS * aoS * (1. - .3 * ov));
    vec3 white = wAlb * (SUNC * dif + skyA * aoS * cav);
    // blue ice: a dark glassy body lit from inside, brightest where it is thin
    float thin = (1. - th) * mix(.25, 1., smoothstep(.6, 3., P.w));
    vec3 iceT = vec3(.03, .26, .6);
    vec3 blue = vec3(.02, .07, .14) * (SUNC * dif * .6 + skyA) + iceT * (AMB * (.3 + .7 * thin) * (1. + .7 * ov) + SUNC * (.05 + .3 * thin + 1.8 * tr * thin) * (.3 + .7 * sh));
    col = mix(white, blue, clear);
    col += SUNC * iceT * thin * (.08 + 1.1 * tr) * (1. - clear) * (.4 + .6 * sh) + AMB * iceT * thin * .3 * ov * (1. - clear) * (1. - aoS * .6);
    // ash: thick wavy gritty layers folded through the ice, blurred where seen through clear ice
    float lk = textureLod(uDet, vec3(floor(lu) * .137, .31, Q.z * .1), 0.).r;
    float hw = (.03 + .07 * lk) * (1. + .7 * clear) * (1. + .8 * step(.9, Q.y)) * (.75 + .5 * textureLod(uDet, q * .05 + 5., 0.).r);
    float au = abs(fract(lu) - .5);
    float grit = mix(.6, smoothstep(.2, .8, textureLod(uDet, q * .6 + 2., 0.).a), fine);
    float ash = Q.y * step(.3, lk) * clamp(smoothstep(hw, hw * .45, au) * (.75 + .35 * grit) + smoothstep(hw * 2.2, hw, au) * (.08 + .17 * grit), 0., 1.) * (1. - clear * .35);
    ash = max(ash, step(.8, Q.y) * smoothstep(.55, .9, Nb.y) * smoothstep(.5, .8, dn.r) * (1. - wash) * .8);
    vec3 ashc = mix(vec3(.026, .024, .022), vec3(.075, .066, .058), grit);
    col = mix(col, ashc * (SUNC * max(NL, 0.) * sh + AMB * .7), ash);
    float wet = smoothstep(min(.9, .25 * P.w) + .02, .02, W.y);
    float gloss = max(max(clear * .95, wet), .04) * (1. - ash * .8);
    float F = .02 + .98 * pow(1. - max(dot(Nb, -rd), 0.), 5.);
    vec3 rf = reflect(rd, Nb);
    col = mix(col, skyBase(rf), F * gloss * .8);
    col += SUNC * pow(max(dot(rf, SUN), 0.), mix(12., 500., gloss)) * gloss * sh * mix(.1, 1.4, gloss);
    col *= mix(1., .62, wet * (1. - clear));
  }
  // the notch's back wall lies in the lip's shade (the baked occlusion does not know the notch)
  if (Q.x < .5) col *= 1. - .5 * notch(W.y) * smoothstep(2., 6., P.w) * smoothstep(-.15, .1, W.y);
  if (W.y < 0.) { float dep = -W.y; col = col * exp(-dep * vec3(2.2, 1., .85)) * vec3(.42, .78, .74);
    // a piece's body below the water fades into the water's own colour within about a third of its size: no face reads
    if (!HERO && Q.x < .5) col = mix(col, WCOL * (AMB * 1.4 + SUNC * .15), smoothstep(0., .6 * P.w, dep)); }
  vec3 Wd = uM.x > .5 ? W * vec3(1., -1., 1.) : W;
  o = vec4(col * uC[3].w, uM.x > .5 ? 1. : min(length(W - cam), 6e4) * uC[2].w);
  vec4 cp = uVP * vec4(Wd, 1.);
  gl_FragDepth = clamp(cp.z / cp.w * .5 + .5, 0., 1.);
}`,mo=me+We+`
uniform sampler2D uN; uniform vec4 uBR; uniform vec4 uS;
out vec4 o;
#define T uS.x
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
vec4 skyFull(vec3 rd){
  vec3 col = skyBase(rd);
  float y = max(rd.y, 0.), az = azim(rd.xz), cs = dot(rd, SUN);
  vec2 hd = rd.xz / max(length(rd.xz), 1e-4);
  float sty = uBR.z, sdS = uBR.w, ph = pow(max(cs, 0.), 5.), cov = 0.;
  if (sty > .5 && sty < 1.5) {
    // a few long soft bars low over the ice: each its own height, length and thickness, lit from beneath
    float bars = 0., lit = 0.;
    for (int i = 0; i < 7 + uZ0; i++){
      float fi = float(i) + sdS;
      float hA = fract(sin(fi * 12.9898) * 43758.5453), hB = fract(sin(fi * 78.233) * 43758.5453), hC = fract(sin(fi * 37.719) * 43758.5453);
      float e0 = .1 + .26 * hA * hA, th = .007 + .02 * hB * (1. - hA * .5);
      float c0 = (i & 1) == 0 ? (hC - .5) * 2.6 : hC * 6.2831853 - 3.1415927, len = .5 + 1.1 * fract(hB + hC * 3.7);
      float da = mod(az - c0 + 3.1415927, 6.2831853) - 3.1415927;
      float along = smoothstep(len, len * .3, abs(da)) * (1. - .5 * smoothstep(0., len, da));
      float wob = (vn(hd * 9. + fi * 3.1) - .5) * .5 + (vn(hd * 41. + fi) - .5) * .25;
      float v = (y - e0) / th - wob;
      float b = exp(-v * v * 1.4) * along * (.55 + .45 * vn(hd * 17. + fi * 5.));
      bars = max(bars, b); lit = max(lit, b * smoothstep(.3, -1., v));
    }
    cov = clamp(bars, 0., 1.);
    vec3 body = mix(CDARK, HORA, .6);
    vec3 under = CLIT * (.6 + 1.2 * pow(max(dot(hd, normalize(SUN.xz + 1e-5)), 0.) * .5 + .5, 3.));
    col = mix(col, mix(body, under, clamp(lit / max(bars, 1e-3), 0., 1.) * .8 + ph * .2), cov * .85);
  } else if (sty > 1.5 && sty < 2.5) {
    // a high thin veil, brighter round the sun
    vec2 cp = rd.xz / (y + .12) + sdS;
    float v = vn(cp * .9) * .6 + vn(cp * 2.3 + 4.) * .3 + vn(cp * vec2(5., 1.6) + 9.) * .1;
    cov = smoothstep(.3, .85, v) * smoothstep(.0, .15, rd.y) * .3;
    col = mix(col, mix(HORA, CLIT, .5 + .5 * ph), cov) + SUNC * SUNVIS * pow(max(cs, 0.), 18.) * cov * .5;
  } else if (sty > 2.5) {
    // a low even ceiling: soft undulation only, a brighter band along the horizon below it
    vec2 cp = rd.xz / (y + .3) + sdS;
    float v = vn(cp * .7) * .7 + vn(cp * 1.9 + 3.) * .3;
    // broad soft rolls on a darker underside, the horizon slot left bright below it
    col = mix(col, mix(CDARK * .8, CLIT * 1.05, .2 + .8 * smoothstep(.25, .75, v)), smoothstep(.03, .22, rd.y) * .8);
    cov = .9;
  }
  if (AUR > .5) {
    // two ribbons hung in folds: a sharp wandering lower border, fine rays fading upward, rose at the top of tall rays.
    // every term is a whole multiple of the azimuth (or the direction itself), so nothing breaks where the angle wraps
    vec3 ac = vec3(0.);
    for (int i = 0; i < 2 + uZ0; i++){
      float fi = float(i);
      float e0 = .16 + .1 * fi + .06 * sin(2. * az + 1.3 + fi * 2.4 + T * .02) + .03 * sin(5. * az + fi * 4. - T * .05) + .012 * sin(11. * az + T * .11 + fi);
      float sl = .12 * cos(2. * az + 1.3 + fi * 2.4) + .15 * cos(5. * az + fi * 4.) + .13 * cos(11. * az + T * .11 + fi);
      float h = rd.y - e0, fold = 1. + 2.2 * smoothstep(.1, .35, abs(sl));
      float rays = .45 + .55 * vn(hd * (70. + 30. * fi) + vec2(T * .05, fi * 7.)) * vn(hd * 23. + fi * 3.);
      float hgt = .1 + .14 * vn(hd * 6. + fi * 5. + T * .01);
      float curt = smoothstep(-.006, .004, h) * exp(-max(h, 0.) / (hgt * rays)) * rays * fold;
      float am = .25 + .75 * sq(.5 + .5 * sin(az + 1.2 + fi * 2.));
      ac += curt * am * (.85 - .3 * fi) * mix(vec3(.1, .9, .42), vec3(.55, .2, .5), smoothstep(.06, .2, h));
    }
    col += ac * .32;
  }
  return vec4(col, cov);
}
void main(){
  vec2 uv = gl_FragCoord.xy / uS.zw;
  float az = (uv.x - .5) * 6.2831853, el = uv.y * uv.y * 1.5707963;
  vec4 c = skyFull(vec3(cos(el) * sin(az), sin(el), cos(el) * cos(az)));
  o = vec4(c.rgb * uS.y, c.a);
}`,xo=me+We+`
uniform sampler2D uBerg; uniform sampler2D uRefl; uniform sampler2D uBand; uniform sampler2D uN; uniform sampler2D uEv; uniform sampler2D uSky;
uniform vec4 uC[4]; uniform vec4 uBR; uniform vec4 uK;
out vec4 o;
ivec4 NC;
#define T uC[0].w
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
vec4 bandAt(float az, float el){
  float v = (el - uBR.x) / (uBR.y - uBR.x);
  if (v < 0. || v > 1.) return vec4(0.);
  vec4 b = textureLod(uBand, vec2(az / 6.2831853 + .5, v), 0.);
  return vec4(b.rgb * 2. / max(b.a, .004), b.a);
}
vec3 skyFull(vec3 rd){
  float el = asin(clamp(rd.y, 0., 1.));
  vec4 m = textureLod(uSky, vec2(azim(rd.xz) / 6.2831853 + .5, sqrt(el / 1.5707963)), 0.);
  vec3 col = m.rgb / uK.x;
  float cs = dot(rd, SUN);
  col += SUNC * SUNVIS * smoothstep(.99994, .99997, cs) * 14. * (1. - m.a * .8);
  if (AUR > .5) {
    vec3 sp = rd / max(max(abs(rd.x), abs(rd.y)), abs(rd.z));
    vec2 g = (abs(rd.y) > .55 ? sp.xz : (abs(rd.x) > abs(rd.z) ? sp.yz : sp.xy)) * 260.;
    vec4 hs = textureLod(uN, (floor(g) + .5) / 256. + .37, 0.);
    float st = step(.985, hs.r) * smoothstep(.4, .05, length(fract(g) - .5)) * smoothstep(0., .1, rd.y);
    col += vec3(.8, .85, 1.) * st * hs.g * .6;
  }
  return col;
}
vec3 waves(vec2 xz){
  vec3 s = vec3(0.);
  for (int i = 0; i < NC.x; i++){
    vec4 e = texelFetch(uEv, ivec2(2 * i, 0), 0), f = texelFetch(uEv, ivec2(2 * i + 1, 0), 0);
    float tau = T - e.z;
    if (tau > 0. && e.w > 0.) {
      vec2 dv = xz - e.xy; float r = length(dv) + .01; vec2 dir = dv / r;
      float Lw = f.x, k0 = 3.1416 / Lw;
      for (int j = 0; j < 3 + uZ0; j++){
        float k = k0 * (.6 + .5 * float(j)), w = sqrt(9.81 * k), cg = .5 * w / k;
        float wid = Lw * 1.2 + .35 * cg * tau;
        float env = exp(-sq((r - cg * tau) / wid)) * e.w * (j == 1 ? 1. : .6) / sqrt(1. + r / Lw) * exp(-tau * f.y);
        float phs = k * r - w * tau;
        s.x += env * cos(phs); s.yz -= env * k * sin(phs) * dir;
      }
    }
  }
  return s;
}
vec4 brash(vec3 ro, vec3 rd, float tw, float foot){
  // floating ice too small to march: fist-sized bits, table-sized clear growlers (dark glass, a bright rim) and low
  // white slabs awash with a turquoise skirt showing under the water round them
  vec4 acc = vec4(0.);
  vec2 x0 = ro.xz + rd.xz * tw + T * vec2(.03, -.05);
  // (the flat white slabs went: drawn on the water they read as paint on glass; the marched bergy bits carry it)
  for (int j = 0; j < 2 + uZ0; j++){
    float cs = j == 0 ? .9 : (j == 1 ? 3.7 : 2.3), pr = BRASH * (j == 0 ? 2.4 : (j == 1 ? .8 : 2.));
    vec2 pw = x0 / cs + vn(x0 * .7) * .3;
    float fw = foot / cs;
    vec4 h = textureLod(uN, (floor(pw) + .5) / 256. + .13 * float(j), 0.);
    float rad = (.03 + .09 * h.a * h.a) * (j == 0 ? 1. : (j == 1 ? 1.4 : 2.6));
    vec2 v = fract(pw) - (.3 + .4 * h.gb);
    vec2 vr = mat2(.8, .6, -.6, .8) * v * vec2(1., .55 + .8 * h.g);
    float dd = length(vr) - rad * (.55 + .9 * vn(pw * 11. + h.b * 7.));
    float on = step(h.r, pr);
    float cov = on * (1. - smoothstep(-fw - .002, fw + .002, dd));
    float far = smoothstep(.08, .35, fw);
    vec3 nb = normalize(vec3(v.x, .7, v.y));
    float lit = max(dot(nb, SUN), 0.);
    float kind = j == 2 ? (h.b < .5 ? 0. : 1.) : (h.b < .7 ? 0. : 1.);
    vec3 wh = vec3(.82, .86, .92) * (SUNC * lit * .8 + AMB * .9);
    vec3 gl = vec3(.1, .2, .24) * (AMB + SUNC * .25) + SUNC * pow(lit, 8.) * .3;
    // (the rim lights only on the far side: a low lump awash, never a ring laid on the water)
    float rim = smoothstep(-.02 - fw, -.003, dd) * smoothstep(.002 + fw, -.002, dd) * smoothstep(-.2, .7, dot(normalize(v + 1e-5), normalize(rd.xz + 1e-5)));
    vec3 c = mix(wh * (smoothstep(-.005, -.03 - fw, dd) * .4 + .6), gl + (AMB * .2 + SUNC * .3 * lit) * rim, kind);
    float cv = mix(cov, pr * (j == 2 ? .2 : .05), far);
    acc.rgb = acc.rgb * (1. - cv) + c * cv;
    acc.a = 1. - (1. - acc.a) * (1. - cv);
  }
  return acc;
}
void main(){
  NC = ivec4(texelFetch(uEv, ivec2(0, 3), 0) + .5);
  vec2 uv = gl_FragCoord.xy / uC[3].xy;
  vec2 sp = uv * 2. - 1.;
  vec3 F = uC[1].xyz, Rr = uC[2].xyz, U = uC[3].xyz * 0. + cross(F, Rr);
  U = normalize(cross(Rr, F)) * -1.;
  vec3 rd = normalize(F + (Rr * sp.x + U * sp.y) * uC[1].w);
  vec3 ro = uC[0].xyz;
  vec4 B = texelFetch(uBerg, ivec2(gl_FragCoord.xy), 0);
  B.rgb /= uK.x; B.a /= uK.y;
  float el = asin(clamp(rd.y, -1., 1.)), az = azim(rd.xz);
  vec4 band = bandAt(az, el);
  float tw = rd.y < -1e-5 ? ro.y / -rd.y : 1e9;
  float pa = uK.z;
  vec3 col; float tS;
  vec3 hz = skyBase(vec3(rd.x, .02, rd.z));
  if (B.a < tw && B.a < 5e4) {
    col = B.rgb; tS = B.a;
    col = mix(col, hz, 1. - exp(-tS * FOG * 4.));
  } else {
    vec3 skyc = vec3(0.), watc = vec3(0.), rRef = rd, rbC = vec3(0.), wBody = vec3(0.), wGl = vec3(0.); vec4 rRB = vec4(0.), wBr = vec4(0.); float rbA = 0., wFr = 0., wRu = 0.;
    float wm = rd.y < 0. ? 1. - band.a : 0.;
    if (wm > 0.) {
      vec3 Pw = ro + rd * tw;
      vec3 wv = waves(Pw.xz);
      vec2 g = wv.yz;
      vec2 x2 = Pw.xz;
      float foot = tw * pa / max(-rd.y, .015);
      // every ripple lookup is filtered to the pixel's footprint: near ripples stay coherent, far water goes to a mirror
      float l1 = log2(max(foot * 18., 1e-4)), l2 = log2(max(foot * 49., 1e-4)), l3 = log2(max(foot * 23., 1e-4)), l4 = log2(max(foot * 59., 1e-4));
      vec2 rp = (textureLod(uN, x2 * .07 + T * vec2(.011, .007), l1).rg - .5) + (textureLod(uN, x2 * .19 - T * vec2(.013, -.02), l2).ba - .5) * .7;
      // long low ripples, crests stretched across the lagoon
      vec2 lr = textureLod(uN, vec2(x2.x * .0004, x2.y * .0016) + T * vec2(.00003, .00011), log2(max(foot * .41, 1e-4))).ga - .5;
      vec2 wd = vec2(sin(uC[3].z), cos(uC[3].z));
      float paw = smoothstep(.5, .8, vn(x2 * .02 + T * vec2(.02, .01)));
      float gus = uK.w * smoothstep(.2, .7, vn(x2 * .03 - wd * T * .12));
      vec2 rw = (textureLod(uN, x2 * .09 - wd * T * .2, l3).rg - .5) + (textureLod(uN, x2 * .23 - wd * T * .4, l4).ba - .5) * .6;
      g += rp * (.012 + .07 * paw) + lr * .035 + rw * gus * .2;
      // roughness the pixel can't resolve blurs the reflection instead of speckling it
      float ru = clamp((.1 + paw * 1.5 + gus * 3.) * smoothstep(.05, .6, foot), 0., 1.);
      paw = max(paw, gus);
      vec3 n = normalize(vec3(-g.x, 1., -g.y));
      float Fr = .02 + .98 * pow(1. - max(dot(n, -rd), 0.), 5.);
      vec3 r = reflect(rd, n); r.y = abs(r.y);
      vec4 rb = bandAt(azim(r.xz), asin(r.y));
      vec3 env = rb.rgb; float envA = rb.a;
      vec2 Fxz = normalize(F.xz + vec2(1e-5));
      vec2 ruv = uv + vec2(dot(g, Rr.xz), -abs(dot(g, Fxz))) * .5;
      vec4 RB = textureLod(uRefl, ruv, 0.);
      rRef = r; rbA = envA; rbC = env; rRB = RB; wRu = ru;
      vec3 body = WCOL * (AMB * 1.4 + SUNC * .15);
      if (B.a < 5e4 && B.a > tw) body = mix(body, B.rgb, exp(-(B.a - tw) * .4));
      wBody = body; wFr = Fr;
      wGl = SUNC * SUNVIS * pow(max(dot(r, SUN), 0.), 400.) * 6. * (.3 + paw);
      if (foot < 1.5) wBr = brash(ro, rd, tw, foot);
    }
    vec3 sk = (wm > 0. ? max(rbA, rRB.a) : band.a) < .995 ? skyFull(wm > 0. ? rRef : rd) : vec3(0.);
    if (wm > 0.) {
      vec3 env = mix(mix(sk, rbC, rbA), rRB.rgb / uK.x, rRB.a);
      if (wRu > .01) env = mix(env, skyBase(vec3(rRef.x, rRef.y * .6 + .04, rRef.z)) * .9, wRu * .6);
      watc = mix(wBody, env, wFr) + wGl;
      watc = watc * (1. - wBr.a) + wBr.rgb;
    }
    skyc = band.a > 0. ? band.rgb : sk;
    col = mix(skyc, watc, wm);
    tS = wm > .5 ? tw : (band.a > .5 ? 700. : 1e5);
  }
  // splashes
  for (int i = 0; i < NC.y; i++){
    vec4 s0 = texelFetch(uEv, ivec2(2 * i, 1), 0), s1 = texelFetch(uEv, ivec2(2 * i + 1, 1), 0);
    float age = T - s0.w;
    if (age > 0. && age < 3.5 && s1.x > 0.) {
      float sz = s1.x;
      float up = sz * .25 * (min(age, .8) - .3 * max(age - .8, 0.));
      vec3 C = s0.xyz + vec3(0., max(up, 0.), 0.);
      float rr = sz * (.7 + .6 * min(age, 2.5));
      float tc = dot(C - ro, rd);
      if (tc > 0. && tc < tS + rr) {
        vec3 q = ro + rd * tc - C;
        float dd = length(q * vec3(1., 3.5, 1.)) / rr;
        float nz = vn(q.xy / sz * 3. + vec2(age * .8, -age * 2.)) * .6 + vn(q.xy / sz * 9. + 3.) * .4;
        float den = smoothstep(1., .2, dd + (nz - .5) * .7) * smoothstep(3.5, .8, age) * smoothstep(0., .15, age);
        vec3 sc = vec3(.95, .97, 1.) * (SUNC * .8 + AMB * 1.2);
        col = mix(col, sc, den * .45);
      }
    }
  }
  // mist over the water
  float H = 7., a0 = exp(-ro.y / H);
  float I = abs(rd.y) < 1e-3 ? tS * a0 : H * a0 * (1. - exp(-rd.y * min(tS, 2e4) / H)) / rd.y;
  float m = 1. - exp(-MIST * max(I, 0.));
  vec3 mc = hz * .95 + SUNC * SUNVIS * .22 * pow(max(dot(rd, SUN), 0.), 4.);
  col = mix(col, mc, m);
  // falling snow
  if (SNOW > .5) {
    for (int i = 0; i < 3 + uZ0; i++){
      float rl = 2.5 + 4. * float(i) * float(i);
      vec2 hz2 = normalize(rd.xz + vec2(1e-5));
      float lr = length(rd.xz);
      if (lr > .05 && rl < tS) {
        vec2 g = vec2(azim(hz2) * rl, rd.y / lr * rl + T * (.9 + .2 * float(i))) / (.22 + .1 * float(i));
        g.x += sin(g.y * .3 + float(i)) * .4;
        vec4 hs = textureLod(uN, (floor(g) + .5) / 256. + .21 * float(i), 0.);
        // near flakes large, soft and drawn out along their fall; far ones small and many
        float dd = length((fract(g) - .25 - .5 * hs.gb) * vec2(1., i == 0 ? .6 : (i == 1 ? .85 : 1.)));
        float fs = (i == 0 ? .13 : (i == 1 ? .055 : .03)) * (.6 + .8 * hs.a) + pa * rl * 2.;
        col = mix(col, vec3(.85, .88, .92) * (AMB * 1.3 + .15), step(hs.r, i == 2 ? .55 : .3) * smoothstep(fs, fs * (i == 0 ? 0. : .3), dd) * (i == 0 ? .45 : .8));
      }
    }
  }
  col *= EXPO;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col += (textureLod(uN, gl_FragCoord.xy / 256. + T * .37, 0.).a - .5) / 255.;
  o = vec4(col, 1.);
}`;function wo(t){const a={},o=e.getExtension("KHR_parallel_shader_compile");o&&o.maxShaderCompilerThreadsKHR&&o.maxShaderCompilerThreadsKHR(4294967295);for(const s in t){const[n,i]=t[s],l=e.createProgram();for(const[f,c]of[[e.VERTEX_SHADER,n],[e.FRAGMENT_SHADER,i]]){const u=e.createShader(f);e.shaderSource(u,c),e.compileShader(u),e.attachShader(l,u)}e.linkProgram(l),a[s]=l}for(const s in a){const n=a[s];if(!e.getProgramParameter(n,e.LINK_STATUS)){const f=e.getAttachedShaders(n).map(c=>e.getShaderInfoLog(c)).join(`
`);throw new Error("502 "+s+": "+e.getProgramInfoLog(n)+f)}const i={},l=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let f=0;f<l;f++){const c=e.getActiveUniform(n,f),u=c.name.replace(/\[0\]$/,"");i[u]=e.getUniformLocation(n,c.name)}a[s]={p:n,u:i}}return a}const bo=t=>(t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/4294967296),ce=(t,a,o)=>{const s=e.createTexture();return e.bindTexture(t,s),e.texParameteri(t,e.TEXTURE_MIN_FILTER,a),e.texParameteri(t,e.TEXTURE_MAG_FILTER,a),e.texParameteri(t,e.TEXTURE_WRAP_S,o),e.texParameteri(t,e.TEXTURE_WRAP_T,o),t===e.TEXTURE_3D&&e.texParameteri(t,e.TEXTURE_WRAP_R,o),s};let d=e.__c502;if(!d||!d.v6){d={},d.fl=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float")),d.pack=e.getParameter(e.MAX_3D_TEXTURE_SIZE)<320,d.MT=e.getParameter(e.MAX_TEXTURE_SIZE)|0;const t=p=>d.fl?p:p.replace("o = vec4(col * uC[3].w, uM.x > .5 ? 1. : min(length(W - cam), 6e4) * uC[2].w);","float dN = min(length(W - cam), 6e4); o = vec4(col * uC[3].w, uM.x > .5 ? 1. : dN / (dN + 400.));").replace("B.rgb /= uK.x; B.a /= uK.y;","B.rgb /= uK.x; B.a = B.a > .999 ? 1e9 : 400. * B.a / (1. - B.a);");d.pr=wo({proto:[Ke,uo],band:[Ke,po],berg:[vo,t(d.pack?Dt.replace(`
`,`
#define VOLPACK
`):Dt)],comp:[Ke,t(xo)],sky:[Ke,mo]}),e.pixelStorei(e.UNPACK_ALIGNMENT,1);const a=new Uint8Array(256*256*4);for(let p=0;p<a.length;p++)a[p]=bo(p*2+77)*256;d.noise=ce(e.TEXTURE_2D,e.LINEAR,e.REPEAT),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,a),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),d.det=ce(e.TEXTURE_3D,e.LINEAR,e.REPEAT),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,32,32,32,0,e.RGBA,e.UNSIGNED_BYTE,null),d.vol=ce(e.TEXTURE_3D,e.LINEAR,e.CLAMP_TO_EDGE);const o=d.pack?128:64,s=d.pack?192:320;d.fl?e.texImage3D(e.TEXTURE_3D,0,e.R16F,o,64,s,0,e.RED,e.HALF_FLOAT,null):e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,o,64,s,0,e.RGBA,e.UNSIGNED_BYTE,null),d.dec=d.fl?[1,0]:[4,-2];const n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),d.vao0=e.createVertexArray(),e.bindVertexArray(d.vao0);const i=d.pr.proto;e.useProgram(i.p),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.viewport(0,0,64,64),e.uniform2f(i.u.uEnc,d.fl?1:.25,d.fl?0:.5),e.uniform4f(i.u.uH,64,0,64/6,1),e.uniform4f(i.u.uK,2,0,0,0),e.uniform1i(i.u.uP,-1),e.viewport(0,0,32,32);for(let p=0;p<32;p++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,d.det,0,p),e.uniform1f(i.u.uZ,p),e.drawArrays(e.TRIANGLES,0,3);e.viewport(0,0,64,64);for(let p=0;p<5;p++){e.uniform1i(i.u.uP,p),e.uniform4f(i.u.uX,Q[p][0],Q[p][1],Q[p][2],Ve[p]);for(let m=0;m<64;m++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,d.vol,0,d.pack?(p>>1)*64+m:p*64+m),d.pack&&e.viewport((p&1)*64,0,64,64),e.uniform1f(i.u.uZ,(m+.5)/32-1),e.drawArrays(e.TRIANGLES,0,3)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(n);const l=[],f=[[0,1,2],[1,2,0],[2,0,1]];for(const[p,m,x]of f)for(const y of[-1,1]){const E=[[-1,-1],[1,-1],[1,1],[-1,-1],[1,1],[-1,1]];for(const[j,H]of E){const X=[0,0,0];X[p]=y,X[m]=j,X[x]=H,l.push(...X)}}d.vao=e.createVertexArray(),e.bindVertexArray(d.vao);const c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,12,0),d.ib=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,d.ib),e.bufferData(e.ARRAY_BUFFER,192*84,e.DYNAMIC_DRAW);const u=[[1,4,0],[2,3,16],[3,3,28],[4,3,40],[5,4,52],[6,4,68]];for(const[p,m,x]of u)e.enableVertexAttribArray(p),e.vertexAttribPointer(p,m,e.FLOAT,!1,84,x),e.vertexAttribDivisor(p,1);e.bindVertexArray(null),d.ev=ce(e.TEXTURE_2D,e.NEAREST,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,16,4,0,e.RGBA,e.FLOAT,null),d.tg={},d.v6=1,e.__c502=d}const _t=(t,a,o)=>{const s=ce(e.TEXTURE_2D,e.LINEAR,e.CLAMP_TO_EDGE);d.fl?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,t,a,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.SRGB8_ALPHA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null);const n=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0),o){const i=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,i),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,t,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,i)}return e.bindFramebuffer(e.FRAMEBUFFER,null),{t:s,f:n,w:t,h:a}};if(!d.tg[R]){const t=R;d.tg[R]={main:_t(R,R,!0),refl:_t(t,t,!0)}}const Qe=d.tg[R],je=d.fl?[1,1]:[.5,1/2e3],Wo=r()*200,Ko=r()*200;let Fe=R>400?4096:1024,Ne=R>400?288:80;Fe>d.MT&&(Ne=Math.round(Ne*d.MT/Fe),Fe=d.MT);const ct=-.05,ft=.23,Ct=ce(e.TEXTURE_2D,e.LINEAR,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,Fe,Ne,0,e.RGBA,e.UNSIGNED_BYTE,null);{const t=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ct,0);const a=d.pr.band;e.useProgram(a.p),e.bindVertexArray(d.vao0),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.viewport(0,0,Fe,Ne),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d.noise),e.uniform1i(a.u.uN,0),e.uniform4fv(a.u.uL,Oe),e.uniform4f(a.u.uG,Te,lt,Xe,Ge),e.uniform4f(a.u.uGp,J[0],J[1],J[2],0),e.uniform4f(a.u.uBR,ct,ft,Fe,Ne),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)}const Ue=R>400?1024:512,De=R>400?320:112,qt=ce(e.TEXTURE_2D,e.LINEAR,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),d.fl?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,Ue,De,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.SRGB8_ALPHA8,Ue,De,0,e.RGBA,e.UNSIGNED_BYTE,null);const It=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,It),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,qt,0),e.bindFramebuffer(e.FRAMEBUFFER,null);let ht=0;const Ht=(t,a)=>{e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null);const o=d.pr.sky;if(e.useProgram(o.p),e.bindVertexArray(d.vao0),e.bindFramebuffer(e.FRAMEBUFFER,It),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.viewport(0,0,Ue,De),a){e.enable(e.SCISSOR_TEST);const s=Math.ceil(De/a);e.scissor(0,ht*s,Ue,s),ht=(ht+1)%a}e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d.noise),e.uniform1i(o.u.uN,0),e.uniform4fv(o.u.uL,Oe),e.uniform4f(o.u.uBR,ct,ft,nt,kt),e.uniform4f(o.u.uS,t,d.fl?1:.5,Ue,De),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,null)};Ht(0,0);const xe=(t,a,o,s)=>{const n=Math.cos(s),i=Math.sin(s),l=1-n;return[l*t*t+n,l*t*a+i*o,l*t*o-i*a,l*t*a-i*o,l*a*a+n,l*a*o+i*t,l*t*o+i*a,l*a*o-i*t,l*o*o+n]},ke=(t,a)=>{const o=new Array(9);for(let s=0;s<3;s++)for(let n=0;n<3;n++)o[s*3+n]=t[n]*a[s*3]+t[3+n]*a[s*3+1]+t[6+n]*a[s*3+2];return o},ut=t=>xe(0,1,0,t),yo=new Float64Array(9),go=new Float64Array(9),Eo=(t,a,o,s,n)=>{const i=Math.cos(n),l=Math.sin(n),f=1-i;return t[0]=f*a*a+i,t[1]=f*a*o+l*s,t[2]=f*a*s-l*o,t[3]=f*a*o-l*s,t[4]=f*o*o+i,t[5]=f*o*s+l*a,t[6]=f*a*s+l*o,t[7]=f*o*s-l*a,t[8]=f*s*s+i,t},zo=(t,a,o)=>{for(let s=0;s<3;s++)for(let n=0;n<3;n++)t[s*3+n]=a[n]*o[s*3]+a[3+n]*o[s*3+1]+a[6+n]*o[s*3+2];return t},_e=new Float32Array(16*4*4),we=[];let T=0;const Ce=(t,a,o,s,n)=>{we.push({x:t,z:a,t0:T,amp:o,Lw:s,decay:n||.035}),we.length>8&&we.shift(),dt=NaN},Ze=[0,0,0],P=new Float64Array(8*17);let dt=NaN,pt=0;const To=()=>{dt=T,pt=0;for(const t of we){const a=T-t.t0;if(a<=0)continue;const o=pt++*17,s=Math.PI/t.Lw;P[o]=t.x,P[o+1]=t.z,P[o+2]=t.Lw,P[o+3]=t.amp,P[o+4]=Math.exp(-a*t.decay);for(let n=0;n<3;n++){const i=s*(.6+.5*n),l=Math.sqrt(9.81*i),f=.5*l/i,c=o+5+n*4;P[c]=i,P[c+1]=f*a,P[c+2]=t.Lw*1.2+.35*f*a,P[c+3]=l*a}}},vt=(t,a)=>{T!==dt&&To();let o=0,s=0,n=0;for(let i=0;i<pt;i++){const l=i*17,f=t-P[l],c=a-P[l+1],u=Math.hypot(f,c)+.01,p=P[l+3];let m=-1;for(let x=0;x<3;x++){const y=l+5+x*4,E=(u-P[y+1])/P[y+2],j=E**2;if(j>746)continue;m<0&&(m=Math.sqrt(1+u/P[l+2]));const H=P[y],X=Math.exp(-j)*p*(x===1?1:.6)/m*P[l+4],ue=H*u-P[y+3],ne=Math.sin(ue);o+=X*Math.cos(ue),s-=X*H*ne*f/u,n-=X*H*ne*c/u}}return Ze[0]=o,Ze[1]=s,Ze[2]=n,Ze},qe=[],Ro=(t,a,o,s)=>{qe.push({x:t,y:a,z:o,t0:T,sz:s}),qe.length>4&&qe.shift()},g=[],q=(t,a,o,s,n,i,l)=>{const f=Q[s];let c=ke(ut(n),xe(1,0,0,i));l&&(c=ke(xe(Math.cos(n),0,-Math.sin(n),l),c));const u={x:t,z:a,y:0,vy:0,s:o,proto:s,rb:c,rad:o*Math.max(f[0],f[2]),phi:0,dphi:0,phiT:0,ax:[1,0,0],rolling:!1,K:0,ash:0,seed:r()*50,tq:r()<.5?-1:1,kind:0,spin:(r()-.5)*.006,ground:!1,held:0,emitted:0,lastSign:0,cool:0},p=[0,.55,1][ve];return u.ash=r()<[0,.5,.8][ve]?p*(.6+.4*r()):0,u.lift=0,u.y=(u.lift-Me-.22*(1-Math.abs(u.rb[4])))*Ie(u,u.rb),g.push(u),u},Ie=(t,a)=>{const o=Q[t.proto];return t.s*Math.hypot(a[1]*o[0],a[4]*o[1],a[7]*o[2])},L=-.1,S=(t,a)=>[Math.sin(t)*a,Math.cos(t)*a],Ye=z||r()<.5?-1:1,Mo=z?1:[0,3,1,0][Math.floor(r()*4)];{const[t,a]=S(L+Ye*(.3+r()*.12+(z?.08:0)),z?33:18+r()*14),o=q(t,a,z?24:9+r()*5,Mo,.9+r()*2,.06,0);o.ash=[0,.85,1][ve],o.spin=.002}{const[t,a]=S(L-Ye*(.25+r()*.15),40+r()*25);q(t,a,6+r()*3,r()<.6?2:4,r()*6,0,1.25)}{const[t,a]=S(L+(r()-.5)*.3,100+r()*40);q(t,a,9+r()*4,3,r()*6,.1,0)}{const[t,a]=S(L+Ye*.05+(r()-.5)*.2,60+r()*20);q(t,a,5+r()*2.5,1,r()*6,.05,0)}{const[t,a]=S(L-Ye*.5,130+r()*30);q(t,a,8+r()*3,0,r()*6,.1,0)}for(let t=0;t<7;t++){const[a,o]=S(L+(r()-.45)*.9,7+r()*16);if(!g.some(s=>Math.hypot(s.x-a,s.z-o)<s.rad+2)){const s=q(a,o,.35+r()*r()*.6,r()<.85?4:2,r()*6.28,(r()-.5)*.5,0);s.ash=0}}const Fo=[22,34,48][$];let ko=0;for(;g.length<Fo&&ko++<3e3;){const t=r(),a=.6*Math.pow(20,Math.pow(t,1.9)),o=(r()-.5)*2*Math.PI,s=a>4?900:260,n=9+a*1.5+Math.pow(r(),1.3)*s,[i,l]=S(o,n);if(!Re(i,l,a+15)||g.some(p=>Math.hypot(p.x-i,p.z-l)<p.rad+a+3)||Math.abs(o-L)<.5&&n<25&&a>1.2)continue;const f=a<2.5?r()<.7?3:0:[0,1,2,3,4][k([3,2,2,2,1])],c=r()<[.12,.28,.5][Be]?(r()<.5?1:-1)*(1.2+r()*1.6):0,u=q(i,l,a,f,r()*6.28,(r()-.5)*.3,c);a>6&&n>300&&r()<.5&&(u.ground=!0,u.rb=ke(xe(1,0,0,.12+r()*.15),u.rb))}for(let t=0,a=0;t<($===2?14:18)&&a<600;a++){const o=(r()-.5)*2*Math.PI,s=3.5+Math.pow(r(),1.4)*40,[n,i]=S(o,s),l=.22+Math.pow(r(),2)*.7;if(s<9&&Math.abs(Math.atan2(Math.sin(o-L),Math.cos(o-L)))<.75||g.some(c=>Math.hypot(c.x-n,c.z-i)<c.rad+l+.5))continue;const f=q(n,i,l,r()<.6?0:2,r()*6.28,(r()-.5)*.6,r()<.3?1.5:0);f.ash=0,t++}for(let t=0,a=0;t<7&&a<200;a++){const o=L+Math.PI*(.25+1.5*r()),[s,n]=S(o,2.6+r()*5);if(g.some(l=>Math.hypot(l.x-s,l.z-n)<l.rad+.8))continue;const i=q(s,n,.25+r()*.45,0,r()*6.28,(r()-.5)*.6,0);i.ash=0,t++}for(let t=0,a=0;t<5&&a<200;a++){const o=r(),s=Ge*o+(r()-.5)*80,n=-190*o-20-r()*20,i=1.5+r()*4;!Re(s,n,i+3)||g.some(l=>Math.hypot(l.x-s,l.z-n)<l.rad+i+2)||(q(s,n,i,[0,3,4,2][Math.floor(r()*4)],r()*6.28,(r()-.5)*.3,r()<.3?1.6:0),t++)}for(let t=0,a=0;t<[24,36,48][$]&&a<900;a++){const o=L+(r()-.5)*(r()<.7?1.8:6.28),s=35+Math.pow(r(),.8)*420,[n,i]=S(o,s),l=.35+Math.pow(r(),2.2)*1.5;if(!Re(n,i,l+4)||g.some(c=>Math.hypot(c.x-n,c.z-i)<c.rad+l+1))continue;const f=q(n,i,l,r()<.65?3:r()<.5?0:2,r()*6.28,(r()-.5)*.7,r()<.35?1.4+r():0);f.ash=r()<.15?.7:0,t++}for(let t=0,a=0;t<6&&a<400;a++){const o=L+Math.PI+(r()-.5)*2.2,s=25+r()*75,[n,i]=S(o,s),l=2.5+r()*r()*6;!Re(n,i,l+6)||g.some(f=>Math.hypot(f.x-n,f.z-i)<f.rad+l+3)||(q(n,i,l,[0,1,3,4,2][Math.floor(r()*5)],r()*6.28,(r()-.5)*.3,r()<.3?1.5:0),t++)}const Vo=g.length,be=[],Po=no?3+(_===0?1:0):0;for(let t=0;t<Po;t++)be.push({x:0,z:0,st:0,t:1.5+t*3+r()*6,yaw:0,look:r()*6});const Xt=(t,a,o)=>{t.x=a,t.z=o,t.st=1,t.t=0,t.yaw=Math.atan2(-a,-o)+(r()-.5)*1.5,Ce(a,o,.035,.6,.12)};if(z&&be.length){const[t,a]=S(L+.16,34);Xt(be[0],t,a),be[0].st=2,be[0].t=0,we.length=0}const Gt=[];if(Rt)for(let t=0;t<4+(_===2?2:0);t++){const[a,o]=S(L+(r()-.5)*3,30+r()*60);Gt.push({cx:a,cz:o,r:10+r()*18,a:r()*6.28,w:(.25+r()*.3)*(r()<.5?-1:1),y:7+r()*9,ph:r()*6.28,f:15+r()*6})}let mt=null;{const t=L+it,a=[],o=(i,l,f)=>{for(let c=g.length-1;c>=0;c--){const u=g[c];!a.includes(u)&&Math.hypot(u.x-i,u.z-l)<u.rad+f+1.5&&g.splice(c,1)}},s=(i,l,f,c,u)=>{const[p,m]=S(t+i,l),x=Q[f],y=Math.min(c,(l-4.2)/1.1/Math.max(x[0],x[2]));if(y<.2||!Re(p,m,y+2))return null;o(p,m,y*Math.max(x[0],x[2]));const E=q(p,m,y,f,b()*6.28,u,0);return a.push(E),!mt&&le!=="Down into the brash"&&(mt=E),E},n=ze;if(le==="Beside a big berg")s(n*(.3+.1*b()),12+4*b(),b()<.6?1:0,12,.04),s(-n*(.1+.15*b()),70+40*b(),3,7,.08);else if(le==="Between two bergs")s(-n*(.34+.1*b()),13+4*b(),b()<.5?1:0,12,.05),s(n*(.16+.1*b()),34+14*b(),[1,0,3][Math.floor(b()*3)],12,.06);else if(le==="Down into the brash"){s(n*(.18+.15*b()),9+3*b(),b()<.5?3:0,3.2,.1);for(let i=0,l=0;i<24&&l<300;l++){const f=(b()-.5)*1.3,c=3.2+Math.pow(b(),.8)*13,[u,p]=S(t+f,c),m=.22+Math.pow(b(),1.6)*.65;if(g.some(y=>Math.hypot(y.x-u,y.z-p)<y.rad+m+.25))continue;const x=q(u,p,m,b()<.65?0:2,b()*6.28,(b()-.5)*.6,b()<.3?1.4:0);x.ash=0,a.push(x),i++}}else le==="Looking down the lagoon"?s(-n*(.2+.12*b()),30+15*b(),[0,3,1][Math.floor(b()*3)],8,.06):le==="Toward the outlet"&&s(n*(.24+.12*b()),22+8*b(),[0,3,4][Math.floor(b()*3)],5.5,.1)}const O=mt||(g[0]&&g[0].s>5?g[0]:null),$e=[[1,[.75,1,.75]],[5,[1,.8,.85]],[6,[1,.85,.8]],[2,[1,.62,.82]],[7,[1,.9,.7]],Se()<.5?[0,[1,.95,.85]]:[1,[.75,1,.75]],[8,[1,.8,.7]]][se],re=$e[0],Pe=z?0:1+Math.floor(Se()*60),Ao=z?1:.88+.24*Se(),Bo=z?1:.88+.24*Se(),oe=[$e[1][0]*Ao,$e[1][1],$e[1][2]*Bo],Lo=se===3?1:se===5?2:0,Ot=se===1||se===6?.45:1;Q.push(oe),Ve.push(Me*oe[1]-.05);const W=R>400?112:48,Wt=ce(e.TEXTURE_3D,e.LINEAR,e.CLAMP_TO_EDGE);d.fl?e.texImage3D(e.TEXTURE_3D,0,e.R16F,W,W,W,0,e.RED,e.HALF_FLOAT,null):e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,W,W,W,0,e.RGBA,e.UNSIGNED_BYTE,null);const Kt=new Float32Array(12),Vt=re<2?0:re===2||re===6||re===7||(re===5||re===8)&&Pe%3===0?1:2,Qt=Pe*2.39996,jt=Math.tan((2+3*(Math.abs(Math.sin(Pe*91.7))*1e4%1))*Y),Je=[jt*(Math.cos(Qt)<0?-1:1),jt*.4*Math.sin(Qt)];if(O){const t=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,t);const a=d.pr.proto;e.useProgram(a.p),e.bindVertexArray(d.vao0),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.viewport(0,0,W,W),e.uniform2f(a.u.uEnc,d.fl?1:.25,d.fl?0:.5),e.uniform1i(a.u.uP,re),e.uniform4f(a.u.uX,oe[0],oe[1],oe[2],Ve[5]),e.uniform4f(a.u.uH,W,Pe,W/6,Ot),e.uniform4f(a.u.uK,re>2?Vt:0,Je[0],Je[1],Pe*1.7+.5);for(let f=0;f<W;f++)e.framebufferTextureLayer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,Wt,0,f),e.uniform1f(a.u.uZ,(f+.5)/(W/2)-1),e.drawArrays(e.TRIANGLES,0,3);e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t);const o=Q[O.proto],s=Math.max(o[0],o[2])/Math.max(oe[0],oe[2]);O.s*=s,O.proto=5,O.rad=O.s*Math.max(oe[0],oe[2]),O.y=(O.lift-Me-.22*(1-Math.abs(O.rb[4])))*Ie(O,O.rb);const n=O.seed,i=se===2?[-.64,.77,0]:se===1||se===6?[Math.sin(n*7)*.08,1,Math.cos(n*5)*.08]:[Math.sin(n*7),2.6,Math.cos(n*5)],l=Math.hypot(...i);Kt.set([re*7.31+2+Pe,Ot,2/W,Vt,i[0]/l,i[1]/l,i[2]/l,Lo,1e3,oe[1]*.7,Je[0],Je[1]])}const ee=Math.tan(33*Y),Qo=100*Y,v={yaw:L+it,pitch:Bt,vy:0,vp:0,x:0,z:0,v:0,hold:0};let D=null;const So=()=>{const t=Math.cos(v.pitch),a=[Math.sin(v.yaw)*t,Math.sin(v.pitch),Math.cos(v.yaw)*t],o=[Math.cos(v.yaw),0,-Math.sin(v.yaw)],s=[a[1]*o[2]-a[2]*o[1],a[2]*o[0]-a[0]*o[2],a[0]*o[1]-a[1]*o[0]];return{F:a,Rr:o,U:s}},No=(t,a)=>{const{F:o,Rr:s,U:n}=So(),i=t*2-1,l=1-a*2,f=[0,1,2].map(u=>o[u]+(i*s[u]+l*n[u])*ee),c=Math.hypot(f[0],f[1],f[2]);return f.map(u=>u/c)},Uo=(t,a)=>{if(t.rolling||t.kind)return;const o=Q[t.proto],s=t.rb,n=[s[0],0,s[2]],i=[s[6],0,s[8]],l=Math.hypot(n[0],n[2])*o[0],f=Math.hypot(i[0],i[2])*o[2];let c=l>f?n:i;const u=Math.hypot(c[0],c[2])||1;c=[c[0]/u,0,c[2]/u],t.ax=c,t.phi=0,t.dphi=0,t.phiT=(r()<.5?-1:1)*(r()<.55?Math.PI/2:Math.PI*(.8+.2*r())),t.phi=t.phiT*(a?.035:.06),t.rolling=!0,t.K=3.2/(Math.sqrt(t.s)+.6),t.emitted=0,t.lastSign=0,t.ground=!1,w.sound.note(28+r()*5,{dur:2.2,vel:.35,wave:"sawtooth",cutoff:160,attack:.4}),w.sound.hit("click",.4)},Do=t=>{let a=Te;for(let m=0;m<6;m++){const x=Math.sin(t)*a;a=Ut(x)/Math.max(.2,Math.cos(t))}const o=Math.sin(t)*a,s=Math.cos(t)*a;if(!(s>0&&Math.abs(o-St(s))<Nt(s)*.92))return!1;const n=lt*(.42+.15*r());let i=-1,l=-1;for(let m=3;m<g.length;m++){const x=g[m];if(x.rolling||x.kind||x===O)continue;const y=Math.hypot(x.x,x.z)/(x.s+1);y>l&&(l=y,i=m)}if(i<0)return!1;const f=-Math.sin(t),c=-Math.cos(t),u=g[i];Object.assign(u,{lift:0,x:o+f*n*.55,z:s+c*n*.55,s:n,proto:1,rb:ut(t+r()),rad:n*.75,ash:u.ash,spin:0,ground:!1}),u.y=lt-n*1,u.vy=0,u.held=1.2+r()*.8,u.ax=[Math.cos(t),0,-Math.sin(t)],u.phiT=-Math.PI/2*(.9+.2*r()),u.phi=u.phiT*.02,u.dphi=0,u.rolling=!0,u.K=1.6,u.emitted=0,u.lastSign=0,u.calf=1;const p=Math.hypot(o-v.x,s-v.z);return w.sound.hit("snare",.12,{at:p/343}),w.sound.hit("click",.3,{at:p/343}),!0},Zt=(t,a)=>{const o=w.view||bt,s=No(t,a),n=[v.x+(o.x||0),xt,v.z+(o.z||0)];let i=null,l=1e9;for(const c of g){const u=Ie(c,c.rb),p=Math.max(c.y+u*.5,u*.25),m=c.x-n[0],x=p-n[1],y=c.z-n[2],E=m*s[0]+x*s[1]+y*s[2];if(E<0)continue;Math.hypot(m-s[0]*E,x-s[1]*E,y-s[2]*E)<c.rad*.85&&E<l&&(l=E,i=c)}if(i){Yt(i);return}if(s[1]<-.004){const c=n[1]/-s[1],u=n[0]+s[0]*c,p=n[2]+s[2]*c;let m=null,x=1e9;for(const y of g){const E=Math.hypot(y.x-u,y.z-p)-y.rad;E<x&&(x=E,m=y)}if(m&&x<Math.max(4,m.rad*.6)){Yt(m);return}if(c<400){Ce(u,p,.05,.45,.09),w.sound.hit("noise",.08,{cutoff:2200,dur:.15});return}}const f=Math.atan2(s[0],s[2]);Math.abs(f)<1.2&&s[1]>-.03&&s[1]<.12&&(tt=f,et=Math.min(et,T+3+r()*7),w.sound.hit("snare",.04))},Yt=t=>{t.vy-=.06*Math.min(4,Math.sqrt(t.s)),Ce(t.x,t.z,.02*Math.min(3,t.s),Math.max(.8,t.s*.4),.08);const a=Math.hypot(t.x-v.x,t.z-v.z);w.sound.note(30+r()*6,{dur:1.2,vel:.1,wave:"sawtooth",cutoff:220,attack:.2,at:a/343}),!t.rolling&&!t.kind&&t.s>.5&&(wt=t,ot=Math.min(ot,T+2.5+r()*6))};let xt=At,$t=6+r()*8,Jt=.5,et=25+r()*30,eo=3+r()*4,tt=null,wt=null,ot=12+b()*40;const bt={yaw:0,pitch:0,x:0,y:0,z:0};let fe=0,he=0,He=0;const _o=t=>{const a=w.input,o=a.taps(),s=w.view||bt;if(v.yaw=L+it+(s.yaw||0),v.pitch=Bt+Math.max(-1.2,Math.min(1.2,s.pitch||0)),a.down){D||(D={x0:a.x,y0:a.y,lx:a.x,ly:a.y,t:0,path:0});const i=a.x-D.lx,l=a.y-D.ly;if(D.lx=a.x,D.ly=a.y,D.t+=t,D.path+=Math.hypot(i,l),D.path>.012){const f=Math.sin(v.yaw),c=Math.cos(v.yaw),u=Math.cos(v.yaw),p=-Math.sin(v.yaw),m=u*i-f*l,x=p*i-c*l;fe+=m*40,he+=x*40;const y=Math.hypot(fe,he);y>9&&(fe*=9/y,he*=9/y),He=Math.min(1,He+Math.hypot(i,l)*3),r()<.3&&w.sound.hit("noise",.05+.1*He,{cutoff:500+900*He,dur:.6}),v.hold=0}else D.t>.3&&(v.hold=1)}else D?(D.path<=.012&&D.t<.3&&Zt(D.x0,D.y0),D=null):o.length&&Zt(o[0].x,o[0].y),v.hold=0;const n=Math.exp(-t*.25);if(fe*=n,he*=n,He*=Math.exp(-t*1.5),v.v+=((v.hold?1.1:0)-v.v)*(1-Math.exp(-t*(v.hold?.8:.35))),v.v>.01){v.x+=Math.sin(v.yaw)*v.v*t,v.z+=Math.cos(v.yaw)*v.v*t;const i=Math.hypot(v.x,v.z);i>40&&(v.x*=40/i,v.z*=40/i),v.hold&&r()<t*1.5&&w.sound.hit("noise",.05,{cutoff:700,dur:.5})}for(const i of g){const l=v.x-i.x,f=v.z-i.z,c=Math.hypot(l,f),u=i.rad*1.1+(i.s>2?3.5:.6);if(c<u)if(v.hold||i.ground)v.x=i.x+l/c*u,v.z=i.z+f/c*u;else{const p=Math.min(1,t*.6);i.x-=l/c*(u-c)*p,i.z-=f/c*(u-c)*p}}},to=t=>{T+=t;const a=Math.hypot(fe,he);for(const o of g){if(o.kind)continue;if(!o.ground&&!o.calf){const l=Ge-o.x,f=-230-o.z,c=Math.hypot(l,f)||1,u=.6*Math.sin(o.x*.004+o.z*.003+1.7),p=.035/Math.sqrt(1+o.s*.15);o.x+=(l/c+u*f/c*.6)*p*t,o.z+=(f/c-u*l/c*.6)*p*t;const m=.06/Math.sqrt(1+o.s*.5);o.x+=fe*m*t,o.z+=he*m*t,o.spin+=(a*o.tq*.0025/(1+o.s*.3)-o.spin*.05)*t;{const x=o.spin*t,y=Math.cos(x),E=Math.sin(x),j=o.rb;for(let H=0;H<9;H+=3){const X=j[H],ue=j[H+2];j[H]=y*X+E*ue,j[H+2]=y*ue-E*X}}}if(o.rolling){o.held>0?(o.held-=t,o.dphi+=(o.phiT*.04-o.phi)*t*.6):o.dphi+=(o.K*Math.sin(Math.PI*o.phi/o.phiT)*Math.sign(o.phiT)*Math.abs(o.phiT)/Math.PI-.55*Math.sqrt(o.K)*o.dphi)*t,o.phi+=o.dphi*t;const l=Math.sign(o.phi-o.phiT*.5);if(o.lastSign<0&&l>0||o.lastSign>0&&l<0&&o.emitted){const f=Math.min(.22,.025*o.s*Math.min(1,Math.abs(o.dphi)*1.5))*(o.emitted?.45:1);Ce(o.x,o.z,f,Math.max(1.2,o.s*.8));{const u=v.x-o.x,p=v.z-o.z,m=Math.hypot(u,p)||1,x=Math.min(o.rad*.75,m*.6);Ro(o.x+u/m*x,0,o.z+p/m*x,Math.min(2.2,o.s*(o.emitted?.15:.28)))}const c=Math.hypot(o.x-v.x,o.z-v.z);w.sound.hit("kick",Math.min(1,.2+o.s*.06),{at:c/343}),w.sound.hit("noise",Math.min(.8,.15+o.s*.05),{cutoff:900,dur:1.4,at:c/343}),o.emitted++}o.lastSign=l,(Math.abs(o.phi-o.phiT)<.004&&Math.abs(o.dphi)<.004||o.emitted>5)&&(o.rb=ke(xe(o.ax[0],0,o.ax[2],o.phi),o.rb),o.rad=o.s*Math.max(...Q[o.proto]),o.phi=0,o.dphi=0,o.rolling=!1,o.calf=0)}const s=o.rolling?ke(xe(o.ax[0],0,o.ax[2],o.phi),o.rb):o.rb;o.M=s;const n=vt(o.x,o.z),i=(o.lift-Me-.22*(1-Math.abs(s[4])))*Ie(o,s)+n[0]*.8;if(o.held>0)o.vy=0;else if(o.y>i+.05&&o.calf)o.vy-=9.8*t;else{const l=2.4/Math.sqrt(1+o.s*.12);o.vy+=(l*l*(i-o.y)-1.1*l*o.vy)*t}o.y+=o.vy*t,o.w=1,o.wgx=n[1],o.wgz=n[2]}};let Ae=null,at,yt,gt,Et;const Co=()=>{const t=g.length;(!Ae||Ae.length<t)&&(Ae=new Float64Array(t),at=new Float64Array(t),yt=new Float64Array(t),gt=new Float64Array(t),Et=new Uint8Array(t));for(let a=0;a<t;a++){const o=g[a];Ae[a]=o.x,at[a]=o.z,yt[a]=o.rad,gt[a]=o.s,Et[a]=o.ground?1:0}ro(t,Ae,at,yt,gt,Et);for(let a=0;a<t;a++){const o=g[a];o.x=Ae[a],o.z=at[a]}},qo=t=>{const a=(r()-.5)*1.6,[o,s]=S(a,Te*.85);t.x=o,t.z=s,t.y=-Me*Ie(t,t.rb)},zt=new Float32Array(16),oo=new Float32Array(16),I=new Float32Array(192*21),ao=(t,a)=>{a=Math.min(.1,Math.max(0,a||0)),_o(a);const o=a>.034?Math.ceil(a*30-1e-6):Math.max(1,Math.ceil(a/(1/60)));for(let h=0;h<o&&a>0;h++)to(a/o);a>0&&Co();for(const h of g)h.M||to(0);if(T>Jt&&(Jt=T+.15+r()*.9,w.sound.hit("hat",.03+r()*.05)),T>$t&&($t=T+9+r()*18,w.sound.hit("snare",.06+r()*.06),w.sound.note(26+r()*4,{dur:1.5,vel:.12,wave:"sine",attack:.05})),T>et&&(et=T+35+r()*80,Do(tt!==null?tt:(r()-.5)*1.4),tt=null),T>ot){ot=T+30+r()*70;let h=wt;if(wt=null,!h)for(let M=0;M<12;M++){const C=g[1+Math.floor(r()*(g.length-1))],K=Math.hypot(C.x-v.x,C.z-v.z);if(C.s>1.5&&C.s<10&&K>30&&K<500&&!C.ground){h=C;break}}h&&Uo(h,h.s>4)}for(const h of g)!h.calf&&!h.ground&&Math.hypot(h.x-Ge,h.z+230)<30&&qo(h);for(const h of be)if(h.t+=a,h.st===0&&h.t>0&&T>5){if(h.t>8+r()*10){const M=(r()-.5)*6.28,C=34+r()*150,[K,Z]=S(M,C);Re(v.x+K,v.z+Z,5)&&!g.some(ye=>Math.hypot(ye.x-v.x-K,ye.z-v.z-Z)<ye.rad+3)?Xt(h,v.x+K,v.z+Z):h.t=0}}else h.st===1&&h.t>.9?(h.st=2,h.t=0):h.st===2&&h.t>7+r()*.02*300?(h.st=3,h.t=0):h.st===3&&h.t>.8&&(h.st=0,h.t=0,Ce(h.x,h.z,.03,.5,.12),w.sound.hit("noise",.06,{cutoff:1500,dur:.2}));for(const h of Gt)h.a+=h.w*a*.4,h.ph+=h.f*a;Rt&&T>eo&&(eo=T+4+r()*7,w.sound.note(90+r()*4,{dur:.07,vel:.05,wave:"square",cutoff:3500}),w.sound.note(88+r()*3,{dur:.09,vel:.04,wave:"square",cutoff:3e3,at:.11}));const s=vt(v.x,v.z),n=w.view||bt;xt=At+Math.max(-.4,Math.min(.4,s[0]))+(n.y||0);const i=v.pitch+Math.max(-.05,Math.min(.05,(s[1]*Math.sin(v.yaw)+s[2]*Math.cos(v.yaw))*.4)),l=Math.cos(i),f=[Math.sin(v.yaw)*l,Math.sin(i),Math.cos(v.yaw)*l],c=[Math.cos(v.yaw),0,-Math.sin(v.yaw)],u=[f[1]*c[2]-f[2]*c[1],f[2]*c[0]-f[0]*c[2],f[0]*c[1]-f[1]*c[0]],p=.1,m=5e3,x=(m+p)/(m-p),y=-2*m*p/(m-p),E=[v.x+(n.x||0),xt,v.z+(n.z||0)],j=-(c[0]*E[0]+c[1]*E[1]+c[2]*E[2]),H=-(u[0]*E[0]+u[1]*E[1]+u[2]*E[2]),X=-(f[0]*E[0]+f[1]*E[1]+f[2]*E[2]);oo.set([c[0]/ee,u[0]/ee,x*f[0],f[0],c[1]/ee,u[1]/ee,x*f[1],f[1],c[2]/ee,u[2]/ee,x*f[2],f[2],j/ee,H/ee,x*X+y,X]);const ue=2*ee/R;zt.set([E[0],E[1],E[2],T,f[0],f[1],f[2],ee,c[0],c[1],c[2],je[1],R,R,Math.atan2(fe,he),je[0]]);let ne=0;const so=(h,M,C,K,Z,ye,Io,Ho,Xo,Go,Oo)=>{if(ne>=192)return;const V=ne*21;I[V]=h,I[V+1]=M,I[V+2]=C,I[V+3]=K;for(let st=0;st<9;st++)I[V+4+st]=Z[st];I[V+13]=ye[0],I[V+14]=ye[1],I[V+15]=ye[2],I[V+16]=Io,I[V+17]=Ho,I[V+18]=Xo,I[V+19]=Go,I[V+20]=Oo,ne++};for(const h of g){let M=h.M||h.rb;if(h.w&&!h.ground){const C=h.wgx,K=h.wgz,Z=Math.hypot(C,K);Z>1e-5&&(M=zo(go,Eo(yo,K/Z,0,-C/Z,Math.min(.08,Z*.5)),M))}so(h.x,h.y,h.z,h.s,M,Q[h.proto],h.proto,0,h.ash,h.seed,Ve[h.proto])}for(const h of be){if(h.st===0)continue;const M=h.st===1?h.t/.9:h.st===3?1-h.t/.8:1,C=vt(h.x,h.z)[0],K=-.5+.56*Math.min(1,M)+.025*Math.sin(T*1.7+h.look)+C,Z=ke(ut(h.yaw+.5*Math.sin(T*.37+h.look)*(h.st===2?1:0)),xe(1,0,0,h.st===3?.5*(1-M):-.12));so(h.x,K,h.z,.2,Z,[1.15,1.5,1.6],0,1,0,h.look,0)}_e.fill(0),we.forEach((h,M)=>{_e.set([h.x,h.z,h.t0,h.amp,h.Lw,h.decay,0,0],M*8)}),qe.forEach((h,M)=>{_e.set([h.x,h.y,h.z,h.t0,h.sz,0,0,0],64+M*8)}),_e.set([we.length,qe.length,0,0],192),A===2&&a>0&&Ht(T,6),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindBuffer(e.ARRAY_BUFFER,d.ib),e.bufferSubData(e.ARRAY_BUFFER,0,I.subarray(0,ne*21)),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,d.ev),e.texSubImage2D(e.TEXTURE_2D,0,0,0,16,4,e.RGBA,e.FLOAT,_e);const ie=d.pr.berg;e.useProgram(ie.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,d.vol),e.uniform1i(ie.u.uVol,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,d.det),e.uniform1i(ie.u.uDet,1),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_3D,Wt),e.uniform1i(ie.u.uHv,6),e.uniform4fv(ie.u.uHB,Kt),e.uniform4fv(ie.u.uL,Oe),e.uniformMatrix4fv(ie.u.uVP,!1,oo),e.uniform4fv(ie.u.uC,zt),e.bindVertexArray(d.vao),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.depthMask(!0);for(const h of[0,1]){const M=h?Qe.refl:Qe.main;e.bindFramebuffer(e.FRAMEBUFFER,M.f),e.viewport(0,0,M.w,M.h),e.clearBufferfv(e.COLOR,0,h?[0,0,0,0]:[0,0,0,d.fl?6e4:1]),e.clearBufferfi(e.DEPTH_STENCIL,0,1,0),e.uniform4f(ie.u.uM,h,ue,d.dec[0],d.dec[1]),ne&&e.drawArraysInstanced(e.TRIANGLES,0,36,ne)}e.disable(e.DEPTH_TEST),e.bindFramebuffer(e.FRAMEBUFFER,null),e.flush(),e.viewport(0,0,R,R);const te=d.pr.comp;e.useProgram(te.p),e.bindVertexArray(d.vao0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Qe.main.t),e.uniform1i(te.u.uBerg,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Qe.refl.t),e.uniform1i(te.u.uRefl,1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ct),e.uniform1i(te.u.uBand,2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,d.noise),e.uniform1i(te.u.uN,3),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,d.ev),e.uniform1i(te.u.uEv,4),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,qt),e.uniform1i(te.u.uSky,5),e.uniform4fv(te.u.uL,Oe),e.uniform4fv(te.u.uC,zt),e.uniform4f(te.u.uBR,ct,ft,nt,kt),e.uniform4f(te.u.uK,je[0],je[1],ue,Math.min(1,Math.hypot(fe,he)/6)),e.drawArrays(e.TRIANGLES,0,3)};return ao(0,0),ao}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
