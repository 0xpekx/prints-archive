// Moon Rings: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/394.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Oe){Oe&&Oe.add({num:394,name:"Moon Rings",fam:"Worlds",recipe:"A night photo of the moon behind a thin veil of cloud, with soft rings of colour around it that come from the real size of the cloud droplets. The cloud, the droplets and what's below (a roofline, a tall skyline or open water) change every mint. Drag to pan the sky, tap for a gust that brings in cloud with different droplets so the rings grow or shrink, or hold to let the veil thicken until the rings wash out.",interactive:"Drag to pan across the sky; tap for a gust whose front sweeps new cloud with different droplets across the Moon (bigger droplets, tighter rings; more uniform droplets, more vivid rings), two sets of rings at once while it crosses; hold to let the veil thicken until the rings wash out and the Moon dims to its face, let go and it thins.",music:!0,gl:!0,fps:30,seed:0,make(V){const t=V.gl,$t=V.size,H=!!V.home;let rt=961284734;for(let e=2;e<66;e+=8)rt=Math.imul(rt^parseInt(V.hash.slice(e,e+8),16),2246822507)^rt>>>13;const s=()=>{rt=rt+1831565813|0;let e=Math.imul(rt^rt>>>15,1|rt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Mt=e=>{let r=0;for(const a in e)r+=e[a];let o=s()*r;for(const a in e)if(o-=e[a],o<0)return a;return Object.keys(e)[0]},S0=0,te=S0?{}:null,it=(e,r)=>V.trait(e,te&&te[e]||r),Wt=it("Cloud",H?"Altocumulus":Mt({Altocumulus:46,"Thin cirrocumulus":24,"Broken patches":22,"Pollen haze":8}));let ht=961420890;for(let e=2;e<66;e+=8)ht=Math.imul(ht^parseInt(V.hash.slice(e,e+8),16),2654435761)^ht>>>15;const Me=()=>{ht=ht+1831565813|0;let e=Math.imul(ht^ht>>>15,1|ht);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},C0=H||Me()<.7?"Normal":"Telephoto",qe=te&&te.Lens||(Wt==="Pollen haze"?"Telephoto":C0);let ft=961154578;for(let e=2;e<66;e+=8)ft=Math.imul(ft^parseInt(V.hash.slice(e,e+8),16),668265263)^ft>>>12;const ye=()=>{ft=ft+1831565813|0;let e=Math.imul(ft^ft>>>15,1|ft);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Ye=Wt==="Broken patches"&&qe==="Telephoto",X0=ye(),G0=ye(),ee=ye(),ge=H?"Full moon":Mt({"Full moon":54,"Gibbous moon":39,"Full moon at dusk":7}),Ve=it("Light",!H&&!Ye&&ge!=="Full moon at dusk"&&X0<.135?"Moonrise":ge),et=Ve==="Moonrise",W0=it("Droplets",H?"Medium":Mt({"Small (wide rings)":30,Medium:44,"Large (tight rings)":26})),H0=it("Droplet spread",H?"Uniform":Mt({Mixed:42,Uniform:43,"Very uniform":15})),Ke=H?"Rooftops":Mt({Rooftops:38,Pines:30,"Harbour masts":18,None:14}),Ht=(Wt==="Pollen haze"||et)&&Ke==="None"?"Pines":Ke,oe=it("Silhouette",H||Ye?Ht:G0<.107?"Open water":Ht),J=oe==="Open water",Ot=it("Exposure",H?"Normal":Mt({Short:28,Normal:50,Long:22})),je=it("Scud",H?"Dark scud":Mt({"Clear below":34,"Dark scud":50,"Heavy scud":16})),ct=Wt==="Pollen haze",qt=Ve==="Full moon at dusk",Y={Altocumulus:0,"Thin cirrocumulus":1,"Broken patches":2,"Pollen haze":3}[Wt];let Ue={"Small (wide rings)":6,Medium:9,"Large (tight rings)":13}[W0]*(.92+.16*s()),ne={Mixed:2.1,Uniform:1,"Very uniform":.55}[H0]+.3*s();ct&&(Ue=13+4*s(),ne=Math.max(1.3,Math.min(ne,1.8))),Y===1&&(ne*=.7);const Ze=[1.05,.8,1.2,.55][Y]*(.9+.2*s()),Qe=[0,.18,-.24,0][Y]+.08*(s()-.5),Je={Short:.5,Normal:1,Long:1.75}[Ot]*(qt?.85:1),O0={Short:.7,Normal:1,Long:1.45}[Ot]*(qt?.6:1),q0=ge==="Gibbous moon"?.25+.5*s():1,Y0=et?1:q0,$e=s()*6.283,V0={"Clear below":1.2,"Dark scud":.6,"Heavy scud":.5}[je],K0={"Clear below":0,"Dark scud":2.6,"Heavy scud":3.6}[je],t0=(J?.35:Ht==="Rooftops"||Ht==="Harbour masts"?1:Ht==="Pines"?.3:.55)*(et?.12:J?.3:1),Pt=H?.35:s()*6.283,Ee=.0035+.002*s(),Te=Math.cos(Pt)*Ee,be=Math.sin(Pt)*Ee,e0=2.4+.8*s(),o0=1.6+.6*s(),n0=[s(),s()],s0=[s(),s()],a0=s()*65536|0,S=it("Lens",qe)==="Telephoto"?1:0;let ut=961408075;for(let e=2;e<66;e+=8)ut=Math.imul(ut^parseInt(V.hash.slice(e,e+8),16),3266489909)^ut>>>14;const se=()=>{ut=ut+1831565813|0;let e=Math.imul(ut^ut>>>15,1|ut);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},j0=(()=>{const e=se();return e<.4?"An even deck":e<.65?"Ranks of billows":e<.85?"A deck's edge":e<.95?"A hole in the deck":"Pearl edge"})(),Z0=it("Deck",ct?"No cloud":H?"An even deck":j0),mt={"An even deck":0,"Ranks of billows":1,"A deck's edge":2,"A hole in the deck":3,"Pearl edge":4,"No cloud":5}[Z0],io=se()*6.283,ke=se(),Re=se(),Q0=qt?.3:.42+.06*(s()-.5),_=S?.085:.194,yt=_/.194,dt=et?.12+.05*ee:J?S?.085+.02*ee:.2+.04*ee:Q0,Nt=H||s()<.62?-1:1;let gt=-Nt*(.066+(H?0:.012*(s()-.5))),K=dt-.054-(H?0:.012*(s()-.5));S&&(gt=-Nt*_*(.36+.12*Me()),K=dt+_*(.34+.12*Me())),et&&(K=S?dt-_*.08:_*1,S||(gt=-Nt*.03)),J&&(K=_*(.46+.04*ee));const r0=S?[gt-.7*_,gt+.7*_]:[-.16,.16],i0=J?[K-.06*_,K+.12*_]:et?[K-.12*_,K+.4*_]:S?[K-.5*_,K+.5*_]:[dt-.15,dt+.08],Ut=[0,Math.sin(dt),Math.cos(dt)],c0=(e,r)=>{const o=Math.cos(e),a=Math.sin(e),n=Math.cos(r),m=Math.sin(r);return{F:[a*n,m,o*n],Rr:[o,0,-a],U:[-a*m,n,-o*m]}},ae=(e,r,o)=>{const a=[0,1,2].map(n=>e.F[n]+r*_*e.Rr[n]+o*_*e.U[n]);return[a[0]/a[2],a[1]/a[2]]},b=t.__c394||(t.__c394=(()=>{const e=`#version 300 es
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
`)]:["comp",m]]){const l=t.createProgram(),E=i(r,t.VERTEX_SHADER),P=i(x,t.FRAGMENT_SHADER);t.attachShader(l,E),t.attachShader(l,P),t.linkProgram(l),M.push([d,l,E,P])}t.flush();const w=512,y=8,A=24,k=3.2,R=d=>{if(d<8){const L=d*d,G=d*(72362614232+L*(-7895059235+L*(2423968531e-1+L*(-2972611439e-3+L*(15704.4826+L*-30.16036606))))),T=144725228442+L*(2300535178+L*(1858330474e-2+L*(99447.43394+L*(376.9991397+L))));return G/T}const x=8/d,l=x*x,E=d-2.356194491,P=1+l*(.00183105+l*(-3516396496e-14+l*(2457520174e-15+l*-240337019e-15))),X=.04687499995+l*(-.0002002690873+l*(8449199096e-15+l*(-88228987e-14+l*105787412e-15)));return Math.sqrt(.636619772/d)*(Math.cos(E)*P-x*Math.sin(E)*X)},I=new Float32Array(14001);I[0]=1;for(let d=1;d<I.length;d++){const x=d*.01,l=2*R(x)/x;I[d]=l*l}const c=(d,x,l,E)=>{const P=(d-x)/(d<x?l:E);return Math.exp(-.5*P*P)},f=[],v=[[],[],[]],g=[0,0,0];for(let d=0;d<A;d++){const x=.39+.32*(d+.5)/A,l=x*1e3,E=1+.35*(x-.55),P=1.056*c(l,599.8,37.9,31)+.362*c(l,442,16,26.7)-.065*c(l,501.1,20.4,26.2),X=.821*c(l,568.8,46.9,40.5)+.286*c(l,530.9,16.3,31.1),L=1.217*c(l,437,11.8,36)+.681*c(l,459,26,13.8),G=[3.2406*P-1.5372*X-.4986*L,-.9689*P+1.8758*X+.0415*L,.0557*P-.204*X+1.057*L];f.push(x);for(let T=0;T<3;T++)v[T].push(G[T]*E),g[T]+=G[T]*E}for(let d=0;d<3;d++)for(let x=0;x<A;x++)v[d][x]/=g[d];const z=new Float32Array(1),F=new Uint32Array(z.buffer),B=d=>{z[0]=d;const x=F[0],l=x>>>16&32768;let E=(x>>>23&255)-112,P=x&8388607;return E<=0?E<-10?l:(P|=8388608,l|(P>>1-E)+4096>>13):E>30?l|31744:l|E<<10|P+4096>>13},D=new Uint16Array(w*y*4),Z=new Float32Array(A);for(let d=0;d<y;d++){const x=.02+.06*d,l=16+10*d,E=Math.max(.25,1-3*x),P=1+3*x,X=[],L=[];let G=0;for(let T=0;T<l;T++){const W=E+(P-E)*(T+.5)/l,vt=(W-1)/x,wt=Math.exp(-.5*vt*vt)*W*W*W*W;X.push(W),L.push(wt),G+=wt}for(let T=0;T<l;T++)L[T]/=G;for(let T=0;T<w;T++){const W=T/(w-1)*k;let vt=0,wt=0,Zt=0;for(let tt=0;tt<A;tt++){const ve=628.3185*W/f[tt];let Jt=0;for(let we=0;we<l;we++){const B0=ve*X[we];Jt+=L[we]*I[B0<14e3?B0|0:14e3]}Jt*=.55/f[tt]*(.55/f[tt]),vt+=v[0][tt]*Jt,wt+=v[1][tt]*Jt,Zt+=v[2][tt]*Jt}const Qt=W/.12,Xt=(1+Qt*Qt*Qt)/(1+12*(.25*vt+.6*wt+.15*Zt)),Gt=(d*w+T)*4;D[Gt]=B(vt*Xt),D[Gt+1]=B(wt*Xt),D[Gt+2]=B(Zt*Xt),D[Gt+3]=15360}}const Q=96,Ct=new Uint8Array(Q*Q),Rt=[[-.32,.45,.3,1],[.15,.42,.18,1],[.35,.12,.2,1],[.68,.28,.12,1],[.55,-.2,.14,.8],[.3,-.33,.09,.7],[-.2,-.4,.15,.7],[-.62,.02,.26,.9],[-.48,-.4,.1,.7],[-.05,.72,.09,.55],[.2,.74,.08,.5],[-.72,.35,.12,.6]],Lt=(d,x)=>{const l=Math.sin(d*127.1+x*311.7)*43758.5453;return l-Math.floor(l)},Kt=(d,x)=>{const l=Math.floor(d),E=Math.floor(x),P=d-l,X=x-E,L=P*P*(3-2*P),G=X*X*(3-2*X);return(Lt(l,E)*(1-L)+Lt(l+1,E)*L)*(1-G)+(Lt(l,E+1)*(1-L)+Lt(l+1,E+1)*L)*G};for(let d=0;d<Q;d++)for(let x=0;x<Q;x++){const l=(x+.5)/Q*2-1,E=(d+.5)/Q*2-1;let P=0;for(const[Zt,Qt,Xt,Gt]of Rt){const tt=(l-Zt)/Xt,ve=(E-Qt)/Xt;P+=Gt*Math.exp(-(tt*tt+ve*ve))}const X=Kt(l*9,E*9)*.6+Kt(l*23+5,E*23)*.4,L=Math.min(1,Math.max(0,(P+.35*(X-.5)-.3)/.35)),G=l+.12,T=E+.7,W=Math.sqrt(G*G+T*T),vt=Math.atan2(T,G),wt=Math.exp(-W*3)*Math.pow(Math.max(0,Math.cos(vt*7+1.3)),8)*.25+Math.exp(-W*W*260)*.35;Ct[d*Q+x]=Math.round(255*Math.min(1,.66-.32*L+.06*(X-.5)+wt))}for(const[d,x,l,E]of M){if(!t.getProgramParameter(x,t.LINK_STATUS))throw new Error("394 "+d+": "+(t.getShaderInfoLog(E)||t.getShaderInfoLog(l)||t.getProgramInfoLog(x)));h[d]=x}const xt={bake:{uB0:t.getUniformLocation(h.bake,"uB0"),uB1:t.getUniformLocation(h.bake,"uB1"),uB2:t.getUniformLocation(h.bake,"uB2"),uI:t.getUniformLocation(h.bake,"uI")}},At=J?"compW":"comp",jt=d=>t.getUniformLocation(h[At],d);xt[At]={U:jt("U"),uC:jt("uC"),uL:jt("uL"),uM:jt("uM"),uN:jt("uN")},t.useProgram(h[At]),t.uniform1i(xt[At].uC,0),t.uniform1i(xt[At].uL,1),t.uniform1i(xt[At].uM,2),t.uniform1i(xt[At].uN,3),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1);const He=(d,x,l,E,P,X,L,G,T)=>{const W=t.createTexture();return t.bindTexture(t.TEXTURE_2D,W),t.texImage2D(t.TEXTURE_2D,0,l,d,x,0,E,P,X),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,L),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,G),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,T),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,T),W},so=He(w,y,t.RGBA16F,t.RGBA,t.HALF_FLOAT,D,t.LINEAR,t.LINEAR,t.CLAMP_TO_EDGE),ao=He(Q,Q,t.R8,t.RED,t.UNSIGNED_BYTE,Ct,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.CLAMP_TO_EDGE);return t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,null),{P:h,U:xt,tex:He,tL:so,tN:ao,vao:t.createVertexArray(),pools:{},VS:r,FCOMP:m,mk:i}})()),ot=J?"compW":"comp";if(!b.P[ot]){const e=t.createProgram(),r=b.mk(b.VS,t.VERTEX_SHADER),o=b.mk(J?b.FCOMP.replace(`
`,`
#define WATER
`):b.FCOMP,t.FRAGMENT_SHADER);if(t.attachShader(e,r),t.attachShader(e,o),t.linkProgram(e),t.flush(),!t.getProgramParameter(e,t.LINK_STATUS))throw new Error("394 "+ot+": "+(t.getShaderInfoLog(o)||t.getProgramInfoLog(e)));b.P[ot]=e;const a=n=>t.getUniformLocation(e,n);b.U[ot]={U:a("U"),uC:a("uC"),uL:a("uL"),uM:a("uM"),uN:a("uN")},t.useProgram(e),t.uniform1i(b.U[ot].uC,0),t.uniform1i(b.U[ot].uL,1),t.uniform1i(b.U[ot].uM,2),t.uniform1i(b.U[ot].uN,3)}const J0=b.P[ot],$0=b.U[ot],re=$t>512,Ft=re?1024:512,N=re?2048:1024,O=re?1152:576,Et=b.pools[Ft]||(b.pools[Ft]={list:[],next:0});let nt;if(Et.list.length<(re?3:10)){const e=b.tex(Ft,Ft,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.REPEAT),r=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0);const o=b.tex(N,O,t.RG8,t.RG,t.UNSIGNED_BYTE,null,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.CLAMP_TO_EDGE);nt={t:e,f:r,m:o,my:0},Et.list.push(nt)}else nt=Et.list[Et.next],Et.next=(Et.next+1)%Et.list.length;const ie=c0(gt,K),l0=ae(ie,1,-1),h0=ae(ie,-1,-1),f0=S?ae(ie,0,0)[0]-.4*yt:-.4,ce=.8*yt,u0=.45*yt,m0=S?Math.min(l0[1],h0[1])-.12*yt:0,d0=et&&!S?1.25:1,Le=N*2*_/ce,Ae=new Uint8Array(N*O),Pe=new Uint8Array(N*O),p0=new Float32Array(N),u=N/2048*d0;let pt=Ae,_t=Pe,Dt=p0,le=.06,he=null,st=0,Tt=0;const x0=e=>(e-f0)/ce*N,Ne=e=>(e-m0)/u0*O,U=(e,r,o,a,n,m=1)=>{n*=u;const i=Math.max(0,Math.floor(Math.min(e,o)-n-1)),h=Math.min(N-1,Math.ceil(Math.max(e,o)+n+1)),M=Math.max(0,Math.floor(Math.min(r,a)-n-1)),w=Math.min(O-1,Math.ceil(Math.max(r,a)+n+1));w>Tt&&(Tt=w);const y=o-e,A=a-r,k=y*y+A*A+1e-9,R=Math.max(n,.35);for(let I=M;I<=w;I++)for(let c=i;c<=h;c++){const f=c+.5-e,v=I+.5-r;let g=(f*y+v*A)/k;g=g<0?0:g>1?1:g;const z=f-y*g,F=v-A*g,B=Math.sqrt(z*z+F*F);let D=(R-B+.5)*(n<.35?n/.35:1);if(D<=0)continue;D=Math.min(1,D)*m*255;const Z=I*N+c;D>=pt[Z]&&(pt[Z]=D,_t[Z]=le*255)}},at=(e,r,o)=>{for(let a=Math.max(0,Math.floor(e));a<Math.min(N,Math.ceil(r));a++){const n=o(a+.5);n>Dt[a]&&(Dt[a]=n)}},bt=e=>{const r=Math.ceil(p*.12);for(let o=0;o<N;o++){const a=Dt[o];if(a<=0)continue;const n=Math.min(O,Math.floor(a));n+1>Tt&&(Tt=Math.min(O-1,n+1));const m=Math.max(0,n-r),i=e(o,m)*255;for(let h=0;h<m;h++){const M=h*N+o;pt[M]=255,_t[M]=i}for(let h=m;h<n;h++){const M=h*N+o;pt[M]=255,_t[M]=e(o,h)*255}if(n<O){const h=n*N+o,M=(a-n)*255;M>pt[h]&&(pt[h]=M,_t[h]=e(o,n)*255)}}Dt.fill(0)},Fe=()=>{he=new Uint8Array(N*O),pt=he,_t=new Uint8Array(N*O),Dt=new Float32Array(N)},to=x0(0),v0=[],w0=Ne(Math.min(l0[1],h0[1])),p=N*(2*_/ce)/2.05*(S?1.6:1)*d0,$=et?Math.max(Ne(.035),w0+Math.max(0,.3*Le-.3*p)):w0,q=e=>x0(ae(ie,(Nt<0?e:1-e)*2-1,-1)[0]),C=Nt<0?1:-1;if(oe==="Rooftops"){const e=q(.62),r=$+p*(.11+.02*s()),o=$+p*(.065+.02*s()),a=e+C*p*.7;at(Math.min(e,a)-40,Math.max(e,a)+40,c=>{const f=(c-e)*C,v=f<0?-f:0;return r-2.5*Math.sin(Math.min(1,Math.max(0,f/(p*.7)))*3.14)-v*.8+.7*Math.sin(c*.45)*(v?0:.5)});const n=e-C*p*.05;at(Math.min(n,n-C*p*.35)-120,Math.max(n,n-C*p*.35)+120,c=>{const f=(n-c)*C,v=f>p*.3?f-p*.3:0;return o-v*.62});for(let c=Math.min(e,a);c<Math.max(e,a);c+=11*u)U(c,r-2.5*Math.sin(Math.min(1,Math.max(0,(c-e)*C/(p*.7)))*3.14)+.5,c+6*u,r+.5,2.2);const m=(c,f,v,g,z)=>{at(c-v/2,c+v/2,()=>f+g),v0.push([c-v/2,c+v/2,f-3*u]),U(c-v/2-3*u,f+g-3*u,c+v/2+3*u,f+g-3*u,2.6);for(let F=0;F<z;F++){const B=c-v/2+v*(F+.5)/z+(s()-.5)*3*u,D=(13+10*s())*u,Z=4+1.5*s();U(B,f+g,B,f+g+D,Z*.8),U(B-Z*u,f+g+D,B+Z*u,f+g+D,1.6),s()<.35&&U(B-3*u,f+g+D+3*u,B+3*u,f+g+D+6*u,2.2)}};m(e+C*p*.14,r,(40+14*s())*u,(40+18*s())*u,3+(s()<.5?1:0)),m(n-C*p*.22,o,(28+8*s())*u,(30+12*s())*u,2);const i=e+C*p*(.4+.08*s()),h=r+p*(.14+.03*s());U(i,r-2,i,h,1.3);const M=p*.1,w=(s()-.5)*4*u;U(i-M*.3,h-3*u,i+M*.7,h-3*u+w,1);for(let c=0;c<9;c++){const f=i-M*.3+M*c/8,v=h-3*u+w*(c/8+.3)-3*u,g=(9+4*Math.cos(c*.7))*u;U(f,v-g,f+1.5*u,v+g*.9,.55)}U(i-M*.25,h-p*.045,i+M*.35,h-p*.045,.75),U(i,h-p*.07,i-C*p*.12,r-1,.32,.8);const y=n-C*p*.08;U(y,o-2,y,o+16*u,2.4);const A=n-C*p*.3;U(A,o-2,A,o+10*u,1.2),U(A-7*u,o+8*u,A+2*u,o+24*u,3.4),bt((c,f)=>{for(const[z,F,B]of v0)if(c>=z&&c<F&&f>B)return(to<z?c-z:F-c)<2.5*u?.55:.1;if((c-e)*C>=0)return .16+.7*Math.exp(-(r-f)/(p*.012));const g=(n-c)*C;return f>o-Math.max(0,g-p*.3)*.62+1||g>p*.3?.03:.13+.6*Math.exp(-(o-f)/(p*.01))}),Fe(),st=.9,le=st;let k=q(-.05);const R=q(1.05),I=Math.sign(R-k);for(;(R-k)*I>0;){const c=p*(.07+.12*s()),f=$+p*(.022+.03*s()),v=Math.min(k,k+I*c),g=Math.max(k,k+I*c),z=s()<.6;if(at(v,g,F=>f-(z?0:Math.min(F-v,g-F)<p*.012?p*.012-Math.min(F-v,g-F):0)),s()<.7){const F=v+(g-v)*(.2+.6*s()),B=p*(.012+.01*s());at(F-B/2,F+B/2,()=>f+p*(.012+.012*s()))}k+=I*c}bt(()=>st)}else if(oe==="Pines"){const e=(a,n,m,i)=>{const h=(s()-.5)*.16,M=.08+.25*s(),w=.08+.3*s(),y=s()<.28,A=!y&&s()<.2,k=n+m*(y?.82:1),R=c=>a+h*(c-n);if(U(R(n),n-6,R(n+m*.6),n+m*.6,2.4),U(R(n+m*.6),n+m*.6,R(k),k,1.2),y){const c=(s()<.5?-1:1)*m*(.05+.05*s());U(R(k),k,R(k)+c,k+m*(.06+.06*s()),.9)}else U(R(k),k,R(k)+(s()-.5)*3*u,k+m*.035,.7);const I=9+(s()*9|0);for(let c=0;c<I;c++){const f=(c+.35+.5*s())/I,v=A?Math.min(1,.45+f):f,g=k-m*(1-M)*f;for(let z=-1;z<=1;z+=2){if(s()<w)continue;const F=i*(.1+.9*Math.pow(v,.85))*(.5+.8*s()),B=F*(.12+.35*s()),D=R(g)+z*F,Z=g-B;U(R(g),g,D,Z,.9);const Q=3+(F/u/7|0);for(let Ct=0;Ct<Q;Ct++){const Rt=(Ct+s())/Q,Lt=R(g)+z*F*Rt,Kt=g-B*Rt*Rt,xt=(1.6+2.8*s())*(1.15-.5*Rt);U(Lt,Kt,Lt+z*(2+4*s())*u,Kt-(2+5*s())*u*(.4+Rt),xt)}U(D,Z,D+z*4*u,Z+2.5*u,.9)}}},r=.38+.14*s(),o=10+(s()*8|0);at(q(r-.04),q(1)+C*300,a=>$+p*(.035+.025*Math.sin(a*.009/u+1.7)+.012*Math.sin(a*.041/u))*Math.min(1,Math.abs(a-q(r-.04))/(p*.08)));for(let a=0;a<70;a++){const n=r+(1.04-r)*s(),m=q(n),i=(7+12*s())*u;U(m-i,$+p*.03+i*.3,m+i,$+p*.03+i*(.4+.8*s()),i)}for(let a=0;a<o;a++){const n=r+(1.04-r)*(a+.15+.7*s())/o,m=s(),i=m<.25?1:m<.6?.62:.4;e(q(n),$+p*.01,p*(.24+.18*s())*i,p*(.05+.035*s())*(.55+.45*i))}bt(()=>.04),Fe(),st=.75,le=st;for(let a=0;a<9;a++){const n=r-.2+.5*s();e(q(n),$,p*(.07+.07*s()),p*(.025+.015*s()))}at(q(r-.3),q(1)+C*300,a=>$+p*(.018+.008*Math.sin(a*.013/u))),bt(()=>st)}else if(J){Fe(),st=.55,le=st;const e=Ne(0),r=[s()*6.283,s()*6.283,s()*6.283],o=Le*(.007+.006*s()),a=m=>{const i=Math.sin(m*127.1+r[2]*31.7)*43758.5453;return i-Math.floor(i)},n=m=>{const i=Math.floor(m),h=m-i,M=h*h*(3-2*h);return a(i)*(1-M)+a(i+1)*M};at(0,N,m=>{const i=m/Le;return e+o*Math.max(.35,1+.55*Math.sin(i*4.3+r[0])+.3*Math.sin(i*13+r[1])+.5*Math.sqrt(n(i*70))+.25*n(i*190+7)-.4)}),bt(()=>st)}else if(oe==="Harbour masts"){const e=$+p*(.02+.01*s()),r=5+(s()*4|0);at(q(.3),q(1)+C*300,o=>e+1.2*Math.sin(o*.013));for(let o=0;o<r;o++){const a=.42+.62*(o+.2+.6*s())/r,n=q(a),m=p*(.05+.035*s()),i=e-p*.004,h=p*(.2+.2*s()),M=(s()-.5)*7*u,w=i+h,y=c=>n+M*(c-i)/h,A=s()<.5?1:-1;U(n,i,y(w),w,1.5),U(y(w),w,y(w),w+5*u,.6),U(y(w),w+5*u,y(w)+A*6*u,w+7*u,.45),U(y(w),w,n-A*m,i,.33,.85),U(y(w),w,n+A*m*.85,i,.33,.85);const k=h>p*.3?2:1;for(let c=1;c<=k;c++){const f=i+h*c/(k+1),v=p*(.012+.004*(k-c));U(y(f)-v,f,y(f)+v,f+u,.55),U(y(w),w,y(f)-v,f,.28,.7),U(y(w),w,y(f)+v,f,.28,.7),U(y(f)-v,f,n-v*1.3,i,.28,.7),U(y(f)+v,f,n+v*1.3,i,.28,.7)}const R=i+h*.09,I=m*(.55+.25*s());if(U(y(R),R,y(R)+A*I,R+1.5*u,1),U(y(R)+A*2*u,R+3*u,y(R)+A*I*.92,R+2.5*u,2.2),s()<.3){const c=n-A*m*.6,f=h*.55;U(c,i,c,i+f,1.1),U(c,i+f,n-A*m,i,.3,.8),U(c,i+f,y(w),w-h*.1,.3,.8)}}bt(()=>.03)}pt=Ae,_t=Pe,Dt=p0,et&&!J&&at(0,N,e=>$+p*(.012+.008*Math.sin(e*.011/u+2.1)+.004*Math.sin(e*.047/u))),bt(()=>.05);const fe=Math.min(O,Math.max(Tt+2,nt.my)),ue=new Uint8Array(N*fe*2),eo=st*255;for(let e=0,r=Math.min(fe,Tt+1)*N;e<r;e++){const o=Ae[e],a=he?he[e]:0;if(!o&&!a)continue;const n=o/255,m=a/255;ue[2*e]=(n+(1-n)*m)*255+.5,ue[2*e+1]=n*Pe[e]+(1-n)*m*eo+.5}fe>O-2&&ue.fill(0,(O-2)*N*2),nt.my=Math.min(O,Tt+2),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.bindTexture(t.TEXTURE_2D,nt.m),t.texSubImage2D(t.TEXTURE_2D,0,0,0,N,fe,t.RG,t.UNSIGNED_BYTE,ue),t.generateMipmap(t.TEXTURE_2D);const M0=Y===1?[34,26]:[20,15];t.bindFramebuffer(t.FRAMEBUFFER,nt.f),t.viewport(0,0,Ft,Ft),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.useProgram(b.P.bake),t.uniform4f(b.U.bake.uB0,0,M0[0],M0[1],Y===1?.05:.09);{const e=[Math.cos(Pt),Math.sin(Pt)],r=Y===1?8:4;t.uniform4f(b.U.bake.uB1,Math.round(r*e[0]),Math.round(r*e[1]),mt===1?.95:Y===1?.7:.5,mt===1?.85:Y===1?.35:0),t.uniform4f(b.U.bake.uB2,e[0],e[1],Ot==="Long"?.3:.55,Ot==="Long"?.6:0)}t.uniform4i(b.U.bake.uI,2,8,a0,0),t.bindVertexArray(b.vao),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush(),t.bindTexture(t.TEXTURE_2D,nt.t),t.generateMipmap(t.TEXTURE_2D);let _e=gt,De=K,ze=gt,Ie=K;const zt=[Ue,ne,Ze,Qe],j=zt.slice(),y0=zt.slice();let g0=0,Be=!0,me=[],Se=0,Ce=-1e9,U0=0,kt=1,E0=0,It=!1,de=0,pe=0,T0=0,b0=0,k0=0,lt="",R0=0;const oo=new Float32Array(92),Yt=(Y===1?.62:.5)/(S===1?Math.sqrt(yt):1),Xe=.5/.45/(S===1?Math.sqrt(yt):1),Bt=[Ut[0]/Ut[1],Ut[2]/Ut[1]],St=[Math.cos(Pt),Math.sin(Pt)],L0=ke<.5?-1:1,A0=[-St[1]*L0,St[0]*L0],xe=mt===3?[.02*(Re-.5),.02*(ke-.5)]:[0,0],P0=[Bt[0]*Yt+xe[0],Bt[1]*Yt+xe[1]],N0=(()=>{const e=Math.atan2(-.6,-Nt)+(Re-.5)*.8;return[Math.cos(e),Math.sin(e)]})(),Vt=mt===2?[A0[0],A0[1],1/.07,.62,-.02-.03*Re]:mt===4?[N0[0],N0[1],1/.05,.7,.12+.05*ke]:[0,0,0,0,0],F0=.075*Math.min(1.6,Math.max(1,13.5/Ue))*(Y===1?1.1:1),_0=mt===3?[1/(F0*F0),1]:[0,0],no=.8,Ge=-(xe[0]*St[0]+xe[1]*St[1]),We=.34,D0=We/4.2,z0=(e,r,o)=>{for(let w=0;w<4;w++)zt[w]=y0[w];let a=(Math.imul(g0+1,2654435761)^rt)>>>0;const n=()=>(a=Math.imul(a^a>>>15,739982445)+1831565813>>>0,a/4294967296);g0++;const m=j[0]>8.5?4.5+3*n():10+5*n(),i=n();j[0]=ct?11+8*n():m,j[1]=i<.65?.5+.7*n():1.6+2*n(),j[2]=Ze*(.7+.6*n()),j[3]=Qe+.3*(n()-.5),n(),n(),Be=!1,Ce=o,me.push(o),me.length>4&&me.shift();const h=V.sound,M=Math.round(86-2.2*j[0]);h.hit("noise",.16,{dur:1.8,cutoff:520}),h.note(M,{dur:2.6,vel:.22,wave:"sine",attack:.15,pan:e*2-1}),j[1]<1&&h.note(M+7,{dur:2.2,vel:.12,wave:"sine",attack:.3,at:.12})},I0=e=>{const r=c0(_e,De),o=oo;o.set([r.F[0],r.F[1],r.F[2],_],0),o.set([r.Rr[0],r.Rr[1],r.Rr[2],e],4),o.set([r.U[0],r.U[1],r.U[2],.75*2*_/$t],8),o.set([Ut[0],Ut[1],Ut[2],qt?.0047:.0045],12);const a=e+Se,n=e+.4*Se;o.set([Te*a,be*a,Te*e0*n,be*e0*n],16),o.set(zt,20),o.set([Bt[0]*Yt,Bt[1]*Yt,1/(.15*.15),ct?0:Y===2?.5:.3],24),o.set([Bt[0]*Xe,Bt[1]*Xe,1/(.3*.3),1],28),o.set([n0[0],n0[1],s0[0],s0[1]],32),o.set([Yt,Xe,V0,K0],36),o.set([S?Je*.72:Je,O0,Y0,qt?1:0],40),o.set([ct?.8:1,ct?1.6:0,ct?1:0,Math.floor(e*30)%4096],44),o.set([f0,m0,1/ce,1/u0],48),o.set([Math.cos($e),Math.sin($e),t0,400],52),o.set([Te*o0*a+.3,be*o0*a-.2*Ee*a,kt,ct?9:4],56),o.set([no,Vt[4],mt===4?.4:Y===2?0:Y===1?.3:.12,S?yt:1],60),o.set(j,64),o.set([.5*(1+.6*Math.min(1,U0/12)),S?.02:.04,0,0],88),o.set([Vt[0],Vt[1],Vt[2],Vt[3]],68),o.set([P0[0],P0[1],_0[0],_0[1]],72),o.set([St[0],St[1],Ge-We+D0*(e-Ce),1/.05],76),o.set([1/.026,mt===4?1:0,et?1.15-3*(dt-.12):0,S&&!ct?1:0],84),o.set([Ot==="Long"?2.2:0,S?0:.14+.06*t0,a0&4095,8],80),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,$t,$t),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.useProgram(J0),t.uniform4fv($0.U,o),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,nt.t),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,b.tL),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,nt.m),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,b.tN),t.bindVertexArray(b.vao),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0)};return I0(0),(e,r)=>{r=Math.min(Math.max(r||0,0),.1);const o=V.input,a=o.taps();if(!o.down&&!It&&a.length){const i=a[a.length-1];z0(i.x,i.y,e)}if(o.down&&!It&&(It=!0,de=o.x,pe=o.y,T0=ze,b0=Ie,k0=e,lt="tap",E0=0),o.down&&It){const i=Math.hypot(o.x-de,o.y-pe);lt!=="drag"&&i>.025&&(lt="drag"),lt==="tap"&&e-k0>.35&&(lt="hold"),lt==="drag"&&(ze=Math.max(r0[0],Math.min(r0[1],T0-(o.x-de)*2*_)),Ie=Math.max(i0[0],Math.min(i0[1],b0+(o.y-pe)*2*_)))}!o.down&&It&&(It=!1,lt==="tap"&&z0(de,pe,e),lt=""),lt==="hold"?(E0+=r,kt+=(3-kt)*Math.min(1,r*.9),e-R0>1.1&&(R0=e,V.sound.hit("noise",.12+.12*kt,{dur:1.4,cutoff:260+260*kt}))):kt+=(1-kt)*Math.min(1,r*.8);const n=Math.min(1,r*6);_e+=(ze-_e)*n,De+=(Ie-De)*n;let m=0;for(const i of me){const h=(e-i)/.4;h>0&&h<12&&(m+=12*h*Math.exp(1-h))}Se+=r*m,U0=m;{const i=(Ge-We+D0*(e-Ce)-Ge)/.05,h=i<-1?0:i>1?1:.5+.75*i-.25*i*i*i;for(let M=0;M<4;M++)y0[M]=zt[M]+(j[M]-zt[M])*h;if(!Be&&h>.4){Be=!0;const M=Math.round(62-1.4*j[0]);[0,4,7,j[1]<1?12:11].forEach((w,y)=>V.sound.note(M+w,{dur:3,vel:.1+(j[1]<1?.05:0),wave:"sine",attack:.4,at:y*.09}))}}I0(e)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
