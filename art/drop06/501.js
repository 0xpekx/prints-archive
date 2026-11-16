// Salt Mirror: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/501.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(gt){gt&&gt.add({num:501,name:"Salt Mirror",fam:"Vistas",recipe:"A flooded salt flat around dusk where the sky is mirrored all around, clouds above and below, and far islands and peaks float on their reflections. The time, the clouds and the wind change every mint, and about one in twenty has flamingos feeding in the shallows. Tap the water to toss a lump of salt and watch its rings run out across the mirror.",interactive:"Tap the water to toss a lump of salt there: it lands with a splash and its rings run out across the mirror.",music:!0,gl:!0,fps:30,seed:0,make(D){const e=D.gl,re=D.size,oe=!!D.home;let fe=1344015845;for(let t=2;t<66;t+=8)fe=Math.imul(fe^parseInt(D.hash.slice(t,t+8),16),2246822507)^fe>>>13;const r=()=>{fe=fe+1831565813|0;let t=Math.imul(fe^fe>>>15,1|fe);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ee=t=>{let s=0;for(const n in t)s+=t[n];let c=r()*s;for(const n in t)if(c-=t[n],c<0)return n;return Object.keys(t)[0]},G=Math.PI*2,F=Math.PI/180,De=D.trait("Time",oe?"Dusk":Ee({Dusk:46,"Blue hour":30,Night:0,Dawn:7})),ae=D.trait("Clouds",oe?"Towering cumulus":Ee({"Towering cumulus":38,"Mackerel sky":30,Clear:22,"Storm on the horizon":10})),Yt=D.trait("Wind",oe?"Patchy ripples":Ee({"Glass calm":35,"Patchy ripples":65})),Te=D.trait("Water",oe?"Mirror":Ee({Mirror:68,"Thin film":24,"Dry crust and puddles":8})),yt=D.trait("Horizon",oe?"Islands":Ee({Islands:42,"Volcano range":40,Nothing:18})),bt=D.trait("Facing",oe?"Earth's shadow":Ee({"Earth's shadow":40,Afterglow:38,"Along the horizon":22}));let he=1511514275;for(let t=2;t<66;t+=8)he=Math.imul(he^parseInt(D.hash.slice(t,t+8),16),2654435761)^he>>>15;const $t=()=>{he=he+1831565813|0;let t=Math.imul(he^he>>>15,1|he);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Jt=t=>{let s=0;for(const n in t)s+=t[n];let c=$t()*s;for(const n in t)if(c-=t[n],c<0)return n;return Object.keys(t)[0]},Qt={Standing:[1.6,-4.5,34],"Crouched at the waterline":[.42,8,34],"Looking down into the mirror":[1.7,-17,34],"Wide, under the whole sky":[1,15,46]},eo=D.trait("Stance",oe?"Standing":Jt({Standing:36,"Crouched at the waterline":28,"Looking down into the mirror":24,"Wide, under the whole sky":12})),Xe=Qt[eo];let V=253374816;for(let t=2;t<66;t+=8)V=Math.imul(V^parseInt(D.hash.slice(t,t+8),16),3432918353)^V>>>14;V=Math.imul(V^V>>>16,2246822507),V=Math.imul(V^V>>>13,3266489909),V^=V>>>16;const f=()=>{V=V+1831565813|0;let t=Math.imul(V^V>>>15,1|V);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},tt=f()*100,to=tt<95?"None":tt<97.5?"A party of flamingos":tt<99.5?"A flock of flamingos":"Thousands of flamingos",qe=D.trait("Visitors",oe||Te==="Dry crust and puddles"?"None":to),Re=De==="Night",Ie=De==="Dawn",Ge={Dusk:ae==="Mackerel sky"?-.5-.7*r():-.8-1.3*r(),"Blue hour":-5.2-1.4*r(),Night:-21,Dawn:-1.8-1*r()}[De]*F,ue=r()*G,oo={"Earth's shadow":Math.PI+(r()<.5?-1:1)*(14+16*r())*F,Afterglow:(r()<.5?-1:1)*(18+14*r())*F,"Along the horizon":(r()<.5?-1:1)*(80+20*r())*F}[bt],X=ue+oo,ot=[Math.sin(ue)*Math.cos(Ge),Math.sin(Ge),Math.cos(ue)*Math.cos(Ge)],ao=Ie?.0022:Re?.003:.0036+.0015*r(),ge={Dusk:5.8,"Blue hour":62,Night:5,Dawn:6}[De]*(Re?1:{"Earth's shadow":1,Afterglow:.42,"Along the horizon":.7}[bt]),Et=t=>Math.atan2(Math.sin(t),Math.cos(t)),Ae=[],ve=(t,s,c,n,h)=>Ae.push({x:Math.sin(t)*s,z:Math.cos(t)*s,rad:c,top:n,anvil:h,dist:s});let at=.32+.3*r(),ke=.34+.22*r(),Tt=0,so=1.6+.4*r(),Ve=5.2+2.2*r(),Oe=.5+.12*r(),ye=0;if(ae==="Towering cumulus"){const t=r()<.5?-1:1;ve(X+t*(12+7*r())*F,30+10*r(),3.2+r(),9+1.5*r(),0),ve(X-t*(18+14*r())*F,42+16*r(),2.5+r(),6.5+2*r(),0);for(let s=0;s<4;s++)ve(X+(60+s*60+r()*40)*F,22+40*r(),2+1.4*r(),5.5+3.5*r(),0)}else ae==="Mackerel sky"?(ke=.66+.1*r(),Tt=1,at=.5,Ve=3.4,Oe=.3,ve(X+(r()<.5?-1:1)*(35+30*r())*F,50+10*r(),2.2+r(),5+r(),0)):ae==="Clear"?(at=.22,ke=0,Oe=.2,Ve=2.8):(ye=X+(r()<.5?-1:1)*(16+8*r())*F,ve(ye,58+8*r(),6,12.5,1),ve(ye+.13,48+6*r(),3,8.5,0),ve(ye-.15,64,3.4,9.5,0),ve(X+Math.PI+(r()-.5),40,2.6,7,0),Oe=.46,ke=.3);let O=986048433;for(let t=2;t<66;t+=8)O=Math.imul(O^parseInt(D.hash.slice(t,t+8),16),668265263)^O>>>11;O=Math.imul(O^O>>>16,2246822507),O=Math.imul(O^O>>>13,3266489909),O^=O>>>16;const Fe=()=>{O=O+1831565813|0;let t=Math.imul(O^O>>>15,1|O);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},$=[Fe(),Fe(),Fe(),Fe(),Fe()],Rt=$[1]<.5?-1:1;let At=[0,0,0,0];const st=(t,s,c)=>{At=[Math.sin(t)*s,Math.cos(t)*s,c,0]};ae==="Mackerel sky"?st(X+Rt*(12+28*$[2])*F,22+10*$[3],28+10*$[4]):ae==="Storm on the horizon"?$[0]<.4?ke=0:st(X-Math.sign(Et(ye-X))*(25+30*$[2])*F,24+16*$[3],14+10*$[4]):ae==="Towering cumulus"&&!oe&&($[0]<1/3?ke=0:st(X+Rt*(20+22*$[2])*F,22+12*$[3],16+10*$[4])),Ae.sort((t,s)=>t.dist-s.dist);const co=Math.max(Ve,...Ae.map(t=>t.top))*1.15+.2,Me=[];let Se=[0,70,1.6,r()*30];if(yt==="Islands"){Se=[1,75+15*r(),1.7+.5*r(),r()*30];const t=3+(r()*2|0);for(let s=0;s<t;s++){const c=X+(s===0?(r()<.5?-1:1)*(6+8*r()):s===1?180+(r()-.5)*90:(r()-.5)*200)*F,n=s===0?7+2*r():9+18*r();Me.push([c,(1.4+3*r())/n,.09+.12*r()+(s<2?.06:0),n,0,r()*20])}}else if(yt==="Volcano range"){Se=[1,70+20*r(),1.4+.6*r(),r()*30];const t=2+(r()*2|0);for(let s=0;s<t;s++){const c=X+(s===0?(r()<.5?-1:1)*(10+12*r()):s===1?180+(r()-.5)*90:(r()-.5)*220)*F,n=30+30*r(),h=1.8+.9*r();Me.push([c,h*3.4/n,h,n,1,r()*20])}}const He=r()*G,ct=(25+40*r())*F,rt=[Math.sin(He)*Math.sin(ct),Math.cos(ct),Math.cos(He)*Math.sin(ct)],nt=[Math.cos(He),0,-Math.sin(He)],de=r()*G,ro=Yt==="Glass calm"?.12:.75+.25*r(),kt={Mirror:.031,"Thin film":.0185,"Dry crust and puddles":0}[Te],no=Te==="Thin film"?[2.4,1.1]:[5.95,5],Q=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
uniform int uZ0;
`,Mt=Q+"out vec2 vUv; void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }",ze=`
const float PI = 3.14159265, TAU = 6.2831853, E0 = 0.00873;
uniform sampler3D uN;
float atn(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = PI - a; return y < 0. ? -a : a; }
vec3 dirOf(vec2 uv){ float az = uv.x * TAU; float el = pow(uv.y, 1.25) * (1.5707963 + E0) - E0; return vec3(sin(az) * cos(el), sin(el), cos(az) * cos(el)); }
vec2 uvOf(vec3 d){ float az = atn(d.x, d.z); float el = asin(clamp(d.y, -1., 1.)); return vec2(fract(az / TAU), pow(clamp((el + E0) / (1.5707963 + E0), 0., 1.), 0.8)); }
float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 64., 0.).r; }
`,zt=`
const float RE = 6360., HR = 8., HM = 1.2, RT = 6420.;
const vec3 BR = vec3(5.8e-3, 13.5e-3, 33.1e-3), BO = vec3(1.6e-3, 4.7e-3, 0.21e-3);
uniform vec4 uA; uniform vec4 uB;   // sun dir, mie beta | ground altitude, sun power, multiple-scatter gain, sun elevation deg
float chap(float X, float h, float c){
  float s = sqrt(X + h), r;
  if (c >= 0.) r = s / (s * c + 1.) * exp(-h);
  else { float x0 = sqrt(max(0., 1. - c * c)) * (X + h); r = 2. * sqrt(x0) * exp(min(X - x0, 60.)) - s / (1. - s * c) * exp(-h); }
  return r;
}
vec3 sunT(vec3 P){ // transmittance from P (Earth centred, km) to the Sun; Earth's shadow included
  float r = length(P), c = dot(P, uA.xyz) / r, h = r - RE;
  float oR = HR * chap(RE / HR, h / HR, c), oM = HM * chap(RE / HM, h / HM, c);
  float rr = r / (RE + 25.); float m25 = sqrt(max(1. - rr * rr * (1. - c * c), 0.));
  float oO = 15. / max(m25, 0.05) * (h < 25. ? 1. : 0.3);
  float pg = c < 0. ? r * sqrt(1. - c * c) : r;   // the sun ray's lowest point: the Andes and the Altiplano rim cut it off
  return exp(-min(BR * oR + uA.w * 1.11 * oM + BO * oO, vec3(80.))) * smoothstep(RE + 2.4, RE + 3.9, pg);
}
`,io=Q+ze+zt+`
in vec2 vUv; out vec4 o;
uniform sampler2D uSky; uniform sampler2D uD; uniform int uMd;
uniform vec4 uMw; uniform vec4 uRg; uniform vec4 uX;  // . . . mist | range on, dist, height, seed | . hills, encode, texel elevation size
vec3 skyAt(vec3 d){ return textureLod(uSky, uvOf(d), 0.).rgb; }
void main(){
  if (uMd == 0){
    vec3 rd = dirOf(vUv); rd.y = max(rd.y, 0.0005); rd = normalize(rd);
    vec3 ob = vec3(0., RE + uB.x, 0.);
    float b = dot(ob, rd), cc = dot(ob, ob) - RT * RT, tT = -b + sqrt(b * b - cc);
    vec3 sR = vec3(0.), sM = vec3(0.); float oR = 0., oM = 0., tp = 0.;
    for (int i = 0; i < 28 + uZ0; i++){
      float f = (float(i) + 1.) / 28., t = tT * f * f, dt = t - tp, tm = t - dt * .5; tp = t;
      vec3 P = ob + rd * tm; float h = length(P) - RE;
      float dR = exp(-h / HR) * dt, dM = exp(-h / HM) * dt;
      oR += dR * .5; oM += dM * .5;
      vec3 T = sunT(P) * exp(-(BR * oR + uA.w * 1.11 * oM));
      oR += dR * .5; oM += dM * .5;
      sR += T * dR; sM += T * dM;
    }
    float mu = dot(rd, uA.xyz), g = 0.76;
    float pR = 0.0597 * (1. + mu * mu), pM = 0.0796 * (1. - g * g) / pow(1. + g * g - 2. * g * mu, 1.5);
    vec3 Tv = exp(-(BR * oR + uA.w * 1.11 * oM));
    vec3 L = uB.y * (BR * sR * pR + uA.w * sM * pM);
    float tw = exp(min(uB.w, 0.) / 2.6);
    L += uB.y * uB.z * tw * vec3(0.22, 0.42, 1.) * (0.6 + 0.4 * min(1., 0.25 / max(rd.y, 0.05)));
    L *= mix(vec3(1.), vec3(0.74, 0.86, 1.04), smoothstep(0.1, 0.7, rd.y));   // the blue that multiple scattering adds high up
    float lu = dot(L, vec3(.25, .6, .15)); L = max(mix(vec3(lu), L, 1.2), 0.);
    o = vec4(L, dot(Tv, vec3(.3, .5, .2)));
  } else {
  vec3 rd = dirOf(vUv); float el = asin(rd.y), az = vUv.x * TAU;
  vec3 ob = vec3(0., RE + uB.x + 0.0016, 0.);
  vec3 zen = textureLod(uSky, vec2(0., 1.), 0.).rgb, hor = skyAt(normalize(vec3(rd.x, 0.02, rd.z)));
  vec3 amb = max(mix(zen, hor, 0.4) * 1.6, vec3(0.0007, 0.0009, 0.0014));
  vec3 cc = vec3(0.); float ca = 0.;
  // far range
  float ct = cos(el);
  if (uRg.x > .5 && el < 0.06){
    vec3 cp = vec3(cos(az), sin(az), uRg.w);
    float m = smoothstep(0.35, 0.62, n3(cp * 1.7 + 11.) * .7 + n3(cp * 4.) * .3);
    float H = uRg.z * m * (0.35 + 0.65 * (n3(cp * 7.) * .55 + n3(cp * 19.) * .3 + n3(cp * 47.) * .15));
    float D = uRg.y * (0.9 + 0.2 * n3(cp * 3. + 5.));
    float et = atan((H - D * D / (2. * RE)) / D);
    float cov = smoothstep(et + uX.w, et - uX.w, el);
    if (cov > 0.){
      vec3 Pk = ob + vec3(rd.x, 0., rd.z) * D / ct + vec3(0., H * 0.6, 0.);
      vec3 lit = sunT(Pk) * uB.y * 0.02 * max(0.2, -dot(normalize(vec3(rd.x, 0., rd.z)), uA.xyz) * .5 + .5);
      vec3 mc = vec3(0.07, 0.06, 0.065) * (amb + lit);
      float hz = 1. - exp(-D / 110.);
      cc = mix(cc, mix(mc, hor * 0.92, hz), cov); ca = mix(ca, 1., cov);
    }
  }
  // a hairline of bright haze lying on the far shore of the mirror; the near islands stand in front of it
  { float hw = 0.55 * exp(-max(el, 0.) / 0.0035); cc = mix(cc, mix(hor, skyAt(normalize(vec3(rd.x, 0.14, rd.z))), 0.5) * 1.3, hw); ca = mix(ca, 1., hw); }
  // islands and volcanoes
  for (int i = 0; i < 6 + uZ0; i++){
    if (float(i) >= uX.y) break;
    vec4 a = texelFetch(uD, ivec2(i, 2), 0), bb = texelFetch(uD, ivec2(i, 3), 0); // hills
    float da = fract((az - a.x) / TAU + .5) * TAU - PI, x = da / a.y;
    if (abs(x) > 1.3) continue;
    float D = a.w;
    vec3 cp = vec3(x * 3., bb.y, 1.);
    float sh;
    if (bb.x < .5) sh = pow(max(0., 1. - x * x), 1.2) * (0.75 + 0.25 * n3(cp * 2.)) + 0.08 * (n3(cp * 9.) - .5) + 0.04 * (n3(cp * 27.) - .5);
    else sh = min(pow(max(0., 1. - abs(x)), 1.45), 0.9) + 0.04 * (n3(cp * 8.) - .5) * (1. - abs(x)) + 0.012 * (n3(cp * 31.) - .5);
    float H = a.z * max(sh, 0.);
    float et = atan((H - D * D / (2. * RE) + 0.0016) / D);
    float cov = smoothstep(et + uX.w, et - uX.w, el);
    if (cov <= 0.) continue;
    float hy = clamp((tan(el) * D + D * D / (2. * RE)) / max(a.z, 1e-3), 0., 1.);
    vec3 Pk = ob + vec3(rd.x, 0., rd.z) * D / ct + vec3(0., hy * a.z, 0.);
    vec3 sl = sunT(Pk) * uB.y;
    float face = -dot(normalize(vec3(rd.x, 0., rd.z)), normalize(vec3(uA.x, 0., uA.z))) * .5 + .5;
    float slope = (n3(cp * 13.) - .5);
    vec3 mc = vec3(0.075, 0.062, 0.058) * (amb * 1.2 + sl * 0.03 * face * (0.6 + slope));
    if (bb.x > .5){
      float snow = smoothstep(0.66, 0.74, hy + 0.12 * (n3(cp * 6. + 3.) - .5)) * smoothstep(-.2, .25, n3(vec3(x * 14., hy * 6., bb.y)) - .3 + hy * .4);
      mc = mix(mc, vec3(0.8) * (amb * 0.8 + sl * 0.09 * face), snow);
    }
    float hz = 1. - exp(-D / 60.);
    cc = mix(cc, mix(mc, hor * 0.95, hz), cov); ca = mix(ca, 1., cov);
  }
  if (uMw.w > 0.){ float w = uMw.w * exp(-max(el, 0.) / 0.006); cc = mix(cc, hor * 1.25 + amb * .2, w); ca = mix(ca, 1., w); }
  o = uX.z > .5 ? vec4(cc / (1. + cc), ca) : vec4(cc, ca);
  }
}`,Ut=Q+ze+zt+`
in vec2 vUv; out vec4 o;
uniform sampler2D uSky; uniform sampler2D uD;
uniform vec4 uC;  // cirrus, altocumulus cover, mackerel, night
uniform vec4 uAc; // altocumulus patch: centre x, z, radius (km; 0: the whole sky)
uniform vec4 uMw;  // milky way, airglow, venus, mist
uniform vec4 uRg; // range on, dist, height, seed
uniform vec4 uX;  // towers, hills, encode, texel elevation size
uniform vec4 uGp; uniform vec4 uGc; uniform vec4 uWd; // galactic pole, galactic centre, wind dir/seed
vec3 skyAt(vec3 d){ return texture(uSky, uvOf(d)).rgb; }
uniform int uLoop;
float fbm3(vec3 p){ float a = .5, s = 0.; for (int i = 0; i < 8 + uZ0; i++){ if (i >= uLoop) break; s += a * n3(p); p = p * 2.03 + 7.1; a *= .5; } return s; }
// packed bubbles in cell units: above 0 inside a bubble (a round cap, its radius high at the centre), 0 in the
// gaps (the 2x2x2 search is exact only inside the bubbles). A centre is jittered over three quarters of its cell and
// its radius is as large as the search allows there, so sizes and spacing are irregular, about three quarters of space
// is bubble, and no lattice shows
float puff(vec3 p){
  vec3 c0 = floor(p - .5); float m = 0.;
  for (int k = 0; k < 8 + uZ0; k++){
    if (k >= uLoop * 2) break;
    vec3 c = c0 + vec3(float(k & 1), float((k >> 1) & 1), float(k >> 2));
    uvec3 u = uvec3(ivec3(c) + 4096); uint h = u.x * 73856093u ^ u.y * 19349663u ^ u.z * 83492791u; h ^= h >> 13; h *= 1274126177u; h ^= h >> 16;
    vec3 j = (vec3(float(h & 255u), float((h >> 8) & 255u), float((h >> 16) & 255u)) / 255. - .5) * 0.76;
    float r = (1. - max(abs(j.x), max(abs(j.y), abs(j.z)))) * (0.85 + 0.15 * float(h >> 24) / 255.);
    vec3 dp = p - c - .5 - j;
    m = max(m, r - dot(dp, dp) / r);
  }
  return m;
}
uniform vec4 uCl; // cumulus base, field top, cover, highest top (km above the flat)
const mat3 M3 = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
// cumulus at q (x, height above the flat, z; km). x: density; y: how open the point is (1 on a bubble's crown, low in
// the creases between bubbles and deep under a wide base); z: above 0 inside the smooth hull that bounds the cloud;
// w: above 0 where the sizes asked for leave any cloud (the march uses z and w to skip clear air). The hull is a
// column field (each cloud a dome, its height from a slow field) joined with the towers placed from JS and a storm's
// anvil; bubbles of up to six sizes are carved out of it, each size biting about its own radius deep, so lobes carry
// smaller lobes. no: how many sizes to use (below 0: the hull only); px: the size of a map texel or a march step
// there (km): sizes under it are left out and the edge is never sharper than it
vec4 cden(vec3 q, float no, float px){
  vec2 w = q.xz;
  float big = n3(vec3(w * 0.018 + uRg.w, 1.3));
#ifdef TUR
  // TUR (compiled only for Towering cumulus mints other than the home; the home's program is the old one): each cloud a
  // heap of turrets (the two base rolls set its top, .45 to 1.15 of the field's height), domed, narrowing upward and
  // leaning downwind with height (zero at the base), so no far cloud stands as a level-topped slab; its flat base the
  // darkest band and a cleft between two turrets a darker crease (ab, on the openness at the end). No footprint wander
  // here (uWd.z is 0 on these mints)
  float b1 = n3(vec3(w * 0.3, 4.)), b2 = n3(vec3(w * 1.3, 4.)), hb = uCl.x + 0.4 * (b1 - .5) + 0.07 * (b2 - .5), yb = max(q.y - uCl.x, 0.);
  vec2 wf = w - (0.32 * yb) * uWd.xy;
#else
  float hb = uCl.x + 0.4 * (n3(vec3(w * 0.3, 4.)) - .5) + 0.07 * (n3(vec3(w * 1.3, 4.)) - .5);   // the base rolls a little
  // each cloud's footprint is read at a point that wanders with height (up to about 0.8 km, at heights of 2 to 4 km,
  // its phase drifting across the sky), so no column stands on a vertical wall: its flanks lean and bulge. uWd.z: how
  // much (none for Towering cumulus, whose near clouds are the subject and are seen from below: a footprint that
  // wanders reads there as a bigger, blockier cloud, the union of its shifted copies)
  vec2 wf = w + uWd.z * vec2(sin(q.y * 2.3 + w.y * 0.21) * 0.5 + sin(q.y * 1.1 + w.x * 0.17 + 2.) * 0.3 + sin(q.y * 4.7 + w.x * 0.29 + w.y * 0.13) * 0.16,
    sin(q.y * 1.7 + w.x * 0.23 + 1.3) * 0.5 + sin(q.y * 0.8 - w.y * 0.19) * 0.3 + sin(q.y * 5.3 - w.x * 0.19 + 0.7) * 0.16);   // the third sine: a base's last few hundred metres bulge too
#endif
  float cel = n3(vec3(wf * 0.19, 2.7 + uRg.w)) * .62 + n3(vec3(wf * 0.52, 5.1)) * .38;
  float s = (cel - clamp(0.7 - uCl.z * .5 - (big - .5) * .9, 0.4, 1.2)) * 3. - 0.3;
  float hv = n3(vec3(w * 0.085, 8.));
  float top = uCl.x + 0.3 + (uCl.y - uCl.x) * min(hv * hv * 2.2, 1.), H = top - hb;
#ifdef TUR
  float Ht = H * (0.45 + 0.7 * clamp(1.6 * b1 + 0.5 * b2 - 0.55, 0., 1.)), fh = clamp(yb / max(Ht, 0.3), 0., 1.), st0 = s - 0.35 * fh * (1. - 0.6 * fh), xd = clamp(st0 * 1.2, 0., 1.);
  float sd = min(st0 * 3., (hb + Ht * sqrt(xd * (2. - xd)) - q.y) * 0.85);
  float ab = 0.65 + 0.35 * min(fh * 3., 1.) - 0.15 * clamp((0.52 - b2) * 7., 0., 1.) * clamp(fh * 3.3 - 0.66, 0., 1.);
#else
  float sd = min(s * 3., (hb + H * sqrt(clamp(s * 1.6, 0., 1.)) - q.y) * 0.85);
#endif
  if (uX.x > 0.){
    vec2 tw = (vec2(n3(vec3(w * 0.13, 6. + q.y * 0.16)), n3(vec3(w * 0.13, 9. + q.y * 0.16))) - .5) * 2.6;   // no tower is round, and it shears with height
    for (int i = 0; i < 8 + uZ0; i++){
      if (float(i) >= uX.x) break;
      vec4 a = texelFetch(uD, ivec2(i, 0), 0);
      vec2 dw = w - a.xy + tw;
      float r2 = dot(dw, dw) / (a.z * a.z), an = texelFetch(uD, ivec2(i, 1), 0).x;
      if (r2 < 6.5){
        // the flank leans and bulges: the radius swells and narrows with height and round the tower (turrets at
        // different heights), seeded per tower
        float ph = fract(a.x * 0.37 + a.y * 0.71) * 6.28, nx = dw.x * inversesqrt(max(dot(dw, dw), 1e-6));
        float kb = 1. + 0.13 * sin(q.y * 1.15 + ph + 2.2 * nx) + 0.09 * sin(q.y * 0.55 + ph * 1.7 - 1.6 * nx) + 0.05 * (4. * nx * nx * nx - 3. * nx);
        float rn = sqrt(r2) / kb, e = max(1. - rn * rn / 1.6, 0.);
        float st = min((1.265 - rn) * a.z, (hb + (a.w - hb) * pow(e, 0.42) - q.y) * 0.85);
        H = mix(H, a.w - hb, smoothstep(-0.6, 0.6, st - sd)); sd = max(sd, st);
      }
      if (an > .5 && r2 < 40.){
        // the anvil: a wedge spread downwind (1.7 times) and short upwind, its top near the tower's, its base rising
        // toward a rim that wanders round the tower, so it thins to its edge; the underside sags in slow pouches
        vec2 ad = vec2(dot(dw, uWd.xy), dot(dw, vec2(-uWd.y, uWd.x))) / a.z;
        ad.x /= ad.x > 0. ? 1.7 : 0.85;
        float ra = length(ad), ax = ad.x / max(ra, 1e-3), ay = ad.y / max(ra, 1e-3);
        float rim = 2.25 * (1. + 0.13 * (4. * ax * ax * ax - 3. * ax) + 0.1 * ax * ay * 2. + 0.06 * sin(ra * 5. + ad.y * 3.));
        float ab = a.w - 2.1 + 0.75 * ra - 0.22 * sin(ad.x * 3.1 + 1.3) * sin(ad.y * 2.7), at = a.w + 0.15 - 0.15 * ra;
        sd = max(sd, min(min(q.y - ab, at - q.y) * 1.6, (rim - ra) * a.z * 0.4));
      }
    }
  }
#ifdef TUR
  float w0 = smoothstep(0.8, 4.5, H), deep = sd;   // the largest bubbles bite shallower clouds too: round lobes, no peaks
#else
  float w0 = smoothstep(1.5, 4.5, H), deep = sd;
#endif
  sd = min(sd + 0.45 + 0.75 * w0, (q.y - hb) * 12. + 0.5);
  float d = 0., ao = 1., bd = sd;
  if (sd > 0. && no >= 0.){
    vec3 p = q + uRg.w + (vec3(n3(q * 0.55 + 11.), n3(q * 0.55 + vec3(37., 5., 19.)), n3(q * 0.55 + vec3(7., 53., 71.))) - .5) * 0.6;
    float rag = smoothstep(0.5, 0.8, n3(q * 0.21 + 31.)) * (1. - smoothstep(0.25, 0.8, (q.y - hb) / max(H, 0.5)));   // tired, fraying parts, low down
    float C = rag * 0.5 * n3(vec3(p.x * 1.7, p.y * 3.4, p.z * 1.7)), sc = 2.2;
    for (int i = 0; i < 6 + uZ0; i++){
      if (float(i) >= no || sc < 1.1 * px || C > sd) break;   // the bites only add up: once nothing is left, the smaller sizes cannot bring cloud back
      if (i == 2) p += (vec3(n3(q * 2.1 + 3.), n3(q * 2.1 + vec3(17., 41., 9.)), n3(q * 2.1 + vec3(29., 13., 61.))) - .5) * 0.16;
      float wt = (i == 0 ? w0 : 1.) * smoothstep(1.1, 2.4, sc / px);
      if (wt > 0.01){
        float e = 0.75 - min(puff(p / sc), 0.75);
        C += 0.85 * wt * sc * e;
        ao *= 1. - 0.36 * wt * smoothstep(0.35, 0.75, e);
      }
      p = M3 * p + 3.7; sc *= 0.385;
    }
    bd = sd - C;
    C += 0.4 * (sc > 2. ? 2.2 * w0 + 1.35 : sc * 1.6);   // the sizes left out, at their mean bite
    d = clamp((sd - C) * min(mix(30., 3., rag), 0.7 / px), 0., 1.) * smoothstep(0., max(0.22, 3. * length(q.xz) * uX.w), q.y - hb);   // a far base is three map texels soft (by distance, not px: the light march's long px would fade the bases out of their own shadow)
    ao *= 0.62 + 0.38 * exp(-max(deep, 0.) * 0.55);
  }
#ifdef TUR
  ao *= ab;
#endif
  return vec4(d, ao, sd, bd);
}
`,Lt=`void main(){
  vec3 rd = dirOf(vUv); float el = asin(rd.y), az = vUv.x * TAU;
  vec4 S = texture(uSky, vUv);
  vec3 col = S.rgb;
  vec3 ob = vec3(0., RE + uB.x + 0.0016, 0.);
  vec3 zen = textureLod(uSky, vec2(0., 1.), 0.).rgb, hor = skyAt(normalize(vec3(rd.x, 0.02, rd.z)));
  vec3 amb = max(mix(zen, hor, 0.4) * 1.6, vec3(0.0007, 0.0009, 0.0014));
`,lo=Ut+`vec3 puffA(vec2 p, float jy){
  vec2 c0 = floor(p) - 1.; float f1 = 9.; vec2 d1 = vec2(0.);
  for (int k = 0; k < 9 + uZ0; k++){
    vec2 c = c0 + vec2(float(k % 3), float(k / 3));
    uvec2 u = uvec2(ivec2(c) + 4096); uint h = u.x * 73856093u ^ u.y * 19349663u; h ^= h >> 13; h *= 1274126177u; h ^= h >> 16;
    vec2 dp = p - c - .5 - (vec2(float(h & 255u), float((h >> 8) & 255u)) / 255. - .5) * vec2(.8, jy);
    float dd = length(dp) - (float((h >> 16) & 255u) / 255. - .5) * 0.5;
    if (dd < f1){ f1 = dd; d1 = dp; }
  }
  return vec3(f1, d1);
}
float fbmk(vec3 p, int no){ float a = .5, s = 0.; for (int i = 0; i < 8 + uZ0; i++){ if (i >= no) break; s += a * n3(p); p = p * 2.03 + 7.1; a *= .5; } return s; }
`+Lt+`  // night: stars, milky way, airglow
  if (uC.w > 0.){
    uint hh = uint(gl_FragCoord.x) * 1664525u + uint(gl_FragCoord.y) * 22695477u + 1013904223u; hh ^= hh >> 15; hh *= 2246822519u; hh ^= hh >> 13; hh *= 3266489917u; hh ^= hh >> 16;
    float r1 = float(hh & 65535u) / 65535., r2 = float(hh >> 16) / 65535.;
    float sa = max(cos(el), 0.) * (TAU / uWd.z) * 1.25 * pow(max(vUv.y, 1e-3), 0.25) * (1.5707963 + E0) / (uWd.z * .25);
    float pst = 5000. * sa;
    float st = r1 < pst ? 0.00025 * pow(r1 / pst + 0.003, -1.2) : 0.;
    vec3 sc = mix(vec3(1., .78, .55), vec3(.75, .85, 1.), r2);
    float gb = dot(rd, uGp.xyz), gcos = dot(rd, uGc.xyz);
    float band = exp(-gb * gb / 0.03) * (0.55 + 0.9 * exp(-(1. - gcos) * 2.2));
    float lanes = fbm3(rd * 9. + 3.), cl = fbm3(rd * 22.);
    float rift = smoothstep(0.42, 0.6, lanes) * exp(-gb * gb / 0.004) * smoothstep(-.2, .6, gcos);
    float mw = uMw.x * band * (0.15 + 1.4 * cl * cl * cl) * (1. - 0.85 * rift);
    st *= 1. + 2.5 * band * uMw.x;
    float ag = uMw.y / sqrt(1. - 0.94 * cos(el) * cos(el));
    col += uC.w * (S.a * (st * sc + mw * vec3(0.03, 0.028, 0.026)) + ag * vec3(0.0006, 0.00085, 0.0012));
  }
  if (uMw.z > 0.){ // Venus, low over the glow
    float dv = length(vec2(fract((az - uWd.w) / TAU + .5) - .5, (el - 0.17) / TAU));
    col += uMw.z * vec3(1., .97, .9) * exp(-dv * dv / 1.2e-7) * 6.;
  }
  // cirrus, then altocumulus: layers on curved shells
  for (int L = 0; L < 2 + uZ0; L++){
    float hc = L == 0 ? 9. : 4.6, cov = L == 0 ? uC.x : uC.y, lo = L == 0 ? 0.02 : 0.035;
    if (cov <= 0. || rd.y <= lo) continue;   // below lo the layer has faded out (see fade): nothing to work out
    float X = hc * (2. * (RE + uB.x) + hc), b = ob.y * rd.y, t = X / (b + sqrt(b * b + X));
    vec3 P = ob + rd * t; vec2 w = P.xz;
    vec2 wd = uWd.xy; vec2 ww = vec2(dot(w, wd), dot(w, vec2(-wd.y, wd.x)));
    // the altocumulus has a thickness: seen low, its clumps show their sides (a few hundred metres tall) more than
    // their foreshortened footprints, so beyond 14 km out (under about 18 degrees) the slow field that groups the
    // cloudlets into clumps is read on a plane stretched along the view (a log map, so nothing folds): clumps stay
    // lumps instead of squeezing into level streaks
    float rw = length(w), ms = 1. + 0.3 * max(rw - 14., 0.);
    vec2 qs = ww * ((min(rw, 14.) + log(ms) / 0.3) / max(rw, 1e-3)) + uRg.w * 7.;
    float d, tk = 0., lk = 1.1;
    // every noise of both layers through one call site (the HLSL compiler compiles each site again), each argument
    // built from the ones before it. Cirrus: the bend, the patches, the streaks, each filament's head, two sizes of
    // fibre, the sheaves. Altocumulus: the field of patches and lanes, the slow bend of the rows, a noise at the cells'
    // scale, the warp that moves each point about a quarter cell before the cell lookup, the fray at 90 m, the edge's sharpness
    vec2 q = L == 0 ? vec2(ww.x * 0.045, ww.y * 0.32) + uRg.w : ww + uRg.w * 7.;
    vec2 cs = mix(vec2(0.3, 0.21), vec2(0.32, 0.17), uC.z);   // an altocumulus cell along and across the wind, km (rolls on a mackerel sky)
    vec2 p = q / cs;
    vec4 NA = vec4(0.), NB = vec4(.5);
    for (int i = 0; i < 7 + uZ0; i++){
      vec3 na; bool fb;
      if (L == 0){
        float wa = NA.x * 3.;
        na = i == 0 ? vec3(ww * 0.065, 1.) : i == 1 ? vec3(q.x + wa * .3, q.y + wa, 4.) : i == 2 ? vec3(q.x * 4., q.y * 9. + wa * 2., 9.) : i == 3 ? vec3(5., q.y * 2.5 + wa, 5.) : i == 4 ? vec3(q.x * 6., q.y * 34. + wa * 5., 3.) : i == 5 ? vec3(q.x * 12., q.y * 80. + wa * 9., 8.) : vec3(w * 0.02, 2.);
        fb = i < 2 || i == 6;
      } else {
        vec2 pw = p + vec2(0., NA.y * 4.);
        na = i == 0 ? vec3(q * 0.035, 3.) : i == 1 ? vec3(q * 0.08, 5.) : i == 2 ? vec3(qs * 0.8, 7.) : i == 3 ? vec3(pw * 0.5, 21.) : i == 4 ? vec3(pw * 0.5, 23.) : i == 5 ? vec3(q / 0.09, 13.) : vec3(qs * 0.25, 17.);
        fb = i < 3;
      }
      float v = fbmk(na, fb ? uLoop : 1) * (fb ? 1. : 2.);
      if (i == 0) NA.x = v; else if (i == 1) NA.y = v; else if (i == 2) NA.z = v; else if (i == 3) NA.w = v; else if (i == 4) NB.x = v; else if (i == 5) NB.y = v; else NB.z = v;
    }
    if (L == 0){
      // filaments: ice trailing from small heads into slower air. A bend of about 15 km curves each one into a comma
      // or a hook, and the fibres follow a stronger bend so sheaves cross at small angles; along the wind each
      // filament starts thick at its head and thins to nothing at its tail, a few km on
      float a1 = NA.y, a2 = NA.z;
      float ft = fract(q.x * 3.2 + NA.w * 3.), env = smoothstep(0., 0.07, ft) * pow(1. - ft, 1.3);
      // the fibres run across the wind at up to 26 cycles per km: fade each octave to its mean where one map texel
      // covers more than about half a noise cell, or the bake samples them into rows of dots
      vec2 rh = normalize(rd.xz + vec2(1e-6)), uf = vec2(-wd.y, wd.x);
      float th = uX.w / 1.1 * t, fu = abs(dot(uf, rh)) * th / max(dot(rd, P) / length(P), 0.02) + abs(dot(uf, vec2(-rh.y, rh.x))) * th;
      float b1 = smoothstep(0.35, 0.8, 10.9 * fu), b2 = smoothstep(0.35, 0.8, 25.6 * fu);
      float fib = mix(NB.x, .5, b1) * .6 + mix(NB.y, .5, b2) * .4;
      d = smoothstep(1. - cov, 1.25 - cov * .6, a1 + 0.12) * (0.3 + 0.7 * a2) * smoothstep(0.42, 0.75, NB.z) * smoothstep(0.3 + 0.3 * ft, 0.75, fib);
      d *= 0.8 * mix(1., env * 1.6, smoothstep(0.6, 0.2, b1));
    } else {
      // altocumulus: a sheet of cloudlets. One patch (uAc) or the whole sky, thinned by a field tens of km across into
      // lanes and open sky
      float big = NA.x, pn = NA.z, fy = NB.y, sn = NB.z;
      float wv7 = NA.y; p.y += NA.y * 4.;
      p += (vec2(NA.w, NB.x) - .5) * 0.9;
      float pd = uAc.z > 0. ? min((uAc.z - length(w - uAc.xy)) / (uAc.z * 0.4), 0.6) : 0.;
      float cv = clamp((big - 0.7 - 0.05 * uC.z + cov * 0.5) * 5. + 1.5 * pd, 0., 1.);   // the local cover, 0 past the sheet's edge
      d = 0.;
      if (cv > 0.){
        // the cloudlets: billows of two sizes (the cell field and one 2.3 times finer) under the noise of their own scale,
        // cut by the local cover: where it is high they pack with crooked gaps, where it thins only the biggest billows
        // stay, as flakes, and then none
        float fpk = t * uX.w / max(rd.y, 0.03), fpc = fpk / cs.y, fph = t * TAU / uWd.z / cs.y;   // a map texel along the (stretched) view (km, cells) and across it (cells)
        float bw = 0., sc = 1., wt = 0.68; vec2 dp1 = vec2(0.);
        for (int o = 0; o < 2 + uZ0; o++){
          vec3 V = puffA(p * sc + float(o) * 17.3, 0.8 - 0.55 * uC.z);
          if (o == 0) dp1 = V.yz;
          bw += wt * mix(1. - smoothstep(0., 0.75, V.x), 0.45, smoothstep(0.25, 0.6, fpc * sc));   // a billow: 1 mid-cell, 0 at its rim; its mean where a texel holds several
          sc = 2.3; wt = 0.32;
        }
        // seen low, each cloudlet hides the gap behind it, but only in stretches: a slow field breaks every row
        float clo = clamp(0.09 / max(rd.y, 0.02) - 0.3, 0., 1.) * smoothstep(0.3, 0.62, sn);
        float F = bw * 0.75 + (pn - .5) * 0.9 + (fy - .5) * 0.2 * (1. - smoothstep(0.3, 0.7, fpk / 0.09));
        F += uC.z * 0.2 * mix(sin(p.y * 2.1 + wv7 * 6. + pn * 5.), 0., smoothstep(0.3, 0.8, fpc * 0.5));   // a mackerel sky's rolls: streets of cloudlets about three cells apart, their phase wandering
        float thr = mix(1.02, 0.12, cv) - 0.3 * clo * cv;
        float sw = mix(0.08 + 0.06 * uC.z, 0.3, sn) + fpc * 0.25 + fph * 1.2;   // crisp here, soft there; never sharper than a texel
        tk = clamp((F - thr) / 0.35, 0., 1.);
        d = smoothstep(thr - sw, thr + sw, F) * (0.35 + 0.65 * tk);
        // the sun at or under the horizon lights each cloudlet from below on its sunward side; its thick middle is darker
        vec2 sdc = normalize(vec2(dot(uA.xz, wd), dot(uA.xz, vec2(-wd.y, wd.x))) / cs + 1e-6);
        float side = clamp(dot(dp1, sdc) * 2.2, -1., 1.) * (1. - smoothstep(0.3, 0.8, fpc));
        lk = (smoothstep(-0.9, 0.9, side) * (1. - 0.55 * tk) + 0.06) * 0.6;
      }
    }
    float fade = smoothstep(lo, L == 0 ? 0.1 : 0.15, rd.y);
    float a = d * fade;
    if (a > 0.002){
      vec3 sl = sunT(P);
      float mu = dot(rd, uA.xyz);
      float ph = 0.0796 * (1. - .36) / pow(1.36 - 1.2 * mu, 1.5);
      vec3 lc = uB.y * sl * (0.05 + 0.4 * ph) * lk + (L == 0 ? amb * 0.45 : mix(amb, zen * 1.6, 0.6) * 0.5 * (1. - 0.35 * tk));   // the altocumulus's shade leans to the zenith's blue
      float fr = L == 0 ? (1. - exp(-t / 90.)) * 0.6 : (1. - exp(-t / 50.)) * 0.8;
      lc = mix(lc, col, fr);
      col = mix(col, lc, a);
    }
  }
  float dth = (fract(sin(dot(gl_FragCoord.xy, vec2(41.31, 289.7))) * 15731.7) - .5) * 0.03;
  col = max(col * (1. + dth), 0.);
  o = uX.z > .5 ? vec4(col / (1. + col), 1.) : vec4(col, 1.);
}`,Ue=Ut+Lt+`  // the cumulus field, raymarched through its slab near to far, with a short march toward the Sun per sample (the
  // Earth's shadow comes from sunT: bases in shadow, tops still in the reddened light)
  vec3 acc = vec3(0.); float Tr = 1.;
  if (uCl.z > 0.){
    float ry = max(rd.y, 0.), c2 = max(1. - rd.y * rd.y, 0.) / (2. * RE);
    // the slab's top: the field's, raised only where the ray passes a tower
    float htop = uCl.y + 0.5 + 0.3 * (uCl.y - uCl.x); vec2 rdh = rd.xz; float l2 = max(dot(rdh, rdh), 1e-6);
    for (int i = 0; i < 8 + uZ0; i++){
      if (float(i) >= uX.x) break;
      vec4 a = texelFetch(uD, ivec2(i, 0), 0);
      float tc = dot(a.xy, rdh) / l2; vec2 cl = rdh * tc - a.xy;
      float rr = a.z * (texelFetch(uD, ivec2(i, 1), 0).x > .5 ? 5.4 : 2.2) + 1.3;   // the anvil reaches 1.7 times its rim downwind
      if (tc > 0. && dot(cl, cl) < rr * rr) htop = max(htop, a.w + 0.3 + 0.3 * (a.w - uCl.x));
    }
    float hb = uCl.x - 0.35, hf = uCl.y + 0.9 + 0.3 * (uCl.y - uCl.x), t0 = 2. * hb / (ry + sqrt(ry * ry + 4. * c2 * hb)), t1 = min(2. * htop / (ry + sqrt(ry * ry + 4. * c2 * htop)), 230.);
    if (t0 < t1){
      // steps from the field's slab alone, so a tower's taller slab adds steps, not coarser ones; a steep ray crosses the
      // slab in a few km and needs fewer whole steps to find the hulls (nq quarter steps to each)
      float nq = floor(mix(4., 9., smoothstep(0.15, 0.6, rd.y)) + .5), dtm = (min(2. * hf / (ry + sqrt(ry * ry + 4. * c2 * hf)), 230.) - t0) / 224., dt = dtm * nq, dtf = dtm / 3.;
      ivec2 fc = ivec2(gl_FragCoord.xy) & 1; float jit = float((fc.x ^ fc.y) * 2 + fc.y) * 0.25;   // a 2x2 ordered offset of the fine step: what is left of the step shows as the finest checker, which the map's filter averages away
      vec3 ld = normalize(uA.xyz + vec3(0., 0.2, 0.));
      float mu = dot(rd, uA.xyz);
      float ph = 0.5 * 0.0796 * (1. - .36) / pow(1.36 - 1.2 * mu, 1.5) + 0.5 * 0.0796;
      // one density call site: k = 0 samples the view ray, k = 1..3 step toward the light from that sample, each
      // farther and blurrier than the last (soft shadows, no copies of cloud edges).
      // Three gears: whole steps test the hull only; inside it nq times shorter steps test the two largest bubble
      // sizes; where those leave cloud, back up one such step and go at a third of it with every size and the light
      // march (the fine step grows slowly with the samples spent, so a long thin path still reaches its end)
      // Entering a cloud, the skin is first closed in on (three halvings between the last clear sample and the first
      // dense one) and the first lit sample taken just inside it, so shading never depends on where a step happened
      // to fall (that showed as hatching on the flanks); where steps are long (far, low clouds) the light samples
      // stretch with them
      int s = 0, k = 0, md = 0, em = 0, nd = 0, nb = 0, rf = 0; float de = 0., ao = 1., od = 0., t = t0 + jit * dtf, dtc = dtf, tf = 0., tx = 0., ta = 0., tb = 0.; vec3 q = vec3(0.);
      for (int it = 0; it < 1800 + uZ0; it++){
        if (k == 0){ q = rd * t; q.y += t * t * c2; }
        float px = t * uX.w, fk = float(k), ls = max(1., dtc * 9.5);
        vec4 v = cden(q + ld * (0.065 * ls * fk * (fk * fk + 1.)), k == 0 ? (md == 0 ? -1. : md == 1 ? 2. : 6.) : k == 1 ? 3. : k == 2 ? 1. : 0., k == 0 ? max(px, dtc * 1.1) : max(px, (0.07 + 0.08 * fk * fk * fk) * ls));
        if (k == 0){
          if (md == 0){
            if (v.z > 0.){ t = max(t - dt, t0); md = 1; em = 0; }
            else t += dt;
          } else if (md == 1){
            if (v.w > 0.){ tf = t; t = max(t - dtm, max(tx, t0)); md = 2; em = 0; }   // tf: the fine gear must pass this point before it may drop back; tx: where it last dropped back
            else { t += dtm; if (v.z > 0.) em = 0; else em++; if (float(em) > nq + 1.5) md = 0; }
          } else if (md == 3){
            if (v.x > 0.004) tb = t; else ta = t;
            nb--;
            if (nb > 0) t = 0.5 * (ta + tb); else { t = tb + min(0.3 * dtc, 0.05); md = 2; rf = 2; }
          } else {
            dtc = min(dtf * (1. + floor(float(s) / 60.)), dtm);
            de = v.x; ao = v.y; s++;
            if (de > 0.004){
              em = 0;
              if (nd == 0 && rf == 0){ ta = t - dtc; tb = t; nb = 3; md = 3; t = 0.5 * (ta + tb); }
              else { if ((nd & 1) == 0){ k = 1; od = 0.; } else k = 4; nd++; }   // the light march on every other sample of a run; the one between keeps its shadow
            }
            else { nd = 0; rf = max(rf - 1, 0); t += dtc; if (v.w > -0.4 || t <= tf) em = 0; else em++; if (em > 1){ md = 1; em = 0; tx = t; } }
          }
        }
        else { od += v.x * 0.3 * ls * fk * (0.72 + 0.28 * fk); k++; }
        if (k == 4){
          float hn = clamp((q.y - uCl.x) / (uCl.w - uCl.x), 0., 1.);
          vec3 sh = sunT(ob + rd * t);
          vec3 Ls = uB.y * sh * ph * 1.2 * (exp(-od * 7.) + 0.22 * exp(-od * 1.3)) * (0.45 + 0.55 * ao);
          vec3 La = amb * (0.32 + 0.8 * hn) * (0.5 + 0.5 * exp(-od * 1.5)) * (0.4 + 0.6 * ao);
          vec3 Lc = mix(Ls + La, hor, 1. - exp(-t / 70.) * (1. - 0.22 * smoothstep(35., 90., t)));
          float ex = 1. - exp(-de * dtc * 12.);
          acc += Tr * ex * Lc;
          Tr *= 1. - ex;
          k = 0; t += dtc;
        }
        if (t > t1 || Tr < 0.04) break;
      }
      if (Tr < 0.04){ acc /= 1. - Tr; Tr = 0.; }
    }
  }
  o = uX.z > .5 ? vec4(acc / (1. + acc), 1. - Tr) : vec4(acc, 1. - Tr);
}`,fo=Q+`
in vec2 vUv; out vec4 o;
uniform vec4 uP; // dk, k count, encode
float J1(float x){
  float ax = abs(x), r;
  if (ax < 8.){ float y = x * x;
    float a1 = x * (72362614232.0 + y * (-7895059235.0 + y * (242396853.1 + y * (-2972611.439 + y * (15704.48260 + y * (-30.16036606))))));
    float a2 = 144725228442.0 + y * (2300535178.0 + y * (18583304.74 + y * (99447.43394 + y * (376.9991397 + y))));
    r = a1 / a2;
  } else { float z = 8. / ax, y = z * z, xx = ax - 2.356194491;
    float p1 = 1.0 + y * (0.183105e-2 + y * (-0.3516396496e-4 + y * (0.2457520174e-5 + y * (-0.240337019e-6))));
    float p2 = 0.04687499995 + y * (-0.2002690873e-3 + y * (0.8449199096e-5 + y * (-0.88228987e-6 + y * 0.105787412e-6)));
    r = sqrt(0.636619772 / ax) * (cos(xx) * p1 - z * sin(xx) * p2) * sign(x);
  }
  return r;
}
void main(){
  float r = (gl_FragCoord.x - .5) / 768. * 6., t = (gl_FragCoord.y - .5) / 30.;
  const float g = 9.81, sg = 7.6e-5, h = 0.03, nu = 1.4e-6, as = 0.022, af = 0.011;
  vec3 s = vec3(0.);
  int n = int(uP.y);
  for (int i = 0; i < 1024 + uZ0; i++){
    if (i >= n) break;
    float k = (float(i) + .5) * uP.x;
    float th = tanh(k * h);
    float w = sqrt((g * k + sg * k * k * k) * th);
    float gam = 2. * nu * k * k + sqrt(nu * w * .5) * k / sinh(min(2. * k * h, 40.)) + 0.04;
    float ev = cos(w * t) * exp(-gam * t) * J1(k * r) * k * k * k;
    float qs = as * as * k, qf = af * af * k;
    float As = 0.0125 * as * as * as * as * k * exp(-qs * k * .25);
    float Af = 0.012 * af * af * af * af * k * exp(-qf * k * .25);
    s += -ev * uP.x * vec3(As, As * exp(-k * k / 14400.), Af);
  }
  o = uP.z > .5 ? vec4(clamp(s / 8., -1., 1.) * .5 + .5, 1.) : vec4(s, 1.);
}`,ho=Q+`
in vec2 vUv; out vec4 o;
uniform sampler3D uN;
float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 64., 0.).r; }
float np(vec2 uv, float F, int z){ vec2 p = uv * F, i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  ivec2 a = ivec2(mod(i, F)) & 63, b = ivec2(mod(i + 1., F)) & 63;
  float v00 = texelFetch(uN, ivec3(a.x, a.y, z), 0).r, v10 = texelFetch(uN, ivec3(b.x, a.y, z), 0).r, v01 = texelFetch(uN, ivec3(a.x, b.y, z), 0).r, v11 = texelFetch(uN, ivec3(b.x, b.y, z), 0).r;
  return mix(mix(v00, v10, f.x), mix(v01, v11, f.x), f.y); }
uvec2 hs(uvec2 v){ v = v * 1664525u + 1013904223u; v.x += v.y * 1664525u; v.y += v.x * 1664525u; v ^= v >> 16u; v.x += v.y * 1664525u; v.y += v.x * 1664525u; v ^= v >> 16u; return v; }
vec2 pt(vec2 c, float N, uint salt){ vec2 w = mod(c, N); uvec2 h = hs(uvec2(w) + uvec2(salt, salt * 7u)); return c + .5 + (vec2(h & 65535u) / 65535. - .5) * 0.82; }
// distance to the nearest Voronoi edge (two pass), and a per-edge random
vec2 vor(vec2 p, float N, uint salt){
  vec2 c = floor(p), mr = vec2(0.), mc = vec2(0.); float md = 9.;
  for (int j = -1; j <= 1 + uZ0; j++) for (int i = -1; i <= 1 + uZ0; i++){ vec2 cc = c + vec2(i, j), r = pt(cc, N, salt) - p; float d = dot(r, r); if (d < md){ md = d; mr = r; mc = cc; } }
  float ed = 9., er = 0.;
  for (int j = -2; j <= 2 + uZ0; j++) for (int i = -2; i <= 2 + uZ0; i++){ vec2 cc = mc + vec2(i, j); if (cc == mc) continue; vec2 r = pt(cc, N, salt) - p;
    float d = dot(.5 * (mr + r), normalize(r - mr)); if (d < ed){ ed = d; er = fract(sin(dot(mod(cc + mc, N), vec2(12.99, 78.23)) + dot(abs(cc - mc), vec2(3.1, 7.7))) * 43758.5); } }
  return vec2(ed, er);
}
float hgt(vec2 uv, out float alb){
  vec2 wp = uv * 9. + (vec2(np(uv, 8., 0), np(uv, 8., 1)) - .5) * 0.55 + (vec2(np(uv, 24., 2), np(uv, 24., 3)) - .5) * 0.16;
  vec2 v2p = uv * 23. + (vec2(np(uv, 16., 4), np(uv, 16., 5)) - .5) * .8, v1 = vec2(0.), v2 = vec2(0.);
  for (int i = 0; i < 2 + uZ0; i++){ vec2 v = vor(i == 0 ? wp : v2p, i == 0 ? 9. : 23., i == 0 ? 3u : 11u); if (i == 0) v1 = v; else v2 = v; }
  float w1 = 0.042 * (0.6 + 0.8 * v1.y) * (0.7 + 0.6 * np(uv, 32., 6));
  float rid = exp(-pow(v1.x / w1, 2.)) * (0.55 + 0.45 * v1.y) * (0.75 + 0.5 * np(uv, 48., 7));
  float sub = exp(-pow(v2.x / 0.035, 2.)) * 0.22 * step(0.45, v2.y);
  float bump = np(uv, 96., 8) * .1 + np(uv, 296., 9) * .05;
  float cry = pow(np(uv, 1120., 10), 6.) * .25 + pow(np(uv, 2400., 11), 8.) * .2;
  alb = clamp(0.6 + 0.35 * rid + 0.1 * np(uv, 16., 12) - 0.12 * smoothstep(0.55, 0.8, np(uv, 10., 13)) + cry * .3, 0., 1.);
  return clamp(0.12 + 0.6 * rid + sub + bump + cry * .4, 0., 1.);
}
void main(){
  vec2 uv = (gl_FragCoord.xy - .5) / 1024.; float e = 1. / 1024., a0, a1;
  float hh[3]; a0 = 0.;
  for (int i = 0; i < 3 + uZ0; i++){ float al; hh[i] = hgt(uv + (i == 1 ? vec2(e, 0.) : i == 2 ? vec2(0., e) : vec2(0.)), al); if (i == 0) a0 = al; }
  float h = hh[0], hx = hh[1], hz = hh[2];
  vec2 g = vec2(hx - h, hz - h) / (12. * e) * 0.03 * 0.5;
  o = vec4(h, a0, clamp(g * 4. + .5, 0., 1.));
}`,je=Q+ze+`
in vec2 vUv; out vec4 o;
uniform sampler2D uE; uniform sampler2D uRgT; uniform sampler2D uRd; uniform sampler2D uCr;
uniform vec4 uU[8];
vec3 dec(vec4 v){ return uU[4].z > .5 ? v.rgb / max(1. - v.rgb, 1e-3) : v.rgb; }
float rdec(float v){ return uU[4].w > .5 ? (v * 2. - 1.) * 8. : v; }
void main(){
  vec4 U0 = uU[0], U1 = uU[1], U2 = uU[2], U3 = uU[3], U4 = uU[4], U5 = uU[5];
  vec2 q = vUv * 2. - 1.;
  float cy = cos(U0.y);
  vec3 fw = vec3(sin(U0.x) * cy, sin(U0.y), cos(U0.x) * cy), rt = vec3(cos(U0.x), 0., -sin(U0.x)), up = cross(fw, rt);
  vec3 d = normalize(fw + (q.x * rt + q.y * up) * U0.z);
  float T = U0.w;
  vec3 look = d, trans = vec3(0.); float F = 1., sig = 0., salt = 0., glit = 0.;
  vec3 saltC = vec3(0.);
  if (d.y < 0.){
    float t = U1.z / -d.y; vec2 p = U1.xy + d.xz * t;
    float fp = t * U5.x / max(-d.y, 0.002);  // pixel footprint along the view on the water (m)
    // ring packets
    vec2 gr = vec2(0.);
    float lod = smoothstep(0.012, 0.03, fp);
    for (int i = 0; i < 24 + uZ0; i++){
      if (float(i) >= U1.w) break;
      vec4 rr = texelFetch(uRd, ivec2(i, 0), 0);
      float age = T - rr.z; vec2 dp = p - rr.xy; float r = length(dp);
      if (age > 0. && age < 9.9 && r < uU[7].x){
        vec3 s = textureLod(uRgT, vec2(r / 6., (floor(age * 30.) + .5) / 300.), 0.).rgb;
        float sl = rr.w > 0. ? mix(rdec(s.r), rdec(s.g), lod) : rdec(s.b) * (1. - .75 * lod);
        gr += abs(rr.w) * sl * dp / max(r, 1e-3) * smoothstep(uU[7].x, uU[7].y, r);
      }
    }
    gr *= smoothstep(0.25, 0.04, fp);
    // wind patches: drifting cat's paws of capillary ripples
    vec2 wd = U2.xy, wp = p - wd * T * 0.6;
    vec2 pw = vec2(dot(wp, wd), dot(wp, vec2(-wd.y, wd.x)));
    float mk = n3(vec3(pw * vec2(0.022, 0.04), T * 0.012)) * .6 + n3(vec3(pw * 0.09, T * 0.03 + 4.)) * .4;
    float far = smoothstep(8., 80., fp);
    float m = mix(smoothstep(0.44, 0.7, mk), 0., far) * U2.z;
    float m0 = 0.06 + 0.04 * n3(vec3(p * 0.3, T * 0.1));
    float rip = max(m, m0 * U2.z * 0.5 * (1. - far));
    glit = pow(n3(vec3(p * vec2(140., 190.) - wd * T * 3., T * 2.)), 26.) * 40. * clamp(rip - 0.3, 0., 1.) * smoothstep(0.03, 0.006, fp);
    vec2 rp = vec2(dot(p, wd), dot(p, vec2(-wd.y, wd.x)));
    vec3 c0 = vec3(rp * vec2(7., 11.) - vec2(T * 3.1, 0.), T * 0.8);
    float e = 0.15, nA = n3(c0), nB = n3(c0 + vec3(e, 0., 0.)), nC = n3(c0 + vec3(0., e, 0.));
    vec2 rg = vec2(nB - nA, nC - nA) / e * vec2(7., 11.) * 0.004;
    vec3 c1 = vec3(rp * vec2(23., 31.) - vec2(T * 6.3, 0.), T * 1.7 + 5.);
    float nD = n3(c1), nE = n3(c1 + vec3(e, 0., 0.)), nF = n3(c1 + vec3(0., e, 0.));
    rg += vec2(nE - nD, nF - nD) / e * vec2(23., 31.) * 0.0011;
    rg = vec2(rg.x * wd.x - rg.y * wd.y, rg.x * wd.y + rg.y * wd.x);
    float vis = smoothstep(0.08, 0.004, fp);
    gr += rg * rip * vis * 1.4;
    sig = rip * 0.13 * (1. - vis * .7) * (0.45 + 0.9 * n3(vec3(pw * vec2(0.5, 0.15), T * 0.2 + 9.)));
    gr = clamp(gr, vec2(-.6), vec2(.6));
    vec3 n = normalize(vec3(-gr.x, 1., -gr.y));
    float cs = max(dot(-d, n), 0.);
    cs = min(cs + sig * 0.8, 1.);
    F = 0.02 + 0.98 * pow(1. - cs, 5.);
    look = reflect(d, n); look.y += sig * 1.3 * smoothstep(0.004, 0.03, sig); look.y = max(look.y, 0.0004 + abs(look.y) * .3); look = normalize(look);
    // the crust under the water, and ridges that break the surface
    vec3 irr = vec3(0.);
    irr += dec(texture(uE, vec2(0., 1.))) * 2.;
    for (int k = 0; k < 4 + uZ0; k++){ float a = float(k) * 1.5708 + U4.y; irr += dec(texture(uE, uvOf(normalize(vec3(sin(a), 0.35, cos(a)))))); }
    irr += dec(texture(uE, uvOf(normalize(vec3(sin(U4.x), 0.06, cos(U4.x)))))) * 1.5;
    irr /= 7.5;
    float alb = 0.66, h = 0.12, wl = U2.w; vec2 cg = vec2(0.);
    if (U3.w > .5) wl = clamp(0.0035 + 0.024 * (n3(vec3(p * 0.07, 3.)) * .7 + n3(vec3(p * 0.25, 5.)) * .3 - .45), 0., .03);
    if (t < 70.){
      vec2 cu = vec2(p.x * cos(U4.y) - p.y * sin(U4.y), p.x * sin(U4.y) + p.y * cos(U4.y)) / 12.;
      vec4 cr = textureLod(uCr, cu, log2(max(sqrt(fp * t * U5.x), 1e-5) / 0.0117));
      float ff = smoothstep(40., 70., t);
      alb = mix(cr.g, 0.66, ff); h = mix(cr.r, 0.2, ff); cg = (cr.ba - .5) * (1. - ff);
    } else if (U3.w > .5) h = 0.2;
    float hm = h * 0.03;
    float ew = max(fp * 0.06, 0.0007);
    salt = smoothstep(wl - ew, wl + ew, hm);
    vec4 U6 = uU[6]; vec2 cd = p - U6.xy; float ca = T - U6.z;
    salt = max(salt, U6.w * exp(-dot(cd, cd) / (.01 + .025 * clamp(ca, 0., 1.))) * smoothstep(1.7, .3, ca) * step(0., ca) * (.4 + .8 * alb));
    float glow = U4.x;
    float rel = 1. + 0.35 * dot(cg, vec2(sin(glow), cos(glow)));
    vec3 Lc = alb * irr * max(rel, 0.3);
    saltC = Lc * 0.42 * vec3(1., 0.985, 0.97);
    trans = Lc * 0.15 * vec3(0.84, 0.93, 0.95) * (1. - F) * mix(1.25, 0.06, smoothstep(2.2, 9., t));
    sig = mix(sig, 0., salt);
  }
  vec2 uv = uvOf(look);
  float dv = sig * 0.35;
  vec3 sky = 0.5 * (dec(texture(uE, uv + vec2(0., dv))) + dec(texture(uE, max(uv - vec2(0., dv), vec2(-1., 0.002)))));
  if (glit > 0.01) sky += glit * (1. - salt) * dec(texture(uE, vec2(uv.x, 0.03)));
  float fu = fract(uv.x - U3.z + .5) - .5, fe = (uv.y - U3.w * 0. - U5.y) / 0.03;
  sky += U3.y * vec3(0.9, 0.85, 1.) * exp(-fu * fu / 0.0006 - fe * fe) * 0.6;
  vec3 col = d.y < 0. ? mix(F * sky + trans, saltC, salt) : sky;
  col *= U3.x;
  col = clamp((col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14), 0., 1.);
  col = pow(col, vec3(1. / 2.2));
  float gn = fract(sin(dot(gl_FragCoord.xy + U5.z, vec2(12.9898, 78.233))) * 43758.5453) - .5;
  col += gn * 0.012;
  o = vec4(col, 1.);
}`,be=t=>[[`uniform int uZ0;
`,`uniform int uZ0; uniform sampler2D uBs;
#define nfT(x) ((x) / max(1. - (x), vec3(1e-3)) / uX.z)
#define nfE(x) ((x) * uX.z / (1. + (x) * uX.z))
#define nfB() nfT(texelFetch(uBs, ivec2(gl_FragCoord.xy), 0).rgb)
`],["o = vec4(L, dot(Tv, vec3(.3, .5, .2)));","o = vec4(L * uX.z / (1. + L * uX.z), dot(Tv, vec3(.3, .5, .2)));"],["o = uX.z > .5 ? vec4(cc / (1. + cc), ca) : vec4(cc, ca);","o = vec4(nfE(cc + nfB() * (1. - ca)), 1.);"],["o = uX.z > .5 ? vec4(col / (1. + col), 1.) : vec4(col, 1.);","o = vec4(col * uX.z / (1. + col * uX.z), 1.);"],["o = uX.z > .5 ? vec4(acc / (1. + acc), 1. - Tr) : vec4(acc, 1. - Tr);","o = vec4(nfE(acc + nfB() * Tr), 1.);"],["vec3 skyAt(vec3 d){ return textureLod(uSky, uvOf(d), 0.).rgb; }","vec3 skyAt(vec3 d){ return nfT(textureLod(uSky, uvOf(d), 0.).rgb); }"],["vec3 skyAt(vec3 d){ return texture(uSky, uvOf(d)).rgb; }","vec3 skyAt(vec3 d){ return nfT(texture(uSky, uvOf(d)).rgb); }"],["vec3 zen = textureLod(uSky, vec2(0., 1.), 0.).rgb,","vec3 zen = nfT(textureLod(uSky, vec2(0., 1.), 0.).rgb),"],["vec3 col = S.rgb;","vec3 col = nfT(S.rgb);"],["return uU[4].z > .5 ? v.rgb / max(1. - v.rgb, 1e-3) : v.rgb;","return v.rgb / max(1. - v.rgb, vec3(1e-3)) / uU[4].z;"],["return uC[2].z > .5 ? v.rgb / max(1. - v.rgb, 1e-3) : v.rgb;","return v.rgb / max(1. - v.rgb, vec3(1e-3)) / uC[2].z;"]].reduce((s,[c,n])=>s.split(c).join(n),t),me=qe==="None"?null:(()=>{const h=[0,45,78,102,135,180].map(U=>U*F),l=(U,Y)=>je.slice(je.indexOf(U),je.indexOf(Y)),i=Q+`
in vec2 vUv; out vec4 o;
uniform sampler2D uPr;
float capI(vec3 ro, vec3 rd, vec3 pa, vec3 pb, float r){
  vec3 ba = pb - pa, oa = ro - pa;
  float baba = max(dot(ba, ba), 1e-8), bard = dot(ba, rd), baoa = dot(ba, oa), rdoa = dot(rd, oa), oaoa = dot(oa, oa);
  float a = baba - bard * bard, b = baba * rdoa - baoa * bard, c = baba * oaoa - baoa * baoa - r * r * baba, h = b * b - a * c;
  if (h >= 0. && a > 1e-9){ float t = (-b - sqrt(h)) / a, y = baoa + t * bard; if (y > 0. && y < baba) return t; }
  float t0 = 1e9;
  for (int k = 0; k < 2 + uZ0; k++){ vec3 q = k == 0 ? oa : ro - pb; float bb = dot(rd, q), cc = dot(q, q) - r * r, hh = bb * bb - cc; if (hh > 0.) t0 = min(t0, -bb - sqrt(hh)); }
  return t0 < 1e8 ? t0 : -1.;
}
void main(){
  ivec2 px = ivec2(gl_FragCoord.xy);
  int cx = px.x / 128, cy = px.y / 128, hf = cy >= 6 ? 1 : 0, row = (cy - hf * 6) * 16 + cx;
  vec2 lc = vec2(px - ivec2(cx, cy) * 128);
  int n = int(texelFetch(uPr, ivec2(0, row), 0).x);
  vec4 acc = vec4(0.);
  for (int s = 0; s < 4 + uZ0; s++){
    vec2 sp = (lc + (vec2(float(s & 1), float(s >> 1)) + .5) * .5) / 128.;
    vec3 ro = vec3((sp.x - .5) * 1.3, sp.y * 1.3 - .04, 4.), rd = vec3(0., 0., -1.);
    if (ro.y < 0.) continue;   // under the brine
    float tb = 1e9, pk = 0., dk = 0., br = 0., ao = 1., st = 0.; vec3 nn = vec3(0.);
    for (int i = 0; i < 32 + uZ0; i++){
      if (i >= n) break;
      vec4 A = texelFetch(uPr, ivec2(1 + i * 5, row), 0), B = texelFetch(uPr, ivec2(2 + i * 5, row), 0), C = texelFetch(uPr, ivec2(3 + i * 5, row), 0);
      float t; vec3 nr, lp;
      if (A.x < .5){
        t = capI(ro, rd, B.xyz, C.xyz, B.w);
        if (t <= 0. || t >= tb) continue;
        vec3 p = ro + rd * t, ba = C.xyz - B.xyz; float u = clamp(dot(p - B.xyz, ba) / max(dot(ba, ba), 1e-8), 0., 1.);
        nr = normalize(p - B.xyz - ba * u); lp = vec3(mix(A.z, A.w, u), p.y, 0.);
      } else {
        vec4 D = texelFetch(uPr, ivec2(3 + i * 5 + 1, row), 0), E = texelFetch(uPr, ivec2(3 + i * 5 + 2, row), 0);
        mat3 M = mat3(C.x, D.x, E.x, C.y, D.y, E.y, C.z, D.z, E.z);   // rows: axis / radius
        vec3 o2 = M * (ro - B.xyz), d2 = M * rd;
        float a = dot(d2, d2), b = dot(o2, d2), c = dot(o2, o2) - 1., h = b * b - a * c;
        if (h <= 0.) continue;
        t = (-b - sqrt(h)) / a;
        if (t <= 0. || t >= tb) continue;
        lp = o2 + d2 * t; nr = normalize(transpose(M) * lp);
      }
      tb = t; nn = nr;
      int m = int(A.y + .5); float sh = fract(sin(dot(floor(lp.xy * vec2(9., 23.)), vec2(12.99, 78.23))) * 4375.5);
      pk = 0.; dk = 0.; br = 0.; ao = 1.; st = 0.;
      if (m == 0){ // body: a blush deepening to the breast, paler belly, carmine streaks at the breast for those that have them
        pk = .3 + .25 * smoothstep(.1, .9, lp.x) - .18 * smoothstep(0., -.8, lp.y);
        st = smoothstep(.35, .85, lp.x) * smoothstep(-.6, .2, lp.y) * (.55 + .45 * sh);
        ao = .7 + .3 * smoothstep(-.95, .1, lp.y);
      } else if (m == 1){ // folded wing: deep coverts, the black flight feathers a wedge at the rear, streaked scapulars on top
        pk = .4 + .5 * smoothstep(.5, .05, abs(lp.y + .12)) * smoothstep(-.55, .1, lp.x) * smoothstep(.95, .45, lp.x) * (.75 + .25 * sh);   // the coverts: a band along the folded wing
        dk = smoothstep(-.42, -.62, lp.x) * smoothstep(.12, -.18, lp.y) * smoothstep(-.98, -.7, lp.y);
        st = smoothstep(.35, .85, lp.y) * smoothstep(-.7, .2, lp.x) * (.4 + .6 * sh);
        ao = .82 + .18 * smoothstep(-.8, .4, lp.y);
      } else if (m == 2){ // tail plumes
        pk = .4; st = smoothstep(0., .8, lp.y) * (.4 + .6 * sh); ao = .85;
        dk = smoothstep(-.3, -.8, lp.y) * smoothstep(.2, -.5, lp.x) * .8;
      } else if (m == 3){ pk = .26 + .14 * lp.x; st = smoothstep(.22, 0., lp.x) * .8; ao = .8 + .2 * smoothstep(0., .15, lp.x); }   // neck
      else if (m == 4){ pk = .34; }                                                              // head
      else if (m == 5){ dk = smoothstep(.42, .56, lp.x); br = .5 * (1. - dk); }                   // bill
      else if (m == 6){ br = 1.; ao = mix(.55, 1., smoothstep(.6, .4, lp.y)); }                  // leg
      else { br = 1.; pk = 1.; ao = mix(.6, 1., smoothstep(.6, .45, lp.y)); }                    // joint, foot
    }
    if (tb > 1e8) continue;
    acc += hf == 0 ? vec4(pk, dk, br, 1.) : vec4(nn.xy * .5 + .5, ao, st);
  }
  o = acc * .25;
}`,M=Q+ze+`
uniform vec4 uU[8]; uniform sampler2D uE; uniform sampler2D uBd; uniform int uMd; uniform vec4 uV;
out vec2 vS;
flat out vec4 vP; flat out vec4 vC; flat out vec4 vD; flat out vec3 vLh;
flat out vec3 vLg; flat out vec3 vLa; flat out vec3 vLs; flat out vec3 vLn; flat out vec3 vLu; flat out vec3 vLd;
vec3 dec(vec4 v){ return uU[4].z > .5 ? v.rgb / max(1. - v.rgb, 1e-3) : v.rgb; }
vec3 env(vec3 d){ return dec(textureLod(uE, uvOf(normalize(d)), 0.)); }
void main(){
  int i = gl_InstanceID, v = gl_VertexID;
  int j = i < int(uV.z) ? 1024 + 2 * i : 2 * (i - int(uV.z));   // the far line sits in rows 1-3 (sent once), the band in row 0
  vec4 b0 = texelFetch(uBd, ivec2(j & 1023, j >> 10), 0), b1 = texelFetch(uBd, ivec2((j + 1) & 1023, (j + 1) >> 10), 0);
  vec4 U0 = uU[0], U1 = uU[1];
  vec3 ro = vec3(U1.x, U1.z, U1.y);
  vec2 dh = b0.xy - U1.xy; float dist = length(dh); dh /= max(dist, 1e-3);
  vec3 rb = vec3(dh.y, 0., -dh.x);
  vec2 cn = vec2(float(v & 1), float(v >> 1));
  vec2 ls = uMd == 0 ? vec2(mix(-.9, .9, cn.x), mix(.04, -1.62, cn.y)) : vec2(mix(-.65, .65, cn.x), mix(-.04, 1.26, cn.y));
  vS = ls;
  vec3 wp = vec3(b0.x, 0., b0.y) + rb * ls.x * b0.z + vec3(0., ls.y * b0.z, 0.);
  float cy = cos(U0.y);
  vec3 fw = vec3(sin(U0.x) * cy, sin(U0.y), cos(U0.x) * cy), rt = vec3(cos(U0.x), 0., -sin(U0.x)), up = cross(fw, rt), rel = wp - ro;
  gl_Position = vec4(dot(rel, rt) / U0.z, dot(rel, up) / U0.z, 0., dot(rel, fw));
  vP = vec4(b0.xy, b0.z, dist); vC = b1; vD = vec4(dh, b0.w, 0.);
  // the light on a bird: an ambient cube from the sky map, the glow side, the shadow side, across, above, and from below
  // the brine (the mirror gives back the low sky, a little dimmer)
  float ga = uU[4].x; vec3 g = vec3(sin(ga), 0., cos(ga)), s = vec3(g.z, 0., -g.x);
  vLg = .5 * (env(g + vec3(0., .1, 0.)) + env(g + vec3(0., .45, 0.)));
  vLa = .5 * (env(-g + vec3(0., .1, 0.)) + env(-g + vec3(0., .45, 0.)));
  vLs = .5 * (env(s + vec3(0., .1, 0.)) + env(s + vec3(0., .45, 0.)));
  vLn = .5 * (env(-s + vec3(0., .1, 0.)) + env(-s + vec3(0., .45, 0.)));
  vLu = .5 * (env(vec3(0., 1., 0.)) + env(vec3(0., 1., 0.) + g * .9));
  vLd = (vLg + vLa + vLs + vLn) * .25 * .42;
  vLh = env(vec3(dh.x, .06, dh.y));   // the sky just above the horizon behind the bird
}`,b=Q+ze+`
in vec2 vS; out vec4 o;
flat in vec4 vP; flat in vec4 vC; flat in vec4 vD; flat in vec3 vLh;
flat in vec3 vLg; flat in vec3 vLa; flat in vec3 vLs; flat in vec3 vLn; flat in vec3 vLu; flat in vec3 vLd;
uniform sampler2D uE; uniform sampler2D uRgT; uniform sampler2D uRd; uniform sampler2D uAt;
uniform vec4 uU[8]; uniform int uMd; uniform vec4 uV;
${l("vec3 dec(","void main(){")}
// adult Chilean, Andean, James's, and the grey young: plumage pink, coverts, streaks (rgb, strength), legs, joints, bill
const vec3 PK[4] = vec3[4](vec3(.86, .5, .54), vec3(.88, .62, .66), vec3(.92, .7, .71), vec3(.6, .58, .56));
const vec3 CV[4] = vec3[4](vec3(.8, .17, .27), vec3(.8, .3, .42), vec3(.86, .38, .44), vec3(.42, .39, .36));
const vec4 SK[4] = vec4[4](vec4(.8, .25, .33, .25), vec4(.56, .16, .34, .65), vec4(.82, .07, .16, .9), vec4(.33, .32, .31, .35));
const vec3 LG[4] = vec3[4](vec3(.25, .27, .28), vec3(.5, .4, .12), vec3(.42, .1, .07), vec3(.22, .22, .23));
const vec3 JN[4] = vec3[4](vec3(.55, .2, .25), vec3(.52, .4, .13), vec3(.45, .11, .08), vec3(.26, .25, .25));
const vec3 BL[4] = vec3[4](vec3(.84, .7, .68), vec3(.86, .72, .14), vec3(.92, .78, .1), vec3(.5, .5, .5));
vec4 bird(vec2 st, vec2 gx, vec2 gy){
  float fl = vC.z > .5 ? -1. : 1.;
  vec2 uc = vec2(st.x * fl / 1.3 + .5, (st.y + .04) / 1.3);
  float inb = smoothstep(0., .05, uc.x) * smoothstep(1., .95, uc.x) * smoothstep(0., .03, uc.y) * smoothstep(1., .95, uc.y);   // nothing leaks in from the next cell
  vec2 a = vec2((vC.x + clamp(uc.x, 0., 1.)) / 16., (vC.y + clamp(uc.y, 0., 1.)) / ${2*6}.), k = vec2(fl / (1.3 * 16.), 1. / (1.3 * ${2*6}.));
  vec4 M = textureGrad(uAt, a, gx * k, gy * k), S = textureGrad(uAt, a + vec2(0., .5), gx * k, gy * k);
  float cv = M.a * inb;
  vec3 m = M.rgb / max(M.a, 1e-4); vec4 sh = S / max(M.a, 1e-4);
  vec2 nxy = sh.xy * 2. - 1.; nxy.x *= fl;
  float nz = sqrt(max(1. - dot(nxy, nxy), 0.));
  vec3 tc = -vec3(vD.x, 0., vD.y), n = nxy.x * vec3(vD.y, 0., -vD.x) + vec3(0., nxy.y, 0.) + nz * tc;
  float ga = uU[4].x; vec3 g = vec3(sin(ga), 0., cos(ga)), s = vec3(g.z, 0., -g.x);
  float a1 = dot(n, g), a2 = dot(n, s), a3 = n.y;
  vec3 L = a1 * a1 * (a1 > 0. ? vLg : vLa) + a2 * a2 * (a2 > 0. ? vLs : vLn) + a3 * a3 * (a3 > 0. ? vLu : vLd);
  L += vLg * pow(1. - nz, 3.) * max(dot(-tc, g), 0.) * .32 * (1. - .6 * m.z);   // the afterglow behind a bird shines through its edges
  int sp = int(vC.w + .5);
  vec3 wh = sp == 3 ? vec3(.58, .56, .54) : vec3(.8, .76, .76);
  vec3 pl = mix(mix(wh, PK[sp], clamp(m.x / .5, 0., 1.) * (.75 + .5 * vD.z)), CV[sp], smoothstep(.55, 1., m.x));
  pl = mix(pl, SK[sp].rgb, clamp(sh.w * SK[sp].w, 0., 1.));
  vec3 bc = m.z > .75 ? mix(LG[sp], JN[sp], clamp(m.x, 0., 1.)) : BL[sp];
  vec3 al = mix(pl, bc, clamp(m.z * 2., 0., 1.));
  al = mix(al, vec3(.025, .022, .024), clamp(m.y, 0., 1.)) * (.92 + .16 * vD.z) * sh.z;
  vec3 c = al * L;
  // no bird outshines the sky behind it: a white bird lit by the glow at your back stays a pale form, never a lamp
  float lc = dot(c, vec3(.25, .6, .15)), lh = dot(vLh, vec3(.25, .6, .15));
  c *= lc > lh ? pow(lh / lc, .85) : 1.;
  return vec4(c, cv);
}
void main(){
  vec4 U0 = uU[0], U1 = uU[1], U2 = uU[2], U3 = uU[3], U4 = uU[4], U5 = uU[5];
  float T = U0.w;
  vec3 col; float al;
  if (uMd == 0){
    // the image: this pixel's ray off the water, bent by the mirror's own slope, against the bird's upright plane
    vec2 q = gl_FragCoord.xy / uV.x * 2. - 1.;
    float cy = cos(U0.y);
    vec3 fw = vec3(sin(U0.x) * cy, sin(U0.y), cos(U0.x) * cy), rt = vec3(cos(U0.x), 0., -sin(U0.x)), up = cross(fw, rt);
    vec3 d = normalize(fw + (q.x * rt + q.y * up) * U0.z);
    d.y = min(d.y, -1e-4);
    float t = U1.z / -d.y; vec2 p = U1.xy + d.xz * t;
    float fp = t * U5.x / max(-d.y, 0.002);
    vec3 look = d; float F = 1., sig = 0., glit = 0.;
${l("    // ring packets","    // the crust under the water")}
    vec3 P0 = vec3(p.x, 0., p.y), A3 = vec3(vP.x, 0., vP.y), N3 = vec3(vD.x, 0., vD.y);
    vec3 lk = reflect(d, n);   // the slope's reflection without the sky's upward smear, which here would shift the bird
    float den = dot(lk, N3), tt = dot(A3 - P0, N3) / max(den, 1e-4);
    vec3 H = P0 + lk * tt;
    vec2 st = den > 1e-4 ? vec2(dot(H - A3, vec3(vD.y, 0., -vD.x)), H.y) / vP.z : vec2(9.);
    vec2 gx = dFdx(vS) * vec2(1., -1.), gy = dFdy(vS) * vec2(1., -1.);   // the image's own footprint: its slices stay sharp
    float dv = sig * .12 * tt / vP.z * (uV.y > .5 ? 2.5 : 1.);
    vec4 b = bird(st, gx, gy + vec2(0., dv));   // where the mirror is ruffled the image smears up and down, as the sky's does
    al = b.a; col = F * b.rgb;
    al *= uV.y > .5 ? .78 : 1.;
  } else {
    vec4 b = bird(vS, dFdx(vS), dFdy(vS));
    col = b.rgb; al = b.a;
  }
  if (al < .002) discard;
${l("  col *= U3.x;","  o = vec4(col, 1.);")}
  o = vec4(col * al, al);
}`,v=e.__f501||(e.__f501=(()=>{const U=(C,w)=>{const E=e.createShader(w);return e.shaderSource(E,C),e.compileShader(E),E},Y=U(Mt,e.VERTEX_SHADER),S={},W=e.__c501&&!e.__c501.hf;for(const[C,w,E]of[["bake",Y,i],["draw",null,b]]){const _=e.createProgram(),m=U(W&&!w?be(E):E,e.FRAGMENT_SHADER),R=w||U(W?be(M):M,e.VERTEX_SHADER);e.attachShader(_,R),e.attachShader(_,m),e.linkProgram(_),S[C]={p:_,f:m,v:R}}return e.flush(),{P:S,ready:!1,nf:W}})());return{NP:16,NV:6,CP:128,PRW:161,VIEWS:h,FK:v,FVS:M,FFS:b}})(),it=ae==="Towering cumulus"&&!oe,lt=t=>t.replace(`#version 300 es
`,`#version 300 es
#define TUR
`),g=e.__c501||(e.__c501=(()=>{e.getExtension("KHR_parallel_shader_compile");const t=!!e.getExtension("EXT_color_buffer_float"),s=t||!!e.getExtension("EXT_color_buffer_half_float"),c=(m,R)=>{const L=e.createShader(R);return e.shaderSource(L,m),e.compileShader(L),L},n=c(Mt,e.VERTEX_SHADER),h={sky:io,env:lo,[it?"env2t":"env2"]:it?lt(Ue):Ue,ring:fo,crust:ho,main:je},l={};if(!s)for(const m in h)h[m]=be(h[m]);for(const m in h){const R=e.createProgram(),L=c(h[m],e.FRAGMENT_SHADER);e.attachShader(R,n),e.attachShader(R,L),e.linkProgram(R),l[m]={p:R,f:L}}e.flush();const i=64,M=new Uint8Array(i*i*i);let b=2654435769;for(let m=0;m<M.length;m++)b=Math.imul(b^b>>>15,739982445),b=Math.imul(b^b>>>12,695872825),b^=b>>>15,M[m]=b&255;const v=m=>{if(!e.getProgramParameter(l[m].p,e.LINK_STATUS))throw new Error("501 "+m+": "+e.getShaderInfoLog(l[m].f)+e.getProgramInfoLog(l[m].p));const R=l[m].p,L={};l[m]=L,L.p=R;const J=e.getProgramParameter(R,e.ACTIVE_UNIFORMS);for(let Z=0;Z<J;Z++){const B=e.getActiveUniform(R,Z).name.replace("[0]","");L[B]=e.getUniformLocation(R,B)}e.useProgram(R),["uN","uSky","uD","uE","uRgT","uRd","uCr","uBs"].forEach((Z,B)=>{L[Z]&&e.uniform1i(L[Z],B)})};for(const m in l)v(m);const U=m=>{const R=m?"env2t":"env2";if(!l[R]){const L=e.createProgram(),J=c(s?m?lt(Ue):Ue:be(m?lt(Ue):Ue),e.FRAGMENT_SHADER);e.attachShader(L,n),e.attachShader(L,J),e.linkProgram(L),l[R]={p:L,f:J},v(R)}return l[R]},Y=e.createVertexArray(),S=(m,R,L,J,Z,B,se,H)=>{const te=e.createTexture();return e.bindTexture(e.TEXTURE_2D,te),e.texImage2D(e.TEXTURE_2D,0,L,m,R,0,J,Z,H||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,B),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,B===e.NEAREST?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,se),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,se===e.REPEAT&&R===m?e.REPEAT:e.CLAMP_TO_EDGE),te},W=m=>{const R=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,R),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,m,0),R},C=e.createTexture();e.bindTexture(e.TEXTURE_3D,C),e.texImage3D(e.TEXTURE_3D,0,e.R8,i,i,i,0,e.RED,e.UNSIGNED_BYTE,M),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const m of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,m,e.REPEAT);const w={P:l,env2:U,vao:Y,tN:C,nd:M,tex:S,fbo:W,fl:t,hf:s};e.bindVertexArray(Y),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE);const E=()=>{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,C)};w.ringEnc=s?0:1,w.tRing=s?S(768,300,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):S(768,300,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE);let _=W(w.tRing);return e.viewport(0,0,768,300),e.useProgram(l.ring.p),e.uniform4f(l.ring.uP,.45,700,w.ringEnc,0),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(_),w.tCr=S(1024,1024,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),_=W(w.tCr),e.viewport(0,0,1024,1024),e.useProgram(l.crust.p),E(),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(_),e.bindTexture(e.TEXTURE_2D,w.tCr),e.generateMipmap(e.TEXTURE_2D),w.tRd=S(24,1,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),w.tD=S(32,10,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,null),w})());if(!g.hf&&me&&!me.FK.nf){const t=me.FK.P.draw,s=(l,i)=>{const M=e.createShader(i);return e.shaderSource(M,l),e.compileShader(M),M};e.deleteProgram(t.p),e.deleteShader(t.f),e.deleteShader(t.v);const c=e.createProgram(),n=s(be(me.FFS),e.FRAGMENT_SHADER),h=s(be(me.FVS),e.VERTEX_SHADER);e.attachShader(c,h),e.attachShader(c,n),e.linkProgram(c),me.FK.P.draw={p:c,f:n,v:h},me.FK.nf=!0}const I=g.P,_t=re>450,uo=_t?"big":re>300?"mid":"small",k={},ft=g.fl?0:1;{const t=e.getParameter(e.MAX_TEXTURE_SIZE);k.w=Math.min(_t?g.fl?4096:2048:uo==="mid"?2048:1024,t),k.h=k.w/4,k.tE=g.fl?g.tex(k.w,k.h,e.R11F_G11F_B10F,e.RGB,e.HALF_FLOAT,e.LINEAR,e.REPEAT):g.hf?g.tex(k.w,k.h,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.REPEAT):g.tex(k.w,k.h,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT),k.fE=g.fbo(k.tE),k.tS=g.hf?g.tex(256,96,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.REPEAT):g.tex(256,96,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT),k.fS=g.fbo(k.tS);const s=!g.hf,c=new Float32Array(32*10*4);Ae.slice(0,6).forEach((v,U)=>{c.set([v.x,v.z,v.rad,v.top],U*4),c.set([v.anvil,0,0,0],(32+U)*4)}),Me.slice(0,6).forEach((v,U)=>{c.set([v[0],v[1],v[2],v[3]],(64+U)*4),c.set([v[4],v[5],0,0],(96+U)*4)}),e.bindVertexArray(g.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,g.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,32,10,e.RGBA,e.FLOAT,c),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,g.tN);const n=22,h=v=>{e.uniform4f(v.uA,ot[0],ot[1],ot[2],ao),e.uniform4f(v.uB,3.66,n,Re?0:.0042,Ge/F)};e.bindFramebuffer(e.FRAMEBUFFER,k.fS),e.viewport(0,0,256,96),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,g.tRing),e.useProgram(I.sky.p),h(I.sky),e.uniform1i(I.sky.uMd,0),s&&e.uniform4f(I.sky.uX,0,0,ge,0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,k.fE),e.viewport(0,0,k.w,k.h),e.useProgram(I.env.p),h(I.env),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,k.tS),e.uniform4f(I.env.uC,at,ke,Tt,Re?1:De==="Blue hour"?.25:0),e.uniform4fv(I.env.uAc,At),e.uniform4f(I.env.uMw,Re?1:0,Re?1:0,Ie?1:0,Ie?.35:0),e.uniform4fv(I.env.uRg,Se),e.uniform1i(I.env.uLoop,4),e.uniform4f(I.env.uX,Math.min(Ae.length,6),Math.min(Me.length,6),ft&&s?ge:0,Math.PI/2/k.h*1.1),e.uniform4f(I.env.uGp,rt[0],rt[1],rt[2],0),e.uniform4f(I.env.uGc,nt[0],nt[1],nt[2],0),e.uniform4f(I.env.uWd,Math.cos(de),Math.sin(de),k.w,ue),e.drawArrays(e.TRIANGLES,0,3);const l=g.env2(it);e.useProgram(l.p),h(l),e.uniform4fv(l.uRg,Se),e.uniform1i(l.uLoop,4),e.uniform4f(l.uCl,so,Ve,Oe,co),e.uniform4f(l.uWd,Math.cos(de),Math.sin(de),ae==="Towering cumulus"?0:1,0),e.uniform4f(l.uX,Math.min(Ae.length,6),Math.min(Me.length,6),ft&&s?ge:0,Math.PI/2/k.h*1.1);let i=null,M=null;s?(e.activeTexture(e.TEXTURE7),i=g.tex(k.w,k.h,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,e.CLAMP_TO_EDGE),M=g.fbo(i),e.bindTexture(e.TEXTURE_2D,k.tE),e.activeTexture(e.TEXTURE1)):(e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA)),e.drawArrays(e.TRIANGLES,0,3);const b=I.sky;e.useProgram(b.p),h(b),e.uniform1i(b.uMd,1),e.uniform4fv(b.uRg,Se),e.uniform4f(b.uMw,0,0,0,Ie?.35:0),e.uniform4f(b.uX,0,Math.min(Me.length,6),ft&&s?ge:0,Math.PI/2/k.h*1.1),s&&(e.bindFramebuffer(e.FRAMEBUFFER,k.fE),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,i),e.activeTexture(e.TEXTURE1)),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),s&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE1),e.deleteFramebuffer(M),e.deleteTexture(i)),e.bindFramebuffer(e.FRAMEBUFFER,null),k.enc=s?ge:0}const We=Math.tan(Xe[2]*F),Pt=Xe[1]*F,Dt=Xe[0],vo={yaw:0,pitch:0,x:0,y:0,z:0},A={yaw:X,pitch:Pt,x:0,z:0,eye:Dt},Ft=()=>{const t=D.view||vo;A.yaw=X+(t.yaw||0),A.pitch=Math.max(-1.25,Math.min(1.25,Pt+(t.pitch||0)));const s=t.x||0,c=t.z||0,n=Math.hypot(s,c),h=n>40?40/n:1;A.x=s*h,A.z=c*h,A.eye=Math.max(.4,Math.min(3,Dt+(t.y||0)))};Ft();const mo=(t,s)=>{const c=t*2-1,n=1-s*2,h=Math.cos(A.pitch),l=[Math.sin(A.yaw)*h,Math.sin(A.pitch),Math.cos(A.yaw)*h],i=[Math.cos(A.yaw),0,-Math.sin(A.yaw)],M=[l[1]*i[2]-l[2]*i[1],l[2]*i[0]-l[0]*i[2],l[0]*i[1]-l[1]*i[0]],b=[0,1,2].map(U=>l[U]+(c*i[U]+n*M[U])*We),v=Math.hypot(b[0],b[1],b[2]);return b.map(U=>U/v)},po=(t,s,c)=>{const n=mo(t,s),h=Math.hypot(n[0],n[2])||1,l=Math.max(1.2,n[1]<-.02?Math.min(A.eye/-n[1],c):c*.8);return{x:A.x+n[0]/h*l,z:A.z+n[2]/h*l,dist:l}},Le=[],Ze=[],Ke=[],St=new Float32Array(24*4);let q=0,Ye=0,Nt=5+r()*6,ee=null,$e=[];const ht=(t,s,c,n)=>{if(Le.push({x:t,z:s,t0:c,a:n}),Le.length>24){const h=Le.findIndex(l=>l.a<0);Le.splice(h>=0?h:0,1)}},Ct=(t,s)=>{const c=po(t,s,38);Ze.push({x:c.x,z:c.z,at:q+Math.min(.5,.18+c.dist*.035),a:1.3+.7*r(),dist:c.dist})},Bt=(t,s,c)=>{const n=g.nd,h=Math.floor(t),l=Math.floor(s),i=Math.floor(c),M=w=>w*w*(3-2*w),b=M(t-h),v=M(s-l),U=M(c-i),Y=(w,E,_)=>n[(w&63)+64*((E&63)+64*(_&63))]/255,S=(w,E,_)=>Y(h+w,l+E,i+_),W=(w,E)=>S(0,w,E)+(S(1,w,E)-S(0,w,E))*b,C=w=>W(0,w)+(W(1,w)-W(0,w))*v;return C(0)+(C(1)-C(0))*U},xo=(t,s)=>{g.fCr?e.bindFramebuffer(e.FRAMEBUFFER,g.fCr):g.fCr=g.fbo(g.tCr);const c=ue*7.3%G,n=(t*Math.cos(c)-s*Math.sin(c))/12,h=(t*Math.sin(c)+s*Math.cos(c))/12,l=new Uint8Array(4);return e.readPixels((n%1+1)%1*1024|0,(h%1+1)%1*1024|0,1,1,e.RGBA,e.UNSIGNED_BYTE,l),e.bindFramebuffer(e.FRAMEBUFFER,null),l[0]/255},wo=(t,s)=>Te!=="Dry crust and puddles"?kt:Math.min(.03,Math.max(0,.0035+.024*(Bt(t*.07,s*.07,3)*.7+Bt(t*.25,s*.25,5)*.3-.45)))-xo(t,s)*.03,pe=[];let Xt=[0,0,-100,0];const go=(t,s,c)=>{const n=wo(t,s),h=Math.max(.15,1-c/40);if(n<8e-4)return D.sound.hit("click",.3*h),!1;const l=Math.hypot(t-A.x,s-A.z)||1,i=(t-A.x)/l,M=(s-A.z)/l,b=n<.006?.6:n<.02?.78:1,v=[],U=9.81,Y=(E,_,m,R,L,J)=>{const Z=Math.sin(_),B=Math.cos(_),se=Z*m+i*.3,H=B*m+M*.3,te=.004;v.push(t+Z*E,te,s+B*E,L,se,R,H,(R+Math.sqrt(R*R+2*U*te))/U,J)},S=10+(r()*4|0),W=7+(r()*6|0);let C=r()*G;for(let E=0;E<S;E++){C+=G/S*(.4+1.2*r());const _=1+.3*(Math.sin(C)*i+Math.cos(C)*M),m=(.6+.6*r())*_,R=(.75+.55*r())*m,L=(1+.55*r())*m*b,J=.03+.025*r(),Z=C+(r()-.5)*.12;for(let B=0;B<4;B++){const se=[1,.78,.56,.34][B]*(.92+.16*r());Y(J,B?Z:C,R*(.82+.18*se),L*se,B?(.004+.0025*B)*(.8+.4*r()):.003+.0015*r(),B?.45:.8)}}for(let E=0;E<W;E++)Y(.04+.03*r(),r()*G,1.1+1.1*r(),(.9+.7*r())*b,.002+.0015*r(),.85);const w=[];for(let E=0;E<v.length;E+=9)v[E+3]<.0046&&w.push(E);w.sort(()=>r()-.5);for(const E of w.slice(0,9+(r()*3|0))){const _=v[E+7];Ke.push({x:v[E]+v[E+4]*_,z:v[E+2]+v[E+6]*_,at:q+_,a:-(.16+.14*r())})}return pe.push({t0:q,P:v}),pe.length>3&&pe.shift(),Xt=[t,s,q,n<.02?.6:.85],D.sound.hit("noise",.32*h,{cutoff:380+260*r(),dur:.16}),D.sound.hit("click",.12*h),!0};let Je=!1;const yo=()=>{const t=D.input,s=t.taps();t.down?Je||(Je=!0,Ct(t.x,t.y)):Je?Je=!1:s.length&&Ct(s[0].x,s[0].y)};let qt=1.5+r()*2;const It=Q+ze+`
layout(location = 0) in vec4 aP; layout(location = 1) in vec4 aV;
uniform vec4 uC[3];   // yaw, pitch, tanH, mirrored | cam x, cam z, eye, size px | glow azimuth, exposure, encoding, shutter s
uniform sampler2D uE;
out vec2 vL; flat out vec4 vG; flat out vec3 vA; flat out vec4 vR;
vec3 dec(vec4 v){ return uC[2].z > .5 ? v.rgb / max(1. - v.rgb, 1e-3) : v.rgb; }
void main(){
  float cy = cos(uC[0].y);
  vec3 fw = vec3(sin(uC[0].x) * cy, sin(uC[0].y), cos(uC[0].x) * cy), rt = vec3(cos(uC[0].x), 0., -sin(uC[0].x)), up = cross(fw, rt);
  vec3 P = aP.xyz, V = aV.xyz;
  if (uC[0].w > .5){ P.y = -P.y; V.y = -V.y; }
  vec3 v = P - vec3(uC[1].x, uC[1].z, uC[1].y);
  float z = dot(v, fw), px = uC[1].w * .5, k = px / (max(z, 1e-3) * uC[0].z);
  vec3 dv = V * uC[2].w * .5;   // the streak it draws in the shutter time
  vec2 A = vec2(dot(v - dv, rt), dot(v - dv, up)) * k, B = vec2(dot(v + dv, rt), dot(v + dv, up)) * k;
  vec2 dd = B - A; float L = length(dd); vec2 ax = L > 1e-3 ? dd / L : vec2(0., 1.), pr = vec2(-ax.y, ax.x);
  float wt = aP.w * 2. * k, wd = max(wt, 1.6);           // its true width in px, and the width it is drawn at
  vec2 cn = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)) * 2. - 1.;
  float hl = L * .5 + wd * .5 + 1., hw = wd * .5 + 1.;
  vL = vec2(cn.x * hw, cn.y * hl);
  // lit by the sky: toward the glow low on the horizon, and the higher sky away from it; the side facing the glow brightest
  float ga = uC[2].x; vec3 gd = vec3(sin(ga), .1, cos(ga));
  vec3 Lt = dec(textureLod(uE, uvOf(normalize(gd)), 0.)), La = dec(textureLod(uE, uvOf(normalize(vec3(-gd.x, .35, -gd.z))), 0.));
  vec2 gs = vec2(dot(gd, rt), dot(gd, up)), g2 = length(gs) > 1e-3 ? normalize(gs) : vec2(0., 1.);
  float F = 1.;
  if (uC[0].w > .5){ float cs = abs(v.y) / max(length(v), 1e-3); F = .02 + .98 * pow(1. - cs, 5.); }   // its image in the mirror
  float cov = min(1., wt / wd) * smoothstep(.35, 1., wt) * wd / (wd + L * .7);   // gone far below a pixel; a streak spreads its light
  vG = vec4(dot(g2, pr), dot(g2, ax), L * .5, wd * .5);
  vA = (La * .45 + Lt * (.06 + .16 * max(-dot(gd, fw), 0.))) * uC[2].y;
  vR = vec4(Lt * .55 * uC[2].y, aV.w * cov * F);
  gl_Position = z > .05 ? vec4((mix(A, B, .5) + ax * cn.y * hl + pr * cn.x * hw) / px, 0., 1.) : vec4(2., 2., 2., 1.);
}`,bo=Q+`
in vec2 vL; flat in vec4 vG; flat in vec3 vA; flat in vec4 vR; out vec4 o;
void main(){
  vec2 q = vec2(vL.x, sign(vL.y) * max(abs(vL.y) - vG.z, 0.)) / vG.w;   // across the streak, in its own half-widths
  float d = length(q), a = vR.w * (1. - smoothstep(.2, 1., d));
  if (a < .002) discard;
  float rim = smoothstep(.1, .95, dot(q, vG.xy)) * smoothstep(1.05, .5, d);
  vec3 col = vA + vR.rgb * rim;
  col = clamp((col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14), 0., 1.);
  col = pow(col, vec3(1. / 2.2));
  o = vec4(col * a, a);
}`,Gt=()=>e.__s501||(e.__s501=(()=>{const t=(h,l)=>{const i=e.createShader(l);return e.shaderSource(i,h),e.compileShader(i),i},s=e.createProgram(),c=t(g.hf?It:be(It),e.VERTEX_SHADER),n=t(bo,e.FRAGMENT_SHADER);return e.attachShader(s,c),e.attachShader(s,n),e.linkProgram(s),e.flush(),{p:s,v:c,f:n,ready:!1}})()),ut=new Float32Array(3*64*8),Eo=()=>{let t=0;for(const c of pe){const n=q-c.t0,h=c.P;for(let l=0;l<h.length&&t<192;l+=9)n>h[l+7]||(ut.set([h[l]+h[l+4]*n,h[l+1]+h[l+5]*n-4.905*n*n,h[l+2]+h[l+6]*n,h[l+3]>.0046?h[l+3]*Math.max(.3,1-n/.16):h[l+3],h[l+4],h[l+5]-9.81*n,h[l+6],h[l+8]*(1-.35*n/h[l+7])],t*8),t++)}if(!t)return;const s=Gt();if(!s.ready){if(!e.getProgramParameter(s.p,e.LINK_STATUS))throw new Error("501 splash: "+e.getShaderInfoLog(s.v)+e.getShaderInfoLog(s.f)+e.getProgramInfoLog(s.p));s.uC=e.getUniformLocation(s.p,"uC"),e.useProgram(s.p),e.uniform1i(e.getUniformLocation(s.p,"uE"),3),s.vao=e.createVertexArray(),s.buf=e.createBuffer(),e.bindVertexArray(s.vao),e.bindBuffer(e.ARRAY_BUFFER,s.buf),e.bufferData(e.ARRAY_BUFFER,ut.byteLength,e.DYNAMIC_DRAW);for(let c=0;c<2;c++)e.enableVertexAttribArray(c),e.vertexAttribPointer(c,4,e.FLOAT,!1,32,c*16),e.vertexAttribDivisor(c,1);s.ready=!0}e.useProgram(s.p),e.bindVertexArray(s.vao),e.bindBuffer(e.ARRAY_BUFFER,s.buf),e.bufferSubData(e.ARRAY_BUFFER,0,ut.subarray(0,t*8)),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,k.tE),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA);for(const c of[1,0])e.uniform4fv(s.uC,[A.yaw,A.pitch,We,c,A.x,A.z,A.eye,re,ue,ge,k.enc,1/45]),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,t);e.disable(e.BLEND),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindVertexArray(g.vao)},vt=new Float32Array(8*4);let Ne=null;qe!=="None"&&(Ne=(()=>{const{NP:t,NV:s,CP:c,PRW:n,VIEWS:h,FK:l}=me,i=(o,a,u)=>[o,a,u],M=(o,a)=>[o[0]+a[0],o[1]+a[1],o[2]+a[2]],b=(o,a)=>[o[0]*a,o[1]*a,o[2]*a],v=o=>b(o,1/Math.hypot(o[0],o[1],o[2])),U=(o,a)=>[o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]],Y=(o,a,u,p,x)=>{const d=1-x;return[0,1,2].map(T=>d*d*d*o[T]+3*d*d*x*a[T]+3*d*x*x*u[T]+x*x*x*p[T])},S=(o,a,u,p)=>{const x=i(o-.01,.53,a);if(p)return[x,i(o-.13,.39,a),i(o+.06,.5,a)];const d=o+.01+u[0],T=-.03+u[1];return[x,i((o+d)*.5-.03-u[1]*.5,.27+u[1]*.6,a),i(d,T,a)]},W=o=>{let a=.1,u=.6,p,x,d,T=null;if(o<6){const y=o/5*2-1;a=.26,u=.58,p=[i(.2,.55,0),i(.39,.69,0),i(.47,.25,y*.05),i(.37+.02*Math.abs(y),.045,y*.12)],x=v(i(-.55,-.8,-y*.25)),d=v(i(.83,-.55,0))}else if(o<10){const y=(o-6)/4*G;a=.13,u=.6,p=[i(.2,.57,0),i(.37,.71,0),i(.45,.44,0),i(.55,.36,0)],x=v(i(.9,-.45,0)),d=v(i(.45,.9,0)),T=[0,1].map(P=>{const z=y+P*Math.PI,K=Math.sin(z)>0?Math.sin(z):0;return S(0,P?-.045:.045,[.13*Math.cos(z),.11*K],0)})}else o===10?(a=.16,u=.6,p=[i(.2,.58,0),i(.37,.77,0),i(.42,.54,0),i(.35,.64,0)],x=v(i(.55,-.83,0)),d=v(i(.83,.55,0))):o===11?(a=.08,u=.61,p=[i(.2,.61,0),i(.43,.8,0),i(-.07,.87,0),i(.13,1.05,0)],x=v(i(.97,-.25,0)),d=v(i(.25,.97,0))):o===12?(a=.05,u=.61,p=[i(.2,.61,0),i(.31,.86,0),i(.14,.98,.02),i(.2,1.13,.04)],x=v(i(.7,-.2,.65)),d=v(i(.15,.98,0))):o===13?(a=.05,u=.61,p=[i(.2,.62,0),i(.33,.83,0),i(.12,.89,0),i(0,.8,.03)],x=v(i(-.65,-.35,.65)),d=v(i(-.2,.9,.3))):o===14?(a=0,u=.61,p=[i(.19,.6,0),i(.3,.76,0),i(.12,.79,.02),i(-.08,.72,.075)],x=v(i(-.95,-.2,.2)),d=v(i(-.1,.5,.86)),T=[S(.01,0,[0,0],0),S(0,-.04,0,1)]):(a=.08,u=.6,p=[i(.2,.61,0),i(.35,.86,0),i(.19,.9,0),i(-.04,.73,.115)],x=v(i(-.7,-.55,-.45)),d=v(i(-.3,.3,.9)));return T||(T=[S(0,.045,[0,0],0),S(0,-.045,[0,0],0)]),{b:a,by:u,N:p,hd:x,hu:d,L:T}},C=new Float32Array(n*t*s*4);for(let o=0;o<s;o++)for(let a=0;a<t;a++){const u=h[o],p=[Math.sin(u),0,-Math.cos(u)],x=[-Math.cos(u),0,-Math.sin(u)],d=N=>[p[0]*N[0]+x[0]*N[2],N[1],p[2]*N[0]+x[2]*N[2]],T=[],y=(N,j,we,Pe,Be,wt)=>T.push([0,Pe,Be,wt,...d(N),we,...d(j),0,0,0,0,0,0,0,0,0]),P=(N,j,we,Pe)=>{const Be=[[Math.cos(j),-Math.sin(j),0],[Math.sin(j),Math.cos(j),0],[0,0,1]].map((wt,Uo)=>b(d(wt),1/we[Uo]));T.push([1,Pe,0,0,...d(N),0,...Be[0],0,...Be[1],0,...Be[2],0])},z=W(a);P(i(-.02,z.by+.005,0),z.b,[.24,.118,.108],0),P(i(.1,z.by-.02,0),z.b,[.15,.125,.104],0),P(i(-.04,z.by+.035,0),z.b-.05,[.225,.09,.118],1),P(i(-.245,z.by+.05+.06*z.b,0),z.b+.3,[.1,.042,.058],2);let K=null;for(let N=0;N<=10;N++){const j=N/10,we=Y(...z.N,j);if(K){const Pe=(N-.5)/10;y(K,we,.034+(.016-.034)*Math.min(1,Pe/.4)+.006*Math.max(0,(Pe-.7)/.3),3,(N-1)/10,j)}K=we}const ie=z.N[3];y(M(ie,b(z.hd,-.012)),M(ie,b(z.hd,.014)),.028,4,0,0);const ce=v(M(b(z.hd,Math.cos(1.05)),b(z.hu,-Math.sin(1.05)))),le=M(ie,b(z.hd,.03)),xe=M(le,b(z.hd,.05)),Qe=M(xe,b(ce,.058));y(le,xe,.017,5,0,.5),y(xe,M(xe,b(ce,.03)),.013,5,.5,.75),y(M(xe,b(ce,.03)),Qe,.008,5,.75,1);for(const[N,j,we]of z.L)y(N,j,.0085,6,0,0),y(j,we,.0075,6,0,0),y(j,j,.013,7,0,0);const et=a+o*t;C[et*n*4]=T.length,T.forEach((N,j)=>C.set(N,(et*n+1+j*5)*4))}const w=qe==="A party of flamingos"?0:qe==="A flock of flamingos"?1:2,E=Xe[2]*F,_=f()<.5?-1:1,m=Math.atan2(-Math.cos(de),-Math.sin(de)),R=.3+.35*f(),L=.15+.3*f(),J=.1+.25*f(),Z=.14+.12*f(),B=()=>{if(f()<Z)return 3;const o=f()*(R+L+J);return o<R?2:o<R+L?0:1},se=[1,1.1,.92,.9],H=[],te=[],dt=X+_*(.15+.4*f())*E,mt=w===0?14+8*f():w===1?21+9*f():23+9*f(),To=dt-_*(.5+.5*f())*E,Ro=w===0?mt*1.15:120+110*f(),Ot=o=>{const a=dt+(To-dt)*o,u=mt*Math.pow(Ro/mt,o);return[Math.sin(a)*u,Math.cos(a)*u,u]},pt=(o,a,u,p,x)=>{const d=p?.62:1.05,T=[];for(let y=0,P=0;y<u&&P<u*40;P++){const z=Math.sqrt(f())*x*(1+P/(u*12)),K=f()*G,ie=Math.cos(K)*z*1.6,ce=Math.sin(K)*z,le=o+Math.cos(X)*ie+Math.sin(X)*ce,xe=a-Math.sin(X)*ie+Math.cos(X)*ce;if(T.some(N=>Math.hypot(N.x-le,N.z-xe)<d*(.85+.3*f())))continue;const Qe=B(),et={x:le,z:xe,sp:Qe,sc:se[Qe]*(.9+.2*f()),rest:p,h:m+(f()-.5)*(p?2.4:1.8),u:0};T.push(et),y++}return T};if(w===0){const[o,a]=Ot(.3),u=7+(f()*9|0),p=1+(f()*3|0),x=f()<.3;H.push(...pt(o,a,u-p,x,1.2+.25*Math.sqrt(u)));for(let d=0;d<p;d++){const T=f()*G,y=4+8*f();H.push(...pt(o+Math.cos(T)*y,a+Math.sin(T)*y*.6,1,!1,.1))}}else{const o=w===1?80+(f()*170|0):220+(f()*40|0),a=[f()*.7+.15,f()*.7+.15];let u=o;for(let p=0;u>0&&p<200;p++){let x=f();if(a.some(le=>Math.abs(x-le)<.035))continue;const d=.25+Math.pow(Math.sin(Math.PI*x),1.5),T=Math.min(u,x<.07||x>.93?1+(f()*2|0):Math.max(1,Math.round((3+26*Math.pow(f(),1.4))*d))),[y,P,z]=Ot(x),K=(f()-.5)*z*.08,ie=Math.atan2(y,P),ce=pt(y+Math.sin(ie)*K,P+Math.cos(ie)*K,T,f()<.3,.5+.32*Math.sqrt(T));ce.forEach(le=>{le.u=x}),H.push(...ce),u-=ce.length}if(w===2){const p=X+_*(f()*25)*F,x=(60+50*f())*F,d=[f()*G,f()*G,f()*G];for(let T=0;T<1300;T++){const y=f(),P=p+(y-.5)*x;if(f()>.25+.75*Math.max(0,Math.sin(y*9+d[0])*.5+Math.sin(y*23+d[1])*.35+Math.sin(y*51+d[2])*.25+.2))continue;const z=550+950*f(),K=B();te.push({x:Math.sin(P)*z,z:Math.cos(P)*z,sp:K,sc:se[K]*(.9+.2*f()),h:m+(f()-.5)*1.5,pose:f()<.7?f()*6|0:f()<.6?14:11})}te.sort((T,y)=>Math.hypot(y.x,y.z)-Math.hypot(T.x,T.z))}}const _e={2:.45,4:.45,5:.7,8:.6},Ao=o=>{const a=f();if(o.st===2){o.st=3,o.tl=o.hold||2+5*f(),o.hold=0,o.look=f()<.35;return}if(o.st===8){o.st=o.wake?3:0,o.tl=o.hold||2+4*f(),o.hold=0,o.wake=0,o.look=f()<.35;return}if(o.st===3){o.rest?(o.st=5,o.tl=_e[5]):(o.st=4,o.tl=_e[4]);return}if(o.st===5){o.st=6,o.tl=20+80*f();return}o.rest?a<.45?(o.st=6,o.tl=15+70*f()):a<.75?(o.st=7,o.tl=3+9*f()):(o.st=8,o.wake=1,o.tl=_e[8]):a<.5?(o.st=0,o.tl=3+16*f(),o.fr=.45+.6*f(),o.h+=(f()-.5)*.6):a<.74?(o.st=1,o.tl=1.1+2.4*f(),o.h+=(f()-.5)*1.2):a<.9?(o.st=2,o.tl=_e[2]):(o.st=7,o.tl=3+7*f()),o.st===0&&f()<.1&&(o.h=m+(f()-.5)*1.2)};for(const o of H)o.st=o.rest?f()<.7?6:7:f()<.75?0:f()<.5?1:7,o.tl=(o.st===6?40:8)*f()+1,o.ph=f(),o.fr=.45+.6*f(),o.wp=f(),o.cr=f()<.5?.03+.05*f():0,o.vari=f(),o.wave=-1,o.look=!1,o.hold=0;let Ht=45+160*f(),jt=0,ne=0;const Wt=te.length+H.length,xt=new Float32Array(1024*4*4),ko=o=>{const a=o.st;if(a===0){const u=o.ph%1,p=1-Math.abs(2*u-1);return Math.min(5,p*6|0)}return a===1?6+((o.wp*4|0)&3):a===2||a===4?10:a===3?o.look?12:11:a===5||a===8?13:a===6?14:15},Zt=(o,a,u)=>{const p=Et(a.h-Math.atan2(a.x-A.x,a.z-A.z)),x=Math.abs(p);let d=0,T=9;h.forEach((y,P)=>{Math.abs(y-x)<T&&(T=Math.abs(y-x),d=P)}),xt.set([a.x,a.z,a.sc,a.vari??.5,u,d,p<0?1:0,a.sp],o*4)};te.forEach((o,a)=>{o.vari=f(),Zt(1024+2*a,o,o.pose)});let _o=0;const Kt=o=>{ne+=o;for(const a of Le)if(!a.seen&&(a.seen=1,!(a.a<1)))for(const u of H){const p=Math.hypot(u.x-a.x,u.z-a.z);p<9&&f()<.55&&u.wave<0&&(u.wave=ne+p/.3+.3+1.5*f(),u.hold=1.5+3*f())}if(w&&ne>Ht){Ht=ne+70+200*f();const a=f()<.5?0:1,u=4+5*f();for(const p of H)p.wave<0&&(!p.rest||f()<.4)&&(p.wave=ne+Math.abs(p.u-a)*u*2+f()*1.2,p.hold=2.5+2.5*f())}for(const a of H)a.wave>=0&&ne>=a.wave&&(a.wave=-1,a.st===0||a.st===1||a.st===7?(a.st=2,a.tl=_e[2]*(.7+.6*f())):a.st===6?(a.st=8,a.wake=1,a.tl=_e[8]):a.st===3&&(a.tl=Math.max(a.tl,a.hold))),a.tl-=o,a.tl<=0&&Ao(a),a.st===0?(a.ph+=o*a.fr,a.cr&&(a.x+=Math.sin(a.h)*a.cr*o,a.z+=Math.cos(a.h)*a.cr*o)):a.st===1&&(a.wp+=o*.8,a.x+=Math.sin(a.h)*.22*o,a.z+=Math.cos(a.h)*.22*o);ne>=jt&&(jt=ne+2.5,H.sort((a,u)=>Math.hypot(u.x-A.x,u.z-A.z)-Math.hypot(a.x-A.x,a.z-A.z))),H.forEach((a,u)=>Zt(2*u,a,ko(a)))},Ce=l.P.draw,Mo=o=>{if(l.ready)return!0;const a=e.getExtension("KHR_parallel_shader_compile");if(!o&&a){for(const x in l.P)if(!e.getProgramParameter(l.P[x].p,37297))return!1}for(const x in l.P){const d=l.P[x];if(!e.getProgramParameter(d.p,e.LINK_STATUS))throw new Error("501 flock "+x+": "+e.getShaderInfoLog(d.f)+e.getShaderInfoLog(d.v)+e.getProgramInfoLog(d.p));const T=e.getProgramParameter(d.p,e.ACTIVE_UNIFORMS);for(let y=0;y<T;y++){const P=e.getActiveUniform(d.p,y).name.replace("[0]","");d[P]=e.getUniformLocation(d.p,P)}e.useProgram(d.p),[["uN",0],["uE",3],["uRgT",4],["uRd",5],["uAt",7],["uBd",8],["uPr",1]].forEach(([y,P])=>{d[y]&&e.uniform1i(d[y],P)})}const u=g.tex(n,t*s,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,C);l.tAt=g.tex(t*c,2*s*c,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.CLAMP_TO_EDGE);const p=g.fbo(l.tAt);return e.viewport(0,0,t*c,2*s*c),e.bindVertexArray(g.vao),e.disable(e.BLEND),e.useProgram(l.P.bake.p),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,u),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(p),e.deleteTexture(u),e.bindTexture(e.TEXTURE_2D,l.tAt),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAX_LEVEL,4),l.ready=!0,!0};Kt(0);const zo=g.tex(1024,4,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,xt);return{step:Kt,draw(){if(!l.ready){if(!Mo(ne>1))return;e.viewport(0,0,re,re),e.bindVertexArray(g.vao)}e.useProgram(Ce.p),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,l.tAt),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,zo),e.texSubImage2D(e.TEXTURE_2D,0,0,0,Math.max(2*H.length,1),1,e.RGBA,e.FLOAT,xt.subarray(0,Math.max(2*H.length,1)*4)),e.uniform4fv(Ce.uU,vt),e.uniform4f(Ce.uV,re,Te==="Thin film"?1:0,te.length,0),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.uniform1i(Ce.uMd,0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Wt),e.uniform1i(Ce.uMd,1),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Wt),e.disable(e.BLEND)}}})());const Vt=()=>{let t=0;for(const c of Le){const n=q-c.t0;(c.a>0?n<9.9:n<1.4)&&(St.set([c.x,c.z,c.t0,c.a>0?c.a:c.a*(1-n/1.4)**2],t*4),t++)}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,re,re),e.bindVertexArray(g.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.useProgram(I.main.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,g.tN),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,k.tE),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,g.tRing),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,g.tRd),t&&e.texSubImage2D(e.TEXTURE_2D,0,0,0,t,1,e.RGBA,e.FLOAT,St.subarray(0,t*4)),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,g.tCr);const s=ue;vt.set([A.yaw,A.pitch,We,q,A.x,A.z,A.eye,t,Math.cos(de),Math.sin(de),ro,kt,ge,Ye,((ee?ee.az:ye)/G%1+1)%1,Te==="Dry crust and puddles"?1:0,s,ue*7.3%G,k.enc,g.ringEnc,2*We/re,ee?ee.v:.1,q*37.17%113,0,...Xt,...no,0,0]),e.uniform4fv(I.main.uU,vt),e.drawArrays(e.TRIANGLES,0,3),pe.length&&Eo(),Ne&&Ne.draw()};return Vt(),(t,s)=>{s=Math.min(Math.max(s||0,0),.1),q+=s,Ft(),yo(),Gt();for(let c=Ze.length-1;c>=0;c--){const n=Ze[c];q>=n.at&&(Ze.splice(c,1),go(n.x,n.z,n.dist)&&ht(n.x,n.z,n.at,n.a))}for(let c=Ke.length-1;c>=0;c--){const n=Ke[c];q>=n.at&&(Ke.splice(c,1),ht(n.x,n.z,n.at,n.a))}if(pe.length&&q-pe[0].t0>.7&&pe.shift(),q>qt){qt=q+3+r()*6;const c=r()*G,n=6+r()*18;ht(A.x+Math.sin(c)*n,A.z+Math.cos(c)*n,q,.35)}if(ae==="Storm on the horizon"){if(q>Nt&&!ee&&(ee={t:0,az:ye+(r()-.5)*.12,v:.05+.04*r(),k:2+(r()*3|0)},Nt=q+6+r()*9),ee){ee.t+=s;const c=ee.t,n=h=>Math.exp(-Math.pow((c-h)/.045,2));Ye=0;for(let h=0;h<ee.k;h++)Ye+=n(.05+h*.13)*(1-h*.2);c>.8&&($e.push(q+4+r()*3),ee=null,Ye=0)}for(let c=$e.length-1;c>=0;c--)q>$e[c]&&(D.sound.hit("kick",.25),D.sound.hit("noise",.08),$e.splice(c,1))}Ne&&Ne.step(s),Vt()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
