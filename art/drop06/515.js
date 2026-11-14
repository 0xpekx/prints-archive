// Moon Crater: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/515.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(wt){wt&&wt.add({num:515,name:"Moon Crater",fam:"Vistas",recipe:"The edge of a crater on the Moon in hard sunlight, black sky and black shadows, with the small blue Earth low over the hills. The spot, how high the sun is and the Earth's phase change every mint, and rare ones get old rover tracks. Tap the ground to kick up dust that flies in clean arcs with no air to slow it, drag to swing the sun so the shadows and the Earth's phase turn, or hold to walk and leave your own boot prints.",interactive:"Tap the ground to throw up a puff of dust there: the grains fly in clean arcs and fall without drifting, there is no air; drag to sweep the Sun across the sky so the shadows swing and the Earth's phase turns with it (behind the Earth it is eclipsed); hold to walk toward your finger, leaving boot prints",music:!0,gl:!0,fps:30,seed:0,make(x){const t=x.gl,p=x.size,A=!!x.home,M0=p>400;let $=1365117553;for(let e=2;e<66;e+=8)$=Math.imul($^parseInt(x.hash.slice(e,e+8),16),2246822507)^$>>>13;const n=()=>{$=$+1831565813|0;let e=Math.imul($^$>>>15,1|$);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},s0=e=>{let o=0;for(const s in e)o+=e[s];let a=n()*o;for(const s in e)if(a-=e[s],a<0)return s;return Object.keys(e)[0]},t0=Math.PI*2,v=Math.PI/180,C=(e,o,a)=>Math.max(o,Math.min(a,e)),S=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,gt=S+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p*2. - 1., 0., 1.); }",Z0=`
uint hu(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float rn(uint s, uint k){ return float(hu(s + k*0x9E3779B9u) & 0xffffffu)/16777216.; }
float h21(vec2 p){ uvec2 q = uvec2(ivec2(floor(p)) + 1048576); return float(hu(q.x*1597334677u ^ hu(q.y)) & 0xffffffu)/16777216.; }
vec3 aces(vec3 x){ return clamp(x*(2.51*x + 0.03)/(x*(2.43*x + 0.59) + 0.14), 0., 1.); }
`,$t=S+"uniform sampler3D uN; uniform vec4 uB; out vec4 o;"+Z0+`
float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5*(b - a)/k, 0., 1.); return mix(b, a, h) - k*h*(1. - h); }
vec2 field(vec2 u){
  float h = 0., a = 0.; bool rock = uB.x > 0.5; int no = rock ? 2 : 6;
  for (int oc = 0; oc < 6; oc++) {
    if (oc >= no) break;
    int n = rock ? (oc == 0 ? 10 : 22) : (3 << oc);
    float fn = float(n); vec2 g = u*fn; ivec2 c0 = ivec2(floor(g));
    for (int k = 0; k < 9; k++) {
      ivec2 cc = c0 + ivec2(k - 3*(k/3) - 1, k/3 - 1), cw = cc - n*ivec2(floor(vec2(cc)/fn));
      uint s = hu(uint(cw.x) + uint(cw.y)*977u + uint(oc)*65537u + uint(uB.y)*7919u);
      if (rn(s, 0u) < (rock ? 0.62 : 0.72)) {
        vec2 cp = vec2(cc) + 0.2 + 0.6*vec2(rn(s, 1u), rn(s, 2u));
        if (rock) {
          float r = 0.12 + 0.2*rn(s, 3u), th = rn(s, 4u)*6.2832;
          vec2 q = (g - cp)/r;
          float ht = 0.3 + 0.36*rn(s, 5u), z = ht + dot(q, vec2(rn(s, 6u) - 0.5, rn(s, 7u) - 0.5)*0.45);
          for (int j = 0; j < 12; j++) {
            uint uj = uint(j); bool up = j >= 7; float an = th + (up ? float(j - 7)*1.2566 + 0.6 : float(j)*0.8976) + (rn(s, 10u + uj) - 0.5)*0.7;
            float sl = up ? 0.25 + 0.45*rn(s, 20u + uj) : 0.9 + 1.0*rn(s, 20u + uj), ex = up ? ht/sl + 0.33 + 0.35*rn(s, 30u + uj) : 0.8 + 0.4*rn(s, 30u + uj);
            z = smin(z, sl*(ex - dot(vec2(cos(an), sin(an)), q)), 0.085);
          }
          z += (textureLod(uN, vec3(q*0.05 + rn(s, 9u), rn(s, 8u)), 0.).r - 0.5)*0.14 + (textureLod(uN, vec3(q*0.16 + rn(s, 9u), rn(s, 8u) + 0.5), 0.).r - 0.5)*0.03;
          float f = 0.15*exp(min(z, 0.)*2.6), hr = -smin(-z, -f, 0.05)*r/fn;
          if (hr > h) { h = hr; a = z > f + 0.015 ? 0.55 + 0.45*rn(s, 8u) : 0.; }
        } else {
          float r = 0.25 + 0.25*rn(s, 3u), age = pow(rn(s, 4u), 0.6), d = length(g - cp)/r;
          float dep = mix(0.4, 0.07, age), rim = mix(0.08, 0.006, age), pr;
          if (d < 1.) pr = -dep + (dep + rim)*mix(d*d, d*d*(3. - 2.*d), age);
          else pr = rim/(d*d*d)*(1. - smoothstep(1.5, 2., d));
          h += pr*r/fn;
          if (age < 0.15) {
            vec2 dv = (g - cp)/max(d*r, 1e-4);
            float ry = textureLod(uN, vec3(dv*0.25, rn(s, 5u)), 0.).r;
            a += (1. - age/0.15)*(d < 1. ? 0.5 : 0.8*exp(-(d - 1.)*1.6)*smoothstep(0.42, 0.72, ry))*(1. - smoothstep(1.5, 2., d));
          }
        }
      }
    }
  }
  return vec2(h, clamp(a, 0., 1.));
}
void main(){
  vec2 u = gl_FragCoord.xy/1024., c = vec2(0.); float e = 1./1024., x1 = 0., x0 = 0., z1 = 0., z0 = 0.;
  for (int k = 0; k < 5; k++) {
    vec2 off = k == 1 ? vec2(e, 0.) : k == 2 ? vec2(-e, 0.) : k == 3 ? vec2(0., e) : k == 4 ? vec2(0., -e) : vec2(0.);
    vec2 f = field(u + off);
    if (k == 0) c = f; else if (k == 1) x1 = f.x; else if (k == 2) x0 = f.x; else if (k == 3) z1 = f.x; else z0 = f.x;
  }
  vec4 K = uB.x > 0.5 ? vec4(25., 0., 0.15, 0.) : vec4(8., 0.5, 0.25, 0.);
  o = vec4(c.x*K.x + K.y, vec2(x1 - x0, z1 - z0)/(2.*e)*K.z + 0.5, c.y);
}`,Et=`
uniform sampler3D uN; uniform sampler2D uCT, uRT, uPM, uMs;
uniform vec4 uU[24];
out vec4 o;
float gE, gI;
float n3(vec3 p){ return textureLod(uN, p, 0.).r; }
vec2 r2(vec2 p, float a){ float c = cos(a), s = sin(a); return vec2(c*p.x - s*p.y, s*p.x + c*p.y); }
float curv(vec2 q){ vec2 d = q - uU[0].xy; return dot(d, d)*2.878e-7; }
vec3 ray(vec2 fc){
  vec2 q = fc*uU[1].z*2. - 1.; float yw = uU[0].z, pt = uU[0].w, cp = cos(pt);
  vec3 fw = vec3(sin(yw)*cp, sin(pt), cos(yw)*cp), rt = vec3(cos(yw), 0., -sin(yw)), up = cross(fw, rt);
  return normalize(fw + (q.x*rt + q.y*up)*uU[1].x);
}
// terrain height (m), slope and rock mask at p, detail down to footprint fp
vec4 HT(vec2 p, float fp){
  vec4 r = vec4(0.); vec4 C = uU[6], Cp = uU[7]; gI = 0.;
  vec2 d = p - C.xy; float rr = length(d) + 1e-3, q = rr/C.z, hc, dc;
  if (q < 1.) { float pq = pow(q, Cp.z); hc = -Cp.x + (Cp.x + Cp.y)*mix(pq, q*q*(3. - 2.*q), Cp.w); dc = (Cp.x + Cp.y)*mix(Cp.z*pq/max(q, 1e-3), 6.*q*(1. - q), Cp.w); }
  else { float iq = 1./q, i3 = iq*iq*iq; hc = Cp.y*i3; dc = -3.*Cp.y*i3*iq; }
  r.x = hc*C.z; r.yz = dc*d/rr;
  float rimB = C.w*exp(-(q - 1.05)*(q - 1.05)*7.);
  if (uU[8].x > 0.) {                         // a sinuous rille
    vec2 pr = r2(p - uU[8].zw, -uU[9].x);
    float ph = pr.x/uU[9].y + uU[9].w, cx = uU[9].z*sin(ph), dcx = uU[9].z*cos(ph)/uU[9].y, nr = inversesqrt(1. + dcx*dcx);
    float s = (pr.y - cx)*nr/uU[8].y, f = 1. - abs(s);
    if (f > 0.) { float x = min(f/0.6, 1.); r.x -= uU[8].x*x*x*(3. - 2.*x);
      r.yz += uU[8].x*(6.*x*(1. - x)/0.6)*sign(s)*r2(vec2(-dcx, 1.)*nr/uU[8].y, uU[9].x); }
  }
#ifdef GB
  if (uU[10].z > 0.) {                        // the great boulder: only in the GB pair, linked for the mints that have one
    vec2 bq = (p - uU[10].xy)/uU[10].z;
    if (dot(bq, bq) < 5.) {
      float th = uU[10].w, z = 0.85 + dot(bq, vec2(0.12, -0.08)); vec2 gz = vec2(0.12, -0.08);
      for (int j = 0; j < 8; j++) { float fj = float(j), an = th + fj*0.7854 + sin(fj*7.3 + th)*0.3; vec2 dj = vec2(cos(an), sin(an));
        float sl = 1.3 + 0.9*fract(sin(fj*12.9 + th)*437.5), zj = sl*(0.92 + 0.1*sin(fj*3.1 + th) - dot(dj, bq)), hb = clamp(0.5 + 2.8*(zj - z), 0., 1.);
        z = mix(zj, z, hb) - 0.09*hb*(1. - hb); gz = mix(-sl*dj, gz, hb); }     // worn, rounded arrises
      vec4 tb = textureLod(uCT, bq*0.31 + uU[10].w, log2(max(fp*330./uU[10].z, 1.)));   // pitted by a billion years of small impacts
      vec2 sn = vec2(cos(th*3.7), sin(th*3.7)); float sd = dot(bq, sn) - 0.12*sin(th*5.1), sg = 0.32*exp(-sd*sd/0.005);   // the split
      z += (tb.r - 0.5)*0.6 - 0.08 - sg; gz += (tb.gb - 0.5)*1.86 + sg*sd/0.0025*sn;
      float f = 0.13*exp(min(z, 0.)*2.2);
      if (z > f) { r.x += z*uU[10].z; r.yz += gz; r.w = 1.; gI = 0.62; } else { r.x += f*uU[10].z; r.yz += z < 0. ? f*2.2*gz : vec2(0.); }
    }
  }
#endif
  float P = 59.9;
  for (int lq = 0; lq < 4; lq++) {             // rocks: blocks to pebbles, half buried by density fields
    int l = 3 - lq; float fl = float(l), fd = smoothstep(0.6, 1.6, P*0.02/fp)*(l < 2 ? 1. - smoothstep(0.15, 0.5, r.w) : 1.);
    if (fd > 0.) {
      float dn = l == 0 ? uU[14].x : l == 1 ? uU[14].y : l == 2 ? uU[14].z : uU[14].w;
      float nz = n3(vec3(p/(P*(l < 2 ? 28. : 90.)), fl*0.37 + 0.2)); float m = clamp(dn*(l < 2 ? 0.04 + 1.7*smoothstep(0.42, 0.7, nz) : 0.35 + 1.3*nz) + rimB*(l == 2 ? 0.45 : l == 3 ? 0.1 : 0.2), 0., 1.)*(l >= 2 ? smoothstep(3.5, 9., length(p)) : 1.);
      float a = fl*1.7 + 0.6 + uU[21].y;
      vec4 tx = textureLod(uRT, r2(p, a)/P + vec2(0.53, 0.29)*fl + uU[21].z, log2(max(fp*1024./P, 1.)));
      float hr = tx.r/25. - (1. - m)*0.034, sq = sqrt(hr*hr + 9.e-6), wv = 0.5*(1. + hr/sq)*fd;
      float hk = l >= 2 ? 1.4 : 1.15; r.x += 0.5*(hr + sq)*P*fd*hk; r.yz += r2((tx.gb - 0.5)/0.15, -a)*wv*hk;
      float rm = smoothstep(0.45, 0.6, tx.a)*wv;
      if (rm > r.w) { r.w = rm; gI = tx.a; }
    }
    P /= l == 3 ? 2.83 : 7.1;
  }
  float L = uU[12].x, eja = 0.;
  for (int l = 0; l < 6; l++) {                // craters of every size, six rotated scales of one tile
    float fl = float(l), fd = smoothstep(1., 3., L*0.006/fp);
    if (fl >= uU[12].w || fd <= 0.) break;
    float a = fl*2.39996 + uU[21].y, w = fd*uU[12].z*(l == 0 ? 0.45 : l == 1 ? 0.5 : l == 2 ? 0.4 : l == 3 ? 0.22 : l == 4 ? 0.14 : 0.1);
    vec2 uv = r2(p, a)/L + vec2(0.371, 0.613)*fl + uU[21].z; float ld = log2(max(fp*1024./L, 1.)) + max(fl - 2., 0.)*0.6;
    vec4 tx = textureLod(uCT, uv, ld);
    if (l >= 2 && r.w > 0.01) tx.rgb = mix(tx.rgb, textureLod(uCT, uv, ld + 3.).rgb, min(r.w*1.7, 1.));   // no craterlets on rock faces
    r.x += (tx.r - 0.5)*0.125*L*w; r.yz += r2((tx.gb - 0.5)*4., -a)*w; eja += tx.a*w*step(1., fl);
    L /= uU[12].y;
  }
  gE = eja;
  return r;
}
vec3 MT(vec2 p){                                // far massifs: smooth domes
  vec3 r = vec3(0.);
  for (int i = 0; i < 10; i++) {
    if (float(i) >= uU[15].w) break;
    vec4 a = texelFetch(uMs, ivec2(i, 0), 0), b = texelFetch(uMs, ivec2(i, 1), 0);
    vec2 d = r2(p - a.xy, -b.y); d.x /= b.x;
    float s2 = dot(d, d)/(a.w*a.w);
    if (s2 < 1.) { float f = 1. - s2; r.x += a.z*f*f*(3. - 2.*f); r.yz -= a.z*6.*f*(1. - f)*r2(vec2(2.*d.x/b.x, 2.*d.y)/(a.w*a.w), b.y); }
  }
  float m = clamp(r.x/600., 0., 1.);
  if (m > 0.) { for (int k = 0; k < 2; k++) { float L = k == 0 ? 7300. : 2300., a = 0.7 + float(k)*2.1;
    vec4 tx = textureLod(uCT, r2(p, a)/L + 0.17*float(k), 0.); float w = m*(k == 0 ? 1.1 : 0.7);
    r.x += (tx.r - 0.5)*0.125*L*w; r.yz += r2((tx.gb - 0.5)*4., -a)*w; } }
  return r;
}
vec4 Hall(vec2 p, float fp){ vec4 h = HT(p, fp); vec2 d = p - uU[0].xy; if (dot(d, d) > 1.0e6) h.xyz += MT(p); return h; }
`,bt=S+Et+`
vec4 pk(float v){ v = floor(clamp(v, 0., 1.)*16777215.); float a = floor(v/65536.), b = floor((v - a*65536.)/256.); return vec4(a, b, v - a*65536. - b*256., 255.)/255.; }
`+`
void main(){
  float mode = uU[1].w; vec3 ro = vec3(uU[0].x, uU[1].y, uU[0].y), rd; float fx = 0.;
  if (mode > 2.5) { ro = uU[13].xyz; rd = uU[2].xyz; } else if (mode > 1.5) rd = ray(uU[5].yz); else if (mode > 0.5) { ro.y = 6000.; rd = vec3(0., -1., 0.); fx = 0.05; } else rd = ray(gl_FragCoord.xy);
  float t = 0.03, tl = 0., a = 0., b = 0., top = ro.y + uU[21].x; int st = 0, k = 0, NI = int(uU[5].w); bool hit = false;
  for (int i = 0; i < 800; i++) {
    if (i >= NI) break;
    vec3 p = ro + rd*t;
    if (st == 0 && (t > 2.0e5 || (rd.y >= 0. && p.y > top) || (rd.y > uU[21].w && p.y > ro.y + 80.))) break;
    float dy = p.y - (Hall(p.xz, fx > 0. ? fx : t*uU[3].w*1.3).x - curv(p.xz));
    if (st == 0) {
      if (dy < 0.) { st = 1; a = tl; b = t; t = 0.5*(a + b); }
      else { tl = t; t += t < 1500. ? max(dy*0.42, 0.002 + t*0.01) : max(dy*0.5, t*clamp(uU[3].w*10., 0.004, 0.025)); }
    } else {
      if (dy < 0.) b = t; else a = t;
      t = 0.5*(a + b); k++;
      if (k > 8) { hit = true; break; }
    }
  }
  float res = hit ? t : 0.;
  o = mode > 0.5 && mode < 1.5 ? pk((ro.y - res + 2000.)/4000.) : pk(res > 0. ? log2(1. + res)/18. : 0.);
}`,J0=S+Et+Z0+`
uniform sampler2D uD;
float upk(vec4 c){ vec3 q = floor(c.xyz*255. + 0.5); return (q.x*65536. + q.y*256. + q.z)/16777215.; }
float hapke(float mu0, float mu, float al, float B0){
  float Lw = mix(1., 0.18, clamp(al/2.2, 0., 1.)), f = 2.*Lw*mu0/(mu0 + mu + 1e-4) + (1. - Lw)*mu0;
  return f*exp(-0.55*al)*(1. + B0/(1. + tan(min(al, 1.4)*0.5)/0.055));
}
// a boot print in sole coordinates (u heel to toe, v across), metres of height
float hp(vec2 uv, float a){
  float u = uv.x, v = uv.y, w = mix(0.78, 1., smoothstep(-0.7, 0.4, u));
  float s = pow(pow(abs(u), 3.5) + pow(abs(v/w), 3.), 0.29);
  float tr = smoothstep(0.18, 0.4, abs(fract(u*6.5 - abs(v)*0.55) - 0.5)), bd = smoothstep(0.78, 0.86, s);
  float d = (1. - smoothstep(0.92, 1., s))*(0.8 + 0.2*mix(tr, 1., bd));
  return (0.07*exp(-(s - 1.1)*(s - 1.1)*80.) - d)*0.025*clamp(a, 0., 1.);
}
vec3 earth(vec3 rd, out vec3 ring, out float cov){
  vec3 E = uU[4].xyz, S = uU[15].xyz; float tr = tan(uU[4].w), ce = dot(rd, E);
  vec3 ex = normalize(cross(E, vec3(0., 1., 0.))), ey = cross(ex, E);
  vec2 q = vec2(dot(rd, ex), dot(rd, ey))/(max(ce, 1e-3)*tr);
  float r = length(q), px = uU[3].w/tr;
  vec3 col = vec3(0.); ring = vec3(0.); cov = 0.;
  if (ce > 0.9 && r < 1.6) {
    cov = clamp((1. - r)/px + 0.5, 0., 1.);
    vec2 qq = q*min(1., 0.999/max(r, 1e-4)); float mu = sqrt(1. - dot(qq, qq));
    vec3 nw = qq.x*ex + qq.y*ey - mu*E;
    float mu0 = dot(nw, S);
    vec3 ne = vec3(dot(nw, uU[17].xyz), dot(nw, uU[18].xyz), dot(nw, uU[19].xyz)), sp = ne + uU[17].w;
    float lat = ne.y, al = abs(lat);
    float cn = n3(sp*0.07)*0.55 + n3(sp*0.16 + 3.1)*0.3 + n3(sp*0.36 + 7.)*0.15;
    float land = smoothstep(0.54, 0.56, cn)*(1. - smoothstep(0.9, 0.95, al));
    float arid = exp(-(al - 0.38)*(al - 0.38)/0.025)*smoothstep(0.55, 0.62, cn + n3(sp*0.5)*0.1);
    vec3 sc = mix(vec3(0.008, 0.026, 0.085), mix(vec3(0.075, 0.09, 0.045), vec3(0.42, 0.31, 0.19), clamp(arid, 0., 1.)), land);
    float ic = lat < 0. ? 0.93 : 0.96;                // the caps start at latitude 68 south and 74 north
    sc = mix(sc, vec3(0.8), smoothstep(ic - 0.015, ic + 0.02, al + (n3(sp*0.4) - 0.5)*0.05));
    vec3 w = ne + (vec3(n3(sp*0.07 + 1.), n3(sp*0.07 + 2.), n3(sp*0.07 + 3.)) - 0.5)*1.6 + uU[18].w, ws = w*vec3(1., 2.6, 1.);
    float cl = n3(ws*0.075)*0.55 + n3(ws*0.17)*0.3 + n3(w*0.42)*0.15;   // weather systems a fifth of the disc across, not speckle
    float band = 0.5 + 0.35*exp(-(al - 0.72)*(al - 0.72)/0.026) + 0.3*exp(-lat*lat/0.006) - 0.3*exp(-(al - 0.35)*(al - 0.35)/0.015) + 0.5*smoothstep(0.84, 0.95, al);
    float cld = smoothstep(0.64 - 0.25*band, 0.8 - 0.22*band, cl);
    vec3 alb = mix(sc, vec3(0.88, 0.89, 0.92)*(0.5 + 0.5*smoothstep(0.72 - 0.2*band, 0.92 - 0.2*band, cl)), cld);   // thin cloud a veil, thick cloud bright
    vec3 c = alb*smoothstep(-0.07, 0.1, mu0)*pow(max(mu0, 0.03), 0.75)*1.75;
    c += vec3(0.04, 0.09, 0.24)*smoothstep(-0.05, 0.25, mu0)*(0.3 + 0.5/(mu + 0.25))*0.2;
    c += vec3(0.22, 0.42, 1.)*pow(1. - mu, 5.)*smoothstep(0.02, 0.3, mu0)*0.35;
    c += vec3(1., 0.95, 0.85)*pow(max(dot(reflect(-S, nw), -E), 0.), 90.)*(1. - land)*(1. - cld)*step(0., mu0)*0.7;
    col = c*uU[5].x;
    // eclipsed: a thin copper thread of every sunrise and sunset at once, brightest on the side of the hidden Sun, and
    // the pearly corona spilling past the limb there
    vec2 qs = vec2(dot(S, ex), dot(S, ey)); float sd = 0.5 + 0.5*dot(q/max(r, 1e-4), qs/max(length(qs), 1e-6)), sd2 = sd*sd;
    float wd = px*(0.35 + 1.1*sd2) + 0.004, ex1 = max(r - 1., 0.);
    ring = uU[16].y*(mix(vec3(0.5, 0.06, 0.015), vec3(2.6, 1.3, 0.5), sd2*sd)*exp(-ex1/wd)*smoothstep(1. - px, 1., r)
      + vec3(0.55, 0.6, 0.7)*0.06*sd2*exp(-ex1*2.2)*step(1., r))/max(uU[20].w, 1.);
  }
  return col;
}
vec3 sky(vec3 rd){
  vec3 c = vec3(0.);
  if (uU[20].w > 30.) {                         // stars only show when the exposure is long (an eclipse)
    vec3 g = rd*420., cc = floor(g); float h = h21(cc.xy + cc.z*917.3);
    if (h > 0.992) { vec3 sp = normalize(cc + 0.5 + (vec3(h21(cc.zx + 3.1), h21(cc.yz + 7.7), h21(cc.xy + 1.3)) - 0.5)*0.7);
      float d = length(sp - rd)/uU[3].w; c += vec3(0.9, 0.93, 1.)*pow((h - 0.992)/0.008, 5.)*0.012*exp(-d*d*1.6); }
    float gm = dot(rd, normalize(vec3(cos(uU[18].w), 0.7, sin(uU[18].w)))), mw = exp(-gm*gm/0.03);     // the Milky Way, with its dust lanes
    c += vec3(0.85, 0.83, 0.8)*0.035/uU[20].w*mw*(0.25 + n3(rd*0.31 + 0.7))*(1. - 0.8*exp(-gm*gm/0.003)*smoothstep(0.35, 0.6, n3(rd*0.6 + 2.)));
  }
  float ang = acos(clamp(dot(rd, uU[15].xyz), -1., 1.));
  c += smoothstep(0.00465 + uU[3].w*0.7, 0.00465 - uU[3].w*0.7, ang)*vec3(1., 0.98, 0.95)*80.*uU[16].z;
  vec3 ring; float cov; vec3 e = earth(rd, ring, cov);
  return mix(c, e, cov) + ring;
}
void main(){
  vec2 fc = gl_FragCoord.xy;
  float tv = upk(texelFetch(uD, ivec2(fc), 0)), t = tv > 0. ? exp2(tv*18.) - 1. : 0.;
  vec3 rd = ray(fc), ro = vec3(uU[0].x, uU[1].y, uU[0].y), S = uU[2].xyz, E3 = uU[3].rgb, col;
#ifdef SKY
  if (t > 0.) discard;
  col = sky(rd);
#else
  if (t <= 0.) discard;
  else {
    vec3 p = ro + rd*t; float fp = max(t*uU[3].w, 0.0003);
    vec4 hs = vec4(0.); float sh = 1., s = 0., dy = 0., hE = 0., hI = 0.; vec3 ps = p;
    int NS = int(uU[16].w);
    for (int i = 0; i < 200; i++) {           // i = 0: the surface itself; then the march toward the Sun
      if (i > NS) break;
      vec2 q = i == 0 ? p.xz : ps.xz + S.xz*s;
      vec4 h = Hall(q, i == 0 ? fp : max(fp, s*0.005));
      float hy = h.x - curv(q);
      if (i == 0) {
        hs = h; hE = gE; hI = gI;
        vec3 n0 = normalize(vec3(-h.y, 1., -h.z));
        ps = vec3(p.x, hy, p.z) + n0*(0.006 + fp*1.5) + S*0.004; dy = ps.y - hy;
        if (S.y < -0.01) { sh = 0.; break; }
      } else {
        dy = ps.y + S.y*s - hy;
        sh = min(sh, 0.5 + 0.5*dy/(s/uU[2].w + fp*0.5));
        if (sh < 0. || ps.y + S.y*s > ro.y + uU[21].x) break;
      }
      s += max(dy*0.6, 0.0015 + s*0.11);
    }
    sh = clamp(sh, 0., 1.);
    float wd = 1. - smoothstep(0.003, 0.02, fp);
    if (wd > 0.) {
      vec3 g3 = vec3(0.);
      for (int k = 0; k < 6; k++) {
        float cs = (k < 3 ? mix(0.03, 0.014, hs.w) : mix(0.009, 0.005, hs.w))*64., e = 0.3/64.;
        vec3 qq = p/cs + vec3(k == 1 || k == 4 ? e : 0., 0., k == 2 || k == 5 ? e : 0.) + float(k/3)*0.37;
        g3[k - 3*(k/3)] += n3(qq)*(k < 3 ? 1. : 0.55);
      }
      vec3 g0 = vec3(0.);
      hs.yz += vec2(g3.y - g3.x, g3.z - g3.x)/0.3*mix(0.11, 0.17, hs.w)*wd;
    }
    vec3 n = normalize(vec3(-hs.y, 1., -hs.z));
    float dist = 0., psh = 1., cmp = 0.;
    vec2 pm = (p.xz - uU[13].xy)/uU[13].z + 0.5;
    float wP = (1. - smoothstep(0.01, 0.045, fp))*uU[13].w;
    float inM = smoothstep(0.01, 0.06, min(min(pm.x, pm.y), min(1. - pm.x, 1. - pm.y)));
    if (inM > 0.) dist = textureLod(uPM, pm, 0.).b*inM;
    if (wP > 0. && inM > 0.) {
      vec2 sd = normalize(S.xz + vec2(1e-5)); float tE = S.y/max(length(S.xz), 1e-3), h0 = 0., hx = 0., hz = 0.;
      for (int k = 0; k < 8; k++) {
        float fk = float(k - 2);
        vec2 off = k == 1 ? vec2(0.005, 0.) : k == 2 ? vec2(0., 0.005) : k > 2 ? sd*0.007*fk*fk : vec2(0.);
        vec4 m = textureLod(uPM, pm + off/uU[13].z, 0.);
        float hh = m.a > 0.03 ? hp((m.rg/m.a - 0.5)/0.3, m.a) : 0.;
        if (k == 0) h0 = hh; else if (k == 1) hx = hh; else if (k == 2) hz = hh;
        else psh = min(psh, clamp((h0 + length(off)*tE - hh)/0.0015 + 0.5, 0., 1.));
      }
      vec2 pg = vec2(hx - h0, hz - h0)/0.005*wP;
      n = normalize(vec3(-(hs.y + pg.x), 1., -(hs.z + pg.y)));
      psh = mix(1., psh, wP); cmp = smoothstep(-0.004, -0.012, h0)*wP;
    }
    vec3 alb = uU[11].rgb*(0.85 + 0.3*n3(vec3(p.xz*0.00004, 0.5)))*(1. + (n3(vec3(p.xz*0.0006, 0.3)) - 0.5)*0.4*(1. - smoothstep(4., 12., fp)))*(1. + (n3(vec3(p.xz*0.011, 0.7)) - 0.5)*0.2*(1. - smoothstep(0.2, 0.6, fp)))*(1. + (n3(vec3(p.xz*0.4, 0.1)) - 0.5)*0.12*(1. - smoothstep(0.006, 0.02, fp)));
    alb *= 1. + uU[11].w*clamp(hE, 0., 1.5)*(1. - hs.w);
    if (uU[22].x + uU[16].x > 0.) {             // one lookup draws both: a bright ray's streaks, and the orange soil's blotches
      vec2 da = vec2(cos(uU[22].y), sin(uU[22].y)), db = vec2(-da.y, da.x), rq = p.xz - uU[22].zw; rq = vec2(dot(rq, da), dot(rq, db))/vec2(22., 6.);
      float gn = n3(vec3(dot(p.xz, da)*0.00012, dot(p.xz, db)*0.0035, 0.9));
      alb *= 1. + uU[22].x*(smoothstep(0.42, 0.72, gn)*0.7 - 0.12);
      alb = mix(alb, alb*vec3(2.1, 1.3, 0.62), uU[16].x*exp(-dot(rq, rq))*smoothstep(0.3, 0.55, gn));
    }
    if (uU[20].z > 0.) {
      vec2 dq = p.xz - uU[20].xy; float dd = length(dq) - uU[20].z, tk = min(abs(dd - 0.9), abs(dd + 0.9));
      float trk = (1. - smoothstep(0.1, 0.1 + max(fp, 0.03), tk))*smoothstep(0.55, 0.75, dot(normalize(dq), -normalize(uU[20].xy - uU[0].xy)));
      alb *= 1. - 0.22*trk; cmp = max(cmp, trk);
    }
    float rk = hs.w*(1. - max(smoothstep(0.35, 0.6, dist), cmp));   // a stone under a print or in the lane is pressed into the dust
    vec3 ra = uU[11].rgb*(1.05 + 0.55*clamp((hI - 0.55)/0.45, 0., 1.))*(0.8 + 0.4*n3(vec3(p.xz*0.9, p.y*0.9 + 0.4)));
    float cla = n3(p*1.6 + 3.3)*(1. - smoothstep(0.004, 0.015, fp));
    ra *= 1. + (smoothstep(0.62, 0.7, cla)*0.3 - smoothstep(0.38, 0.3, cla)*0.45);
    alb = mix(alb, mix(ra, alb, smoothstep(0.8, 0.97, n.y)*0.7), rk);
    alb *= 1. - 0.3*dist - 0.07*cmp;
    vec3 V = -rd; n = normalize(n + V*max(0.08 - dot(n, V), 0.));   // detail slopes summed on a steep face can turn a normal from the eye: bend it back (no black specks on walls seen down-sun)
    float mu0 = max(dot(n, S), 0.), mu = max(dot(n, V), 0.03), al = acos(clamp(dot(S, V), -1., 1.));
    float br = hapke(mu0, mu, al, mix(0.6, 0.2, max(dist, cmp))*(1. - 0.5*rk));
    // near zero phase (looking down-sun) the dusty law makes a stone as flat as a decal; bare rock scatters closer
    // to Lambert, so its faces still turn from the light there
    if (al < 0.7 && rk > 0.) {
      float Lw = mix(1., 0.18, clamp(al/2.2, 0., 1.)), Lr = Lw*(1. - 0.7*rk*(1. - smoothstep(0.3, 0.7, al))), ls = 2.*mu0/(mu0 + mu + 1e-4);
      br *= (Lr*ls + (1. - Lr)*mu0)/max(Lw*ls + (1. - Lw)*mu0, 1e-5);
    }
    vec3 redd = mix(vec3(1.), vec3(1.07, 1., 0.9), al/3.1416);
    col = (alb*br*redd + rk*0.05*pow(max(dot(reflect(-S, n), V), 0.), 12.)*mu0)*E3*sh*psh;
    col += alb*E3*(0.01*uU[23].x + max(S.y, 0.)*(0.025 + 0.03*(1. - smoothstep(4., 35., t))*(1. - sh*psh)*(1. - cmp)))*(0.55 + 0.45*(1. - n.y));   // near shadows (not print floors) lit back a little by the sunlit dust round them
  }
#endif
  vec3 dc = pow(aces(col*uU[20].w), vec3(1./2.2));


  o = vec4(dc, t > 0. ? clamp(log2(1. + t)/10., 1./255., 1.) : 0.);
}`,te=S+`uniform sampler2D uS; uniform vec4 uC[3]; out vec4 o;
void main(){
  vec4 s = texelFetch(uS, ivec2(gl_FragCoord.xy), 0); vec3 c = s.rgb;
  float vis = uC[0].z;
  if (uC[1].x > 0.5 && texelFetch(uS, ivec2(clamp(uC[0].xy, vec2(0.), vec2(uC[1].y - 1.))), 0).a > 0.) vis = 0.;
  float th = length(gl_FragCoord.xy - uC[0].xy)*uC[0].w;
  float g = vis*(1.0e-6/(th*th + 1.2e-6) + 0.06*exp(-th/0.035) + 0.012*exp(-th/0.3));
  c = 1. - (1. - c)*exp(-vec3(1., 0.96, 0.9)*g*1.6);
  o = vec4(c, 1.);
}`,ee=S+"uniform sampler2D uF; out vec4 o; void main(){ o = texelFetch(uF, ivec2(gl_FragCoord.xy), 0); }",oe=S+"uniform vec4 uQ[6]; out vec4 vC; out float vT;"+Z0+`
void main(){
  uint s = hu(uint(gl_VertexID)*747796405u + uint(uQ[1].w));
  float big = step(rn(s, 6u), 0.08), az = uQ[1].x + (rn(s, 1u) + rn(s, 7u) - 1.)*0.6*uQ[1].y, el = (0.35 + 0.8*rn(s, 2u))*mix(1., 0.6, big);
  float sp = uQ[1].z*(0.25 + 0.75*sqrt(rn(s, 3u)))*(1. - 0.35*big);
  vec3 v = sp*vec3(sin(az)*cos(el), sin(el), cos(az)*cos(el));
  float tau = uQ[0].w - rn(s, 4u)*0.06, tl = 2.*v.y/1.62;
  vec3 S = uQ[4].xyz, pw = uQ[0].xyz + vec3(0., 0.015, 0.) + v*tau - vec3(0., 0.81*tau*tau, 0.);
  bool sm = uQ[5].w > 0.5;
  if (sm) pw -= S*(pw.y - uQ[0].y)/max(S.y, 0.06);     // its shadow on the ground
  vec3 rel = pw - uQ[2].xyz;
  float yw = uQ[3].x, pt = uQ[3].y, cp = cos(pt);
  vec3 fw = vec3(sin(yw)*cp, sin(pt), cos(yw)*cp), rt = vec3(cos(yw), 0., -sin(yw)), up = cross(fw, rt);
  float z = dot(rel, fw);
  bool on = tau > 0. && tau < tl && z > 0.05;
  gl_Position = on ? vec4(dot(rel, rt)/(z*uQ[3].z), dot(rel, up)/(z*uQ[3].z), 0., 1.) : vec4(9., 9., 9., 1.);
  float dd = mix(0.004 + 0.007*rn(s, 5u), 0.012 + 0.016*rn(s, 5u), big), pix = dd*uQ[3].w/(2.*z*uQ[3].z);
  gl_PointSize = clamp(pix, 1., 9.);
  vec3 V = -rel/max(length(rel), 1e-3);
  float al = acos(clamp(dot(S, V), -1., 1.)), ph = exp(-0.8*al)*(1. + 0.8/(1. + tan(min(al, 1.4)*0.5)/0.06)) + 0.9*exp(-(3.1416 - al)*1.6);
  vC = sm ? vec4(0., 0., 0., min(pix*pix, 1.)*0.5*step(S.y, 0.9)) : vec4(uQ[5].rgb*mix(0.24, 0.12, big)*ph*2., min(pix*pix, 1.)*mix(0.8, 0.95, big)); vT = length(rel);
}`,ae=S+`in vec4 vC; in float vT; uniform sampler2D uS; uniform vec4 uQ[6]; out vec4 o;
vec3 aces(vec3 x){ return clamp(x*(2.51*x + 0.03)/(x*(2.43*x + 0.59) + 0.14), 0., 1.); }
void main(){
  float da = texelFetch(uS, ivec2(gl_FragCoord.xy), 0).a, dt = da > 0. ? exp2(da*10.) - 1. : 1e9;
  vec2 pc = gl_PointCoord*2. - 1.; float m = 1. - smoothstep(0.35, 1., dot(pc, pc));
  if (vT > dt*(vC.r + vC.g > 0. ? 1.03 : 1.1) + (vC.r + vC.g > 0. ? 0.03 : 0.25) || m <= 0.) discard;
  o = vec4(pow(aces(vC.rgb*uQ[4].w), vec3(1./2.2)), vC.a*m);
}`,se=S+`layout(location = 0) in vec4 a0; layout(location = 1) in vec4 a1; uniform vec4 uM; out vec2 vU; out vec4 vK;
void main(){
  int v = gl_VertexID; vec2 e = vec2(v == 1 || v == 2 || v == 4 ? 1. : -1., v == 2 || v == 4 || v == 5 ? 1. : -1.)*1.25;
  float ca = cos(a0.z), sa = sin(a0.z);
  vec2 w = a0.xy + vec2(sa, ca)*e.x*a1.y + vec2(ca, -sa)*e.y*a1.z;
  gl_Position = vec4((w - uM.xy)/uM.z*2., 0., 1.);
  vU = vec2(e.x, e.y*a0.w); vK = vec4(a1.x, a1.w, a0.z, 0.);
}`,re=S+`uniform sampler3D uN; in vec2 vU; in vec4 vK; out vec4 o;
void main(){
  if (vK.x < 0.5) { float tl = fract(sin(vK.z*91.7 + vK.y*13.1)*437.5) - 0.5, k = clamp(vK.y*(1. + tl*0.8*vU.x), 0.3, 1.); o = vec4((vU*0.3 + 0.5)*k, 0., k); }
  else { float r = length(vU)/1.25; vec2 dv = vU/max(length(vU), 1e-4);
    float st = textureLod(uN, vec3(dv*0.3, vK.z*0.1), 0.).r;
    o = vec4(0., 0., vK.y*(smoothstep(1., 0.3, r)*(0.3 + 0.7*smoothstep(0.35, 0.65, st))*0.6 + smoothstep(0.3, 0., r)*0.5), 0.); }
}`,Mt=x.trait("Site",A?"Highland plain":s0({"Highland plain":50,"Mare and rille":34,"Polar crater rim":12})),j=Mt==="Polar crater rim",$0=Mt==="Mare and rille",ne=x.trait("Sun",j?"Grazing":A?"Low raking":s0({"Low raking":45,"Mid morning":35,"High and flat":20}));let _=x.trait("Earth",A?"Half":s0({Half:36,Crescent:26,Gibbous:22,Full:9,Eclipse:5}));const A0=x.trait("Mountains",A?"Massifs":s0(j?{"Far rims":60,Massifs:40}:{Massifs:45,"Valley walls":22,"Low hills":33})),_0=x.trait("Rocks",A?"Boulder field":s0({Scattered:48,"Boulder field":27,Sparse:17,"Great boulder":8})),tt=x.trait("Crater",A?"Fresh":s0({Fresh:34,Mature:40,Ancient:26})),ce=x.trait("Tracks",A?"Boot prints":s0({"Boot prints":82,"Rover tracks":18})),ie=t.__c515?null:t.__c515q||(t.__c515q=(()=>{const e=(t.__c515g=_0==="Great boulder")?S+`#define GB 1
`:S;t.getExtension("KHR_parallel_shader_compile");const o=(i,c)=>{const l=t.createShader(c);return t.shaderSource(l,i),t.compileShader(l),l},a=o(gt,t.VERTEX_SHADER),s={bake:[a,$t],march:[a,bt.replace(S,e)],shade:[a,J0.replace(S,e)],sky:[a,J0.replace(S,S+`#define SKY 1
`)],comp:[a,te],blit:[a,ee],dust:[oe,ae],print:[se,re]},r={};for(const i in s){const c=t.createProgram(),l=typeof s[i][0]=="string"?o(s[i][0],t.VERTEX_SHADER):s[i][0],f=o(s[i][1],t.FRAGMENT_SHADER);t.attachShader(c,l),t.attachShader(c,f),t.linkProgram(c),t.flush(),r[i]={p:c,v:l,f}}return r})());let e0=242882021;for(let e=2;e<66;e+=8)e0=Math.imul(e0^parseInt(x.hash.slice(e,e+8),16),2654435761)^e0>>>15;const F0=()=>{e0=e0+1831565813|0;let e=Math.imul(e0^e0>>>15,1|e0);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},P0=j?{"Earth over the massifs":66,"Earth to one side":34}:_==="Eclipse"?{"Earth over the massifs":56,"Earth to one side":28,"Over the crater":16}:{"Earth over the massifs":52,"Earth to one side":26,"Over the crater":14,Earthrise:8},et=x.trait("View",A?"Earth over the massifs":(()=>{let e=0;for(const a in P0)e+=P0[a];let o=F0()*e;for(const a in P0)if(o-=P0[a],o<0)return a;return"Earth over the massifs"})()),ot=F0()<.5?-1:1,at=F0(),le=F0(),q0=et==="Over the crater",z0=et==="Earthrise";z0&&_==="Crescent"&&(_=x.trait("Earth","Half"));let o0=981229333;for(let e=2;e<66;e+=8)o0=Math.imul(o0^parseInt(x.hash.slice(e,e+8),16),3266489909)^o0>>>14;const N=()=>{o0=o0+1831565813|0;let e=Math.imul(o0^o0>>>15,1|o0);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},L=[N(),N(),N(),N(),N(),N(),N(),N(),N(),N(),N(),N()],zt=(e,o)=>{let a=0;for(const r in e)a+=e[r];let s=o*a;for(const r in e)if(s-=e[r],s<0)return r;return Object.keys(e)[0]},kt=_==="Eclipse"&&L[0]>=.4;kt&&(_=x.trait("Earth","Crescent"));const N0=x.trait("Light",_==="Eclipse"?"Eclipsed":A?"Sunlit":(()=>{const e=zt({Sunlit:78,"Sun on the horizon":18,Earthlight:4},L[5]);return e==="Earthlight"&&_==="Crescent"?"Sun on the horizon":e})()),r0=x.trait("Ground",A?"Grey regolith":zt({"Grey regolith":80,"Bright ray":10,"Dark mantle":7,"Orange soil":3},L[6])),G=N0==="Sun on the horizon",C0=N0==="Earthlight";G?x.trait("Sun","On the horizon"):C0&&x.trait("Sun","Below the horizon");const X=(e,o)=>[Math.sin(e)*Math.cos(o),Math.sin(o),Math.cos(e)*Math.cos(o)],u0=(e,o)=>e[0]*o[0]+e[1]*o[1]+e[2]*o[2],n0=0,fe=-9*v,c0=Math.tan((z0?11.5:31)*v),g=n0+(A?.12:(n()-.5)*.5);let R=(j?2.4+n()*1.4:A?9.5:7+n()*6)*v,b=X(g,R);const he=et==="Earth to one side"?g-n0-ot*(.3+at*.08):z0?g-n0-ot*(.06+at*.03):0,a0=n0+he,i0=.0166,L0=.00465;let T={"Low raking":8+n()*4,"Mid morning":16+n()*9,"High and flat":34+n()*16,Grazing:4+n()*2.5}[ne]*v;A&&(T=11*v);const st=A?1:n()<.5?-1:1;let F,D0=0;const rt=()=>{const e=L[2]*t0,o=(.3+.35*L[3])*i0;T=R+o*Math.sin(e),F=g+o*Math.cos(e)/Math.cos(R)};if(_==="Eclipse")rt();else{D0=kt?(55+L[1]*23)*v:{Half:84+n()*12,Crescent:55+n()*23,Gibbous:122+n()*22,Full:166+n()*8}[_]*v,C0&&(T=-(5+L[4]*7)*v);const e=(Math.cos(D0)-Math.sin(R)*Math.sin(T))/(Math.cos(R)*Math.cos(T));F=g+st*Math.acos(C(e,-1,1))}const Ut=n()*t0,Tt=(n()-.5)*.8*1.22,Rt=n()*t0,ue=()=>{const e=[-b[0],-b[1],-b[2]],o=Math.hypot(b[2],b[0]),a=[-b[2]/o,0,b[0]/o],s=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],r=(h,w)=>[h[1]*w[2]-h[2]*w[1],h[2]*w[0]-h[0]*w[2],h[0]*w[1]-h[1]*w[0]],i=h=>{const w=Math.hypot(h[0],h[1],h[2]);return h.map(q=>q/w)},c=[0,1,2].map(h=>Math.cos(Tt)*(Math.cos(Rt)*s[h]+Math.sin(Rt)*a[h])+Math.sin(Tt)*e[h]),l=i(r(c,e)),f=r(l,c),m=Math.cos(Ut),z=Math.sin(Ut),O=[0,1,2].map(h=>m*l[h]+z*f[h]),P=r(O,c);return[O,c,P]},nt=j?380+n()*140:{Fresh:110+n()*60,Mature:140+n()*80,Ancient:180+n()*120}[tt],B0=j?[.3,.05,2,.8]:{Fresh:[.34,.07,1.9,.55],Mature:[.24,.045,2,.75],Ancient:[.13,.016,2,1]}[tt],St=j?.3:{Fresh:1,Mature:.35,Ancient:0}[tt],pe=n(),de={"Bright ray":1,"Dark mantle":.4}[r0]||1,ct=$0?[.082,.084,.088]:j?[.15,.145,.138]:[.155,.147,.136],it=ct.map((e,o)=>e*de*(r0==="Dark mantle"?[.98,1,1.04][o]:1)),Q=$0?{D:120+n()*130,W:300+n()*160,d:750+n()*350,a:-n0+(n()-.5)*.6,lam:420+n()*380,amp:120+n()*180,ph:n()*t0}:null,I0={Scattered:[.8,.55,.25,0],"Boulder field":[.9,.7,.45,.1],Sparse:[.6,.3,.08,0],"Great boulder":[.8,.55,.22,0]}[_0].map((e,o)=>r0==="Dark mantle"?e*.25:r0==="Bright ray"?Math.min(1,e*1.25+(o===2?.08:0)):e),G0=_0==="Great boulder"?(()=>{const e=a0+.4+n()*.15,o=22+n()*12;return[Math.sin(e)*o,Math.cos(e)*o,2.3+n()*1,n()*t0]})():[0,0,0,0],lt=ce==="Rover tracks"?(()=>{const e=220+n()*280,o=a0+.25+(n()-.5)*.5,a=e+45+n()*60;return[Math.sin(o)*a,Math.cos(o)*a,e]})():[0,0,0],K=new Float32Array(80);let p0=0,ft=60,ht=0;const ut=(e,o,a,s,r,i,c,l)=>{const f=Math.cos(-i),m=Math.sin(-i),z=c-e,O=l-o,P=(f*z-m*O)/r,h=m*z+f*O,w=(P*P+h*h)/(s*s);if(w>=1)return 0;const q=1-w;return a*q*q*(3-2*q)},me=j?R-.9*v:R-1.7*v,At=[[g,me]];if(_!=="Eclipse"&&N0==="Sunlit"&&A0!=="Valley walls")for(const e of[-.07,-.035,0,.035,.07])At.push([F+e,T-3*v]);const d0=(e,o,a,s,r,i)=>{if(!(p0>=10)){for(let c=0;c<80;c++){const l=Math.sin(e)*o,f=Math.cos(e)*o;let m=ut(l,f,1,s+1700,r,i,0,0)===0;for(const[z,O]of At)for(let P=1500;m&&P<9e4;P*=1.06){const h=ut(l,f,a,s,r,i,Math.sin(z)*P,Math.cos(z)*P),w=1.3*h+260*Math.min(h/600,1)-P*P/3474800-1.45;Math.atan(w/P)>O&&(m=!1)}if(m)break;o+=700}K.set([Math.sin(e)*o,Math.cos(e)*o,a,s],p0*4),K.set([r,i,0,0],40+p0*4),p0++,ft=Math.max(ft,a+60);for(let c=0;c<=1;c+=.1){const l=1-c*c,f=Math.max(o-s*Math.max(r,1)*c,1200);ht=Math.max(ht,Math.atan((a*l*l*(3-2*l)-f*f/3474800)/f))}}};if(A0==="Massifs"){{const e=g+(n()-.5)*.25,o=1100+n()*900;d0(e,13e3+n()*8e3,o,o*(3.2+n()*.6),1.5+n()*.6,-e)}for(const e of[-1,1]){const o=g+e*(.33+n()*.3),a=800+n()*900;d0(o,8e3+n()*6e3,a,a*(3.2+n()*.6),1.2+n()*.6,-o+(n()-.5)*.6)}for(let e=0;e<6;e++){const o=600+n()*1900;d0(g+1.3+e*.75+n()*.4,9e3+n()*15e3,o,o*(3.4+n()),1+n()*.8,n()*3)}}else if(A0==="Valley walls"){const e=g+(n()-.5)*.3,o=[Math.sin(e),Math.cos(e)],a=[Math.cos(e),-Math.sin(e)];for(const s of[-1,1])for(const r of[1500,8500,16500]){const i=1400+n()*900,c=i*2.2,l=c*1.1+400+n()*1200,f=r+(n()-.5)*2500,m=o[0]*f+a[0]*l*s,z=o[1]*f+a[1]*l*s;d0(Math.atan2(m,z),Math.hypot(m,z),i,c,2.2,Math.PI/2-e)}d0(e+Math.PI,9e3+n()*5e3,900+n()*600,4e3,1.5,n()*3)}else{const e=A0==="Low hills";for(let o=0;o<8;o++){const a=e?220+n()*450:300+n()*800,s=g+(o+.15+n()*.7)/8*t0;d0(s,e?5e3+n()*9e3:8e3+n()*14e3,a,a*(e?5+n()*3:4),e?1+n()*.6:3+n()*2,e?n()*3:-s+(n()-.5)*.5)}}const _t=e=>{let o=-1;for(let a=1500;a<9e4;a*=1.05){const s=Math.sin(e)*a,r=Math.cos(e)*a;let i=-a*a/3474800-1.45;for(let c=0;c<p0;c++){const l=ut(K[c*4],K[c*4+1],K[c*4+2],K[c*4+3],K[40+c*4],K[41+c*4],s,r);i+=1.3*l+260*Math.min(l/600,1)}o=Math.max(o,Math.atan(i/a))}return o},Ft=()=>{_==="Eclipse"||C0||(T=G?Math.max(_t(F),0)+(.9+1.3*L[7])*v:Math.max(T,_t(F)*1.3+3*v))};Ft();const pt=Math.sin(F-g)>=0?1:-1,V0=.42+at*.12,Pt=e=>Math.abs(Math.cos(e-F)),dt=q0?Pt(g+V0)<Pt(g-V0)?g+V0:g-V0:a0-pt*(A?1.4:1.25+pe*.35),qt=q0?1.004:1.045,Nt=[Math.sin(dt)*nt*qt,Math.cos(dt)*nt*qt],d=t.__c515||(t.__c515=(()=>{const e=ie;t.__c515q=null;const o=(h,w=e)=>{const q=w[h],Z=q.p;if(!t.getProgramParameter(Z,t.LINK_STATUS))throw new Error("515 "+h+": "+t.getShaderInfoLog(q.f)+t.getShaderInfoLog(q.v)+t.getProgramInfoLog(Z));const E0={p:Z},W0=t.getProgramParameter(Z,t.ACTIVE_UNIFORMS);for(let J=0;J<W0;J++){const b0=t.getActiveUniform(Z,J).name.replace("[0]","");E0[b0]=t.getUniformLocation(Z,b0)}t.useProgram(Z),["uN","uCT","uRT","uPM","uD","uS","uMs","uF"].forEach((J,b0)=>{E0[J]&&t.uniform1i(E0[J],b0)}),w[h]=E0},a=(h,w,q,Z,E0,W0,J,b0)=>{const Jt=t.createTexture();return t.bindTexture(t.TEXTURE_2D,Jt),t.texImage2D(t.TEXTURE_2D,0,q,h,w,0,Z,E0,b0||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,W0),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,W0===t.NEAREST?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,J),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,J),Jt},s=h=>{const w=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,w),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,h,0),w},r=64,i=new Uint8Array(r*r*r);let c=1364255139;for(let h=0;h<i.length;h++)c=Math.imul(c^c>>>15,739982445),c=Math.imul(c^c>>>12,695872825),c^=c>>>15,i[h]=c&255;const l=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,l),t.texImage3D(t.TEXTURE_3D,0,t.R8,r,r,r,0,t.RED,t.UNSIGNED_BYTE,i),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const h of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,h,t.REPEAT);const f=t.createVertexArray();t.bindVertexArray(f),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE);const m=[];o("bake"),t.useProgram(e.bake.p);for(let h=0;h<2;h++){const w=a(1024,1024,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.REPEAT),q=s(w);t.viewport(0,0,1024,1024),t.uniform4f(e.bake.uB,h,11+h*7,0,0),t.drawArrays(t.TRIANGLES,0,3),t.deleteFramebuffer(q),t.bindTexture(t.TEXTURE_2D,w),t.generateMipmap(t.TEXTURE_2D),m.push(w)}for(const h in e)h!=="bake"&&o(h);const z=a(10,2,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),O=t.createBuffer(),P=t.createVertexArray();t.bindVertexArray(P),t.bindBuffer(t.ARRAY_BUFFER,O),t.bufferData(t.ARRAY_BUFFER,600*32,t.DYNAMIC_DRAW);for(let h=0;h<2;h++)t.enableVertexAttribArray(h),t.vertexAttribPointer(h,4,t.FLOAT,!1,32,h*16),t.vertexAttribDivisor(h,1);return t.bindVertexArray(f),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindFramebuffer(t.FRAMEBUFFER,null),{P:e,ready:o,tex:a,fbo:s,tN:l,CT:m[0],RT:m[1],tMs:z,vao:f,pvao:P,pbuf:O,sz:{},slots:{big:[],small:[],n:0}}})()),D=d.P,m0=_0!=="Great boulder"||t.__c515g?D:d.G||(d.G=(()=>{const e=(s,r)=>{const i=t.createShader(r);return t.shaderSource(i,s),t.compileShader(i),i},o=e(gt,t.VERTEX_SHADER),a={};for(const[s,r]of[["march",bt],["shade",J0]]){const i=t.createProgram(),c=e(r.replace(S,S+`#define GB 1
`),t.FRAGMENT_SHADER);t.attachShader(i,o),t.attachShader(i,c),t.linkProgram(i),t.flush(),a[s]={p:i,v:o,f:c}}return d.ready("march",a),d.ready("shade",a),a})()),H0=()=>{t.bindVertexArray(d.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0)},B=(e,o,a)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(a?t.TEXTURE_3D:t.TEXTURE_2D,o)},O0=M0?1024:512,Ct=40,Lt=()=>{const e=(o,a,s)=>{const r=d.tex(o,a,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,s||t.NEAREST,t.CLAMP_TO_EDGE);return{t:r,f:d.fbo(r)}};return d.sz[p]={D:e(p,p),F:e(p,p),M:e(O0,O0,t.LINEAR),Q:e(1,1)}};let Y=d.sz[p]||Lt();const mt={},k0=d.slots[M0?"big":"small"];let M=k0.find(e=>e.key===x.hash+p);if(!M){if(k0.length<(M0?2:10)?(M={sz:p},k0.push(M)):M=k0[d.slots.n++%k0.length],M.sz!==p||!M.S){M.S&&(t.deleteTexture(M.S.t),t.deleteFramebuffer(M.S.f));const e=d.tex(p,p,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE);M.S={t:e,f:d.fbo(e)},M.sz=p}M.key=x.hash+p}M.own=mt;const xe={yaw:0,pitch:0,x:0,y:0,z:0};let xt=fe+(q0?-5*v:0);const u={yaw:a0,pitch:xt,x:0,z:0,dy:0},y={x:0,z:0,v:0,acc:0,foot:1,ph:0};let j0="",vt=0,U0=1.45,T0=0;const yt=()=>{const e=x.view||xe;u.yaw=a0+(e.yaw||0),u.pitch=C(xt+(e.pitch||0),-1.25,1.25);const o=e.x||0,a=e.z||0,s=Math.hypot(o,a),r=s>6?6/s:1;u.x=y.x+o*r,u.z=y.z+a*r,u.dy=C(e.y||0,-1,1.5);const i=u.yaw.toFixed(5)+u.pitch.toFixed(5)+u.x.toFixed(4)+u.z.toFixed(4)+u.dy.toFixed(3)+T0.toFixed(4),c=i!==j0;return j0=i,c},Dt=()=>{const e=Math.cos(u.pitch),o=[Math.sin(u.yaw)*e,Math.sin(u.pitch),Math.cos(u.yaw)*e],a=[Math.cos(u.yaw),0,-Math.sin(u.yaw)];return{fw:o,rt:a,up:[o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]]}},Bt=(e,o)=>{const{fw:a,rt:s,up:r}=Dt(),i=e*2-1,c=1-o*2,l=[0,1,2].map(m=>a[m]+(i*s[m]+c*r[m])*c0),f=Math.hypot(l[0],l[1],l[2]);return l.map(m=>m/f)},k=new Float32Array(24*4),E=(e,o,a,s,r)=>{k[e*4]=o,k[e*4+1]=a,k[e*4+2]=s,k[e*4+3]=r};if(E(6,Nt[0],Nt[1],nt,St),E(7,B0[0],B0[1],B0[2],B0[3]),Q){const e=X(n0,0);E(8,Q.D,Q.W,e[0]*Q.d,e[2]*Q.d),E(9,Q.a,Q.lam,Q.amp,Q.ph)}E(10,G0[0],G0[1],G0[2],G0[3]),E(23,G?.3:1,0,0,0),E(11,it[0],it[1],it[2],.55+.4*St+(r0==="Bright ray"?.35:0));{const e=L[8]*t0,o=16+L[9]*14,a=a0+(L[10]-.5)*.5;E(22,r0==="Bright ray"?1:0,e,Math.sin(a)*o,Math.cos(a)*o)}E(12,1400,7,$0?.8:1,6),E(14,I0[0],I0[1],I0[2],I0[3]);const It=[n()*10,n()*10],X0=()=>{const e=ue();E(4,b[0],b[1],b[2],i0),E(17,e[0][0],e[0][1],e[0][2],It[0]),E(18,e[1][0],e[1][1],e[1][2],It[1]),E(19,e[2][0],e[2][1],e[2][2],0)};X0(),E(21,ft,n()*t0,n(),Math.sin(ht+1.2*v));const ve=[1,.6,.4];let W=[0,1,0],I=[0,1,0],l0=1,R0=5,V=[1,1,1],Gt=1;const ye=(e,o,a,s)=>{const r=1+-.8200000000000001*C(a/2.2,0,1);return(2*r*e/(e+o+1e-4)+(1-r)*e)*Math.exp(-.55*a)*(1+s/(1+Math.tan(Math.min(a,1.4)*.5)/.055))},f0=()=>{I=X(F,T);const e=Math.acos(C(u0(I,b),-1,1)),o=T<-.5*v;l0=o?0:C((e-(i0-L0))/(2*L0),0,1);const a=o?0:1-l0,s=.5-.5*u0(I,b);W=o?b.slice():I,V=o?[.66,.76,.95].map(z=>z*.02*(.25+.75*s)):[0,1,2].map(z=>[1,.985,.955][z]*l0+ve[z]*a*.0035);const r=X(u.yaw+Math.PI,10*v),i=.3*V[0]+.6*V[1]+.1*V[2],c=z=>Math.max(1e-7,(ct[0]+ct[1])*.5*ye(Math.max(W[1],G&&!o?.1:.02),.17,Math.acos(C(u0(W,z),-1,1)),.6)*i),l=c(r),f=c(X(n0+Math.PI,10*v)),m=c(X(a0+Math.PI,10*v));R0=Math.min(400+600*(1-l0)*(o?0:1),.31/Math.pow(f,.85)*Math.pow(f/m,.5)*Math.pow(m/l,l>m?.9:.5)),Gt=2.6*Math.pow(C(R0/5,.25,4),.2)/R0,E(2,W[0],W[1],W[2],1/Math.tan(o?i0:L0+(i0-L0)*(1-l0))),k[12]=V[0],k[13]=V[1],k[14]=V[2],k[60]=I[0],k[61]=I[1],k[62]=I[2],E(16,r0==="Orange soil"?1:0,a,l0,M0?150:110),k[20*4+3]=R0};E(20,lt[0],lt[1],lt[2],5),f0();const x0=[],v0=[],y0=[],Vt=(e,o,a,s)=>{const r=n(),i=r<.14?.2+n()*.03:.155+n()*.02;x0.push([e,o,a,s,0,i,.075,.55+n()*.45]),x0.length>560&&x0.shift(),y0.push([e-Math.cos(a)*.1*s,o+Math.sin(a)*.1*s,a,1,1,.42,.3,.8]),y0.length>480&&y0.shift()};{const e=(q0?dt-ot*1.75:a0)+pt*(A?.36:.25+n()*.35),o=-pt*(.004+n()*.012),a=n()*6,s=c=>{const l=e+c*o+.03*Math.sin(c*.17+a);return[Math.sin(l)*c,Math.cos(l)*c]};let r=1;const i=.115+n()*.03;for(let c=34;c>.75;c-=.38+n()*.06){const l=s(c),f=s(c-.2),m=Math.atan2(f[0]-l[0],f[1]-l[1])+(n()-.5)*.14,z=i+(n()-.5)*.02;Vt(l[0]+Math.cos(m)*z*r,l[1]-Math.sin(m)*z*r,m,r),r=-r}}let h0=[0,0];const S0=new Float32Array(600*8),we=()=>{Math.hypot(u.x-h0[0],u.z-h0[1])>8&&(h0=[u.x,u.z]),t.bindFramebuffer(t.FRAMEBUFFER,Y.M.f),t.viewport(0,0,O0,O0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(D.print.p),t.uniform4f(D.print.uM,h0[0],h0[1],Ct,0),B(0,d.tN,!0),t.bindVertexArray(d.pvao),t.bindBuffer(t.ARRAY_BUFFER,d.pbuf),t.enable(t.BLEND);const e=Math.min(x0.length,600);for(let s=0;s<e;s++)S0.set(x0[x0.length-e+s],s*8);e&&(t.bufferSubData(t.ARRAY_BUFFER,0,S0,0,e*8),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.drawArraysInstanced(t.TRIANGLES,0,6,e));const o=Math.min(y0.length,480),a=Math.min(v0.length,600-o);for(let s=0;s<o;s++)S0.set(y0[y0.length-o+s],s*8);for(let s=0;s<a;s++)S0.set(v0[v0.length-a+s],(o+s)*8);o+a&&(t.bufferSubData(t.ARRAY_BUFFER,0,S0,0,(o+a)*8),t.blendFunc(t.ONE,t.ONE),t.colorMask(!1,!1,!0,!1),t.drawArraysInstanced(t.TRIANGLES,0,6,o+a)),t.bindBuffer(t.ARRAY_BUFFER,null),H0(),E(13,h0[0],h0[1],Ct,1)},Ht=()=>{E(0,u.x,u.z,u.yaw,u.pitch),E(1,c0,U0,1/p,0),k[15]=2*c0/p,E(5,Gt,0,0,760),k[15*4+3]=p0},Ot=()=>{B(0,d.tN,!0),B(1,d.CT),B(2,d.RT),B(3,Y.M.t),B(4,null),B(5,null),B(6,d.tMs),t.bindTexture(t.TEXTURE_2D,d.tMs),t.texSubImage2D(t.TEXTURE_2D,0,0,0,10,2,t.RGBA,t.FLOAT,K)},Q0=new Uint8Array(4),w0=(e,o,a)=>(H0(),Ht(),Ot(),k[7]=e,e===2&&(k[21]=o*p,k[22]=(1-a)*p),t.bindFramebuffer(t.FRAMEBUFFER,Y.Q.f),t.viewport(0,0,1,1),t.useProgram(m0.march.p),t.uniform4fv(m0.march.uU,k),t.drawArrays(t.TRIANGLES,0,3),t.readPixels(0,0,1,1,t.RGBA,t.UNSIGNED_BYTE,Q0),k[7]=0,(Q0[0]*65536+Q0[1]*256+Q0[2])/16777215),jt=()=>{vt=w0(1)*4e3-2e3,U0=vt+1.45+T0+u.dy},Xt=()=>{H0(),Ht(),we(),Ot(),t.bindFramebuffer(t.FRAMEBUFFER,Y.D.f),t.viewport(0,0,p,p),t.useProgram(m0.march.p),t.uniform4fv(m0.march.uU,k),t.drawArrays(t.TRIANGLES,0,3),B(4,Y.D.t),t.bindFramebuffer(t.FRAMEBUFFER,M.S.f),t.viewport(0,0,p,p),t.useProgram(D.sky.p),t.uniform4fv(D.sky.uU,k),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(m0.shade.p),t.uniform4fv(m0.shade.uU,k),t.drawArrays(t.TRIANGLES,0,3),t.flush()},H=[],K0=new Float32Array(24),Qt=(e,o,a,s,r,i,c)=>{H.push({x:e,y:o,z:a,az:s,spread:r,vmax:i,n:c,t:0,seed:n()*1e6|0,life:2*i*Math.sin(1.25)/1.62+.1}),H.length>8&&H.shift()};let Kt=0;const Yt=()=>{H0(),Kt++;const{fw:e,rt:o,up:a}=Dt(),s=u0(I,e);let r=-1e4,i=-1e4,c=0;s>.01&&(r=(u0(I,o)/(s*c0)*.5+.5)*p,i=(u0(I,a)/(s*c0)*.5+.5)*p,c=r>=0&&i>=0&&r<p&&i<p?1:0);const l=l0*(I[1]>-.01?1:0)*(s>-.2?1:0);if(B(5,M.S.t),t.bindFramebuffer(t.FRAMEBUFFER,Y.F.f),t.viewport(0,0,p,p),t.useProgram(D.comp.p),t.uniform4fv(D.comp.uC,[r,i,l,2*c0/p,c,p,Kt*37%1e3,0,0,0,0,0]),t.drawArrays(t.TRIANGLES,0,3),H.length){t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.useProgram(D.dust.p);for(const f of H)K0.set([f.x,f.y,f.z,f.t,f.az,f.spread,f.vmax,f.seed,u.x,U0,u.z,0,u.yaw,u.pitch,c0,p,W[0],W[1],W[2],R0,V[0],V[1],V[2],1]),t.uniform4fv(D.dust.uQ,K0),t.drawArrays(t.POINTS,0,f.n),K0[23]=0,t.uniform4fv(D.dust.uQ,K0),t.drawArrays(t.POINTS,0,f.n);t.disable(t.BLEND)}B(7,Y.F.t),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,p,p),t.useProgram(D.blit.p),t.drawArrays(t.TRIANGLES,0,3)};if(yt(),f0(),jt(),z0){const e=u.yaw,o=u.pitch;let a=-4*v,s=24*v;u.yaw=g;for(let i=0;i<12;i++){const c=.5*(a+s);u.pitch=c,w0(2,.5,.5)>0?a=c:s=c}u.yaw=e,u.pitch=o,R=a+i0*(.12+le*.4),b=X(g,R),X0(),xt=R-3.5*v;const r=(Math.cos(D0)-Math.sin(R)*Math.sin(T))/(Math.cos(R)*Math.cos(T));F=g+st*Math.acos(C(r,-1,1)),Ft(),f0(),j0=""}if(!A){const e=u.yaw,o=u.pitch,a=(s,r)=>(u.yaw=s,u.pitch=r,w0(2,.5,.5)>0);if(!z0){let s=0;for(;s<10&&a(g,R-i0);)R+=v,s++;if(s)if(b=X(g,R),X0(),_==="Eclipse")rt();else{const r=(Math.cos(D0)-Math.sin(R)*Math.sin(T))/(Math.cos(R)*Math.cos(T));F=g+st*Math.acos(C(r,-1,1))}}if(_!=="Eclipse"&&!C0)for(let s=0;s<(G?40:12)&&a(F,T+(G?.1:.6)*v);s++)T+=(G?.3:2)*v;if(u.yaw=e,u.pitch=o,f0(),_==="Eclipse"||N0!=="Earthlight"){const s=[[.5,.76],[.22,.9],[.78,.9]].map(([r,i])=>{const c=w0(2,r,i);if(!(c>0))return null;const l=Math.pow(2,c*18)-1,f=Bt(r,i);return l>60?null:[u.x+f[0]*l,U0+f[1]*l+.3,u.z+f[2]*l]}).filter(Boolean);for(let r=0;r<(G?10:6)&&s.length;r++){let i=0;for(const c of s)E(13,c[0],c[1],c[2],0),w0(3)>0&&i++;if(i*(G?3:2)<=s.length)break;_==="Eclipse"?(R+=2.5*v,b=X(g,R),X0(),rt()):T+=(G?.7:2.5)*v,f0()}}j0=""}yt(),Xt(),Yt();let ge=0,g0=!1,U=null,Wt=F;const Zt=(e,o)=>{const a=w0(2,e,o);if(!(a>0))return;const s=Math.pow(2,a*18)-1;if(s>400)return;const r=Bt(e,o),i=u.x+r[0]*s,c=U0+r[1]*s,l=u.z+r[2]*s,f=Math.atan2(r[0],r[2])+(n()-.5)*.4;Qt(i,c,l,f,1.3,2.4+n()*.6,4200),x.sound.hit("kick",.32),x.sound.hit("noise",.16,{cutoff:240,dur:.22});const m=H[H.length-1];m.mark=[i+Math.sin(f)*1,l+Math.cos(f)*1,f,1,1,1.5,1.1,.45],m.scuff=[i,l,f,1,1,.22,.18,.9]},Ee=e=>{const o=x.input,a=o.taps();if(o.down){U||(U={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,path:0,mode:0});const s=o.x-U.lx,r=o.y-U.ly;U.lx=o.x,U.ly=o.y,U.t+=e,U.path+=Math.hypot(s,r),U.mode!==2&&U.path>.012?(U.mode=1,(s||r)&&(F+=s*2.4,T=C(T-r*1.2,.3*v,72*v),f0(),g0=!0,Math.abs(F-Wt)>.12&&(Wt=F,x.sound.note(43+Math.round(T/v/6),{dur:.5,vel:.06,wave:"sine",cutoff:600})))):U.mode!==1&&U.t>.3&&(U.mode=2)}else U?(U.mode===0&&Zt(U.x0,U.y0),U=null):a.length&&Zt(a[0].x,a[0].y)};let Y0=!1;const be=e=>{const o=U&&U.mode===2;if(y.v+=((o?1.15:0)-y.v)*(1-Math.exp(-e*(o?2.5:6))),y.v<.01){y.v=0,T0&&(T0=0,Y0=!0);return}const a=u.yaw+(o?(x.input.x-.5)*.9:y.h||0)*1;o&&(y.h=(x.input.x-.5)*.9);const s=Math.sin(a),r=Math.cos(a);let i=y.x+s*y.v*e,c=y.z+r*y.v*e;const l=Math.hypot(i,c);if(l>90&&(i*=90/l,c*=90/l),y.x=i,y.z=c,y.acc+=y.v*e,y.ph+=y.v*e/.78*Math.PI,T0=.045*Math.abs(Math.sin(y.ph))*Math.min(1,y.v),y.acc>.78){y.acc-=.78,y.foot=-y.foot;const f=u.x+s*.15+Math.cos(a)*.12*y.foot,m=u.z+r*.15-Math.sin(a)*.12*y.foot;Vt(f,m,a+(n()-.5)*.1,y.foot),Qt(f+s*.3,vt,m+r*.3,a,1.1,1.7,260),x.sound.hit("kick",.16),x.sound.hit("noise",.07,{cutoff:300,dur:.14})}Y0=!0};return(e,o)=>{if(o=Math.min(Math.max(o||0,0),.1),ge+=o,d.drawN=(d.drawN||0)+1,M0)d.bigAt=d.drawN;else if(d.bigAt!==void 0&&d.drawN-d.bigAt>60){for(const a in d.sz)if(+a>400){const s=d.sz[a];for(const r of["D","F","M","Q"])t.deleteTexture(s[r].t),t.deleteFramebuffer(s[r].f);s.dead=!0,delete d.sz[a]}for(const a of d.slots.big)a.S&&(t.deleteTexture(a.S.t),t.deleteFramebuffer(a.S.f),a.S=null,a.key=null);d.bigAt=void 0}if(Y.dead&&(Y=d.sz[p]||Lt()),!M.S){const a=d.tex(p,p,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE);M.S={t:a,f:d.fbo(a)},M.sz=p,M.key=x.hash+p,M.own=null}M.own!==mt&&(M.own=mt,g0=!0),Ee(o),be(o);for(let a=H.length-1;a>=0;a--){const s=H[a];s.t+=o,s.t>s.life&&(s.mark&&(v0.push(s.mark,s.scuff),v0.length>120&&v0.splice(0,2),g0=!0),H.splice(a,1))}(yt()||Y0)&&(f0(),jt(),g0=!0,Y0=!1),g0&&(Xt(),g0=!1),Yt()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
