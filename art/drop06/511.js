// Peat Bog: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/511.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Zt){Zt&&Zt.add({num:511,name:"Peat Bog",fam:"Vistas",recipe:"A wide flat bog at dawn, with mist over the moss, dew everywhere and a bird calling somewhere far off. The light, the mist, the pools and the season change every mint, and rare ones get a red sun in haze or a frost with ice on the pools. Tap a pool to drop a little puff of wind on it, drag to send a breeze across the bog, or hold to let the sun climb and burn the mist off.",interactive:"Tap a pool to bring a cat's-paw of wind down on it there (it runs on across the mirror); drag to send a breeze across that ruffles the pools, sways the cotton grass and pushes the mist; hold and the sun climbs and burns the mist off",music:!0,gl:!0,fps:30,seed:0,make(z){const t=z.gl,F=z.size,B=!!z.home;let I=1360726741;for(let e=2;e<66;e+=8)I=Math.imul(I^parseInt(z.hash.slice(e,e+8),16),2246822507)^I>>>13;const i=()=>{I=I+1831565813|0;let e=Math.imul(I^I>>>15,1|I);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},U=e=>{let o=0;for(const s in e)o+=e[s];let a=i()*o;for(const s in e)if(a-=e[s],a<0)return s;return Object.keys(e)[0]},L=Math.PI*2,W=Math.PI/180,Q=(e,o,a)=>Math.max(o,Math.min(a,e)),ot=(e,o,a)=>{const s=Q((a-e)/(o-e),0,1);return s*s*(3-2*s)},ht=(e,o,a)=>e.map((s,m)=>s+(o[m]-s)*a),Y=z.trait("Light",B?"Pink first light":U({"Pink first light":42,"Gold sunrise":30,"Before the sun":16,"Red sun in haze":12})),bt=z.trait("Mist",B?"Lying low":U({"Lying low":45,"Thin wisps":30,"Deep blanket":25})),gt=z.trait("Facing",B?"Into the sun":U({"Into the sun":42,"Sun to the side":33,"Away, moon setting":25})),Xt=z.trait("Pools",B?"Pool chain":U({"Pool chain":42,"Scattered pools":36,"One wide lochan":22})),Kt=z.trait("Cotton grass",B?"Drifts":U({Sparse:28,Drifts:50,"White field":22})),zt=z.trait("Far side",B?"Low hills":U({"Low hills":38,"Forest edge":30,"Far mountains":20,"Open to the sky":12})),Vt=z.trait("Pines",B?"A few":U({None:18,"A few":52,Scattered:30})),jt=z.trait("Calling",B?"Curlew":U({Curlew:55,Snipe:33,"Golden plover":12}));let G=185160145;for(let e=2;e<66;e+=8)G=Math.imul(G^parseInt(z.hash.slice(e,e+8),16),3266489909)^G>>>15;const Qt=()=>{G=G+1831565813|0;let e=Math.imul(G^G>>>15,1|G);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Yt=B?"On a hummock":(e=>{let o=0;for(const s in e)o+=e[s];let a=Qt()*o;for(const s in e)if(a-=e[s],a<0)return s;return Object.keys(e)[0]})({"On a hummock":55,"Crouched at the pool edge":27,"Looking down into a pool":18});let O=1587874566;for(let e=2;e<66;e+=8)O=Math.imul(O^parseInt(z.hash.slice(e,e+8),16),668265263)^O>>>14;const k=()=>{O=O+1831565813|0;let e=Math.imul(O^O>>>15,1|O);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Jt=e=>{let o=0;for(const s in e)o+=e[s];let a=k()*o;for(const s in e)if(a-=e[s],a<0)return s;return Object.keys(e)[0]},Le=k()<.45,$t=z.trait("View",Yt==="Looking down into a pool"&&!Le?"On a hummock":Yt),At=z.trait("Season",B?"Cotton-grass June":Jt({"Cotton-grass June":50,"Heather in bloom":22,"Autumn rust":22,"Hoar frost":6})),te=z.trait("Sky",B?"Clear":Jt({Clear:58,"Mackerel sky":27,"Overcast lifting":15})),_=[At==="Heather in bloom"?1:0,At==="Autumn rust"?1:0,At==="Hoar frost"?1:0],ee=te==="Mackerel sky"?1:0,Ct=te==="Overcast lifting"?1:0,rt=$t==="Crouched at the pool edge",J=$t==="Looking down into a pool",T=(()=>{const e=L*k(),o=1+.9*k(),a=k()<.5,s=e+(k()<.5?-1:1)*(50+30*k())*W,m=.4+.6*k(),n=.32+.72*k(),r=k(),h=(k()-.3)*6,l=k()<.55?1:0,f=k()*.8,u=k()<.5?-1:1,c=(k()<.5?-1:1)*(.8+.8*k())*W/60;return{th:e,lam:(a?.068:.05)*o,ar:a?1.4+.6*k():1+.4*k(),th2:s,cross:m,gr:a?1.15:.9,cov:n,ea:r,eo:h,ed:l,sheet:f,hook:u,dr:c}})(),Fe=B?0:1,Z=B?2.1:L*i(),Et=B?1:i()<.5?-1:1,Re=gt==="Into the sun"?.3+.1*i():gt==="Sun to the side"?1.2+.25*i():Math.PI-.12-.12*i(),X=Z-Et*Re,oe=rt?-.05:J?-.5:-.13,ae=rt?1.02:1.86,kt=Y==="Pink first light"?1.3+.8*i():Y==="Gold sunrise"?4+2*i():Y==="Before the sun"?-1.6+.6*i():2+i(),ft=Y==="Red sun in haze",se=Y==="Before the sun"?1:0,ne=Z+Math.PI+Et*(.1+.18*i()),Pe=(3.5+3.5*i())*W,Mt=bt==="Lying low"?[.02,1,.05]:bt==="Thin wisps"?[.01,.7,.1]:[.16,.9,.03],_e=bt==="Deep blanket"?1:0,ct=Math.sin(X),it=Math.cos(X),re=Math.cos(X),ce=-Math.sin(X),mt=Xt==="One wide lochan",ie=Xt==="Scattered pools",lt=L*i(),at=[i()*60,i()*60],He=mt?.29:ie?.335:.37,le=ie?[1/4.8,1/3.6]:[1/9.5,1/2.7];let Tt=mt?15+5*i():7+3.5*i(),he=mt?(i()-.5)*6:(i()-.65)*4.5;const fe=X+Math.PI/2+(i()-.5)*.7,Nt=mt?[24+10*i(),7+3*i()]:[4.5+3.5*i(),1.5+1.1*i()];(rt||J)&&(Tt=Nt[1]+(J?1.3:2.9)+(J?.7:1.2)*Qt());const me=[ct*Tt+re*he,it*Tt+ce*he],De=.85+.35*i(),qe=(.6+.6*i())*(_[0]?1.5:1),St=new Float32Array([Math.cos(lt),Math.sin(lt),at[0],at[1],He,le[0],le[1],qe,me[0],me[1],Nt[0],Nt[1],Math.sin(fe),Math.cos(fe),0,De]),Ie=(Kt==="Sparse"?.5:Kt==="Drifts"?1.25:1.9)*(_[0]?.55:_[1]?.3:_[2]?.12:1),Ue=zt==="Low hills"?0:zt==="Forest edge"?1:zt==="Far mountains"?2:3,de=.15+.45*i(),Bt=Vt==="None"?0:Vt==="A few"?5:13,pe=new Float32Array(16*4);for(let e=0;e<Bt;e++){const o=e<2&&gt!=="Away, moon setting",a=o?X+(e?-.32:.18)*Et+(i()-.5)*.12:L*i(),s=o?55+45*i():50+280*i()*i();pe.set([Math.sin(a)*s,Math.cos(a)*s,1.8+2.8*i(),i()*10],e*4)}const We=jt==="Curlew"?0:jt==="Snipe"?1:2,Ge=new Float32Array([Math.cos(T.th),Math.sin(T.th),T.lam,T.ar,Math.cos(T.th2),Math.sin(T.th2),T.cross,T.gr,Math.min(T.cov,.86),Math.cos(Math.atan2(it,ct)+(T.ea-.5)*2.4),Math.sin(Math.atan2(it,ct)+(T.ea-.5)*2.4),T.sheet,Math.sin(Z),Math.cos(Z),T.hook,de]),P=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,Oe=P+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }",$=`
const float PI = 3.14159265;
float at2(float y, float x) { float a = atan(abs(y) / max(abs(x), 1e-7)); a = x < 0. ? PI - a : a; return y < 0. ? -a : a; }
float nA(vec2 p) { return texture(uN, p * (1. / 64.)).x; }
float nB(vec2 p) { return texture(uN, p * (1. / 64.)).y; }
float nC(vec2 p) { return texture(uN, p * (1. / 64.)).z; }
`,Lt=`
const float WA = 1., WL = 4.2904594;
vec2 WP(vec2 p, vec2 c) { vec2 q = p - c; return .5 + .5 * sign(q) * log(1. + abs(q) * (1. / WA)) * (1. / WL); }
vec2 WI(vec2 uv, vec2 c) { vec2 u = uv * 2. - 1.; return c + sign(u) * WA * (exp(abs(u) * WL) - 1.); }
`,ue=`
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float vn(vec2 p, float ch) { vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f);
  vec4 L = textureLod(uN, vec2(mod(i.x, 64.) + .5 + ch, i.y + .5) * vec2(1. / 192., 1. / 64.), 0.);
  return mix(mix(L.x, L.y, f.x), mix(L.z, L.w, f.x), f.y); }
float nA(vec2 p) { return vn(p, 0.); }
float nB(vec2 p) { return vn(p, 64.); }
float nC(vec2 p) { return vn(p, 128.); }
`,Ze=`
const float CH[26] = float[26](0., 64., 128., 0., 0., 128., 128., 0., 64., 128., 128., 0., 64., 128., 64., 128., 0., 0., 64., 0., 0., 64., 0., 64., 128., 64.);
float N[26];
vec4 bog(vec2 p) {
  float pn = N[0] * .64 + N[1] * .36 + (N[2] - .5) * .035 + (N[3] - .5) * .014;
  float dfar = smoothstep(22., 55., length(p)), nf = 1. - smoothstep(4., 12., length(p));
  // near to, the shore is ragged at a hand's scale (moss and sedge hanging over the peat)
  pn += (N[4] - .5) * .012 * nf;
  pn += (N[5] - .5) * .1 * dfar - .06 * dfar;
  float pool = smoothstep(uB[1].x + .006, uB[1].x - .006, pn);
  vec2 dp = p - uB[2].xy, ax = uB[3].xy;
  float el = length(vec2(dot(dp, ax) / uB[2].z, dot(dp, vec2(-ax.y, ax.x)) / uB[2].w)) + (N[6] - .5) * .45 + (N[7] - .5) * .12 + (N[8] - .5) * .05 + (N[9] - .5) * .05 * nf;
  pool = max(pool, smoothstep(1., .88, el));
  float near = max(smoothstep(uB[1].x + .03, uB[1].x + .003, pn), smoothstep(1.2, 1.005, el));
  float deepF = max(smoothstep(uB[1].x - .006, uB[1].x - .07, pn), smoothstep(.9, .45, el));
  float dc = length(p);
  pool *= smoothstep(1.4, 2.8, dc); near *= smoothstep(1.4, 2.8, dc);
  float hm = smoothstep(.36, .8, N[10]); hm = hm * hm * (3. - 2. * hm);
  float sub = smoothstep(.45, .85, N[11]);
  float heath = smoothstep(.5, .64, N[12]) * uB[1].w;
  float rough = N[13];
  float h = .05 + .04 * N[14] + .012 * N[15] + uB[3].w * (.22 * hm * (.82 + .26 * N[16]) + .08 * sub + .07 * smoothstep(.5, .8, N[17])) + heath * (.05 + .05 * rough) * (.3 + hm);
  float edge = smoothstep(.0, .5, pool) * (1. - smoothstep(.5, 1., pool));
  // a raised bog is flat first: past the near ten metres the cushions are a third of their height above the lawn
  float lawn = .04 + .02 * N[14], fl = mix(.78, .3, smoothstep(3.5, 12., dc));
  h = lawn + (h - lawn) * fl;
  h = mix(h, .03 + .03 * N[18] + .04 * hm * fl, near * .45);
  // the peat bank: the moss keeps its height out to the lip, then the bank drops steeply to the pool floor (a spit or
  // islet is a flat-topped tussock, not a tent)
  float pb = smoothstep(.3, .7, pool);
  h = mix(h, mix(-.07, -.42, deepF) + .07 * N[19], pb) + edge * .015;
  float st = 1. - smoothstep(.6, 1.4, dc);
  h = mix(h, max(h, .25 + .05 * N[16]), st);
  return vec4(h, pool, heath, hm);
}`,Xe=P+`out vec4 o;
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float lat(ivec2 c, int ch, int M) { c = ((c % M) + M) % M; return float(hsh(uint(c.x + c.y * M) * 4u + uint(ch) + 77u) & 0xffffu) / 65535.; }
float vn(vec2 p, int ch) { vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f); ivec2 c = ivec2(i);
  return mix(mix(lat(c, ch, 64), lat(c + ivec2(1, 0), ch, 64), f.x), mix(lat(c + ivec2(0, 1), ch, 64), lat(c + ivec2(1, 1), ch, 64), f.x), f.y); }
void main() { vec2 q = floor(gl_FragCoord.xy), p = (q + .5) / 4.;
  o = vec4(vn(p, 0), vn(p, 1), vn(p, 2), lat(ivec2(q), 3, 256)); }`,Ke=P+"uniform sampler2D uN; out vec4 o;"+$+`
void main() {
  vec2 p = gl_FragCoord.xy / 8., ci = floor(p), cf = p - ci;
  float d1 = 9., d2 = 9., rb = 0.; vec2 best = vec2(0);
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec2 cc = mod(ci + vec2(i, j), 32.);
    ivec2 ic = ivec2(cc);
    float r1 = texelFetch(uN, ic, 0).w, r2 = texelFetch(uN, ic + ivec2(64, 0), 0).w, r3 = texelFetch(uN, ic + ivec2(0, 64), 0).w;
    vec2 pt = vec2(i, j) + .12 + .76 * vec2(r1, r2);
    float d = length(pt - cf) / (.7 + .45 * r3);
    if (d < d1) { d2 = d1; d1 = d; best = pt - cf; rb = r3; } else if (d < d2) d2 = d;
  }
  float fine = texelFetch(uN, ivec2(gl_FragCoord.xy) + ivec2(17, 101), 0).w;
  float star = .5 + .5 * cos(at2(best.y, best.x) * 5. + rb * 20.);
  float rr = .46 + .2 * star + .1 * (fine - .5);
  float cov = smoothstep(rr, rr - .16, d1) * (.75 + .25 * smoothstep(.0, .25, d2 - d1));
  float hgt = cov * (.55 + .45 * (1. - d1 / rr));
  float bud = smoothstep(.2, .0, d1);
  o = vec4(hgt * .85 + fine * .15, rb, cov * .85 + .15, bud);
}`,Ve=P+"uniform sampler2D uN; uniform vec4 uB[4]; uniform vec4 uA; uniform vec4 uW; uniform int uLZ; out vec4 o;"+ue+Lt+Ze+`
// packed sphagnum cushions a third to two thirds of a metre across, like cobbles under a blanket: each a rounded head
// of its own height, creased where it presses on its neighbours; returns the height (0 to 1) and the cushion's own value
vec2 cush(vec2 p) {
  vec2 g = p * 2.6, ci = floor(g);
  float hb = 0., h2 = 0., id = 0.;
  for (int k = 0; k < 9 + uLZ; k++) {
    ivec2 c = ivec2(ci) + ivec2(k % 3 - 1, k / 3 - 1);
    uint s = hsh(uint(c.x & 1023) + uint(c.y & 1023) * 1024u + 5119u);
    vec4 r = vec4(uvec4(s, s >> 8, s >> 16, s >> 24) & 255u) / 255.;
    float d = length(g - vec2(c) - .15 - .7 * r.xy) / (.62 + .5 * r.z);
    float v = (.4 + .6 * r.w) * (1. - d * d);
    if (v > hb) { h2 = hb; hb = v; id = fract(r.z * 3.7 + r.w * 5.3); } else h2 = max(h2, v);
  }
  float x = max(.45 - (hb - h2), 0.) / .45;
  return vec2(max(hb + x * x * .11, 0.), id);
}
void main() { vec2 p = WI(gl_FragCoord.xy / uA.y, uW.xy);
  // every noise term of the bake read in one loop (one call site, so the smooth reads compile once)
  vec2 so = uB[0].zw, r = vec2(dot(p, uB[0].xy), dot(p, vec2(-uB[0].y, uB[0].x)));
  vec2 Q[26] = vec2[26](r * uB[1].yz + so, r * uB[1].yz * 2.7 + so * 1.3, p * 2.1, p * 6.3, p * 17. + 3., p * .35 + so, p * .55 + so, p * 2.2, p * 6.1, p * 15. + 7., p * 1.25 + so * 2.1, p * 2.4 + so * 3.7, p * .21 + so * .7, p * 2.3 + 9.1, p * .8, p * 3.7, p * 1.9, p * .45 + so, p * 2.3, p * .9, p * 2.2 + 3.1, p * 3.7 + 1.3, p * 11. + 4., p * 27., p * 63. + 2., p * .7 + 2.);
  for (int i = 0; i < 26 + uLZ; i++) N[i] = vn(Q[i], CH[i]);
  vec4 b = bog(p);
  float dc = length(p);
  // (not the home) lumpy cushions and bushy heather instead of smooth domes
  if (uA.w > .5) b.x += ((N[20] - .5) * .06 + (N[21] - .5) * .02) * (1. + 1.2 * b.z) * (1. - b.y) * smoothstep(.03, .09, b.x) * mix(1., .4, smoothstep(5., 13., dc));
  // the cushions on every mint, tallest on the hummocks, each finely lumpy; none in the water, and they fade out where
  // a texel grows toward a cushion's size
  vec2 cu = cush(p);
  float cw = (1. - smoothstep(.0, .3, b.y)) * smoothstep(.0, .04, b.x) * (1. - smoothstep(12., 28., dc));
  b.x += cw * ((.025 + .09 * b.w + .03 * b.z) * cu.x + (N[22] - .5) * .02 * (.4 + .6 * cu.x) + (N[23] - .5) * .01
    + (N[24] - .5) * .006 * (1. - smoothstep(2.5, 7., dc)));
  if (uA.z > .5) b.x = b.x * .5 + .5;
  b.w = mix(N[25], cu.y, .75 * cw);
  o = b; }`,je=P+"uniform sampler2D uN, uH; uniform vec4 uA; uniform vec4 uE; uniform vec4 uW; uniform int uLZ; out vec4 o;"+$+Lt+`
float H(vec2 p) { float v = textureLod(uH, WP(p, uW.xy), 0.).x; return uE.x > .5 ? v * 2. - 1. : v; }
void main() {
  vec2 uv = gl_FragCoord.xy / uA.y, p = WI(uv, uW.xy);
  vec4 h4 = texture(uH, uv);
  float h0 = uE.x > .5 ? h4.x * 2. - 1. : h4.x, m = -.5, d = .04;
  for (int i = 0; i < 48 + uLZ; i++) { d *= 1.14; m = max(m, (max(H(p + uA.zw * d), 0.) - h0) / d); }
  // hollows: against a ring a cushion wide and one a hummock wide
  float a = 0.;
  for (int i = 0; i < 8 + uLZ; i++) { float an = float(i) * .785 + .3; vec2 dv = vec2(cos(an), sin(an)); a += max(H(p + dv * .22), -.05) + max(H(p + dv * .55), -.05); }
  float cav = max(h0, -.05) - a / 16.;
  float fA = nC(p * 1.7 + 11.), fB = nA(p * 3.3 + 5.);
  // the species follow the cushions: one colour to a head near to
  float cw = .65 * (1. - smoothstep(10., 26., length(p)));
  fA = mix(fA, h4.w, cw); fB = mix(fB, 1. - h4.w, cw * .7);
  o = uE.x > .5 ? vec4(m * .5 + .5, cav + .5, fA, fB) : vec4(m, cav, fA, fB);
}`,Qe=P+"uniform sampler2D uN, uP; uniform int uLZ; out vec4 o;"+$+`
// a stunted bog pine seen side-on: a crooked trunk, a few limbs out to one side with sparse ragged clumps of needles;
// some are dead silver snags with bare limbs
float pineShape(vec2 q, float H, float sd, float px, bool dead) {
  float y = q.y / H, ln = (fract(sd * 7.31) - .5) * .4;
  float x = q.x - H * (ln * y * y + .05 * sin(y * 6.5 + sd * 5.) * y + .025 * sin(y * 17. + sd * 11.) * y);
  float tw = .018 * H * (1. - .7 * y) + .006;
  float trunk = smoothstep(tw + px, tw - px * .5, abs(x)) * step(y, dead ? .82 : .95) * step(-.05, y);
  trunk *= min(1., 2. * tw / max(px, 1e-4) + .25);
  float cr = 0., cw = .05 * H;
  for (int k = 0; k < 6 + uLZ; k++) {
    float fk = float(k), r1 = fract(sd * (3.1 + fk * 1.7)), r2 = fract(sd * (5.3 + fk * 2.9)), r3 = fract(sd * (7.7 + fk * 1.3));
    float yk = (.28 + .11 * fk + .05 * r1) * H, sg = r3 < .5 ? -1. : 1.;
    float bl = H * (.07 + .2 * r2) * (1. - .1 * fk);
    float xb = x * sg, yb = q.y - yk, al = clamp(xb / bl, 0., 1.);
    float lw = .005 * H + .002;
    float c = smoothstep(lw + px, lw - px * .5, abs(yb - al * al * bl * (dead ? .7 : .35))) * step(0., xb) * step(xb, bl) * min(1., 2. * lw / max(px, 1e-4) + .2) * .95;
    if (!dead && r1 < .82) {
      vec2 e = vec2((xb - bl * .7) / (bl * .5 + cw * .6), (yb - bl * .2) / (cw * (1. + .6 * r1)));
      float rag = (nA(vec2(q.x * 11. / H + sd * 13. + fk * 7., q.y * 15. / H)) - .5) * 1.4 + (nB(vec2(q.x * 31. / H + fk * 3., q.y * 37. / H + sd)) - .5) * 1.;
      float ed = length(e) + rag;
      c = max(c, smoothstep(1. + px / cw, 1. - px / cw, ed));
    }
    cr = max(cr, c);
  }
  if (!dead) { vec2 e = vec2(x / (.05 * H), (q.y - .9 * H) / (.09 * H)); cr = max(cr, smoothstep(1. + px / cw, 1. - px / cw, length(e) + (nA(q * 19. / H + sd) - .5) * 1.2)); }
  return max(trunk, cr);
}
void main() {
  vec2 g = gl_FragCoord.xy / 128., ce = floor(g), f = g - ce;
  vec4 P = texelFetch(uP, ivec2(int(ce.x) + 4 * int(ce.y), 0), 0);
  float H = max(P.z, .5);
  vec2 q = vec2((f.x - .5) * 1.4 * H, f.y * (1.05 * H + .1) - .1);
  float c = pineShape(q, H, P.w, 1.4 * H / 128., fract(P.w * 3.71) < .4);
  o = vec4(c, c, c, 1.);
}`,dt=`uniform vec4 uC[23]; uniform vec4 uB[4];
#define CAM uC[0].xyz
#define TT uC[0].w
#define FW uC[1].xyz
#define TANH uC[1].w
#define LS uC[4].xyz
#define SUNC uC[5].xyz
#define AMB uC[9].xyz
#define WC uC[19].xy
`+Lt+`
float Hs(vec2 p) { float v = texture(uH, WP(p, WC)).x; return uC[3].w > .5 ? v * 2. - 1. : v; }
`,Ye=P+"uniform sampler2D uN, uH, uS, uD, uP, uQ; uniform int uLZ; out vec4 o;"+dt+$+`
vec3 sky(vec3 d) {
  float y = max(d.y, 0.);
  vec2 hz = normalize(d.xz + vec2(1e-5, 0.)), sz = normalize(LS.xz + vec2(1e-5, 0.));
  float ca = dot(hz, sz), w = .5 + .5 * ca;
  vec3 hor = mix(uC[8].xyz, uC[7].xyz, w * w * w);
  vec3 col = mix(hor, uC[6].xyz, pow(min(y * 2.4, 1.), .55));
  col = mix(col, hor * 1.25, exp(-y * 30.) * .5);
  col += uC[22].z * vec3(-.03, .045, -.005) * (.3 + .7 * w) * exp(-abs(y - .1) * 16.);
  float anti = smoothstep(.2, -.9, ca) * uC[9].w;
  col += vec3(.38, .17, .22) * anti * smoothstep(.01, .05, y) * smoothstep(.3, .07, y);
  col = mix(col, vec3(.12, .13, .25), anti * (1. - smoothstep(.0, .04, y)) * .6);
  float cs = dot(d, LS), ang = acos(clamp(cs, -1., 1.));
  col += SUNC * (.025 * exp(-ang * 2.5) + .08 * exp(-ang * 9.) + .35 * exp(-ang * 45.)) * (1. - .7 * smoothstep(0., .3, y));
  float am = length(d - uC[10].xyz);
  float px = uC[18].z;
  vec3 mv = d - uC[10].xyz; mv.y *= 1.12;
  float md = smoothstep(.006 + px, .006 - px, length(mv));
  vec2 mq = mv.xy * 470.;
  if (md > 0.) col = mix(col, vec3(1., .86, .72) * (.6 + .25 * nA(mq + 3.) - .15 * smoothstep(.55, .7, nB(mq * .7))) * uC[10].w, md);
  col += vec3(.6, .5, .55) * .05 * exp(-am * 60.) * uC[10].w;
  return col;
}
vec3 skyAll(vec3 d) {
  vec3 col = sky(d);
  float px = uC[18].z, ang = length(d - LS);
  float disc = smoothstep(.0048 + px, .0048 - px, ang) * step(-.003, d.y);
  float od = .03 / max(d.y + .02, .008);
  vec3 ext = exp(-vec3(.35, .8, 1.5) * od * (1. + uC[20].w));
  col += disc * SUNC * ext * 70. * mix(1., .025, smoothstep(1.5, 2.5, uC[20].w)) * (1. - .4 * smoothstep(.0, .0048, ang)) * smoothstep(-.6, .4, uC[20].y);
  return col;
}
vec4 pines(vec3 ro, vec3 rd, float tMax, out float tp) {
  vec4 acc = vec4(0.); tp = 1e9;
  int np = int(uC[14].z);
  if (abs(rd.y) < .14) {
    for (int i = 0; i < 16 + uLZ; i++) {
      if (i >= np) break;
      vec4 P = texelFetch(uP, ivec2(i, 0), 0);
      vec2 dv = P.xy - ro.xz; float dist = length(dv); vec2 nr = dv / max(dist, 1e-3);
      float den = dot(rd.xz, nr);
      if (den < .05) continue;
      float t = dist / den;
      if (t > tMax || t > tp) continue;
      vec3 h = ro + rd * t;
      float u = dot(h.xz - P.xy, vec2(-nr.y, nr.x));
      if (abs(u) > P.z * .7 || h.y > P.z * 1.05 || h.y < -.1) continue;
      bool dead = fract(P.w * 3.71) < .4;
      vec2 fuv = clamp(vec2(u / (1.4 * P.z) + .5, (h.y + .1) / (1.05 * P.z + .1)), .004, .996);
      float cov = textureLod(uQ, (vec2(float(i % 4), float(i / 4)) + fuv) * .25, log2(max(t * uC[18].z * 91. / P.z, 1.))).x;
      if (cov > .02) {
        tp = t;
        vec3 pc = (dead ? vec3(.07, .066, .062) : vec3(.016, .02, .014)) * (AMB * 2.5 + SUNC * uC[4].w * .25 * (1. - abs(dot(rd, LS))));
        acc = vec4(pc, cov);
      }
    }
  }
  return acc;
}
float marchUp(vec3 ro, vec3 rd) {
  float tb = min(.8 / rd.y, 18.), t = .03, th = -1., lt = 0.;
  for (int i = 0; i < 36 + uLZ; i++) {
    if (t > tb) break;
    vec3 p = ro + rd * t; float d = p.y - Hs(p.xz);
    if (d < 0.) { th = t; break; }
    lt = t; t += max(d * .5, .02 + .02 * t);
  }
  // refine the bank's edge in the mirror (a coarse step here showed as stairs along every waterline)
  if (th > 0.) {
    float a = lt, b = th;
    for (int k = 0; k < 5 + uLZ; k++) { float m = .5 * (a + b); vec3 q = ro + rd * m; if (q.y - Hs(q.xz) < 0.) b = m; else a = m; }
    th = .5 * (a + b);
  }
  return th;
}

// the pool skin: glass, but for a cat's-paw (a patch of fine ripples with a sharp leading edge and a ragged tail that
// runs downwind) and the calm strip in the lee of each bank
vec3 waterN(vec2 xz, float fp) {
  float T = TT; vec2 wd = uC[11].xy, d = xz - uC[12].xy;
  float r = uC[12].z, al = dot(d, wd), cr = dot(d, vec2(-wd.y, wd.x));
  float rag = nA(xz * .4 + wd * T * .3);
  float g = uC[11].z * smoothstep(r * .12, -r * .04, al - r * (.25 + .5 * rag)) * smoothstep(-r * 1.6, -r * .2, al) * smoothstep(r * (.7 + .5 * rag), r * .25, abs(cr));
  g *= smoothstep(-.02, -.13, Hs(xz - wd * .7));
  vec2 q = xz - wd * T * .9, e = vec2(.012, 0.);
  float ff = 1. - smoothstep(.01, .05, fp);
  float h0 = nA(q * 23.) * ff + .6 * nB(q * 9.), hx = nA((q + e.xy) * 23.) * ff + .6 * nB((q + e.xy) * 9.), hz = nA((q + e.yx) * 23.) * ff + .6 * nB((q + e.yx) * 9.);
  vec2 gr = vec2(hx - h0, hz - h0) / e.x * (.0006 + g * .02);
  return normalize(vec3(-gr.x, 1., -gr.y));
}
void main() {
  vec2 fc = gl_FragCoord.xy / uC[2].w * 2. - 1.;
  vec3 ro = CAM;
  vec3 rd = normalize(FW + (fc.x * uC[2].xyz + fc.y * uC[3].xyz) * TANH);
  float RN = uC[14].x * .94;
  float tW = rd.y < -1e-4 ? ro.y / -rd.y : 1e7;
  float tD = -1., tS = 1e6, tH = -1.;
  if (rd.y < -.0004) {
    float ta = max((ro.y - .8) / -rd.y, 0.), tb = min(tW, RN), t = ta, lt = ta;
    for (int i = 0; i < 120 + uLZ; i++) {
      if (t > tb) break;
      vec3 p = ro + rd * t; float d = p.y - max(Hs(p.xz), 0.);
      if (d < 0.) { tH = t; break; }
      // the step grows with distance but never far past the ray's height over the ground, so a thin bank is not stepped over
      lt = t; t += max(d * .55, min(.007 + .013 * t, mix(.012 + d * 2., .03 + d * 4., smoothstep(8., 20., t))));
    }
    if (tH > 0.) {
      float a = lt, b = tH;
      for (int k = 0; k < 6 + uLZ; k++) { float m = .5 * (a + b); vec3 q = ro + rd * m; if (q.y - max(Hs(q.xz), 0.) < 0.) b = m; else a = m; }
      tH = .5 * (a + b);
    } else if (tW <= RN) tH = tW;
  }
  // what this pixel sees, resolved so each of the ground, sky and pine paths is evaluated once:
  // col = base + wgt * (ground or sky along (so, sd)), then the pines along (po, pd)
  vec3 base = vec3(0.), so = ro, sd = rd, gp = vec3(0.), po = ro, pd = rd;
  float wgt = 1., gt = 0., pmax = 1e6; bool gnd = false, refl = false, prim = true;
  vec3 sun = SUNC * uC[4].w;
  vec2 nt = vec2(0.);
  if (tH > 0.) {
    vec3 p = ro + rd * tH;
    float hp = Hs(p.xz);
    if (hp < 0. && p.y < .03) {
      vec3 pw = ro + rd * tW, n = waterN(pw.xz, tW * uC[18].z);
      nt = n.xz;
      vec3 rr = reflect(rd, n); rr.y = max(rr.y, .002); rr = normalize(rr);
      float F = .02 + .98 * pow(1. - max(dot(-rd, n), 0.), 5.);
      // under the skin: clear tea-brown water over the peat floor and the bank's wall going down, drowned sphagnum
      // in pale drifts just under the surface, all dark within half a metre
      vec3 rt = refract(rd, n, .75);
      float L = min(max(-hp, 0.) / max(-rt.y, .08), 3.);
      vec2 bq = pw.xz + rt.xz * L;
      L = min(max(-Hs(bq), 0.) / max(-rt.y, .08), 3.);
      float sb = texture(uS, WP(bq, WC)).z;
      vec3 lw = AMB * .9 + sun * .06, deep = vec3(.009, .005, .0025) * (AMB * 2. + sun * .1);
      vec3 und = mix(deep, mix(vec3(.04, .025, .014), vec3(.06, .075, .025), smoothstep(.5, .75, sb)) * lw, exp(-vec3(4., 9., 18.) * L * 1.5));
      float fs = smoothstep(.55, .9, nB(pw.xz * 3.7 + 7.)) * smoothstep(.45, .95, nA(pw.xz * 14.3 + 2.));
      und = mix(und, vec3(.1, .13, .045) * lw, fs * .35);
      base = und * (1. - F); wgt = F;
      if (uC[21].z > 0.) {   // (frost only)
      float ice = uC[21].z * smoothstep(-.1, -.03, hp + (nA(pw.xz * 3.1) - .5) * .06);
      base = mix(base, vec3(.42, .46, .52) * (AMB * 1.6 + sun * .2) * (.8 + .4 * nB(pw.xz * 11.)), ice * .85); wgt *= 1. - ice * .75;
      }
      float th = abs(pw.x) < uC[14].x * .95 && abs(pw.z) < uC[14].x * .95 ? marchUp(pw, rr) : -1.;
      if (th > 0.) { gnd = true; gp = pw + rr * th; gt = th + tW; prim = false; sd = rr; }
      else { so = pw; sd = rr; refl = true; po = pw; pd = rr; }
      tS = tW; pmax = tW;
    } else { gnd = true; gp = p; gt = tH; tS = tH; tD = tH; pmax = tH; }
  } else if (rd.y < -.0004) {
    // the bog past the baked map is laid in by the last pass: here only the sky it mirrors
    vec3 pf = ro + rd * tW;
    so = pf; sd = reflect(rd, vec3(0., 1., 0.)); sd.y = max(sd.y, .002); refl = true;
    tS = tW; pmax = tW;
  }
  // the ground itself is shaded by the next pass (its own program, so the two compile side by side): here the pixel
  // keeps what lies over the ground (pines, the water's own colour) and, in alpha, the ground's weight; the depth
  // says where the ground is (under 0.5 the primary hit, from 0.5 up the distance along the reflected ray)
  vec3 S = vec3(0.);
  if (!gnd) {
    S = skyAll(sd);
    if (refl) {
      float od = uC[6].w * uC[7].w * .3 / max(sd.y, .025), Tm = exp(-od);
      vec3 Lm = sun * (.15 + 1.1 * pow(max(dot(sd, LS), 0.), 6.)) * .3 + AMB * .7;
      S = S * Tm + Lm * (1. - Tm);
    }
  }
  float tp; vec4 pc = pines(po, pd, refl && po != ro ? 1e5 : pmax, tp);
  vec3 col; float W = 0.;
  if (refl && po != ro) col = base + wgt * mix(S, pc.rgb, pc.a);
  else { col = mix(base + wgt * S, pc.rgb, pc.a); if (gnd) W = wgt * (1. - pc.a); else if (pc.a > .5) tD = tp; }
  // not ground: alpha carries how much of the pixel is sky (direct or mirrored), for the cloud layer in the last pass
  if (!gnd && tD < 0.) W = wgt * (1. - pc.a);
  float dz = tD > 0. ? clamp(tD * dot(rd, FW) / 2000., 0., .4999) : 1.;
  if (gnd && !prim) dz = .5 + .49 * clamp(gt - tS, 0., 99.) / 100.;
  // a pool's mirror of the sky carries the skin's tilt in the depth (two 6-bit codes, square-root spaced), so the last
  // pass can bend the clouds' image with the ripples without working them out again
  if (dz == 1. && rd.y < -.0004) { vec2 e = floor((sign(nt) * sqrt(min(abs(nt) * 4., 1.)) * .5 + .5) * 63. + .5); dz = .9962 + (e.x * 64. + e.y) * (.0037 / 4096.); }
  gl_FragDepth = dz;
  col = max(col, 0.);
  o = uC[20].z > .5 ? vec4(col / (1. + col), W) : vec4(col, W);
}`,Je=P+"uniform sampler2D uN, uH, uS, uD, uZ; uniform int uLZ; out vec4 o;"+dt+$+`
vec3 shadeGround(vec3 p, vec3 rd, float t, bool prim) {
  vec2 uv = WP(p.xz, WC);
  vec4 Hb = texture(uH, uv), S = texture(uS, uv);
  bool en = uC[3].w > .5;
  float h = en ? Hb.x * 2. - 1. : Hb.x;
  // the normal from central differences a texel either side in the warped map, over the texel's size in metres
  float e = uC[14].w, k = en ? 2. : 1.;
  vec2 wt = (abs(p.xz - WC) + WA) * (WL * 2. * e);
  vec3 n = normalize(vec3((texture(uH, uv - vec2(e, 0.)).x - texture(uH, uv + vec2(e, 0.)).x) * k * wt.y, 2. * wt.x * wt.y, (texture(uH, uv - vec2(0., e)).x - texture(uH, uv + vec2(0., e)).x) * k * wt.x));
  float px = t * uC[18].z;
  vec2 xz = p.xz;
  float m4 = mix(.5, nA(xz * 9.3 + 1.7), 1. - smoothstep(.04, .12, px));
  // soft 15 cm swells between neighbouring cushions; the surface itself is the capitula, a centimetre across
  vec4 D = vec4(.5, .5, 1., 1.);
  float fd = 1. - smoothstep(.004, .016, px);
  float fa = 1. - smoothstep(.01, .045, px);
  if (fa > 0.) {
    vec2 dq = xz * 3.4, dq2 = vec2(p.x * .71 - p.z * .7, p.x * .7 + p.z * .71) * 4.3 + .37;
    D = texture(uD, dq); vec4 D2 = texture(uD, dq2);
    float dx = texture(uD, dq + vec2(1. / 256., 0.)).x - D.x, dz = texture(uD, dq + vec2(0., 1. / 256.)).x - D.x;
    D = mix(D, D2, smoothstep(.3, .7, m4) * .7);
    n = normalize(n - vec3(dx, 0., dz) * fd * 1.4);
  }
  // side or back light (not the home view): the cushions are lumpy and wet, not smooth sandy domes
  float kf = uC[19].z * (1. - smoothstep(.5, .9, dot(normalize(FW.xz + vec2(1e-5, 0.)), normalize(LS.xz + vec2(1e-5, 0.)))));
  // sphagnum mosaic in species patches a hand to a metre wide (the broad fields come baked with the map): crimson and
  // wine on the hummock tops, ochre and orange on their sides, lime in the wet lawns, dark wet green in the hollows
  float wf = (nB(xz * 7.1 + 3.3) - .5) * (1. - smoothstep(.02, .08, px));
  float fA = S.z, fB = S.w, fC = Hb.w;
  float hv = h + (fA - .5) * .08;
  float pA = fA + wf * .34, pB = fB + wf * .22, pC = fC + wf * .16;
  vec3 crim = vec3(.16, .04, .045), rust = vec3(.15, .07, .04), ochr = vec3(.18, .12, .05);
  vec3 lime = vec3(.12, .17, .05), oliv = vec3(.085, .095, .04);
  // autumn: the moss goes wine red and the lawns burnt orange
  vec4 SE = uC[21];
  crim = mix(crim, vec3(.2, .025, .04), SE.y); rust = mix(rust, vec3(.22, .065, .025), SE.y); ochr = mix(ochr, vec3(.25, .1, .03), SE.y);
  lime = mix(lime, vec3(.2, .09, .03), SE.y * .8); oliv = mix(oliv, vec3(.13, .055, .03), SE.y * .7);
  vec3 tp = mix(crim, rust, smoothstep(.38, .62, pA));
  tp = mix(tp, ochr, smoothstep(.6, .78, pB) * .75);
  tp = mix(tp, lime * .9, smoothstep(.72, .86, pC) * .6);
  vec3 lawn = mix(ochr, lime, smoothstep(.3, .55, pA));
  lawn = mix(lawn, oliv, smoothstep(.55, .75, pB) * .7);
  lawn = mix(lawn, crim * 1.1, smoothstep(.68, .84, pC) * .6);
  vec3 alb = mix(lawn, tp, smoothstep(.1, .17, hv + (pC - .5) * .1 + (m4 - .5) * .06));
  alb = mix(alb, mix(vec3(.045, .07, .02), vec3(.075, .1, .028), pB), smoothstep(.07, .035, hv));
  alb *= mix(vec3(1.), mix(vec3(1.22, .84, .88), vec3(.84, 1.15, .95), D.y), fa * .8);
  alb = mix(alb, vec3(.34, .28, .16) * (.8 + .4 * m4), smoothstep(.64, .78, fC * .55 + (1. - fB) * .45 + wf * .3) * (1. - Hb.z) * .4 * (1. - .75 * kf));
  vec3 hcol = mix(vec3(.055, .04, .038), vec3(.1, .08, .05), m4);
  if (kf > 0.) {
    // heather: dark twiggy olive with purple-brown tips and black gaps, not bare earth
    hcol = mix(hcol, mix(vec3(.026, .03, .016), vec3(.07, .045, .036), smoothstep(.35, .75, fC)) * (.55 + .9 * m4), kf);
  }
  // heather in bloom: the heather's tips purple in patches
  hcol = mix(hcol, vec3(.2, .055, .15) * (.55 + .9 * m4), SE.x * smoothstep(.3, .6, fC + (m4 - .5) * .5));
  alb = mix(alb, hcol, smoothstep(.15, .45, Hb.z) * smoothstep(.06, .18, h));
  alb *= (.85 + .3 * m4) * (1. + .6 * (Hb.w - .5) * smoothstep(.04, .1, h));
  // close to, the carpet breaks into hand-sized clumps: wine and lime heads side by side, dark gaps between the
  // clumps, and bits of bleached straw and grey lichen poking out
  float fv = 1. - smoothstep(.015, .05, px);
  if (fv > 0.) {
    vec3 fn = texture(uN, xz * (13. / 64.) + .31).xyz;
    alb *= mix(vec3(1.), mix(vec3(1.2, .86, .88), vec3(.88, 1.1, .92), fn.x), fv * .8);
    alb *= 1. - .3 * smoothstep(.5, .9, fn.y) * fv;
    alb = mix(alb, vec3(.27, .25, .19), smoothstep(.76, .95, fn.z) * fv * .4 * (1. - Hb.z));
    n = normalize(n + vec3(fn.y - .5, 0., fn.x - .5) * .8 * fv);
  }
  // muted, the way wet moss reads at dawn: pulled toward a warm peat brown, with paler dry crowns and darker wet flanks
  float lu0 = dot(alb, vec3(.3, .55, .15)), mt = fB * .75 + m4 * .25 + wf * .3;
  alb = mix(lu0 * vec3(1.22, .92, .7), alb, .52);
  alb *= (.78 + .44 * mt) * (.9 + .2 * smoothstep(.06, .2, h));
  alb *= mix(1., (.7 + .42 * D.x) * (.55 + .5 * D.z) * (1. + .25 * D.w), fa);
  if (kf > 0.) { float lu = dot(alb, vec3(.3, .55, .15)); alb = max(mix(vec3(lu), alb, 1. + .45 * kf), 0.) * mix(vec3(1.), vec3(.95, 1.08, .9), kf * smoothstep(.17, .08, hv)); }
  float wet = smoothstep(.035, -.005, h);
  alb = mix(alb, vec3(.035, .025, .014), wet * .7);
  // hoar frost: every head and leaf furred white, thickest on the tops, the wet hollows dark
  alb = mix(alb, vec3(.3, .31, .34) * (.8 + .4 * m4), SE.z * (1. - wet * .8) * (.2 + .35 * smoothstep(.5, .95, n.y)) * mix(.75, .3 + .9 * smoothstep(.35, .8, D.x), fa));
  // the pool lips: a few centimetres of black undercut peat under the moss
  alb = mix(alb, vec3(.02, .014, .01), smoothstep(.75, .35, n.y) * smoothstep(.1, .01, h) * .85);
  float cotf = uC[18].x * smoothstep(.45, .72, nB(xz * .12 + 31.)) * smoothstep(20., 34., t);
  alb = mix(alb, vec3(.75), cotf * .2);
  float hzn = en ? S.x * 2. - 1. : S.x, cav = en ? S.y - .5 : S.y;
  float sh = mix(smoothstep(-.03, .02, uC[5].w - hzn + .003), .7, smoothstep(1.5, 2.5, uC[20].w));
  sh *= mix(.85, .5 + .5 * smoothstep(.15, .7, D.x), fd);
  float ao = clamp(.6 + cav * 3., .25, 1.1) * mix(1., .5 + .5 * D.z, fd);
  vec3 sun = SUNC * uC[4].w;
  float cs = max(dot(rd, LS), 0.);
  // dew: away from the sun it is a grey bloom that dulls the moss
  float near = 1. - smoothstep(6., 16., t);
  alb = mix(alb, vec3(dot(alb, vec3(.33))) * 1.35 + .012, near * (1. - smoothstep(.2, .7, cs)) * (1. - wet) * .3 * uC[18].y);
  // matte: wrapped diffuse, and the thin capitulum leaves glow a little when seen against the sun; no gloss
  vec3 col = alb * (sun * .8 * max(dot(n, LS) * mix(.6, .78, kf) + mix(.38, .2, kf), 0.) * max(sh, .06) + AMB * 1.9 * ao * (.5 + .5 * n.y));
  col += alb * vec3(.9, 1.1, .7) * sun * sh * .2 * pow(cs, 3.) * (1. - wet);
  col += sun * sh * wet * .3 * pow(max(dot(reflect(rd, n), LS), 0.), 40.);
  if (kf > 0.) {
    // the shade is filled by the open sky, and the wet capitula and water films between them catch it
    col += alb * AMB * .9 * ao * kf * (1. - .6 * sh);
    vec3 rf = reflect(rd, n);
    float fz = pow(clamp(1. - dot(-rd, n), 0., 1.), 5.), wm = smoothstep(.14, .05, hv) * mix(.6, 1., m4) * (1. - smoothstep(.15, .45, Hb.z));
    col += kf * mix(uC[8].xyz, uC[6].xyz, clamp(rf.y * 2., 0., 1.)) * (.01 + .18 * fz) * wm * (1. - wet * .5);
  }
  // further off, the wet lawns between the hummocks catch the dawn sky and the crowns vary in tone, so the far bog
  // breaks into an irregular mosaic instead of flat dark shelves
  float ff = smoothstep(10., 35., t) * (1. - kf);
  if (ff > 0.) {
    vec3 rf = reflect(rd, n);
    float fz = pow(clamp(1. - dot(-rd, n), 0., 1.), 4.), wm = smoothstep(.13, .045, hv) * (.4 + .6 * fC);
    float sa = pow(max(dot(normalize(rf.xz + vec2(1e-5, 0.)), normalize(LS.xz + vec2(1e-5, 0.))), 0.), 3.);
    col += ff * mix(uC[8].xyz, uC[7].xyz, sa) * (.03 + .4 * fz) * wm;
    col *= mix(1., .65 + .7 * fA * (.6 + .4 * smoothstep(.08, .2, h)), ff);
  }
  // dew beads on the moss: in a cone round the sun they flash white, now and then red, green or blue, and twinkle
  if (prim && t < 16.) {
    vec2 g = xz * 90., gi = floor(g), gf = g - gi;
    ivec2 ig = ivec2(mod(gi, 256.));
    float r1 = texelFetch(uN, ig, 0).w, r2 = texelFetch(uN, (ig + ivec2(91, 37)) & 255, 0).w, r3 = texelFetch(uN, (ig + ivec2(13, 171)) & 255, 0).w;
    float cone = pow(cs, 6.), pc = px * 90., rad = max(.05, pc * .6);
    float gl = step(.86 - .1 * cone, r1) * smoothstep(rad, 0., length(gf - .15 - .7 * vec2(r2, r3))) * min(1., .0025 / (rad * rad) * 1.5);
    float tw = .5 + .5 * sin(TT * (1.3 + 2.7 * r3) + r2 * 40. + dot(rd.xz, vec2(31., 47.)));
    float dir = .15 + 9. * cone * tw * tw;
    vec3 tint = mix(vec3(1.), .55 + .45 * cos(6.2832 * (r2 * 3. + vec3(0., .33, .67))), step(.8, r3) * cone);
    col += gl * dir * tint * (sun * sh * 1.2 + AMB * .7) * (1. - wet) * uC[18].y * (1. - smoothstep(11., 16., t));
  }
  return col;
}
void main() {
  float z = texelFetch(uZ, ivec2(gl_FragCoord.xy), 0).x;
  if (z > .995) discard;
  vec2 fc = gl_FragCoord.xy / uC[2].w * 2. - 1.;
  vec3 ro = CAM, rd = normalize(FW + (fc.x * uC[2].xyz + fc.y * uC[3].xyz) * TANH), sd = rd, gp;
  float gt; bool prim = z < .5;
  if (prim) { gt = z * 2000. / dot(rd, FW); gp = ro + rd * gt; }
  else { float tW = ro.y / max(-rd.y, 1e-4), th = (z - .5) / .49 * 100.; sd = reflect(rd, vec3(0., 1., 0.)); gp = ro + rd * tW + sd * th; gt = tW + th; }
  vec3 S = max(shadeGround(gp, sd, gt, prim), 0.);
  o = uC[20].z > .5 ? vec4(S / (1. + S), 1.) : vec4(S, 1.);
}`,$e=P+"uniform sampler2D uN, uH, uS; uniform vec4 uK; out vec4 vA; out vec4 vB; out vec2 vU; out vec3 vV;"+dt+$+`
uint hs(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float rn(inout uint s) { s = hs(s + 0x9e3779b9u); return float(s >> 8) / 16777216.; }
float Pl(vec2 p) { return textureLod(uH, WP(p, WC), 0.).y; }
float lit(vec2 p, float above) { float s = textureLod(uS, WP(p, WC), 0.).x; s = uC[3].w > .5 ? s * 2. - 1. : s; return smoothstep(-.012, .012, uC[5].w - s + above / 2.2 + .003); }
vec2 wind(vec2 p) { vec4 G = uC[12]; vec2 d = p - G.xy; float g = uC[11].z * exp(-dot(d, d) / (G.z * G.z)); float T = TT;
  return uC[11].xy * (g * (.8 + .3 * sin(T * 5.1 + p.x * 2.)) + .05 + .045 * sin(T * 1.3 + p.x * .7 + p.y * .4) + .02 * sin(T * 3.7 + p.y * 2.3)); }
// a cotton-grass stem: base (xz), base height, top position; false when this one doesn't grow
bool off(vec3 p, float r) { vec3 v = p - CAM; float z = dot(v, FW); float lim = (max(z, 0.) * TANH + r) * 1.05;
  return z < -r || abs(dot(v, uC[2].xyz)) > lim || abs(dot(v, uC[3].xyz)) > lim; }
bool mfar(vec2 b0) { vec2 tc = normalize(CAM.xz - b0); float o1 = min(length(CAM.xz - b0) * .35 / 2.2, 3.);
  return max(max(Pl(b0), Pl(b0 + tc * o1 * .5)), Pl(b0 + tc * o1)) < .25; }
bool stem(int i, out vec2 b, out float h0, out vec3 top, out uint s) {
  s = uint(i) * 0x51633e2du + uint(uK.z) + 77u;
  float an = (float(i / 360) + rn(s)) * (6.2832 / 32.), rr = .6 + 27. * pow(rn(s), 1.7);
  b = vec2(cos(an), sin(an)) * rr;
  if (rr < uC[19].w) return false;
  float pc = smoothstep(.42, .62, nB(b * .12 + 31.)) * .96 + .04;
  // clonal clumps inside the drifts: dense tussocks, open moss between them, only a rare stray stem
  pc *= smoothstep(.54, .7, nA(b * .75 + 17.3)) * .9 + .1 * smoothstep(.85, .95, rn(s) + .2);
  b += (vec2(rn(s), rn(s)) - .5) * .5;
  h0 = Hs(b);
  float keep = pc * (h0 < -.1 ? 0. : 1.) * (1. - .7 * smoothstep(.16, .32, h0)) * smoothstep(.0, .4, uC[18].x * .5 + pc * .5);
  float Ls = .22 + .3 * rn(s);
  float la = rn(s) * 6.2832, ln = .08 * rn(s);
  vec2 w = wind(b);
  top = vec3(b.x, max(h0, 0.), b.y) + vec3(cos(la) * ln * Ls + w.x * Ls * 1.1, Ls * (1. - .5 * dot(w, w)), sin(la) * ln * Ls + w.y * Ls * 1.1);
  return rn(s) < keep * min(uC[18].x, 1.7) / 1.7 * 1.7;
}
void main() {
  // one long strip per draw: each blade, stem or head is its own L vertices plus two that stitch it to the next with
  // zero-area triangles (its last vertex again, then the next one's first), so every one starts on an even vertex and
  // keeps its own triangles exactly; far cheaper than thousands of 10-vertex instances
  int L = uK.x > 1.5 ? 4 : 10, iid = gl_VertexID / (L + 2), vid = gl_VertexID - iid * (L + 2);
  if (vid == L) vid = L - 1; else if (vid > L) { vid = 0; iid++; }
  float ty = uK.x; bool mir = uK.y > .5;
  vec3 cam = CAM, RT = uC[2].xyz, UP = uC[3].xyz;
  float pxA = uC[18].z;
  vec3 P = vec3(0.), T = vec3(0., 1., 0.), alb = vec3(.5);
  float wid = 0., a = 1., lt = 1., tr = 0.; vec2 uv = vec2(float(vid & 1) * 2. - 1., float(vid >> 1));
  bool dead = false, ribbon = true; vec2 b0 = vec2(0.);
  if (ty < .5) {
    int ti = iid / 7, bl = iid - ti * 7, tuft = ti + int(uK.w);
    bool nearF = uK.z > 15000.; int PS = int(uK.z) % 10000;
    uint s = uint(tuft) * 0x2c1b3c6du + (nearF ? 4321u : 1234u);
    float an = (float(tuft / PS) + rn(s)) * (6.2832 / 32.), rr = nearF ? .3 + 6.5 * pow(rn(s), 1.15) : .4 + 29. * pow(rn(s), 1.75);
    b0 = vec2(cos(an), sin(an)) * rr;
    float pd = nA(b0 * .45 + 13.) * .7 + nB(b0 * 1.6) * .3;
    float keep = rn(s), tsz = .5 + .8 * rn(s), kind = rn(s);
    float h0 = Hs(b0), hth = textureLod(uH, WP(b0, WC), 0.).z;
    bool heath = hth > .2 + .5 * kind;
    dead = keep > max(smoothstep(.25, .7, pd) * .92 + .08, heath ? .9 : 0.) || h0 < -.035;
    dead = dead || off(vec3(b0.x, max(h0, 0.) * (mir ? -1. : 1.), b0.y), .5) || (mir && mfar(b0));
    if (!dead) {
    uint sb = s + uint(bl) * 0x9e3779b9u;
    vec2 b = b0 + (vec2(rn(sb), rn(sb)) - .5) * .07 * tsz;
    float L = (.08 + .2 * rn(sb)) * tsz * (heath ? .55 : kind < .3 ? .7 : 1.);
    float la = rn(sb) * 6.2832; vec2 ld = vec2(cos(la), sin(la));
    float lean = .12 + .6 * rn(sb), sv = uv.y * .25;
    vec2 w = wind(b);
    float bend = lean * sv + .45 * lean * sv * sv;
    P = vec3(b.x, max(h0, 0.) - .01, b.y) + vec3(ld.x * bend * L, L * (sv - .4 * lean * sv * sv), ld.y * bend * L);
    P.xz += w * sv * sv * L * 1.3; P.y -= dot(w, w) * sv * sv * L * .4;
    T = normalize(vec3(ld.x * lean * (1. + .9 * sv), 1. - .8 * lean * sv, ld.y * lean * (1. + .9 * sv)) + vec3(w.x, 0., w.y) * 2.6 * sv);
    wid = (heath ? .003 : kind < .3 ? .0016 : .0034) * (1. - .85 * sv);
    float c1 = rn(sb);
    alb = heath ? mix(vec3(.06, .035, .04), vec3(.16, .08, .09), c1) : kind < .3 ? mix(vec3(.30, .14, .05), vec3(.38, .24, .1), c1) : mix(vec3(.11, .15, .04), vec3(.34, .27, .13), c1 * .7 + sv * .35);
    vec4 SE = uC[21];
    alb = heath ? mix(alb, mix(vec3(.24, .07, .2), vec3(.12, .06, .08), step(.6, c1)), SE.x) : mix(alb, kind < .3 ? vec3(.45, .14, .03) : mix(vec3(.38, .17, .05), vec3(.3, .22, .1), c1), SE.y);
    alb = mix(alb, vec3(.42, .44, .48), SE.z * .55);
    lt = lit(b, P.y - h0); tr = heath ? .3 : 1.;
    a = 1. - smoothstep(25., 30., rr);
    }
  } else if (ty < 2.5) {
    int si = (ty < 1.5 ? iid : iid / 3) + int(uK.w), hk = iid - (iid / 3) * 3;
    vec2 b; float h0; vec3 top; uint s;
    dead = !stem(si, b, h0, top, s) || off(vec3(b.x, max(h0, 0.) * (mir ? -1. : 1.), b.y), .6) || (mir && mfar(b));
    b0 = b;
    if (ty < 1.5) {
      float sv = uv.y * .25;
      P = mix(vec3(b.x, max(h0, 0.) - .01, b.y), top, sv);
      vec3 bow = top - vec3(b.x, top.y, b.y);
      P.xz -= bow.xz * sv * (1. - sv) * .6;
      T = normalize(top - vec3(b.x, max(h0, 0.), b.y));
      wid = .0028; a = 1.;
      alb = mix(vec3(.07, .085, .03), vec3(.26, .2, .1), sv);
      lt = lit(b, P.y - h0); tr = .6;
    } else {
      float nh = 1. + floor(rn(s) * 2.8);
      dead = dead || float(hk) >= nh;
      uint sh = s + uint(hk) * 0x632be5abu;
      // the heads nod on threads to one side of the stem, each a loose tuft hanging from its bract
      float da = rn(sh) * 6.2832, dr = hk == 0 ? .012 : .02 + .015 * rn(sh);
      vec3 cen = top + vec3(cos(da) * dr, -.016 - (hk == 0 ? 0. : .015 + .02 * rn(sh)), sin(da) * dr);
      float sc = (.5 + .7 * rn(sh)) * (hk == 0 ? 1. : .8);
      vec3 v = cen - cam; float z = max(dot(v, FW), .05);
      float rx = .016 * sc * 1.35, ry = .027 * sc * 1.35, mn = z * pxA * .9;
      a = min(1., rx * ry / (max(rx, mn) * max(ry, mn))) * (1. - .55 * smoothstep(6., 20., z));
      rx = max(rx, mn); ry = max(ry, mn);
      vec3 hr = normalize(cross(v, vec3(0., 1., 0.))), hu = normalize(cross(hr, v));
      float tl = (rn(sh) - .5) * 1.1 + cos(da) * .4, ct = cos(tl), st = sin(tl);
      vec3 h2 = hr * ct + hu * st; hu = hu * ct - hr * st; hr = h2;
      if (mir) hu.y = -hu.y;
      P = cen + hr * uv.x * rx + hu * ((uv.y - .5) * 2.) * ry - hu * ry * .55;
      uv.y = uv.y * 2. - 1.;
      ribbon = false;
      lt = lit(b, cen.y - h0); tr = rn(sh);
      a *= 1. - smoothstep(24., 28., length(b));
    }
  }
  if (ribbon) {
    vec3 v = P - cam; float z = max(dot(v, FW), .05);
    vec3 sd = normalize(cross(T, v));
    float hw = max(wid * .5, z * pxA * .45);
    a *= min(1., wid * .5 / hw * (ty > .5 ? 1.8 : 1.));
    P += sd * uv.x * hw;
  }
  if (mir) { P.y = -P.y; a *= 1. - min(1., uC[11].z * 1.2); }
  vec3 v = P - cam; float z = dot(v, FW);
  vA = vec4(alb, a); vB = vec4(lt, tr, ty, mir ? 1. : 0.); vU = uv; vV = v;
  gl_Position = dead ? vec4(2., 2., 2., 1.) : vec4(dot(v, RT) / TANH, dot(v, UP) / TANH, (z * 2. / 2000. - 1.) * z, z);
}`,to=P+`uniform vec4 uC[23]; in vec4 vA; in vec4 vB; in vec2 vU; in vec3 vV; out vec4 o;
#define LS uC[4].xyz
void main() {
  float ty = vB.z; vec3 rd = normalize(vV);
  float cs = max(dot(rd, LS), 0.);
  vec3 sun = uC[5].xyz * uC[4].w, amb = uC[9].xyz;
  float a = vA.a; vec3 col;
  if (ty < 1.5) {
    col = vA.rgb * (amb * .85 + sun * vB.x * (.12 + vB.y * 1.5 * pow(cs, 3.))) + sun * vB.x * .07 * pow(cs, 12.) * uC[18].y;
    // dew strung along the backlit blades: a row of sparks that twinkle
    float dw = pow(max(sin(vU.y * 23. + vA.r * 91. + vA.g * 37.), 0.), 30.) * (.4 + .6 * sin(uC[0].w * 2.3 + vA.r * 60. + vU.y * 3.));
    col += sun * vB.x * dw * pow(cs, 6.) * 2.5 * uC[18].y; a = max(a, min(dw * pow(cs, 6.), 1.) * vA.a);
  } else {
    // a cotton-grass head: a ragged teardrop of silky hairs, narrow where the dark bract holds it, single hairs
    // showing at its edge; against the sun a bright halo round a greyer heart
    vec2 q = vU * 1.35;
    float wy = mix(1., .5, smoothstep(-.3, 1.1, q.y)), r = length(vec2(q.x / wy, q.y));
    float an = atan(q.x / (abs(q.y) + .06));
    float hair = .5 + .5 * sin(an * 37. + vB.y * 50.) * sin(an * 13. + vB.y * 21. + r * 5.);
    float core = smoothstep(.95, .5, r + (hair - .5) * .3 + (vB.y - .5) * .1);
    float halo = smoothstep(1.32, .75, r) * hair * hair;
    float br = smoothstep(.2, .08, length(q - vec2(0., 1.)));
    a *= max(max(core, halo * .5), br * .9);
    float bl = pow(cs, 2.5), rim = smoothstep(.25, 1.1, r);
    col = vec3(.86, .83, .78) * (amb * .85 + vec3(.08, .05, .03) + sun * vB.x * (.22 + bl * (.5 + 4. * rim)));
    col *= 1. - .4 * (1. - rim) * (.35 + .65 * bl);
    col = mix(col, vec3(.035, .028, .02) * (amb * 2. + sun * .1), br);
  }
  if (vB.w > .5) {
    float F = .02 + .98 * pow(1. - abs(rd.y), 5.);
    col = col * F + vec3(.012, .007, .0035) * (1. - F) * (amb * 2. + sun * .1);
  }
  if (a < .01) discard;
  col = max(col, 0.);
  o = uC[20].z > .5 ? vec4(col / (1. + col), a) : vec4(col, a);
}`,eo=`
vec2 cuv(vec3 d) { float z = acos(clamp(d.y, 0., 1.)) * .63661977; vec2 h = d.xz / max(length(d.xz), 1e-6); return pow(max(z, 1e-4), 1.4) * h; }
`,oo=P+"uniform sampler2D uN; uniform vec4 uA, uO; uniform vec4 uB[4]; uniform int uLZ; out vec4 o;"+ue+`
float hs1(float k) { return fract(sin(k * 12.9898) * 43758.5453); }
vec3 fld(vec2 p, vec3 d, float fp) {
  float th = 0.;
  if (uA.y == 1.) {
    // a mackerel sky: a ripple field (rows whose spacing and direction wander with the warp), broken along the rows
    // into cloudlets, crossed in places by a second weaker set into scales, thinning out in holes and lanes, ending at
    // a front, smoothing into plain sheet in patches
    vec2 r = vec2(dot(p, uB[0].xy), dot(p, vec2(-uB[0].y, uB[0].x)));
    float lam = uB[0].z, aa = clamp((lam / fp - 1.6) * .5, 0., 1.);
    float s = (r.y + (nA(r * .2 + 3.) - .5) * 2.4 + (nB(r * .55 + 8.) - .5) * .75) / lam;
    // in some parts of the sky the ripples run at nearly twice the wavelength; where the two meet, rows fork
    float mB = smoothstep(.4, .6, nC(p * .14 + 70.)), sB = s * .56 + .3;
    float k = floor(mix(s, sB, step(.5, mB)) + .5), al = lam * uB[0].w * mix(1., 1.5, mB);
    float row = .5 + .5 * aa * mix(cos(6.2831853 * s), cos(6.2831853 * sB), mB);
    float a = (r.x + (nC(r * .3 + 5.) - .5) * 2.5) / al + hs1(k) * 7.;
    float ac = .5 + .5 * clamp((al / fp - 1.6) * .5, 0., 1.) * cos(6.2831853 * a);
    vec2 r2 = vec2(dot(p, uB[1].xy), dot(p, vec2(-uB[1].y, uB[1].x)));
    float cr = .5 + .5 * aa * cos(6.2831853 * (r2.y + (nB(r2 * .22 + 2.) - .5) * 1.8 + (nA(r2 * .7 + 9.) - .5) * .5) / (lam * 1.25));
    float m2 = smoothstep(.58, .74, nC(p * .16 + 11.)) * uB[1].z;
    // the cloudlets: the ripple pattern plus noise at two to a third of the wavelength, cut by a soft threshold, so
    // rows join, fork and end, and no two cloudlets are the same shape
    vec2 q = r / lam, q2 = vec2(q.x * .62 - q.y * .78, q.x * .78 + q.y * .62), q3 = vec2(q.x * .17 + q.y * .98, q.y * .17 - q.x * .98);
    float a2 = clamp((lam / fp - 4.) * .25, 0., 1.);
    float f = (nA(q * .42 + 13.) - .5) * .6 + aa * (nB(q2 * 1.3 + 3.) - .5) * .55 + a2 * (nC(q3 * 3.1 + 7.) - .5) * .3;
    float od = smoothstep(.35, .65, nA(p * .21 + 50.));
    float T0 = row * mix(mix(1., ac, mix(.75, .45, od)), cr * 1.2, m2) * mix(.62, .78, od) + f * mix(1.5, 1., od) + mix(.26, .14, od) + (nA(p * .65 + 80.) - .5) * .4;
    vec2 pp = p - uO.xy;
    float cv = nA(p * .11 + 21.) * .45 + nB(p * .37 + 4.) * .35 + nC(p * .9 + 1.) * .2;
    float fr = smoothstep(-1.2, 1.2, dot(pp, uB[2].yz) - uO.z + (cv - .5) * 6.);
    float tc = .5 - (uB[2].x - .5) * .6, m = smoothstep(tc - .05, tc + .08, cv + (fr - .5) * .25 * uO.w);
    float sm = smoothstep(.58, .8, nB(p * .17 + 31.)) * uB[2].w;
    T0 = mix(T0, .5 + f * .4, sm) + (m - 1.) * .75;
    th = smoothstep(.3, .9, T0) * mix(.75, 1., m) * uB[1].w;
  } else {
    // streaked cirrus: the old streaks, bent by a slow warp so they no longer fan from one point, and cut along their
    // length into tufts, each a dense head with a tail that hooks over the same way
    vec2 c = vec2(p.x * .8 - p.y * .6, p.x * .6 + p.y * .8);
    c.y += (nA(c * .15 + 9.) - .5) * 1.6;
    float t = fract(c.x / 1.1 + nB(vec2(c.y * 1.1, 3.1)) * 2.5);
    float y = c.y + uB[3].z * .32 * t * t;
    float sv = nA(vec2(c.x * .5, y * 2.2)) * .65 + nB(vec2(c.x, y) * vec2(2., 6.)) * .25 + nC(vec2(c.x, y) * vec2(5., 17.)) * .1;
    float w = smoothstep(0., .12, t) * smoothstep(1., .5, t) * (1. + .6 * smoothstep(.4, .1, t));
    th = smoothstep(.5, .85, sv) * min(w * 1.45, 1.25) * .8;
  }
  // the overcast: a lid from a little above the sun up, its lower edge scalloped and rising and falling, rags of it
  // hanging clear below; its underside in slow rolls
  float lid = 0., roll = 0.;
  if (uA.y == 2.) {
    vec2 hz = normalize(d.xz + vec2(1e-5, 0.));
    float lE = uA.z + .045 * (nA(hz * 2.3 + 7.) - .5) + .018 * (nB(hz * 9. + 2.) - .5) + .008 * (nC(p * vec2(1.6, .7)) - .5);
    lid = smoothstep(lE - .003, lE + .022, d.y);
    float rg = smoothstep(.6, .74, nA(p * vec2(1.1, 2.6) + 41.) * .7 + nC(p * 3.3) * .3) * smoothstep(lE - .055, lE - .03, d.y) * smoothstep(lE + .01, lE - .012, d.y);
    lid = max(lid, rg * .85);
    vec2 lq = p * vec2(.6, 1.6);
    roll = nA(lq) * .6 + nB(lq * 3.1) * .3 + nC(lq * 7.) * .1;
  }
  return vec3(th, lid, roll);
}
void main() {
  float NK = uA.x, S = uA.w;
  vec2 qc = gl_FragCoord.xy / NK * 2. - 1.;
  float r0 = length(qc);
  vec2 h = qc / max(r0, 1e-6);
  vec4 acc = vec4(0.);
  for (int i = 0; i < 8 + uLZ; i++) {
    if (float(i) >= S * 2.) break;
    float j = floor(float(i) * .5), sn = float(i) - j * 2.;
    float r = max(r0 + ((j + .5) / S - .5) * 2. / NK, 1e-4);
    float z = pow(r, 1. / 1.4) * 1.5707963, sz = sin(z), dy = max(cos(z), .004);
    vec3 d = vec3(h.x * sz, dy, h.y * sz);
    float D = 1.2 * sz / (dy + .1);
    vec2 p = h * D + uO.xy;
    float fpT = D / max(r * NK * .5, 1.), fpR = 1.2 * (1. + .1 * dy) / ((dy + .1) * (dy + .1)) * 1.5707963 / 1.4 * pow(r, 1. / 1.4 - 1.) * 2. / NK;
    p += uB[3].xy * sn * (uA.y == 1. ? uB[0].z * .14 : .07);
    vec3 v = fld(p, d, max(fpT, fpR / S));
    if (sn < .5) acc += vec4(v.x, 0., v.y, v.z); else acc.y += v.x;
  }
  acc /= S;
  o = r0 > 1. ? vec4(0., .5, 0., .5) : vec4(acc.x, clamp(.5 + (acc.x - acc.y) * 2., 0., 1.), acc.z, acc.w);
}`,ao=P+"uniform sampler2D uN, uH, uT, uZ, uM; uniform int uLZ; out vec4 o;"+dt+$+eo+`
float hg(float c, float g) { float k = 1. + g * g - 2. * g * c; return (1. - g * g) / (k * sqrt(k)); }
// height integral of exp(-y / H) along the ray between t0 and t1 (exact for a straight ray)
float hInt(float y0, float y1, float dt, float H) {
  float dy = y1 - y0;
  return abs(dy) > 1e-3 * H ? dt * H * (exp(-max(y0, 0.) / H) - exp(-max(y1, 0.) / H)) / dy : dt * exp(-max(.5 * (y0 + y1), 0.) / H);
}
// far hills, mountains or forest edge on the horizon, softened by haze; returns colour and coverage
vec4 farLine(vec3 d, vec3 hz) {
  vec2 q = normalize(d.xz + vec2(1e-5, 0.));
  float k = uC[15].x, px = uC[18].z;
  float hil = nA(q * 3.1 + 20.) * .65 + nB(q * 9. + 40.) * .35;
  float eh = k > 1.5 ? (k > 2.5 ? .002 + .004 * hil : .012 + .06 * pow(hil, 2.2) * (.7 + .3 * nA(q * 27.))) : .004 + .028 * hil * hil;
  float fm = smoothstep(.42, .58, nC(q * 4. + 7.)) * (k == 1. ? 1. : k == 0. ? .45 : 0.);
  // the forest edge: a ragged wall of spruce, each crown a narrow spire of its own height, a few snags standing clear
  float az = at2(q.y, q.x) * 600., ti = floor(az);
  ivec2 tc = ivec2(int(ti) & 255, int(ti) >> 8 & 255);
  float tr = texelFetch(uN, tc, 0).w, tg = texelFetch(uN, tc.yx + ivec2(37, 101), 0).w, tf = abs(fract(az) - .5 - (tg - .5) * .2) * 2.;
  float spire = max(1. - tf * (.9 + .5 * tr), 0.) * step(.15, tg) * smoothstep(.3, .6, nB(q * 30.) + tg * .3);
  float ef = k == 1. ? fm * (.007 + .006 * nA(q * 45.) + .003 * nB(q * 140.) + .0075 * (.35 + .65 * tr) * spire) : fm * (.004 + .0035 * nA(q * 45.) + .002 * nB(q * 140.) + .0012 * nC(q * 330.));
  float ch = smoothstep(-px, px, eh - d.y), cf = smoothstep(-px, px, ef - d.y);
  vec2 sz = normalize(LS.xz + vec2(1e-5, 0.));
  float ca = dot(q, sz), lit = smoothstep(.0, -.9, ca);
  vec3 hc = mix(vec3(.04, .04, .08), vec3(.5, .3, .3) * (.5 + SUNC * .1), lit * .5);
  hc = mix(hc, hz, .5 + .3 * (1. - smoothstep(0., eh, d.y)) - .1 * smoothstep(.02, .05, eh));
  vec3 fc = mix(vec3(.02, .025, .03), hz, .38 + .4 * (1. - smoothstep(.0, ef * .7, d.y)));
  return vec4(mix(hc, fc, cf), max(ch, cf));
}
// the bog past the baked map: the pool systems carry on, larger toward the horizon, filtered by the footprint; S is
// the sky it mirrors
vec3 farPlain(vec3 ro, vec3 rd, float tW, vec3 S) {
  vec3 sun = SUNC * uC[4].w;
  vec3 pf = ro + rd * tW;
  float fp = tW * uC[18].z / max(-rd.y, .002);
  vec2 r = vec2(dot(pf.xz, uB[0].xy), dot(pf.xz, vec2(-uB[0].y, uB[0].x)));
  vec2 an = uB[1].yz;
  float pn = nA(r * an + uB[0].zw) * .64 + nB(r * an * 2.7 + uB[0].zw * 1.3) * .36;
  pn = mix(pn, nA(r * an * .4 + uB[0].zw + 17.) * .68 + nB(r * an * 1.2 + 5.) * .32, smoothstep(80., 300., tW));
  float w = .012 + .0035 * fp, pT = uB[1].x + .04;
  float pfr = smoothstep(pT + w, pT - w, pn);
  float rdg = smoothstep(pT + .01, pT + .12 + w, pn);
  float cs = max(dot(rd, LS), 0.), k2 = 1. - smoothstep(3., 14., fp);
  float mA = nA(pf.xz * .06 + 3.), mB = mix(.5, nB(pf.xz * .21 + 9.), k2), hth = smoothstep(.5, .64, nB(pf.xz * .21 + uB[0].zw * .7)) * uB[1].w;
  vec3 alb = mix(vec3(.16, .055, .04), vec3(.16, .11, .05), smoothstep(.3, .7, mA + (mB - .5) * .5));
  alb = mix(alb, vec3(.06, .045, .04), hth * .6);
  alb = mix(alb, vec3(.05, .06, .025), (1. - rdg) * .6) * (.8 + .4 * mB);
  alb = mix(alb, vec3(.7), uC[18].x * .12 * smoothstep(.45, .72, nB(pf.xz * .12 + 31.)));
  vec3 g = alb * (AMB * (.6 + .3 * rdg) + sun * (.03 + .25 * rdg + .3 * pow(cs, 4.)));
  float F = min(.02 + .98 * pow(1. - max(-rd.y, 0.), 5.), .7);
  return mix(g, vec3(.01, .006, .003) * (1. - F), pfr) + pfr * F * S;
}
// the cloud layer (hooked cirrus tufts, a mackerel sky or an overcast lid), laid over the sky and its mirror in the
// pools here so the main pass stays small; read from the baked map (drifting slowly round the zenith), lit by the sun
// on its flanks, inside the earth's shadow where the unrisen sun can't reach; returns colour and cover
vec4 clouds(vec3 d, float lb) {
  if (d.y <= 0.) return vec4(0.);
  vec2 hz = normalize(d.xz + vec2(1e-5, 0.)), sz = normalize(LS.xz + vec2(1e-5, 0.));
  float ca = dot(hz, sz), cs = dot(d, LS), ov = uC[22].x, mk = uC[21].w;
  float dr = TT * uC[13].x, cd = cos(dr), sd = sin(dr);
  vec2 u = cuv(d);
  vec4 M = textureLod(uM, .5 + .5 * vec2(u.x * cd - u.y * sd, u.x * sd + u.y * cd), lb);
  float th = M.x, fl = M.y * 2. - 1., lid = M.z * ov, roll = M.w;
  float cl = mix(th * uC[15].y * 1.25, 1., mk);
  cl *= mix(smoothstep(.02, .14, d.y) * (1. - smoothstep(.45, .85, d.y)), smoothstep(.0, .035, d.y), mk);
  // the streaks keep their soft pink
  vec3 cc = vec3(.45, .3, .4) * .6 + SUNC * (.06 + .3 * pow(max(cs, 0.), 5.)) * (.6 + .4 * smoothstep(.0, .2, d.y));
  if (mk > 0.) {
    // the sheet lit by a sun at or under the horizon: the sun's height where the cloud is (higher toward the sun, lower
    // away from it) puts the far side of the dome in the earth's shadow; lit flanks toward the sun, grey-violet away,
    // forward scattering toward the sun; with the sun up, thin parts bright and thick cores darker
    float E = uC[20].y, El = E + .12 * dot(d.xz, sz) / max(d.y, .03);
    float lit = smoothstep(-2.5, -1.3, El) * (.55 + .45 * smoothstep(-1.5, 1.5, El));
    float hs = smoothstep(2., 14., E);
    float dl = mix(.15 + .85 * clamp(.5 + fl * 1.6, 0., 1.), 1.1 - .5 * th, hs);
    float ph = .32 + .55 * pow(max(cs, 0.), 3.) + .5 * pow(max(cs, 0.), 12.);
    vec3 mc = AMB * (.42 + .2 * (1. - th)) + uC[6].xyz * .12;
    mc += SUNC * lit * dl * ph * (.28 + .2 * (1. - th) * max(cs, 0.)) * mix(1., .7, hs);
    // the setting moon: a soft glow in thin cloud round it
    mc += vec3(.55, .5, .55) * uC[10].w * .3 * exp(-length(d - uC[10].xyz) * 30.) * (1. - .6 * th);
    cc = mix(cc, mc, mk);
  }
  vec3 lc = vec3(0.);
  if (ov > 0.) {
    float lE = uC[22].y;
    lc = vec3(.085, .075, .1) * (.55 + .9 * roll * roll);
    lc += SUNC * (.22 * exp(-max(d.y - lE, 0.) * 16.) * (.15 + .85 * pow(max(ca, 0.), 2.)) * (.3 + 1.4 * roll * roll));
  }
  float c2 = clamp(cl, 0., 1.) * (1. - lid) * mix(.6, smoothstep(.0, .6, th) * .97, mk), a = 1. - (1. - lid) * (1. - c2);
  return vec4((lc * lid * (1. - c2) + cc * c2) / max(a, 1e-4), a);
}
void main() {
  ivec2 ic = ivec2(gl_FragCoord.xy);
  vec4 C = texelFetch(uT, ic, 0);
  vec3 col = uC[20].z > .5 ? C.rgb / max(1. - C.rgb, .004) : C.rgb;
  float z = texelFetch(uZ, ic, 0).x;
  vec2 fc = gl_FragCoord.xy / uC[2].w * 2. - 1.;
  vec3 ro = CAM, rd = normalize(FW + (fc.x * uC[2].xyz + fc.y * uC[3].xyz) * TANH);
  float t = z < .5 ? z * 2000. / dot(rd, FW) : (rd.y < -1e-4 ? ro.y / -rd.y : 1e6);
  // the sky and the pools' mirror of it (the main pass left in alpha how much of the pixel is sky, direct or mirrored)
  if (z > .995) {
    vec3 d = vec3(rd.x, abs(rd.y), rd.z), dm = d;
    float sk = C.a, lb = uC[13].y;
    if (rd.y < -.0004) {
      float cz = floor((z - .9962) * (4096. / .0037) + .5), ex = floor(cz / 64.);
      vec2 e = vec2(ex, cz - ex * 64.) / 63. * 2. - 1., nt = sign(e) * e * e * .25;
      dm = reflect(rd, normalize(vec3(nt.x, 1., nt.y))); dm.y = max(dm.y, .002); dm = normalize(dm);
      lb += .7;
    }
    vec4 K = clouds(dm, lb); col = mix(col, col * (1. - sk) + K.rgb * sk, K.a);
    // the far line is under .072 high (hills, mountains, trees): above that plus a pixel its cover is exactly 0
    if (d.y < .08 + uC[18].z) { vec4 fl = farLine(d, col / max(sk, .02)); col = mix(col, col * (1. - sk) + fl.rgb * sk, fl.a); }
    if (rd.y < -.0004 && t > uC[14].x * .94) col = mix(col, farPlain(ro, rd, t, col / max(sk, .02)), sk);
  }
  float jit = texelFetch(uN, ic & 255, 0).w;
  // the mist layer: march from the eye (or where the ray enters the layer) to the surface
  float cap = uC[7].w * 3.5;
  float ta = ro.y > cap ? (rd.y < 0. ? (ro.y - cap) / -rd.y : 1e9) : 0.;
  float tb = min(t, rd.y > 0. ? (cap - ro.y) / rd.y : 1e9);
  float sinE = max(uC[20].x, .02), cs = dot(rd, LS);
  float ph = .55 * hg(cs, .75) + .45 * hg(cs, .2);
  vec3 sun = SUNC * uC[4].w * .12, amb = AMB * .6;
  vec3 ins = vec3(0.); float Tr = 1.;
  if (tb > ta) {
    // segments: closer together near the eye for level and rising rays, even (so even in height) for falling ones;
    // the height profile is integrated exactly per segment and the wisps are read at its middle, so no sampling grain
    float tn = min(tb, ta + 400.), L = tn - ta, kp = rd.y < -.004 ? 1. : 2.;
    vec2 dr = vec2(uC[11].w, uC[12].w);
    float tp0 = ta;
    for (int i = 0; i < 8 + uLZ; i++) {
      float tp1 = ta + L * pow(float(i + 1) / 8., kp), dt = tp1 - tp0;
      vec3 pm = ro + rd * (.5 * (tp0 + tp1));
      vec2 q = pm.xz + dr;
      float top = uC[7].w * (.6 + .8 * nA(q * .045 + 5.));
      float n = nB(q * .12) * .72 + nC(q * .26 + pm.y * .5) * .28;
      float gap = mix(1., smoothstep(.28, .62, nC(q * .022 + 3.)) * 1.5, smoothstep(15., 60., length(pm.xz - ro.xz)) * (1. - uC[22].w));
      float y0 = ro.y + rd.y * tp0, y1 = ro.y + rd.y * tp1;
      // far out the mist lies in long banks across the view with clear lanes between, so the bog reads through it
      vec2 bq = vec2(dot(q, uC[2].xz), dot(q, normalize(FW.xz + vec2(1e-5, 0.))));
      float fr = smoothstep(10., 60., length(pm.xz - ro.xz));
      float band = mix(1., smoothstep(.4, .68, nA(bq * vec2(.022, .085) + 11.) + (nB(bq * vec2(.07, .3) + 5.) - .5) * .25) * 1.5 + .04, fr * (1. - uC[22].w)) * mix(1., .55, fr * (1. - uC[22].w));
      float od = uC[6].w * 2.6 * smoothstep(.22, .8, n) * gap * band * hInt(y0 - uC[22].w * top * .8, y1 - uC[22].w * top * .8, dt, mix(top * .5, .12, uC[22].w));
      // (over the pools only: from .03 up its weight is exactly 0)
      if (abs(pm.x) < uC[14].x && abs(pm.z) < uC[14].x) { float hv = Hs(pm.xz); if (hv < .03) od += uC[8].w * smoothstep(.03, -.08, hv) * (.3 + n) * (.5 + .7 * band) * hInt(y0, y1, dt, .3); }
      float st = exp(-uC[6].w * 1.1 * max(uC[7].w - pm.y, 0.) / sinE);
      vec3 Li = (sun * (.25 + .75 * st) * mix(ph, min(ph, 2.5), fr) + amb) * (1. + 1.4 * uC[22].w);
      float a = exp(-od);
      ins += Tr * (1. - a) * Li; Tr *= a;
      tp0 = tp1;
    }
    if (tb > tn) {
      vec3 p = ro + rd * (tn + min(tb - tn, 300.) * .5);
      float d = uC[6].w * (1. - smoothstep(uC[7].w * .3, uC[7].w, p.y)) * .55 * (.3 + 1.1 * smoothstep(.3, .7, nC((p.xz + vec2(uC[11].w, uC[12].w)) * .006 + 7.)));
      float a = exp(-min(d * .7 * min(tb - tn, 2000.), 1.1));
      ins += Tr * (1. - a) * (sun * .6 * min(ph, 2.5) + amb); Tr *= a;
    }
  }
  // the calling bird, far off: a dark fleck a few pixels across, wings beating
  if (uC[17].w > .5) {
    vec3 bv = uC[16].xyz - ro; float bd = length(bv);
    if (bd < t) {
      vec3 dv = rd - bv / bd; float px = uC[18].z, sx = dot(dv, uC[2].xyz), sy = dot(dv, uC[3].xyz), sp = .45 / bd;
      float cov = smoothstep(sp + px, sp, abs(sx)) * smoothstep(px * 1.2, px * .2, abs(sy - uC[16].w * abs(sx) * .5) - .03 / bd);
      cov = max(cov, smoothstep(px * 1.6, px * .4, length(vec2(sx, sy)) - .05 / bd));
      col = mix(col, AMB * .25, cov * .9);
    }
  }
  // thin haze over the whole bog, heavier toward the horizon
  float th = t < 1e5 ? min(t, 6000.) : 0.;
  float hz = 1. - exp(-th * uC[20].w * .0001 * exp(-max(rd.y, 0.) * 8.));
  vec3 hzc = AMB * 1.1 + SUNC * uC[4].w * .08 * ph;
  col = col * Tr + ins;
  col = mix(col, hzc, hz);
  // veiling glare of the low sun
  float ang = length(rd - LS);
  col += SUNC * uC[4].w * (.0022 / (ang * ang + .0016) + .03 * exp(-ang * 6.)) * .35 * (1.6 - .6 * uC[20].w) * mix(.45, 1., smoothstep(-.07, .005, rd.y));
  col *= uC[18].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col += (jit - .5) * (1.5 / 255.);
  o = vec4(col, 1.);
}`,x=t.__c511||(t.__c511=(()=>{const o=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),a=(w,y)=>{const b=t.createShader(y);return t.shaderSource(b,w),t.compileShader(b),b},s=a(Oe,t.VERTEX_SHADER),m=a($e,t.VERTEX_SHADER),n={noise:[s,Xe],det:[s,Ke],height:[s,Ve],shadow:[s,je],pine:[s,Qe],cloud:[s,oo],main:[s,Ye],ground:[s,Je],inst:[m,to],comp:[s,ao]},r={};for(const w in n){const y=t.createProgram(),b=a(n[w][1],t.FRAGMENT_SHADER);t.attachShader(y,n[w][0]),t.attachShader(y,b),t.linkProgram(y),r[w]={p:y,f:b,v:n[w][0]}}t.flush();const h=(w,y,b)=>{let E=((y&63)*64+(w&63))*4+b+77;return E^=E>>>16,E=Math.imul(E,2146121005),E^=E>>>15,E=Math.imul(E,2221713035),E^=E>>>16,Math.round((E>>>0&65535)/65535*255)},l=new Uint8Array(192*64*4);for(let w=0;w<3;w++)for(let y=0;y<64;y++)for(let b=0;b<64;b++){const E=(y*192+w*64+b)*4;l[E]=h(b,y,w),l[E+1]=h(b+1,y,w),l[E+2]=h(b,y+1,w),l[E+3]=h(b+1,y+1,w)}const f=(w,y,b,E,V,j,Se,xo)=>{const Be=t.createTexture();return t.bindTexture(t.TEXTURE_2D,Be),t.texImage2D(t.TEXTURE_2D,0,b,w,y,0,E,V,xo||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,j),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,j===t.LINEAR_MIPMAP_LINEAR?t.LINEAR:j),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,Se),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,Se),Be},u=(w,y)=>{const b=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,b),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,w,0),y&&t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,y,0),b},c=w=>{if(!t.getProgramParameter(r[w].p,t.LINK_STATUS))throw new Error("511 "+w+": "+t.getShaderInfoLog(r[w].f)+t.getShaderInfoLog(r[w].v)+t.getProgramInfoLog(r[w].p));const y=r[w].p,b={};r[w]=b,b.p=y;const E=t.getProgramParameter(y,t.ACTIVE_UNIFORMS);for(let V=0;V<E;V++){const j=t.getActiveUniform(y,V).name.replace("[0]","");b[j]=t.getUniformLocation(y,j)}t.useProgram(y),["uN","uH","uS","uD","uP","uT","uZ","uQ","uM"].forEach((V,j)=>{b[V]&&t.uniform1i(b[V],j)})};["noise","det","height","shadow","pine","cloud"].forEach(c);const C=t.createVertexArray();t.bindVertexArray(C),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE);const nt=f(256,256,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.REPEAT),yt=u(nt);t.viewport(0,0,256,256),t.useProgram(r.noise.p),t.drawArrays(t.TRIANGLES,0,3);const Ot=f(256,256,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.REPEAT),po=u(Ot);t.useProgram(r.det.p),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,nt),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,Ot),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(yt),t.deleteFramebuffer(po);const uo=f(192,64,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.REPEAT,l);return{P:r,vao:C,tN:nt,tD:Ot,tL:uo,tex:f,fbo:u,hf:o,ready:c,late:["main","ground","inst","comp"]}})()),R=x.P,tt=x.hf?0:1,A=(e,o)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,o)},xe=()=>{t.bindVertexArray(x.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.depthMask(!0)},pt=F>450,N=pt?1024:512,ut=72,st=pt?1024:512,Ft=ct*(J?1.25:0),Rt=it*(J?1.25:0),g={};{g.tH=tt?x.tex(N,N,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE):x.tex(N,N,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE),g.fH=x.fbo(g.tH),g.tS=tt?x.tex(N,N,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE):x.tex(N,N,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE),g.fS=x.fbo(g.tS),g.tP=x.tex(16,1,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),g.tQ=x.tex(512,512,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.CLAMP_TO_EDGE),g.fQ=x.fbo(g.tQ),g.tM=x.tex(st,st,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.CLAMP_TO_EDGE),g.fM=x.fbo(g.tM),xe(),t.bindFramebuffer(t.FRAMEBUFFER,g.fH),t.viewport(0,0,N,N);const e=R.height;t.useProgram(e.p),A(0,x.tL),t.uniform4fv(e.uB,St),t.uniform4f(e.uA,ut,N,tt,Fe),t.uniform4f(e.uW,Ft,Rt,0,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,g.fS),t.viewport(0,0,N,N);const o=R.shadow;t.useProgram(o.p),A(0,x.tN),A(1,g.tH),t.uniform4f(o.uA,ut,N,Math.sin(Z),Math.cos(Z)),t.uniform4f(o.uE,tt,0,0,0),t.uniform4f(o.uW,Ft,Rt,0,0),t.drawArrays(t.TRIANGLES,0,3),A(4,g.tP),t.texSubImage2D(t.TEXTURE_2D,0,0,0,16,1,t.RGBA,t.FLOAT,pe),Bt&&(A(7,null),t.bindFramebuffer(t.FRAMEBUFFER,g.fQ),t.viewport(0,0,512,512),t.useProgram(R.pine.p),A(0,x.tN),t.drawArrays(t.TRIANGLES,0,3),A(7,g.tQ),t.generateMipmap(t.TEXTURE_2D)),A(8,null),t.bindFramebuffer(t.FRAMEBUFFER,g.fM),t.viewport(0,0,st,st);const a=R.cloud;t.useProgram(a.p),A(0,x.tL),t.uniform4f(a.uA,st,ee?1:Ct?2:0,Math.max(kt+2.2,4)*W,4),t.uniform4f(a.uO,at[0],at[1],T.eo,T.ed),t.uniform4fv(a.uB,Ge),t.drawArrays(t.TRIANGLES,0,3),A(8,g.tM),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,null)}let et;{const e=tt?x.tex(F,F,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE):x.tex(F,F,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),o=x.tex(F,F,t.DEPTH_COMPONENT24,t.DEPTH_COMPONENT,t.UNSIGNED_INT,t.NEAREST,t.CLAMP_TO_EDGE);et={t:e,d:o,f:x.fbo(e,o),fc:x.fbo(e)},t.bindFramebuffer(t.FRAMEBUFFER,null)}x.late&&(x.late.forEach(x.ready),x.late=null);const so={yaw:0,pitch:0,x:0,y:0,z:0},xt=Math.tan(33*W),ve=2*xt/F,p={x:0,y:ae,z:0,yaw:X,pitch:oe},no=()=>{const e=z.view||so,o=Q(e.x||0,-2.5,2.5),s=Q(e.z||0,-2.5,2.5)+(J?1.25:0);p.x=re*o+ct*s,p.z=ce*o+it*s,p.y=ae+Q(e.y||0,rt?-.2:-.8,1.5),p.yaw=X+(e.yaw||0),p.pitch=Q(oe+(e.pitch||0),-1.3,1.3)},Pt=()=>{const e=Math.cos(p.pitch),o=[Math.sin(p.yaw)*e,Math.sin(p.pitch),Math.cos(p.yaw)*e],a=[Math.cos(p.yaw),0,-Math.sin(p.yaw)],s=[o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]];return{fw:o,rt:a,up:s}},we=(e,o)=>{const a=Pt(),s=e*2-1,m=1-o*2;let n=[0,1,2].map(f=>a.fw[f]+(s*a.rt[f]+m*a.up[f])*xt);const r=Math.hypot(n[0],n[1],n[2]);n=n.map(f=>f/r);let h=n[1]<-.01?(p.y-.1)/-n[1]:60;h=Q(h,3,60);const l=Math.hypot(n[0],n[2])||1;return[p.x+n[0]/l*h*Math.min(1,l*1.2),p.z+n[2]/l*h*Math.min(1,l*1.2),n]};let H=0,_t=0,q=0;const v=new Float32Array(23*4),ro=Y==="Before the sun"?1.5:Y==="Gold sunrise"?.85:1;let ye=NaN;const co=()=>{if(H===ye)return;ye=H;const e=kt+9*H,o=e*W,a=ot(-1,10,e),s=ot(-3,12,e),m=ot(-.5,.5,e);let n=ht([1,.36,.17],[1,.72,.42],a).map(c=>c*(3.2+3.2*a));ft&&(n=n.map((c,C)=>c*[.95,.55,.35][C]));const r=ht([.085,.12,.3],[.14,.25,.5],s);let h=ht([1.2,.55,.3],[1.2,.82,.5],a).map(c=>c*(.75+.4*ot(-3,3,e)));const l=ht([.5,.3,.42],[.55,.52,.62],s);if(ft){h=h.map((c,C)=>c*.5+[.3,.2,.24][C]);for(let c=0;c<3;c++)l[c]=l[c]*.5+[.2,.17,.22][c],r[c]=r[c]*.6+[.08,.07,.1][c]}if(se){h=h.map((c,C)=>c*[.95,.85,1.25][C]);for(let c=0;c<3;c++)l[c]=l[c]*.55+[.1,.13,.2][c],r[c]*=[.75,.9,1][c]}ft&&(n=n.map(c=>c*.6));let f=[0,1,2].map(c=>(r[c]*.55+l[c]*.45)*.95);if(_[1]||_[2]){const c=(n[0]+n[1]+n[2])/3;n=n.map(C=>C+(c-C)*(_[2]?.35:.25))}if(_[2]&&(f=f.map((c,C)=>c*[.8,.95,1.3][C])),Ct){f=f.map((c,C)=>c*[.7,.7,.75][C]);for(let c=0;c<3;c++)r[c]=r[c]*.45+[.05,.05,.06][c]}v.set([Math.sin(Z)*Math.cos(o),Math.sin(o),Math.cos(Z)*Math.cos(o),m],16),v.set([n[0],n[1],n[2],Math.tan(Math.max(o,-.05))],20),v.set([r[0],r[1],r[2],Mt[0]*(1-.85*H)],24),v.set([h[0],h[1],h[2],Mt[1]*(1+.6*H)],28),v.set([l[0],l[1],l[2],Mt[2]*(1-.9*H)],32),v.set([f[0],f[1],f[2],.25+.75*(1-ot(-1,5,e))],36);const u=Pe-H*3*W;v.set([Math.sin(ne)*Math.cos(u),Math.sin(u),Math.cos(ne)*Math.cos(u),.5+.5*(1-ot(0,8,e))],40),v.set([Math.sin(o),e,tt,ft?2.5:1],80),v[75]=ro*(1-.15*H)};v.set([ut,1/(2*ut),Bt,1/N],56),v.set([Ue,de,at[0],at[1]],60),v.set([T.dr,Math.max(0,Math.log2(ve*st/2.4)),0,0],52),v.set([Ie,1,ve,1],72),v.set([_[0],_[1],_[2],ee],84),v.set([Ct,Math.max(kt+2.2,4)*W,se,_e],88),v.set([Ft,Rt,1,rt?1.6:0],76);const S=22050,be=(e,o)=>{if(!z.sound.on)return;let a,s;if(e===0){a=Math.floor(S*2.3),s=new Float32Array(a);let m=0;for(let n=0;n<a;n++){const r=n/S;let h=1800,l=0;if(r<1.25){const f=Math.floor(r/.42),u=(r-f*.42)/.34;u<1&&(h=1550+700*u*u+50*Math.sin(u*11),l=Math.pow(Math.sin(Math.PI*u),.6)*(.8+.2*f/2))}else{const f=(r-1.25)/1.05,u=Math.sin(L*(12+12*f)*r);h=1950+650*f+240*u,l=(1-f)*(.65+.35*u)}m+=L*h/S,s[n]=l*(Math.sin(m)+.1*Math.sin(2*m))*.5}}else if(e===1){a=Math.floor(S*.75),s=new Float32Array(a);let m=0,n=625341585;for(let r=0;r<a;r++){const h=r/S,l=h<.4?h:h-.45,f=l>=0&&l<.16?Math.sin(Math.PI*l/.16):0;n=Math.imul(n^n>>>13,1540483477);const u=(n>>>8&65535)/32768-1;m+=L*(2900-900*l+300*Math.sin(L*85*h))/S,s[r]=f*(Math.sin(m)*.55+u*.35)*(.6+.4*Math.sin(L*95*h))*.5}}else{a=Math.floor(S*1.4),s=new Float32Array(a);let m=0;for(let n=0;n<a;n++){const r=n/S,h=r<.5?r:r-.85,l=h>=0&&h<.42?Math.pow(Math.sin(Math.PI*h/.42),.7):0;m+=L*(2450-420*h/.42+40*Math.sin(h*60))/S,s[n]=l*Math.sin(m)*.45}}z.sound.pcm(s,S,{vel:o?.18:.42,pan:o?(i()-.5)*1.4:0})},io=()=>{if(!z.sound.on)return;const e=Math.floor(S*.5),o=new Float32Array(e);let a=0,s=0;for(;s<e;){const m=Math.floor(S*(.03+.06*i())),n=2600+2600*i(),r=n+(i()-.4)*2200,h=Math.floor(S*.012*i());for(let l=0;l<m&&s<e;l++,s++){const f=l/m;a+=L*(n+(r-n)*f+180*Math.sin(f*40))/S,o[s]=Math.sin(a)*Math.sin(Math.PI*f)*.3}s+=h}z.sound.pcm(o,S,{vel:.12+.12*H,pan:.3})},ge={on:!1,t:0,x:0,y:0,z:0,dx:0,dz:1,v:9,fl:0,ph:0,kind:We,zz:0};let ze=5+6*i(),Ht=-100,Ae=9+8*i();const lo=e=>{const o=ge;if(!o.on){if(q>ze){ze=q+24+18*i();const l=p.yaw+(i()-.5)*1.3,f=135+80*i(),u=(i()<.5?-1:1)*(1.2+.4*i());o.on=!0,o.t=0,o.x=p.x+Math.sin(l)*f,o.z=p.z+Math.cos(l)*f,o.y=.3,o.zz=i()*L;const c=Math.sin(l),C=Math.cos(l);o.dx=c*Math.cos(u)+C*Math.sin(u),o.dz=-c*Math.sin(u)+C*Math.cos(u),o.v=o.kind===1?12:o.kind===0?8.5:10,be(o.kind,!0)}return}o.t+=e;const a=o.kind===1?16:5+4*Math.sin(o.zz);o.y+=(a-o.y)*(1-Math.exp(-e*.5))+(o.t<.8?e*2:0);let s=o.dx,m=o.dz;if(o.kind===1){const l=Math.sin(o.t*5.5+o.zz)*.55*Math.exp(-o.t*.25),f=Math.cos(l),u=Math.sin(l);s=o.dx*f+o.dz*u,m=-o.dx*u+o.dz*f}const n=o.v*Math.min(1,.4+o.t*.8);o.x+=s*n*e,o.z+=m*n*e;const r=o.kind===0&&o.t%(2.6+Math.sin(o.zz))>1.9;o.ph+=e*L*(o.kind===1?7:o.kind===0?3.3:5)*(r?0:1),o.fl=r?-.15:Math.sin(o.ph);const h=Math.hypot(o.x-p.x,o.z-p.z);(o.t>24||h>330||h<120)&&(o.on=!1),o.on&&o.kind===0&&Math.abs(o.t-5.5)<e*.5&&be(0,!0)};let M=null,Dt=0,qt=0;const d={dx:Math.cos(lt+.6),dz:Math.sin(lt+.6),amp:0,cx:0,cz:0,r:7},vt=[0,0],Ce=(e,o,a,s,m)=>{const n=Math.hypot(a,s)||1;d.dx=a/n,d.dz=s/n,d.cx=e-d.dx*2,d.cz=o-d.dz*2,d.amp=Math.max(d.amp,m),z.sound.hit("noise",.04+.08*m,{dur:1.2,cutoff:450})},Ee=(e,o)=>{Ht=q;const a=we(e,o);Ce(a[0],a[1],a[2][0]+.3*d.dx,a[2][2]+.3*d.dz,.85)},ho=e=>{const o=z.input,a=o.taps();if(o.down){Ht=q,M||(M={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,path:0});const s=o.x-M.lx,m=o.y-M.ly;if(M.lx=o.x,M.ly=o.y,M.t+=e,M.path+=Math.hypot(s,m),M.path>.015){const n=we(o.x,o.y),r=Pt(),h=s*r.rt[0]-m*r.fw[0],l=s*r.rt[2]-m*r.fw[2],f=Math.hypot(h,l);if(f>1e-5){const u=1-Math.exp(-e*8);d.dx+=(h/f-d.dx)*u,d.dz+=(l/f-d.dz)*u;const c=Math.hypot(d.dx,d.dz)||1;d.dx/=c,d.dz/=c}d.cx+=(n[0]-d.cx)*(1-Math.exp(-e*6)),d.cz+=(n[1]-d.cz)*(1-Math.exp(-e*6)),d.amp=Math.min(1,d.amp+Math.hypot(s,m)*6),Dt-=e,Dt<=0&&(Dt=.4,z.sound.hit("noise",.05+.08*d.amp,{dur:.8,cutoff:500}))}else M.t>.35&&(_t=.1,qt-=e,qt<=0&&(qt=.5,io()))}else M?(M.path<=.015&&M.t<=.35&&Ee(M.x0,M.y0),M=null):a.length&&Ee(a[0].x,a[0].y),_t=-.012},fo=e=>{if(q+=e,H=Q(H+_t*e,0,1),M&&M.path>.015||(d.amp*=Math.exp(-e/2.2),d.cx+=d.dx*2.5*e,d.cz+=d.dz*2.5*e),d.r=3.5+2.5*(1-d.amp),vt[0]+=d.dx*(.3+2.5*d.amp)*e,vt[1]+=d.dz*(.3+2.5*d.amp)*e,lo(e),q>Ae&&q-Ht>8){Ae=q+9+14*i();const o=p.yaw+(i()-.5)*1.1,a=6+22*i(),s=lt+.6+(i()-.5)*1.2;Ce(p.x+Math.sin(o)*a,p.z+Math.cos(o)*a,Math.cos(s),Math.sin(s),.25+.3*i())}},K=32,It=pt?250:140,Ut=pt?220:95,wt=360,Wt=new Uint8Array(K),ke=[.3,.8,1.6,3,5,8,12,17,23,30],Me=new Float64Array(K*5),Te=new Float64Array(K*5);for(let e=0;e<K;e++)for(let o=0;o<5;o++){const a=(e+o/4)*L/K;Me[e*5+o]=Math.cos(a),Te[e*5+o]=Math.sin(a)}const D=[NaN,NaN,NaN,NaN,NaN],mo=e=>{if(!(D[0]===p.x&&D[1]===p.y&&D[2]===p.z&&D[3]===p.yaw&&D[4]===p.pitch)){D[0]=p.x,D[1]=p.y,D[2]=p.z,D[3]=p.yaw,D[4]=p.pitch;for(let o=0;o<K;o++){let a=0;for(let s=0;s<5&&!a;s++){const m=Me[o*5+s],n=Te[o*5+s];for(let r=0;r<ke.length&&!a;r++){const h=ke[r],l=m*h-p.x,f=n*h-p.z,u=.6+.09*h;for(let c=0;c<2;c++){const C=(c?-.3:.25)-p.y,nt=l*e.fw[0]+C*e.fw[1]+f*e.fw[2],yt=Math.max(nt,0)*xt*1.05+u;if(nt>-u&&Math.abs(l*e.rt[0]+f*e.rt[2])<yt&&Math.abs(l*e.up[0]+C*e.up[1]+f*e.up[2])<yt){a=1;break}}}}Wt[o]=a}}},Ne=()=>{no();const e=Pt();v.set([p.x,p.y,p.z,q],0),v.set([e.fw[0],e.fw[1],e.fw[2],xt],4),v.set([e.rt[0],e.rt[1],e.rt[2],F],8),v.set([e.up[0],e.up[1],e.up[2],tt],12),co(),v.set([d.dx,d.dz,d.amp,vt[0]],44),v.set([d.cx,d.cz,d.r,vt[1]],48);const o=ge;v.set([o.x,o.y,o.z,o.fl],64),v[71]=o.on?1:0,xe(),A(0,x.tN),A(1,g.tH),A(2,g.tS),A(3,x.tD),A(4,g.tP),A(7,g.tQ),t.bindFramebuffer(t.FRAMEBUFFER,et.f),t.viewport(0,0,F,F),t.enable(t.DEPTH_TEST),t.depthFunc(t.ALWAYS),t.useProgram(R.main.p),t.uniform4fv(R.main.uC,v),t.uniform4fv(R.main.uB,St),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,et.fc),A(6,et.d),t.enable(t.BLEND),t.blendFuncSeparate(t.DST_ALPHA,t.ONE,t.ZERO,t.ONE),t.useProgram(R.ground.p),t.uniform4fv(R.ground.uC,v),t.drawArrays(t.TRIANGLES,0,3),A(6,null),t.bindFramebuffer(t.FRAMEBUFFER,et.f),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE_MINUS_SRC_ALPHA);const a=R.inst;t.useProgram(a.p),t.uniform4fv(a.uC,v),mo(e);for(let s=1;s>=0;s--)for(let m=0;m<K;){if(!Wt[m]){m++;continue}let n=m;for(;n<K&&Wt[n];)n++;const r=n-m;t.uniform4f(a.uK,0,s,1e4+It,m*It),t.drawArrays(t.TRIANGLE_STRIP,0,r*It*7*12-2),t.uniform4f(a.uK,0,s,2e4+Ut,m*Ut),t.drawArrays(t.TRIANGLE_STRIP,0,r*Ut*7*12-2),t.uniform4f(a.uK,1,s,1234,m*wt),t.drawArrays(t.TRIANGLE_STRIP,0,r*wt*12-2),t.uniform4f(a.uK,2,s,1234,m*wt),t.drawArrays(t.TRIANGLE_STRIP,0,r*wt*3*6-2),m=n}t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,F,F),A(5,et.t),A(6,et.d),A(8,g.tM),t.useProgram(R.comp.p),t.uniform4fv(R.comp.uC,v),t.uniform4fv(R.comp.uB,St),t.drawArrays(t.TRIANGLES,0,3),A(5,null),A(6,null),A(8,null)};Ne();let Gt=0;return(e,o)=>{for(o=Math.min(o||0,.25),ho(o),Gt+=o;Gt>1/60;)fo(1/60),Gt-=1/60;Ne()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
