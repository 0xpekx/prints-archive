// Arctic Harbour: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/555.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ae){Ae&&Ae.add({num:555,name:"Arctic Harbour",fam:"Vistas",recipe:"The snowy quay of a small fishing harbour in the polar twilight, with red cabins on stilts, racks of drying cod and boats on water so still it mirrors the peaks. The peaks, the cabins and the boats change every mint, and rare ones get a night of aurora. Tap the water to drop a pebble, drag to send a breath of wind across so the reflection breaks up, or hold to let the short day run out into stars and a thin green aurora.",interactive:"Tap the water to drop a pebble and watch the rings spread across the mirror; drag to send a cat's-paw of wind across the harbour so the reflection breaks into streaks and the racks creak; hold to run the short day out: the pink fades, the windows brighten and the first stars and a thin green aurora come out.",music:!0,gl:!0,fps:30,seed:0,make(V){const t=V.gl,J=V.size,ot=!!V.home,Wt=(e,o)=>{let s=e;for(let n=2;n<66;n+=8)s=Math.imul(s^parseInt(V.hash.slice(n,n+8),16),o)^s>>>13;const a=()=>{s=s+1831565813|0;let n=Math.imul(s^s>>>15,1|s);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296};for(let n=0;n<6;n++)a();return a},no=Wt(1431966158,2246822507),x=Wt(202374885,668265261),H=Wt(2119674654,374761393),gt=e=>{let o=0;for(const a in e)o+=e[a];let s=no()*o;for(const a in e)if(s-=e[a],s<0)return a;return Object.keys(e)[0]},yt=Math.PI*2,tt=Math.PI/180,j=(e,o,s)=>Math.max(o,Math.min(s,e));let ft=ot?"Pink summits":gt({"Pink summits":48,"Deep blue":26,"Gold on the peaks":19,"Aurora already":7});const ne=ot?"Horns":gt({Horns:50,"Long wall":34,"Twin spires":16}),Ot=ot?"Red row":gt({"Red row":42,"Red and ochre":36,"A few, far apart":22});let Xt=ot?"Glass":gt({Glass:55,"Slow swell":33,"Sea smoke":12}),Vt=ot?"Clear":gt({Clear:50,"Pink cirrus":35,"Light snowfall":15});const re=ot?"Two":gt({One:28,Two:46,Three:26}),ce=ot?"Along the shore":gt({"Along the shore":46,"Open water":34,"New ice on the harbour":20});let Dt=ot?"None":gt({None:72,"Full moon over the peaks":28});const ro=Wt(1373534748,2654435761),Pe=ro();let it=ot||Pe<.62?"Along the quay":Pe<.88?"Across the harbour":"Up the fjord";const _t=Wt(2047995477,625341585),Kt=[_t(),_t(),_t(),_t(),_t()],ie=_t;if(!ot){const e={"Along the quay":.5483870967741935,"Across the harbour":.5,"Up the fjord":.5833333333333334}[it];if(Kt[0]>e){const o=(Kt[0]-e)/(1-e)*46;it=o<12?"By the cabins":o<20?"Under the racks":o<24.5?"By the cabins":o<29?"Long lens on the row":o<37?"At the waterline":"Long lens on the row"}Kt[1]<.04&&(ft="Aurora night"),Dt==="None"&&Kt[2]<8/72&&it!=="Long lens on the row"&&ft!=="Gold on the peaks"&&(Dt="Low moon and its path"),ft==="Aurora night"&&(Vt==="Light snowfall"&&(Vt="Clear"),Xt==="Sea smoke"&&(Xt="Glass"),Dt="None")}V.trait("Light",ft),V.trait("Peaks",ne),V.trait("Cabins",Ot),V.trait("Water",Xt),V.trait("Sky",Vt),V.trait("Boats",re),V.trait("Ice",ce),V.trait("Moon",Dt),V.trait("View",it);const mt={"Pink summits":{zen:[.026,.054,.15],hor:[.13,.155,.26],belt:[.27,.12,.17],glo:[.7,.33,.18],sun:[2.1,.78,.7],hs:500,es:.05},"Deep blue":{zen:[.012,.03,.115],hor:[.05,.082,.2],belt:[.075,.045,.105],glo:[.26,.13,.11],sun:[1.3,.46,.56],hs:790,es:.08},"Gold on the peaks":{zen:[.04,.068,.15],hor:[.24,.2,.23],belt:[.34,.19,.13],glo:[1.35,.66,.22],sun:[2.7,1.3,.5],hs:360,es:.04},"Aurora already":{zen:[.02,.042,.13],hor:[.09,.115,.22],belt:[.12,.07,.11],glo:[.45,.22,.15],sun:[1.1,.45,.48],hs:760,es:.06},"Aurora night":{zen:[.012,.036,.085],hor:[.04,.07,.13],belt:[.04,.04,.07],glo:[.08,.06,.07],sun:[.4,.2,.25],hs:1500,es:.08}}[ft],le=2.1+(H()-.5)*.3,he=1.6*tt,fe=[Math.sin(le)*Math.cos(he),Math.sin(he),Math.cos(le)*Math.cos(he)],Ut=ft==="Aurora night",Fe=Ut?.93:ft==="Aurora already"?.62:ft==="Deep blue"?.3:0,co=Ut?1.6:ft==="Aurora already"?1:0,De=Xt==="Slow swell"?1:.22,io=Xt==="Sea smoke"?1:0,lo=Vt==="Pink cirrus"?1:0,ho=Vt==="Light snowfall"?1:0,Nt=Dt==="Low moon and its path",_e=Dt==="Full moon over the peaks"||Nt,me=[H(),H()],de=[.5,.6,.82].map(e=>e*(_e?{"Deep blue":.55,"Aurora already":.48,"Pink summits":.3,"Gold on the peaks":.06}[ft]*(Nt?.45:1):0)).map((e,o)=>e*(Nt?[1.25,.95,.6][o]:1)),jt=e=>86+9*Math.sin(e*.027+1)+4*Math.sin(e*.083)+2*Math.sin(e*.21),ue=e=>-122+6*Math.sin(e*.05)+3*Math.sin(e*.17),Ue=e=>e>0?.25+Math.min(e,5)*.36+Math.max(e-5,0)*.14+Math.max(e-60,0)*.06:Math.max(e*.3,-12),dt=(e,o)=>{const s=3.6+(e<-40?2.5*Math.sin(e*.13)+1.5*Math.sin(e*.31):0),a=Math.min(s-o,22+.35*Math.max(0,-o-15)-e),n=Math.min(o-jt(e),105-e+.4*Math.max(0,o-300)),i=ue(o)-e,l=a>0?Math.min(.3+a*.45,2+.1*Math.max(0,-o-15)):Math.max(a*.3,-12);return Math.max(l,Ue(i),Ue(n))},Rt=[];{const e=(o,s,a,n,i)=>Rt.push([o+(ot?0:(x()-.5)*260),s+(ot?0:(x()-.5)*260),a*(ot?1:.88+.24*x()),n*(ot?1:.9+.2*x()),x()*yt,i]);if(ne==="Horns")e(-640,1650,990,860,.1),e(720,1950,900,820,.14),e(60,2450,760,760,.2),e(470,720,390,460,.3),e(-1e3,950,560,560,.25),e(1500,1500,700,640,.2);else if(ne==="Long wall"){for(let o=0;o<8;o++)e(-1900+o*470+(x()-.5)*120,1250+(x()-.5)*300,(690+x()*200)*[1,1.16,.78,1.05,.9,1.22,.82,1][o],[520,720,470,640,560,780,480,620][o],[.1,.2,.06,.16,.1,.24,.08,.14][o]);e(-150,720,380,420,.4)}else e(-330,1300,1040,640,.07),e(260,1460,940,600,.08),e(-1300,1350,640,640,.25),e(1200,1900,720,700,.2),e(-20,800,360,420,.4);e(-1250,250,820,760,.15),e(-2100,-350,900,900,.15),e(-1750,750,650,600,.2),e(-800,-1300,780,820,.15),e(-60,-2050,700,760,.2),e(-1750,-1500,850,850,.15),e(2150,700,640,700,.2),e(2850,1800,820,800,.15),e(1750,2650,700,700,.2)}const kt=`#version 300 es
`+((t.__c555?t.__c555.pk:!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float")))?`#define PACK 1
`:"")+`precision highp float; precision highp int; precision highp sampler2D;
`,fo=kt+"out vec2 vUv; void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }",Ne=`
uniform sampler2D uN;
float hsh(vec2 p){ uvec2 q = uvec2(ivec2(floor(p)) + 65536); uint h = q.x * 1597334677u ^ q.y * 3812015801u; h ^= h >> 15u; h *= 0x2c1b3c6du; h ^= h >> 12u; h *= 0x297a2d39u; h ^= h >> 15u; return float(h & 0xffffffu) / 16777216.; }
float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).x; }
`,mo=kt+Ne+`
float landH(vec2 p){
  float x = p.x, z = p.y;
  float cA = 3.6 + (x < -40. ? 2.5 * sin(x * .13) + 1.5 * sin(x * .31) : 0.);
  float sA = min(cA - z, 22. + .35 * max(0., -z - 15.) - x);
  float zf = 86. + 9. * sin(x * .027 + 1.) + 4. * sin(x * .083) + 2. * sin(x * .21);
  float sC = min(z - zf, 105. - x + .4 * max(0., z - 300.));
  float sB = -122. + 6. * sin(z * .05) + 3. * sin(z * .17) - x;
  float hA = sA > 0. ? min(.3 + sA * .45, 2. + .1 * max(0., -z - 15.)) : max(sA * .3, -12.);
  float s = max(sB, sC);
  float hB = s > 0. ? .25 + min(s, 5.) * .36 + max(s - 5., 0.) * .14 + max(s - 60., 0.) * .06 : max(s * .3, -12.);
  return max(hA, hB);
}
uniform vec4 uB;
uniform sampler2D uPk;
in vec2 vUv; out vec4 o;
float smax(float a, float b, float k){ float h = max(k - abs(a - b), 0.) / k; return max(a, b) + h * h * k * .25; }
// a Lofoten peak: three unequal faces cut by ice, each a wall (a concave fan at the foot, a steep wall through the middle,
// a shoulder, the summit block), one or two faces bowed back into a cirque with a floor a third of the way up; knife ribs
// down every face, couloirs between them, the crest broken into teeth with deep notches
// couloirs and ribs of one peak, laid out round its summit: x the height they add, y how white the couloir is
vec2 det(vec2 bd, float bR, float hm, float ht){
  float rr = length(bd); vec2 dn = bd / (rr + 1e-3);
  // couloirs: radial furrows, white all the way down (their depth goes to the shader as the map's second channel), cut
  // no deeper than a fifth of their spacing (deeper and narrower, their walls stood past vertical)
  vec2 cq = dn * bR / 120. + vec2(rr / 260., -rr / 310.);
  float g1 = 1. - abs(n2(cq) * 2. - 1.), g2 = 1. - abs(n2(cq * 2.1 + 5.) * 2. - 1.);
  float cou = (pow(g1, 4.) * .65 + pow(g2, 4.) * .35) * smoothstep(30., 250., hm) * smoothstep(1.02, .6, ht);
  // ribs from the summit to the foot, proud in proportion to their spacing
  vec2 wq = dn * bR / 300.; wq += 1.1 * vec2(n2(wq * .3 + 3.) - .5, n2(wq * .3 + 9.) - .5);
  float rn = n2(wq + vec2(rr / 520., rr / 600.)), fr = min(rr / bR, 1.);
  float rib = rn < .5 ? smoothstep(.12, .5, rn) : smoothstep(.7, .5, rn);
  return vec2(rib * rib * smoothstep(40., 260., hm) * smoothstep(1.05, .8, ht) * (6. + 30. * fr) - cou * min(40. + .16 * hm, 24. * rr / bR), clamp(cou * 2.2, 0., 1.));
}
float mtn(vec2 p, out float gul){
  vec2 w = p + 240. * vec2(n2(p / 900.) + .5 * n2(p / 330. + 9.) - .75, n2(p / 900. + 31.) + .5 * n2(p / 330. + 4.) - .75) + 70. * vec2(n2(p / 120. + 2.) - .5, n2(p / 120. + 13.) - .5);
  float m = -60., best = -1e9, bR = 500., sec = -1e9, sR = 500.; vec2 bd = vec2(1., 0.), sd = bd;
  int np = int(uB.w + .5);
  for (int i = 0; i < np; i++) {
    vec4 a = texelFetch(uPk, ivec2(i, 0), 0), b = texelFetch(uPk, ivec2(i, 1), 0);
    vec2 d = w - a.xy;
    float r = -1e9, sl = 0., bk = 0.;
    for (int k = 0; k < 3; k++) {
      float fk = float(k), an = b.x + fk * 2.0944 + .4 * sin(b.x * 5. + fk * 1.7);
      vec2 fd = vec2(cos(an), sin(an));
      float rk = dot(d, fd) * (1. + .16 * sin(b.x * 7. + fk * 2.3));
      if (rk > r) { r = rk; sl = dot(d, vec2(-fd.y, fd.x)); bk = smoothstep(.5, .8, fract(b.x * 3.7 + fk * .618)); }
    }
    float sn = sl / (1.6 * max(r, 1.) + 40.), bw = bk * pow(clamp(1. - sn * sn, 0., 1.), 2.);
    r = mix(r * 1.55, length(d), b.y) + bw * a.w * .06;
    float u = 1. - r / a.w, j = fract(b.x * 13.1);
    float L1 = mix(.64, .24, bw), A0 = mix(.33, .12, bw) + .05 * j, B0 = mix(.8, .44, bw) - .05 * j;
    float h = u > 0. ? a.z * (.13 * pow(min(u / .3, 1.), 1.7) + L1 * smoothstep(A0, B0, u) + (.87 - L1) * smoothstep(mix(.8, .64, bw) - .04 * j, 1.03, u)) : -60. * (r - a.w) / a.w;
    if (h > best) { sec = best; sd = bd; sR = bR; best = h; bd = d; bR = a.w; } else if (h > sec) { sec = h; sd = d; sR = a.w; }
    m = (h > -15. && m > -15.) ? smax(m, h, 30.) : max(m, h);
  }
  m = min(m, (length(p - vec2(-10., 40.)) - 230.) * 1.6);
  float hm = max(m, 0.), ht = hm / max(best, 1.);
  // the two highest peaks here each lay out their own, blended where they meet: one peak's pattern cut off against the
  // other's left a line of cliffs down every col, a comb of fins on a spire seen edge-on
  vec2 dt = mix(det(sd, sR, hm, ht), det(bd, bR, hm, ht), .5 + .5 * smoothstep(0., 80., best - sec));
  m += dt.x; gul = dt.y;
  // broad relief
  vec2 q2 = w / 230.; float cr = 0., am = .5;
  for (int oc = 0; oc < 4; oc++) { float nn = 1. - abs(n2(q2) * 2. - 1.); cr += am * nn * nn; q2 = mat2(1.62, 1.18, -1.18, 1.62) * q2 + 3.1; am *= .5; }
  m += (cr - .45) * .4 * smoothstep(0., 150., hm) * (55. + .12 * hm);
  // the crest: teeth of different heights, one or two deep notches
  float nt = smoothstep(.55, .92, ht);
  float t1 = n2(p / 120. + 17.) * .7 + n2(p / 55. + 3.) * .3;
  float notch = smoothstep(.56, .86, n2(w / 430. + 41.));
  m += nt * ((t1 - .5) * 90. - notch * 105.);
  return m;
}
void main(){
  vec2 p = uB.xy + (vUv - .5) * uB.z;
  float lh = landH(p);
  if (lh > 3.) lh += (n2(p / 45.) * .6 + n2(p / 15.) * .4 - .5) * 11. * smoothstep(3., 14., lh);
  float gu = 0., mh = mtn(p, gu), h = max(lh, mh);
  gu *= smoothstep(-2., 6., mh - lh);
  h = mix(h, -20., smoothstep(3700., 4090., max(abs(p.x), abs(p.y))));
#ifdef PACK
  float v = clamp((h + 64.) / 1600., 0., 1.) * 255.; o = vec4(floor(v) / 255., fract(v), gu, 1.);
#else
  o = vec4(h, gu, 0., 1.);
#endif
}`,uo=kt+`
uniform vec4 uP[31];
uniform sampler2D uHF;
uniform sampler2D uHN;
in vec2 vUv; out vec4 o;
float DEC(vec4 t){
#ifdef PACK
  return (t.r + t.g / 255.) * 1600. - 64.;
#else
  return t.r;
#endif
}
void main(){
  float m = -1.;
  int n4 = int(uP[14].z), nk = n4 * 37 + 2;
  for (int j = 0; j < n4; j++) {
    float az = (vUv.x + (float(j) - 1.5) / 3. / 512.) * 6.28318 - 3.14159;
    vec2 dir = vec2(sin(az), cos(az));
    float dd = 60.;
    for (int k = 0; k < nk; k++) {
      vec2 p = uP[0].xz + dir * dd;
      vec2 qn = (p - uP[16].xy) / (2. * uP[16].z) + .5;
      vec2 an = abs(qn - .5) * 2.;
      float h = max(an.x, an.y) < .99 ? DEC(textureLod(uHN, qn, 0.)) : DEC(textureLod(uHF, p / (2. * uP[16].w) + .5, 0.));
      m = max(m, (h + 2.5 - uP[0].y) / dd);
      dd *= 1.031;
    }
  }
#ifdef PACK
  o = vec4(clamp(m * .25 + .5 + .01, 0., 1.), 0., 0., 1.);
#else
  o = vec4(m, 0., 0., 1.);
#endif
}`,ve=Ne+`
uniform vec4 uP[31];
uniform sampler2D uHF;
uniform sampler2D uHN;
uniform sampler2D uD;
#define TIME uP[0].w
float DEC(vec4 t){
#ifdef PACK
  return (t.r + t.g / 255.) * 1600. - 64.;
#else
  return t.r;
#endif
}
float H0(vec2 p){
  vec2 qn = (p - uP[16].xy) / (2. * uP[16].z) + .5;
  vec2 an = abs(qn - .5) * 2.; float m = max(an.x, an.y);
  float hf = DEC(textureLod(uHF, p / (2. * uP[16].w) + .5, 0.));
  if (m < .995) { float hn = DEC(textureLod(uHN, qn, 0.)); hf = mix(hn, hf, smoothstep(.93, .995, m)); }
  return hf;
}
vec3 skyBase(vec3 rd){
  float h = max(rd.y, 0.);
  vec2 hz = rd.xz; float hl = length(hz); hz = hl > 1e-5 ? hz / hl : vec2(1., 0.);
  float ca = dot(hz, normalize(uP[4].xz));
  float sunS = .5 + .5 * ca, anti = 1. - sunS, a2 = anti * anti;
  vec3 c = mix(uP[6].rgb, uP[7].rgb, pow(1. - h, 4.));
  float es = uP[8].w;
  c = mix(c, uP[7].rgb * vec3(.6, .68, .9), (.25 + .75 * a2) * smoothstep(es + .1, es - .02, h) * .8);
  float bh = (h - es - .17) / (h > es + .17 ? .2 : .1);
  c += uP[8].rgb * (.22 + .78 * a2) * exp(-bh * bh) * 1.25;
  c += uP[9].rgb * (pow(sunS, 5.) * exp(-h / .05) + .3 * sunS * sunS * exp(-h / .18));
  return c;
}
vec3 skyIrr(vec3 n){
  float side = dot(n.xz, normalize(uP[4].xz)), hor = 1. - abs(n.y) * .6;
  return mix(uP[18].rgb, uP[17].rgb, n.y * .5 + .5) + uP[19].rgb * max(side, 0.) * hor + uP[20].rgb * max(-side, 0.) * hor;
}
vec3 lampL(vec3 p, vec3 n){
  vec3 l = uP[11].xyz - p; float d2 = dot(l, l);
  return uP[12].rgb * uP[11].w * 2.6 * max(dot(n, l * inversesqrt(d2)) * .8 + .2, 0.) / (1. + d2);
}
vec3 hazeN(vec3 col, float D){ return mix(col, uP[7].rgb * .95, 1. - exp(-D * uP[7].w)); }
`,Se=ve+`
uniform sampler2D uHz;
uniform vec4 uMo;
in vec2 vUv; out vec4 o;
float hT(vec2 p, float t){
  float h = H0(p);
  float a = smoothstep(380., 240., t);
  if (a > 0. && h > -3.) {
    float rk = smoothstep(-1., 1., h) * (1. - smoothstep(1.6, 4., h));
    h += (n2(p * .31) * .62 + n2(p * .83 + 5.) * .28 + n2(p * 2.1 + 9.) * .1 - .5) * (.3 + 1.6 * rk) * a;
  }
  return h;
}
vec3 haze(vec3 col, vec3 rd, float D){
  float f = 1. - exp(-D * uP[7].w);
  return mix(col, skyBase(normalize(vec3(rd.x, .02 + .3 * max(rd.y, 0.), rd.z))) * .95, f);
}
float at2(float y, float x){ float a = atan(y / (abs(x) + 1e-6)); return x >= 0. ? a : (y >= 0. ? 3.14159 - a : -3.14159 - a); }
float HZ(vec3 r){
  float v = textureLod(uHz, vec2(at2(r.x, r.z) / 6.28318 + .5, .5), 0.).x;
#ifdef PACK
  v = (v - .5) * 4.;
#endif
  return v;
}
// the moon stands clear of the real skyline in its azimuth (the horizon map knows the crest the bake made)
vec3 gMD = vec3(0., 1., 0.);
vec3 moonD(){ vec3 m = uP[10].xyz; float l = length(m.xz); vec2 h = m.xz / l; return normalize(vec3(h.x, max(m.y / l, HZ(vec3(h.x, 0., h.y)) + (uP[9].w > 1.5 ? .03 : .065)), h.y)); }
// slope and curvature of the land at two scales (one rolled loop, so the height lookup is inlined once)
void shp(vec2 p, float h, out vec3 nM, out vec3 nL, out float cM, out float cL){
  vec4 a = vec4(0.), b = vec4(0.);
  for (int k = 0; k < int(uP[14].z) * 2; k++) {
    float s = k < 4 ? 24. : 80.; int j = k & 3;
    vec2 o = j == 0 ? vec2(s, 0.) : j == 1 ? vec2(-s, 0.) : j == 2 ? vec2(0., s) : vec2(0., -s);
    float v = H0(p + o);
    if (k < 4) a[j] = v; else b[j] = v;
  }
  nM = normalize(vec3(a.y - a.x, 48., a.w - a.z)); cM = (a.x + a.y + a.z + a.w - 4. * h) / 24.;
  nL = normalize(vec3(b.y - b.x, 160., b.w - b.z)); cL = (b.x + b.y + b.z + b.w - 4. * h) / 80.;
}
vec3 skyC(vec3 rd){
  vec3 c = skyBase(rd);
  float h = rd.y;
  if (h > 0.) {
    if (uP[10].w > 0.) {
      vec2 q = rd.xz / (h + .06) * 1.2;
      vec2 qq = vec2(q.x * .35 + q.y * .2, q.y * 1.6 - q.x * .3);
      float cl = smoothstep(.48, .86, n2(qq * 1.3) * .6 + n2(qq * 3.7 + 4.) * .3 + n2(qq * 9.) * .1) * smoothstep(0., .12, h) * uP[10].w;
      float ca = dot(normalize(rd.xz + 1e-5), normalize(uP[4].xz));
      vec3 cc = mix(uP[8].rgb * 1.8 + uP[7].rgb * .3, uP[9].rgb * .8 + uP[8].rgb, .5 + .5 * ca) * (1. - uP[3].w * .85);
      c = mix(c, cc, cl * .75);
    }
    vec3 sp = rd * 190., ci = floor(sp);
    float hs = hsh(ci.xy + ci.z * 317.);
    if (hs > .984) {
      vec3 st = ci + .5 + (vec3(hsh(ci.yz + 3.), hsh(ci.zx + 7.), hsh(ci.xy + 11.)) - .5) * .7;
      float dd = length(sp - st);
      c += vec3(.9, .95, 1.) * uP[6].w * exp(-dd * dd * 30.) * pow((hs - .984) / .016, 3.) * 1.6 * smoothstep(0., .1, h);
    }
    vec3 fs = normalize(vec3(-.36, .5, .79)); float df = 1. - dot(rd, fs);
    c += vec3(1., .97, .9) * uP[14].w * (exp(-df * 2.2e6) * 2.5 + exp(-df * 4e4) * .04);
    if (uP[9].w > 0.) {
      bool lo = uP[9].w > 1.5;
      vec3 dv = rd - gMD; dv.y *= lo ? 1.2 : 1.;
      float dm = dot(dv, dv) * .5, r2 = (lo ? .016 : .0062) * (lo ? .016 : .0062) * .5;
      float disk = smoothstep(r2 * 1.12, r2 * .88, dm);
      vec3 mc = lo ? vec3(1., .46, .17) * (.75 + .25 * smoothstep(-.008, .008, rd.y - gMD.y)) : vec3(1., .96, .88) * 1.9;
      c = mix(c, mc * (lo ? .55 : 1.) * (.85 + .15 * n2(rd.xy * 2400.)), disk) + (lo ? vec3(.5, .3, .18) * 1.6 : vec3(.6, .65, .8)) * exp(-dm * 900.) * .08;
    }
  }
  return c;
}
vec3 enc(vec3 c){ return sqrt(c / (1. + c)) + (hsh(gl_FragCoord.xy + uMo.x * 37.) - .5) / 255.; }
// the ray of this pixel; on the mirror pass, the reflected ray from where the eye's ray meets the water
void ray(out vec3 d, out vec3 ro, out vec3 rd, out float tw){
  vec2 qs = vUv * 2. - 1.;
  d = normalize(uP[1].xyz + (qs.x * uP[2].xyz + qs.y * uP[3].xyz) * uP[1].w);
  ro = uP[0].xyz; rd = d; tw = 0.;
  if (uMo.x > .5) { rd = normalize(vec3(d.x, max(-d.y, .002), d.z)); tw = ro.y / max(-d.y, 1e-4); ro = vec3(ro.x + d.x * tw, 0., ro.z + d.z * tw); }
}
`,vo=kt+Se+`
float rl(vec4 A, vec3 p, vec3 n){ vec3 l = A.xyz - p; float d2 = dot(l, l); return A.w * max(dot(n, l * inversesqrt(d2)), 0.) / (4. + d2); }
// noise laid on the wall: two fixed vertical planes blended by which way the face looks (a coordinate turned with the
// face would swing hundreds of metres for a small turn and draw contour-like grain)
float wn(vec3 p, vec2 wt, vec2 sc, float o){ return n2(p.xy * sc + o) * wt.x + n2(p.zy * sc + o + 17.) * wt.y; }
vec3 shadeT(vec3 p, vec3 n, float cv, vec3 rd, float D){
  float fp = D * uMo.z * uP[1].w;   // a pixel's footprint in metres: detail finer than it fades to its mean
  float nz = n2(p.xz * .045) * .55 + n2(p.xz * .19 + 3.) * .3 + n2(p.xz * .9) * .15;
  float mt = smoothstep(16., 60., p.y);
  // the low land: snow everywhere but on steep banks
  float snow = smoothstep(.44, .62, n.y + (nz - .5) * .18 + cv * .9);
  float occ = 1., gul = 0.; vec4 nv = vec4(.5);
  if (mt > 0.) {
    // a mountain wall in January: white wherever snow can lie, the rock between nearly black, the couloirs white all
    // the way down, a cornice on the lee of each crest, the windward lip bare
    float hc = H0(p.xz);
    vec3 nM, nL; float cM, cL;
    shp(p.xz, hc, nM, nL, cM, cL);
    vec4 gt = textureLod(uHF, p.xz / (2. * uP[16].w) + .5, 0.);
#ifdef PACK
    gul = gt.b;
#else
    gul = gt.g;
#endif
    vec2 nh = normalize(nL.xz + 1e-4), wt = nh.yx * nh.yx;
    // the wall's four noises (snow streaks coarse and fine, rock coarse and fine) from one rolled loop: one call site
    for (int k = 0; k < int(uP[14].z); k++) {
      vec2 sc = k == 0 ? vec2(1. / 26., 1. / 52.) : k == 1 ? vec2(.1, .05) : k == 2 ? vec2(.045) : vec2(.19);
      nv += (wn(p, wt, sc, float(k) * 7.) - .5) * smoothstep(.8, .3, fp * sc.x) * vec4(equal(ivec4(k), ivec4(0, 1, 2, 3)));
    }
    float conc = smoothstep(.2, .7, cM * .7 + cL * .9), crest = smoothstep(-.5, -1.3, cM + .3 * cL);
    float lee = dot(normalize(nM.xz + 1e-4), vec2(.6, .8));
    float corn = crest * smoothstep(-.25, .3, lee) * smoothstep(.55, .8, nM.y), scour = crest * smoothstep(-.1, -.6, lee);
    // streaks drawn out down the fall line: snow ribs and dark runnels; each octave fades to its mean where a pixel
    // can no longer hold it, so far walls and tiles get no moire
    float st = nv.x * .6 + nv.y * .4;
    float hold = smoothstep(.38, .51, mix(nM.y, n.y, .2) + cL * .3 + conc * .1 + (st - .5) * .45);
    float sM = max(hold, corn);
    sM = max(sM, gul * smoothstep(-.05, .3, nM.y));
    sM = max(sM, smoothstep(.52, .68, nM.y) * smoothstep(140., 45., p.y));   // aprons and the fans at the foot
    sM *= 1. - .6 * scour * (1. - gul);
    sM = max(sM, .05 * smoothstep(.2, .9, dot(nh, vec2(.7, .7))));   // a dusting of rime on the north-east rock
    snow = mix(snow, sM, mt);
    n = normalize(mix(n, nM, smoothstep(.6, .85, nM.y) * mt));   // gentle snowfields lit by their large form
    // the sky is the only light: bowls and gullies see less of it than ribs
    occ = clamp(1. - .38 * conc - .2 * gul + .12 * crest, .5, 1.1);
  }
  snow *= smoothstep(.05, .7, p.y + (nz - .5) * .6);
  float sh0 = 1.;
  if (D < 420. && p.y < 7.) {
    int nb = int(uP[15].w);
    for (int i = 0; i < nb; i++) {
      vec4 A = texelFetch(uD, ivec2(i, 1), 0);
      if (A.w > 0.) {
        vec4 B = texelFetch(uD, ivec2(16 + i, 1), 0);
        vec2 dv = p.xz - A.xy, cs = vec2(cos(A.z), sin(A.z));
        vec2 l = vec2(dv.x * cs.x - dv.y * cs.y, dv.x * cs.y + dv.y * cs.x);
        vec2 ins = B.xy + .5 - abs(l);
        float m = smoothstep(0., 1.4, min(ins.x, ins.y));
        if (p.y < A.w) { sh0 *= 1. - .85 * m; snow *= 1. - m; }
      }
    }
  }
  vec2 mq = p.xz * (D < 300. ? .8 : .055);
  float m0 = n2(mq), m1 = n2(mq + vec2(.3, 0.)), m2 = n2(mq + vec2(0., .3));
  n = normalize(n + vec3(m0 - m1, 0., m0 - m2) * mix(D < 300. ? 1.2 : .45, .12, snow));
  float nzr = mix(nz, nv.z * .55 + nv.w * .45, mt);
  // the high rock is rimed: lighter the higher it stands, so the summits keep the alpenglow's colour, still far below snow
  vec3 rock = uP[15].rgb * (.4 + .9 * nzr) * (1. + .6 * mt * (nv.w - .5)) * (1. + 1.3 * mt * smoothstep(120., 700., p.y));
  vec3 alb = mix(rock, vec3(.85, .88, .94) * (.93 + .07 * nz), snow);
  if (p.y > 1.5 && p.y < 160. && mt < 1.) {
    float pch = smoothstep(.45, .75, n2(p.xz / 55. + 3.)) * smoothstep(160., 60., p.y) * smoothstep(1.5, 5., p.y);
    float scrub = smoothstep(.6, .78, n2(p.xz * .45) * .55 + n2(p.xz * 1.6 + 7.) * .45) * pch;
    alb = mix(alb, vec3(.045, .04, .035), scrub * mix(.35 * smoothstep(.45, .7, n2(p.xz * 5.3 + 2.)), .7, smoothstep(40., 160., D)));
    // rocks poking through the snow: dark on the flank that faces the viewer, capped on top
    vec2 tv = -rd.xz / (length(rd.xz) + 1e-5);
    vec2 rq = p.xz * .21 + 17., rq1 = (p.xz + tv * 1.2) * .21 + 17.;
    float rm = n2(rq) * .62 + n2(rq * 3.4 + 5.) * .38, rm1 = n2(rq1) * .62 + n2(rq1 * 3.4 + 5.) * .38;
    float rk = smoothstep(.7, .74, rm) * smoothstep(.45, .75, n2(p.xz / 60. + 5.)) * smoothstep(2.5, 6., p.y);
    alb = mix(alb, rock * .9, rk * (.3 + .7 * smoothstep(.0, .025, rm - rm1)));
    // the road behind the cabins: packed snow, ruts, ploughed banks; a ski track wandering up the slope
    float zr = 120. + 9. * sin(p.x * .027 + 1.) + 6. * sin(p.x * .011 + 2.);
    float dr = abs(p.z - zr), onR = smoothstep(-118., -108., p.x) * (1. - mt);
    float road = smoothstep(2.9, 2.5, dr) * onR;
    float ruts = smoothstep(.32, .08, abs(dr - .9 + .15 * n2(p.xz * vec2(.2, 3.)))) * road;
    alb = mix(alb, vec3(.58, .6, .66) * (.88 + .24 * n2(p.xz * vec2(.25, 1.7))) * (1. - .3 * ruts), road);
    alb *= 1. + .1 * smoothstep(2.6, 3.3, dr) * smoothstep(4.6, 3.3, dr) * onR;
    float zt = 142. + 9. * sin(p.x * .027 + 1.) + 20. * sin(p.x * .017 + 1.3) + 7. * sin(p.x * .047);
    alb *= 1. - .12 * smoothstep(.8, .25, abs(p.z - zt)) * smoothstep(-90., -60., p.x) * smoothstep(170., 120., p.x) * (1. - mt);
    // wind-packed drifts
    alb *= .96 + .08 * n2(p.xz * vec2(.03, .11) + 40.) * snow;
  }
  alb *= mix(.4, 1., smoothstep(-.1, .6, p.y));
  float ao = clamp(.82 + cv * .7, .45, 1.) * sh0;
  vec3 L = skyIrr(n) * ao * occ * (.84 + .3 * dot(n.xz, normalize(uP[4].xz))) + lampL(p, n);
  if (D < 900. && p.y < 60.) {
    L += uP[12].rgb * uP[11].w * 1.5 * (rl(uP[26], p, n) + rl(uP[27], p, n) + rl(uP[28], p, n) + rl(uP[29], p, n));
  }
  float lit = smoothstep(uP[4].w - 150., uP[4].w + 190., p.y + (nz - .5) * 90.);
  // the hidden sun on the summits above the Earth's shadow, and on moon mints the moon: one shadow march for both
  float dS = dot(n, uP[4].xyz) * .7 + .3, dMn = dot(n, gMD);
  int nk = int(uP[14].z) * 3, k0 = lit > .001 && dS > 0. ? 0 : nk, k1 = uP[30].x > 0. && dMn > 0. ? 2 * nk : nk;
  vec2 shd = vec2(1.); float s = 14.;
  for (int k = k0; k < k1; k++) {
    bool mo = k >= nk; if (k == nk) s = 14.;
    vec3 q = p + (mo ? gMD : uP[4].xyz) * s; float v = clamp((q.y - H0(q.xz)) / (s * .06) + .3, 0., 1.);
    if (mo) shd.y = min(shd.y, v); else shd.x = min(shd.x, v);
    s *= 1.5;
  }
  if (k0 == 0) L += uP[5].rgb * mix(vec3(.9, .42, .46), vec3(1.), lit) * lit * shd.x * dS;
  if (k1 > nk) L += uP[30].rgb * shd.y * dMn;
  vec3 col = alb * L;
  if (D < 60.) col += vec3(1., .9, .8) * pow(hsh(p.xz * 300.), 160.) * snow * .2 * (1. - D / 60.);
  return haze(col, rd, D * (.22 + 1.05 * exp(-max(p.y, 0.) / 300.)));
}
uniform sampler2D uMk;
void main(){
  gMD = moonD();
  vec4 m = texelFetch(uMk, ivec2(gl_FragCoord.xy), 0);
  o = m;
  if (m.a > .125 && m.a < .75) {   // land: the march left the distance in rgb
    vec3 d, ro, rd; float tw; ray(d, ro, rd, tw);
    float t = dot(floor(m.rgb * 255. + .5), vec3(65536., 256., 1.)) / 16777215. * 12000.;
    vec3 hp = ro + rd * t, tnrm = vec3(0., 1., 0.); float tcv = 0.;
    if (m.a > .375) {
      float ee = max(tw + t < 230. ? .45 : 8., (tw + t) * .0025); vec4 hh;
      for (int k = 0; k < int(uP[14].z); k++) hh[k] = hT(hp.xz + (k == 0 ? vec2(ee, 0.) : k == 1 ? vec2(-ee, 0.) : k == 2 ? vec2(0., ee) : vec2(0., -ee)), tw + t);
      tnrm = normalize(vec3(hh.y - hh.x, 2. * ee, hh.w - hh.z)); tcv = clamp((hh.x + hh.y + hh.z + hh.w - 4. * hp.y) / ee * .6, -.3, .3);
    }
    o = vec4(enc(shadeT(hp, tnrm, tcv, rd, tw + t)), uMo.x > .5 ? 0. : max(sqrt(t / 12000.) * .9, 2. / 255.));
  }
}`,po=kt+Se+`
vec4 trace(){
  vec3 d, ro, rd; float tw, t = .02; ray(d, ro, rd, tw);
  bool refl = uMo.x > .5, skip = false;
  float hl = length(d.xz) + 1e-5, tn = d.y / hl;
  if (refl) {
    float tr = rd.y / (length(rd.xz) + 1e-5);
    skip = d.y > -.0004 || tr > max(HZ(rd) * 1.15 + .07, .5);
  } else if (tn > .22) { skip = tn > HZ(d) + .02; t = 60. / hl; }
  float pt = 0., ba = 0., bb = 0.; bool hit = false, gone = skip, ins = refl && H0(ro.xz) > -.05; int bis = 0;
  int ns = 0; float lg = 1e9;
  for (int i = 0; i < (skip ? 0 : int(uP[14].z) * 80); i++) {
    vec3 p = ro + rd * t;
    // a ray passing within about a pixel of the land counts as touching it: a step can no longer slip past the
    // thin edge of an arete seen side-on (that drew a comb of fins along the spires)
    float h = hT(p.xz, tw + t), ep = (tw + t) * uMo.z * uP[1].w * .7;
    if (bis > 0) {
      if (p.y < h + ep) bb = t; else ba = t;
      bis++;
      if (bis > 6) { t = bb; ns = 5; break; } else t = .5 * (ba + bb);
    } else if (ins) {
      if (p.y > h + .05) ins = false;
      pt = t; t += max(.3, t * .08);
    } else if (p.y < h + ep) {
      hit = true; ba = pt; bb = t; bis = 1; t = .5 * (ba + bb);
    } else if (!refl && rd.y < 0. && p.y < .003) {
      gone = true; break;
    } else {
      if ((rd.y > 0. && p.y > 1350.) || max(abs(p.x), abs(p.z)) > uP[16].w || tw + t > 12000.) { gone = true; break; }
      // past the shore the next thing ahead may be a wall rising from low ground, and on the mountains walls stand up to
      // about 78 degrees: small steps there, so no step jumps a summit block, a spire's edge or a rib
      float k = h < 70. ? (tw + t < 260. ? (h < 4. ? .55 : .75) : .36) : .2;
      // the least step grows as the ray grazes a long wall, so no ray runs out of steps in mid-air (those were the
      // flags along the silhouettes)
      float st = max((p.y - h) * k, (.015 + (tw + t) * .0018) * (1. + float(i) * .01));
      if (h < -11.5) st = max(st, (tw + t) * .035);
      if (!refl && rd.y < 0.) st = min(st, p.y / (-rd.y) + .002);
      pt = t; t += st; lg = p.y - h;
    }
  }
  // out of steps while skimming the land far off (a long valley floor): take the land there, not the sky
  if (!hit && !ins && !gone && lg < (tw + t) * .03) hit = true;
  if (!hit && !ins) gone = true;
  if (gone || ins) {
    if (!refl && d.y < -.0004) return vec4(0.);   // open water: the composite does it per frame
    return vec4(enc(skyC(rd)), 1.);
  }
  // land: the distance in 24 bits; alpha .5 with the normal to take, .25 for a flat one (the shade pass does the rest;
  // its mirror output has alpha 0, which marks land and hides the aurora)
  uint u = uint(clamp(t / 12000., 0., 1.) * 16777215. + .5);
  return vec4(vec3(uvec3(u >> 16, (u >> 8) & 255u, u & 255u)) / 255., ns > 4 ? .5 : .25);
}
void main(){
  gMD = moonD();
  o = trace();
}
`,xo=kt+ve+`
uniform sampler2D uM;
uniform sampler2D uR;
uniform sampler2D uC;
uniform sampler2D uCR;
in vec2 vUv; out vec4 o;
float at2(float y, float x){ float a = atan(y / (abs(x) + 1e-6)); return x >= 0. ? a : (y >= 0. ? 3.14159 - a : -3.14159 - a); }
vec3 dec(vec3 e){ e = min(e, vec3(.995)); e *= e; return e / (1. - e); }
vec3 aur(vec3 rd){
  vec3 c = vec3(0.); float h = rd.y, aa = uP[5].w;
  if (h > 0. && aa > 0.) {
    float az0 = uP[25].x;
    vec2 hz = normalize(rd.xz + 1e-5);
    float cz = dot(hz, vec2(sin(az0), cos(az0)));
    float x = hz.x * cos(az0) - hz.y * sin(az0);
    if (aa > 1.5) {
      for (int k = 0; k < int(uP[14].z) - 1; k++) {   // three curtains, each a thin sheet folded along its length
        // each has its own stretch of sky (dark sky between and around them), a lower border that arches and folds, the
        // folds bright where the sheet is seen edge-on, fine rays fading upward from green to a faint red-violet top
        float fk = float(k), xs = x - (fk - 1.) * .38 - .03 - .05 * sin(fk * 2.3), Lh = .15 + .04 * fk;
        float env = smoothstep(Lh, Lh * .25, abs(xs)) * smoothstep(-.1, .5, cz) * (1. - .2 * fk);
        float ph = xs * 11. + fk * 2.1 + 1.2 * sin(xs * 5.3 + fk * 1.3) + TIME * .01;
        float yb = uP[25].y * (.8 - .08 * fk) - .5 * xs * xs + .04 * sin(ph) + .02 * (n2(vec2(xs * 4. + fk * 9., TIME * .006)) - .5);
        float dh = h - yb, edgeOn = .35 + .65 * pow(abs(cos(ph)), 3.);
        float ry = n2(vec2(xs * 170. + fk * 31., TIME * .04)) * .7 + n2(vec2(xs * 430. - TIME * .03, fk)) * .3;
        float on = smoothstep(-.003, .004, dh), r2 = ry * ry;
        float body = on * (exp(-max(dh, 0.) / (.02 + .04 * r2)) * (.25 + .9 * r2) + .3 * exp(-max(dh, 0.) / .045)) * edgeOn, edge = on * exp(-max(dh, 0.) / .006) * edgeOn;
        float top = on * smoothstep(.04, .1, dh) * exp(-max(dh, 0.) / .07) * (.3 + .7 * ry) * edgeOn;
        c += aa * env * (vec3(.07, .52, .16) * (body * .9 + edge * .8) + vec3(.2, .03, .17) * top * .35);
      }
    } else
    for (int k = 0; k < int(uP[14].z) - 2; k++) {   // two arcs, each a curtain folded along its length
      float fk = float(k);
      float fold = n2(vec2(x * 2.6 + fk * 7., TIME * .012 + fk)) - .5;
      float el = uP[25].y * (1. - .36 * fk) - .2 * (1. - cz) + fold * .17;
      float dh = h - el;
      float u = x * (15. + 9. * fk) + fold * 14.;
      float rays = n2(vec2(u + TIME * .05, TIME * .04 + fk * 3.)) * .65 + n2(vec2(u * 3.3 - TIME * .11, fk)) * .35;
      float cur = smoothstep(.3, .7, n2(vec2(x * 7. - TIME * .025, fk * 5.)) + .12);
      float band = smoothstep(-.016, .012, dh) * (exp(-max(dh, 0.) / (.025 + .075 * rays * rays)) * (.15 + .8 * rays * rays) + .5 * exp(-max(dh, 0.) / .014)) * cur;
      band *= smoothstep(-.6, .2, cz) * (1. - .45 * fk);
      c += aa * band * (vec3(.1, .78, .42) * .5 + vec3(.42, .1, .5) * smoothstep(.03, .22, dh) * .45);
    }
  }
  return c;
}
vec3 waterN(vec2 x, float dist){
  float T = TIME;
  vec2 g = vec2(0.);
  float sw = uP[13].w;
  g += sw * (vec2(.8, .6) * .045 * cos(dot(x, vec2(.8, .6)) * .21 - T * 1.43) + vec2(.3, .95) * .03 * cos(dot(x, vec2(.3, .95)) * .33 - T * 1.8 + 1.3) + vec2(-.6, .8) * .02 * cos(dot(x, vec2(-.6, .8)) * .5 - T * 2.2 + 4.));
  float fd = exp(-dist / 70.);
  vec2 q = x * .8 + vec2(T * .12, T * .05);
  float a = n2(q), b = n2(q + vec2(.25, 0.)), cc = n2(q + vec2(0., .25));
  g += vec2(b - a, cc - a) * .02 * fd;
  int nR = int(uP[25].z), nG = int(uP[25].w);
  for (int i = 0; i < nR; i++) {
    vec4 R = texelFetch(uD, ivec2(i, 0), 0);
    float age = T - R.z;
    if (R.w != 0. && age > 0. && age < 16.) {
      vec2 dv = x - R.xy; float r = length(dv) + 1e-3;
      float s1 = .35 + .2 * age;
      float e1 = exp(-pow((r - .59 * age) / s1, 2.)), e2 = exp(-pow((r - .39 * age) / (s1 * .8), 2.));
      float amp = R.w * exp(-age * .1) / (1. + r * .5);
      float dh = -amp * (e1 * .05 * sin(7. * r - 8.3 * age) + e2 * .04 * sin(16. * r - 12.5 * age));
      g += dv / r * dh;
    }
  }
  for (int i = 0; i < nG; i++) {
    vec4 G = texelFetch(uD, ivec2(16 + i, 0), 0);
    if (G.z > .001) {
      vec2 dv = x - G.xy; float w = G.z * exp(-dot(dv, dv) / (G.w * G.w));
      if (w > .002) {
        vec4 Dd = texelFetch(uD, ivec2(20 + i, 0), 0);
        vec2 al = Dd.xy, ac = vec2(-al.y, al.x);
        vec2 p2 = vec2(dot(x, al) * .7 - T * 2.4, dot(x, ac) * 4.5);
        float n0 = n2(p2), nA = n2(p2 + vec2(.2, 0.)), nB = n2(p2 + vec2(0., .2));
        vec2 gr = (nA - n0) * al * .7 + (nB - n0) * ac * 4.5;
        g += gr * w * .09 * (.4 + fd);
      }
    }
  }
  return normalize(vec3(-g.x, 1., -g.y));
}
float lg(vec4 A, vec3 o, vec3 d){ vec3 l = A.xyz - o; float dl = length(l), c2 = 1. - dot(d, l / dl), k = 1. + dl * dl * 4e-4; return A.w * (5e-7 / (c2 * k + 1e-6) + .004 * exp(-c2 * k * 400.)); }
vec3 glow(vec3 o, vec3 d){   // the quay lamp and the road lamps, seen as small haloes
  vec3 E2 = uP[11].xyz - o; float c2 = 1. - dot(d, normalize(E2));
  vec3 g = uP[12].rgb * uP[11].w * (3e-7 / (c2 + 1.5e-6) + .002 * exp(-c2 * 250.)) * .12;
  return g + uP[12].rgb * uP[11].w * .12 * (lg(uP[26], o, d) + lg(uP[27], o, d) + lg(uP[28], o, d) + lg(uP[29], o, d));
}
void main(){
  vec2 qs = vUv * 2. - 1.;
  vec3 E = uP[0].xyz, fw = uP[1].xyz, rt = uP[2].xyz, up = uP[3].xyz; float tanH = uP[1].w;
  vec3 d = normalize(fw + (qs.x * rt + qs.y * up) * tanH);
  vec4 M = texture(uM, vUv);
  float cov = M.a;
  vec3 col = vec3(0.), ad = d;
  float tEnd = 200., aw = 0.;
  if (cov < .996) {
    vec4 Cd = texelFetch(uC, ivec2(gl_FragCoord.xy), 0);
    if (Cd.a > .99) { col = dec(Cd.rgb); aw = 1.; tEnd = 3000.; }
    else if (Cd.a > .001) { float ta = Cd.a / .9; col = dec(Cd.rgb); tEnd = ta * ta * 12000.; }
    else if (d.y < -.0004) {
      // open water: ripple normal, reflected sky per frame, the reflected land from the per-view mirror cache
      float tw = E.y / -d.y; vec3 P = vec3(E.x + d.x * tw, 0., E.z + d.z * tw);
      vec3 wn = waterN(P.xz, tw);
      vec3 rd = reflect(d, wn); rd.y = max(rd.y, .002); rd = normalize(rd);
      vec3 sc = skyBase(rd); float skyW = 1., caW = 0.;
      vec3 dm = vec3(rd.x, -rd.y, rd.z);
      float fz = dot(dm, fw);
      if (fz > .05) {
        vec2 pm = vec2(dot(dm, rt), dot(dm, up)) / (fz * tanH) * .5 + .5;
        float ca = smoothstep(-.03, 0., pm.y) * smoothstep(-.03, 0., pm.x) * smoothstep(1.03, 1., pm.x);
        vec4 CRv = texture(uCR, pm);
        sc = mix(sc, dec(CRv.rgb), ca); skyW = mix(1., CRv.a, ca); caW = ca;
        vec2 uvm = vUv + (pm - vUv) * .75;
        vec4 MR = texture(uR, uvm);
        if (MR.a > .002) sc = mix(sc, dec(MR.rgb / MR.a), MR.a);
      }
      sc += glow(P, rd);
      if (uP[9].w > 1.5) {
        vec3 md = normalize(uP[10].xyz), hv = normalize(md - d);
        // the path: facets tilted toward the moon, broken into dashes across the line of sight by the ripples
        float g = dot(rd, md) - 1., sp = smoothstep(.45, .85, n2(P.xz * vec2(1.3, 5.5) + TIME * vec2(.08, .6)) * .7 + n2(P.xz * vec2(4., 14.) - TIME * vec2(.1, .9)) * .3);
        sc += vec3(1., .48, .18) * (exp(g * 7000.) * 1.3 + exp((hv.y - 1.) * 240.) * (.04 + 2.4 * sp * sp));
      }
      float F = .02 + .98 * pow(1. - max(dot(-d, wn), 0.), 5.);
      vec3 body = uP[24].rgb * uP[17].rgb;
      vec3 wc = mix(body, sc, F);
      float hp = H0(P.xz);
      float inz = (n2(P.xz * 1.7) - .5) * .4 + (n2(P.xz * .4) - .5) * .3, ik = uP[24].w;
      float ice = smoothstep(-.7, -.45, hp + inz - (ik < .5 ? .32 : 0.));
      if (ik > 1.5) ice = max(ice, (.42 + .3 * n2(P.xz * .3 + 5.)) * smoothstep(.53, .56, n2(P.xz * .021 + 3.) * .6 + n2(P.xz * .067 + 11.) * .4 + smoothstep(-9., -2., hp) * .2 + inz * .05));
      if (ice > 0.) {
        float cr = n2(P.xz * 4.);
        vec3 ic = vec3(.6, .68, .78) * (.85 + .3 * cr) * (uP[17].rgb * .95 + lampL(P, vec3(0., 1., 0.)));
        wc = mix(wc, ic, ice * .92);
      }
      // the aurora night's curtains mirrored only where the mirror cache holds the land (no hard edge where it ends)
      ad = rd; aw = skyW * F * (1. - ice * .92) * exp(-tw * uP[7].w) * (uP[5].w > 1.5 ? caW : 1.);
      col = hazeN(wc, tw);
      tEnd = tw;
    } else { col = skyBase(d); tEnd = 3000.; }
  }
  if (aw > 0.) col += aur(ad) * aw;
  if (cov > .002) col = mix(col, dec(M.rgb / cov), cov);
  col += glow(E, d);
  if (uP[14].y > 0. && d.y < .08) {
    float acc = 0., te = min(tEnd, 260.);
    // a made thing in front (the quay, the kerb, a boat): the smoke only reaches as far as the land or water behind it
    if (cov > .5) { float ca = texelFetch(uC, ivec2(gl_FragCoord.xy), 0).a; if (ca > .001 && ca < .99) te = min(te, ca * ca / .81 * 12000.); else if (ca <= .001 && d.y < -.0004) te = min(te, E.y / -d.y); }
    for (int k = 0; k < int(uP[14].z) + 2; k++) {
      float s = (float(k) + .5) / 6. * te; vec3 q = E + d * s;
      acc += smoothstep(6., .3, q.y) * smoothstep(.42, .8, n2(q.xz * .07 + vec2(TIME * .04, 0.)) * .7 + n2(q.xz * .21 - TIME * .07) * .3);
    }
    col = mix(col, skyBase(vec3(d.x, .05, d.z)) * 1.1 + uP[9].rgb * .05, clamp(acc / 6. * uP[14].y * (te / 120.), 0., .75));
  }
  if (uP[14].x > 0.) {
    vec3 fh = normalize(vec3(fw.x, 0., fw.z) + 1e-5), rh = vec3(fh.z, 0., -fh.x);
    float az = at2(dot(d, rh), dot(d, fh)), hl = length(d.xz) + 1e-4;
    for (int k = 0; k < int(uP[14].z) - 1; k++) {
      float z = k == 0 ? 2.5 : k == 1 ? 6. : 14.;
      vec2 u = vec2(az * z, d.y / hl * z + TIME * .8 + float(k) * 3.7);
      u.x += sin(u.y * .7 + float(k)) * .15;
      vec2 ci = floor(u / .45), f = fract(u / .45);
      float hs = hsh(ci + float(k) * 91.);
      if (hs > .55) {
        vec2 ctr = vec2(hsh(ci + 3.), hsh(ci + 7.)) * .8 + .1;
        float r = length((f - ctr) * .45) / (.011 + .004 * hs);
        col += vec3(.75, .8, .9) * exp(-r * r) * .35 * uP[14].x * (1. - uP[3].w * .5);
      }
    }
  }
  col *= uP[2].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col *= 1. - .1 * pow(length(qs) * .72, 2.4);
  col += (hsh(gl_FragCoord.xy + fract(TIME) * 711.) - .5) * .016;
  o = vec4(col, 1.);
}`,bo=kt+`
uniform vec4 uP[31];
uniform mat4 uVP; uniform vec4 uE;
in vec3 aP; in vec3 aN; in vec2 aT; in vec4 aM; in vec4 aS;
out vec3 vW; out vec3 vN; out vec2 vT; flat out vec4 vM; out float vZ;
void main(){
  vec3 p = aP, n = aN;
  int k = int(aM.w + .5);
  if (k >= 1 && k <= 3) {
    vec4 b = k == 1 ? uP[21] : k == 2 ? uP[22] : uP[23];
    vec3 q = p - aS.xyz;
    float cr = cos(b.y), sr = sin(b.y), cp = cos(b.z), sp = sin(b.z);
    q = vec3(q.x * cr - q.y * sr, q.x * sr + q.y * cr, q.z); n = vec3(n.x * cr - n.y * sr, n.x * sr + n.y * cr, n.z);
    q = vec3(q.x, q.y * cp - q.z * sp, q.y * sp + q.z * cp); n = vec3(n.x, n.y * cp - n.z * sp, n.y * sp + n.z * cp);
    p = aS.xyz + q + vec3(0., b.x, 0.);
  } else if (k == 5) {
    float s = max(aS.y - p.y, 0.), ph = aS.w * 6.283 + uP[0].w * (1.3 + aS.w * .6);
    p.xz += uP[13].xy * s * (uP[13].z * (.5 + .5 * sin(ph)) * .6 + .015 * sin(ph * .7));
  }
  vW = p; vN = n; vT = aT; vM = aM;
  vec3 pp = p; if (uE.w > .5) pp.y = -pp.y;
  gl_Position = uVP * vec4(pp, 1.);
  vZ = gl_Position.w;
}`,Be=kt+ve+`
uniform vec4 uE;
in vec3 vW; in vec3 vN; in vec2 vT; flat in vec4 vM; in float vZ;
out vec4 o;
const vec3 TINT[8] = vec3[8](vec3(.34, .068, .045), vec3(.5, .32, .1), vec3(.16, .13, .1), vec3(.22, .05, .04), vec3(.06, .13, .26), vec3(.07, .17, .11), vec3(.1, .12, .15), vec3(.36, .07, .045));
void main(){
  if (vW.y < -.005) discard;
  int mat = int(vM.x + .5), ti = int(vM.y + .5); float sd = vM.z;
#ifndef QUAY
  if (vW.y < H0(vW.xz) - .05) discard;
#endif
  vec3 Vd = vW - uE.xyz; float dist = length(Vd); vec3 V = Vd / dist;
  vec3 n = normalize(vN); if (dot(n, V) > 0.) n = -n;
  vec3 alb = vec3(.5), emis = vec3(0.); float spec = 0., ao = 1.;
  vec2 uv = vT;
  bool snowable = false;
  vec3 SNOW = vec3(.86, .89, .95);
#ifdef QUAY
  {
    vec2 w = vW.xz;
    if (n.y > .5) {
      if (w.y < -9.) {
        float tr = smoothstep(.3, .15, abs(abs(w.y + 12.) - .8)) * (.6 + .4 * n2(w * vec2(.5, 6.)));
        alb = mix(vec3(.72, .76, .84), vec3(.42, .43, .47), tr * .55) * (.9 + .1 * n2(w * 3.));
        float bank = smoothstep(-10., -9.2, w.y) + smoothstep(-14., -14.8, w.y);
        alb = mix(alb, SNOW, clamp(bank, 0., 1.));
      } else {
        float zz = 3.6 - w.y;
        float row = zz < .9 ? 0. : floor((zz - .9) / .62) + 1.;
        float fz = zz < .9 ? zz / .9 : fract((zz - .9) / .62);
        float rl = zz < .9 ? 1.7 : .9 + .5 * hsh(vec2(row, 4.));
        float xx = w.x / rl + hsh(vec2(row, 9.)) * 3.;
        float bi = floor(xx), fx = fract(xx);
        float jd = min(min(fx, 1. - fx) * rl, min(fz, 1. - fz) * (zz < .9 ? .9 : .62));
        float hb = hsh(vec2(bi, row));
        vec3 stone = vec3(.19, .185, .19) * (.7 + .4 * hb) * (.8 + .4 * n2(w * 40.) * n2(w * 9. + 3.));
        stone *= .62 + .76 * n2(w * 130. + hb * 50.) * n2(w * 37. + 5.) * 1.3;
        stone = mix(stone, stone * vec3(1.12, .96, .9), smoothstep(.55, .8, n2(w * 47. + 3.)));
        stone = mix(stone, vec3(.1, .095, .09), smoothstep(.035, .0, jd));
        stone *= 1. - .25 * smoothstep(.09, .03, jd);
        float sn = n2(w * .7) * .5 + n2(w * 2.3 + 5.) * .3 + n2(w * 9.) * .2;
        float cover = smoothstep(.2, .5, sn + .24 - .34 * smoothstep(1.4, .15, zz) + .22 * smoothstep(.06, 0., jd) + (n2(w * 38.) - .5) * .2);
        float dep = 0., rim = 0.; vec2 dg = vec2(0.);
        for (int s = 0; s < int(uP[14].z) - 1; s++) {
          vec2 A = s == 0 ? vec2(-3.5, -9.) : s == 1 ? vec2(-9., 3.) : vec2(6., -9.);
          vec2 B = s == 0 ? vec2(-1.0, 2.5) : s == 1 ? vec2(9., 3.12) : vec2(9.5, 2.6);
          vec2 ab = B - A; float L = length(ab); vec2 dr = ab / L, pr = vec2(-dr.y, dr.x);
          float sa = dot(w - A, dr), la = dot(w - A, pr);
          if (sa > -.3 && sa < L + .3 && abs(la) < .5) {
            float fi = floor(sa / .42 + .5);
            float side = mod(fi, 2.) * 2. - 1.;
            vec2 cc = A + dr * (fi * .42) + pr * side * (.13 + .03 * hsh(vec2(fi, float(s))));
            float rot = (hsh(vec2(fi, float(s) + 5.)) - .5) * .4;
            vec2 dd = w - cc; vec2 lq = vec2(dot(dd, dr) * cos(rot) + dot(dd, pr) * sin(rot), dot(dd, pr) * cos(rot) - dot(dd, dr) * sin(rot));
            vec2 lt = lq - vec2(.065, 0.), lh = lq + vec2(.115, 0.);
            vec2 rt2 = vec2(.12, .062), rh = vec2(.066, .056);
            float et = length(lt / rt2), eh = length(lh / rh);
            float e = min(et, eh); vec2 gq = et < eh ? lt / (rt2 * rt2) / max(et, .05) : lh / (rh * rh) / max(eh, .05);
            float dp = 1. - smoothstep(.55, 1.05, e + (n2(w * 30.) - .5) * .25);
            rim = max(rim, smoothstep(.95, 1.08, e) * smoothstep(1.4, 1.1, e));
            if (dp > dep) { dep = dp; dg = -gq * smoothstep(.5, .85, e) * smoothstep(1.12, .95, e); }
          }
        }
        dep *= cover; rim *= cover;
        alb = mix(stone, SNOW * (.8 + .2 * sn) * (.9 + .14 * n2(w * .33 + 7.)), cover);
        alb *= (1. - dep * .3) * (1. + rim * .07);
        alb = mix(alb, alb * vec3(.86, .92, 1.04), dep);
        n = normalize(n + vec3(dg.x, 0., dg.y) * .014 * dep + vec3(n2(w * 14.) - .5, 0., n2(w * 14. + 7.) - .5) * .16 * cover);
        spec = .12 * (1. - cover);
        if (dist < 14.) emis += vec3(.9, .9, 1.) * pow(hsh(w * 260.), 600.) * cover * .8;
      }
    } else {
      float row = floor(vW.y / .55), bi = floor((vW.x + vW.z) / 1.3 + hsh(vec2(row, 2.)) * 3.);
      alb = vec3(.2, .2, .21) * (.7 + .5 * hsh(vec2(bi, row))) * (.8 + .4 * n2(vec2(vW.x + vW.z, vW.y) * 6.));
      alb = mix(alb, vec3(.04, .045, .02), smoothstep(.9, .4, vW.y));
      alb = mix(alb, vec3(.7, .76, .84), smoothstep(.25, .08, vW.y) * .8);
    }
  }
#else
  if (mat == 0) {
    float bu = uv.x / .16, bi = floor(bu), fu = fract(bu), aa = clamp(1. - fwidth(bu) * 1.2, 0., 1.);
    float gap = 1. - (1. - smoothstep(0., .1, fu) * smoothstep(1., .9, fu)) * aa * .8;
    float hb = hsh(vec2(bi, sd * 91.));
    vec3 base = TINT[ti] * (.8 + .4 * hb) * (.82 + .36 * n2(vec2(uv.x * 6., uv.y * .8) + sd * 13.));
    base = mix(base, base * .5 + vec3(.012), smoothstep(1.3, 0., uv.y) * .7);
    base = mix(base, vec3(.3, .3, .3) * .4, smoothstep(.75, .95, n2(vec2(bi * 3.1, uv.y * 2.))) * .25);
    alb = base * gap;
    vec3 tg = normalize(cross(vec3(0., 1., 0.), n) + 1e-5);
    n = normalize(n + tg * (fu - .5) * .3 * aa);
  } else if (mat == 1) {
    alb = vec3(.72, .73, .72) * (.82 + .18 * n2(uv * 9. + sd * 7.)); snowable = true;
  } else if (mat == 2) {
    float fx = fwidth(uv.x) + fwidth(uv.y);
    float edge = min(min(uv.x, 1. - uv.x) * 1.3, min(uv.y, 1. - uv.y));
    float fr = smoothstep(.1 + fx, .1 - fx, edge);
    float mu = max(smoothstep(.04 + fx, .04 - fx, abs(uv.x - .5)), smoothstep(.035 + fx, .035 - fx, abs(uv.y - .6)));
    float frame = max(fr, mu);
    vec3 glass;
    if (ti == 1) {
      float cur = smoothstep(.36, .16, uv.x) + smoothstep(.64, .84, uv.x);
      float hb = hsh(vec2(sd * 977., 1.));
      vec3 warm = mix(vec3(1., .56, .24), vec3(1., .7, .4), hb);
      glass = warm * uP[12].w * (.5 + .9 * hsh(vec2(sd * 613., 5.))) * (.55 + .5 * smoothstep(0., .7, uv.y) * (1. - uv.y * .3)) * mix(1., .45, cur);
      emis = glass * (1. - frame); alb = mix(vec3(0.), vec3(.75), frame);
      emis += warm * uP[12].w * .08 * frame;
    } else {
      emis = vec3(.004, .005, .008) * (1. - frame); spec = .3 * (1. - frame) / .05;
      alb = vec3(.75) * frame + vec3(.01) * (1. - frame);
    }
  } else if (mat == 3 || mat == 19) {
    alb = SNOW * (.92 + .08 * n2(vW.xz * 3.));
    vec2 gq = vW.xz * 2.2 + sd * 5.;
    float a0 = n2(gq), ax = n2(gq + vec2(.3, 0.)), az = n2(gq + vec2(0., .3));
    n = normalize(n + vec3(a0 - ax, 0., a0 - az) * .8);
    spec = .05; ao = .6 + .4 * smoothstep(-.1, .85, n.y);
    if (dist < 10.) {
      vec2 fq = vW.xz * 17. + sd * 3.; float b0 = n2(fq), bx = n2(fq + vec2(.3, 0.)), bz = n2(fq + vec2(0., .3));
      n = normalize(n + vec3(b0 - bx, 0., b0 - bz) * .6);
      alb *= (.95 + .08 * n2(vW.xz * 45. + vW.y * 9.)) * mix(.72, 1., smoothstep(2.12, 2.17, vW.y));
      emis += vec3(.9, .92, 1.) * pow(hsh(floor(vW.xz * 260. + vW.y * 97.)), 500.) * .7;
    }
  } else if (mat == 4) {
    alb = vec3(.5, .62, .78); spec = .6; emis = vec3(.02, .03, .05);
  } else if (mat == 5) {
    alb = vec3(.11, .09, .075) * (.75 + .5 * n2(uv * vec2(4., .5) + sd * 9.));
    float sw = smoothstep(1.4 + .4 * n2(vec2(vW.x + vW.z, 0.) * 3.), 1.05, vW.y);
    alb = mix(alb, vec3(.045, .05, .022) * (.7 + .6 * n2(vW.xz * 9. + vW.y * 5.)), sw);
    float ice = smoothstep(.42 + .12 * n2(vec2(vW.x - vW.z, vW.y) * 6.), .22, vW.y);
    alb = mix(alb, vec3(.7, .78, .86), ice); spec = ice * .4 + sw * .2;
    snowable = true;
  } else if (mat == 6) {
    alb = vec3(.25, .21, .155) * (.6 + .8 * sd);
  } else if (mat == 7) {
    alb = TINT[ti] * (.78 + .3 * n2(uv * vec2(8., 3.) + sd * 5.));
    alb = mix(alb, vec3(.03, .02, .02), smoothstep(.16, .1, vW.y));
    alb *= 1. - .5 * smoothstep(.03, 0., abs(uv.y - .82));
    spec = .15;
  } else if (mat == 8) {
    alb = vec3(.74, .78, .84) * (.85 + .15 * n2(uv * 30.)); snowable = true;
  } else if (mat == 9) {
    float rs = smoothstep(.64, .82, n2(vW.xz * 7. + vW.y * 9.) * .7 + n2(vec2(atan(n.x / (abs(n.z) + 1e-3)), vW.y) * 13.) * .3);
    alb = mix(vec3(.03, .03, .034), vec3(.15, .065, .028), rs);
    spec = .25 * (1. - rs); snowable = true;
  } else if (mat == 10) {
    emis = uP[12].rgb * uP[11].w * .03; alb = vec3(0.);
  } else if (mat == 16) {
    alb = vec3(.16, .12, .08) * (.7 + .5 * n2(vec2(uv.x * 60., uv.y * 3.))) + vec3(.1, .11, .13) * n2(uv * 20.) * .6;
  } else if (mat == 17) {
    alb = vec3(.055, .045, .04);
  } else if (mat == 18) {
    alb = vec3(.2, .19, .17) * (.7 + .5 * n2(uv * vec2(.6, 6.) + sd * 3.)); snowable = true;
  } else if (mat == 20) {
    alb = vec3(.12, .105, .1) * (.75 + .5 * n2(vW.xz * 4. + vW.y * 3.)); snowable = true;
  } else if (mat == 22) {
    // old quay timber: dark, split along the grain, rimed
    float gx = vW.x * 1.3, gr = n2(vec2(gx, vW.y * 60. + vW.z * 60.)) * .6 + n2(vec2(gx * 4., vW.y * 160. + vW.z * 160.)) * .4;
    alb = vec3(.075, .062, .05) * (.65 + .7 * gr) * (.8 + .4 * hsh(vec2(sd * 99., 1.)));
    alb *= 1. - .6 * smoothstep(.12, .02, abs(gr - .5)) * step(.7, n2(vec2(gx * 2., sd * 30.)));
    alb = mix(alb, vec3(.6, .65, .72), smoothstep(.45, .9, n2(vec2(vW.x * 5., vW.z * 34. + vW.y * 20.))) * .3 * smoothstep(2.04, 2.13, vW.y));
    spec = .05;
  } else if (mat == 21) {
    alb = vec3(.55, .15, .04); spec = .3; snowable = true;
  }
#endif
  if (snowable && n.y > .7) { alb = SNOW * (.9 + .1 * n2(vW.xz * 5.)); spec = .05; }
  vec3 L = skyIrr(n) * ao + lampL(vW, n);
  vec3 col = alb * L + emis;
  if (spec > 0.) { vec3 r = reflect(V, n); float F = .04 + .96 * pow(1. - max(dot(-V, n), 0.), 5.); col += skyBase(r) * F * spec; }
  col = hazeN(col, dist);
  o = vec4(sqrt(col / (1. + col)) + (hsh(gl_FragCoord.xy) - .5) / 255., 1.);
  gl_FragDepth = log2(1. + vZ) / 14.3;
}`,S=t.__c555||(t.__c555=(()=>{t.getExtension("KHR_parallel_shader_compile");const e=!!t.getExtension("EXT_color_buffer_float"),o=e||!!t.getExtension("EXT_color_buffer_half_float"),s=(u,v)=>{const w=t.createShader(v);return t.shaderSource(w,u),t.compileShader(w),w},a=s(fo,t.VERTEX_SHADER),n=s(bo,t.VERTEX_SHADER),i={march:[a,po],cache:[a,vo],mesh:[n,Be],quay:[n,Be.replace("precision highp float;",`#define QUAY 1
precision highp float;`)],main:[a,xo],bake:[a,mo],hor:[a,uo]},l={};for(const u in i){const v=t.createProgram(),w=s(i[u][1],t.FRAGMENT_SHADER);t.attachShader(v,i[u][0]),t.attachShader(v,w),(u==="mesh"||u==="quay")&&["aP","aN","aT","aM","aS"].forEach((g,p)=>t.bindAttribLocation(v,p,g)),t.linkProgram(v),l[u]={p:v,f:w,v:i[u][0]}}t.flush();const b=new Uint8Array(256*256*4);let r=2654435769;for(let u=0;u<b.length;u++)r=Math.imul(r^r>>>15,739982445),r=Math.imul(r^r>>>12,695872825),r^=r>>>15,b[u]=r&255;const d=(u,v,w,g,p,y,E,R)=>{const P=t.createTexture();return t.bindTexture(t.TEXTURE_2D,P),t.texImage2D(t.TEXTURE_2D,0,w,u,v,0,g,p,R||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,y),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,y),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,E),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,E),P},f=d(256,256,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.REPEAT,b),c=u=>{const v=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),v},h={P:l,tN:f,nd:b,tex:d,fbo:c,fl:e,hf:o,pk:!o,gb:new Float32Array(16*15e4)};return h.tD=d(64,2,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),h.tPk=d(24,2,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),h.vao0=t.createVertexArray(),h.tHz=o?d(512,1,t.R16F,t.RED,t.HALF_FLOAT,t.LINEAR,t.REPEAT):d(512,1,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.REPEAT),h.fHz=c(h.tHz),h.link=()=>{for(const u in l){if(l[u].U)continue;if(!t.getProgramParameter(l[u].p,t.LINK_STATUS))throw new Error("555 "+u+": "+t.getShaderInfoLog(l[u].f)+t.getShaderInfoLog(l[u].v)+t.getProgramInfoLog(l[u].p));const v=l[u].p,w={},g=t.getProgramParameter(v,t.ACTIVE_UNIFORMS);for(let p=0;p<g;p++){const y=t.getActiveUniform(v,p).name.replace("[0]","");w[y]=t.getUniformLocation(v,y)}t.useProgram(v),["uN","uHF","uHN","uD","uM","uR","uPk","uHz","uC","uCR","uMk"].forEach((p,y)=>{w[p]&&t.uniform1i(w[p],y)}),l[u].U=w}},t.bindFramebuffer(t.FRAMEBUFFER,null),h})()),nt=S.P,wo=S.nd,Yt=(e,o)=>wo[((o&255)*256+(e&255))*4]/255,qe=(e,o)=>{const s=Math.floor(e),a=Math.floor(o);let n=e-s,i=o-a;return n=n*n*(3-2*n),i=i*i*(3-2*i),(Yt(s,a)*(1-n)+Yt(s+1,a)*n)*(1-i)+(Yt(s,a+1)*(1-n)+Yt(s+1,a+1)*n)*i},ut=(e,o)=>{let s=dt(e,o);return s>3&&(s+=(qe(e/45,o/45)*.6+qe(e/15,o/15)*.4-.5)*11*j((s-3)/11,0,1)**2*(3-2*j((s-3)/11,0,1))),s},lt=S.gb,Le=lt.length/16;let zt=0;const St=[],xt=[0,0,0,0,0,0,0,0];let at={ox:0,oy:0,oz:0,c:1,s:0};const Bt=(e,o,s,a)=>{at={ox:e,oy:o,oz:s,c:Math.cos(a),s:Math.sin(a)}},Qt=(e,o)=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]],bt=(e,o)=>[e[0]+o[0],e[1]+o[1],e[2]+o[2]],ht=(e,o)=>[e[0]*o,e[1]*o,e[2]*o],qt=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]],Lt=e=>{const o=Math.hypot(e[0],e[1],e[2]);return o<1e-9?[0,1,0]:[e[0]/o,e[1]/o,e[2]/o]},Ce=(e,o,s,a)=>{if(zt>=Le)return Le-1;const n=zt*16;lt[n]=at.ox+e[0]*at.c+e[2]*at.s,lt[n+1]=at.oy+e[1],lt[n+2]=at.oz-e[0]*at.s+e[2]*at.c,lt[n+3]=o[0]*at.c+o[2]*at.s,lt[n+4]=o[1],lt[n+5]=-o[0]*at.s+o[2]*at.c,lt[n+6]=s,lt[n+7]=a;for(let i=0;i<8;i++)lt[n+8+i]=xt[i];return zt++},Mo=e=>{let o=0,s=0,a=0;for(let n=0;n<e.length;n++){const i=e[n],l=e[(n+1)%e.length];o+=(i[1]-l[1])*(i[2]+l[2]),s+=(i[2]-l[2])*(i[0]+l[0]),a+=(i[0]-l[0])*(i[1]+l[1])}return Lt([o,s,a])},vt=(e,o)=>{const s=Mo(e),a=zt;for(let n=0;n<e.length;n++)Ce(e[n],s,o?o[n][0]:0,o?o[n][1]:0);for(let n=1;n<e.length-1;n++)St.push(a,a+n,a+n+1)},G=(e,o,s,a,n,i,l,b)=>vt([e,o,s,a],n?[n,i,l,b]:null),rt=(e,o,s,a,n,i)=>{G([e,o,s],[a,o,s],[a,n,s],[e,n,s],[e,o],[a,o],[a,n],[e,n]),G([a,o,i],[e,o,i],[e,n,i],[a,n,i],[a,o],[e,o],[e,n],[a,n]),G([e,o,i],[e,o,s],[e,n,s],[e,n,i],[i,o],[s,o],[s,n],[i,n]),G([a,o,s],[a,o,i],[a,n,i],[a,n,s],[s,o],[i,o],[i,n],[s,n]),G([e,n,s],[a,n,s],[a,n,i],[e,n,i],[e,s],[a,s],[a,i],[e,i]),G([e,o,i],[a,o,i],[a,o,s],[e,o,s],[e,i],[a,i],[a,s],[e,s])},Y=(e,o,s,a,n)=>{const i=Qt(o,e),l=Math.hypot(i[0],i[1],i[2]),b=ht(i,1/l),r=Math.abs(b[1])>.95?[1,0,0]:Lt(qt(b,[0,1,0])),d=qt(r,b),f=(h,u,v)=>bt(bt(h,ht(r,(u-.5)*s)),ht(d,(v-.5)*a)),c=[[0,0],[1,0],[1,1],[0,1]];for(let h=0;h<4;h++){const u=c[h],v=c[(h+1)%4];G(f(e,u[0],u[1]),f(e,v[0],v[1]),f(o,v[0],v[1]),f(o,u[0],u[1]),[h*s,0],[(h+1)*s,0],[(h+1)*s,l],[h*s,l])}n!==!1&&(vt([f(o,0,0),f(o,1,0),f(o,1,1),f(o,0,1)]),vt([f(e,0,1),f(e,1,1),f(e,1,0),f(e,0,0)]))},pt=(e,o,s)=>{const a=zt,n=.001;for(let i=0;i<=s;i++)for(let l=0;l<=o;l++){const b=l/o,r=i/s,d=e(b,r),f=Lt(qt(Qt(e(Math.min(b+n,1),r),e(Math.max(b-n,0),r)),Qt(e(b,Math.min(r+n,1)),e(b,Math.max(r-n,0)))));Ce(d,f,b,r)}for(let i=0;i<s;i++)for(let l=0;l<o;l++){const b=a+i*(o+1)+l;St.push(b,b+1,b+o+2,b,b+o+2,b+o+1)}},F=(e,o,s,a,n,i,l,b)=>{xt[0]=e,xt[1]=o,xt[2]=s,xt[3]=a||0,xt[4]=n||0,xt[5]=i||0,xt[6]=l||0,xt[7]=b||0},Eo=(e,o)=>{const s=e.length-1;pt((a,n)=>{const i=Math.min(a*s,s-1e-6),l=Math.floor(i),b=i-l,r=bt(ht(e[l],1-b),ht(e[l+1],b)),d=Lt(Qt(e[Math.min(l+1,s)],e[l])),f=Math.abs(d[1])>.9?[1,0,0]:Lt(qt(d,[0,1,0])),c=qt(f,d),h=n*yt;return bt(r,bt(ht(f,Math.cos(h)*o),ht(c,Math.sin(h)*o)))},Math.max(4,s*2),5)},go=(e,o,s,a)=>{const n=[];for(let i=0;i<=a;i++){const l=i/a,b=bt(ht(e,1-l),ht(o,l));b[1]-=s*4*l*(1-l),n.push(b)}return n},pe=[],Zt=[],xe=[];let Ie=0;const He=e=>120+9*Math.sin(e*.027+1)+6*Math.sin(e*.011+2),At=[],st=(e,o,s,a,n,i,l)=>{const b=Math.cos(s),r=Math.sin(s);return[[a,i],[n,i],[n,l],[a,l]].map(([d,f])=>[e+d*b+f*r,o-d*r+f*b])},Jt=(e,o)=>{for(const s of[e,o])for(let a=0;a<4;a++){const n=s[a],i=s[a+1&3],l=i[1]-n[1],b=n[0]-i[0];let r=1e9,d=-1e9,f=1e9,c=-1e9;for(const h of e){const u=h[0]*l+h[1]*b;r=Math.min(r,u),d=Math.max(d,u)}for(const h of o){const u=h[0]*l+h[1]*b;f=Math.min(f,u),c=Math.max(c,u)}if(d<f||c<r)return!0}return!1},be=e=>At.some(o=>!Jt(e,o)),we=(e,o)=>{for(let s=0;s<160;s++){const a=o?o*s*.5:(s&1?1:-1)*(s+1>>1)*.5;if(!be(e(a)))return a}return 0},Ge=(e,o)=>{const s=e.lean?e.law+.3:0;return[-(e.w2+.6)-(e.lsg<0?s:0),e.w2+.6+(e.lsg>0?s:0),o?-1.85:-.6,e.d+.6]},$t=(e,o,s,a)=>{const n=x();let i=n*4294967296>>>0;const l=()=>{i=i+1831565813|0;let M=Math.imul(i^i>>>15,1|i);return M=M+Math.imul(M^M>>>7,61|M)^M,((M^M>>>14)>>>0)/4294967296},b=l()<.2,r=b?1.28+l()*.22:.82+l()*.32,d=a.w*r,f=a.eh*(b?1.4+l()*.2:.88+l()*.26),c=d/2,h=a.d*(b?1.12:.86+l()*.28);let u=i;const v=()=>{u=u+1831565813|0;let M=Math.imul(u^u>>>15,1|u);return M=M+Math.imul(M^M>>>7,61|M)^M,((M^M>>>14)>>>0)/4294967296};for(let M=0;M<2;M++)v()<.24&&v(),v();if(b)for(let M=0;M<12;M++)v();v();const w={sd:n,w2:c,d:h,sea:b,lsg:v()<.5?-1:1,laz:v(),lzb:v(),law:1.5+v()*1.1,lean:v()<(b?.7:.42),deck:!!a.deck};if(a.place){const M=a.place(w);e=M.x,o=M.z,s=M.ang,a.fy=M.fy,a.over=M.over}const g=()=>Ge(w,a.deck&&a.over>0);if(!a.place){const M=g(),m=Math.cos(s),T=Math.sin(s),k=a.side||0,_=we(D=>st(e+D*m,o-D*T,s,...M),k);_&&(e+=_*m,o-=_*T,a.gnd&&(a.fy=a.gnd(e,o)))}At.push(st(e,o,s,...g())),Bt(e,0,o,s);const p=a.fy,y=p+f,E=Math.tan(a.pitch*(b?.9:1)),R=y+c*E,P=.42,A=.32,N=.12,X=.16+x()*.14;pe.push([e+h/2*at.s,o+h/2*at.c,s,p,c,h/2]),F(0,a.tint,n),G([-c,p,0],[c,p,0],[c,y,0],[-c,y,0],[0,0],[d,0],[d,f],[0,f]),G([c,p,h],[-c,p,h],[-c,y,h],[c,y,h],[0,0],[d,0],[d,f],[0,f]),G([-c,p,h],[-c,p,0],[-c,y,0],[-c,y,h],[0,0],[h,0],[h,f],[0,f]),G([c,p,0],[c,p,h],[c,y,h],[c,y,0],[0,0],[h,0],[h,f],[0,f]),vt([[-c,y,0],[c,y,0],[0,R,0]],[[0,f],[d,f],[c,f+c*E]]),vt([[c,y,h],[-c,y,h],[0,R,h]],[[0,f],[d,f],[c,f+c*E]]),F(1,0,n);for(const[M,m,T,k]of[[-c,0,1,1],[c,0,-1,1],[-c,h,1,-1],[c,h,-1,-1]])rt(Math.min(M-.04*T,M+.12*T),p-.3,Math.min(m-.04*k,m+.12*k),Math.max(M-.04*T,M+.12*T),y,Math.max(m-.04*k,m+.12*k));for(const M of[-A,h+A])for(const m of[-1,1])Y([m*(c+P),y-P*E-.05,M],[0,R+.02,M],.06,.24);F(17,0,n),rt(-c-.05,p-.32,-.05,c+.05,p,h+.05);for(const M of[-1,1]){const m=[M*(c+P),y-P*E],T=[0,R];F(17,0,n),G([m[0],m[1],-A],[0,T[1],-A],[0,T[1],h+A],[m[0],m[1],h+A]),F(1,0,n),G([m[0],m[1]-.06,-A],[m[0],m[1]-.06,h+A],[m[0],m[1]+N,h+A],[m[0],m[1]+N,-A],[0,0],[h,0],[h,.2],[0,.2]),F(3,0,n);const k=x()*9,_=l()<.24?.28+l()*.4:0,D=l()*9,Z=(U,K)=>{const ct=_>0?j(_+.1*Math.sin(K*5+D)+.05*Math.sin(K*17+D*2),.05,.9):0,Q=ct+(1-ct)*U,Gt=m[0]*(1-Q),se=m[1]+(T[1]-m[1])*Q+N+X*(1-.3*Q)*(_>0?Math.min(1,.15+U*3):1)+.035*Math.sin(K*13+k)*Math.sin(Q*7+k)+.02*Math.sin(K*31+k*2);return[Gt,se,-A+K*(h+2*A)]};pt(Z,3,Math.ceil(h*1.5)),_===0&&pt((U,K)=>{const ct=U*Math.PI*.6,Q=Z(0,K);return[Q[0]+M*Math.sin(ct)*.12,Q[1]-(1-Math.cos(ct))*(X+.06),Q[2]]},3,Math.ceil(h*1.5));for(const U of[-A,h+A]){const K=Z(0,U<0?0:1);G([K[0],K[1]-X*(_>0?.15:1),U],[0,T[1]+N,U],[0,T[1]+N+X*.7,U],[K[0],K[1],U])}F(4,0,n);for(let U=-A+.1+x()*.2;U<h+A-.08;U+=.1+x()*.26){const K=.04+Math.pow(x(),2.6)*.8,ct=.025+x()*.025,Q=M*(c+P+.03),Gt=m[1]-.06,se=x()*yt,No=[Q+(x()-.5)*.02,Gt-K,U],so=[0,1,2].map(Ft=>[Q+Math.cos(se+Ft*2.094)*ct,Gt,U+Math.sin(se+Ft*2.094)*ct]);for(let Ft=0;Ft<3;Ft++)vt([so[Ft],so[(Ft+1)%3],No])}}if(x()<.75){F(20,0,n);const M=(x()-.5)*c*.7,m=h*(.3+.5*x()),T=R-Math.abs(M)*E;Y([M,T-.5,m],[M,T+.85+X,m],.46,.5)}const I=(M,m,T,k,_,D,Z)=>{if(Z=Z||x,F(2,Z()<a.lit?1:0,Z()),D===0)G([M-k/2,m,T-.05],[M+k/2,m,T-.05],[M+k/2,m+_,T-.05],[M-k/2,m+_,T-.05],[0,0],[1,0],[1,1],[0,1]);else{const U=D*(c+.05);G([U,m,T-k/2],[U,m,T+k/2],[U,m+_,T+k/2],[U,m+_,T-k/2],[0,0],[1,0],[1,1],[0,1])}};I(-c*.48,p+.9,0,.72,.95,0),I(c*.48,p+.9,0,.72,.95,0),R-y>1.05&&I(0,y+.2,0,.55,.65,0);const C=Math.max(1,Math.floor(h/3));for(let M=0;M<C;M++){const m=h*(M+.6)/(C+.2);I(0,p+.95,m,.7,.9,-1),x()<.7&&I(0,p+.95,h*(M+.4)/(C+.2),.7,.9,1)}if(b){for(const M of[-.5,0,.5])I(c*M*1.1,p+f-1.45,0,.6,.8,0,l);for(let M=0;M<3;M++)I(0,p+f-1.45,h*(M+.7)/3.4,.6,.8,-1,l)}if(l()<.55){F(17,0,n);const M=b?c*.05:0;G([M-.42,p,-.06],[M+.42,p,-.06],[M+.42,p+1.85,-.06],[M-.42,p+1.85,-.06]),F(1,0,n),Y([M-.5,p+1.9,-.06],[M+.5,p+1.9,-.06],.05,.1)}{l();const M=Math.max(a.over>0?a.over+.5:0,h*(.3+l()*.2)),m=h-.3-l()*.6,T=1.5+l()*1.1,k=w.lsg;if(l()<(b?.7:.42)&&w.lean&&m-M>1.6){const _=k*c,D=k*(c+T),Z=p+f*.9,U=p+f*.58,K=m-M;F(0,a.tint,n+.37),G([D,p,M],[D,p,m],[D,U,m],[D,U,M],[0,0],[K,0],[K,U-p],[0,U-p]);for(const Q of[M,m])G([_,p,Q],[D,p,Q],[D,U,Q],[_,Z,Q],[0,0],[T,0],[T,U-p],[0,Z-p]);F(20,0,n),rt(Math.min(_,D),p-1.6,M,Math.max(_,D),p,m),F(17,0,n),G([_,Z+.04,M-.2],[D+k*.25,U-.08,M-.2],[D+k*.25,U-.08,m+.2],[_,Z+.04,m+.2]),F(3,0,n);const ct=X*(.7+l()*.5);pt((Q,Gt)=>[_+(D+k*.25-_)*Q,Z+.04+(U-.12-Z)*Q+ct*Math.sin(Math.min(1,Q*1.08)*Math.PI*.5+.5)*(Q>.97?.3:1),M-.2+Gt*(K+.4)],4,Math.ceil(K)),l()<.6&&I(k,p+.8,(M+m)/2,.55,.7,k*(c+T+.05)/(c+.05),l)}}if(a.over>0){F(5,0,n);const M=[.2,a.over*.5,a.over-.1,a.over+1.6,h-.3];for(const m of M){for(const T of[-c+.18,0,c-.18]){const k=(x()-.5)*.14;Y([T+k,-1.6,m+(x()-.5)*.1],[T,p-.3,m],.22,.22)}Y([-c,p-.48,m],[c,p-.48,m],.18,.24)}for(const m of[-1,1])Y([m*(c-.2),.35,.2],[0,p-.55,.2],.09,.15,!1);if(Y([-c+.2,.5,a.over*.5],[c-.2,p-.55,a.over*.5],.09,.15,!1),a.deck){F(18,0,n),rt(-c+.2,p-.14,-1.7,c-.2,p,0),F(5,0,n);for(const m of[-c+.3,c-.3])Y([m,-1.6,-1.6],[m,p-.14,-1.6],.18,.18);F(18,0,n);for(const m of[-c+.25,-c*.33,c*.33,c-.25])Y([m,p,-1.65],[m,p+.95,-1.65],.07,.07);Y([-c+.25,p+.95,-1.65],[c-.25,p+.95,-1.65],.07,.09);for(const m of[-1,1])Y([m*(c-.25),p+.95,-1.65],[m*(c-.25),p+.95,0],.07,.09)}}else F(20,0,n),rt(-c-.06,p-1.6,-.06,c+.06,p,h+.06)},Me=(e,o,s,a,n,i)=>{const l=we(h=>st(e+(i?0:h),o+(i?h:0),s,-a/2-.35,a/2+.35,-1.4,1.4),i||0);i?o+=l:e+=l,At.push(st(e,o,s,-a/2-.35,a/2+.35,-1.4,1.4)),Bt(e,0,o,s),xe.push([e,o,s,a,n,dt(e,o)]);const b=dt(e,o),r=Math.max(2,Math.round(a/3.3)+1),d=x();F(18,0,d);const f=h=>1.25*(1-(h-(b-1))/(n+1.15));for(let h=0;h<r;h++){const u=-a/2+h*a/(r-1),v=(x()-.5)*.1;Y([u,b-1,-1.25],[u+v,b+n+.15,.05],.1,.1),Y([u,b-1,1.25],[u+v,b+n+.15,-.05],.1,.1)}Y([-a/2-.2,b+n,0],[a/2+.2,b+n,0],.09,.09);const c=Math.max(2,Math.round(n/1.15));for(let h=0;h<c;h++)for(const u of[-1,1]){const v=b+(.3+.64*h/(c-1))*n,w=u*f(v);F(18,0,d),Y([-a/2-.3,v,w],[a/2+.3,v+(x()-.5)*.08,w],.07,.07);for(let g=-a/2+x()*.1;g<a/2;g+=.24+x()*.12){if(x()<.06){g+=.4+x()*.8;continue}for(const p of[-1,1]){const y=(.5+x()*.4)/.7,E=.85+x()*.3,R=w+p*(.045+x()*.02),P=(x()-.5)*.6,A=Math.cos(P),N=Math.sin(P),X=g+p*.035,I=p*.05;F(6,0,x(),5,0,v,0,x());const C=(T,k)=>[X+T*E*y*A,v+k*y,R+T*E*y*N+I*-k],M=(Math.sin(g*91.7+v*37.3+p*5.1+e*1.3)*43758.5%1-0)*.08,m=(T,k)=>{const _=C(T,k);return _[2]+=M*k*k*2,_};vt([m(-.045,.05),m(-.012,0),m(.012,0),m(.045,.05),m(.03,-.06),m(.06,-.24),m(.085,-.48),m(.07,-.66),m(.01,-.6),m(-.07,-.68),m(-.085,-.47),m(-.06,-.24),m(-.03,-.06)])}}}},Ee=[],ge=(e,o,s,a,n,i,l)=>{{const u=a*.17,v=p=>st(e,o-p,s,-u-.25,u+.25,-a/2-.25,a/2+.25),w=p=>st(e,o-p,s,-1,1,a/2+5.4,a/2+9.6);let g=0;for(;g<30&&(be(v(g))||be(w(g)));)g+=.5;o-=g,At.push(v(0),w(0))}Bt(e,0,o,s),Ee.push({x:e,z:o,ph:x()*yt,k:l});const b=a*.17,r=x(),d=(u,v,w,g)=>{const p=Math.max(1-u*u,0),y=(b-g)*Math.pow(p,.5)*(u>0?1-.12*u:1),E=.62+.34*u*u*u*u+.08*u*u-g*.4,R=-.45*Math.pow(p,.35),P=R+(E-R)*v;return[w*y*Math.pow(Math.sin(v*Math.PI/2),.55),P,u*a/2*(1-g*.4)]};for(const u of[-1,1]){F(7,n,r,l,e,0,o),pt((v,w)=>d(v*2-1,w,u,0),18,5),F(7,2,r,l,e,0,o),pt((v,w)=>d(v*2-1,.3+w*.7,u,.06),14,3),F(8,0,r,l,e,0,o);for(let v=0;v<18;v++){const w=v/9-1,g=(v+1)/9-1;G(d(w,1,u,0),d(g,1,u,0),bt(d(g,1,u,.06),[0,.04,0]),bt(d(w,1,u,.06),[0,.04,0]))}}F(19,0,r,l,e,0,o);const f=[];for(let u=0;u<=8;u++){const v=-.8+u*.2;f.push([d(v,.62,1,.06)[0]*.95,.14,v*a/2*.97])}for(let u=8;u>=0;u--){const v=-.8+u*.2;f.push([-d(v,.62,1,.06)[0]*.95,.14,v*a/2*.97])}vt(f),F(18,0,r,l,e,0,o);for(const u of[-.25,.32]){const v=d(u,.8,1,.06)[0];rt(-v,.38,u*a/2-.1,v,.44,u*a/2+.1)}if(i){const u=-.55*a/2,v=-.08*a/2,w=b*.62;F(7,2,r,l,e,0,o),rt(-w,.2,u,w,1.45,v),F(2,0,x(),l,e,0,o),G([-w*.8,1,v+.03],[w*.8,1,v+.03],[w*.8,1.38,v+.03],[-w*.8,1.38,v+.03],[0,0],[1,0],[1,1],[0,1]),F(19,0,r,l,e,0,o),rt(-w-.08,1.45,u-.1,w+.08,1.6,v+.12),F(18,0,r,l,e,0,o),Y([0,1.6,(u+v)/2],[0,3.7,(u+v)/2],.06,.06)}const c=d(1,1,0,0),h=[(x()-.5)*1.5,.1,a/2+6+x()*3];F(16,0,r),Eo(go(c,h,.5,8),.018),F(21,0,r),pt((u,v)=>{const w=u*yt,g=(v-.5)*Math.PI;return[h[0]+Math.cos(w)*Math.cos(g)*.24,h[1]+Math.sin(g)*.2,h[2]+Math.sin(w)*Math.cos(g)*.24]},8,5)},Ct=Ot==="A few, far apart"?3:Ot==="Red and ochre"?7:6,yo=()=>{zt=0,St.length=0,pe.length=0,xe.length=0,Ee.length=0,At.length=0,Bt(0,0,0,0),F(11,0,0),rt(-40,-.5,-15,22,2,3.6),Ie=St.length;const e=[],o=[];if(Ct===3)e.push(-62+x()*8,-12+x()*8,34+x()*8);else{let r=-80+x()*6;for(let d=0;d<Ct;d++){e.push(r);const f=x()<.25;o.push(f),r+=(f?7.5:15+x()*16)*(Ct===7?.85:1)}}const s=[];let a=null;for(let r=0;r<e.length;r++){const d=x()<.2,f=x()<.3?3+x()*7:-x()*2,c=3.6+x()*2.2,h=Ot==="Red and ochre"?[0,1,3,0,1,0,3][r]:x()<.18?3:0,u=d?4+x():5.2+x()*2,v=2.2+x()*.7,w=r>0&&!!o[r-1],g=!!o[r]&&r+1<e.length,p=E=>{E.lean&&(w&&E.lsg<0||g&&E.lsg>0)&&(w&&g?E.lean=!1:E.lsg=-E.lsg);const R=Ge(E,E.deck);let P,A,N=y;if(w){N=a.a+j(y-a.a,-.04,.04);const C=N-a.a,M=1.5+1.5*(E.sd*7919.37%1),m=a.w2+M+E.w2*Math.cos(C)-Math.min(0,E.d*Math.sin(C));P=a.x+m*Math.cos(a.a),A=a.z-m*Math.sin(a.a)}else{P=r?a.x+e[r]-e[r-1]:e[r];for(let C=0;C<4;C++){A=jt(P)-c+f;const M=Math.min(...st(P,A,N,...R).map(m=>m[0]));if(!r||M>=a.R+8)break;P+=a.R+8.05-M}}const X=dt(P,A+1),I=Math.max(w?j(v,a.fy-.1,a.fy+.1):v,X+.5);return a={x:P,z:A,a:N,w2:E.w2,fy:I,R:Math.max(...st(P,A,N,...R).map(C=>C[0]))},s.push(P),{x:P,z:A,ang:N,fy:I,over:Math.max(jt(P)-A,.5)}},y=(x()-.5)*.3;$t(0,0,y,{w:u,d:d?5+x()*2:7.5+x()*3,fy:0,eh:d?2.1+x()*.4:2.6+x()*.9,pitch:(35+x()*12)*tt,tint:d&&Ot!=="Red row"?1:h,over:Math.max(c-f,.5),lit:d?.25:.6,deck:!d&&x()<.45,place:p})}const n=Ct===3?1:2;for(let r=0;r<n;r++){const d=24+r*30+x()*6,f=3.5+x();$t(ue(d)+f,d,-Math.PI/2+(x()-.5)*.1,{w:5.6+x()*1.4,d:8+x()*2,fy:2.4+x()*.4,eh:2.8+x()*.5,pitch:(38+x()*8)*tt,tint:r?3:0,over:f,lit:.5,deck:!1})}const i=[1,2,0];[-22,-3.5,15].forEach((r,d)=>{const f=-29-x()*6;$t(r,f,Math.PI+(x()-.5)*.1,{w:6+x()*2,d:8+x()*2,fy:dt(r,f)+.4,gnd:(c,h)=>dt(c,h)+.4,eh:3+x()*.8,pitch:(36+x()*8)*tt,tint:i[d],over:0,lit:.55})});for(let r=0,d=0;r<4&&d<40;d++){const f=(x()-.5)*520,c=190+x()*260,h=ut(f,c);h<4||h>70||Math.abs(ut(f+6,c)-h)>2.5||Math.abs(ut(f,c+6)-h)>2.5||(r++,$t(f,c,(x()-.5)*.8+(x()<.5?0:Math.PI/2),{w:6+x()*2,d:8+x()*3,fy:h+.3,gnd:(u,v)=>ut(u,v)+.3,eh:3+x()*2.4,pitch:(33+x()*10)*tt,tint:[0,1,2,3][r%4],over:0,lit:.75}))}const l=[];for(let r=0;r+1<s.length;r++)l.push((s[r]+s[r+1])/2);for(const r of Ct===3?[-38,10,52]:[l[1],l[3]].filter(d=>d!==void 0))Me(r+(x()-.5)*4,jt(r)+16+x()*6,(x()-.5)*.12,13+x()*7,4+x()*.8,1);Me(ue(5)-9,5,-Math.PI/2+.05,18,4.4),Me(-41,-23,.04,12,3.6);const b=re==="One"?1:re==="Two"?2:3;ge(21,57,.5+(x()-.5)*.3,6.6,6,!0,1),b>1&&ge(-34,63,-.35+(x()-.5)*.3,5.1,7,!1,2),b>2&&ge(-4,70,1.2+(x()-.5)*.4,4.6,5,!1,3),Bt(0,0,0,0);for(let r=-40;r<21.5;){const d=Math.min(22,r+3.2+x()*3.4),f=x()*9,c=.05+x()*.08,h=x();let u=h*4294967296>>>0;const v=()=>{u=u+1831565813|0;let m=Math.imul(u^u>>>15,1|u);return m=m+Math.imul(m^m>>>7,61|m)^m,((m^m>>>14)>>>0)/4294967296},w=d-r,g=.004+v()*.012,p=.014+v()*.012,y=.026+v()*.02,E=v()*9,R=.025+v()*.03,P=m=>2.13-g*4*m*(1-m)-.005*Math.max(0,Math.sin(m*w*1.7+E))*Math.sin(m*w*4.3+E*2),A=m=>{const T=1+1.6*Math.exp(-Math.min(m,1-m)*w/.3),k=p*T,_=y*T,D=P(m);return[[3.32,1.97],[3.32,D-k],[3.32+k*.3,D-k*.3],[3.32+k,D],[3.56-_,D],[3.56-_*.3,D-_*.3],[3.56,D-_],[3.56,1.97]]},N=(m,T)=>{const k=A(m)[T],_=j((k[1]-2.04)/.08,0,1);return[r+w*m+(m===0?R:m===1?-R:0)*_,k[1],k[0]]};F(22,0,h),pt((m,T)=>{const k=T*7,_=Math.min(6,Math.floor(k)),D=k-_,Z=N(m,_),U=N(m,_+1);return bt(ht(Z,1-D),ht(U,D))},Math.ceil(w*4),7),vt([0,1,2,3,4,5,6,7].map(m=>N(0,m)).reverse()),vt([0,1,2,3,4,5,6,7].map(m=>N(1,m))),F(3,0,h);const X=v()*9,I=v()*9,C=v()<.3?.25+v()*.5:-1,M=.05+v()*.07;pt((m,T)=>{const k=r+.04+(w-.08)*m,_=Math.min(1,Math.min(m,1-m)*w/.45);let D=(c*.9+.07)*Math.pow(_,.6)*(.68+.34*Math.sin(m*w*.9+f)+.15*Math.sin(m*w*3.1+f*2)+.06*Math.sin(m*w*9+f))+.006;C>0&&(D*=j(Math.abs(m-C)/M-.4,0,1));const Z=Math.pow(Math.sin(T*Math.PI),.55),U=j(D/.03,0,1),K=3.32-.012*U+.02*(1-U)+.008*Math.sin(m*w*6+X),ct=3.56+.022*U-.03*(1-U)+.012*Math.sin(m*w*4.4+I);return[k,P(m)+D*Z-.012-.022*(1-Z)*U,K+(ct-K)*T]},Math.ceil(w*8),6),r=d+.25+x()*.7}F(9,0,.4),pt((r,d)=>{const f=r*yt,c=d*yt,h=.1+.018*Math.cos(c);return[3.6+Math.cos(f)*h,2.01+.018*Math.sin(c),3.1+Math.sin(f)*h*.8]},20,5),rt(3.45,1.99,3.02,3.75,2.025,3.08),Zt.length=0;for(let r=-75+x()*10;r<120&&Zt.length<4;r+=42+x()*18){const d=He(r)-3.6;if(ut(r,d)<2)continue;const f=r+we(h=>st(r+h,d,0,-.35,.35,-.35,1.55),0),c=ut(f,d);At.push(st(f,d,0,-.35,.35,-.35,1.55)),F(9,0,.6),Y([f,c-.5,d],[f,c+6.2,d],.14,.14),Y([f,c+6.1,d],[f,c+6.15,d+1.1],.07,.07),rt(f-.17,c+5.95,d+.95,f+.17,c+6.15,d+1.45),F(10,0,0),G([f-.14,c+5.94,d+1],[f+.14,c+5.94,d+1],[f+.14,c+5.94,d+1.4],[f-.14,c+5.94,d+1.4]),Zt.push([f,c+5.85,d+1.2])}F(18,0,.5);for(let r=-100;r<150;r+=2.4+x()*.5){if(x()<.08){r+=6;continue}const d=He(r)+4.8+(x()-.5)*.3,f=ut(r,d),c=.9+x()*.4,h=(x()-.5)*.15;f<2.5||Y([r,f-.4,d],[r+h,f+c,d+h*.5],.09,.09)}Bt(0,0,0,0),F(9,0,.7),Y([-6.3,1.9,-2.2],[-6.3,7,-2.2],.15,.15),Y([-6.3,6.9,-2.2],[-5.4,7,-2.2],.07,.07),rt(-5.66,6.82,-2.38,-5.14,7.02,-2.02),F(10,0,0),G([-5.62,6.815,-2.34],[-5.18,6.815,-2.34],[-5.18,6.815,-2.06],[-5.62,6.815,-2.06])},ye=J>450,ko=ye?"big":"small",To=V.hash+ko,te=ye?1024:512,ke=ye?512:256,z={};{const e=a=>S.pk?S.tex(a,a,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE):S.tex(a,a,t.RG16F,t.RG,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE);z.tF=e(te),z.fF=S.fbo(z.tF),z.tH=e(ke),z.fH=S.fbo(z.tH),z.vb=t.createBuffer(),z.ib=t.createBuffer(),z.vao=t.createVertexArray(),t.bindVertexArray(z.vao),t.bindBuffer(t.ARRAY_BUFFER,z.vb),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,z.ib);const o=[3,3,2,4,4],s=[0,3,6,8,12];for(let a=0;a<5;a++)t.enableVertexAttribArray(a),t.vertexAttribPointer(a,o[a],t.FLOAT,!1,64,s[a]*4);t.bindVertexArray(null),yo(),z.nI=St.length,z.nQ=Ie,z.cabs=pe.slice(),z.racks=xe.map(a=>a.slice()),z.plans=At.slice(),z.lamps=Zt.map(a=>a.slice()),z.boats=Ee.map(a=>({...a})),t.bindVertexArray(z.vao),t.bindBuffer(t.ARRAY_BUFFER,z.vb),t.bufferData(t.ARRAY_BUFFER,lt.subarray(0,zt*16),t.STATIC_DRAW),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint32Array(St),t.STATIC_DRAW),t.bindVertexArray(null)}S.link();const Te=new Float32Array(24*2*4);Rt.forEach((e,o)=>{Te.set([e[0],e[1],e[2],e[3]],o*4),Te.set([e[4],e[5],0,0],(24+o)*4)}),(()=>{t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,S.tPk),t.texSubImage2D(t.TEXTURE_2D,0,0,0,24,2,t.RGBA,t.FLOAT,Te),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,S.tN),t.bindVertexArray(S.vao0),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0);const e=nt.bake;t.useProgram(e.p),t.bindFramebuffer(t.FRAMEBUFFER,z.fF),t.viewport(0,0,te,te),t.uniform4f(e.U.uB,0,0,8192,Rt.length),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,z.fH),t.viewport(0,0,ke,ke),t.uniform4f(e.U.uB,0,30,512,Rt.length),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null)})();let W;{const e=Math.min(2,t.getParameter(t.MAX_SAMPLES)||2),o=Math.max(64,J>>1),s=(g,p,y)=>{const E=t.createRenderbuffer();return t.bindRenderbuffer(t.RENDERBUFFER,E),y?t.renderbufferStorageMultisample(t.RENDERBUFFER,y,g,p,p):t.renderbufferStorage(t.RENDERBUFFER,g,p,p),E},a=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,s(t.RGBA8,J,e)),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,s(t.DEPTH_COMPONENT16,J,e));const n=S.tex(J,J,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),i=S.fbo(n),l=S.tex(o,o,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),b=S.fbo(l);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,s(t.DEPTH_COMPONENT16,o,0));const r=S.tex(J,J,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE),d=S.fbo(r),f=S.tex(o,o,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),c=S.fbo(f),h=S.tex(J,J,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE),u=S.fbo(h),v=S.tex(o,o,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE),w=S.fbo(v);W={ms:a,tM:n,fM:i,tR:l,fR:b,H2:o,tC:r,fC:d,tCR:f,fCR:c,tK:h,fK:u,tKR:v,fKR:w,ck:""},t.bindFramebuffer(t.FRAMEBUFFER,null)}const Ro={yaw:0,pitch:0,x:0,y:0,z:0};let et=Math.tan(33*tt),It=3.65,wt=(ot?-.1:-.1+(H()-.5)*.36)+(it==="Across the harbour"?.5:it==="Up the fjord"?-.62:0),Ht=it==="Up the fjord"?.1:.06,Mt=[0,0,0];{const e=(i,l,b)=>!z.plans.some(r=>!Jt(st(i,l,0,-(b||.8),b||.8,-(b||.8)*1.5,(b||.8)*1.5),r)),o=z.cabs.slice(0,Ct),s=ie(),a=ie(),n=ie();if(it==="By the cabins"){const i=(v,w,g)=>{let p=1e9,y=0,E=!0;for(let R=0;R<4;R++){const P=v[R],A=v[R+1&3],N=A[0]-P[0],X=A[1]-P[1],I=j(((w-P[0])*N+(g-P[1])*X)/(N*N+X*X+1e-9),0,1);p=Math.min(p,Math.hypot(w-P[0]-N*I,g-P[1]-X*I));const C=Math.sign(N*(g-P[1])-X*(w-P[0]));C&&(y&&C!==y&&(E=!1),y=C)}return E?0:p},l=Math.floor(s*o.length),b=o.map((v,w)=>(l+w)%o.length);let r=null;for(const v of b){const w=o[v],g=z.plans.filter(E=>Math.hypot((E[0][0]+E[2][0])/2-w[0],(E[0][1]+E[2][1])/2-w[1])<Math.max(w[4],w[5])+2.5),p=E=>Math.min(99,...o.filter(R=>R!==w&&(R[0]-w[0])*E>0).map(R=>Math.abs(R[0]-w[0])-R[4]-w[4])),y=Math.abs(p(-1)-p(1))>6?p(-1)>p(1)?-1:1:a<.5?-1:1;for(const E of[y,-y])for(let R=0;R<7;R++)for(const P of[.3,2.2,4.4]){const A=w[0]+E*(w[4]+10+n*3+R*2),N=jt(A)+P,X=w[0],I=w[1]-w[5]*.4,C=Math.min(...g.map(D=>i(D,A,N))),M=Math.min(99,...z.plans.filter(D=>!g.includes(D)).map(D=>i(D,A,N))),m=Math.hypot(X-A,I-N),T=st(A,N,Math.atan2(X-A,I-N),-.4,.4,0,m*.8),k=z.plans.some(D=>!g.includes(D)&&!Jt(T,D)),_=Math.min(C-9,M-7,0)-(k?20:0)-R*.01-(P-.3)*.02;(!r||_>r.sc)&&(r={sc:_,ex:A,ez:N,ax:X,az:I,side:E})}if(r&&r.sc>-.5)break}const{ex:d,ez:f,ax:c,az:h,side:u}=r;Mt=[d,ut(d,f)+1.65-It,f],wt=Math.atan2(c-d,h-f)-u*.26,Ht=.08,et=Math.tan(34*tt)}else if(it==="Under the racks"){const i=(f,c,h)=>{let u=1e9,v=0,w=!0;for(let g=0;g<4;g++){const p=f[g],y=f[g+1&3],E=y[0]-p[0],R=y[1]-p[1],P=j(((c-p[0])*E+(h-p[1])*R)/(E*E+R*R+1e-9),0,1);u=Math.min(u,Math.hypot(c-p[0]-E*P,h-p[1]-R*P));const A=Math.sign(E*(h-p[1])-R*(c-p[0]));A&&(v&&A!==v&&(w=!1),v=A)}return w?0:u};let l=null;for(let f=0;f<z.racks.length;f++){const c=z.racks[(Math.floor(s*z.racks.length)+f)%z.racks.length],h=Math.sin(c[2]),u=Math.cos(c[2]),v=Math.cos(c[2]),w=-Math.sin(c[2]),g=z.plans.filter(p=>Math.hypot((p[0][0]+p[2][0])/2-c[0],(p[0][1]+p[2][1])/2-c[1])<1.5);for(const p of[13+n*3,16+n*3,19+n*3])for(const y of[0,4,-4,8,-8]){const E=c[0]-h*p+v*y*(a<.5?1:-1),R=c[1]-u*p+w*y*(a<.5?1:-1);if(dt(E,R)<.6)continue;const P=Math.min(99,...z.plans.filter(C=>!g.includes(C)).map(C=>i(C,E,R))),A=Math.hypot(c[0]-E,c[1]-R),N=st(E,R,Math.atan2(c[0]-E,c[1]-R),-.4,.4,0,A*.85),X=z.plans.some(C=>!g.includes(C)&&!Jt(N,C)),I=Math.min(P-4,0)-(X?20:0)-Math.abs(y)*.01-(p-13)*.005-Math.max(0,c[5]-dt(E,R)-1)*.15;(!l||I>l.sc)&&(l={sc:I,ex:E,ez:R,rk:c})}if(l&&l.sc>-.5)break}if(!l){const f=z.racks[0];l={ex:f[0]-Math.sin(f[2])*14,ez:f[1]-Math.cos(f[2])*14,rk:f}}const{ex:b,ez:r,rk:d}=l;Mt=[b,ut(b,r)+1.6-It,r],wt=Math.atan2(d[0]-b,d[1]-r)+(a-.5)*.2,et=Math.tan(30*tt),Ht=.16+j(Math.atan2(d[5]-ut(b,r),Math.hypot(d[0]-b,d[1]-r)),0,.25)}else if(it==="At the waterline")Mt=[-26+s*40,.42+a*.12-It,4.15],Ht=.045,et=Math.tan(25*tt);else if(it==="Long lens on the row"){const i=o[Math.floor(s*o.length)];wt=Math.atan2(i[0],i[1])+(a-.5)*.08,Ht=-.005+n*.03,et=Math.tan((13+n*4)*tt)}}const B={E:[0,It,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},We=new Float32Array(16),Oe=()=>{const e=V.view||Ro,o=wt+(e.yaw||0),s=j(Ht+(e.pitch||0),-1.25,1.25);B.E=[Mt[0]+j(e.x||0,-4,4),Math.max(.3,Mt[1]+It+j(e.y||0,-.6,.6)),Mt[2]+j(e.z||0,-6,2.4)];const a=Math.cos(s);B.fw=[Math.sin(o)*a,Math.sin(s),Math.cos(o)*a],B.rt=[Math.cos(o),0,-Math.sin(o)],B.up=qt(B.fw,B.rt);const n=.15,i=2e4,l=(i+n)/(i-n),b=-2*i*n/(i-n),r=B.E,d=B.fw,f=B.rt,c=B.up,h=u=>u[0]*r[0]+u[1]*r[1]+u[2]*r[2];We.set([f[0]/et,c[0]/et,d[0]*l,d[0],f[1]/et,c[1]/et,d[1]*l,d[1],f[2]/et,c[2]/et,d[2]*l,d[2],-h(f)/et,-h(c)/et,-h(d)*l+b,-h(d)])};Oe();let Re=wt-.2,ee=.3;{let e=9;for(let o=0;o<9;o++){const s=(Nt?wt+(o-4)*Math.min(.085,Math.atan(et)*.7/4):wt-.46+o*.085)+(me[0]-.5)*.06,a=Math.sin(s),n=Math.cos(s);let i=0;for(let b=150;b<4200;b*=1.1){let r=0;for(const d of Rt){const f=Math.hypot(a*b-d[0],n*b-d[1]);if(f<d[3]*1.15){const c=1-f/(d[3]*1.15),h=(u,v,w)=>{const g=j((w-u)/(v-u),0,1);return g*g*(3-2*g)};r=Math.max(r,d[2]*(.13*Math.pow(Math.min(c/.3,1),1.7)+.66*h(.27,.76,c)+.21*h(.8,1.03,c))+70*h(.5,.9,c))}}i=Math.max(i,r/b)}const l=Math.atan(i)+Math.abs(o-3)*.012;l<e&&(e=l,Re=s)}ee=Nt?j(e+(2.5+me[1]*1.5)*tt,4*tt,22*tt):j(e+(4.5+me[1]*4)*tt,9*tt,29*tt)}let Xe=.4;if(Ut){const e=(a,n,i)=>{const l=j((i-a)/(n-a),0,1);return l*l*(3-2*l)},o=Mt[1]+It;let s=0;for(let a=0;a<9;a++){const n=wt-.45+a*.1125,i=Math.sin(n),l=Math.cos(n);let b=0;for(let r=60;r<4200;r*=1.1){let d=0;const f=Mt[0]+i*r,c=Mt[2]+l*r;for(const h of Rt){const u=Math.hypot(f-h[0],c-h[1]);if(u<h[3]*1.15){const v=1-u/(h[3]*1.15);d=Math.max(d,h[2]*(.13*Math.pow(Math.min(v/.3,1),1.7)+.66*e(.27,.76,v)+.21*e(.8,1.03,v))+70*e(.5,.9,v))}}b=Math.max(b,(d-o)/r)}s+=Math.atan(b)}Xe=j(Math.sin(s/9+.08),.2,Math.sin(Ht+Math.atan(et))-.17)/.76}const zo=(e,o)=>{const s=e*2-1,a=1-o*2;return Lt([0,1,2].map(n=>B.fw[n]+(s*B.rt[n]+a*B.up[n])*et))},Ve=(e,o)=>{const s=zo(e,o);if(s[1]>-.004)return null;let a=Math.min(B.E[1]/-s[1],260);for(let n=0;n<80;n++){const i=B.E[0]+s[0]*a,l=B.E[2]+s[2]*a;if(dt(i,l)<-.9)return{x:i,z:l,dist:a};if(a-=2,a<4)break}return null},Pt=new Float32Array(64*2*4);z.cabs.forEach((e,o)=>{o<16&&(Pt.set([e[0],e[1],e[2],e[3]],(64+o)*4),Pt.set([e[4],e[5],0,0],(80+o)*4))});const je=new Float32Array(16);for(let e=0;e<4;e++)je.set(z.lamps[e]?[...z.lamps[e],1]:[0,-100,0,0],e*4);const oe=[],Et=[];let Ke=0,$=0,O=Fe,q=null,Ye=0,Tt=0,ze=[1,0],Qe=0;const Ze=(e,o,s,a)=>{oe.push({x:e,z:o,t0:s,a}),oe.length>16&&oe.shift()},ae=[],Ao=ce==="Open water"?0:ce==="New ice on the harbour"?2:1;let Je=0,$e=3+H()*6,to=4+H()*9;const eo=(e,o)=>{const s=Ve(e,o);s&&(Ye++,ae.push({x:s.x,z:s.z,at:$+.2+s.dist*.006,dist:s.dist}))},Po=e=>{const o=V.input,s=o.taps();if(o.down){q||(q={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,path:0,g:null});const a=o.x-q.lx,n=o.y-q.ly;if(q.lx=o.x,q.ly=o.y,q.t+=e,q.path+=Math.hypot(a,n),q.path>.012){const i=Ve(o.x,Math.max(o.y,.56));if(i){q.g||(q.g={x:i.x,z:i.z,vx:0,vz:0,s:0,r:7},Et.push(q.g),Et.length>4&&Et.shift(),V.sound.hit("noise",.14,{dur:1.8,cutoff:420}));const l=q.g,b=1-Math.exp(-e*8);l.vx+=((i.x-l.x)/Math.max(e,.001)-l.vx)*b,l.vz+=((i.z-l.z)/Math.max(e,.001)-l.vz)*b,l.x=i.x,l.z=i.z,l.s=Math.min(1,l.s+e*2.5),l.r=Math.min(14,l.r+e*3);const r=Math.hypot(l.vx,l.vz);r>.5&&(ze=[l.vx/r,l.vz/r]),Tt=Math.min(1,Tt+e*1.5)}}else if(q.t>.3&&(O=Math.min(1,O+e/6),$>Je)){Je=$+1.1;const i=[45,48,50,52,55,57,60];V.sound.note(i[(Math.floor(O*12)+Ye)%7],{dur:2.4,vel:.05+O*.05,wave:"sine",attack:.5}),O>.6&&V.sound.note(84+Math.floor($*3)%5*2,{dur:1.5,vel:.025,wave:"sine",attack:.3})}}else q?(q.path<=.012&&q.t<.3&&eo(q.x0,q.y0),q=null):s.length&&eo(s[0].x,s[0].y);for(const a of Et){if(q&&q.g===a)continue;const n=Math.hypot(a.vx,a.vz),i=Math.min(1,6/(n||1));a.vx*=i,a.vz*=i,a.x+=a.vx*e,a.z+=a.vz*e,a.r=Math.min(a.auto?30:22,a.r+e*1.5),a.grow>0?(a.s=Math.min(a.grow,a.s+e*.22),a.s>=a.grow&&(a.grow=0)):a.s*=Math.exp(-e*(a.auto?.1:.35))}q&&q.g||(Tt*=Math.exp(-e*.5)),q&&q.t>.3&&q.path<=.012||(O=Math.max(Fe,O-e*.025)),Tt>.15&&$>Qe&&(Qe=$+.35+H()*.7,V.sound.note(36+H()*5,{dur:.22+H()*.2,vel:.1*Tt,wave:"sawtooth",cutoff:380+H()*300}),H()<.4&&V.sound.hit("hat",.05*Tt))},Fo=e=>{for(let o=ae.length-1;o>=0;o--){const s=ae[o];if($>=s.at){Ze(s.x,s.z,s.at,1),ae.splice(o,1);const a=Math.max(.2,1-s.dist/150);V.sound.hit("click",.3*a),V.sound.note(79+H()*5,{dur:.1,vel:.2*a,wave:"sine"})}}if($>$e){$e=$+4+H()*13;const o=Math.atan2(B.fw[0],B.fw[2])+(H()-.5)*1.1,s=12+H()*H()*60,a=B.E[0]+Math.sin(o)*s,n=B.E[2]+Math.cos(o)*s;dt(a,n)<-1.2&&Ze(a,n,$,.3+H()*.4)}if(!q&&$>to){to=$+14+H()*30;const o=H()*yt,s=2.2+H()*2.6;Et.push({x:-8+(H()-.5)*50-Math.cos(o)*28,z:42+(H()-.5)*24-Math.sin(o)*28,vx:Math.cos(o)*s,vz:Math.sin(o)*s,s:0,r:10+H()*8,grow:.45+H()*.4,auto:!0}),Et.length>4&&Et.shift()}},Do=()=>{Pt.fill(0,0,64*4);let e=0;for(const o of oe)$-o.t0<15.9&&e<16&&(Pt.set([o.x,o.z,o.t0,o.a],e*4),e++);Ke=e,Et.forEach((o,s)=>{const a=Math.hypot(o.vx,o.vz)||1;Pt.set([o.x,o.z,o.s,o.r],(16+s)*4),Pt.set([o.vx/a,o.vz/a,0,0],(20+s)*4)})},L=new Float32Array(31*4),_o=()=>{const e=1-.68*O,o=1-.9*O,s=Math.max(0,1-O*1.15),a=mt.zen.map(r=>r*e),n=mt.hor.map(r=>r*(1-.6*O)),i=mt.belt.map(r=>r*o),l=mt.glo.map(r=>r*(1-.8*O));L.set([B.E[0],B.E[1],B.E[2],$],0),L.set([...B.fw,et],4),L.set([...B.rt,1.45*(1+1.1*O)],8),L.set([...B.up,O],12),L.set([fe[0],fe[1],fe[2],mt.hs+(1700-mt.hs)*Math.pow(O,.8)],16),L.set([mt.sun[0]*s,mt.sun[1]*s,mt.sun[2]*s,Math.max(co,j((O-.5)/.45,0,1))],20),L.set([...a,j((O-.2)/.6,0,1)],24),L.set([...n,1/2600],28),L.set([...i,mt.es],32),L.set([...l,Nt?2:_e?1:0],36),L.set([Math.sin(Re)*Math.cos(ee),Math.sin(ee),Math.cos(Re)*Math.cos(ee),lo],40),L.set([-5.4,6.7,-2.2,11*(1+.6*O)],44),L.set([1,.66,.36,2.4*(1+.9*O)],48),L.set([ze[0],ze[1],Tt,De],52),L.set([ho,io,4,.55+.9*O],56),L.set([.07,.068,.074,Math.min(16,z.cabs.length)],60),L.set([0,30,256,4096],64);const b=[0,1,2].map(r=>a[r]*1.5+n[r]*.55);Ut&&(b[0]+=.002,b[1]+=.011,b[2]+=.005),L.set([...b,0],68),L.set([...b.map(r=>r*.5),0],72),L.set([...l.map(r=>r*.3),0],76),L.set([...i.map(r=>r*.5),0],80);for(let r=0;r<3;r++){const d=z.boats[r];if(!d)continue;const f=De*2.5+Tt*1.5+.4;L.set([.025*f*Math.sin($*1.1+d.ph),.012*f*Math.sin($*1.3+d.ph*2),.008*f*Math.sin($*.9+d.ph*3),0],(21+r)*4)}L.set([.012,.03,.036,Ao],96),L.set([Ut?wt:le-Math.PI+.9,Ut?Xe:.36,Ke,Et.length],100),L.set(je,104),L.set([de[0]*(1-.4*O),de[1]*(1-.4*O),de[2]*(1-.4*O),te],120)},oo=(e,o,s)=>{t.bindFramebuffer(t.FRAMEBUFFER,e),t.viewport(0,0,o,o),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.depthMask(!0),t.clearColor(0,0,0,0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.bindVertexArray(z.vao);for(const a of[nt.quay,nt.mesh])t.useProgram(a.p),t.uniform4fv(a.U.uP,L),t.uniformMatrix4fv(a.U.uVP,!1,We),t.uniform4f(a.U.uE,B.E[0],s?-B.E[1]:B.E[1],B.E[2],s?1:0),a===nt.quay?t.drawElements(t.TRIANGLES,z.nQ,t.UNSIGNED_INT,0):t.drawElements(t.TRIANGLES,z.nI-z.nQ,t.UNSIGNED_INT,z.nQ*4);t.bindVertexArray(null),t.disable(t.DEPTH_TEST)},Uo=e=>{t.bindFramebuffer(t.FRAMEBUFFER,S.fHz),t.viewport(0,0,512,1),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(nt.hor.p),t.uniform4fv(nt.hor.U.uP,L),t.bindVertexArray(S.vao0),t.drawArrays(t.TRIANGLES,0,3),S.hzKey=e},ao=()=>{Do(),_o(),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,S.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,z.tF),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,z.tH),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,S.tD),t.texSubImage2D(t.TEXTURE_2D,0,0,0,64,2,t.RGBA,t.FLOAT,Pt),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,null);const e=To+B.E.map(i=>i.toFixed(1)).join();S.hzKey!==e&&Uo(e),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,S.tHz);const o=e+B.E.map(i=>i.toFixed(3)).join()+B.fw.map(i=>i.toFixed(5)).join(),s=o+O.toFixed(5);let a=W.ckD!==s,n=W.ckM!==s;if(a&&n&&W.cv===o&&q&&q.t>.3&&q.path<=.012&&((W.hp^=1)?n=!1:a=!1),a||n){W.cv=o,a&&(W.ckD=s),n&&(W.ckM=s),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE9),t.bindTexture(t.TEXTURE_2D,null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(S.vao0);const i=(l,b,r,d,f)=>{for(const c of[nt.march,nt.cache])t.useProgram(c.p),t.uniform4fv(c.U.uP,L),t.activeTexture(t.TEXTURE10),t.bindTexture(t.TEXTURE_2D,c===nt.cache?d:null),t.bindFramebuffer(t.FRAMEBUFFER,c===nt.cache?f:r),t.viewport(0,0,b,b),t.uniform4f(c.U.uMo,l,Rt.length,2/b,0),t.drawArrays(t.TRIANGLES,0,3);t.activeTexture(t.TEXTURE10),t.bindTexture(t.TEXTURE_2D,null)};a&&i(0,J,W.fK,W.tK,W.fC),n&&i(1,W.H2,W.fKR,W.tKR,W.fCR)}oo(W.ms,J,!1),t.bindFramebuffer(t.READ_FRAMEBUFFER,W.ms),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,W.fM),t.blitFramebuffer(0,0,J,J,0,0,J,J,t.COLOR_BUFFER_BIT,t.NEAREST),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),oo(W.fR,W.H2,!0),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,J,J),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,W.tM),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,W.tR),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,W.tC),t.activeTexture(t.TEXTURE9),t.bindTexture(t.TEXTURE_2D,W.tCR),t.useProgram(nt.main.p),t.uniform4fv(nt.main.U.uP,L),t.bindVertexArray(S.vao0),t.drawArrays(t.TRIANGLES,0,3)};return ao(),(e,o)=>{o=Math.min(Math.max(o||0,0),.1),$+=o,Oe(),Po(o),Fo(o),ao()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
