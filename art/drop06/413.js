// First Rain: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/413.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Qt){Qt&&Qt.add({num:413,name:"First Rain",fam:"Worlds",recipe:"Big first drops of a storm landing on dry ground: each one makes a little dent, throws out wet crumbs and a puff of dust, then soaks into a ragged dark spot. The ground, the light, the wind and the view change every mint. Tap to drop one big raindrop (tap the same spot again for a puddle), hold for a shower that eases when you let go, or drag to scuff a groove in the dust or smear the mud.",interactive:"Tap to drop one big raindrop (tap the same place again to deepen it into a puddle), hold for a shower that eases when you let go, drag to scuff a groove in the dust or smear the mud",music:!0,gl:!0,fps:30,seed:0,make(y){const t=y.gl;let ot=2654435769;for(let e=2;e<66;e+=8)ot=Math.imul(ot^parseInt(y.hash.slice(e,e+8),16),2246822507)>>>0;let dt=ot||1;const i=()=>{dt=dt+1831565813|0;let e=Math.imul(dt^dt>>>15,1|dt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},st=0&&{"0x5abf8f4e":{"On the ground":2,View:2},"0x0a5c83e1":{Ground:2,Light:0,View:2},"0xac819c25":{Ground:0,Light:0,View:1},"0xae7511fd":{Ground:1,Light:1,View:0},"0x6df2c4bf":{Ground:2,Light:1,View:0},"0xf9adac90":{Ground:4,Light:1,View:0},"0xfa37a080":{Ground:5,Light:1,View:0},"0x369f71af":{Ground:0,Light:1,Rain:0,View:0},"0x999ba497":{Ground:0,Light:1,Rain:2,View:0},"0x4e4feb5f":{Ground:2,Light:0,View:1},"0x91c6cb52":{Ground:2,Light:1,View:0},"0xa30a58d7":{Ground:5,Light:1,View:0},"0x0961a28a":{Ground:4,Light:1,View:0},"0xcd53e89d":{Ground:1,Light:1,View:0},"0xc3f831da":{Ground:2,Light:1,View:1},"0xbbf9219d":{Ground:4,Light:0,"On the ground":2,View:2}}[y.hash.slice(0,10)]||null,C=(e,a,s)=>{let r=0;for(const c of a)r+=c[1];let n=i()*r,l=0;for(;l<a.length-1&&(n-=a[l][1],!(n<0));l++);return y.home&&s!==void 0&&(l=s),st&&st[e]!==void 0&&(l=Math.min(st[e],a.length-1)),y.trait(e,a[l][0]),l},D=C("Ground",[["Pale dust track",30],["Red desert sand",20],["Grey ash",16],["Dusty flagstone",0],["Dry riverbed",12],["Pollen on slate",10]],0),N=C("Light",[["Storm grey",26],["Low sun under the cloud",48],["Hail",9]],1),Ne=C("Drops",[["Small",25],["Big",50],["Fat",25]],1),Jt=C("Rain",[["First drops",45],["Steady",40],["Downpour coming",15]],1),Yt=D<=2?[["Bare",22],["Pebbles",28],["Dry leaves",18],["Footprint",20],["Ants' nest",12]]:[["Bare",40],["Pebbles",25],["Dry leaves",35]];let qe=C("On the ground",Yt,1);const Te=Yt[qe][0],q=["Bare","Pebbles","Dry leaves","Footprint","Ants' nest"].indexOf(Te),Ge=C("Wind",[["Still",55],["Gusty",45]],0),Le=C("Before",[["Dry for weeks",72],["Yesterday's drops",28]],0);let pt=Math.imul(ot^1540483477,668265263)>>>0||7;const T=()=>{pt=pt+1831565813|0;let e=Math.imul(pt^pt>>>15,1|pt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},yt=T()*6.2832,qt=T()*50,De=.26+T()*.2,$t=T()*100,te=T()*6.2832,ee=[T(),T()],eo=T(),Ee=y.home?0:20+T()*400,mt=st&&st.View!==void 0?st.View:y.home||$t<55?0:$t<80?1:2;y.trait("View",["Straight down","Low and raking","Close"][mt]);const b=[{ts:.15,inf:.01,dr:6e-4,Dm:1,rd:.72,rw:1.6,stK:3.5,pin:.18,covT:.35,wd:.42,cs:1,hd:.2,mp:.14,wk:2.8,wt:1,puff:.55,dust:[.56,.45,.32],sh:.5},{ts:.18,inf:.03,dr:.001,Dm:.55,rd:.65,rw:1.1,stK:0,pin:.12,covT:.5,wd:.5,cs:.72,hd:.19,mp:0,wk:2.5,wt:.45,puff:.12,dust:[.58,.24,.11],sh:1.4},{ts:.16,inf:.007,dr:5e-4,Dm:.9,rd:.85,rw:1.8,stK:2.5,pin:.25,covT:.5,wd:.64,cs:1.25,hd:.24,mp:.5,wk:2.4,wt:1.4,puff:1,dust:[.36,.36,.34],sh:.4},{ts:.09,inf:.008,dr:3e-4,Dm:.5,rd:.7,rw:1.5,stK:2,pin:.22,covT:.12,wd:.66,cs:1,hd:.22,mp:.05,wk:1.8,wt:2,puff:.4,dust:[.5,.42,.31],sh:.7},{ts:.08,inf:.004,dr:2e-4,Dm:.35,rd:.8,rw:1.6,stK:3,pin:.22,covT:.06,wd:.55,cs:.95,hd:.2,mp:0,wk:2.4,wt:3,puff:.3,dust:[.52,.44,.33],sh:.6},{ts:.06,inf:0,dr:0,Dm:0,rd:.9,rw:1.5,stK:6,pin:.3,covT:.04,wd:.72,cs:.7,hd:.2,mp:.25,wk:0,wt:1,puff:.5,dust:[.7,.46,.05],sh:.6}][D],Ae=[.72,1,1.22][Ne],Fe=[.55,1.5,3.2][Jt],j=Ge===1,at=i()*6.2832,Pe=N===2,Tt=(N===1?i()<.5?.35:2.8:1.9+i()*.9)+(i()-.5)*.5,Gt=N===1?.15+i()*.06:N===2?.62:.42,Lt=[Math.cos(Tt)*Math.cos(Gt),Math.sin(Tt)*Math.cos(Gt),Math.sin(Gt)],z=[{sc:[1,1,.97],si:1.5,sky:[.62,.66,.71],ki:.95,soft:.6,ex:.5,gr:[.97,.99,1.03],sat:.78,osh:.25},{sc:[1,.64,.34],si:6,sky:[.34,.4,.54],ki:.62,soft:.05,ex:.78,gr:[1.02,.98,.93],sat:.95,osh:.8},{sc:[.92,.96,1],si:1.6,sky:[.7,.76,.83],ki:.7,soft:.4,ex:.47,gr:[.95,.99,1.04],sat:.72,osh:.3}][N],_=`#version 300 es
precision highp float; precision highp int;
layout(std140) uniform F { vec4 g[20]; vec4 imp[72]; vec4 obj[48]; vec4 seg[8]; };
const float N = 640., W = 430., DX = 430. / 640.;
const vec2 O = vec2(-215., -40.);
float h12(vec2 p){ vec3 q = fract(vec3(p.xyx) * .1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
vec2 h22(vec2 p){ vec3 q = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); q += dot(q, q.yzx + 33.33); return fract((q.xx + q.yz) * q.zy); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h12(i), h12(i + vec2(1, 0)), f.x), mix(h12(i + vec2(0, 1)), h12(i + 1.), f.x), f.y); }
float nA(float ph, float n, float sd){ float x = (ph / 6.2832 + .5) * n; float i = floor(x), f = fract(x); f = f * f * (3. - 2. * f);
  return mix(h12(vec2(mod(i, n), sd)), h12(vec2(mod(i + 1., n), sd)), f); }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
vec4 dec(vec4 r){ return r * g[4] + g[5]; }
vec4 enc(vec4 s){ return (s - g[5]) / g[4]; }
vec4 decG(vec4 r){ return r * g[12] + g[13]; }
`,je=`#version 300 es
out vec2 vUv; void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,_e=_+`#define GR ${D}
uniform int uPass, uZ, uDb; uniform vec4 uSd, uP, uQ, uR;
in vec2 vUv; out vec4 o;
float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < uZ + 5; i++){ s += a * vn(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p + 7.3; a *= .5; } return s / .97; }
vec3 vor(vec2 p, out vec2 cc){ vec2 i = floor(p), f = fract(p); float d1 = 9., d2 = 9.; cc = vec2(0); float id = 0.;
  for (int y = -1; y <= uZ + 1; y++) for (int x = -1; x <= uZ + 1; x++){ vec2 o2 = vec2(x, y); vec2 hp = h22(i + o2) * .9 + .05; vec2 r = o2 + hp - f; float d = dot(r, r);
    if (d < d1){ d2 = d1; d1 = d; cc = i + o2 + hp; id = h12(i + o2 + 17.); } else if (d < d2) d2 = d; }
  return vec3(sqrt(d1), sqrt(d2), id); }
mat2 rot(float a){ return mat2(cos(a), sin(a), -sin(a), cos(a)); }
// every noise lookup of a ground in one loop, so vn is inlined once: entries below NF are fbm, the rest single vn
#if GR == 0
#define NF 4
#define NT 10
#define NIN j == 2 ? p / 30. + 3. : j == 3 ? p / 1.3 : j == 6 ? vec2(al0 / 60., 1.7) : j == 7 ? p / 7. : j == 8 ? p / 9. : p * .7
#elif GR == 1
#define NF 3
#define NT 5
#define NIN p / 160. + 3.
#elif GR == 2
#define NF 3
#define NT 8
#define NIN j == 2 ? p / .9 : j == 5 ? p * .8 : j == 6 ? p * 2. : p * 3.
#elif GR == 4
#define NF 2
#define NT 5
#define NIN p / 20.
#elif GR == 5
#define NF 5
#define NT 8
#define NIN j == 2 ? p / 90. : j == 3 ? p / 30. + 5. : j == 4 ? p / 6. + 2. : p / 2.
#else
#define NF 2
#define NT 4
#define NIN p
#endif
void ground(vec2 p, out vec4 G, out vec4 D, out vec4 S){
  vec2 eN = p - uQ.xy; eN = eN / max(length(eN), .01) * 1.15 + 3.;
#if GR == 0
  vec2 rd0 = vec2(cos(uP.z), sin(uP.z)); float al0 = dot(p - uP.xy, rd0);
#endif
  float NZ[NT];
  for (int j = 0; j < NT + uZ; j++){
    vec2 q = j == 0 ? p / 70. + uSd.xy : j == 1 ? p / 14. + uSd.zw : j == NF ? p / 2.2 + uSd.yx : j == NF + 1 ? eN : NIN;
    bool fb = j < NF; float s = 0., a = fb ? .5 : 1.;
    for (int i = 0; i < (fb ? 5 : 1) + uZ; i++){ s += a * vn(q); q = mat2(1.6, 1.2, -1.2, 1.6) * q + 7.3; a *= .5; }
    NZ[j] = fb ? s / .97 : s;
  }
  float n1 = NZ[0], n2 = NZ[1], n3 = NZ[NF];
  float gr = h12(floor(p / .42) + uSd.xy * 100.), gr2 = h12(floor(p / .42) + 31.7);
  float fl, du, perm = 1., hyd = .5, dm = .5, sm = .5, rlf = 0.; vec3 dc, sc;
#if GR == 0
  { // dust track with a tyre rut
    float surf = 2.2 * (n1 - .5) + .7 * (n2 - .5);
    vec2 rd = vec2(cos(uP.z), sin(uP.z)); vec2 q = p - uP.xy;
    float al = dot(q, rd), ac = dot(q, vec2(-rd.y, rd.x)) + 6. * sin(al / 180. + uSd.x * 6.) + 9. * (NZ[6] - .5);
    float depR = 1.5 + .7 * sin(al / 95. + 1.3) + 1.4 * (n2 - .5);
    float inR = smoothstep(46. + 10. * n2, 14., abs(ac));
    float berm = .45 * exp(-pow((abs(ac) - 48.) / 14., 2.)) * (.3 + 1.4 * n2);
    float lj = fract((al + abs(ac) * .7 + 3. * NZ[7]) / 13.);
    float lug = smoothstep(.36, .5, lj) * smoothstep(.98, .84, lj) * smoothstep(25., 20., abs(ac) + 3. * NZ[8]) * smoothstep(.55, .8, NZ[2]) * (.5 + .5 * NZ[9]);
    surf += -depR * inR + berm + .35 * lug * inR;
    float L = mix(2.5 + 3. * n2, .3 + .35 * n3, inR);
    du = surf; fl = surf - L;
    dc = mix(vec3(.80, .72, .60), vec3(.71, .63, .51), n2) * (.92 + .16 * n1);
    dc *= mix(1., .8, step(.95, gr)) * (.96 + .08 * gr2);
    dm = .5 + .28 * (NZ[3] - .5) + .1 * (gr - .5);
    sc = mix(vec3(.62, .54, .43), vec3(.53, .46, .37), n3) * (1. - .08 * lug);
    sm = .5 + .15 * (n3 - .5) + .2 * lug; perm = 1.; hyd = .55;
  }
#elif GR == 1
  { // red sand with wind ripples
    vec2 rd = vec2(cos(uP.z), sin(uP.z));
    float sx = dot(p, rd) + 46. * NZ[2] + 12. * n2 + 5. * (n1 - .5);
    float ph = fract(sx / (64. + 14. * (n1 - .5)));
    float prof = ph < .72 ? smoothstep(0., .72, ph) : 1. - smoothstep(.72, 1., ph);
    float crest = exp(-pow((ph - .72) / .07, 2.));
    du = 2.8 * prof + 1.5 * (n1 - .5); fl = du - 25.; rlf = 2.8 * (prof - .5);
    float gs = h12(floor(p / .38) + uSd.xy * 50.), gv = h12(floor(p / .38) + 5.);
    vec3 b = mix(vec3(.66, .47, .39), vec3(.57, .39, .32), n2);
    b = gs > .95 - .05 * crest ? vec3(.86, .80, .72) : gs < .05 + .16 * crest ? vec3(.24, .17, .15) : b * (.86 + .26 * gv);
    dc = b * mix(1., .86, crest); dm = .5 + .36 * (gv - .5) + .1 * crest;
    sc = dc * .9; sm = dm; perm = 1.; hyd = .05;
  }
#elif GR == 2
  { // grey ash with charcoal
    du = 3.5 * (n1 - .5) + .8 * (n2 - .5); fl = du - 12.;
    dc = mix(vec3(.66, .675, .70), vec3(.54, .555, .58), n2) * (.94 + .12 * n1);
    dc = mix(dc, vec3(.9), step(.985, gr)); dc = mix(dc, vec3(.12), step(.975, gr2) * .7);
    dm = .5 + .22 * (NZ[2] - .5);
    sc = vec3(.42, .43, .45) * (.9 + .2 * n3); sm = .5;
    vec2 cc; vec3 v = vor(p / 6.5 + uSd.xy, cc); float ce = (v.y - v.x) * 3.25;
    if (v.z < (uDb == 1 ? .05 : .009) && ce > .35 + .5 * NZ[5]){ vec2 e = p;
      float dd = -(ce - .35);
      { float top = du - .5 + .75 * min(1., -dd / .8) + .2 * NZ[6]; if (top > fl){ fl = top; du = top;
        sc = vec3(.13, .125, .125) * (1. + .6 * NZ[6]); sc += vec3(.06) * step(.92, fract(e.x / 1.7));
        sm = .5 + .3 * step(.9, fract(e.x / 1.7)) + .1 * NZ[7]; perm = .2; } } }
    perm *= .9; hyd = 1.;
  }
#elif GR == 3
  { // flagstones with dust in the joints
    vec2 cc; vec3 v = vor(p / 150. + uSd.xy, cc); float edge = (v.y - v.x) * 75.;
    float jw = 7. + 5. * vn(p / 40.);
    float inJ = smoothstep(jw, jw - 3., edge);
    vec2 tl = (h22(cc + 2.) - .5) * .012;
    float slab = (v.z - .5) * 3. + dot(p - (cc - uSd.xy) * 150., tl) + .6 * (n2 - .5) + .25 * (vn(p / 3.) - .5);
    float stone = slab - 1.5 * smoothstep(jw + 6., jw, edge);
    fl = mix(stone, slab - 10., smoothstep(.3, .7, inJ));
    float film = .16 * smoothstep(.55, .8, fbm(p / 45.)) + .25 * smoothstep(jw + 12., jw, edge);
    du = mix(stone + film, slab - 4. + (n2 - .5), inJ);
    dc = vec3(.74, .68, .58) * (.94 + .12 * n2) * mix(1., .6, step(.95, gr));
    dm = .5 + .2 * (fbm(p / 1.1) - .5);
    vec3 st = mix(vec3(.56, .52, .46), vec3(.44, .43, .41), v.z) * (.78 + .4 * fbm(p / 9.)) * (.9 + .2 * vn(p / 1.3));
    st *= mix(1., .7, step(.9, gr)); st = mix(st, st * 1.12, smoothstep(.45, .5, fract(dot(p, tl * 900.) / 9.)) * .4);
        sc = st; sm = .5 + .3 * (vn(p / 1.2) - .5) + .15 * (vn(p / .45) - .5) - .2 * step(.96, gr2);
    perm = mix(.2, 1., inJ); hyd = .3;
  }
#elif GR == 4
  { // cracked riverbed with curled mud
    // both Voronoi lookups in one loop (one vor inline)
    vec2 cc = vec2(0); vec3 v = vec3(0), v2 = vec3(0);
    for (int j = 0; j < 2 + uZ; j++){ vec2 cq; vec3 r = vor(j == 0 ? p / 75. + uSd.zw : p / 11. + 2.3, cq); if (j == 0){ v = r; cc = cq; } else v2 = r; }
    float edge = (v.y - v.x) * 37.5;
    // a younger crack splits some plates: a line across the plate that ends on the old cracks (T-joints)
    vec2 cq = p / 75. + uSd.zw; float sa = h12(cc + 31.) * 3.1416; vec2 sn = vec2(cos(sa), sin(sa));
    float l2 = abs(dot(cq - cc + (h22(cc + 5.) - .5) * .25, sn)) * 75.;
    float split = step(.45, h12(cc + 33.));
    float cw = (1.2 + 2.6 * h12(cc + 4.)) * (.25 + 1.1 * smoothstep(.2, .75, NZ[4]));
    float cw2 = (.6 + 1.2 * h12(cc + 6.)) * smoothstep(.15, .7, NZ[4]) * split;
    float eA = split > .5 ? min(edge, l2 + max(0., cw - cw2)) : edge;
    float crack = max(smoothstep(cw, cw - 1.4, edge), smoothstep(cw2, cw2 - 1., l2) * split);
    float curl = .5 + 1.5 * h12(cc + 8.);
    // each plate a smooth dish whose rim curls up toward its cracks
    float lip = curl * (3.2 * v.x * v.x + 1.4 * pow(smoothstep(12., 0., eA), 2.));
    float e2 = (v2.y - v2.x) * 5.5;
    float craze = smoothstep(.55, .1, e2) * (1. - crack) * smoothstep(.4, .7, NZ[4]);
    // loose flakes that curled off, and the darker layer where one lifted
    float fk = v2.z * step(9., eA), flake = step(.982, fk) * smoothstep(.0, 2.2, e2), scar = step(.962, fk) * step(fk, .982) * smoothstep(.2, 2.5, e2);
    float top = (v.z - .5) * 1.2 + lip + .3 * (n2 - .5) + flake * (.5 + .9 * smoothstep(1.2, .2, e2)) - .15 * scar;
    fl = mix(top, top - 12., crack); du = fl + mix(.1, 3., crack);
    sc = mix(vec3(.66, .58, .47), vec3(.57, .49, .39), n2) * (.92 + .16 * n3);
    sc = mix(sc, vec3(.74, .68, .58), smoothstep(.5, 2.5, lip) * .5 + flake * .4);
    sc = mix(sc, vec3(.45, .37, .29), scar * .7);
    sc = mix(sc, vec3(.27, .22, .17), crack) * (1. - .2 * craze);
    sm = .5 - .3 * craze + .1 * (n3 - .5);
    dc = vec3(.77, .71, .61) * (.95 + .1 * n2); dm = .5 + .1 * (n3 - .5);
    perm = mix(.06, 1., crack); hyd = .15;
  }
#else
  { // slate with a film of pollen
    vec2 rd = vec2(cos(uP.z), sin(uP.z)); float sx = dot(p, rd) + 8. * NZ[2];
    float k = sx / 38. + .4 * n1; float stp = (floor(k) + smoothstep(0., .18, fract(k))) * .22;
    fl = stp + .4 * (n2 - .5);
    du = fl + .009 + .016 * smoothstep(.3, .8, NZ[4]) + .03 * smoothstep(.6, .85, NZ[3]) * smoothstep(.4, .7, NZ[4]);
    sc = mix(vec3(.30, .325, .36), vec3(.24, .26, .29), n2) * (.9 + .2 * NZ[7]);
    sc = mix(sc, vec3(.34, .24, .16), step(.995, gr) * .6);
    sm = .5 + .1 * (n3 - .5) + .1 * smoothstep(.02, .0, fract(k)) * smoothstep(.3, .6, NZ[4]);
    dc = mix(vec3(.87, .78, .38), vec3(.80, .69, .30), n2) * (.92 + .16 * gr);
    dm = .5 + .2 * (gr - .5); perm = 0.; hyd = .5;
  }
#endif
  // debris (stones, grit and leaves are laid on afterwards by DEBR); footprint and nest come only on soft ground
#if GR <= 2
  if (uDb == 3){ // shoe print: where a walking shoe came down in the dust, a shallow pressure mark, not a cut
    // print coordinates: x along the sole (heel -136, toe +137), yi across, > 0 on the inner side (a left or a right by the angle)
    vec2 e = rot(uQ.z) * (p - uQ.xy); float x = e.x, yi = uQ.z > 3.1416 ? -e.y : e.y;
    float ns = vn(e / 3.1 + 5.) - .5, nb = vn(e / 7.5 + 2.);
    // the plan: the axis bends toward the inner side from the ball forward; the inner side cuts in at the arch, the outer is
    // nearly straight; heel 66 mm across, ball 100, the toe's tip to the inner side
    float xb = max(x - 35., 0.), y = yi - .125 * xb, qo = xb / 98., qi = xb / 104., qa = (x + 28.) / 24., qh = min(x + 100., 0.) / 36.;
    float hO = x < 35. ? mix(33., 47., smoothstep(-70., 30., x)) : 47. * sqrt(max(0., 1. - qo * qo));
    float hI = x < 35. ? mix(33., 53., smoothstep(-20., 35., x)) - 14. * exp(-qa * qa) : 53. * sqrt(max(0., 1. - qi * qi * qi));
    float hw = (y > 0. ? hI : hO) * sqrt(max(0., 1. - qh * qh));
    float d = max(abs(y) - hw, max(x - 136., -134. - x)) + 2.6 * ns, di = -d;
    // the pressure where the weight was: heel (strongest at its rear edge, its block ending in a straight front edge), the
    // ball under the inner joint, the toes; a trace along the outer waist, nothing under the arch
    float ph = smoothstep(1.3, .5, length(vec2((x + 104.) / 34., y / 36.))) * (.72 + .28 * smoothstep(-84., -124., x)) * smoothstep(-58., -63., x + 2. * ns);
    float pb = .9 * smoothstep(1.25, .45, length(vec2((x - 38.) / 36., (y - 8.) / 52.)));
    float pt = .8 * smoothstep(1.2, .4, length(vec2((x - 106.) / 25., (y - 9.) / 44.)));
    float pw = .2 * smoothstep(-6., -24., y) * smoothstep(-66., -52., x) * smoothstep(30., 0., x);
    // the whole forefoot was down at once (ball to toes, starting further back on the outer side): a light even pressure under it
    float fz = smoothstep(-10., 6., x + 4. * ns - .35 * min(y, 0.)), pf = .5 * fz;
    float pr = min(max(max(ph, pb), max(max(pt, pf), pw)) * (.8 + .4 * nb), 1.);
    float ew = mix(4.5, 2.6, pr) * (1. + .9 * ns) * (.7 + .7 * nb), m = smoothstep(ew, -ew, d);
    // the tread as pits: chevron bars folded on the axis (back under the heel, forward under the forefoot), a rib round the
    // edge, a plain oval under the ball; each bar crisp on one wall, crumbled on the other, lost where the weight was light
    bool hz = x < -60.;
    float t = hz ? (x + .45 * abs(y)) / 11. : (x - .5 * abs(y - 4.)) / 10.;
    t += .33 * (nb - .5);
    float f = fract(t), row = floor(t);
    // each half bar is split once more into two lugs (staggered by row), so no wall runs on for more than about 25 mm
    float ay = hz ? abs(y) : abs(y - 4.), sp = (hz ? 16. : 21.) + 3. * step(.5, fract(row * .5));
    float bar = smoothstep(0., .24, f) * smoothstep(.72, .42, f) * smoothstep(8., 10., di) * (hz ? 1. : smoothstep(1., 2.2, ay)) * smoothstep(.6, 1.6, abs(ay - sp));
    float ov = length(vec2((x - 40.) / 19., (y - 6.) / 25.));
    bar = mix(bar, .5 * (1. - smoothstep(.07, .0, abs(ov - .8)) * step(.45, nb)), smoothstep(1.2, 1., ov));
    float mk = max(bar, smoothstep(1., 3.5, di) * smoothstep(7., 5.2, di) * smoothstep(.3, .55, nb)) * (.45 + .55 * step(.2, h12(vec2(row, step(0., y)) + 3.)));
    mk *= smoothstep(.45, .8, pr) * smoothstep(.25, .5, nb + .3 * pr);
    // push-off: a low broken ridge of dust behind the toe pad; a short smooth slip behind the heel; a thin lip outside the heel's rear
    float rdg = (.3 + .5 * nb) * smoothstep(.35, .6, nb) * exp(-(x - 82. + 3. * ns) * (x - 82. + 3. * ns) / 12.25) * smoothstep(1., 6., di);
    float slip = .55 * smoothstep(-148., -134., x + 3. * ns) * smoothstep(-100., -110., x) * smoothstep(26., 6., abs(y));
    float lip = (.15 + .3 * nb) * smoothstep(.3, .6, nb) * exp(-(d - 4.) * (d - 4.) / 12.25) * smoothstep(-104., -122., x);
    // where the sole was down the dust is packed: ripples pressed flat, a little darker, smoother; under soft light (no hard
    // shadows to draw it) the same print is pressed a little deeper
    float pz = pr * m, L0 = du - fl, cz = m * smoothstep(.15, .45, pr), dk = 1. + 1.1 * smoothstep(.1, .4, g[6].w);
    du += -max(pz * (.7 + .5 * mk) * dk, slip) + rdg * m + lip - .85 * rlf * cz;
    fl = du - mix(L0, .5, smoothstep(0., .3, pz));
    float tk = 1. - .12 * cz - .06 * pz * mk; sc *= tk; dc *= tk; dm = mix(dm, .5, smoothstep(.55, 1., m) * max(max(fz, step(x, -60.)) * .3, pr * .5) * (1. + .5 * mk));
  }
  else if (uDb == 4){ // ants' nest
    vec2 e = p - uQ.xy - vec2(2.5, -1.5); float r = length(e) * (1. + .22 * (NZ[NF + 1] - .5));
    vec2 cc = floor(p / 1.05); float gq = h12(cc), crumb = smoothstep(30., 6., r);
    float mound = 5.2 * pow(smoothstep(32., 2., r), 1.4) + .55 * gq * crumb;
    float hole = smoothstep(3.4, 1.9, length(p - uQ.xy));
    du += mound - 14. * hole; fl = min(fl, du - .2 - 4. * hole);
    dc = mix(dc, mix(dc * 1.1, vec3(.86, .8, .7), .3) * (.82 + .36 * gq), crumb);
    dm = mix(dm, .5 + .45 * (gq - .5), crumb);
    dc *= 1. - .85 * hole; sc *= 1. - .85 * hole;
  }
#endif
  G = vec4(fl, max(du, fl), perm, hyd);
  D = vec4(clamp(dc, 0., 1.), clamp(dm, 0., 1.));
  S = vec4(clamp(sc, 0., 1.), clamp(sm, 0., 1.));
}
void main(){
  vec2 p = O + vUv * W;
  vec4 G, D, S; ground(p, G, D, S);
  o = uPass == 0 ? (G - g[13]) / g[12] : uPass == 1 ? D : S;
}`,oe=_+`
uniform int uPass, uN; uniform vec4 uSd, uQ, uK0, uK1; uniform sampler2D uG; in vec2 vUv; out vec4 o;
mat2 rot(float a){ return mat2(cos(a), sin(a), -sin(a), cos(a)); }
// stones and grit: one jittered cell each (no neighbour search), most of them small, sunk in up to half their height
void pebbles(vec2 p, float cell, float dens, float rmin, float rmax, float base, inout float fl, inout float du, inout vec3 sc, inout float sm){
  vec2 c = floor(p / cell + uSd.zw * 7.);
  float gat = smoothstep(.32, .72, vn((c + .5) * cell / 70. + uSd.xy));
  if (h12(c + 17.) < dens * (.25 + 1.5 * gat)){ float rp = mix(rmin, rmax, pow(h12(c + 3.1), 3.2));
    vec2 cp = (c + .5 + (h22(c) - .5) * max(0., 1. - 3.7 * rp / cell) - uSd.zw * 7.) * cell;
    vec2 e = rot(h12(c + 9.) * 6.28) * (p - cp); e.y /= .6 + .35 * h12(c + 5.);
    float d = length(e) / rp * (1. + .22 * (vn(e / rp * 2.2 + c * 7.) - .5));
    if (d < 1.){ float dome = rp * .6 * pow(1. - d * d, .55) * (.7 + .3 * h12(c + 1.)); float top = base - rp * (.2 + .22 * h12(c + 2.)) + dome;
      if (top > fl){ fl = top; du = max(du, top);
        float k = h12(c + 13.); vec3 pc = k < .4 ? vec3(.55, .52, .48) : k < .72 ? vec3(.54, .45, .36) : k < .82 ? vec3(.68, .64, .58) : vec3(.38, .35, .32);
        pc *= .84 + .26 * h12(c + 41.) - .12 * smoothstep(.6, 1., d);
        pc = mix(pc, vec3(.80, .72, .60), smoothstep(.2, .9, 1. - d) * .4 * h12(c + 21.));
        pc = mix(pc, pc * .75, step(.93, h12(floor(e * 3.) + c)));
        sc = pc; sm = .5 + .2 * (vn(e * 1.1) - .5); } } } }
// a dry leaf: a smooth outline (a few soft lobes, no cut notches), an edge curling up off the ground, tan to brown along
// its length, a pale midrib and a few side veins in its colour; its outline is antialiased in the bake (lcov, blended)
float lcov = 0.;
void leaf(vec2 p, vec2 c, float an, float len, float base, inout float fl, inout float du, inout vec3 sc, inout float sm, inout float pm, inout float hy){
  vec2 e = rot(an) * (p - c); float u = e.x / len + .5; float ay = abs(e.y), sd = step(0., e.y), tu = clamp(u, 0., 1.);
  float hw = len * .21 * pow(max(sin(3.1416 * tu), 0.), .7) * (1. + .14 * (vn(vec2(u * 6., c.x + sd * 5.)) - .5)) * (1. - .22 * smoothstep(.7, .92, vn(vec2(u * 3.4, c.y + sd * 9.))));
  float de = hw - ay, aa = uPass == 2 ? W / 1024. * .75 : DX;
  bool stem = u < 0. && u > -.2 && ay < .55 + aa;
  bool inL = u > 0. && u < 1. && de > -aa;
  if (inL || stem){
    float yy = clamp(ay / max(hw, .01), 0., 1.);
    float h = base + .5 + 4.2 * yy * yy * (.7 + .6 * h12(c)) + 1.6 * sin(3.14 * tu);
    h = mix(base, h, clamp(de / aa * .5 + .5, 0., 1.));
    if (stem && !inL) h = base + .9;
    if (h > fl){ fl = h; du = h;
      float k = h12(c + 4.);
      vec3 lc = mix(vec3(.57, .46, .32), vec3(.35, .25, .16), smoothstep(.0, 1., mix(tu, 1. - tu, step(.5, k)) + .35 * (vn(vec2(u * 2.6, c.x * 3.)) - .5)));
      lc *= .94 + .1 * vn(vec2(u * 7., c.y + sd * 3.));
      lc = mix(lc, vec3(.62, .51, .37), smoothstep(.72, 1., yy) * .4);
      float mid = smoothstep(.42, .1, ay) * (1. - .5 * tu);
      float sv = (e.x - ay * 1.25) / (len * .12);
      float vein = smoothstep(.34, .08, abs(fract(sv) - .5) * len * .12 * .62) * smoothstep(.9, .55, yy) * smoothstep(.6, 1.2, ay) * step(.1, tu) * step(tu, .9);
      lc = mix(lc, vec3(.62, .52, .38), max(vein * .28, mid * .6));
      if (stem && !inL) lc = vec3(.45, .32, .2);
      sc = lc; sm = .55; pm = 0.; hy = .8;
      lcov = (stem && !inL) ? clamp((.55 - ay) / aa * .5 + .5, 0., 1.) : clamp(de / aa * .5 + .5, 0., 1.); } } }
void main(){
  vec2 p = O + vUv * W;
  vec4 G = decG(uPass == 0 ? texelFetch(uG, ivec2(gl_FragCoord.xy), 0) : texture(uG, vUv));
  float fl = G.x, du = G.y, perm = G.z, hyd = G.w, sm = .5, base = G.y; vec3 sc = vec3(0);
#if KIND == 0
  for (int k = 0; k < uN; k++){ vec4 K = k == 0 ? uK0 : uK1; pebbles(p + float(k) * 37., K.x, K.y, K.z, K.w, base, fl, du, sc, sm); }
#else
  for (int i = 0; i < uN; i++){ vec2 lc = uQ.xy + vec2(float(i) * 97., float(i) * -61.) + (h22(uSd.xy + float(i)) - .5) * 120.;
    leaf(p, lc, uQ.z + float(i) * 2.1, 46. + 26. * h12(uSd.zw + float(i)), base, fl, du, sc, sm, perm, hyd); }
#endif
  bool hit = fl > G.x + 1e-4;
  if (uPass == 0) o = (vec4(fl, max(du, fl), perm, hyd) - g[13]) / g[12];
  else { if (!hit) discard;
#if KIND == 1
    o = vec4(clamp(sc, 0., 1.), lcov);
#else
    o = vec4(clamp(sc, 0., 1.), clamp(sm, 0., 1.));
#endif
  }
}`,Be=_+`
uniform sampler2D uG; out vec4 o;
void main(){ vec4 G = decG(texelFetch(uG, ivec2(gl_FragCoord.xy), 0)); o = enc(vec4(G.y, 0., 0., 0.)); }`,Ie=_+`
uniform sampler2D uS, uG; out vec4 o;
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 s = dec(texelFetch(uS, ip, 0)); vec4 G = decG(texelFetch(uG, ip, 0));
  float fl = G.x, perm = G.z, hyd = G.w, ts = g[1].x;
  float h = s.x, th = s.y, w = s.z, st = s.w;
  float sat = th / ts;
  float rep = mix(g[2].x, g[2].y, smoothstep(.05, .5, sat));
  float dh = 0., dth = 0., dw = 0., gth = 0., gw = 0.;
  const ivec2 OFF[8] = ivec2[8](ivec2(1, 0), ivec2(-1, 0), ivec2(0, 1), ivec2(0, -1), ivec2(1, 1), ivec2(-1, 1), ivec2(1, -1), ivec2(-1, -1));
  for (int k = 0; k < min(8, int(g[0].x) + 8); k++){
    ivec2 o2 = OFF[k];
    float wt = k < 4 ? 1. : .5, len = k < 4 ? 1. : 1.4142;
    ivec2 jp = clamp(ip + o2, ivec2(0), ivec2(int(N) - 1));
    vec4 n = dec(texelFetch(uS, jp, 0)); vec4 Gn = decG(texelFetch(uG, jp, 0));
    float repn = mix(g[2].x, g[2].y, smoothstep(.05, .5, n.y / ts));
    float lim = .5 * (rep + repn) * len * DX, d = n.x - h;
    if (d > lim) dh += .1 * wt * min(d - lim, max(n.x - Gn.x, 0.));
    else if (-d > lim) dh -= .1 * wt * min(-d - lim, max(h - fl, 0.));
    float ms = clamp(.5 * (th + n.y) / ts, 0., 1.);
    dth += .08 * wt * g[3].x * min(perm, Gn.z) * min(1., 3. * ms * ms * ms + .004) * (n.y - th);
    float de = (n.x + n.z) - (h + w);
    if (de > 0.) dw += .08 * wt * min(max(n.z - g[2].w, 0.), de * .5);
    else dw -= .08 * wt * min(max(w - g[2].w, 0.), -de * .5);
    if (k < 4){ gth += abs(n.y - th); gw += abs(n.z - w); }
  }
  h += dh; th += dth; w += dw;
  vec2 pm = O + (vec2(ip) + .5) * DX;
  // soaking marbles, melting hail
  for (int j = 0; j < min(24, int(g[0].y)); j++){
    vec4 a = obj[j * 2], b = obj[j * 2 + 1];
    if (b.y > 0.){ vec2 d = pm - a.xy; float rr = max(a.z * 2.2, 1.5); float amt = b.y / (3.1416 * rr * rr) * exp(-dot(d, d) / (rr * rr));
      if (perm < .1) w += amt; else th += amt; }
  }
  // scuffs
  for (int k = 0; k < min(4, int(g[0].z)); k++){
    vec4 a = seg[k * 2], b = seg[k * 2 + 1];
    vec2 ba = a.zw - a.xy; float t0 = dot(pm - a.xy, ba) / max(dot(ba, ba), 1e-4), tt = clamp(t0, 0., 1.);
    float dd = length(pm - a.xy - ba * tt), wd = b.x;
    // joints belong to the next segment only, so a drag cuts one even groove instead of a string of beads
    if (dd < wd * 3. && t0 < 1.){
      float gg = exp(-dd * dd / (wd * wd));
      float cut = min(b.y * gg, max(h - fl, 0.));
      h += b.y * .62 * exp(-pow((dd - wd * 1.55) / (wd * .55), 2.)) * smoothstep(0., 1.5, h - fl) - cut;
      // dry dust: the finger turns up the dry under-layer; wet: it smears the mud and brings water up as a shine
      float wetc = smoothstep(.45, .85, th / ts);
      w += wetc * gg * b.z * th * .3; th *= 1. - gg * b.z * mix(.45, .25, wetc); st *= 1. - .8 * gg * b.z;
    }
  }
  // infiltration, ponding, drainage, evaporation, pale fines
  sat = th / ts;
  float rate = g[1].y * perm * mix(1. - hyd * .9, 1., smoothstep(0., .35, sat));
  float inf = min(w, rate * max(0., 1. - sat)); th += inf; w -= inf;
  if (th > ts){ w += th - ts; th = ts; }
  th -= th * g[1].w * perm;
  float e = g[1].z, ew = min(w, e); w -= ew;
  sat = th / ts;
  float eth = min(th, (e - ew) * mix(1.7, .6, clamp(sat, 0., 1.)));
  th -= eth;
  st += g[2].z * (eth * (1. - smoothstep(.05, .45, sat)) * min(gth * 6. / ts, 1.) + ew * .5 * min(gw * 4., 1.));
  st -= st * .08 * smoothstep(.15, .6, sat);
  h = max(h, fl);
  vec4 r = vec4(h, max(th, 0.), max(w, 0.), clamp(st, 0., 1.5));
  float hn = h12(vec2(ip) + fract(g[3].w * 7.13) * 917.) - .5;
  r.yzw += hn * max(abs(r.yzw) * .001, g[14].xyz);
  r.yzw = max(r.yzw, 0.);
  o = enc(r);
}`,Ue=_+`
uniform sampler2D uS, uG; out vec4 o;
float crater(vec2 d, float t, float R, float H, vec2 wd, float an, float sd){
  if (t <= 0.) return 0.;
  float s = 1. - exp(-t / .085);
  float al = dot(d, wd), ac = dot(d, vec2(-wd.y, wd.x));
  vec2 e = vec2((al - an * .5 * R) / (1. + an * 1.1), ac);
  float r = length(e); vec2 u = e / max(r, 1e-4);
  float q = r / (R * (.5 + .5 * s) * (1. + .2 * (vn(u * 1.4 + sd) - .5)));
  // a shallow dish with a low, slightly broken lip, heaped a little downwind
  float bowl = -H * s * pow(max(0., 1. - q * q), 1.5);
  float rim = .22 * H * s * exp(-pow((q - 1.05) / .24, 2.)) * (.55 + .9 * vn(u * 2.6 + sd + 9.)) * max(0., 1. + an * 1.6 * u.x);
  // a small dust-coated pellet in the dish on a quarter of the drops
  float ps = fract(sd * .618);
  vec2 dp = e - R * .5 * (fract(sd * vec2(.137, .291)) - .5) * 2.; float pr = R * (.12 + .08 * ps);
  return bowl + rim + step(.75, ps) * .6 * H * s * exp(-dot(dp, dp) / (pr * pr));
}
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 s = dec(texelFetch(uS, ip, 0)); vec4 G = decG(texelFetch(uG, ip, 0));
  float perm = G.z, hyd = G.w, ts = g[1].x, dh = 0.;
  float h = s.x, th = s.y, w = s.z, st = s.w;
  vec2 pm = O + (vec2(ip) + .5) * DX;
  // drops
  for (int i = 0; i < min(24, int(g[0].x)); i++){
    vec4 a = imp[i * 3], b = imp[i * 3 + 1], c4 = imp[i * 3 + 2];
    vec2 d = pm - a.xy;
    if (dot(d, d) < 30. * a.z * a.z && b.y > b.x){
      vec2 cuv = (a.xy - O) / W;
      vec4 sc = dec(textureLod(uS, cuv, 0.)); vec4 gc = decG(textureLod(uG, cuv, 0.));
      float wc = clamp(sc.y / ts, 0., 1.), fw = smoothstep(.25, .8, sc.z);
      float R = a.z * (1. - .3 * wc) * (1. - .5 * fw);
      float H = min(a.w * (1. - .5 * wc) * (1. - fw), max(sc.x - gc.x, 0.) * 1.1 + .02);
      if (c4.w < .5 || c4.w > 1.5){
        vec2 wd = vec2(cos(b.z), sin(b.z));
        dh = 0.;
        for (int k = 0; k < min(2, int(g[0].x) + 2); k++) dh += (k == 0 ? 1. : -1.) * crater(d, k == 0 ? b.y : b.x, R, H, wd, b.w, c4.z);
        h += dh;
        st += max(dh, 0.) * .25 * step(R * 1.05, length(d));
      }
      float bead = max(clamp(hyd * (1. - wc), 0., 1.) * .8, max(fw, 1. - perm * 4.));
      if (b.x < c4.y && b.y >= c4.y && c4.x > 0.){
        float frac = perm < .05 ? 1. : .35, rb = max(R * (perm < .05 ? 2. : .6), 1.6);
        float amt = c4.x * frac / (3.1416 * rb * rb) * exp(-dot(d, d) / (rb * rb));
        w += amt * bead; th += amt * (1. - bead) * .3;
        // on stone the splash sweeps the pollen film off a disc and leaves it heaped in a thin rim
        if (perm < .05){ float dl = length(d); h -= (h - G.x) * .9 * smoothstep(rb * 1.25, rb * .8, dl * (1. + .15 * (vn(d / max(dl, .01) * 1.6 + c4.z) - .5)));
          h += .035 * exp(-pow((dl - rb * 1.3) / (rb * .22), 2.)); }
        float qr = length(d) / R;
        vec2 wdd = vec2(cos(b.z), sin(b.z)); float side = max(0., 1. + b.w * 1.5 * dot(d, wdd) / max(length(d), .01));
        vec2 cz = floor(pm / 2.6 + c4.z * 7.3); vec2 cj = (h22(cz + 3.1) - .5) * 2.6 * .4;
        float pk = h12(cz + c4.z), inC = smoothstep(1., .45, length(pm - (cz - c4.z * 7.3 + .5) * 2.6 - cj) / (.5 + .6 * h12(cz + 9.)));
        float sp = c4.x * .2 / (3.1416 * R * R) * 13. * step(1. - .85 * side * exp(-(qr - 1.1) * .6), pk) * inC * smoothstep(1., 1.3, qr) * step(qr, 6.);
        sp *= mix(.25, 1., clamp(perm, .3, 1.));
        h += sp * step(.93, pk) * .15;
        if (perm < .1) w += sp * .6; else th += sp;
      }
      // capillary wicking: the wet front runs out like sqrt(t) (Washburn) to a radius set by the bed
      if (b.y > c4.y && b.x < c4.y + g[14].w && c4.x > 0. && perm > .05){
        vec2 dw2 = d - vec2(cos(b.z), sin(b.z)) * b.w * R * 1.3;
        float r = length(dw2); vec2 u = dw2 / max(r, 1e-4);
        float gt = sqrt(clamp((b.y - c4.y) / g[14].w, 0., 1.));
        float rwf = R * g[0].w * .98 * pow(c4.x / 30., .15) * (1. - .25 * bead);
        float rag = .06 + .2 * gt;
        r *= 1. + rag * (.6 * (vn(u * 1.7 + c4.z) - .5) + .3 * (vn(u * 4.8 + c4.z + 4.) - .5));
        r += rwf * rag * .4 * (vn(pm / 1.7 + c4.z) - .5);
        float rf = rwf * (.42 + .58 * gt);
        float tgt = ts * (1.1 - .5 * min(r * r / max(rf * rf, .01), 1.)) * (1. - smoothstep(rf - 1.1, rf + .4, r));
        th = max(th, tgt * min(perm * 14., 1.));
      }
    }
  }
  o = enc(vec4(h, max(th, 0.), max(w, 0.), st));
}`,Ve=_+`
uniform sampler2D uS; out vec4 o;
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy); vec2 uv = (vec2(ip) + .5) / N;
  vec4 s0 = dec(texelFetch(uS, ip, 0)); float h0 = s0.x + s0.z;
  vec3 L = g[6].xyz; vec2 dir = normalize(L.xy + 1e-5); float tanE = L.z / max(length(L.xy), 1e-3);
  float occ = -1.;
  for (int k = 1; k <= 24; k++){ float dist = float(k) * (.7 + float(k) * .1);
    vec4 sk = dec(textureLod(uS, uv + dir * dist / N, 0.));
    occ = max(occ, (sk.x + sk.z - h0) / (dist * DX) - tanE); }
  float sh = 1. - smoothstep(-.3 * g[6].w, g[6].w, occ);
  float ao = 0.;
  for (int k = 0; k < 8; k++){ float a = float(k) * .785 + .3; vec2 d = vec2(cos(a), sin(a));
    vec4 s1 = dec(textureLod(uS, uv + d * 2.5 / N, 0.)), s2 = dec(textureLod(uS, uv + d * 7. / N, 0.));
    ao += max(0., s1.x - s0.x) / (2.5 * DX) + .6 * max(0., s2.x - s0.x) / (7. * DX); }
  o = vec4(sh, clamp(1. - ao * .09, .25, 1.), 0., 1.);
}`,Oe=_+`
uniform sampler2D uS, uG, uA, uB, uL; in vec2 vUv; out vec4 o;
// the storm's shadow: a soft edge on a cloud's lobed outline (rounded bulges of shade, light pinched in between),
// placed per mint; shade is lit by the cloud, its light only slightly cool (g[17].w: how far a warm ground takes the bluer sky)
float cloudS(vec2 pm){ vec2 q = pm + g[18].w * vec2(1., 1.7);
  float dd = dot(pm, g[15].xy) - g[15].z + 40. * (vn(pm / 110. + 3. + g[18].w * vec2(.013, .021)) - .5)
    + 40. * (.38 - abs(2. * vn(q / 72. + 11.) - 1.)) + 12. * (.38 - abs(2. * vn(q / 27. + 5.) - 1.));
  return mix(1., smoothstep(-34., 34., dd), g[15].w); }
vec3 shadeAmb(float cs){ return g[8].rgb * mix(mix(vec3(1.4, 1.25, 1.), vec3(1.05, 1.25, 1.7), g[17].w), vec3(1), cs); }
vec3 skyRad(vec3 R){ vec3 k = g[8].rgb; return mix(k * 1.7, k * .9, clamp(R.z, 0., 1.)) + g[7].rgb * .12 * pow(max(dot(R, g[6].xyz), 0.), 6.); }
// where a point above the ground meets the ground along the eye's ray (bodies are drawn on the ground plane)
vec2 prj(vec2 p, float z){ return g[16].xy + (p - g[16].xy) * g[16].z / max(g[16].z - z, 1.); }
void main(){
  vec2 sxy = (vUv * 2. - 1.) * g[16].w;
  vec3 dir = g[17].xyz + sxy.x * g[18].xyz + sxy.y * g[19].xyz;
  float sd = g[16].z / -dir.z; vec2 pm = g[16].xy + sd * dir.xy; vec2 su = (pm - O) / W;
  vec3 V = normalize(-dir);
  float pxm = g[11].z / sd;
  float bias = max(0., sd - g[11].x) * g[11].y;
  vec4 A = texture(uA, su, bias), B = texture(uB, su, bias);
  vec4 Ab = texture(uA, su, bias + g[19].w), Bb = texture(uB, su, bias + g[19].w);
  vec2 ta = vec2(1. / 1024., 0.);
  float axp = texture(uA, su + ta.xy, bias).a, axm = texture(uA, su - ta.xy, bias).a, ayp = texture(uA, su + ta.yx, bias).a, aym = texture(uA, su - ta.yx, bias).a;
  float bxp = texture(uB, su + ta.xy, bias).a, bxm = texture(uB, su - ta.xy, bias).a, byp = texture(uB, su + ta.yx, bias).a, bym = texture(uB, su - ta.yx, bias).a;
  // the sim grid read through a cubic B-spline (four bilinear taps), so no 640-cell step ever shows in a wet edge or a slope
  vec4 SS[5];
  for (int k = 0; k < min(5, int(g[0].x) + 5); k++){
    vec2 uv = su + (k == 1 ? vec2(.9, 0) : k == 2 ? vec2(-.9, 0) : k == 3 ? vec2(0, .9) : k == 4 ? vec2(0, -.9) : vec2(0)) / N;
    vec2 x = uv * N - .5, i = floor(x), f = x - i, f2 = f * f, f3 = f2 * f;
    vec2 w0 = (1. - 3. * f + 3. * f2 - f3) / 6., w1 = (4. - 6. * f2 + 3. * f3) / 6., w2 = (1. + 3. * f + 3. * f2 - 3. * f3) / 6., w3 = f3 / 6.;
    vec2 s0 = w0 + w1, s1 = w2 + w3, p0 = (i - .5 + w1 / s0) / N, p1 = (i + 1.5 + w3 / s1) / N;
    SS[k] = dec(s0.y * (s0.x * textureLod(uS, p0, 0.) + s1.x * textureLod(uS, vec2(p1.x, p0.y), 0.)) + s1.y * (s0.x * textureLod(uS, vec2(p0.x, p1.y), 0.) + s1.x * textureLod(uS, p1, 0.)));
  }
  vec4 S0 = SS[0], Sxp = SS[1], Sxm = SS[2], Syp = SS[3], Sym = SS[4];
  vec4 Gs = decG(texture(uG, su));
  vec2 L2 = texture(uL, su).rg;
  vec3 Ls = g[6].xyz;
  // the storm's shadow: a soft, ragged edge that creeps over the ground
  float cs = g[15].w > 0. ? cloudS(pm) : 1.;
  // ripples on standing water, ejecta and the crown in flight
  vec2 rip = vec2(0); float spA = 0., spSh = 1., crown = 0.;
  vec2 shOff = -Ls.xy / max(Ls.z, .08);
  for (int i = 0; i < min(24, int(g[0].x)); i++){
    vec4 a = imp[i * 3], b = imp[i * 3 + 1], c4 = imp[i * 3 + 2];
    float age = b.y, R = a.z; vec2 d = pm - a.xy; float r = length(d);
    if (age < 1.6 && r < 60. && S0.z > .08){
      float cph = r - age * 55.;
      rip += d / (r + .001) * cos(cph * 1.4) * exp(-cph * cph / 30.) * exp(-age * 1.8) * .9 / (1. + r * .06) * smoothstep(.08, .4, S0.z);
    }
    if (age < .45 && r < R * 5. && (c4.w < .5 || c4.w > 1.5)){
      float ph = at2(d.y, d.x); float NB = 44., bi = floor((ph / 6.2832 + .5) * NB);
      // the crown: a broken ring of muddy water for the first few frames
      if (age < .11){ float rc = R * (.95 + 5.5 * age); crown = max(crown, exp(-pow((r - rc) / (.16 * R + .5 / pxm), 2.)) * step(.42, h12(vec2(bi, c4.z * 13.))) * (1. - age / .11)); }
      for (int j = 0; j < 2; j++){
        vec2 hs = vec2(bi * 7.13 + float(j) * 3.7, c4.z * 91.); float h1 = h12(hs), h2 = h12(hs + 1.3), h3 = h12(hs + 2.9);
        float ql = 1.1 + 2.6 * h1 * h1, tf = .05 + .14 * h1, tt = age / tf;
        if (tt < 1.){
          float rs = R * (.5 + (ql - .5) * tt), z = 4. * R * (.25 + .6 * h2) * tt * (1. - tt);
          float phs = ((bi + .2 + .6 * h3) / NB - .5) * 6.2832; vec2 pg = a.xy + rs * vec2(cos(phs), sin(phs)), ps = prj(pg, z);
          float sz = .3 + .45 * h2, aa = .6 / pxm;
          spA = max(spA, smoothstep(sz + aa, sz * .3, length(pm - ps)));
          spSh *= 1. - .55 * g[11].w * smoothstep(sz * 1.6 + aa, sz * .3, length(pm - pg - shOff * z));
        }
      }
    }
  }
  // object shadows and contact darkening
  float oSh = 1., oAO = 1.;
  for (int j = 0; j < min(24, int(g[0].y)); j++){
    vec4 a = obj[j * 2], b = obj[j * 2 + 1]; float r = a.z, z = a.w;
    if (b.x > 2.5) continue;
    vec2 sp = a.xy + shOff * (z + r);
    float rs = r * (1. + z * .015);
    oSh *= 1. - g[11].w * .9 * smoothstep(rs * 1.1 + .5, rs * .45, length(pm - sp));
    float dc = length(pm - a.xy);
    oAO *= 1. - .5 * exp(-dc * dc / (r * r * 2.)) * exp(-z / (r * .8));
  }
  float cov = smoothstep(0., g[3].y, S0.x - Gs.x);
  vec3 aD = mix(pow(B.rgb, vec3(2.2)), pow(A.rgb, vec3(2.2)), cov);
  vec3 aB = mix(pow(Bb.rgb, vec3(2.2)), pow(Ab.rgb, vec3(2.2)), cov);
  float sat = clamp(S0.y / g[1].x, 0., 1.2), st = clamp(S0.w, 0., 1.);
  // the wet edge is broken by the grain at the pixel, not by the grid
  float gn = vn(pm * 1.4), grn = mix(B.a - Bb.a, A.a - Ab.a, cov) * 2.4 + .7 * (gn - .5);
  float wq = sat * (1. - .85 * st);
  float wv = smoothstep(.1, .26, wq + grn * .2 * (1. - .65 * min(wq, 1.)));
  float wc = smoothstep(.45, 1.08, wq + grn * .08);
  float film = smoothstep(.03, .35, S0.z);
  wv = max(wv, film); wc = max(wc, film);
  // wet ground is the ground's own colour, deeper and richer: a ramp from a paler fringe to a dark core (grains clump, so less speckle)
  vec3 aW = pow(aB, vec3(1.38)) * g[3].z;
  vec3 alb = mix(aD, mix(aW * 1.6, aW * .6, wc) * (1. - .15 * film), wv);
  alb = mix(alb, mix(alb, vec3(dot(alb, vec3(.333))), .35) * 1.3 + .015, st * (.3 + .45 * (1. - wv)));
  float gx = (Sxp.x - Sxm.x) / (1.8 * DX), gy = (Syp.x - Sym.x) / (1.8 * DX);
  vec2 gm = mix(vec2(bxp - bxm, byp - bym), vec2(axp - axm, ayp - aym), cov) * 1.2 / (2. * .42) * (1. - .6 * max(film, .85 * wv));
  vec3 n = normalize(vec3(-(gx + gm.x), -(gy + gm.y), 1.));
  vec3 nw = normalize(vec3(-(gx + (Sxp.z - Sxm.z) / DX * .5) - rip.x - gm.x * .15, -(gy + (Syp.z - Sym.z) / DX * .5) - rip.y - gm.y * .15, 1.));
  float sh = L2.r * oSh * spSh * mix(.05, 1., cs), ao = L2.g * oAO;
  vec3 amb = shadeAmb(cs);
  vec3 Lf = normalize(vec3(Ls.xy, .9));
  vec3 col = alb * (g[7].rgb * max(dot(n, Ls), 0.) * sh + amb * ao * (.4 + .3 * n.z + .45 * max(dot(n, Lf), 0.)));
  vec3 Rv = reflect(-V, nw);
  float fr = min(.02 + .98 * pow(1. - max(dot(nw, V), 0.), 5.), .3);
  // a wet sheen on the core, a clear mirror on standing water
  float wsp = film + .35 * wc;
  vec3 skR = skyRad(Rv), skV = skyRad(V), skZ = g[8].rgb * .9;
  col += wc * wc * (1. - film) * .05 * smoothstep(.35, .9, gn) * skR * ao;
  col += wsp * (fr + .03 * wc) * (skR * ao * mix(1.4, 1., cs) + pow(max(dot(Rv, Ls), 0.), 300.) * 60. * sh * g[7].rgb);
  vec3 dl = g[9].rgb * (g[7].rgb * max(Ls.z, .2) * .9 * mix(.2, 1., cs) + amb * .9);
  col = mix(col, dl * .85, spA * .9);
  col = mix(col, skV * 1.2 + g[7].rgb * .15 * cs, crown * .75);
  col *= g[7].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  float lu = dot(col, vec3(.2126, .7152, .0722)); col = mix(vec3(lu), col, g[10].w) * g[10].rgb;
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col += (h12(gl_FragCoord.xy) - .5) * .012;
  o = vec4(col, 1.);
}`,Ze=_+`
in vec2 vUv; out vec4 o;
// the storm's shadow: a soft edge on a cloud's lobed outline (rounded bulges of shade, light pinched in between),
// placed per mint; shade is lit by the cloud, its light only slightly cool (g[17].w: how far a warm ground takes the bluer sky)
float cloudS(vec2 pm){ vec2 q = pm + g[18].w * vec2(1., 1.7);
  float dd = dot(pm, g[15].xy) - g[15].z + 40. * (vn(pm / 110. + 3. + g[18].w * vec2(.013, .021)) - .5)
    + 40. * (.38 - abs(2. * vn(q / 72. + 11.) - 1.)) + 12. * (.38 - abs(2. * vn(q / 27. + 5.) - 1.));
  return mix(1., smoothstep(-34., 34., dd), g[15].w); }
vec3 shadeAmb(float cs){ return g[8].rgb * mix(mix(vec3(1.4, 1.25, 1.), vec3(1.05, 1.25, 1.7), g[17].w), vec3(1), cs); }
vec2 prj(vec2 p, float z){ return g[16].xy + (p - g[16].xy) * g[16].z / max(g[16].z - z, 1.); }
vec3 tm(vec3 col){ col *= g[7].w; col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  float lu = dot(col, vec3(.2126, .7152, .0722)); col = mix(vec3(lu), col, g[10].w) * g[10].rgb; return pow(clamp(col, 0., 1.), vec3(1. / 2.2)); }
void main(){
  vec2 sxy = (vUv * 2. - 1.) * g[16].w;
  vec3 dir = g[17].xyz + sxy.x * g[18].xyz + sxy.y * g[19].xyz;
  float sd = g[16].z / -dir.z; vec2 pm = g[16].xy + sd * dir.xy;
  vec3 V = normalize(-dir), Ls = g[6].xyz; float pxm = g[11].z / sd;
  float cs = g[15].w > 0. ? cloudS(pm) : 1.;
  vec3 amb = shadeAmb(cs);
  vec3 skV = mix(g[8].rgb * 1.7, g[8].rgb * .9, clamp(V.z, 0., 1.)), skZ = g[8].rgb * .9;
  vec3 dl = g[9].rgb * (g[7].rgb * max(Ls.z, .2) * .9 * mix(.2, 1., cs) + amb * .9);
  vec3 C = vec3(0); float T = 1.;
  for (int j = 0; j < min(24, int(g[0].y)); j++){
    vec4 a = obj[j * 2], b = obj[j * 2 + 1]; float r = a.z, z = a.w, ty = b.x;
    float al = 0.; vec3 sc = vec3(0);
    if (ty > 4.5){ // a puff of dust thrown off the rim: rises a little, drifts with the wind, thins over a second and a half
      float age = b.z; vec2 cp = prj(a.xy + vec2(cos(b.w), sin(b.w)) * age * z, 9. * age);
      vec2 dq = pm - cp; float rr = r * (1.25 + 2.4 * sqrt(age)), q = length(dq) / rr;
      if (q < 1.3){
        float den = (1. - smoothstep(0., 1.5, age)) * smoothstep(1.25, .35, q * (1. + .3 * (vn(dq / (rr * .3) + b.w) - .5))) * (.4 + .6 * smoothstep(.2, .8, q + .4 * age));
        al = clamp(den * g[8].w * .9, 0., .6); sc = tm(dl * 1.1) * al; }
    } else if (ty > 3.5){ // a bead of muddy water standing in the dish before it sinks in: dark lens, one bright point of sky
      vec2 q = (pm - a.xy) / r; float qq = dot(q, q);
      if (qq < 1.){ float k = smoothstep(1., 1. - 2. / (r * pxm), qq) * b.z;
        vec2 hp = q - normalize(Ls.xy + 1e-4) * .42 - V.xy * .3;
        vec3 hl = skZ * .05 + (skZ * .8 * cs + g[7].rgb * .32 * cs + .25 * g[8].rgb) * exp(-dot(hp, hp) / .035);
        al = 1. - pow(1. - k * (1. - .62 * (1. - .35 * smoothstep(.55, 1., qq))), .45); sc = tm(hl) * k; }
    } else if (ty > 2.5){ // a drop or hailstone in flight: a faint short streak down the view ray, never a disc
      vec2 a0 = prj(a.xy, z), a1 = prj(a.xy, z + 22.);
      vec2 ba = a1 - a0; float tt = clamp(dot(pm - a0, ba) / max(dot(ba, ba), 1e-4), 0., 1.);
      float wq = max(r * .45, .9 / pxm), dd = length(pm - a0 - ba * tt);
      float m = smoothstep(wq, wq * .15, dd) * smoothstep(0., .25, tt) * smoothstep(1., .6, tt) * (.13 + .2 * b.z);
      al = m * .07; sc = tm(skV * .5 + g[7].rgb * .06 * (1. + 2. * b.z)) * m * .6;
    } else { // a body sitting on the ground: its outline on the ground plane, stretched along the eye's line by the slant
      vec2 ap = prj(a.xy, z + r); float ra = r * g[16].z / max(g[16].z - z - r, 1.);
      vec2 dv = pm - ap, vg = normalize(ap - g[16].xy + 1e-4);
      vec2 q = vec2(dot(dv, vg) * max(V.z, .2), dot(dv, vec2(-vg.y, vg.x))) / ra; float qq = dot(q, q);
      if (qq < 1.){
        vec3 ns = vec3(q, sqrt(1. - qq)); float aa = smoothstep(1., 1. - 1.5 / (ra * pxm), qq);
        vec3 Rs = reflect(-V, ns); float fs = .03 + .97 * pow(1. - ns.z, 4.);
        // liquid marble (water cloaked in grains) or hailstone (milky core, clear rind), one shading for both
        bool hl = ty > 1.5;
        float gq = h12(floor(q * ra / .3) + b.w), core = smoothstep(.75, .2, qq + .25 * (gq - .5));
        vec3 base = hl ? vec3(.62, .66, .7) * (.2 + .45 * core) : pow(g[9].rgb, vec3(1.3)) * g[3].z * (.6 + .55 * gq) * (.8 + .4 * b.z);
        vec3 bc = base * (g[7].rgb * (hl ? .25 + .6 * max(dot(ns, Ls), 0.) : max(dot(ns, Ls), 0.)) * cs + amb * (hl ? .7 : .4 + .6 * ns.z));
        bc += hl ? skV * fs * (.8 - .45 * core) : vec3(0);
        bc += pow(max(dot(Rs, Ls), 0.), hl ? 120. : 40.) * g[7].rgb * cs * (hl ? 3. : .5 * step(.93, gq));
        float tr = hl ? .6 * (.8 - .45 * core) : 0.;
        al = aa * (1. - pow(tr, .45)); sc = tm(bc) * aa;
      }
    }
    C = C * (1. - al) + sc; T *= 1. - al;
  }
  o = vec4(C, 1. - T);
}`;let Dt=!1;if(!t.__c413){const e=(s,r)=>{const n=t.createShader(s);return t.shaderSource(n,r),t.compileShader(n),n},a=e(t.VERTEX_SHADER,je);t.__c413={vs:a,sh:e,bakes:{},fsh:{}},Dt=!0}const d=t.__c413,Et=e=>{const a=t.createProgram();return t.attachShader(a,d.vs),t.attachShader(a,e),t.linkProgram(a),a},At=""+D;let B=null;if(!d.bakes[At]){const e=d.sh(t.FRAGMENT_SHADER,_e);B={f:e,p:Et(e)}}const Ft={drops:Ue,sim:Ie,comp:Oe,body:Ze,debr:oe.replace("uniform int uPass",`#define KIND 0
uniform int uPass`),light:Ve,init:Be};if(Dt)for(const e in Ft)d.fsh[e]=d.sh(t.FRAGMENT_SHADER,Ft[e]),d[e]=Et(d.fsh[e]);if(t.flush(),B){if(!t.getProgramParameter(B.p,t.LINK_STATUS))throw new Error("413 bake: "+t.getShaderInfoLog(B.f));const e=t.getUniformBlockIndex(B.p,"F");e!==t.INVALID_INDEX&&t.uniformBlockBinding(B.p,e,0);const a={};for(const s of["uPass","uSd","uP","uQ","uDb"])a[s]=t.getUniformLocation(B.p,s);d.bakes[At]={p:B.p,u:a}}if(Dt){for(const e in Ft){if(!t.getProgramParameter(d[e],t.LINK_STATUS))throw new Error("413 "+e+": "+t.getShaderInfoLog(d.fsh[e])+t.getProgramInfoLog(d[e]));const a=t.getUniformBlockIndex(d[e],"F");a!==t.INVALID_INDEX&&t.uniformBlockBinding(d[e],a,0),t.useProgram(d[e]),["uS","uG","uA","uB","uL"].forEach((s,r)=>{const n=t.getUniformLocation(d[e],s);n&&t.uniform1i(n,r)})}d.vao=t.createVertexArray(),d.half=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"))}const R=d.bakes[At],se=d.half,ct=(e,a,s)=>{const r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r),t.texStorage2D(t.TEXTURE_2D,s?Math.log2(e)+1:1,a,e,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,s?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const n=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,n),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),{t:r,f:n}},Pt=se?t.RGBA16F:t.RGBA8,ut=y.tile?512:1024,jt=ct(ut,t.RGBA8,!0),zt=ct(ut,t.RGBA8,!0),rt=ct(640,Pt,!1),ae=ct(640,t.RGBA8,!1),G=[ct(640,Pt,!1),ct(640,Pt,!1)];let L=0;const _t=t.createBuffer(),m=new Float32Array(148*4),ce=80,re=ce+288,Xe=re+192;t.bindBuffer(t.UNIFORM_BUFFER,_t),t.bufferData(t.UNIFORM_BUFFER,m.byteLength,t.DYNAMIC_DRAW);const g=(e,a,s,r,n)=>{m[e*4]=a,m[e*4+1]=s,m[e*4+2]=r,m[e*4+3]=n};se?(g(4,1,1,1,1),g(5,0,0,0,0),g(12,1,1,1,1),g(13,0,0,0,0),g(14,0,0,0,1)):(g(4,50,1.2,3,1.5),g(5,-30,0,0,0),g(12,50,50,1,1),g(13,-30,-30,0,0),g(14,.6/255,1.5/255,.7/255,0));let I=2e-5;const ne=(e,a,s,r)=>{g(0,e,a,s,b.wk),m[59]=b.wt,g(1,b.ts,b.inf,I,b.dr),g(2,b.rd,b.rw,b.stK,b.pin),g(3,b.Dm,b.covT,b.wd,r),g(6,Lt[0],Lt[1],Lt[2],mt===2?Math.max(z.soft,.2):z.soft),g(7,z.sc[0]*z.si,z.sc[1]*z.si,z.sc[2]*z.si,z.ex),g(8,z.sky[0]*z.ki,z.sky[1]*z.ki,z.sky[2]*z.ki,b.puff),g(9,b.dust[0],b.dust[1],b.dust[2],b.sh*(N===1?1.4:.5)),g(10,z.gr[0],z.gr[1],z.gr[2],z.sat),g(11,h.mipAt,.055,y.size/(2*h.TF),z.osh),g(15,Math.cos(yt),Math.sin(yt),de(r),N===1?1:0),g(16,h.C[0],h.C[1],h.C[2],h.TF),g(17,h.F[0],h.F[1],h.F[2],[1,1,0,.5,.5,0][D]),g(18,h.R[0],h.R[1],h.R[2],Ee),g(19,h.U[0],h.U[1],h.U[2],mt===2?1:2.2)},E=(e,a,s,r,n)=>{t.bindFramebuffer(t.FRAMEBUFFER,a),t.viewport(0,0,s,s),t.useProgram(e),t.bindVertexArray(d.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0);for(let l=0;l<r.length;l++)t.activeTexture(t.TEXTURE0+l),t.bindTexture(t.TEXTURE_2D,r[l]);t.bindBufferBase(t.UNIFORM_BUFFER,0,_t),n&&(t.enable(t.BLEND),t.blendColor(0,0,0,.55),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.CONSTANT_ALPHA,t.ONE_MINUS_SRC_ALPHA)),t.drawArrays(t.TRIANGLES,0,3),n&&t.disable(t.BLEND)},ie=()=>{t.bindBuffer(t.UNIFORM_BUFFER,_t),t.bufferSubData(t.UNIFORM_BUFFER,0,m)},Bt=(e,a,s,r)=>{let n=[a[0]-e[0],a[1]-e[1],a[2]-e[2]];const l=Math.hypot(...n);n=n.map(w=>w/l);let c=[n[1],-n[0],0];const o=Math.hypot(...c);c=c.map(w=>w/o);const x=[c[1]*n[2]-c[2]*n[1],c[2]*n[0]-c[0]*n[2],c[0]*n[1]-c[1]*n[0]];return{C:e,F:n,R:c,U:x,TF:s,mipAt:r}},le=Math.tan(14*Math.PI/180);let h;if(mt===1){const e=N===1?Tt+(te-Math.PI)*.12:te,a=250,s=a/Math.tan(50*Math.PI/180);h=Bt([-Math.cos(e)*s,175-Math.sin(e)*s,a],[0,175,0],.3057,1e5)}else if(mt===2){const e=(ee[0]-.5)*130,a=175+(ee[1]-.5)*130;h=Bt([e,a-300*le,300],[e,a,0],.3057,1e5)}else h=Bt([0,0,600],[0,600*le,0],.3057,640);const K=(e,a)=>{const s=(2*e-1)*h.TF,r=(2*a-1)*h.TF,n=[0,1,2].map(c=>h.F[c]+s*h.R[c]+r*h.U[c]),l=h.C[2]/-n[2];return[h.C[0]+l*n[0],h.C[1]+l*n[1]]},kt=(e,a)=>{const s=Math.floor(e),r=e-s,n=r*r*(3-2*r),l=c=>{let o=Math.imul((c|0)^ot^a,739982445)>>>0;return o=Math.imul(o^o>>>15,695872825)>>>0,((o^o>>>13)>>>0)/4294967296};return l(s)*(1-n)+l(s+1)*n};let fe=0,he=0;const de=e=>fe+130*(kt(e/30+qt,81)-.5)+35*(kt(e/8+qt,119)-.5);{const e=Math.cos(yt),a=Math.sin(yt),s=[];for(let r=0;r<16;r++)for(let n=0;n<16;n++){const l=K((n+.5)/16,(r+.5)/16);s.push(l[0]*e+l[1]*a)}s.sort((r,n)=>r-n),he=s[Math.floor(De*s.length)]}const Ce=i()*3.14,pe=K(.15+i()*.7,.2+i()*.6),Ke=i()*6.28;let H=K(i()<.5?.12+i()*.18:.7+i()*.18,.15+i()*.7);const W=i()*6.28;if(q===3){const e=f=>Math.sqrt(Math.max(0,f)),a=(f,u,p)=>{const v=Math.min(1,Math.max(0,(p-f)/(u-f)));return v*v*(3-2*v)},s=(f,u)=>{const p=Math.max(f-35,0),v=u?f<35?33+20*a(-20,35,f)-14*Math.exp(-(((f+28)/24)**2)):53*e(1-(p/104)**3):f<35?33+14*a(-70,30,f):47*e(1-(p/98)**2);return f<-100?v*e(1-((f+100)/36)**2):v},r=W>Math.PI?-1:1,n=[Math.cos(W),-Math.sin(W)],l=[Math.sin(W),Math.cos(W)],c=[1,0].map(f=>{const u=[];for(let p=-136;p<=137;p+=6)u.push([p,r*((f?1:-1)*s(p,f)+.125*Math.max(p-35,0))]);return u}),o=[];for(let f=-136;f<=137;f+=6)o.push([f,r*.125*Math.max(f-35,0)]);const x=(f,u)=>{const p=[u[0]+f[0]*n[0]+f[1]*l[0]-h.C[0],u[1]+f[0]*n[1]+f[1]*l[1]-h.C[1],-h.C[2]],v=p[0]*h.F[0]+p[1]*h.F[1]+p[2]*h.F[2];return v<1?[-9,-9]:[((p[0]*h.R[0]+p[1]*h.R[1]+p[2]*h.R[2])/v/h.TF+1)/2,((p[0]*h.U[0]+p[1]*h.U[1]+p[2]*h.U[2])/v/h.TF+1)/2]},w=(f,u)=>f[0]>=u&&f[0]<=1-u&&f[1]>=u&&f[1]<=1-u,S=f=>{const u=c.map(k=>k.map(M=>x(M,f)));if(u.every(k=>k.every(M=>w(M,.04))))return!0;for(const k of u){let M=0;for(let P=1;P<k.length;P++){const et=k[P-1],ht=k[P];if(M=[0,1].some(Nt=>[0,1].some(Me=>Math.abs(et[Nt]-Me)<.012&&Math.abs(ht[Nt]-Me)<.012&&et[1-Nt]>0&&et[1-Nt]<1))?M+Math.hypot(ht[0]-et[0],ht[1]-et[1]):0,M>.08)return!1}}const p=o.map(k=>x(k,f)),v=p.map(k=>w(k,0)),wt=v.filter(Boolean).length/p.length;if(wt<.35||wt>.65)return!1;let Se=0;for(let k=1;k<p.length;k++)if(v[k]!==v[k-1]){Se++;const M=p[k-1],P=p[k],et=Math.hypot(P[0]-M[0],P[1]-M[1])+1e-9,ht=v[k]?M:P,Wt=ht[0]<0||ht[0]>1?0:1;if(Math.abs(P[Wt]-M[Wt])/et<.5)return!1}return Se===1};let ft=null,bt=1e18;for(let f=-200;f<=200;f+=5)for(let u=-150;u<=150;u+=5){const p=f*f+1.5*u*u;if(p>=bt)continue;const v=[H[0]+n[0]*f+l[0]*u,H[1]+n[1]*f+l[1]*u];v[0]>-180&&v[0]<180&&v[1]>-10&&v[1]<360&&S(v)&&(ft=v,bt=p)}ft&&(H=ft)}ne(0,0,0,0),ie(),t.useProgram(R.p);const me=[i()*40,i()*40,i()*40,i()*40];t.uniform4f(R.u.uSd,...me),t.uniform4f(R.u.uP,pe[0],pe[1],D===0?Ce:Ke,0),t.uniform4f(R.u.uQ,H[0],H[1],W,3),t.uniform1i(R.u.uDb,q);const It=D===0?2:D===1||q===2?1:0;if(t.uniform1i(R.u.uPass,0),E(R.p,It?G[1].f:rt.f,640,[]),t.useProgram(R.p),t.uniform1i(R.u.uPass,1),E(R.p,jt.f,ut,[]),t.useProgram(R.p),t.uniform1i(R.u.uPass,2),E(R.p,zt.f,ut,[]),It){if(q===2&&!d.debl){const r=d.sh(t.FRAGMENT_SHADER,oe.replace("uniform int uPass",`#define KIND 1
uniform int uPass`));if(d.debl=Et(r),!t.getProgramParameter(d.debl,t.LINK_STATUS))throw new Error("413 leaves: "+t.getShaderInfoLog(r));const n=t.getUniformBlockIndex(d.debl,"F");n!==t.INVALID_INDEX&&t.uniformBlockBinding(d.debl,n,0),t.useProgram(d.debl),t.uniform1i(t.getUniformLocation(d.debl,"uG"),1)}const e=q===2?d.debl:d.debr,a=q===2?"debLU":"debU",s=d[a]||(d[a]=Object.fromEntries(["uPass","uN","uSd","uQ","uK0","uK1"].map(r=>[r,t.getUniformLocation(e,r)])));t.useProgram(e),t.uniform4f(s.uSd,...me),t.uniform4f(s.uQ,H[0],H[1],W,3),t.uniform1i(s.uN,q===2?3:It),D===0?(t.uniform4f(s.uK0,19,q===1?.6:.28,1.4,6),t.uniform4f(s.uK1,7,.2,.5,1.8)):t.uniform4f(s.uK0,30,q===1?.4:.08,1.5,5),t.uniform1i(s.uPass,2),E(e,zt.f,ut,[null,G[1].t],q===2),t.useProgram(e),t.uniform1i(s.uPass,0),E(e,rt.f,640,[null,G[1].t])}t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,jt.t),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,zt.t),t.generateMipmap(t.TEXTURE_2D),t.flush(),E(d.init,G[0].f,640,[G[1].t,rt.t]),t.flush(),L=0;const U=[],V=[],nt=[],Q=[],O=[],F=[],Z=[],He=[1.6,.7,2.2,1.4,1.2,2.4][D],J=48,A=new Float32Array(J*J),ue=(e,a)=>{const s=Math.max(0,Math.min(J-1,(e+215)/430*J|0));return Math.max(0,Math.min(J-1,(a+40)/430*J|0))*J+s};let Ut=0,ve=!1,Rt=4,xe=0;const vt=e=>{ve&&Rt>=1&&(Rt-=1,e())},St=(e,a,s,r,n={})=>{const l=Math.max(2,9.65-10.3*Math.exp(-.6*s)),c=1e3*l*l*s*.001/.072;let o=b.cs*s*.95*Math.pow(c/100,.17),x=o*b.hd*(.24+.18*i()),w=Math.PI*s*s*s/6;r===2&&(o=b.cs*s*.8*(n.dent||1),x=o*.2,w=0);const S=j?.25+i()*.5:.45*Math.pow(i(),2),ft=j?at+(i()-.5)*.6:i()*6.28,bt=ue(e,a),f=A[bt];let u=r;if(r===0&&f>2.2&&!n.tap&&(u=1),r===0&&b.mp>0&&f<.15&&i()<b.mp*(s>2.6?1:.4)&&nt.length<8){const v=i()*6.28,wt=25+i()*55;nt.push({x:e,y:a,vx:Math.cos(v)*wt+(j?Math.cos(at)*30:0),vy:Math.sin(v)*wt+(j?Math.sin(at)*30:0),r:.55*s,V:w*.75,life:8+i()*12,t:0,sd:i()*50,px:e,py:a}),w*=.25}if(r!==2&&(A[bt]+=w/60),U.length>=24||(U.push({x:e,y:a,R:o,H:x,age:n.age||0,wa:ft,an:S,V:w,tw:.12,sd:i()*97,kind:u,final:!!n.final}),n.quiet))return;r===0&&w>0&&(F.length>=6&&F.shift(),F.push({x:e,y:a,r:o*(.34+.12*Math.min(1,s/4))*(u===1?1.3:1),t:0,life:He*(u===1?1.6:1)*(.8+.4*i())*(n.tap?1.4:1)}),u===0&&b.puff>.2&&(Z.length>=6&&Z.shift(),Z.push({x:e,y:a,R:o,t:0,a:j?at+(i()-.5)*.5:ft,sp:j?26+14*i():4+5*i()})));const p=Math.max(-1,Math.min(1,e/200));vt(r===2?()=>{y.sound.hit("click",.5*(n.dent||1),{pan:p}),y.sound.hit("noise",.25,{cutoff:3200,dur:.03,pan:p})}:u===1?()=>{y.sound.hit("blip",.22+.1*i(),{freq:700+1800*i(),pan:p}),y.sound.hit("noise",.18,{cutoff:2400,dur:.05,pan:p})}:()=>{const v=.25+.55*Math.pow(s/5,1.5);y.sound.hit("noise",v*(f>.6?.8:1),{cutoff:(f>.6?900:500)+2400/s,dur:.04+.02*s,pan:p}),s>3.6&&y.sound.hit("kick",.12*s/5,{pan:p})})},We=()=>Math.sqrt(-2*Math.log(1-i()))*Math.cos(6.2832*i()),ge=e=>e?4.3+i()*.9:Math.max(.7,Math.min(5.6,2.3*Ae*Math.exp(.2*We()))),Vt=(e,a,s,r)=>{const n=Pe&&!r&&i()<.55,l=n?5+i()*6:ge(s);V.push({x:e,y:a,d:l,tl:n?.2:.12,hail:n,tap:!!r})},Ot=()=>K(i(),i()),Qe=(e,a,s)=>{const r=Math.floor(e),n=e-r,l=n*n*(3-2*n);return kt(a+37.1*r,s)*(1-l)+kt(a+37.1*(r+1),s)*l},be=e=>{let a=Ot();for(let s=0;s<5&&!(i()<Math.pow(Qe(a[0]/150+e*.006+qt,a[1]/150-e*.004,51),1.6)*1.7);s++)a=Ot();return a},we=e=>{let a=Math.imul((e|0)^ot,739982445)>>>0;return a=Math.imul(a^a>>>15,695872825)>>>0,((a^a>>>13)>>>0)/4294967296},Je=e=>{const a=Math.floor(e),s=e-a,r=s*s*(3-2*s);return .45+1.1*(we(a)*(1-r)+we(a+1)*r)},X=e=>{for(let a=0;a<e;a++)Ht(1/30,!0)},it=(e,a)=>{for(let s=0;s<e;s++){const r=a?be(0):Ot();St(r[0],r[1],ge(!1)*(a?1:1.05),0,{final:!0,quiet:!0})}Ht(1/30,!0)};if(q===4)for(let e=0;e<6;e++)i(),i(),i(),i(),i();let Zt=1,Y=0,ye=!1,Xt=0,$=0,xt=!1,lt=null,tt=null,Ct=.3,Mt=0,Kt=0;function Ht(e,a){Ut+=e;for(let c=V.length-1;c>=0;c--){const o=V[c];if(o.tl-=e,o.tl<=0){if(U.length>=24){const x=U.find(w=>!w.final);x&&(x.final=!0),o.tl=0;continue}if(V.splice(c,1),o.hail){St(o.x,o.y,o.d,2,{quiet:a}),Q.length>=10&&Q.shift();const x=i()*6.28,w=40+i()*110;Q.push({x:o.x,y:o.y,z:0,vz:260+i()*120,vx:Math.cos(x)*w,vy:Math.sin(x)*w,r:o.d/2,sd:i()*40,rest:!1})}else St(o.x,o.y,o.d,0,{quiet:a,tap:o.tap})}}for(let c=nt.length-1;c>=0;c--){const o=nt[c];o.t+=e,o.px=o.x,o.py=o.y,o.x+=o.vx*e,o.y+=o.vy*e;const x=Math.exp(-e*3.2);o.vx*=x,o.vy*=x,Math.hypot(o.vx,o.vy)>6&&O.length<4&&O.push([o.px,o.py,o.x,o.y,o.r*.55,.06,.2]),o.src=0,o.t>o.life&&(o.src=o.V/36,o.r*=.975,o.t>o.life+1.2&&(nt.splice(c,1),A[ue(o.x,o.y)]+=.3))}for(let c=Q.length-1;c>=0;c--){const o=Q[c];if(!o.rest)o.vz-=1800*e,o.z+=o.vz*e,o.x+=o.vx*e,o.y+=o.vy*e,o.z<=0&&(o.z=0,o.vz<-70?(St(o.x,o.y,o.r*2,2,{dent:.45,quiet:a}),o.vz=-o.vz*.38,o.vx*=.6,o.vy*=.6):(o.vz=0,o.rest=!0));else{const w=Math.exp(-e*4);o.vx*=w,o.vy*=w,o.x+=o.vx*e,o.y+=o.vy*e}const x=.0045*(N===2?1:1.5);o.src=4*Math.PI*o.r*o.r*x,o.r-=x,o.r<.5&&Q.splice(c,1)}for(let c=F.length-1;c>=0;c--)F[c].t+=e,F[c].t>F[c].life&&F.splice(c,1);for(let c=Z.length-1;c>=0;c--)Z[c].t+=e,Z[c].t>1.5&&Z.splice(c,1);const s=1-I*60;for(let c=0;c<A.length;c++)A[c]*=s;let r=0;for(const c of U){if(r>=24)break;const o=ce+r*12;m[o]=c.x,m[o+1]=c.y,m[o+2]=c.R,m[o+3]=c.H,m[o+4]=c.age,m[o+5]=c.final?10:c.age+e,m[o+6]=c.wa,m[o+7]=c.an,m[o+8]=c.V,m[o+9]=c.tw,m[o+10]=c.sd,m[o+11]=c.kind,r++}const n=Ye();xe=n;let l=0;for(;O.length&&l<4;){const c=O.shift(),o=Xe+l*8;for(let x=0;x<4;x++)m[o+x]=c[x];m[o+4]=c[4],m[o+5]=c[5],m[o+6]=c[6],m[o+7]=0,l++}ne(r,n,l,Ut),ie(),r&&(E(d.drops,G[1-L].f,640,[G[L].t,rt.t]),L=1-L),E(d.sim,G[1-L].f,640,[G[L].t,rt.t]),L=1-L;for(let c=U.length-1;c>=0;c--){const o=U[c];if(o.final){U.splice(c,1);continue}o.age+=e,o.age>(o.kind===1?1.5:o.V>0?Math.max(.46,.12+b.wt):.46)&&(o.final=!0)}}function Ye(){let e=0;const a=(s,r,n,l,c,o,x,w)=>{if(e>=24)return;const S=re+e*8;m[S]=s,m[S+1]=r,m[S+2]=n,m[S+3]=l,m[S+4]=c,m[S+5]=o,m[S+6]=x,m[S+7]=w,e++};for(const s of Q)a(s.x,s.y,s.r,s.z,2,s.src||0,0,s.sd);for(const s of nt)a(s.x,s.y,s.r,0,1,s.src||0,Math.min(1,s.t/3),s.sd);for(const s of Z)a(s.x,s.y,s.R,s.sp,5,0,s.t,s.a);for(const s of F)a(s.x,s.y,s.r*(1-.45*s.t/s.life),0,4,0,Math.min(1,(s.life-s.t)/.35,s.t/.05),0);for(const s of V){const r=s.tl*(s.hail?900:1e3),n=j?Math.cos(at)*r*.35:0,l=j?Math.sin(at)*r*.35:0;a(s.x-n,s.y-l,s.d/2,r,3,0,s.hail?1:0,0)}return e}if(Le===1){I=2e-5;for(let e=0;e<3;e++)it(10,!1),X(3);I=.004,X(28);for(let e=0;e<A.length;e++)A[e]=0}I=2e-5;const gt=[16,44,110][Jt];it(Math.ceil(gt*.3),!0),X(8),I=.0022,X(9),I=2e-5,it(Math.ceil(gt*.25),!0),X(5),it(Math.ceil(gt*.2),!0),X(6),it(Math.ceil(gt*.15),!0),X(3),it(Math.ceil(gt*.1),!0),X(2),fe=he-de(Ut+4);const ze=K(.3+.4*T(),.3+.4*T());let ke=!1;const Re=()=>{E(d.light,ae.f,640,[G[L].t]),t.flush(),E(d.comp,null,y.size,[G[L].t,rt.t,jt.t,zt.t,ae.t]),xe&&(t.useProgram(d.body),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND))};return Re(),ve=!0,(e,a)=>{a=Math.min(Math.max(a||0,0),.25),Rt=Math.min(5,Rt+a*14);const s=y.input;for(const c of s.taps()){const o=K(c.x,1-c.y);Vt(o[0],o[1],!0,!0),lt=o}if(s.down){const c=K(s.x,1-s.y);if(ye||(Xt=0,xt=!1,lt=lt||c,tt=c),Xt+=a,tt&&Math.hypot(c[0]-tt[0],c[1]-tt[1])>1.2){if(!xt&&Math.hypot(c[0]-lt[0],c[1]-lt[1])>6){xt=!0;for(let o=V.length-1;o>=0;o--)V[o].tap&&V.splice(o,1)}xt&&(O.push([tt[0],tt[1],c[0],c[1],5.5,1.3,1]),O.length>4&&O.splice(0,O.length-4),vt(()=>y.sound.hit("noise",.12,{cutoff:1800,dur:.07,pan:c[0]/200}))),tt=c}!xt&&Xt>.3&&($=Math.min(1,$+a*.4))}else $*=Math.exp(-a/1.6),lt=null;if(ye=s.down,!ke&&e>=3.6&&(ke=!0,Vt(ze[0],ze[1],!1,!1)),Zt-=a,Zt<=0){Zt=1;let c=0;for(let o=0;o<A.length;o++)A[o]>.5&&c++;c>A.length*.62&&Y<=0&&(Y=75)}Y>0&&(Y-=a);const r=Y>0?Math.min(1,Math.min(75-Y,Y)/8):0,n=Fe*(1-.92*r)+36*Math.pow($,1.3);for(I=(N===1?7e-5:N===2?4e-5:5e-5)*(.2+.8*Math.exp(-n/3))*(1+5*r),Ct-=n*a*($>.05?1:Je(e/7));Ct<=0;){Ct+=i()<.3?.12*i():-Math.log(1-i()*.999)*1.38;const c=be(e);Vt(c[0],c[1],!1,!1)}Kt-=a,$>.15&&Kt<=0&&(Kt=.32,vt(()=>y.sound.hit("noise",.1+.2*$,{cutoff:3800,dur:.5}))),Mt+=a;let l=0;for(;Mt>=1/30&&l<4;)Ht(1/30,!1),Mt-=1/30,l++;l===4&&(Mt=0),Re()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
