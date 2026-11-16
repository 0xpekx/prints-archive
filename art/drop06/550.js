// Limestone River: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/550.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(We){We&&We.add({num:550,name:"Limestone River",fam:"Vistas",recipe:"A wide green river winding between steep limestone peaks, each one fainter and bluer in the mist, mostly at dawn and sometimes in rain, at dusk or under the moon. The light, the mist and the rafts change every mint. Tap the water to send a ring through the reflections, drag to pole across the river so the towers slide past each other, or hold to bring the sun up and lift the mist.",interactive:"Tap the water to drop a ring that spreads through the reflections; drag to pole across and along the river so the towers slide past each other; hold to bring the sun up over the towers and lift the mist off the water.",music:!0,gl:!0,fps:30,seed:0,make(R){const t=R.gl,v=R.size,O=!!R.home;let ht=1426723278;for(let e=2;e<66;e+=8)ht=Math.imul(ht^parseInt(R.hash.slice(e,e+8),16),2246822507)^ht>>>13;const c=()=>{ht=ht+1831565813|0;let e=Math.imul(ht^ht>>>15,1|ht);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<8;e++)c();const wt=e=>{let o=0;for(const n in e)o+=e[n];let a=c()*o;for(const n in e)if(a-=e[n],a<0)return n;return Object.keys(e)[0]},Jt=Math.PI*2,de=Math.PI/180,Z=(e,o,a)=>e<o?o:e>a?a:e,ut=(e,o,a)=>{const n=Z((a-e)/(o-e),0,1);return n*n*(3-2*n)},Qt=(e,o,a)=>e.map((n,i)=>n+(o[i]-n)*a);let dt=89190413;for(let e=2;e<66;e+=8)dt=Math.imul(dt^parseInt(R.hash.slice(e,e+8),16),3266489909)^dt>>>14;const et=()=>{dt=dt+1831565813|0;let e=Math.imul(dt^dt>>>15,1|dt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<4;e++)et();const me=e=>{let o=0;for(const n in e)o+=e[n];let a=et()*o;for(const n in e)if(a-=e[n],a<0)return n;return Object.keys(e)[0]},xo=me({Dawn:75,"Rain coming":11,"Sunset afterglow":9,Moonlit:5}),qo=me({"On the water":60,"From the bank":22,"From a tower top":18,"Close under a cliff":0}),Xe=me({"Green bamboo":70,"Rice paddies":18,Autumn:12}),po=et(),Wo=et(),xe=[et(),et(),et(),et()],St=[et(),et()],Ve=O?"Dawn":xo,pe=O?"Pink dawn":wt({"Pink dawn":48,"Gold sunrise":34,"Before sunrise":18}),Nt=R.trait("Light",Ve==="Dawn"?pe:Ve),st=Nt==="Rain coming",Bt=Nt==="Sunset afterglow",Pt=Nt==="Moonlit",mt=R.trait("Mist",O?"Layered banks":wt({"Layered banks":44,"River fog":30,"Thin haze":18,"Heavy fog":8})),It=R.trait("Towers",O?"Tower forest":wt({"Tower forest":44,"Scattered towers":28,"Tall spires":18,"Low domes":10})),Ke=R.trait("Reach",O?"Bend ahead":wt({"Bend ahead":45,"Straight reach":33,"Wide pool":22})),je=R.trait("Lanterns",O?"One raft":wt({"One raft":58,"Two rafts":32,"Three rafts":10})),ve=O?"Clear":wt({Clear:52,"High cirrus":32,"Setting moon":16}),ye=R.trait("Sky",st?"Low cloud":Pt?ve==="High cirrus"?"High cirrus":"Stars":Bt&&ve==="Setting moon"?"Evening moon":ve),vo=O?"Glass":wt({Glass:55,"Slow current":33,Drizzle:12}),$t=R.trait("Water",st?"Drizzle":vo);let xt=89174501;for(let e=2;e<66;e+=8)xt=Math.imul(xt^parseInt(R.hash.slice(e,e+8),16),2654435761)^xt>>>15;const be=()=>{xt=xt+1831565813|0;let e=Math.imul(xt^xt>>>15,1|xt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<4;e++)be();const Ye=e=>{let o=0;for(const n in e)o+=e[n];let a=be()*o;for(const n in e)if(a-=e[n],a<0)return n;return Object.keys(e)[0]},te=R.trait("View",O?"Downriver":Ye({Downriver:46,"Toward the cliffs":26,"Into the light":18,"Back upriver":10})),we=be(),Ze=!O&&Xe==="Rice paddies",yo=R.trait("Season",O||Ze?"Green bamboo":Xe),ge=O?.42:.3+.32*po;R.trait("Horizon",ge<.39?"High (more water)":ge>.53?"Low (more sky)":"Middle");const bo=yo==="Autumn",wo=Ke==="Bend ahead",Je=Ke==="Wide pool",M=[wo?120+40*c():Je?40:22+10*c(),1/(380+90*c()),c()*Jt,14+8*c(),1/(150+50*c()),c()*Jt,Je?92+12*c():54+8*c(),9],P=e=>M[0]*Math.sin(e*M[1]+M[2])+M[3]*Math.sin(e*M[4]+M[5]),Ot=e=>M[0]*M[1]*Math.cos(e*M[1]+M[2])+M[3]*M[4]*Math.cos(e*M[4]+M[5]),gt=e=>M[6]+M[7]*Math.sin(e*.0041+1.3),go=1,tt=It==="Tower forest"?{p:.86,h0:80,h1:240,k:.36}:It==="Scattered towers"?{p:.55,h0:80,h1:230,k:.38}:It==="Tall spires"?{p:.74,h0:140,h1:330,k:.17}:{p:.82,h0:50,h1:120,k:.72},Gt=It==="Tall spires"?[.32,.66,.7,.7,1]:It==="Low domes"?[.52,.52,.57,.9,.9]:[.27,.44,.5,.68,.84],S=O||c()<.5?-1:1,Ct=[];{c();let e=O?400:xe[0]<.34?300+80*xe[0]/.34:380+260*(xe[0]-.34)/.66,o=44+10*c();Ct.push([P(e)+S*(gt(e)+80+o),e,O?190:Math.min(o/tt.k,190),o]),e=760+140*c(),o=55+15*c(),Ct.push([P(e)-S*(gt(e)+60+o),e,Math.min(o/tt.k*1.1,260),o]),e=1250+300*c(),o=70+20*c();const a=P(0)+Math.tan(Math.atan(Ot(0))+S*.12)*e+(c()-.5)*120,n=a-P(e),i=gt(e)+40+o;Ct.push([Math.abs(n)>i?a:P(e)+(n<0?-1:1)*i,e,Math.min(o/tt.k*1.15,300),o])}const qt=[c()*900,c()*900],pt=[P(300),300],ee=4096,Mo=pe==="Pink dawn"?2+.8*c():pe==="Gold sunrise"?4.2+1.8*c():-1.6-.8*c(),Me=Math.atan(Ot(0)),zo=1.45+.25*c(),ze=te==="Toward the cliffs"?S*(.38+.17*we):te==="Into the light"?-S*(.65+.25*we):te==="Back upriver"?Math.PI+S*(.12+.1*we):S*.12,Mt=Math.tan(31*de),oe=-Math.atan((1-2*ge)*Mt),Wt=Me+ze,Ee=st?7:Bt?-1.3-.8*St[0]:Pt?Math.min(14+7*St[0],oe/de+31*.8-2):Mo,Xt=Pt?Wt-S*(.18+.2*St[1]):Bt?Wt-S*(.08+.3*St[1]):Nt==="Gold sunrise"&&te==="Into the light"?Wt-S*(.22+.2*St[1]):Me-S*zo,Dt=[0,.05,.12,.26],zt=mt==="Layered banks"?{v:.011,y:32,lo:.005,hz:34e-5}:mt==="River fog"?{v:.006,y:20,lo:.014,hz:34e-5}:mt==="Thin haze"?{v:.0028,y:40,lo:.0025,hz:26e-5}:{v:.02,y:28,lo:.02,hz:.0019};st&&(zt.hz*=2.4,zt.v*=1.3);const J=new Float32Array(64*4*2);let vt=0;for(let e=-1;e<=1;e+=2){let o=-620+c()*20;for(;o<1100&&vt<60;){const a=Math.abs(o)<260;if(c()<(a?.9:.65)){const n=vt*4;J[n]=P(o)+e*(gt(o)+2.5+6*c()),J[n+1]=o,J[n+2]=10+8*c(),J[n+3]=1+c()*97,vt++}o+=(a?11:30)+c()*(a?15:50)}}if(Ze){let e=0;for(let o=0;o<vt;o++)J[o*4+3]*5.37%1<.38&&(J.copyWithin(e*4,o*4,o*4+4),e++);vt=e}const Et=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,Eo=Et+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",Re=`
uniform sampler2D uN;
float nzu(vec2 c) { return textureLod(uN, c * (1. / 64.), 0.).r; }
float nz2(vec2 c) { return textureLod(uN, c * (1. / 64.), 0.).g; }
float rX(float z) { return RV1.x * sin(z * RV1.y + RV1.z) + RV1.w * sin(z * RV2.x + RV2.y); }
float rW(float z) { return RV2.z + RV2.w * sin(z * .0041 + 1.3); }
`,Ro=Et+`
uniform vec4 uA;   // ext, cell, presence, enc
uniform vec4 uB;   // hmin, hmax, radius/height, texels
uniform vec4 uM;   // map centre xz, seed xy
uniform vec4 uR1; uniform vec4 uR2;
uniform vec4 uH0; uniform vec4 uH1; uniform vec4 uH2;
uniform vec4 uW; uniform vec4 uX;   // family thresholds (dome, cone, wall, camel; horn in uX.w, comb the rest); uX.xyz the cull square
uniform int uZ;   // never set (0): keeps the constant-bound bake loops rolled, so they compile fast
#define RV1 uR1
#define RV2 uR2
`+Re+`
out vec4 o;
vec4 h4(vec2 c) { vec4 p = fract(vec4(c.xyxy) * vec4(.1031, .1030, .0973, .1099)); p += dot(p, p.wzxy + 33.33); return fract((p.xxyz + p.yzzw) * p.zywx); }
// one tower's outline: u is the distance from its axis over its radius (with the flutes and lumps in it). One formula
// for every family: a cone's straight flanks to a rounded point (a, b), a top that falls away by c, and the sheer
// drop at the rim (e)
float prof(float u, vec4 q) { return min(q.x * pow(max(1. - u, 0.), q.y), 1. - q.z * u * u) * pow(clamp(1. - pow(max(u, 0.), q.w), 0., 1.), .26); }
void main() {
  vec2 p = uM.xy + (gl_FragCoord.xy / uB.w - .5) * uA.x;
  float h = 0., d = 400.;
  float cs = uA.y;
  vec2 cb = floor(p / cs);
  float nL = nzu(p / 34. + uM.zw) - .5, nF = nzu(p / 5.5 + uM.wz) - .5, nM = nz2(p / 14. + uM.zw) - .5;
  for (int i = 0; i < 12 + uZ; i++) {
    vec2 cc; float H, Rr; vec4 hh;
    if (i < 9) {
      vec2 cell = cb + vec2(float(i % 3 - 1), float(i / 3 - 1));
      hh = h4(cell + uM.zw);
      cc = (cell + .12 + .76 * hh.yz) * cs;
      H = mix(uB.x, uB.y, pow(hh.w, 1.4));
      Rr = min(H * uB.z * (.85 + .3 * fract(hh.x * 13.7)), cs * .9);
      Rr *= .7 + .6 * fract(hh.w * 31.7);
      float dc = length(cc - vec2(rX(0.), 0.)), sc = mix(.42, 1., smoothstep(180., 700., dc));
      H *= sc; Rr *= sc;
      float dr = abs(cc.x - rX(cc.y)) - rW(cc.y) - 40. - 50. * (1. - smoothstep(300., 900., dc));
      if (hh.x > uA.z || dr < 22.) continue;
      if (dr < Rr) { H *= mix(1., dr / Rr, .5); Rr = dr; }
      float far = length(cc - uX.yz);
      if (far > uX.x * .5 - 260.) continue;
    } else {
      vec4 hr = i == 9 ? uH0 : i == 10 ? uH1 : uH2;
      cc = hr.xy; H = hr.z; Rr = hr.w; hh = h4(cc);
      if (H <= 0.) continue;
    }
    float fx = fract(hh.x * 23.17 + hh.w * 7.31), sh = fract(hh.y * 7.3);
    // six families: sugarloaf (a dome with a shoulder lobe), cone, sheer-walled with a domed, tilted top, camel back
    // (humps on a line), leaning horn (the top thrown out over one side), comb (a long ridge of linked peaks)
    int fam = fx < uW.x ? 0 : fx < uW.y ? 1 : fx < uW.z ? 2 : fx < uW.w ? 3 : fx < uX.w ? 4 : 5;
    vec2 ax = normalize(hh.zy - .5 + 1e-3), dp = p - cc;
    float al = dot(dp, ax), ac = dot(dp, vec2(-ax.y, ax.x)), r0 = length(dp);
    float fl = nzu(dp / max(r0, 1e-3) * (5. + 3. * hh.y) + hh.zw * 40.) - .5;   // vertical flutes: radius varies with bearing only
    float wob = .2 * nL + .1 * nF + .08 * nM + .16 * fl;
    bool sg = fam == 0, cm = fam == 3, cb2 = fam == 5;
    vec4 q = fam == 1 ? vec4(1.12, 1., .5, 60.) : fam == 4 ? vec4(1.25, .7, .6, 60.) : fam == 2 ? vec4(9., 1., .34, 22.)
      : vec4(9., 1., cm ? .475 : cb2 ? .35 : .3 + .25 * sh, cm ? 8.8 : cb2 ? 6.8 : 6. + 4. * sh);
    float ws = fam == 1 ? .8 : fam == 2 ? .7 : fam == 4 ? .6 : cb2 ? .8 : 1.;
    vec2 st = cb2 ? vec2(1. / 2.1, 1. / .62) : vec2(1.);
    float ridge = cb2 ? .68 + .32 * cos(al / Rr * 4.6 + hh.y * 6.) : 1.;
    float tilt = fam == 2 ? .16 * (al / Rr) * (hh.x - .5) + .03 * nF : 0.;
    float lean = fam == 4 ? .26 * clamp(1. - r0 / Rr, 0., 1.) : 0.;
    for (int l = 0; l < 3 + uZ; l++) {
      // each lobe: its centre (along the axis, or the sugarloaf's shoulder off to one side), radius and height
      vec2 c2 = sg ? (l == 0 ? vec2(0.) : (hh.yz - .5) * Rr * .9) : ax * Rr * (cm ? (l == 0 ? -.55 : l == 1 ? .5 : .02) : lean);
      float R2 = Rr * (sg ? (l == 0 ? 1. : .55 + .2 * hh.w) : cm ? (l == 2 ? .5 : .62) : 1.);
      float H2 = H * (sg ? (l == 0 ? 1. : l == 1 ? .5 + .25 * hh.x : 0.) : cm ? (l == 0 ? 1. : l == 1 ? .72 + .2 * hh.y : hh.w < .4 ? 0. : .58) : l == 0 ? 1. : 0.);
      vec2 e2 = dp - c2;
      float u = length(vec2(dot(e2, ax), dot(e2, vec2(-ax.y, ax.x))) * st) / R2 + wob * ws;
      h = max(h, H2 * prof(u, q) * (1. + tilt) * ridge);
    }
    float ext = cm ? 1.9 : fam == 4 ? 1.5 : cb2 ? 2.3 : 1.25;
    d = min(d, r0 - Rr * ext);
  }
  h *= smoothstep(-3., 1., abs(p.x - rX(p.y)) - rW(p.y));   // undercut sheer where the river meets rock
  d = max(d, 0.);
  o = uA.w > .5 ? vec4(h / 512., d / 256., 0., 1.) : vec4(h, d, 0., 1.);
}`,Ao=Et+`
uniform sampler2D uH;
uniform vec4 uA;   // ext, texels, enc, 0
uniform vec4 uM;   // map centre xz, sun dir xz
uniform vec4 uE;   // tan of the four elevations
uniform int uZ;
out vec4 o;
void main() {
  vec2 p = uM.xy + (gl_FragCoord.xy / uA.y - .5) * uA.x;
  vec4 sh = vec4(-30.);
  for (int k = 1; k < 100 + uZ; k++) {
    float dd = float(k) * 18.;
    vec2 q = p + uM.zw * dd;
    vec4 m = textureLod(uH, (q - uM.xy) / uA.x + .5, 0.);
    float h = uA.z > .5 ? m.r * 512. : m.r;
    sh = max(sh, h - dd * uE);
  }
  o = uA.z > .5 ? (sh + 256.) / 512. : sh;
}`,To=Et+`
uniform sampler2D uN;
uniform vec4 uA;   // texels w h, seed, sun azimuth
uniform vec4 uB;   // presence, 0, 0, 0
uniform int uZ;
out vec4 o;
float nzu(vec2 c) { return textureLod(uN, c * (1. / 64.), 0.).r; }
float hsh(float x) { return fract(sin(x * 12.9898) * 43758.5453); }
void main() {
  float ph = gl_FragCoord.x / uA.x, y = gl_FragCoord.y / uA.y * .156 - .004;
  float az = (ph - .5) * 6.2831853;
  vec4 r = vec4(1., 1., 0., 0.);
  for (int k = 0; k < 10 + uZ; k++) {
    float fk = float(k), D = 2400. * pow(1.28, fk);
    float N = floor(6.2831853 * D / (190. + 30. * fk));
    float s = ph * N, cid = floor(s), e = (10. + 22. * nzu(vec2(s * .7, fk * 9.) + uA.z)) / D, lit = 0.;
    for (int j = -1; j < 2 + uZ; j++) {
      float cc = mod(cid + float(j), N), hh = hsh(cc * 1.37 + fk * 71.3 + uA.z);
      if (hh > uB.x + .08) continue;
      float H = 70. + 260. * pow(hsh(cc + 3.1 + uA.z), 1.6);
      float hw = clamp(H * .36 * (.7 + .6 * hsh(cc + 5.)) / (190. + 30. * fk), .1, .46);
      float x = (s - cid - float(j) - .5 - (hsh(cc + 9.) - .5) * .3) / hw;
      float u = abs(x) + .16 * (nzu(vec2(cc * 3.1, fk) + vec2(x * .8, 0.)) - .5);
      float sh = hsh(cc + 13.);
      float pr = (1. - (.3 + .25 * sh) * u * u) * pow(clamp(1. - pow(max(u, 0.), 6. + 4. * sh), 0., 1.), .26);
      pr *= 1. + .05 * (nzu(vec2(x * 9., cc)) - .5);
      float ee = H / D * pr;
      if (ee > e) {
        e = ee;
        float rel = uA.w - az, cx = clamp(x, -1., 1.);
        lit = clamp(cx * sin(rel) - sqrt(1. - cx * cx) * cos(rel) * .6 + .25, 0., 1.) * (.7 + .6 * nzu(vec2(x * 7., cc * 5.)));
      }
    }
    if (y < e) { r = vec4((fk + .5) / 10., clamp(y / e, 0., 1.), lit, 1.); break; }
  }
  o = r;
}`,Qe=`#define CAM uC[0]
#define FW uC[1]
#define RT uC[2]
#define UP uC[3]
#define SUN uC[4]
#define SUNC uC[5]
#define RV1 uC[6]
#define RV2 uC[7]
#define MAP uC[8]
#define SHW uC[9]
#define LAN uC[11]
#define MOON uC[12]
#define MIST uC[16]
#define DRIFT uC[17]
#define ZEN uC[18]
#define HOR uC[19]
#define CNT uC[20]
#define MISC uC[21]
#define SUNH uC[22]
#define AMB uC[23]
#define SKX uC[13]
#define VEG uC[14]
#define FINE uC[15]
#define WAT uC[24]
#define MST2 uC[25]
`,$e=`vec3 horC(vec3 rd) {
  vec2 a = normalize(rd.xz + 1e-6), s = normalize(SUN.xz + 1e-6);
  float m = dot(a, s);
  vec3 h = mix(HOR.rgb, SUNH.rgb, pow(max(m * .5 + .5, 0.), 2.4));
  h += SUNH.rgb * .3 * pow(max(m, 0.), 6.) * exp(-max(rd.y, 0.) * 9.);   // the warm core where the sun is (or has gone)
  return h + SUNC.rgb * SUNC.w * (.05 * pow(max(m, 0.), 1.5) + .06 * pow(max(m, 0.), 10.));
}
`,to=`float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = 3.1415927 - a; return y < 0. ? -a : a; }
vec3 sky(vec3 rd, vec3 hc) {
  float y = rd.y, mu = dot(rd, SUN.xyz);
  vec3 col = mix(hc, ZEN.rgb, 1. - exp(-max(y, 0.) * SKX.x));
  float anti = clamp(-dot(normalize(rd.xz + 1e-6), normalize(SUN.xz + 1e-6)), 0., 1.);
  col += vec3(.16, .07, .09) * anti * smoothstep(.03, .09, y) * smoothstep(.3, .1, y) * ZEN.w;
  col = mix(col, col * vec3(.78, .84, 1.), anti * smoothstep(.07, .02, y) * ZEN.w);
  col += SUNC.rgb * SUNC.w * (.05 * pow(max(mu, 0.), 5.) + .25 * pow(max(mu, 0.), 48.));
  col += SUNC.rgb * 9. * SUN.w * smoothstep(.99988, .99993, mu);
  if (y > 0.) {   // faint high streaks catching the light
    vec2 cu = rd.xz / (y + .06);
    float ci = smoothstep(.55, .85, nzu(cu * vec2(1.4, 5.) + 7.) * .6 + nz2(cu * 9. + 3.) * .4) * smoothstep(.0, .2, y);
    col = mix(col, mix(AMB.rgb * 1.6, SUNC.rgb * .5 + HOR.rgb * .5, .6), ci * DRIFT.w);
    // low bars of cloud near the horizon, lit from below on the sun's side; in rain a grey lid over everything
    vec2 cl = rd.xz / (y + .025);
    float bn = nzu(cl * vec2(.5, .5) + 31.) * .65 + nz2(cl * 2.1 + 9.) * .35;
    float bar = smoothstep(.56, .78, bn) * smoothstep(.004, .03, y) * smoothstep(.2, .05, y) * (1. - SKX.z);
    float sw = pow(max(dot(normalize(rd.xz + 1e-6), normalize(SUN.xz + 1e-6)), 0.), 3.);
    col = mix(col, mix(AMB.rgb * 1.1 + HOR.rgb * .25, SUNH.rgb * .85 + SUNC.rgb * .35, sw), bar * .75);
    float ov = SKX.z * smoothstep(.0, .06, y);
    col = mix(col, ZEN.rgb * (.72 + .5 * bn) + HOR.rgb * .12 * (1. - bn), ov * (.75 + .25 * smoothstep(.3, .7, bn)));
    if (SKX.y > 0.) {   // stars
      vec3 sq = rd * 260.; vec3 ce = floor(sq);
      float hs = hsh(dot(ce, vec3(1., 57., 113.)) + 4.1), dd = length(fract(sq) - .5);
      col += vec3(.75, .8, 1.) * SKX.y * step(.9935, hs) * smoothstep(.3, .05, dd) * (.15 + .6 * fract(hs * 911.)) * smoothstep(.0, .12, y);
    }
  }
  float mm = dot(rd, MOON.xyz);
  if (mm > .9995 && MOON.w > 0.) {   // the old moon going down, pale in the dawn
    float ang = sqrt(max(2. - 2. * mm, 0.));
    vec2 mq = (rd.xz - MOON.xz) * 420.;
    col = mix(col, vec3(.9, .88, .82) * (.8 + .28 * nzu(mq + 5.) * nz2(mq * 2.3 + 1.)), smoothstep(.0096, .0082, ang) * MOON.w * .8);
    col += vec3(.035, .035, .04) * MOON.w * exp(-ang * 70.);
  }
  // far ranks beyond the map, baked: each lighter and bluer, tops in the sun, mist at their feet
  if (y < .152) {
    float ph = at2(rd.x, rd.z) / 6.2831853 + .5;
    vec4 pn = textureLod(uP, vec2(ph, (y + .004) / .156), 0.);
    if (pn.a > .004) {
      float D = 2400. * pow(1.28, pn.r * 10. - .5), g = pn.g;
      float fo = 1. - exp(-DRIFT.z * (D - 1900.) * .75);
      float tx = nzu(vec2(ph * 1900., y * 260.)) * .6 + nz2(vec2(ph * 5200., y * 900.)) * .4;
      vec3 rock = AMB.rgb * (.22 + .22 * tx) * vec3(.85, .95, 1.05);
      rock += SUNC.rgb * SUN.w * pn.b * smoothstep(.3, .95, g) * (.22 + .2 * tx) * exp(-UP.w * .25 * (1. - g));
      vec3 c2 = mix(rock, hc, fo);
      float mf = (1. - smoothstep(.0, .5 + MIST.x * 20., g)) * (.75 - .5 * MIST.w);
      c2 = mix(c2, hc * 1.04 + SUNC.rgb * SUN.w * .03, mf);
      col = mix(col, c2, pn.a);
    }
  }
  return col;
}
`,Fo=Et+`uniform sampler2D uP; uniform vec4 uC[28];
`+Qe+Re+`
out vec4 o;
float hsh(float x) { return fract(sin(x * 12.9898) * 43758.5453); }
`+$e+to+`void main() {
  vec2 q2 = gl_FragCoord.xy / RT.w * 2. - 1.;
  vec3 rd = normalize(FW.xyz + (q2.x * RT.xyz + q2.y * UP.xyz) * FW.w);
  if (rd.y <= 0.) { rd.y = max(-rd.y, .002); rd = normalize(rd); }   // below the horizon: the mirror image's ray from the river
  o = vec4(sky(rd, horC(rd)), 1.);
}`,Ae=e=>Et+e+`#ifndef MH
#define MH 0
#endif
#ifndef HW
#define HW 0
#endif
#ifndef OS
#define OS 0
#endif
#ifndef RP
#define RP 0
#endif
#ifndef SKYT
#define SKYT 0
#endif
uniform sampler2D uH; uniform sampler2D uS; uniform sampler2D uD; uniform sampler2D uP;
uniform vec4 uC[28];
uniform ivec4 uI;
uniform ivec4 uJ;
#ifdef ONE
uniform ivec4 uK;   // x: 0 one full pass, 1 cache A (the static hit and the bamboo), 2 composite over the cache, 3 cache C (the mirror image)
#endif
uniform sampler2D uCA; uniform sampler2D uCC; uniform sampler2D uG; uniform sampler2D uCH; uniform sampler2D uF; uniform sampler2D uSK;
`+Qe+Re+`
out vec4 o;
vec2 mapUV(vec2 xz) { return (xz - MAP.xy) / MAP.z + .5; }
vec2 HM(vec2 xz) { vec4 m = textureLod(uH, mapUV(xz), 0.); return MISC.x > .5 ? vec2(m.r * 512., m.g * 256.) : m.rg; }
float HF(vec2 xz) {   // the tower height: the fine square in front of the eye where there is one, else the 4 m map
  vec2 u = (xz - FINE.xy) / FINE.z;
  float f = textureLod(uF, u + .5, 0.).r, c = HM(xz).x;
  return FINE.w > 0. && max(abs(u.x), abs(u.y)) < .495 ? f : c;
}
// the river's own edge: ragged, with spits and inlets, the mist hiding stretches of it (> 0 on land)
float bankD(vec2 xz) { float ac = xz.x - rX(xz.y); vec2 b = textureLod(uN, vec2(xz.y / 37., ac < 0. ? 2. : 11.) * (1. / 64.), 0.).rg; return abs(ac) - rW(xz.y) - 10. * (b.x - .5) - 5. * (b.y - .5); }
float hDet(vec2 xz, float h, float t) {
  float a = smoothstep(.5, 30., h) * (1. - smoothstep(500., 1600., t));
  if (a <= 0.) return h;
  float l = log2(max(t * FW.w / RT.w * 8., 1e-3));   // four noise texels to the cell: fade what a pixel cannot hold
  float f = textureLod(uN, (xz / 7. + 3.) * (1. / 64.), l - 2.8).r - .5, g = textureLod(uN, (xz / 2.2 + 61.) * (1. / 64.), l - 1.14).g - .5;
  return h + a * (f * 5.5 + g * 1.8 * smoothstep(.0, 1., h / 40.));
}
vec2 wrp(vec3 p, float t) {   // ledges, bulges and undercuts: the lookup shifts with height, less toward the thin tops
  float a = (1. - smoothstep(400., 1400., t)) * (1.15 - .85 * smoothstep(30., 170., p.y));
  return (textureLod(uN, (p.xz / 11. + vec2(p.y / 13., p.y / 16.)) * (1. / 64.), 0.).rg - .5) * 4.6 * a;
}
float shH(vec2 xz) { vec4 s = textureLod(uS, mapUV(xz), 0.); if (MISC.x > .5) s = s * 512. - 256.; return dot(s, SHW); }
float sunLit(vec3 p) { float y = p.y - MAP.w; return SUN.w * smoothstep(-15., 15., y - shH(p.xz) + 5.) * exp(-UP.w * exp(-max(y, 0.) / 85.)); }
vec2 nzl(vec2 c, float l) { return textureLod(uN, c * (1. / 64.), l).rg; }
float hsh(float x) { return fract(sin(x * 12.9898) * 43758.5453); }
`+$e+`#if SKYT == 0
`+to+`#endif
float erfa(float x) { float e = sqrt(1. - exp(-1.2732 * x * x)); return x < 0. ? -e : e; }
float mistD(vec3 p, float ya, float yb, float ld, float foot) {
  vec2 q = p.xz + DRIFT.xy;
  float n1 = textureLod(uN, q * (1. / 7680.), ld - 4.9).r, n2 = textureLod(uN, (q / 41. + 17.) * (1. / 64.), ld - 3.4).g, n3 = textureLod(uN, (q / 11. + 41.) * (1. / 64.), ld - 1.5).r;
  float cov = smoothstep(.3, .7, n1 * .6 + n2 * .3 + n3 * .1) * (.25 + .75 * foot);
  float yl = MIST.y * (.55 + .9 * n2) + MIST.w * 50., w = 6. + 9. * n1 + MIST.w * 10.;
  float dy = yb - ya, xa = (ya - yl) / w, xb = (yb - yl) / w, dx = xb - xa;
  float band = abs(dx) < .02 ? exp(-xa * xa) : .8862 * (erfa(xb) - erfa(xa)) / dx;
  band += .5 * foot * clamp((yl - min(ya, yb)) / max(abs(dy), 1e-3), 0., 1.);
  float hl = 3.5 + MIST.w * 14., y0 = MIST.w * 10.;
  float ga = ya < y0 ? ya - y0 : hl * (1. - exp((y0 - ya) / hl)), gb = yb < y0 ? yb - y0 : hl * (1. - exp((y0 - yb) / hl));
  float low = abs(dy) < 1e-3 ? exp(-max(ya - y0, 0.) / hl) : (gb - ga) / dy;
  low *= mix(smoothstep(.45, .85, n3 * .55 + n2 * .45), .2, clamp((ld - 1.5) * .4, 0., 1.));
  // a second, torn sheet higher up the towers: it cuts them in two, their tops clear above
  float yl2 = MST2.x * (.8 + .45 * n1), w2 = 7. + 7. * n3, xa2 = (ya - yl2) / w2, xb2 = (yb - yl2) / w2, dx2 = xb2 - xa2;
  float band2 = abs(dx2) < .02 ? exp(-xa2 * xa2) : .8862 * (erfa(xb2) - erfa(xa2)) / dx2;
  float cov2 = smoothstep(.5, .72, n2 * .55 + n1 * .3 + n3 * .15);
  return MIST.x * cov * band + MST2.y * cov2 * band2 + MIST.z * low;
}
// the moored rafts: each a list of tapered capsules placed by the script (deck poles, lantern post, lantern, mooring
// pole), in its own bounding sphere. Returns distance and material (2 bamboo, 4 lantern).
vec2 mapO(vec3 p) {
  vec2 r = vec2(1e5, 0.);
  for (int g = 0; g < uJ.y; g++) {
    vec4 gb = texelFetch(uD, ivec2(32 + g, 1), 0), gc = texelFetch(uD, ivec2(40 + g, 1), 0);
    float bd = length(p - gb.xyz) - gb.w;
    if (bd > .3) r.x = min(r.x, bd);
    else {
      int i0 = int(gc.x), n = int(gc.y);
      for (int j = 0; j < n; j++) {
        vec4 A = texelFetch(uD, ivec2(i0 + j, 2), 0), B = texelFetch(uD, ivec2(i0 + j, 3), 0);
        float mt = floor(B.w * .5), r2 = B.w - mt * 2.;
        vec3 pa = p - A.xyz, ba = B.xyz - A.xyz; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0., 1.);
        float d = (length(pa - ba * h) - mix(A.w, r2, h)) * .85;
        if (d < r.x) r = vec2(d, mt);
      }
    }
  }
  return r;
}
void main() {
  vec2 fc = gl_FragCoord.xy;
  vec2 q2 = fc / RT.w * 2. - 1.;
  vec3 ro = CAM.xyz;
  vec3 rd = normalize(FW.xyz + (q2.x * RT.xyz + q2.y * UP.xyz) * FW.w);
  float T = CAM.w;
  float jit = fract(52.9829189 * fract(dot(fc, vec2(.06711056, .00583715))));
  float pxA = 2. * FW.w / RT.w;
  vec3 acc = vec3(0.), thr = vec3(1.);
  float gH = MAP.w;
  // the per-view cache (built from the un-bobbed eye): A = static hit (tower t, 7000 sky, -1 ground/water), bamboo
  // alpha, bamboo t, bamboo tone; C = the flat-mirror reflection of every pixel as if the river were everywhere
  // (towers, bamboo, banks, rafts, sky, its own mist). Each is its own pass into its own single target.
  vec4 cA = MD == 2 ? texelFetch(uCA, ivec2(fc), 0) : vec4(-1.), oA = vec4(0.);
  vec2 rUV = vec2(0.);
  bool run = true, refl = false;
  if (MD == 3) {   // the mirror image: start from where this ray meets the river plane
    if (rd.y > 0.) run = false;
    else {
      ro += rd * (rd.y < -1e-4 ? -ro.y / rd.y : 1e4); ro.y = .002;
      rd.y = max(-rd.y, .002); rd = normalize(rd);
    }
  }
#ifdef LOOP
  for (int b = MD == 3 ? 1 : 0; b < uJ.x; b++) {
#else
  const int b = MD == 3 ? 1 : 0;
  for (int it = 0; it < 1; it++) {
#endif
    if (!run) break;
    float tEnd = 7000.;
    int kind = 0;
    float bdH = 0.;   // how far the hit is from the river's edge (> 0 on land)
    // the flats and the river: one test of the bank's edge, where a ray from above meets the water (and where a mirror
    // ray from the river meets the flats' level); the bank's top or its face by how far in from the edge that is
    bool dn = rd.y < 0.;
    if (abs(rd.y) > 1e-4 && (dn ? ro.y > gH : ro.y < gH)) {
      float tg = (gH - ro.y) / rd.y, tw = dn ? -ro.y / rd.y : tg;
      bdH = bankD(ro.xz + rd.xz * tw);
      float dd = (tw - tg) * abs(rd.x);
      if (dn) { kind = bdH < 0. ? 1 : bdH < dd ? 3 : 2; tEnd = kind == 2 ? tg : tw; bdH -= kind == 2 ? dd : 0.; }
      else if (bdH > 0.) { kind = 3; tEnd = tw; }
    }
    if (MD == 2 && cA.x > 0.) { tEnd = cA.x; kind = cA.x > 6999. ? 0 : 4; }
    // towers
    if (MD != 2 && MH == 0) {
      float hl = max(length(rd.xz), 1e-4), t = .5, tp = 0., ba = 0., bb = -1., lim = min(min(tEnd, 2300.), rd.y > 1e-4 ? (370. - ro.y) / rd.y : 1e9);
      int nst = b == 0 ? uI.x : uI.x - 40; float tb = b == 0 ? 0. : 3000., sk = b == 0 ? .0035 : .007;
      for (int i = 0; i < nst; i++) {
        if (t > lim && bb < 0.) break;
        vec3 p = ro + rd * t;
        if (bb < 0. && ((p.y > 440. && rd.y >= 0.) || abs(p.x - MAP.x) > MAP.z * .5 || abs(p.z - MAP.y) > MAP.z * .5)) break;
        vec2 m = HM(p.xz);
        float dv = 1e9;
        if (m.y < 1.5) { vec2 xw = p.xz; if (t + tb < 1400.) xw += wrp(p, t + tb); dv = p.y - gH - hDet(xw, HF(xw), t + tb); }
        if (bb > 0.) {
          if (dv < 0.) bb = t; else ba = t;
          if (bb - ba < .04 + t * .0003) break;
          t = .5 * (ba + bb);
        } else if (dv < 0.) { ba = tp; bb = t; t = .5 * (ba + bb); }
        else { tp = t; t += m.y >= 1.5 ? max((m.y - .5) / hl, 1.) : max(dv * .26, .25 + t * sk); }
      }
      if (bb > 0. && bb < tEnd) { tEnd = bb; kind = 4; }
    }
    // the moored rafts inside their bounds
    vec2 om = vec2(0.);
    if (MD != 1 && MH == 0 && OS == 0) {
      float tA = 1e9, tB = -1.;
      for (int k = 0; k < uJ.y; k++) {
        vec4 s = texelFetch(uD, ivec2(32 + k, 1), 0);
        vec3 oc = ro - s.xyz; float bq = dot(oc, rd), hq = bq * bq - dot(oc, oc) + s.w * s.w;
        if (hq > 0.) { hq = sqrt(hq); tA = min(tA, max(-bq - hq, 0.)); tB = max(tB, -bq + hq); }
      }
      tB = min(tB, tEnd);
      if (tB > tA) {
        float t = tA;
        for (int i = 0; i < uI.y; i++) {
          vec2 h = mapO(ro + rd * t);
          if (h.x < .0007 + t * .0007) { om = vec2(t, h.y); break; }
          t += h.x;
          if (t > tB) break;
        }
      }
      if (om.y > 0.) { tEnd = om.x; kind = 6; }
    }
    if (HW == 1) {   // the mirror's hit: tower t, or minus (1 + the raft's t) with its material in the lowest bit, or 0
      oA.x = kind == 4 ? tEnd : 0.;   // (a mirror ray can start inside a deck pole: t 0)
      if (kind == 6) oA.x = -uintBitsToFloat((floatBitsToUint(om.x + 1.) & 0xFFFFFFFEu) | (om.y > 3.5 ? 1u : 0u));
      break;
    }
    if (MH == 1) {
      float v = texelFetch(uCH, ivec2(fc), 0).r;
      if (v > 0.) { tEnd = v; kind = 4; }
      else if (v < 0.) { om = vec2(-v - 1., (floatBitsToUint(-v) & 1u) == 1u ? 4. : 2.); tEnd = om.x; kind = 6; }
    }
    if (RP == 1 && om.y <= 0.) discard;   // the rafts' own pass: only where a raft is hit
    // bamboo on the banks: billboards turned to the camera, read from the plume atlas, composited front to back
    float aC = 0., tC = 1e9, cY = 0.;
    if (MD == 2) { if (cA.y > 0. && cA.z < tEnd) { aC = cA.y; tC = cA.z; cY = cA.w; } }
    else {
      int nc = rd.y * SUNH.w > 23. ? 0 : int(CNT.x);   // above every clump top
      for (int i = 0; i < nc; i++) {
        vec4 cd = texelFetch(uD, ivec2(i, 0), 0);
        vec2 nn = normalize(cd.xy - CAM.xz);
        float den = dot(rd.xz, nn);
        if (den < 1e-3) continue;
        float t = dot(cd.xy - ro.xz, nn) / den;
        if (t < 0. || t > tEnd) continue;
        vec3 p = ro + rd * t;
        float v = (p.y - gH + .4) / cd.z;
        if (v < 0. || v > 1.19) continue;
        float u = dot(p.xz - cd.xy, vec2(-nn.y, nn.x)) / cd.z;
        if (abs(u) > 1.24) continue;
        float vi = floor(cd.w), fl = fract(cd.w) > .25 ? -1. : 1.;
        vec2 g = textureLod(uG, vec2((vi + u * fl * .4 + .5) * .25, v / 1.2), log2(max(t * pxA / cd.z * 213., 1.))).rg;
        if (g.x > .02) {
          if (aC <= 0.) tC = t;
          cY += (1. - aC) * g.x * g.y; aC += (1. - aC) * g.x;
          if (aC > .97) break;
        }
      }
      if (aC > 0.) cY /= aC;
    }
    if (MD == 1) { oA = vec4(kind == 0 ? 7000. : kind == 4 ? tEnd : -1., aC, tC, cY); break; }
    // the surface hit
    vec3 hc = horC(rd);
    vec3 surf = vec3(0.), nW = vec3(0., 1., 0.);
    float F = 0.;
    vec3 ph = ro + rd * tEnd;
    float slit = kind > 1 ? sunLit(ph) : 0.;
#if SKYT == 1
    if (RP == 0 && kind == 0) surf = texelFetch(uSK, ivec2(fc), 0).rgb;   // the sky of this view, from its own pass
#else
    if (RP == 0 && kind == 0) surf = sky(rd, hc);
#endif
    else if (RP == 0 && MD != 3 && kind == 1) {   // (never in the mirror image: its rays leave the river plane upward)
      // water: slicks drifting downstream, fine ripples, rings
      vec2 xz = ph.xz;
      float fa = 1. / (1. + tEnd * .025);
      float cr = CNT.z;
      vec2 g = vec2(0.);
      for (int k = 0; k < uJ.w; k++) {
        vec2 e = k == 0 ? vec2(0.) : k == 1 ? vec2(.06, 0.) : vec2(0., .06);
        vec2 pp = xz + e;
        float ac = pp.x - rX(pp.y);
        float sl = smoothstep(.3, .7, nzu(vec2(ac / 2.2, (pp.y - T * .5) / 34.) + 11.));
        float hw = (.004 + .006 * cr) * sl + .0011 * nzu(pp / .32 + T * vec2(.4, .9)) + (.0015 + .003 * cr) * nz2(vec2(ac / .9, (pp.y - T * .45) / 4.) + 5.);
        g = k == 0 ? vec2(hw) : k == 1 ? vec2(hw - g.x, g.y) : vec2(g.x, hw - g.y);
      }
      g /= .06; g *= fa;
      // ragged patches where a breath of air dulls the glass to satin: one noise for the patch, a second at a slant
      // breaks it up so that no lane runs from bank to bank
      vec2 ln = nzl(vec2(xz.x / 60. + T * .0015, xz.y / 23.) + 37., 0.), lm = nzl(vec2((xz.x + xz.y) / 31., (xz.y - xz.x) / 13.) + 3., 0.);
      float lane = smoothstep(.5, .78, ln.x * .6 + lm.y * .4) * smoothstep(.3, .55, ln.y);
      lane = max(lane, smoothstep(.52, .78, nzl(xz / 2.6 + 91., 0.).r) * .45 * (1. - smoothstep(6., 22., tEnd)));   // cat's paws on the water just round the raft
      lane = clamp(lane * WAT.x, 0., 1.) * smoothstep(.5, 6., tEnd);
      g += vec2(nzu(xz * 3.1 + T * vec2(.7, 1.1)) - .5, nz2(xz * 2.7 - T * vec2(.9, .4)) - .5) * .02 * lane * fa;
      int nr = int(CNT.y);
      for (int i = 0; i < nr; i++) {
        vec4 rg = texelFetch(uD, ivec2(i, 1), 0);
        float age = T - rg.z;
        if (age < 0. || age > 14.) continue;
        vec2 dv = xz - rg.xy; float r = length(dv) + 1e-4;
        float fr = .25 + .42 * age, w = .3 + .14 * age;
        float x = r - fr;
        float env = abs(rg.w) * .08 * exp(-x * x / (w * w)) * exp(-age * .3) / (1. + r * .7);
        float k = 6.2831853 / (.22 + .05 * age);
        g += dv / r * env * k * cos(x * k);
      }
      if (CNT.w > .5) {   // drizzle: a ring in every cell, each on its own beat
        vec2 cl = floor(xz / 1.3);
        for (int j = 0; j < uJ.z; j++) {
          vec2 cc = cl + vec2(float(j & 1), float(j >> 1));
          float h = hsh(cc.x * 17.1 + cc.y * 3.7);
          vec2 ce = (cc + vec2(h, fract(h * 37.))) * 1.3;
          float age = fract(T * (.5 + .45 * fract(h * 13.1)) + h * 7.) * 1.4;
          vec2 dv = xz - ce; float r = length(dv) + 1e-4, x = r - age * .45;
          g += dv / r * .035 * exp(-x * x * 90.) * cos(x * 40.) * (1.4 - age) * fa;
        }
      }
      nW = normalize(vec3(-g.x, 1., -g.y));
      float cosi = max(dot(nW, -rd), 0.);
      F = .02 + .98 * pow(1. - cosi, 5.);
      // under the surface: jade water, over pale stones where it is shallow by the bank; the sun's (or moon's) glitter
      float dep = -bdH;
      vec3 lt = vec3(dot(AMB.rgb, vec3(.8, 1.2, 1.))) + SUNC.rgb * max(SUN.y, 0.) * SUN.w * .7;
      vec3 body = WAT.z * vec3(.014, .044, .035) * lt * (.55 + .9 * nzu(xz / 37. + vec2(0., T * .02)));
      vec2 sn = nzl(xz / .6 + 13., 0.); float stn = sn.x * .6 + sn.y * .4;
      body = mix(vec3(.2, .2, .16) * (.5 + .8 * stn) * lt * .55, body, smoothstep(.3, 5., dep));
      surf = body * (1. - F) * (1. - lane * .3);
      float sp = pow(max(dot(reflect(rd, nW), SUN.xyz), 0.), 700.);
      surf += SUNC.rgb * SUN.w * sp * F * .7;
      surf += (F * .55 + .05) * lane * (hc * .95 + ZEN.rgb * .1);
      F *= 1. - .55 * lane;
    } else if (RP == 0 && (kind == 2 || kind == 3)) {
      float n = nzu(ph.xz / 1.7), n2 = nz2(ph.xz / 9.);
      // the bank's face and its edge strip change along the river in stretches: dark undercut earth, reed green, pale
      // cobble bars; the flats behind are dark scrub and grove
      float sv = nz2(vec2(ph.z / 27., ph.x > rX(ph.z) ? 23. : 41.));
      vec3 face = mix(mix(vec3(.065, .05, .036), vec3(.06, .08, .035), smoothstep(.36, .46, sv)), vec3(.3, .28, .23), smoothstep(.58, .68, sv)) * (.7 + .5 * n);
      vec3 alb = mix(face, vec3(.05, .07, .04) * (.6 + .7 * n), kind == 3 ? 0. : smoothstep(1.5, 5. + 4. * n2, bdH));
      alb *= .8 + .4 * n2;
      surf = alb * (AMB.rgb * .9 + SUNC.rgb * slit * max(SUN.y, 0.) * 2.);
      surf = mix(surf, hc, 1. - exp(-DRIFT.z * max(tEnd - 2300., 0.) * .9));
    } else if (RP == 0 && kind == 4) {
      float h0 = ph.y - gH;
      float e = max(2.5, tEnd * .002);
      vec2 xw = ph.xz + wrp(ph, tEnd);
      vec4 hn = vec4(0.);
      for (int k = 0; k < uJ.z; k++) {
        vec2 o2 = k == 0 ? vec2(e, 0.) : k == 1 ? vec2(-e, 0.) : k == 2 ? vec2(0., e) : vec2(0., -e);
        vec2 pp = xw + o2;
        float hv = hDet(pp, HF(pp), tEnd);
        hn = k == 0 ? vec4(hv, 0., 0., 0.) : k == 1 ? vec4(hn.x, hv, 0., 0.) : k == 2 ? vec4(hn.xy, hv, 0.) : vec4(hn.xyz, hv);
      }
      vec3 n = normalize(vec3(hn.y - hn.x, 2. * e, hn.w - hn.z));
      float tc = dot(ph.xz, vec2(n.z, -n.x)) / max(length(n.xz), 1e-3);   // along the wall
      float lp = log2(tEnd * pxA * 4.);   // noise finer than a pixel fades to its mean instead of beating with the pixel grid
      // two materials set by slope: scrub and trees over the tops and every ledge, bare limestone where it is too steep,
      // pale grey to cream, with black and rust streaks running straight down, flutes, cave mouths and the notch at the water
      float vn = nzl(xw / 13. + ph.y / 17., lp - 3.7).r * .6 + nzl(vec2(tc / 4., ph.y / 5.) + 3., lp - 2.).g * .4;
      float ledge = smoothstep(.58, .8, nzl(vec2(tc / 30., ph.y / 2.4) + 11., lp - 1.26).g) * smoothstep(.1, .25, n.y + .15 * vn);
      float veg = clamp(smoothstep(.14, .32, n.y + .3 * (vn - .5)) + smoothstep(.38, .62, vn) * .85 + ledge * .85, 0., 1.);   // scrub over the tops and slopes, in patches on the walls
      // streaks running down the wall, 3 m wide and tens of metres long, faded to their mean before they are thinner
      // than two pixels; the rock grey with buff and rust in it, never brighter than weathered limestone
      vec2 sq = nzl(vec2(tc / 3.2, ph.y / 46.) + 19., lp - .68), gq = nzl(vec2(tc / 2.4, ph.y / 7.) + 5., lp - .26);
      vec3 rock = mix(vec3(.15, .155, .15), vec3(.19, .18, .16), smoothstep(.35, .7, gq.y)) * (.78 + .4 * gq.x);
      rock = mix(rock, vec3(.04, .04, .036), smoothstep(.5, .75, sq.x) * .9);                  // black algae streaks
      rock = mix(rock, vec3(.42, .27, .15), smoothstep(.6, .85, sq.y) * .45);                  // rust stains
      rock *= .3 + .7 * smoothstep(1., 7., h0);                                             // the undercut notch at the foot
      float fz = nzl(xw / 1.6 + ph.y / 1.9, lp - .68).g;
      vec3 vc = vec3(.03, .045, .026) * mix(vec3(1.), VEG.rgb, smoothstep(.35, .65, vn)) * (.35 + 1.3 * fz);
      vec3 alb = mix(rock, vc, veg);
      float ao = .45 + .55 * smoothstep(-10., 120., h0);
      float lit = slit;
      vec3 sl = SUNC.rgb * max(dot(n, SUN.xyz) * .7 + .3, 0.) * lit;
      vec3 amb = AMB.rgb * (.35 + .5 * (n.y * .5 + .5)) * ao * (.75 + .25 * max(dot(n.xz, -SUN.xz), 0.));
      surf = alb * amb + (alb + veg * vec3(.016, .036, .01)) * sl;
    }
    else if (om.y > 3.5) surf = vec3(1., .5, .16) * LAN.w * 3.;
    else surf = vec3(.1, .088, .066) * (.6 + .7 * nzu(ph.xz * 3. + ph.y * 5.)) * (AMB.rgb * .8 + SUNC.rgb * .3 * slit);   // dark wet bamboo, a silhouette at this distance
    // the volume along this segment: haze coloured by the horizon, mist banks, wisps on the water
    vec3 L = vec3(0.), Lc = vec3(0.);
    float Tr = 1., Tc = 1.;
    {
      float tM = min(tEnd, 2300.);
      int nm = b == 0 ? uI.z : uI.w;
      float fn = float(nm);
      float muS = dot(rd, SUN.xyz);
      float hg = (1. - .49) / pow(1. + .49 - 1.4 * muS, 1.5);
      float phs = .8 + .09 * hg;
      bool got = false;
      float fA = exp(-HM(ro.xz).y / 70.), lA = 0.;
      float hzK = kind == 0 ? .45 + .55 * exp(-max(rd.y - .1, 0.) * 7.) : 1.;
      for (int i = 0; i < nm; i++) {
        float fi = float(i);
        float a0 = fi / fn, a1 = (fi + 1.) / fn;
        float s0 = a0 * a0 * tM, s1 = a1 * a1 * tM;
        float s = mix(s0, s1, jit), ds = s1 - s0;
        if (!got && s > tC) { got = true; Lc = L; Tc = Tr; }
        vec3 p = ro + rd * s;
        float hz = DRIFT.z * exp(-max(p.y, 0.) / 650.) * hzK;
        float fB = exp(-HM(ro.xz + rd.xz * s1).y / 70.);   // the mist pooled at the towers' feet, from the step's two ends (no jitter)
        float md = mistD(p, ro.y + rd.y * s0, ro.y + rd.y * s1, log2(ds), .5 * (fA + fB));
        fA = fB;
        float sg = hz + md;
        float a = 1. - exp(-sg * ds);
        float lB = sunLit(ro + rd * s1);   // sunlight in the mist likewise from the step's ends: shafts without grain
        vec3 Sm = AMB.rgb * (.75 + .5 * smoothstep(0., 90., p.y)) + SUNC.rgb * phs * (i == 0 ? lB : .5 * (lA + lB));
        lA = lB;
        L += Tr * a * (hz * hc + md * Sm) / max(sg, 1e-7);
        Tr *= 1. - a;
      }
      if (!got) { Lc = L; Tc = Tr; }
      // each lantern's glow in the mist and its direct halo (the core never narrower than a pixel)
      for (int k = 0; k < uJ.y; k++) {
        vec4 lp = texelFetch(uD, ivec2(48 + k, 1), 0);
        vec3 lv = lp.xyz - ro; float ll = length(lv), tl = clamp(dot(lv, rd), 0., tEnd + .3), dl = length(lv - rd * tl), c2 = .0009 + ll * ll * pxA * pxA * .5;
        L += vec3(1., .55, .22) * LAN.w * lp.w * (.0009 / (dl * dl + c2) * .5 + .07 * exp(-dl * 1.6) * (MIST.z * 10. + .3) + .006 * exp(-dl * .3)) * exp(-ll * .004) * step(ll - .4, tEnd + .5);
      }
    }
    if (aC > 0.) {
      vec3 pc = ro + rd * tC;
      vec3 cc = vec3(.05, .066, .03) * mix(vec3(1.), VEG.rgb, .7) * (.45 + 1.5 * cY) * (AMB.rgb * 1.25 + SUNC.rgb * sunLit(pc) * (.14 + .9 * pow(max(dot(rd, SUN.xyz), 0.), 3.)));
      cc = mix(cc, hc, 1. - exp(-tC * (.00015 + MIST.x * .03)));
      acc += thr * aC * (Lc + Tc * cc);
      thr *= 1. - aC;
    }
    acc += thr * (L + Tr * surf);
    if (kind != 1 || b == 1) break;
    thr *= Tr * F;
    ro = ph + nW * .002; ro.y = .002;
    rd = reflect(rd, nW);
    rd.y = max(rd.y, .002); rd = normalize(rd);
    if (MD == 2) {   // where the flat mirror sends the primary ray whose mirror image is this direction
      vec3 dm = vec3(rd.x, -rd.y, rd.z);
      rUV = vec2(dot(dm, RT.xyz), dot(dm, UP.xyz)) / (max(dot(dm, FW.xyz), 1e-3) * FW.w) * .5 + .5;
      refl = true; break;
    }
  }
  if (MD == 2 && refl) acc += thr * textureLod(uCC, rUV, 0.).rgb;   // the mirrored ray takes the cached mirror image
  if (MD == 1 || HW == 1) o = oA;
  else if (MD == 3) o = vec4(acc, 1.);
  else {
    vec3 col = acc * HOR.w;
    col = clamp((col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14), 0., 1.);
    col = pow(col, vec3(1. / 2.2));
    col += (jit - .5) / 255.;
    o = vec4(col, 1.);
  }
}`,ko=Et+"uniform sampler2D uT; uniform vec4 uV; out vec4 o; void main() { o = texelFetch(uT, ivec2(gl_FragCoord.xy), 0); }",l=t.__c550||(t.__c550=(()=>{const e=!!t.getExtension("EXT_color_buffer_float"),o=e||!!t.getExtension("EXT_color_buffer_half_float"),a=(u,k)=>{const g=t.createShader(k);return t.shaderSource(g,u),t.compileShader(g),g},n=a(Eo,t.VERTEX_SHADER),i={},h=(u,k)=>{const g=t.createProgram(),I=a(k,t.FRAGMENT_SHADER);t.attachShader(g,n),t.attachShader(g,I),t.linkProgram(g),i[u]={p:g,f:I}};let f=String(t.getParameter(t.RENDERER));if(!/ANGLE|Direct3D/.test(f)){const u=t.getExtension("WEBGL_debug_renderer_info");u&&(f=String(t.getParameter(u.UNMASKED_RENDERER_WEBGL)))}const x=o&&/Direct3D|D3D1/.test(f),y=x&&e,C={one:`#define ONE 1
#define LOOP 1
#define MD uK.x
`,main0:`#define MD 0
#define LOOP 1
`,main1:`#define MD 1
`+(y?`#define SKYT 1
`:""),main2:`#define MD 2
`+(y?`#define OS 1
#define SKYT 1
`:""),main3:`#define MD 3
`+(y?`#define MH 1
#define SKYT 1
`:""),main4:`#define MD 3
#define HW 1
#define SKYT 1
`,main5:`#define MD 2
#define RP 1
#define SKYT 1
`},D=x?y?["main1","main4","main5","main3","main2"]:["main1","main3","main2"]:["one"];D.forEach(u=>h(u,Ae(C[u]))),y&&(h("sky",Fo),D.push("sky"));const X={height:Ro,shadow:Ao,pano:To,blit:ko};for(const u in X)h(u,X[u]);t.flush();const b=256,T=new Uint8Array(b*b*4);let r=2654435769;const s=()=>(r=Math.imul(r^r>>>15,739982445),r=Math.imul(r^r>>>12,695872825),r^=r>>>15,(r>>>0)/4294967296);for(let u=0;u<4;u++){const k=u===3?1:4,g=b/k,I=new Float32Array(g*g);for(let F=0;F<I.length;F++)I[F]=s();for(let F=0;F<b;F++){const V=F/k,B=Math.floor(V),_=V-B,L=_*_*(3-2*_),it=B%g,ct=(B+1)%g;for(let Y=0;Y<b;Y++){const rt=Y/k,lt=Math.floor(rt),ft=rt-lt,bt=ft*ft*(3-2*ft),K=lt%g,z=(lt+1)%g,$=I[it*g+K]+(I[it*g+z]-I[it*g+K])*bt,Ft=I[ct*g+K]+(I[ct*g+z]-I[ct*g+K])*bt;T[(F*b+Y)*4+u]=Math.round(($+(Ft-$)*L)*255)}}}const m=(u,k,g,I,F,V,B,_)=>{const L=t.createTexture();return t.bindTexture(t.TEXTURE_2D,L),t.texImage2D(t.TEXTURE_2D,0,g,u,k,0,I,F,_||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,V),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,V),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,B),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,B),L},w=m(b,b,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.REPEAT,T);t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);const G=512,Q=256,q=G*4,j=new Float32Array(q*Q),nt=new Float32Array(q*Q).fill(.45);for(let u=0;u<4;u++){const k=u*G,g=(B,_,L,it,ct)=>{const Y=k+(B/2.5+.5)*G,rt=_/1.2*Q,lt=Math.max(k+2,Math.floor(Y-L)),ft=Math.min(k+G-3,Math.ceil(Y+L)),bt=Math.max(0,Math.floor(rt-L)),K=Math.min(Q-3,Math.ceil(rt+L));for(let z=bt;z<=K;z++)for(let $=lt;$<=ft;$++){const Ft=$-Y,he=z-rt,ue=(Ft*Ft+he*he)/(L*L);if(ue>=1)continue;const Yt=it*(1-ue),kt=z*q+$;nt[kt]+=(ct-nt[kt])*Yt,j[kt]+=(1-j[kt])*Yt}},I=(B,_,L,it,ct,Y,rt,lt)=>{const ft=_<0?-1:1,bt=.75+.5*s();for(let K=0;K<=200;K++){const z=K/200,$=B+L*(Math.sin(_)*z+ft*it*z*z),Ft=L*(Math.cos(_)*z-ct*z*z*z);if(g($,Ft,1.05-.35*z,.4,.16+.12*z),z<Y||K%11)continue;const he=(z-Y)/(1-Y),ue=4+Math.floor(4*s());for(let Yt=0;Yt<ue;Yt++){if(s()>lt)continue;const kt=(s()<.5?-1:1)*(.5+1.9*s()),mo=rt*(.55+.6*s())*(1-.3*he),Io=(.3+.42*z+.2*s())*bt,Oo=Math.sin(kt),Go=Math.cos(kt);for(let qe=0;qe<5;qe++){const Zt=qe/4;g($+Oo*mo*Zt*.8,Ft+(Go*Zt-.7*Zt*Zt)*mo,1.25-.55*Zt,.45,Io)}}}},F=(B,_,L,it,ct,Y,rt,lt,ft,bt=.025)=>{for(let K=0;K<_;K++){const z=(K/(_-1)-.5+(s()-.5)*.12)*2,$=(s()-.5)*2;I(B+$*bt,(.6*z+.4*$)*L,it*(1-.25*z*z)*(.84+.22*s()),ct*Math.abs(z),Y*(.4+.8*Math.abs(z)+.3*s()),rt,lt,ft)}},V=(B,_)=>{for(let L=B;L<_;L+=.016)g(L+(s()-.5)*.02,.01+.05*s()*s(),1.5+2.5*s(),.5,.12+.2*s())};u===0?([-.86,-.5,-.12,.22,.6,.9].forEach((B,_)=>F(B+(s()-.5)*.08,9,.38,[.62,.9,.74,1,.8,.56][_],.12,.3,.42,.075,.8)),V(-1.05,1.05)):u===1?([-.7,-.3,.3,.78].forEach((B,_)=>F(B+(s()-.5)*.08,10,.42,[.78,1.04,.66,.86][_],.14,.32,.45,.075,.75)),V(-.95,1)):u===2?(F(.02,44,.24,1.04,.3,.42,.42,.05,1,.14),V(-.25,.25)):(F(-.36,28,.22,.98,.28,.4,.42,.05,1,.12),F(.36,22,.22,.74,.28,.38,.42,.05,1,.1),V(-.55,.55))}const Ut=new Uint8Array(q*Q*2);for(let u=0;u<j.length;u++)Ut[u*2]=Math.round(j[u]*255),Ut[u*2+1]=Math.round(Math.min(nt[u],1)*255);const le=m(q,Q,t.RG8,t.RG,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE,Ut);t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);const fe=u=>{const k=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,k),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),k},yt=u=>{if(!t.getProgramParameter(i[u].p,t.LINK_STATUS))throw new Error("550 "+u+": "+t.getShaderInfoLog(i[u].f)+t.getProgramInfoLog(i[u].p));const k=i[u].p,g={ok:1};i[u]=g,g.p=k;const I=t.getProgramParameter(k,t.ACTIVE_UNIFORMS);for(let F=0;F<I;F++){const V=t.getActiveUniform(k,F).name.replace("[0]","");g[V]=t.getUniformLocation(k,V)}t.useProgram(k),["uN","uH","uS","uD","uT","uP","uCA","uCC","uG","uCH","uF","uSK"].forEach((F,V)=>{g[F]&&t.uniform1i(g[F],V)})};for(const u in X)yt(u);const Ie=()=>(i.main0||h("main0",Ae(C.main0)),i.main0.ok||yt("main0"),i.main0),Oe=()=>{i.main0||(h("main0",Ae(C.main0)),t.flush())},Ge=t.createVertexArray();return t.bindFramebuffer(t.FRAMEBUFFER,null),{P:i,vao:Ge,tN:w,tG:le,tex:m,fbo:fe,hf:o,fl:e,finMain:()=>D.forEach(yt),get0:Ie,q0:x?Oe:null,one:!x,split:y,MT:t.getParameter(t.MAX_TEXTURE_SIZE)|0}})()),Rt=l.P,_t=l.hf?0:1,N=(e,o)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,o)},eo=()=>{t.bindVertexArray(l.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0)},Vt=v>450,At=Vt?1024:512,Tt=Vt?512:256,Te=Vt?128:48,Kt=1024,Fe=Vt?4096>l.MT?l.MT:4096:1024,Lt=(()=>{const o=P(0),a=0,n=1100*.5-120;return[o+Math.sin(Wt)*n,a+Math.cos(Wt)*n,1100,Vt&&!_t?1:0]})(),A={};{A.tH=_t?l.tex(At,At,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE):l.tex(At,At,t.RG16F,t.RG,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE),A.fH=l.fbo(A.tH),A.tS=_t?l.tex(Tt,Tt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE):l.tex(Tt,Tt,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE),A.fS=l.fbo(A.tS),A.tD=l.tex(64,4,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),A.tP=l.tex(Fe,Te,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE),A.fP=l.fbo(A.tP),eo(),t.bindFramebuffer(t.FRAMEBUFFER,A.fH),t.viewport(0,0,At,At);const e=Rt.height;t.useProgram(e.p),N(0,l.tN),t.uniform4f(e.uA,ee,150,tt.p,_t),t.uniform4f(e.uB,tt.h0,tt.h1,tt.k,At),t.uniform4f(e.uM,pt[0],pt[1],qt[0],qt[1]),t.uniform4f(e.uR1,M[0],M[1],M[2],M[3]),t.uniform4f(e.uR2,M[4],M[5],M[6],M[7]),t.uniform4fv(e.uH0,Ct[0]),t.uniform4fv(e.uH1,Ct[1]),t.uniform4fv(e.uH2,Ct[2]),t.uniform4f(e.uW,Gt[0],Gt[1],Gt[2],Gt[3]),t.uniform4f(e.uX,ee,pt[0],pt[1],Gt[4]),t.drawArrays(t.TRIANGLES,0,3),Lt[3]>0&&(A.tF=l.tex(Kt,Kt,t.R16F,t.RED,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE),A.fF=l.fbo(A.tF),N(0,l.tN),t.bindFramebuffer(t.FRAMEBUFFER,A.fF),t.viewport(0,0,Kt,Kt),t.uniform4f(e.uA,Lt[2],150,tt.p,0),t.uniform4f(e.uB,tt.h0,tt.h1,tt.k,Kt),t.uniform4f(e.uM,Lt[0],Lt[1],qt[0],qt[1]),t.drawArrays(t.TRIANGLES,0,3)),t.bindFramebuffer(t.FRAMEBUFFER,A.fS),t.viewport(0,0,Tt,Tt);const o=Rt.shadow;t.useProgram(o.p),N(1,A.tH),t.uniform4f(o.uA,ee,Tt,_t,0),t.uniform4f(o.uM,pt[0],pt[1],Math.sin(Xt),Math.cos(Xt)),t.uniform4fv(o.uE,Dt),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,A.fP),t.viewport(0,0,Fe,Te);const a=Rt.pano;t.useProgram(a.p),N(0,l.tN),t.uniform4f(a.uA,Fe,Te,qt[0]*.01,Xt),t.uniform4f(a.uB,tt.p,0,0,0),t.drawArrays(t.TRIANGLES,0,3)}l.finMain&&(l.finMain(),l.finMain=null);let ke;{const e=l.tex(v,v,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE);ke={t:e,f:l.fbo(e)},t.bindFramebuffer(t.FRAMEBUFFER,null)}let Se;const So=()=>{if(!l.hf)return null;if(Se===void 0){const e=l.tex(v,v,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),o=l.fbo(e);let a=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;const n=l.fl?l.tex(v,v,t.R11F_G11F_B10F,t.RGB,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE):l.tex(v,v,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE),i=l.fbo(n);a=a&&t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;let h=null,f=null,x=null,y=null;l.split&&(h=l.tex(v,v,t.R32F,t.RED,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),f=l.fbo(h),a=a&&t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE,x=l.tex(v,v,t.R11F_G11F_B10F,t.RGB,t.HALF_FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),y=l.fbo(x),a=a&&t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE),Se=a?{tA:e,tC:n,tH:h,tK:x,fA:o,fC:i,fH:f,fK:y,own:null,strip:0,tick:0}:null,t.bindFramebuffer(t.FRAMEBUFFER,null)}return Se};let oo=!1;const ae={},ao=[],No=8,no=(e,o,a,n,i)=>[e+n*Math.cos(a)+i*Math.sin(a),o-n*Math.sin(a)+i*Math.cos(a)],E={s:0,u:-S*(6+4*c()),vs:0,vu:0},Ne=je==="One raft"?1:je==="Two rafts"?2:3,Ce=40+16*c(),ne=[{x:P(Ce)-S*(11+8*c()),z:Ce,hd:Math.atan(Ot(Ce))-S*(.75+.25*c())}];for(let e=1;e<Ne;e++){const o=ne[e-1],a=o.z+(e===1?6+4*c():22+30*c());ne.push({x:o.x+P(a)-P(o.z)-S*(1.5+3*c()),z:a,hd:o.hd+(c()-.5)*1.1})}const H=new Float32Array(64*4*4),re=H.subarray(256,320),Ht=[];let De=0,ro=0;const jt=(e,o,a,n)=>{const i=ro%16*4;re[i]=e,re[i+1]=o,re[i+2]=a,re[i+3]=n,ro++,De=Math.min(16,De+1)};{let e=0;const o=(a,n,i,h,f)=>{const x=512+e*4,y=768+e*4;H[x]=a[0],H[x+1]=a[1],H[x+2]=a[2],H[x+3]=n,H[y]=i[0],H[y+1]=i[1],H[y+2]=i[2],H[y+3]=f*2+Math.min(h,.99),e++};ne.forEach((a,n)=>{const i=Math.cos(a.hd),h=Math.sin(a.hd),f=(b,T,r)=>[a.x+b*i+r*h,T,a.z-b*h+r*i],x=(b,T,r,s,m)=>o(f(b[0],b[1],b[2]),T,f(r[0],r[1],r[2]),s,m),y=b=>{const T=Math.sin(b*12.9898+n*78.233)*43758.5453;return T-Math.floor(T)},C=e;for(let b=0;b<6;b++){const T=(b-2.5)*.15,r=-3.15-.3*y(b),s=1.9+.3*y(b+7),m=3.15+.3*y(b+3);x([T,.035,r],.062,[T,.04,s],.058,2),x([T,.04,s],.058,[T*.9,.3+.12*y(b+5),m],.044,2)}x([.1,.1,-2.9],.022,[.1,1.8,-2.92],.02,2),x([.1,1.8,-2.92],.018,[.1,1.76,-2.5],.016,2),x([.1,1.39,-2.5],.075,[.1,1.52,-2.5],.07,4),x([.1,1.52,-2.5],.005,[.1,1.76,-2.5],.005,2),x([.62,-.4,2.3],.03,[.5+.3*(y(11)-.5),2.5+.3*y(12),2.05],.022,2);const D=f(0,1,0),X=f(.1,1.455,-2.5);H.set([D[0],D[1],D[2],4.1],256+(32+n)*4),H.set([C,e-C,0,0],256+(40+n)*4),H.set([X[0],X[1],X[2],.85+.3*y(9)],256+(48+n)*4)})}const Co=S*.42,Do={yaw:0,pitch:0,x:0,y:0,z:0},_o=R.trait("Banks",O?"Bamboo fountains":Ye({"Bamboo clumps":35,"Bamboo fountains":65}));for(let e=0,o=_o==="Bamboo fountains";e<vt;e++){const a=J[e*4+3],n=a*7.31%1,i=a*3.17%1,h=o?n<.2?1:n<.62?2:3:n<.18?2:n<.6?0:1;J[e*4+3]=h+(i<.5?.5:0),h>=2&&(J[e*4+2]*=1.45)}const d={x:0,y:1.4,z:0,yaw:0,pitch:oe,hd:0,rx:0,rz:0},_e=(()=>{const e=Me+ze-S*.26,o=oe+.36;return[Math.sin(e)*Math.cos(o),Math.sin(o),Math.cos(e)*Math.cos(o)]})(),ot=st?{z:[.27,.29,.31],h:[.43,.44,.45],s:[.5,.49,.47],c:[.42,.42,.42],v:.35,a:1.15}:Bt?{z:[.06,.07,.19],h:[.3,.24,.36],s:[1.55,.58,.2],c:[0,0,0],v:0,a:.75}:Pt?{z:[.011,.016,.042],h:[.03,.04,.078],s:[.05,.062,.1],c:[.15,.18,.27],v:1,a:1}:null,se=Nt==="Pink dawn"?{h:[1.05,.93,1.04],s:[1.04,.84,1.18],z:[1,.96,1.03],k:1}:Nt==="Gold sunrise"?{h:[1.12,1,.78],s:[1.16,1.02,.74],z:[.96,1,1.02],k:1.3}:{h:[.68,.8,1.05],s:[.95,.7,.88],z:[.64,.78,1.05],k:1};let at=0;const so=()=>{const e=R.view||Do,o=E.s,a=Math.atan(Ot(o));d.hd=a,d.rx=P(o)+E.u,d.rz=o;const n=Z(.36+(e.x||0),-.4,.45),i=Z(1.7+(e.z||0),-3.2,2.6),h=Z(1.38+(e.y||0),.9,1.8),f=no(d.rx,d.rz,a+Co,n,i);d.x=f[0],d.z=f[1],d.y0=h,d.y=h+.02*Math.sin(at*1.1),d.yaw=a+ze+(e.yaw||0),d.pitch=Z(oe+(e.pitch||0),-1.25,1.25)},io=()=>{const e=Math.cos(d.pitch),o=[Math.sin(d.yaw)*e,Math.sin(d.pitch),Math.cos(d.yaw)*e],a=[Math.cos(d.yaw),0,-Math.sin(d.yaw)],n=[o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]];return{fw:o,rt:a,up:n}},co=(e,o)=>{const a=io(),n=e*2-1,i=1-o*2;let h=[0,1,2].map(b=>a.fw[b]+(n*a.rt[b]+i*a.up[b])*Mt);const f=Math.hypot(h[0],h[1],h[2]);h=h.map(b=>b/f);let x=h[1]<-.004?d.y/-h[1]:140;x=Z(x,6,140);let y=d.x+h[0]*x,C=d.z+h[2]*x;const D=gt(C)-3,X=Z(y-P(C),-D,D);return y=P(C)+X,[y,C,h[1]<-.004&&x<140]};let W=0,ie=0;const p=new Float32Array(28*4),Lo=()=>{const e=Ee+11*W,o=e*de,a=ut(-1,12,e),n=ut(-4,14,e),i=ut(-.7,1.2,e),h=1-.8*W,f=(m,w)=>m.map((G,Q)=>G*(1+(w[Q]-1)*h)),x=Qt([1,.45,.36],[1,.8,.6],a).map(m=>m*(2.6+2.6*a)*i*(1+(se.k-1)*h)),y=f(Qt([.15,.2,.38],[.22,.36,.62],n),se.z),C=f(Qt([.42,.48,.58],[.58,.64,.72],n),se.h),D=f(Qt([1.08,.6,.36],[1.05,.84,.6],n).map(m=>m*(.75+.35*ut(-4,3,e))),se.s);if(p.set([_e[0],_e[1],_e[2],ye==="Setting moon"||ye==="Evening moon"?1-.55*W:0],48),ot){const m=h;for(let w=0;w<3;w++)y[w]+=(ot.z[w]-y[w])*m,C[w]+=(ot.h[w]-C[w])*m,D[w]+=(ot.s[w]-D[w])*m,x[w]+=(ot.c[w]-x[w])*m}const X=[0,1,2].map(m=>(y[m]*.5+C[m]*.5)*.6*(ot?ot.a:1)),b=Math.cos(o),T=[Math.sin(Xt)*b,Math.sin(o),Math.cos(Xt)*b],r=Math.tan(Math.max(o,0)),s=[0,0,0,0];if(r>=Dt[3])s[3]=1;else{let m=0;for(;r>Dt[m+1];)m++;const w=(r-Dt[m])/(Dt[m+1]-Dt[m]);s[m]=1-w,s[m+1]=w}p.set([T[0],T[1],T[2],ot?i+(ot.v-i)*h:i],16),p.set([x[0],x[1],x[2],.5+.5*ut(-5,2,e)],20),p.set(s,36),p.set([zt.v*(1-.7*W),zt.y,zt.lo*(1-.8*W),W],64),p.set([y[0],y[1],y[2],1-ut(3,10,e)],72),p.set([C[0],C[1],C[2],1],76),p.set([D[0],D[1],D[2],0],88),p.set([X[0],X[1],X[2],0],92),p[70]=zt.hz*(1-.35*W)};p.set(M.slice(0,4),24),p.set(M.slice(4,8),28),p.set([pt[0],pt[1],ee,go],32),p.set([vt,0,$t==="Slow current"?1:0,$t==="Drizzle"?1:0],80),p[71]=ye==="High cirrus"?.22:.1,p.set([Bt?2.2:st?1.2:4.5,Pt?1:0,st?1:0,0],52),p.set(bo?[2.7,1.55,.55,0]:[1,1,1,0],56),p.set(Lt,60),p.set($t==="Slow current"?[1,.9,1,0]:$t==="Drizzle"?[.25,.1,.9,0]:[.5,.22,1,0],96),p.set([mt==="Heavy fog"?85:st?95:62+26*St[1],zt.v*(mt==="Layered banks"?.9:mt==="River fog"?.35:mt==="Heavy fog"?.5:st?.7:0),0,0],100);let U=null,lo=-100,Le=0,He=0,Ho=0;const Uo=[57,60,62,64,67,69,72,74,76,79],fo=(e,o)=>{jt(e,o,at,.7),R.sound.hit("noise",.1,{dur:.22,cutoff:1300}),R.sound.note(76+Math.floor(5*c()),{dur:.09,vel:.08,wave:"sine"})},Bo=e=>{const o=R.input,a=o.taps();if(o.down){lo=at,U||(U={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,path:0});const n=o.x-U.lx,i=o.y-U.ly;if(U.lx=o.x,U.ly=o.y,U.t+=e,U.path+=Math.hypot(n,i),U.path>.015){const h=1-Math.exp(-e*6),f=1/Math.max(e,.001);E.vu+=(Z(n*f*16,-6,6)-E.vu)*h,E.vs+=(Z(-i*f*26,-7,7)-E.vs)*h,Le-=e,Le<=0&&(Le=.45,R.sound.hit("noise",.05,{dur:.7,cutoff:380}))}else U.t>.35&&(ie=.11,He-=e,He<=0&&(He=.7,R.sound.note(Uo[Ho++%6+Math.round(W*4)],{dur:2.2,vel:.05,wave:"sine"})))}else{if(U){if(U.path<=.015&&U.t<=.35){const n=co(U.x0,U.y0);fo(n[0],n[1])}U=null}else if(a.length){lo=at;const n=co(a[0].x,a[0].y);fo(n[0],n[1])}ie=-.01}};let Ue=4+12*c(),Be=0,ce=[0,0],ho=!1;const Po=e=>{at+=e,W=Z(W+ie*e,0,1);const o=Math.exp(-e/3.5);U&&U.path>.015||(E.vu*=o,E.vs*=o),E.s=Z(E.s+E.vs*e,-260,ne[0].z-22),E.u+=E.vu*e;const a=gt(E.s)-7;Math.abs(E.u)>a&&(E.u=Z(E.u,-a,a),E.vu*=-.2);const n=Math.hypot(E.vu,E.vs);if(Be-=e*n,Be<=0&&n>.15){Be=1.1+.8*c();const i=no(P(E.s)+E.u,E.s,Math.atan(Ot(E.s)),(c()<.5?-1:1)*(.6+c()),1.5+3*c());jt(i[0],i[1],at,.1+.2*Math.min(1,n/3))}if(Ue-=e,Ue<=0){const i=!ho&&c()<.3;ho=i,Ue=i?.5+1.5*c():6+34*c()*(.4+.6*c());const h=d.yaw+(c()-.5)*1.1,f=18+110*c(),x=d.z+Math.cos(h)*f,y=gt(x)-3;jt(P(x)+Z(d.x+Math.sin(h)*f-P(x),-y,y),x,at,.1+.2*c())}ce[0]+=e*.9,ce[1]-=e*.35},uo=()=>{so();const e=io();p.set([d.x,d.y,d.z,at],0),p.set([e.fw[0],e.fw[1],e.fw[2],Mt],4),p.set([e.rt[0],e.rt[1],e.rt[2],v],8),p.set([e.up[0],e.up[1],e.up[2],.3+3.2*(1-ut(0,14,Ee+11*W))+(mt==="Heavy fog"?.6:0)],12),Lo();const o=ot?1:1-.75*ut(4,12,Ee+11*W);p[47]=o*(1+.05*Math.sin(at*7.3)*Math.sin(at*3.1)),p[68]=ce[0],p[69]=ce[1];const a=Math.abs(d.pitch),n=Math.cos(a)-Mt*Math.sin(a),i=n<.1?4:Math.atan(Mt*1.42/n)+.06;let h=1e9;Ht.length=0;for(let r=0;r<vt;r++){const s=J[r*4]-d.x,m=J[r*4+1]-d.z,w=Math.hypot(s,m);let G=Math.atan2(s,m)-d.yaw;G-=Jt*Math.round(G/Jt),Math.abs(G)<i+Math.atan(1.3*J[r*4+2]/Math.max(w,1))&&(Ht.push(Math.floor(w)*64+r),h=Math.min(h,w))}Ht.sort((r,s)=>r-s);for(let r=0;r<Ht.length;r++){const s=Ht[r]%64;H.set(J.subarray(s*4,s*4+4),r*4)}p[80]=Ht.length,p[91]=Math.max(h-1,.5),p[81]=De,p[84]=_t;const f=oo||!l.one?So():null;eo(),N(5,A.tP),N(8,l.tG),N(10,Lt[3]>0?A.tF:null),N(0,l.tN),N(1,A.tH),N(2,A.tS),N(3,A.tD),t.texSubImage2D(t.TEXTURE_2D,0,0,0,64,4,t.RGBA,t.FLOAT,H);const x=r=>{const s=l.one?Rt.one:r?Rt["main"+r]:l.get0();t.useProgram(s.p),t.uniform4i(s.uI||null,110,64,9,No),t.uniform4i(s.uJ||null,2,Ne,4,3),t.uniform4fv(s.uC,p),l.one&&t.uniform4i(s.uK,r,0,0,0),t.drawArrays(t.TRIANGLES,0,3)},y=[d.x,d.z,d.y0,d.yaw,d.pitch],C=y.some((r,s)=>Math.abs(r-ao[s])>2e-5)||ie>0&&W<1;for(let r=0;r<5;r++)ao[r]=y[r];const D=(r,s,m)=>{N(6,null),N(7,null),N(9,null);const w=p[1],G=p[47];p[1]=d.y0,p[47]=o,t.viewport(0,0,v,v),m<v&&(t.enable(t.SCISSOR_TEST),t.scissor(0,s,v,m)),r===3&&l.split&&(t.bindFramebuffer(t.FRAMEBUFFER,f.fH),x(4),N(9,f.tH)),t.bindFramebuffer(t.FRAMEBUFFER,r===1?f.fA:f.fC),x(r),t.disable(t.SCISSOR_TEST),p[1]=w,p[47]=G},X=()=>{N(11,null),t.bindFramebuffer(t.FRAMEBUFFER,f.fK),t.viewport(0,0,v,v);const r=Rt.sky;t.useProgram(r.p),t.uniform4fv(r.uC,p),t.drawArrays(t.TRIANGLES,0,3),N(11,f.tK)};let b=0,T=null;if(f)if(C)f.own===ae&&(f.own=null);else{if(b=2,l.split&&(f.own!==ae||W>0?X():N(11,f.tK)),f.own!==ae)f.own=ae,f.strip=0,f.tick=0,D(1,0,v),D(3,0,v);else if(W>0||f.tick++%3===0){const r=f.strip++%8,s=Math.floor(v*r/8);T=[s,Math.floor(v*(r+1)/8)-s]}N(6,f.tA),N(7,f.tC)}if(t.bindFramebuffer(t.FRAMEBUFFER,ke.f),t.viewport(0,0,v,v),x(b),b===2&&l.split){let r=v,s=0,m=v,w=0;for(let G=0;G<Ne;G++){const Q=256+(32+G)*4,q=H[Q+3]+.5,j=[H[Q]-p[0],H[Q+1]-p[1],H[Q+2]-p[2]],nt=j[0]*e.fw[0]+j[1]*e.fw[1]+j[2]*e.fw[2];if(nt-q<.05){nt+q>0&&(r=0,s=v,m=0,w=v);continue}const Ut=yt=>{const Ie=(yt-q)/(nt-q),Oe=(yt-q)/(nt+q),Ge=(yt+q)/(nt-q),u=(yt+q)/(nt+q);return[Math.min(Ie,Oe)/Mt*.5+.5,Math.max(Ge,u)/Mt*.5+.5]},le=Ut(j[0]*e.rt[0]+j[1]*e.rt[1]+j[2]*e.rt[2]),fe=Ut(j[0]*e.up[0]+j[1]*e.up[1]+j[2]*e.up[2]);r=Math.min(r,Math.floor(le[0]*v)-2),s=Math.max(s,Math.ceil(le[1]*v)+2),m=Math.min(m,Math.floor(fe[0]*v)-2),w=Math.max(w,Math.ceil(fe[1]*v)+2)}r=Math.max(r,0),m=Math.max(m,0),s=Math.min(s,v),w=Math.min(w,v),s>r&&w>m&&(t.enable(t.SCISSOR_TEST),t.scissor(r,m,s-r,w-m),x(5),t.disable(t.SCISSOR_TEST))}t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,v,v),t.useProgram(Rt.blit.p),N(4,ke.t),t.drawArrays(t.TRIANGLES,0,3),T&&(D(3,T[0],T[1]),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,v,v))};so(),jt(d.x+Math.sin(d.yaw+.1*S)*6.5,d.z+Math.cos(d.yaw+.1*S)*6.5,-4.5,.55),jt(d.x+Math.sin(d.yaw-.2*S)*30,d.z+Math.cos(d.yaw-.2*S)*30,-3,.25),uo(),oo=!0;let Pe=0;return(e,o)=>{if(l.q0){const a=l.q0;l.q0=null,a()}for(o=Math.min(o||0,.1),Bo(o),Pe+=o;Pe>1/60;)Po(1/60),Pe-=1/60;uo()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
