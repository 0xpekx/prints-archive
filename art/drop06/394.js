// Moon Rings: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/394.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(He){He&&He.add({num:394,name:"Moon Rings",fam:"Worlds",recipe:"A night photo of the moon behind a thin veil of cloud, with soft rings of colour around it that come from the real size of the cloud droplets. The cloud, the droplets and what's below (a roofline, a tall skyline or open water) change every mint. Drag to pan the sky, tap for a gust that brings in cloud with different droplets so the rings grow or shrink, or hold to let the veil thicken until the rings wash out.",interactive:"Drag to pan across the sky; tap for a gust whose front sweeps new cloud with different droplets across the Moon (bigger droplets, tighter rings; more uniform droplets, more vivid rings), two sets of rings at once while it crosses; hold to let the veil thicken until the rings wash out and the Moon dims to its face, let go and it thins.",music:!0,gl:!0,fps:30,seed:0,make(V){const t=V.gl,Qt=V.size,H=!!V.home;let at=961284734;for(let e=2;e<66;e+=8)at=Math.imul(at^parseInt(V.hash.slice(e,e+8),16),2246822507)^at>>>13;const s=()=>{at=at+1831565813|0;let e=Math.imul(at^at>>>15,1|at);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Mt=e=>{let r=0;for(const a in e)r+=e[a];let o=s()*r;for(const a in e)if(o-=e[a],o<0)return a;return Object.keys(e)[0]},B0=0,Jt=B0?{}:null,rt=(e,r)=>V.trait(e,Jt&&Jt[e]||r),Xt=rt("Cloud",H?"Altocumulus":Mt({Altocumulus:46,"Thin cirrocumulus":24,"Broken patches":22,"Pollen haze":8}));let lt=961420890;for(let e=2;e<66;e+=8)lt=Math.imul(lt^parseInt(V.hash.slice(e,e+8),16),2654435761)^lt>>>15;const ve=()=>{lt=lt+1831565813|0;let e=Math.imul(lt^lt>>>15,1|lt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},S0=H||ve()<.7?"Normal":"Telephoto",Oe=Jt&&Jt.Lens||(Xt==="Pollen haze"?"Telephoto":S0);let ht=961154578;for(let e=2;e<66;e+=8)ht=Math.imul(ht^parseInt(V.hash.slice(e,e+8),16),668265263)^ht>>>12;const we=()=>{ht=ht+1831565813|0;let e=Math.imul(ht^ht>>>15,1|ht);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},qe=Xt==="Broken patches"&&Oe==="Telephoto",C0=we(),X0=we(),$t=we(),Me=H?"Full moon":Mt({"Full moon":54,"Gibbous moon":39,"Full moon at dusk":7}),Ye=rt("Light",!H&&!qe&&Me!=="Full moon at dusk"&&C0<.135?"Moonrise":Me),et=Ye==="Moonrise",G0=rt("Droplets",H?"Medium":Mt({"Small (wide rings)":30,Medium:44,"Large (tight rings)":26})),W0=rt("Droplet spread",H?"Uniform":Mt({Mixed:42,Uniform:43,"Very uniform":15})),Ve=H?"Rooftops":Mt({Rooftops:38,Pines:30,"Harbour masts":18,None:14}),Gt=(Xt==="Pollen haze"||et)&&Ve==="None"?"Pines":Ve,te=rt("Silhouette",H||qe?Gt:X0<.107?"Open water":Gt),J=te==="Open water",Wt=rt("Exposure",H?"Normal":Mt({Short:28,Normal:50,Long:22})),Ke=rt("Scud",H?"Dark scud":Mt({"Clear below":34,"Dark scud":50,"Heavy scud":16})),it=Xt==="Pollen haze",Ht=Ye==="Full moon at dusk",q={Altocumulus:0,"Thin cirrocumulus":1,"Broken patches":2,"Pollen haze":3}[Xt];let ye={"Small (wide rings)":6,Medium:9,"Large (tight rings)":13}[G0]*(.92+.16*s()),ee={Mixed:2.1,Uniform:1,"Very uniform":.55}[W0]+.3*s();it&&(ye=13+4*s(),ee=Math.max(1.3,Math.min(ee,1.8))),q===1&&(ee*=.7);const je=[1.05,.8,1.2,.55][q]*(.9+.2*s()),Ze=[0,.18,-.24,0][q]+.08*(s()-.5),Qe={Short:.5,Normal:1,Long:1.75}[Wt]*(Ht?.85:1),H0={Short:.7,Normal:1,Long:1.45}[Wt]*(Ht?.6:1),O0=Me==="Gibbous moon"?.25+.5*s():1,q0=et?1:O0,Je=s()*6.283,Y0={"Clear below":1.2,"Dark scud":.6,"Heavy scud":.5}[Ke],V0={"Clear below":0,"Dark scud":2.6,"Heavy scud":3.6}[Ke],$e=(J?.35:Gt==="Rooftops"||Gt==="Harbour masts"?1:Gt==="Pines"?.3:.55)*(et?.12:J?.3:1),Lt=H?.35:s()*6.283,ge=.0035+.002*s(),Ue=Math.cos(Lt)*ge,Ee=Math.sin(Lt)*ge,t0=2.4+.8*s(),e0=1.6+.6*s(),o0=[s(),s()],n0=[s(),s()],s0=s()*65536|0,S=rt("Lens",Oe)==="Telephoto"?1:0;let ft=961408075;for(let e=2;e<66;e+=8)ft=Math.imul(ft^parseInt(V.hash.slice(e,e+8),16),3266489909)^ft>>>14;const oe=()=>{ft=ft+1831565813|0;let e=Math.imul(ft^ft>>>15,1|ft);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},K0=(()=>{const e=oe();return e<.4?"An even deck":e<.65?"Ranks of billows":e<.85?"A deck's edge":e<.95?"A hole in the deck":"Pearl edge"})(),j0=rt("Deck",it?"No cloud":H?"An even deck":K0),ut={"An even deck":0,"Ranks of billows":1,"A deck's edge":2,"A hole in the deck":3,"Pearl edge":4,"No cloud":5}[j0],ro=oe()*6.283,Te=oe(),be=oe(),Z0=Ht?.3:.42+.06*(s()-.5),_=S?.085:.194,yt=_/.194,mt=et?.12+.05*$t:J?S?.085+.02*$t:.2+.04*$t:Z0,At=H||s()<.62?-1:1;let gt=-At*(.066+(H?0:.012*(s()-.5))),K=mt-.054-(H?0:.012*(s()-.5));S&&(gt=-At*_*(.36+.12*ve()),K=mt+_*(.34+.12*ve())),et&&(K=S?mt-_*.08:_*1,S||(gt=-At*.03)),J&&(K=_*(.46+.04*$t));const a0=S?[gt-.7*_,gt+.7*_]:[-.16,.16],r0=J?[K-.06*_,K+.12*_]:et?[K-.12*_,K+.4*_]:S?[K-.5*_,K+.5*_]:[mt-.15,mt+.08],Ut=[0,Math.sin(mt),Math.cos(mt)],i0=(e,r)=>{const o=Math.cos(e),a=Math.sin(e),n=Math.cos(r),m=Math.sin(r);return{F:[a*n,m,o*n],Rr:[o,0,-a],U:[-a*m,n,-o*m]}},ne=(e,r,o)=>{const a=[0,1,2].map(n=>e.F[n]+r*_*e.Rr[n]+o*_*e.U[n]);return[a[0]/a[2],a[1]/a[2]]},P=t.__c394||(t.__c394=(()=>{const e=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,r=e+"out vec2 vP; void main(){ vec2 p = vec2(float((gl_VertexID<<1)&2), float(gl_VertexID&2)); vP = p*2.-1.; gl_Position = vec4(vP,0.,1.); }",o="uint hh(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}",a=e+o+`
uniform vec4 uB0; uniform vec4 uB1; uniform vec4 uB2; uniform ivec4 uI; in vec2 vP; out vec4 o;
float h2(ivec2 c, ivec2 per, uint s){ c = (c + per*64) % per; return float(hh(uint(c.x) + hh(uint(c.y) + s)) & 65535u) / 65535.; }
float vn(vec2 p, ivec2 per, uint s){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f); ivec2 c = ivec2(i);
  return mix(mix(h2(c, per, s), h2(c + ivec2(1,0), per, s), f.x), mix(h2(c + ivec2(0,1), per, s), h2(c + ivec2(1,1), per, s), f.x), f.y); }
float fbm(vec2 uv, ivec2 per, uint s, int oct){ float a = .5, t = 0., n = 0.; vec2 p = uv*vec2(per);
  for (int i = 0; i < uI.y; i++){ if (i >= oct) break; t += a*vn(p, per, s + uint(i)*101u); n += a; a *= .5; p *= 2.; per *= 2; }
  return t/n; }
// Worley F1/F2 in a metric stretched along the wind (an.xy, lattice units): each pad trails a tail downwind
// (an.z) and, on long exposures, the drift smears it both ways (an.w)
vec2 wor(vec2 p, ivec2 per, uint s, vec2 jit, vec4 an){ vec2 i = floor(p), f = fract(p); float F1 = 8., F2 = 8.;
  for (int y = -uI.x; y <= uI.x; y++) for (int x = -uI.x; x <= uI.x; x++){ ivec2 c = ivec2(i) + ivec2(x, y);
    vec2 g = .5 + jit*(vec2(h2(c, per, s), h2(c, per, s + 17u)) - .5); vec2 d = vec2(x, y) + g - f; float a = dot(d, an.xy);
    float q = dot(d, d) - a*a*(an.w + an.z*step(a, 0.));
    F2 = min(F2, max(F1, q)); F1 = min(F1, q); }
  return sqrt(vec2(F1, F2)); }
void main(){
  vec2 uv = vP*.5 + .5; uint sd = uint(uI.z);
  vec2 w = vec2(fbm(uv, ivec2(4), sd + 11u, 4), fbm(uv, ivec2(4), sd + 23u, 4)) - .5;
  vec2 uw = uv + w*uB0.w;
  ivec2 N1 = ivec2(uB0.yz), N2 = N1*2;
  vec4 an = vec4(normalize(uB2.xy*vec2(N1)), uB2.zw);
  // broad pads whose size swells and shrinks across the deck (sz), smaller pads in the gaps and breaking off the
  // edges, each a soft dome; ranks across the wind (an integer wave vector keeps the deck periodic) merge pads
  // along their crests and clear the troughs; fine noise frays every edge
  float sz = smoothstep(.25, .75, fbm(uv, ivec2(3), sd + 5u, 3));
  float rk = mix(.5, .5 + .5*cos(6.2832*dot(uw, uB1.xy) + 7.*(w.x + w.y)), uB1.z);
  vec2 A1 = wor(uw*vec2(N1), N1, sd + 31u, vec2(.9, .55), an);
  vec2 A2 = wor(uw*vec2(N2) + .37, N2, sd + 47u, vec2(.95, .8), an);
  float det = fbm(uw, N1*2, sd + 61u, 5);
  float b1 = clamp(1. - A1.x/(mix(.35, .95, sz)*mix(.7, 1.15, rk)), 0., 1.), b2 = clamp(1. - A2.x/.6, 0., 1.);
  float seam = smoothstep(0., .4, A1.y - A1.x);
  float cell = clamp(b1*(.85 + .15*seam) + .45*b2*(1. - .75*b1) + .55*(det - .5) + .02, 0., 1.)*mix(1., smoothstep(.05, .65, rk), uB1.w);
  float cov = fbm(uv + w*.15, ivec2(3), sd + 71u, 5);
  float rad = fbm(uv, ivec2(5), sd + 83u, 4);
  float low = fbm(uv + w*.6, ivec2(3), sd + 97u, 6);
  o = vec4(cell, clamp((vec3(cov, rad, low) - .5)*2.5 + .5, 0., 1.)); }`,m=e+o+`
uniform vec4 U[23]; uniform sampler2D uC;
// the cloud overhead: U[5] the old air's droplets and thickness, U[16] a gust's new air behind its front (U[19])
vec2 dens(vec4 cl, vec2 uvT, float rn, float th, out vec4 pc, out vec2 pe){
  vec2 e = uvT - U[6].xy;
  float bl = U[6].w*exp(-dot(e, e)*U[6].z);
  vec2 eg = uvT - U[4].xy - U[18].xy;
  float sdE = dot(eg, U[17].xy) - U[15].y + .07*(cl.g - .5) + .025*(cl.r - .5);   // a margin follows the cloud's outline
  float fa = (U[19].z - dot(eg, U[19].xy))*U[19].w, fr = smoothstep(-1., 1., fa);
  pc = mix(U[5], U[16], fr);
  // the deck's large forms: thick banks and lanes (g), slow growth and thinning (rn), a margin or a hole (Deck),
  // and a gust's front, a line of denser cloud
  float cov = cl.g*1.15 - .08 + pc.w + bl + .12*(U[14].z - 1.) + .35*(rn - .5) + .45*exp(-fa*fa)*step(-30., fa)
            + U[17].w*clamp(sdE*U[17].z, -1., 1.);
  vec2 eh = eg*vec2(1., .42);   // a hole: rounder than the deck's foreshortening, its rim following the pads
  float ho = U[18].w*smoothstep(1.2, .35, dot(eh, eh)*U[18].z + .5*(cl.g - .5) + .5*(cl.r - .4)); cov -= ho;
  // the pearl edge: near the Moon the deck's margin is drawn out into a thin smooth band (across it: pe.y)
  pe.y = sdE*U[21].x; pe.x = U[21].y*exp(-pe.y*pe.y)*exp(-th/.16);
  cov = clamp(cov, 0., 1.);
  float sheet = smoothstep(.04, .34, cov);
  // pads shrink and fray out toward thin parts and the margin, swell and merge where the deck is thick; a pad's
  // core is optically thick, its rim and the veil between pads thin
  // on the long lens (U[21].w) a finer read of the same tile frays each pad's edge into smaller puffs and fibres and
  // mottles its body, so a pad is never one even tone with a smooth rim
  vec4 f4 = U[21].w > 0. ? texture(uC, (uvT + U[8].xy)*2.3 + .37) - .5 : vec4(0.);
  float cells = smoothstep(.12, .92, cl.r + .5*bl + .04*(U[14].z - 1.) + 1.1*(cov - .52) + U[21].w*(.6*f4.a + .45*f4.r));
  float vf = U[15].z*mix(.45, 1., exp(-th/.16));   // the veil between pads: kept near the Moon, thin in the far gaps
  float d = mix((vf*(.45 + .55*sheet) + sheet*(1. - vf)*cells*cells*2.4*(1. + U[21].w*(1.1*f4.a + .4*f4.r)))*(.65 + .5*cov), (.4 + .3*cl.g)*.6, U[11].z);
  // held: a sheet of veil fills the gaps and the whole deck thickens
  d = (d + .5*(U[14].z - 1.))*(1. - .995*ho) + .5*pe.x;
  pc.w = ho;   // (the hole's mask: clear air, so the composite lets the sky and its stars through)
  return vec2(pc.z*d*(1. + .3*(U[14].z - 1.)), d); }
float lowd(float a, vec2 wT){
  vec2 e = wT - U[7].xy;
  float s = smoothstep(U[9].z - .16, U[9].z + .34, a)*(1. - U[7].w*exp(-dot(e, e)*U[7].z)); return U[9].w*s*s; }
`+`
uniform sampler2D uL; uniform sampler2D uM; uniform sampler2D uN; in vec2 vP; out vec4 o;
vec3 cor(float u, float s){ u = max(u, 0.); float t = clamp(u/3.2, 0., 1.)*(511./512.) + .5/512.;
  return textureLod(uL, vec2(t, (clamp(s, 0., 7.) + .5)/8.), 0.).rgb; }
float env(float u){ float k = max(u, 0.)/.12; return 1./(1. + k*k*k); }
void main(){
  vec3 F = U[0].xyz, Rr = U[1].xyz, Up = U[2].xyz, M = U[3].xyz; float k = U[0].w, tm = U[1].w;
  vec3 ray = normalize(F + vP.x*k*Rr + vP.y*k*Up);
#ifdef WATER
  // open water (written in only for those mints): a ray below the horizon is mirrored by a rippled surface before the
  // sky is worked out, so the one evaluation of cloud, corona, Moon and shore gives the reflection: the Moon breaks
  // into a road of level dashes, the deck into slow smears; calm within a hand of the far shore
  float wr = 1.;
  if (ray.y < 0.){
    float dp = -ray.y; vec2 wp = ray.xz/max(dp, .004);
    // the ripples: two reads of the deck tile on the water plane, long across the line of sight, drifting apart
    vec2 w1 = wp*vec2(.1, .028) + U[4].xy*1.7 + vec2(.13, tm*.004), w2 = wp*vec2(.15, .041) + vec2(.61 - tm*.0031, .29 + tm*.0023);
    float h1 = texture(uC, w1).b - .5, h2 = texture(uC, w2).a - .5;
    float cm = smoothstep(.0, U[22].y, dp); vec2 sl = U[22].x*vec2(.35*(h1 - h2), h1 + .8*h2)*cm*cm;
    ray = reflect(ray, normalize(vec3(sl.x, 1., sl.y))); ray.y = abs(ray.y);
    wr = .02 + .55*pow(1. - dp, 30.);   // the water reflects more toward the horizon
  }
#endif
  vec2 q = ray.xy/ray.z;
  vec3 dm = ray - M; float th = 2.*asin(min(length(dm)*.5, 1.));
  vec2 mt = vec2(dot(dm, Rr), dot(dm, Up));
#ifdef WATER
  #define HZ .004
#else
  #define HZ .03
#endif
  vec2 P = ray.xz/max(ray.y, HZ), uvT = P*U[9].x + U[4].xy, wT = P*U[9].y + U[4].zw;
  vec4 cl = texture(uC, uvT + U[8].xy);
  float rn = texture(uC, uvT*.43 + U[14].xy).b;
  vec4 pc; vec2 pe; vec2 dn = dens(cl, uvT, rn, th, pc, pe);
#ifdef WATER
  dn *= smoothstep(.004, .03, ray.y);   // (the deck and the scud far off over the shore thin into the low haze)
#endif
  float tau = dn.x, et = exp(-tau), hr = 4.*pc.w*(1. - pc.w);   // hr: a hole's rim, thin cloud of small alike droplets
  // droplets: radius drifts gently across the deck; at the thin margins of a cloudlet they are smaller and more alike
  // (on the long lens over the pad's outer third, and less, so the tint grades in from the rim instead of drawing a line)
  float thin = mix(smoothstep(.0, .22 + .38*U[21].w, dn.y), 1., U[11].z);
  float rr = pc.x*(1. + .2*(rn - .5))*mix(.72 + .13*U[21].w, 1., thin)*mix(1., .45 + .4*smoothstep(-1.2, 1.2, pe.y), pe.x), ss = pc.y*mix(.45 + .2*U[21].w, 1., thin)*(1. - .7*pe.x);
  vec2 wl = wT + U[8].zw;
  // the scud's shape changes as it goes: its fine detail drifts through it
  float tl = lowd(texture(uC, wl).a*.4 + .3 + .12*(texture(uC, wl*2.3 + .31 + tm*vec2(.0021, -.0013)).b - .5), wT);
#ifdef WATER
  tl *= smoothstep(.004, .03, ray.y);
#endif
  float day = U[10].w;
  // a rising Moon: the long path through the air takes the blue out of everything it lights (U[21].z: 0 when high)
  vec3 ext = vec3(.35, .8, 1.7), mcol = vec3(.9, .97, 1.06)*exp(-U[21].z*ext);
  // diffraction corona: single scattering rings plus a doubly scattered, broadened aureole
  vec2 nm = mt/(length(mt) + 1e-9);
  float thE = th*length(vec2(nm.x, nm.y*U[11].x));
  float u = thE*rr;
  vec3 cm = cor(u, ss);
  vec3 c1 = cm*env(u); c1 = mix(vec3(dot(c1, vec3(.25, .6, .15))), c1, .85); vec3 c2 = cor(u*.7071, 7.)*env(u*.7071);
  float spot = 1. + U[11].y*nm.y*nm.y*nm.y*nm.y;
  vec3 L = 31.*(rr*.09)*(tau*et*c1*spot + .3*tau*tau*et*c2)*mcol;
  // iridescence: beyond the rings the same diffraction tints thin cloud (its droplets small and alike) in pastel
  // bands that follow the cloud's outline; thick cloud forgets the angle and stays grey
  float lm = dot(cm, vec3(.25, .6, .15)) + 1e-4;
  vec3 ir = clamp(cm/lm - 1., -.7, 1.2)*min(U[15].x*smoothstep(.06, .12, th)*(1. - smoothstep(.2, .3, th))*(1. - smoothstep(.25, 1.1, tau)) + 1.6*pe.x + hr, 1.);
  // the forward lobe: a cloudlet's thin rim passes the most light (the silver lining), its thick core is dimmer and
  // greyer; the light falls off steeply away from the Moon; far off only the undersides show, dimly lit from the
  // sky and from the town's glow below, a little darker where thick
  L += ((tau*et + .28*(1. - et))*.3*exp(-th/.045) + (tau*et + .35*(1. - et))*.06*exp(-th/.12)*(1. + ir)*(1. + 4.*pe.x + 2.5*hr))*mcol
     + (1. - et)*exp(-.08*tau)*(.45 + .85*cl.r)*(U[13].z*vec3(.016, .0092, .0044)*exp(-max(ray.y - .1, 0.)*5.) + vec3(.0088, .0112, .0158)
     + day*mix(vec3(.085, .055, .05), vec3(.028, .034, .052), smoothstep(.08, .4, ray.y)));
  // sky: dark moonlit blue, a little brighter near the Moon and the horizon, town glow low down; or blue hour
  vec3 sky = vec3(.0014, .003, .0086)*(1. + .8*(1. - .7*U[21].w)*exp(-max(ray.y, 0.)*5.)) + vec3(.0095, .012, .0165)*(1. - .4*U[21].w)*exp(-th/(.12 + .13*U[21].w))
           + U[13].z*vec3(.036, .02, .0085)*exp(-max(ray.y, 0.)*10.) + U[21].z*vec3(.011, .0085, .0065)*exp(-max(ray.y, 0.)*14.);
  vec3 dsky = mix(vec3(.17, .105, .08), vec3(.017, .032, .07), smoothstep(.02, .42, ray.y)) + vec3(.02, .024, .03)*exp(-th/.14);
  sky = mix(sky, dsky, day);
  // a few stars, only in clear gaps and away from the Moon's glare
  vec2 g = q*U[13].w; vec2 gi = floor(g); uvec2 gu = uvec2(ivec2(gi) + 4096);
  uint hs = hh(gu.x*1973u + hh(gu.y*9277u + 77u));
  float sb = 0.;
  if ((hs & 1023u) < uint(U[14].w)){ vec2 sp = gi + .2 + .6*vec2(float((hs >> 10) & 255u), float((hs >> 18) & 255u))/255.;
    // a long exposure draws each star as a short dash along its arc; low down the town's haze puts them out
    vec2 dd = g - sp; dd = vec2(dot(dd, vec2(.8, .6)), dot(dd, vec2(-.6, .8))); dd.x = max(abs(dd.x) - U[20].x, 0.);
    float d2 = dot(dd, dd); float sig = U[2].w*U[13].w; float mg = float(hh(hs) & 4095u)/4095.;
    sb = (.02 + pow(mg, 6.)*1.1)*exp(-d2/(2.*sig*sig))*(1. - day)*(1. - exp(-th*th/mix(.02, .0015, pc.w)))*smoothstep(U[20].y, U[20].y + .12, ray.y)
       /(1. + 1.5*U[20].x/sig); }
  L += (sky + sb*vec3(.9, .95, 1.)*exp(-5.*tau))*et;
  // the Moon: a small sharp disc with its maria, dimmed by the cloud in front of it; gibbous terminator
  vec2 ml = mt/U[3].w*vec2(1., 1. + .11*U[21].z); vec2 ld = U[13].xy;   // (low down, refraction flattens the disc)
  vec2 mp = vec2(dot(ml, ld), dot(ml, vec2(-ld.y, ld.x)));
  float rm = length(ml), ew = 1.3*U[2].w/U[3].w;
  float dsc = smoothstep(1. + ew, 1. - ew, rm), lit = smoothstep(-.1, .1, mp.x + U[10].z*sqrt(max(1. - mp.y*mp.y, 0.)));
  // the near side's albedo (seas, highlands, Tycho), baked once into a small map
  float alb = texture(uN, mp*.5 + .5).r*1.4*(1. - .15*rm*rm);
  vec3 Lm = U[20].w*dsc*lit*et*alb*mcol*exp(U[21].z*((.3*ml.y - .4)*ext - .9));   // dimmed by the long path, deeper orange at the lower limb
  // camera: a tight glare round the transmitted Moon
  float bs = U[15].w;
  L += et*mcol*(.3*exp(-th/(.0055*bs)) + .07*(1. - .9*U[21].w)*exp(-th/(.03*bs)) + .006*(1. - .7*U[21].w)*exp(-th/(.14*bs)) + pc.w*(.05*exp(-th/.012) + .014*exp(-th/.035)));
  // dark scud in front, its thin fringes lit near the Moon
  float el = exp(-tl);
  vec3 lowL = (1. - el)*(sky*.35 + U[13].z*vec3(.008, .005, .003) + vec3(.0019, .0022, .0028) + mcol*.01*exp(-th/.2))
            + tl*el*(mcol*(.22*exp(-th/.035) + .06*exp(-th/.12)) + .012*mcol*exp(U[21].z*ext*.8));   // (far off, lit by the sky too)
  L = L*el + lowL; Lm *= el;
  // foreground silhouette
  vec2 sg = texture(uM, (q - U[12].xy)*U[12].zw).rg; float sm = sg.x, sl = sg.y/max(sm, .004);
  vec3 sc = vec3(.0012, .0017, .003) + U[13].z*vec3(.0006, .0004, .0002) + sl*(vec3(.0045, .0056, .0076) + U[13].z*vec3(.001, .0006, .0003));
  L = mix(L, mix(sc, dsky*(.05 + .12*sl), day), sm); Lm *= 1. - sm;
  // exposure and tone: the Moon's lit face is laid over what the cloud scatters in front of it, so its seas hold; still sensor noise
#ifdef WATER
  L = max(L, 0.)*wr + vec3(.0004, .0006, .0009)*(1. - wr); Lm *= min(1., 2.*wr + .25);
#endif
  float ex = U[10].x*(1. - .02*dot(vP, vP));
  L *= ex; Lm *= ex;
  vec3 y = 1. - exp(-L*1.15); y += (1. - y)*(1. - exp(-Lm*.9));
  y = pow(max(y, 0.), vec3(1./2.2));
  uvec2 ip = uvec2(gl_FragCoord.xy); uint hn = hh(ip.x*1973u + hh(ip.y*9277u + uint(U[20].z)));
  float n1 = float(hn & 1023u)/1023. + float((hn >> 10) & 1023u)/1023. - 1.;
  float n2 = float((hn >> 20) & 1023u)/1023. - .5;
  float na = U[10].y*.012*(1. - y.g*.6);
  y += na*(n1*vec3(1.) + .45*n2*vec3(1., -.6, .3));
  o = vec4(clamp(y, 0., 1.), 1.); }`,i=(d,x)=>{const l=t.createShader(x);return t.shaderSource(l,d),t.compileShader(l),l},h={},M=[];for(const[d,x]of[["bake",a],J?["compW",m.replace(`
`,`
#define WATER
`)]:["comp",m]]){const l=t.createProgram(),E=i(r,t.VERTEX_SHADER),A=i(x,t.FRAGMENT_SHADER);t.attachShader(l,E),t.attachShader(l,A),t.linkProgram(l),M.push([d,l,E,A])}t.flush();const w=512,y=8,L=24,b=3.2,k=d=>{if(d<8){const R=d*d,G=d*(72362614232+R*(-7895059235+R*(2423968531e-1+R*(-2972611439e-3+R*(15704.4826+R*-30.16036606))))),T=144725228442+R*(2300535178+R*(1858330474e-2+R*(99447.43394+R*(376.9991397+R))));return G/T}const x=8/d,l=x*x,E=d-2.356194491,A=1+l*(.00183105+l*(-3516396496e-14+l*(2457520174e-15+l*-240337019e-15))),X=.04687499995+l*(-.0002002690873+l*(8449199096e-15+l*(-88228987e-14+l*105787412e-15)));return Math.sqrt(.636619772/d)*(Math.cos(E)*A-x*Math.sin(E)*X)},I=new Float32Array(14001);I[0]=1;for(let d=1;d<I.length;d++){const x=d*.01,l=2*k(x)/x;I[d]=l*l}const c=(d,x,l,E)=>{const A=(d-x)/(d<x?l:E);return Math.exp(-.5*A*A)},f=[],v=[[],[],[]],g=[0,0,0];for(let d=0;d<L;d++){const x=.39+.32*(d+.5)/L,l=x*1e3,E=1+.35*(x-.55),A=1.056*c(l,599.8,37.9,31)+.362*c(l,442,16,26.7)-.065*c(l,501.1,20.4,26.2),X=.821*c(l,568.8,46.9,40.5)+.286*c(l,530.9,16.3,31.1),R=1.217*c(l,437,11.8,36)+.681*c(l,459,26,13.8),G=[3.2406*A-1.5372*X-.4986*R,-.9689*A+1.8758*X+.0415*R,.0557*A-.204*X+1.057*R];f.push(x);for(let T=0;T<3;T++)v[T].push(G[T]*E),g[T]+=G[T]*E}for(let d=0;d<3;d++)for(let x=0;x<L;x++)v[d][x]/=g[d];const z=new Float32Array(1),F=new Uint32Array(z.buffer),B=d=>{z[0]=d;const x=F[0],l=x>>>16&32768;let E=(x>>>23&255)-112,A=x&8388607;return E<=0?E<-10?l:(A|=8388608,l|(A>>1-E)+4096>>13):E>30?l|31744:l|E<<10|A+4096>>13},D=new Uint16Array(w*y*4),Z=new Float32Array(L);for(let d=0;d<y;d++){const x=.02+.06*d,l=16+10*d,E=Math.max(.25,1-3*x),A=1+3*x,X=[],R=[];let G=0;for(let T=0;T<l;T++){const W=E+(A-E)*(T+.5)/l,vt=(W-1)/x,wt=Math.exp(-.5*vt*vt)*W*W*W*W;X.push(W),R.push(wt),G+=wt}for(let T=0;T<l;T++)R[T]/=G;for(let T=0;T<w;T++){const W=T/(w-1)*b;let vt=0,wt=0,Kt=0;for(let tt=0;tt<L;tt++){const pe=628.3185*W/f[tt];let Zt=0;for(let xe=0;xe<l;xe++){const I0=pe*X[xe];Zt+=R[xe]*I[I0<14e3?I0|0:14e3]}Zt*=.55/f[tt]*(.55/f[tt]),vt+=v[0][tt]*Zt,wt+=v[1][tt]*Zt,Kt+=v[2][tt]*Zt}const jt=W/.12,St=(1+jt*jt*jt)/(1+12*(.25*vt+.6*wt+.15*Kt)),Ct=(d*w+T)*4;D[Ct]=B(vt*St),D[Ct+1]=B(wt*St),D[Ct+2]=B(Kt*St),D[Ct+3]=15360}}const Q=96,Bt=new Uint8Array(Q*Q),bt=[[-.32,.45,.3,1],[.15,.42,.18,1],[.35,.12,.2,1],[.68,.28,.12,1],[.55,-.2,.14,.8],[.3,-.33,.09,.7],[-.2,-.4,.15,.7],[-.62,.02,.26,.9],[-.48,-.4,.1,.7],[-.05,.72,.09,.55],[.2,.74,.08,.5],[-.72,.35,.12,.6]],kt=(d,x)=>{const l=Math.sin(d*127.1+x*311.7)*43758.5453;return l-Math.floor(l)},Yt=(d,x)=>{const l=Math.floor(d),E=Math.floor(x),A=d-l,X=x-E,R=A*A*(3-2*A),G=X*X*(3-2*X);return(kt(l,E)*(1-R)+kt(l+1,E)*R)*(1-G)+(kt(l,E+1)*(1-R)+kt(l+1,E+1)*R)*G};for(let d=0;d<Q;d++)for(let x=0;x<Q;x++){const l=(x+.5)/Q*2-1,E=(d+.5)/Q*2-1;let A=0;for(const[Kt,jt,St,Ct]of bt){const tt=(l-Kt)/St,pe=(E-jt)/St;A+=Ct*Math.exp(-(tt*tt+pe*pe))}const X=Yt(l*9,E*9)*.6+Yt(l*23+5,E*23)*.4,R=Math.min(1,Math.max(0,(A+.35*(X-.5)-.3)/.35)),G=l+.12,T=E+.7,W=Math.sqrt(G*G+T*T),vt=Math.atan2(T,G),wt=Math.exp(-W*3)*Math.pow(Math.max(0,Math.cos(vt*7+1.3)),8)*.25+Math.exp(-W*W*260)*.35;Bt[d*Q+x]=Math.round(255*Math.min(1,.66-.32*R+.06*(X-.5)+wt))}for(const[d,x,l,E]of M){if(!t.getProgramParameter(x,t.LINK_STATUS))throw new Error("394 "+d+": "+(t.getShaderInfoLog(E)||t.getShaderInfoLog(l)||t.getProgramInfoLog(x)));h[d]=x}const xt={bake:{uB0:t.getUniformLocation(h.bake,"uB0"),uB1:t.getUniformLocation(h.bake,"uB1"),uB2:t.getUniformLocation(h.bake,"uB2"),uI:t.getUniformLocation(h.bake,"uI")}},Rt=J?"compW":"comp",Vt=d=>t.getUniformLocation(h[Rt],d);xt[Rt]={U:Vt("U"),uC:Vt("uC"),uL:Vt("uL"),uM:Vt("uM"),uN:Vt("uN")},t.useProgram(h[Rt]),t.uniform1i(xt[Rt].uC,0),t.uniform1i(xt[Rt].uL,1),t.uniform1i(xt[Rt].uM,2),t.uniform1i(xt[Rt].uN,3),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1);const We=(d,x,l,E,A,X,R,G,T)=>{const W=t.createTexture();return t.bindTexture(t.TEXTURE_2D,W),t.texImage2D(t.TEXTURE_2D,0,l,d,x,0,E,A,X),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,R),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,G),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,T),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,T),W},no=We(w,y,t.RGBA16F,t.RGBA,t.HALF_FLOAT,D,t.LINEAR,t.LINEAR,t.CLAMP_TO_EDGE),so=We(Q,Q,t.R8,t.RED,t.UNSIGNED_BYTE,Bt,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.CLAMP_TO_EDGE);return t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,null),{P:h,U:xt,tex:We,tL:no,tN:so,vao:t.createVertexArray(),VS:r,FCOMP:m,mk:i}})()),ot=J?"compW":"comp";if(!P.P[ot]){const e=t.createProgram(),r=P.mk(P.VS,t.VERTEX_SHADER),o=P.mk(J?P.FCOMP.replace(`
`,`
#define WATER
`):P.FCOMP,t.FRAGMENT_SHADER);if(t.attachShader(e,r),t.attachShader(e,o),t.linkProgram(e),t.flush(),!t.getProgramParameter(e,t.LINK_STATUS))throw new Error("394 "+ot+": "+(t.getShaderInfoLog(o)||t.getProgramInfoLog(e)));P.P[ot]=e;const a=n=>t.getUniformLocation(e,n);P.U[ot]={U:a("U"),uC:a("uC"),uL:a("uL"),uM:a("uM"),uN:a("uN")},t.useProgram(e),t.uniform1i(P.U[ot].uC,0),t.uniform1i(P.U[ot].uL,1),t.uniform1i(P.U[ot].uM,2),t.uniform1i(P.U[ot].uN,3)}const Q0=P.P[ot],J0=P.U[ot],ke=Qt>512,se=ke?1024:512,N=ke?2048:1024,Y=ke?1152:576,dt={t:P.tex(se,se,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.REPEAT),f:t.createFramebuffer(),m:null};t.bindFramebuffer(t.FRAMEBUFFER,dt.f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,dt.t,0),dt.m=P.tex(N,Y,t.RG8,t.RG,t.UNSIGNED_BYTE,null,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.CLAMP_TO_EDGE);const ae=i0(gt,K),c0=ne(ae,1,-1),l0=ne(ae,-1,-1),h0=S?ne(ae,0,0)[0]-.4*yt:-.4,re=.8*yt,f0=.45*yt,u0=S?Math.min(c0[1],l0[1])-.12*yt:0,m0=et&&!S?1.25:1,Re=N*2*_/re,Le=new Uint8Array(N*Y),Ae=new Uint8Array(N*Y),d0=new Float32Array(N),u=N/2048*m0;let pt=Le,Pt=Ae,Nt=d0,ie=.06,ce=null,nt=0,Ft=0;const p0=e=>(e-h0)/re*N,Pe=e=>(e-u0)/f0*Y,U=(e,r,o,a,n,m=1)=>{n*=u;const i=Math.max(0,Math.floor(Math.min(e,o)-n-1)),h=Math.min(N-1,Math.ceil(Math.max(e,o)+n+1)),M=Math.max(0,Math.floor(Math.min(r,a)-n-1)),w=Math.min(Y-1,Math.ceil(Math.max(r,a)+n+1));w>Ft&&(Ft=w);const y=o-e,L=a-r,b=y*y+L*L+1e-9,k=Math.max(n,.35);for(let I=M;I<=w;I++)for(let c=i;c<=h;c++){const f=c+.5-e,v=I+.5-r;let g=(f*y+v*L)/b;g=g<0?0:g>1?1:g;const z=f-y*g,F=v-L*g,B=Math.sqrt(z*z+F*F);let D=(k-B+.5)*(n<.35?n/.35:1);if(D<=0)continue;D=Math.min(1,D)*m*255;const Z=I*N+c;D>=pt[Z]&&(pt[Z]=D,Pt[Z]=ie*255)}},st=(e,r,o)=>{for(let a=Math.max(0,Math.floor(e));a<Math.min(N,Math.ceil(r));a++){const n=o(a+.5);n>Nt[a]&&(Nt[a]=n)}},Et=e=>{const r=Math.ceil(p*.12);for(let o=0;o<N;o++){const a=Nt[o];if(a<=0)continue;const n=Math.min(Y,Math.floor(a));n+1>Ft&&(Ft=Math.min(Y-1,n+1));const m=Math.max(0,n-r),i=e(o,m)*255;for(let h=0;h<m;h++){const M=h*N+o;pt[M]=255,Pt[M]=i}for(let h=m;h<n;h++){const M=h*N+o;pt[M]=255,Pt[M]=e(o,h)*255}if(n<Y){const h=n*N+o,M=(a-n)*255;M>pt[h]&&(pt[h]=M,Pt[h]=e(o,n)*255)}}Nt.fill(0)},Ne=()=>{ce=new Uint8Array(N*Y),pt=ce,Pt=new Uint8Array(N*Y),Nt=new Float32Array(N)},$0=p0(0),x0=[],v0=Pe(Math.min(c0[1],l0[1])),p=N*(2*_/re)/2.05*(S?1.6:1)*m0,$=et?Math.max(Pe(.035),v0+Math.max(0,.3*Re-.3*p)):v0,O=e=>p0(ne(ae,(At<0?e:1-e)*2-1,-1)[0]),C=At<0?1:-1;if(te==="Rooftops"){const e=O(.62),r=$+p*(.11+.02*s()),o=$+p*(.065+.02*s()),a=e+C*p*.7;st(Math.min(e,a)-40,Math.max(e,a)+40,c=>{const f=(c-e)*C,v=f<0?-f:0;return r-2.5*Math.sin(Math.min(1,Math.max(0,f/(p*.7)))*3.14)-v*.8+.7*Math.sin(c*.45)*(v?0:.5)});const n=e-C*p*.05;st(Math.min(n,n-C*p*.35)-120,Math.max(n,n-C*p*.35)+120,c=>{const f=(n-c)*C,v=f>p*.3?f-p*.3:0;return o-v*.62});for(let c=Math.min(e,a);c<Math.max(e,a);c+=11*u)U(c,r-2.5*Math.sin(Math.min(1,Math.max(0,(c-e)*C/(p*.7)))*3.14)+.5,c+6*u,r+.5,2.2);const m=(c,f,v,g,z)=>{st(c-v/2,c+v/2,()=>f+g),x0.push([c-v/2,c+v/2,f-3*u]),U(c-v/2-3*u,f+g-3*u,c+v/2+3*u,f+g-3*u,2.6);for(let F=0;F<z;F++){const B=c-v/2+v*(F+.5)/z+(s()-.5)*3*u,D=(13+10*s())*u,Z=4+1.5*s();U(B,f+g,B,f+g+D,Z*.8),U(B-Z*u,f+g+D,B+Z*u,f+g+D,1.6),s()<.35&&U(B-3*u,f+g+D+3*u,B+3*u,f+g+D+6*u,2.2)}};m(e+C*p*.14,r,(40+14*s())*u,(40+18*s())*u,3+(s()<.5?1:0)),m(n-C*p*.22,o,(28+8*s())*u,(30+12*s())*u,2);const i=e+C*p*(.4+.08*s()),h=r+p*(.14+.03*s());U(i,r-2,i,h,1.3);const M=p*.1,w=(s()-.5)*4*u;U(i-M*.3,h-3*u,i+M*.7,h-3*u+w,1);for(let c=0;c<9;c++){const f=i-M*.3+M*c/8,v=h-3*u+w*(c/8+.3)-3*u,g=(9+4*Math.cos(c*.7))*u;U(f,v-g,f+1.5*u,v+g*.9,.55)}U(i-M*.25,h-p*.045,i+M*.35,h-p*.045,.75),U(i,h-p*.07,i-C*p*.12,r-1,.32,.8);const y=n-C*p*.08;U(y,o-2,y,o+16*u,2.4);const L=n-C*p*.3;U(L,o-2,L,o+10*u,1.2),U(L-7*u,o+8*u,L+2*u,o+24*u,3.4),Et((c,f)=>{for(const[z,F,B]of x0)if(c>=z&&c<F&&f>B)return($0<z?c-z:F-c)<2.5*u?.55:.1;if((c-e)*C>=0)return .16+.7*Math.exp(-(r-f)/(p*.012));const g=(n-c)*C;return f>o-Math.max(0,g-p*.3)*.62+1||g>p*.3?.03:.13+.6*Math.exp(-(o-f)/(p*.01))}),Ne(),nt=.9,ie=nt;let b=O(-.05);const k=O(1.05),I=Math.sign(k-b);for(;(k-b)*I>0;){const c=p*(.07+.12*s()),f=$+p*(.022+.03*s()),v=Math.min(b,b+I*c),g=Math.max(b,b+I*c),z=s()<.6;if(st(v,g,F=>f-(z?0:Math.min(F-v,g-F)<p*.012?p*.012-Math.min(F-v,g-F):0)),s()<.7){const F=v+(g-v)*(.2+.6*s()),B=p*(.012+.01*s());st(F-B/2,F+B/2,()=>f+p*(.012+.012*s()))}b+=I*c}Et(()=>nt)}else if(te==="Pines"){const e=(a,n,m,i)=>{const h=(s()-.5)*.16,M=.08+.25*s(),w=.08+.3*s(),y=s()<.28,L=!y&&s()<.2,b=n+m*(y?.82:1),k=c=>a+h*(c-n);if(U(k(n),n-6,k(n+m*.6),n+m*.6,2.4),U(k(n+m*.6),n+m*.6,k(b),b,1.2),y){const c=(s()<.5?-1:1)*m*(.05+.05*s());U(k(b),b,k(b)+c,b+m*(.06+.06*s()),.9)}else U(k(b),b,k(b)+(s()-.5)*3*u,b+m*.035,.7);const I=9+(s()*9|0);for(let c=0;c<I;c++){const f=(c+.35+.5*s())/I,v=L?Math.min(1,.45+f):f,g=b-m*(1-M)*f;for(let z=-1;z<=1;z+=2){if(s()<w)continue;const F=i*(.1+.9*Math.pow(v,.85))*(.5+.8*s()),B=F*(.12+.35*s()),D=k(g)+z*F,Z=g-B;U(k(g),g,D,Z,.9);const Q=3+(F/u/7|0);for(let Bt=0;Bt<Q;Bt++){const bt=(Bt+s())/Q,kt=k(g)+z*F*bt,Yt=g-B*bt*bt,xt=(1.6+2.8*s())*(1.15-.5*bt);U(kt,Yt,kt+z*(2+4*s())*u,Yt-(2+5*s())*u*(.4+bt),xt)}U(D,Z,D+z*4*u,Z+2.5*u,.9)}}},r=.38+.14*s(),o=10+(s()*8|0);st(O(r-.04),O(1)+C*300,a=>$+p*(.035+.025*Math.sin(a*.009/u+1.7)+.012*Math.sin(a*.041/u))*Math.min(1,Math.abs(a-O(r-.04))/(p*.08)));for(let a=0;a<70;a++){const n=r+(1.04-r)*s(),m=O(n),i=(7+12*s())*u;U(m-i,$+p*.03+i*.3,m+i,$+p*.03+i*(.4+.8*s()),i)}for(let a=0;a<o;a++){const n=r+(1.04-r)*(a+.15+.7*s())/o,m=s(),i=m<.25?1:m<.6?.62:.4;e(O(n),$+p*.01,p*(.24+.18*s())*i,p*(.05+.035*s())*(.55+.45*i))}Et(()=>.04),Ne(),nt=.75,ie=nt;for(let a=0;a<9;a++){const n=r-.2+.5*s();e(O(n),$,p*(.07+.07*s()),p*(.025+.015*s()))}st(O(r-.3),O(1)+C*300,a=>$+p*(.018+.008*Math.sin(a*.013/u))),Et(()=>nt)}else if(J){Ne(),nt=.55,ie=nt;const e=Pe(0),r=[s()*6.283,s()*6.283,s()*6.283],o=Re*(.007+.006*s()),a=m=>{const i=Math.sin(m*127.1+r[2]*31.7)*43758.5453;return i-Math.floor(i)},n=m=>{const i=Math.floor(m),h=m-i,M=h*h*(3-2*h);return a(i)*(1-M)+a(i+1)*M};st(0,N,m=>{const i=m/Re;return e+o*Math.max(.35,1+.55*Math.sin(i*4.3+r[0])+.3*Math.sin(i*13+r[1])+.5*Math.sqrt(n(i*70))+.25*n(i*190+7)-.4)}),Et(()=>nt)}else if(te==="Harbour masts"){const e=$+p*(.02+.01*s()),r=5+(s()*4|0);st(O(.3),O(1)+C*300,o=>e+1.2*Math.sin(o*.013));for(let o=0;o<r;o++){const a=.42+.62*(o+.2+.6*s())/r,n=O(a),m=p*(.05+.035*s()),i=e-p*.004,h=p*(.2+.2*s()),M=(s()-.5)*7*u,w=i+h,y=c=>n+M*(c-i)/h,L=s()<.5?1:-1;U(n,i,y(w),w,1.5),U(y(w),w,y(w),w+5*u,.6),U(y(w),w+5*u,y(w)+L*6*u,w+7*u,.45),U(y(w),w,n-L*m,i,.33,.85),U(y(w),w,n+L*m*.85,i,.33,.85);const b=h>p*.3?2:1;for(let c=1;c<=b;c++){const f=i+h*c/(b+1),v=p*(.012+.004*(b-c));U(y(f)-v,f,y(f)+v,f+u,.55),U(y(w),w,y(f)-v,f,.28,.7),U(y(w),w,y(f)+v,f,.28,.7),U(y(f)-v,f,n-v*1.3,i,.28,.7),U(y(f)+v,f,n+v*1.3,i,.28,.7)}const k=i+h*.09,I=m*(.55+.25*s());if(U(y(k),k,y(k)+L*I,k+1.5*u,1),U(y(k)+L*2*u,k+3*u,y(k)+L*I*.92,k+2.5*u,2.2),s()<.3){const c=n-L*m*.6,f=h*.55;U(c,i,c,i+f,1.1),U(c,i+f,n-L*m,i,.3,.8),U(c,i+f,y(w),w-h*.1,.3,.8)}}Et(()=>.03)}pt=Le,Pt=Ae,Nt=d0,et&&!J&&st(0,N,e=>$+p*(.012+.008*Math.sin(e*.011/u+2.1)+.004*Math.sin(e*.047/u))),Et(()=>.05);const le=Math.min(Y,Ft+2),he=new Uint8Array(N*le*2),to=nt*255;for(let e=0,r=Math.min(le,Ft+1)*N;e<r;e++){const o=Le[e],a=ce?ce[e]:0;if(!o&&!a)continue;const n=o/255,m=a/255;he[2*e]=(n+(1-n)*m)*255+.5,he[2*e+1]=n*Ae[e]+(1-n)*m*to+.5}le>Y-2&&he.fill(0,(Y-2)*N*2),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.bindTexture(t.TEXTURE_2D,dt.m),t.texSubImage2D(t.TEXTURE_2D,0,0,0,N,le,t.RG,t.UNSIGNED_BYTE,he),t.generateMipmap(t.TEXTURE_2D);const w0=q===1?[34,26]:[20,15];t.bindFramebuffer(t.FRAMEBUFFER,dt.f),t.viewport(0,0,se,se),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.useProgram(P.P.bake),t.uniform4f(P.U.bake.uB0,0,w0[0],w0[1],q===1?.05:.09);{const e=[Math.cos(Lt),Math.sin(Lt)],r=q===1?8:4;t.uniform4f(P.U.bake.uB1,Math.round(r*e[0]),Math.round(r*e[1]),ut===1?.95:q===1?.7:.5,ut===1?.85:q===1?.35:0),t.uniform4f(P.U.bake.uB2,e[0],e[1],Wt==="Long"?.3:.55,Wt==="Long"?.6:0)}t.uniform4i(P.U.bake.uI,2,8,s0,0),t.bindVertexArray(P.vao),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush(),t.bindTexture(t.TEXTURE_2D,dt.t),t.generateMipmap(t.TEXTURE_2D);let Fe=gt,_e=K,De=gt,ze=K;const _t=[ye,ee,je,Ze],j=_t.slice(),M0=_t.slice();let y0=0,Ie=!0,fe=[],Be=0,Se=-1e9,g0=0,Tt=1,U0=0,Dt=!1,ue=0,me=0,E0=0,T0=0,b0=0,ct="",k0=0;const eo=new Float32Array(92),Ot=(q===1?.62:.5)/(S===1?Math.sqrt(yt):1),Ce=.5/.45/(S===1?Math.sqrt(yt):1),zt=[Ut[0]/Ut[1],Ut[2]/Ut[1]],It=[Math.cos(Lt),Math.sin(Lt)],R0=Te<.5?-1:1,L0=[-It[1]*R0,It[0]*R0],de=ut===3?[.02*(be-.5),.02*(Te-.5)]:[0,0],A0=[zt[0]*Ot+de[0],zt[1]*Ot+de[1]],P0=(()=>{const e=Math.atan2(-.6,-At)+(be-.5)*.8;return[Math.cos(e),Math.sin(e)]})(),qt=ut===2?[L0[0],L0[1],1/.07,.62,-.02-.03*be]:ut===4?[P0[0],P0[1],1/.05,.7,.12+.05*Te]:[0,0,0,0,0],N0=.075*Math.min(1.6,Math.max(1,13.5/ye))*(q===1?1.1:1),F0=ut===3?[1/(N0*N0),1]:[0,0],oo=.8,Xe=-(de[0]*It[0]+de[1]*It[1]),Ge=.34,_0=Ge/4.2,D0=(e,r,o)=>{for(let w=0;w<4;w++)_t[w]=M0[w];let a=(Math.imul(y0+1,2654435761)^at)>>>0;const n=()=>(a=Math.imul(a^a>>>15,739982445)+1831565813>>>0,a/4294967296);y0++;const m=j[0]>8.5?4.5+3*n():10+5*n(),i=n();j[0]=it?11+8*n():m,j[1]=i<.65?.5+.7*n():1.6+2*n(),j[2]=je*(.7+.6*n()),j[3]=Ze+.3*(n()-.5),n(),n(),Ie=!1,Se=o,fe.push(o),fe.length>4&&fe.shift();const h=V.sound,M=Math.round(86-2.2*j[0]);h.hit("noise",.16,{dur:1.8,cutoff:520}),h.note(M,{dur:2.6,vel:.22,wave:"sine",attack:.15,pan:e*2-1}),j[1]<1&&h.note(M+7,{dur:2.2,vel:.12,wave:"sine",attack:.3,at:.12})},z0=e=>{const r=i0(Fe,_e),o=eo;o.set([r.F[0],r.F[1],r.F[2],_],0),o.set([r.Rr[0],r.Rr[1],r.Rr[2],e],4),o.set([r.U[0],r.U[1],r.U[2],.75*2*_/Qt],8),o.set([Ut[0],Ut[1],Ut[2],Ht?.0047:.0045],12);const a=e+Be,n=e+.4*Be;o.set([Ue*a,Ee*a,Ue*t0*n,Ee*t0*n],16),o.set(_t,20),o.set([zt[0]*Ot,zt[1]*Ot,1/(.15*.15),it?0:q===2?.5:.3],24),o.set([zt[0]*Ce,zt[1]*Ce,1/(.3*.3),1],28),o.set([o0[0],o0[1],n0[0],n0[1]],32),o.set([Ot,Ce,Y0,V0],36),o.set([S?Qe*.72:Qe,H0,q0,Ht?1:0],40),o.set([it?.8:1,it?1.6:0,it?1:0,Math.floor(e*30)%4096],44),o.set([h0,u0,1/re,1/f0],48),o.set([Math.cos(Je),Math.sin(Je),$e,400],52),o.set([Ue*e0*a+.3,Ee*e0*a-.2*ge*a,Tt,it?9:4],56),o.set([oo,qt[4],ut===4?.4:q===2?0:q===1?.3:.12,S?yt:1],60),o.set(j,64),o.set([.5*(1+.6*Math.min(1,g0/12)),S?.02:.04,0,0],88),o.set([qt[0],qt[1],qt[2],qt[3]],68),o.set([A0[0],A0[1],F0[0],F0[1]],72),o.set([It[0],It[1],Xe-Ge+_0*(e-Se),1/.05],76),o.set([1/.026,ut===4?1:0,et?1.15-3*(mt-.12):0,S&&!it?1:0],84),o.set([Wt==="Long"?2.2:0,S?0:.14+.06*$e,s0&4095,8],80),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,Qt,Qt),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.useProgram(Q0),t.uniform4fv(J0.U,o),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,dt.t),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,P.tL),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,dt.m),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,P.tN),t.bindVertexArray(P.vao),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0)};return z0(0),(e,r)=>{r=Math.min(Math.max(r||0,0),.1);const o=V.input,a=o.taps();if(!o.down&&!Dt&&a.length){const i=a[a.length-1];D0(i.x,i.y,e)}if(o.down&&!Dt&&(Dt=!0,ue=o.x,me=o.y,E0=De,T0=ze,b0=e,ct="tap",U0=0),o.down&&Dt){const i=Math.hypot(o.x-ue,o.y-me);ct!=="drag"&&i>.025&&(ct="drag"),ct==="tap"&&e-b0>.35&&(ct="hold"),ct==="drag"&&(De=Math.max(a0[0],Math.min(a0[1],E0-(o.x-ue)*2*_)),ze=Math.max(r0[0],Math.min(r0[1],T0+(o.y-me)*2*_)))}!o.down&&Dt&&(Dt=!1,ct==="tap"&&D0(ue,me,e),ct=""),ct==="hold"?(U0+=r,Tt+=(3-Tt)*Math.min(1,r*.9),e-k0>1.1&&(k0=e,V.sound.hit("noise",.12+.12*Tt,{dur:1.4,cutoff:260+260*Tt}))):Tt+=(1-Tt)*Math.min(1,r*.8);const n=Math.min(1,r*6);Fe+=(De-Fe)*n,_e+=(ze-_e)*n;let m=0;for(const i of fe){const h=(e-i)/.4;h>0&&h<12&&(m+=12*h*Math.exp(1-h))}Be+=r*m,g0=m;{const i=(Xe-Ge+_0*(e-Se)-Xe)/.05,h=i<-1?0:i>1?1:.5+.75*i-.25*i*i*i;for(let M=0;M<4;M++)M0[M]=_t[M]+(j[M]-_t[M])*h;if(!Ie&&h>.4){Ie=!0;const M=Math.round(62-1.4*j[0]);[0,4,7,j[1]<1?12:11].forEach((w,y)=>V.sound.note(M+w,{dur:3,vel:.1+(j[1]<1?.05:0),wave:"sine",attack:.4,at:y*.09}))}}z0(e)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
