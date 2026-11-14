// Billiards: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/196.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(mo){mo&&function(){"use strict";const da="",po=new WeakMap,k0=Math.PI*2,o0=(a,t,z)=>a<t?t:a>z?z:a,P0=(a,t,z)=>a+(t-a)*z,B0=(a,t,z)=>{const y=o0((z-a)/(t-a),0,1);return y*y*(3-2*y)};function ae(a,t){const z=a.replace(/^0x/,"").padEnd(64,"0");let y=parseInt(z.slice(0,8),16)^t,L=parseInt(z.slice(8,16),16)^Math.imul(t,7919),W=parseInt(z.slice(16,24),16)^parseInt(z.slice(48,56),16),b0=parseInt(z.slice(24,32),16)^parseInt(z.slice(32,40),16)^parseInt(z.slice(56,64),16);const y0=()=>{y>>>=0,L>>>=0,W>>>=0,b0>>>=0;let A0=y+L|0;return y=L^L>>>9,L=W+(W<<3)|0,W=W<<21|W>>>11,b0=b0+1|0,A0=A0+b0|0,W=W+A0|0,(A0>>>0)/4294967296};for(let A0=0;A0<20;A0++)y0();return y0}const zt=(a,t)=>{let z=0;for(const L of t)z+=L[1];let y=a()*z;for(const L of t)if(y-=L[1],y<0)return L[0];return t[t.length-1][0]};function ba(a,t){const z=new Float32Array(16);for(let y=0;y<4;y++)for(let L=0;L<4;L++){let W=0;for(let b0=0;b0<4;b0++)W+=a[b0*4+L]*t[y*4+b0];z[y*4+L]=W}return z}function xa(a,t,z){const y=1/Math.tan(a/2),L=new Float32Array(16);return L[0]=y,L[5]=y,L[10]=(z+t)/(t-z),L[11]=-1,L[14]=2*z*t/(t-z),L}function ma(a,t){let z=a[0]-t[0],y=a[1]-t[1],L=a[2]-t[2],W=Math.hypot(z,y,L);z/=W,y/=W,L/=W;let b0=L,y0=-z;W=Math.hypot(b0,y0),b0/=W,y0/=W;const A0=y*y0,p0=L*b0-z*y0,E0=-y*b0;return{m:new Float32Array([b0,A0,z,0,0,p0,y,0,y0,E0,L,0,-(b0*a[0]+y0*a[2]),-(A0*a[0]+p0*a[1]+E0*a[2]),-(z*a[0]+y*a[1]+L*a[2]),1]),r:[b0,0,y0],u:[A0,p0,E0],f:[-z,-y,-L]}}const it=`#version 300 es
precision highp float; precision highp int;
layout(std140) uniform Scene { mat4 uVP; vec4 uE; vec4 uF; vec4 uR; vec4 uU; vec4 uLP; vec4 uLC; vec4 uLS; vec4 uCl; vec4 uT; vec4 uPk; vec4 uAmb; vec4 uRl; vec4 uRd; };
`,ne=`
vec4 enc(vec3 c, float d) { return vec4(min(c, vec3(60.0)), 1.0 / (1.0 + d)); }
`,pe=`
float beam(vec3 P) { vec3 d = uLP.xyz - P; return uLC.w > 1.5 ? 1.0 : 0.26 + 0.74 * smoothstep(uLS.x, uLS.y, d.y / length(d)); }
vec3 lampE(vec3 P, vec3 N) {
  vec3 d = uLP.xyz - P; float dd = dot(d, d); vec3 L = d * inversesqrt(dd);
  return uLC.rgb * max(dot(N, L), 0.0) / dd * (uLC.w > 1.5 ? 1.0 : 0.26 + 0.74 * smoothstep(uLS.x, uLS.y, L.y));
}
`,pa=`
// radiance of the lamp seen along ray P + t R; edge sets how crisp its outline is
vec3 lampRad(vec3 P, vec3 R, float edge) {
  if (R.y < 0.02) return vec3(0.0);
  float t = (uLP.y - P.y) / R.y;
  vec2 q = (P.xz + R.xz * t - uLP.xz) / uLP.w;
  float rr = length(q);
  vec3 col = vec3(0.0);
  if (uLC.w > 1.5) {
    // a bare bulb: a tiny hot glass globe with a brighter filament
    float g = 1.0 - smoothstep(0.34 - edge * 0.3, 0.34 + edge * 0.3, rr);
    float f = exp(-dot(q * vec2(1.0, 3.5), q * vec2(1.0, 3.5)) * 90.0);
    col = uLC.rgb * (g * 1.0 + f * 4.0) * 60.0 + uLC.rgb * 0.05 * exp(-rr * rr * 1.2);
  } else {
    // the shade's mouth: bright lining, hot under the bulb, with a dark socket ring and a lit lip
    float m = 1.0 - smoothstep(1.0 - edge, 1.0 + edge, rr);
    float hot = exp(-rr * rr * 22.0), ring = smoothstep(0.26, 0.29, rr) * (1.0 - smoothstep(0.35, 0.38, rr));
    vec3 lining = uLC.w < 0.5 ? vec3(1.0, 0.98, 0.86) : vec3(1.0, 0.86, 0.62);
    col = uLC.rgb * lining * (6.0 + 5.0 * (1.0 - rr * rr) + 44.0 * hot) * (1.0 - ring * 0.92) * m;
    if (uLC.w < 0.5) {
      // green glass glows outside the lip
      float o = (1.0 - smoothstep(1.0, 1.42, rr)) * (1.0 - m);
      col += vec3(0.04, 0.62, 0.20) * dot(uLC.rgb, vec3(0.33)) * o * 5.0;
    } else {
      float o = (1.0 - smoothstep(1.0, 1.24, rr)) * (1.0 - m);
      col += vec3(0.75, 0.48, 0.16) * dot(uLC.rgb, vec3(0.33)) * o * 1.6;
    }
  }
  return col;
}
`,ye=`#version 300 es
layout(location=0) in vec2 aP; out vec2 vU; void main() { vU = aP * 0.5 + 0.5; gl_Position = vec4(aP, 0.0, 1.0); }`,ya=`${it}${ne}
in vec2 vU; out vec4 o;
void main() {
  vec2 n = vU * 2.0 - 1.0;
  vec3 rd = normalize(uF.xyz + n.x * uR.xyz + n.y * uU.xyz);
  vec3 c = vec3(0.0009, 0.0008, 0.0007);
  // the wall a long way behind the table, a faint stain of light on it
  float tw = 4.2 / max(abs(rd.z), 0.05);
  vec3 W = uE.xyz + rd * tw;
  c += dot(uLC.rgb, vec3(0.33)) * vec3(0.0022, 0.0017, 0.0012) * exp(-dot((W - uLP.xyz).xy, (W - uLP.xyz).xy) * 0.32);
  float d = tw;
  // a little air in the lamp's light
  float g = max(dot(rd, normalize(uLP.xyz - uE.xyz)), 0.0);
  c += dot(uLC.rgb, vec3(0.33)) * vec3(1.0, 0.86, 0.66) * (0.0024 + uLS.w * 0.03) * (pow(g, 7.0) + 0.5 * pow(g, 120.0)) * smoothstep(-0.4, -0.05, rd.y);
  o = enc(c, d);
}`,yo=`${it}
layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec3 aG;
out vec3 vP; out vec3 vN; out vec3 vG;
void main() { vP = aP; vN = aN; vG = aG; gl_Position = uVP * vec4(aP, 1.0); }`,Ma=`${it}${ne}${pe}
uniform sampler2D uTile; uniform sampler2D uNoise; uniform sampler2D uMac; uniform sampler2D uChalk;
vec3 baize(vec3 P, vec3 N0, vec3 V, vec2 uv, float wall) {
  vec4 a = texture(uTile, uv * 7.1);
  vec4 b = texture(uTile, uv * vec2(19.0, 23.0) + 0.37);
  vec4 c = texture(uTile, uv * 1.9 + 0.11);
  float lo = texture(uNoise, uv * 0.53).r, lo2 = texture(uNoise, uv * 2.7 + 0.2).g;
  vec2 tuv = P.xz / (uT.xy + 0.1) * 0.5 + 0.5;
  vec4 M = texture(uMac, tuv);
  float wear = M.r * (1.0 - wall), chalk = texture(uChalk, tuv).r * (1.0 - wall);
  float flat_ = 1.0 - 0.55 * wear;
  vec2 s = ((a.xy - 0.5) * 1.2 + (b.xy - 0.5) * 1.2 + (c.xy - 0.5) * 0.2) * flat_;
  vec3 N = normalize(N0 + vec3(s.x, 0.0, s.y) * 1.2);
  float fibre = a.b * 0.38 + b.b * 0.52 + c.b * 0.10;
  vec3 alb = uCl.rgb * (0.35 + 1.5 * fibre * fibre) * (0.90 + 0.20 * lo) * (0.96 + 0.08 * lo2);
  // lighter flecks: a few strands catch more
  alb += uCl.rgb * 0.14 * smoothstep(0.55, 0.85, a.a * 0.0039 * b.b + 0.3 * c.b);
  // worn tracks: the nap thinned, paler, a little greyer
  alb = mix(alb, mix(alb, vec3(dot(alb, vec3(0.3, 0.6, 0.1))), 0.34) * 1.5 + uCl.rgb * 0.1, wear);
  alb *= 1.0 - 0.22 * M.b * (1.0 - wall);
  // chalk rubbed into the nap
  alb = mix(alb, vec3(0.13, 0.33, 0.78) * (0.55 + 0.9 * fibre), clamp(chalk * (0.45 + 1.1 * fibre), 0.0, 0.85));
  vec3 up = lampE(P, N);
  float nv = max(dot(N0, V), 0.0);
  vec3 L = normalize(uLP.xyz - P);
  // wool: fuzz catches light at grazing angles, more towards the lamp
  float fz = pow(1.0 - nv, 3.0), fw = pow(max(dot(L, -V) * 0.5 + 0.5, 0.0), 3.0);
  vec3 E0 = lampE(P, N0);
  vec3 col = alb * up * 0.3183 + alb * uAmb.rgb;
  col += (uCl.rgb * 0.8 + 0.035) * E0 * 0.3183 * fz * (0.16 + 1.5 * fw) * (0.42 + 1.15 * fibre);
  return col;
}

in vec3 vP; out vec4 o;
void main() {
  vec3 P = vP, V = uE.xyz - P; float d = length(V); V /= d;
  vec2 Q = abs(P.xz);
  float dh = 1.0;
  if (uT.w > 0.5) dh = min(length(Q - uPk.xy), length(Q - vec2(uPk.z, 0.0))) - uPk.w;
  vec3 col;
  if (dh < 0.0) {
    // down the hole: the ball-side wall catches a little light, the bottom is gone
    float k = clamp(-dh / uPk.w, 0.0, 1.0);
    col = vec3(0.020, 0.012, 0.007) * lampE(P, vec3(0.0, 1.0, 0.0)) * (1.0 - smoothstep(0.0, 0.34, k));
  } else {
    col = baize(P, vec3(0.0, 1.0, 0.0), V, P.xz, 0.0);
    // the cushions and rim close off the ambient, and the cloth rolls into the hole
    float e = min(uT.x - Q.x, uT.y - Q.y);
    col *= mix(0.55, 1.0, smoothstep(0.0, 0.05, e));
    if (uT.w > 0.5) col *= mix(0.22, 1.0, smoothstep(0.0, 0.011, dh));
  }
  o = enc(col, d);
}`,Aa=`${it}${ne}${pe}
uniform sampler2D uTile; uniform sampler2D uNoise;
in vec3 vP; in vec3 vN; in vec3 vG; out vec4 o;
void main() {
  vec3 P = vP, V = uE.xyz - P; float d = length(V); V /= d;
  vec3 N = normalize(vN);
  vec3 col;
  // standing proud of the bed, the cushions and rails catch what the shade spills outside its cone
  vec3 dL = uLP.xyz - P; float dLL = dot(dL, dL);
  float sp = uLC.w > 1.5 ? 1.0 : 1.0 + (2.6 + 1.2 * min(dLL, 3.0)) * (1.0 - smoothstep(uLS.x, uLS.y, dL.y * inversesqrt(dLL)));
  if (vG.z < 0.5) {
    // a cloth-covered cushion: the same baize pulled tight around the rubber
    vec4 ct = texture(uTile, (P.xz + vec2(P.y * 1.3)) * 6.3);
    vec3 Nc = normalize(N + vec3(ct.x - 0.5, ct.y - 0.5, ct.x - ct.y) * 0.6);
    col = uCl.rgb * (0.4 + 1.7 * ct.b * ct.b) * (lampE(P, Nc) * sp * 0.3183 + uAmb.rgb * 7.0 * max(N.y * 0.5 + 0.6, 0.0));
    col *= 0.45 + 0.55 * smoothstep(0.0, 0.016, P.y);
  } else {
    vec2 G = vG.xy, Gp = vec2(-G.y, G.x);
    float u = dot(P.xz, G), v = dot(P.xz, Gp);
    float n1 = texture(uNoise, vec2(u * 0.13, v * 1.7)).r, n2 = texture(uNoise, vec2(u * 0.47, v * 8.0)).g;
    float pore = texture(uNoise, vec2(u * 2.3, v * 57.0)).b;
    float gr = n1 * 0.62 + n2 * 0.38;
    gr = gr + 0.1 * sin((v + n1 * 0.05) * 240.0 + n2 * 6.0);
    vec3 alb = mix(uRd.rgb, uRl.rgb, smoothstep(0.26, 0.74, gr));
    alb *= 1.0 - 0.45 * smoothstep(0.66, 0.86, pore);
    float rough = uRl.w;
    vec2 Q = abs(P.xz);
    float mop = 0.0;
    if (Q.x > uT.x && Q.x > uT.x + (Q.y > uT.y ? 0.0 : 0.0)) {
      float k = uT.y / 4.0, z = abs(Q.y - floor(Q.y / k + 0.5) * k);
      mop = 1.0 - step(1.0, z / 0.0165 + abs(Q.x - uT.x - 0.058) / 0.0078);
      if (Q.y < k * 0.5 && uT.w > 0.5) mop = 0.0;
    }
    if (Q.y > uT.y) {
      float k = uT.x / 2.0, x = abs(Q.x - floor(Q.x / k + 0.5) * k);
      mop = max(mop, 1.0 - step(1.0, x / 0.0165 + abs(Q.y - uT.y - 0.058) / 0.0078));
    }
    float pn = texture(uNoise, P.xz * 2.6).g;
    if (mop > 0.5) {
      // mother of pearl: pale with a shifting tint
      vec3 tint = 0.5 + 0.5 * cos(pn * 9.0 + dot(V, vec3(5.0, 11.0, 7.0)) + vec3(0.0, 2.1, 4.2));
      alb = mix(vec3(0.86, 0.84, 0.78), tint, 0.28) * 3.0;
      rough = 0.5;
    }
    float dh = 1.0;
    if (uT.w > 0.5) dh = min(length(Q - uPk.xy), length(Q - vec2(uPk.z, 0.0))) - uPk.w;
    float leather = 1.0 - smoothstep(0.016, 0.018, dh);
    vec3 F0 = vec3(0.04);
    if (leather > 0.5) { alb = vec3(0.028, 0.016, 0.009) * (0.7 + 0.8 * pn); rough = 1.8; }
    vec3 Nn = normalize(N + vec3(Gp.x, 0.0, Gp.y) * (n2 - 0.5) * 0.012);
    vec3 R = reflect(-V, Nn);
    float nv = max(dot(Nn, V), 0.0);
    float F = 0.04 + 0.96 * pow(1.0 - nv, 5.0);
    col = alb * (lampE(P, Nn) * sp * 0.3183 + uAmb.rgb * 7.0);
    // a clear polish over the wood
    vec3 Hr = normalize(normalize(uLP.xyz - P) + V);
    vec3 refl = uLC.rgb * pow(max(dot(Nn, Hr), 0.0), 900.0 / max(rough, 0.3)) * 4.0 + vec3(0.003, 0.0025, 0.002) + dot(uLC.rgb, vec3(0.33)) * vec3(0.080, 0.062, 0.044) * (0.75 + 0.5 * n2);
    col = col * (1.0 - F) + refl * F * (leather > 0.5 ? 0.3 : 1.0);
    if (dh < 0.0) col = vec3(0.0005);
  }
  o = enc(col, d);
}`,Ea=`#version 300 es
precision highp float;
uniform sampler2D uNoise; uniform vec4 uK; uniform vec4 uB[6];
in vec2 vU; out vec4 o;
void main() {
  vec2 p = (vU * 2.0 - 1.0) * (uK.yz + 0.1);
  float n1 = texture(uNoise, p * 0.31 + 0.13).r, n2 = texture(uNoise, p * vec2(3.1, 0.7)).g, n3 = texture(uNoise, p * 1.3 + 0.4).b;
  float lane = exp(-p.x * p.x * 26.0) * 0.5 + exp(-(p.x + 0.26) * (p.x + 0.26) * 80.0) * 0.32 + exp(-(p.x - 0.31) * (p.x - 0.31) * 90.0) * 0.26;
  lane *= 0.45 + 0.9 * n2;
  float rimw = exp(-(uK.y - abs(p.x)) * 16.0) * 0.45 + exp(-(uK.z - abs(p.y)) * 16.0) * 0.45;
  float head = exp(-dot(p - vec2(0.0, uK.z * 0.5), p - vec2(0.0, uK.z * 0.5)) * 9.0) * 0.6 + exp(-dot(p + vec2(0.0, uK.z * 0.5), p + vec2(0.0, uK.z * 0.5)) * 7.0) * 0.8;
  float wear = (lane + rimw * n2 + head * (0.5 + 0.6 * n1)) * uK.x + (n1 - 0.5) * 0.09;
  float burn = 0.0;
  
  o = vec4(clamp(wear, 0.0, 1.0), burn, clamp((n1 + n3 - 1.0) * 1.2 * uK.x, 0.0, 1.0), 1.0);
}`,Ra=`#version 300 es
layout(location=0) in vec2 aP; uniform vec4 uS; uniform vec4 uM; uniform vec2 uA; out vec2 vL; out vec2 vW;
void main() {
  vL = aP; vec2 q = vec2(aP.x * uS.z, aP.y * uS.w);
  vec2 w = uS.xy + vec2(q.x * uA.x - q.y * uA.y, q.x * uA.y + q.y * uA.x);
  vW = w; gl_Position = vec4(w * uM.xy, 0.0, 1.0);
}`,Ta=`#version 300 es
precision highp float;
uniform sampler2D uNoise; uniform float uAmt; in vec2 vL; in vec2 vW; out vec4 o;
void main() {
  float n = texture(uNoise, vW * 3.7).r, m = texture(uNoise, vW * vec2(19.0, 23.0)).g;
  float a = exp(-dot(vL, vL) * 2.6) * smoothstep(0.32, 0.6, n * 0.5 + m * 0.5 + 0.1);
  o = vec4(a * uAmt);
}`,wa=`${it}
layout(location=0) in vec2 aP; layout(location=1) in vec4 aS;
out vec3 vP; flat out vec4 vS;
void main() {
  vec2 s = aS.xz - uLP.xz; float D = length(s); s = D > 1e-4 ? s / D : vec2(0.0, 1.0);
  float top = aS.y + aS.w, T = min(top * (D + aS.w) / max(uLP.y - top, 0.02), 1.3);
  float wd = aS.w * 1.9 + T * uLS.z * 0.75 / max(uLP.y, 0.1);
  float back = aS.w * 1.9, fwd = T + aS.w * 1.8 + wd * 0.4;
  float a = (aP.y * 0.5 + 0.5) * (back + fwd) - back;
  vec2 q = aS.xz + s * a + vec2(-s.y, s.x) * aP.x * wd;
  vP = vec3(q.x, 0.0, q.y); vS = aS;
  gl_Position = uVP * vec4(vP, 1.0);
}`,za=`${it}
in vec3 vP; flat in vec4 vS; out vec4 o;
void main() {
  if (abs(vP.x) > uT.x + 0.002 || abs(vP.z) > uT.y + 0.002) discard;
  vec3 dL = uLP.xyz - vP, dC = vS.xyz - vP;
  float lL = length(dL), lC = length(dC);
  float la = uLS.z / lL, ca = asin(min(vS.w / lC, 1.0));
  float g = acos(clamp(dot(dL, dC) / (lL * lC), -1.0, 1.0));
  float sh = (1.0 - smoothstep(abs(ca - la), ca + la + 0.002, g)) * min(1.0, ca * ca / (la * la));
  float ao = clamp(vS.w * vS.w * vS.y / (lC * lC * lC), 0.0, 1.0);
  float amb = smoothstep(0.0, 0.5, ao);
  o = vec4(vec3((1.0 - sh * 0.9) * (1.0 - ao * 0.82 - amb * 0.0)), 1.0);
}`,Ye=`layout(std140) uniform Balls { vec4 uB[96]; vec4 uCh[6]; vec4 uMisc; };
`,Mo=`${it}${Ye}
layout(location=0) in vec2 aP; layout(location=1) in vec3 aI;
out vec2 vN; flat out int vI; flat out float vT; flat out float vW;
void main() {
  int i = int(aI.x); vec4 b0 = uB[i * 6]; vec4 b1 = uB[i * 6 + 1];
  vec3 C = b0.xyz + b1.xyz * aI.y;
  float d = length(C - uE.xyz), k = b0.w * (1.12 + 0.6 * b0.w / max(d - b0.w, 0.01));
  vec3 Rv = normalize(uR.xyz), Uv = normalize(uU.xyz);
  vec4 p = uVP * vec4(C + (Rv * aP.x + Uv * aP.y) * k, 1.0);
  vN = p.xy / p.w; vI = i; vT = aI.y; vW = aI.z;
  gl_Position = p;
}`,Pa=`${it}${ne}${pe}${pa}${Ye}
uniform sampler2D uNoise; uniform sampler2D uTile;
in vec2 vN; flat in int vI; flat in float vT; flat in float vW;
out vec4 o;
vec3 qrot(vec4 q, vec3 v) { return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v); }
vec3 clothLit(vec2 xz) {
  vec3 d = uLP.xyz - vec3(xz.x, 0.0, xz.y); float dd = dot(d, d);
  return uCl.rgb * (uLC.rgb * d.y * inversesqrt(dd) / dd * smoothstep(uLS.x, uLS.y, d.y * inversesqrt(dd)) * 0.286 + uAmb.rgb);
}
void main() {
  vec4 b0 = uB[vI * 6], b1 = uB[vI * 6 + 1], q = uB[vI * 6 + 2], b3 = uB[vI * 6 + 3], b4 = uB[vI * 6 + 4], b5 = uB[vI * 6 + 5];
  vec3 C = b0.xyz + b1.xyz * vT; float Rb = b0.w;
  vec3 rd = normalize(uF.xyz + vN.x * uR.xyz + vN.y * uU.xyz);
  vec3 oc = uE.xyz - C;
  float bb = dot(oc, rd), perp2 = dot(oc, oc) - bb * bb, perp = sqrt(max(perp2, 0.0));
  float cov = clamp((Rb - perp) / (uE.w * max(-bb, 0.01)) + 0.5, 0.0, 1.0);
  if (cov <= 0.0) discard;
  float t = -bb - sqrt(max(Rb * Rb - perp2, 0.0));
  vec3 P = uE.xyz + rd * t, N = normalize(P - C);
  if (P.y < 0.0015) {
    // below the cloth: visible only through a pocket; at the cloth the nap stands in front of the ball
    float t0 = -uE.y / rd.y; vec2 Q = abs(uE.xz + rd.xz * t0);
    float dh = uT.w > 0.5 ? min(length(Q - uPk.xy), length(Q - vec2(uPk.z, 0.0))) - uPk.w : 1.0;
    if (dh > 0.0) { float n = textureLod(uTile, P.xz * 13.0, 0.0).b; cov *= smoothstep(0.0, 0.0012, P.y - n * 0.0012); if (cov <= 0.0) discard; }
  }
  // the pattern turns with the ball
  vec3 pw = N;
  float wa = length(b3.xyz) * abs(vT);
  if (wa > 1e-3) { vec3 ax = b3.xyz / length(b3.xyz); float a = -wa * sign(vT); pw = pw * cos(a) + cross(ax, pw) * sin(a) + ax * dot(ax, pw) * (1.0 - cos(a)); }
  vec3 p = qrot(vec4(-q.xyz, q.w), pw);
  float kind = b3.w;
  vec3 alb = b4.rgb;
  vec3 white = vec3(0.54, 0.53, 0.485) * mix(1.0, 0.86, b4.w);
  float aa = 1.8 * uE.w * max(-bb, 0.01) / Rb;
  if (kind > 0.5 && kind < 1.5) alb = mix(alb, white, smoothstep(0.50 - aa, 0.50 + aa, abs(p.y)));
  // the pale disc on two sides of every numbered ball (left blank)
  if (kind < 1.5 && uT.w > 0.5) alb = mix(alb, white, 1.0 - smoothstep(0.33 - aa, 0.33 + aa, sqrt(2.0 * max(1.0 - abs(p.x), 0.0))));
  vec4 nA = textureLod(uNoise, p.xz * 0.42 + p.y * 0.31 + b5.w, 0.0), nB = textureLod(uNoise, p.zy * 1.9 + p.x * 0.53 + b5.w, 0.0);
  // old balls: yellowed, faintly crazed
  if (b4.w > 0.01) {
    alb *= mix(vec3(1.0), vec3(1.0, 0.86, 0.62) * (0.8 + 0.42 * nA.r), b4.w);
    alb *= 1.0 - b4.w * 0.16 * smoothstep(0.82, 0.98, 1.0 - abs(nB.g - 0.5) * 14.0);
  }
  // a working ball has flecks and a slight scuff map (the flecks are what you see turn on a solid colour)
  float fleck = smoothstep(0.74, 0.86, nB.r * 0.6 + nA.g * 0.6);
  alb = mix(alb, white, fleck * 0.10);
  // chalk marks on the cue ball
  if (kind > 1.5) {
    float m = 0.0; int nm = int(uMisc.x); float ck = textureLod(uTile, p.xz * 1.3 + p.y * 0.7, 0.0).b;
    for (int i = 0; i < nm; i++) {
      float c = dot(p, uCh[i].xyz);
      // a rubbed smear, longer one way, powdery
      float al = dot(p, normalize(cross(uCh[i].xyz, vec3(0.31, 0.9, 0.3)) + 1e-5));
      float rr = sqrt(max(1.0 - c - 0.37 * al * al, 0.0)) * (1.0 + 0.9 * (nB.g - 0.5));
      m = max(m, uCh[i].w * (1.0 - smoothstep(0.01, 0.085, rr)) * (0.1 + 0.8 * ck * ck));
      m = max(m, uCh[i].w * 0.15 * (1.0 - smoothstep(0.03, 0.2, rr)) * smoothstep(0.25, 0.6, ck));
    }
    alb = mix(alb, vec3(0.17, 0.33, 0.62), clamp(m, 0.0, 0.68));
  }
  // lamp light, shadowed softly by the nearest balls
  vec3 Nf = normalize(N + (nA.rgb - 0.5) * 0.004);
  vec3 toL = uLP.xyz - P; float dL = length(toL); vec3 L = toL / dL;
  vec3 V = -rd;
  vec3 R = reflect(rd, Nf);
  float shadow = 1.0;
  vec3 env; float hitD = 1e5; vec3 hitC = vec3(0.0);
  int nn = int(uMisc.y);
  for (int j = 0; j < nn; j++) {
    int k = int(b5[j]);
    if (k != vI) {
    vec4 nb = uB[k * 6];
    vec3 oc2 = P - nb.xyz;
    // reflection ray against this ball
    float b2 = dot(oc2, R), h2 = b2 * b2 - dot(oc2, oc2) + nb.w * nb.w;
    if (h2 > 0.0) {
      float t2 = -b2 - sqrt(h2);
      if (t2 > 0.0 && t2 < hitD) {
        vec3 H = P + R * t2, Nh = normalize(H - nb.xyz);
        vec4 c4 = uB[k * 6 + 4];
        hitD = t2;
        hitC = c4.rgb * (uB[k * 6 + 3].w > 0.5 && uB[k * 6 + 3].w < 1.5 ? 0.7 : 1.0) * (lampE(H, Nh) * 0.3183 + uAmb.rgb);
      }
    }
    // shadow ray to the lamp: distance of this ball from the line, softened by the lamp's size
    float tl = dot(-oc2, L);
    if (tl > 0.0 && tl < dL) {
      float dd = sqrt(max(dot(oc2, oc2) - tl * tl, 0.0));
      shadow *= smoothstep(nb.w - uLS.z * tl / dL, nb.w + uLS.z * tl / dL + 0.0005, dd);
    }
    }
  }
    float ndl = max(dot(N, L), 0.0);
  vec3 E = uLC.rgb * pow(clamp((dot(N, L) + 0.30) / 1.30, 0.0, 1.0), 1.25) / (dL * dL) * beam(P) * shadow;
  vec3 below = clothLit(P.xz);
  float ao = smoothstep(-1.0, -0.2, N.y);
  vec3 col = alb * (E * 0.3183 + below * (0.5 - 0.5 * N.y) * 0.95 * mix(0.2, 1.0, ao) + uAmb.rgb * (0.4 + 0.6 * ao));
  // the mirror: lamp, room, rails, cloth, neighbours
  if (R.y < -0.002) {
    float tc = -P.y / R.y; vec2 xz = P.xz + R.xz * tc;
    vec2 Q = abs(xz) - uT.xy;
    if (max(Q.x, Q.y) < 0.0) {
      float ds = length(xz - C.xz);
      env = clothLit(xz) * mix(0.1, 1.0, smoothstep(0.0, Rb * 1.5, ds));
      float n = textureLod(uTile, xz * 13.0, 1.5 + 2.0 * min(tc * 3.0, 3.0)).b;
      env *= 0.75 + 0.5 * n;
    } else env = uRd.rgb * 2.0 * clothLit(P.xz);
  } else {
    // rails sit round the horizon; beyond them the dark room and the lamp
    float tx = (sign(R.x) * uT.x - P.x) / (abs(R.x) < 1e-4 ? 1e-4 : R.x), tz = (sign(R.z) * uT.y - P.z) / (abs(R.z) < 1e-4 ? 1e-4 : R.z);
    float tr = max(min(tx, tz), 0.0), yr = P.y + R.y * tr;
    vec3 Hr = P + R * tr;
    env = vec3(0.0022, 0.0019, 0.0016) + dot(uLC.rgb, vec3(0.33)) * vec3(0.0012, 0.0009, 0.0007) * (0.35 + 0.65 * max(R.y, 0.0));
    if (yr < 0.046) env = (yr < 0.036 ? uCl.rgb : uRl.rgb * 0.7) * clothLit(Hr.xz) * 2.5;
    env += lampRad(P, R, 0.012 + b4.w * 0.09) * b1.w;
  }
  if (hitD < 1e4) env = hitC;
  float nv = max(dot(Nf, V), 0.0), F = min(0.045 + 0.955 * pow(1.0 - nv, 5.0), 0.62);
  // micro scratches: a low soft bloom round the lamp's reflection
  vec3 Hv = normalize(L + V);
  float nh = max(dot(Nf, Hv), 0.0);
  float rg = mix(1.0, 3.0, b4.w);
  vec3 hz = uLC.rgb * ndl / (dL * dL) * beam(P) * shadow * (pow(nh, 1400.0 / rg) * 0.05 * b1.w + pow(nh, 110.0 / rg) * 0.008) * (0.75 + 0.5 * nA.g);
  col = col * (1.0 - F) + env * F + hz;
  o = vec4(col * cov * vW, cov * vW);
  vec4 cp = uVP * vec4(P, 1.0);
  gl_FragDepth = cp.z / cp.w * 0.5 + 0.5;
}`,Na=`${it}${Ye}
in vec2 vN; flat in int vI; out vec4 o;
void main() {
  vec4 b0 = uB[vI * 6];
  vec3 rd = normalize(uF.xyz + vN.x * uR.xyz + vN.y * uU.xyz), oc = uE.xyz - b0.xyz;
  float bb = dot(oc, rd), perp2 = dot(oc, oc) - bb * bb;
  if (perp2 > b0.w * b0.w) discard;
  float t = -bb - sqrt(b0.w * b0.w - perp2);
  vec3 P = uE.xyz + rd * t;
  vec4 cp = uVP * vec4(P, 1.0);
  gl_FragDepth = cp.z / cp.w * 0.5 + 0.5 - 2e-6;
  o = vec4(0.0, 0.0, 0.0, 1.0 / (1.0 + t));
}`,Fa=`${it}
layout(location=0) in vec3 aC; uniform vec4 uCu[2];
out vec3 vP; out vec3 vN; out float vS; out float vA;
void main() {
  float s = aC.x, ca = aC.y, sa = aC.z;
  vec3 d = uCu[1].xyz, x = normalize(cross(d, vec3(0.0, 1.0, 0.0))), y = cross(x, d);
  float r = s <= 0.0 ? 0.0 : mix(0.0058, 0.0148, smoothstep(0.0, 1.4, s) * 0.55 + clamp(s / 1.45, 0.0, 1.0) * 0.45);
  r *= 1.0 - 0.3 * smoothstep(1.43, 1.45, s);
  vec3 N = x * ca + y * sa;
  vec3 C = uCu[0].xyz + d * s; vS = s;
  if (uCu[0].w > 0.5) {
    // the aim's chalk line: the same lathe laid on the cloth, uCu[1].w long, 1.2 mm wide near, never under about a pixel and a half
    C = uCu[0].xyz + d * (s / 1.45 * uCu[1].w); r = max(0.0006, length(C - uE.xyz) * uE.w * 0.9); C.y = r; vS = -1.0 - s / 1.45;
  }
  vP = C + N * r; vN = N; vA = atan(sa, ca);
  gl_Position = uVP * vec4(vP, 1.0);
}`,_a=`${it}${ne}${pe}
uniform sampler2D uNoise;
in vec3 vP; in vec3 vN; in float vS; in float vA; out vec4 o;
void main() {
  vec3 V = uE.xyz - vP; float d = length(V); V /= d;
  vec3 N = normalize(vN);
  float s = vS;
  if (s < -0.5) {
    // the chalk line, added over the cloth: pale, about a quarter brighter than the cloth it lies on, soft across, fading
    // over its last tenth
    float nv = max(dot(N, V), 0.0), u = -1.0 - s;
    float lc = dot(uCl.rgb * (lampE(vec3(vP.x, 0.0, vP.z), vec3(0.0, 1.0, 0.0)) * 0.3183 + uAmb.rgb), vec3(0.3, 0.6, 0.1));
    o = vec4(vec3(0.92, 0.96, 1.0) * (lc * 5.0 * nv * nv * (1.0 - smoothstep(0.9, 1.0, u))), 0.0);
    return;
  }
  float g = texture(uNoise, vec2(s * 0.7, vA * 0.45)).r, g2 = texture(uNoise, vec2(s * 3.3, vA * 1.9)).g;
  vec3 alb = mix(vec3(0.62, 0.43, 0.22), vec3(0.82, 0.62, 0.36), g * 0.6 + g2 * 0.4);
  float gloss = 1.0;
  if (s < 0.012) { alb = vec3(0.06, 0.2, 0.62) * (0.7 + 0.6 * g2); gloss = 0.0; }
  else if (s < 0.036) alb = vec3(0.84, 0.81, 0.72);
  else if (s > 0.88) {
    alb = s < 1.12 ? vec3(0.018, 0.012, 0.01) * (0.8 + 0.8 * g2) : vec3(0.05, 0.022, 0.012) * (0.6 + 0.9 * g);
    float pts = sin(vA * 4.0) * 0.5 + 0.5;
    if (s > 1.12 && s < 1.13) alb = vec3(0.7, 0.62, 0.42);
    gloss = s < 1.12 ? 0.25 : 1.0;
    alb *= 0.8 + 0.4 * pts;
  } else if (s > 0.64) {
    float pts = abs(fract(vA / 6.2832 * 4.0) - 0.5) * 2.0;
    alb = mix(alb, vec3(0.032, 0.012, 0.008) * (0.7 + 0.9 * g), step(pts * 0.24, s - 0.64));
  }
  vec3 R = reflect(-V, N);
  float nv = max(dot(N, V), 0.0), F = 0.04 + 0.96 * pow(1.0 - nv, 5.0);
  vec3 col = alb * (lampE(vP, N) * 0.3183 + uAmb.rgb + uCl.rgb * lampE(vec3(vP.x, 0.0, vP.z), vec3(0.0, 1.0, 0.0)) * 0.3183 * (0.5 - 0.5 * N.y));
  col = col * (1.0 - F) + (uLC.rgb * pow(max(dot(N, normalize(normalize(uLP.xyz - vP) + V)), 0.0), 400.0) * 5.0 + vec3(0.002)) * F * gloss;
  o = enc(col, d);
}`,La=`#version 300 es
precision highp float;
precision highp int; precision highp sampler2D;
uniform sampler2D uC; uniform sampler2D uTl; uniform int uTn; uniform vec4 uD; uniform vec4 uG; uniform vec3 uH;
in vec2 vU; out vec4 o;
float cocOf(float a) { float d = 1.0 / max(a, 0.004) - 1.0; return clamp((d - uG.w) / d * uD.w, -uD.z, uD.z); }
void main() {
  vec4 c0 = texture(uC, vU);
  float k0 = cocOf(c0.a);
  vec3 acc = c0.rgb; float ws = 1.0;
  // taps past the widest blur that can reach this pixel weigh nothing: stop before them
  vec2 mm = texelFetch(uTl, min(ivec2(gl_FragCoord.xy) >> 3, ivec2(max(uTn, 0))), 0).rg;
  float M = uTn < 0 ? 1e4 : max(abs(cocOf(mm.x)), abs(cocOf(mm.y))) + 0.2;
  if (!(M < 1e4)) M = 1e4;
  float qT = (M + 1.0) / uD.z;
  int N = min(int(uG.z), int(ceil(uG.z * qT * qT - 0.5)));
  float j = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) * 6.2832;
  for (int i = 0; i < N; i++) {
    float fi = float(i) + 0.5, r = sqrt(fi / uG.z) * uD.z, a = fi * 2.39996 + j;
    vec4 s = textureLod(uC, vU + vec2(cos(a), sin(a)) * r * uD.xy, 0.0);
    float ks = cocOf(s.a);
    float w = clamp(abs(ks) - r + 1.0, 0.0, 1.0);
    if (ks > k0 + 0.5) w *= clamp(abs(k0) - r + 1.0, 0.0, 1.0);
    float wk = w / (1.0 + 0.1 * max(s.r, max(s.g, s.b))); acc += s.rgb * wk; ws += wk;
  }
  vec3 col = acc / ws;
  float dv = 1.0 / max(c0.a, 0.01) - 1.0;
  col = (col + uH * (1.0 - exp(-dv * 0.9)) * (1.0 - smoothstep(2.6, 3.8, dv))) * uG.x;
  vec2 q = vU - 0.5;
  col *= 1.0 - dot(q, q) * 0.16;
  col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy + 17.0, vec2(0.06711056, 0.00583715))));
  col += (n - 0.5) * uG.y;
  o = vec4(col, 1.0);
}`,Da=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
uniform sampler2D uC; uniform ivec4 uK; out vec4 o;
void main() {
  ivec2 b = ivec2(gl_FragCoord.xy) * uK.x;
  float lo = 1e9, hi = -1e9;
  for (int y = uK.y; y <= uK.z; y++) for (int x = uK.y; x <= uK.z; x++) {
    vec4 s = texelFetch(uC, clamp(b + ivec2(x, y), ivec2(0), ivec2(uK.w)), 0);
    vec2 v = uK.x > 1 ? s.aa : s.rg;
    lo = min(lo, v.x); hi = max(hi, v.y);
  }
  o = vec4(lo, hi, 0.0, 1.0);
}`,Sa=`#version 300 es
layout(location=0) in vec2 aP; layout(location=1) in vec4 aB; layout(location=2) in vec3 aC;
out vec2 vL; flat out vec3 vC;
void main() { vL = aP; vC = aC * aB.w; gl_Position = vec4(aB.xy + aP * aB.z * 1.06, 0.0, 1.0); }`,ka=`#version 300 es
precision highp float;
in vec2 vL; flat in vec3 vC; out vec4 o;
void main() {
  float r = length(vL) * 1.06;
  float a = 1.0 - smoothstep(0.86, 1.0, r);
  a *= 0.8 + 0.2 * smoothstep(0.5, 0.92, r);
  o = vec4(vC * a, 1.0);
}`;function Ba(a){const t={},z=(Y,B)=>{const Z=a.createShader(Y);return a.shaderSource(Z,B+da),a.compileShader(Z),Z},y={room:[ye,ya],cloth:[yo,Ma],rail:[yo,Aa],macro:[ye,Ea],stamp:[Ra,Ta],shadow:[wa,za],ball:[Mo,Pa],balla:[Mo,Na],cue:[Fa,_a],dof:[ye,La],bokeh:[Sa,ka]},L=[],W={};for(const Y in y){const[B,Z]=y[Y],S=a.createProgram();W[B]||(W[B]=z(a.VERTEX_SHADER,B));const x0=z(a.FRAGMENT_SHADER,Z);a.attachShader(S,W[B]),a.attachShader(S,x0),L.push([Y,S,x0])}for(const Y of L)a.linkProgram(Y[1]);a.flush(),t.P={};const b0=()=>{for(const[Y,B,Z]of L){a.getProgramParameter(B,a.LINK_STATUS)||console.error("196 "+Y+": "+a.getProgramInfoLog(B)+" "+a.getShaderInfoLog(Z));const S={},x0=a.getProgramParameter(B,a.ACTIVE_UNIFORMS);for(let N=0;N<x0;N++){const U=a.getActiveUniform(B,N);if(U.name.indexOf(".")<0){const T=a.getUniformLocation(B,U.name);T&&(S[U.name.replace("[0]","")]=T)}}t.P[Y]={p:B,u:S};const h0=a.getUniformBlockIndex(B,"Scene");h0!==a.INVALID_INDEX&&a.uniformBlockBinding(B,h0,0);const c0=a.getUniformBlockIndex(B,"Balls");c0!==a.INVALID_INDEX&&a.uniformBlockBinding(B,c0,1)}};t.HALF=!!a.getExtension("EXT_color_buffer_float")||!!a.getExtension("EXT_color_buffer_half_float");const y0=a.getExtension("EXT_texture_filter_anisotropic");let A0=2654435769;const p0=()=>(A0^=A0<<13,A0^=A0>>>17,A0^=A0<<5,(A0>>>0)/4294967296);{const Z=new Float32Array(262144);for(let U=0;U<12e3;U++){let T=p0()*512,R0=p0()*512,m0=1.5708+(p0()+p0()+p0()-1.5)*1.15,C=(p0()-.5)*.28;const g=6+(p0()*p0()*20|0),b=.55+p0()*.85;for(let Q=0;Q<g;Q++){const O0=T&511,_0=R0&511;Z[_0*512+O0]+=b,T+=Math.cos(m0)*1.05,R0+=Math.sin(m0)*1.05,m0+=C}}for(let U=0;U<1300;U++){const T=p0()*512|0,R0=p0()*512|0,m0=2+(p0()*3|0),C=.26*p0();for(let g=-m0;g<=m0;g++)for(let b=-m0;b<=m0;b++)b*b+g*g<=m0*m0&&(Z[(R0+g&511)*512+(T+b&511)]+=C)}let S=0;for(let U=0;U<Z.length;U++)S+=Z[U];const x0=S/(512*512),h0=.5/(x0*2.2),c0=new Uint8Array(512*512*4),N=Z;for(let U=0;U<512;U++)for(let T=0;T<512;T++){const R0=(U*512+T)*4,m0=N[U*512+T],C=N[U*512+(T+1&511)]-N[U*512+(T-1&511)],g=N[(U+1&511)*512+T]-N[(U-1&511)*512+T];c0[R0]=128+110*Math.tanh(C*h0*.42),c0[R0+1]=128+110*Math.tanh(g*h0*.42),c0[R0+2]=255*(1-Math.exp(-(m0*.6+(N[U*512+(T+1&511)]+N[(U+1&511)*512+T])*.2)*h0*1.9)),c0[R0+3]=T*37+U*101+(T*U>>3)&255}t.tile=a.createTexture(),a.bindTexture(a.TEXTURE_2D,t.tile),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,512,512,0,a.RGBA,a.UNSIGNED_BYTE,c0),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.REPEAT),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.REPEAT),y0&&a.texParameterf(a.TEXTURE_2D,y0.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(12,a.getParameter(y0.MAX_TEXTURE_MAX_ANISOTROPY_EXT)))}{const Z=new Float32Array(16384);for(const[N,U]of[[8,1],[16,.5],[32,.25]]){const T=new Float32Array(N*N);for(let m0=0;m0<T.length;m0++)T[m0]=p0();const R0=N/128;for(let m0=0;m0<128;m0++){const C=m0*R0,g=C|0,b=C-g,Q=b*b*(3-2*b),O0=g%N,_0=(g+1)%N;for(let U0=0;U0<128;U0++){const D=U0*R0,M=D|0,K=D-M,R=K*K*(3-2*K),v0=M%N,r0=(M+1)%N,i0=T[O0*N+v0],V0=T[O0*N+r0],g0=T[_0*N+v0],X0=T[_0*N+r0];Z[m0*128+U0]+=U*(i0+(V0-i0)*R+(g0-i0)*Q+(i0-V0-g0+X0)*R*Q)}}}let S=1e9,x0=-1e9;for(let N=0;N<Z.length;N++)Z[N]<S&&(S=Z[N]),Z[N]>x0&&(x0=Z[N]);const h0=255/(x0-S),c0=new Uint8Array(128*128*4);for(let N=0;N<128;N++)for(let U=0;U<128;U++){const T=(N*128+U)*4;c0[T]=(Z[N*128+U]-S)*h0,c0[T+1]=(Z[(N+61&127)*128+(U+41&127)]-S)*h0,c0[T+2]=(Z[(128-N+31&127)*128+(U+93&127)]-S)*h0*.6+p0()*102,c0[T+3]=p0()*255}t.noise=a.createTexture(),a.bindTexture(a.TEXTURE_2D,t.noise),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,128,128,0,a.RGBA,a.UNSIGNED_BYTE,c0),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.REPEAT),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.REPEAT),y0&&a.texParameterf(a.TEXTURE_2D,y0.TEXTURE_MAX_ANISOTROPY_EXT,4)}b0(),t.vao=a.createVertexArray(),a.bindVertexArray(t.vao),t.qb=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,t.qb),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,2,a.FLOAT,!1,0,0);{const Y=[0,4e-4,.012,.0125,.036,.04,.3,.64,.88,1.12,1.13,1.43,1.45],B=12,Z=[],S=[];for(const c0 of Y)for(let N=0;N<B;N++)Z.push(c0,Math.cos(N/B*k0),Math.sin(N/B*k0));for(let c0=0;c0<Y.length-1;c0++)for(let N=0;N<B;N++){const U=(N+1)%B,T=c0*B;S.push(T+N,T+U,T+B+N,T+U,T+B+U,T+B+N)}t.cueVao=a.createVertexArray(),a.bindVertexArray(t.cueVao);const x0=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,x0),a.bufferData(a.ARRAY_BUFFER,new Float32Array(Z),a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,3,a.FLOAT,!1,0,0);const h0=a.createBuffer();a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,h0),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array(S),a.STATIC_DRAW),t.cueN=S.length}a.bindVertexArray(null);const E0=(Y,B)=>{const Z=t.P[Y];a.useProgram(Z.p);for(const S in B)Z.u[S]&&a.uniform1i(Z.u[S],B[S])};E0("room",{});const T0={uTile:0,uNoise:1,uMac:2,uChalk:3};return E0("cloth",T0),E0("rail",T0),E0("ball",{uTile:0,uNoise:1}),E0("cue",{uNoise:1}),E0("macro",{uNoise:1}),E0("stamp",{uNoise:1}),E0("dof",{uC:0,uTl:1}),t.buildTile=()=>{const Y=a.createProgram(),B=z(a.FRAGMENT_SHADER,Da);return a.attachShader(Y,W[ye]),a.attachShader(Y,B),a.linkProgram(Y),a.flush(),[Y,B]},t.rts={},t.meshes={},t}function Me(a,t,z,y){const L=a.createTexture();a.bindTexture(a.TEXTURE_2D,L),t.HALF?a.texStorage2D(a.TEXTURE_2D,1,a.RGBA16F,z,z):a.texStorage2D(a.TEXTURE_2D,1,a.RGBA8,z,z),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);const W=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,W),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,L,0),y&&a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,y),{tex:L,fb:W}}function Ua(a,t,z){const y=[];if(!z)return y.push([-a,-t,a,-t,0,1],[a,-t,a,t,-1,0],[a,t,-a,t,0,-1],[-a,t,-a,-t,1,0]),{seg:y,cx:0,cz:0,sx:0,hole:0};const L=.104,W=.07,b0=.058,y0=a+.012,A0=t+.012,p0=a+.04,E0=.042,T0=.03,Y=(S,x0,h0,c0)=>{const N=h0-S,U=c0-x0,T=Math.hypot(N,U);y.push([S,x0,h0,c0,-U/T,N/T])};for(const S of[1,-1]){for(const h0 of[1,-1]){const c0=(U,T)=>[h0*U,S*T],N=[[a+T0,W-T0+.012],[a,W],[a,t-L],[a+E0,t-L+E0]];for(let U=0;U<3;U++){const T=c0(...N[U]),R0=c0(...N[U+1]);h0*S>0?Y(T[0],T[1],R0[0],R0[1]):Y(R0[0],R0[1],T[0],T[1])}}const x0=[[-a+L-E0,t+E0],[-a+L,t],[a-L,t],[a-L+E0,t+E0]];for(let h0=0;h0<3;h0++){const c0=[x0[h0][0],S*x0[h0][1]],N=[x0[h0+1][0],S*x0[h0+1][1]];S>0?Y(N[0],N[1],c0[0],c0[1]):Y(c0[0],c0[1],N[0],N[1])}}for(const S of y){const x0=(S[0]+S[2])/2,h0=(S[1]+S[3])/2;S[4]*x0+S[5]*h0>0&&(S[4]=-S[4],S[5]=-S[5])}const B=(S,x0,h0,c0,N)=>{const U=N[0][0]-S,T=N[0][1]-x0,R0=(U*h0+T*c0)/Math.hypot(U,T),m0=[];for(const[C,g]of N){const b=Math.hypot(C-S,g-x0),Q=S+(C-S)/b*b0,O0=x0+(g-x0)/b*b0;let _0=-(O0-g),U0=Q-C;const D=Math.hypot(_0,U0);_0/=D,U0/=D,_0*(S+h0*b0-C)+U0*(x0+c0*b0-g)<0&&(_0=-_0,U0=-U0),m0.push([C,g,Q,O0,_0,U0])}return{ox:S,oz:x0,mx:h0,mz:c0,cth:R0,segs:m0}},Z=[B(y0,A0,-Math.SQRT1_2,-Math.SQRT1_2,[[a+E0,t-L+E0],[a-L+E0,t+E0]]),B(p0,0,-1,0,[[a+T0,W-T0+.012]])];return{seg:y,cx:y0,cz:A0,sx:p0,hole:b0,pw:Z}}function ga(a,t,z,y,L){const W=[],b0=[];let y0=0;const A0=.0366,p0=.0445,E0=.046,T0=[[.016,0,-.97,.05],[.0045,.022,-.86,-.25],[0,A0-.003,-1,-.05],[.0012,A0+.002,-.75,.66],[.016,p0-.001,-.14,.99],[.035,p0,-.03,1]];for(const m0 of L.seg){const[C,g,b,Q,O0,_0]=m0,U0=y0;for(const D of T0)for(const M of[[C,g],[b,Q]])W.push(M[0]-O0*D[0],D[1],M[1]-_0*D[0],O0*-D[2],D[3],_0*-D[2],0,0,0),y0++;for(let D=0;D<T0.length-1;D++){const M=U0+D*2;b0.push(M,M+1,M+2,M+1,M+3,M+2)}}const Y=.16,B=.033,Z=E0,S=(m0,C,g,b,Q,O0,_0,U0,D,M)=>{const K=y0;W.push(m0,Z,C,0,1,0,D,M,1,g,Z,b,0,1,0,D,M,1,Q,Z,O0,0,1,0,D,M,1,_0,Z,U0,0,1,0,D,M,1),y0+=4,b0.push(K,K+1,K+2,K+1,K+3,K+2)};S(z+B,-y-Y,z+Y,-y-Y,z+B,y+Y,z+Y,y+Y,0,1),S(-z-Y,-y-Y,-z-B,-y-Y,-z-Y,y+Y,-z-B,y+Y,0,1),S(-z-B,y+B,z+B,y+B,-z-B,y+Y,z+B,y+Y,1,0),S(-z-B,-y-Y,z+B,-y-Y,-z-B,-y-B,z+B,-y-B,1,0);const x0=a.createVertexArray();a.bindVertexArray(x0);const h0=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,h0),a.bufferData(a.ARRAY_BUFFER,new Float32Array(W),a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,3,a.FLOAT,!1,36,0),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,3,a.FLOAT,!1,36,12),a.enableVertexAttribArray(2),a.vertexAttribPointer(2,3,a.FLOAT,!1,36,24);const c0=a.createBuffer();a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,c0),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array(b0),a.STATIC_DRAW);const N=a.createVertexArray();a.bindVertexArray(N);const U=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,U);const T=z+.1,R0=y+.1;return a.bufferData(a.ARRAY_BUFFER,new Float32Array([-T,0,-R0,T,0,-R0,-T,0,R0,T,0,R0]),a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,3,a.FLOAT,!1,12,0),a.bindVertexArray(null),{vao:x0,n:b0.length,cvao:N}}mo.add({num:196,name:"Billiards",fam:"Worlds",gl:!0,music:!0,fps:30,seed:0,recipe:"A billiards table under one low lamp, with real spin. The cloth, the balls and where the camera stands change every mint. Drag out from the cue ball to aim and let go to shoot (further is harder, back to the ball cancels), press on the ball up close to set the spin, tap to move the camera, or hold while they roll to slow time.",interactive:"Drag out from the cue ball to aim and release to shoot: the cue lies under the pointer and a faint chalk line runs to the first ball it meets; the farther you pull, the harder the shot, bringing the stick back to the ball cancels, and a press farther behind the ball gives a finer aim. Seen close, where you press on the ball sets the spin, and its top edge gives a tall stick and a massé curve. Tap to move the camera; hold while the balls roll to slow time and move in on the cue ball.",make(a){const t=a.gl,z=a.size;let y=po.get(t);y||(y=Ba(t),po.set(t,y));const L=ae(a.hash,196),W=o=>ae(a.hash,19700+o*131);let b0=zt(W(1),[["green",56],["blue",32],["burgundy",12]]),y0=zt(W(2),[["full set",68],["old ivory",22],["three-ball carom",10]]),A0=zt(W(3),[["mahogany",52],["walnut",36],["ebony",12]]),p0=zt(W(4),[["green glass shade",52],["brass",36],["single bare bulb",12]]),E0=zt(W(5),[["pristine",50],["worn",50]]),T0=zt(W(6),[["fresh rack",34],["mid-frame",46],["last few",20]]),Y=zt(W(7),[["clear",74],["smoke",26]]);a.home&&(b0="green",y0="full set",A0="mahogany",p0="green glass shade",E0="worn",T0="mid-frame",Y="clear");const B="",Z=-1,S=W(9),x0=S(),h0=S(),c0=S(),N=S();!a.home&&y0!=="three-ball carom"&&(B==="the break"||!B&&x0<.24)&&(T0="the break"),a.trait("Cloth",b0),a.trait("Balls",y0),a.trait("Rail",A0),a.trait("Lamp",p0),a.trait("Table",E0),a.trait("Play",T0),a.trait("Air",Y);let U=a.home?0:zt(W(8),[[0,40],[1,25],[2,22],[4,13]]);const T=y0==="three-ball carom",R0=y0==="old ivory",m0=E0!=="pristine",C=T?.71:.635,g=T?1.42:1.27,b=T?.0307:.02858,Q=Ua(C,g,!T),O0=T?"c":"p";y.meshes[O0]||(y.meshes[O0]=ga(t,y,C,g,Q));const _0=y.meshes[O0],U0={yellow:[.8,.5,.03],blue:[.015,.07,.42],red:[.58,.022,.022],purple:[.13,.03,.3],orange:[.78,.2,.018],green:[.012,.25,.07],maroon:[.26,.022,.03],black:[.01,.01,.012],white:[.54,.53,.485]},D=T?3:16,M=new Float64Array(D),K=new Float64Array(D),R=new Float64Array(D),v0=new Float64Array(D),r0=new Float64Array(D),i0=new Float64Array(D),V0=new Float64Array(D),g0=new Float64Array(D),X0=new Float64Array(D),kt=new Float64Array(D),Bt=new Float64Array(D),Ut=new Float64Array(D),gt=new Float64Array(D),l0=new Uint8Array(D),mt=new Uint8Array(D),re=new Uint8Array(D),Ae=new Float32Array(D),W0=new Float32Array(D*4),Ao=new Float32Array(D),Eo=R0?.85:0;{if(Ae[0]=2,W0.set(U0.white,0),W0[3]=Eo*.8,T){const o=[[.84,.7,.3],[.56,.02,.02]];for(let r=1;r<3;r++)Ae[r]=0,W0.set(o[r-1],r*4),W0[r*4+3]=0}else{const o=["yellow","blue","red","purple","orange","green","maroon","black"];for(let r=1;r<16;r++){const e=r<=8?o[r-1]:o[r-9];W0.set(U0[e],r*4),Ae[r]=r<=8?0:1,R0&&(W0[r*4]*=.75*1,W0[r*4+1]*=.75*.86,W0[r*4+2]*=.75*.62,W0[r*4+3]=Eo)}}for(let o=0;o<D;o++)Ao[o]=L()}const Ca=(o,r)=>{let e=r()*k0,n=r()*k0,s=r(),l=Math.sqrt(1-s),h=Math.sqrt(s);gt[o]=Math.cos(e)*h,kt[o]=Math.sin(e)*h,Bt[o]=Math.sin(n)*l,Ut[o]=Math.cos(n)*l},vt=(o,r,e)=>{M[o]=r,R[o]=e,K[o]=b,v0[o]=r0[o]=i0[o]=V0[o]=g0[o]=X0[o]=0,l0[o]=1,mt[o]=0,re[o]=0},dt=ae(a.hash,19601),mn=(o,r,e,n)=>{for(let s=0;s<e;s++)if(l0[s]&&Math.hypot(M[s]-o,R[s]-r)<2*b+n)return!1;return!0};let G0=!a.home&&L()<.3?3:0,lt=a.home?.16:G0===3?(L()<.5?-1:1)*(C-.17):(L()-.5)*.34,bt=a.home?.1:g*.26+L()*.2-.3;T0==="the break"&&(lt=(c0-.5)*.5,bt=g*.5),T&&U===4&&(U=2),G0===0&&(G0=U),!a.home&&!T&&(Z>=0?Z===5:h0<(T0==="the break"?.72:T0==="last few"?.4:.16))&&(G0=5),!a.home&&Z>=0&&Z!==5&&(G0=Z),!a.home&&Z<0&&T0==="last few"&&G0===1&&(G0=5),T0==="the break"&&!a.home&&!T&&(G0=5),a.trait("View",["behind the cue ball","low across the cloth","from among the balls","down the rail","high over the balls","over the whole table"][G0]);function Ro(){for(let n=0;n<D;n++)l0[n]=0,Ca(n,dt);if(vt(0,lt,bt),T){vt(1,lt-.2+dt()*.1,bt-.46-dt()*.18),vt(2,lt+.14+dt()*.14,bt-.72-dt()*.24);return}const o=[];for(let n=1;n<16;n++)n!==8&&o.push(n);for(let n=o.length-1;n>0;n--){const s=dt()*(n+1)|0,l=o[n];o[n]=o[s],o[s]=l}const r=lt*.2-.02,e=-.42-L()*.02;if(a.home){const l=[[5,0,0],[10,.0575,.012],[2,.035,-.054],[1,-.082,-.062],[14,.135,-.112],[3,-.17,.03],[8,-.02,-.14],[12,.215,.015],[4,-.27,-.16],[13,.31,-.21],[6,.12,-.42],[11,-.32,-.46],[9,.44,.34]];for(const h of l)vt(h[0],.03+h[1],-.52+h[2])}else if(T0==="fresh rack"||T0==="the break"){const s=Math.sqrt(3)*(b+2e-4);let l=0;for(let h=0;h<5;h++)for(let v=0;v<=h;v++){const u=r+(v-h/2)*2*(b+2e-4),c=e-h*s,x=h===2&&v===1?8:o[l++];vt(x,u,c)}}else if(T0==="mid-frame"){let n=0;const s=9,l=r,h=e-.13;for(let v=0;v<400&&n<s;v++){const u=dt()*k0,c=Math.sqrt(dt())*.24,x=l+Math.cos(u)*c*1.2,d=h+Math.sin(u)*c*.9;Ee(x,d,.002)&&vt(o[n++],x,d)}for(let v=0;v<600&&n<13;v++){const u=(dt()-.5)*(C-.08)*2,c=(dt()-.5)*(g-.08)*2;Ee(u,c,.03)&&Ia(u,c)&&vt(o[n++],u,c)}if(n<13)for(let v=n;v<13;v++)l0[o[v]]=0;vt(8,l+.05,h-.27);for(let v=13;v<14;v++)l0[o[v]]=0}else{let n=0;const s=[[r-.07,e-.02],[r+.08,e-.13],[r-.2,e-.34],[r+.17,e-.42],[r,e-.52]];for(const l of s)vt(o[n++],l[0],l[1])}}function Ee(o,r,e){for(let n=0;n<D;n++)if(l0[n]&&Math.hypot(M[n]-o,R[n]-r)<2*b+e)return!1;return!0}function Ia(o,r){if(T)return!0;const e=Math.abs(o),n=Math.abs(r);return Math.hypot(e-Q.cx,n-Q.cz)>.14&&Math.hypot(e-Q.sx,n)>.12}const To=T?.54:.46,Q0=p0==="green glass shade"?0:p0==="brass"?1:2,wo=a.home?-1:G0===3?-Math.sign(lt):L()<.5?-1:1,w0=[o0(lt+wo*(.42+L()*.14),-C+.1,C-.1),a.home?.46:To+L()*.08,bt+.2-L()*.1];a.home&&(w0[0]=-.27,w0[2]=.3),G0>=4&&(w0[0]=(N-.5)*.3,w0[1]=To+.22,w0[2]=T0==="the break"?-.2:(bt-.45)*.5);const Yt=Q0===0?[1,.86,.62]:Q0===1?[1,.78,.52]:[1,.72,.42],Qt=Q0===2?.8:.95,Qe=Q0===2?.05:Q0===0?.2:.17,je={green:[.03,.27,.085],blue:[.03,.15,.46],burgundy:[.27,.022,.042]}[b0],Ct={mahogany:[[.26,.068,.028],[.075,.016,.009],1],walnut:[[.2,.105,.052],[.05,.024,.012],1],ebony:[[.018,.014,.013],[.004,.0035,.0035],.7]}[A0],z0=z;let N0=y.rts[z0];if(!N0){const o=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,o),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,z0,z0);const r=Math.ceil(z0/8);N0={depth:o,scene:Me(t,y,z0,o),TN:r,tA:Me(t,y,r,null),tB:Me(t,y,r,null)},y.rts[z0]=N0}const zo=Me(t,y,z0,N0.depth),Po=(o,r,e,n,s)=>{const l=t.createTexture();t.bindTexture(t.TEXTURE_2D,l),t.texStorage2D(t.TEXTURE_2D,1,n,o,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const h=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,h),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,l,0),{tex:l,fb:h,w:o,h:r}},No=Po(512,256,t.RGBA,t.RGBA8),$e=Po(1024,512,t.RED,t.R8),se=()=>{t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.STENCIL_TEST),t.disable(t.DITHER),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.depthMask(!0),t.colorMask(!0,!0,!0,!0),t.depthFunc(t.LEQUAL)},Z0=(o,r)=>{t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,r)};se(),t.bindVertexArray(y.vao),t.vertexAttribDivisor(1,0);{const o=y.P.macro;t.bindFramebuffer(t.FRAMEBUFFER,No.fb),t.viewport(0,0,512,256),t.useProgram(o.p),Z0(1,y.noise),t.uniform4f(o.u.uK,m0?1:.12,C,g,0),t.drawArrays(t.TRIANGLE_STRIP,0,4)}t.bindFramebuffer(t.FRAMEBUFFER,$e.fb),t.viewport(0,0,1024,512),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);const Re=(o,r,e,n,s,l)=>{const h=y.P.stamp;se(),t.bindVertexArray(y.vao),t.vertexAttribDivisor(1,0),t.bindFramebuffer(t.FRAMEBUFFER,$e.fb),t.viewport(0,0,1024,512),t.useProgram(h.p),Z0(1,y.noise),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.uniform4f(h.u.uS,o,r,n,s),t.uniform4f(h.u.uM,1/(C+.1),1/(g+.1),0,0),t.uniform2f(h.u.uA,Math.cos(e),Math.sin(e)),t.uniform1f(h.u.uAmt,l),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.disable(t.BLEND)};{const o=ae(a.hash,19604),r=m0?12:3;for(let e=0;e<r;e++)Re((o()-.5)*C*1.6,(o()-.5)*g*1.6,o()*k0,.012+o()*.016,.006+o()*.006,.16+o()*.2);Re(lt-.085,bt+.012,1.32,.017,.006,.7),Re(lt+.095,bt-.022,.4,.011,.0045,.5)}const It=new Float32Array(16+13*4),Fo=new Float32Array(96*4+6*4+4),Te=t.createBuffer(),We=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,Te),t.bufferData(t.UNIFORM_BUFFER,It.byteLength,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,We),t.bufferData(t.UNIFORM_BUFFER,Fo.byteLength,t.DYNAMIC_DRAW);const J0=(o,r,e,n,s)=>{It[16+o*4]=r,It[17+o*4]=e,It[18+o*4]=n,It[19+o*4]=s};J0(4,w0[0],w0[1],w0[2],Qe),J0(5,Yt[0]*Qt,Yt[1]*Qt,Yt[2]*Qt,Q0),J0(6,.07,Q0===0?.56:.62,Q0===2?.018:Qe*.85,Y==="smoke"?1:0),J0(7,je[0],je[1],je[2],m0?1:0),J0(8,C,g,b,T?0:1),J0(9,Q.cx,Q.cz,Q.sx,Q.hole),J0(10,.015,.014,.012,0),J0(11,Ct[0][0],Ct[0][1],Ct[0][2],Ct[2]),J0(12,Ct[1][0],Ct[1][1],Ct[1][2],0);const _o=t.createVertexArray(),Lo=t.createBuffer(),ce=new Float32Array(3*D*7);t.bindVertexArray(_o),t.bindBuffer(t.ARRAY_BUFFER,y.qb),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,Lo),t.bufferData(t.ARRAY_BUFFER,ce.byteLength,t.DYNAMIC_DRAW),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,12,0),t.vertexAttribDivisor(1,1);const Do=t.createVertexArray(),So=t.createBuffer(),xt=new Float32Array(4*(D+8));t.bindVertexArray(Do),t.bindBuffer(t.ARRAY_BUFFER,y.qb),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,So),t.bufferData(t.ARRAY_BUFFER,xt.byteLength,t.DYNAMIC_DRAW),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,16,0),t.vertexAttribDivisor(1,1);const ko=t.createVertexArray(),Bo=t.createBuffer(),Uo=new Float32Array(7*D);t.bindVertexArray(ko),t.bindBuffer(t.ARRAY_BUFFER,y.qb),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,Bo),t.bufferData(t.ARRAY_BUFFER,Uo.byteLength,t.DYNAMIC_DRAW),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,28,0),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,3,t.FLOAT,!1,28,16),t.vertexAttribDivisor(2,1),t.bindVertexArray(null);const go=26,Ze=Y==="smoke"?[Yt[0]*.0045,Yt[1]*.0045,Yt[2]*.0045]:[0,0,0];let qt=1;const Pt=9.81,we=.2,qa=.0095,Va=11,Co=.84,Oa=.0366,Xa=.18,f0=.17,K0=.4*f0*b*b,Ga=5*we*Pt/(2*b),Io=.001,Ka=(L()-.5)*.002,Ha=(L()-.5)*.002,qo=.015,ft=2*b,Vo=ft*ft;let Oo=0,pn=0,D0=!1,yn=0,ut=0;const pt=(o,r,e)=>{if(!a.sound.on)return;const n=o0(e/C*.6,-.8,.8),s=o0(r,0,1);if(o===0){const l=2500+2e3*s;a.sound.note(0,{freq:l,dur:.012+.02*s,vel:.22+.7*s,wave:"sine",attack:6e-4,pan:n}),a.sound.note(0,{freq:l*1.71,dur:.008+.012*s,vel:.12+.45*s,wave:"sine",attack:5e-4,pan:n}),a.sound.hit("click",.3+.7*s,{pan:n})}else o===1?(a.sound.hit("kick",.18+.5*s,{pan:n}),a.sound.note(0,{freq:150+70*s,dur:.07,vel:.2+.35*s,wave:"triangle",cutoff:520,attack:.002,pan:n}),a.sound.hit("noise",.05+.1*s,{dur:.04,cutoff:1400,pan:n})):o===2?(a.sound.note(0,{freq:620+560*s,dur:.02,vel:.25+.5*s,wave:"triangle",cutoff:2200,attack:.001,pan:n}),a.sound.hit("click",.25+.4*s,{pan:n})):o===3?(a.sound.hit("kick",.32,{pan:n}),a.sound.note(0,{freq:95,dur:.14,vel:.5,wave:"sine",cutoff:280,pan:n})):o===4&&(a.sound.hit("click",.32+.5*s,{pan:n}),a.sound.note(0,{freq:980+340*s,dur:.018,vel:.28+.4*s,wave:"triangle",cutoff:2600,attack:8e-4,pan:n}))},ie=o=>{mt[o]=1,D0=!0};function Ya(o,r,e,n){const s=-(v0[o]*r+i0[o]*e);if(s<.001)return;const l=o0((Oa-b)/b,0,.9),h=Math.sqrt(1-l*l),v=-r*h*b,u=l*b,c=-e*h*b,x=r*h,d=-l,p=e*h,m=o0(Co-.06*s,.62,Co),f=28;let E=v0[o],w=r0[o],I=i0[o],k=V0[o],O=g0[o],P=X0[o];const H=-(E*x+w*d+I*p),j=f0*Math.max(H,0)*(1+m),q=j/f,F=K[o]<=b+.0015;for(let _=0;_<f;_++){E+=x*q/f0,w+=d*q/f0,I+=p*q/f0;let V=E+O*c-P*u,X=w+P*v-k*c,G=I+k*u-O*v;const J=V*x+X*d+G*p;V-=J*x,X-=J*d,G-=J*p;let s0=Math.sqrt(V*V+X*X+G*G);if(s0>1e-5){const a0=Math.min(Xa*q,s0*f0/3.5),$=-V/s0*a0,t0=-X/s0*a0,e0=-G/s0*a0;E+=$/f0,w+=t0/f0,I+=e0/f0,k+=(u*e0-c*t0)/K0,O+=(c*$-v*e0)/K0,P+=(v*t0-u*$)/K0}if(F&&w<0){const a0=-w*f0;w=0;const $=E+b*P,t0=I-b*k,e0=Math.sqrt($*$+t0*t0);if(e0>1e-5){const n0=Math.min(we*a0,e0*f0/3.5),d0=-$/e0*n0,M0=-t0/e0*n0;E+=d0/f0,I+=M0/f0,k+=-b*M0/K0,P+=b*d0/K0}}}v0[o]=E,r0[o]=w,i0[o]=I,V0[o]=k,g0[o]=O,X0[o]=P,ie(o),s>.03&&pt(1,s/3.5,M[o])}const jt={x:0,z:0};function Qa(o){const r=M[o],e=R[o];if(!(Math.abs(r)<C-b-.002&&Math.abs(e)<g-b-.002))for(const n of Q.seg){const s=n[2]-n[0],l=n[3]-n[1],h=s*s+l*l,v=o0(((r-n[0])*s+(e-n[1])*l)/h,0,1),u=n[0]+v*s,c=n[1]+v*l;let x=r-u,d=e-c;const p=Math.sqrt(x*x+d*d);if(p<b&&p>1e-7){if(x/=p,d/=p,n[4]*(r-n[0])+n[5]*(e-n[1])<-b*.3)continue;M[o]+=x*(b-p),R[o]+=d*(b-p),Ya(o,x,d,p)}}}function Xo(o){if(T)return-1;const r=Math.abs(M[o]),e=Math.abs(R[o]),n=Math.hypot(r-Q.cx,e-Q.cz),s=Math.hypot(r-Q.sx,e);return n<Q.hole?(jt.x=Math.sign(M[o])*Q.cx,jt.z=Math.sign(R[o])*Q.cz,n):s<Q.hole?(jt.x=Math.sign(M[o])*Q.sx,jt.z=0,s):-1}function ja(o,r){const e=jt.x,n=jt.z;let s=M[o]-e,l=R[o]-n;const h=r>1e-6?r:1e-6;s/=h,l/=h;const v=e+s*Q.hole,u=n+l*Q.hole;let c=M[o]-v,x=K[o],d=R[o]-u;const p=Math.sqrt(c*c+x*x+d*d);if(K[o]>-b*.3&&p<b&&p>1e-6){c/=p,x/=p,d/=p,M[o]+=c*(b-p),K[o]+=x*(b-p),R[o]+=d*(b-p);const m=v0[o]*c+r0[o]*x+i0[o]*d;if(m<0){const f=re[o]?1:1.42;v0[o]-=f*m*c,r0[o]-=f*m*x,i0[o]-=f*m*d,m<-.22&&pt(2,-m/2.5,M[o])}}else if(K[o]<=-b*.3&&r+b>Q.hole){M[o]=e+s*(Q.hole-b),R[o]=n+l*(Q.hole-b);const m=v0[o]*s+i0[o]*l;m>0&&(v0[o]-=1.5*m*s,i0[o]-=1.5*m*l,m>.2&&pt(2,m/3,M[o]))}K[o]<-2.6*b&&(pt(3,1,M[o]),l0[o]=0,mt[o]=0,o===0?Nt=2:ze++)}let tt=0,et=0,Vt=0,Ot=0,le=0;function Go(o,r,e,n,s){const l=Vt*e+Ot*n;if(l>=0)return;const h=Math.hypot(Vt,Ot);if(Vt-=1.15*l*e,Ot-=1.15*l*n,s&&Math.hypot(tt-r.ox,et-r.oz)<Q.hole){const v=Vt*n-Ot*e;Vt-=.5*v*n,Ot+=.5*v*e,r0[o]>0&&(r0[o]*=.3),r0[o]=Math.min(r0[o],-.4*h),re[o]=1}-l>le&&(le=-l)}function $a(o){if(K[o]<=-b*.3)return;const r=M[o]<0?-1:1,e=R[o]<0?-1:1;if(tt=M[o]*r,et=R[o]*e,tt<C-.092||et<g-.092&&(et>.104||tt<C-.064)){re[o]=0;return}const n=Math.hypot(tt-Q.cx,et-Q.cz),s=Math.hypot(tt-Q.sx,et),l=Q.pw[n<s?0:1],h=Math.min(n,s);if(h>Q.hole+.045){re[o]=0;return}Vt=v0[o]*r,Ot=i0[o]*e,le=0;let v=!1;if(h>Q.hole-b&&h>1e-6){const u=(tt-l.ox)/h,c=(et-l.oz)/h;u*l.mx+c*l.mz<l.cth&&(tt=l.ox+u*(Q.hole-b),et=l.oz+c*(Q.hole-b),v=!0,Go(o,l,-u,-c,!0))}for(const u of l.segs){const c=u[2]-u[0],x=u[3]-u[1],d=o0(((tt-u[0])*c+(et-u[1])*x)/(c*c+x*x),0,1);let p=tt-(u[0]+d*c),m=et-(u[1]+d*x);const f=Math.hypot(p,m);f<b&&f>1e-7&&u[4]*(tt-u[0])+u[5]*(et-u[1])>-b*.3&&(p/=f,m/=f,tt+=p*(b-f),et+=m*(b-f),v=!0,Go(o,l,p,m,!1))}v&&(M[o]=tt*r,R[o]=et*e,v0[o]=Vt*r,i0[o]=Ot*e,le>.2&&pt(2,le/3,M[o]))}let Nt=0,ze=0,yt=0,Je=0,to=!1;function Wa(){const o=Io;let r=!1;for(let e=0;e<D;e++){if(!l0[e]||!mt[e])continue;r=!0;let n=v0[e],s=i0[e],l=V0[e],h=X0[e],v=-1;!T&&(Math.abs(M[e])>C-.09||Math.abs(R[e])>g-.12)&&(v=Xo(e));const u=K[e]<=b+4e-4;if(v>=0)r0[e]-=Pt*o;else if(u){if(K[e]=b,r0[e]<-.07){const k=r0[e]<-.6?.25:.5,O=-r0[e]*(1+k)*f0;r0[e]=-r0[e]*k;const P=n+b*h,H=s-b*l,j=Math.sqrt(P*P+H*H);if(j>1e-5){const q=Math.min(we*O,j*f0/3.5),F=-P/j*q,_=-H/j*q;n+=F/f0,s+=_/f0,l+=-b*_/K0,h+=b*F/K0}O>.03&&pt(1,O/f0*.06,M[e])}else if(r0[e]>0&&(r0[e]-=Pt*o),r0[e]<=0){r0[e]=0,K[e]=b;const k=n+b*h,O=s-b*l,P=Math.sqrt(k*k+O*O);if(P>.012){const q=we*Pt*o,F=Ga*o,_=k/P,V=O/P;if(n-=q*_,s-=q*V,l+=F*V,h-=F*_,(n+b*h)*_+(s-b*l)*V<0){const G=n-.2857142857142857*k,J=s-2/7*O;n=G,s=J,l=s/b,h=-n/b}}else{const q=Math.sqrt(n*n+s*s);if(q>1e-5){const V=1+.12*(s/q),X=qa*Pt*V*o;q>X?(n-=n/q*X,s-=s/q*X):(n=0,s=0);const G=.0035*(n/Math.max(q,.05))*o;s+=G*Math.sign(s||1)}const F=Ka+qo*.012*Math.sin(M[e]*3.1+R[e]*1.7),_=Ha+qo*.012*Math.sin(R[e]*2.3-M[e]);q>.003&&(n+=F*Pt*o*.25,s+=_*Pt*o*.25),l=s/b,h=-n/b}const H=g0[e],j=Va*o;g0[e]=Math.abs(H)<j?0:H-Math.sign(H)*j}}else r0[e]-=Pt*o;v0[e]=n,i0[e]=s,V0[e]=l,X0[e]=h,M[e]+=n*o,R[e]+=s*o,K[e]+=r0[e]*o;const c=l*o*.5,x=g0[e]*o*.5,d=h*o*.5,p=gt[e],m=kt[e],f=Bt[e],E=Ut[e];if(gt[e]=p-c*m-x*f-d*E,kt[e]=m+c*p+x*E-d*f,Bt[e]=f+x*p+d*m-c*E,Ut[e]=E+d*p+c*f-x*m,v<0&&Qa(e),!T&&(Math.abs(M[e])>C-.092||Math.abs(R[e])>g-.092)&&$a(e),v>=0&&(ja(e,v),!l0[e]))continue;const w=T?.4:.045;if((Math.abs(M[e])>C+w||Math.abs(R[e])>g+w)&&Xo(e)<0){T||pt(3,1,M[e]),l0[e]=0,mt[e]=0,e===0?Nt=2:ze++;continue}n*n+s*s+r0[e]*r0[e]<3e-6&&V0[e]*V0[e]+g0[e]*g0[e]+X0[e]*X0[e]<.05&&K[e]<=b+1e-4&&v<0&&(v0[e]=r0[e]=i0[e]=V0[e]=g0[e]=X0[e]=0,mt[e]=0)}for(let e=0;e<D;e++)if(l0[e])for(let n=e+1;n<D;n++){if(!l0[n]||!mt[e]&&!mt[n])continue;const s=M[n]-M[e];if(s>ft||s<-ft)continue;const l=R[n]-R[e];if(l>ft||l<-ft)continue;const h=K[n]-K[e],v=s*s+h*h+l*l;if(v>=Vo||v<1e-12)continue;const u=Math.sqrt(v),c=s/u,x=h/u,d=l/u,p=(v0[e]-v0[n])*c+(r0[e]-r0[n])*x+(i0[e]-i0[n])*d,m=ft-u;if(p<=0){m>1e-5&&(M[e]-=c*m*.5,R[e]-=d*m*.5,M[n]+=c*m*.5,R[n]+=d*m*.5);continue}const f=Math.min(m/p,o);M[e]-=v0[e]*f,K[e]-=r0[e]*f*0,R[e]-=i0[e]*f,M[n]-=v0[n]*f,R[n]-=i0[n]*f;const E=(1+.95)*p*f0*.5;v0[e]-=E*c/f0,r0[e]-=E*x/f0,i0[e]-=E*d/f0,v0[n]+=E*c/f0,r0[n]+=E*x/f0,i0[n]+=E*d/f0;const w=V0[e]+V0[n],I=g0[e]+g0[n],k=X0[e]+X0[n];let O=v0[e]-v0[n]+b*(I*d-k*x),P=r0[e]-r0[n]+b*(k*c-w*d),H=i0[e]-i0[n]+b*(w*x-I*c);const j=O*c+P*x+H*d;O-=j*c,P-=j*x,H-=j*d;const q=Math.sqrt(O*O+P*P+H*H);if(q>1e-5){const F=.01+.108*Math.exp(-1.088*q),_=Math.min(F*E,q*f0/7),V=-O/q*_,X=-P/q*_,G=-H/q*_;v0[e]+=V/f0,r0[e]+=X/f0,i0[e]+=G/f0,v0[n]-=V/f0,r0[n]-=X/f0,i0[n]-=G/f0;const J=b*(x*G-d*X),s0=b*(d*V-c*G),a0=b*(c*X-x*V);V0[e]+=J/K0,g0[e]+=s0/K0,X0[e]+=a0/K0,V0[n]+=J/K0,g0[n]+=s0/K0,X0[n]+=a0/K0}M[e]+=v0[e]*f,R[e]+=i0[e]*f,M[n]+=v0[n]*f,R[n]+=i0[n]*f,ie(e),ie(n),p>.02&&(pt(0,Math.pow(p/4.5,.6),(M[e]+M[n])/2),e===0&&!ut&&(ut=n))}D0=r,Oo+=o}const fe=new Float32Array(24);let Pe=0;const Ne=(o,r,e,n)=>{const s=gt[0],l=-kt[0],h=-Bt[0],v=-Ut[0],u=2*(h*e-v*r),c=2*(v*o-l*e),x=2*(l*r-h*o),d=o+s*u+h*x-v*c,p=r+s*c+v*u-l*x,m=e+s*x+l*c-h*u,f=Pe<6?Pe++:(Oo*977|0)%6;fe[f*4]=d,fe[f*4+1]=p,fe[f*4+2]=m,fe[f*4+3]=n};function Za(o,r,e,n,s,l){const h=Math.cos(e),v=Math.sin(e),u=Math.hypot(o,r);o/=u,r/=u;const c=o*h,x=-v,d=r*h,p=-r,m=o,f=-c*x,E=1-x*x,w=-d*x,I=Math.hypot(f,E,w),k=f/I,O=E/I,P=w/I,H=Math.sqrt(Math.max(1-n*n-s*s,.05)),j=(-c*H+p*n+k*s)*b,q=(-x*H+O*s)*b,F=(-d*H+m*n+P*s)*b,_=-n*.045,V=Math.cos(_),X=Math.sin(_),G=c*V+p*X,J=d*V+m*X,s0=x,t0=(1+.72)*f0*l/(1+f0/.54+2.5*(n*n+s*s));v0[0]+=G*t0/f0,r0[0]+=s0*t0/f0,i0[0]+=J*t0/f0,V0[0]+=(q*J-F*s0)*t0/K0,g0[0]+=(F*G-j*J)*t0/K0,X0[0]+=(j*s0-q*G)*t0/K0,ie(0),Ne(j/b,q/b,F/b,.9);const e0=Math.atan2(r,o);Re(M[0]+o*.012,R[0]+r*.012,e0,.016+l*.004,.0065,.14+Math.abs(v)*.3),Mt=!0,pt(4,l/5.5,M[0]),ut=0,Je++,Fe=F0,_t=!0;const n0=j0[0]+nt[0],d0=j0[2]+nt[2];ta=Math.abs(d0)>.5*Math.abs(n0)?d0<0?1:-1:R[0]>=0?1:-1}const i={e:[0,.2,.5],t:[0,0,0],fov:.47,fe:.47,focusBall:0,g:null,tv:[0,0,0],sf:.47,s:[0,0,0],pe:[0,.2,.5],pt:[0,0,0],pf:.47,ve:[0,0,0],vt:[0,0,0],vf:0};let Mt=!0,ot=0,Ko=!1,L0=null,Ft=0,Xt=-1,Fe=-100,_t=!1,Lt=!1,ue=-1;const Ja=a.home?1:.95+L()*.5,tn=a.home?1:(L()<.5?-1:1)*(.6+L()*.8),Ho=(o,r,e,n)=>Math.max(Math.min(e>1e-6?(C+.03-o)/e:e<-1e-6?(-C-.03-o)/e:1e9,n>1e-6?(g+.03-r)/n:n<-1e-6?(-g-.03-r)/n:1e9),.3);let Yo=0,Qo=!1,_e=0,Le=0,De=0,he=1,ve=0,eo=0,oo=1,ao=0,Se=0,no=0,ke=-1,Dt=1,Y0=0,H0=0,at=0,de=.2,$t=0,Wt=0;const jo=(o,r,e,n,s,l,h)=>{let v=o-n,u=r-s,c=e-l;const x=Math.hypot(v,u,c)||1;v/=x,u/=x,c/=x;const d=Math.hypot(c,v)||1;he=c/d,ve=-v/d,eo=u*ve,oo=c*he-v*ve,ao=-u*he,Se=-v,no=-u,ke=-c,_e=o,Le=r,De=e,Dt=Math.tan(h*Math.PI/360)},Zt=(o,r,e)=>{const n=o-_e,s=r-Le,l=e-De;at=n*Se+s*no+l*ke;const h=.5/(Math.max(at,.001)*Dt);Y0=.5+(n*he+l*ve)*h,H0=.5-(n*eo+s*oo+l*ao)*h},en=()=>{let o=0;for(let r=-1;r<=1;r++){const e=r*.8*Dt;let n=0;for(;n<24;n++){const s=(1-(n+.5)/12)*Dt,l=no+oo*s;if(l<-1e-4){const h=-Le/l,v=_e+(Se+he*e+eo*s)*h,u=De+(ke+ve*e+ao*s)*h;if(Math.abs(v)<C+.13&&Math.abs(u)<g+.13)break}}n>o&&(o=n)}return o/24},Be=(o,r,e,n,s,l,h,v,u,c)=>{const x=Math.tan(h*Math.PI/360),d=Math.hypot(e-o,n-r);let p=s-o,m=l-r;const f=Math.hypot(p,m)||1;p/=f,m/=f;let E=1e9,w=0;for(let j=-.7;j<.8;j+=.7){const q=p-m*j*x,F=m+p*j*x,_=Math.hypot(q,F),V=Ho(o,r,q/_,F/_);E=Math.min(E,V),w=Math.max(w,V)}const I=P0(w,E,.3),k=Math.atan((1-2*u)*x),O=Math.atan((2*v-1)*x);let P=.18;for(let j=0;j<6;j++)P=o0(b+d*Math.tan(Math.min(Math.atan((P-.046)/I)+k+O,1.2)),.11,c);const H=P/Math.tan(Math.atan((P-.046)/I)+k);de=P,$t=o+p*H,Wt=r+m*H,jo(o,P,r,$t,0,Wt,h)},Ue=(o,r,e,n,s,l,h,v)=>{if(Zt(o,b,r),at<.1)return-99;const u=Y0,c=H0,x=at,d=b*.5/(at*Dt);let p=0,m=Math.min(u,1-u,c,1-c)-d;m<.03&&(p-=14+(.03-m)*30),p-=Math.abs(d-h)/h*2.2+Math.abs(c-v)*5+Math.max(Math.abs(u-.5)-.2,0)*10;let f=u-d,E=u+d,w=c-d,I=c+d,k=0;if(l>=0){Zt(n,b,s);const P=at>.06?b*.5/(at*Dt):1;m=at>.06?Math.min(Y0,1-Y0,H0,1-H0)-P:-1,m<.015?p-=4+Math.min(.015-m,.5)*6:(k++,f=Math.min(f,Y0-P),E=Math.max(E,Y0+P),w=Math.min(w,H0-P),I=Math.max(I,H0+P)),Math.hypot(Y0-u,H0-c)<(P+d)*1.15&&(p-=5)}for(let P=0;P<D;P++)if(l0[P]&&P!==e&&P!==l){if(Math.hypot(M[P]-_e,b-Le,R[P]-De)<.2&&(p-=4),Zt(M[P],b,R[P]),at<.06)continue;const H=b*.5/(at*Dt);if(m=Math.min(Y0,1-Y0,H0,1-H0),m<-H)continue;if(m<H*1.05){p-=1.6;continue}k++,f=Math.min(f,Y0-H),E=Math.max(E,Y0+H),w=Math.min(w,H0-H),I=Math.max(I,H0+H),Math.hypot(Y0-u,H0-c)<(H+d)*1.05&&(p-=at<x?6:1)}p+=Math.min(k,6)*.3+2.2*Math.min(E-f,.7)+1.4*Math.min(I-w,.6)-2*Math.abs((f+E)*.5-.5);const O=en();if(p-=O>.1?(O-.1)*22:O<.03?.6:0,Qo){let P=Math.atan2(ke,Se)-Yo;P-=Math.round(P/k0)*k0,p-=.35*Math.abs(P)}return p},$o=(o,r)=>{let e=0,n=1e9;for(let s=1;s<D;s++)if(l0[s]){const l=Math.hypot(M[s]-o,R[s]-r);l<n&&(n=l,e=s)}return e},on=o=>{const r=M[0],e=R[0];Qo=Ko&&yt===0,Yo=Math.atan2(i.t[2]-i.e[2],i.t[0]-i.e[0]);let n=0,s=0,l=0;for(let F=1;F<D;F++)l0[F]&&(n+=M[F],s+=R[F],l++);l?(n/=l,s/=l):s=-.3;let h=L0&&L0.ob>0&&l0[L0.ob]?L0.ob:0;if(!h){let F=1e9;for(let _=1;_<D;_++)if(l0[_]){const V=Math.hypot(M[_]-r,R[_]-e);V>.1&&V<F&&(F=V,h=_)}}if(o===4){const F=C+.17,_=o0((e+(h?R[h]:s))*.5,C-g,g-C),V=_>=0?1:-1,X=F/Math.tan(16*Math.PI/180);return{e:[0,X*Math.cos(.14),_-V*X*Math.sin(.14)],t:[0,0,_],fov:32,focus:$o(0,_)}}if(o===5){const F=_t?ta:e>=0?1:-1,_=C+.15,V=g+.15,X=23;let G=.62,J=5,s0=0,a0=9;for(let $=0;$<10;$++){const t0=.48+$*.045;let e0=5,n0=0,d0=1,M0=0;for(let q0=0;q0<16;q0++){jo(0,e0*Math.sin(t0),n0+F*e0*Math.cos(t0),0,0,n0,X),Zt(_,.046,F*V);const ct=Math.abs(Y0-.5);d0=H0,Zt(0,.046,-F*V),M0=H0,e0=o0(e0*P0(1,ct/.465,.8),2.5,7.5),n0=o0(n0+F*((d0+M0)*.5-.5)*2*Dt*e0/Math.sin(t0)*.7,-g,g)}const S0=Math.abs(d0-M0-.9);S0<a0&&(a0=S0,G=t0,J=e0,s0=n0)}return{e:[0,J*Math.sin(G),s0+F*J*Math.cos(G)],t:[0,0,s0],fov:X,focus:$o(0,s0)}}const v=h?M[h]:n,u=h?R[h]:s,c=h||-1;let x=v-r,d=u-e;const p=Math.hypot(x,d)||1;x/=p,d/=p;let m=-1e9,f=r-x*.5,E=e-d*.5,w=.2,I=r,k=e,O=30,P=0;const H=tn>0?1:-1,j=C+.5,q=g+.5;if(o===2&&!h&&(o=0),o===0)for(let F=0;F<3;F++)for(let _=0;_<11;_++)for(let V=0;V<3;V++)for(let X=0;X<2;X++){const G=o0((.48+.13*F)*Ja,.44,.95),J=[0,.12,.26,.45,.75,1.1][_+1>>1],s0=_&1?J:-J,a0=26+V*5,$=Math.cos(s0),t0=Math.sin(s0),e0=o0(r-(x*$-d*t0)*G,-j,j),n0=o0(e-(x*t0+d*$)*G,-q,q),d0=o0(p*(X?.62:.38),.12,.75);Be(e0,n0,r,e,r+x*d0,e+d*d0,a0,.7,.085,.3);let M0=Ue(r,e,0,v,u,c,.1,.7)-1.8*J+(s0*H>0?.15:0)-V*.25;L0&&L0.ob===h&&L0.hx!==void 0&&(Zt(L0.hx,0,L0.hz),at>.1&&Y0>.05&&Y0<.95&&H0>.02&&H0<.9&&(M0+=.7)),M0>m&&(m=M0,f=e0,E=n0,w=de,I=$t,k=Wt,O=a0)}else if(o===1)for(let F=-1;F<=1;F+=2)for(let _=0;_<7;_++)for(let V=0;V<3;V++)for(let X=0;X<3;X++){const G=(_-3)*.25,J=F*(Math.PI/2-G),s0=.55+.27*V,a0=30+X*6,$=Math.min(p*.5,.25*s0),t0=r+x*$,e0=e+d*$,n0=Math.cos(J),d0=Math.sin(J),M0=o0(t0-(x*n0-d*d0)*s0,-j,j),S0=o0(e0-(x*d0+d*n0)*s0,-q,q);Be(M0,S0,r,e,t0,e0,a0,.66,.085,.34);const q0=Ue(r,e,0,v,u,c,.085,.66)-.6*Math.abs(G)+(F*H>0?.3:0);q0>m&&(m=q0,f=M0,E=S0,w=de,I=$t,k=Wt,O=a0)}else if(o===2){P=h;for(let F=0;F<7;F++)for(let _=0;_<3;_++)for(let V=0;V<3;V++)for(let X=0;X<2;X++){const G=[0,.3,.6,.95][F+1>>1],J=F&1?G:-G,s0=.3+.09*_,a0=30+V*6,$=X?.6:.35,t0=Math.cos(J),e0=Math.sin(J),n0=o0(v+(x*t0-d*e0)*s0,-j,j),d0=o0(u+(x*e0+d*t0)*s0,-q,q);Be(n0,d0,v,u,P0(v,r,$),P0(u,e,$),a0,.68,.085,.3);const M0=Ue(v,u,h,r,e,0,.13,.68)-.8*G+(J*H>0?.15:0);M0>m&&(m=M0,f=n0,E=d0,w=de,I=$t,k=Wt,O=a0)}}else for(let F=-1;F<=1;F+=2)for(let _=-1;_<=1;_+=2)for(let V=0;V<3;V++)for(let X=0;X<3;X++)for(let G=0;G<3;G++){const J=F*(C+.005),s0=o0(e+_*(.5+.2*V),-q,q),a0=30+X*6;Be(J,s0,r,e,P0(F*C,r,.45+G*.27),e-_*.25,a0,.62,.085,.3);const $=Ue(r,e,0,v,u,c,.075,.62)-(F*r<0?1.2:0)-G*.15;$>m&&(m=$,f=J,E=s0,w=de,I=$t,k=Wt,O=a0)}return{e:[f,w,E],t:[I,0,k],fov:O,focus:P}},Gt=(o,r)=>{ot=o;const e=on(o),n=e.fov*Math.PI/180;if(i.focusBall=e.focus,i.sf=n,i.tv[0]=i.tv[2]=0,r){i.cut=!0,i.e=e.e.slice(),i.t=e.t.slice(),i.fov=n,i.g=null,i.s[0]=e.e[0],i.s[2]=e.e[2];for(let v=0;v<3;v++)i.pe[v]=i.e[v],i.pt[v]=i.t[v],i.ve[v]=i.vt[v]=0;return i.pf=n,i.vf=0,0}let s=Math.atan2(e.t[2]-e.e[2],e.t[0]-e.e[0])-Math.atan2(i.t[2]-i.e[2],i.t[0]-i.e[0]);s-=Math.round(s/k0)*k0;const l=Math.hypot(e.e[0]-i.e[0],e.e[1]-i.e[1],e.e[2]-i.e[2]),h=1.4+.45*Math.min(l,3)+1.3*Math.abs(s);return i.g={e0:i.e.slice(),t0:i.t.slice(),f0:i.fov,e1:e.e,t1:e.t,f1:n,u:0,dur:h,lift:l>2.5?0:Math.min(.04+.1*l,.2),ve:i.ve.slice(),vt:i.vt.slice(),vf:i.vf},h};let ro=null,ht=[1,0,0],nt=[0,1,0],j0=[0,0,-1];const ge=[0,0,0],Jt=()=>{const o=l0[0]?Ft*Ft*(3-2*Ft):0;if(i.fe=i.fov,o>0){const s=Math.max(Math.hypot(M[0]-i.e[0],b-i.e[1],R[0]-i.e[2]),.1);i.fe=P0(i.fov,Math.min(i.fov,Math.max(o0(2*Math.atan(b/(.32*s)),i.fov*.3,i.fov*.85),2*Math.atan(b/(.42*s)))),o)}ge[0]=P0(i.t[0],M[0],o),ge[1]=P0(i.t[1],b,o),ge[2]=P0(i.t[2],R[0],o);const r=ma(i.e,ge),e=xa(i.fe,o0((i.e[1]-.6)*.5,.02,1.5),12);ro=ba(e,r.m),ht=r.r,nt=r.u,j0=r.f;const n=Math.tan(i.fe/2);It.set(ro,0),J0(0,i.e[0],i.e[1],i.e[2],2*n/z),J0(1,j0[0],j0[1],j0[2],0),J0(2,ht[0]*n,ht[1]*n,ht[2]*n,0),J0(3,nt[0]*n,nt[1]*n,nt[2]*n,0),t.bindBuffer(t.UNIFORM_BUFFER,Te),t.bufferData(t.UNIFORM_BUFFER,It,t.DYNAMIC_DRAW)},Ce=(o,r,e)=>{const n=ro,s=n[0]*o+n[4]*r+n[8]*e+n[12],l=n[1]*o+n[5]*r+n[9]*e+n[13],h=n[3]*o+n[7]*r+n[11]*e+n[15];return[.5+.5*s/h,.5-.5*l/h,h]},C0=ae(a.hash,19605),u0={vis:0,x:0,y:0,z:0,dx:0,dy:0,dz:0};let A=null,rt=5.4,F0=0,Ie=1,At=!1,qe=0,Ve=0,Oe=0,Et=!1,be=!1,Xe=0,te=0,xe=0,ee=0,Wo=0,Ge=-100,St=!1,so=!1,Ke=0,oe=!1,Rt=0,Tt=1,co=0,Zo=.5,Jo=.5,ta=1;function He(){const o=["draw","follow","masse","stun","side","draw","masse","follow","side"],r=o[Wo++%o.length],e=M[0],n=R[0];let s=-1,l=-1,h=0,v=1,u,c;for(let f=1;f<D;f++){if(!l0[f])continue;const E=M[f],w=R[f];let I=E-e,k=w-n,O=Math.hypot(I,k);if(O<.12)continue;let P=0,H=0,j=0,q,F;if(T)P=I/O,H=k/O,j=.5;else{for(const $ of[-1,1])for(const t0 of[-1,0,1]){const e0=$*(t0===0?Q.sx:Q.cx),n0=t0*Q.cz;let d0=e0-E,M0=n0-w;const S0=Math.hypot(d0,M0);d0/=S0,M0/=S0;const q0=(I*d0+k*M0)/O;if(q0<.45)continue;const ct=q0/(.5+S0);ct>j&&(j=ct,P=d0,H=M0,q=e0,F=n0)}if(j<=0)continue}const _=E-P*ft,V=w-H*ft;let X=_-e,G=V-n;const J=Math.hypot(X,G);X/=J,G/=J;let s0=!0;for(let $=1;$<D;$++)if(l0[$]&&$!==f){const t0=M[$]-e,e0=R[$]-n,n0=t0*X+e0*G;n0>0&&n0<J&&Math.abs(t0*G-e0*X)<ft*.98&&(s0=!1)}if(!s0)continue;const a0=j*(.7+C0())/(.4+O);a0>l&&(l=a0,s=f,h=X,v=G,u=q,c=F)}if(s<0){const f=C0()*k0;h=Math.cos(f),v=Math.sin(f)}let x=0,d=0,p=.085,m=2.4;if(r==="draw"&&(d=-.55,x=(C0()-.5)*.08,m=3.3+C0()*.5),r==="follow"&&(d=.5,m=1.9+C0()*.5),r==="stun"&&(d=-.14,m=2.5+C0()*.5),r==="side"&&(x=(C0()<.5?-1:1)*.55,d=.1,m=2.3+C0()*.6),r==="masse"){const f=C0()<.5?-1:1;x=f*.5,d=-.22,p=1.2+C0()*.08,m=3.2+C0()*.7;const E=-f*.8,w=Math.cos(E),I=Math.sin(E),k=h*w-v*I,O=h*I+v*w;h=k,v=O}return{dx:h,dz:v,elev:p,a:x,b:d,V:m,kind:r,ob:s,cx:e,cz:n,hx:u,hz:c}}const an=()=>{const o=L0&&L0.cx===M[0]&&L0.cz===R[0]?L0:He();L0=null,A={dx:o.dx,dz:o.dz,elev:o.elev,a:o.a,b:o.b,V:o.V,gap:.38,phase:0,t:0,auto:!0},Kt()};function Kt(){if(!A){u0.vis=0;return}const o=Math.cos(A.elev),r=Math.sin(A.elev),e=A.dx*o,n=-r,s=A.dz*o,l=-A.dz,h=A.dx,v=-e*n,u=1-n*n,c=-s*n,x=Math.hypot(v,u,c),d=Math.sqrt(Math.max(1-A.a*A.a-A.b*A.b,.05)),p=(-e*d+l*A.a+v/x*A.b)*b,m=(-n*d+u/x*A.b)*b,f=(-s*d+h*A.a+c/x*A.b)*b;u0.vis=1,u0.dx=-e,u0.dy=-n,u0.dz=-s,u0.x=M[0]+p-e*A.gap,u0.y=K[0]+m-n*A.gap,u0.z=R[0]+f-s*A.gap}const io=()=>{const o=Ce(M[0],K[0],R[0]);return[o[0],o[1],o[2],o[2]>0?b/o[2]/Math.tan(i.fe/2)*.5:0]};function nn(o,r){if(Xe=0,te=0,xe=.085,!l0[0])return;const e=io();if(e[2]<=0||e[3]<.06)return;const n=(o-e[0])/(e[3]*1.05),s=-(r-e[1])/(e[3]*1.05),l=Math.hypot(n,s);if(l>1)return;const h=B0(.3,.5,l)*.62;Xe=n*h,te=s*h,xe=.085+B0(.72,.92,s)*1.12,te=P0(te,-.22,B0(.2,.9,xe))}const ea=()=>{const o=Ce(u0.x,u0.y,u0.z);return o[2]>0&&o[0]>.04&&o[0]<.96&&o[1]>.04&&o[1]<.96};function rn(o){if(A.gap=o,Kt(),ea())return;let r=0,e=o;for(let n=0;n<10;n++){const s=(r+e)*.5;A.gap=s,Kt(),ea()?r=s:e=s}A.gap=r,Kt()}function sn(){const o=M[0],r=R[0];let e=Math.min(Rt>1e-6?(C-b-o)/Rt:Rt<-1e-6?(-C+b-o)/Rt:1e9,Tt>1e-6?(g-b-r)/Tt:Tt<-1e-6?(-g+b-r)/Tt:1e9);for(let n=1;n<D;n++){if(!l0[n]||K[n]<0)continue;const s=M[n]-o,l=R[n]-r,h=s*Rt+l*Tt,v=s*Tt-l*Rt;h>0&&Math.abs(v)<ft&&(e=Math.min(e,h-Math.sqrt(Vo-v*v)))}return Math.max(e,0)}function cn(o){const r=a.input;r.taps();const e=!!r.down&&!!r.inside;if(r.inside&&(r.x!==Zo||r.y!==Jo)&&(Zo=r.x,Jo=r.y,rt=Math.max(rt,F0+15)),e&&!At&&(At=!0,qe=F0,Ve=r.x,Oe=r.y,be=!1,Et=!1,St=!1,oe=!1,so=D0,Ge=F0,rt=Math.max(rt,F0+15),nn(r.x,r.y)),At&&e){Ge=F0;const s=Math.hypot(r.x-Ve,r.y-Oe);if(s>.022&&!St&&(be=!0),!be&&!St&&D0&&F0-qe>.18&&(St=!0),be&&!St&&!Et&&!D0&&l0[0]&&(!A||A.auto||A.phase===4)){Et=!0,A=null,u0.vis=0,oe=!1;const l=io();so&&(Ve=r.x,Oe=r.y,Xe=0,te=0,xe=.085),Ke=Math.max(Math.hypot(Ve-l[0],Oe-l[1]),1.2*l[3])}if(Et){const l=io(),h=r.x-l[0],v=r.y-l[1],u=Math.hypot(h,v);if(u>1.2*l[3]&&(s>.022||so)){const c=Math.tan(i.fe/2),x=(2*r.x-1)*c,d=(1-2*r.y)*c,p=j0[0]+ht[0]*x+nt[0]*d,m=j0[1]+ht[1]*x+nt[1]*d,f=j0[2]+ht[2]*x+nt[2]*d;let E=-p,w=-f;if(m<-1e-4&&i.e[1]>b){const k=(b-i.e[1])/m;E=M[0]-(i.e[0]+p*k),w=R[0]-(i.e[2]+f*k)}const I=Math.hypot(E,w);I>1e-6&&(Rt=E/I,Tt=w/I,oe=!0)}if(oe){const c=u>1e-6?h/u:0,x=u>1e-6?v/u:1,d=l[0]+c*Ke,p=l[1]+x*Ke,m=c>1e-6?(1-d)/c:c<-1e-6?-d/c:9,f=x>1e-6?(1-p)/x:x<-1e-6?-p/x:9,E=o0(Math.min(m,f)-.02,.06,.28);ee=o0((u-Ke)/E,0,1),A={dx:Rt,dz:Tt,elev:xe,a:Xe,b:te,V:.08+1.25*ee+4.42*ee*ee,gap:0,phase:1,t:0,auto:!1},rn(.018+.14*ee),co=sn()}}}if(At&&!e){if(At=!1,Et&&A&&!A.auto&&ee>.04)L0=null,A.phase=3,A.t=0,A.v0=A.V;else if(Et)A=null,u0.vis=0;else if(!be&&F0-qe<.3){if(D0||_t)ot!==5?Gt(5,ot<4):T||Gt(4);else{ue=-1;const s=(ot+1)%(T?4:6);Gt(s,s<4!=ot<4)}Jt(),Mt=!0,st=!0}Et=!1,oe=!1,St=!1,Ge=F0,rt=Math.max(rt,F0+15)}Ie+=((St&&At?.125:1)-Ie)*Math.min(1,o*7)}function ln(o){if(A){if(A.t+=o,A.phase===0){if(A.t<1.4)A.gap=P0(.38,.05,B0(0,1,A.t/1.4));else if(A.t<1.4+1.9){const e=(A.t-1.4)/1.9;A.gap=.05+.045*(1-Math.cos(e*k0*2))*.5}else A.phase=3,A.t=0,A.gap=.05+.13*B0(.2,3,A.V),A.back=A.gap,A.draw=.4;Kt();return}if(A.phase===3){if(A.draw>0){A.draw-=o;const r=1-o0(A.draw/.4,0,1);A.gap=P0(.05,A.back,B0(0,1,r)),Kt();return}A.gap-=A.V*o,A.gap<=0&&(Za(A.dx,A.dz,A.elev,A.a,A.b,A.V),A.phase=4,A.t=0,A.gap=0,A.dx0=M[0],A.dy0=K[0],A.dz0=R[0]),oa();return}if(A.phase===4){const r=A.t;A.gap=r<.12?-.05*B0(0,.12,r):P0(-.05,.75,B0(.32,1.6,r)),oa(),r>1.7&&(A=null,u0.vis=0,rt=Math.max(rt,F0+2.6+C0()*3+C0()*C0()*11))}}}function oa(){const o=A.dx0===void 0?M[0]:A.dx0,r=A.dx0===void 0?K[0]:A.dy0,e=A.dx0===void 0?R[0]:A.dz0,n=Math.cos(A.elev),s=Math.sin(A.elev),l=A.dx*n,h=-s,v=A.dz*n,u=-A.dz,c=A.dx,x=-l*h,d=1-h*h,p=-v*h,m=Math.hypot(x,d,p),f=Math.sqrt(Math.max(1-A.a*A.a-A.b*A.b,.05)),E=(-l*f+u*A.a+x/m*A.b)*b,w=(-h*f+d/m*A.b)*b,I=(-v*f+c*A.a+p/m*A.b)*b;u0.vis=1,u0.dx=-l,u0.dy=-h,u0.dz=-v,u0.x=o+E-l*A.gap,u0.y=r+w-h*A.gap,u0.z=e+I-v*A.gap}function fn(){let o=Lt?M[0]:lt,r=Lt?R[0]:bt;for(let e=0;e<12&&!Ee(o,r,.02);e++)o=(C0()-.5)*C,r=g*(.2+C0()*.5);Lt&&(o!==M[0]||r!==R[0])&&(L0=null),Lt=!1,vt(0,o,r),K[0]=b+.05,r0[0]=0,ie(0)}const wt=new Int32Array(D),me=new Float32Array(D);let lo=0,aa=0,An=0,fo=!0;const na={};let ra=!1;const sa=new Int32Array(D),un=(o,r)=>{const e=w0[0]-o,n=w0[1],s=w0[2]-r,l=e*e+n*n+s*s,h=n/Math.sqrt(l);return Q0===2?1:B0(.2,.62,h)};let uo=0;function ca(o,r,e){let n=0;const s=i.e[0],l=i.e[1],h=i.e[2];for(let m=0;m<D;m++){if(!l0[m])continue;wt[n++]=m;const f=M[m]-s,E=K[m]-l,w=R[m]-h;me[m]=f*f+E*E+w*w}for(let m=1;m<n;m++){const f=wt[m],E=me[f];let w=m-1;for(;w>=0&&me[wt[w]]<E;)wt[w+1]=wt[w],w--;wt[w+1]=f}const v=Fo;let u=0,c=0,x=0;const d=Uo;for(let m=0;m<n;m++){const f=wt[m],E=f*24;v[E]=M[f],v[E+1]=K[f],v[E+2]=R[f],v[E+3]=b,v[E+4]=v0[f]*r,v[E+5]=r0[f]*r,v[E+6]=i0[f]*r;const w=Math.sqrt(me[f]),I=Math.abs((w-e)/w*go)*(z/1e3),k=1-B0(.0025*z,.0065*z,I);if(v[E+7]=k,k<1&&K[f]>0){let a0=w0[0]-M[f],$=w0[1]-K[f],t0=w0[2]-R[f];const e0=Math.hypot(a0,$,t0);a0/=e0,$/=e0,t0/=e0;let n0=s-M[f],d0=l-K[f],M0=h-R[f];n0/=w,d0/=w,M0/=w;let S0=a0+n0,q0=$+d0,ct=t0+M0;const bo=Math.hypot(S0,q0,ct);S0/=bo,q0/=bo,ct/=bo;const ha=Ce(M[f]+S0*b,K[f]+q0*b,R[f]+ct*b),va=b/w/Math.tan(i.fe/2)*.5*z*(Qe/e0)*.5*(Q0===2?.6:1)+.6,xo=Math.max(I*.86,1),bn=va/xo*(va/xo)*1.5*(1-k)*B0(0,.16,un(M[f],R[f]));d[x*7]=ha[0]*2-1,d[x*7+1]=1-ha[1]*2,d[x*7+2]=xo/z*2,d[x*7+3]=o0(bn*Math.min(qt,2),.015,.24)*(w<e?.45:1),d[x*7+4]=1,d[x*7+5]=Q0===0?.92:.82,d[x*7+6]=Q0===0?.72:.58,sa[x]=m,x++}const O=1/Math.hypot(gt[f],kt[f],Bt[f],Ut[f]);gt[f]*=O,kt[f]*=O,Bt[f]*=O,Ut[f]*=O,v[E+8]=kt[f],v[E+9]=Bt[f],v[E+10]=Ut[f],v[E+11]=gt[f],v[E+12]=V0[f]*r,v[E+13]=g0[f]*r,v[E+14]=X0[f]*r,v[E+15]=Ae[f],v[E+16]=W0[f*4],v[E+17]=W0[f*4+1],v[E+18]=W0[f*4+2],v[E+19]=W0[f*4+3];let P=-1,H=-1,j=-1,q=1e9,F=1e9,_=1e9;for(let a0=0;a0<n;a0++){if(a0===m)continue;const $=wt[a0],t0=M[$]-M[f],e0=R[$]-R[f],n0=t0*t0+e0*e0;n0<q?(_=F,j=H,F=q,H=P,q=n0,P=$):n0<F?(_=F,j=H,F=n0,H=$):n0<_&&(_=n0,j=$)}v[E+20]=P<0?f:P,v[E+21]=H<0?f:H,v[E+22]=j<0?f:j,v[E+23]=Ao[f];const V=Math.hypot(v0[f],r0[f],i0[f])*r,X=Math.sqrt(me[f]),G=V/X/(2*Math.tan(i.fe/2))*z,J=G<1.2?1:G<5?2:G<12?3:G<24?4:5,s0=J===1?1:1-Math.pow(.03,1/J);for(let a0=0;a0<J;a0++)ce[u++]=f,ce[u++]=J===1?0:(a0+.5)/J-.5,ce[u++]=s0;xt[c++]=M[f],xt[c++]=K[f],xt[c++]=R[f],xt[c++]=b}lo=u/3;let p=0;for(let m=0;m<x;m++){const f=sa[m],E=(d[m*7]+1)*.5,w=(1-d[m*7+1])*.5;let I=!1;for(let k=f+1;k<n;k++){const O=wt[k],P=Ce(M[O],K[O],R[O]),H=b/P[2]/Math.tan(i.fe/2)*.5;if(Math.hypot(E-P[0],w-P[1])<H){I=!0;break}}if(!I){for(let k=0;k<7;k++)d[p*7+k]=d[m*7+k];p++}}if(uo=p,p&&(t.bindBuffer(t.ARRAY_BUFFER,Bo),t.bufferData(t.ARRAY_BUFFER,d.subarray(0,p*7),t.DYNAMIC_DRAW)),u0.vis)for(let m=0;m<8;m++){const f=.03+m*.11,E=u0.y+u0.dy*f,w=P0(.0065,.0095,m/7);xt[c++]=u0.x+u0.dx*f,xt[c++]=E,xt[c++]=u0.z+u0.dz*f,xt[c++]=w}aa=c/4,v.set(fe,96*4),v[96*4+24]=Pe,v[96*4+25]=n>1?3:0,t.bindBuffer(t.UNIFORM_BUFFER,We),t.bufferData(t.UNIFORM_BUFFER,v,t.DYNAMIC_DRAW),fo=!0,t.bindBuffer(t.ARRAY_BUFFER,Lo),t.bufferData(t.ARRAY_BUFFER,ce.subarray(0,u),t.DYNAMIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,So),t.bufferData(t.ARRAY_BUFFER,xt.subarray(0,c),t.DYNAMIC_DRAW)}if(Ro(),T0!=="the break"&&(L0=He()),Gt(G0,!0),Ko=!0,T0==="the break"){let o=M[0],r=R[0],e=0,n=0,s=1e9;for(let u=1;u<D;u++)if(l0[u]){const c=Math.hypot(M[u]-o,R[u]-r);c<s&&(s=c,e=M[u],n=R[u])}const l=e-o+(N-.5)*.01,h=n-r,v=Math.hypot(l,h);A={dx:l/v,dz:h/v,elev:.09,a:0,b:.15,V:7.5,gap:.3,back:.3,draw:0,phase:3,t:0,auto:!0},Kt()}Jt();{const o=[i.e[0]-M[0],i.e[1]-K[0],i.e[2]-R[0]],r=Math.hypot(o[0],o[1],o[2]),e=[o[0]/r,o[1]/r,o[2]/r],n=[ht[0],0,ht[2]],s=(u,c,x)=>{const d=Math.hypot(u,c,x);return[u/d,c/d,x/d]},l=wo,h=s(e[0]+n[0]*l*.2,e[1]-.04,e[2]+n[2]*l*.2),v=s(e[0]+n[0]*l*.72,e[1]-.42,e[2]+n[2]*l*.72);Ne(h[0],h[1],h[2],1),Ne(v[0],v[1],v[2],.6)}const $0=y.P,I0=new Float32Array(8);function hn(){t.bindFramebuffer(t.FRAMEBUFFER,zo.fb),t.viewport(0,0,z0,z0),se(),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.bindBufferBase(t.UNIFORM_BUFFER,0,Te),Z0(0,y.tile),Z0(1,y.noise),Z0(2,No.tex),Z0(3,$e.tex),t.useProgram($0.room.p),t.bindVertexArray(y.vao),t.vertexAttribDivisor(1,0),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.enable(t.DEPTH_TEST),t.useProgram($0.cloth.p),t.bindVertexArray(_0.cvao),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.useProgram($0.rail.p),t.bindVertexArray(_0.vao),t.drawElements(t.TRIANGLES,_0.n,t.UNSIGNED_SHORT,0),t.bindVertexArray(null)}function ia(o){if(fo||Mt||N0.owner!==na?(Mt&&(hn(),Mt=!1),se(),t.bindBufferBase(t.UNIFORM_BUFFER,0,Te),t.bindBufferBase(t.UNIFORM_BUFFER,1,We),t.bindFramebuffer(t.READ_FRAMEBUFFER,zo.fb),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,N0.scene.fb),t.blitFramebuffer(0,0,z0,z0,0,0,z0,z0,t.COLOR_BUFFER_BIT,t.NEAREST),t.bindFramebuffer(t.FRAMEBUFFER,N0.scene.fb),t.viewport(0,0,z0,z0),t.useProgram($0.shadow.p),t.bindVertexArray(Do),t.enable(t.BLEND),t.blendFunc(t.DST_COLOR,t.ZERO),t.colorMask(!0,!0,!0,!1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,aa),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),u0.vis&&(t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.useProgram($0.cue.p),Z0(1,y.noise),I0[0]=u0.x,I0[1]=u0.y,I0[2]=u0.z,I0[4]=u0.dx,I0[5]=u0.dy,I0[6]=u0.dz,t.uniform4fv($0.cue.u.uCu,I0),t.bindVertexArray(y.cueVao),t.drawElements(t.TRIANGLES,y.cueN,t.UNSIGNED_SHORT,0),Et&&oe&&co>.01&&l0[0]&&(I0[0]=M[0],I0[1]=0,I0[2]=R[0],I0[3]=1,I0[4]=Rt,I0[5]=0,I0[6]=Tt,I0[7]=co,t.uniform4fv($0.cue.u.uCu,I0),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.colorMask(!0,!0,!0,!1),t.drawElements(t.TRIANGLES,y.cueN,t.UNSIGNED_SHORT,0),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),I0[3]=0,I0[7]=0)),t.bindVertexArray(_o),Z0(0,y.tile),Z0(1,y.noise),t.useProgram($0.ball.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.colorMask(!0,!0,!0,!1),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,lo),t.disable(t.BLEND),t.colorMask(!1,!1,!1,!0),t.depthMask(!1),t.useProgram($0.balla.p),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,lo),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),t.disable(t.DEPTH_TEST),N0.owner=na,fo=!1,N0.tilesOk=!1):se(),y.tileK===void 0)ra&&(y.tileK=0,y.tileNew=y.buildTile());else if(y.tileK>=0&&y.tileK<4&&++y.tileK===4){const[l,h]=y.tileNew;y.tileNew=null,t.getProgramParameter(l,t.LINK_STATUS)?(t.useProgram(l),t.uniform1i(t.getUniformLocation(l,"uC"),0),y.P.tile={p:l,u:{uK:t.getUniformLocation(l,"uK")}}):(y.tileK=-1,console.error("196 tile: "+t.getProgramInfoLog(l)+" "+t.getShaderInfoLog(h)))}if(y.P.tile&&!N0.tilesOk){t.useProgram(y.P.tile.p),t.bindVertexArray(y.vao),t.vertexAttribDivisor(1,0),t.bindFramebuffer(t.FRAMEBUFFER,N0.tA.fb),t.viewport(0,0,N0.TN,N0.TN),Z0(0,N0.scene.tex),t.uniform4i(y.P.tile.u.uK,8,0,7,z0-1),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.bindFramebuffer(t.FRAMEBUFFER,N0.tB.fb),Z0(0,N0.tA.tex);const l=Math.ceil((30*(z0/1e3)+2)/8);t.uniform4i(y.P.tile.u.uK,1,-l,l,N0.TN-1),t.drawArrays(t.TRIANGLE_STRIP,0,4),N0.tilesOk=!0}t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,z0,z0),t.useProgram($0.dof.p),t.bindVertexArray(y.vao),t.vertexAttribDivisor(1,0);const e=!!(y.P.tile&&N0.tilesOk);Z0(0,N0.scene.tex),Z0(1,e?N0.tB.tex:y.noise),t.uniform1i($0.dof.u.uTn,e?N0.TN-1:-1),ra=!0;const n=30*(z0/1e3),s=$0.dof;t.uniform4f(s.u.uD,1/z0,1/z0,n,go*(z0/1e3)),t.uniform3f(s.u.uH,Ze[0],Ze[1],Ze[2]),t.uniform4f(s.u.uG,qt,.012,z0>500?32:16,o),t.drawArrays(t.TRIANGLE_STRIP,0,4),uo&&(t.useProgram($0.bokeh.p),t.bindVertexArray(ko),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,uo),t.disable(t.BLEND)),t.bindVertexArray(null)}const vn=o=>{const r=w0[0]-M[o],e=w0[1]-K[o],n=w0[2]-R[o],s=r*r+e*e+n*n;return Qt*(e/Math.sqrt(s))/s},dn=()=>{if(ot>3)return 4;const o=Math.tan(i.fe/2);let r=.5;for(let e=0;e<6;e++){const n=(e%3-1)*.62*o,s=(e<3?-.72:-.1)*o,l=j0[1]+nt[1]*s;if(l>-.02)continue;const h=-i.e[1]/l,v=i.e[0]+(j0[0]+ht[0]*n+nt[0]*s)*h,u=i.e[2]+(j0[2]+ht[2]*n+nt[2]*s)*h;if(Math.abs(v)>C||Math.abs(u)>g)continue;const c=w0[0]-v,x=w0[2]-u,d=c*c+x*x+w0[1]*w0[1],p=w0[1]/Math.sqrt(d);r=Math.max(r,Qt*p/d*(Q0===2?1:.26+.74*B0(.07,Q0===0?.56:.62,p)))}return 4.6/r},la=o0(4*w0[1]*w0[1]/Qt,.9,4),fa=o=>ot>3?G0>3?la:Math.min(4,la*2.3):o0(Math.pow(1.66/Math.max(vn(o),.01),.65),.8,Math.min(4,dn()));qt=fa(0);let Ht=Math.hypot(M[0]-i.e[0],K[0]-i.e[1],R[0]-i.e[2]),ho=0,vo=0,ua=!1,st=!0;return ca(0,0,Ht),ia(Ht),(o,r)=>{const e=o0(r||.03333333333333333,0,.12);F0+=e,cn(e);const n=e*Ie;ln(n),D0&&(st=!0);const s=D0?Math.min(Math.round(n/Io),130):0;for(let u=0;u<s;u++)Wa();const l=D0;if(Nt>0&&!Lt&&!l0[0]){let u=lt,c=bt;for(let x=0;x<12&&!Ee(u,c,.02);x++)u=(C0()-.5)*C,c=g*(.2+C0()*.5);M[0]=u,R[0]=c,Lt=!0}Nt>0&&(Nt-=n,Nt<=0&&(fn(),st=!0)),!T&&!D0&&!A&&!yt&&(ze>=(T0==="last few"?5:11)||Je>=14)&&(yt=1);let h=1;if(yt>0){yt+=e;const u=yt-1;h=u<.7?1-B0(0,.7,u):B0(1,1.9,u),u>=.7&&!to&&(to=!0,Nt=0,Lt=!1,_t=!1,Ro(),ze=0,Je=0,L0=He(),Xt=-1,Gt(G0,!0),Jt(),Mt=!0,st=!0,Pe=0,Ne(j0[0]*-.7,.5,j0[2]*-.7,.8)),u>1.9&&(yt=0,to=!1,h=1,rt=F0+5)}if(D0?Xt=-1:ua&&(Xt=F0+.8),Xt>0&&F0>Xt&&!A&&!At&&(l0[0]||Lt)&&yt===0){Xt=-1,_t=!1,L0||(L0=He());const u=F0-Ge>20?[G0,0,1,0,G0,2,0,3][Wo%8]:ue>=0?ue:ot;ue=-1;{const c=u<4!=ot<4;rt=Math.max(rt,F0+Gt(u,c)+.9),c&&(Jt(),Mt=!0,st=!0)}}if(ua=D0,!A&&!D0&&!At&&F0>rt&&l0[0]&&Nt<=0&&yt===0&&Xt<0&&!i.g&&(an(),st=!0),!Et){_t&&ot<4&&!i.g&&D0&&F0-Fe>.3&&(ue=ot,Gt(5,!0),Jt(),Mt=!0,st=!0);let u=!1;const c=i.g,x=St&&At&&F0-qe>.45&&l0[0]?1:0;if(Math.abs(x-Ft)>.001?(Ft+=(x-Ft)*Math.min(1,e*(x?1.5:2.4)),u=!0):Ft>.01&&D0&&(u=!0),c){c.u=Math.min(1,c.u+e/c.dur);const d=c.u*c.u*c.u*(c.u*(c.u*6-15)+10),p=c.dur*c.u*(1-c.u)*(1-c.u)*(1-c.u),m=P0(c.t0[0],c.t1[0],d),f=P0(c.t0[2],c.t1[2],d),E=Math.atan2(c.e0[2]-c.t0[2],c.e0[0]-c.t0[0]),w=Math.atan2(c.e1[2]-c.t1[2],c.e1[0]-c.t1[0]),I=E+(w-E-Math.round((w-E)/k0)*k0)*d,k=P0(Math.hypot(c.e0[0]-c.t0[0],c.e0[2]-c.t0[2]),Math.hypot(c.e1[0]-c.t1[0],c.e1[2]-c.t1[2]),d);i.t[0]=m+c.vt[0]*p,i.t[1]=P0(c.t0[1],c.t1[1],d),i.t[2]=f+c.vt[2]*p,i.e[0]=m+Math.cos(I)*k+c.ve[0]*p,i.e[2]=f+Math.sin(I)*k+c.ve[2]*p,i.e[1]=P0(c.e0[1],c.e1[1],d)+c.lift*4*d*(1-d)+c.ve[1]*p,i.fov=P0(c.f0,c.f1,d)+c.vf*p,c.u>=1&&(i.g=null,i.s[0]=i.e[0],i.s[2]=i.e[2]),u=!0}else if(_t&&ot<4&&(D0||Math.abs(i.tv[0])+Math.abs(i.tv[2])>2e-4)){const d=l0[0]&&K[0]>0,p=ut>0&&l0[ut]&&K[ut]>0?ut:0;if(d||p){const m=B0(.08,.45,F0-Fe),f=d?0:p;let E=M[f]+v0[f]*.22,w=R[f]+i0[f]*.22,I=0;if(d&&p){const d0=M[0]-i.e[0],M0=R[0]-i.e[2],S0=M[p]-i.e[0],q0=R[p]-i.e[2];I=1-B0(.4,.7,Math.acos(o0((d0*S0+M0*q0)/((Math.hypot(d0,M0)||1)*(Math.hypot(S0,q0)||1)),-1,1))),E=P0(E,M[p]+v0[p]*.12,.45*I),w=P0(w,R[p]+i0[p]*.12,.45*I)}E=o0(E,-C,C),w=o0(w,-g,g);const k=i.e[0]-E,O=i.e[2]-w,P=Math.hypot(k,O)||1,H=o0(P,.7,1.2),j=Math.min(1,e*(P<.7?2.2:.7)*m)*(H-P)/P;i.e[0]=o0(i.e[0]+k*j,-C-.6,C+.6),i.e[2]=o0(i.e[2]+O*j,-g-.6,g+.6);let q=E-i.e[0],F=w-i.e[2];const _=Math.hypot(q,F)||1;q/=_,F/=_,i.e[1]+=(o0(.17+.1*_,.17,.4)-i.e[1])*Math.min(1,e*1.2*m);const V=Math.atan2(F,q);let X=b*2.2/Math.max(_,.2);for(let d0=0;d0<2;d0++){const M0=d0?p:0;if(d0?!p:!d)continue;const S0=M[M0]-i.e[0],q0=R[M0]-i.e[2];let ct=Math.atan2(q0,S0)-V;ct-=Math.round(ct/k0)*k0,X=Math.max(X,(Math.abs(ct)+b*1.5/Math.max(Math.hypot(S0,q0),.15))*(d0&&d?I:1))}const G=o0(Math.max(2*Math.atan(Math.tan(Math.min(X,.6))/.68),2*Math.atan(b/(.17*_))),i.sf*.6,Math.max(i.sf,.72));i.fov+=(G-i.fov)*Math.min(1,e*(G>i.fov?3:.8)*m);const J=Math.tan(i.fov/2),s0=i.e[1],a0=Ho(i.e[0],i.e[2],q,F),$=Math.max(Math.atan((s0-b)/_)-Math.atan(.2*J),Math.atan((s0-.046)/a0)+Math.atan(.76*J),.06),t0=s0/Math.tan($);let e0=Math.atan2(R[f]-i.e[2],M[f]-i.e[0])-Math.atan2(i.t[2]-i.e[2],i.t[0]-i.e[0]);e0-=Math.round(e0/k0)*k0;const n0=3.6*m*(1+1.2*B0(.55,1,Math.abs(e0)/Math.atan(J)));i.tv[0]+=(n0*n0*(i.e[0]+q*t0-i.t[0])-2*n0*i.tv[0])*e,i.t[0]+=i.tv[0]*e,i.tv[2]+=(n0*n0*(i.e[2]+F*t0-i.t[2])-2*n0*i.tv[2])*e,i.t[2]+=i.tv[2]*e}else{const m=Math.max(0,1-e*4);i.tv[0]*=m,i.tv[2]*=m,i.t[0]+=i.tv[0]*e,i.t[2]+=i.tv[2]*e}u=!0}else if(_t&&ot===4&&(D0||Math.abs(i.tv[2])>2e-4)){const d=l0[0]&&K[0]>0,p=ut>0&&l0[ut]&&K[ut]>0?ut:0,m=d||p?o0(d&&p?(R[0]+R[p])*.5:R[d?0:p],C-g,g-C):i.t[2],f=1.6*B0(.1,.8,F0-Fe);i.tv[2]+=(f*f*(m-i.t[2])-2*f*i.tv[2])*e,i.t[2]+=i.tv[2]*e,i.e[2]+=i.tv[2]*e,u=!0}u&&(Jt(),Mt=!0,st=!0)}if(e>1e-4){for(let u=0;u<3;u++)i.ve[u]=o0((i.e[u]-i.pe[u])/e,-2,2),i.pe[u]=i.e[u],i.vt[u]=o0((i.t[u]-i.pt[u])/e,-2,2),i.pt[u]=i.t[u];i.vf=o0((i.fov-i.pf)/e,-1,1),i.pf=i.fov}if(l0[i.focusBall]){const u=Ft>.3&&l0[0]?0:i.focusBall,c=Math.hypot(M[u]-i.e[0],K[u]-i.e[1],R[u]-i.e[2]),x=Math.abs(c-Ht);x>1e-4&&(Ht+=(c-Ht)*(i.cut?1:Math.min(1,e*3.2)),x>.002&&(st=!0));const d=fa(u);Math.abs(d-qt)>.002&&(qt+=(d-qt)*(i.cut?1:Math.min(1,e*(d<qt?5:1.4)))),i.cut=!1}u0.vis&&(st=!0);const v=1/96*Ie*(e>.05?.6:1);if(st&&(ca(e,v,Ht),st=D0||u0.vis>0||l),a.sound.on&&(vo-=e,vo<=0&&(vo=2.2,a.sound.hit("noise",.03,{dur:2.8,cutoff:200})),D0&&(ho-=e,ho<=0))){ho=.12;let u=0;for(let c=0;c<D;c++)l0[c]&&mt[c]&&(u+=v0[c]*v0[c]+i0[c]*i0[c]);u>.02&&a.sound.hit("noise",Math.min(.12,.04+u*.012),{dur:.18,cutoff:280+Math.min(u*90,520)})}ia(Ht),h<1&&(t.enable(t.BLEND),t.blendColor(0,0,0,h),t.blendFunc(t.ZERO,t.CONSTANT_ALPHA),t.colorMask(!0,!0,!0,!1),t.useProgram($0.dof.p),t.bindVertexArray(y.vao),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.bindVertexArray(null),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0))}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
