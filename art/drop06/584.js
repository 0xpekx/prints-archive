// Stone Heads: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/584.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(go){go&&function(){"use strict";const Bo={yaw:0,pitch:0,x:0,y:0,z:0},fn=[Bo,{yaw:3.14},{yaw:3.14},{yaw:1.57},{yaw:4.71},{pitch:.9},{pitch:-.9},{x:3,z:-3,yaw:.3},{yaw:.8},{yaw:-.8}];let ln=0;const zt=0,Co=0,Oo="",$t={},he=20,ht=[[256,192],[128,96]],de=Math.PI*2,_=Math.PI/180,Ut=-27.1*_,ma=1.3,xa=Math.tan(35*_),Dt=.1,It=2e4,ee=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,pe=`
uniform sampler2D uN;
float sq(float x) { return x * x; }
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
float nf(vec2 p) { vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float nz(vec2 p) {
  vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f);
  ivec2 c = ivec2(i) & 255, e = (c + 1) & 255;
  float a = texelFetch(uN, c, 0).r, b = texelFetch(uN, ivec2(e.x, c.y), 0).r, g = texelFetch(uN, ivec2(c.x, e.y), 0).r, h = texelFetch(uN, e, 0).r;
  return mix(mix(a, b, f.x), mix(g, h, f.x), f.y);
}
float an2(vec2 v) { vec2 n = normalize(v + 1e-6); return n.y >= 0. ? 1. - n.x : 3. + n.x; }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
`,we=`
layout(std140) uniform UB { vec4 u[48]; };
#define CAM u[0].xyz
#define TANH u[0].w
#define FWD u[1].xyz
#define PA u[1].w
#define RGT u[2].xyz
#define TIME u[2].w
#define UPV u[3].xyz
#define EXPO u[3].w
#define SUND u[4].xyz
#define LZT u[5].x
#define GAMP u[5].y
#define GSIG u[5].z
#define NFL u[5].w
#define EQ0 u[6].xyz
#define MLIM u[6].w
#define EQ1 u[7].xyz
#define SGAIN u[7].w
#define EQ2 u[8].xyz
#define MWG u[8].w
#define GL0 u[9].xyz
#define TILE u[9].w
#define GL1 u[10].xyz
#define NBRT u[10].w
#define GL2 u[11].xyz
#define NMET u[11].w
#define WIND u[12]
#define FLD u[13].xyz
#define MFLASH u[13].w
#define NS u[14]
#define AC u[15]
#define SKYUP u[16].rgb
#define GW u[16].w
#define LG u[17].xyz
#define GLI u[17].w
#define GLC u[18].rgb
#define SHEEN u[18].w
#define SURF u[19]
#define MOON u[20]
#define FL1 u[21]
#define FL2 u[22]
#define MISC u[23]
#define T0 u[24]
#define CS u[25]
#define HD1 u[26]
#define GRS u[27]
#define SPR u[28]
#define HD2 u[29]
#define VP mat4(u[30], u[31], u[32], u[33])
#define FARP u[34]
#define ALB u[35]
#define RF u[36]
#define SLP u[37].x
#define MAPS u[37].yz
#define FIN u[38]
#define MOONV u[40]
#define CLD u[41]
`,eo=`vec3 tmap(vec3 x) { x = max(x, 0.); vec3 y = (x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14); return pow(clamp(y, 0., 1.), vec3(1. / 2.2)); }
`,ut=`
#ifdef VSH
float nzw(vec2 p) { return nz(p); }
#else
float nzw(vec2 p) { return nf(p); }
#endif
float coastS(float ua) { return CS.x + CS.y * (nzw(vec2(ua * (1. / 70.), 3.1) + T0.xy) - .5) + CS.z * (nzw(vec2(ua * (1. / 17.), 7.7) + T0.zw) - .5) - CS.w * smoothstep(45., 170., ua); }
float Zs(vec2 p) {
  vec2 d = p - AC.xy;
  float s = dot(d, NS.xy), ua = dot(d, NS.zw);
  float sh = s - coastS(ua);
  float inl = max(-sh - 30., 0.);
  float z = 2.6 + 70. * (1. - exp(-inl / 1600.)) + SLP * inl * exp(-inl / 150.) + AC.w * exp(-dot(p, p) / 500.);
  z += smoothstep(30., 400., inl) * (22. * (nzw(p * (1. / 900.) + T0.yx) - .5) + 9. * (nzw(p * (1. / 240.) + T0.zw) - .5) + 2.5 * (nzw(p * (1. / 70.) + T0.wz) - .5));
  z += .7 * (nzw(p * (1. / 31.) + T0.wx) - .5) * smoothstep(4., 30., inl) + .12 * (nzw(p * (1. / 6.3) + T0.xw) - .5);
  if (sh > -30.) {
    float shelf = z - max(sh + 27., 0.) * .07 + .6 * (nzw(p * (1. / 9.) + T0.yw) - .5) * smoothstep(-26., -20., sh);
    float sea = -.9 - .022 * sh - .25 * max(sh - RF.w, 0.) + .5 * (nzw(p * (1. / 13.) + T0.yz) - .5);
    float rf = smoothstep(.5, .8, nzw(p * RF.x + T0.zx)) * smoothstep(RF.w + 10., RF.w + 60., sh) * RF.y;
    sea = mix(sea, -1.5 + 1.6 * (nzw(p * (1. / 23.) + T0.wy) - .5), rf);
    z = mix(shelf, max(sea, -45.), smoothstep(-5., 3.5, sh));
    z += smoothstep(-10., -3., sh) * smoothstep(6., 0., sh) * (1.5 * (nzw(p * (1. / 2.6) + T0.xz) - .42) + .6 * (nzw(p * (1. / 1.1) + T0.zy) - .5));
  }
  return z;
}
float H(vec2 p) { return Zs(p) - AC.z; }
// the skyline beyond the mesh, as an elevation for a horizontal direction: the crater headland and its islets off the
// south-west coast, the quarry cone and the island's shield hills inland
uniform sampler2D uHz;
float farProf(vec2 hz) { return textureLod(uHz, vec2(at2(hz.x, hz.y) * .15915494 + .5, .5), 0.).r; }
`+eo+`vec3 skyRad(vec3 d) {
  float e = max(d.y, 0.), aw = 1. - e;
  vec2 hz = normalize(d.xz + vec2(1e-7, 0.));
  float cd = dot(hz, normalize(SUND.xz + vec2(1e-7, 0.)));
  vec3 blue = vec3(.15, .29, .8) * (1. + .5 * aw * aw) * (1. + aw * .8 * smoothstep(-.3, 1., cd)) * (1. - .55 * aw * smoothstep(.3, -.9, cd) * (.5 + .5 * exp(-e / .3)));
  float x = e / GSIG;
  float az = exp(-(1. - cd) / GW);
  vec3 gc = mix(vec3(1., .3, .05), vec3(1., .5, .1), smoothstep(0., .5, x));
  gc = mix(gc, vec3(.95, .74, .26), smoothstep(.45, 1.25, x));
  gc = mix(gc, vec3(.5, .72, .5), smoothstep(1.1, 2.1, x));
  gc = mix(gc, vec3(.25, .5, .68), smoothstep(1.9, 3.2, x));
  float gm = az * exp(-x * .55);
  vec3 c = LZT * (blue * (1. - .75 * gm) + gc * GAMP * az * exp(-x * 1.15) + vec3(.5, .3, .55) * .5 * smoothstep(-.2, 1., cd) * exp(-sq((e - .35) / .25)) * smoothstep(9., 5., GAMP));
  float vr = 1. / sqrt(1. - .96 * (1. - e * e));
  c += NFL * (vec3(.42, .5, .78) * (.7 + .3 * vr) + vec3(.25, .62, .3) * MISC.y * vr * exp(-sq((e - .1) / .12)));
  return c * mix(vec3(.7, .58, .52), vec3(1.), smoothstep(0., .035, e));
}
// the sea seen at a grazing angle far out: the sky's glow in it, roughened
vec3 seaFar(vec3 d) {
  float g = max(-d.y, 0.);
  vec3 r = normalize(vec3(d.x, g + .012 + .5 * g, d.z));
  float fr = .02 + .98 * pow(1. - min(g * 2.4 + .05, 1.), 5.);
  return skyRad(r) * fr * .8 + SKYUP * .015;
}
float cmo(vec3 d) { return dot(d, MOONV.xyz); }
// a moonlit sky: a dim blue day sky, brighter low down and round the moon. The sky program draws it whole; the sea
// program takes it once, in its sky lookup, for the fog's colour and what the water mirrors (the land sees the moon
// through SKYUP and the one light; in its two programs it cost Windows 40 ms)
vec3 moonSky(vec3 d) {
  float e = max(d.y, 0.), vr = 1. / sqrt(1. - .96 * (1. - e * e)), c = cmo(d);
  return MOONV.w * (vec3(.22, .35, .8) * (.5 + .5 * vr) + vec3(.8, .78, .74) * (.1 * exp((c - 1.) * 40.) + .35 * exp((c - 1.) * 500.))) * mix(vec3(.7, .58, .52), vec3(1.), smoothstep(0., .035, e));
}
vec3 farLights(vec3 vd, float dist) {
  vec3 c = vec3(0.);
  if (FL1.w > 0. && dist > MISC.x * .97) { float x = 1. - dot(vd, FL1.xyz); c += vec3(1., .66, .34) * FL1.w * (exp(-x / (PA * PA * .5)) + .05 * exp(-x / (PA * PA * 30.))); }
  if (FL2.w > 0. && dist > 4000.) { vec3 a = FL2.xyz; float x = 1. - dot(vd, a); c += vec3(1., .72, .42) * FL2.w * (.05 * exp(-x / .0004) + .02 * exp(-x / .004)) * smoothstep(-.02, .01, vd.y - a.y + .01); }
  return c;
}
`,Go=`
vec3 rockA(vec2 p) {
  vec2 c = p * (1. / 2.2), i = floor(c);
  uint h = hu(uint(int(i.x) + 50000) * 2654435761u ^ uint(int(i.y) + 50000) * 97181u);
  float on = step(hf(h), .5) * smoothstep(24., 17., length(p)) * smoothstep(1.5, 2.5, length(p)) * smoothstep(-5., -8., dot(p - AC.xy, NS.xy));
  if (on <= 0.) return vec3(0., 9., 0.);
  vec2 v = (c - i - .5 - .4 * vec2(hf(h ^ 3u) - .5, hf(h ^ 5u) - .5)) * 2.2;
  float a = hf(h ^ 11u) * 3.1416, ca = cos(a), sa = sin(a);
  v = vec2(ca * v.x + sa * v.y, sa * v.x - ca * v.y);
  v.y *= 1.1 + .6 * hf(h ^ 13u);
  float R = .25 + .65 * hf(h ^ 7u);
  float rr = length(v) / R * (1. + .35 * (nz(v * 2.3 + float(h & 255u)) - .5));
  float ht = on * R * (.3 + .35 * hf(h ^ 17u)) * sqrt(max(1. - rr * rr, 0.)) * (1. + .2 * (nz(v * 6. + 40.) - .5));
  return vec3(ht, rr, on);
}
`;function pa(){const t=(re,A,X)=>{if(re.split(A).length!==2)throw new Error("584 MO2 "+A);return re.replace(A,X)},e=`
vec2 moUV(vec2 uv) {
  float MW = u[37].w, W2 = MW + 2., c = floor(uv.y * ${he}.), f = uv.y * ${he}. - c, cl = c - 2. * floor(c * .5);
  return vec2((cl * W2 + 1. + uv.x * MW) / (2. * W2), (floor(c * .5) + f) / ${he/2}.);
}
void main()`,c=t(t(oo,"void main()",e),"textureLod(uOC, vUV, 0.)","textureLod(uOC, moUV(vUV), 0.)"),E=t(t(ao,"void main()",e),"texture(uOC, vUV)","texture(uOC, moUV(vUV))");let G=no.split("texelFetch(uRm, ").join("fRm(");return G=t(G,"ivec2 px = ivec2(gl_FragCoord.xy);","ivec2 px = moLog(ivec2(gl_FragCoord.xy));"),G=t(G,"void main()",`
ivec2 moPhys(ivec2 L) { int MW = int(uC.y), MH = int(uC.z), c = L.y / MH; return ivec2((c & 1) * (MW + 2) + 1 + L.x, (c >> 1) * MH + L.y - c * MH); }
vec4 fRm(ivec2 L, int l) { return texelFetch(uRm, moPhys(L), l); }
ivec2 moLog(ivec2 P) { int MW = int(uC.y), MH = int(uC.z), c = P.x / (MW + 2), r = P.y / MH; return ivec2((P.x - c * (MW + 2) - 1 + MW) & (MW - 1), (r * 2 + c) * MH + P.y - r * MH); }
void main()`),{vs:c,fs:E,mo:G}}function ya(t,e,c){const E=(ce,K,Ae)=>{if(ce.split(K).length!==2)throw new Error("584 MU "+K);return ce.replace(K,Ae)},G=`vec4 moU(uvec4 t) { return vec4(unpackHalf2x16(t.x | t.y << 16), unpackHalf2x16(t.z | t.w << 16)); }
`,re=G+`vec4 moT(ivec2 p, ivec2 n) { return moU(texelFetch(uOC, ivec2(p.x - n.x * int(floor(float(p.x) / float(n.x))), clamp(p.y, 0, n.y - 1)), 0)); }
vec4 moF(vec2 uv) {
  ivec2 n = textureSize(uOC, 0); vec2 q = uv * vec2(n) - .5, fq = floor(q), f = q - fq; ivec2 i = ivec2(fq);
  return mix(mix(moT(i, n), moT(i + ivec2(1, 0), n), f.x), mix(moT(i + ivec2(0, 1), n), moT(i + ivec2(1, 1), n), f.x), f.y);
}
vec4 moF(vec2 uv, float l) { return moF(uv); }
void main()`,A=ce=>E(E(E(ce,"uniform sampler2D uOC;","uniform highp usampler2D uOC;"),"void main()",re),/textureLod\(uOC, /.test(ce)?"textureLod(uOC, ":"texture(uOC, ","moF(");t=A(t),e=A(e),c=c.split("texelFetch(uRm, ").join("fRmU("),c=E(c,"uniform sampler2D uRm;",`uniform highp usampler2D uRm;
`+G+`vec4 fRmU(ivec2 p, int l) { return moU(texelFetch(uRm, p, l)); }
`),c=E(c,"out vec4 o;","out uvec4 oU; vec4 o;");const X=c.lastIndexOf("}");return c=c.slice(0,X)+`  uint a = packHalf2x16(o.xy), b = packHalf2x16(o.zw);
  oU = uvec4(a & 0xffffu, a >> 16, b & 0xffffu, b >> 16);
}`+c.slice(X+1),{vs:t,fs:e,mo:c}}const ba=ee+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 1., 1.); }",Ea=ee+pe+`
uniform vec4 uM, uM2;   // uM: unused xy, dust, width; uM2: height, warp S, lat max, atan(pi/S)
out vec4 o;
float fbm(vec2 p, int n) { float s = 0., a = .5, w = 0.; for (int i = 0; i < n; i++) { s += a * nf(p); w += a; p = mat2(1.6, 1.2, -1.2, 1.6) * p + 13.7; a *= .5; } return s / w; }
// a photographic band: smooth disc and bulge, star clouds mottled at three scales, the dust (the Great Rift over the
// core, the lane down the southern arc, the Pipe, the Coalsack and dark flecks all through) cut out of it with ragged edges
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(uM.w, uM2.x);
  float l = uM2.y * tan((uv.x - .5) * 2. * uM2.w);
  float b = (uv.y - .5) * 2. * uM2.z;
  vec2 u = vec2(l * 8.8, b * 16.);   // the noise frame, stretched along the plane
  float F[7];
  int nk = int(uM.w * 0. + uM2.x * 0.) + 7;
  for (int k = 0; k < nk; k++) {
    float sc = k == 0 ? .55 : k == 1 ? 1.7 : k == 2 ? 5.2 : k == 3 ? .9 : k == 4 ? 2.8 : k == 5 ? 8.5 : 1.;
    vec2 of = k == 0 ? vec2(37.1, 91.3) : k == 1 ? vec2(5.3, 11.9) : k == 2 ? vec2(71.3, 3.1) : k == 3 ? vec2(113.1, 47.5) : k == 4 ? vec2(29.9, 151.7) : k == 5 ? vec2(61.2, 88.8) : vec2(51.1, 23.9);
    vec2 pp = k == 6 ? vec2(u.x * 11. - u.y * 5., u.x * 5. + u.y * 11.) : u * sc;
    F[k] = fbm(pp + of, k == 3 ? 5 : k == 5 ? 3 : k == 6 ? 2 : 4);
  }
  float c1 = clamp((F[0] - .5) * 2.6 + .5, 0., 1.), c2 = clamp((F[1] - .5) * 2.6 + .5, 0., 1.), c3 = clamp((F[2] - .5) * 2.4 + .5, 0., 1.);
  float c4 = nf(u * 19. + vec2(7.7, 19.3)), c5 = F[6], n1 = F[3], n2 = F[4], n3 = F[5];
  // brightness along the plane: the core, Scutum, Norma, Carina, Cygnus
  float A = .2 + .5 * exp(-sq(l / .45)) + .22 * exp(-sq((l - .47) / .14)) + .16 * exp(-sq((l + .52) / .16)) + .22 * exp(-sq((l + 1.27) / .13)) + .12 * exp(-sq((l - 1.3) / .22)) + .1 * exp(-sq((l + .9) / .2));
  float sg = .048 + .03 * exp(-sq(l / .5));
  float bb = b - .006 * sin(l * 2.1 + .5);
  float dc = exp(-.5 * sq(bb / sg)), dw = exp(-abs(bb) / (1.6 * sg)), disc = .6 * dc + .4 * dw;
  float bul = exp(-2.3 * pow(pow(abs(l - .01) / .19, 2.2) + pow(abs(b + .03) / .125, 2.2), 1. / 2.2));
  float M = (.3 + 1.4 * c1 * c1) * (.55 + .9 * c2 * c2) * (.7 + .6 * c3) * (.85 + .3 * c4);
  float I = (.6 * dc * M + .4 * dw * (.55 + .9 * c1) * (.8 + .4 * c2)) * A + bul * (1.9 + 1.4 * c2 * c2) * (.75 + .5 * c3) * (.85 + .3 * c4);
  // the bright star clouds: large Sagittarius, M24, Scutum
  float sgr = exp(-(sq((l - .03) / .06) + sq((b + .065) / .03)));
  I += .9 * sgr * (.5 + c2) * (.75 + .5 * c3);
  I += .45 * exp(-(sq((l - .21) / .025) + sq((b + .018) / .014))) * (.6 + .8 * c3);
  I += .45 * exp(-(sq((l - .47) / .06) + sq((b + .03) / .03))) * (.4 + c2) * (.75 + .5 * c3);
  // dust: ragged lane edges from a fine warp of latitude
  float bw = b + .01 * (n3 - .5) + .018 * (n2 - .5);
  float fil = 1. - abs(2. * n2 - 1.); fil *= fil; fil *= fil;
  float fl3 = 1. - abs(2. * n3 - 1.); fl3 = fl3 * fl3 * fl3;
  float patchy = smoothstep(.42, .6, n1 + .3 * (n2 - .5));
  // dark clouds and filaments all through the band, densest near the plane
  float tau = exp(-sq((bw - .004) / .045)) * (1.3 * smoothstep(.5, .7, n1 + .35 * (n3 - .5)) + .6 * fil + .5 * fl3 * patchy + .7 * smoothstep(.56, .74, n3 + .3 * (n2 - .5)));
  tau += .45 * exp(-sq((bw + .01) / .08)) * smoothstep(.56, .78, c5 + .25 * (n3 - .5));
  // the thin lane down the plane (Norma, Centaurus, Carina)
  tau += exp(-sq((bw - .008 * sin(l * 3.1 + 1.) + .004) / (.01 + .007 * abs(sin(l * 2.3))))) * (1.1 * patchy + .9 * fil) * (.3 + .7 * smoothstep(.1, -.3, l));
  // the Great Rift: from Cygnus to the core, lifting over the bulge's north side
  float bR = .012 + .03 * exp(-sq(l / .14)) + .008 * sin(l * 1.7), wR = .014 + .022 * exp(-sq(l / .16)) + .012 * smoothstep(.25, .9, l);
  tau += exp(-sq((bw - bR) / wR)) * smoothstep(-.12, .02, l) * (1. - smoothstep(1.55, 1.85, l)) * (2.2 * patchy + .8 * fil + .35);
  // the Pipe above the core, the Coalsack by the Cross
  tau += 1.3 * exp(-(sq((l - .055) / .045) + sq((bw - .085 + .25 * (l - .055)) / .01))) * (.4 + fil + .5 * patchy);
  tau += 2. * exp(-(sq((l + 1.03) / .05) + sq((b + .017 + .006 * (n3 - .5)) / .036))) * (.7 + .5 * n2);
  tau *= uM.z;
  // colour: warm core, cool arms, reddened at the lanes' edges
  vec3 col = mix(vec3(.74, .84, 1.), vec3(1., .87, .72), exp(-sq(l / .75)));
  col = mix(col, vec3(1., .78, .56), clamp(bul * 1.3 + .4 * sgr, 0., 1.));
  col *= 2.7 * I * exp(-tau * vec3(.8, 1., 1.22));
  // emission: Lagoon, Trifid, Eagle, Omega, Eta Carinae
  float neb = exp(-(sq((l - .105) / .011) + sq((b + .021) / .007))) + .6 * exp(-(sq((l - .122) / .007) + sq((b + .005) / .006))) + .5 * exp(-(sq((l - .297) / .009) + sq((b - .014) / .007))) + .5 * exp(-(sq((l - .263) / .01) + sq((b + .012) / .007)));
  neb += 1.4 * exp(-(sq((l + 1.264) / .012) + sq((b + .011) / .01)));
  col += vec3(1., .32, .42) * neb * .35 * (.6 + .8 * c3) * exp(-tau * .5);
  // unresolved stars: a fine grain, weaker where the texels stretch
  uvec2 ip = uvec2(gl_FragCoord.xy);
  float gr = 1. + .3 * (hf(ip.x * 1973u + ip.y * 9277u + 89u) - .5) / (1. + l * l);
  float edge = smoothstep(uM2.z, .3, abs(b));
  float dens = clamp((disc * A * M + bul * 1.5) * exp(-tau * .9), 0., 1.) * edge;
  o = vec4(sqrt(clamp(col * edge * gr * .09, 0., 1.)), dens);
}`,wa=ee+we+`
layout(location=0) in vec2 aP;
layout(location=1) in vec4 aT;   // baked once per mint (VS_BK): the height, the height above the sea, the two slopes
out vec3 vP; out vec3 vN; out float vZ;
void main() {
  vec2 p = aP;
  float e = max(.06, length(p) * .008), h = aT.x;
  vZ = aT.y;
  vN = normalize(vec3(-aT.z, 2. * e, -aT.w));
  vec2 dc = p - CAM.xz;
  vP = vec3(p.x, h - dot(dc, dc) / 1.2742e7, p.y);
  gl_Position = VP * vec4(vP, 1.);
}`,Ra=ee+`#define VSH
`+pe+we+ut+Go+`
layout(location=0) in vec2 aP;   // a ground vertex, or a stem's base before the mint's turn (one vertex layout for both)
uniform vec4 uC;
out vec4 vT;
void main() {
  bool st = uC.x > .5;
  vec2 p = aP;
  if (st) { float cr = cos(GRS.w), sr = sin(GRS.w); p = vec2(cr * aP.x - sr * aP.y, sr * aP.x + cr * aP.y); }
  float e = max(.06, length(p) * .008), h = 0., hx = 0., hz = 0., z = 0., h0 = 0., kp = 0.;
  int n5 = st ? 1 : int(u[39].y);
  for (int i = 0; i < n5; i++) {
    vec2 o = i == 0 ? vec2(0.) : i == 1 ? vec2(e, 0.) : i == 2 ? vec2(-e, 0.) : i == 3 ? vec2(0., e) : vec2(0., -e);
    float v0 = H(p + o); vec3 r = rockA(p + o); float v = max(v0, -AC.z) + r.x;
    if (i == 0) { h = v; z = v0 + AC.z; h0 = v0; kp = r.y < 1.12 ? 0. : 1.; vec2 da = p - AC.xy; float si = -dot(da, NS.xy); if (abs(dot(da, NS.zw)) < SURF.z && si > -2.8 && si < 7.4) kp = 0.; } else if (i < 3) hx += i == 1 ? v : -v; else hz += i == 3 ? v : -v;
  }
  vT = st ? vec4(h0 - .015, kp, 0., 0.) : vec4(h, z, hx, hz);
}`,Aa=ee+"out vec4 o; void main() { o = vec4(0.); }",to=pe+we+ut+Go+`
in vec3 vP; in vec3 vN; in float vZ; out vec4 o;
void main() {
  vec3 P = vP, dv = P - CAM; float dist = length(dv); vec3 vd = dv / dist;
#if LAND
  if (vZ <= -7. && dist <= 1200.) discard;
#else
  if (vZ >= 7. && dist <= 1200.) discard;
#endif
  float fp = dist * PA;
  vec2 q = P.xz, dA = q - AC.xy;
  float s = dot(dA, NS.xy), ua = dot(dA, NS.zw);
#if LAND
#if INL
  if (!(s < -5. && ua < 45.)) discard;
#else
  if (s < -5. && ua < 45.) discard;
#endif
#endif
#if INL
  float zs = 1.;
#else
  float zs = abs(vZ) < 7. ? Zs(q) : vZ;
#endif
  float fade = 1. - smoothstep(.12, 1., fp);
  vec3 col;
  float fe = dist > 1200. ? farProf(normalize(vd.xz + 1e-7)) : -1.;
  int br = vd.y < fe ? 0 : zs < 0. ? 1 : 2;
#if LAND
  if (br != 2) discard;
#else
  if (br == 2) discard;
#endif
  vec3 R = vec3(0.);
  float fres = 0., foam = 0., lk1 = 0., lk2 = 0., lk3 = 0.;
  if (br == 0) {
  } else if (br == 1) {
#if !LAND
    // the sea: swell running in to the shore, breaking where it grows shallower than its height
    float depth = -zs, cs = coastS(ua), sh = s - cs;
    float ph = TIME / SURF.x + sh / 40. + .3 * nz(vec2(ua / 90., 1.3) + T0.xy);
    float k = floor(ph), fr = ph - k, tau = fr * SURF.x;
    float A = SURF.y * 1.8 * (.5 + .5 * hf(uint(int(k) + 5000) * 747796405u));
    float brk = smoothstep(1.5 * A, 1.05 * A, depth);
    float ft = nf(vec2(ua * .31, sh * .9) + T0.zw * 3.) * .6 + nf(vec2(ua * 1.1 + 3., sh * 2.7 - fr * 3.)) * .4;
    ft = mix(.5, ft, fade);
    foam = brk * (exp(-tau / .7) * 1.4 + .6 * exp(-tau / 4.)) * smoothstep(.32, .72, ft + .3 * exp(-tau / 1.2));
    foam += .3 * smoothstep(5., 1.5, depth) * smoothstep(.56, .8, ft);
    foam += smoothstep(.4, .05, depth) * (.55 + .45 * sin(TIME * .7 + ua * .23));
    foam = clamp(foam, 0., 1.);
    float sw = A * 3.1416 / 40. * sin(6.2832 * ph) * (1. - brk) * fade;
    vec2 ch = vec2(nf(q * .6 + TIME * vec2(.31, .17)) - .5, nf(q * .6 + 9. - TIME * vec2(.17, .29)) - .5) * .5 * fade + vec2(nf(q * .13 + 4.) - .5, nf(q * .13 + 21.) - .5) * .12;
    vec3 N = normalize(vec3(NS.x * sw + ch.x, 1., NS.y * sw + ch.y));
    R = reflect(vd, N); R.y = abs(R.y) + .004;
    fres = .02 + .98 * pow(1. - max(dot(-vd, N), 0.), 5.);
#endif
  } else {
#if LAND
    vec3 N = normalize(vN);
    float big = nf(q / 70. + 3.7), mid = nf(q / 11. + 9.1);
    float fine = mix(.5, nf(q / .45 + 1.3), 1. - smoothstep(.05, .3, fp));
    float vfine = mix(.5, nf(q / .085 + 5.2), 1. - smoothstep(.012, .05, fp));
    // the lava shelf and shore are bare black rock; steep ground too
    float lav = max(smoothstep(.45, .7, (s - 7.) / 12. + .5 * mid + .2 * big), smoothstep(.8, .6, N.y));
    lav = max(lav, smoothstep(1.6, .4, zs) * step(0., s));
    vec2 gq = vec2(nf(q / .3 + 11.) - .5, nf(q / .3 + 37.) - .5) * (1. - smoothstep(.02, .12, fp));
    vec2 rq = vec2(nf(q * .9 + 5.) - .5, nf(q * .9 + 15.) - .5) * 1.3 + vec2(nf(q * 3.1) - .5, nf(q * 3.1 + 7.) - .5) * .6 * fade;
    N = normalize(N + vec3(gq.x, 0., gq.y) * .5 * (1. - lav) + vec3(rq.x, 0., rq.y) * lav);
    float green = smoothstep(.38, .72, big * .65 + mid * .35);
    float bare = smoothstep(.55, .75, nf(q / 3.1 + 17.) * .7 + mid * .3);
    vec3 alb = mix(ALB.rgb, ALB.rgb * vec3(.62, .82, .6), green * ALB.w);
    alb *= (.6 + .6 * fine) * (1. + .9 * (vfine - .5)) * mix(1., .55 + .9 * nf(q / .17 + 3.), 1. - smoothstep(.02, .08, fp));
    alb = mix(alb, vec3(.09, .08, .065) * (.7 + .6 * fine), bare * .6);
    vec3 rock = vec3(.05, .047, .044) * (.6 + .8 * nf(q * 1.7 + 2.)) * (.8 + .4 * fine);
    float wet = smoothstep(1.2, .2, zs) * step(0., s);
    rock *= 1. - .45 * wet;
    alb = mix(alb, rock, lav);
    float r0 = length(q - CAM.xz);
    float nearW = (1. - smoothstep(8., 14.5, r0)) * (1. - lav);
    vec3 soil = vec3(.11, .095, .08) * (.65 + .7 * vfine);
    alb = mix(alb, mix(soil, ALB.rgb * .6, .35 + .5 * (fine - .5)), nearW * .8);
    // the dark bases of some tussocks, pale dead thatch in drifts
    float rkE = 0., rkO = 1.;
    if (dist < 18. && lav < .9) {
      vec2 tc = q / .55, tci = floor(tc);
      uint th = hu(uint(int(tci.x) + 90000) * 7919u ^ uint(int(tci.y) + 90000) * 6151u);
      float tr = length(tc - tci - .5 - .6 * vec2(hf(th) - .5, hf(th ^ 3u) - .5)) / (.2 + .25 * hf(th ^ 5u));
      float tf = (1. - smoothstep(.02, .06, fp)) * (1. - lav);
      float tb = step(hf(th ^ 9u), .55) * (1. - smoothstep(.2, 1., tr)) * (.12 + .25 * hf(th ^ 11u));
      float tt = smoothstep(.45, .75, nf(q / 1.3 + 51.)) * (.2 + .3 * vfine);
      alb *= mix(1., (1. - tb) * (1. + tt), tf);
    }
    // the lava outcrops: pitted black basalt, grey lichen on their tops, shade at their foot
#if INL
    if (dist < 26.) {
      float ee = max(fp * 1.2, .015);
      vec3 rk = vec3(0.), rh = vec3(0.);
      int n3 = int(u[39].y) - 2;
      for (int i = 0; i < n3; i++) {
        vec3 r = rockA(q + (i == 1 ? vec2(ee, 0.) : i == 2 ? vec2(0., ee) : vec2(0.)));
        if (i == 0) { rk = r; rh.x = r.x; if (r.z <= 0. || r.y >= 1.) break; } else if (i == 1) rh.y = r.x; else rh.z = r.x;
      }
      if (rk.z > 0. && rk.y < 1.) {
        vec3 rn = normalize(vec3(-(rh.y - rh.x) / ee, 1., -(rh.z - rh.x) / ee));
        float pf = 1. - smoothstep(.01, .05, fp);
        vec2 pit = vec2(nf(q / .06 + 3.) - .5, nf(q / .06 + 17.) - .5) * pf;
        N = normalize(rn + vec3(pit.x, 0., pit.y) * .9 + vec3(rq.x, 0., rq.y) * .25);
        alb = vec3(.06, .056, .052) * (.7 + .6 * mix(.5, nf(q / .11 + 9.), pf));
        alb = mix(alb, vec3(.2, .21, .17), smoothstep(.5, .72, nf(q / .23 + 31.)) * mix(.45, smoothstep(.4, .65, nf(q / .045 + 7.)), pf) * smoothstep(.2, .8, rn.y) * .85);
        rkE = 1.;
      } else if (rk.z > 0.) rkO = mix(.7, 1., smoothstep(1., 1.45, rk.y));
    }
#endif
    float occ = (.7 + .3 * fine) * rkO;
    vec3 E = SKYUP * (.55 + .45 * N.y) * occ + GLC * GLI * max(dot(N, LG), 0.) + MFLASH * vec3(.75, .9, 1.) * max(dot(N, FLD), 0.);
    col = alb * E;
    float fs = pow(max(dot(vd, LG), 0.), 5.), graz = 1. - smoothstep(.0, .35, -vd.y);
    float wv = 1. + WIND.z * 1.4 * (nf((q - WIND.xy * WIND.w) / 7.) - .5) + WIND.z * .5 * (nf((q - WIND.xy * WIND.w * 1.3) / 2.1 + 5.) - .5);
    col += GLC * GLI * SHEEN * fs * graz * (.45 + .9 * fine) * wv * (1. - nearW * .7) * (1. - lav) * (1. - rkE);
    lk1 = .015 + .1 * wet; lk2 = lav; lk3 = smoothstep(-.3, .4, reflect(vd, N).y);
#endif
  }
  // the sky's light: the fog's colour, and on the sea the sky reflected
  vec3 fogc = vec3(0.), sr = vec3(0.);
  int nr = br == 1 ? 2 : 1;
  for (int i = 0; i < nr; i++) {
    vec3 rd = i == 0 ? normalize(vec3(vd.x, .012, vd.z)) : R, r = skyRad(rd);
#if !LAND
    r += moonSky(rd);   // the moonlit sky: the far sea mirrors it at a grazing angle (Fresnel near 1), so it carries the horizon's tone
#endif
    if (i == 0) fogc = r * .55; else sr = r;
  }
#if !LAND
  if (br == 0) {
    // the foot of the far skyline (the headland's cliffs) where the mesh shows only sea
    col = (fogc * .8 + SKYUP * .4 * vec3(.8, .9, 1.)) * .22;
  } else {
    col = sr * fres * .5 + SKYUP * .01 * vec3(.3, .6, .7);
    col = mix(col, fogc * 1.1 + SKYUP * .015, smoothstep(900., 5000., dist) * .7);
    vec3 fc = SKYUP * 1.8 + GLC * GLI * .9 + MFLASH * vec3(.75, .9, 1.) * .3;
    col = mix(col, fc * .8, foam * mix(.55, 1., fade));
  }
#else
  col += fogc * 1.6 * lk1 * lk2 * lk3;
#endif
  col = mix(col, fogc, 1. - exp(-dist / MISC.z));
  o = vec4(tmap(col * EXPO + farLights(vd, dist)), 1.);
}`,Ta=ee+`#define LAND 1
#define INL 0
`+to,Ma=ee+`#define LAND 1
#define INL 1
`+to,Fa=ee+`#define LAND 0
#define INL 0
`+to,Pa=ee+pe+we+ut+`
uniform sampler2D uMW, uD;
out vec4 o;
vec3 starL(vec3 q, float N, float prob, float m0, float m1, uint salt, float mlim, float dens) {
  vec3 a = abs(q);
  float m = max(a.x, max(a.y, a.z));
  bool bx = a.x >= m, by = !bx && a.y >= m;
  vec2 uv = (bx ? q.zy : by ? q.xz : q.xy) / m;
  uint face = (bx ? 0u : by ? 2u : 4u) + ((bx ? q.x : by ? q.y : q.z) > 0. ? 0u : 1u);
  vec2 g = (uv * .5 + .5) * N, ci = floor(g);
  uint h = hu(uint(ci.x) * 73856093u ^ uint(ci.y) * 19349663u ^ face * 83492791u ^ salt);
  float on = step(hf(h), prob * (1. + dens));
  uint h2 = hu(h ^ 0x9e3779b9u);
  vec4 r = vec4(uvec4(h2, h2 >> 8u, h2 >> 16u, h2 >> 24u) & 255u) / 255.;
  vec2 sp = ci + .2 + .6 * r.xy;
  float ang = length(g - sp) * (2. / N) / (1. + .5 * dot(uv, uv));
  float mg = m1 + .8686 * log(max(r.z, .004));
  on *= step(m0, mg);
  float b = SGAIN * exp2(-1.063 * (mg - 1.)) * clamp((mlim - mg) * .8 + .5, 0., 1.);
  float sg = PA * (TILE > 0. ? .55 : .62);
  vec3 sc = r.w < .12 ? vec3(.75, .86, 1.15) : r.w < .55 ? vec3(1., .98, .95) : r.w < .85 ? vec3(1.06, .95, .82) : vec3(1.15, .84, .62);
  return on * sc * b * exp(-ang * ang / (2. * sg * sg));
}
// the Magellanic Clouds and 47 Tucanae, in galactic coordinates
vec3 mcs(vec3 g) {
  vec3 c = vec3(0.);
  vec3 L = vec3(.1526, -.8257, -.543), S = vec3(.3877, -.6016, -.6984), T = vec3(.4155, -.5739, -.7058);
  if (dot(g, L) > .97) {
    vec3 e1 = normalize(cross(L, vec3(0., 0., 1.))), e2 = cross(L, e1);
    vec2 u = vec2(dot(g, e1), dot(g, e2)), r = vec2(.82 * u.x + .57 * u.y, -.57 * u.x + .82 * u.y);
    float cl = nf(u * 150. + 3.), cl2 = nf(u * 430. + 7.);
    float I = .8 * exp(-(sq(r.x / .036) + sq(r.y / .011))) * (.6 + .7 * cl) + .42 * exp(-(sq(u.x / .07) + sq(u.y / .062))) * (.35 + cl * cl * 1.3);
    c += vec3(.86, .9, 1.) * I * (.65 + .6 * cl2);
    c += vec3(1., .42, .52) * .55 * exp(-(sq(u.x - .026) + sq(u.y + .02)) / .00003);
  }
  if (dot(g, S) > .985) {
    vec3 e1 = normalize(cross(S, vec3(0., 0., 1.))), e2 = cross(S, e1);
    vec2 u = vec2(dot(g, e1), dot(g, e2)), r = vec2(.6 * u.x - .8 * u.y, .8 * u.x + .6 * u.y);
    float cl = nf(u * 190. + 11.);
    c += vec3(.88, .92, 1.) * .55 * exp(-(sq(r.x / .03) + sq(r.y / .014))) * (.55 + .8 * cl);
    float x = max(2. * (1. - dot(g, T)), 0.);
    c += vec3(1., .95, .85) * .5 * exp(-x / .000012);
  }
  return c;
}
void main() {
  vec2 nd = gl_FragCoord.xy * PA / TANH - 1.;
  vec3 d = normalize(FWD + (RGT * nd.x + UPV * nd.y) * TANH);
  vec2 hz = normalize(d.xz + vec2(1e-7, 0.));
  // the skyline beyond the mesh (headland, islets, the quarry cone, the shield hills) and the sea out to the horizon
  float fe = farProf(hz);
  float cm = smoothstep(fe + PA * .6, fe - PA * .6, d.y), cs = smoothstep(PA * .6, -PA * .6, d.y + .0016), cov0 = max(cm, cs);
  vec3 sk = vec3(0.), hcol = vec3(0.);
  int nr = cov0 > 0. ? 2 : 1;
  for (int i = 0; i < nr; i++) { vec3 r = skyRad(i == 0 ? d : vec3(d.x, .012, d.z)); if (i == 0) sk = r; else hcol = r; }
  if (MOONV.w > 0.) { sk += moonSky(d); hcol += moonSky(vec3(d.x, .012, d.z)); }
  float lum = dot(sk, vec3(.25, .65, .1));
  vec3 col = sk * EXPO;
  if (cs > 0.) col = mix(col, (hcol * .6 + SKYUP * .015) * EXPO, cs);
  if (cm > 0.) col = mix(col, (hcol * .45 + SKYUP * .55 * vec3(.8, .9, 1.)) * (.14 + .14 * smoothstep(.03, .005, fe)) * EXPO, cm);
  float cov = max(cm, cs), ca = 0.;
  // broken trade-wind cumulus on a layer about a kilometre and a half up, drifting: dark against the band and the
  // stars, warm underneath toward the last glow, silver at the edges near the moon
  if (CLD.x > 0. && d.y > 0.) {
    vec2 cp = d.xz / (d.y + .07) * 1.3 + CLD.zw * TIME + CLD.y;
    float n = nf(cp * 1.1) * .6 + nf(cp * 2.9 + 17.) * .28 + nf(cp * 7.3 + 5.) * .12;
    ca = smoothstep(1.02 - CLD.x * .62, 1.12 - CLD.x * .5, n) * smoothstep(.0, .05, d.y) * (1. - cov);
    vec3 cc = sk * .8 + (GLC * GLI * (.2 + .8 * sq(max(dot(normalize(d.xz), normalize(LG.xz)), 0.))) + SKYUP * .04) * .45 * (1.25 - n);
    cc += MOONV.w * vec3(.85, .88, .95) * 6. * exp((cmo(d) - 1.) * 30.) * (1. - smoothstep(.05, .5, ca));
    col = mix(col, cc * EXPO, ca);
  }
  vec3 cel = vec3(0.);
  if (d.y > -.01 && cov < 1.) {
    float lr = max(lum / NFL, 1.);
    float mlim = MLIM - 1.2 * log(lr) * .4343;
    vec3 q = vec3(dot(d, EQ0), dot(d, EQ1), dot(d, EQ2));
    vec3 g = vec3(dot(d, GL0), dot(d, GL1), dot(d, GL2));
    float lat = asin(clamp(g.z, -1., 1.));
    vec4 mw = vec4(0.);
    if (abs(lat) < .42) { mw = textureLod(uMW, vec2(atan(at2(g.y, g.x)) / 2.5252 + .5, lat / .84 + .5), max(log2(PA / 1.4e-3), 0.)); mw.rgb *= mw.rgb * 2.2222; }
    cel += (mw.rgb + mcs(g) * RF.z) * MWG / (1. + lr / 10.);
    vec3 st = vec3(0.);
    int nl = int(MISC.w);
    for (int i = 0; i < nl; i++) {
      float N = i == 0 ? 40. : i == 1 ? 100. : 230.;
      st += starL(q, N, i == 2 ? .22 : .3, i == 0 ? 3. : i == 1 ? 5.5 : 7., i == 0 ? 5.5 : i == 1 ? 7. : 8.5, uint(i) * 977u + 11u, mlim, mw.a * (i == 0 ? 0. : i == 1 ? 1.5 : 4.));
    }
    int nb = int(NBRT);
    for (int i = 0; i < nb; i++) {
      vec4 a = texelFetch(uD, ivec2(i, 0), 0);
      float x = 1. - dot(q, a.xyz);
      if (x < .0004) {
        vec4 b = texelFetch(uD, ivec2(i, 1), 0);
        float sg = PA * (TILE > 0. ? .58 : .62 + .09 * max(2. - a.w, 0.));
        float br = SGAIN * exp2(-1.063 * (a.w - 1.)) * clamp((mlim - a.w) * .8 + .5, 0., 1.);
        st += b.rgb * br * (exp(-x / (sg * sg)) + .025 * exp(-sqrt(2. * x) / (sg * 3.)));
      }
    }
    float e = max(d.y, 0.);
    cel += st * (1. + .3 * pow(1. - e, 8.) * sin(TIME * 11. + dot(q, vec3(4e3, 7e3, 3e3))));
    int nm = int(NMET);
    for (int i = 0; i < nm; i++) {
      vec4 A = texelFetch(uD, ivec2(i, 2), 0), B = texelFetch(uD, ivec2(i, 3), 0), C = texelFetch(uD, ivec2(i, 4), 0);
      float tau = (TIME - A.w) / C.y;
      if (tau > 0. && tau < 4.) {
        float off = dot(d, cross(A.xyz, B.xyz));
        float al = at2(dot(d, B.xyz), dot(d, A.xyz));
        float L = B.w, hd = L * min(tau, 1.);
        float sg = PA * (.7 + .4 * C.x);
        float lin = exp(-off * off / (2. * sg * sg));
        float I = C.x * pow(max(sin(3.1416 * min(tau, 1.)), 0.), .6) * step(tau, 1.);
        float tr = smoothstep(hd - L * .45, hd, al) * step(al, hd + PA * 2.) * step(-.05, al);
        float head = exp(-sq(al - hd) / (8. * sg * sg));
        vec3 mc = (vec3(1., .8, .52) * tr + vec3(.72, 1., .8) * head * 2.2) * I * lin;
        float tw = .0007 + .0009 * max(tau - 1., 0.);
        mc += vec3(.55, .9, .65) * C.x * .07 * exp(-max(tau - 1., 0.) * 1.5) * step(1., tau) * smoothstep(L * .1, L * .5, al) * step(al, L) * exp(-off * off / (2. * tw * tw));
        cel += mc;
      }
    }
    // the moon's disc (a waning one, a day or two past full)
    if (MOONV.w > 0.) { float a = sqrt(max(2. * (1. - cmo(d)), 0.)); cel += vec3(1., .96, .9) * 3. * smoothstep(.0047 + PA * .5, .0047 - PA * .5, a) * (.8 + .25 * nf(vec2(dot(d, RGT), dot(d, UPV)) * 900.)); }
    cel *= exp(-.09 / (e + .03) * vec3(.6, .85, 1.3)) * smoothstep(-.003, .012, d.y);
    col += cel * (1. - cov) * (1. - ca);
  }
  o = vec4(tmap(col + farLights(d, 1e9)), 1.);
}`,Sa=ee+pe+we+eo+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aI;
layout(location=2) in vec4 aO;
layout(location=3) in vec2 aY;   // the stem's base height and whether it grows (not through a rock), baked per mint (VS_BK)
out vec4 vC;
vec2 arcP(float th0, float K, float L, float s) {
  float k = abs(K) < 1e-3 ? 1e-3 : K, a1 = th0 + k * s;
  return L * vec2(cos(th0) - cos(a1), sin(a1) - sin(th0)) / k;
}
void main() {
  float cr = cos(GRS.w), sr = sin(GRS.w);
  vec2 b = vec2(cr * aI.x - sr * aI.y, sr * aI.x + cr * aI.y);
  vec2 ld = vec2(cr * aO.x - sr * aO.y, sr * aO.x + cr * aO.y);
  float sd = aI.w, tr = aO.z, rr = aO.w, s = aV.x;
  float kind = tr < GRS.x ? 1. : tr < GRS.y ? 0. : 2.;
  bool culm = kind == 1. && rr < .42 && length(b - CAM.xz) > 1.4;
  float L = aI.z * GRS.z * (kind == 1. ? (culm ? 2.1 : 1.5) : kind == 2. ? .55 : 1.);
  if (culm) ld = ld * .35 + normalize(ld + 1e-4) * .08;
  float by = aY.x, kp = aY.y;
  L *= kp;
  vec2 wp = b - WIND.xy * WIND.w;
  float g1 = nf(wp * (1. / 5.5) + 3.), g2 = nf(wp * (1. / 1.7) + 9.);
  float flex = kind == 2. ? .3 : culm ? 1.25 : .8;
  float wb = (WIND.z * (.12 + 1.15 * smoothstep(.35, .8, g1) + .35 * (g2 - .5)) + (.03 + .07 * WIND.z) * sin(TIME * (1.6 + 2. * fract(sd * 13.)) + sd * 40.)) * flex;
  vec2 B = ld + WIND.xy * wb;
  float th0 = min(length(B), 1.35); vec2 dh = B / max(length(B), 1e-4);
  float K = kind == 1. ? (culm ? .18 + .3 * fract(sd * 11.) : .5 + .7 * fract(sd * 7.)) : kind == 2. ? .6 : .7 + 1.1 * fract(sd * 7.);
  vec2 a; float ang, fc = .55;
  if (culm) {
    vec2 c1 = arcP(th0, K, L * fc, min(s / fc, 1.));
    float thA = th0 + K, Ka = .45 + .8 * fract(sd * 3.3) + .4 * wb;
    a = c1 + arcP(thA, Ka, L * (1. - fc), max(s - fc, 0.) / (1. - fc));
    ang = s < fc ? th0 + K * s / fc : thA + Ka * (s - fc) / (1. - fc);
  } else { a = arcP(th0, K, L, s); ang = th0 + K * s; }
  vec3 P = vec3(b.x + dh.x * a.x, by + a.y, b.y + dh.y * a.x);
  vec3 tg = normalize(vec3(dh.x * sin(ang), cos(ang), dh.y * sin(ang)));
  vec3 te = CAM - P; float dist = length(te); vec3 V = te / dist;
  vec3 Wd = normalize(cross(tg, V) + 1e-5);
  bool awn = culm && s > fc;
  float w0 = awn ? .0036 * sin(3.1416 * min((s - fc) / (1. - fc) * .9 + .1, 1.)) + .0003 : culm ? .0011 : kind == 2. ? .005 * (1. - s * .6) : .0015 * (1. - pow(s, 1.5)) + .0002;
  float wd = max(w0, dist * PA * .85);
  P += Wd * aV.y * wd * .5;
  gl_Position = VP * vec4(P, 1.);
  vec3 N = normalize(cross(Wd, tg)); N = dot(N, V) < 0. ? -N : N;
  float r1 = fract(sd * 5.7);
  vec3 alb = kind == 2. ? vec3(.3, .32, .26) : kind == 1. ? vec3(.3, .32, .23) : vec3(.26, .29, .2);
  alb = mix(alb, vec3(.5, .46, .34), smoothstep(.35, 1., s) * (kind == 2. ? 0. : .8));
  if (!culm && fract(rr * 7.3) < .28) alb = vec3(.46, .41, .3);
  if (culm) alb = awn ? vec3(.6, .6, .55) : vec3(.36, .33, .24);
  alb *= .75 + .5 * r1;
  float fs = pow(max(dot(-V, LG), 0.), 4.);
  float trn = awn ? 1.8 : kind == 2. ? .5 : culm ? 1.2 : 1.;
  float occ = .3 + .7 * smoothstep(0., .55, s * (aI.z * GRS.z / .3));
  vec3 E = (SKYUP * (.65 + .6 * max(N.y, 0.)) + GLC * GLI * (max(dot(N, LG), 0.) * .7 + fs * trn)) * occ;
  vec3 col = alb * (E + MFLASH * vec3(.75, .9, 1.) * .5);
  vC = vec4(tmap(col * EXPO), clamp(w0 / wd, 0., 1.) * (awn ? .6 : 1.) * (L > .003 ? 1. : 0.));
}`,Na=ee+"in vec4 vC; out vec4 o; void main() { o = vC; }",qo=`
vec3 rotI(vec3 p, vec4 B) {
  float cp = cos(B.z), sp = sin(B.z), cr = cos(B.y), sr = sin(B.y), cy = cos(B.x), sy = sin(B.x);
  p.yz = vec2(cp * p.y - sp * p.z, sp * p.y + cp * p.z);
  p.xy = vec2(cr * p.x - sr * p.y, sr * p.x + cr * p.y);
  return vec3(p.x * sy + p.z * cy, p.y, p.x * cy - p.z * sy);
}
vec3 nrmM(vec4 m, float th) {
  vec3 er = vec3(sin(th), 0., cos(th)), et = vec3(er.z, 0., -er.x);
  return m.r * er - m.g * et - vec3(0., m.r * m.b, 0.);
}
`,oo=ee+pe+we+qo+`
layout(location=0) in vec2 aQ;
layout(location=1) in vec4 aA;   // kind (0 a statue or topknot, 1 the ahu), map cell, height in metres, seed
layout(location=2) in vec4 aB;   // yaw, lean sideways, lean forward (a fallen one lies on its face), how warm its stone is
layout(location=3) in vec4 aC;   // where it stands
layout(location=4) in vec4 aD;   // lichen, red scoria, -, the ahu's half length
layout(location=5) in vec4 aE;   // lift along its own axis, the stretch of its map that is drawn (a broken one is two pieces), tone
uniform sampler2D uOC;
out vec3 vW; out vec3 vN; out vec3 vL; out vec2 vUV; out float vK; out float vS;
flat out vec4 vA; flat out vec4 vB; flat out vec4 vD; flat out vec4 vE;
void main() {
  vec3 pl, nl; vK = 0.; vS = 0.;
  if (aA.x < .5) {
    // the first and last rings close the piece with a flat end (the break of a broken one, the foot of a fallen one)
    float t = mix(aE.y, aE.z, clamp(aQ.y * 1.0588235 - .0294118, 0., 1.)), y = t < .5 ? t * 1.2 : .6 + (t - .5) * .8, th = aQ.x * 6.2831853;
    vUV = vec2(aQ.x, (aA.y + t + (.5 - t) * MAPS.x) * MAPS.y);
    vec4 m = textureLod(uOC, vUV, 0.);
    vK = aQ.y <= 0. || aQ.y >= 1. ? 1. : 0.;
    float r = m.r * (1. - vK);
    nl = nrmM(m, th);
    // a quarry head sits in its own bank of soil and rubble, heaped a little up the stone
    float gy = aD.z > 0. ? aD.z + .05 - y - aE.x : 0.;
    if (gy > 0.) { r += min(gy, .12) * 2.4; vS = 1.; nl = normalize(vec3(sin(th), 2.4, cos(th))); }
    pl = vec3(sin(th) * r, y + aE.x, cos(th) * r) * aA.z;
  } else {
    float x = (aQ.y * 2. - 1.) * aD.w, k = smoothstep(0., 1., (aD.w - abs(x)) / 5.), s = aQ.x;
    vec2 P = s < .5 ? mix(vec2(9., -.4), vec2(2.7, 1.5), s * 2.) : s < .625 ? mix(vec2(2.7, 1.5), vec2(2.35, 2.18), (s - .5) * 8.) : s < .875 ? mix(vec2(2.35, 2.18), vec2(-2.3, 2.18), (s - .625) * 4.) : mix(vec2(-2.3, 2.18), vec2(-2.75, -3.), (s - .875) * 8.);
    float lump = (nf(vec2(x, P.x) * .31 + 5.) - .5) * (s < .5 ? .3 : .08);
    pl = vec3(x, -.4 + (P.y + .4 + lump) * k, P.x);
    nl = s < .5 ? vec3(0., .957, .29) : s < .625 ? vec3(0., .46, .89) : s < .875 ? vec3(0., 1., 0.) : vec3(0., .08, -1.);
    vUV = vec2(s, x);
  }
  vL = pl;
  vW = aC.xyz + rotI(pl, aB);
  vN = rotI(nl, aB);
  vA = aA; vB = aB; vD = aD; vE = aE;
  gl_Position = VP * vec4(vW, 1.);
}`,ao=ee+pe+we+eo+qo+`
in vec3 vW; in vec3 vN; in vec3 vL; in vec2 vUV; in float vK; in float vS;
flat in vec4 vA; flat in vec4 vB; flat in vec4 vD; flat in vec4 vE;
uniform sampler2D uOC; uniform sampler2D uCb;
out vec4 o;
void main() {
  vec3 V = CAM - vW; float dist = length(V); V /= dist;
  float ndv = dot(normalize(vN), V);
  if (gl_FrontFacing == (vA.x > .5)) discard;
  // the outline: coverage from how fast the surface turns away within a pixel, only where its facets stand edge-on
  vec3 gn = normalize(cross(dFdx(vW), dFdy(vW)));
  float gv = dot(gn, V), ng = abs(gv);
  float al = max(clamp(ndv / max(fwidth(ndv), 1e-5), 0., 1.), smoothstep(.02, .12, ng)), FP = PA * dist, ao;
  vec3 N, alb;
  if (vA.x < .5) {
    vec4 m = texture(uOC, vUV);
    float th = vUV.x * 6.2831853;
    bool end = vK > 1e-4;
    N = end ? (gv < 0. ? -gn : gn) : vS > .5 ? normalize(vN) : normalize(rotI(nrmM(m, th), vB));
    ao = mix(min(m.a, 1.), 1., vS);
    // weathered lapilli tuff, in metres round the stone and up it: grit, a broad drift, rain stains down the planes,
    // pale lichen crusts crowding what faces the sky, a rusty one here and there; red scoria for a topknot; a rare
    // statue has its eyes set in, white coral (the map marks them)
    vec2 p2 = end ? vL.xz * 1.3 + vA.w : vec2((fract(vUV.x + .5) - .5) * 1.07 * vA.z + vA.w, vL.y);
    float g1 = mix(.5, nf(p2 * 38.), 1. - smoothstep(.22, .6, 38. * FP)), g2 = mix(.5, nf(p2 * 9. + 9.), 1. - smoothstep(.22, .6, 9. * FP));
    float g3 = nf(p2 * 2.1 + 3.), up = smoothstep(-.2, .6, N.y);
    if (end) N = normalize(N + (vec3(g2, g3, g1) - .5) * .7);
    alb = vec3(.142, .126, .108) * mix(vec3(.9, .96, 1.06), vec3(1.2, 1.02, .76), vB.w) * vE.w * (.5 + .22 * g1 + .34 * g2 + .62 * g3);
    alb *= 1. - .28 * smoothstep(.5, .8, nf(vec2(p2.x * 5., p2.y * .3 + 7.))) * (1. - abs(N.y));
    float lk = nf(p2 * 1.9 + 21.) * .62 + nf(p2 * 6.3 + 5.) * .38;
    float lt = .62 - .16 * up - .05 * vD.x;
    alb = mix(alb, vec3(.23, .24, .2), smoothstep(lt, lt + .14, lk) * min((.3 + .5 * up) * vD.x, .6));
    alb = mix(alb, vec3(.2, .12, .07), smoothstep(.72, .8, nf(p2 * 2.9 + 40.)) * .25);
    alb = mix(alb, vec3(.15, .07, .048) * (.55 + .5 * g2 + .25 * g1 + .35 * g3), vD.y);
    alb = mix(alb, vec3(.44, .43, .39), clamp(m.a - 1., 0., 1.));
    alb *= mix(.75, 1., smoothstep(0., .18 * vA.z, vL.y));
    alb = mix(alb, vec3(.06, .062, .045) * (.45 + .5 * g2 + .45 * g1), vS);
  } else {
    // the ahu: sea-rounded boulders on the ramp and the platform, fitted basalt in the faces
    float s = vUV.x; bool pav = s < .5 || (s > .625 && s < .875);
    vec4 cb = texture(uCb, pav ? vec2(vUV.y, vL.z) * .3 : vec2(vUV.y * .17, vL.y * .5));
    vec3 nb = normalize(vN), tx = vec3(sin(vB.x), 0., cos(vB.x)), tz = normalize(cross(tx, nb));
    vec2 d = cb.rg * 2. - 1.;
    N = normalize(nb + (tx * d.x + tz * d.y) * 1.4);
    ao = cb.b;
    alb = (pav ? vec3(.105, .1, .092) : vec3(.07, .068, .066)) * (.5 + cb.a) * (.75 + .5 * nf(vec2(vUV.y, vL.z) * .7));
  }
  // the last warm light from the west on what is turned to it (the glow is a wide band of sky, so it wraps a little),
  // the cool dome from above falling off with occlusion: sockets and the creases under brow, nose, lips and chin stay dark
  float wl = max(dot(N, LG) + .2, 0.) / 1.2;
  vec3 E = SKYUP * (.08 + .8 * sq(N.y * .5 + .5)) * ao * ao + GLC * GLI * 2.2 * wl * ao;
  E += vec3(.06, .055, .045) * SKYUP * max(-N.y, 0.);
  vec3 col = alb * E;
  float rim = pow(1. - max(dot(N, V), 0.), 3.);
  col += (SKYUP * .02 + GLC * GLI * .15 * pow(max(dot(-V, LG) * .5 + .5, 0.), 4.)) * rim * ao;
  o = vec4(tmap(col * EXPO), al);
}`,no=ee+pe+`
uniform sampler2D uP; uniform sampler2D uRm; uniform vec4 uC;   // pass, cell width, cell height, occlusion steps
out vec4 o;
float gs(float x) { return exp(-x * x); }
float ss(float a, float b, float x) { return smoothstep(a, b, x); }
float yOf(int j) { float t = float(j) / (uC.z - 1.); return t < .5 ? t * 1.2 : .6 + (t - .5) * .8; }
// noise round the stone with no seam: two flat lookups, each used where its own axis runs across the surface
float nr(float s, float c, float y, float f, float sd) {
  return mix(nf(vec2(s * .16 * f + (c > 0. ? sd : sd + 71.), y * f + sd)), nf(vec2(c * .16 * f + (s > 0. ? sd + 23. : sd + 47.), y * f + sd * 1.7)), s * s);
}
void main() {
  ivec2 px = ivec2(gl_FragCoord.xy); int MH = int(uC.z), MW = int(uC.y), cell = px.y / MH, j = px.y - cell * MH;
  if (uC.x < .5) {
    vec4 P0 = texelFetch(uP, ivec2(0, cell), 0), P1 = texelFetch(uP, ivec2(1, cell), 0), P2 = texelFetch(uP, ivec2(2, cell), 0), P3 = texelFetch(uP, ivec2(3, cell), 0);
    vec4 P4 = texelFetch(uP, ivec2(4, cell), 0), P5 = texelFetch(uP, ivec2(5, cell), 0), P6 = texelFetch(uP, ivec2(6, cell), 0), P7 = texelFetch(uP, ivec2(7, cell), 0);
    float th = (float(px.x) + .5) / uC.y * 6.2831853, y = yOf(j), s = sin(th), c = cos(th), sd = P0.z, er = P0.w, r, mark = 0.;
    if (P0.x < .5) {
      // v runs up the head, 0 at the neck and 1 at the crown; every feature of the face sits at its own level
      float yN = P0.y, hh = 1. - yN, v = (y - yN) / hh, fa = hh / .38, sf = 1. + .7 * er, q = P0.x * 4.;
      // the trunk: straight or tapering, a belly low down, the chest drawing back to the neck; square shoulders
      float a = mix(P1.x, P1.y, clamp(y / (yN - .05), 0., 1.)), f = P1.z * (1. + P6.w * gs((y - .3 * yN) / (.3 * yN))) * (1. - .2 * ss(.45 * yN, yN, y)), b = P1.w;
      float ks = clamp((y - yN + .085) / .085, 0., 1.), up = .5 * ks * ks + .5 - .5 * sqrt(1. - ks * ks);
      // the head: jaw, cheeks, temples; the face plane leaning back to the crown; the flat back
      float aH = P2.x * mix(P2.w, 1., ss(.0, .3, v)) * (1. - .06 * ss(.6, 1., v));
      float fH = P2.y * (.74 + .26 * ss(.02, .15, v)) * (1. - mix(.09, .2, q) * ss(mix(.78, P3.y, q), 1., v)), bH = P2.z * (.86 + .14 * ss(0., .3, v)) * (1. - .08 * ss(.7, 1., v));
      float nk = P7.w * gs((y - yN) / .03);
      a = mix(a, aH, up) * (1. - .03 * nk); f = mix(f, fH, ss(yN - .04, yN + .01, y)) * (1. - .1 * nk); b = mix(b, bH, up) * (1. - .06 * nk);
      float ct = max(y - 1. + P7.x, 0.) / P7.x, cap = sqrt(max(1. - ct * ct, 0.));
      float n = P7.y, sa = abs(s) / a, ca = abs(c) / (c > 0. ? f : b);
      r = pow(pow(sa, n) + pow(ca, n), -1. / n);
      float ax = abs(r * s), z = r * c, W = P2.x, axn = ax / W;
      if (c > .2) {
        float h = 0., h2 = 0.;
        if (v > .02) {
          // the brow: a ridge right across, the forehead above it; under it the sockets (a carved one a deep oval, an
          // uncarved one a long shallow plane) that die out into the cheeks
          float vB = P3.y, bw = ss(vB - .012 * sf, vB + .02 * sf, v);
          // (the quarry's heads, never finished: a straight heavy shelf across the face only, the forehead above it
          // sloping back to a flat crown; not a brim round the head)
          h += P3.x * (mix(.45, .22, q) * bw + mix(.55, .95, q) * gs((v - vB - .035) / (.04 * sf))) * (1. - .8 * ss(.88, .99, v)) * (1. - ss(mix(.8, .58, q), mix(1.02, .8, q), axn));
          h -= P3.z * gs((axn - .52) / P3.w) * (1. - bw) * (1. - ss(.03, .15 * sf, vB - v));
          // the nose: narrow at the bridge, long, proud at the tip, cut off underneath; the wings of the nostrils
          float vNb = P4.y, tn = clamp((vB + .03 - v) / (vB + .03 - vNb), 0., 1.), wn = W * (.12 + (P4.z - .12) * tn * sqrt(tn)), cs = 1. - sq(ax / wn);
          if (cs > 0.) h = max(h, (.01 + P4.x * pow(tn, P4.w)) * pow(cs, .6) * ss(vNb - .006 * sf, vNb + .016 * sf, v) * (1. - ss(vB + .01, vB + .06, v)));
          h += .3 * P4.x * gs((ax - W * P4.z * .9) / (W * .12)) * gs((v - vNb - .035) / .03);
          // thin lips on a slight muzzle, the line between them, the chin and the jaw under it
          float vm = v - P5.y, mw = 1. - ss(P5.w * .6, P5.w, axn);
          h += P5.x * (.6 * ss(-.08, -.035, vm) * (1. - ss(.04, .075, vm)) + gs((vm - .022) / (.015 * sf)) + gs((vm + .022) / (.015 * sf)) - .5 * gs(vm / .008)) * mw;
          h += P5.z * ss(.03, .1, v) * (1. - ss(P5.y - .09, P5.y - .03, v)) * (1. - .5 * ss(.3, .9, axn));
          // eyes set in: white coral, a dark pupil
          if (P7.z > .5) { float e2 = sq((axn - .52) / .3) + sq((v - vB + .06) / .034); mark = e2 < .09 ? -1. : e2 < 1. ? 1. : 0.; h += .5 * P3.z * (1. - ss(.7, 1.3, e2)); }
        } else if (y > .11 * yN / .62 && y < .2 * yN / .62) {
          // forearms turned in across the belly, long fingers nearly meeting
          float yb = y * .62 / yN;
          h2 = P6.z * (.011 - .004 * max(0., sin((yb - .127) * 387.)) * (ax < .11 ? 1. : 0.)) * ss(.12, .135, yb) * (1. - ss(.18, .195, yb)) * ss(.02, .035, ax);
        }
        // the groove between the arm and the chest
        h2 -= P6.z * .006 * gs((ax - .8 * a) / .012) * ss(.2 * yN, .3 * yN, y) * (1. - ss(yN - .17, yN - .1, y));
        r += (h * fa * (1. - .3 * min(er, 1.)) + h2) * ss(.2, .45, c);
      }
      if (abs(s) > .5) {
        // a long ear lying flat to the head; below, the arm held to the side
        float ez = (z + .01 * fa) / (.046 * fa), e4 = sq(sq(ez));
        if (e4 < 1.) r += fa * P6.x * (1. - e4 - .3 * gs(ez / .4)) * ss(P6.y, P6.y + .06, v) * (1. - ss(P3.y - .02, P3.y + .05, v));
        float az = (z - .01) / .095, a4 = sq(sq(az));
        if (a4 < 1.) r += P6.z * .011 * (1. - a4) * ss(.1, .16, y) * (1. - ss(yN - .14, yN - .07, y));
      }
      // weather: broad lumps, a finer roughness, pits in clusters where clasts fell out
      float n1 = nr(s, c, y, 6., sd), n2 = nr(s, c, y, 21., sd + 13.), n3 = nr(s, c, y, 47., sd + 29.), n4 = nr(s, c, y, 9., sd + 51.);
      r += (.008 + .013 * er) * (n1 - .5) + (.004 + .005 * er) * (n2 - .5) - (.003 + .005 * er) * ss(.55, .8, n3 * .5 + n2 * .5) * ss(.4, .62, n4) * (.4 + 1.2 * n1);
      r *= cap;
    } else {
      // a topknot: a drum of red scoria a little wider at the foot, a boss on top
      float yk = 1. - P1.w, R = P1.x * (1. + P1.y * sin(min(y / yk, 1.) * 3.1416) - P2.x * y);
      R = mix(R, P1.x * P1.z, ss(yk - .02, yk + .02, y));
      float ct = max(y - .8, 0.) / .2, top = .35 + .65 * sqrt(max(1. - ct * ct, 0.));
      float n1 = nr(s, c, y * .6, 3., sd), n2 = nr(s, c, y * .6, 9., sd + 7.), n3 = nr(s, c, y * .6, 26., sd + 19.);
      r = (R + min(1., R * 8.) * (.045 * (n1 - .5) + .02 * (n2 - .5) - .018 * ss(.6, .85, n3))) * top;
    }
    o = vec4(max(r, 0.), mark, 0., 1.);
  } else {
    int i = px.x, y0 = cell * MH, jm = max(j - 1, 0), jp = min(j + 1, MH - 1), i6 = max(MW / 42, 1), j6 = max(MH / 42, 1);
    vec4 m0 = texelFetch(uRm, px, 0);
    float r0 = m0.r, yy = yOf(j), mx = 0.;
    float rt = (texelFetch(uRm, ivec2((i + 1) & (MW - 1), px.y), 0).r - texelFetch(uRm, ivec2((i + MW - 1) & (MW - 1), px.y), 0).r) * uC.y / 12.5663706;
    float ry = (texelFetch(uRm, ivec2(i, y0 + jp), 0).r - texelFetch(uRm, ivec2(i, y0 + jm), 0).r) / (yOf(jp) - yOf(jm));
    // what overhangs the point, and how deep it sits among its neighbours
    for (int n = 1; n <= int(uC.w); n++) {
      int k = min(j + (n + n * n / 6) * MH / 192, MH - 1);
      mx = max(mx, (texelFetch(uRm, ivec2(i, y0 + k), 0).r - r0) / max(yOf(k) - yy, 1e-4));
    }
    float cav = (texelFetch(uRm, ivec2((i + i6) & (MW - 1), px.y), 0).r + texelFetch(uRm, ivec2((i + MW - i6) & (MW - 1), px.y), 0).r + texelFetch(uRm, ivec2(i, y0 + max(j - j6, 0)), 0).r + texelFetch(uRm, ivec2(i, y0 + min(j + j6, MH - 1)), 0).r) * .25 - r0;
    float ao = (1. - .82 * ss(.15, 1.6, mx)) * (1. - min(.5, max(cav, 0.) * 25.));
    o = vec4(r0, rt, ry, m0.g > .5 ? 2. : m0.g < -.5 ? .05 : ao);
  }
}`,La=ee+`#define VSH
`+pe+we+ut+`
layout(location=0) in vec2 aQ;
out vec2 vQ; out vec3 vW;
void main() {
  float ua = aQ.x * SPR.w;
  float s = coastS(ua) + 1.5;
  vQ = vec2(ua, aQ.y * 11.);
  vec2 b = AC.xy + NS.xy * s + NS.zw * ua;
  vW = vec3(b.x, -AC.z + vQ.y, b.y);
  gl_Position = VP * vec4(vW, 1.);
}`,_a=ee+pe+we+ut+`
in vec2 vQ; in vec3 vW; out vec4 o;
void main() {
  float ua = vQ.x, y = vQ.y;
  float ph = TIME / SURF.x + .3 * nz(vec2(ua / 90., 1.3) + T0.xy);
  float k = floor(ph), tau = (ph - k) * SURF.x;
  float A = SURF.y * 1.8 * (.5 + .5 * hf(uint(int(k) + 5000) * 747796405u));
  float wa = dot(WIND.xy, NS.zw), wo = dot(WIND.xy, -NS.xy);
  float g = SPR.y;
  float top = (1.5 + 4.5 * (1. - exp(-tau / 1.1))) * A * (1. + 1.2 * g);
  if (y > top + 1.5 && SPR.x * .06 * smoothstep(3., 0., y) < .003) discard;
  float xs = ua - wa * (y * (1.5 + 3. * g) + tau * 1.5 * g);
  float tb = nf(vec2(xs * .09 + 3., (y - TIME * (.6 + g)) * .35)) * .65 + nf(vec2(xs * .33 + 17., y * 1.1 - TIME * 1.3)) * .35;
  float den = A * exp(-tau / (2. + 2. * g)) * smoothstep(0., .4, tau) * smoothstep(top, top * .25, y) * smoothstep(.0, .8, y);
  den = den * smoothstep(.35, .75, tb + .15 * g) * (SPR.x + 3. * g) * (1. + .5 * max(wo, 0.) * g);
  den += .06 * SPR.x * smoothstep(3., 0., y) * tb;
  vec3 rd = normalize(vW - CAM);
  float fs = pow(max(dot(rd, LG), 0.), 3.);
  vec3 c = SKYUP * .75 + GLC * GLI * (.25 + 1.6 * fs) + MFLASH * vec3(.75, .9, 1.) * .2;
  float a = clamp(den * .6, 0., .6);
  if (a < .003) discard;
  o = vec4(tmap(c * EXPO), a);
}`,ka=ee+pe+we+`
uniform sampler2D uS;
out vec4 o;
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 uv = gl_FragCoord.xy / sz;
  ivec2 P = ivec2(gl_FragCoord.xy);
  vec4 c4 = texelFetch(uS, P, 0);
  vec3 c = c4.rgb;
  // the statues' and the ahu's outline: where their mark in alpha changes, smooth the edge along its own direction
  // (the stair steps of a pixel grid), never the stars or the sky
  float m0 = c4.a, m1 = texelFetch(uS, P + ivec2(1, 0), 0).a, m2 = texelFetch(uS, P - ivec2(1, 0), 0).a, m3 = texelFetch(uS, P + ivec2(0, 1), 0).a, m4 = texelFetch(uS, P - ivec2(0, 1), 0).a;
  if (max(max(m0, m1), max(max(m2, m3), m4)) - min(min(m0, m1), min(min(m2, m3), m4)) > .5) {
    vec2 px = 1. / sz;
    vec3 W = vec3(.3, .6, .1);
    float lNW = dot(texture(uS, uv + vec2(-1., 1.) * px).rgb, W), lNE = dot(texture(uS, uv + vec2(1., 1.) * px).rgb, W);
    float lSW = dot(texture(uS, uv + vec2(-1., -1.) * px).rgb, W), lSE = dot(texture(uS, uv + vec2(1., -1.) * px).rgb, W), lM = dot(c, W);
    vec2 dir = vec2((lNW + lNE) - (lSW + lSE), (lNW + lSW) - (lNE + lSE));   // along the edge (N is up)
    float rd = max((lNW + lNE + lSW + lSE) * .03125, .002), rc = 1. / (min(abs(dir.x), abs(dir.y)) + rd);
    dir = clamp(dir * rc, -6., 6.) * px;
    vec3 a = .5 * (texture(uS, uv - dir * .1667).rgb + texture(uS, uv + dir * .1667).rgb);
    vec3 b = a * .5 + .25 * (texture(uS, uv - dir * .5).rgb + texture(uS, uv + dir * .5).rgb);
    float lb = dot(b, W), lo = min(lM, min(min(lNW, lNE), min(lSW, lSE))), hi = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
    c = lb < lo || lb > hi ? a : b;
  }
  vec2 v = uv - .5;
  c *= 1. - .15 * dot(v, v);
  uint s = uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u;   // still: the grain belongs to the picture, not to the frame
  float g = hf(s) + hf(s ^ 0x55u) - 1.;
  float l = dot(c, vec3(.3, .6, .1));
  c += g * .006 * (.35 + .65 * (1. - l)) * (.6 + .4 * smoothstep(0., .15, l));
  o = vec4(c, 1.);
}`,Vo=[[12.443,-63.1,.77,-.24],[12.795,-59.69,1.25,-.23],[12.519,-57.11,1.59,1.6],[12.252,-58.75,2.79,-.19],[12.356,-60.4,3.59,1.42],[14.66,-60.83,-.27,.71],[14.064,-60.37,.61,-.23],[6.399,-52.7,-.74,.15],[1.629,-57.24,.46,-.16],[6.752,-16.72,-1.46,0],[6.977,-28.97,1.5,-.21],[7.14,-26.39,1.83,.67],[7.401,-29.3,2.45,-.08],[6.378,-17.96,1.98,-.23],[5.242,-8.2,.13,-.03],[5.919,7.41,.5,1.85],[5.419,6.35,1.64,-.22],[5.796,-9.67,2.06,-.18],[5.533,-.3,2.23,-.22],[5.603,-1.2,1.69,-.19],[5.679,-1.94,1.77,-.21],[7.655,5.22,.34,.42],[7.755,28.03,1.14,1],[7.577,31.89,1.58,.03],[8.159,-47.34,1.83,-.22],[8.745,-54.71,1.93,.04],[9.133,-43.43,2.21,1.66],[9.368,-55.01,2.47,-.18],[8.375,-59.51,1.86,1.28],[9.22,-69.72,1.68,.07],[9.285,-59.28,2.21,.18],[10.716,-64.39,2.76,-.22],[8.06,-40,2.21,-.27],[7.286,-37.1,2.7,1.62],[8.126,-24.3,2.81,.43],[9.46,-8.66,1.98,1.44],[10.139,11.97,1.35,-.11],[13.42,-11.16,.97,-.23],[14.261,19.18,-.05,1.23],[12.692,-48.96,2.17,-.01],[13.665,-53.47,2.3,-.22],[14.592,-42.16,2.31,-.19],[14.111,-36.37,2.06,1.01],[13.926,-47.29,2.55,-.22],[12.139,-50.72,2.52,-.13],[14.699,-47.39,2.3,-.2],[16.811,-69.03,1.91,1.44],[15.919,-63.43,2.83,.29],[15.315,-68.68,2.89,0],[20.427,-56.74,1.94,-.2],[22.137,-46.96,1.74,-.07],[22.711,-46.88,2.07,1.6],[22.961,-29.62,1.16,.09],[12.263,-17.54,2.59,-.11],[5.661,-34.07,2.65,-.12],[16.49,-26.43,1.06,1.83],[17.56,-37.1,1.62,-.22],[17.622,-43,1.86,.4],[18.403,-34.38,1.85,-.03],[18.921,-26.3,2.05,-.13],[16.006,-22.62,2.29,-.12],[16.836,-34.29,2.29,1.15],[17.708,-39.03,2.41,.51],[17.531,-49.88,2.84,-.17],[17.422,-55.53,2.85,1.46],[19.846,8.87,.77,.22],[18.616,38.78,.03,0],[4.599,16.51,.85,1.54],[5.278,46,.08,.8],[.429,-77.25,2.8,.62],[1.98,-61.57,2.86,.28],[16.598,-28.22,2.82,-.2],[18.35,-29.83,2.7,1.38],[19.043,-29.88,2.6,.08],[17.512,-37.3,2.7,-.22]],Wo=t=>{const e=Math.max(-.3,Math.min(1.9,t));return[Math.min(1.25,.82+.3*(e+.3)),.86+.14*Math.cos((e-.45)*1.6),Math.max(.48,1.22-.4*(e+.3))]},za=[[-.0548755604,-.8734370902,-.4838350155],[.4941094279,-.44482963,.7469822445],[-.867666149,-.1980763734,.4559837762]],gt=(t,e)=>{const c=t*15*_,E=e*_;return[Math.cos(E)*Math.cos(c),Math.cos(E)*Math.sin(c),Math.sin(E)]},Ua=t=>{const e=t*15*_,c=Math.cos(e),E=Math.sin(e),G=Math.sin(Ut),re=Math.cos(Ut),A=[0,re,-G],X=[-1,0,0];return[[c*A[0]+E*X[0],c*A[1]+E*X[1],c*A[2]+E*X[2]],[E*A[0]-c*X[0],E*A[1]-c*X[1],E*A[2]-c*X[2]],[0,G,re]]},Bt=(t,e)=>[t[0][0]*e[0]+t[1][0]*e[1]+t[2][0]*e[2],t[0][1]*e[0]+t[1][1]*e[1]+t[2][1]*e[2],t[0][2]*e[0]+t[1][2]*e[1]+t[2][2]*e[2]],Da=(t,e)=>[t[0][0]*e[0]+t[0][1]*e[1]+t[0][2]*e[2],t[1][0]*e[0]+t[1][1]*e[1]+t[1][2]*e[2],t[2][0]*e[0]+t[2][1]*e[1]+t[2][2]*e[2]],Re=t=>{const e=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/e,t[1]/e,t[2]/e]},Ia=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],vt=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],O=(t,e,c)=>Math.max(e,Math.min(c,t)),Se=(t,e,c)=>{const E=O((c-t)/(e-t),0,1);return E*E*(3-2*E)};function ga(t,e){if(t.__c584)return t.__c584;const c=[performance.now()],E=[],G=!!t.getExtension("EXT_color_buffer_float"),re=G||!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("KHR_parallel_shader_compile");const A=(r,l)=>{const p=t.createShader(r);return t.shaderSource(p,l),t.compileShader(p),p},X=A(t.VERTEX_SHADER,ba),ce=A(t.VERTEX_SHADER,wa),K=(t.getParameter(t.MAX_TEXTURE_SIZE)|0)<he*ht[0][1],Ae=K?pa():null,L=re?null:ya(K?Ae.vs:oo,K?Ae.fs:ao,K?Ae.mo:no),W={mw:[X,Ea],ter:[ce,Ta],tin:[ce,Ma],tes:[ce,Fa],sky:[X,Pa],grs:[Sa,Na],obj:L?[L.vs,L.fs]:K?[Ae.vs,Ae.fs]:[oo,ao],mo:[X,L?L.mo:K?Ae.mo:no],smk:[La,_a],fin:[X,ka],bk:[Ra,Aa]},I={};for(const r in W){const[l,p]=W[r],v=t.createProgram(),k=typeof l=="string"?A(t.VERTEX_SHADER,l):l,F=A(t.FRAGMENT_SHADER,p);if(t.attachShader(v,k),t.attachShader(v,F),r==="bk"&&t.transformFeedbackVaryings(v,["vT"],t.SEPARATE_ATTRIBS),t.linkProgram(v),I[r]={p:v,vs:k,fs:F},zt===3){const z=performance.now();t.getProgramParameter(v,t.LINK_STATUS),E.push("SEQ "+r+" "+(performance.now()-z).toFixed(0))}}t.flush(),c.push(performance.now());let P=305441741;const d=()=>{P=P+1831565813|0;let r=Math.imul(P^P>>>15,1|P);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296},Te=new Uint8Array(65536);for(let r=0;r<65536;r++)Te[r]=Math.floor(d()*256);const ae=170,te=256,dt=new Float32Array(ae*te*2);for(let r=0;r<ae;r++){const l=r===0?0:.22*Math.pow(27272.727272727272,(r-1)/(ae-2));for(let p=0;p<te;p++){const v=p/te*de;dt[(r*te+p)*2]=Math.sin(v)*l,dt[(r*te+p)*2+1]=Math.cos(v)*l}}const Me=new Uint16Array((ae-1)*te*6);let Ne=0;for(let r=0;r<ae-1;r++)for(let l=0;l<te;l++){const p=r*te+l,v=r*te+(l+1)%te,k=p+te,F=v+te;Me[Ne++]=p,Me[Ne++]=k,Me[Ne++]=v,Me[Ne++]=v,Me[Ne++]=k,Me[Ne++]=F}const De=14.5,Qe=.31,ye=48,Ie=[];for(let r=0;r<=ye;r++)Ie.push([]);for(let r=-De;r<De;r+=Qe)for(let l=-De;l<De;l+=Qe){const p=r+d()*Qe,v=l+d()*Qe,k=Math.hypot(p,v);if(k>De||k<.5||d()>(k<6?.8:.8-.5*(k-6)/(De-6)))continue;const F=d(),z=.03+.08*Math.pow(d(),1.5),D=8+Math.floor(z/.11*22*(.6+.8*d())),q=.7+.6*d();let j=Math.atan2(p,v);j<0&&(j+=de);const be=k<3?0:1+Math.min(ye-1,Math.floor(j/de*ye));for(let ke=0;ke<D;ke++){const se=Math.sqrt(d())*z,B=d()*de,xe=.12+.75*(se/z)*(.4+.6*d());Ie[be].push(p+Math.sin(B)*se,v+Math.cos(B)*se,(.16+.2*d())*q,d(),Math.sin(B)*xe,Math.cos(B)*xe,F,d())}}const Ct=Ie.reduce((r,l)=>r+l.length/8,0),mt=new Float32Array(Ct*8),Ze=[],xt=[];let Ve=0;for(const r of Ie)Ze.push(Ve),xt.push(r.length/8),mt.set(r,Ve*8),Ve+=r.length/8;const w=6,so=[];for(let r=0;r<=w;r++)so.push(r/w,-1,r/w,1);const V=new Float32Array(64*5*4);Vo.slice(0,64).forEach((r,l)=>{const p=gt(r[0],r[1]),v=Wo(r[3]);V.set([p[0],p[1],p[2],r[2]],l*4),V.set([v[0],v[1],v[2],0],(64+l)*4)});const Je=(r,l,p)=>{const v=Math.max(0,Math.min(1,(p-r)/(l-r)));return v*v*(3-2*v)},M=256,ne=12,ie=[],Y=new Float32Array(M*M),Le=new Uint8Array(M*M*4);for(let r=0;r<ne*ne;r++)ie.push((r%ne+.15+.7*d())/ne,(Math.floor(r/ne)+.15+.7*d())/ne,d());for(let r=0;r<M;r++)for(let l=0;l<M;l++){const p=(l+.5)/M,v=(r+.5)/M,k=Math.floor(p*ne),F=Math.floor(v*ne);let z=9,D=9,q=0;for(let j=-1;j<=1;j++)for(let be=-1;be<=1;be++){const ke=((F+j+ne)%ne*ne+(k+be+ne)%ne)*3;let se=Math.abs(ie[ke]-p),B=Math.abs(ie[ke+1]-v);se>.5&&(se=1-se),B>.5&&(B=1-B);const xe=Math.hypot(se,B);xe<z?(D=z,z=xe,q=ie[ke+2]):xe<D&&(D=xe)}Y[r*M+l]=Math.pow(Je(0,.035,D-z),.6)*(.7+.3*q),Le[(r*M+l)*4+3]=40+215*q}for(let r=0;r<M;r++)for(let l=0;l<M;l++){const p=Y[r*M+l],v=(r*M+l)*4;Le[v]=127.5-Math.max(-1,Math.min(1,(Y[r*M+(l+1&255)]-Y[r*M+(l-1&255)])*3))*127,Le[v+1]=127.5-Math.max(-1,Math.min(1,(Y[(r+1&255)*M+l]-Y[(r-1&255)*M+l])*3))*127,Le[v+2]=60+195*p}const me=96,$e=144,et=new Float32Array((me+1)*($e+1)*2),tt=[],ot=[],at=[];for(let r=0;r<=$e;r++)for(let l=0;l<=me;l++)et[(r*(me+1)+l)*2]=l/me,et[(r*(me+1)+l)*2+1]=r/$e;for(const r of[1,2,4]){ot.push(tt.length);for(let l=0;l<$e;l+=r)for(let p=0;p<me;p+=r){const v=l*(me+1)+p,k=v+r,F=v+r*(me+1),z=F+r;tt.push(v,k,F,k,z,F)}at.push(tt.length-ot[ot.length-1])}c.push(performance.now());for(const r in I){const l=I[r].p,p=t.getProgramParameter(l,t.LINK_STATUS);if(E.push(r+" "+(performance.now()-c[0]).toFixed(0)),!p)throw new Error("584 "+r+": "+t.getProgramInfoLog(l)+t.getShaderInfoLog(I[r].fs)+(I[r].vs?t.getShaderInfoLog(I[r].vs):""));const v=t.getUniformBlockIndex(l,"UB");v!==t.INVALID_INDEX&&t.uniformBlockBinding(l,v,0),t.useProgram(l);for(const[k,F]of[["uN",0],["uMW",1],["uD",2],["uS",3],["uHz",4],["uOC",5],["uCb",6],["uRm",5],["uP",7]]){const z=t.getUniformLocation(l,k);z&&t.uniform1i(z,F)}I[r].uRes=t.getUniformLocation(l,"uRes"),I[r].uC=t.getUniformLocation(l,"uC")}const Fe=(r,l,p,v,k,F,z,D,q)=>{const j=t.createTexture();return t.bindTexture(t.TEXTURE_2D,j),t.texImage2D(t.TEXTURE_2D,0,p,r,l,0,v,k,F),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,z),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,z),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,q),j};t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.bindBuffer(t.PIXEL_UNPACK_BUFFER,null);const pt=Fe(256,256,t.R8,t.RED,t.UNSIGNED_BYTE,Te,t.LINEAR,t.REPEAT,t.REPEAT),ro=Fe(64,5,t.RGBA32F,t.RGBA,t.FLOAT,V,t.NEAREST,t.CLAMP_TO_EDGE,t.CLAMP_TO_EDGE),fe=(r,l,p)=>{const v=t.createBuffer();return t.bindBuffer(r,v),t.bufferData(r,l,p||t.STATIC_DRAW),v},ge=t.createVertexArray(),_e=t.createVertexArray();t.bindVertexArray(_e),fe(t.ARRAY_BUFFER,dt),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0),fe(t.ELEMENT_ARRAY_BUFFER,Me);const We=t.createVertexArray();t.bindVertexArray(We),fe(t.ARRAY_BUFFER,new Float32Array(so)),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0);const nt=fe(t.ARRAY_BUFFER,mt);t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,0),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,32,16),t.vertexAttribDivisor(2,1),t.vertexAttribDivisor(3,1);const st=t.createVertexArray();t.bindVertexArray(st),t.bindBuffer(t.ARRAY_BUFFER,nt),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,32,0);const rt=Fe(8,he,t.RGBA32F,t.RGBA,t.FLOAT,null,t.NEAREST,t.CLAMP_TO_EDGE,t.CLAMP_TO_EDGE),Ot=Fe(M,M,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,Le,t.LINEAR,t.REPEAT,t.REPEAT);t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR);const yt=t.createVertexArray();t.bindVertexArray(yt),fe(t.ARRAY_BUFFER,et),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0);const co=fe(t.ARRAY_BUFFER,new Float32Array(48*20),t.DYNAMIC_DRAW);for(let r=0;r<5;r++)t.enableVertexAttribArray(1+r),t.vertexAttribPointer(1+r,4,t.FLOAT,!1,80,r*16),t.vertexAttribDivisor(1+r,1);fe(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(tt));const bt=t.createVertexArray();t.bindVertexArray(bt);const Et=[];for(let r=0;r<=96;r++)Et.push(r/48-1,0,r/48-1,1);fe(t.ARRAY_BUFFER,new Float32Array(Et)),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0),t.bindVertexArray(null);const wt=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,wt),t.bufferData(t.UNIFORM_BUFFER,48*16,t.DYNAMIC_DRAW);const ct=r=>{const l=r*3/8,p=Fe(r,l,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.REPEAT,t.CLAMP_TO_EDGE),v=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,p,0),t.viewport(0,0,r,l),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(I.mw.p),t.uniform4f(t.getUniformLocation(I.mw.p,"uM"),0,0,1,r),t.uniform4f(t.getUniformLocation(I.mw.p,"uM2"),l,1,.42,Math.atan(Math.PI)),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,pt),t.bindVertexArray(ge),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(v),t.bindTexture(t.TEXTURE_2D,p),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.bindTexture(t.TEXTURE_2D,pt),p},He={[e]:ct(e)};zt&&console.warn("584 make: submit "+(c[1]-c[0]).toFixed(0)+" bake "+(c[2]-c[1]).toFixed(0)+" links "+E.join(", ")+" mw "+(performance.now()-c[0]).toFixed(0));const io=Vo.map(r=>({q:gt(r[0],r[1]),m:r[2],c:Wo(r[3])})),Be={mo2:K,mu:!!L,P:I,fl:G,hf:re,nd:Te,bright:io,tN:pt,tD:ro,mws:He,mw:r=>He[r]||(He[r]=ct(r)),vEmpty:ge,vTer:_e,nTer:Me.length,vGrs:We,vGrsB:st,nStem:Ct,nTerV:ae*te,tfo:t.createTransformFeedback(),gBuf:nt,nGrsV:(w+1)*2,bStart:Ze,bCount:xt,NSEC:ye,vSt:yt,stB:co,tPar:rt,tex:Fe,tCb:Ot,lodOff:ot,lodCnt:at,vSmk:bt,ubo:wt,hzc:new Map,maxTex:t.getParameter(t.MAX_TEXTURE_SIZE)};return t.__c584=Be,Be}const Ba=(t,e,c)=>{const E=t.createTexture();t.bindTexture(t.TEXTURE_2D,E),e.fl?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,c,c,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,c,c,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const G=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,G),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,c,c);const re=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,re),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,E,0),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,G),t.bindFramebuffer(t.FRAMEBUFFER,null),{t:E,fb:re}};go.add({num:584,name:"Stone Heads",fam:"Vistas",recipe:"The south coast of Rapa Nui on a night that's usually moonless, with up to fifteen moai on a stone platform, backs to the sea, under the real southern sky for that date and hour. The setting, where you stand, the hour and the cloud change every mint. Drag to send wind through the grass and spray off the surf, or hold to run the night on toward dawn.",interactive:"Drag to send the Pacific wind through the grass and spray off the surf; hold to run the night on towards dawn.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,c=ga(e,t.tile?1024:2048),E=t.size,G=Ba(e,c,E),re=c.mw(t.tile?1024:2048),A=!Oo&&!!t.home,X=Bo,ce=(Oo||t.hash).slice(2).padEnd(64,"0"),K=o=>{let a=parseInt(ce.slice(0,8),16)^o,s=parseInt(ce.slice(8,16),16),n=parseInt(ce.slice(16,24),16)^o*7,i=parseInt(ce.slice(24,32),16);const x=()=>{a|=0,s|=0,n|=0,i|=0;const h=(a+s|0)+i|0;return i=i+1|0,a=s^s>>>9,s=n+(n<<3)|0,n=n<<21|n>>>11,n=n+h|0,(h>>>0)/4294967296};for(let h=0;h<12;h++)x();return x},Ae=K(1412),L=K(40503),W=K(20973),I=K(22295),P=K(248771),d=(o,a)=>o+(a-o)*P(),Te=o=>{let a=0;for(const n of o)a+=n[1];let s=P()*a;for(const n of o)if(s-=n[1],s<0)return n[0];return o[o.length-1][0]},ae=(o,a)=>{let s=0;for(const x of o)s+=x[1];let n=Ae()*s,i=o[o.length-1];for(const x of o)if(n-=x[1],n<0){i=x;break}return A?o[a]:i},te=ae([["Last glow",2,-11.5],["Nautical dusk",4,-14.5],["Nightfall",3,-17],["Deep night",1,-21]],2),dt=te[2],Me=ae([[0,5,15],[0,3,11],[0,2,7],[0,1,-15]],0)[2],Ne=ae([[0,4,1],[0,3,0],[0,2,3],[0,1,5]],0)[2],De=ae([[0,4,4],[0,2,2],[0,3,7],[0,1,-5]],0)[2],Qe=ae([["Long swell",5,1],["Low swell",3,.6],["Heavy swell",2,1.6]],0),ye=Qe[2],Ie=ae([[0,4,.2],[0,2,.05],[0,3,.45]],0)[2],Ct=ae([["Faint",6,.3],["Green bands",2,.75],["Clean sky",2,.1]],0),mt=Ct[2],Ze=ae([[0,7,0],[0,2,1]],0)[2],xt=ae([[0,4,1],[0,3,0],[0,2,2]],0)[2],Ve=A?0:Te([[0,36],[6,5],[1,10],[2,20],[3,12],[4,9],[5,8]]),w=Ve===6?0:Ve===3?P()<.5?4:5:Ve;let V=w===0||w===6?A?15:Te([[5,1],[7,2],[9,3],[11,3],[13,2],[15,4]]):w===1?7:w===2?8+Math.floor(P()*7):w===3?7+2*Math.floor(P()*3):w===4?1:2;const Je=w===1?d(4.3,4.8):w===5?d(4.6,5.8):w===3?d(6.6,7.4):A?94/14:d(6.3,7.1),M=w===2?60:(V-1)*Je,ne=I();let ie=A||ne<.55?0:ne<.8?1:2;w===3&&ie===1&&(ie=2),(w===2||w===4||w===5)&&ie===2&&(ie=1);const Y=K(450966),Le=Y(),me=Y(),$e=Y(),et=Y(),tt=Y(),ot=Y(),at=Y(),Fe=Y(),pt=Y(),ro=Y(),fe=Y(),ge=(o,a)=>$t[o]!==void 0?$t[o]:a,_e=ge("night",A?0:Le<.13?1:Le<.25?2:Le<.38?3:0),We=ge("season",A||me<.5?0:me<.67?1:me<.84?2:3),nt=[5.9,12,18,0][We],st=[23.3,0,-23.4,.5][We]*_,rt=We===3,Ot=ge("psi",A?0:$e<.55?(et-.5)*50:(et-.5)*360)*_,yt=ge("cloud",!A&&pt<.2?.45+.4*ro:0),co=_e===1?-(5.5+2.5*at):dt,bt=(o,a)=>{const s=(Math.sin(o*_)-Math.sin(Ut)*Math.sin(st))/(Math.cos(Ut)*Math.cos(st)),n=Math.acos(O(s,-1,1))/_/15;return a?nt-n+24:nt+n},Et=Math.cos(Ot),wt=Math.sin(Ot),ct=o=>Ua(o).map(a=>[a[0]*Et+a[2]*wt,a[1],-a[0]*wt+a[2]*Et]),He=bt(co,rt),io=rt?bt(-5,!0):He+11.9,Be=o=>[Math.sin(o),Math.cos(o)],r=(140+(A?0:(L()-.5)*8))*_,l=r-(33+(A?0:(L()-.5)*6)+(w===2?20:0))*_,p=Be(l),v=Be(l+Math.PI/2),k=A?16:15+L()*4;let F=r,z=13*_,D=k,q=Math.min(37,M/2+8.5),j=-1;if(w===2)D=k+9,q=30,z=(ie===1?15:11)*_;else if(w===1&&(D=k-4),(w===4||w===5)&&(D=k-3,q=M/2+11),ie===1){j=V<3?0:1+Math.floor(I()*3);const o=2.5+I()*1.5;D=8+I()*1.5,q=o+M/2-j*Je,F=Math.atan2(p[0]*o+v[0]*D,p[1]*o+v[1]*D)-.2-I()*.08,z=(24+I()*4)*_}else ie===2&&(q=M/2+6+I()*3,D=6+I()*1.5,F=l+.2+I()*.06,z=(8+I()*3)*_,w===3&&(q+=5,D+=5.5,F+=.1));let be=35,ke=ma,se=-1;if(!A&&tt<.45||$t.stand2!==void 0){const o=w===2?[[3,3],[2,2]]:[[0,3],[1,2],[2,2]];se=ge("stand2",(()=>{let a=0;for(const n of o)a+=n[1];let s=ot*a;for(const n of o)if(s-=n[1],s<0)return n[0];return o[0][0]})()),se===0?(be=20,D=k+6+fe*8,q=M/2+26+fe*14,F=Math.atan2(v[0]*D+p[0]*(q-M*.15),v[1]*D+p[1]*(q-M*.15)),z=5*_):se===1?(D=-(12+fe*3),q=(fe-.5)*Math.min(M,30)*.5,F=Math.atan2(v[0]*D+p[0]*q,v[1]*D+p[1]*q)+(Fe-.5)*.5,z=15*_,be=38):se===2?(be=49,ke=.42,z=(17+6*fe)*_):(F=r+Math.PI+(fe-.5)*.6,z=10*_,be=33)}const B=[v[0]*D+p[0]*q,v[1]*D+p[1]*q],xe=c.nd,Q=(o,a)=>{const s=Math.floor(o),n=Math.floor(a);let i=o-s,x=a-n;i=i*i*(3-2*i),x=x*x*(3-2*x);const h=s&255,f=n&255,m=h+1&255,u=f+1&255,R=xe[f*256+h]/255,N=xe[f*256+m]/255,g=xe[u*256+h]/255,ve=xe[u*256+m]/255,J=R+(N-R)*i,$=g+(ve-g)*i;return J+($-J)*x},C=[L()*200,L()*200,L()*200,L()*200],Ce=[24+L()*4,14,5,60],Ho=.8,Xo=w===2?.2:.07,Ko=o=>Ce[0]+Ce[1]*(Q(o/70+C[0],3.1+C[1])-.5)+Ce[2]*(Q(o/17+C[2],7.7+C[3])-.5)-Ce[3]*Se(45,170,o),Ca=(o,a)=>{const s=o-B[0],n=a-B[1];return s*v[0]+n*v[1]-Ko(s*p[0]+n*p[1])},Yo=(o,a)=>{const s=o-B[0],n=a-B[1],i=s*v[0]+n*v[1],x=s*p[0]+n*p[1],h=i-Ko(x),f=Math.max(-h-30,0);let m=2.6+70*(1-Math.exp(-f/1600))+Xo*f*Math.exp(-f/150)+Ho*Math.exp(-(o*o+a*a)/500);return m+=Se(30,400,f)*(22*(Q(o/900+C[1],a/900+C[0])-.5)+9*(Q(o/240+C[2],a/240+C[3])-.5)+2.5*(Q(o/70+C[3],a/70+C[2])-.5)),m+=.7*(Q(o/31+C[3],a/31+C[0])-.5)*Se(4,30,f)+.12*(Q(o/6.3+C[0],a/6.3+C[3])-.5),h>-30&&(m+=-Math.max(h+27,0)*.07+.6*(Q(o/9+C[1],a/9+C[3])-.5)*Se(-26,-20,h)),m},fo=Yo(0,0),Rt=(o,a)=>Yo(o,a)-fo,lo=l+Math.PI,jo=[-v[0],-v[1]],ho=(o,a)=>[B[0]+p[0]*o+jo[0]*(a||0),B[1]+p[1]*o+jo[1]*(a||0)];{const o=Math.abs(Me),a=[];for(let n=0;n<o*9;n++)L();let s=Ne;for(A&&Ne>0&&(a[9]=1,s--);s>0;){const n=Math.floor(L()*o);a[n]||(a[n]=1,s--)}}const Gt=new Float32Array(he*32);let At=0;const uo=Te([["Grey tuff",40],["Yellow tuff",24],["Dark, weathered",20],["Lichen-crusted",11],["One of red scoria",5]]),vo={"Grey tuff":[.3,1,.6],"Yellow tuff":[.85,1.15,.5],"Dark, weathered":[.2,.62,.4],"Lichen-crusted":[.4,.9,1.5],"One of red scoria":[.35,1,.6]}[uo],Xe={head:d(.33,.41),wide:d(.175,.225),box:d(2.8,3.9),brow:d(.018,.03),nose:d(.04,.068),ero:d(.15,.8),jut:P()},Oa=w===1?.28:1,T=(o,a)=>o+a*Oa*(P()*2-1),Ga=o=>o<.6?o/1.2:.5+(o-.6)/.8,qt=(o,a,s)=>{const n={cell:Math.min(At++,he-1),hm:o,seed:P()*200},i=O(T(Xe.head+(a?.08:0),.05),.3,.52),x=1-i,h=O(T(Xe.wide,.03),.14,.26),f=h*O(T(.96,.1),.8,1.1),m=T(.142,.02),u=T(.125,.015),R=Math.max(0,T(.1,.14)),N=h*O(T(a?.55:.66,.09),.46,.8),g=T(.138,.016),ve=T(.125,.016),J=O(T(.86,.08),.7,1),$=O(T(Xe.ero+(a?.15:0)+(s||0),.35),.05,1.5),U=Math.max(.012,T(Xe.brow,.008))*(a?.5:1),y=a?T(.8,.025):T(.77,.04),So=a?T(.012,.004):T(.03,.01),Ee=a?.5:T(.3,.05),je=Math.max(.03,T(Xe.nose+(a?.02:0),.014)),Jt=T(a?.33:.36,.035),No=T(.4,.09),_t=a?T(1.7,.4):T(1.15,.35),Lo=a?Math.max(.009,T(.017,.005)):Math.max(.004,T(.011,.005)),_o=Jt-T(.085,.015),ko=Math.max(.004,T(.014+.012*Xe.jut,.008)),kt=T(.56,.1),zo=Math.max(.006,T(.012,.004)),Uo=T(.26,.1),b=a?0:O(T(.8,.5),0,1.1)*(1-.5*Math.min($,1)),Pe=a?Math.max(.014,T(.03,.014)):Math.max(.025,T(.06,.035)),Do=O(T(Xe.box,.5),2.5,4.4),Io=O(T(.65,.35),.2,1.1);return Gt.set([a?.25:0,x,n.seed,$,f,h,m,u,N,g,ve,J,U,y,So,Ee,je,Jt,No,_t,Lo,_o,ko,kt,zo,Uo,b,R,Pe,Do,0,Io],n.cell*32),n.yN=x,n.fB=m,n.bB=u,n.fH=g,n.wH=N,n.wS=h,n.warm=O(vo[0]+.2*(P()*2-1),0,1),n.tone=vo[1]*(1+.22*(P()*2-1)),n.lichen=Math.max(0,vo[2]*(1+.6*(P()*2-1))),n.red=0,n};let Qo=-1;const qa=o=>{const a=2*o.wH*o.hm*d(1.3,1.55),s=a*d(.6,.82),n=At<he,i=n?At++:Math.max(Qo,0);return n&&Gt.set([1,0,P()*200,0,a/2/s,d(0,.06),d(.4,.52),P()<.75?d(.14,.2):0,d(0,.1),0,0,0],i*32),Qo=i,{cell:i,ph:s}},Zo=w===2?-1.5:Math.max(M/2+4.5,7),mo=Rt(B[0],B[1])-.05,Jo=mo+2.16,Oe=[[],[],[]],$o=o=>{const a=o[2]/(Math.hypot(o[8],o[10])||1);Oe[a>.45?0:a>.12?1:2].push(o)},it=(o,a,s,n,i,x,h,f,m,u,R)=>$o([0,o.cell,o.hm,o.seed,h,f,m,o.warm,n,i,x,0,o.lichen,o.red,R||0,0,u||0,a,s,o.tone]),Va=(o,a,s,n,i,x,h,f,m)=>$o([0,o.cell,o.ph,m,i,x,h,.3,a,s,n,0,.35,1,0,0,f,0,1,1]),ea=(o,a,s)=>{const[n,i]=ho(a,s);return o.x=n,o.z=i,o.yaw=lo+T(0,.09),o.lean=T(0,P()<.15?.11:.04),o.fw=T(0,.04),it(o,0,1,n,Jo-.02*o.hm,i,o.yaw,o.lean,o.fw,0),o.up=1,o},xo=o=>{const a=qa(o);Va(a,o.x,Jo-.02*o.hm,o.z,o.yaw,o.lean,o.fw,o.hm*.985/a.ph,o.seed+5),o.puk=1},le=[];let ft=0,po="None",ta="Empty sockets";if(w!==2){const[o,a]=ho(0);Oe[1].push([1,0,1,0,lo,0,0,1,o,mo,a,1,0,0,1,Zo,0,0,0,0])}if(w===2){const o=Be(F),a=[o[1],-o[0]],s=[];for(let n=0,i=V;n<i;n++){let x,h,f,m,u,R=!1;for(let J=0;J<14&&!R;J++)x=n===0?ie===1?d(5.6,6.6):d(8.5,10.5):9+36*Math.pow((n-1+P())/(i-1),1.25),h=n===0?(P()<.5?-1:1)*x*d(.24,.4):x*d(-.62,.62),f=n===0?d(10.5,13.5):d(5.5,11.5),m=o[0]*x+a[0]*h,u=o[1]*x+a[1]*h,R=Ca(m,u)<-9&&s.every($=>Math.hypot($[0]-m,$[1]-u)>($[2]+f)*.3+1.2);if(!R){V--;continue}s.push([m,u,f]);const N=qt(f,!0),g=n===0?d(.42,.5):d(.4,.66),ve=Math.atan2(-m,-u)-Math.PI/2+(n===0?(h>0?1:-1)*d(.35,.8):d(-1.1,1.1));it(N,0,1,m,Rt(m,u)-g*f,u,ve,d(-.14,.14)*1.9,d(-.2,.13)*1.5-.03,0,g),le.push(N)}}else if(w===3){const o=[Math.floor(P()*V)];P()<.5&&o.push(Math.floor(P()*V));for(let a=0;a<V;a++){const s=-M/2+a*Je+d(-.5,.5),n=qt(d(4.8,8.2),!1,o.includes(a)?0:.35);if(le.push(n),o.includes(a)){ea(n,s,0),P()<.25&&(xo(n),ft++);continue}const i=P()<.4,x=d(.2,1),h=(i?-1:1)*(Math.PI/2+.293+d(-.05,.05)),f=lo+(i?Math.PI:0)+d(-.25,.25),m=d(-.14,.14),[u,R]=ho(s,x),N=i?n.bB:n.fB,g=mo+1.5-.3016*(x-2.7)+N*n.hm*.98,ve=[Math.sin(h)*Math.cos(f),Math.cos(h),-Math.sin(h)*Math.sin(f)];if(P()<.75){const J=Ga(n.yN-.015),$=d(.4,1.5),U=m+d(-.8,.8),y=(N-(n.fH*Math.abs(Math.cos(U))+n.wH*Math.abs(Math.sin(U))))*n.hm*.95;it(n,0,J,u,g,R,f,m,h,0),it(n,J,1,u+ve[0]*$,g+ve[1]*$-y,R+ve[2]*$,f+d(-.35,.35),U,h+d(-.06,.06),0)}else it(n,0,1,u,g,R,f,m,h,0)}po=["None","One","Two"][ft]}else{const o=d(4.3,5.2);for(let a=0;a<V;a++){const s=P(),n=w===1?o*T(1,.2):w===4?d(8.6,10.4):w===5?a===0?d(6.6,9):d(3.8,6.4):s<.2?d(2.9,4.2):s<.78?d(4.4,6.6):s<.95?d(6.8,8.4):d(8.8,10);le.push(Object.assign(qt(n,!1),{u:-M/2+a*Je+(V>1?d(-.5,.5):0)}))}j>=0&&le[j].hm<6.6&&(le[j].hm=6.6+I()*1.6);for(const a of le)ea(a,a.u,0);ft=w===4?P()<.7?1:0:w===5?Te([[0,3],[1,4],[2,2]]):w===1?Te([[0,5],[1,2],[7,1]]):A?1:Math.min(V,Te([[1,4],[0,3],[2,2],[3,2],[5,1]])),po=ft===V&&V>1?V===2?"Both":"All seven":["None","One","Two","Three","Four","Five"][ft];{let a=ft;if(A&&a>0){let s=le[6];for(let n=7;n<=10;n++)le[n].hm>s.hm&&(s=le[n]);xo(s),a--}for(;a>0;){const s=le[Math.floor(P()*V)];s.puk||(xo(s),a--)}}if(w===6){const a=qt(d(5,7.5),!1),s=r+80*_,n=B[0]-v[0]*k-p[0]*Math.min(37,M/2+8.5),i=B[1]-v[1]*k-p[1]*Math.min(37,M/2+8.5),x=n+Math.sin(r)*11.5-Math.cos(r)*5,h=i+Math.cos(r)*11.5+Math.sin(r)*5,f=x+Math.sin(s)*a.hm,m=h+Math.cos(s)*a.hm,u=Math.min(Rt(f,m),Rt(x,h))+a.bB*a.hm*.7;it(a,0,1,f,u,m,s+Math.PI/2,0,-1.5,0),le.push(a),V++}}if(w!==2&&P()<(w===4?.3:.07)){let o=j>=0?le[j]:null;if(!o)for(const a of le)a.up&&(!o||a.hm>o.hm)&&(o=a);o&&(Gt[o.cell*32+30]=1,ta="White coral")}if(uo==="One of red scoria"){const o=le[Math.floor(P()*le.length)];if(o){o.red=.62;for(const a of Oe)for(const s of a)s[0]===0&&s[1]===o.cell&&(s[13]=.62)}}t.trait("Setting",["Long row","Seven alike","Quarry slope","Fallen row","Lone giant","A pair","Row and one in the grass"][w]),t.trait("Statues",["None","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen"][V]),t.trait("Standpoint",se>=0?["Far across the plaza","On the shore behind them","Low in the grass","Up the slope"][se]:w===2?["Among the heads","Beside a great head"][ie]:["On the plaza","Below one statue","Down the line"][ie]),t.trait("Hour",_e===1?rt?"Dawn glow":"Afterglow":rt?{"Last glow":"First light","Nautical dusk":"Nautical dawn",Nightfall:"Before dawn","Deep night":"Deep night"}[te[0]]:te[0]),t.trait("Moon",["None","None","Rising behind them","High behind you"][_e]),t.trait("Season",["June","September","December","March"][We]),t.trait("Sky",yt>0?"Broken cloud":mt>.5?"Green airglow":"Clear"),t.trait("Topknots",po),t.trait("Stone",uo);const Wa=[Oe[0].length,Oe[1].length,Oe[2].length],oa=new Float32Array(48*20);{let o=0;for(let a=2;a>=0;a--)for(let s=Oe[a].length-1;s>=0;s--)oa.set(Oe[a][s],20*o++)}let Ge=null;const Ha=()=>{if(Ge)return Ge;Ge={ter:e.createBuffer(),grs:e.createBuffer()},e.bindBuffer(e.ARRAY_BUFFER,Ge.ter),e.bufferData(e.ARRAY_BUFFER,c.nTerV*16,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,Ge.grs),e.bufferData(e.ARRAY_BUFFER,c.nStem*16,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null),e.enable(e.RASTERIZER_DISCARD),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,c.tfo),e.useProgram(c.P.bk.p);for(const[o,a,s]of[[c.vTer,Ge.ter,c.nTerV],[c.vGrsB,Ge.grs,c.nStem]])e.uniform4f(c.P.bk.uC,o===c.vTer?0:1,0,0,0),e.bindVertexArray(o),o===c.vTer&&(e.bindBuffer(e.ARRAY_BUFFER,c.gBuf),e.vertexAttribPointer(1,4,e.FLOAT,!1,16,0),e.disableVertexAttribArray(1)),e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,a),e.beginTransformFeedback(e.POINTS),e.drawArrays(e.POINTS,0,s),e.endTransformFeedback();return e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,0,null),e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),e.disable(e.RASTERIZER_DISCARD),Ge};let Tt=null;const Xa=()=>{if(Tt)return Tt;const o=E<=420?1:0,a=ht[o][0],s=ht[o][1];e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0);const n=c.mo2?2*(a+2):a,i=c.mo2?he/2*s:he*s,x=(f,m,u,R)=>{const N=c.mu,g={t:c.tex(n,i,N?f===e.RG16F?e.RG16UI:e.RGBA16UI:f,N?m===e.RG?e.RG_INTEGER:e.RGBA_INTEGER:m,N?e.UNSIGNED_SHORT:e.HALF_FLOAT,null,N?e.NEAREST:u,R,e.CLAMP_TO_EDGE),fb:e.createFramebuffer()};return e.bindFramebuffer(e.FRAMEBUFFER,g.fb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,g.t,0),e.viewport(0,0,n,i),N?e.clearBufferuiv(e.COLOR,0,[0,0,0,0]):e.clear(e.COLOR_BUFFER_BIT),g};Tt=x(e.RGBA16F,e.RGBA,e.LINEAR,e.REPEAT);const h=x(e.RG16F,e.RG,e.NEAREST,e.CLAMP_TO_EDGE);return c.mo2?e.viewport(0,0,n,Math.ceil(Math.min(At,he)/2)*s):e.viewport(0,0,a,Math.min(At,he)*s),e.useProgram(c.P.mo.p),e.bindVertexArray(c.vEmpty),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c.tN),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,c.tPar),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.bindBuffer(e.PIXEL_UNPACK_BUFFER,null),e.texSubImage2D(e.TEXTURE_2D,0,0,0,8,he,e.RGBA,e.FLOAT,Gt),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,h.fb),e.uniform4f(c.P.mo.uC,0,a,s,9),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,Tt.fb),e.bindTexture(e.TEXTURE_2D,h.t),e.uniform4f(c.P.mo.uC,1,a,s,9),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(h.fb),e.deleteTexture(h.t),Tt};L(),L();for(let o=0,a=Math.abs(De);o<a;o++){for(let s=0;s<7;s++)L();L()<.1||L(),L()}const Vt=[Math.cos(F),-Math.sin(F)],Wt=[.18,.19,.12,.7],Mt=[.1,.86,1.5,L()*de],ue=[l+Math.PI/2+.26,.072,0,.3],qe=[F+Math.PI+.32,.115,0,.24],ze=[.014,l-Math.PI/2-.3,l-Math.PI/2+1,.05],Ke=(o,a,s,n)=>{const i=Math.sin(s),x=Math.cos(s),h=(o*x-a*i)/n;return o*i+a*x>0&&Math.abs(h)<1?h:9},Ka=(o,a)=>{let s=-1;const n=Ke(o,a,ue[0],ue[3]);if(n<2){const f=Math.abs(n),m=n*(n>0?1.25:.85);s=ue[1]*Math.min(1,1.35*(1-Math.pow(Math.abs(m),2.2)))-ue[1]*.16*Math.exp(-Fo((n-.12)/.07))-ue[1]*.08*Math.exp(-Fo((n+.3)/.04))+ue[1]*(.07*(Q(n*7,1.7)-.5)+.04*(Q(n*23,4.1)-.5)+.015*(Q(n*71,8.3)-.5))-.002,f>.97&&(s=-1)}let i=Ke(o,a,ue[0]+.13,.012);i<2&&(s=Math.max(s,.011*(1-Math.pow(Math.abs(i),1.3))-.0015)),i=Ke(o,a,ue[0]+.155,.006),i<2&&(s=Math.max(s,.006*(1-Math.abs(i))-.0015)),i=Ke(o,a,ue[0]+.09,.004),i<2&&(s=Math.max(s,.008*(1-i*i)-.0015));const x=Ke(o,a,qe[0],qe[3]);if(x<2){const f=x<0?Math.pow(-x,.8):Math.pow(x,1.7);s=Math.max(s,qe[1]*Math.min(1,1.25*(1-f))*(1-.12*Math.exp(-Fo((x+.05)/.18)))+qe[1]*(.05*(Q(x*11,5)-.5)+.025*(Q(x*37,9)-.5)))}const h=-(o*v[0]+a*v[1]);if(h>-.35){let f=ze[0]*Se(-.35,.1,h)*(1+.3*(Q(o*9+3,a*9+3)-.5))+.004*(Q(o*31,a*31)-.5);const m=Ke(o,a,ze[1],.7),u=Ke(o,a,ze[2],.3);m<2&&(f=Math.max(f,ze[3]*(1-Math.pow(Math.abs(m),1.4)))),u<2&&(f=Math.max(f,ze[3]*.75*(1-Math.pow(Math.abs(u),2.4))*(1+.1*(Q(u*13,2)-.5)))),s=Math.max(s,f)}return s},Ht=Math.min(4096,c.maxTex),Xt=new Uint16Array(Ht),aa=new Float32Array(1),Ya=new Uint32Array(aa.buffer),ja=o=>{aa[0]=o;const a=Ya[0],s=a>>>16&32768;let n=(a>>>23&255)-112,i=a&8388607;return n<=0?s:n>=31?s|31744:s|n<<10|i>>>13},yo=ce+(A?"h":""),bo=c.hzc.get(yo);if(bo)c.hzc.delete(yo),Xt.set(bo);else for(let o=0;o<Ht;o++){const a=(o+.5)/Ht*de-Math.PI;Xt[o]=ja(Ka(Math.sin(a),Math.cos(a)))}c.hzc.set(yo,bo||Xt.slice()),c.hzc.size>8&&c.hzc.delete(c.hzc.keys().next().value);const na=e.createTexture();e.bindTexture(e.TEXTURE_2D,na),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.bindBuffer(e.PIXEL_UNPACK_BUFFER,null),e.texImage2D(e.TEXTURE_2D,0,e.R16F,Ht,1,0,e.RED,e.HALF_FLOAT,Xt),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const Kt=[1/170,ye>1.2?1:.85,.11,A?85:40+L()*60],Eo=11+L()*3,Qa=F+(9+L()*10)*_,Ft=3600+L()*2500,Za=l+Math.PI+.12,sa=Ze?gt(22.5,-1):null,Yt=l+Math.PI*.5+(L()-.5)*.8,ra=_e>=2?(()=>{const o=_e===2?F+(at-.5)*.45:F+Math.PI+(at-.5)*1.4,a=(_e===2?(se===3?15:3)+5*Fe:32+22*Fe)*_;return Da(ct(He),[Math.sin(o)*Math.cos(a),Math.sin(a),Math.cos(o)*Math.cos(a)])})():null,ca=[-Math.sin(Yt)*.0035,-Math.cos(Yt)*.0035],lt=new Float32Array(48*4),Pt=new Float32Array(4*3*4),jt=new Float32Array(64*2*4);let Qt=He,wo=0,ia=0,Ro=0,Zt=0;const H={dx:-Math.sin(Yt),dz:-Math.cos(Yt),g:0,travel:0},Ue=[];let fa=12+W()*(Ze?10:50),Ao=0,To=0,Mo=null,Z=null,St=0,Ja=0;function Fo(o){return o*o}const S={e:[0,0,0],f:[0,0,1],r:[1,0,0],u:[0,1,0],yaw:F,pitch:z,off:0},oe=new Float32Array(16),Nt=A?xa:Math.tan(be*_),$a=()=>{const o=t.view||X,a=F+(o.yaw||0),s=O(z+(o.pitch||0),-1.45,1.45),n=[Math.sin(a)*Math.cos(s),Math.sin(s),Math.cos(a)*Math.cos(s)],i=Re([n[2],0,-n[0]]),x=Ia(n,i),h=O(o.x||0,-4,4),f=O(o.z||0,-4,4),m=Vt[0]*h+Math.sin(F)*f,u=Vt[1]*h+Math.cos(F)*f,R=Rt(m,u)+Math.max(.25,ke+O(o.y||0,-1.2,1.5));S.e=[m,R,u],S.f=n,S.r=i,S.u=x,S.yaw=a,S.pitch=s,S.off=Math.hypot(h,f);const N=1/Nt,g=(It+Dt)/(Dt-It),ve=2*It*Dt/(Dt-It),J=[i,x,[-n[0],-n[1],-n[2]]],$=J.map(U=>-vt(U,S.e));for(let U=0;U<4;U++){const y=U<3?[J[0][U],J[1][U],J[2][U],0]:[$[0],$[1],$[2],1];oe[U*4]=N*y[0],oe[U*4+1]=N*y[1],oe[U*4+2]=g*y[2]+ve*y[3],oe[U*4+3]=-y[2]}},hn=o=>{const a=oe[0]*o[0]+oe[4]*o[1]+oe[8]*o[2]+oe[12],s=oe[1]*o[0]+oe[5]*o[1]+oe[9]*o[2]+oe[13],n=oe[3]*o[0]+oe[7]*o[1]+oe[11]*o[2]+oe[15];return n>.01?[a/n*.5+.5,.5-s/n*.5]:null},en=(o,a,s)=>{let n;if(sa)n=Bt(ct(Qt),sa);else{const g=W()*de;n=Re([o[0]+Math.sin(g)*1.4,o[1]+.6+W(),o[2]+Math.cos(g)*1.4])}const i=O(vt(n,o),-.99,.99),x=Re([o[0]-n[0]*i,o[1]-n[1]*i,o[2]-n[2]*i]),h=Re([-n[0]*Math.sqrt(1-i*i)+x[0]*i,-n[1]*Math.sqrt(1-i*i)+x[1]*i,-n[2]*Math.sqrt(1-i*i)+x[2]*i]),f=(8+W()*14)*_*(.6+.5*a),m=f*.4,u=Re([o[0]*Math.cos(m)-h[0]*Math.sin(m),o[1]*Math.cos(m)-h[1]*Math.sin(m),o[2]*Math.cos(m)-h[2]*Math.sin(m)]),R=vt(u,o),N=Re([o[0]-u[0]*R,o[1]-u[1]*R,o[2]-u[2]*R]);Ue.length>=4&&Ue.shift(),Ue.push({a:u,b:N,t0:s,len:f,br:a,dur:.35+.5*W()*(.5+a)}),t.sound&&t.sound.note(88+Math.floor(W()*6),{dur:1.2,vel:.05+.06*a,wave:"sine",pan:O(vt(o,S.r)*1.4,-1,1)})},tn=()=>{const o=S.yaw+(W()-.5)*1.6,a=(15+W()*45)*_;return[Math.sin(o)*Math.cos(a),Math.sin(a),Math.cos(o)*Math.cos(a)]},on=o=>{const a=o/Eo+.3*Q(-M*.1/90+C[0],1.3+C[1]),s=Math.floor(a);return{k:s,tau:(a-s)*Eo,A:ye*1.8*(.5+.5*an(Math.imul(s+5e3,747796405)>>>0))}};function an(o){return o>>>=0,o^=o>>>16,o=Math.imul(o,2146121005)>>>0,o^=o>>>15,o=Math.imul(o,2221713035)>>>0,o^=o>>>16,(o>>>8)/16777216}const nn=(o,a)=>{H.g*=Math.exp(-o/3.2),wo+=((Zt>0?1:wo*.999)-wo)*o*.3},la=o=>{$a();const a=ct(Qt),s=Bt(a,gt(nt,st/_)),n=Math.asin(O(s[1],-1,1))/_,i=-n,x=4e-5,h=Math.exp(.9*(n+6)),f=O(3+.6*(i-4),3,16),m=Math.min(.3,.035+.2*Math.exp(-(i-6)*.16)),u=ra?Bt(a,ra):null,R=u?.0011*Se(-.03,.06,u[1])*(.3+.7*Math.sqrt(Math.max(u[1],0))):0,N=Math.max(n>-11.5?.092+(n+11.5)*.007:.016+.3*Math.exp((n+6)*.25),.05*Se(0,7e-4,R)),g=h*.31+x*.55+R*.55,ve=N/g,J=Re([s[0],0,s[2]]),$=Ie+H.g*.9;let U=0;const y=(b,Pe,Do,Io)=>{lt[U++]=b,lt[U++]=Pe,lt[U++]=Do,lt[U++]=Io},So=2*Nt/E;y(S.e[0],S.e[1],S.e[2],Nt),y(S.f[0],S.f[1],S.f[2],So),y(S.r[0],S.r[1],S.r[2],o),y(S.u[0],S.u[1],S.u[2],ve),y(s[0],s[1],s[2],n),y(h,f,m,x);const Ee=za.map(b=>[b[0]*a[0][0]+b[1]*a[1][0]+b[2]*a[2][0],b[0]*a[0][1]+b[1]*a[1][1]+b[2]*a[2][1],b[0]*a[0][2]+b[1]*a[1][2]+b[2]*a[2][2]]);y(a[0][0],a[0][1],a[0][2],7.3),y(a[1][0],a[1][1],a[1][2],1.25),y(a[2][0],a[2][1],a[2][2],.3),y(Ee[0][0],Ee[0][1],Ee[0][2],E<=300?1:0);let je=0;const Jt=Math.cos(Math.min(1.5,Math.atan(Nt*1.42)+.05));jt.fill(0);for(const b of c.bright){const Pe=Bt(a,b.q);Pe[1]>-.03&&vt(Pe,S.f)>Jt&&je<64&&(jt.set([b.q[0],b.q[1],b.q[2],b.m],je*4),jt.set([b.c[0],b.c[1],b.c[2],0],(64+je)*4),je++)}y(Ee[1][0],Ee[1][1],Ee[1][2],je),y(Ee[2][0],Ee[2][1],Ee[2][2],Ue.length),y(H.dx,H.dz,$,H.travel),y(0,1,0,0),y(v[0],v[1],p[0],p[1]),y(B[0],B[1],fo,Ho);const No=1+1.6*Se(13.5,18.5,i),_t=[0,1,2].map(b=>(h*([.15,.29,.8][b]*.9+[1,.6,.35][b]*f*m*.25)+x*[.45,.55,.8][b]*1.8)*No+R*[.26,.4,.86][b]*.9);if(y(_t[0],_t[1],_t[2],.42),R>0){const b=Re(u);y(b[0],Math.max(b[1],.05),b[2],R*.9),y(.8,.87,1,.3)}else{const b=Re([J[0],.07,J[2]]);y(b[0],b[1],b[2],h*f*m*.4*Se(14,10.5,i)),y(1,.56,.3,.25)}y(Eo,ye,Zo+.5,0),y(0,1,0,0);const[Lo,_o]=Be(Qa),ko=2.5-fo-Ft*Ft/12742e3-S.e[1],kt=Re([Lo*Ft-S.e[0],ko,_o*Ft-S.e[2]]);y(kt[0],kt[1],kt[2],xt>0?.8*(.86+.28*(Q(o*.11+9.5,4.5)-.5)):0);const[zo,Uo]=Be(Za);y(zo,-.004,Uo,xt>1?1:0),y(Ft,mt,9e3,E<=300?2:3),y(C[0],C[1],C[2],C[3]),y(Ce[0],Ce[1],Ce[2],Ce[3]),y(ue[0],ue[1],ue[2],ue[3]),y(Mt[0],Mt[1],Mt[2],Mt[3]),y(.35*ye,Math.min(1.2,H.g*1.3),0,220),y(qe[0],qe[1],qe[2],qe[3]);for(let b=0;b<16;b++)lt[U++]=oe[b];y(ze[0],ze[1],ze[2],ze[3]),y(Wt[0],Wt[1],Wt[2],Wt[3]),y(Kt[0],Kt[1],Kt[2],Kt[3]),y(Xo,1/ht[E<=420?1:0][1],1/he,c.mo2?ht[E<=420?1:0][0]:0),U=39*4,y(4,5,72,80),y(u?u[0]:0,u?u[1]:0,u?u[2]:0,R),y(yt,37.1,ca[0],ca[1]),U=38*4,y(0,0,0,St%64),Pt.fill(0),Ue.forEach((b,Pe)=>{Pt.set([b.a[0],b.a[1],b.a[2],b.t0],Pe*4),Pt.set([b.b[0],b.b[1],b.b[2],b.len],(4+Pe)*4),Pt.set([b.br,b.dur,0,0],(8+Pe)*4)})},ha=zt===1&&E>600,Lt=[];let Po=!1,ua=!1,va=0;const sn=new Uint8Array(4),un=new Float32Array(4),Ye=o=>{if(!Po)return;try{e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,sn)}catch{}const a=performance.now();Lt.length&&(Lt[Lt.length-1][1]+=a-va),va=a,o&&Lt.push([o,0])},da=()=>{Po=!!ha&&St>=30&&St<40,Ye("ter"),e.bindFramebuffer(e.FRAMEBUFFER,G.fb),e.viewport(0,0,E,E),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindBuffer(e.UNIFORM_BUFFER,c.ubo),e.bufferSubData(e.UNIFORM_BUFFER,0,lt),e.bindBufferBase(e.UNIFORM_BUFFER,0,c.ubo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,re),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,c.tD),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.bindBuffer(e.PIXEL_UNPACK_BUFFER,null),e.texSubImage2D(e.TEXTURE_2D,0,0,2,4,3,e.RGBA,e.FLOAT,Pt),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,2,e.RGBA,e.FLOAT,jt),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,na),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,null);const o=Ha(),a=Xa();e.bindFramebuffer(e.FRAMEBUFFER,G.fb),e.viewport(0,0,E,E),e.clearColor(0,0,0,1),e.clearDepth(1),e.depthMask(!0),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.disable(e.BLEND),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.useProgram(c.P.ter.p),e.bindVertexArray(c.vTer),e.bindBuffer(e.ARRAY_BUFFER,o.ter),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,16,0),Co&2||(e.drawElements(e.TRIANGLES,c.nTer,e.UNSIGNED_SHORT,0),e.useProgram(c.P.tin.p),e.drawElements(e.TRIANGLES,c.nTer,e.UNSIGNED_SHORT,0),e.useProgram(c.P.tes.p),e.drawElements(e.TRIANGLES,c.nTer,e.UNSIGNED_SHORT,0)),Ye("sky"),e.depthFunc(e.LEQUAL),e.depthMask(!1),e.useProgram(c.P.sky.p),e.bindVertexArray(c.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.depthFunc(e.LESS),e.depthMask(!0),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE_MINUS_SRC_ALPHA),Ye("obj"),e.useProgram(c.P.obj.p),e.bindVertexArray(c.vSt),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,a.t),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,c.tCb),e.bindBuffer(e.ARRAY_BUFFER,c.stB),e.bufferSubData(e.ARRAY_BUFFER,0,oa);for(let f=2,m=0;f>=0;f--){const u=Wa[f],R=Math.min(2,f+(E<=300?1:0));if(u){for(let N=0;N<5;N++)e.vertexAttribPointer(1+N,4,e.FLOAT,!1,80,m*80+N*16);e.drawElementsInstanced(e.TRIANGLES,c.lodCnt[R],e.UNSIGNED_SHORT,c.lodOff[R]*2,u)}m+=u}e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),Ye("grs"),e.useProgram(c.P.grs.p),e.bindVertexArray(c.vGrs),e.enableVertexAttribArray(3);const s=c.NSEC,n=Math.atan(Nt*1.42)+de/s*.5+4*_,i=S.off>.3||Math.abs(S.pitch)>1.1,x=f=>{if(f===0||i)return!0;let u=((f-.5)/s*de-Mt[3]-S.yaw)%de;return u>Math.PI&&(u-=de),u<-Math.PI&&(u+=de),Math.abs(u)<n};let h=-1;for(let f=0;f<=s+1;f++){const m=f<=s&&x(f);if(m&&h<0&&(h=f),!m&&h>=0){const u=c.bStart[h],R=c.bStart[f-1]+c.bCount[f-1];R>u&&(e.bindBuffer(e.ARRAY_BUFFER,c.gBuf),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,u*32),e.vertexAttribPointer(2,4,e.FLOAT,!1,32,u*32+16),e.bindBuffer(e.ARRAY_BUFFER,o.grs),e.vertexAttribPointer(3,2,e.FLOAT,!1,16,u*16),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,c.nGrsV,E<=300?Math.ceil((R-u)*.55):R-u)),h=-1}}if(Ye("spr"),e.depthMask(!1),e.useProgram(c.P.smk.p),e.bindVertexArray(c.vSmk),Co&4||e.drawArrays(e.TRIANGLE_STRIP,0,194),e.flush(),Ye("fin"),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,E,E),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!0),e.useProgram(c.P.fin.p),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,G.t),e.bindVertexArray(c.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),Po&&Ye(null),ha&&St===40&&!ua){ua=!0;const f={};for(const[m,u]of Lt)f[m]=(f[m]||0)+u/10;console.warn("584 gpu "+Object.entries(f).map(([m,u])=>m+" "+u.toFixed(3)).join(", "))}},rn=(o,a)=>{a=O(a||0,0,.25),St++;const s=t.input;if(s&&s.down){Z||(Z={x:s.x,y:s.y,t:o,lx:s.x,ly:s.y,mode:0});const i=s.x-Z.lx,x=s.y-Z.ly;if(Z.mode!==2&&Math.hypot(s.x-Z.x,s.y-Z.y)>.02&&(Z.mode=1),Z.mode===0&&o-Z.t>.4&&(Z.mode=2),Z.mode===1&&a>0){const h=Math.hypot(i,x)/a;if(h>.02){const f=Vt[0]*i+Math.sin(S.yaw)*-x,m=Vt[1]*i+Math.cos(S.yaw)*-x,u=Math.hypot(f,m)||1,R=Math.min(1,a*4);H.dx+=(f/u-H.dx)*R,H.dz+=(m/u-H.dz)*R;const N=Math.hypot(H.dx,H.dz)||1;H.dx/=N,H.dz/=N,H.g=Math.min(1.2,Math.max(H.g,h*.9))}}Zt=Z.mode===2?1:0,Z.lx=s.x,Z.ly=s.y}else Z&&(Ja=Z.mode),Z=null,Zt=0;for(s&&s.taps&&s.taps(),Qt=Math.min(io,Qt+a*(Zt?.09:.006)),o>fa&&(en(tn(),.3+W()*.7,o),fa=o+(Ze?W()<.3?1.5+W()*6:16+W()*55:25+W()*W()*120));Ue.length&&o-Ue[0].t0>Ue[0].dur*4+.5;)Ue.shift();if(Ao-=a,To-=a,Ao<0&&t.sound){const i=Ie+H.g*.9;t.sound.hit("noise",.015+.08*i,{cutoff:300+1100*i,dur:1.2}),Ao=.45+W()*.2}To<0&&t.sound&&(t.sound.hit("noise",.03+.03*ye,{cutoff:260+120*ye,dur:1.8}),To=.8+W()*.3);const n=on(o);for(Mo!==null&&n.k!==Mo&&t.sound&&(t.sound.hit("noise",.06+.1*n.A,{cutoff:420+380*n.A,dur:3.2}),t.sound.hit("kick",.08*n.A)),Mo=n.k,Ro+=a;Ro>=.05;)Ro-=.05,ia+=.05,nn(.05,ia);H.travel+=a*(1.6+4.5*(Ie+H.g*.9)),la(o),da()},cn=performance.now();return la(0),da(),zt&&(e.finish(),console.warn("584 first draw "+(performance.now()-cn).toFixed(0))),rn}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
