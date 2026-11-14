// Temple Pond: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/575.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ct){Ct&&Ct.add({num:575,name:"Temple Pond",fam:"Vistas",recipe:"The edge of a lotus pond before a great stone temple, with five bud-shaped towers dark against the sky and doubled in the water among the lotus leaves and flowers. The hour and weather, the lotus and the mist change every mint. Tap the pond or the temple's reflection to send rings across the mirror, drag to send a breath of wind over it, or hold to bring the sun slowly up (on the night ones, the first light).",interactive:"Tap the pond (or the temple, to touch its reflection) to send rings across the mirror. Drag to send a breath of wind across the pond in that direction: the reflection shivers and the lotus and palms sway. Hold to bring the sun slowly up where the season puts it (behind the central tower at the equinox); on a night mint it brings the first light.",music:!0,gl:!0,fps:30,seed:0,make(q){const e=q.gl,l0=q.size,v0=!!q.home;let F0=1465731601;for(let t=2;t<66;t+=8)F0=Math.imul(F0^parseInt(q.hash.slice(t,t+8),16),2246822507)^F0>>>13;const p=()=>{F0=F0+1831565813|0;let t=Math.imul(F0^F0>>>15,1|F0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<8;t++)p();const Y0=t=>{let o=0;for(const s in t)o+=t[s];let a=p()*o;for(const s in t)if(a-=t[s],a<0)return s;return Object.keys(t)[0]},U0=Math.PI*2,M0=Math.PI,G=(t,o,a)=>t<o?o:t>a?a:t,Z=(t,o,a)=>t+(o-t)*a,i0=t=>{const o=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/o,t[1]/o,t[2]/o]},D0=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]],N0=.5,Ut=1.6,m0=40,a0=-46,x0=30,J0=-80,k0=-1.2,gt=N0+1.2,xe=Math.tan(31*M0/180),Dt=[[-285,m0,0,130],[-178,m0,0,130],[62,18,0,22],[260,m0,0,150],[150,0,0,200],[-150,0,1,200],[200,0,1,250]],be=q.trait("Sky",v0?"Gold blaze":Y0({"Gold blaze":40,"Mackerel sky":26,"Monsoon haze":22,"Fire sky":12})),Bt=q.trait("Moment",v0?"Before sunrise":Y0({"Before sunrise":50,"Blue hour":28,"First rays":22})),K0=q.trait("Lotus",v0?"Lotus edge":Y0({"Lotus edge":44,"Open mirror":26,"Lotus field":20,"Pink bloom":10}));v0||p();const ye=q.trait("Air",v0?"Clear":Y0({Clear:68,"Pond mist":18,"Towers in mist":14})),lt=q.trait("Palms",v0?"Sugar palms":Y0({"Sugar palms":45,"Mixed palms":35,"Lone palm":20})),wt=q.trait("Water",v0?"Glass":Y0({Glass:50,Breathing:30,"Fish rising":20}));let _0=1013904242;for(let t=2;t<66;t+=8)_0=Math.imul(_0^parseInt(q.hash.slice(t,t+8),16),3266489909)^_0>>>16;const qt=()=>{_0=_0+1831565813|0;let t=Math.imul(_0^_0>>>15,1|_0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<4;t++)qt();const ge=q.trait("Standpoint",v0?"Pond edge":(()=>{const t=qt()*100;return t<46?"Pond edge":t<74?"West corner":"By the causeway"})());let z0=461845907;for(let t=2;t<66;t+=8)z0=Math.imul(z0^parseInt(q.hash.slice(t,t+8),16),668265263)^z0>>>15;const Z0=()=>{z0=z0+1831565813|0;let t=Math.imul(z0^z0>>>15,1|z0);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};for(let t=0;t<4;t++)Z0();const St=(t,o)=>{let a=0;for(const s in t)a+=t[s];o*=a;for(const s in t)if(o-=t[s],o<0)return s;return Object.keys(t)[0]},we=Z0(),Se=Z0(),Gt=Z0(),Ae=Z0(),ao=Z0(),Me=0,At=Me?{f318d741:["Sun up"],baad0efd:["Red ball"],"7d281d67":["Red ball","Equinox","Eye level"],ddf06246:["Rain"],a1d72c16:["Deep blue"],"568197dd":["Old moon"],be4b9b01:["Milky Way"],eea45290:[0,0,"Low at the water"],ecacd78a:[0,0,"Long lens"],e51a0bce:[0,0,"Sky picture"],"02d9fd92":[0,0,"Mirror picture"],"8f20fd1b":[0,0,"Causeway"],"2ab80d4d":["Dawn","Dry season","Eye level"],"9fdb7fa1":["Sun up","Wet season","Eye level"],"074df317":["Dawn","Equinox","Eye level"]}[q.hash.slice(2,10)]||[]:[],b0=At[0]||(v0?"Dawn":St({Dawn:46,"Sun up":14,"Red ball":9,Rain:9,"Deep blue":13,"Old moon":5.5,"Milky Way":3.5},we)),Mt=q.trait("Season",At[1]||(v0?"Equinox":St({Equinox:30,"Dry season":40,"Wet season":30},Se))),h0=At[2]||(v0?"Eye level":St({"Eye level":55,"Low at the water":10,"Long lens":9,"Sky picture":9,"Mirror picture":9,Causeway:8},Ae)),ro=q.trait("Framing",h0==="Causeway"?"Eye level":h0);let tt=z0^1759714724;const $=()=>{tt=tt+1831565813|0;let t=Math.imul(tt^tt>>>15,1|tt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},y0=h0==="Causeway"?[m0,-34,0,0]:{"Pond edge":[0,0,.055,.14],"West corner":[-36,0,.065,76/285],"By the causeway":[20,0,.27,20/285]}[ge];h0==="Causeway"&&q.trait("Standpoint","On the causeway"),h0==="Low at the water"&&(y0[1]=-.95);const o0=y0[0],r0=y0[1],It=h0==="Causeway"?gt+1.6:h0==="Low at the water"?N0+.12:N0+Ut,it=h0==="Long lens"?Math.tan(12.5*M0/180):xe,ze={"Long lens":.1,"Sky picture":.27,"Mirror picture":-.27,"Low at the water":.02,Causeway:.09}[h0]||0;h0==="Long lens"&&(y0[2]=Math.atan2(m0-o0,285+r0));let Xt=Mt==="Equinox"?0:(Mt==="Dry season"?1:-1)*(.2+.22*Gt);Mt==="Equinox"&&(b0==="Sun up"||b0==="Red ball")&&(Xt=(Gt<.5?-1:1)*.2);const g0={"Gold blaze":{hg:[2,.92,.26],fog:9e3,cl:.25,ct:0},"Mackerel sky":{hg:[1.6,.74,.42],fog:1e4,cl:1,ct:1},"Monsoon haze":{hg:[1.75,1.1,.52],fog:700,cl:.1,ct:0},"Fire sky":{hg:[2.3,.78,.22],fog:9e3,cl:.95,ct:2}}[be],j={Dawn:[null,1,1,0,1,.35,0,0,1,null,null],"Sun up":[.5,1,.9,0,2.4,.5,0,0,1,0,null],"Red ball":[.46,.7,.85,.6,2.2,1,0,0,.05,0,600],Rain:[.22,.5,1.05,1,3.2,1,0,1,0,0,900],"Deep blue":[-.95,.7,.75,0,1,.35,0,0,1,1.6,null],"Old moon":[-.85,.75,.75,0,1,.35,1,0,1,1.3,null],"Milky Way":[-1.4,.45,.42,0,1,.35,2,0,1,2.6,null]}[b0],et=j[0]!==null?j[0]:{"Before sunrise":0,"Blue hour":-.45,"First rays":.4}[Bt];j[0]!==null&&q.trait("Moment",{"Sun up":"Sun up","Red ball":"Red sun",Rain:"Grey morning","Deep blue":"Deep blue hour","Old moon":"Old moon","Milky Way":"Milky Way"}[b0]),(b0==="Rain"||b0==="Red ball")&&(q.trait("Sky",b0==="Rain"?"Rain":"Dry-season haze"),g0.cl=b0==="Rain"?.6:0,g0.ct=0),j[10]!==null&&(g0.fog=j[10]),et<-.6&&(g0.hg=[1.5,1.25,.5]);const Ee={"Lotus edge":1,"Open mirror":.25,"Lotus field":1.7,"Pink bloom":1.3}[K0],Re={Glass:0,Breathing:.35,"Fish rising":.04}[wt],Te=j[9]!==null?j[9]:Bt==="Blue hour"?1:.5,j0=`precision highp float; precision highp int; precision highp sampler2D;
uniform vec4 uS[20];
uniform sampler2D uN;
uniform sampler2D uP;
#define SUN uS[0].xyz
#define SC uS[1].rgb
#define HG uS[11].rgb
#define TT uS[4].w
#define FOG uS[11].w
#define MIR (uS[16].x > 0.5)
const float GY = ${N0.toFixed(2)}, XA = ${m0.toFixed(1)};
float at2(float y, float x) { float a = atan(y/(abs(x) + 1e-9)); return x >= 0. ? a : (y >= 0. ? 3.14159265 - a : -3.14159265 - a); }
vec3 skyC(vec3 d, float det) {
  vec3 s = SUN; float el = s.y;
  float day = smoothstep(-0.06, 0.5, el), blaze = smoothstep(-0.12, -0.01, el);
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), sh = normalize(s.xz);
  float w = dot(dh, sh)*0.5 + 0.5;
  float m = max(dot(normalize(vec3(d.x, e, d.z)), s), 0.);
  vec3 zen = mix(vec3(0.016, 0.03, 0.1), vec3(0.11, 0.18, 0.44), day);
  vec3 hA = mix(vec3(0.16, 0.14, 0.26), vec3(0.42, 0.46, 0.62), day);
  vec3 hS = HG*(0.3 + 0.7*blaze)*(1. - 0.25*day);
  vec3 hc = mix(hA, hS, pow(w, 4.));
  float g = pow(clamp(e*(1.8 + 2.5*(1. - w)), 0., 1.), 0.55);
  vec3 col = mix(hc, zen, g);
  col += vec3(0.1, 0.03, 0.07)*exp(-pow((e - 0.24)/0.17, 2.))*(0.35 + 0.65*w)*(1. - day*0.7);
  float anti = pow(1. - w, 2.);
  col = mix(col, vec3(0.48, 0.29, 0.4)*(0.6 + 0.7*day), anti*smoothstep(0.025, 0.07, e)*(1. - smoothstep(0.1, 0.21, e))*0.55*(1. - day));
  col = mix(col, vec3(0.11, 0.12, 0.24), anti*(1. - smoothstep(0., 0.06, e))*0.65*(1. - day));
  col += HG*exp(-e*22.)*pow(w, 9.)*(0.45 + 0.9*blaze);
  col += (SC + HG*0.12*blaze)*(0.012*pow(m, 4.) + 0.2*pow(m, 24.));
  float nite = smoothstep(-0.075, -0.13, el)*(1. - pow(w, 5.)*exp(-e*14.));
  col = mix(col, vec3(dot(col, vec3(0.25, 0.3, 0.45)))*vec3(0.38, 0.6, 1.3), nite*0.85);
  // an overcast (rain) or a dry dust haze (the red ball): a grey dome, lighter overhead, warmed a little toward the sun
  float ov = uS[12].x;
  vec3 og = vec3(0.3, 0.31, 0.335)*(0.26 + 0.45*day + 0.3*blaze)*(0.62 + 0.5*sqrt(e)) + HG*0.1*pow(w, 3.)*exp(-e*6.);
  return mix(col, og, ov);
}
#ifdef FULLSKY
vec3 skyDet(vec3 d, vec3 col) {
  vec3 s = SUN; float el = s.y;
  float day = smoothstep(-0.06, 0.5, el), blaze = smoothstep(-0.12, -0.01, el);
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), sh = normalize(s.xz);
  float w = dot(dh, sh)*0.5 + 0.5;
  float m = max(dot(normalize(vec3(d.x, e, d.z)), s), 0.);
  {
    if (d.y > 0.) {
      vec2 p = d.xz/(d.y + 0.045);
      vec2 q = vec2(p.x*0.8 + p.y*0.6, -p.x*0.6 + p.y*0.8);
      float ct = uS[13].z, ca = uS[12].w;
      float n = texture(uN, q*vec2(0.02, 0.09) + vec2(TT*0.00015, 0.)).r*0.55 + texture(uN, q*vec2(0.07, 0.2) + 0.37).g*0.45;
      if (ct > 0.5) n = n*0.55 + 0.45*texture(uN, q*vec2(0.11, 0.2) + 0.71).r;
      n += (texelFetch(uN, ivec2(mod(gl_FragCoord.xy + 17., 256.)), 0).a - 0.5)*0.006; // 8-bit noise: dither the cloud edges' terraces
      float cl = smoothstep(0.66 - 0.2*ca, 0.86 - 0.12*ca, n)*smoothstep(0.015, 0.1, d.y)*(1. - smoothstep(0.35, 0.8, d.y)*(1. - step(0.5, ct)))*ca;
      float lit = (0.3 + 0.7*pow(w, 2.5))*(0.45 + 0.55*blaze);
      vec3 under = mix(vec3(0.95, 0.42, 0.42), vec3(1., 0.55, 0.3), w)*(ct > 1.5 ? vec3(1.25, 0.6, 0.45) : vec3(1.));
      vec3 cc = mix(vec3(0.13, 0.1, 0.18)*(0.6 + day), under*lit*(0.5 + 0.9*exp(-e*5.))*(HG.r*0.35), 0.4 + 0.6*blaze);
      cc += SC*0.6*pow(m, 6.);
      col = mix(col, cc, cl*0.85);
    }
    float dk = smoothstep(0.1, 0.025, dot(col, vec3(0.3, 0.5, 0.2))); // stars only in a sky dark enough to show them
    if (d.y > 0.03 && dk > 0.) {
      vec2 sp = d.xz/(d.y + 0.35)*60., ci = floor(sp);
      vec4 h = texelFetch(uN, ivec2(mod(ci + 37., 256.)), 0);
      vec2 sq = sp - ci - 0.2 - 0.6*h.ga;
      col += vec3(0.85, 0.9, 1.)*(0.3 + h.r)*step(0.99 - 0.012*max(uS[13].y - 1., 0.), h.b)*exp(-dot(sq, sq)*pow(uS[3].w*(d.y + 0.35)/35., 2.))*(1. - day)*(1. - blaze)*(1. - blaze)*smoothstep(0.03, 0.3, d.y)*uS[13].y*0.9*dk;
    }
    vec3 vd = normalize(vec3(-0.36, 0.2, -0.91));
    float va = length(cross(d, vd));
    col += vec3(1.2, 1.15, 1.)*exp(-va*va*3.5e5)*(1. - day)*uS[13].y*1.5*dk;
    float a = length(cross(d, s)), Rs = 0.0062*(1.3 - 0.3*uS[19].z);
    if (dot(d, s) > 0.) {
      float disc = smoothstep(Rs*1.15, Rs*0.85, a);
      col += SC*disc*28.*mix(vec3(1.), vec3(1., 0.6, 0.35), smoothstep(0.06, 0., d.y))*uS[19].z;
      col = mix(col, SC*1.7, disc*(1. - uS[19].z)); // through dust the disc is a dull red ball you can look at
      col += SC*2.2*pow(m, 400.)*uS[19].z;
    }
    if (m > 0.75 && s.y > -0.03 && d.z < -0.05 && s.z < -0.05) {
      vec3 ro = uS[2].xyz; if (MIR) ro.y = -ro.y;
      float ta = (-285. - ro.z)/d.z, ts = (-285. - ro.z)/s.z;
      vec2 A = vec2(ro.x + d.x*ta - XA, ro.y + d.y*ta), B = vec2(ro.x + s.x*ts - XA, ro.y + s.y*ts);
      float j = texelFetch(uN, ivec2(mod(gl_FragCoord.xy, 256.)), 0).b, acc = 0.;
      for (int i = 0; i < int(uS[14].w); i++) {
        vec2 qq = mix(A, B, (float(i) + j)/12.);
        float H = textureLod(uP, vec2(qq.x/260. + 0.5, 0.0625), 0.).r;
        acc += step(H, qq.y)*step(GY + 0.3, qq.y);
      }
      acc /= 12.;
      float vis = smoothstep(-0.03, 0.01, s.y);
      float mw = smoothstep(0.75, 0.9, m);
      col *= mix(1., 0.75 + 0.25*acc, vis*pow(m, 6.)*0.8*mw);
      col += (SC*0.45 + HG*0.08)*acc*pow(m, 14.)*vis*(1. + 1.2*(1. - uS[1].w))*mw;
    }
  }
  return col;
}
#endif
#ifdef AIRLUT
uniform sampler2D uF;
vec3 airC(vec3 d) { float e = 0.015*inversesqrt(dot(d.xz, d.xz) + 0.000225); return textureLod(uF, vec2(at2(d.z, d.x)*0.15915494 + 0.5, (e - 0.015)*(31./0.045/32.) + 0.5/32.), 0.).rgb; } // baked per sun state by FS_AIR (azimuth x the ray's height in skyC)
#else
vec3 airC(vec3 d) { return skyC(normalize(vec3(d.x, 0.015, d.z)), 0.)*0.4; }
#endif
vec3 irr(vec3 n) {
  float el = SUN.y, day = smoothstep(-0.06, 0.5, el), blaze = smoothstep(-0.12, -0.01, el);
  vec3 zen = mix(vec3(0.016, 0.03, 0.1), vec3(0.11, 0.18, 0.44), day), hA = mix(vec3(0.16, 0.14, 0.26), vec3(0.42, 0.46, 0.62), day);
  float f = max(dot(normalize(n.xz + 1e-5), normalize(SUN.xz)), 0.)*(1. - abs(n.y));
  vec3 c = mix(hA*0.6, zen*1.3 + hA*0.35, 0.5 + 0.5*n.y) + HG*(0.3 + 0.7*blaze)*0.17*f*f;
  return c*0.8 + SC*max(dot(n, SUN), 0.)*uS[1].w;
}
`,Ot=`#version 300 es
precision highp float;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p*2. - 1., 0., 1.); }`,Ht=Dt.map(t=>`vec4(${t.map(o=>o.toFixed(1)).join(", ")})`).join(", "),Pe=`#version 300 es
`+j0+`
out vec4 o;
void main() { float a = (gl_FragCoord.x/2048. - 0.5)*6.2831853, e = 0.015 + 0.045*(gl_FragCoord.y - 0.5)/31., c = sqrt(1. - e*e); o = vec4(skyC(vec3(cos(a)*c, e, sin(a)*c), 0.)*0.4, 1.); }`,Fe=`#version 300 es
#define FULLSKY
`+j0+`
out vec4 o;
void main() {
  float rs = uS[3].w; vec2 sc = gl_FragCoord.xy/rs*2. - 1.;
  vec3 rd = normalize(uS[5].xyz + (uS[3].xyz*sc.x + uS[4].xyz*sc.y)*uS[2].w);
  if (MIR) rd.y = -rd.y;
  if (rd.y < -0.01) { o = vec4(0., 0., 0., 1e4); return; } // under the horizon the ground covers it (and the scene is blended over it)
  o = vec4(skyDet(rd, skyC(rd, 1.)), 1e4);
}`,Ne=`#version 300 es
`+j0+`
out vec4 o;
void main() {
  float rs = uS[3].w; vec2 sc = gl_FragCoord.xy/rs*2. - 1.;
  vec3 d = normalize(uS[5].xyz + (uS[3].xyz*sc.x + uS[4].xyz*sc.y)*uS[2].w);
  if (MIR) d.y = -d.y;
  vec3 s = SUN; float day = smoothstep(-0.06, 0.5, s.y), blaze = smoothstep(-0.12, -0.01, s.y);
  vec2 sh = normalize(s.xz);
  o = vec4(0.);
    float sx = uS[19].x, nt = (1. - day)*(1. - blaze);
    if (sx > 0.5 && sx < 1.5 && d.y > 0.) {
      // the old moon: a thin crescent lying on its back over the towers, lit from the sun below, its dark part faintly lit
      vec3 md = normalize(vec3(sh.x, 0.34, sh.y)), sp = normalize(s - md*dot(s, md));
      vec3 dv = d - md; float Rm = 0.0072, lx = dot(dv, sp)/Rm, ly = dot(dv, cross(md, sp))/Rm, pr = 2.*uS[2].w/uS[3].w/Rm;
      float rr = sqrt(lx*lx + ly*ly), ins = smoothstep(1. + pr, 1. - pr, rr);
      float lit = ins*smoothstep(-pr, pr, lx - 0.86*sqrt(max(1. - ly*ly, 0.)));
      o = vec4(vec3(1., 0.93, 0.78)*2.2*lit + vec3(0.06, 0.07, 0.1)*ins + vec3(0.5, 0.55, 0.7)*0.025*exp(-rr*Rm/0.025), ins*0.6);
    }
    if (sx > 1.5 && sx < 2.5 && d.y > 0.) {
      // the Milky Way: its bright core standing up behind the towers before the first light
      vec3 c0 = normalize(vec3(0.06, 0.36, -1.)), tA = normalize(vec3(-0.25, 1., 0.05)); tA = normalize(tA - c0*dot(tA, c0));
      vec3 pn = cross(c0, tA);
      float ac = dot(d, pn), al = atan(dot(d, tA)/max(dot(d, c0), 0.05));
      float nb = texture(uN, vec2(al, ac)*2.2 + 0.13).r, nd = texture(uN, vec2(al, ac)*7. + 0.57).g;
      float band = exp(-ac*ac/0.024)*(0.3 + 0.7*exp(-al*al/0.5)) + 0.9*exp(-(al*al*1.6 + ac*ac*14.)/0.12);
      float rift = 1. - 0.75*exp(-pow((ac - 0.012 + 0.03*sin(al*2.3 + 0.4))/0.022, 2.))*smoothstep(-0.9, 0.2, al);
      float mw = band*rift*(0.45 + 0.9*nb*nb)*(0.75 + 0.5*nd)*nt*smoothstep(0.02, 0.18, d.y);
      o.rgb += mix(vec3(0.5, 0.56, 0.8), vec3(0.95, 0.78, 0.58), exp(-al*al/0.35))*mw*0.05;
      o.rgb += vec3(0.85, 0.9, 1.)*step(0.992 - 0.02*band, texelFetch(uN, ivec2(mod(floor(vec2(al, ac)*700.) + 7., 256.)), 0).a)*band*0.1*nt*smoothstep(0.02, 0.18, d.y);
    }
}`,Wt=`#version 300 es
#ifndef SMASK
#define SMASK 15
#endif
`+j0+`
out vec4 o;
uniform sampler2D uE;
const vec4 PL[7] = vec4[7](${Ht});
const float PX0 = ${a0.toFixed(1)}, PX1 = ${x0.toFixed(1)}, PZ0 = ${J0.toFixed(1)}, PZ1 = ${k0.toFixed(1)}, CT = ${gt.toFixed(2)};
void main() {
  float rs = uS[3].w; vec2 uv = gl_FragCoord.xy/rs, sc = uv*2. - 1.;
  float th = uS[2].w;
  vec3 cR = uS[3].xyz, cU = uS[4].xyz, cF = uS[5].xyz;
  vec3 ro = uS[2].xyz, rd = normalize(cF + (cR*sc.x + cU*sc.y)*th), col = vec3(0.);
  bool pond = false; float wT = 0.;
  if (rd.y < -1e-5) {
    vec3 pg = ro + rd*((GY - ro.y)/rd.y), pw = ro + rd*(-ro.y/rd.y);
    pond = pg.x > PX0 && pg.x < PX1 && pg.z > PZ0 && pg.z < PZ1 && pw.x > PX0 && pw.x < PX1 && pw.z > PZ0 && pw.z < PZ1;
    if (pond) wT = -ro.y/rd.y;
  }
  // the mirror pass starts at the water point and looks up the reflected ray; the straight pass leaves the pond to the water
  if (MIR) { if (!pond) discard; ro += rd*wT; ro.y = 0.002; rd.y = -rd.y; }
  else if (pond) discard;
  int nPl = int(uS[14].y), nBx = int(uS[14].z);
  float tb = 1e9; int id = 0; vec3 nn = vec3(0., 1., 0.); int prow = -1; float pu = 0.;
  // ground and the pond basin
  if (ro.y > GY + 1e-3) {
    if (rd.y < -1e-5) {
      float tt = (GY - ro.y)/rd.y; vec3 p = ro + rd*tt;
      if (!(p.x > PX0 && p.x < PX1 && p.z > PZ0 && p.z < PZ1)) { tb = tt; id = 1; }
      else {
        float tw = -ro.y/rd.y; vec3 pw = ro + rd*tw;
        if (pw.x > PX0 && pw.x < PX1 && pw.z > PZ0 && pw.z < PZ1) { tb = tw; id = 2; }
        else {
          float tx = ((rd.x > 0. ? PX1 : PX0) - ro.x)/(abs(rd.x) < 1e-6 ? 1e-6 : rd.x), tz = (PZ0 - ro.z)/min(rd.z, -1e-6);
          tb = min(tx, tz); id = 3; nn = tx < tz ? vec3(-sign(rd.x), 0., 0.) : vec3(0., 0., 1.);
        }
      }
    }
  } else {
    float tx = ((rd.x > 0. ? PX1 : PX0) - ro.x)/(abs(rd.x) < 1e-6 ? 1e-6 : rd.x), tz = ((rd.z > 0. ? PZ1 : PZ0) - ro.z)/(abs(rd.z) < 1e-6 ? 1e-6 : rd.z);
    float te = min(tx, tz);
    if (ro.y + rd.y*te < GY) { tb = te; id = 3; nn = tx < tz ? vec3(-sign(rd.x), 0., 0.) : vec3(0., 0., -sign(rd.z)); }
  }
  // the causeway and its two balustrades
  for (int i = 0; i < nBx; i++) {
    vec3 bmn = i == 0 ? vec3(XA - 4.7, 0., -205.) : vec3(XA + (i == 1 ? -4.75 : 4.35), CT, -205.);
    vec3 bmx = i == 0 ? vec3(XA + 4.7, CT, 300.) : vec3(XA + (i == 1 ? -4.35 : 4.75), CT + 0.9, 300.);
    vec3 iv = 1./(abs(rd) + 1e-7)*sign(rd + 1e-9);
    vec3 t0 = (bmn - ro)*iv, t1 = (bmx - ro)*iv;
    vec3 tn = min(t0, t1), tf = max(t0, t1);
    float tN = max(max(tn.x, tn.y), tn.z), tF = min(min(tf.x, tf.y), tf.z);
    if (tN < tF && tN > 0.05 && tN < tb) {
      vec3 p = ro + rd*tN;
      // the balustrade: a long stone serpent on short posts of uneven width, broken away in places
      float zc = p.z/2.15 + 0.13*float(i); vec4 bh = texelFetch(uN, ivec2(mod(floor(zc)*7. + float(i)*31., 256.), 3), 0);
      bool gap = i > 0 && ((p.y < CT + 0.5 && fract(zc) > 0.12 + 0.16*bh.r) || bh.g < 0.14 || p.y > CT + 0.62 + 0.28*bh.b);
      if (!gap) { tb = tN; id = 4; nn = tN == tn.x ? vec3(-sign(rd.x), 0., 0.) : tN == tn.y ? vec3(0., -sign(rd.y), 0.) : vec3(0., 0., -sign(rd.z)); prow = i; }
    }
  }
  // the library, the gate and the woods: profiles on planes
  for (int i = 2; i < nPl; i++) {
    vec4 pl = PL[i];
    float dn = pl.z < 0.5 ? rd.z : rd.x, on = pl.z < 0.5 ? ro.z : ro.x;
    if (abs(dn) < 1e-4) continue;
    float tn = (pl.x - on)/dn;
    if (tn < 1. || tn > tb) continue;
    float u = (pl.z < 0.5 ? ro.x + rd.x*tn : ro.z + rd.z*tn) - pl.y, un = u/pl.w;
    if (abs(un) > 0.998) continue;
    float y = ro.y + rd.y*tn;
    if (y < GY - 0.05) continue;
    vec4 pf = textureLod(uP, vec2(un*0.5 + 0.5, (float(i) + 0.5)/8.), 0.);
    float jt = 0.;
    if (i >= 4) jt = (texture(uN, vec2(u, y)*0.05).r - 0.5)*1.6 + (texture(uN, vec2(u, y)*vec2(0.19, 0.7)).g - 0.5)*1.5;
    if (y < pf.b + jt*0.4 || (y > pf.g - jt && y < pf.r + jt)) { tb = tn; id = 5; prow = i; pu = un; nn = pl.z < 0.5 ? vec3(0., 0., -sign(rd.z)) : vec3(-sign(rd.x), 0., 0.); }
  }
  // the far forest all round
  float hl = length(rd.xz);
  if (rd.y < 0.25 && hl > 1e-3) {
    float tc = 520./hl;
    if (tc < tb) {
      float az = at2(rd.x, -rd.z), y = ro.y + rd.y*tc;
      float top = textureLod(uP, vec2(az/6.2832 + 0.5, 7.5/8.), 0.).r + (texture(uN, vec2(az*90., y*0.05)).r - 0.5)*2.5;
      if (y < top) { tb = tc; id = 6; nn = -vec3(rd.x, 0., rd.z)/hl; }
    }
  }
  vec3 ac = airC(rd);
  // the temple: the long gallery (178 m), then the pyramid and its towers (285 m), each an elevation picture with real
  // openings (alpha), tone, the face's sideways turn and its depth layer, laid front to back over the solid thing behind
  vec4 tA = vec4(0.); float tD = 0.;
  float sx = clamp(SUN.x*inversesqrt(dot(SUN.xz, SUN.xz) + 1e-6)*12., -1., 1.); // the glow's side, as the faces turned north and south see it
  if (rd.z < -1e-4) for (int k = 0; k < 2; k++) {
    float t = ((k == 0 ? -178. : -285.) - ro.z)/rd.z;
    if (t < 1. || t > tb) continue;
    float u = ro.x + rd.x*t - XA, y = ro.y + rd.y*t;
    float v0 = k == 0 ? (u < 0. ? 1216. : 1600.) : 0.;
    vec2 eu = k == 0 ? vec2(u < 0. ? u*0.01 + 1. : u*0.01, (v0 + (GY + 20.5 - y)*15.238)/2048.) : vec2(u/120. + 0.5, (GY + 67. - y)*0.0083333);
    if (abs(u) > (k == 0 ? 100. : 60.) || y < GY - 0.4 || eu.y < v0/2048.) continue;
    float lod = log2(t*2.*th/rs*(k == 0 ? 20.48 : 17.07));
    vec4 e = textureLod(uE, eu, max(lod - 0.5, 0.));
    float cv = clamp((e.a - 0.5)*max(exp2(0.5 - lod), 1.) + 0.5, 0., 1.);
    if (cv < 0.003) continue;
    vec3 ev = e.rgb/max(e.a, 0.004);
    if (k == 1) ev.b += 0.3*smoothstep(GY + 34., GY + 64., y); // the towers rise into paler air
    float nx = ev.g*2. - 1.;
    vec3 alb = vec3(0.24, 0.22, 0.18)*(0.08 + 1.5*ev.r*ev.r)*0.75*uS[12].y/(0.5 + 0.5*uS[12].y);
    vec3 c = alb*(irr(vec3(nx, 0., sqrt(max(1. - nx*nx, 0.))))*(1. - 0.6*max(-nx*sx, 0.)) + mix(vec3(dot(HG, vec3(0.3, 0.5, 0.2))), HG, 0.45)*(0.3 + 0.7*smoothstep(-0.12, -0.01, SUN.y))*(0.015*abs(nx) + 0.55*max(nx*sx, 0.)));
    // after sunrise a faint warm rim on the faces turned toward the sun
    c += (HG*0.04 + SC*0.12*uS[1].w)*alb*20.*smoothstep(-0.01, 0.04, SUN.y)*pow(max(nx*(sx < 0. ? -1. : 1.), 0.), 3.);
    c += HG*0.025*uS[0].w*max(uS[0].w, 0.)*pow(max(dot(rd, SUN), 0.), 6.);
    c = mix(c, ac, min((1. - exp(-t/FOG))*uS[12].z*(0.4 + ev.b) + 0.007*ev.b*(1. + 2.*uS[12].z), 0.92));
    if (tA.a < 0.5) tD = t;
    tA += (1. - tA.a)*vec4(c*cv, cv);
  }
  if (id == 0 && tA.a < 0.003) discard;
#if SMASK != 15
  int gi = (id == 1 || id == 3 || id == 4 && prow == 0) ? 0 : id == 4 ? 1 : id == 5 ? 2 : 3;
  if (((SMASK >> gi) & 1) == 0) discard;
#endif
  vec3 p = ro + rd*tb;
  vec3 sAlb = vec3(0.), sN = vec3(0., 1., 0.);
  bool road = id == 4 && prow == 0 && nn.y > 0.5, cwall = id == 4 && prow == 0 && !road;
  if (id == 1 || id == 3 || id == 4 && prow == 0) {
#if SMASK & 1
    // laterite blocks round the pond, short grass beyond; the causeway's sandstone flags, laid the same way but larger
    float ex = max(max(PX0 - p.x, p.x - PX1), max(PZ0 - p.z, p.z - PZ1));
    vec2 bq = road ? p.zx*vec2(0.55, 0.62) : id == 1 ? p.xz : vec2(abs(nn.x) > 0.5 ? p.z : p.x, (p.y - GY)*(cwall ? 1.3 : 2.2));
  // courses of uneven height, blocks of uneven length, worn joints, moss
  float rowf = bq.y/0.42, row = floor(rowf);
  vec4 rh = texelFetch(uN, ivec2(mod(row*7. + 3., 256.), 11), 0);
  float xc = bq.x/(0.5 + 0.5*rh.b) + rh.a*3., cc = floor(xc);
  vec4 bh = texelFetch(uN, ivec2(mod(cc*13. + row*3., 256.), mod(row*7. + 29., 256.)), 0);
  float jd = min(min(fract(rowf), 1. - fract(rowf))*0.42, min(fract(xc), 1. - fract(xc))*0.6);
  float jn = texture(uN, bq*1.3).r, joint = smoothstep(0.012 + 0.03*jn*jn, 0.004, jd);
  float pore = smoothstep(0.55, 0.75, texture(uN, bq*0.9).r*0.6 + texture(uN, bq*3.3).g*0.4);
  vec3 lat = (road ? vec3(0.075, 0.068, 0.056) : vec3(0.22, 0.11, 0.065))*(0.78 + 0.4*bh.a)*(1. - 0.7*pore)*(1. - 0.6*joint);
  float mo = smoothstep(0.45, 0.78, texture(uN, bq*0.21 + 0.5).g);
  lat = mix(lat, vec3(0.04, 0.058, 0.026)*(0.7 + 0.6*jn), clamp(mo*0.55 + joint*0.45, 0., 0.85));
  if (id == 3) lat *= 0.8 + 0.4*smoothstep(0., 0.5, p.y);
  if (cwall) lat *= 0.55*(0.45 + 0.55*smoothstep(GY, GY + 0.9, p.y)); // the causeway's side: big dark blocks, damp at the foot
    float gr = texture(uN, p.xz*0.35).g*0.6 + texture(uN, p.xz*2.3).r*0.4;
    vec3 grass = vec3(0.05, 0.065, 0.03)*(0.5 + 0.9*gr)*(0.7 + 0.5*texture(uN, p.xz*0.05).r);
    vec3 alb = (id >= 3 || ex < 1.6) ? lat : grass;
    sAlb = alb; sN = nn;
#endif
  }
  else if (id == 4) {
#if SMASK & 2
    vec3 q = p*vec3(1., 2.3, 1.);
    vec2 bq = abs(nn.y) > 0.5 ? p.xz*vec2(1.4, 0.9) : vec2((abs(nn.x) > 0.5 ? p.z : p.x)*1.6, p.y*2.6);
    vec2 bf = abs(fract(bq + vec2(floor(bq.y)*0.5, 0.)) - 0.5);
    float joint = smoothstep(0.45, 0.5, max(bf.x, bf.y));
    float lich = texture(uN, bq*0.11).g;
    vec3 alb = vec3(0.17, 0.155, 0.13)*(0.75 + 0.45*texture(uN, bq*0.37).r)*(1. - 0.5*joint)*(1. - 0.45*smoothstep(0.5, 0.8, lich));
    if (prow > 0) alb *= 0.3;
    if (prow > 0) { sAlb = alb; sN = nn; }
#endif
  }
  else if (id == 5) {
#if SMASK & 4
    float y = p.y;
    vec4 pl = PL[prow];
    float u = pu*pl.w;
    if (prow < 4) {
      float course = smoothstep(0.42, 0.5, abs(fract(y/0.52) - 0.5));
      float bl = texture(uN, vec2(u*0.3, y*0.6)).r, lich = texture(uN, vec2(u, y)*0.06).g;
      vec3 alb = vec3(0.24, 0.22, 0.18)*(0.7 + 0.5*bl)*(1. - 0.35*course)*(1. - 0.5*smoothstep(0.45, 0.8, lich));
      if (prow >= 2) {
        float yy = y - GY, au = abs(u);
        float pil = 1. - smoothstep(0.3, 0.38, abs(fract(u/2.7) - 0.5));
        bool op = prow == 2 ? (au < 1.1 && yy > 1.7 && yy < 4.6) || (au > 3. && au < 11.5 && yy > 2.5 && yy < 4.4 && abs(fract(au/2.7) - 0.5) < 0.17)
                            : (au < 1.6 && yy < 4.2) || (abs(au - 108.) < 1.2 && yy < 3.6);
        alb *= (1. - 0.3*pil)*(0.55 + 0.45*texture(uN, vec2(u*0.7, y*0.05)).r);
        if (op) alb *= prow == 2 && yy > 2.4 && au > 2. ? 0.12 + 0.5*step(0.6, fract(u*5.)) : 0.08;
        alb *= 0.35;
      }
      sAlb = alb; sN = nn;
    } else {
      float lf = texture(uN, vec2(u, y)*0.3).r;
      vec3 alb = vec3(0.03, 0.045, 0.025)*(0.6 + 0.8*lf);
      sAlb = alb; sN = nn;
      float m = max(dot(rd, SUN), 0.);
      col += HG*0.05*pow(m, 12.)*lf;
    }
#endif
  }
  else if (id == 6) {
#if SMASK & 8
    sAlb = vec3(0.025, 0.035, 0.022); sN = nn;
#endif
  }
  float hz = id == 5 ? uS[12].z : 1.;
  col += sAlb*irr(sN); col = mix(col, ac, min((1. - exp(-tb/FOG))*hz, 1.));
  // the temple over it; two passes: everything fully covered first (distance in alpha), then only the pixels the temple
  // covers in part (its outline and the edges of its openings), premultiplied and blended over the sky
  float A = id == 0 ? tA.a : 1.;
  col = tA.rgb + (id == 0 ? vec3(0.) : (1. - tA.a)*col);
  bool ep = uS[19].w > 0.5;
  if (ep ? A > 0.999 : A < 0.999) discard;
  o = ep ? vec4(col, A) : vec4(col, tA.a > 0.5 ? tD : tb);
}`,ke=`#version 300 es
`+j0+`
uniform sampler2D uL;
uniform sampler2D uM;
uniform sampler2D uA;
uniform sampler2D uB;
out vec4 o;
const vec4 PL[7] = vec4[7](${Ht});
const float PX0 = ${a0.toFixed(1)}, PX1 = ${x0.toFixed(1)}, PZ0 = ${J0.toFixed(1)}, PZ1 = ${k0.toFixed(1)}, CT = ${gt.toFixed(2)};
vec3 aces(vec3 x) { vec3 y = max((x*(2.51*x + 0.03))/(x*(2.43*x + 0.59) + 0.14), 0.); return mix(y, 0.95 + 0.05*(1. - exp(-(y - 0.95)/0.05)), step(0.95, y)); } // soft shoulder: no per-channel clip rings round the sun
vec2 ring(vec2 q, vec4 r) {
  float age = TT - r.z;
  if (age < 0. || age > 10. || r.w <= 0.) return vec2(0.);
  vec2 dq = q - r.xy; float d = length(dq) + 1e-3;
  float Rr = 0.05 + 0.3*age, wl = 0.06 + 0.045*age, x = d - Rr;
  float env = exp(-x*x/(0.004 + 0.05*age))*(x < 0. ? 1. : exp(-x*x*60.));
  float k = 6.2832/wl;
  float a = r.w*exp(-age*0.4)/(1. + d*2.);
  float dimple = r.w*30.*exp(-d*d*80.)*exp(-age*5.);
  return (a*k*cos(k*x)*env + dimple*d)*dq/d;
}
vec2 vnG(vec2 a) {
  // the slope of smooth value noise, interpolated here from a random channel at full precision: finite differences of the
  // 8-bit texture's own filtering came in steps, which drew the far glints as square-ended knife edges
  vec2 p = a*32., i = floor(p), f = p - i, u = f*f*(3. - 2.*f), du = 6.*f*(1. - f);
  float A = texelFetch(uN, ivec2(mod(i, 256.)), 0).b, B = texelFetch(uN, ivec2(mod(i + vec2(1., 0.), 256.)), 0).b;
  float C = texelFetch(uN, ivec2(mod(i + vec2(0., 1.), 256.)), 0).b, D = texelFetch(uN, ivec2(mod(i + 1., 256.)), 0).b;
  return 19.*du*vec2(B - A + (A - B - C + D)*u.y, C - A + (A - B - C + D)*u.x);
}
vec4 rainR(vec2 q, int k) {
  // rain on the pond: one drop's ring per metre cell on two offset grids, each drop at its own place and time
  vec2 o = k == 1 ? vec2(0.5, 0.31) : vec2(0.), cc = floor(q + o);
  vec4 h = texelFetch(uN, ivec2(mod(cc*vec2(1., 7.) + float(k)*91., 256.)), 0);
  float P = 0.55 + 0.5*h.r, u = TT/P + h.g, cy = floor(u);
  vec4 h2 = texelFetch(uN, ivec2(mod(cc + cy*vec2(17., 29.), 256.)), 0);
  return vec4(cc + 0.35 + 0.3*h2.rg - o, TT - fract(u)*P, 0.0011*step(0.3, h2.b));
}
vec2 wGrad(vec2 q, float t) {
  vec2 wd = uS[6].xy; float along = dot(q - uS[2].xz, wd), front = uS[6].w;
  float gust = uS[6].z*smoothstep(front + 4., front - 4., along)*exp(-max(front - along, 0.)/35.);
  float pt = texture(uN, q*0.005 + vec2(TT*0.004, -TT*0.003)).g;
  float amp = uS[13].x*smoothstep(0.48, 0.78, pt) + gust*(0.35 + 1.1*pt) + uS[19].y*0.7;
  float fade = 1./(1. + t*0.04);
  vec2 g = vec2(0.);
  // cat's-paws where the air moves (two scales), and a slow swell that is all but still except in a few patches
  for (int k = 0; k < 3; k++) {
    if (k < 2 && amp <= 0.002) continue;
    vec2 a = k == 2 ? q*0.02 + vec2(TT*0.001, 0.) : (q*0.2 - wd*TT*0.03)*(k == 1 ? 2.7 : 1.) + (k == 1 ? 0.3 : 0.);
    g += vnG(a)*(k == 2 ? 0.0005*(0.12 + 1.1*smoothstep(0.45, 0.8, pt)) : amp*fade*(k == 0 ? 0.003 : 0.0012));
  }
  for (int i = 0; i < int(uS[16].y) + 2*int(uS[19].y); i++) g += ring(q, i == 0 ? uS[7] : i == 1 ? uS[8] : i == 2 ? uS[9] : i == 3 ? uS[10] : rainR(q, i - 4));
  return g;
}
float mistT(float y0, float dy, float D) {
  // the mist starts some way out (uS[18].z): the near water stays clear and the towers rise out of it
  float a = uS[18].x, H = uS[18].y, g = uS[18].z;
  if (D <= g) return 0.;
  y0 += dy*g; D = min(D - g, 3000.);
  float k = dy*D/H;
  return a*exp(-max(y0, 0.)/H)*(abs(k) < 1e-3 ? D : H*(1. - exp(-k))/dy);
}
float padDens(vec2 q) {
  float dz = abs(uS[15].w - q.y);
  vec2 c0 = (q - uS[17].xy)/vec2(2.4, 3.4), c1 = (q - uS[17].zw)/vec2(2., 3.);
  float near = exp(-dz/7.)*0.3 + exp(-dot(c0, c0)) + 0.8*exp(-dot(c1, c1)), left = smoothstep(PX0 + 13., PX0 + 1., q.x), right = smoothstep(PX1 - 7., PX1 - 0.5, q.x)*0.7;
  float clump = texture(uN, q*0.013 + 0.3).r;
  float d = (near*0.95 + left*0.85 + right + 0.2*smoothstep(0.55, 0.8, clump))*smoothstep(0.3, 0.65, clump + near*0.35);
  float sl = (q.x - uS[15].x)/max(uS[15].y - q.y, 0.5) - uS[15].z;
  d *= 1. - 0.9*exp(-sl*sl/0.012)*smoothstep(3.5, 6., uS[15].y - q.y);
  return d*uS[13].w;
}
void main() {
  float rs = uS[3].w; vec2 uv = gl_FragCoord.xy/rs, sc = uv*2. - 1.;
  float th = uS[2].w;
  vec3 cR = uS[3].xyz, cU = uS[4].xyz, cF = uS[5].xyz;
  vec3 ro = uS[2].xyz, rd = normalize(cF + (cR*sc.x + cU*sc.y)*th), col = vec3(0.);
  bool pond = false; float wT = 0.;
  if (rd.y < -1e-5) {
    vec3 pg = ro + rd*((GY - ro.y)/rd.y), pw = ro + rd*(-ro.y/rd.y);
    pond = pg.x > PX0 && pg.x < PX1 && pg.z > PZ0 && pg.z < PZ1 && pw.x > PX0 && pw.x < PX1 && pw.z > PZ0 && pw.z < PZ1;
    if (pond) wT = -ro.y/rd.y;
  }
  vec3 ac = airC(rd); float tau = 0.;
  if (pond) {
    vec3 p = ro + rd*wT, iUp = irr(vec3(0., 1., 0.)); float tb = wT;
    float pCov = 0., pSh = 0.; vec3 pCol = vec3(0.), wBody = vec3(0.); vec2 wOff = vec2(0.);
    vec2 q = p.xz;
    // a floating lotus leaf in this cell?
    float cs = 1.15; vec2 ci = floor(q/cs);
    vec4 h1 = texelFetch(uN, ivec2(mod(ci, 256.)), 0), h2 = texelFetch(uN, ivec2(mod(ci + vec2(97., 41.), 256.)), 0);
    float px = tb*2.*th/rs;
    if (h1.b < padDens(q)) {
      float rad = cs*(0.08 + 0.27*h1.a*h1.a);
      vec2 cen = (ci + 0.5)*cs + (vec2(h2.b, h2.a) - 0.5)*2.*(cs*0.5 - rad*1.1);
      vec2 dp = q - cen; float r = length(dp) + 1e-5; vec2 dr = dp/r;
      float wav = texture(uN, dr*0.06 + vec2(h2.b, h1.a)).r;
      float ed = rad*(0.86 + 0.28*wav);
      vec2 nd = normalize(vec2(h2.r, h1.r) - 0.5 + 1e-4); // the notch, cut from the rim to the stalk
      if (dot(dr, nd) > 0.) ed *= mix(0.06, 1., smoothstep(0.05, 0.17, abs(dr.x*nd.y - dr.y*nd.x)));
      pCov = clamp((ed - r)/max(px*1.2, 1e-4) + 0.5, 0., 1.);
      if (pCov > 0.) {
        float s = r/ed;
        vec3 pn = vec3(0., 1., 0.);
        float ang = at2(dr.y, dr.x);
        float vein = pow(abs(cos(ang*9.5 + h2.b*6.)), 24.)*smoothstep(0.08, 0.3, s)*(1.2 - s);
        float mt = texture(uN, q*1.7).g;
        vec3 alb = vec3(0.04, 0.075, 0.04)*(0.6 + 0.7*mt) + vec3(0.035, 0.045, 0.02)*vein;
        alb = mix(alb, vec3(0.09, 0.07, 0.03), smoothstep(0.6, 0.85, texture(uN, q*0.9 + 0.2).r)*smoothstep(0.7, 1., s));
        alb = mix(alb, vec3(0.14, 0.15, 0.08), smoothstep(0.09, 0.04, s));
        vec3 rr = reflect(rd, pn);
        float sh = 0.025 + 0.06*pow(1. - max(dot(-rd, pn), 0.), 4.);
        pCol = alb*iUp; pSh = sh*(0.6 + 0.4*mt);
        float rimS = smoothstep(0.9, 0.99, s)*max(dot(dr, normalize(SUN.xz)), 0.)*max(-dot(rd.xz, dr), 0.);
        pCol += (HG*0.025 + SC*0.2*uS[1].w)*rimS*(0.4 + mt);
      }
    }
    vec2 g = wGrad(q, tb);
    vec3 n = normalize(vec3(-g.x, 1., -g.y));
    float cosi = max(dot(-rd, n), 0.);
    float F = 0.02 + 0.98*pow(1. - cosi, 5.);
    vec3 rr = reflect(rd, n);
    if (rr.y < 0.003) rr = normalize(vec3(rr.x, 0.003, rr.z));
    vec3 rm = vec3(rr.x, -rr.y, rr.z);
    vec2 pa = vec2(dot(rm, cR), dot(rm, cU))/dot(rm, cF), pb = vec2(dot(rd, cR), dot(rd, cU))/dot(rd, cF);
    wOff = (pa - pb)*0.5/th;
    wBody = vec3(0.01, 0.013, 0.008)*(iUp + 0.2)*(1. - F);
    vec2 wo = clamp(uv + wOff, 0.001, 0.999);
    vec4 rB = textureLod(uB, wo, 0.); vec3 rc = rB.rgb;
    tau = mistT(ro.y, rd.y, wT) + 0.5*mistT(0., -rd.y, rB.a);
    vec4 Rl = textureLod(uM, wo, 0.);
    rc = rc*(1. - Rl.a) + Rl.rgb;
    // still water before sunrise carries the sky's own colour down to your feet: a little more mirror than Fresnel alone
    // (the surface is never quite flat) and a silty body lit by the sky overhead, olive-violet, darker straight down
    float Fe = max(F, 0.15 - 0.06*smoothstep(-0.35, -0.8, rd.y));
    col = vec3(0.115, 0.11, 0.13)*mix(vec3(dot(iUp, vec3(0.3, 0.5, 0.2))), iUp, 0.3)*(1. - Fe) + Fe*rc;
    col = mix(col, pCol + pSh*rc, pCov);
    col = mix(col, ac, 1. - exp(-tb/FOG));
  } else { vec4 sA = textureLod(uA, uv, 0.); col = sA.rgb; tau = mistT(ro.y, rd.y, sA.a); }
  col = mix(col, ac*0.85 + SC*0.05, 1. - exp(-tau));
  vec4 L = textureLod(uL, uv, 0.);
  col = col*(1. - L.a) + L.rgb;
  col *= uS[5].w;
  col = aces(col);
  col = pow(col, vec3(1./2.2));
  col += (texelFetch(uN, ivec2(mod(gl_FragCoord.xy, 256.)), 0).b - 0.5)*0.005;
  o = vec4(col, 1.);
}`,Yt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
in vec4 a0; in vec4 a1; in vec4 a2; in vec4 a3;
uniform vec4 uS[20];
flat out vec4 vP; flat out vec4 vQ; flat out vec4 vC; flat out vec4 vX; flat out vec3 vA; flat out vec3 vB; flat out vec2 vZ;
vec2 windAt(vec3 p, float ph) {
  float T = uS[4].w;
  vec2 wd = uS[6].xy; float along = dot(p.xz - uS[2].xz, wd), front = uS[6].w;
  float gust = uS[6].z*smoothstep(front + 4., front - 4., along)*exp(-max(front - along, 0.)/35.);
  float br = 0.25 + uS[13].x;
  vec2 b = vec2(sin(T*0.9 + ph + p.x*0.11), sin(T*1.3 + ph*1.7 + p.z*0.13))*0.012*br;
  return b + wd*gust*(0.05 + 0.025*sin(T*7. + ph*3. + p.x));
}
void main() {
  int k = gl_VertexID;
  vec2 cn = vec2((k == 1 || k == 4 || k == 5) ? 1. : -1., (k == 2 || k == 3 || k == 5) ? 1. : -1.);
  vec3 ro = uS[2].xyz; float th = uS[2].w; vec2 res = vec2(uS[3].w);
  vec3 cR = uS[3].xyz, cU = uS[4].xyz, cF = uS[5].xyz;
  bool mir = uS[13].z > 2.5;
  float kind = a2.w;
  vec3 A = a0.xyz, B = a1.xyz;
  gl_Position = vec4(2., 2., 2., 1.);
  if ((kind > 1.5) != (uS[16].w > 0.5)) return; // pass 0: capsules and glows, pass 1: discs
  vP = vec4(0.); vQ = vec4(0.); vC = a2; vX = a3; vA = A; vB = B; vZ = vec2(1.);
  float fp = res.y*0.5/th;
  if (kind > 1.5) {
    vec2 w = windAt(A, a3.x*7.);
    A.xz += w*a1.w*max(A.y, 0.)*3.;
    vec3 N = a1.xyz, Tg = a3.xyz;
    if (mir) { A.y = -A.y; N.y = -N.y; Tg.y = -Tg.y; }
    vec3 da = A - ro;
    vec3 a = vec3(dot(da, cR), dot(da, cU), dot(da, cF));
    if (a.z < 0.1) return;
    float rp = a0.w*max(a3.w, 1.)*fp/a.z*1.5 + 2.;
    vec2 pc = res*0.5 + a.xy/a.z*fp;
    if (pc.x + rp < 0. || pc.y + rp < 0. || pc.x - rp > res.x || pc.y - rp > res.y) return;
    gl_Position = vec4((pc + cn*rp)/res*2. - 1., 0., 1.);
    vA = A; vB = N; vX = vec4(Tg, a3.w); vQ = vec4(a0.w, 0., 0., 0.);
    return;
  }
  vec2 w = windAt(A, a3.y);
  A.xz += w*a3.x*max(A.y - a3.w, 0.); B.xz += w*a3.x*max(B.y - a3.w, 0.);
  if (kind > 0.5) B = A;
  if (mir) { A.y = -A.y; B.y = -B.y; }
  vec3 da = A - ro, db = B - ro;
  vec3 a = vec3(dot(da, cR), dot(da, cU), dot(da, cF));
  vec3 b = vec3(dot(db, cR), dot(db, cU), dot(db, cF));
  float nr = 0.12;
  if (a.z < nr && b.z < nr) return;
  float ta = a.z < nr ? (nr - a.z)/(b.z - a.z) : 0.;
  float tb = b.z < nr ? (nr - a.z)/(b.z - a.z) : 1.;
  vec3 a2_ = mix(a, b, ta), b2 = mix(a, b, tb);
  vec2 pa = res*0.5 + a2_.xy/a2_.z*fp, pb = res*0.5 + b2.xy/b2.z*fp;
  float rpa = mix(a0.w, a1.w, ta)*fp/a2_.z, rpb = mix(a0.w, a1.w, tb)*fp/b2.z;
  float mr = kind > 0.5 ? 1.3 : 0.6, cov = 1.;
  if (kind < 0.5) { cov = clamp(max(rpa, rpb)/mr, 0., 1.); }
  rpa = max(rpa, mr); rpb = max(rpb, mr);
  if (cov < 0.03) return;
  float Rr = max(rpa, rpb)*(kind > 0.5 ? 3. : 1.) + 1.;
  vec2 lo = min(pa, pb) - Rr, hi = max(pa, pb) + Rr;
  if (hi.x < 0. || hi.y < 0. || lo.x > res.x || lo.y > res.y) return;
  vec2 dv = pb - pa; float L = length(dv); vec2 dir = L > 1e-4 ? dv/L : vec2(1., 0.); vec2 nm = vec2(-dir.y, dir.x);
  vec2 P = (cn.x < 0. ? pa - dir*Rr : pb + dir*Rr) + nm*cn.y*Rr;
  gl_Position = vec4(P/res*2. - 1., 0., 1.);
  vP = vec4(pa, pb); vQ = vec4(rpa, rpb, cov, 0.);
  vA = mix(A, B, ta); vB = mix(A, B, tb); vZ = vec2(a2_.z, b2.z);
}`,Kt=`#version 300 es
`+j0+`
flat in vec4 vP; flat in vec4 vQ; flat in vec4 vC; flat in vec4 vX; flat in vec3 vA; flat in vec3 vB; flat in vec2 vZ;
out vec4 o;
vec3 lightObj(vec3 n, vec3 dir, vec3 alb, float tr) {
  float sv = uS[1].w;
  vec3 amb = irr(n);
  float fw = max(dot(dir, SUN), 0.), edge = 1. - abs(dot(n, dir));
  float bl = smoothstep(-0.06, 0.01, SUN.y);
  vec3 rim = (SC*sv*0.8 + HG*0.12*bl)*pow(fw, 10.)*pow(edge, 2.5);
  vec3 trn = (SC*sv*1.5 + HG*0.12*bl)*pow(fw, 4.)*tr*max(dot(n, dir), 0.);
  return alb*(amb - SC*max(dot(n, SUN), 0.)*sv*0.6) + rim*(0.25 + alb*3.) + trn*alb*1.6;
}
void main() {
  vec3 oN = vec3(0., 1., 0.), oD = vec3(0., 0., -1.), oA = vec3(0.); float oT = 0., oF = 0., oC = 0.;
  bool mir = uS[13].z > 2.5;
  vec3 ro = uS[2].xyz; float th = uS[2].w; float res = uS[3].w;
  vec3 cR = uS[3].xyz, cU = uS[4].xyz, cF = uS[5].xyz;
  float kind = vC.w;
  vec3 dC = vec3(0.);
#ifdef DISC
  {
    // a lotus leaf or petal: a cupped bowl whose rim rises and falls in two and three lobes, hit exactly by the eye ray
    vec2 sc = gl_FragCoord.xy/res*2. - 1.;
    vec3 rd = normalize(cF + (cR*sc.x + cU*sc.y)*th);
    vec3 N = vB;
    vec3 Tg = normalize(vX.xyz - N*dot(vX.xyz, N)), Bt = cross(N, Tg);
    float Rr = vQ.x, asp = max(vX.w, 1.);
    bool petal = kind > 2.5 && kind < 3.5, fan = kind > 3.5; // fan: a palm leaf, seen only as a dark fringed silhouette
    vec4 lh = texelFetch(uN, ivec2(mod(floor(vX.xz*97. + 131.), 256.)), 0); // per-leaf randoms keyed on the tangent, which the wind never moves
    vec2 ph2 = (lh.rg - 0.5)*(petal || fan ? 0. : 0.5), ph3 = (lh.ba - 0.5)*(petal || fan ? 0. : 0.36);
    float kap = petal ? 0.45 : fan ? 0.12 : 0.16 + 0.22*lh.a;
    vec3 oo = ro - vA;
    vec3 ol = vec3(dot(oo, Tg)/asp, dot(oo, Bt), dot(oo, N))/Rr, dl = vec3(dot(rd, Tg)/asp, dot(rd, Bt), dot(rd, N))/Rr;
    float K = kap, t = 0., miss = 0.; vec2 hh = vec2(0.);
    for (int i = 0; i < int(uS[16].z); i++) {
      float qa = K*dot(dl.xy, dl.xy), qb = 2.*K*dot(ol.xy, dl.xy) - dl.z, qc = K*dot(ol.xy, ol.xy) - ol.z;
      float dis = qb*qb - 4.*qa*qc;
      miss = max(miss, step(dis, 0.));
      float sq = sqrt(max(dis, 0.)), t1 = (-qb - sq)/(2.*qa + 1e-9), t2 = (-qb + sq)/(2.*qa + 1e-9);
      if (abs(qa) < 1e-7) { t1 = -qc/qb; t2 = t1; }
      float tA = min(t1, t2), tB = max(t1, t2);
      vec2 hA = ol.xy + dl.xy*tA;
      t = tA; hh = hA;
      if (tA < 0.05 || dot(hA, hA) > 1.3) { t = tB; hh = ol.xy + dl.xy*tB; }
      float rr = length(hh) + 1e-5; vec2 u = hh/rr;
      K = kap + dot(vec2(u.x*u.x - u.y*u.y, 2.*u.x*u.y), ph2) + rr*dot(vec2(u.x*(4.*u.x*u.x - 3.), u.y*(3. - 4.*u.y*u.y)), ph3);
    }
    if (t < 0.05 || miss > 0.5) discard;
    float lu = hh.x, lv = hh.y;
    // petals: narrow at the base, drawn to a point at the tip
    if (petal) lv /= (1. - 0.62*max(lu, 0.))*(1. - 0.3*max(-lu, 0.));
    float r = length(vec2(lu, lv));
    float px = t*2.*th/res/Rr;
    vec2 dd = normalize(vec2(lu, lv) + 1e-5);
    vec2 sd = vX.xz*7.3;
    float n1 = textureLod(uN, dd*0.03 + sd, 0.).r, n2 = textureLod(uN, dd*0.12 + sd*1.4, 0.).g;
    float ang = at2(lv, lu);
    float wv = petal ? 0. : fan ? (asp > 1.5 ? -0.6*(1. - pow(abs(sin(lu*asp*9. + lh.r*6.)), 0.4))*smoothstep(0., 0.3, abs(lv)) : -0.4*(1. - pow(abs(sin(ang*19. + lh.r*6. + n2*4.)), 0.45))*smoothstep(0.2, 0.6, r) - 0.15*n1 - 1.4*smoothstep(-0.25, -0.65, lu)) : (n1 - 0.5)*0.16 + (n2 - 0.5)*0.1;
    float cov = clamp((1. + wv - r)/max(px, 1e-4) + 0.5, 0., 1.);
    if (cov < 0.004) discard;
    vec3 P = ro + rd*t;
    if (mir && -P.y < -0.01) discard;
    if (!mir && P.y < -0.01) discard;
    float u2 = lu*lu - lv*lv, v2 = 2.*lu*lv, u3 = 3.*(lu*lu - lv*lv), v3 = 6.*lu*lv;
    vec2 gH = 2.*kap*vec2(lu, lv) + vec2(2.*(lu*ph2.x + lv*ph2.y), 2.*(lu*ph2.y - lv*ph2.x)) + vec2(u3*ph3.x + v3*ph3.y, u3*ph3.y - v3*ph3.x);
    vec3 n = normalize(N - Tg*gH.x/asp - Bt*gH.y), dir = rd;
    if (mir) { n.y = -n.y; dir.y = -dir.y; }
    bool under = dot(n, dir) > 0.;
    vec3 nf = under ? -n : n, am = irr(nf);
    // light from the dawn glow (the sky's bright quarter, low) and the sun once it is up; what lands on the face turned away
    // from you comes through the leaf as green-gold light
    float bl = smoothstep(-0.14, 0.01, SUN.y);
    vec3 G = normalize(vec3(SUN.x, max(SUN.y, 0.) + 0.14, SUN.z));
    vec3 Lc = HG*(0.12 + 0.3*bl) + SC*uS[1].w*1.4;
    float tr = max(dot(under ? n : -n, G), 0.), fw = max(dot(dir, G), 0.);
    vec3 alb, trc;
    if (fan) {
      dC = vC.rgb*am + Lc*0.012*tr*tr;
    } else if (petal) {
      float tip = smoothstep(-0.4, 0.95, lu);
      alb = mix(vec3(0.6, 0.5, 0.5), vC.rgb, tip);
      alb *= 1. - 0.25*smoothstep(0.012, 0., abs(fract(lv*4.5 + 0.5) - 0.5)*0.22)*smoothstep(0.6, 1.4, 0.03/max(px, 1e-4));
      trc = alb*vec3(1., 0.75, 0.75);
      dC = alb*am*0.9 + trc*Lc*(0.22*tr + 0.5*tr*tr + 0.12*pow(fw, 4.));
    } else {
      // radial veins from the navel, forking toward the rim; the navel pale, the rim edge thin and catching the light
      float vw = max(0.016, px*0.9);
      float v1 = abs(fract(ang*3.024 + lh.a) - 0.5)*0.3307*r, v2_ = abs(fract(ang*6.048 + lh.a*2. + 0.5) - 0.5)*0.1653*r;
      float vein = clamp(smoothstep(vw, 0., v1)*smoothstep(0.05, 0.16, r) + 0.6*smoothstep(vw*0.8, 0., v2_)*smoothstep(0.5, 0.7, r), 0., 1.);
      float mt = textureLod(uN, vec2(lu, lv)*0.08 + sd, 0.).g;
      alb = vC.rgb*(0.7 + 0.5*mt);
      alb = mix(alb, vec3(0.08, 0.075, 0.035), smoothstep(0.55, 0.85, textureLod(uN, vec2(lu, lv)*0.05 + sd*1.3, 0.).r)*smoothstep(0.6, 1., r));
      alb = mix(alb, vec3(0.085, 0.11, 0.04), smoothstep(0.08, 0.03, r) + vein*(under ? 0.7 : 0.4));
      trc = vec3(0.06, 0.11, 0.018)*(0.6 + 0.8*mt)*(1. - 0.7*vein)*(1. - 0.5*smoothstep(0.1, 0., r));
      dC = alb*am + trc*Lc*(0.15*tr + tr*tr*tr)*(0.4 + 0.6*fw);
      if (!under) {
        // waxy bloom: mirrors the sky softly, strongest at grazing angles
        vec3 rf = reflect(dir, n); rf.y = max(rf.y, 0.02);
        float fr = pow(clamp(1. - abs(dot(n, dir)), 0., 1.), 3.);
        float sw = dot(normalize(rf.xz + 1e-5), normalize(SUN.xz))*0.5 + 0.5;
        vec3 skR = mix(HG*(0.12 + 0.6*sw*sw*sw*sw), vec3(0.05, 0.08, 0.22), sqrt(clamp(rf.y, 0., 1.)));
        dC += skR*(0.02 + 0.07*fr);
      }
    }
    dC += Lc*0.35*smoothstep(0.9, 1., r)*pow(fw, 3.)*(petal ? 0.6 : fan ? 0.12 : 0.3);
    oD = dir; oF = t; oC = cov;
  }
#else
  {
  vec2 P = gl_FragCoord.xy, pa = vP.xy, pb = vP.zw, ba = pb - pa;
  float h = clamp(dot(P - pa, ba)/max(dot(ba, ba), 1e-6), 0., 1.);
  float r = mix(vQ.x, vQ.y, h);
  vec2 off = P - pa - ba*h; float d = length(off);
  if (kind > 0.5) {
    float e = exp(-2.5*d*d/(r*r)); if (e < 0.004) discard;
    o = vec4(vC.rgb*e, 0.);
    return;
  }
  float cov = clamp(r - d + 0.5, 0., 1.)*vQ.z;
  if (cov < 0.004) discard;
  float s = h*vZ.x/(h*vZ.x + (1. - h)*vZ.y);
  vec3 W = mix(vA, vB, s);
  if (mir ? W.y > 0.02 : W.y < -0.02) discard;
  vec3 dv = W - ro; float dist = length(dv); vec3 dir = dv/dist;
  vec2 dn = clamp(off/max(r, 1e-3), -1., 1.);
  vec3 n = normalize(cR*dn.x + cU*dn.y - dir*sqrt(max(1. - dot(dn, dn), 0.)));
  if (mir) { n.y = -n.y; dir.y = -dir.y; }
  oN = n; oD = dir; oA = vC.rgb; oT = vX.z; oF = dist; oC = cov;
  }
#endif
#ifdef DISC
  vec3 col = dC;
#else
  vec3 col = lightObj(oN, oD, oA, oT);
#endif
  col = mix(col, airC(oD), 1. - exp(-oF/FOG));
  o = vec4(col*oC, oC);
}`,E=e.__c575||(e.__c575=(()=>{const t=(f,v)=>{const x=e.createShader(v);return e.shaderSource(x,f),e.compileShader(x),x},o={},a=t(Ot,e.VERTEX_SHADER),s=!!e.getExtension("EXT_color_buffer_float"),r=(f,v)=>f.replace(`#version 300 es
`,`#version 300 es
`+v),n=s?`#define AIRLUT
`:"";for(const[f,v,x,A]of[["scn",a,r(Wt,n+`#define SMASK 1
`),[]],["scn2",a,r(Wt,n+`#define SMASK 14
`),[]],["sky",a,Fe,[]],["wat",a,ke,[]],["lay",Yt,r(Kt,n),["a0","a1","a2","a3"]],["dsc",Yt,r(Kt,n+`#define DISC
`),["a0","a1","a2","a3"]],...s?[["air",a,Pe,[]]]:[]]){const M=e.createProgram(),g=typeof v=="string"?t(v,e.VERTEX_SHADER):v,c=t(x,e.FRAGMENT_SHADER);e.attachShader(M,g),e.attachShader(M,c),A.forEach((u,m)=>e.bindAttribLocation(M,m,u)),e.linkProgram(M),o[f]={p:M,vs:g,fs:c}}return e.flush(),{P:o,fin:!0,rts:{},hf:s}})()),ot=(t,o,a,s,r,n,f,v)=>{const x=e.createTexture();return e.bindTexture(e.TEXTURE_2D,x),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,s,r,v||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n===e.LINEAR_MIPMAP_LINEAR?e.LINEAR:n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,f),x},f0=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)};if(!E.tN){const o=new Uint8Array(262144);let a=625341585;const s=()=>(a^=a<<13,a^=a>>>17,a^=a<<5,(a>>>0)/4294967296),r=M=>{const g=new Float32Array(M*M);for(let c=0;c<g.length;c++)g[c]=s();return g},n=r(32),f=r(64),v=r(16),x=r(64),A=(M,g,c,u)=>{const m=Math.floor(c),k=Math.floor(u),_=c-m,U=u-k,K=_*_*(3-2*_),t0=U*U*(3-2*U),u0=m%g,P0=(m+1)%g,S0=k%g*g,A0=(k+1)%g*g,X0=M[S0+u0],O0=M[S0+P0],l=M[A0+u0],bt=M[A0+P0];return X0+(O0-X0)*K+(l-X0)*t0+(X0-O0-l+bt)*K*t0};for(let M=0;M<256;M++)for(let g=0;g<256;g++){const c=(M*256+g)*4;o[c]=255*(.62*A(n,32,g/8,M/8)+.38*A(f,64,g/4,M/4))|0,o[c+1]=255*(.62*A(v,16,g/16,M/16)+.38*A(x,64,g/4,M/4))|0,o[c+2]=s()*256|0,o[c+3]=s()*256|0}E.tN=ot(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,o),e.generateMipmap(e.TEXTURE_2D),E.tP=ot(2048,8,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE,null),E.hf&&(E.tF=ot(2048,32,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.REPEAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),E.fF=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,E.fF),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,E.tF,0),e.bindFramebuffer(e.FRAMEBUFFER,null)),E.vaoE=e.createVertexArray(),E.vaoI=e.createVertexArray(),E.sb=e.createBuffer(),E.db=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,E.db),e.bufferData(e.ARRAY_BUFFER,4096*64,e.DYNAMIC_DRAW)}const X=2048,V0=8,Zt=new Float32Array(X),p0=new Float32Array(X*V0).fill(-1),_e=new Float32Array(X*V0).fill(-1),Le=new Float32Array(X*V0).fill(-1),jt=[130,130,22,150,200,200,250,M0],E0=(t,o)=>(o/jt[t]+1)*.5*X-.5,ft=(t,o)=>(-1+2*(o+.5)/X)*jt[t],w0=(t,o,a,s)=>{const r=Math.max(0,Math.ceil(E0(t,o))),n=Math.min(X-1,Math.floor(E0(t,a)));for(let f=r;f<=n;f++){const v=s(ft(t,f)),x=t*X+f;v>p0[x]&&(p0[x]=v)}},B0=(t,o,a,s,r)=>w0(t,o-r,o+r,n=>a+s*Math.pow(Math.max(0,1-Math.abs(n-o)/r),1.3)),s0=(t,o,a,s,r,n)=>{for(let f=0;f<r;f++){const v=s+f*n*.9,x=a*(1-.23*f),A=n*1.55;w0(t,o-x,o+x,M=>v+A*Math.pow(Math.max(0,1-Math.abs(M-o)/x),1.25)),B0(t,o-x*.97,v,n*.55,.3+x*.02),B0(t,o+x*.97,v,n*.55,.3+x*.02)}B0(t,o,s+(r-1)*n*.9+n*1.4,n*.7,.35)},dt=(t,o,a,s)=>{w0(t,o,a,()=>s);for(let r=o+.6+p();r<a-.4;r+=1.3+p()*.7)p()>.12&&B0(t,r,s,.32+p()*.15,.22)},L0=(t,o,a,s,r,n)=>{const f=s-a,v=9,x=u=>r*(.97+.1*Math.sin(M0*Math.min(u*1.4,1)))*Math.pow(Math.max(1-u,0),.66),A=a+f*(n||1),M=a+f*.15,g=f*.85/v;for(let u=0;u<=7;u++)p();const c=[];for(let u=0;u<=v;u++)c.push(1+($()-.5)*.03);for(let u=a;u<=A;u+=.03){const m=(u-a)/f;let k;if(m<.15)k=r*1.03;else{const _=(m-.15)/.85,U=Math.min(v-1,Math.floor(_*v)),K=_*v-U;k=x(_)*(1+.07*Math.sin(M0*Math.min(K*1.2,1))+.06*(1-K)*(1-K))*c[U],_>.93&&(k=Math.min(k,r*.09*(1-_)/.07+.15))}w0(t,o-k,o+k,()=>u)}for(let u=1;u<7&&!(u/7*.85+.15>(n||1));u++)for(let m=0;m<2;m++)p()>.1&&p(),p()>.4&&p();for(let u=1;u<v;u++){const m=u/v;if(m*.85+.15>(n||1))break;const k=M+g*u,_=x(m)*c[u]*1.03;for(const U of[-1,1])B0(t,o+U*_,k-g*.15,g*(.55+$()*.25),.22+.22*(1-m)),B0(t,o+U*_*.74,k-g*.05,g*(.28+$()*.14),.18+.1*(1-m))}if(s0(t,o-r*1.05,r*.42,a+f*.02,2,f*.05),s0(t,o+r*1.05,r*.42,a+f*.02,2,f*.05),t===0)for(let u=Math.max(0,Math.ceil(E0(0,o-r*1.2)));u<=Math.min(X-1,Math.floor(E0(0,o+r*1.2)));u++)Zt[u]=g},R=N0;w0(0,-60,60,t=>R+3.2),dt(0,-57,57,R+15.2),w0(0,-57,57,t=>R+14.4+.6*Math.max(0,1-Math.abs(t)/57));for(const t of[-1,1])s0(0,t*54,4.8,R+15,2,1.9);s0(0,0,7.5,R+15.3,3,2),w0(0,-38,38,t=>R+Math.min(27,15+(38-Math.abs(t))/.42)),dt(0,-32,32,R+30.2);for(const t of[-1,1])s0(0,t*31,3.6,R+29.5,2,1.6);L0(0,0,R+29.25,R+64.5,9.4),L0(0,-30.5,R+29.25,R+49.5,6.5),L0(0,31,R+29.25,R+49.2,6.5),L0(0,-22.5,R+29.25,R+47.6,6.1),L0(0,23.5,R+29.25,R+47.4,6.1),w0(1,-96,96,t=>R+1.8),dt(1,-94,94,R+9.2);for(const t of[-1,1])s0(1,t*91,6.5,R+9,3,1.6),s0(1,t*22,4.5,R+9.2,2,1.6);s0(1,0,11.5,R+9.6,3,2.1);for(const t of[-1,1])s0(1,t*9.5,4.2,R+10.6,2,1.7);w0(2,-19.5,19.5,t=>R+1.7),w0(2,-13,13,t=>R+6.3),s0(2,0,8.5,R+6.2,3,1.45);for(const t of[-1,1])s0(2,t*13.5,3.6,R+4.4,2,1.2),B0(2,t*18,R+1.7,1.3,.45);dt(3,-148,148,R+5.6),L0(3,0,R+8,R+24,6,.72),L0(3,-24,R+7,R+17,4.4,.66),L0(3,25,R+7,R+17,4.4,.8),s0(3,0,9,R+6,3,1.6);for(const t of[-1,1])s0(3,t*108,5,R+5.6,2,1.4);const zt=(t,o,a,s,r,n,f)=>{for(let v=o;v<a;){const x=Math.abs(v-n)<f,A=x?1.5+p()*2:3+p()*7,M=x?R+2.5+p()*3:R+s+Math.pow(p(),1.4)*(r-s)+(p()<.1?8:0),g=[];for(let c=0,u=3+(A|0);c<u;c++)g.push([v+(p()-.5)*A*1.6,A*(.3+p()*.4),M-p()*p()*A*.9]);for(let c=Math.max(0,Math.ceil(E0(t,v-A*1.4)));c<=Math.min(X-1,Math.floor(E0(t,v+A*1.4)));c++){const u=ft(t,c),m=t*X+c;for(const k of g){const _=(u-k[0])/k[1];if(Math.abs(_)<2.2){const U=k[2]-k[1]*.75*_*_;U>p0[m]&&(p0[m]=U)}}}v+=A*(.55+p()*.8)}for(let v=0;v<X;v++){const x=ft(t,v),A=t*X+v,M=R+(Math.abs(x-n)<f?1.2:4+2.5*Math.sin(x*.21+Math.sin(x*.07)*3));M>p0[A]&&(p0[A]=M)}};zt(4,-200,200,11,28,m0-22,30),zt(5,-200,200,12,28,1e4,0),zt(6,-250,250,12,30,1e4,0);for(let t=-M0;t<M0;){const o=(5+p()*11)/520,a=Math.exp(-Math.pow((t-.12)/.45,2)),s=R+15+p()*12+Math.sin(t*5+1)*4-a*8+(p()<.07?9:0);for(let r=Math.max(0,Math.ceil(E0(7,t-o)));r<=Math.min(X-1,Math.floor(E0(7,t+o)));r++){const n=(ft(7,r)-t)/o,f=s-o*520*.7*(1-Math.sqrt(Math.max(0,1-n*n)));f>p0[7*X+r]&&(p0[7*X+r]=f)}t+=o*(.7+p()*.9)}const ut=(()=>{const t=new Float32Array(1),o=new Uint32Array(t.buffer);return a=>{t[0]=a;const s=o[0],r=s>>>16&32768,n=(s>>>23&255)-112;return n<=0?r:n>=31?r|31744:r|n<<10|(s&8388607)>>>13}})(),at=new Uint16Array(X*V0*4);for(let t=0;t<X*V0;t++)at[t*4]=ut(p0[t]),at[t*4+1]=ut(_e[t]),at[t*4+2]=ut(Le[t]),at[t*4+3]=t<X?ut(Zt[t]):0;const q0={},Vt=()=>{e.bindTexture(e.TEXTURE_2D,E.tP),e.texSubImage2D(e.TEXTURE_2D,0,0,0,X,V0,e.RGBA,e.HALF_FLOAT,at)};Vt();const Ce=(t,o)=>{const a=G(E0(t,o),0,X-1.001),s=Math.floor(a),r=a-s;return Z(p0[t*X+s],p0[t*X+s+1],r)};if(!E.tE){const o=typeof OffscreenCanvas<"u"?new OffscreenCanvas(2048,2048):Object.assign(document.createElement("canvas"),{width:2048,height:2048}),a=o.getContext("2d",{willReadFrequently:!0});if(!a)throw new Error("575: no 2D canvas for the temple");let s=795582001;const r=()=>(s^=s<<13,s^=s>>>17,s^=s<<5,(s>>>0)/4294967296);let n=0,f=!1,v=-1e9,x=1e9;const A=(i,h)=>"rgb("+(G(i,0,1)*255|0)+","+(G(h*.5+.5,0,1)*255|0)+","+(G(n,0,1)*255|0)+")";let M=0;const g=(i,h,S)=>{f||a.beginPath(),a.moveTo(i[0],i[1]);for(let w=2;w<i.length;w+=2)a.lineTo(i[w],i[w+1]);a.closePath(),M++,f||(a.fillStyle=A(h,S||0),a.fill())},c=(i,h,S,w,T,L)=>{f||(a.fillStyle=A(T,L||0)),a.fillRect(i,h,S-i,w-h)},u=(i,h,S)=>{a.fillStyle=A(i,h),a.beginPath(),M=0,f=!0,S(),f=!1,M&&a.fill()},m=(i,h,S,w)=>c(-i,h,i,S,w,0),k=(i,h,S,w,T,L)=>{c(i,S,h,w,T,L),c(-h,S,-i,w,T,-L)},_=i=>i>v-3&&i<x+3,U=(i,h,S,w,T,L)=>{const F=[];for(let y=0;y<=5;y++){const z=e0=>w*.12+w*.86*(1-Math.pow(1-e0,1.6)),B=y/5;F.push(S*.92*(1-B),z(B)),y<5&&F.push(S*.92*(1-B-.1)+w*.09,z(B+.1)+w*.05)}const C=[i-S*1.04,h+w*.16,i-S*1,h,i+S*1,h,i+S*1.04,h+w*.16];for(let y=0;y<F.length;y+=2)C.push(i+F[y],h+F[y+1]);C.push(i,h+w*1.16);for(let y=F.length-2;y>=0;y-=2)C.push(i-F[y],h+F[y+1]);g(C,T,L)},K=(i,h,S,w,T,L)=>{for(let F=T-1;F>=0;F--){const C=h+F*w*.6,y=S*(1-.2*F),z=w*(1-.1*F);U(i,C,y,z,L*(1+.06*F)),U(i,C+z*.13,y*.7,z*.68,L*.5)}},t0=(i,h,S,w,T,L)=>g([i-w,h,i+w,h,i+w*.75,h+S*.5,i,h+S,i-w*.75,h+S*.5],T,L),u0=(i,h,S,w,T,L)=>{for(let F=0;F<T;F++){const C=.12+.2*r(),y=.15+.3*r(),z=L*(.3+r()),B=z*(.25+.5*r()),e0=Z(i+z,h-z,r()),W=Z(S+B,w-B,r());h-i>2*z&&w-S>2*B&&_(e0)&&(a.globalAlpha=y,c(e0-z,W-B,e0+z,W+B,C,0))}a.globalAlpha=1},P0=(i,h,S,w)=>{m(i,h-.08,S,w),m(i,h,h+.32,w*.6),u(w*.78,0,()=>{for(let T=h+.75+.2*r();T<S-.7;T+=.42+.2*r())m(i,T,T+.05)}),m(i+.12,S-.58,S-.4,w*.42),m(i+.25,S-.4,S,w*1.45),m(i+.25,S-.12,S,w*1.85);for(const T of[-1,1])c(T*(i-.7),h,T*i,S-.4,w*.9,T*.75),c(T*(i-1.7),h,T*(i-1.45),S-.4,w*.55,0)},S0=(i,h,S,w,T)=>{const L=h+(S-h)*.32;g([-i-.6,h,i+.6,h,i+.25,L+.05,-i-.25,L+.05],w*.85),g([-i,L,i,L,i-.3,Z(L,S,.6),i-.75,S,-i+.75,S,-i+.3,Z(L,S,.6)],w),m(i-.3,Z(L,S,.45),S,w*1.18),m(i-.6,Z(L,S,.8),S,w*1.4),m(i+.6,h,h+.14,w*.45),m(i,L,L+.12,w*.5),u(w*.8,0,()=>{for(let F=-i+.2;F<i-.2;F+=.36)_(F)&&c(F,h+.15,F+.08,L-.05)}),u(w*.84,0,()=>{for(let F=-i+.2;F<i-.2;F+=.36)_(F)&&c(F+.18,L+.15,F+.26,S-.1)}),u(w*1.5,0,()=>{for(let F=-i+1;F<i-.9;F+=.62){const C=r(),y=r();_(F)&&(!T||C>.06)&&t0(F,S-.06,.34+.08*y,.13)}})},A0=(i,h,S,w,T,L)=>{a.save(),a.translate(i,0),n=L;const F=S-h,C=h+F*.2,y=F*.12,z=S-y,B=d=>d<.1?w*(.93+.5*d):w*.98*(1-Math.pow((d-.1)/.9,1.55));let e0=0;for(let d=0;d<T;d++)e0+=Math.pow(.93,d);const W=[C];for(let d=0;d<T;d++)W.push(W[d]+(z-C)*Math.pow(.93,d)/e0);const H0=d=>B((d-C)/(z-C)*.86),c0=H0(z)*.86,W0=[];for(let d=0;d<T;d++){const b=H0(W[d])*(1+(r()-.5)*.02);W0.push([W[d],W[d+1]-W[d],b,d===T-1?c0:H0(W[d+1]),b*.92])}const H=d=>{for(const b of W0)d(...b)};g([-c0*.4,z+y*.48,c0*.4,z+y*.48,c0*.44,z+y*.66,c0*.3,z+y*.86,.12,S-.05,0,S+.9,-.12,S-.05,-c0*.3,z+y*.86,-c0*.44,z+y*.66],.62),k(c0*.14,c0*.44,z+y*.5,z+y*.8,.5,.75);for(let d=3;d>=0;d--){const b=z+d*y*.125,P=y*.14,D=c0*(1-.15*d);g([-D*.88,b,D*.88,b,D,b+P*.35,D*.94,b+P*.75,D*.78,b+P,-D*.78,b+P,-D*.94,b+P*.75,-D,b+P*.35],.7),m(D*.86,b,b+P*.2,.24),k(D*.6,D,b+P*.2,b+P*.85,.66,.7);for(const Y of[-1,1])t0(Y*D*.82,b+P*.85,P*.7,D*.07+.05,.8,Y*.5)}u(.4,0,()=>H((d,b,P,D)=>g([-P*.96,d+.78*b,P*.96,d+.78*b,D*.93,d+b+.06,-D*.93,d+b+.06]))),u(.55,0,()=>H((d,b,P,D,Y)=>m(Y,d-.05,d+.62*b)));for(const[d,b,P,D]of[[0,.26,.6,0],[.26,.3,.4,.85],[.3,.56,.5,.2],[.56,.6,.38,.9],[.6,1,.56,.45]])for(const Y of[-1,1])u(P,Y*Math.min(1,D+.3*(d+b)),()=>H((ct,Q0,Lt,me,yt)=>c(Y*d*yt,ct,Y*b*yt,ct+.55*Q0)));u(.28,0,()=>H((d,b,P,D,Y)=>m(Y*1.035,d+.27*b,d+.3*b))),u(.76,0,()=>H((d,b,P,D,Y)=>m(Y*1.035,d+.3*b,d+.34*b))),u(.7,0,()=>H((d,b,P,D,Y)=>g([-Y,d+.5*b,Y,d+.5*b,P,d+.62*b,P,d+.8*b,-P,d+.8*b,-P,d+.62*b]))),u(.18,0,()=>H((d,b,P,D,Y)=>m(Y,d+.5*b,d+.6*b))),u(.95,0,()=>H((d,b,P)=>m(P,d+.74*b,d+.8*b)));for(const d of[-1,1])u(.6,d*.9,()=>H((b,P,D)=>c(d*D*.93,b+.6*P,d*D,b+.8*P)));for(const d of[-1,1])for(const b of[.28,.58])u(.42,d*.9,()=>H((P,D,Y,ct,Q0)=>c(d*(b-.02)*Q0,P,d*(b+.02)*Y,P+.8*D)));u(.68,0,()=>H((d,b,P)=>m(P*.15,d,d+.46*b))),u(.16,0,()=>H((d,b,P)=>m(P*.09,d,d+.4*b))),u(.8,0,()=>H((d,b,P)=>U(0,d+.42*b,P*.22,b*.55))),u(.38,0,()=>H((d,b,P)=>U(0,d+.48*b,P*.14,b*.36)));for(const d of[-1,1])for(const[b,P,D,Y]of[[.97,.56,.045,.6],[.86,.62,.05,.45],[.74,.5,.05,.3],[.45,.36,.06,.1]])u(.86,d*Y,()=>H((ct,Q0,Lt)=>{const me=r(),yt=r();(b>.95||me>.12)&&t0(d*Lt*b,ct+.79*Q0,Q0*P*(.8+.35*yt),Lt*D+.05)}));const O=w*.8,I=C-h;m(O,h,C+.3,.5);for(const[d,b,P,D]of[[.3,.5,.44,.2],[.5,.54,.34,.9],[.54,1,.52,.5]])k(d*O,b*O,h,C-.2,P,Math.min(1,D+.3*(d+b)));m(H0(C)*.9,C-.25,C+.35,.74),m(O,C-.5,C-.25,.22);for(const d of[-1,1]){c(d*O*.9,h,d*w*1.12,h+I*.55,.48,d*.55),c(d*w*1.07,h,d*w*1.12,h+I*.55,.62,d*.95),K(d*w*.98,h+I*.53,w*.17,I*.4,2,.62);for(const b of[.92,.62])t0(d*w*(b+.04),C+.3,I*.22,.12+w*.02,.84,d*.4)}m(w*.24,h,h+I*.5,.58),m(w*.1,h,h+I*.38,.1),K(0,h+I*.48,w*.28,I*.4,3,.66),a.restore()},X0=(i,h,S,w)=>{c(i-h,S,i+h,w,.46),u(.82,0,()=>{for(let T=S+.15;T<w-.2;T+=.42)c(i-h+.55,T,i+h-.55,T+.13)}),u(.26,0,()=>{for(let T=S+.15;T<w-.2;T+=.42)c(i-h+.55,T+.13,i+h-.55,T+.2)}),c(i-h,S,i-h+.55,w,.34,-.75),c(i+h-.55,S,i+h,w,.42,.75)},O0=2048/120;a.setTransform(O0,0,0,-O0,60*O0,(N0+67)*O0);const l=N0;A0(-22.5,l+31,l+47.6,6,9,.66),A0(23.5,l+31,l+47.4,6,9,.66),A0(0,l+31,l+64.5,9.4,12,.6),n=.42;for(const[i,h,S]of[[15,18.6,40],[18.6,22.2,38.6],[22.2,25.8,37.2],[25.8,29.4,35.8]])P0(S,l+i,l+h,.5);u0(-35,35,l+15.4,l+28.8,70,1.2);for(const i of[0,-17,17]){const h=i?2.2:3.2;X0(i,h,l+15,l+29.7),u(.86,0,()=>{for(const S of[l+19.6,l+24.4])c(i-h-.2,S,i+h+.2,S+.35)})}n=.48,m(34.5,l+29.2,l+32.15,.48);const bt=(i,h,S,w,T,L,F)=>{const C=[];for(let y=i;y<h;y+=S)w(y)||C.push(y);return u(.14,0,()=>{for(const y of C)c(y-.45,T,y+.45,L)}),u(.42,0,()=>{for(const y of C)for(let z=0;z<F;z++){const B=y+(z-(F-1)/2)*.24;c(B-.04,T,B+.04,L)}}),C};bt(-33.2,33.5,2.4,i=>Math.abs(i)<6||Math.abs(Math.abs(i)-17)<3.2,l+29.85,l+31.4,3),m(34.5,l+31.75,l+32.15,.2),S0(34.4,l+32.1,l+34.5,.66,!0);for(const i of[-17,17,0]){const h=i?3.4:5.2;a.save(),a.translate(i,0),m(h,l+29.2,l+34.2,.5),k(h-.35,h,l+29.2,l+34.2,.44,.75),m(h*.24,l+29.4,l+32.6,.12),K(0,l+34,h*.62,i?2.8:3.8,i?2:3,.66),a.restore()}A0(-30.5,l+31,l+49.5,6.5,9,.55),A0(31,l+31,l+49.2,6.5,9,.55),n=.3;for(const[i,h,S]of[[.3,2.6,59.6],[2.6,4.9,59.2],[4.9,7.1,58.8]])P0(S,l+i,l+h,.4);m(58.2,l+7,l+12.15,.46);const oo=bt(-50.7,51,2.6,i=>Math.abs(i)<10.5,l+7.9,l+10.6,4);u(.56,0,()=>{for(const i of oo)c(i-1.25,l+7,i-.85,l+11.8)}),u0(-58,58,l+.5,l+11.6,90,1.1),m(58.2,l+11.75,l+12.15,.2),S0(57.9,l+12.1,l+16.6,.62,!0);for(const i of[-1,1])n=.3,a.save(),a.translate(i*55.5,0),m(4.3,l+7,l+16.4,.5),k(3.9,4.3,l+7,l+16.4,.44,.75),m(.9,l+7,l+10.5,.12),K(0,l+16.2,3.6,2.4,2,.64),a.restore(),A0(i*55.5,l+17.6,l+28.6,3.4,6,.36);n=.3,a.save(),m(9.6,l+7,l+15.4,.5),k(9.2,9.6,l+7,l+15.4,.44,.75),k(3.2,3.5,l+7,l+15.4,.34,.5),m(1.3,l+7,l+11.4,.1),X0(0,3.3,l+.3,l+7);for(const i of[-1,1])K(i*7.4,l+13.9,2.6,2.2,2,.6);K(0,l+15.2,5,4.4,3,.64),a.restore();const ve=20.48,he=320/21;for(const[i,h,S,w]of[[100*ve,1216,-100,0],[0,1600,0,100]]){s=1374496675,n=.14,v=S,x=w,a.setTransform(1,0,0,1,0,0),a.save(),a.beginPath(),a.rect(0,h,2048,320),a.clip(),a.setTransform(ve,0,0,-he,i,h+(N0+20.5)*he),P0(97.5,l+.3,l+1.1,.5),P0(97.2,l+1.1,l+1.95,.5),m(97,l+5.1,l+5.9,.62),m(97,l+5.1,l+5.25,.22),m(97.2,l+5.78,l+6.12,.2),u0(-96,96,l+.4,l+1.8,60,.9),u0(-96,96,l+5.15,l+5.85,40,.5),S0(97.2,l+6.05,l+9.6,.62,!0);const T=[[-84.5,-26.5],[-17.5,-11.8],[11.8,17.5],[26.5,84.5]].filter(([y,z])=>_(y)||_(z)),L=[],F=[];for(const[y,z]of T){u(.3,0,()=>{c(y,l+1.9,z,l+2.15),c(y,l+4.85,z,l+5.15)});const B=Math.max(1,Math.round((z-y)/2.6)),e0=(z-y)/B;for(let W=0;W<=B;W++)L.push(y+W*e0);for(let W=0;W<B;W++)F.push([y+W*e0+.42,y+(W+1)*e0-.42])}a.globalAlpha=.72,u(.2,0,()=>{for(const[y,z]of F)c(y,l+2.15,z,l+4.85)}),a.globalAlpha=1,u(.56,0,()=>{for(const y of L)c(y-.42,l+1.9,y+.42,l+5)}),u(.46,.6,()=>{for(const y of L)c(y+.3,l+1.9,y+.42,l+5)}),u(.4,-.8,()=>{for(const y of L)c(y-.42,l+1.9,y-.3,l+5)}),u(.8,0,()=>{for(const y of L)c(y-.56,l+4.82,y+.56,l+5.12)}),u(.62,0,()=>{for(const y of L)c(y-.5,l+1.9,y+.5,l+2.18)});const C=(y,z,B,e0,W,H0,c0)=>{if(!_(y-z)&&!_(y+z))return;n=.16,a.save(),a.translate(y,0);const W0=[];for(const[O,I,d]of c0)for(const b of O?[-O,O]:[0])W0.push([b-I,b+I,l+1.95+d]);W0.sort((O,I)=>O[0]-I[0]);const H=Math.max(...W0.map(O=>O[2]));if(u(.5,0,()=>{c(-z,H,z,B),c(-z,l+1.9,z,l+1.95);let O=-z;for(const[I,d,b]of W0)c(O,l+1.9,I,H),b<H&&c(I,b,d,H),O=d;c(O,l+1.9,z,H)}),k(z-.25,z,l+1.9,B,.42,.85),k(z*.55,z*.58,l+1.9,B-.4,.32,.6),m(z+.2,B-.45,B,.24),m(z+.35,B-.25,B+.1,.78),u0(-z+.5,z-.5,H+.3,B-.6,10+z*2|0,.7),e0>2)for(const O of[-1,1])K(O*z*.8,B-1.2,z*.3,H0*.75,2,.6);K(0,B-.2,W,H0,e0,.64);for(const[O,I,d]of c0)for(const b of O?[O,-O]:[0])c(b-I-.3,l+1.95,b-I,l+1.95+d+.3,.46),c(b+I,l+1.95,b+I+.3,l+1.95+d+.3,.46),c(b-I-.3,l+1.95+d,b+I+.3,l+2.25+d,.6);a.restore()};A0(0,l+12.8,l+20.3,4.4,4,.2),C(0,11.8,l+11,3,5.2,4.6,[[0,1.35,3.1],[5.6,.8,2.5]]);for(const y of[-1,1])C(y*22,4.5,l+9.8,2,3.2,3.2,[[0,.9,3]]),C(y*91,6.5,l+11.2,3,4.2,4,[[0,1,3]]);a.restore()}const pe=e.createTexture();e.bindTexture(e.TEXTURE_2D,pe),e.bindBuffer(e.PIXEL_UNPACK_BUFFER,null);for(const[i,h]of[[e.UNPACK_ROW_LENGTH,0],[e.UNPACK_SKIP_ROWS,0],[e.UNPACK_SKIP_PIXELS,0],[e.UNPACK_ALIGNMENT,4],[e.UNPACK_FLIP_Y_WEBGL,0],[e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,1],[e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE]])e.pixelStorei(i,h);e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,o),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.generateMipmap(e.TEXTURE_2D),E.tE=pe}const R0=[],Q=(t,o,a,s,r,n,f,v,x)=>R0.push([t[0],t[1],t[2],a,o[0],o[1],o[2],s,r[0],r[1],r[2],0,n,f,v,x]),so=(t,o,a,s,r)=>R0.push([t[0],t[1],t[2],o,t[0],t[1],t[2],o,a[0],a[1],a[2],1,0,s,r,0]),vt=(t,o,a,s,r,n,f,v)=>R0.push([t[0],t[1],t[2],o,a[0],a[1],a[2],v,n[0],n[1],n[2],f,s[0],s[1],s[2],r]),rt=[.035,.032,.026],Ue=(t,o,a)=>{const s=[(p()-.5)*.05,(p()-.5)*.05],r=Math.sin(t*12.9898+o*78.233)*43758.5453,n=r-Math.floor(r),f=(n<.5?0:M0)+(n*4%1-.5)*.8,v=.05+.05*Math.abs(Math.sin(r));let x=[t,R,o];for(let g=1;g<=9;g++){const c=g/9,u=[t+(s[0]*c+Math.cos(f)*v*c*c)*a,R+a*c,o+(s[1]*c+Math.sin(f)*v*c*c)*a],m=(.42-.22*c+.07*Math.sin(M0*Math.min(c*2.2,1)))*(g%2?1:.9);Q(x,u,m*1.04,m,rt,.004,t,.1,R),x=u}const A=x,M=26+(p()*9|0);for(let g=0;g<M;g++){const c=p()*U0,u=-.75+Math.pow(p(),.8)*2.1,m=[Math.cos(c)*Math.cos(u),Math.sin(u),Math.sin(c)*Math.cos(u)],k=.8+p()*.7,_=.7+p()*.35,U=[A[0]+m[0]*k,A[1]+m[1]*k,A[2]+m[2]*k],K=[U[0]+m[0]*_*.8,U[1]+m[1]*_*.8,U[2]+m[2]*_*.8],t0=i0([m[0]+(p()-.5)*1.5,m[1]+(p()-.5)*1.5,m[2]+(p()-.5)*1.5]),u0=i0(D0(t0,[p()-.5,p()-.5,p()-.5]));g%4!==3&&(Q(A,U,.06,.035,rt,.004,t,.2,R),vt(K,_,t0,u0,1,rt,4,.003))}},De=(t,o,a,s)=>{let r=[t,R,o];const n=p()*U0;for(let v=1;v<=6;v++){const x=v/6,A=[t+Math.cos(n)*s*x*x*a,R+a*x,o+Math.sin(n)*s*x*x*a];Q(r,A,.2-x*.05,.19-x*.05,rt,.004,t,.1,R),r=A}const f=r;for(let v=0;v<14;v++){const x=v*2.4+p()*.4,A=.8-v%4*.4-p()*.2;let M=[Math.cos(x)*Math.cos(A),Math.sin(A),Math.sin(x)*Math.cos(A)],g=f;const c=3.6+p()*1.4;for(let u=0;u<3;u++){M=i0([M[0],M[1]-.3,M[2]]);const m=[g[0]+M[0]*c/3,g[1]+M[1]*c/3,g[2]+M[2]*c/3],k=[(g[0]+m[0])/2,(g[1]+m[1])/2,(g[2]+m[2])/2],_=i0(D0(M,[0,1,0])),U=i0(D0(_,M));vt(k,.42-u*.08,i0([U[0]+_[0]*.5,U[1],U[2]+_[2]*.5]),M,c/6/(.42-u*.08)+.3,rt,4,.004),g=m}}},ht=lt==="Lone palm"?[["s",-25,-97,20]]:[["s",-25,-97,19.5],["s",-56,-36,18],["s",-59,-57,21],["s",41,-40,17],["s",4,48,16],["s",-14,72,19]];lt!=="Lone palm"&&ht.push(["s",-60,-12,15],["s",-34,-112,16],["s",92,-205,21],["s",104,-222,19],["s",81,-238,22],["s",-16,-214,20],["s",-31,-230,18]),lt==="Mixed palms"&&ht.push(["c",-51,-24,12],["c",-49,-70,11],["c",32,-66,12],["c",-8,-98,10],["c",10,40,11],["c",-40,30,12]),lt==="Lone palm"&&ht.push(["c",-55,-40,11]);for(const[t,o,a,s]of ht){const r=R0.length;t==="s"?Ue(o,a,s+(p()-.5)*2):De(o,a,s,.12+p()*.12),Math.hypot(o-o0,a-r0)<22&&(R0.length=r)}for(let t=0,o=3+(p()*10|0);t<o;t++)p(),p(),p(),p();const Be=[.032,.07,.024],$0=[.92,.36,.52],qe=Math.sin(y0[2]),Ge=-Math.cos(y0[2]),Ie=Math.cos(y0[2]),Xe=Math.sin(y0[2]),$t=(t,o)=>[G(o0+qe*t+Ie*o*t,a0+.7,x0-.7),G(r0+Ge*t+Xe*o*t,J0+1,k0-.6)],G0=[$t(4.6+p()*1.4,.36+p()*.16),$t(6.5+p()*2.5,-.38-p()*.16)],Qt=K0==="Lotus field",Et={"Lotus edge":15,"Open mirror":5,"Lotus field":34,"Pink bloom":20}[K0],Jt={"Lotus edge":4,"Open mirror":1,"Lotus field":6,"Pink bloom":13}[K0],te=(t,o)=>{const a=t<.6?G0[0]:t<.9||Qt?G0[1]:null;if(!a)return[a0+.6+p()*3,-10-p()*40];const s=p()*U0,r=Math.sqrt(p())*o*(Qt?2.2:1);let n=a[0]+Math.cos(s)*r,f=a[1]+Math.sin(s)*r*1.5;const v=n-o0,x=f-r0,A=Math.hypot(v,x);return A<3.3&&(n=o0+v/A*3.3,f=r0+x/A*3.3),[G(n,a0+.5,x0-.5),Math.min(f,k0-.5)]},ee=(t,o,a,s)=>{const r=[Z(t,a[0],.55)+(p()-.5)*.2,a[1]*.5,Z(o,a[2],.55)+(p()-.5)*.2],n=s*(.75+.7*$()),f=[Z(t,r[0],.5)+(r[0]-Z(t,a[0],.55))*.3,r[1]*.5,Z(o,r[2],.5)+(r[2]-Z(o,a[2],.55))*.3],v=[.045,.06+.012*$(),.028];Q([t,0,o],f,n*1.15,n*1.05,v,.06,t,.3,0),Q(f,r,n*1.05,n,v,.06,t,.3,0),Q(r,a,n,n*.8,v,.06,t,.3,0)};for(let t=0;t<Et;t++){const[o,a]=te(t/Et,1.3),s=.3+Math.pow(p(),.8)*1,r=[o+(p()-.5)*.3,s,a+(p()-.5)*.3];ee(o,a,r,.008);const n=p()*U0,f=p()<.25?.38+p()*.3:.06+p()*.3,v=[Math.sin(f)*Math.cos(n),Math.cos(f),Math.sin(f)*Math.sin(n)];vt(r,.2+p()*.2,v,[Math.cos(n+1.3),0,Math.sin(n+1.3)],1,Be,2,.06)}for(let t=0;t<Jt;t++){const[o,a]=te(Math.min(t/Jt,.85),1),s=.75+p()*.7,r=[o+(p()-.5)*.2,s,a+(p()-.5)*.2];ee(o,a,r,.007);const n=p(),f=n<(K0==="Pink bloom"?.25:.4)?0:n<.75?1:n<.93?2:3,v=i0([(p()-.5)*.3,1,(p()-.5)*.3]),x=g=>[r[0]+v[0]*g,r[1]+v[1]*g,r[2]+v[2]*g];if(f===0){Q(r,x(.05),.026,.04,[.3,.2,.12],.05,o,.6,0),Q(x(.05),x(.15),.04,.004,[$0[0]*.8,$0[1]*.6,$0[2]*.7],.05,o,.8,0);continue}if(f===3){Q(r,x(.05),.018,.045,[.2,.2,.08],.05,o,.3,0);continue}const A=f===2,M=p()*U0;for(let g=0;g<2;g++){const c=g?7:8,u=g?A?.5:.28:A?1.1:.62,m=g?.075:.095;for(let k=0;k<c;k++){const _=M+(k+g*.5)/c*U0+(p()-.5)*.25,U=u+(p()-.5)*.15,K=[Math.cos(_),0,Math.sin(_)],t0=i0([K[0]*Math.sin(U)+v[0]*Math.cos(U),Math.cos(U),K[2]*Math.sin(U)+v[2]*Math.cos(U)]),u0=[r[0]+t0[0]*m*1.05,r[1]+t0[1]*m*1.05,r[2]+t0[2]*m*1.05],P0=i0(D0(t0,[-Math.sin(_),0,Math.cos(_)])),S0=.85+p()*.2;vt(u0,m/1.9,P0,t0,1.9,[$0[0]*S0,$0[1]*S0,$0[2]*S0],3,.05)}}Q(r,x(.03),.016,.024,[.62,.5,.16],.05,o,.5,0)}if(Et>5)for(let t=0,o=2+($()*3|0);t<o;t++){const a=G0[t%2],s=$()*U0,r=.4+$()*1.1;let n=a[0]+Math.cos(s)*r,f=a[1]+Math.sin(s)*r*1.4;const v=Math.hypot(n-o0,f-r0);v<3.3&&(n=o0+(n-o0)/v*3.3,f=r0+(f-r0)/v*3.3),n=G(n,a0+.5,x0-.5),f=Math.min(f,k0-.5);const x=.35+$()*.6,A=[($()-.5)*.12,($()-.5)*.12];Q([n,0,f],[n+A[0],x,f+A[1]],.008,.007,[.045,.065,.028],.06,n,.3,0),t%3===2?Q([n+A[0],x,f+A[1]],[n+A[0]*1.05,x+.05,f+A[1]*1.05],.012,.03,[.09,.08,.035],.05,n,.3,0):Q([n+A[0],x-.04,f+A[1]],[n+A[0]*1.2,x+.24,f+A[1]*1.2],.03,.012,[.05,.085,.03],.06,n,.45,0)}const pt=(t,o,a,s)=>{for(let r=0;r<a;r++){const n=t+(p()-.5)*s,f=o+(p()-.5)*s*1.6,v=.7+p()*1,x=(p()-.5)*.5,A=[n+x*.25,v*.55,f+x*.1],M=[n+x,v,f+x*.4];Q([n,0,f],A,.009,.007,[.06,.07,.035],.08,n*3,.5,0),Q(A,M,.007,.002,[.06,.07,.035],.08,n*3,.5,0)}};for(let t=0;t<46;t++){const o=a0+2+$()*(x0-a0-4),a=J0+.3+$()*.8,s=.8+$()*1.2,r=($()-.5)*.4;$()<.35||Q([o,0,a],[o+r,s,a+r*.3],.02,.006,[.04,.05,.025],.08,o*3,.4,0)}pt(a0+1.5,-18,40,4),pt(a0+1.2,-42,30,3),pt(o0?G(o0-9,a0+2,x0-2):-9,k0-.5,K0==="Open mirror"?8:22,2.5),pt(x0-1,-20,18,2.5);const Rt=[o0,It,r0],oe=t=>Math.hypot((t[0]+t[4])*.5-Rt[0],(t[1]+t[5])*.5-Rt[1],(t[2]+t[6])*.5-Rt[2]);R0.sort((t,o)=>oe(o)-oe(t));const ae=new Float32Array(R0.length*16);R0.forEach((t,o)=>ae.set(t,o*16));const re=()=>{e.bindBuffer(e.ARRAY_BUFFER,E.sb),e.bufferData(e.ARRAY_BUFFER,ae,e.STATIC_DRAW)};re(),E.owner=q0;const Oe=R0.length,Tt=l0;if(!E.rts[Tt]){const t=o=>{const a=o&&E.hf?ot(l0,l0,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):ot(l0,l0,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),s=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),{t:a,f:s}};E.rts[Tt]={L:t(),M:t(),S:t(1),W:t(1),own:null,sg:[]},e.bindFramebuffer(e.FRAMEBUFFER,null)}const d0=E.rts[Tt],He=[];for(let t=0;t<16*8;t++)p();const se=new Float32Array(4096*16);let C0=0;const We=(t,o,a,s,r,n)=>{C0>=4090||(se.set([t[0],t[1],t[2],a,o[0],o[1],o[2],s,r[0],r[1],r[2],0,0,0,n,0],C0*16),C0++)},Ye=()=>{C0=0;const t=T0,o=m0+6*Math.sin(t*.031),a=-285+8*Math.sin(t*.023+1);for(const s of He){const r=s.w*t+s.ph,n=s.r*(.75+.25*Math.sin(t*s.f2+s.p2)),f=o+Math.cos(r)*n,v=a+Math.sin(r)*n*.6+14,x=s.y+6*Math.sin(t*s.f2*1.7+s.p2*2),A=-Math.sin(r)*s.w*.45,M=Math.cos(r)*s.w*.27;We([f-A*s.s,x,v-M*s.s],[f+A*s.s,x+.05,v+M*s.s],.16,.12,[.025,.025,.03],.1)}},Ke={yaw:0,pitch:0,x:0,y:0,z:0},Ze=y0[2],je=ze,N={ro:[0,R+Ut,0],f:[0,0,-1],r:[1,0,0],u:[0,1,0]},Ve=()=>{const t=q.view||Ke,o=Ze+(t.yaw||0),a=G(je+(t.pitch||0),-1.3,1.3);N.ro=[o0+G(t.x||0,-3,3),It+G(t.y||0,h0==="Low at the water"?-.08:-.6,.6),r0+G(t.z||0,-.8,3)],N.f=[Math.sin(o)*Math.cos(a),Math.sin(a),-Math.cos(o)*Math.cos(a)],N.r=[Math.cos(o),0,Math.sin(o)],N.u=D0(N.r,N.f)},ne=(t,o)=>i0([N.f[0]+(N.r[0]*(2*t-1)+N.u[0]*(1-2*o))*it,N.f[1]+(N.r[1]*(2*t-1)+N.u[1]*(1-2*o))*it,N.f[2]+(N.r[2]*(2*t-1)+N.u[2]*(1-2*o))*it]),$e=Math.atan2(m0-o0,285+r0)+Xt;let J=et,T0=0,st=99;const Qe=t=>{const o=t<0?-.026+t*.1:-.026+t*.262,a=$e+t*.004;return[Math.sin(a)*Math.cos(o),Math.sin(o),-Math.cos(a)*Math.cos(o)]},Je=t=>{const o=i0(D0(t,[0,1,0])),a=D0(o,t),s=N.ro;let r=0;for(let n=0;n<16;n++){const f=n*2.39996,v=.0055*Math.sqrt((n+.5)/16),x=[t[0]+(o[0]*Math.cos(f)+a[0]*Math.sin(f))*v,t[1]+(o[1]*Math.cos(f)+a[1]*Math.sin(f))*v,t[2]+(o[2]*Math.cos(f)+a[2]*Math.sin(f))*v];if(x[1]<.002||x[2]>-.01)continue;let A=!1;for(const M of[0,1]){const g=(Dt[M][0]-s[2])/x[2],c=s[1]+x[1]*g,u=s[0]+x[0]*g-m0;Math.abs(u)<128&&c<Ce(M,u)&&(A=!0)}A||(r+=1/16)}return r},ce=[[0,0,-99,0],[0,0,-99,0],[0,0,-99,0],[0,0,-99,0]];let Pt=0,le=1.5+p()*1.5;const ie=(t,o,a)=>{ce[Pt]=[t,o,T0,a],Pt=(Pt+1)%4};let n0=[1,0,0,-999];const Ft=wt==="Fish rising"?[8,30]:[12,45];let Nt=0,nt=0,mt=0,xt=0,fe=!1,I0=!1,de=-9,no=0,kt=!1;const to=t=>{const o=q.input;for(const a of o.taps?o.taps():[]){let s=ne(a.x,a.y);s[1]>-.004&&(s=i0([s[0],-Math.max(s[1],.004),s[2]]));const r=-N.ro[1]/s[1],n=G(N.ro[0]+s[0]*r,a0+.5,x0-.5),f=G(N.ro[2]+s[2]*r,J0+.5,k0-.3);ie(n,f,.0042),q.sound.hit("noise",.35,{dur:.18,cutoff:900}),q.sound.note(43+(p()*5|0),{dur:.5,vel:.25,wave:"sine"}),st=0}if(o.down){if(fe||(Nt=0,nt=0,mt=o.x,xt=o.y,I0=!1),Nt+=t,nt=Math.max(nt,Math.hypot(o.x-mt,o.y-xt)),nt>.05&&I0!=="hold"){I0="drag";const a=o.x-mt,s=o.y-xt,r=Math.hypot(a,s)||1,n=N.r[0]*a-N.f[0]*s,f=N.r[2]*a-N.f[2]*s,v=Math.hypot(n,f)||1;if(T0-de>.6){const x=ne(mt,Math.max(xt,.55)),A=-N.ro[1]/Math.min(x[1],-.01),M=x[0]*A*n/v+x[2]*A*f/v;n0=[n/v,f/v,G(.5+r*2,.6,2.2),M-6],q.sound.hit("noise",.25,{dur:2.5,cutoff:500}),de=T0}else n0[0]=Z(n0[0],n/v,.1),n0[1]=Z(n0[1],f/v,.1),n0[2]=Math.max(n0[2],G(.5+r*2,.6,2.2));st=0}!I0&&Nt>.4&&nt<.04&&(I0="hold"),I0==="hold"&&(J=Math.min(.72,J+t/30),st=0)}else I0=!1;fe=o.down},eo=t=>{if(T0+=t,st+=t,n0[3]+=t*5.5,n0[2]*=Math.exp(-t*.12),T0>le){le=T0+Ft[0]+Math.pow(p(),1.6)*(Ft[1]-Ft[0]);const o=-6-p()*45,a=(p()-.4)*30+o*-.08;ie(G(a,a0+1,x0-1),o,wt==="Fish rising"&&p()<.5?.003:.0012)}st>35&&J>et&&(J=Math.max(et,J-t/60))},V=new Float32Array(80);V.set([2,7,3,12,o0,r0,y0[3],k0+r0,0,4,3,0,G0[0][0],G0[0][1],G0[1][0],G0[1][1],...{Clear:[0,1,0],"Pond mist":[.03,1.4,25],"Towers in mist":[.03,4,70]}[ye],0,j[6],j[7],j[8],0],56);const ue=()=>{E.owner!==q0&&(Vt(),re(),E.owner=q0),Ve(),Ye();const t=Qe(J),o=Je(t),a=t[1],r=G((a+.004)/.05,0,1)*(.9+.6*G(a/.2,0,1)),n=[r*1,r*Z(.42,.78,G(a/.2,0,1)),r*Z(.12,.42,G(a/.2,0,1))],f=g0.hg.map(c=>c*j[1]),v=Math.max(J,0),x=g0.fog*(1-.35*v);o>.05&&!kt&&J>.6&&(kt=!0,q.sound.note(76,{dur:3,vel:.12,wave:"triangle"}),q.sound.note(83,{dur:3,vel:.08,wave:"sine"})),o<.01&&(kt=!1),b0==="Rain"&&(n[0]*=.04,n[1]*=.04,n[2]*=.04),b0==="Red ball"&&(n[0]*=.75,n[1]*=.16,n[2]*=.08),V.set([t[0],t[1],t[2],J,n[0],n[1],n[2],o,N.ro[0],N.ro[1],N.ro[2],it,N.r[0],N.r[1],N.r[2],l0,N.u[0],N.u[1],N.u[2],T0,N.f[0],N.f[1],N.f[2],Z(1.25,.5,G(J,0,1))*(J<0?1+Math.min(-J,.6)*.5:1)*Z(j[2],1,G((J-et)/.5,0,1)),n0[0],n0[1],n0[2],n0[3]],0);for(let c=0;c<4;c++)V.set(ce[c],28+c*4);V.set([f[0]*(1+v*.5),f[1]*(1+v*.6),f[2]*(1+v*.5),x,j[3],j[4],j[5],g0.cl,Re,Te,g0.ct,Ee],44),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND),f0(0,E.tN),f0(1,E.tP);for(let c=2;c<7;c++)f0(c,null);if(f0(7,E.tE),E.hf){if(E.airOwn!==q0||E.airP!==J){E.airOwn=q0,E.airP=J,e.bindVertexArray(E.vaoE),e.bindFramebuffer(e.FRAMEBUFFER,E.fF),e.viewport(0,0,2048,32);const c=E.P.air;e.useProgram(c.p),e.uniform4fv(c.uS,V),e.drawArrays(e.TRIANGLES,0,3)}f0(6,E.tF)}const A=[J,N.ro[0],N.ro[1],N.ro[2],N.f[0],N.f[1],N.f[2],Math.floor(T0*2)];if(d0.own!==q0||A.some((c,u)=>c!==d0.sg[u])){d0.own=q0,d0.sg=A,e.bindVertexArray(E.vaoE);for(const c of[1,0]){e.bindFramebuffer(e.FRAMEBUFFER,(c?d0.W:d0.S).f),e.viewport(0,0,l0,l0),V[64]=c;for(const u of j[6]>0?["sky","nit","scn","scn2"]:["sky","scn","scn2"]){const m=E.P[u];e.useProgram(m.p),e.uniform4fv(m.uS,V),u==="nit"&&(e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.colorMask(!0,!0,!0,!1)),e.drawArrays(e.TRIANGLES,0,3),(u==="scn"||u==="scn2")&&(V[79]=1,e.uniform4fv(m.uS,V),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.colorMask(!0,!0,!0,!1),e.drawArrays(e.TRIANGLES,0,3),V[79]=0),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0)}}V[64]=0}e.bindVertexArray(E.vaoI),C0&&(e.bindBuffer(e.ARRAY_BUFFER,E.db),e.bufferSubData(e.ARRAY_BUFFER,0,se,0,C0*16));const M=c=>{e.bindBuffer(e.ARRAY_BUFFER,c);for(let u=0;u<4;u++)e.enableVertexAttribArray(u),e.vertexAttribPointer(u,4,e.FLOAT,!1,64,u*16),e.vertexAttribDivisor(u,1)};for(const c of[0,1]){const u=c?d0.M:d0.L;e.bindFramebuffer(e.FRAMEBUFFER,u.f),e.viewport(0,0,l0,l0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),V[54]=c?3:g0.ct;for(const m of[0,1]){const k=m?E.P.dsc:E.P.lay;e.useProgram(k.p),V[67]=m,e.uniform4fv(k.uS,V),M(E.sb),e.drawArraysInstanced(e.TRIANGLES,0,6,Oe),C0&&!m&&(M(E.db),e.drawArraysInstanced(e.TRIANGLES,0,6,C0))}}V[54]=g0.ct,V[67]=0;for(let c=0;c<4;c++)e.vertexAttribDivisor(c,0),e.disableVertexAttribArray(c);e.disable(e.BLEND),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,l0,l0),e.bindVertexArray(E.vaoE);const g=E.P.wat;e.useProgram(g.p),e.uniform4fv(g.uS,V),f0(0,E.tN),f0(1,E.tP),f0(2,d0.L.t),f0(3,d0.M.t),f0(4,d0.S.t),f0(5,d0.W.t),e.drawArrays(e.TRIANGLES,0,3);for(let c=2;c<7;c++)f0(c,null);e.bindVertexArray(null)};if(E.fin){E.fin=!1;for(const t of["scn","scn2","sky","wat","lay","dsc",...E.hf?["air"]:[]]){const o=E.P[t];if(!e.getProgramParameter(o.p,e.LINK_STATUS))throw new Error("575 "+t+": "+e.getShaderInfoLog(o.vs)+e.getShaderInfoLog(o.fs)+e.getProgramInfoLog(o.p));const a={p:o.p},s=[["uN",0],["uP",1],["uL",2],["uM",3],["uA",4],["uB",5],["uF",6],["uE",7]];a.uS=e.getUniformLocation(o.p,"uS");for(const[r]of s)a[r]=e.getUniformLocation(o.p,r);e.useProgram(o.p),s.forEach(([r,n])=>{a[r]&&e.uniform1i(a[r],n)}),E.P[t]=a}}if(j[6]>0&&!E.P.nit){const t=(r,n)=>{const f=e.createShader(n);return e.shaderSource(f,r),e.compileShader(f),f},o=e.createProgram(),a=t(Ne,e.FRAGMENT_SHADER),s=t(Ot,e.VERTEX_SHADER);if(e.attachShader(o,s),e.attachShader(o,a),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS))throw new Error("575 nit: "+e.getShaderInfoLog(a)+e.getProgramInfoLog(o));E.P.nit={p:o,uS:e.getUniformLocation(o,"uS")},e.useProgram(o),e.uniform1i(e.getUniformLocation(o,"uN"),0),e.uniform1i(e.getUniformLocation(o,"uP"),1)}ue();let _t=0;return(t,o)=>{for(o=Math.min(o||0,.1),to(o),_t+=o;_t>1/30;)eo(1/30),_t-=1/30;ue()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
