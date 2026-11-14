// Sunset Surf: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/559.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(rt){rt&&rt.add({num:559,name:"Sunset Surf",fam:"Vistas",recipe:"A tropical beach around sunset, where waves stand up with the light shining through them, break white and slide up the sand as thin lace, with palms dark behind you. The sky, the tide and where the sun sets change every mint. Drag to send in a set of bigger waves, or hold to set the sun and turn the sky red.",interactive:"Drag to send a set of bigger waves rolling in; hold to set the sun and redden the sky.",music:!0,gl:!0,fps:30,seed:0,make(v){const e=v.gl,C=v.size,y=!!v.home;let U=1436489191;for(let t=2;t<66;t+=8)U=Math.imul(U^parseInt(v.hash.slice(t,t+8),16),2246822507)^U>>>13;const d=()=>{U=U+1831565813|0;let t=Math.imul(U^U>>>15,1|U);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<8;t++)d();const D=t=>{let a=0;for(const s in t)a+=t[s];let o=d()*a;for(const s in t)if(o-=t[s],o<0)return s;return Object.keys(t)[0]},_e=Math.PI*2,O=(t,a,o)=>t<a?a:t>o?o:t,Ue=(t,a,o)=>{const s=O((o-t)/(a-t),0,1);return s*s*(3-2*s)},nt=v.trait("Light",y?"Gold haze":D({"Gold haze":40,"Red sun":28,"Cloud bank":22,"Pink dusk":10})),De=v.trait("Surf",y?"Rolling":D({Rolling:45,"Big swell":25,Gentle:22,Glassy:8})),lt=t=>{for(;t-- >0;)d()},Oe=y?5:{Five:5,Four:4,Six:6,Three:3,"One alone":1}[D({Five:34,Four:24,Six:20,Three:14,"One alone":8})],Rt=!y&&D({"A line":45,"Two rows":25,Scattered:22,"Close pair":8})==="Close pair",qt=!y&&D({Faded:50,Bright:35,"All white":15})==="All white",je=v.trait("Sun",y?"Left of centre":D({"Left of centre":45,"Dead ahead":35,"Far left":20})),ye=y?"Canoe and crows":D({"Canoe and crows":50,"Two canoes":25,"Crows only":15,"Canoe, no crows":10}),Ge=y?"Leaning":D({Leaning:55,Tall:30,"Wind-bent":15});let j=89760030;for(let t=2;t<66;t+=8)j=Math.imul(j^parseInt(v.hash.slice(t,t+8),16),668265263)^j>>>15;const Xe=()=>{j=j+1831565813|0;let t=Math.imul(j^j>>>15,1|j);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ua=t=>{let a=0;for(const s in t)a+=t[s];let o=Xe()*a;for(const s in t)if(o-=t[s],o<0)return s;return Object.keys(t)[0]},ke=Xe()*100,ce=v.trait("View",y||ke<54||ke>=66&&ke<80?"Ankle-deep":ke<66?"Along the shore":"Low in the swash"),ze=Xe()*100;let G=1436289623;for(let t=2;t<66;t+=8)G=Math.imul(G^parseInt(v.hash.slice(t,t+8),16),374761393)^G>>>14;const Ce=()=>{G=G+1831565813|0;let t=Math.imul(G^G>>>15,1|G);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ct=t=>{let a=0;for(const s in t)a+=t[s];let o=Ce()*a;for(const s in t)if(o-=t[s],o<0)return s;return Object.keys(t)[0]},it=y?"Streaked cirrus":ct({"Streaked cirrus":40,Clear:17,Afterglow:14,"Far shower":11,"Storm light":7,"High sun":8,"Green rim":3}),Lt=v.trait("Sky",it==="Green rim"&&ce==="Along the shore"?"Clear":it),_t=v.trait("Tide",y?"High tide, shore break":ct({"Mid tide":62,"High tide, shore break":22,"Low tide flats":16})),ie=Ce(),Ut=Ce(),Te={"Mid tide":[1,0,.085,0],"High tide, shore break":[4.5,0,.15,0],"Low tide flats":[.75,34,.085,.06]}[_t],N=Te[0],V=Te[1],J=Te[2],he=Te[3],X=["Streaked cirrus","Clear","Afterglow","Far shower","Storm light","High sun","Green rim"].indexOf(Lt),H={"Gold haze":{el:.04,cl:.55,bank:0,red:0,dk:0,tint:[1,1,1,0]},"Red sun":{el:.022,cl:.12,bank:.25,red:1,dk:.12,tint:[1.2,.78,.7,.7]},"Cloud bank":{el:.055,cl:.75,bank:.85,red:0,dk:.05,tint:[.78,.86,1.05,0]},"Pink dusk":{el:-.006,cl:.45,bank:0,red:.3,dk:.32,tint:[1.3,.85,1.25,.25]}}[nt];let Y=H.el,P=H.cl,$=H.bank,ee=H.dk;X===0?Y=H.el*(.75+.9*ie):X===1?(Y=.01+.035*ie,P=0,$=0):X===2?(Y=-.05-.025*ie,P=.3,$=0,ee=Math.max(ee,.3)):X===3?P=Math.min(P,.3):X===4?(Y=.016+.02*ie,P=0,$=0):X===5?(Y=.1+.07*ie,P=P*.7,$*=.3):X===6&&(Y=.006,P=0,$=0);const Se={Rolling:.72,"Big swell":1,Gentle:.5,Glassy:.42}[De],Dt=De==="Glassy"?.05:.13,Ot={Rolling:.2,"Big swell":.28,Gentle:.14,Glassy:.18}[De],ht=1/(2*350),Ee=1.5,jt=430,ft=32,He=ce==="Along the shore"&&V===0?1:0,Gt=ce==="Along the shore"?1:0,Xt=t=>{const a=.5*Math.cos(t*.4833+ze)+.32*Math.cos(t*.2992+ze*2.7+1.3)+.22*Math.cos(t*.1848+ze*5.1+.7);return He*1.5*(a+.45*a*a-.2)},Ie=(t,a)=>{const o=a-Ee-t*t*ht;return Ht(He?o-Xt(t)*Ue(-9,-6,o)*Ue(10,7,o):o)},Ht=t=>{if(t>V)return-.1*(Math.pow(N*(t-V)+2,2/3)-1.5874);if(t>0)return he*(1-t/V);const a=Math.max(1.3,J*12+he);return he-J*t+(a+.012*(-t-15)-he+J*t)*Ue(-11,-17,t)},It=Ie(0,0)+1.6,Fe=je==="Far left"?0:.1,Ae=Math.tan(31*Math.PI/180),Ke=Fe+Math.atan((je==="Dead ahead"?.55-.5:je==="Far left"?.16-.5:.32-.5)*2*Ae),E={"Ankle-deep":[Fe,-.065,1.6,0,Ae],"Along the shore":[Fe+.75,-.11,1.6,0,Ae],"Low in the swash":[Fe,-.03,.6,2.2,Ae]}[ce],Ne=E[4],Kt=E[0]+(Ke>E[0]?-1:1)*(.12+.22*Ce());lt((y?0:2*Oe-(Rt?Math.min(Oe,2):0))+Oe*(qt?11:12)+30);const dt=[];{const t=[-31,-22,-13.5,-5,4.5,14,24,33];for(let a=0;a<t.length;a++){if(d()<.12)continue;const o=t[a]+(d()-.5)*4,s=Ee+o*o*ht-ft+1-d()*7,n=(Ge==="Tall"?13:9.5)+d()*5,c=(Ge==="Wind-bent"?.45:Ge==="Tall"?.15:.28)+d()*.18,h=(d()-.5)*1+(o>0?.25:-.25);dt.push({x:o,z:s,y:Ie(o,s)-.3,H:n,lean:c,ldx:Math.sin(h),ldz:Math.cos(h),L:4.2+d()*1.2,sd:d()})}}const We=[];ye!=="Crows only"&&We.push({x:-5.5+d()*2,z:-13.6,hd:1.25+d()*.3,paint:d()<.6?1:0}),ye==="Two canoes"&&We.push({x:8+d()*3,z:-15.5,hd:1.9+d()*.3,paint:1}),ye!=="Canoe, no crows"&&lt(4*(ye==="Crows only"?5:3+Math.floor(d()*2)));let I=1436437118;for(let t=2;t<66;t+=8)I=Math.imul(I^parseInt(v.hash.slice(t,t+8),16),2654435761)^I>>>16;const Me=()=>{I=I+1831565813|0;let t=Math.imul(I^I>>>15,1|I);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ve=Me(),te=[[.1083,.6545,.12],[.1337,.7854,-.08]],pt=t=>{const a=(te[0][0]*Math.cos(te[0][2])-te[1][0]*Math.cos(te[1][2]))*140+(te[0][1]-te[1][1])*t+(Ve*1-Ve*1.618)*_e;return Math.sqrt(Math.max(1.64+1.6*Math.cos(a),0))/1.8},ut=Math.pow(Se*Math.pow(.1*(Math.pow(N*140+2,2/3)-1.5874),.25)/.78,.8),mt=(Math.pow(ut/.1+1.5874,1.5)-2)/N+V+Ee-E[3],Ye=Math.tan(E[0])*mt,Ze=mt/Math.cos(E[0])*Ne,k=[],Qe=(t,a,o,s)=>{const n=Math.pow(N*o+2,.6666666666666666),c=Ye+(Me()-.5)*Ze*(s===void 0?2.6:s),h=c+(Me()<.5?-1:1)*(15+22*Me());k.push({t0:t,H0:a,S0p:n,dA:1.3+1.3*d(),dK:.022+.025*d(),dP:d()*_e,hP:d()*_e,u0:1.2*Math.sqrt(9.8*a)*(.9+.2*d()),tsh:(n-1.5874)/(.66*N),snd:0,x1:c,x2:h}),k.length>8&&k.shift()};let ae=0;{for(const f of[-62,-51.5,-41,-29.7,-20.1,-12.7])Qe(f+(d()-.5)*(y?0:3),Se*(.85+.3*d()),140,k.length===4?1:void 0);ae=-12.7+10+2*d();const a=k[4],o=.1*(a.S0p-1.5874),s=Math.pow(a.H0*Math.pow(o,.25)/.78,.8);y&&(a.x1=Ye-.2*Ze);let n=(a.S0p-(s/.1+1.5874))/(.66*N),c=y?0:.15+(Ut-.5)*2.4;if(y){const f=L=>L-Math.floor(L),p=a.hP*.1591549;let u=a.x1,le=0;for(let L=-20;L<=20;L++){const A=Ye+Ze*L/20,we=(A-a.x1)/(6.5+7*f(p*7.7)),ge=(A-a.x2)/(5+6*f(p*13.3)),be=(1+.22*Math.cos(A*.021+a.hP)+.15*Math.sin(A*.093+a.dP*2))*(.27+.12*Math.exp(-Math.pow((A-a.x1)/32,2))+.81*Math.exp(-we*we)+(.24+.26*f(p*5.9))*Math.exp(-ge*ge));be>le&&(le=be,u=A)}const Le=s*(1+.8*(le-1));n=(a.S0p-(Le/.1+1.5874))/(.66*N)+a.dA*(Math.sin(u*a.dK+a.dP)+.35*Math.sin(u*a.dK*3.7+a.hP)),c=-1.6}const h=4+c-n-a.t0;for(const f of k)f.t0+=h,f!==a&&(f.H0*=.72+.56*pt(f.t0));ae+=h}const F=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,Wt=F+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",xt=`
const float PI = 3.14159265;
// the arc of the treeline the view along the shore looks at (azimuth, elevation): baked again sharp into its own strip
const float SA0 = .78, SA1 = 1.75, SE0 = -.012, SE1 = .13;
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? PI - a : a; return y < 0. ? -a : a; }
float hsh(float n) { return fract(sin(n) * 43758.5453); }
float sq(float x) { return x * x; }
// horizontal distance to the treeline (a parabola parallel to the bay's shore) along the direction d
float treeD(vec2 d, vec4 B) {
  d /= max(length(d), 1e-5);
  float z0 = B.y - B.w, D = d.y * d.y - 4. * B.x * d.x * d.x * z0;
  float t = -2. * z0 / max(sqrt(max(D, 0.)) - d.y, 1e-6);
  return D < 0. || abs(t * d.x) > B.z ? 1e5 : t;
}
`,Vt=F+"uniform vec4 uB, uB2, uB3; out vec4 o;"+xt+`
uint hu(uvec3 q) { uint h = q.x * 1597334677u ^ q.y * 3812015801u ^ q.z * 2654435761u; h ^= h >> 16; h *= 2246822519u; h ^= h >> 13; h *= 3266489917u; h ^= h >> 16; return h; }
float hf(vec2 i, float per, float ch) { vec2 m = mod(i, per); return float(hu(uvec3(uvec2(ivec2(m)) , uint(ch * 7. + 1.)))) / 4294967295.; }
float vn(vec2 p, float per, float ch) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hf(i, per, ch), hf(i + vec2(1., 0.), per, ch), f.x), mix(hf(i + vec2(0., 1.), per, ch), hf(i + vec2(1., 1.), per, ch), f.x), f.y); }
float fb(vec2 p, float per, float ch) { return vn(p, per, ch) * .55 + vn(p * 2., per * 2., ch + 10.) * .3 + vn(p * 4., per * 4., ch + 20.) * .15; }
vec4 vor(vec2 p, float per) {
  vec2 i = floor(p), f = fract(p); float d1 = 9., d2 = 9., id = 0., hs = 0.;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y)), c = i + g;
    vec2 jp = g + vec2(hf(c, per, 30.), hf(c, per, 31.)) * .9 + .05 - f;
    float d = length(jp);
    if (d < d1) { d2 = d1; d1 = d; id = hf(c, per, 32.); } else if (d < d2) d2 = d;
    // the foam's holes: round, each its own size, soft where two merge (a smooth union of discs, no straight walls)
    float r = .42 + .4 * hf(c, per, 33.);
    hs += exp(-6. * d / r);
  }
  return vec4(d1, d2, id, -log(max(hs, 1e-6)) / 6.);
}
// one palm seen from far away, drawn in its own plane (metres): a hair of a trunk leaning from its foot and curving up,
// a dense lumpy heart, and a crown of fronds squashed to about half its width: an upper fan arching up and out, a
// skirt hanging below, solid along their ribs and feathery only at the tips (leaflets)
float palm2(vec2 q, float H, float lean, float sd, float pxm) {
  float v = clamp(q.y / H, 0., 1.), bend = (fract(sd * 37.1) - .5) * .14;
  float tx = H * (lean * (1. - pow(1. - v, 1.7)) + bend * sin(3.1416 * v)), tw = mix(.19, .12, v) + pxm * .25;
  float cov = smoothstep(tw + pxm, tw - pxm, abs(q.x - tx)) * step(0., q.y) * step(q.y, H + .3);
  vec2 cq = q - vec2(lean * H, H);
  float cs = .85 + .3 * fract(sd * 13.7);
  if (dot(cq, cq) < 52. * cs * cs) {
    float rc = (1.1 + .5 * fract(sd * 5.3)) * (1. + .2 * sin(at2(cq.y, cq.x) * 5. + sd * 20.));
    cov = max(cov, smoothstep(rc + pxm, rc - pxm, length(cq * vec2(1., 1.6))));
    int nf = int(uB3.x), ns = int(uB3.y);
    for (int k = 0; k < nf; k++) {
      float fk = float(k), hk = fract(sin(fk * 7.13 + sd * 91.7) * 43758.5), h2 = fract(hk * 61.3 + .27);
      bool sk = fract(fk * .382 + sd * 3.1) < .25;
      float a = sk ? -1.5708 + (h2 - .5) * 2.2 : -.5 + 4.14 * fract(fk * .618 + sd * 7.7) + (h2 - .5) * .2;
      float L = cs * (sk ? 3. : 4.) * (.8 + .4 * hk);
      vec2 dir = vec2(cos(a), sin(a) * .55);
      float dr = .36 * (1.25 - dir.y);
      vec2 pa = vec2(0.);
      for (int j = 1; j <= ns; j++) {
        float u = float(j) / 3.;
        vec2 pb = L * vec2(u * dir.x, u * dir.y - dr * u * u);
        vec2 ab = pb - pa, ap = cq - pa;
        float h = clamp(dot(ap, ab) / dot(ab, ab), 0., 1.);
        float D = length(ap - ab * h), uf = (float(j - 1) + h) / 3.;
        float hw = L * .13 * pow(max(sin(3.1416 * min(uf * 1.05, 1.)), 0.), .6) + .03;
        float ph = uf * L / .1 + D / hw * 2.5 + hk * 9.;
        float lf = mix(1., mix(1. - smoothstep(.3, .5, abs(fract(ph) - .5)), .6, clamp(pxm * 8. - .3, 0., 1.)), smoothstep(.55, .85, uf));
        cov = max(cov, smoothstep(hw + pxm, hw - pxm, D) * lf);
        pa = pb;
      }
    }
  }
  return cov;
}
// a row of palms along the treeline: slots 5 m apart, filled in clumps (a slow noise over the slots: two to five
// together, then gaps of 15 to 40 m), each its own height (young low ones among the tall), lean either way and crown
float layer(float az, float el, float x, float dist, float sd, float pxa, float skipNear, float xMax) {
  float cov = 0., j0 = floor(x / 5.);
  int nj = int(uB3.z);
  for (int j = -nj; j <= nj; j++) {
    float jj = j0 + float(j), h = hf(vec2(jj, sd), 1e5, 6.);
    float xj = jj * 5. + (hf(vec2(jj, sd), 1e5, 7.) - .5) * 3.5;
    float cl = vn(vec2(jj * .17, sd * 13.), 1e4, 10.);
    if (h > mix(.98, .15, smoothstep(.38, .62, cl)) && abs(xj) > skipNear && abs(xj) < xMax) {
      float zj = uB2.y + xj * xj * uB2.x - uB2.w - hf(vec2(jj, sd), 1e5, 8.) * 7. - (dist - 0.);
      float Dj = length(vec2(xj, zj)), azj = at2(xj, zj);
      float daz = az - azj; daz -= 6.28318 * floor((daz + 3.14159) / 6.28318);
      vec2 q = vec2(daz * Dj, el * Dj + 1.73 - 1.4);
      float hh = hf(vec2(jj, sd), 1e5, 11.), H = 8. + 14. * hh * (.6 + .4 * h), lean = (hf(vec2(jj, sd), 1e5, 9.) - .5) * .62 - .06 * sin(azj);
      if (abs(q.x) < 16.) cov = max(cov, palm2(q, H, lean, hf(vec2(jj, sd), 1e5, 12.), pxa * Dj));
    }
  }
  return cov;
}
void main() {
  vec2 fc = gl_FragCoord.xy / uB.yz;
  o.a = 0.;
#if BM == 0
  {
    vec2 p = fc;
    o = vec4(fb(p * 8., 8., 0.), fb(p * 16., 16., 1.), fb(p * 32., 32., 2.), vn(p * 64., 64., 3.) * .6 + vn(p * 128., 128., 4.) * .4);
  }
#elif BM == 1
  {
    vec4 a = vor(fc * 24., 24.), b = vor(fc * 48., 48.);
    o = vec4(clamp((.8 - a.w) * 1.5, 0., 1.), clamp(a.x, 0., 1.), clamp((.8 - b.w) * 1.5, 0., 1.), a.z);
  }
#else
  {
    float az = (fc.x - .5) * 6.28318, el = fc.y * .45 - .05, pxa = 6.28318 / uB.y;
    // (the strip: the arc the view along the shore looks at, at about twice the screen's density)
    if (uB.w > .5) { az = mix(SA0, SA1, fc.x); el = mix(SE0, SE1, fc.y); pxa = (SA1 - SA0) / uB.y; }
    vec2 dh = vec2(sin(az), cos(az));
    float dT = treeD(dh, uB2), near = 0., far = 0., head = 0.;
    if (dT < 9e4) {
      float x = dh.x * dT;
      // scrub: overlapping domes of bushes 2-6 m across, low in the gaps, with a ragged leafy edge
      float bh = .7, ci = floor(x / 2.4), hz = el * dT + 1.73;
      for (int k = -2; k <= 2; k++) {
        float cj = ci + float(k), xc = (cj + .5) * 2.4 + (hf(vec2(cj, 2.), 1e5, 16.) - .5) * 2.;
        float r = 1. + 2.2 * hf(vec2(cj, 1.), 1e5, 15.), dx = (x - xc) / r;
        float hg = (2. + 3.4 * hf(vec2(cj, 3.), 1e5, 17.)) * (.5 + .5 * smoothstep(.2, .6, vn(vec2(x * .05, 8.), 1e4, 14.)));
        bh = max(bh, hg * sqrt(max(1. - dx * dx, 0.)));
      }
      float lv = vn(vec2(x * 3.5, hz * 3.5), 1e4, 5.) * .6 + vn(vec2(x * 9., hz * 9.), 1e4, 13.) * .4;
      bh += (lv - .5) * 1.1;
      float te = smoothstep(uB2.z, uB2.z - 90., abs(x));
      bh = mix(-.6, bh, te);
      float elB = (.95 + bh - 1.73) / dT;
      near = smoothstep(elB + pxa, elB - pxa, el);
      o.a = clamp(lv * 1.3 - .25 + .5 * smoothstep(-.8, 0., hz - .95 - bh), 0., 1.);
      float x2 = dh.x * (dT + 170.);
      // (its top a ragged canopy, not a ruled bar)
      float elF = ((5. + 3. * vn(vec2(x2 * .02, 7.), 1e4, 6.) + 2.4 * (vn(vec2(x2 * .21, 7.5), 1e4, 18.) - .5) + 1.2 * (vn(vec2(x2 * .9, 9.5), 1e4, 19.) - .5)) * smoothstep(uB2.z, uB2.z - 140., abs(x)) - .13) / (dT + 170.);
      far = smoothstep(elF + pxa, elF - pxa, el);
      int nl = int(uB3.w);
      for (int l = 0; l < nl; l++) {
        float dl = l == 0 ? dT : dT + 170., cur = l == 0 ? near : far;
        if (cur < .99 && near < .99 && el < 25. / dl) {
          float c2 = layer(az, el, l == 0 ? x : x2, l == 0 ? 0. : 170., l == 0 ? .1 : .7, pxa, l == 0 ? 36. : 0., l == 0 ? uB2.z - 12. : 1e4);
          if (l == 0) near = max(near, c2); else far = max(far, c2);
        }
      }
    }
    // headlands where the bay ends, one each side, far and low with a ragged palm fringe
    float sa = abs(az), sgn = az < 0. ? 0. : 1.;
    float a0 = sgn > .5 ? 0.86 : 0.93, a1 = 1.2;
    if (sa > a0 - .05 && sa < 2.6) {
      float u = clamp((sa - a0) / (a1 - a0), 0., 1.);
      float ht = (sgn > .5 ? 34. : 22.) * pow(u, .55) * (1. - .25 * smoothstep(1.4, 2.6, sa)) + 4. * vn(vec2(sa * 120., sgn * 9.), 1e4, 12.) * step(.02, u);
      float Dh = mix(2600., 900., smoothstep(a0, 1.6, sa));
      float elH = (ht - 1.73) / Dh;
      head = smoothstep(elH + pxa, elH - pxa, el) * step(a0 - .02, sa);
    }
    o = vec4(near, far, head, o.a);
  }
#endif
}`,Z=(t,a)=>F+(t?`#define OBJ
`:"")+"uniform sampler2D uN, uL, uP, uD, uG, uK, uT, uQ; uniform vec4 uC[17]; "+(a?"out uvec4 o;":"out vec4 o;")+`
#define TX(s, c) textureLod(s, c, 0.)
#define TXG(s, c, k) textureGrad(s, c, gX * (k), gY * (k))
// a magnified read of the 256 noise tile with its texel creases smoothed (m: 1 where a texel spans pixels): thresholded,
// plain bilinear draws straight edges and corners at every texel
vec2 txs(vec2 c, float m) { vec2 p = c * 256. + .5, i = floor(p), f = fract(p); return (i + mix(f, f * f * (3. - 2. * f), m) - .5) / 256.; }
vec2 gX = vec2(0.), gY = vec2(0.);
float gV = 0., gCurl = 0., gK = 0., gWin = 0., gThk = 9., gRim = 0.;
#define TM uC[0].w
#define SUN uC[4].xyz
#define DUSK uC[4].w
#define SUNC uC[5].xyz
`+xt,fe=`
vec3 horC(vec3 rd) {
  float k = DUSK, w = clamp(dot(normalize(rd.xz + vec2(1e-5)), normalize(SUN.xz)) * .5 + .5, 0., 1.);
  vec3 hs = mix(mix(vec3(1.05, .5, .2), vec3(.8, .22, .09), max(k, uC[9].x)), vec3(.9, .36, .42), uC[9].z);
  vec3 ha = mix(vec3(.3, .25, .32), vec3(.16, .13, .22), k);
  return mix(ha, hs, w * w * w) * (1. - .4 * k) + SUNC * .3 * pow(w, 24.);
}
vec3 amb(vec3 n) {
  vec3 a = mix(vec3(.24, .19, .22), vec3(.19, .16, .2), n.y * .5 + .5) * (1. - .6 * DUSK);
  return a + SUNC * .07 * max(n.y, 0.) + SUNC * .18 * max(dot(normalize(n.xz + 1e-4), normalize(SUN.xz)), 0.) * (1. - abs(n.y));
}
// the treeline over the sky (P: the panorama's covers, near trees, far grove, headland, and the near trees' lit side):
// a warm violet-brown, solid, paling toward the horizon's colour with distance (w: toward the sun, k: dusk)
vec3 trees(vec3 c, vec4 P, vec3 hc, float dT, float w, float k) {
  vec3 veg = vec3(.035, .026, .03) * (1. - .5 * k) + SUNC * .012;
  c = mix(c, mix(veg, hc, .8), P.b);
  c = mix(c, mix(veg, hc, 1. - exp(-(dT + 170.) / 1600.)), P.g);
  vec3 vegN = veg * (.75 + .5 * P.a) + SUNC * vec3(.075, .08, .035) * P.a * (1. - w) * (1. - w);
  return mix(c, mix(vegN, hc, 1. - exp(-dT / 1600.)), P.r);
}
// the sky is baked per instance into a window of azimuth (uC[14]: centre, 1 / width) and warped elevation
// (lod: a rough surface reflects the sky blurred by its unresolved slopes, read from the window's smaller levels)
vec3 skyT(vec3 rd, float lod) {
  float da = at2(rd.x, rd.z) - uC[14].x; da -= 6.2831853 * floor(da / 6.2831853 + .5);
  // (a direction outside the window, as a wave's face reflects what is behind the eye: its edge, blurred smooth)
  lod += clamp((abs(da * uC[14].y) - .46) * 60., 0., 7.);
  vec3 g = textureLod(uK, vec2(da * uC[14].y + .5, sqrt(clamp((asin(clamp(rd.y, -1., 1.)) + .08) / 1.65, 0., 1.))), lod).rgb;
  return g / max(1. - g, .003);
}
`,vt=`float crestE(float x, vec4 B, vec4 C) {
  float w = B.z * .1591549, a = (x - C.z) / (6.5 + 7. * fract(w * 7.7)), b = (x - C.w) / (5. + 6. * fract(w * 13.3));
  // (the shoulders keep falling past the peaks, gently: a level shoulder broke all along at once, a block)
  float c = (x - C.z) / 32.;
  return .27 + .12 * exp(-c * c) + .81 * exp(-a * a) + (.24 + .26 * fract(w * 5.9)) * exp(-b * b);
}`,wt=`
float shS(vec2 p) { return p.y - uC[7].y - p.x * p.x * uC[7].x; }
// the cusps, looking along the shore only (uC[16].x: their amplitude, 0 on every other view; .y their phase): bays
// between low horns, the shore's offset in metres (+ seaward), three unequal periods, the horns sharper than the bays
float cusp(float x) {
  float q = uC[16].y, v = .5 * cos(x * .4833 + q) + .32 * cos(x * .2992 + q * 2.7 + 1.3) + .22 * cos(x * .1848 + q * 5.1 + .7);
  return uC[16].x * 1.5 * (v + .45 * v * v - .2);
}
#define BK uC[8].y
#define DEC uC[9].w
float dep(float s) { return 0.1 * (pow(max(s, 0.) * BK + 2., .6667) - 1.5874); }
float sandY(vec2 p, float s) {
  float sw = s - uC[8].z, FL = uC[9].y, FS = uC[8].w;
  float y = sw > 0. ? -dep(sw) : s > 0. ? FL * (1. - s / max(uC[8].z, .01)) : mix(FL - FS * s, max(1.3, FS * 12. + FL) + 0.012 * (-s - 15.), smoothstep(-11., -17., s));
  vec4 n = TX(uN, p * 0.011);
  return y + (n.g - .5) * 0.07 + (n.r - .5) * 0.3 * smoothstep(-15., -24., s);
}
float gCu = 0.;
// swash lace: a fine net of bubble walls (17 cm and 7 cm cells) that thins and tears into holes as it ages,
// thick where the foam was dense, gone where it was thin; finer than a pixel it fades to its mean cover
float laceN(vec2 lp, float age, float fp) {
  vec4 m = TX(uN, txs(lp * vec2(.07, .11), 1. - smoothstep(.3, 1., fp * 28.)));
  float ag = clamp(age / 7., 0., 1.);
  // cells drawn out down the slope (y runs along the flow); thin as it ages. (One scale: the coordinates are far from
  // the origin, and a scale that changed from place to place, with the foam's age or a noise, scrambled them into
  // marbled rings)
  lp += (TX(uN, lp * .3).rg - .5) * .14;
  lp *= vec2(1., .55);
  fp *= 1.3;
  vec4 c1 = TX(uL, lp * .2), c2 = TX(uL, lp * .5 + .37), br = textureLod(uN, lp * .8, log2(max(fp * 220., 1.)));
  float e1 = fp * 8., e2 = fp * 12.;
  float dens = m.r * .55 + m.g * .3 + m.b * .15;
  float th = mix(.24, .42, ag) + .12 * (m.b - .5), wth = clamp((dens - th) * 2. + .08, 0., .32) * (1. - .45 * ag), w2 = wth * .55 * (1. - .5 * ag);
  float v = max(1. - smoothstep(wth * .5 - e1, wth + .02 + e1, c1.r), (1. - smoothstep(w2 * .5 - e2, w2 + .015 + e2, c2.r)) * smoothstep(th - .12, th, dens) * .8);
  v *= smoothstep(.22, .58, br.g + .25 * (1. - ag)) * (.75 + .5 * br.a);
  float mean = clamp(wth * 1.1 + w2 * .4, 0., 1.) * .55;
  return mix(v, mean, smoothstep(.008, .05, fp));
}
// foam lace: a foam field whose holes open as it ages, with bubbly cell walls around them
// (edge: 1 in the middle of a hole, 0 on the foam between: round holes of dark water that open as the foam ages and
// pops, wider where it lay thin, until only strands and knots are left; their rims fibrous, never straight)
float laceF(float age, float edge, vec4 lw) {
  float fld = lw.g * .6 + lw.b * .4, T = clamp(.97 - .8 * (1. - exp(-age / 4.)) + 1.3 * (fld - .5), .06, 1.05);
  // (holes smaller than the pixel's footprint along the view fade to their mean cover: far out, cut at one texel, they
  // were rows of level bricks)
  float gl = length(gY), ew = .07 + 6. * gl;
  return mix(1. - smoothstep(T - ew, T + ew, edge + (lw.a - .5) * .12), 1. - smoothstep(T - .45, T + .45, .55), smoothstep(.012, .05, gl));
}
// foam from several sources: the cover is the largest, its kind (F.y) blends where two covers meet, never switches
void addF(inout vec4 F, float f, float fy) { F.y = mix(F.y, fy, smoothstep(-.12, .12, f - F.x)); F.x = max(F.x, f); }
`+vt+`
// the sea level from the swell and every wave in flight; F: foam, foam age, lip, swash sheet thickness; wg: gloss of
// freshly drained sand
float sea(vec2 p, float s, bool full, out vec4 F, out float wg, out vec3 dd) {
  float lev = 0., dl = 0., dsw = 0., dlx = 0.; F = vec4(0., .5, 0., 0.); wg = 0.;
  int nw = int(uC[5].w);
  float dloc = dep(s);
  // the swell outside the break: two long trains beating into sets and a shorter one across them, their crests
  // sharpened (second order), gone where the waves have broken; the slopes fade where a pixel spans a wavelength
  float am = uC[14].z * smoothstep(.5, 1.25, dloc / uC[13].w) * step(-1., s), gLn = length(gY);
  for (int j = 0; j < 3 + int(uC[13].y); j++) {
    vec4 W = j == 0 ? vec4(.1083, .6545, .12, 1.) : j == 1 ? vec4(.1337, .7854, -.08, .8) : vec4(.2618, 1.2083, .26, .3);
    vec2 dk = W.x * vec2(-sin(W.z), cos(W.z));
    float th = dot(dk, vec2(p.x, s)) + W.y * TM + uC[14].w * (j == 0 ? 6.2832 : j == 1 ? 10.166 : 15.17);
    float a = am * W.w, c1 = cos(th), s1 = sin(th);
    lev += a * (c1 + .3 * (c1 * c1 - s1 * s1));
    float g = -a * s1 * (1. + 1.2 * c1) * exp(-sq(W.x * gLn) * .15);
    dl += g * dk.y; dlx += g * dk.x;
  }
  // the foam's own coordinates are the water's: fixed to the ground, lifted a little toward the shore on a swell's crest
  // and back in its trough (the wave passes through; the water stays)
  vec2 pO = p + vec2(0., 1.3 * lev);
  float gF = length(gY) * 512.;
  vec4 lw = full ? TX(uN, txs(pO * .09 + vec2(0., TM * .004), 1. - smoothstep(.3, 1., gF * .09))) : vec4(.5);
  vec4 lc = full ? TX(uL, pO * vec2(.13, .17) + (lw.rg - .5) * .3 + (lw.ba - .5) * .07) : vec4(1.);
  // the large forms in the foam (rafts, streaks, the ragged line where a crest began to break), in the water
  vec4 lg = full ? TX(uN, txs(pO * vec2(.019, .045) + vec2(.37, .11), 1. - smoothstep(.3, 1., gF * .045))) : vec4(.5);
  // the swash's fronts are lobes and fingers, never ruled: one field along the shore shifts where 'up the beach' is
  float lob = full ? (TX(uN, vec2(p.x * .045, .31)).r - .5) * 1.8 + (TX(uN, vec2(p.x * .19, .73)).g - .5) * .8 : 0.;
  // (the run-up follows the cusps: up the bays, short of the horns)
  lob += gCu;
  // (the breaking foam's lace at its first age is the same for every wave: made once, out of the wave loop)
  float lf3 = full ? laceF(.3, lc.r, lw) : 0.;
  for (int i = 0; i < nw; i++) {
    vec4 A = texelFetch(uD, ivec2(2 * i, 0), 0);
    if (!full) {
      // in the march, skip a wave that can't reach this point (its delay along the crest is bounded by 1.35 A.w + 1 s)
      float tc = TM - A.x, tr = 1.35 * A.w + 1.05, ts0 = (A.z - 1.5874) / (.66 * BK);
      if (!(tc + tr > 0. && s > -1. && tc - tr < ts0) && !(s < 4. && tc + tr > ts0 && tc - tr < ts0 + 15.)) continue;
    }
    // (wid: the wave's own number, so its noise stays its own while other waves come and go)
    vec4 B = texelFetch(uD, ivec2(2 * i + 1, 0), 0), C = texelFetch(uD, ivec2(20 + i, 0), 0);
    float wid = B.z * .1591549;
    // (its texel creases smoothed: the arrival time's kinks drew the peel's edge as straight steps along the crest)
    // (the same read in the march and the shading, or they disagree on where the crest is)
    vec4 sx = TX(uN, txs(vec2(p.x * .012 + wid * 7.31, .61 + wid * 3.17), 1.));
    float tau = TM - A.x - A.w * (sin(p.x * B.x + B.y) + .35 * sin(p.x * B.x * 3.7 + B.z)) - .8 * (sx.g - .5) - .15 * (sx.b - .5);
    float hm0 = 1. + .22 * cos(p.x * .021 + B.z) + .15 * sin(p.x * .093 + B.y * 2.), hm = hm0 * (crestE(p.x, B, C) + .14 * (sx.r - .5));
    float fade = clamp(tau * .45, 0., 1.);
    float sp = A.z - .66 * BK * tau;
    float tsh = tau - (A.z - 1.5874) / (.66 * BK);
    // one lace call per wave (the trail's or the swash's), so the net is compiled once
    float ageT = 0., fpT = 1., wT = 0., scT = 0., fT = 0.; vec2 lpT = vec2(0.);
    bool swa = s < 5.5 && tsh > 0. && tsh < 15.;   // (past where the drained gloss fades out, so it never ends on a line)
    if (fade > 0. && s > -1. && (sp > 1.5874 || full)) {
      float H0d = C.x * hm * fade, db = C.y * (1. + .8 * (hm - 1.));
      float spc = max(sp, 1.5874), sc = (spc * sqrt(spc) - 2.) / BK, dc = .1 * (spc - 1.5874);
      float Hs = H0d * inversesqrt(sqrt(max(dc, .03)));
      // a crest breaks where its height passes its share of the depth: first at its peak, then outward along both
      // shoulders as the depth under them falls (the peel)
      float br = smoothstep(db, db * .62, dc), st = smoothstep(db * 1.9, db, dc);
      float q = s - sc;
      // the roller's lumps ride the bore's front and tumble: drawn forward down the face, their shapes turning over
      vec2 nuv = vec2(p.x * .15 + wid * 9.1, q * .17 + TM * .1) + .045 * vec2(sin(q * 1.7 + TM * 2.3 + p.x * .5), sin(p.x * 1.1 - TM * 1.6 + q * .6));
      bool nq = full ? q > -6. && q < 25. : br > .01 && abs(q) < 4.;
      vec4 nn = nq ? TXG(uN, txs(nuv, 1.), vec2(.15, .17)) : vec4(.5);
      if (sp > 1.5874) {
        // the height a depth can hold (a broken crest still stands highest where it carries most), reached softly: no
        // level tops
        float cap = mix(.8, .6, br) * dc * (.5 + .45 * min(hm, 1.3)), xc = Hs / cap, H = Hs * inversesqrt(sqrt(1. + xc * xc * xc * xc));
        // (seen from the eye a far crest stands at most about .005 rad over the horizon: no lens with a flat base)
        float dE = length(p - uC[0].xz), hE = uC[0].y + .006 * dE + 3. * smoothstep(44., 26., dE), xe = H / hE;
        H *= inversesqrt(sqrt(1. + xe * xe * xe * xe));
        float wf = mix(mix(4.5, .55, st), .75, br), wb = mix(6., 4., st) + 3. * dc;
        // the face rises out of a trough drawn down in front of it (deeper as the wave steepens, filled as it breaks);
        // behind the crest the back falls away long
        float Kt = (.14 + .22 * st) * (1. - .5 * br), wt = wf * 1.7 + 1.2 + H;
        float e1 = exp(-q * q / (wf * wf)), e2 = exp(-q * q / (wt * wt)), eb = exp(-q * q / (wb * wb));
        float pr = q < 0. ? (1. + Kt) * e1 - Kt * e2 : eb;
        float dpr = -2. * q * (q < 0. ? (1. + Kt) * e1 / (wf * wf) - Kt * e2 / (wt * wt) : eb / (wb * wb));
        float L = 3. + 6. * dc, E = exp(-q / L), u = clamp(q / 2.5, 0., 1.), S = u * u * (3. - 2. * u), dS = q > 0. && q < 2.5 ? 2.4 * u * (1. - u) : 0.;
        float bo = q < 0. ? pr : mix(1., E, S), dbo = q < 0. ? dpr : (E - 1.) * dS - S * E / L;
        float rq = q - .5;
        // rounded lumps a few tens of centimetres high on the roller (two coarse octaves: no spikes)
        float ra = br * exp(-rq * rq / (.6 + H)) * H, tb = nn.r * .55 + nn.g * .3 + nn.b * .15 - .3, rol = ra * tb;
        // (where the lip is landing the white water stands up, so the crest's top rises at the peel and falls behind it)
        float pk = H * .32 * br * (1. - br) * 4. * exp(-rq * rq / (.25 + .5 * H));
        lev += H * (mix(pr, bo, br * .85) - .12) + rol + pk;
        dl += H * mix(dpr, dbo, br * .85) - 2. * rq / (.6 + H) * rol - 2. * rq / (.25 + .5 * H) * pk;
        if (full && ra > .02) {
          // the tumbling lumps of the roller shade by their own slopes
          vec4 nx = TXG(uN, txs(nuv + vec2(.004, 0.), 1.), vec2(.15, .17)), nq = TXG(uN, txs(nuv + vec2(0., .004), 1.), vec2(.15, .17));
          dlx += ra * (nx.r * .55 + nx.g * .3 + nx.b * .15 - .3 - tb) * 37.5;
          dl += ra * (nq.r * .55 + nq.g * .3 + nq.b * .15 - .3 - tb) * 42.5;
        }
        if (full) {
          // white water where the crest is breaking, widest at the peak and running out along the shoulders, its edge torn
          float brR = clamp(br * (.55 + .9 * lg.r + .4 * (lg.b - .5)), 0., 1.);
          // (the white water avalanches down the face in fingers: how far it has come down is ragged along the crest)
          float fdn = (.5 + H) * br * br * (.2 + 1.5 * nn.r * nn.r + .6 * nn.g * nn.g);
          float f1 = brR * smoothstep(-.12 - fdn, -.07 - .5 * fdn, q) * exp(-max(q, 0.) / ((1.5 + 5. * H) * (.25 + 1.5 * mix(sx.b, lg.g, .6))));
          float f0 = smoothstep(.93, 1., st) * (1. - br) * exp(-sq((q - .1) / .35)) * .8;
          float fa = f1 * (.8 + .2 * smoothstep(.1, .7, nn.b)) * (.75 + .25 * lf3);
          addF(F, fa, clamp(nn.a * 1.4 - .2 + .3 * smoothstep(.3, -.3, q), 0., 1.));
          F.x = max(F.x, f0 * smoothstep(.2, .55, lg.a + .25 * st));
          // the crest as a wall of water: how much of it the view ray crosses here (thin near the top of a steep face,
          // thicker down it and between the lumps along the crest), only on a wave near breaking
          float wn = smoothstep(.45, 1., st) * (1. - br * .6) * clamp(H * 1.6, 0., 1.) * smoothstep(.3, -.15, q) * smoothstep(.35, .75, pr);
          // (where two waves' windows meet, their thicknesses blend: a switch drew a hard dark edge across the face)
          gThk = mix(gThk, max(-q, .03) * (1. + min(wb, 1.2 + 1.5 * H) / wf) * (1. + 2. * max(-q, 0.)) * (.5 + 1.1 * sx.b) * (.55 + .9 * nn.g), clamp((wn - gWin) * 6. + .5, 0., 1.) * step(.001, wn)); gWin = max(gWin, wn);
          // the curl: the shadowed hollow under the pitching lip
          gCurl = max(gCurl, br * (1. - br) * 4. * exp(-sq((q + .25 + .5 * H) / (.18 + .3 * H))) * clamp(H * 1.4, 0., 1.));
        }
      }
      // the trail: where this crest was breaking as it passed here (the depth here against its break depth, the line
      // torn), foam left in the water that tears into lace as it ages, still drifting after the bore has reached the sand
      float brL = smoothstep(db, db * .62, dloc + db * ((lg.r - .5) * .5 + (lg.b - .5) * .25));
      if (full && q > 0. && q < 50. && brL > .02) {
        float age = q / max(sqrt(9.8 * dc), .6) + max(tsh, 0.);
        float sc2 = lg.g * .6 + TX(uN, vec2(pO.x * .06 + wid * 3.7, pO.y * .33 + wid * 1.9)).b * .4;
        float scum = smoothstep(.44 + .12 * min(age / 10., 1.), .74, sc2 + .1 * lw.a);
        float dl = length(p - uC[0].xz), fpx = 2.2 * uC[1].w / uC[13].x * dl * (1. + dl / 1.6);
        lpT = pO + wid * vec2(37.3, 21.1); ageT = age; fpT = fpx; scT = scum; fT = laceF(age, lc.r, lw);
        wT = brL * exp(-age / 14.) * smoothstep(0., 1.2, q) * smoothstep(50., 30., q + 8. * lg.a);
      }
    }
    float LN = 0.;
    if (full) {
      vec2 lp = lpT; float la = ageT, lf = fpT;
      if (swa) {
        // (and over the swash's first two seconds: the moment it begins is the same all down the beach at one x, and a
        // switch there drew a straight seam across the foam)
        float u0 = B.w * hm0 * (.9 + .2 * sx.r) * (1. + uC[16].z * .45 * (sx.g - .5)), xf = max(u0 * tsh - DEC * tsh * tsh, 0.), dl = length(p - uC[0].xz), k2 = smoothstep(0., 2., tsh), k = smoothstep(-2.8, -1.2, .5 - s + lob) * k2;
        lp = mix(pO + wid * vec2(37.3, 21.1), vec2(p.x + wid * 37.3, .5 - s - .55 * min(xf, u0 * u0 / (4. * DEC)) + wid * 21.1), k); la = mix(ageT, tsh * .8 + 1.5, k2); lf = 2.2 * uC[1].w / uC[13].x * dl * (1. + dl / 1.6);
      }
      if (swa || (wT > 0. && lf < .14)) LN = laceN(lp, la, lf);
      // the trail: one sheet where the bore has just passed, then torn into rafts with lace between them, then lace alone
      float ag = clamp(ageT / 9., 0., 1.), raft = smoothstep(.2 + .45 * ag, .34 + .45 * ag, lg.g * .65 + lw.r * .35);
      // (the net fades out before the distance where it is no longer computed: it used to stop along a level line)
      float LT = LN * smoothstep(.14, .09, lf);
      if (wT > 0.) addF(F, wT * mix(LT, mix(mix(LT, scT * .6, smoothstep(.06, .14, fpT)), fT, exp(-ageT / 2.)), raft) * .85, mix(-.6, .5, exp(-ageT / 3.)));
    }
    // the bore collapses at the shoreline and the swash runs up the beach face, its front ballistic
    if (swa) {
      // (looking along the shore each run-up reaches its own way along the beach, so the lines they leave cross)
      float u0 = B.w * hm0 * (.9 + .2 * sx.r) * (1. + uC[16].z * .45 * (sx.g - .5));
      float xf = max(u0 * tsh - DEC * tsh * tsh, 0.), xi = .5 - s + lob
        // (and its front runs up in tongues, each wave's own width, their notches between: the arcs a run-up leaves)
        - uC[16].z * .8 * (1. - 4. * sq(fract(p.x / (4. + 5. * fract(wid * 3.7)) + wid * 1.3) - .5));
      float th = (.01 + .05 * exp(-tsh / 1.8)) * smoothstep(0., .6, tsh) * smoothstep(-2.5, 0., xi);
      float hs = xi < xf ? th * pow(1. - max(xi, 0.) / max(xf, .01), 1.2) : 0.;
      if (hs > F.w) { F.w = hs; dsw = xi > 0. ? th * 1.2 * pow(max(1. - xi / max(xf, .01), 1e-4), .2) / max(xf, .01) : 0.; }
      if (full) {
        float up = u0 - 2. * DEC * tsh, xm0 = u0 * u0 / (4. * DEC);
        float ff = exp(-sq((xf - xi) / .12)) * (up > 0. ? 1. : .3) * smoothstep(0., .3, xf) * (.4 + .6 * smoothstep(.3, .7, TX(uN, p * .9).g));
        float a = xi / max(xf, 1.);
        float lace = LN * step(xi, xf);
        float lc = 1. - lace;
        float dsc = u0 * u0 - 4. * DEC * max(xi, 0.);
        float dr = tsh - (dsc > 0. ? (u0 + sqrt(dsc)) / (2. * DEC) : 99.);
        float xm = u0 * u0 / (4. * DEC);
        lace = max(lace * (1. - .6 * smoothstep(0., 3., dr)), xi < xm && dr > 0. ? smoothstep(.5, .9, 1. - lc) * exp(-dr / 2.5) * .5 : 0.);
        // where the run-up stopped a thin line of foam is left on the sand
        // (looking along the shore it lies broken, in flecks and threads of unequal length and width, not a cord)
        float lnw = uC[16].z > 0. ? .02 + .045 * sx.b : .05;
        float ln = tsh > u0 / (2. * DEC) ? exp(-sq((xm - xi - .03) / lnw)) * .7 * exp(-(tsh - u0 / (2. * DEC)) / 12.) : 0.;
        if (uC[16].z > 0.) ln *= smoothstep(.44, .56, sx.a + .25 * (sx.r - .5));
        float fs = max(max(ff * .8, lace * .8), ln * (.6 + .4 * lc)) * smoothstep(-2.5, 0., xi) * smoothstep(0., .4, tsh);
        // the sheet's front: a rounded rim catching the light, and a soft shadow on the sand just ahead of it
        float dxf = xf - xi, rimF = smoothstep(0., .3, xf) * (up > 0. ? 1. : .35) * smoothstep(0., .3, tsh);
        gRim = clamp(gRim + (exp(-sq((dxf - .035) / .04)) - .8 * exp(-sq((dxf + .09) / .08))) * rimF, -1., 1.);
        addF(F, fs, mix(-1., .3, smoothstep(-.1, .1, ff - lace)));
        // the gloss the backwash leaves: soft at the run-up's top, fading in after the sheet drains and as the wave ages out
        wg = max(wg, smoothstep(xm + .3, xm - 1.2, xi) * smoothstep(0., 1.2, dr) * exp(-dr / 6.) * smoothstep(15., 9., tsh) * smoothstep(-3.5, -1.5, xi)
          // (looking along the shore it drains in patches, not as one even film)
          * mix(1., .3 + .7 * smoothstep(.3, .7, lg.g * .6 + lg.b * .4), uC[16].z));
      }
    }
  }
  dd = vec3(dl, dsw, dlx);
  return lev;
}
// the ground: sand, sea and swash sheet, with the slope along the shore normal (dh)
float surf(vec3 p, bool full, out float s, out float sy, out vec4 F, out float wg, out vec2 dh) {
  s = shS(p.xz);
  // the cusps shift the profile along the shore normal (a horn stands out of the water, a bay lets it in), and the
  // sand's slope with it, so a horn's sand is lit as beach face, not as sea bed
  gCu = uC[16].x > 0. ? cusp(p.x) : 0.;
  float sc = s - gCu * smoothstep(-9., -6., s) * smoothstep(10., 7., s), swc = sc - uC[8].z;
  sy = sandY(p.xz, sc);
  float sw = s - uC[8].z, sl = -9., dsy = swc > 0. ? -.0667 * BK * pow(swc * BK + 2., -.3333) : sc > 0. ? -uC[9].y / max(uC[8].z, .01) : -uC[8].w * (1. - smoothstep(-11., -17., sc)); vec3 dd = vec3(0.);
  F = vec4(0., 99., 0., 0.); wg = 0.;
  if (sw > -20.) sl = sea(p.xz, sw, full, F, wg, dd);
  float hw = sy + F.w, h = max(sy, max(sl, hw));
  dh = sl >= hw && sl > sy ? dd.xz : vec2(hw > sy ? dsy + dd.y : dsy, 0.);
  return h;
}
`,Yt=`
vec3 skyC(vec3 rd) {
  float k = DUSK, e = rd.y, ea = max(e, 0.);
  float w = clamp(dot(normalize(rd.xz + vec2(1e-5)), normalize(SUN.xz)) * .5 + .5, 0., 1.), cs = dot(rd, SUN);
  vec3 zen = mix(vec3(.045, .065, .16), vec3(.02, .026, .08), k);
  vec3 mid = mix(mix(vec3(.15, .13, .21), vec3(.42, .27, .22), w * w), vec3(.12, .08, .15), k) * uC[12].xyz;
  vec3 hc = horC(rd);
  vec3 c = mix(mix(hc, mid, smoothstep(0., .13, ea)), zen * mix(vec3(1.), uC[12].xyz, .6), smoothstep(.06, .5, ea));
  c = mix(c, hc * vec3(1., .8, .75), uC[12].w * exp(-ea / .1));
  float es = .02 + .07 * k;
  c = mix(c, mix(vec3(.2, .22, .34), vec3(.09, .1, .18), k), (1. - w) * smoothstep(es + .025, es - .01, ea) * .7);
  c += (1. - w) * (1. - w) * vec3(.2, .07, .1) * (1. - .5 * k) * exp(-sq((ea - es - .07) / .06));
  float ang = acos(clamp(cs, -1., 1.));
  vec4 nb = TX(uN, vec2(at2(rd.x, rd.z) * 3., .2));
  float top = .012 + .022 * nb.r * uC[6].y;
  float bk = uC[6].y * smoothstep(top + .002, top - .002, e) * smoothstep(-.01, .0, e);
  c += SUNC * (.25 * exp(-ang / .4) + .3 * exp(-ang / .05)) * (1. - .7 * bk);
  vec2 cp = rd.xz / (ea + .07);
  vec2 cr = vec2(cp.x * .8 + cp.y * .6, cp.y * .8 - cp.x * .6);
  vec4 n1 = TX(uN, cr * vec2(.006, .028) + vec2(.3, .1) + TM * vec2(.0006, 0.)), n2 = TX(uN, cr * vec2(.02, .07) + vec2(.7, .2));
  float den = smoothstep(.62 - .3 * uC[6].x, .95, n1.g * .7 + n2.b * .3 + n2.a * .12) * smoothstep(.015, .09, ea) * uC[6].x * 1.6;
  vec3 cc = mix(vec3(.3, .2, .27), vec3(1.2, .55, .24), pow(w, 4.)) * (1. - .55 * k) + SUNC * .9 * exp(-ang / .22);
  cc *= .65 + .45 * n2.a;
  c = mix(c, cc, clamp(den, 0., .85));
  int SF = int(uC[15].z);
  if (SF == 2) {
    // afterglow: the sun gone, bands of apricot, rose and green-blue over it, the earth's shadow and its pink belt opposite
    float w2 = pow(w, 1.6);
    vec3 bands = mix(vec3(1.1, .46, .2), vec3(.62, .26, .3), smoothstep(.0, .07, ea));
    bands = mix(bands, vec3(.13, .19, .22), smoothstep(.06, .2, ea));
    bands = mix(bands, vec3(.035, .045, .11), smoothstep(.18, .5, ea));
    c = mix(c, bands * mix(.35, 1., w2), .8);
  } else if (SF == 4) {
    // storm light: a slate deck down to a few degrees, its underside burning where the sun slips under it
    vec4 sn = TX(uN, vec2(at2(rd.x, rd.z) * .4, .43));
    float base = .045 + .03 * sn.g + .01 * sin(at2(rd.x, rd.z) * 4. + sn.b * 3.);
    float deck = smoothstep(base - .008, base + .012, ea) * (.9 + .1 * n1.g);
    vec3 dc = mix(vec3(.05, .05, .07), vec3(.11, .1, .12), n2.b * n1.a) * (1. - .4 * k);
    dc += SUNC * vec3(1., .42, .16) * exp(-(ea - base) / .018) * pow(w, 5.) * (.6 + .8 * n2.g);
    c = mix(c + SUNC * vec3(.5, .2, .05) * pow(w, 2.) * smoothstep(base + .01, 0., ea), dc, deck);
  } else if (SF == 3) {
    // a far shower: one soft grey veil of rain on the horizon, fading up into the dark of its cloud, lit gold on its sun side
    float da = at2(rd.x, rd.z) - uC[15].w; da -= 6.2831853 * floor(da / 6.2831853 + .5);
    float wdt = .13 + .04 * nb.a, top = .085 + .03 * TX(uN, vec2(da * 1.5, .73)).r;
    float str = TX(uN, vec2(da * 14. + ea * 4., ea * .3 + .1)).g;
    float cur = smoothstep(wdt, wdt * .2, abs(da + ea * .4)) * smoothstep(top, top * .3, ea) * (.7 + .3 * smoothstep(.3, .7, str));
    float cm = smoothstep(wdt * 2.4, wdt * .5, abs(da)) * exp(-sq((ea - top - .015) / (.035 + .02 * n1.g)));
    vec3 rc = mix(vec3(.1, .095, .135), vec3(.05, .05, .08), k) + SUNC * .25 * pow(w, 6.);
    c = mix(c, rc, clamp(cur * .8 + cm * .55, 0., .85));
  }
  c = mix(c, mix(vec3(.24, .16, .2), vec3(.11, .07, .11), k) + SUNC * .5 * exp(-ang / .08), bk * .85);
  c += SUNC * 1.6 * exp(-sq((e - top) / .0025)) * uC[6].y * exp(-ang / .12);
  float el = asin(clamp(e, -1., 1.));
  if (el < .41 && el > -.05) {
    // (in the strip's arc read from a smaller level: blurred as the reflections want them; the full pass takes these out
    // and draws the strip's sharp ones at the screen's own size)
    float az = at2(rd.x, rd.z);
    float lb = az > SA0 && az < SA1 && el > SE0 && el < SE1 ? (uC[2].w > 450. ? 2. : 1.) : 0.;
    c = trees(c, textureLod(uP, vec2(az / (2. * PI) + .5, (el + .05) / .45), lb), hc, min(treeD(rd.xz, uC[7]), 3000.), w, k);
  }
  return c;
}
`,gt=`
#ifdef OBJ
// ---------- tapered capsules: closest approach of the ray to the segment, with coverage for thin parts ----------
void prm(vec3 ro, vec3 rd, vec4 A, vec4 B, float pixA, inout vec4 OB, inout vec3 ON, inout float occ) {
  float ra = fract(A.w), rb = B.w;
  vec3 u = B.xyz - A.xyz, w = ro - A.xyz;
  float uu = max(dot(u, u), 1e-7), bd = dot(rd, u), dw = dot(rd, w), uw = dot(u, w);
  float h = clamp((uw - bd * dw) / max(uu - bd * bd, 1e-7), 0., 1.);
  float t = max(h * bd - dw, 0.);
  h = clamp((uw + t * bd) / uu, 0., 1.); t = max(h * bd - dw, 0.);
  vec3 dv = w + t * rd - h * u;
  float D = length(dv), r = mix(ra, rb, h), fp = pixA * t + 1e-4, wd = max(r, fp * .5);
  float cv = clamp((wd - D) / fp + .5, 0., 1.) * min(1., r / wd);
  if (cv > .002) {
    float te = t - sqrt(max(r * r - D * D, 0.)) / sqrt(max(1. - bd * bd / uu, .04));
    occ *= 1. - cv;
    if (te < OB.x) { OB.x = te; OB.z = floor(A.w); ON = normalize(ro + rd * te - A.xyz - u * h + 1e-6); OB.w = h; }
  }
}
void crown(vec3 ro, vec3 rd, vec3 c, vec4 B, float pixA, inout vec4 OB, inout vec3 ON, inout float occ) {
  float L = B.x, sd = B.y;
  int nf = int(uC[11].x), ns = int(uC[11].y);
  for (int k = 0; k < nf; k++) {
    float fk = float(k), hk = hsh(fk * 7.13 + sd * 91.7);
    float a = sd * 6.2832 + fk * 2.39996 + hk * .5, dead = k >= nf - 3 ? 1. : 0.;
    float el = mix(mix(.7, -.8, fract(fk * .382 + sd)), -1.3 + .2 * hk, dead);
    float Lk = L * (.8 + .35 * hk) * (1. - .35 * dead);
    vec3 dh = vec3(sin(a), 0., cos(a));
    float ce = cos(el), se = sin(el), dr = .36 * (1.2 - el) * (1. - .8 * dead);
    vec3 pa = c;
    for (int j = 1; j <= ns; j++) {
      float u = float(j) / 3.;
      vec3 pb = c + Lk * (u * ce * dh + vec3(0., u * se - dr * u * u, 0.));
      vec3 uv = pb - pa, w = ro - pa;
      float uu = dot(uv, uv), bd = dot(rd, uv), dw = dot(rd, w), uw = dot(uv, w);
      float h = clamp((uw - bd * dw) / max(uu - bd * bd, 1e-7), 0., 1.);
      float t = max(h * bd - dw, 0.); h = clamp((uw + t * bd) / uu, 0., 1.); t = max(h * bd - dw, 0.);
      vec3 dv = w + t * rd - h * uv, sv = normalize(cross(uv, vec3(0., 1., 0.)) + 1e-5);
      float lat = dot(dv, sv), Dr = length(dv), D = length(vec2(lat, dot(dv, normalize(cross(sv, uv))) * 1.5)), uf = (float(j - 1) + h) / 3.;
      float hw = Lk * .15 * pow(max(sin(3.1416 * min(uf * 1.08, 1.)), 0.), .6) * (1. - .45 * dead) + .015;
      float fp = pixA * t + 1e-4;
      if (Dr < hw + fp) {
        float ph = uf * Lk / .08 + abs(lat) / hw * 2.6 + hk * 9.;
        float hv = hw * (.68 + .32 * hsh(floor(ph) + fk * 13.1 + sd));
        float lf = mix(1. - smoothstep(.3, .5, abs(fract(ph) - .5)), .6, max(clamp(fp / .08 * 1.5 - .3, 0., 1.), smoothstep(.45, .85, abs(bd) * inversesqrt(uu))));
        float cv = clamp((hv - D) / fp + .5, 0., 1.) * lf;
        cv = max(cv, clamp((.012 + fp * .5 - Dr) / fp + .5, 0., 1.) * min(1., .024 / max(fp, .024)));
        if (cv > .002) { occ *= 1. - cv; if (t < OB.x) { OB.x = t; OB.z = 14. + 16. * dead; ON = normalize(vec3(0., 1., 0.) - rd * .6); OB.w = uf; } }
      }
      pa = pb;
    }
  }
}
void objs(vec3 ro, vec3 rd, float pixA, float tMax, bool crowns, inout vec4 OB, inout vec3 ON) {
  float occ = 1.;
  int ng = int(uC[3].w);
  for (int g = 0; g < ng; g++) {
    vec4 G0 = texelFetch(uD, ivec2(2 * g, 1), 0), G1 = texelFetch(uD, ivec2(2 * g + 1, 1), 0);
    vec3 oc = ro - G0.xyz;
    float b = dot(oc, rd), hh = b * b - dot(oc, oc) + G0.w * G0.w;
    if (hh > 0. && -b + sqrt(hh) > 0. && -b - sqrt(hh) < tMax && (crowns || G1.z < 2.5)) {
      int st = int(G1.x), n = int(G1.y);
      for (int k = 0; k < n; k++) {
        int id = 2 * (st + k);
        vec4 A = texelFetch(uD, ivec2(id & 63, 2 + (id >> 6)), 0), B = texelFetch(uD, ivec2((id + 1) & 63, 2 + ((id + 1) >> 6)), 0);
        if (A.w >= 1.) prm(ro, rd, A, B, pixA, OB, ON, occ);
        else if (crowns) crown(ro, rd, A.xyz, B, pixA, OB, ON, occ);
      }
    }
  }
  OB.y = 1. - occ;
}
vec3 shadeObj(vec3 p, vec3 n, vec3 rd, vec4 OB) {
  float m = OB.z, bm = mod(m, 16.), vr = floor(m / 16.), t = OB.x;
  vec4 nz = TX(uN, p.xz * 2.3 + p.y * vec2(.13, 1.9));
  vec3 al = vec3(.2, .17, .14);
  float tr = 0.;
  if (bm < 1.5) al = vec3(.25, .21, .16) * (.7 + .5 * nz.a);
  else if (bm < 9.5) { al = vec3(.17, .15, .13) * (.5 + .7 * nz.a) * (.8 + .4 * nz.r); al = vr > .5 ? mix(al, vec3(.08, .12, .17) * (.6 + .6 * nz.a), .5) : al; }
  else if (bm < 10.5) al = vec3(.018, .018, .022);
  else if (bm < 11.5) al = vec3(.06, .055, .05) * (.8 + .3 * smoothstep(.3, .7, fract(p.y * 3.3 + nz.r))) * (.8 + .3 * nz.a);
  else if (bm < 13.5) al = vec3(.045, .035, .025);
  else if (bm < 14.5) { al = vr > .5 ? vec3(.06, .045, .03) : vec3(.03, .036, .024); tr = .9; }
  float sd = max(dot(n, SUN), 0.), cs = max(dot(rd, SUN), 0.), rim = pow(max(1. - abs(dot(n, rd)), 0.), 2.5);
  vec3 c = al * (amb(n) * .3 + SUNC * .6 * sd);
  c += SUNC * al * .8 * rim * rim * rim * pow(cs, 40.) + SUNC * al * tr * .6 * rim * pow(cs, 200.);
  return mix(c, horC(rd), 1. - exp(-t / 1500.));
}
#endif
`,bt=`
float foot(vec2 p) {
  vec2 a = vec2(1.6, -16.), b = vec2(-.3, 3.5), dv = normalize(b - a), nv = vec2(-dv.y, dv.x), q = p - a;
  float al = dot(q, dv), la = dot(q, nv);
  if (al < 0. || al > length(b - a) || abs(la) > .3) return 0.;
  float k = floor(al / .36), sg = mod(k, 2.) * 2. - 1.;
  vec2 lc = vec2(al - (k + .5) * .36, la - sg * .1);
  float hl = length((lc - vec2(-.075, 0.)) / vec2(.045, .034)), bl = length((lc - vec2(.05, .005 * sg)) / vec2(.065, .046));
  return max(smoothstep(1., .5, hl), smoothstep(1., .55, bl)) * .02 * (.55 + .45 * hsh(k));
}
// the reflecting normal (rippled water, or wet sand smoothed by its film), the sand's own bumpy normal, and the gloss
vec3 surfN(vec3 p, vec3 n, float wd, vec4 F, float wg, float s, float t, out vec3 ns, out float gls) {
  float fade = exp(-t * .025);
  vec4 g1 = TXG(uN, p.xz * 1.9, vec2(1.9)), g2 = TXG(uN, p.xz * .23, vec2(.23));
  ns = n + (vec3(g2.b - .5, 0., g2.a - .5) * .22 + vec3(g1.a - .5, 0., g1.b - .5) * .12) * fade;
  // low tide: a flat of sand under a film of water, ripple-marked, the film a mirror broken along the ripples
  float fl = uC[8].z > 0. ? smoothstep(0., 3., s) * smoothstep(uC[8].z + 1., uC[8].z - 5., s) : 0.;
  float sW = wetL(p.xz, s, g2.r), wW = uC[16].z;
  gSW = sW;
  float dry = max(smoothstep(-uC[8].x + .5 + wW, -uC[8].x - 2.5 - wW * .5, sW), fl * .8 * (1. - smoothstep(.02, .07, length(gY)))), rpf = 1. - smoothstep(4., 9. + 20. * fl, t);
  if (dry * rpf > 0.) {
    vec4 gw = TX(uN, p.xz * .045);
    vec2 rdir = normalize(vec2(.8, .6) + (gw.rg - .5) * .8);
    float rp = dot(p.xz, rdir) * 50. + (g2.r - .5) * 4. + (gw.b - .5) * 9.;
    ns.xz += rdir * (cos(rp) + .5 * cos(2. * rp + .8)) * .32 * dry * rpf * (.6 + .6 * gw.a);
  }
  float fd = 0.;
  if (t < 30.) {
    float wsh = smoothstep(1.2, -2.5, s);
    fd = foot(p.xz) * wsh;
    if (fd > 0.) ns += vec3(fd - foot(p.xz + vec2(.01, 0.)) * wsh, 0., fd - foot(p.xz + vec2(0., .01)) * wsh) * 60.;
  }
  ns = normalize(ns);
  if (wd > .003) {
    mat2 m1 = mat2(.8, .6, -.6, .8);
    vec4 r1 = textureGrad(uN, m1 * p.xz * .05 + TM * vec2(.002, -.006), m1 * gX * .05, m1 * gY * .05);
    vec4 r3 = TXG(uN, vec2(p.x * .9, p.z * .55) + TM * vec2(0., -.04), vec2(.9, .55));
    float thin = (1. - smoothstep(.02, .25, wd)) * fade;
    float ra = uC[6].z * (.45 + .55 * fade) * (1. - .5 * min(F.x, 1.)) * mix(1., .3, thin) * mix(.67, 1., smoothstep(3., 10., t));
    // wind ripples: eight trains of short waves fanned round the wind, their phases warped and their height in patches
    // (catspaws); a train finer than the pixel fades out of the normal and its slope widens the sun's glitter instead
    vec2 g = vec2(0.);
    float wp = 7. * (r1.r - .5) + 3. * (r1.b - .5), pa = .55 + .9 * smoothstep(.3, .7, r1.g);
    for (int k = 0; k < 8 + int(uC[13].y); k++) {
      float fk = float(k), a = 2.2 + (fract(fk * .618) - .5) * 2.4, kk = 6.2832 / (2.2 * pow(.7, fk));
      vec2 dk = vec2(cos(a), sin(a));
      float ph = dot(dk, p.xz) * kk - sqrt(9.8 * kk + .074 * kk * kk * kk) * TM + fk * 2.1 + wp * (1. + .3 * fk);
      float f = length(vec2(dot(dk, gX), dot(dk, gY))) * kk, at = exp(-f * f * .3), sl = ra * pa * .42 * (.75 + .1 * fk);
      g += dk * cos(ph) * sl * at;
      gV += sl * sl * .5 * (1. - at * at);
    }
    gV += sq(thin * .06) * (1. - exp(-length(gY) / .01));
    gls = 1.;
    return normalize(n + vec3(g.x + (r3.a - .5) * thin * .04, 0., g.y + (r3.g - .5) * thin * .08));
  }
  float wet = max(smoothstep(-uC[8].x - 1.5 - wW, -uC[8].x + 1. + wW * .5, sW), wg);
  gls = max(clamp(wet * .5 + wg * .5 + (fd > .008 ? wet : 0.), 0., 1.), fl * .88);
  return normalize(mix(ns, n, gls * .8));
}
vec3 shadeSurf(vec3 p, vec3 rd, float t, vec3 n, vec3 nr, vec3 ns, vec4 F, float wg, float s, float wd, float gls, vec3 refl, float occ1) {
  float sunV = smoothstep(-.012, .01, SUN.y), cs = max(dot(rd, SUN), 0.);
  vec3 rr = reflect(rd, nr); rr.y = abs(rr.y);
  float rs = max(dot(rr, SUN), 0.);
  vec3 A = amb(n), hcr = horC(rd);
  vec4 g1 = TXG(uN, p.xz * 1.9, vec2(1.9)), g2 = TXG(uN, p.xz * .23, vec2(.23)), sh = TX(uL, p.xz * .83);
  float wW = uC[16].z, wet = max(smoothstep(-uC[8].x - 1.5 - wW, -uC[8].x + 1. + wW * .5, gSW), wg);
  vec3 sal = mix(vec3(.62, .5, .35), vec3(.27, .21, .155), wet) * (.82 + .3 * g1.r + .12 * g2.g);
  float shell = sh.a > .996 && t < 25. ? smoothstep(.3, .24, sh.g) : 0.;
  sal = mix(sal, vec3(.86, .74, .66) * (.8 + .2 * sin(sh.g * 90.)), shell);
  vec3 sdif = sal * (A + SUNC * 1.15 * max(dot(ns, SUN), 0.));
  // the sky overhead, toward where we look: the cool half of a sunset's light (this mint's own upper sky)
  vec3 upS = textureLod(uK, vec2(.5, .72), 4.).rgb; upS /= max(1. - upS, .003);
  // foam: a thick bubbly medium lit through its own relief (lumps of about 25 and 14 cm on the roller's own slopes):
  // the facets turned toward the sun take the bright western sky and the sun, the ones turned to us and the hollows
  // only the cool sky overhead (by how far a facet tilts, not only which way: a nearly level sheet split into hard cream
  // and mauve patches where its faint tilt crossed the sun's line); thin foam lets the low sun through at its edges, only
  // when seen against the sun (looking down at it near the feet, that glow drew the thin foam's grain as bright rings)
  float fw = length(gX) + length(gY), fine1 = 1. - smoothstep(.04, .12, fw);
  vec3 nF = normalize(n + vec3(g2.g - .5, 0., g2.b - .5) * 1.4 * fine1);
  float cav = mix(1., .8 + .4 * g2.g, fine1), sF = clamp(.55 + 1.8 * dot(nF.xz, normalize(SUN.xz)), 0., 1.);
  vec3 fc = vec3(.92, .91, .9) * (.82 + .2 * g1.g) * (mix(vec3(dot(upS, vec3(.33))), upS, .55) * 1.25 * (.6 + .4 * nF.y) * cav + vec3(.05, .045, .05) * cav + hcr * (.12 + .62 * sF) * cav + SUNC * (.8 * max(dot(nF, SUN), 0.) + .4 * pow(cs, 3.) * (.4 + .9 * F.y) * sF));
  fc *= .95 + .3 * max(F.y, 0.);
  // its body: heaped and bright where it lies thick, thinner foam translucent and blue-grey with the sky overhead
  fc = mix(fc * .62 + upS * .25, fc, smoothstep(.3, .95, F.x));
  float dull = clamp(-F.y, 0., 1.);
  fc *= mix(vec3(1.), vec3(.93, .92, .92), dull);
  float fe = smoothstep(.04, .3, F.x) * (1. - smoothstep(.4, .85, F.x)) * (1. - dull);
  fc = fc * (1. - .3 * smoothstep(.6, 1., F.x) * pow(cs, 3.)) + SUNC * vec3(1., .72, .38) * fe * pow(cs, 12.) * 3.5 * sunV;
  // the cover's edge: crisp and ragged where the pixel resolves its lumps, the old soft ramp where it can't
  // (soft enough that a thin even veil of foam is drawn as a veil, not cut along its grain's contours into rings)
  float covD = F.x + ((g2.g - .5) * .6 + (g2.b - .5) * .35) * .3 * fine1, ew = max(mix(.3, .2, fine1), fwidth(covD) * 1.2);
  float fa = max(smoothstep(.36 - ew, .36 + ew, covD), smoothstep(.02, .6, F.x) * .45) * step(.005, F.x);
  vec3 col;
  if (wd > .003) {
    float ci = clamp(dot(nr, -rd), 0., 1.);
    // roughness: the slopes the trains could not resolve plus the capillary floor below the smallest of them; Fresnel
    // averaged over it (rough water reflects less at grazing angles than a mirror, so the far sea is darker than its sky)
    float m2 = gV + .003 + .1 * uC[6].z, sg = sqrt(m2);
    float fr = .02 + .98 * pow(1. - ci, 5. * exp(-2.69 * sg)) / (1. + 22.7 * sg * sqrt(sg));
    // the water's body: the sand seen through it, each channel absorbed along the light's way down and back up (red
    // first), and the light the water scatters back: a clear jade outside the break, a milky grey-green where the surf
    // has stirred the sand up (behind a bore, in the swash, all through the shallows), lit by the sky overhead and the sun
    float ct = sqrt(1. - (1. - ci * ci) / 1.78);
    float turb = clamp(.2 + .45 * smoothstep(2.2, .5, wd) + 1.2 * F.x + 6. * F.w, 0., 1.);
    vec3 sig = vec3(.5, .15, .11) + turb * vec3(1.7, 1.45, 1.5);
    vec3 trB = exp(-sig * wd * (1. / max(ct, .25) + 1.));
    // (the sun's share of it has come a long way through the water: what is left of a low gold sun is olive, not jade)
    float hS = step(4.5, uC[15].z) * step(uC[15].z, 5.5);
    vec3 scat = mix(vec3(.03, .12, .13), vec3(.1, .15, .15), turb) * upS * 2.6 + mix(mix(vec3(.075, .1, .06), vec3(.045, .12, .11), hS), vec3(.1, .15, .15), turb) * SUNC * (.03 + .35 * pow(cs, 12.));
    vec3 body = sdif * trB + scat * (1. - trB);
    // (under the darkest skies the water away from the sun's slot carries the deck's hue at its own value, an olive-grey,
    // not the red-brown of the sand under it)
    float kD = (abs(uC[15].z - 2.) < .5 || abs(uC[15].z - 4.) < .5 ? .6 : 0.) * (1. - pow(cs, 4.));
    body = mix(body, dot(body, vec3(.3, .5, .2)) * upS / max(dot(upS, vec3(.3, .5, .2)), .01) * vec3(.97, 1., .93), kD);
    // light through the crest: the upper face of a steep wave is a thin wall of water and the low sky behind it shows
    // through it, amber-gold where the wall is thin at the lip, olive below, dark slate where it thickens toward the
    // foot; thin tips glow toward the sun. (Green needs a high white sun: only the High sun sky keeps some)
    vec3 trC = exp(-(mix(vec3(.34, .22, .2), vec3(.4, .1, .07), hS) + .4 * turb) * min(gThk, 30.) * mix(1.2, 2., hS));
    vec3 thru = hcr * .8 * trC + mix(vec3(.06, .085, .05), vec3(.061, .124, .106), hS) * (upS + SUNC * .4) * (1. - exp(-gThk * .9));
    body = mix(body, thru, gWin);
    vec3 sss = SUNC * mix(vec3(.7, .75, .5), vec3(.38, .66, .51), hS) * exp(-gThk * .6) * pow(cs, 3.) * gWin * sunV;
    // the sun: the glint over the same roughness (Beckmann) goes to the full-size pass as an energy, where the ripples
    // finer than this picture break it into sparkles
    vec3 hv = normalize(SUN - rd);
    float nh = max(dot(nr, hv), .05), t2 = (1. - nh * nh) / (nh * nh);
    gK = fr * exp(-t2 / m2) / (3.1416 * m2 * nh * nh * nh * nh) * max(dot(hv, SUN), 0.) / max(ci, .08) * 3. * sunV * (1. - occ1) * (1. - .6 * gCurl) * (1. - fa);
    col = mix(body, refl, fr) * (1. - .6 * gCurl) + sss;
    // the swash sheet's front: a rounded rim that catches the light
    col += max(gRim, 0.) * (hcr * .35 + upS * .3);
    col = mix(col, fc, fa);
  } else {
    // sand under a film of water is a mirror for the sky: dark below, the sky's colours on top; the soft shadow of the
    // sheet's rim just ahead of it
    float fr = (.02 + .98 * pow(1. - clamp(dot(nr, -rd), 0., 1.), 5.)) * (.15 + .85 * gls) + .3 * gls * gls;
    col = mix(sdif * (1. - .4 * gls), refl + SUNC * pow(rs, mix(25., 500., gls)) * mix(1., 30., gls) * sunV * (1. - occ1), fr);
    col *= 1. - .4 * max(-gRim, 0.);
    col = mix(col, fc, fa);
  }
  return mix(col, hcr, 1. - exp(-t / 1400.));
}
`,Zt=`
float spray(vec3 ro, vec3 rd, float tS) {
  float acc = 0.;
  int nw = int(uC[5].w);
  if (rd.z < .08 || rd.y > .26) return 0.;
  int nsp = int(uC[11].z);
  for (int j = 0; j < nsp; j++) {
    int i = int(j == 0 ? uC[10].x : j == 1 ? uC[10].y : j == 2 ? uC[10].z : uC[10].w);
    if (i < 0) break;
    vec4 A = texelFetch(uD, ivec2(2 * i, 0), 0), B = texelFetch(uD, ivec2(2 * i + 1, 0), 0), C = texelFetch(uD, ivec2(20 + i, 0), 0);
    float t = 25., x = ro.x, tau = 0., sp = 0.;
    for (int j = 0; j < nsp; j += 2) {
      x = ro.x + rd.x * t;
      tau = TM - A.x - A.w * (sin(x * B.x + B.y) + .35 * sin(x * B.x * 3.7 + B.z));
      sp = max(A.z - .66 * BK * tau, 1.5874);
      t = ((sp * sqrt(sp) - 2.) / BK + uC[8].z + uC[7].y + x * x * uC[7].x - ro.z) / rd.z;
    }
    float hm = crestE(x, B, C), db = C.y * (1. + .8 * (hm - 1.)), dc = .1 * (sp - 1.5874);
    float br = smoothstep(db, db * .62, dc), fb = br * (1. - br) * 4. * clamp(tau * .45, 0., 1.);
    float H = C.x * hm * inversesqrt(sqrt(max(dc, .03)));
    if (t > 0. && t < tS && fb > .01) {
      float y = ro.y + rd.y * t;
      float nn = TX(uN, vec2(x * .05 + B.z * .3, y * .25 - TM * .12)).g;
      acc += fb * exp(-max(y - H * .5, 0.) / (.3 + .7 * H)) * smoothstep(-.2, .3, y) * nn * nn * 2. * smoothstep(.17, .05, rd.y + .05 * nn);
    }
  }
  return acc;
}
`,Qt=`
void main() {
  float RS = uC[13].x;
  vec2 uv = gl_FragCoord.xy / RS * 2. - 1.;
  vec3 ro = uC[0].xyz, rd = normalize(uC[3].xyz + uC[1].w * (uv.x * uC[1].xyz + uv.y * uC[2].xyz));
  float tS = 1e9, s = 0., sy = 0., wg = 0.; vec2 dh = vec2(0.); vec4 F = vec4(0.);
  if (rd.y < .12) {
    float tT = treeD(rd.xz, uC[7]) / max(length(rd.xz), 1e-4), tmax = min(1500., tT);
    float t = rd.y < 0. && rd.z > .3 ? max(.05, (ro.y - 1.6) / -rd.y) : .05, tp = t, a = 0., b = 0.;
    int st = 0, nb = 0, ni = int(uC[11].w);
    // past the last step the far sea falls back to the flat plane
    for (int i = 0; i < ni + 1; i++) {
      if (i == ni) { if (st == 1) tS = b; else if (rd.y < 0. && ro.y / -rd.y < tT) tS = ro.y / -rd.y; break; }
      float tt = st == 0 ? t : (a + b) * .5;
      vec3 p = ro + rd * tt;
      float dy = p.y - surf(p, false, s, sy, F, wg, dh);
      if (st == 0) {
        if (rd.y > .03 && p.y > 3.2) break;
        if (dy < 0.) { st = 1; a = tp; b = t; }
        // (low over the surf, steps short enough not to pass through a crest's thin top: they cut its outline in steps)
        else { tp = t; t += clamp(dy / (max(-rd.y, 0.) + (t < 70. && dy < 2.5 ? .7 : .2)) * .9, .02, max(.5, t * .2));
          if (t > tmax) { if (rd.y < 0. && ro.y / -rd.y < tT) tS = ro.y / -rd.y; break; } }
      } else { if (dy < 0.) b = tt; else a = tt; nb++; if (nb > 6) { tS = b; break; } }
    }
  }
  // the distance in two parts (eight bits and the rest), exact enough in half floats or bytes
  float d = tS < 1e8 ? log2(min(tS, 3e4) + 1.) / 16. * 256. : 255.;
  o = vec4(floor(d) / 256., fract(d), spray(ro, rd, tS) * .25, 1.);
#ifdef U8
  o.r = floor(d) / 255.;
#endif
}`,yt=`
void main() {
  float RS = uC[13].x;
  vec2 uv = gl_FragCoord.xy / RS * 2. - 1.;
  vec3 ro = uC[0].xyz, rd = normalize(uC[3].xyz + uC[1].w * (uv.x * uC[1].xyz + uv.y * uC[2].xyz));
  float pixA = 2.2 * uC[1].w / RS;
  vec4 tA = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
#ifdef U8
  tA.r = floor(tA.r * 255. + .5) / 256.;
#endif
  float tS = tA.r > .99 ? 1e9 : exp2((tA.r + tA.g / 256.) * 16.) - 1.;
  vec2 hz = normalize(rd.xz + vec2(1e-6, 0.));
`,Jt=yt+`  o = uvec4(0u);
  if (tS < 1e8) {
    float s = 0., sy = 0., wg = 0.; vec2 dh = vec2(0.); vec4 F = vec4(0.);
    gX = vec2(hz.y, -hz.x) * tS * pixA * .5; gY = hz * tS * pixA * .5 / max(-rd.y, .02);
    vec3 P = ro + rd * tS;
    float h0 = surf(P, true, s, sy, F, wg, dh);
    uvec4 b = uvec4(uvec2(clamp(vec2(wg, gRim * (127. / 255.) + (128. / 255.)), 0., 1.) * 255. + .5), uvec2(clamp(vec2(gWin, gCurl) * .5, 0., 1.) * 255. + .5));
    uvec2 c = uvec2(clamp(vec2(F.y * (127. / 255.) + (128. / 255.), F.w / .064), 0., 1.) * 255. + .5);
    o = uvec4(packHalf2x16(vec2(h0 - sy, gThk)), packHalf2x16(dh), (packHalf2x16(vec2(F.x, 0.)) & 65535u) | (c.x << 16) | (c.y << 24),
      b.x | (b.z << 8) | (b.w << 16) | (b.y << 24));
  }
}`,kt=`uniform highp usampler2D uS;
float shS(vec2 p) { return p.y - uC[7].y - p.x * p.x * uC[7].x; }
// the cusps, looking along the shore only (uC[16].x: their amplitude, 0 on every other view; .y their phase): bays
// between low horns, the shore's offset in metres (+ seaward), three unequal periods, the horns sharper than the bays
float cusp(float x) {
  float q = uC[16].y, v = .5 * cos(x * .4833 + q) + .32 * cos(x * .2992 + q * 2.7 + 1.3) + .22 * cos(x * .1848 + q * 5.1 + .7);
  return uC[16].x * 1.5 * (v + .45 * v * v - .2);
}
// the wet line's own coordinate up the beach (uC[16].z: 1 looking along the shore, else 0 and s as it is): the cusps'
// offset, the arcs the last run-ups left (scallops 3 to 12 m wide whose horns cross, the highest reaching furthest) and
// patches from the sand's own grain, so the wet and dry sand meet along bays and patches, never a ruled line
float gSW = 0.;
float wetL(vec2 p, float s, float gn) {
  if (uC[16].z <= 0.) return s;
  float a = -9.;
  for (int k = 0; k < 3 + int(uC[13].y); k++) {
    float P = k == 0 ? 3.7 : k == 1 ? 6.9 : 11.3, u = p.x / P + float(k) * .37 + uC[16].y, ci = floor(u), f = fract(u) - .5;
    a = max(a, (hsh(ci * 7.31 + float(k) * 19.7) - .5) * 1.6 + (.6 + .5 * float(k)) * (1. - 4. * f * f));
  }
  return s - cusp(p.x) + a - .7 + (gn - .5) * 1.4;
}
`,zt=yt+`  vec3 col = vec3(0.);
  float aO = 0.;
  if (tS < 1e8) {
    uvec4 q = texelFetch(uS, ivec2(gl_FragCoord.xy), 0);
    vec2 h = unpackHalf2x16(q.x), dh = unpackHalf2x16(q.y);
    float wd = h.x, wg = float(q.w & 255u) / 255., gls;
    vec4 F = vec4(unpackHalf2x16(q.z).x, (float((q.z >> 16) & 255u) - 128.) / 127., 0., float(q.z >> 24) * (.064 / 255.));
    gThk = h.y; gWin = float((q.w >> 8) & 255u) / 127.5; gCurl = float((q.w >> 16) & 255u) / 127.5; gRim = (float(q.w >> 24) - 128.) / 127.;
    gX = vec2(hz.y, -hz.x) * tS * pixA * .5; gY = hz * tS * pixA * .5 / max(-rd.y, .02);
    vec3 P = ro + rd * tS;
    float s = shS(P.xz);
    vec3 n = normalize(vec3(2. * P.x * uC[7].x * dh.x - dh.y, 1., -dh.x)), ns;
    vec3 nr = surfN(P, n, wd, F, wg, s, tS, ns, gls);
    vec3 rr = reflect(rd, nr); rr.y = abs(rr.y);
    // rough water reflects a cone of sky: the lookup lifted toward where most of it points (the capillary floor below
    // the smallest train, more with more wind, plus the slopes the trains could not resolve)
    float sgR = wd > .003 ? sqrt(gV + .003 + .1 * uC[6].z) : 0.;
    if (wd > .003) rr = normalize(vec3(rr.x, rr.y + .35 * sgR + .01, rr.z));
    // (and by how far the reflected ray turns across this texel: a highlight's edge is a ramp two texels wide, never a
    // step that the full-size pass would enlarge into a comb; the crisp marks are cut at the screen's size there)
    float dR = wd > .003 ? min(length(fwidth(rr)), .1) : 0.;
    vec3 sk = skyT(rr, log2(1. + (sgR * 2.5 + dR * 1.6) * uC[15].x * uC[14].y));
    float occ = 0.;
#ifdef OBJ
    // the palms and canoes in reflection on water or glossy sand
    vec4 OB = vec4(1e9, 0., 0., 0.); vec3 on = vec3(0., 1., 0.), o0 = P + vec3(0., .02, 0.);
    if (tS < 60. && gls > .3) { objs(o0, rr, pixA * 1.5, 80., false, OB, on); if (OB.y > 0.) sk = mix(sk, shadeObj(o0 + rr * OB.x, on, rr, OB), OB.y); }
    occ = OB.y;
#endif
    col = shadeSurf(P, rd, tS, n, nr, ns, F, wg, s, wd, gls, sk, occ);
    aO = wd > .003 ? .25 + .73 * gK / (1. + gK) : 0.;
  }
  // the mist the spray leaves (the drops themselves are points, drawn after the composite)
  col += tA.b * 1.4 * (SUNC * (.3 + 3.5 * pow(max(dot(rd, SUN), 0.), 6.)) + amb(vec3(0., 1., 0.)) * .4);
  // alpha: 1 for sky; on the ground the water's share and the sun's glint energy the full-size pass breaks into sparkles
  o = vec4(col / (1. + col), tS < 1e8 ? aO : 1.);
}`,Ct=`uniform highp usampler2D uS;
vec3 sunD(vec3 rd, vec3 sk) {
  float e = rd.y, pxs = 2. * uC[1].w / uC[2].w;
  vec4 nb = TX(uN, vec2(at2(rd.x, rd.z) * 3., .2));
  float top = .012 + .022 * nb.r * uC[6].y;
  float bk = uC[6].y * smoothstep(top + .002, top - .002, e) * smoothstep(-.01, .0, e);
  vec3 sr = normalize(cross(SUN, vec3(0., 1., 0.))), su = cross(sr, SUN), dv = rd - SUN;
  float dd = length(vec2(dot(dv, sr), dot(dv, su) * 1.13)), Rs = .0095;
  float disc = smoothstep(Rs + pxs * .6, Rs - pxs * .6, dd) * (1. - .35 * dd * dd / (Rs * Rs));
  float strat = .78 + .22 * TX(uN, vec2(e * 9., .37)).b;
  float ext = mix(.3, 1., smoothstep(0., .035, e)) * (1. - .92 * bk) * strat;
  // the disc by far the brightest thing in view, deep yellow, and a gold aureole a few degrees round it
  float ang = length(dv), sv = smoothstep(-.001, .002, e);
  int SF = int(uC[15].z);
  vec3 dcol = vec3(1.9, .47, .11);
  // the green rim: the last sliver of a clean sun, its upper edge green
  // the disc replaces the sky behind it (not added to it), so it keeps its deep yellow against the cream glow
  vec3 r = sk + SUNC * vec3(1., .6, .3) * (.3 * exp(-ang / .02) + .2 * exp(-ang / .09)) * (SF == 1 || SF == 6 ? .5 : 1.) * (1. - .8 * bk) * sv;
  r = mix(r, SUNC * dcol * mix(1.6, 3.2, ext), disc * sv * mix(.55, 1., ext));
  // its core burns white when the air is clear enough: the brightest thing in the frame, above its own path on the sea
  r += vec3(5., 4.6, 4.2) * smoothstep(Rs * .95, Rs * .25, dd) * sv * ext * ext * clamp(SUNC.g * 2.2, 0., 1.);
  // the green rim: the last sliver of a clean sun, its upper edge green
  if (SF == 6) r = mix(r, vec3(.3, 1.5, .55), disc * sv * smoothstep(.4, .75, dot(dv, su) / Rs));
  if (SF == 2) {
    // one planet over the afterglow
    float az = at2(SUN.x, SUN.z) + .3;
    vec3 pl = vec3(sin(az) * .985, .17, cos(az) * .985);
    r += vec3(1., .95, .85) * 2.5 * smoothstep(pxs * 1.4, pxs * .3, length(rd - pl));
  }
  return r;
}
// the trees at the bay's end at the screen's own size: the sky window carries them blurred (lb above); the blurred ones
// are taken out of it (the treeline over the sky is linear in the sky behind it) and the strip's sharp ones put in
vec3 treeFix(vec3 sk, vec3 rd) {
  // (a cheap test first: most pixels of most views are nowhere near the arc)
  if (rd.y >= .1296 || rd.y <= -.012 || rd.x <= .7033 * length(rd.xz)) return sk;
  float el = asin(clamp(rd.y, -1., 1.)), az = at2(rd.x, rd.z);
  if (az <= SA0 || az >= SA1 || el <= SE0 || el >= SE1) return sk;
  float big = uC[2].w > 450. ? 1. : 0., k = DUSK, w = clamp(dot(normalize(rd.xz + vec2(1e-5)), normalize(SUN.xz)) * .5 + .5, 0., 1.);
  vec4 Pb = textureLod(uP, vec2(az / (2. * PI) + .5, (el + .05) / .45), 1. + big);
  vec4 Ps = textureLod(uQ, vec2((az - SA0) / (SA1 - SA0), (el - SE0) / (SE1 - SE0)), max(log2(2. * uC[1].w / uC[2].w * mix(768., 1536., big) / (SA1 - SA0)), 0.));
  vec3 hc = horC(rd); float dT = min(treeD(rd.xz, uC[7]), 3000.);
  vec3 Kb = trees(vec3(0.), Pb, hc, dT, w, k), Ks = trees(vec3(0.), Ps, hc, dT, w, k);
  float Mb = (1. - Pb.b) * (1. - Pb.g) * (1. - Pb.r), Ms = (1. - Ps.b) * (1. - Ps.g) * (1. - Ps.r);
  vec3 c0 = mix(hc, max(sk - Kb, 0.) / max(Mb, .03), smoothstep(.03, .25, Mb));
  return c0 * Ms + Ks;
}
vec3 enc(vec3 c) { return c / (1. + c); }
vec3 dec(vec3 g) { return g / max(1. - g, .003); }
void main() {
  float SZ = uC[2].w, RS = uC[13].x;
  vec2 fc = gl_FragCoord.xy, uv = fc / SZ * 2. - 1.;
  vec3 ro = uC[0].xyz, rd = normalize(uC[3].xyz + uC[1].w * (uv.x * uC[1].xyz + uv.y * uC[2].xyz));
  vec3 sk = sunD(rd, treeFix(skyT(rd, 0.), rd));
  // the half picture brought up by hand: a sky texel takes this pixel's own sky (plus the spray it carries); across a
  // step in distance (a crest over the water behind it) the texels split into the near and the far side, each side
  // averaged on its own and the edge between them drawn one pixel wide, so a crest stays an edge and nothing bleeds
  vec2 x = fc * uC[13].z - .5, f = fract(x);
  ivec2 i0 = ivec2(floor(x)), mx = ivec2(int(RS) - 1);
  vec3 C[4]; float Z[4], W[4], A[4], FX[4], FY[4];
  float zmn = 9., zmx = -9.;
  for (int k = 0; k < 4; k++) {
    ivec2 d = ivec2(k & 1, k >> 1), ik = clamp(i0 + d, ivec2(0), mx);
    vec4 g = texelFetch(uG, ik, 0), m = texelFetch(uT, ik, 0);
#ifdef U8
    m.r = floor(m.r * 255. + .5) / 256.;
#endif
    W[k] = (d.x == 1 ? f.x : 1. - f.x) * (d.y == 1 ? f.y : 1. - f.y);
    bool sky = g.a > .99;
    C[k] = sky ? enc(sk + dec(g.rgb)) : g.rgb;
    Z[k] = sky ? 1.05 : m.r + m.g / 256.;
    A[k] = sky ? 0. : g.a;
    // (the foam's amount and kind from the state, so its edges can be cut here at the pixel)
    uvec4 q = texelFetch(uS, ik, 0);
    FX[k] = sky ? 0. : min(unpackHalf2x16(q.z).x, 2.); FY[k] = sky ? 0. : (float((q.z >> 16) & 255u) - 128.) / 127.;
    zmn = min(zmn, Z[k]); zmx = max(zmx, Z[k]);
  }
  // (against the spread a level sea has here: at a grazing angle the far water's own distance climbs fast from row to
  // row, and the split drew its slopes in texel steps)
  float lv = 2. * uC[1].w / RS / max(-rd.y, .004) * .09;
  float zc = (zmn + zmx) * .5, edge = smoothstep(.015 + 3. * lv, .04 + 4. * lv, zmx - zmn);
  vec3 cN = vec3(0.), cF = vec3(0.), cB = vec3(0.); float wN = 0., wF = 0., zN = 0., aN = 0., zB = 0., aB = 0., wG = 0.;
  vec2 fB = vec2(0.), fN = vec2(0.);
  for (int k = 0; k < 4; k++) {
    float nk = Z[k] < zc ? 1. : 0.;
    cB += W[k] * C[k];
    cN += W[k] * nk * C[k]; wN += W[k] * nk; zN += W[k] * nk * Z[k]; aN += W[k] * nk * A[k];
    cF += W[k] * (1. - nk) * C[k]; wF += W[k] * (1. - nk);
    float gk = Z[k] < 1. ? W[k] : 0.; wG += gk; zB += gk * Z[k]; aB += gk * A[k];
    fB += gk * vec2(FX[k], FY[k]); fN += W[k] * nk * vec2(FX[k], FY[k]);
  }
  float cv = wN;
  vec3 col = mix(cB, mix(cF / max(wF, 1e-4), cN / max(wN, 1e-4), cv), edge);
  float zP = mix(zB / max(wG, 1e-4), zN / max(wN, 1e-4), edge), aP = mix(aB / max(wG, 1e-4), aN / max(wN, 1e-4), edge);
  bool grd = mix(wG, cv, edge) > .5;
  vec2 fP = mix(fB / max(wG, 1e-4), fN / max(wN, 1e-4), edge);
  // the horizon and a crest seen against the sky or the farther sea step a texel every few texels: there (and only there) averaged along
  // the edge with a tent of 15 texels, so the stair becomes one clean sloping line
  float L0 = dot(C[0], vec3(.3, .5, .2)), L1 = dot(C[1], vec3(.3, .5, .2)), L2 = dot(C[2], vec3(.3, .5, .2)), L3 = dot(C[3], vec3(.3, .5, .2));
  float gx = L1 + L3 - L0 - L2, gy = L2 + L3 - L0 - L1;
  if (min(Z[2], Z[3]) > max(Z[0], Z[1]) + .012 && abs(gy) > 4. * abs(gx)) {
    vec3 acc = vec3(0.); float ws = 0.;
    // (against the farther sea a short tent only: a crest's own lumps stay)
    float tw = Z[2] > 1. && Z[3] > 1. ? 8. : 3.;
    for (int k = -7; k <= 7 + int(uC[13].y); k++) {
      float wk = max(tw - abs(float(k)), 0.);
      vec4 ga = texelFetch(uG, clamp(i0 + ivec2(k, 0), ivec2(0), mx), 0), gb = texelFetch(uG, clamp(i0 + ivec2(k, 1), ivec2(0), mx), 0);
      acc += wk * mix(ga.a > .99 ? enc(sk + dec(ga.rgb)) : ga.rgb, gb.a > .99 ? enc(sk + dec(gb.rgb)) : gb.rgb, f.y); ws += wk;
    }
    col = acc / ws;
  }
  col = dec(col);
  // the fine layer, at the screen's own size. The glint: two reads of the noise tile whose grain is a few pixels
  // wherever the water is (and never under 3 cm: near the feet these are the real capillary ripples), each drifting
  // its own way with the wind; a facet catches the sun where both of them cross their middle, so the sun's energy
  // from the half picture comes back as separate hard-sided sparkles that wink as the water moves under them. Near the
  // feet the same ripples ruffle the sky's reflection
  float tS = zP < 1. ? exp2(zP * 16.) - 1. : 1e9;
  if (grd && aP > .02) {
    float w = clamp(aP * 4., 0., 1.), Kn = clamp((aP - .25) / .73, 0., .99), K = Kn / (1. - Kn);
    float pa = 1.1 * uC[1].w / SZ, sb = clamp(-rd.y, .012, 1.);
    vec2 hz = normalize(rd.xz + vec2(1e-6, 0.)), e1 = vec2(hz.y, -hz.x);
    vec3 P = ro + rd * min(tS, 3000.);
    // the glints: cells of the Voronoi tile laid on the water (in metres, so they stay with it), drawn out along the level
    // three times and sized to about three pixels tall at this distance (two sizes blended where the size
    // steps); a facet at a cell's point catches the sun for a moment at its own rate and its own strength (a range of
    // ten: a few burn white, most are dim). Far off they crowd into the solid path
    vec2 fh = normalize(uC[3].xz + vec2(1e-6, 0.)), Q = vec2(dot(P.xz, vec2(fh.y, -fh.x)) * .3, dot(P.xz, fh));
    float fx = tS * pa * 3., L = log2(max(fx, .03) / .03), Lf = fract(L), c0 = .03 * exp2(L - Lf);
    vec2 wd = TM * vec2(.02, -.21);
    vec4 v1 = textureLod(uL, (Q + wd) / (c0 * 24.), 0.), v2 = textureLod(uL, (Q + wd) / (c0 * 48.) + .37, 0.);
    float g1 = smoothstep(.24, .15, v1.g) * smoothstep(.45, .95, sin(TM * (1.3 + 2.4 * v1.a) + v1.a * 71.)) * exp2(3.3 * fract(v1.a * 7.3) - 2.);
    float g2 = smoothstep(.12, .075, v2.g) * smoothstep(.45, .95, sin(TM * (1.7 + 2.1 * v2.a) + v2.a * 53.)) * exp2(3.3 * fract(v2.a * 7.3) - 2.);
    float spk = mix(.05, .45, smoothstep(25., 160., tS)) + mix(g1, g2 * 3., Lf) * 30.;
    // the ripples a few centimetres apart that every thin sheet of water carries (as Sakura Beach paints them): two
    // drifting reads summed, a light dash of the mirrored sky where the sum crosses one level and a darker one below
    // another, cut at this pixel; on a wave's face, drawn out along the crest (the ribs it has swept up). They melt
    // into the water's tone with distance (the reads' own smaller levels) and are gone by 25 m
    // (wrinkles some 3 cm long across the view and a few mm deep along it, a little turned)
    float fl = smoothstep(.15, .5, abs(dFdy(tS)) * sb / (tS * pa * 2.2 + 1e-5));
    vec2 rq = mix(vec2(P.x * .5 + P.z * .1, P.y * 2.), vec2(dot(P.xz, vec2(fh.y, -fh.x)), dot(P.xz, fh)), fl);
    mat2 rw = mat2(.96, -.28, .28, .96) * mat2(2.1, 0., 0., 8.);
    vec4 n1 = texture(uN, rw * rq + TM * vec2(.02, -.11)), n2 = texture(uN, rw * rq * .47 + vec2(.5, .21) - TM * vec2(.031, .05));
    float fo = smoothstep(.04, .3, fP.x);
    float rp = n1.g * .55 + n2.b * .5, nr = w * smoothstep(26., 5., tS) * smoothstep(.04, .13, uC[6].z) * (1. - fo);   // (glass stays glass)
    vec3 mir = skyT(vec3(rd.x, -rd.y, rd.z), 1.);
    col = mix(col, mix(mir * .9, col * 1.8 + SUNC * .03, 1. - fl), smoothstep(.585, .615, rp) * mix(.5, .6, 1. - fl) * nr) * (1. - .24 * smoothstep(.44, .41, rp) * nr);
    // the swell far out: each crest a thin dark line (its steep front) with a paler back, closing up toward the horizon
    // until a pixel holds several and they melt into the sea's tone
    float sP = P.z - uC[7].y - P.x * P.x * uC[7].x, swL = 0., swB = 0.;
    for (int j = 0; j < 3; j++) {
      vec4 V = j == 0 ? vec4(.1083, .6545, .12, 1.) : j == 1 ? vec4(.1337, .7854, -.08, .8) : vec4(.2618, 1.2083, .26, .3);
      float u = (dot(V.x * vec2(-sin(V.z), cos(V.z)), vec2(P.x, sP)) + V.y * TM + uC[14].w * (j == 0 ? 6.2832 : j == 1 ? 10.166 : 15.17)) / 6.2832;
      float fu = fwidth(u) + 1e-4, fr = fract(u), on = V.w * smoothstep(.3, .08, fu);
      swL = max(swL, (1. - smoothstep(fu * .8, fu * 2.2, 1. - fr)) * on); swB += smoothstep(.0, .25, fr) * smoothstep(.6, .25, fr) * on;
    }
    float swO = smoothstep(30., 90., tS) * (1. - fo) * clamp(uC[14].z * 5., 0., 1.) * w;
    col *= (1. - .3 * swL * swO * (1. - uC[16].z)) * (1. + .05 * swB * swO);
    // the foam, cut at the pixel from its smooth amount: a crisp ragged edge with a lit line where it rises steeply (the
    // bore's front), pits and sunlit rims inside the mass, and old foam's lace as threads (the contour lines of one
    // field, each about a pixel wide at any distance); all of it melts into the half picture's tone with distance
    if (fP.x > .01) {
      vec4 fg = texture(uN, P.xz * vec2(.5, .62) + vec2(.13, .71) + TM * vec2(0., .006));
      float cvd = fP.x + (fg.g - .5) * .5 + (fg.a - .5) * .25, ec = fwidth(cvd) * .75 + .004;
      float crisp = smoothstep(.36 - ec, .36 + ec, cvd), soft = smoothstep(.06, .66, fP.x);
      float fr = (1. - abs(crisp * 2. - 1.)) * clamp(fwidth(fP.x) * 6., 0., 1.);
      // (pits: holes between the heaps with a hard edge; rims: the sunlit lip just round each)
      float pv = fg.a * .5 + fg.r * .3 + fg.g * .2 + (fP.x - .8) * .12, ep = fwidth(pv) * .8 + .004, ms = smoothstep(.3, .8, fP.x);
      float pit = smoothstep(.37 + ep, .37 - ep, pv) * ms, rim = (1. - smoothstep(ep, ep * 2.5 + .01, abs(pv - .4))) * ms;
      float ln = fg.b * .6 + fg.r * .4, lt = 1. - smoothstep(0., fwidth(ln) * 1.2 + .002, abs(ln - .5) - .006);
      float old = smoothstep(.2, -.4, fP.y) * (1. - smoothstep(.25, .9, fP.x));
      vec3 fl0 = col;
      col *= (1. + .45 * (crisp - soft)) * (1. - .38 * pit) * (1. + .3 * rim);
      col = mix(col, mir * 1.2 + SUNC * .15, lt * old * smoothstep(.15, .4, fP.x) * .5);
      col += (SUNC * .25 + col * .4) * fr;
    }
    col += SUNC * K * spk * w;
  }
#ifdef OBJ
  vec4 OB = vec4(1e9, 0., 0., 0.); vec3 on = vec3(0., 1., 0.);
  objs(ro, rd, 2.2 * uC[1].w / SZ, 1e9, true, OB, on);
  if (OB.y > 0. && OB.x < tS) col = mix(col, shadeObj(ro + rd * OB.x, on, rd, OB), OB.y);
#endif
  col *= uC[6].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  vec2 q = fc / SZ - .5;
  col *= 1. - .1 * dot(q, q);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col += (TX(uN, fc / 256.).a - .5) * .008;
  o = vec4(col, 1.);
}`,$t=`
void main() {
  vec2 q = gl_FragCoord.xy / uC[15].xy;
  float az = uC[14].x + (q.x - .5) / uC[14].y, el = -.08 + 1.65 * q.y * q.y;
  vec3 c = skyC(vec3(sin(az) * cos(el), sin(el), cos(az) * cos(el)));
  o = vec4(c / (1. + c), 1.);
}`,ea=F+`uniform sampler2D uN, uD; uniform vec4 uC[17];
out vec4 vC, vS; out vec2 vP;
#define TM uC[0].w
#define BK uC[8].y
float hs(float n) { return fract(sin(n) * 43758.5453); }
`+vt+`
void main() {
  int na = uC[10].y < 0. ? 1 : uC[10].z < 0. ? 2 : uC[10].w < 0. ? 3 : 4;
  int id = gl_VertexID, j = id % na;
  int i = int(j == 0 ? uC[10].x : j == 1 ? uC[10].y : j == 2 ? uC[10].z : uC[10].w);
  gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 1.; vC = vec4(0.); vS = vec4(1., 0., 0., 0.); vP = vec2(1.);
  if (i < 0) return;
  float fid = float(id), h1 = hs(fid * 1.37 + .5), h2 = hs(fid * 2.71 + 1.3);
  float Tp = .55 + .8 * h1, ph = TM / Tp + h2, cyc = floor(ph), a = fract(ph) * Tp;
  float r1 = hs(fid * 3.1 + cyc * 7.7), r2 = hs(fid * 5.3 + cyc * 3.9), r3 = hs(fid * 7.9 + cyc * 1.7), r4 = hs(fid * 9.7 + cyc * 5.1), r5 = hs(fid * 4.3 + cyc * 9.3);
  vec3 ro = uC[0].xyz, f = uC[3].xyz, rt = uC[1].xyz, up = uC[2].xyz;
  float tanH = uC[1].w;
  // a place along the crest inside the view, where the crest was when this drop left it
  float x = ro.x + f.x / max(abs(f.z), .3) * 18. + (r1 - .5) * 2.3 * tanH * 18. / max(abs(f.z), .3);
  vec4 A = texelFetch(uD, ivec2(2 * i, 0), 0), B = texelFetch(uD, ivec2(2 * i + 1, 0), 0), C = texelFetch(uD, ivec2(20 + i, 0), 0);
  float wid = B.z * .1591549;
  vec4 sx = textureLod(uN, vec2(x * .012 + wid * 7.31, .61 + wid * 3.17), 0.);
  float tau = TM - a - A.x - A.w * (sin(x * B.x + B.y) + .35 * sin(x * B.x * 3.7 + B.z)) - 1.1 * (sx.g - .5) - .45 * (sx.b - .5);
  float sp = A.z - .66 * BK * tau, spc = max(sp, 1.5874), dc = .1 * (spc - 1.5874);
  float hm = (1. + .22 * cos(x * .021 + B.z) + .15 * sin(x * .093 + B.y * 2.)) * (crestE(x, B, C) + .14 * (sx.r - .5));
  float db = C.y * (1. + .8 * (hm - 1.)), br = smoothstep(db, db * .62, dc);
  float H = min(C.x * hm * inversesqrt(sqrt(max(dc, .03))), mix(.8, .6, br) * dc);
  float str = br * (1. - br) * 4. * step(1.5874, sp) * clamp(tau * .45, 0., 1.) * smoothstep(.15, .45, H);
  if (str < .02) return;
  float sc = (spc * sqrt(spc) - 2.) / BK, z0 = sc + uC[8].z + uC[7].y + x * x * uC[7].x;
  // thrown forward off the lip, or feathered back off the crest by the land breeze
  float back = step(.72, r4), vy = (1. + 3.2 * r2 * r2) * (.6 + .6 * str) * (1. - .4 * back), vz = mix(-(.6 + 2.4 * r3), .8 + 1.6 * r3, back);
  vec3 p = vec3(x + (r5 - .5) * .7 * a, H * (.55 + .4 * r2) + vy * a - 4.9 * a * a, z0 - .2 + vz * a);
  if (p.y < -.05) return;
  vec3 d = p - ro;
  float zc = dot(d, f);
  if (zc < .6) return;
  vec2 nd = vec2(dot(d, rt), dot(d, up)) / (zc * tanH);
  vec3 v = vec3((r5 - .5) * .7, vy - 9.8 * a, vz);
  vec2 sv = (vec2(dot(v, rt), dot(v, up)) - nd * tanH * dot(v, f)) / (zc * tanH) * uC[2].w * .5;
  float pxm = uC[2].w * .5 / (zc * tanH), rad = max((.003 + .016 * r5 * r5) * pxm, .5), L = length(sv) / 75.;
  float ps = clamp(2. * rad + L + 2., 2., 24.);
  gl_Position = vec4(nd, 0., 1.); gl_PointSize = ps;
  vS = vec4(sv / max(length(sv), 1e-4), min(L * .5, ps * .5 - rad - 1.) / ps, rad / ps);
  vP = vec2(ps, length(d));
  float cs = max(dot(d / length(d), uC[4].xyz), 0.), k = uC[4].w;
  vec3 c = uC[5].xyz * (.35 + 3.2 * pow(cs, 6.)) + mix(vec3(.22, .2, .28), vec3(.1, .09, .14), k);
  vC = vec4(c * .8, sqrt(str) * .75 * smoothstep(35., 16., zc) * smoothstep(0., .06, a) * smoothstep(-.05, .2, p.y) * (.55 + .45 * r3));
}`,ta=F+`uniform sampler2D uT; uniform vec4 uC[17];
in vec4 vC, vS; in vec2 vP; out vec4 o;
void main() {
  vec2 pc = gl_PointCoord - .5; pc.y = -pc.y;
  float t = clamp(dot(pc, vS.xy), -vS.z, vS.z), d = length(pc - vS.xy * t);
  float al = smoothstep(vS.w + .6 / vP.x, vS.w - .6 / vP.x, d) * vC.a;
  vec4 m = texelFetch(uT, ivec2(gl_FragCoord.xy * uC[13].z), 0);
#ifdef U8
  m.r = floor(m.r * 255. + .5) / 256.;
#endif
  float tS = m.r > .99 ? 1e9 : exp2((m.r + m.g / 256.) * 16.) - 1.;
  if (al < .01 || vP.y > tS + .25) discard;
  vec3 c = vC.rgb * uC[6].w;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  c = pow(clamp(c, 0., 1.), vec3(1. / 2.2));
  o = vec4(c * al, al);
}`,aa=600,de={sky:Z(0)+fe+Yt+$t,march:Z(0)+wt+Zt+Qt,surfG:Z(0,1)+wt+Jt,surf:Z(0)+fe+kt+bt+zt,comp:Z(0)+fe+Ct,surfO:Z(1)+fe+kt+gt+bt+zt,compO:Z(1)+fe+gt+Ct},r=e.__c559||(e.__c559=(()=>{const t=e.getSupportedExtensions()||[],a=!t.includes("EXT_color_buffer_float")&&!t.includes("EXT_color_buffer_half_float"),o=(h,f)=>{const p=e.createShader(f);return e.shaderSource(p,h),e.compileShader(p),p},s=o(Wt,e.VERTEX_SHADER),n={},c=(h,f)=>{a&&h!=="sky"&&h[0]!=="b"&&(f=f.replace(F,F+`#define U8
`));const p=e.createProgram(),u=o(f,e.FRAGMENT_SHADER);e.attachShader(p,s),e.attachShader(p,u),e.linkProgram(p),n[h]={p,f:u}};for(const h of["march","surfG","surf","comp","sky"])c(h,de[h]);for(let h=0;h<3;h++)c("bake"+h,Vt.replace(F,F+"#define BM "+h+`
`));return e.flush(),{P:n,vs:s,link:c,hf:!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float"),pc:e.getExtension("KHR_parallel_shader_compile"),fresh:!0,slots:{big:[],small:[]},rts:{},n:0,MT:e.getParameter(e.MAX_TEXTURE_SIZE)|0}})()),M=(t,a,o,s,n,c,h,f)=>{const p=e.createTexture();return e.bindTexture(e.TEXTURE_2D,p),e.texImage2D(e.TEXTURE_2D,0,o,t,a,0,s,n,f||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,h),p},K=t=>{const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),a},w=(t,a)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,a)},Be=()=>{e.bindVertexArray(r.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0)},Je=new Float32Array([1/(2*350),Ee,jt,ft]);if(r.fresh){r.fresh=!1;const t=s=>{const n=r.P[s];if(!e.getProgramParameter(n.p,e.LINK_STATUS))throw new Error("559 "+s+": "+e.getShaderInfoLog(n.f)+e.getProgramInfoLog(n.p));const c={p:n.p},h=e.getProgramParameter(n.p,e.ACTIVE_UNIFORMS);for(let f=0;f<h;f++){const p=e.getActiveUniform(n.p,f).name.replace("[0]","");c[p]=e.getUniformLocation(n.p,p)}e.useProgram(n.p),[["uN",0],["uL",1],["uP",2],["uD",3],["uT",4],["uG",5],["uK",6],["uS",7],["uQ",8]].forEach(([f,p])=>{c[f]&&e.uniform1i(c[f],p)}),r.P[s]=c};r.vao=e.createVertexArray(),t("bake0"),r.tN=M(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT),r.fN=K(r.tN),r.tL=M(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT),r.fL=K(r.tL),r.tD=M(64,10,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),Be();let a=r.P.bake0;e.useProgram(a.p),e.bindFramebuffer(e.FRAMEBUFFER,r.fN),e.viewport(0,0,256,256),e.uniform4f(a.uB,0,256,256,0),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,r.tN),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR);const o=e.getExtension("EXT_texture_filter_anisotropic");o&&e.texParameterf(e.TEXTURE_2D,o.TEXTURE_MAX_ANISOTROPY_EXT,16),t("bake1"),a=r.P.bake1,e.useProgram(a.p),e.bindFramebuffer(e.FRAMEBUFFER,r.fL),e.viewport(0,0,512,512),e.uniform4f(a.uB,1,512,512,0),e.drawArrays(e.TRIANGLES,0,3),t("bake2"),r.fin=t,r.finMain=()=>{t("march"),t("surfG"),t("surf"),t("comp"),t("sky")}}const pe=C>450,$e=pe?"big":"small";if(!r.slots[$e].length){const t=pe?3072>r.MT?r.MT:3072:1024,a=pe?384:128,o=M(t,a,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT);const s=K(o);Be();const n=r.P.bake2;e.useProgram(n.p),e.uniform4fv(n.uB2,Je),e.uniform4f(n.uB3,18,3,3,2),e.viewport(0,0,t,a),e.uniform4f(n.uB,2,t,a,0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),w(2,o),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),w(2,null),r.slots[$e].push({t:o,f:s,q:null})}const ue=r.slots[$e][0];if(!ue.q&&(ce==="Along the shore"||v.view)){const t=pe?1536:768,a=pe?240:120,o=M(t,a,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),s=K(o);Be();const n=r.P.bake2;e.useProgram(n.p),e.uniform4fv(n.uB2,Je),e.uniform4f(n.uB3,18,3,3,2),e.viewport(0,0,t,a),e.uniform4f(n.uB,2,t,a,1),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),w(2,o),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),w(2,null),ue.q=o,ue.fq=s}const Tt=ue.t;r.finMain&&(r.finMain(),r.finMain=null);let R=r.rts[C];const B=C<=440?C:Math.round(C*(C<=600?.7:.56));if(!R){const t=()=>r.hf?M(B,B,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.NEAREST,e.CLAMP_TO_EDGE):M(B,B,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,e.CLAMP_TO_EDGE),a=t(),o=t(),s=M(B,B,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,e.CLAMP_TO_EDGE);R=r.rts[C]={t:a,f:K(a),tm:o,fm:K(o),tg:s,fg:K(s)}}const Pe=Math.max(64,Math.round(C*1.32)),q=Math.max(32,Math.round(C*.45)),St=r.hf?M(Pe,q,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):M(Pe,q,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.generateMipmap(e.TEXTURE_2D);const oa=K(St);let Et="",me=0;e.bindFramebuffer(e.FRAMEBUFFER,null);const l=new Float32Array(64*10*4);let S=0,oe=0,se=0;const ma=[],Re=(t,a,o,s,n)=>{if(S>=256)return;const c=512+S*8;l[c]=t[0],l[c+1]=t[1],l[c+2]=t[2],l[c+3]=n+Math.min(o,.999),l[c+4]=a[0],l[c+5]=a[1],l[c+6]=a[2],l[c+7]=s,S++},sa=(t,a,o)=>{if(S>=256)return;const s=512+S*8;l[s]=t[0],l[s+1]=t[1],l[s+2]=t[2],l[s+3]=.5,l[s+4]=a,l[s+5]=o,l[s+6]=0,l[s+7]=0,S++},ra=(t,a)=>{let o=[1e9,1e9,1e9],s=[-1e9,-1e9,-1e9];for(let n=se;n<S;n++){const c=512+n*8,h=l[c+3]<1,f=l[c+3]<.4?l[c+7]:h?l[c+4]*1.25:Math.max(l[c+3]%1,l[c+7]);for(const p of h?[0]:[0,4])for(let u=0;u<3;u++)o[u]=Math.min(o[u],l[c+p+u]-f),s[u]=Math.max(s[u],l[c+p+u]+f)}if(oe<32&&S>se){const n=256+oe*8;l[n]=(o[0]+s[0])/2,l[n+1]=(o[1]+s[1])/2,l[n+2]=(o[2]+s[2])/2,l[n+3]=Math.hypot(s[0]-o[0],s[1]-o[1],s[2]-o[2])/2+(a||0)+.05,l[n+4]=se,l[n+5]=S-se,l[n+6]=t,l[n+7]=0,oe++}se=S},et=(t,a)=>[t[0]+a[0],t[1]+a[1],t[2]+a[2]],na=()=>{for(const t of dt){const a=s=>{const n=t.lean*t.H*(1-Math.pow(1-s,1.7));return[t.x+t.ldx*n,t.y+s*t.H,t.z+t.ldz*n]},o=[a(0),a(.33),a(.67),a(1)];Re(o[0],o[1],.25,.2,11),Re(o[1],o[2],.2,.17,11),Re(o[2],o[3],.17,.15,11),Re(et(o[3],[t.ldx*.25,-.35,t.ldz*.25]),et(o[3],[-t.ldx*.1,-.45,.1]),.2,.18,13),sa(et(o[3],[0,.05,0]),t.L,t.sd),ra(3)}for(const t of We)d(),d()},la={yaw:0,pitch:0,x:0,y:0,z:0},ca=E[0],ia=E[1],i={ro:[0,It,0],f:[0,0,1],r:[1,0,0],u:[0,1,0]},Ft=()=>{const t=v.view||la,a=ca+(t.yaw||0),o=O(ia+(t.pitch||0),-1.35,1.35),s=O(t.x||0,-1.5,1.5),n=O(t.y||0,-.4,.3),c=O(t.z||0,-1.5,1.5);i.ro=[s,Ie(s,c+E[3])+E[2]+n,c+E[3]],i.f=[Math.sin(a)*Math.cos(o),Math.sin(o),Math.cos(a)*Math.cos(o)],i.r=[Math.cos(a),0,-Math.sin(a)],i.u=[i.f[1]*i.r[2]-i.f[2]*i.r[1],i.f[2]*i.r[0]-i.f[0]*i.r[2],i.f[0]*i.r[1]-i.f[1]*i.r[0]]};let re=0,ne=ee,xe=ee,qe=0,ve=0,At=0,Nt=0,Mt=!1,Q=!1,tt=0;d();const x=new Float32Array(68),ha=t=>{const a=v.input;if(a.down){if(Mt||(qe=0,ve=0,At=a.x,Nt=a.y,Q=!1),qe+=t,ve=Math.max(ve,Math.hypot(a.x-At,a.y-Nt)),ve>.06&&!Q&&qe>.08){Q="drag";for(let o=0;o<3;o++)Qe(re-1+o*6.5,Se*(1.55+.25*d()),62+10*d(),1.4);v.sound.hit("noise",.12,{dur:1.6,cutoff:500})}!Q&&qe>.4&&ve<.04&&(Q="hold"),Q==="hold"&&(xe=Math.min(1,xe+t/8))}else Q=!1;Mt=a.down,a.down||(xe=Math.max(ee,xe-t/30))},fa=t=>{re+=t,ne+=(xe-ne)*Math.min(1,t*1.5),re>ae&&(Qe(ae,Se*(.75+.5*d())*(d()<.15?1.3:1)*(.72+.56*pt(ae)),140),ae+=8.5+4*d());for(let a=k.length-1;a>=0;a--){const o=k[a],s=re-o.t0;if(s>o.tsh+17){k.splice(a,1);continue}const n=o.S0p-.66*N*s,c=.1*(n-1.5874),h=.1*(o.S0p-1.5874),f=Math.pow(o.H0*Math.pow(h,.25)/.78,.8);!o.snd&&c<f&&(o.snd=1,v.sound.hit("noise",.05+.07*o.H0,{dur:2.2,cutoff:420})),o.snd===1&&s>o.tsh&&(o.snd=2,v.sound.hit("noise",.04,{dur:3,cutoff:1500}))}tt-=t,tt<0&&(tt=1.3+d(),v.sound.hit("noise",.025,{dur:1.8,cutoff:700}))};na();const Bt=S,at=oe,da=l.slice(256,256+at*8),pa=()=>{Ft();const t=Math.cos(Math.atan(Ne*1.42)+.04);for(let a=0;a<at;a++){const o=256+a*8,s=l[o+3];for(const n of[l[o+1],-l[o+1]-.2]){const c=[l[o]-i.ro[0],n-i.ro[1],l[o+2]-i.ro[2]],h=Math.hypot(c[0],c[1],c[2]);if(h<=s||(c[0]*i.f[0]+c[1]*i.f[1]+c[2]*i.f[2])/h>Math.cos(Math.acos(t)+Math.asin(Math.min(s/h,1))))return!0}}return!1};!r.P.surfO&&(v.view||pa())&&(r.link("surfO",de.surfO),r.link("compO",de.compO),e.flush(),r.fin("surfO"),r.fin("compO"));const Pt=()=>{Ft(),S=Bt,oe=at,se=Bt,l.set(da,256);const t=Math.min(k.length,8);for(let g=0;g<t;g++){const m=k[k.length-t+g],b=g*8,W=.1*(m.S0p-1.5874);l[b]=m.t0,l[b+1]=m.H0,l[b+2]=m.S0p,l[b+3]=m.dA,l[b+4]=m.dK,l[b+5]=m.dP,l[b+6]=m.hP,l[b+7]=m.u0;const z=80+g*4;l[z]=m.H0*Math.pow(W,.25),l[z+1]=Math.pow(m.H0*Math.pow(W,.25)/.78,.8),l[z+2]=m.x1,l[z+3]=m.x2}const a=[-1,-1,-1,-1];for(let g=0,m=0;g<t&&m<4;g++){const b=k[k.length-t+g],W=b.S0p-.66*N*(re-b.t0),z=.1*(W-1.5874),_=l[80+g*4+1]*1.12;W>1.5874&&z<_*1.45&&z>_*.3&&(a[m++]=g)}const o=Y-ne*.075+ee*.075,s=O((o-.05)/.1,0,1),n=[Math.sin(Ke)*Math.cos(o),Math.sin(o),Math.cos(Ke)*Math.cos(o)],c=O((o+.035)/.08,0,1),h=Math.max(H.red*.6,1-c),f=[1,.48+.22*s-.2*h,.17+.2*s-.09*h].map(g=>g*(.18+.82*c)*1.15);x.set([i.ro[0],i.ro[1],i.ro[2],re],0),x.set([i.r[0],i.r[1],i.r[2],Ne],4),x.set([i.u[0],i.u[1],i.u[2],C],8);const p=Math.cos(Math.atan(Ne*1.42)+.04);let u=0;for(let g=0;g<oe;g++){const m=256+g*8,b=l[m+3];let W=!1;for(const z of[l[m+1],-l[m+1]-.2]){const _=[l[m]-i.ro[0],z-i.ro[1],l[m+2]-i.ro[2]],st=Math.hypot(_[0],_[1],_[2]);(st<=b||(_[0]*i.f[0]+_[1]*i.f[1]+_[2]*i.f[2])/st>Math.cos(Math.acos(p)+Math.asin(Math.min(b/st,1))))&&(W=!0)}if(W){if(u!==g)for(let z=0;z<8;z++)l[256+u*8+z]=l[m+z];u++}}x.set([i.f[0],i.f[1],i.f[2],u],12),x.set([n[0],n[1],n[2],O(ne,0,1)],16),x.set([f[0],f[1],f[2],t],20),x.set([P,$,Dt,.85-.12*ne],24),x.set(Je,28),x.set([J>.1?4.5:6.5,N,V,J],32),x.set([H.red*.9,he,nt==="Pink dusk"?1:0,4.9*Math.max(V>0?.05:J,.05)],36),x.set(H.tint,48),x.set(a,40),x.set([16,3,4,48],44);const le=Math.atan2(i.f[0],i.f[2]),Le=Math.abs(i.f[1])>.55?Math.PI:1.2;x.set([le,1/(2*Le),Ot,Ve],56),x.set([Pe,q,X,Kt],60),x.set([B,0,B/C,ut],52),x.set([He,ze,Gt,0],64),Be(),w(3,r.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,10,e.RGBA,e.FLOAT,l),w(0,r.tN),w(1,r.tL),w(2,Tt),w(8,ue.q||Tt),w(5,null),w(6,null);const L=le.toFixed(4)+Le+i.f[1].toFixed(4)+ne.toFixed(4),A=L!==Et?q:Math.ceil(q/6);A===q&&(Et=L,me=0),e.useProgram(r.P.sky.p),e.uniform4fv(r.P.sky.uC,x),e.bindFramebuffer(e.FRAMEBUFFER,oa),e.viewport(0,me,Pe,Math.min(A,q-me)),e.drawArrays(e.TRIANGLES,0,3),me=A===q?0:(me+A)%q,w(6,St),e.generateMipmap(e.TEXTURE_2D),u>0&&!r.P.surfO&&(r.link("surfO",de.surfO),r.link("compO",de.compO),e.flush(),r.fin("surfO"),r.fin("compO"));const we=u>0&&!!r.P.surfO,ge=we?r.P.surfO:r.P.surf,be=we?r.P.compO:r.P.comp;e.useProgram(r.P.march.p),e.uniform4fv(r.P.march.uC,x),e.bindFramebuffer(e.FRAMEBUFFER,R.fm),e.viewport(0,0,B,B),e.drawArrays(e.TRIANGLES,0,3),w(5,R.tm),e.useProgram(r.P.surfG.p),e.uniform4fv(r.P.surfG.uC,x),e.bindFramebuffer(e.FRAMEBUFFER,R.fg),e.drawArrays(e.TRIANGLES,0,3),w(7,R.tg),e.useProgram(ge.p),e.uniform4fv(ge.uC,x),e.bindFramebuffer(e.FRAMEBUFFER,R.f),e.drawArrays(e.TRIANGLES,0,3),w(5,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,C,C),w(5,R.t),w(4,R.tm),e.useProgram(be.p),e.uniform4fv(be.uC,x),e.drawArrays(e.TRIANGLES,0,3),w(5,null),w(7,null);const T=r.sp;T&&!T.ok&&(!r.pc||a[0]>=0||e.getProgramParameter(T.p,r.pc.COMPLETION_STATUS_KHR))&&(e.getProgramParameter(T.p,e.LINK_STATUS)?(T.ok=!0,e.useProgram(T.p),T.uC=e.getUniformLocation(T.p,"uC"),[["uN",0],["uD",3],["uT",4]].forEach(([g,m])=>{const b=e.getUniformLocation(T.p,g);b&&e.uniform1i(b,m)})):r.sp=null),T&&T.ok&&a[0]>=0&&(e.useProgram(T.p),e.uniform4fv(T.uC,x),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.drawArrays(e.POINTS,0,aa),e.disable(e.BLEND)),w(4,null)};Pt();let ot=0;return(t,a)=>{if(a=Math.min(a||0,.1),r.sp===void 0){const o=r.hf?"":`#define U8
`,s=(f,p)=>{const u=e.createShader(f);return e.shaderSource(u,p),e.compileShader(u),u},n=e.createProgram(),c=s(e.VERTEX_SHADER,ea),h=s(e.FRAGMENT_SHADER,ta.replace(F,F+o));e.attachShader(n,c),e.attachShader(n,h),e.linkProgram(n),e.flush(),r.sp={p:n,ok:!1}}for(ha(a),ot+=a;ot>1/60;)fa(1/60),ot-=1/60;Pt()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
