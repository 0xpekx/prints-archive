// Shadow Lantern: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/037.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(le){le&&le.add({num:37,name:"Shadow Lantern",fam:"Worlds",recipe:"A kid's bedroom at night where a shadow lantern turns round a flame and throws its cut-out shapes on the walls, stretching and blurring the way real shadows do. Where the lantern sits and the drums change every mint. Drag to spin the drum faster, slower or backwards, tap the lantern to swap the drum, hold to dim the flame, or tap a shadow on the wall to catch it.",interactive:"Drag across the walls or the lantern to spin the drum faster, slower or backwards; tap the lantern to swap its drum; hold to dim the flame so the moonlit window takes over; tap a shadow on the wall to catch it.",music:!0,gl:!0,fps:30,seed:0,make($){const a=$.gl,w0=$.size,R=Math.PI*2,L0=$.hash.slice(2);let fe=parseInt(L0.slice(0,8),16)|0,gt=parseInt(L0.slice(8,16),16)|0,k0=parseInt(L0.slice(16,24),16)|0,Ft=parseInt(L0.slice(24,32),16)|0;const h0=()=>{const t=(fe+gt|0)+Ft|0;return Ft=Ft+1|0,fe=gt^gt>>>9,gt=k0+(k0<<3)|0,k0=k0<<21|k0>>>11,k0=k0+t|0,(t>>>0)/4294967296};for(let t=0;t<16;t++)h0();const Q0=t=>{let e=0;for(const s of t)e+=s[1];let r=h0()*e;for(const s of t)if(r-=s[1],r<=0)return s[0];return t[t.length-1][0]};let It=Q0([["paper drum and candle",44],["pierced tin",30],["coloured glass",19],["magic lantern",7]]),ue=Q0([["animals walking",30],["sea and ships",22],["forest and birds",20],["circus parade",16],["space and planets",12]]),wt=Q0([["plaster",34],["wallpaper",32],["wooden attic",24],["blanket tent",10]]),Ut=Q0([["moon",50],["snow",27],["rain",23]]),st=Q0([["none",76],["two lanterns",8],["a cat",8],["glow stars",8]]),Xt=Q0([["patchwork",34],["striped",26],["knitted",22],["star print",18]]),Y0=h0()<.55?2:3;const de=h0(),he=h0(),Tt=h0(),c1=h0();$.home&&(It="paper drum and candle",ue="animals walking",wt="wallpaper",Ut="moon",st="none",Xt="patchwork",Y0=3);let nt=(parseInt(L0.slice(32,40),16)^739982445)>>>0,m0=(t=>t<.56?"from the doorway":t<.86?"lying in bed, looking up":"close by the lantern")((()=>{nt=nt+1831565813|0;let t=Math.imul(nt^nt>>>15,1|nt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296})());$.home&&(m0="from the doorway");let ct=(parseInt(L0.slice(48,56),16)^3645504)>>>0;const xe=()=>{ct=ct+1831565813|0;let t=Math.imul(ct^ct>>>15,1|ct);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},pe=xe(),i1=xe(),s0=!$.home&&wt!=="blanket tent"&&st!=="two lanterns"&&st!=="a cat"?pe<.32?1:pe<.54?2:0:0;s0===1&&(m0=m0==="from the doorway"?"from across the room":m0==="close by the lantern"?"lying on the rug":m0),s0===2&&m0==="close by the lantern"&&(m0="from the doorway");const l1=!$.home&&s0===0&&m0==="from the doorway"&&i1<.45,zt=["from the doorway","lying in bed, looking up","close by the lantern","from across the room","lying on the rug"].indexOf(m0),Gt=["animals walking","sea and ships","forest and birds","circus parade","space and planets"],n0=[ue];for(;n0.length<Y0;){const t=Gt[Math.floor(h0()*Gt.length)%Gt.length];n0.includes(t)||n0.push(t)}s0===1&&n0[0]==="space and planets"&&(n0[0]=n0[1],n0[1]="space and planets");const o0=["paper drum and candle","pierced tin","coloured glass","magic lantern"].indexOf(It),J=["plaster","wallpaper","wooden attic","blanket tent"].indexOf(wt),_0=["moon","snow","rain"].indexOf(Ut),T0=["none","two lanterns","a cat","glow stars"].indexOf(st),Pt=["patchwork","striped","knitted","star print"].indexOf(Xt);$.trait("lantern",It),$.trait("drums",n0.join(" / ")),$.trait("room",wt),$.trait("window",Ut),$.trait("quilt",Xt),$.trait("turned by",o0===2?"a little motor":o0===3?"clockwork":"candle heat"),$.trait("rare",st),$.trait("view",m0),$.trait("stands",["on the bedside table","on the rug",J===2?"hung from the beam":"hung from the ceiling"][s0]);const R0=2.5,N0=1.05,D0=.95,M={x0:.1,z0:.24,x1:.6,z1:.76},x={cx:.36,cz:.52,by:.58,R:.13,y0:.615,y1:.855,fy:.66,bR:.148},qt=.58;if(s0){const t=s0===1?[1.1,1.65,0]:J===2?[1.23,.5,1.52]:[1,.65,1.72],e=t[2]-x.by;x.cx=t[0],x.cz=t[1],x.by+=e,x.y0+=e,x.y1+=e,x.fy+=e}const f1=[[.1,1.05,.1,2],[.05,.5,1.65,2],J===2?[1.23,1.95,.05,2]:[1,2.15,.05,2]][s0],me=s0===1?[1.8,4]:[.9,2.8],T=J===2?{x0:1.4,x1:2.2,y0:1,y1:1.92}:{x0:1.3,x1:2.2,y0:1,y1:2.1},u1=(()=>{const t=T.x1+.5,e=T.y1+.25,r=[t,e,0],s=[t-.75,e-.35,.3],i=[s[0]-.5,s[1]-.05,.9],d=[s[0]-.25,s[1]-.38,.8],c=[i[0]-.3,i[1]+.12,1.7],h=[t-.35,e+.18,.2],n=[i[0]-.2,i[1]-.22,1.7],f=[d[0]-.18,d[1]-.2,1.5],y=(L,q,k)=>L.map((I,y0)=>I+(q[y0]-I)*k),w=(L,q,k)=>[L[0]+q,L[1]+k,L[2]],E=[[r,s,.035,.022],[s,i,.02,.012],[s,d,.016,.009],[i,c,.011,.005],[y(r,s,.4),h,.014,.006],[i,n,.009,.004],[d,f,.008,.004],[c,w(c,-.16,.09),.005,.0022],[c,w(c,-.1,-.08),.004,.002],[n,w(n,-.14,-.03),.004,.002],[f,w(f,-.09,-.12),.004,.002],[h,w(h,-.15,.11),.006,.0025],[y(h,r,.3),w(h,.02,.17),.004,.002]],C=new Float32Array(E.length*8);return E.forEach(([L,q,k,I],y0)=>C.set([L[0],L[1],q[0],q[1],L[2],q[2],k,I],y0*8)),C})(),X=J===2?{a0:1.14,a1:1.44,b0:2.16,b1:2.46,yb:.95,yr:1.99}:{a0:1.04,a1:1.36,b0:2.14,b1:2.46,yb:.95,yr:2.2},H={x0:.72,x1:2.32,z1:.95,top:.52},A={cx:.62,cz:1.32,by:0,sc:.9},O=[[2.3,1,2.4],[2.08,.86,.5],[1.35,.92,1.45],[3,1.15,2],[2.25,.28,2.2]][zt],ve=[[.8,1.22,.2],[.5,1.8,.72],[.54,1,.14],[0,1,1.3],[.3,.95,1.25]][zt],d1=[72,84,58,68,64][zt]*Math.PI/180;s0===2&&J===2&&zt===0&&(ve[1]=1.5);const ye=(t,e)=>[t[0]-e[0],t[1]-e[1],t[2]-e[2]],Rt=t=>{const e=Math.hypot(t[0],t[1],t[2]);return[t[0]/e,t[1]/e,t[2]/e]},be=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],Ht=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],S0=Rt(ye(ve,O)),Ot=Rt(be(S0,[0,1,0])),it=be(Ot,S0),V0=Math.tan(d1/2),lt=l1?Ot.map(t=>-t):Ot,K0=(t,e)=>t[Math.floor(e*t.length)%t.length],h1=K0([[.8,.76,.68],[.74,.76,.72],[.8,.73,.68],[.72,.74,.76]],de),ge=K0([[[.56,.66,.58],[.82,.8,.7]],[[.52,.6,.74],[.84,.8,.7]],[[.74,.54,.52],[.86,.8,.7]],[[.8,.68,.46],[.86,.82,.72]]],de),x1=K0([[.3,.4,.58],[.66,.48,.2],[.56,.28,.3],[.32,.46,.34],[.78,.74,.64]],he),p1=K0([[.8,.78,.7],[.48,.6,.7],[.55,.38,.24],[.66,.48,.32]],Tt),Et=K0([[[.66,.26,.22],[.86,.78,.6],[.28,.4,.58],[.44,.58,.38]],[[.28,.38,.6],[.86,.84,.76],[.78,.54,.24],[.48,.64,.72]],[[.6,.38,.54],[.88,.82,.72],[.38,.54,.44],[.84,.64,.38]]],he*.7+Tt*.3),we=K0([[[.8,.7,.55],[.62,.18,.16]],[[.72,.74,.7],[.24,.34,.56]],[[.82,.66,.46],[.3,.44,.3]]],Tt),m1=`#version 300 es
void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Qt=`
uniform vec3 uE, uFw, uRt, uUp; uniform float uTh, uS;
float at2(float y, float x){ float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-30)); if (ay > ax) a = 1.5707963 - a; if (x < 0.0) a = 3.1415927 - a; return y < 0.0 ? -a : a; }
vec3 camRay(){ vec2 q = gl_FragCoord.xy / uS * 2.0 - 1.0; return normalize(uFw + (q.x * uRt + q.y * uUp) * uTh); }
vec3 octD(vec2 p){ vec3 n = vec3(p, 1.0 - abs(p.x) - abs(p.y)); if (n.z < 0.0) n.xy = (1.0 - abs(n.yx)) * vec2(n.x >= 0.0 ? 1.0 : -1.0, n.y >= 0.0 ? 1.0 : -1.0); return normalize(n); }
`,Te=`#version 300 es
precision highp float; precision highp int;
${Qt}
uniform vec4 uRm, uTb, uLn, uLn2, uWn, uCt, uCt2, uBd, uRr, uL2;
uniform int uSt, uCn, uNL, uR2, uR3, uR4, uR6;
uniform vec3 uLf, uMd;
uniform sampler2D uNz;
out uvec4 o;
float gT, gId; vec3 gN;
float nzs(vec2 p){ return textureLod(uNz, p / 256.0, 0.0).r - 0.5; }
void hit(float t, float id, vec3 n){ if (t > 1e-4 && t < gT) { gT = t; gId = id; gN = n; } }
void box(vec3 ro, vec3 ird, vec3 a, vec3 b, float id){
  vec3 t0 = (a - ro) * ird, t1 = (b - ro) * ird, mn = min(t0, t1), mx = max(t0, t1);
  float tn = max(max(mn.x, mn.y), mn.z), tf = min(min(mx.x, mx.y), mx.z);
  if (tn < tf && tn > 1e-4 && tn < gT) { gT = tn; gId = id; vec3 q = (ro + tn / ird - (a + b) * 0.5) / max((b - a) * 0.5, 1e-5); vec3 aq = abs(q);
    gN = aq.x >= aq.y && aq.x >= aq.z ? vec3(sign(q.x), 0.0, 0.0) : aq.y >= aq.z ? vec3(0.0, sign(q.y), 0.0) : vec3(0.0, 0.0, sign(q.z)); }
}
bool boxI(vec3 ro, vec3 ird, vec3 a, vec3 b, out float tn, out float tf){
  vec3 t0 = (a - ro) * ird, t1 = (b - ro) * ird, mn = min(t0, t1), mx = max(t0, t1);
  tn = max(max(mn.x, mn.y), mn.z); tf = min(min(mx.x, mx.y), mx.z); return tn < tf && tf > 0.0;
}
void cyl(vec3 ro, vec3 rd, vec2 c, float r, float y0, float y1, float id, bool cap){
  vec2 o = ro.xz - c; float a = dot(rd.xz, rd.xz), b = dot(o, rd.xz), k = dot(o, o) - r * r, h = b * b - a * k;
  if (h < 0.0) return; h = sqrt(h);
  float t = (-b - h) / a; float y = ro.y + rd.y * t;
  if (y > y0 && y < y1) hit(t, id, vec3((o.x + rd.x * t) / r, 0.0, (o.y + rd.z * t) / r));
  if (cap) { float tc = ((rd.y < 0.0 ? y1 : y0) - ro.y) / rd.y; vec2 q = o + rd.xz * tc; if (dot(q, q) < r * r) hit(tc, id, vec3(0.0, rd.y < 0.0 ? 1.0 : -1.0, 0.0)); }
}
float sdRB(vec3 p, vec3 b, float r){ vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
#ifdef TENT
float hcT(vec2 q){ return 1.66 - 0.2 * sin(3.1416 * clamp(q.x / 1.55, 0.0, 1.0)) * sin(3.1416 * clamp(q.y / 1.45, 0.0, 1.0)) + 0.03 * sin(q.x * 7.0 + q.y * 3.0) * sin(q.y * 5.0 + 1.0) + 0.04 * nzs(q * 2.5); }
float tentD(vec3 p){
  float hc = hcT(p.xz);
  float rf = max(abs(p.y - hc) * 0.7 - 0.008, max(p.x - 1.55, p.z - 1.45));
  float bot = 1.2 + 0.05 * sin(p.x * 9.0) + 0.04 * nzs(p.xz * 6.0) - 0.03 * abs(sin(p.x * 21.0));
  float vz = 1.45 + 0.04 * sin(p.x * 15.0 + 0.6 * sin(p.y * 4.0)) * smoothstep(hc, bot, p.y);
  float fv = max(abs(p.z - vz) * 0.7 - 0.008, max(max(bot - p.y, p.y - hc), max(p.x - 1.55, -p.x)));
  float botS = 1.17 + 0.05 * sin(p.z * 8.0 + 1.0) + 0.04 * nzs(p.zx * 6.0) - 0.03 * abs(sin(p.z * 19.0));
  float vx = 1.55 + 0.04 * sin(p.z * 14.0 + 0.6 * sin(p.y * 4.0)) * smoothstep(hc, botS, p.y);
  float sv = max(abs(p.x - vx) * 0.7 - 0.008, max(max(botS - p.y, p.y - hc), max(p.z - 1.45, -p.z)));
  return min(rf, min(fv, sv));
}
#endif
float softD(vec3 p, out float id){
  vec3 bc = vec3((uBd.x + uBd.y) * 0.5, (0.24 + uBd.w) * 0.5, (uBd.z + 0.0) * 0.5);
  vec3 bb = vec3((uBd.y - uBd.x) * 0.5 - 0.005, (uBd.w - 0.24) * 0.5, uBd.z * 0.5 - 0.005);
  float hang = smoothstep(uBd.w - 0.08, 0.26, p.y);
  float top = smoothstep(uBd.w - 0.1, uBd.w - 0.03, p.y), frt = smoothstep(uBd.z - 0.1, uBd.z - 0.03, p.z);
  float fold = nzs(p.xz * 2.0);
  // the covers are turned down before the pillow, cover and sheet together: a soft roll at the fold, the doubled part back
  // toward the foot to a wandering free edge; down the side it swings toward the foot and hangs lower than the single cover.
  // Head side of the fold: the sheet, pulled flat down the side to the tuck (then the mattress)
  float tb = uBd.y - 0.46 + 0.03 * sin(p.z * 5.0 + 1.0) - 0.16 * max(uBd.w - p.y, 0.0);
  float fe = tb - 0.28 + 0.07 * fold + 0.008 * sin(p.z * 17.0 + p.y * 14.0 + 2.0);
  float hd = smoothstep(tb - 0.01, tb + 0.015, p.x), tk = smoothstep(0.35, 0.37, p.y);
  float sheet = hd * tk;
  float band = smoothstep(fe - 0.025, fe + 0.025, p.x) * (1.0 - hd);
  // quilting: each patch pillows up between its seams (the same cells the albedo paints, mirrored on the turned part)
  vec3 pq = p; if (p.x > fe && p.x < tb) pq.x = 2.0 * tb - p.x;
  vec3 qs = abs(sin(pq * (3.14159 / uRr.z)));
  float puff = pow(mix(mix(qs.z * qs.y, qs.x * qs.y, frt), qs.x * qs.z, top) + 1e-4, 0.45) * (1.0 - hd) * smoothstep(0.0, 0.025, abs(p.x - fe));
  float cr = max(sin((p.x - p.y * 1.2) * 30.0 + 2.0 * fold), 0.0); cr *= cr; cr *= cr;
  float wr = 0.004 * sin(p.x * 17.0 + 2.0 * sin(p.z * 7.0)) + 0.003 * sin(p.z * 23.0 + p.x * 5.0) + 0.016 * nzs(p.xz * 3.0)
    + hang * (1.0 - hd) * (0.005 + 0.016 * (0.5 + nzs(p.xz * 1.3 + 9.0))) * sin(p.x * 31.0 + p.z * 27.0 + 3.0 * fold)
    + uRr.w * puff - 0.014 * sheet - 0.024 * hd * (1.0 - tk) + mix(0.022, 0.008, hang) * band + 0.01 * cr * sheet * (1.0 - 0.7 * top);
#ifdef CAT
  { vec2 dq = (p.xz - vec2(uBd.x + 0.32, uBd.z * 0.56)) / vec2(0.15, 0.12); wr -= 0.026 * exp(-dot(dq, dq)) * (1.0 - hang); }
#endif
  vec3 pb = p - bc; pb.y += hang * (1.0 - hd) * 0.02 * sin(p.x * 8.0 + p.z * 9.0 + 4.0 * fold);
  // the doubled part hangs 3 to 5 cm lower (its free corner lowest) and stands a little proud of the side
  float dr = band * (0.03 + 0.02 * smoothstep(tb - 0.05, fe + 0.05, p.x)), pf = 0.012 * band;
  pb.yz += vec2(dr, -pf) * 0.5;
  float db = sdRB(pb, bb + vec3(0.0, dr, pf) * 0.5, 0.07);
  float rr = mix(0.03, 0.012, hang);
  float d = smin(db - wr, length(vec2(p.x - tb + rr, db - rr * 0.5)) - rr, 0.012); id = 18.0;
  // the pillow: a filled bag, its faces swelling at once from a seam round a rounded outline (pinched ears), sunk into the mattress
  vec3 pp = p - vec3(uBd.y - 0.215, uBd.w + 0.047, uBd.z * 0.5);
  pp.xy = vec2(0.9553 * pp.x + 0.2955 * pp.y, -0.2955 * pp.x + 0.9553 * pp.y);
  vec2 pe = pp.xz / vec2(0.17, 0.32); pe = clamp(1.0 - pe * pe, 0.0, 1.0);
  vec2 dn = (pp.xz - vec2(-0.01, 0.04)) / vec2(0.07, 0.11);
  vec2 bq = abs(pp.xz) - vec2(0.105, 0.255) - vec2(0.018, 0.012) * (1.0 - pp.zx * pp.zx / vec2(0.1, 0.027));
  float ol = length(max(bq, 0.0)) + min(max(bq.x, bq.y), 0.0) - 0.06;
  float sw = clamp(-ol / 0.08, 0.0, 1.0); sw = sw * (2.0 - sw);
  float th = 0.003 + (0.008 + 0.062 * pow(pe.x * pe.y + 1e-4, 0.4) * (1.0 - 0.3 * exp(-dot(dn, dn)))) * sw + 0.005 * nzs(pp.xz * 8.0) * sw;
  float pl = max(abs(pp.y) - th, ol) * 0.6;
  if (pl < d) { d = pl; id = 19.0; }
#ifdef TENT
  { float td = tentD(p); if (td < d) { d = td; id = 22.0; } }
#endif
  return d;
}
// soft objects (bed, pillow, tent): one marching loop that also takes the normal at the hit
float softT(vec3 ro, vec3 rd, float tmax, out float pen, float k, bool wantN, out vec3 nrm, out float sid){
  vec3 ird = 1.0 / rd; float t0 = 1e4, t1 = -1.0, a, b;
  if (boxI(ro, ird, vec3(uBd.x - 0.04, 0.2, -0.01), vec3(uBd.y + 0.04, uBd.w + 0.16, uBd.z + 0.04), a, b)) { t0 = min(t0, a); t1 = max(t1, b); }
  if (uRm.x == 3.0 && boxI(ro, ird, vec3(-0.01, 1.08, -0.01), vec3(1.63, 1.76, 1.52), a, b)) { t0 = min(t0, a); t1 = max(t1, b); }
  pen = 1.0; nrm = vec3(0.0, 1.0, 0.0); sid = 18.0;
  t0 = max(t0, 0.0); t1 = min(t1, tmax);
  if (t1 < t0) return -1.0;
  float t = t0, id, th = -1.0; int ph = 0; vec3 hp = vec3(0.0), n = vec3(0.0);
  bool go = true;
  for (int i = 0; i < uSt && go; i++) {
    vec3 e = vec3((ph == 1 || ph == 4) ? 1.0 : -1.0, ph >= 3 ? 1.0 : -1.0, (ph == 2 || ph == 4) ? 1.0 : -1.0);
    vec3 q = ph == 0 ? ro + rd * t : hp + e * 0.0015;
    float d = softD(q, id);
    if (ph == 0) {
      if (t > t1) go = false;
      else if (d < 0.0005) { pen = 0.0; th = t; sid = id; go = wantN; hp = q; ph = 1; }
      else { pen = min(pen, k * d / max(t, 0.02)); t += max(d * 0.7, 0.0012); }
    } else { n += e * d; ph++; if (ph == 5) { nrm = normalize(n); go = false; } }
  }
  return th;
}
float curtZ(vec2 q, float a0, float a1, float ph, out vec2 gr){
  float u = (q.x - a0) / (a1 - a0); float g = smoothstep(uCt2.y, uCt2.x, q.y);
  float arg = u * 18.85 + ph + 0.8 * sin(q.y * 2.1 + ph); float amp = 0.028 * (0.7 + 0.6 * g); float ca = cos(arg) * amp;
  float arg2 = u * 31.0 + 2.3 * ph + 1.1 * sin(q.y * 1.3 + 2.0 * ph) + 1.5 * sin(u * 5.0 + ph); float amp2 = 0.013 * (0.35 + g); float cb = cos(arg2) * amp2;
  gr = vec2((ca * 18.85 + cb * (31.0 + 7.5 * cos(u * 5.0 + ph))) / (a1 - a0), ca * 0.8 * 2.1 * cos(q.y * 2.1 + ph) + cb * 1.1 * 1.3 * cos(q.y * 1.3 + 2.0 * ph));
  return 0.062 + amp * sin(arg) + amp2 * sin(arg2) + 0.006 * nzs(q * 4.0) + 0.012 * g * sin(u * 3.14);
}
void curtains(vec3 ro, vec3 rd){
  vec3 ird = 1.0 / rd; vec2 gr;
  for (int k = 0; k < uR2; k++) {
    float a0 = k == 0 ? uCt.x : uCt.z, a1 = k == 0 ? uCt.y : uCt.w, ph = float(k) * 1.7;
    float tn, tf; bool go = boxI(ro, ird, vec3(a0, uCt2.x, 0.0), vec3(a1, uCt2.y, 0.135), tn, tf);
    tn = max(tn, 0.0); go = go && !(tn > gT);
    // march uCn + 1 samples; at the first one inside, bisect uR6 times between it and the last one outside
    float dt = (tf - tn) / float(uCn), tp = tn, a = 0.0, b = 0.0, th = 0.0; vec3 hn = vec3(0.0); int i = 0, j = 0; bool bis = false, got = false;
    for (int s = 0; s < uCn + 1 + uR6 && go; s++) {
      float t = bis ? (a + b) * 0.5 : tn + dt * float(i); vec3 p = ro + rd * t;
      bool inside = p.z - curtZ(p.xy, a0, a1, ph, gr) < 0.0;
      if (bis) {
        if (inside) b = t; else a = t;
        j++; if (j == uR6) { th = b; hn = normalize(vec3(-gr, 1.0)); got = true; go = false; }
      } else if (inside) {
        if (i == 0) { th = tn; hn = abs(p.x - a1) < 0.002 ? vec3(1.0, 0.0, 0.0) : abs(p.x - a0) < 0.002 ? vec3(-1.0, 0.0, 0.0) : vec3(0.0, p.y > 1.5 ? 1.0 : -1.0, 0.0); got = true; go = false; }
        else { a = tp; b = t; bis = true; }
      } else { tp = t; i++; go = i <= uCn; }
    }
    if (got) hit(th, 16.0, hn);
  }
}
// boxes and vertical cylinders come from uniform lists (w of the second vec4: 1 = also blocks the flame)
uniform vec4 uBx[96]; uniform vec4 uCy[32]; uniform int uNB, uNC;
void solids(vec3 ro, vec3 rd, bool occOnly){
  vec3 ird = 1.0 / rd;
  for (int i = 0; i < uNB; i++) { vec4 a = uBx[2 * i], b = uBx[2 * i + 1]; if (!(occOnly && b.w < 0.5)) box(ro, ird, a.xyz, b.xyz, a.w); }
  for (int i = 0; i < uNC; i++) { vec4 a = uCy[2 * i], b = uCy[2 * i + 1]; if (!(occOnly && b.w < 0.5)) cyl(ro, rd, a.xy, a.z, b.x, b.y, a.w, b.z > 0.5); }
}
void trace(vec3 ro, vec3 rd){
  gT = 1e4; gId = 0.0; gN = vec3(0.0, 1.0, 0.0);
  vec3 ird = 1.0 / rd;
  float CH = uRm.y; bool att = uRm.x == 2.0; float xf = (CH - uRm.z) / uRm.w;
  if (rd.y < 0.0) hit(-ro.y / rd.y, 1.0, vec3(0.0, 1.0, 0.0));
  if (rd.x < 0.0) { float t = -ro.x / rd.x; float y = ro.y + rd.y * t; if (!att || y < uRm.z) hit(t, 2.0, vec3(1.0, 0.0, 0.0)); }
  if (rd.z < 0.0) {
    float t = -ro.z / rd.z; vec3 p = ro + rd * t;
    if (p.x > uWn.x && p.x < uWn.y && p.y > uWn.z && p.y < uWn.w) {
      float tg = (-0.1 - ro.z) / rd.z;
      float te = 1e4; vec3 n = vec3(0.0);
      float tx0 = (uWn.x - ro.x) * ird.x, tx1 = (uWn.y - ro.x) * ird.x, ty0 = (uWn.z - ro.y) * ird.y, ty1 = (uWn.w - ro.y) * ird.y;
      if (rd.x < 0.0 && tx0 > t) { te = tx0; n = vec3(1.0, 0.0, 0.0); }
      if (rd.x > 0.0 && tx1 > t && tx1 < te) { te = tx1; n = vec3(-1.0, 0.0, 0.0); }
      if (rd.y < 0.0 && ty0 > t && ty0 < te) { te = ty0; n = vec3(0.0, 1.0, 0.0); }
      if (rd.y > 0.0 && ty1 > t && ty1 < te) { te = ty1; n = vec3(0.0, -1.0, 0.0); }
      if (tg < te) hit(tg, 14.0, vec3(0.0, 0.0, 1.0)); else hit(te, 15.0, n);
    } else hit(t, 3.0, vec3(0.0, 0.0, 1.0));
  }
  if (att) {
    float den = rd.y - uRm.w * rd.x;
    if (abs(den) > 1e-5) { float t = (uRm.z + uRm.w * ro.x - ro.y) / den; float x = ro.x + rd.x * t; if (x < xf && x > -0.01) hit(t, 5.0, normalize(vec3(uRm.w, -1.0, 0.0))); }
    if (rd.y > 0.0) { float t = (CH - ro.y) / rd.y; if (ro.x + rd.x * t >= xf) hit(t, 4.0, vec3(0.0, -1.0, 0.0)); }
  } else if (rd.y > 0.0) hit((CH - ro.y) / rd.y, 4.0, vec3(0.0, -1.0, 0.0));
  solids(ro, rd, false);
  for (int k = 0; k < uNL; k++) {
    vec2 c = k == 0 ? uLn.xy : uL2.xy; float y1 = k == 0 ? uLn2.y : uL2.z + (uLn2.y - uLn.z) * uL2.w; float R = uLn.w * (k == 0 ? 1.0 : uL2.w);
    if (rd.y < 0.0) { float t = (y1 - ro.y) / rd.y; vec2 q = ro.xz + rd.xz * t - c; if (dot(q, q) < R * R) hit(t, 11.0, vec3(0.0, 1.0, 0.0)); }
  }
  curtains(ro, rd);
}
float occFast(vec3 ro, vec3 rd, float tmax){
  gT = tmax; gId = 0.0;
  solids(ro, rd, true);
  if (gT < tmax) return 0.0;
  if (ro.z < 0.02 && rd.z > 0.0) { float t = (0.05 - ro.z) / rd.z; vec3 p = ro + rd * t;
    if (t < tmax && p.y > uCt2.x && p.y < uCt2.y && ((p.x > uCt.x && p.x < uCt.y) || (p.x > uCt.z && p.x < uCt.w))) return 0.25; }
  return 1.0;
}
vec2 octE(vec3 n){ n /= abs(n.x) + abs(n.y) + abs(n.z); vec2 p = n.xy; if (n.z < 0.0) p = (1.0 - abs(p.yx)) * vec2(p.x >= 0.0 ? 1.0 : -1.0, p.y >= 0.0 ? 1.0 : -1.0); return p; }
float starMask(vec3 P){
  vec2 q = P.xz * 2.6; vec2 ci = floor(q); vec2 f = fract(q) - 0.5;
  vec4 h = textureLod(uNz, (ci + 0.5) / 256.0 * 7.0 + 0.31, 0.0);
  if (h.r > 0.55) return 0.0;
  f -= (h.gb - 0.5) * 0.5; float r = length(f); float a = at2(f.y, f.x) + h.a * 6.0;
  float st = (0.07 + 0.08 * h.a) * (0.55 + 0.45 * cos(a * 5.0));
  return smoothstep(st + 0.012, st - 0.012, r);
}
`,v1=Te+`void main(){
  vec3 rd = camRay();
  trace(uE, rd);
  float t = gT, id = gId; vec3 N = gN;
  float pen, sid; vec3 sn; float ts = softT(uE, rd, t, pen, 1.0, true, sn, sid);
  if (ts > 0.0) { t = ts; N = sn; id = sid; }
  vec3 P = uE + rd * t;
  float star = 0.0;
  if ((id == 4.0 || id == 5.0) && uRr.x == 3.0) star = starMask(P);
  o = uvec4(floatBitsToUint(t), packHalf2x16(octE(N)), uint(id + 0.5) | (uint(star * 255.0) << 8u), 0u);
}
`,y1=Te+`precision highp usampler2D; uniform usampler2D uGq;
void main(){
  vec3 rd = camRay();
  uvec4 g = texelFetch(uGq, ivec2(gl_FragCoord.xy), 0);
  vec3 P = uE + rd * uintBitsToFloat(g.x), N = octD(unpackHalf2x16(g.y)); float id = float(g.z & 255u), lv = 1.0, mv = 1.0;
  if (id != 10.0 && id != 11.0 && id != 14.0 && id != 21.0 && id != 9.0) {
    vec3 ro = P + N * 0.003;
    for (int r = 1; r < uR3; r++) {
      vec3 dir; float tmax, kk;
      if (r == 1) { vec3 L = uLf - ro; float dl = length(L); dir = L / dl; tmax = dl - 0.17; kk = dl / 0.008; }
      else { if (!(uMd.z < 0.0 && P.z > -0.05)) { mv = 0.0; break; } dir = uMd; tmax = max(0.0, -ro.z / uMd.z - 0.02); kk = 40.0; }
      float vis = occFast(ro, dir, tmax);
      float pen = 1.0, ts = -1.0, sid; vec3 sn;
      if (vis > 0.0) ts = softT(ro, dir, tmax, pen, kk, false, sn, sid);
      float v = ts > 0.0 ? 0.0 : vis * clamp(pen, 0.0, 1.0);
      if (r == 1) lv = v; else mv = v;
    }
  }
  o = uvec4(packUnorm2x16(vec2(lv, mv)), 0u, 0u, 0u);
}
`,b1=`#version 300 es
precision highp float; precision highp int; precision highp usampler2D;
${Qt}
uniform usampler2D uG; uniform sampler2D uNz;
uniform vec4 uRm, uTb, uBd, uWn, uLn;
uniform vec3 uWall, uPa, uPb, uTab, uCur, uQ0, uQ1, uQ2, uQ3, uTa, uTb2;
uniform vec4 uK, uWx, uMn;
out vec4 o;
float N1(vec2 p){ return textureLod(uNz, p / 256.0, 0.0).r; }
float N2(vec2 p){ return textureLod(uNz, p / 256.0, 0.0).g; }
float fbm(vec2 p){ return N1(p) * 0.5 + N1(p * 2.03 + 17.0) * 0.25 + N1(p * 4.1 + 41.0) * 0.125 + N1(p * 8.3 + 70.0) * 0.0625; }
float h21(vec2 p){ return textureLod(uNz, (floor(p) + 0.5) / 256.0, 0.0).b; }
vec3 wood(vec2 p, vec3 dk, vec3 lt){
  float w = N1(vec2(p.x * 2.0, p.y * 25.0)) * 2.0 + N1(vec2(p.x * 7.0, p.y * 60.0)) * 0.6;
  float ring = fract(p.y * 32.0 + w);
  float g = smoothstep(0.0, 0.2, ring) * smoothstep(1.0, 0.45, ring);
  float fine = N2(vec2(p.x * 25.0, p.y * 380.0));
  return mix(dk, lt, clamp(g * 0.5 + fine * 0.5, 0.0, 1.0));
}
vec3 boards(vec2 p, float bw, vec3 dk, vec3 lt, out float gap){
  float row = floor(p.x / bw); float f = fract(p.x / bw);
  float off = h21(vec2(row, 3.0)) * 3.0; float L = 1.4 + h21(vec2(row, 5.0)) * 0.8; float along = (p.y + off) / L; float seg = floor(along);
  float tint = h21(vec2(row, seg + 11.0));
  gap = smoothstep(0.0, 0.02, f) * smoothstep(1.0, 0.98, f) * smoothstep(0.0, 0.003 / L, fract(along)) * smoothstep(1.0, 1.0 - 0.003 / L, fract(along));
  return wood(vec2(p.y + row * 7.3 + seg * 3.1, f * bw + row * 0.37), dk, lt) * (0.84 + 0.3 * tint);
}
vec3 winStatic(vec3 P, vec3 rd){
  float e = clamp(rd.y, -0.2, 1.0);
  bool cloud = uWx.x > 0.5;
  float az = at2(rd.x, -rd.z);
  vec3 c = mix(cloud ? vec3(0.05, 0.05, 0.06) : vec3(0.03, 0.035, 0.048), cloud ? vec3(0.03, 0.03, 0.036) : vec3(0.004, 0.007, 0.018), smoothstep(-0.05, 0.5, e));
  float md = dot(rd, uMn.xyz);
  c += (cloud ? vec3(0.08, 0.08, 0.09) : vec3(0.05, 0.065, 0.1)) * exp((md - 1.0) * (cloud ? 3.0 : 5.0));
  if (!cloud) {
    // thin moonlit cloud bars low in the sky, and stars of many brightnesses behind them
    float cl = smoothstep(0.5, 0.8, fbm(vec2(az * 9.0, e * 50.0 + az * 6.0))) * smoothstep(0.6, 0.1, e);
    vec2 sq = vec2(az, rd.y) * 300.0; vec2 ci = floor(sq); float sb = h21(ci + 2.0);
    c += vec3(0.8, 0.85, 1.0) * step(0.975, h21(ci)) * smoothstep(0.3, 0.02, length(fract(sq) - 0.5 - (vec2(h21(ci + 5.0), h21(ci + 9.0)) - 0.5) * 0.4)) * (0.03 + 0.6 * sb * sb * sb * sb) * (1.0 - cl) * smoothstep(-0.02, 0.2, e);
    c += vec3(0.022, 0.028, 0.04) * cl;
  }
  { vec3 S2 = P + rd * ((-170.0 - P.z) / rd.z); if (S2.y < 5.0 + 7.0 * N1(vec2(S2.x * 0.04, 61.0)) + 1.6 * N1(vec2(S2.x * 0.35, 13.0))) c = mix(c, cloud ? vec3(0.036, 0.036, 0.044) : vec3(0.014, 0.018, 0.028), 0.8); }
  float tS = (-55.0 - P.z) / rd.z; vec3 S = P + rd * tS;
  float sx = S.x; float wcell = 5.0 + 4.0 * h21(vec2(floor(sx / 9.0), 9.0)); float cell = floor(sx / wcell); float f = fract(sx / wcell); float hh = h21(vec2(cell, 4.0));
  float rh = 1.5 + hh * 4.5 - abs(f - 0.5) * (hh > 0.45 ? 3.5 : 0.3) * (wcell / 7.0);
  float chim = step(0.55, h21(vec2(cell, 8.0))) * step(abs(f - 0.28 - 0.3 * h21(vec2(cell, 12.0))), 0.03) * 1.1;
  float tree = 1.2 + 6.0 * smoothstep(0.38, 0.7, N1(vec2(sx * 0.3, 30.0))) * (0.7 + 0.3 * N1(vec2(sx * 1.3, 77.0))) + 0.5 * N1(vec2(sx * 6.0, 150.0)) + 0.25 * N1(vec2(sx * 19.0, 99.0));
  float hgt = max(rh + chim, tree);
  if (S.y < hgt) {
    vec3 sil = cloud ? vec3(0.03, 0.03, 0.038) : vec3(0.008, 0.012, 0.022);
    if (uWx.x > 0.5 && uWx.x < 1.5) sil = mix(sil, vec3(0.13, 0.14, 0.16), smoothstep(hgt - 0.5, hgt - 0.05, S.y) * step(S.y, rh + chim + 0.01));
    vec2 wq = vec2(sx * 1.1, S.y * 0.9); vec2 wi = floor(wq);
    float lit = step(0.88, h21(wi + vec2(cell * 3.0, 1.0))) * step(S.y, rh - 0.9) * step(0.4, S.y) * step(rh + chim, hgt + 0.001) * smoothstep(0.3, 0.2, abs(fract(wq.x) - 0.5)) * smoothstep(0.3, 0.2, abs(fract(wq.y) - 0.5));
    c = sil + vec3(1.0, 0.68, 0.32) * lit * 0.4;
  }
  return c;
}
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy);
  uvec4 gq = texelFetch(uG, ip, 0);
  vec3 P = uE + camRay() * uintBitsToFloat(gq.x);
  float id = float(gq.z & 255u); float star = float(gq.z >> 8u) / 255.0; vec3 N = octD(unpackHalf2x16(gq.y));
  vec3 c = vec3(0.7); float ao = 1.0;
  float CH = uRm.y;
#if AP == 2
  if (!(id == 6.0 || id == 7.0 || id == 8.0 || id == 26.0 || id == 21.0 || id == 9.0 || id == 14.0 || id == 13.0 || id == 15.0)) discard;
#elif AP == 3
  if ((id > 0.5 && id < 9.5) || id == 13.0 || id == 14.0 || id == 15.0 || id == 21.0 || id == 26.0) discard;
#endif
#if AP == 1
  if (id == 1.0) {
    float gp; c = boards(vec2(P.x, P.z), 0.13, vec3(0.26, 0.15, 0.08), vec3(0.50, 0.32, 0.18), gp);
    c *= mix(0.4, 1.0, gp);
    vec2 rq = (P.xz - vec2(0.95, 1.5)) / vec2(0.78, 0.44); float rr = length(rq);
    if (rr < 1.0) {
      float ring = rr * 24.0; float ang = at2(rq.y, rq.x);
      float twist = sin(ang * 90.0 * (0.4 + rr) + ring * 6.2832 * 0.5) * 0.5 + 0.5;
      float rim = abs(fract(ring) - 0.5) * 2.0;
      vec3 rc = mix(uQ0, uQ1, step(0.5, fract(floor(ring / 3.0) * 0.37))); rc = mix(rc, uQ2, step(0.72, fract(floor(ring / 2.0) * 0.61)));
      rc = mix(rc, (uQ0 + uQ1 + uQ2) * 0.33, 0.35) * (0.8 + 0.4 * h21(vec2(floor(ring), 3.0)));
      c = mix(c, rc * 0.8 * (0.7 + 0.3 * twist) * (0.75 + 0.25 * smoothstep(1.0, 0.6, rim)) * (0.9 + 0.1 * N1(P.xz * 200.0)), smoothstep(1.0, 0.985, rr));
    }
    vec2 dt = max(max(vec2(uTb.x, uTb.y) - P.xz, P.xz - vec2(uTb.z, uTb.w)), 0.0);
    ao *= 1.0 - 0.6 * exp(-length(dt) * 10.0);
    vec2 db = max(max(vec2(uBd.x, 0.0) - P.xz, P.xz - vec2(uBd.y, uBd.z)), 0.0);
    ao *= 1.0 - 0.7 * exp(-length(db) * 8.0);
    ao *= 1.0 - 0.35 * exp(-min(P.x, P.z) * 6.0);
  } else if (id == 2.0 || id == 3.0) {
    vec2 w = id == 2.0 ? vec2(P.z, P.y) : vec2(P.x, P.y);
    float mott = fbm(w * 2.5) - 0.5;
    c = uWall * (1.0 + 0.1 * mott + 0.05 * (N1(w * 140.0) - 0.5));
    if (uRm.x == 1.0) {
      if (P.y > 0.875) {
        vec2 cell = w / 0.16; vec2 ci = floor(cell); vec2 f = fract(cell) - 0.5;
        if (mod(ci.y, 2.0) > 0.5) f.x = fract(cell.x + 0.5) - 0.5;
        float r = length(f); float a = at2(f.y, f.x);
        float petal = smoothstep(0.13 + 0.05 * cos(a * 5.0), 0.1 + 0.05 * cos(a * 5.0), r);
        float leaf = smoothstep(0.05, 0.03, length((f - vec2(0.13, -0.13)) * vec2(1.0, 2.2)));
        float stripe = smoothstep(0.012, 0.004, abs(fract(w.x / 0.32 + 0.25) - 0.5) * 0.32);
        c = uPb * (1.0 + 0.07 * mott);
        c = mix(c, uPa, petal * 0.7); c = mix(c, uPa * vec3(0.8, 1.05, 0.8), leaf * 0.55); c = mix(c, uPa * 1.05, stripe * 0.35);
        c = mix(c, uPa * 0.92, 0.45 * smoothstep(0.03, 0.018, length(f + vec2(0.27, 0.3))));
        c *= (0.94 + 0.06 * N1(w * 180.0)) * (0.96 + 0.08 * N1(vec2(w.x * 300.0, w.y * 14.0))) * (1.0 - 0.07 * smoothstep(0.003, 0.0, abs(fract(w.x / 0.53) - 0.5) * 0.53));
      } else {
        float pl = fract(w.x / 0.11); c = uWall * vec3(0.98, 0.98, 0.96) * (1.0 - 0.25 * smoothstep(0.006, 0.0, abs(P.y - 0.845)) + 0.08 * smoothstep(0.012, 0.0, abs(P.y - 0.862))) * (0.9 + 0.1 * smoothstep(0.0, 0.05, pl) * smoothstep(1.0, 0.95, pl)) * (0.96 + 0.04 * N1(w * 60.0));
      }
    }
    if (uRm.x == 2.0) { float gp; c = boards(w, 0.16, vec3(0.40, 0.26, 0.14), vec3(0.66, 0.48, 0.28), gp); c *= mix(0.45, 1.0, gp); }
    float other = id == 2.0 ? P.z : P.x;
    ao *= 1.0 - 0.3 * exp(-other * 6.0);
    ao *= 1.0 - 0.3 * exp(-P.y * 7.0);
    float cd = uRm.x == 2.0 ? (id == 2.0 ? uRm.z - P.y : CH - P.y) : CH - P.y;
    ao *= 1.0 - 0.22 * exp(-max(cd, 0.0) * 6.0);
    if (id == 2.0) ao *= 1.0 - 0.5 * exp(-9.0 * length(max(max(vec2(uTb.y, 0.0) - vec2(P.z, P.y), vec2(P.z, P.y) - vec2(uTb.w, uLn.z)), 0.0)));
    if (id == 3.0) ao *= 1.0 - 0.45 * exp(-8.0 * length(max(max(vec2(uBd.x, 0.0) - vec2(P.x, P.y), vec2(P.x, P.y) - vec2(uBd.y, 0.6)), 0.0)));
  } else if (id == 4.0 || id == 5.0) {
    c = vec3(0.84, 0.82, 0.78) * (1.0 + 0.07 * (fbm(P.xz * 2.0) - 0.5));
    if (uRm.x == 2.0) { float gp; c = boards(vec2(P.z, P.x * 1.38), 0.14, vec3(0.62, 0.55, 0.45), vec3(0.86, 0.8, 0.7), gp); c *= mix(0.6, 1.0, gp); }
    if (star > 0.05) c = mix(c, vec3(0.86, 0.9, 0.62), star);
    ao *= 1.0 - 0.25 * exp(-min(P.x, P.z) * 6.0);
  } else discard;
#elif AP == 2
  if (id == 6.0) {
    c = uRm.x == 2.0 ? vec3(0.45, 0.3, 0.17) : uWall * vec3(1.06, 1.05, 1.0) * 1.04;
  } else if (id == 7.0) {
    vec2 wq = abs(N.y) > 0.5 ? P.xz : (abs(N.x) > 0.5 ? P.zy : P.xy);
    c = uTab * (0.93 + 0.08 * N1(wq * 150.0)) * (0.9 + 0.1 * fbm(wq * vec2(4.0, 30.0)));
    if (abs(N.x) > 0.5 && P.y < uLn.z - 0.04 && P.y > 0.14) {
      float g = smoothstep(0.004, 0.0, abs(P.y - 0.43)) + smoothstep(0.004, 0.0, abs(P.z - uTb.y - 0.035)) + smoothstep(0.004, 0.0, abs(P.z - uTb.w + 0.035));
      c *= 1.0 - 0.5 * clamp(g, 0.0, 1.0);
    }
    ao *= 1.0 - 0.4 * exp(-P.y * 10.0);
  } else if (id == 8.0 || id == 26.0) {
    c = vec3(0.72, 0.55, 0.3);
  } else if (id == 21.0) {
    c = vec3(0.3, 0.28, 0.26);
  } else if (id == 9.0) {
    c = wood(vec2(at2(P.z - uLn.y, P.x - uLn.x) * 0.15, P.y), vec3(0.22, 0.11, 0.05), vec3(0.40, 0.23, 0.11));
  } else if (id == 14.0) {
    c = winStatic(P, normalize(P - uE));
  } else if (id == 13.0 || id == 15.0) {
    c = vec3(0.86, 0.85, 0.82) * (0.95 + 0.05 * N1(P.xy * 200.0));
  }
#else
  if (id == 16.0) {
    vec2 w = vec2(P.x * 1.6 + P.z, P.y);
    c = uCur * (0.86 + 0.14 * N1(vec2(w.x * 40.0, w.y * 300.0))) * (0.88 + 0.24 * fbm(w * 4.0));
    if (uK.y > 0.5) { float gx = smoothstep(0.35, 0.65, abs(fract(w.x * 9.0) - 0.5) * 2.0), gy = smoothstep(0.35, 0.65, abs(fract(w.y * 9.0) - 0.5) * 2.0); c *= 0.8 + 0.2 * (gx + gy) * 0.5 + 0.08 * gx * gy; }
  } else if (id == 17.0 || id == 24.0) {
    vec2 wq = abs(N.z) > 0.5 ? P.xy : (abs(N.x) > 0.5 ? P.zy : P.xz);
    c = wood(wq.yx * vec2(1.0, 1.0) + wq.x * 0.0, vec3(0.30, 0.17, 0.08), vec3(0.50, 0.31, 0.16));
    if (id == 24.0) c *= 0.8;
  } else if (id == 18.0) {
    // the turned part (the same fold and free edge as softD) shows the cover's own pattern mirrored about the fold
    float tb = uBd.y - 0.46 + 0.03 * sin(P.z * 5.0 + 1.0) - 0.16 * max(uBd.w - P.y, 0.0);
    float fe = tb - 0.28 + 0.07 * (N1(P.xz * 2.0) - 0.5) + 0.008 * sin(P.z * 17.0 + P.y * 14.0 + 2.0);
    float tbn = step(fe, P.x) * step(P.x, tb + 0.012);
    vec2 w = P.y > uBd.w - 0.065 && (tbn < 0.5 || P.z < uBd.z) ? P.xz : (P.z > uBd.z - 0.065 ? vec2(P.x, -P.y) : vec2(P.z, -P.y));
    if (tbn > 0.5 && (P.y > uBd.w - 0.065 || P.z > uBd.z - 0.065)) w.x = 2.0 * tb - w.x;
    float k = uK.x; float mot = fbm(w * 5.0);
    if (k < 0.5) {
      vec2 cell = w / 0.16; vec2 ci = floor(cell); vec2 f = fract(cell);
      float h = h21(ci + 7.0); vec3 pc = h < 0.25 ? uQ0 : h < 0.5 ? uQ1 : h < 0.75 ? uQ2 : uQ3;
      float pat = h21(ci + 31.0);
      pc *= 0.84 + 0.3 * h21(ci + 53.0);
      if (pat > 0.6) pc *= 0.84 + 0.16 * smoothstep(0.3, 0.7, abs(fract((f.x + f.y) * 4.0) - 0.5) * 2.0);
      else if (pat > 0.35) pc *= 0.86 + 0.14 * smoothstep(0.27, 0.18, length(fract(f * 3.0) - 0.5));
      else if (pat > 0.18) pc *= 0.86 + 0.14 * smoothstep(0.3, 0.7, abs(fract(f.x * 5.0) - 0.5) * 2.0) * smoothstep(0.3, 0.7, abs(fract(f.y * 5.0) - 0.5) * 2.0);
      float seam = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
      c = pc * (0.66 + 0.34 * smoothstep(0.0, 0.08, seam));
      c *= 1.0 + 0.14 * smoothstep(0.014, 0.005, abs(seam - 0.05)) * step(0.45, fract((f.x + f.y) * 13.0));
      c *= (0.88 + 0.24 * mot) * (0.93 + 0.07 * N1(w * 160.0));
    } else if (k < 1.5) {
      float s = fract(w.x / 0.09); c = mix(uQ1, uQ0, smoothstep(0.47, 0.53, s) * smoothstep(1.0, 0.97, s)); c = mix(c, uQ2, smoothstep(0.82, 0.86, s) * smoothstep(1.0, 0.97, s) * 0.8);
      c *= (0.86 + 0.28 * mot) * (0.86 + 0.14 * N1(vec2(w.x * 30.0, w.y * 400.0)));
    } else if (k < 2.5) {
      vec2 kq = w * vec2(60.0, 45.0); float rib = abs(fract(kq.x) - 0.5) * 2.0; float v = abs(fract(kq.y + rib * 0.5) - 0.5);
      c = uQ0 * (0.72 + 0.28 * smoothstep(0.0, 0.4, v)) * (0.86 + 0.14 * smoothstep(1.0, 0.4, rib));
      c = mix(c, uQ1 * (0.75 + 0.25 * smoothstep(0.0, 0.4, v)), step(0.8, fract(w.y / 0.35)));
    } else {
      vec2 cell = w / 0.11; vec2 ci = floor(cell); vec2 f = fract(cell) - 0.5; if (mod(ci.y, 2.0) > 0.5) f.x = fract(cell.x + 0.5) - 0.5;
      float r = length(f); float a = at2(f.y, f.x) + h21(ci) * 6.0; float st = 0.16 * (0.55 + 0.45 * cos(a * 5.0));
      c = mix(uQ2 * 0.6, uQ1, smoothstep(st + 0.02, st - 0.02, r)); c *= 0.93 + 0.07 * N1(w * 160.0);
    }
    ao *= 0.72 + 0.28 * smoothstep(0.22, 0.5, P.y);
    {
      // the turned part: the cover's lining side (paler, softer colour), the sheet's hem a finger's width beyond its free edge;
      // head side of the fold: the sheet over the top and down the side to the tuck, then the mattress's ticking
      float hd = smoothstep(tb + 0.008, tb + 0.016, P.x), tk = smoothstep(0.355, 0.365, P.y), sh = hd * tk;
      float hem = step(fe, P.x) * smoothstep(fe + 0.045 + 0.01 * sin(P.z * 9.0 + P.y * 7.0), fe + 0.035 + 0.01 * sin(P.z * 9.0 + P.y * 7.0), P.x);
      vec3 shc = vec3(0.84, 0.83, 0.8) * (0.88 + 0.2 * fbm(w * 7.0)) * (0.95 + 0.05 * N1(w * 150.0));
      c = mix(c, mix(c, dot(c, vec3(0.3, 0.55, 0.15)) * vec3(1.1, 1.0, 0.8), 0.18) * vec3(1.2, 1.15, 1.05), tbn * (1.0 - hd));
      c = mix(c, shc * (1.0 - 0.18 * smoothstep(0.003, 0.001, abs(P.x - fe - 0.022))), hem);
      ao *= 1.0 - 0.25 * smoothstep(fe - 0.07, fe - 0.01, P.x) * smoothstep(fe + 0.004, fe - 0.01, P.x);
      c = mix(c, mix(vec3(0.5, 0.5, 0.49), vec3(0.36, 0.4, 0.46), smoothstep(0.4, 0.6, abs(fract(P.x / 0.035) - 0.5) * 2.0)), hd * (1.0 - tk));
      c = mix(c, shc, sh);
      ao *= (1.0 - 0.3 * sh * smoothstep(tb + 0.06, tb, P.x)) * (1.0 - 0.6 * hd * smoothstep(0.014, 0.0, abs(P.y - 0.36)));
    }
  } else if (id == 19.0) {
    c = vec3(0.87, 0.86, 0.83) * (0.86 + 0.26 * fbm(P.xz * 8.0)) * (0.95 + 0.05 * N1(P.xz * 150.0));
  } else if (id == 22.0) {
    vec2 w = abs(N.y) > 0.5 ? P.xz : (abs(N.z) > abs(N.x) ? P.xy : P.zy);
    vec2 g = fract(w * 3.2); float bx = step(0.62, g.x), by = step(0.62, g.y), tx = step(0.9, fract(w.x * 9.6)), ty = step(0.9, fract(w.y * 9.6));
    c = uTa * (0.8 + 0.12 * (bx + by)); c = mix(c, uTb2, 0.35 * bx * by + 0.12 * tx * (1.0 - by) + 0.12 * ty * (1.0 - bx));
    c *= 0.86 + 0.14 * N1(w * 200.0);
  }
#endif
  o = vec4(sqrt(clamp(c, 0.0, 1.0)), clamp(ao, 0.0, 1.0));
}`,g1=`#version 300 es
precision highp float; precision highp int; precision highp sampler2DArray; precision highp usampler2D;
${Qt}
uniform usampler2D uG, uW; uniform sampler2D uA, uNz; uniform sampler2DArray uDr;
uniform vec4 uWn, uCt, uCt2;
uniform vec4 uD[11];
#define uL0 uD[0]
#define uL0g uD[1]
#define uL0x uD[2]
#define uSrc uD[3]
#define uCa uD[4]
#define uCb uD[5]
#define uWx uD[6]
#define uAv uD[7]
#define uTime uD[8].x
#define uL1 uD[9]
#define uL1g uD[10]
uniform vec4 uL1x, uMn, uFs, uBq;
uniform vec3 uDc0, uDc1, uLc; uniform vec2 uDim;
out vec4 o;
float hs(vec2 p){ return textureLod(uNz, (floor(p) + 0.5) / 256.0, 0.0).b; }
#ifdef BIG
// a lantern on the rug or hung throws its drum eight to thirteen times life size: one coarse mip level would show as blocks,
// so the penumbra is four taps of the next finer level on a rotated grid
vec3 dsamp(vec2 uv, float layer, vec2 bl){ vec2 a = bl * vec2(0.34, 0.12), b = bl * vec2(-0.12, 0.34), gx = vec2(bl.x * 0.5, 0.0), gy = vec2(0.0, bl.y * 0.5);
  return 0.25 * (textureGrad(uDr, vec3(uv + a, layer), gx, gy).rgb + textureGrad(uDr, vec3(uv - a, layer), gx, gy).rgb + textureGrad(uDr, vec3(uv + b, layer), gx, gy).rgb + textureGrad(uDr, vec3(uv - b, layer), gx, gy).rgb); }
#else
vec3 dsamp(vec2 uv, float layer, vec2 bl){ return textureGrad(uDr, vec3(uv, layer), vec2(bl.x, 0.0), vec2(0.0, bl.y)).rgb; }
#endif
vec3 caught(vec2 uv, float layer, vec2 bl, float R, float H, bool on){
  float u = uv.x, v = 1.0 - uv.y;
  float dh = fract(u - uCa.x + 0.5) - 0.5;
  bool home = on && abs(dh) < uCa.y && v > uCb.x - 0.04 && v < uCb.y + 0.04;
  vec3 T = dsamp(uv, home ? layer + 1.0 : layer, bl);
  float dc = fract(u - uCa.x - uCa.z + 0.5) - 0.5;
  if (on && abs(dc) < uCa.y * 1.7 && v > uCb.x - 0.1 && v < uCb.y + 0.2) {
    vec2 m = vec2(dc * 6.2832 * R, (v - uCb.x) * H - uCb.w);
    float a = uCb.z, ca = cos(a), sa = sin(a); m = vec2(ca * m.x + sa * m.y, -sa * m.x + ca * m.y);
    vec2 hu = vec2(uCa.x + m.x / (6.2832 * R), uCb.x + m.y / H);
    if (hu.y > uCb.x - 0.03 && hu.y < uCb.y + 0.03 && abs(fract(hu.x - uCa.x + 0.5) - 0.5) < uCa.y) {
      vec2 hv = vec2(hu.x, 1.0 - hu.y);
      float cov = textureGrad(uDr, vec3(hv, layer + 1.0), vec2(bl.x, 0.0), vec2(0.0, bl.y)).a;
      T = mix(T, dsamp(hv, layer, bl), cov);
    }
  }
  return T;
}
// the drum's top: a centre (vanes, hub or chimney) and a pierced annulus of stars and a crescent, all turning
float topT(float st, float r, float a, float bw){
  float T = 0.0;
  if (r < 0.36) {
    if (st < 1.5) { float f = fract(a * 8.0 + r * 1.9), e = bw * 9.0 + 0.03; T = mix(st < 0.5 ? 0.14 : 0.02, 0.92, smoothstep(0.0, e, f) * smoothstep(0.3 + e, 0.3, f)) * smoothstep(0.06, 0.085, r); }
    else if (st < 2.5) { float f = abs(fract(a * 3.0) - 0.5) * 2.0 * r * 3.14; T = smoothstep(0.012, 0.012 + bw * 2.0 + 0.01, abs(f - r * 3.14 * 0.0) * 0.0 + abs(fract(a * 3.0) - 0.5) * r * 2.0) * smoothstep(0.16, 0.19, r); }
    else { float f = abs(fract(a * 10.0) - 0.5); T = smoothstep(0.2 + bw * 4.0, 0.2, f) * smoothstep(0.24, 0.27, r) * smoothstep(0.4, 0.37, r); }
    T *= smoothstep(0.36, 0.335, r);
  } else {
    float rr = (r - 0.36) / 0.1; float ring = floor(rr); float n = floor(6.2832 * (0.36 + (ring + 0.5) * 0.1) / 0.105);
    float ca = floor(a * n); vec2 h = vec2(hs(vec2(ca, ring + 40.0)), hs(vec2(ca + 7.0, ring + 61.0)));
    vec2 lq = vec2((fract(a * n) - 0.5 - (h.x - 0.5) * 0.4) * 6.2832 * r / n, (fract(rr) - 0.5 - (h.y - 0.5) * 0.4) * 0.1);
    float big = step(0.86, h.y); float sz = 0.011 + 0.012 * h.y * h.y + big * 0.02; float ang = at2(lq.y, lq.x) + h.x * 9.0;
    float sh = sz * (0.32 + 0.68 * pow(abs(cos(ang * 2.5)), 6.0));
    T = step(h.x, 0.7) * smoothstep(sh + bw + 0.003, sh - bw - 0.003, length(lq));
    T = max(T, st < 0.5 ? 0.2 : (st > 1.5 && st < 2.5) ? 0.1 : 0.0);
    vec2 mq = vec2(cos(fract(a) * 6.2832), sin(fract(a) * 6.2832)) * r - vec2(0.72, 0.0);
    T = max(T, smoothstep(0.1 + bw, 0.1 - bw, length(mq)) * smoothstep(0.08 - bw, 0.08 + bw, length(mq - vec2(0.045, 0.03))));
  }
  return T * smoothstep(0.985, 0.955, r);
}
vec3 project(vec3 P, vec3 Lf, vec4 g, vec4 x, bool mainL, float tq){
  vec3 d = P - Lf; float hd = max(length(d.xz), 1e-4);
  float R = g.x, yb = g.y, H = g.z;
  float k = clamp(1.0 - R / hd, 0.0, 1.0);
  float v = (d.y / hd * R - yb) / H;
  float ang = at2(d.z, d.x);
  float far = smoothstep(uD[8].y, uD[8].z, hd);
  vec2 bl = vec2(uSrc.x * k / (6.2832 * R), uSrc.y * k / H) * (1.0 + 3.5 * far) + vec2(0.6 / uDim.x, 0.6 / uDim.y);
  vec3 T = vec3(0.0);
  if (v < 1.0 + bl.y) {
    vec2 uv = vec2(ang * 0.1591549 - g.w, 1.0 - clamp(v, 0.003, 0.997));
    T = caught(uv, x.z, bl, R, H, mainL && uCa.w > 0.5);
    T *= smoothstep(-bl.y, bl.y, v);
  }
  if (v > 1.0 - bl.y && d.y > 0.0) {
    float yt = yb + H; vec2 q = d.xz * (yt / d.y); float r = length(q) / R;
    float a = at2(q.y, q.x) * 0.1591549 - g.w;
    float bw = uSrc.x * max(1.0 - yt / d.y, 0.0) / R + 0.004;
    float tt = mainL ? tq : topT(x.w, r, a, bw);
    vec2 q2 = d.xz * ((yt + 0.036 * R / 0.13) / d.y); float pw = uSrc.x * 0.85 + 0.0014 * R / 0.13;
    tt *= 1.0 - (0.0014 * R / 0.13 / pw) * smoothstep(pw, 0.0, abs(q2.y)) * step(abs(q2.x), R * 1.12);
    T = mix(T, vec3(tt), smoothstep(1.0 - bl.y, 1.0 + bl.y, v));
  }
  float pr = R * 1.09; float da = min(abs(ang), 3.14159 - abs(ang));
  float wa = (0.0024 * R / 0.13 + uSrc.x * (1.0 - pr / hd)) / pr;
  T *= 1.0 - 0.3 * smoothstep(wa, wa * 0.2, da) * step(-0.05, v) * step(v, 1.15);
  return mix(T, uAv.rgb * step(0.0, v), 0.45 * far);
}
vec2 segD(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return vec2(length(pa - ba * h), h); }
// the bare tree outside: limbs bent by a two-scale warp, unequal forks, sprays of fine twigs at the ends. The limbs come
// from a uniform list (start, end; sway gain of each end, width at each end), walked in a loop that stays rolled.
// y = how much of a pixel inside the limb lies on the upper rim of the two thickest limbs (where snow lies)
uniform vec4 uBr[26];
vec2 branch(vec2 q, float s){
  q += 0.03 * sin(q.yx * 5.0 + vec2(1.0, 2.5)) + 0.009 * sin(q.yx * 17.0 + vec2(4.0, 0.5));
  float w = 1.0, sn = 0.0;
  for (int i = 0; i < 13 + int(uD[8].w); i++) {
    vec4 g = uBr[2 * i], k = uBr[2 * i + 1]; vec2 A = g.xy + vec2(0.0, k.x * s), B = g.zw + vec2(0.0, k.y * s);
    vec2 r = segD(q, A, B); float dd = r.x - mix(k.z, k.w, r.y); w = min(w, dd);
    if (i < 2) sn = max(sn, smoothstep(-0.014 + 0.004 * float(i), -0.007 + 0.002 * float(i), dd) * smoothstep(0.004, 0.0, dd) * step(A.y + (B.y - A.y) * r.y, q.y));
  }
  return vec2(w, sn);
}
float rectS(vec2 q, vec4 rc, float pw){ return smoothstep(-pw, pw, q.x - rc.x) * smoothstep(-pw, pw, rc.y - q.x) * smoothstep(-pw, pw, q.y - rc.z) * smoothstep(-pw, pw, rc.w - q.y); }
float moonA(vec3 P){
  vec3 M = uMn.xyz;
  float t0 = -P.z / M.z; vec3 Q = P + M * t0;
  vec3 G = P + M * ((-0.1 - P.z) / M.z);
  float soft = uWx.x > 0.5 ? 0.025 : 0.0045;
  float pw = 0.002 + t0 * soft;
  float a = rectS(Q.xy, uWn, pw) * rectS(G.xy, uWn, pw);
  if (a < 0.001) return -1.0;
  float xm = (uWn.x + uWn.y) * 0.5, ym = uWn.z + 0.62 * (uWn.w - uWn.z);
  a *= smoothstep(0.017 - pw, 0.017 + pw, abs(G.x - xm)) * smoothstep(0.017 - pw, 0.017 + pw, abs(G.y - ym));
  a *= rectS(G.xy, uWn + vec4(0.055, -0.055, 0.06, -0.055), pw);
  if (P.z > 0.06) {
    vec3 C = P + M * ((0.06 - P.z) / M.z);
    float cy = smoothstep(uCt2.x - pw, uCt2.x + pw, C.y) * smoothstep(uCt2.y + pw, uCt2.y - pw, C.y);
    float cx = max(rectS(vec2(C.x, 0.5), vec4(uCt.x, uCt.y, 0.0, 1.0), pw + 0.01), rectS(vec2(C.x, 0.5), vec4(uCt.z, uCt.w, 0.0, 1.0), pw + 0.01));
    a *= 1.0 - 0.85 * cx * cy;
  }
  return a;
}
float moonB(vec3 P, float a, float bw){
  vec3 M = uMn.xyz;
  float t0 = -P.z / M.z;
  vec3 G = P + M * ((-0.1 - P.z) / M.z);
  float soft = uWx.x > 0.5 ? 0.025 : 0.0045;
  float bp = 0.004 + t0 * soft * 3.0;
  a *= smoothstep(-bp, bp, bw) * 0.88 + 0.12;
#if WX == 1 || WX == 3
  if (uWx.x > 0.5 && uWx.x < 1.5) {
    for (int l = 0; l < 2; l++) {
      float zf = -0.4 - float(l) * 0.7; vec3 F = P + M * ((zf - P.z) / M.z);
      vec2 fq = F.xy * (14.0 - float(l) * 4.0) + vec2(sin(uTime * 0.4 + float(l)) * 0.8, uTime * (1.4 - float(l) * 0.4));
      vec2 ci = floor(fq), f = fract(fq) - 0.5;
      a *= 1.0 - 0.35 * step(hs(ci + float(l) * 17.0), 0.3) * smoothstep(0.3, 0.1, length(f - (vec2(hs(ci + 3.0), hs(ci + 5.0)) - 0.5) * 0.5));
    }
  }
#endif
#if WX == 2 || WX == 3
  if (uWx.x > 1.5) {
    vec2 rq = G.xy * vec2(40.0, 9.0) + vec2(0.0, uTime * 1.6); vec2 ci = floor(rq), f = fract(rq);
    float drop = step(0.8, hs(ci)) * smoothstep(0.2, 0.0, abs(f.x - 0.5 - 0.2 * sin(f.y * 6.0 + hs(ci) * 9.0))) * smoothstep(0.0, 0.3, f.y) * smoothstep(1.0, 0.6, f.y);
    vec2 bq = G.xy * 70.0; float bead = step(0.75, hs(floor(bq) + 9.0)) * smoothstep(0.35, 0.15, length(fract(bq) - 0.5));
    a *= 1.0 - 0.45 * max(drop, bead);
  }
#endif
  return a;
}
vec3 windowView(vec3 P, vec3 rd, vec3 c, vec2 bb){
  bool cloud = uWx.x > 0.5; float bw = bb.x;
  c = mix(c, cloud ? vec3(0.025) : vec3(0.006, 0.008, 0.012), smoothstep(0.006, -0.004, bw));
#if WX == 1 || WX == 3
  if (uWx.x > 0.5 && uWx.x < 1.5) {
    c = mix(c, vec3(0.2, 0.21, 0.24), bb.y * 0.85);
    // flakes by depth: a few near ones large, soft and dim; many far ones small, seen as short slanted streaks; thinner up the pane
    float top = smoothstep(uWn.w + 0.1, uWn.z + 0.2, P.y);
    for (int l = 0; l < 3 + int(uD[8].w); l++) {
      float fl = float(l), z = -0.3 - fl * 1.2, sc = 12.0 + fl * 16.0; vec3 F = P + rd * ((z - P.z) / rd.z);
      vec2 fq = F.xy * sc + vec2(sin(uTime * 0.5 + fl * 2.0) * 1.2 + F.y * 2.0, uTime * sc * 0.09);
      vec2 ci = floor(fq), ff = fract(fq) - 0.5 - (vec2(hs(ci + 3.0), hs(ci + 5.0)) - 0.5) * 0.6;
      ff.x += ff.y * 0.3 * fl; ff.y *= 1.0 - 0.3 * fl;
      float rr = 0.24 - 0.07 * fl;
      c += vec3(0.4, 0.42, 0.46) * step(hs(ci + fl * 13.0), (0.07 + 0.12 * fl) * (0.4 + 0.6 * top)) * smoothstep(rr, rr * (0.1 + 0.25 * fl), length(ff)) * (0.25 + 0.5 * fract((hs(ci + 3.0) + hs(ci + 5.0)) * 7.0)) * (0.45 - 0.08 * fl);
    }
    // snow lying on the outer ledge of the transom and the bottom rail, deeper in the corners
    vec3 Q = P + rd * ((-0.118 - P.z) / rd.z); float xm = (uWn.x + uWn.y) * 0.5;
    float cn = 0.014 + 0.006 * sin(Q.x * 23.0) + 0.016 * exp(-max(min(min(Q.x - uWn.x - 0.055, uWn.y - 0.055 - Q.x), abs(Q.x - xm) - 0.017), 0.0) / 0.035);
    float hy = min(abs(Q.y - uWn.z - 0.06 - cn * 0.5), abs(Q.y - uWn.z - 0.62 * (uWn.w - uWn.z) - 0.017 - cn * 0.5));
    float cap = smoothstep(cn * 0.5 + 0.002, cn * 0.5 - 0.002, hy);
    c = mix(c, vec3(0.19, 0.2, 0.23), cap);
  }
#endif
#if WX == 2 || WX == 3
  if (uWx.x > 1.5) {
    for (int l = 0; l < 2; l++) {
      float z = -0.5 - float(l) * 1.5; vec3 F = P + rd * ((z - P.z) / rd.z);
      vec2 fq = F.xy * vec2(60.0 - float(l) * 20.0, 3.0) + vec2(F.y * 4.0, uTime * (9.0 - float(l) * 2.0));
      vec2 ci = floor(fq), ff = fract(fq);
      c += vec3(0.16, 0.17, 0.2) * step(hs(ci + float(l) * 7.0), 0.12) * smoothstep(0.12, 0.0, abs(ff.x - 0.5)) * smoothstep(0.0, 0.5, ff.y) * smoothstep(1.0, 0.6, ff.y);
    }
    vec2 bq = P.xy * 70.0; float bead = step(0.75, hs(floor(bq) + 9.0)) * smoothstep(0.38, 0.1, length(fract(bq) - 0.5));
    vec2 rq = P.xy * vec2(40.0, 9.0) + vec2(0.0, uTime * 1.6); vec2 ci = floor(rq), ff = fract(rq);
    float drop = step(0.8, hs(ci)) * smoothstep(0.18, 0.0, abs(ff.x - 0.5 - 0.2 * sin(ff.y * 6.0 + hs(ci) * 9.0))) * smoothstep(0.0, 0.3, ff.y) * smoothstep(1.0, 0.6, ff.y);
    c = mix(c, c * 0.5 + vec3(0.1, 0.11, 0.13), max(bead, drop) * 0.8);
  }
#endif
  return c;
}
vec3 lampLight(vec3 P, vec3 N, vec3 V, vec4 L, vec4 g, vec4 x, vec3 dc, float vis, bool mainL, float gl, float tq, inout vec3 Sp){
  vec3 Ld = L.xyz - P; float dl = length(Ld); Ld /= dl;
  float ndl = dot(N, Ld);
  vec3 E = vec3(0.0);
  if (ndl > 0.0 && vis > 0.0) {
    vec3 T = project(P, L.xyz, g, x, mainL, tq);
    vec3 Ein = uLc * L.w * T * vis / (dl * dl);
    E = Ein * ndl;
    if (gl > 0.0) { vec3 Hh = normalize(Ld + V); float sh = pow(max(dot(N, Hh), 0.0), 90.0); float fr = 0.04 + 0.96 * pow(1.0 - max(dot(V, Hh), 0.0), 5.0); Sp += Ein * sh * fr * gl * 8.0 * ndl; }
  }
  // the drum itself glows (paper, glass) and lights what is close by
  vec3 gd = dc - P; float gl2 = dot(gd, gd); float gn = max(dot(N, gd) * inversesqrt(gl2), 0.0);
  E += uLc * L.w * uSrc.w * gn * max(vis, 0.15) / (gl2 + 0.02);
  return E;
}
void main(){
  ivec2 ip = ivec2(gl_FragCoord.xy);
  uvec4 gq = texelFetch(uG, ip, 0);
  vec4 ab = texelFetch(uA, ip, 0);
  vec3 rd = camRay();
  vec3 P = uE + rd * uintBitsToFloat(gq.x); vec3 V = -rd;
  vec3 N = octD(unpackHalf2x16(gq.y));
  float id = float(gq.z & 255u); float star = float(gq.z >> 8u) / 255.0;
  vec2 vm = unpackUnorm2x16(texelFetch(uW, ip, 0).r);
  vec3 alb = ab.rgb * ab.rgb; float ao = ab.a;
  vec3 col;
  vec3 moonC = uWx.x > 0.5 ? vec3(0.55, 0.62, 0.78) : vec3(0.6, 0.72, 1.0);
  vec4 ta = vec4(0.0); bool wantT = false;
  if (id == 11.0) {
#ifdef TWO
    bool second = length(P.xz - uL1x.xy) < length(P.xz - uL0x.xy);
#else
    bool second = false;
#endif
    vec4 g = second ? uL1g : uL0g, x = second ? uL1x : uL0x;
    vec2 dq = P.xz - x.xy; float R = g.x;
    ta = vec4(x.w, length(dq) / R, at2(dq.y, dq.x) * 0.1591549 - g.w, 0.01); wantT = true;
  } else if (!(id == 10.0 || id == 14.0)) {
    vec3 Ld = uL0.xyz - P; float dl = length(Ld); Ld /= dl;
    if (dot(N, Ld) > 0.0 && vm.x > 0.0) {
      vec4 g = uL0g; vec3 d = P - uL0.xyz; float hd = max(length(d.xz), 1e-4);
      float R = g.x, yb = g.y, H = g.z;
      float k = clamp(1.0 - R / hd, 0.0, 1.0);
      float v = (d.y / hd * R - yb) / H;
      float far = smoothstep(uD[8].y, uD[8].z, hd);
      vec2 bl = vec2(uSrc.x * k / (6.2832 * R), uSrc.y * k / H) * (1.0 + 3.5 * far) + vec2(0.6 / uDim.x, 0.6 / uDim.y);
      if (v > 1.0 - bl.y && d.y > 0.0) {
        float yt = yb + H; vec2 q = d.xz * (yt / d.y);
        ta = vec4(uL0x.w, length(q) / R, at2(q.y, q.x) * 0.1591549 - g.w, uSrc.x * max(1.0 - yt / d.y, 0.0) / R + 0.004); wantT = true;
      }
    }
  }
  float tq = 0.0; if (wantT) tq = topT(ta.x, ta.y, ta.z, ta.w);
  // one branch() site: the tree seen through the window (id 14) or in the moon patch's shadow
  float ma = -1.0; vec2 bq = vec2(0.0); bool wantB = false;
  if (id == 14.0) { bq = (P + rd * ((-1.9 - P.z) / rd.z)).xy; wantB = true; }
  else if (!(id == 10.0 || id == 11.0) && vm.y > 0.0 && uMn.w > 0.0) { ma = moonA(P); wantB = ma >= 0.0; bq = (P + uMn.xyz * ((-1.9 - P.z) / uMn.z)).xy; }
  vec2 bb = vec2(0.0); if (wantB) bb = branch(bq, uWx.y); float bw = bb.x;
  if (id == 14.0) {
    col = windowView(P, rd, alb, bb);
    vec3 r = vec3(rd.x, rd.y, -rd.z);
    vec3 w = uDc0 - P; float tq = max(dot(w, r), 0.0); float dd = length(w - r * tq);
    col += uLc * uL0.w * (0.0003 / (dd * dd + 0.003) + 0.015 * uAv.x);
  } else if (id == 10.0 || id == 11.0) {
#ifdef TWO
    bool second = length(P.xz - uL1x.xy) < length(P.xz - uL0x.xy);
#else
    bool second = false;
#endif
    vec4 g = second ? uL1g : uL0g, x = second ? uL1x : uL0x, L = second ? uL1 : uL0;
    float st = x.w; vec2 dq = P.xz - x.xy; float R = g.x;
    vec3 Lin = uLc * L.w / (R * R) * 0.012;
    if (id == 10.0) {
      float phi = at2(dq.y, dq.x) * 0.1591549 - g.w; float v = (P.y - (L.y + g.y)) / g.z;
      vec2 bl = vec2(1.2 / uDim.x, 1.2 / uDim.y);
      vec3 T = caught(vec2(phi, 1.0 - v), x.z, bl, R, g.z, !second && uCa.w > 0.5);
      float vf = -g.y / g.z; float facing = max(dot(normalize(vec3(dq.x, 0.0, dq.y)), V), 0.0);
      float hot = exp(-pow((v - vf) * 3.0, 2.0)) * (0.4 + 0.6 * facing * facing);
      float sh = 0.55 + 0.45 * facing;
      if (st < 0.5) col = Lin * T * (4.0 + 9.0 * hot) * sh + vec3(0.016, 0.013, 0.01) * L.w * (1.0 - T.r);
      else if (st < 1.5) col = Lin * T * (3.0 + 7.0 * hot) + vec3(0.07, 0.065, 0.06) * L.w * (0.15 + pow(1.0 - facing, 3.0)) * (1.0 - T.r) * 0.4;
      else col = Lin * T * (3.5 + 7.5 * hot) * sh + vec3(0.016) * L.w * (1.0 - max(T.r, max(T.g, T.b)));
    } else {
      float r = length(dq) / R; float a = at2(dq.y, dq.x) * 0.1591549 - g.w;
      float tt = tq;
      col = Lin * (st < 0.5 ? mix(vec3(0.3, 0.2, 0.1), vec3(1.0, 0.85, 0.6), tt) : vec3(0.08) + vec3(tt) * 0.8) * 1.8;
    }
  } else {
    vec3 Sp = vec3(0.0);
    float gl = (id == 7.0 && N.y > 0.5) ? 0.7 : (id == 1.0 ? 0.3 : (id == 8.0 || id == 26.0 || id == 21.0) ? 1.5 : (id == 13.0 || id == 15.0 || id == 9.0 || id == 17.0) ? 0.3 : 0.0);
    vec3 Ed = lampLight(P, N, V, uL0, uL0g, uL0x, uDc0, vm.x, true, gl, tq, Sp);
#ifdef TWO
    Ed += lampLight(P, N, V, uL1, uL1g, uL1x, uDc1, 1.0, false, gl, 0.0, Sp);
#endif
    float d0 = length(P - uL0.xyz);
    vec3 amb = uLc * (uAv.rgb * 0.8 + 0.04) * uL0.w * (0.08 + 0.14 / (1.0 + 6.0 * d0 * d0));
#ifdef TWO
    { float d1 = length(P - uL1.xyz); amb += uLc * uAv.rgb * uL1.w * (0.03 + 0.1 / (1.0 + 6.0 * d1 * d1)); }
#endif
    // the lit corner gives its light back: a warm fill for the floor, the bed and the far walls, and a sheen on the boards
    vec3 bq = uBq.xyz - P; float bl2 = dot(bq, bq); bq *= inversesqrt(bl2);
    vec3 Eb = uLc * vec3(1.0, 0.86, 0.7) * (uAv.rgb * 0.8 + 0.06) * uL0.w * uBq.w / (1.5 + bl2);
    amb += Eb * (0.25 + 0.75 * max(dot(N, bq), 0.0));
    if (id == 1.0) { vec3 Hb = normalize(bq + V); Sp += Eb * (0.3 + alb.r * 2.0) * ao * pow(max(dot(N, Hb), 0.0), 24.0) * (0.04 + 0.96 * pow(1.0 - max(dot(V, Hb), 0.0), 5.0)) * 5.0; }
    float mp = ma >= 0.0 ? moonB(P, ma, bw) * vm.y : 0.0;
    vec3 Em = moonC * uMn.w * mp * max(dot(N, uMn.xyz), 0.0);
    vec3 wc = vec3((uWn.x + uWn.y) * 0.5, (uWn.z + uWn.w) * 0.5, -0.05); vec3 wd = wc - P; float wl = length(wd); wd /= wl;
    vec3 Es = moonC * uMn.w * (0.1 * max(dot(N, wd), 0.0) * max(-wd.z, 0.0) / (0.4 + wl * wl) + 0.01);
    col = alb * (Ed + (amb + Es) * ao + Em) + Sp;
    if (star > 0.05) col += vec3(0.35, 0.8, 0.45) * star * uWx.z;
  }
  float d0 = length(gl_FragCoord.xy / uS - uFs.xy);
  col += uLc * uL0.w * uAv.x * (0.06 * exp(-d0 * 16.0) + 0.008 * exp(-d0 * 4.0));
#ifdef TWO
  { float d1 = length(gl_FragCoord.xy / uS - uFs.zw); col += uLc * uL1.w * uAv.x * (0.06 * exp(-d1 * 16.0) + 0.015 * exp(-d1 * 4.0)); }
#endif
  col *= uWx.w;
  col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  vec2 sq = gl_FragCoord.xy / uS;
  col *= 1.0 - 0.2 * smoothstep(0.35, 0.85, length(sq - 0.5));
  col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));
  col += (textureLod(uNz, sq * uS / 256.0 + vec2(fract(uTime * 7.31), fract(uTime * 3.17)), 0.0).g - 0.5) * 0.02;
  o = vec4(col, 1.0);
}`,Mt=(T0===2?`
#define CAT`:"")+(J===3?`
#define TENT`:""),v0=a.__p037=a.__p037||{},ze=(t,e)=>{const r=a.createShader(t);return a.shaderSource(r,e),a.compileShader(r),r},Pe=v0.vs=v0.vs||ze(a.VERTEX_SHADER,m1),Ct=(t,e)=>{if(v0[t])return v0[t];const r=ze(a.FRAGMENT_SHADER,e),s=a.createProgram();return a.attachShader(s,Pe),a.attachShader(s,r),a.linkProgram(s),s.__f=r,s.__n=t,v0[t]=s},ft=Ct("v"+Mt,v1.replace("precision highp int;","precision highp int;"+Mt)),j0=Ct("w"+Mt,y1.replace("precision highp int;","precision highp int;"+Mt)),Lt=`
`,qe=(t,e)=>t.replace("precision highp int;","precision highp int;"+Lt+e+Lt),Yt=[1,2,3].map(t=>Ct("a"+t,qe(b1,"#define AP "+t))),N=Ct((T0===1?"c2":s0?"cb":"c")+"A",qe(g1,"#define WX 3"+(T0===1?Lt+"#define TWO":s0?Lt+"#define BIG":"")));a.flush();const Y=1024,B=Y/4,V=Y/2048,x0=348;let o=null;const u=(t,e,r,s,i=0)=>{o.beginPath(),o.ellipse(t,e,Math.abs(r),Math.abs(s),i,0,R),o.fill()},m=(...t)=>{o.beginPath(),o.moveTo(t[0],t[1]);for(let e=2;e<t.length;e+=2)o.lineTo(t[e],t[e+1]);o.closePath(),o.fill()},Z=t=>{o.beginPath(),t(),o.fill()},D=(t,e,r,s,i)=>{o.lineWidth=i,o.lineCap="round",o.beginPath(),o.moveTo(t,e),o.lineTo(r,s),o.stroke()},kt=(t,e,r,s,i,d,c)=>{o.lineWidth=c,o.lineCap="round",o.beginPath(),o.moveTo(t,e),o.quadraticCurveTo(r,s,i,d),o.stroke()},G=(t,e,r,s,i,d)=>{const c=Math.sin(d),h=Math.cos(d),n=t+c*r,f=e-h*r;m(t-h*s/2,e-c*s/2,t+h*s/2,e+c*s/2,n+h*i/2,f+c*i/2,n-h*i/2,f-c*i/2),u(n,f,i/2,i/2)},K1=(t,e,r,s,i,d,c,h)=>{const n=t+Math.sin(c)*r,f=e-Math.cos(c)*r;G(t,e,r,i,(i+d)/2,c),G(n,f,s,(i+d)/2,d,c+h)},W=t=>{const e=o.fillStyle;o.fillStyle=o.strokeStyle="#000",t(),o.fillStyle=o.strokeStyle=e},$0=(t,e,r,s=5,i=.45,d=0)=>{o.beginPath();for(let c=0;c<s*2;c++){const h=c%2?r*i:r,n=d+c*Math.PI/s-Math.PI/2;c?o.lineTo(t+Math.cos(n)*h,e+Math.sin(n)*h):o.moveTo(t+Math.cos(n)*h,e+Math.sin(n)*h)}o.closePath(),o.fill()},Re=t=>.26*Math.sin(t),Ee={},A0=t=>Ee[t]||(Ee[t]=t.trim().split(/\s+/).flatMap(e=>{const r=e.replace("!","").split(",");return[+r[0],+r[1],e.endsWith("!")?1:0]})),E0=t=>{let e=t,r=t.length/3,s=0;for(let n=0;n<r;n++){const f=(n+1)%r;s+=t[n*3]*t[f*3+1]-t[f*3]*t[n*3+1]}if(s>0){e=[];for(let n=r-1;n>=0;n--)e.push(t[n*3],t[n*3+1],t[n*3+2])}const i=n=>e[n%r*3],d=n=>e[n%r*3+1],c=n=>e[n%r*3+2];let h=0;for(;h<r&&!c(h);)h++;if(h===r){o.moveTo((i(0)+i(1))/2,(d(0)+d(1))/2);for(let n=1;n<=r;n++)o.quadraticCurveTo(i(n),d(n),(i(n)+i(n+1))/2,(d(n)+d(n+1))/2)}else{o.moveTo(i(h),d(h));for(let n=1;n<=r;n++){const f=h+n;c(f)?o.lineTo(i(f),d(f)):c(f+1)?(o.quadraticCurveTo(i(f),d(f),i(f+1),d(f+1)),n++):o.quadraticCurveTo(i(f),d(f),(i(f)+i(f+1))/2,(d(f)+d(f+1))/2)}}o.closePath()},w1={hoof:[.62,0,1,-.5,0,1],paw:[1.05,.4,0,1.05,0,1,-.5,0,1],pad:[.56,0,1,-.56,0,1],tip:[0,-.9,1]},z0=(t,e,r)=>{const s=t.length-1,i=[],d=[];for(let c=0;c<=s;c++){const h=t[Math.max(0,c-1)],n=t[Math.min(s,c+1)],f=Math.hypot(n[0]-h[0],n[1]-h[1])||1,y=-(n[1]-h[1])/f,w=(n[0]-h[0])/f,E=e[c],C=E.length?E[0]:E/2,L=E.length?E[1]:E/2;if(c||i.push(t[0][0]-w*(C+L)*.5,t[0][1]+y*(C+L)*.5,1),c<s){i.push(t[c][0]+y*C,t[c][1]+w*C,0),d.unshift(t[c][0]-y*L,t[c][1]-w*L,0);continue}const q=w1[r],k=r==="tip"||t[s][1]>.5,I=k?y:1,y0=k?w:0,se=k?-w:0,ne=k?y:1,at=C+L;for(let i0=0;i0<q.length;i0+=3)i.push(t[s][0]+(I*q[i0]+se*q[i0+1])*at,t[s][1]+(y0*q[i0]+ne*q[i0+1])*at,q[i0+2])}E0(i.concat(d))},T1=(t,e,r,s,i,d)=>{const c=[[t,e]],h=[i];for(const f of r){const y=s[f[1]]*Math.PI/180,w=c[c.length-1];c.push([w[0]+Math.sin(y)*f[0],w[1]-Math.cos(y)*f[0]]),h.push(f[2])}const n=c[c.length-1][1];if(s[3]!==0)for(const f of c)f[1]=e-(e-f[1])*e/(e-n);else if(n<3)for(const f of c)f[1]+=3-n;z0(c,h,d)},B0=(t,e,r,s,i,d,c)=>({w:t,h:e,np:3,d(h,n){const f=n??Math.floor((h%R+R)%R/R*3)%3,y=i[f];o.beginPath();for(const w of r)E0(A0(w));s.forEach((w,E)=>T1(w[0],w[1],w[2],y[E],w[3],w[4])),d&&d(f),o.fill(),c&&W(()=>{o.beginPath(),c(f),o.fill()})}}),Me=[[28,0,13],[7,0,14],[20,1,8],[5,1,10],[8,2,11]],Ce=[[22,0,15],[7,0,[5,9]],[22,1,8],[5,1,10],[8,2,11]],W0={elephant:B0(170,150,["-56,58 -62,86 -58,110 -40,126 -10,134 16,130 34,126 44,136 62,142 74,136 82,122 88,100 90,74 91,52 95,38 102,34! 100,27! 90,26 84,36 81,60 79,84 74,96! 88,88 92,82! 84,82 72,88! 64,88 56,82 52,70 46,58 30,52 0,56 -30,54 -50,54","-56,106! -64,96 -68,76 -68,62! -72,54! -66,56! -64,50! -62,58! -62,76 -58,92 -50,100!"],[[34,60,[[28,0,27],[6,0,28],[18,1,23],[6,2,31]],44,"pad"],[24,60,[[28,0,27],[6,0,28],[18,1,23],[6,2,31]],44,"pad"],[-34,60,[[22,0,31],[6,0,[13,16]],[24,1,23],[6,2,30]],46,"pad"],[-44,60,[[22,0,31],[6,0,[13,16]],[24,1,23],[6,2,30]],46,"pad"]],[[[8,4,0],[-8,-4,0],[-6,-2,0],[8,6,0]],[[0,0,0],[18,-20,-10,0],[-8,-2,0],[4,2,0]],[[6,2,0],[-6,-4,0],[0,-16,-20,0],[-10,-4,0]]],null,()=>{o.ellipse(70,118,2.6,1.7,.3,0,R),E0(A0("54,128! 49,112 47,92 49,76! 54,76! 52,92 54,112 59,128!"))}),giraffe:B0(140,235,["-38,112 -36,122 -24,126 -4,132 14,138 24,146! 29,152! 31,150 38,166! 40,163 47,182! 49,180 55,200! 58,203 61,216 62,224! 52,229! 50,233! 59,234 58,240! 61,243! 64,241! 64,234! 67,234 67,239! 70,241! 72,238! 71,231! 80,228 90,222 97,216 99,210! 92,206 82,208 72,208 68,200 62,180 52,152 42,124 38,114! 30,106 10,106 -12,108 -30,110","-34,116! -42,104 -46,84 -46,66! -50,58! -46,56! -42,52! -42,62! -40,84 -36,102 -30,110!"],[[24,108,[[42,0,12],[8,0,15],[42,1,8],[5,1,10],[8,2,11]],22,"hoof"],[16,108,[[42,0,12],[8,0,15],[42,1,8],[5,1,10],[8,2,11]],22,"hoof"],[-22,110,[[34,0,16],[8,0,[5,9]],[46,1,8],[5,1,10],[8,2,11]],32,"hoof"],[-30,110,[[34,0,16],[8,0,[5,9]],[46,1,8],[5,1,10],[8,2,11]],32,"hoof"]],[[[12,6,22],[-12,-10,14],[-18,14,26],[-36,0,16]],[[-2,0,20],[16,-30,-20,0],[-24,8,24],[-14,-24,-40,0]],[[16,-30,-20,0],[-2,0,20],[-14,-24,-40,0],[-24,8,24]]],null,()=>o.ellipse(80,220,2.4,1.6,.3,0,R)),camel:B0(150,160,["-44,84 -48,98 -42,110 -30,118 -18,130 -4,138 10,132 20,118 30,110 42,104 54,104 62,112 66,126 70,138 72,144! 70,150! 74,146! 82,146 94,140 102,134 104,128! 98,124! 90,126 82,126 74,126! 70,116 64,100 56,90 46,84 36,82 20,80 0,84 -20,84 -36,86","-42,104! -52,96 -54,80 -55,70! -58,64! -53,66! -50,62! -50,72! -48,86 -40,96!"],[[24,84,[[34,0,12],[7,0,14],[30,1,8],[4,1,9],[7,2,15]],24,"pad"],[16,84,[[34,0,12],[7,0,14],[30,1,8],[4,1,9],[7,2,15]],24,"pad"],[-26,86,[[28,0,16],[8,0,[5,8]],[36,1,8],[4,1,9],[7,2,15]],32,"pad"],[-32,86,[[28,0,16],[8,0,[5,8]],[36,1,8],[4,1,9],[7,2,15]],32,"pad"]],[[[12,6,10],[-12,-10,0],[-18,14,14],[-34,0,4]],[[-2,0,6],[16,-34,-24,0],[-24,8,10],[-14,-26,-40,0]],[[16,-34,-24,0],[-2,0,6],[-14,-26,-40,0],[-24,8,10]]],null,()=>o.ellipse(84,136,2.4,1.6,.2,0,R)),bear:{w:130,h:100,d(t){const e=Re(t)*.8,r=-e;G(-30,44,44,18,16,r),G(24,44,44,19,17,e),u(0,60,50,32),u(20,74,28,22),G(-20,44,44,18,16,e),G(34,44,44,19,17,r),u(52,68,20,17,-.1),u(70,62,11,8,-.2),u(43,86,7,7),u(55,85,6,6),u(-48,70,6,5),W(()=>u(58,74,2,2))}},horse:B0(160,150,["-52,86 -50,98 -38,104 -14,98 8,100 22,106! 28,114! 30,111 36,121! 38,117 46,128! 50,131 58,138! 60,148! 64,139! 72,138 84,124 94,108 100,100 98,93! 90,94 82,100 76,108 66,112! 62,100 58,88 56,76 50,64 38,56 20,54 0,56 -20,60 -34,64 -46,68 -52,76","-44,102! -58,98 -68,84 -70,62 -66,44! -62,50! -60,40! -56,52 -56,70 -52,86 -42,92!"],[[36,64,Me,28,"hoof"],[28,64,Me,28,"hoof"],[-30,68,Ce,36,"hoof"],[-38,68,Ce,36,"hoof"]],[[[14,8,24],[-14,-10,16],[-34,6,24],[-14,14,30]],[[-4,0,20],[30,-60,-30,0],[-24,8,24],[-36,0,18]],[[8,4,24],[-18,-12,12],[-10,-30,-55,0],[-30,4,22]],[[75,-5,15,0],[-4,0,18],[-26,8,22],[-34,4,20]]],null,()=>o.ellipse(74,128,2.4,1.6,.4,0,R)),lion:B0(140,100,["-46,44 -50,56 -46,64 -30,66 -6,64 12,68 20,78! 26,84 34,90! 44,92 52,94! 60,90 66,86 72,80 78,74 82,70! 82,64 80,60! 74,58 70,55! 67,46 65,37! 61,44 58,30! 55,40 49,27! 45,36 41,31! 37,38 31,22! 28,34 24,40 18,44 0,42 -20,44 -34,48","-44,62! -58,58 -68,48 -76,38 -86,40 -92,48! -98,50! -96,44! -100,40! -94,38! -88,34 -78,32 -66,40 -56,50 -44,54!"],[[22,42,[[22,0,14],[5,0,12],[10,1,10],[5,2,12]],30,"paw"],[14,42,[[22,0,14],[5,0,12],[10,1,10],[5,2,12]],30,"paw"],[-30,48,[[18,0,17],[6,0,[5,9]],[16,1,9],[5,2,11]],36,"paw"],[-36,48,[[18,0,17],[6,0,[5,9]],[16,1,9],[5,2,11]],36,"paw"]],[[[14,8,10],[-12,-8,0],[-30,6,14],[-14,14,16]],[[-2,0,6],[24,-54,-30,0],[-22,8,14],[-34,0,6]],[[10,4,10],[-14,-10,0],[-10,-26,-40,0],[-28,4,12]]],null,()=>o.ellipse(70,74,2.4,1.5,.2,0,R)),deer:B0(110,150,["-36,58 -40,66 -36,74 -40,76! -44,82! -36,80! -30,76 -12,74 6,76 16,80 22,86 30,96 38,106 42,112! 34,122! 40,120 46,115! 50,114 56,106 62,98 66,94! 64,90! 58,88 52,90 46,92 40,86 32,74 28,66 24,60 10,56 -10,56 -26,58"],[[20,56,[[22,0,9],[5,0,10],[20,1,6],[3,1,7],[5,2,7]],18,"hoof"],[14,56,[[22,0,9],[5,0,10],[20,1,6],[3,1,7],[5,2,7]],18,"hoof"],[-20,58,[[20,0,12],[6,0,[3.5,6]],[24,1,6],[3,1,7],[5,2,7]],26,"hoof"],[-26,58,[[20,0,12],[6,0,[3.5,6]],[24,1,6],[3,1,7],[5,2,7]],26,"hoof"]],[[[14,8,24],[-14,-10,16],[-34,6,24],[-14,14,30]],[[-4,0,20],[30,-60,-30,0],[-24,8,24],[-36,0,18]],[[8,4,24],[-18,-12,12],[-10,-30,-55,0],[-30,4,22]]],()=>{z0([[46,110],[46,124],[42,136],[36,145],[29,149]],[8,7,6.5,6,6],"tip"),z0([[46,117],[54,122],[60,122]],[6.5,6,6],"tip"),z0([[45,128],[53,135],[57,141]],[6.5,6,6],"tip"),z0([[39,141],[42,149]],[6,6],"tip"),z0([[50,110],[53,124],[51,136],[46,147]],[7,6.5,6,6],"tip")},()=>o.ellipse(54,104,2,1.4,.4,0,R)),fox:B0(110,64,["-30,30 -34,38 -26,44 -6,44 14,44 24,48 30,54! 32,63! 37,55! 40,57! 43,64! 45,54 52,50 61,46! 54,42 46,40 40,38 34,34 28,28 10,28 -10,30 -22,30","-26,42! -44,46 -60,40 -70,30 -76,24! -66,21 -54,24 -40,28 -26,32!"],[[22,30,[[14,0,7],[3,0,7],[10,1,6],[3,2,7]],14,"paw"],[16,30,[[14,0,7],[3,0,7],[10,1,6],[3,2,7]],14,"paw"],[-18,32,[[12,0,9],[4,0,[3,5]],[12,1,6],[3,2,7]],18,"paw"],[-24,32,[[12,0,9],[4,0,[3,5]],[12,1,6],[3,2,7]],18,"paw"]],[[[18,8,10],[-16,-8,0],[-30,6,14],[-12,14,16]],[[-2,0,6],[30,-60,-30,0],[-22,8,14],[-34,0,6]],[[12,4,10],[-16,-10,0],[-10,-30,-40,0],[-28,4,12]]],null,()=>o.ellipse(47,50,1.6,1.1,.3,0,R)),rabbit:{w:54,h:62,d(){o.beginPath(),E0(A0("-20,0! -26,10 -27,18 -31,22! -27,24 -22,30 -10,36 4,37 11,42 11,48 10,58! 14,62! 18,52 19,51 20,61! 24,61! 24,50 28,46 33,40! 30,36 22,33 18,26 18,14 20,4 25,1! 25,0! 15,0! 13,8 9,12 6,6 10,2 12,0!")),o.fill(),W(()=>u(26,43,1.4,1.1))}},cat:{w:70,h:92,d(){Z(()=>{o.moveTo(-30,0),o.quadraticCurveTo(-40,36,-14,47),o.quadraticCurveTo(-2,54,5,61),o.quadraticCurveTo(3,66,5,72),o.lineTo(8,89),o.lineTo(15,79),o.quadraticCurveTo(19,80,22,79),o.lineTo(28,88),o.quadraticCurveTo(29,78,28,72),o.quadraticCurveTo(33,66,30,62),o.quadraticCurveTo(28,57,23,56),o.quadraticCurveTo(17,52,17,42),o.lineTo(20,0),o.lineTo(13,0),o.quadraticCurveTo(11,20,6,24),o.quadraticCurveTo(2,12,3,0),o.closePath()}),kt(-27,3,-4,-7,25,3,7),u(25,3,4,3),W(()=>{u(22,67,2.2,1.4,.2),D(31,61,42,63,.8),D(31,60,41,57,.8)})}},tortoise:{w:90,h:50,d(t){const e=Re(t)*.6;G(-22,10,9,10,9,e),G(18,10,9,10,9,-e),Z(()=>{o.moveTo(-36,10),o.quadraticCurveTo(-32,48,0,48),o.quadraticCurveTo(32,48,36,10),o.closePath()}),m(-40,13,40,13,38,7,-38,7),m(30,10,40,20,42,12),u(44,16,9,7),m(-38,12,-48,8,-38,8),W(()=>{for(const[r,s]of[[-14,28],[8,30],[-2,40],[20,22],[-26,20]])$0(r,s,6,6,.85)})}},ducks:{w:150,h:46,d(t){const e=(r,s)=>{o.save(),o.translate(r,0),o.scale(s,s),u(0,18,22,12),m(-18,20,-30,30,-16,13),m(10,22,22,30,20,40,8,28),u(18,36,9,9),m(25,38,36,35,25,32),G(0,8,9,3,3,.2*Math.sin(t+r)),W(()=>u(20,38,1.6,1.6)),o.restore()};e(40,1),e(-6,.55),e(-36,.5),e(-64,.52)}},hedgehog:{w:70,h:40,d(t){Z(()=>{o.moveTo(-30,6);for(let e=0;e<=18;e++){const r=Math.PI-e/18*Math.PI,s=e%2?26:33;o.lineTo(Math.cos(r)*s*1.1,6+Math.sin(r)*s*.95)}o.closePath()}),m(26,14,44,8,26,4),u(46,8,3,3),G(-14,6,6,5,4,0),G(14,6,6,5,4,0),W(()=>u(33,12,1.4,1.4))}},squirrel:{w:70,h:70,d(t){u(0,16,14,14),u(12,32,9,8.5),m(10,38,12,48,16,39),Z(()=>{o.moveTo(-10,8),o.bezierCurveTo(-46,10,-40,62,-14,66),o.bezierCurveTo(-4,66,-2,54,-12,52),o.bezierCurveTo(-28,48,-26,22,-6,20),o.closePath()}),G(8,8,8,6,5,.2),u(16,22,4,3),W(()=>u(15,34,1.4,1.4))}},owl:{w:90,h:80,fly:168,d(t){o.lineCap="round",D(-46,0,46,4,6),D(20,2,44,14,3),u(0,24,15,21),u(0,47,13.5,11.5),m(-11,52,-14,64,-5,55),m(11,52,14,64,5,55),m(-3,44,3,44,0,38),G(-5,6,6,3,3,0),G(5,6,6,3,3,0),W(()=>{u(-5.5,48,3.6,3.6),u(5.5,48,3.6,3.6)})}},bird:{w:70,h:50,fly:110,np:3,d(t){const e=Math.floor((t%R+R)%R/R*3)%3,r=["12,2! 6,14 -2,25 -11,33! -9,24! -14,22! -8,12 -6,0!","12,2! 0,9 -14,12 -32,14! -22,8! -26,5! -14,3 -6,0!","12,3! 6,-6 0,-18 -9,-27! -7,-18! -12,-16! -6,-6 -6,1!"];o.beginPath(),E0(A0("28,4! 20,8 12,10 2,8 -10,6 -20,4 -35,9! -27,1! -36,-6! -20,-2 -8,-4 6,-5 16,-2 22,1!")),E0(A0(r[e])),o.save(),o.translate(-5,1),E0(A0(r[(e+1)%3])),o.restore(),o.fill(),W(()=>u(19,5,1.4,1.1))}},ship:{w:250,h:230,sea:!0,d(t){Z(()=>{o.moveTo(-104,28),o.lineTo(112,28),o.quadraticCurveTo(98,2,72,-8),o.lineTo(-82,-8),o.quadraticCurveTo(-98,6,-104,28),o.closePath()}),m(-104,28,-104,46,-70,46,-66,28),m(80,28,112,28,108,38,84,38),o.lineCap="round",D(-40,28,-40,192,4.5),D(22,28,22,222,5),D(72,28,72,172,4),D(104,30,150,54,3.5);const e=(r,s,i,d,c)=>Z(()=>{o.moveTo(r-d,s),o.quadraticCurveTo(r,s-8,r+d,s),o.quadraticCurveTo(r+(d+c)/2+9,(s+i)/2,r+c,i),o.lineTo(r-c,i),o.quadraticCurveTo(r-(d+c)/2+9,(s+i)/2,r-d,s),o.closePath()});e(-40,64,112,34,30),e(-40,120,162,28,24),e(22,64,120,40,34),e(22,128,176,32,27),e(22,184,212,22,18),e(72,62,106,28,24),e(72,114,152,22,18),m(104,34,148,54,74,160),m(22,222,22,238,46,230),m(-40,192,-40,204,-24,198),o.lineWidth=1.4,o.beginPath(),o.moveTo(-104,46),o.lineTo(-40,190),o.lineTo(22,220),o.lineTo(72,170),o.lineTo(150,54),o.stroke(),W(()=>{for(let r=-60;r<=70;r+=20)u(r,14,3.2,3.2)})}},sailboat:{w:100,h:120,sea:!0,d(t){Z(()=>{o.moveTo(-44,10),o.lineTo(48,10),o.quadraticCurveTo(38,-6,20,-8),o.lineTo(-30,-8),o.closePath()}),o.lineCap="round",D(0,10,0,116,3),m(3,16,3,112,44,18),m(-3,104,-3,16,-38,14),m(0,116,0,124,14,120)}},whale:{w:260,h:110,sea:!0,d(t){Z(()=>{o.moveTo(-110,34),o.quadraticCurveTo(-60,86,30,78),o.quadraticCurveTo(96,70,106,30),o.quadraticCurveTo(96,0,10,2),o.quadraticCurveTo(-60,6,-110,34),o.closePath()}),m(-104,36,-150,72,-132,44,-156,20,-112,28),u(16,22,24,7,-.5),u(78,102,4,9),u(68,112,3,7,.3),u(90,110,3,7,-.3),u(60,120,2.5,5,.6),u(98,118,2.5,5,-.6),W(()=>u(80,38,3,3))}},dolphin:{w:130,h:100,sea:!0,d(t){Z(()=>{o.moveTo(-56,6),o.quadraticCurveTo(-24,82,40,52),o.quadraticCurveTo(54,44,64,34),o.lineTo(52,38),o.quadraticCurveTo(8,60,-46,0),o.closePath()}),m(-8,62,2,80,10,58),m(-52,4,-70,4,-60,-2,-50,10,-64,18),m(14,46,24,30,26,46)}},fish:{w:90,h:50,sea:!0,fly:40,d(t){o.beginPath();for(const[e,r,s,i]of[[-24,10,1,.5],[10,32,.9,0],[36,12,.8,-.5]])o.save(),o.translate(e,r),o.rotate(i),o.scale(s,s),E0(A0("20,0! 16,5 8,8 2,9 -2,12! -5,8 -12,6 -19,2 -22,0! -31,8! -27,0! -31,-8! -22,-1! -16,-4 -8,-6 -2,-6 0,-9! 4,-6 12,-5 17,-3")),o.restore();o.fill()}},turtle:{w:110,h:60,sea:!0,fly:30,d(t){u(0,0,34,18),u(40,4,10,7),m(10,10,30,34,36,30,22,8),m(-14,10,-30,26,-24,8),m(14,-10,30,-20,22,-6),m(-36,0,-46,4,-36,6),W(()=>{for(const[e,r]of[[-12,4],[6,6],[-2,-6],[16,-4]])$0(e,r,6,6,.85)})}},celephant:{w:175,h:175,d(t){W0.elephant.d(t),m(-34,116,20,120,24,70,-40,64),o.beginPath(),z0([[60,136],[57,150],[61,164]],[8,9,7],"tip"),o.fill(),W(()=>{for(let e=-30;e<=16;e+=9)u(e,70,2.4,2.4);$0(-8,96,10,5)})}},chorse:{w:160,h:170,d(t){W0.horse.d(t,3),m(-26,100,22,106,26,76,-30,72),o.beginPath(),z0([[60,138],[58,152],[62,166]],[7,8,6],"tip"),o.fill(),W(()=>$0(-2,90,9,5))}},seal:{w:110,h:150,d(t){m(-34,0,34,0,30,30,-30,30),m(-38,30,38,30,38,36,-38,36),Z(()=>{o.moveTo(-34,36),o.quadraticCurveTo(-36,74,-6,104),o.quadraticCurveTo(10,120,26,118),o.quadraticCurveTo(36,110,22,98),o.quadraticCurveTo(8,80,18,36),o.closePath()}),m(26,118,40,116,28,112),m(4,72,26,60,8,62),m(-34,38,-50,30,-40,44),u(34,134,15,15),W(()=>{u(20,112,1.8,1.8),D(22,134,46,134,3)})}},bearball:{w:110,h:170,d(t){u(0,34,34,34),o.save(),o.translate(0,64),G(-10,40,40,14,12,-.1),G(10,40,40,14,12,.1),u(0,62,22,30),u(0,100,16,14),u(-10,112,6,6),u(10,112,6,6),u(8,96,9,7),G(-16,80,30,9,8,-2),G(16,80,30,9,8,2),o.restore(),W(()=>{$0(0,34,16,5),u(4,168,1.6,1.6)})}},wagon:{w:170,h:140,d(t){m(-74,26,74,26,74,116,-74,116),m(-82,116,82,116,74,130,-74,130),u(0,134,18,6),u(-46,22,21,21),u(46,22,21,21),m(74,40,104,30,104,34,74,46),W(()=>{m(-62,38,62,38,62,104,-62,104);for(const e of[-46,46])for(let r=0;r<6;r++){const s=r*Math.PI/3+t;m(e+Math.cos(s)*4,22+Math.sin(s)*4,e+Math.cos(s+.4)*16,22+Math.sin(s+.4)*16,e+Math.cos(s+.75)*16,22+Math.sin(s+.75)*16)}}),o.save(),o.translate(-6,38),o.scale(.62,.62),W0.lion.d(1.2),o.restore();for(let e=-50;e<=52;e+=17)m(e-2.5,38,e+2.5,38,e+2.5,104,e-2.5,104)}},ccamel:{w:150,h:170,d(t){W0.camel.d(t),m(-30,118,22,112,24,72,-28,76),o.beginPath(),z0([[74,144],[72,156],[76,168]],[6,7,5],"tip"),o.fill(),W(()=>{for(let e=-24;e<=18;e+=9)u(e,92,2.2,2.2)})}},hoopdog:{w:150,h:130,d(t){o.lineCap="round",D(0,0,0,52,4),m(-16,0,16,0,10,4,-10,4),o.lineWidth=5,o.beginPath(),o.ellipse(0,88,22,36,0,0,R),o.stroke(),o.save(),o.translate(0,88),o.rotate(-.15),u(-6,0,30,10),u(28,7,10,8),m(32,8,46,4,32,0),m(22,14,24,24,28,14),G(14,-4,26,6,5,-1.9),G(8,-4,24,6,5,-2.1),G(-28,-2,26,6,5,1.9),G(-22,-4,24,6,5,2.2),kt(-34,4,-50,14,-56,4,3),o.restore()}},rocket:{w:110,h:170,fly:96,d(t){o.save(),o.rotate(-.5),Z(()=>{o.moveTo(-15,10),o.lineTo(15,10),o.lineTo(15,90),o.quadraticCurveTo(15,122,0,142),o.quadraticCurveTo(-15,122,-15,90),o.closePath()}),m(-15,12,-32,-8,-15,44),m(15,12,32,-8,15,44),m(-4,12,4,12,2,-6,-2,-6),Z(()=>{const e=.8+.2*Math.sin(t*3);o.moveTo(-9,8),o.quadraticCurveTo(-8,-30*e,0,-60*e),o.quadraticCurveTo(8,-30*e,9,8),o.closePath()}),W(()=>{u(0,92,7.5,7.5),u(0,64,4,4)}),o.restore()}},comet:{w:190,h:50,fly:180,d(t){u(60,0,13,13),Z(()=>{o.moveTo(60,13),o.quadraticCurveTo(-30,16,-130,26),o.quadraticCurveTo(-40,4,60,-13),o.closePath()}),W(()=>{D(40,4,-100,18,1.5),D(40,-4,-90,8,1.2)})}},satellite:{w:150,h:70,fly:150,d(t){o.save(),o.rotate(.25*Math.sin(t)),m(-14,-14,14,-14,14,14,-14,14),m(-70,-10,-20,-10,-20,10,-70,10),m(20,-10,70,-10,70,10,20,10),o.lineCap="round",D(0,14,0,28,2.5),u(0,34,12,5),D(-20,0,-14,0,3),D(14,0,20,0,3),W(()=>{for(let e=-66;e<-22;e+=8)D(e,-7,e,7,1.6);for(let e=26;e<70;e+=8)D(e,-7,e,7,1.6)}),o.restore()}},ufo:{w:120,h:60,fly:130,d(t){Z(()=>{o.ellipse(0,10,20,17,0,0,Math.PI),o.closePath()}),u(0,4,50,9),u(0,-2,26,6),G(-18,-2,14,3,3,.5),G(18,-2,14,3,3,-.5),W(()=>{for(let e=-36;e<=36;e+=12)u(e,4,2.6,2.6);u(-6,16,4,5)})}},ringed:{w:170,h:90,fly:150,d(t){u(0,0,36,36),o.lineWidth=7,o.beginPath(),o.ellipse(0,0,76,15,-.25,Math.PI*.94,Math.PI*2.06),o.stroke(),o.lineWidth=3,o.beginPath(),o.ellipse(0,0,64,11,-.25,Math.PI*.94,Math.PI*2.06),o.stroke(),W(()=>{o.lineWidth=2.5,o.beginPath(),o.ellipse(0,0,70,13,-.25,Math.PI*.94,Math.PI*2.06),o.stroke(),D(-30,8,30,14,2)})}},moonlet:{w:100,h:80,fly:200,d(t){u(0,0,26,26),u(46,18,8,8),W(()=>{u(-8,6,6,5),u(10,-8,4,4),u(6,12,3,3)})}}},z1={"animals walking":{ground:["elephant","giraffe","camel","lion","horse","lion","deer","horse","deer","elephant","giraffe"],n:7,sky:["bird"],ns:2},"sea and ships":{ground:["ship","sailboat","whale","dolphin","sailboat","fish","turtle","dolphin"],n:6,sky:["bird"],ns:3},"forest and birds":{ground:["deer","fox","rabbit","hedgehog","squirrel","deer","fox"],n:6,sky:["bird","bird","owl","bird"],ns:5},"circus parade":{ground:["celephant","chorse","seal","bearball","wagon","ccamel","hoopdog","chorse"],n:6,sky:[],ns:0},"space and planets":{ground:[],n:0,sky:["rocket","comet","satellite","ufo","ringed","moonlet","comet"],ns:7}},ut=()=>{const t=document.createElement("canvas");t.width=Y,t.height=B;const e=t.getContext("2d",{willReadFrequently:!0});return e.fillStyle="#000",e.fillRect(0,0,Y,B),e},c0=(t,e,r,s,i)=>{for(const d of[-2048,0,2048]){const c=t+d;c+s*r<-10||c-s*r>2058||(o.setTransform(V*r,0,0,-V*r,c*V,e*V),i())}o.setTransform(1,0,0,1,0,0)},dt=t=>{for(const e of[-2048,0,2048])o.setTransform(V,0,0,V,e*V,0),t();o.setTransform(1,0,0,1,0,0)},P1=(t,e,r)=>{const s=()=>e(),i=ut(),d=ut(),c=ut(),h=ut(),n=o0===3?ut():null;for(const l of[i,d,c,h])l.fillStyle=l.strokeStyle="#fff";const f=z1[t];o=i;const y=l=>x0+4*Math.sin(l*R/2048*3+1)+3*Math.sin(l*R/2048*7);if((t==="animals walking"||t==="forest and birds"||t==="circus parade")&&dt(()=>{o.beginPath(),o.moveTo(0,B/V);for(let l=0;l<=2048;l+=8)o.lineTo(l,y(l));o.lineTo(2048,B/V),o.closePath(),o.fill();for(let l=0;l<2048;l+=5){const v=4+7*Math.abs(Math.sin(l*.37)*Math.cos(l*.11));m(l-2,y(l)+1,l+.5+Math.sin(l)*2,y(l)-v,l+2,y(l)+1)}}),t==="animals walking")for(let l=0;l<6;l++){const v=s()*2048,g=.6+s()*.6;o=s()<.5?c:i,c0(v,y(v)+2,g,60,()=>{l%2?(D(0,0,0,40,6),u(0,58,26,24),u(-16,46,16,14),u(16,46,16,14)):(u(0,8,26,14),u(-18,6,14,9),u(16,6,13,9))})}if(t==="forest and birds")for(let l=0;l<16;l++){const v=l/16*2048+s()*90,g=.55+s()*.55;o=s()<.7?c:i;const z=s()<.6;c0(v,y(v)+2,g,60,()=>{if(z){D(0,0,0,30,6);for(let b=0;b<5;b++){const S=26+b*26,_=46-b*8;m(-_,S,_,S,0,S+46)}}else D(0,0,0,70,8),D(0,50,-20,80,4),D(0,56,22,84,4),u(0,110,40,36),u(-28,92,24,22),u(26,94,26,24),u(6,136,26,20)})}if(t==="circus parade"){o=c;const l=s()*2048;c0(l,x0+2,1.15,160,()=>{Z(()=>{o.moveTo(-150,0),o.lineTo(-140,70),o.quadraticCurveTo(-60,100,0,150),o.quadraticCurveTo(60,100,140,70),o.lineTo(150,0),o.closePath()}),o.lineWidth=3,D(0,150,0,182,3),m(0,182,0,170,22,176)}),o=d,c0(l,x0+2,1.15,160,()=>{for(let v=-4;v<=4;v++)m(v*32-7,4,v*32+7,4,v*16+3,140-Math.abs(v)*14,v*16-3,140-Math.abs(v)*14);m(-18,0,18,0,12,50,-12,50)}),o=i;for(let v=0;v<4;v++){const g=v*512+40;dt(()=>{o.lineWidth=2,o.beginPath(),o.moveTo(g,60),o.quadraticCurveTo(g+236,150,g+472,60),o.stroke();for(let z=1;z<14;z++){const b=z/14,S=g+472*b,_=60+90*4*b*(1-b)*.5+0*b;m(S-10,_,S+10,_,S,_+26)}})}}if(t==="sea and ships"){const l=g=>x0-6+8*Math.sin(g*R/2048*9)+4*Math.sin(g*R/2048*23+1);dt(()=>{o.beginPath(),o.moveTo(0,B/V);for(let g=0;g<=2048;g+=4){const z=g%64/64;o.lineTo(g,l(g)-9*Math.pow(Math.sin(z*Math.PI),3)+(z>.75?6*(z-.75)*4:0))}o.lineTo(2048,B/V),o.closePath(),o.fill()}),o=c,dt(()=>{o.beginPath(),o.moveTo(0,B/V);for(let g=0;g<=2048;g+=4)o.lineTo(g,l(g+30)-30-7*Math.pow(Math.abs(Math.sin(g*R/96)),2));o.lineTo(2048,B/V),o.closePath(),o.fill()}),o=i;const v=s()*2048;c0(v,x0+4,1,60,()=>{u(-6,0,50,22),u(30,-4,34,16),m(-16,10,16,10,11,110,-11,110),m(-14,110,14,110,14,124,-14,124),m(-16,124,16,124,0,140),D(-14,117,14,117,2)}),o=d,c0(v,x0+4,1,300,()=>{m(10,117,260,150,260,84),m(-10,117,-200,140,-200,96)}),o=i;for(let g=0;g<6;g++){const z=s()*2048,b=60+s()*120,S=.6+s()*.6;c0(z,b,S,20,()=>{kt(-14,4,-7,10,0,0,2.6),kt(0,0,7,10,14,4,2.6)})}}if(t==="space and planets"){dt(()=>{o.beginPath(),o.moveTo(0,B/V);for(let l=0;l<=2048;l+=6){let v=x0+26+6*Math.sin(l*.011)+4*Math.sin(l*.037);for(let g=0;g<7;g++){const z=(g*311+90)%2048,b=Math.abs(l-z);b<40&&(v+=9*Math.sqrt(1-b*b/1600)-(b>30,0))}o.lineTo(l,v)}o.lineTo(2048,B/V),o.closePath(),o.fill()}),o=c;for(let l=0;l<5;l++){const v=s()*2048,g=60+s()*200,z=[];for(let b=0;b<7;b++)z.push([(s()-.5)*140,(s()-.5)*50,30+s()*40,14+s()*16]);c0(v,g,1,120,()=>{for(const b of z)u(b[0],b[1],b[2],b[3])})}}o=d;const w=s()*2048,E=70+s()*30;c0(w,E,1,70,()=>{Z(()=>{o.arc(0,0,46,0,R),o.arc(19,11,40,0,R,!0)})});const C=t==="space and planets"?150:46;for(let l=0;l<C;l++){const v=s()*2048,g=26+s()*(t==="space and planets"?300:150),z=.8+s()*s()*1.3;if(Math.abs(v-w)<70&&Math.abs(g-E)<70)continue;const b=s()<.6;c0(v,g,z,16,()=>b?u(0,0,4.5,4.5):$0(0,0,12,4,.36))}if(t!=="space and planets"&&t!=="circus parade"){o=c;for(let l=0;l<3;l++){const v=s()*2048,g=100+s()*70;c0(v,g,1.5,100,()=>{u(0,0,50,14),u(-30,8,26,14),u(18,12,30,18),u(44,2,22,10)})}}const L=[],q=(l,v,g)=>{if(!v)return;const z=[];for(let U=0;U<v;U++)z.push(l[Math.floor(s()*l.length)%l.length]);const b=z.reduce((U,t0)=>U+W0[t0].w,0),S=Math.min(1.85,2048*(g?.5:.8)/b),_=(2048-b*S)/v;let a0=s()*2048;for(const U of z){const t0=W0[U],j=S*(.92+s()*.16)*(U==="rabbit"||U==="hedgehog"||U==="squirrel"?1.3:1);a0+=t0.w*j/2;const e0=g?f.n?Math.max(40+t0.h*j*.6,x0-(t0.fly||120)*.8-s()*60-30):70+t0.h*j*.4+s()*(x0-120-t0.h*j*.4):t0.sea?x0+6:y(a0)+3;L.push({k:U,x:a0%2048,y:e0,s:j,ph:s()*R}),a0+=t0.w*j/2+_}};if(q(f.ground,f.n,!1),r){const l=L.map(z=>z.x).sort((z,b)=>z-b);let v=1024,g=-1;l.forEach((z,b)=>{const S=b+1<l.length?l[b+1]:l[0]+2048;S-z>g&&(g=S-z,v=(z+S)/2%2048)}),L.push({k:"cat",x:v,y:t==="space and planets"?x0+22:y(v)+3,s:1.15,ph:0})}q(f.sky,f.ns,!0);const k=[[.95,.55,.3],[.5,.75,.95],[.95,.85,.35],[.7,.95,.6],[.95,.5,.6],[.8,.6,.95]];for(const l of L){const v=W0[l.k];if(o=h,o.fillStyle=o.strokeStyle="#fff",c0(l.x,l.y,l.s,v.w,()=>v.d(l.ph)),n){const g=l.k==="cat"?k[0]:k[Math.floor(s()*k.length)%k.length];o=n,o.fillStyle=o.strokeStyle=`rgb(${g.map(z=>z*255|0).join(",")})`,c0(l.x,l.y,l.s,v.w,()=>v.d(l.ph))}l.u=l.x/2048,l.hw=v.w*l.s/2/2048+.004,l.v0=1-l.y/512-.01,l.v1=1-(l.y-v.h*l.s)/512+.01,v.fly&&(l.v0=1-(l.y+v.h*l.s*.5)/512-.01,l.v1=1-(l.y-v.h*l.s*.6)/512+.01),l.k==="rocket"&&(l.v0-=.08,l.v1+=.03)}const I=i.getImageData(0,0,Y,B).data,y0=d.getImageData(0,0,Y,B).data,se=c.getImageData(0,0,Y,B).data,ne=h.getImageData(0,0,Y,B).data,at=n?n.getImageData(0,0,Y,B).data:null,i0=new Uint8Array(Y*B*4),bt=new Uint8Array(Y*B*4),rt=new Float32Array(65*17);for(let l=0;l<rt.length;l++)rt[l]=s();const U1=[[.95,.45,.3],[.98,.78,.4],[.42,.58,.95],[.48,.82,.55],[.85,.45,.6],[.92,.9,.82]],X1=[0,1,2,3,4,5].map(()=>U1[Math.floor(s()*6)%6]);let o1=0,a1=0,r1=0;const G1=6*V,H1=B-10*V,X0=9*V,O1=2.1*V*(2.1*V);for(let l=0;l<B;l++){const v=1-l/B,g=l<G1||l>H1;for(let z=0;z<Y;z++){const b=(l*Y+z)*4,S=I[b]/255,_=y0[b]/255,a0=se[b]/255,U=ne[b]/255,t0=z/Y;let j,e0,l0,G0,H0,O0;if(o0===0){const b0=t0*64,g0=v*16,r0=b0|0,Q=g0|0,M0=b0-r0,C0=g0-Q;let n1=.5*(.88+.24*((rt[Q*65+r0]*(1-M0)+rt[Q*65+r0+1]*M0)*(1-C0)+(rt[(Q+1)*65+r0]*(1-M0)+rt[(Q+1)*65+r0+1]*M0)*C0));z<9*V&&(n1*=.55);const Q1=Math.abs(t0*6%1-.5)>.4965?.8:0,ie=n1*(1-S)*(1-.72*a0)*(1-Q1);j=ie*1*(1-_)+_,e0=ie*.88*(1-_)+_*.97,l0=ie*.68*(1-_)+_*.92,G0=j*(1-U),H0=e0*(1-U),O0=l0*(1-U)}else if(o0===1){const b0=z%X0-X0/2,g0=(l+(z/X0|0)%2*X0/2)%X0-X0/2,r0=b0*b0+g0*g0<O1?1:0,Q=Math.max(_,S*r0*(Math.sin(z*.7)>-.2?1:0),a0*r0*((z/X0|0)%2));j=e0=l0=Q,G0=H0=O0=Math.max(Q,U)}else if(o0===2){const b0=Math.floor(t0*12)%12,g0=t0*12%1,r0=g0<.012||g0>.988||Math.abs(v-.66)<.005?1:0,Q=X1[(b0+(v>.66?3:0))%6],C0=.78*(.85+.15*v)*(1-S)*(1-.6*a0)*(1-r0);j=Q[0]*C0*(1-_)+_,e0=Q[1]*C0*(1-_)+_,l0=Q[2]*C0*(1-_)+_,G0=j*(1-U),H0=e0*(1-U),O0=l0*(1-U)}else{const b0=t0*4%1,g0=b0<.012||b0>.988?1:0,r0=[.07+.1*(1-v),.1+.16*(1-v),.36+.1*(1-v)],Q=.8*(1-g0);j=(r0[0]*(1-S)+.05*S)*Q,e0=(r0[1]*(1-S)+.04*S)*Q,l0=(r0[2]*(1-S)+.03*S)*Q,j=j*(1-.5*a0)+.12*a0*Q,e0=e0*(1-.5*a0)+.12*a0*Q,l0=l0*(1-.5*a0)+.2*a0*Q,j=j*(1-_)+_,e0=e0*(1-_)+.92*_,l0=l0*(1-_)+.62*_;const M0=at[b]/255*.85,C0=at[b+1]/255*.85,s1=at[b+2]/255*.85;G0=j*(1-U)+M0*U*Q,H0=e0*(1-U)+C0*U*Q,O0=l0*(1-U)+s1*U*Q}g&&(j=e0=l0=G0=H0=O0=0),i0[b]=G0*255+.5,i0[b+1]=H0*255+.5,i0[b+2]=O0*255+.5,i0[b+3]=255,bt[b]=j*255+.5,bt[b+1]=e0*255+.5,bt[b+2]=l0*255+.5,bt[b+3]=g?0:U*255+.5,o1+=G0,a1+=H0,r1+=O0}}const ce=Y*B;return{full:i0,bg:bt,figs:L,avg:[o1/ce,a1/ce,r1/ce]}};a.getExtension("EXT_color_buffer_float");const Vt=a.getExtension("EXT_texture_filter_anisotropic"),q1=a.createVertexArray();a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_ALIGNMENT,1);const Le=(t,e,r,s,i,d,c,h)=>{const n=a.createTexture();return a.bindTexture(a.TEXTURE_2D,n),a.texImage2D(a.TEXTURE_2D,0,r,t,e,0,s,i,d),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,c),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,c),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,h),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,h),n},_t=256,Kt=new Uint8Array(_t*_t*4);{let t=2654435769;const e=()=>(t^=t<<13,t^=t>>>17,t^=t<<5,(t>>>0)/4294967296);for(let r=0;r<Kt.length;r++)Kt[r]=e()*256|0}const jt=v0.nz=v0.nz||Le(_t,_t,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,Kt,a.LINEAR,a.REPEAT),$t=(t,e,r)=>{const s=Le(w0,w0,t,e,r,null,a.NEAREST,a.CLAMP_TO_EDGE),i=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,i),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,s,0),[s,i]},[Zt,R1]=$t(a.RGBA32UI,a.RGBA_INTEGER,a.UNSIGNED_INT),[E1,M1]=$t(a.RGBA8,a.RGBA,a.UNSIGNED_BYTE),[C1,L1]=$t(a.R32UI,a.RED_INTEGER,a.UNSIGNED_INT),k1=Math.log2(Y)+1|0,Jt=a.createTexture();a.bindTexture(a.TEXTURE_2D_ARRAY,Jt),a.texStorage3D(a.TEXTURE_2D_ARRAY,k1,a.RGBA8,Y,B,T0===1?4:2),a.texParameteri(a.TEXTURE_2D_ARRAY,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.texParameteri(a.TEXTURE_2D_ARRAY,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D_ARRAY,a.TEXTURE_WRAP_S,a.REPEAT),a.texParameteri(a.TEXTURE_2D_ARRAY,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),Vt&&a.texParameterf(a.TEXTURE_2D_ARRAY,Vt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,a.getParameter(Vt.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));const Nt=[],ht=v0.drums=v0.drums||new Map,_1=n0.map(()=>h0()*4294967296>>>0),ke=T0===2?n0.findIndex(t=>t!=="sea and ships"):-1,te=(t,e,r)=>{let s=Nt[e];if(!s){const i=_1[t]^e*2654435769,d=n0[t]+"|"+i+"|"+o0+"|"+Y+(t===ke?"|cat":"");if(s=ht.get(d),!s){let c=i;const h=()=>{c=c+1831565813|0;let n=Math.imul(c^c>>>15,1|c);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296};s=P1(n0[t],h,t===ke),ht.set(d,s),ht.size>4&&ht.delete(ht.keys().next().value)}Nt[e]=s}return a.bindTexture(a.TEXTURE_2D_ARRAY,Jt),a.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,r,Y,B,1,a.RGBA,a.UNSIGNED_BYTE,s.full),a.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,r+1,Y,B,1,a.RGBA,a.UNSIGNED_BYTE,s.bg),a.generateMipmap(a.TEXTURE_2D_ARRAY),s};let P0=0;T0===1&&te(1%Y0,Y0,2),te(0,0,0);const _e=new Map,p=(t,e)=>{let r=_e.get(t);return r||_e.set(t,r={}),e in r||(r[e]=a.getUniformLocation(t,e)),r[e]},F0=Rt(_0===0?[-.12,1,-1]:[-.1,1.1,-1]),Dt=t=>{a.uniform3fv(p(t,"uE"),O),a.uniform3fv(p(t,"uFw"),S0),a.uniform3fv(p(t,"uRt"),lt),a.uniform3fv(p(t,"uUp"),it),a.uniform1f(p(t,"uTh"),V0),a.uniform1f(p(t,"uS"),w0)},St=T0===1,q0=(t,e,r)=>{a.activeTexture(a.TEXTURE0+t),a.bindTexture(e,r)},At=()=>{a.bindVertexArray(q1),a.drawArrays(a.TRIANGLES,0,3)},Ne=t=>{const e=ye(t,O),r=Ht(e,S0);return[.5+Ht(e,lt)/r/V0*.5,.5-Ht(e,it)/r/V0*.5]},De=(t,e)=>{const r=t*2-1,s=1-e*2;return Rt([S0[0]+(r*lt[0]+s*it[0])*V0,S0[1]+(r*lt[1]+s*it[1])*V0,S0[2]+(r*lt[2]+s*it[2])*V0])},ee=(t,e)=>{const r=De(t,e);let s=1e9;const i=c=>{c>.01&&c<s&&(s=c)},d=(R0-N0)/D0;if(r[1]<0&&i(-O[1]/r[1]),r[0]<0){const c=-O[0]/r[0];(J!==2||O[1]+r[1]*c<N0)&&i(c)}if(r[2]<0&&i(-O[2]/r[2]),J===2){const c=r[1]-D0*r[0];if(Math.abs(c)>1e-5){const h=(N0+D0*O[0]-O[1])/c;O[0]+r[0]*h<d&&i(h)}}if(r[1]>0){const c=(R0-O[1])/r[1];(J!==2||O[0]+r[0]*c>=d)&&i(c)}if(J===3&&r[1]>0){const c=(1.55-O[1])/r[1],h=O[0]+r[0]*c,n=O[2]+r[2]*c;h<1.55&&n<1.45&&h>0&&n>0&&i(c)}return[O[0]+r[0]*s,O[1]+r[1]*s,O[2]+r[2]*s]},Se=(t,e)=>{const r=De(t,e),s=O[0]-x.cx,i=O[2]-x.cz,d=r[0]*r[0]+r[2]*r[2],c=s*r[0]+i*r[2],h=s*s+i*i-.2*.2,n=c*c-d*h;if(n<0)return!1;const f=(-c-Math.sqrt(n))/d,y=(-c+Math.sqrt(n))/d,w=O[1]+r[1]*f,E=O[1]+r[1]*y;return Math.max(w,E)>x.by-.02&&Math.min(w,E)<x.y1+.1},Ae=Ne([x.cx,(x.y0+x.y1)/2,x.cz]),Be=Ne([A.cx,A.by+.15*A.sc,A.cz]),N1=[x.cx,(x.y0+x.y1)/2,x.cz],D1=[A.cx,A.by+((x.y0+x.y1)/2-x.by)*A.sc,A.cz],xt=o0<=1,pt=o0===2,mt=o0===3,Bt=xt?.05:pt?.044:.04;let p0=h0(),Z0=Bt,We=h0(),f0=1,Wt=1;const P={down:!1,x0:0,y0:0,t0:0,mode:0,lx:0,ang:0,onLan:!1};let K=null,J0=1,tt=.5,I0=parseInt(L0.slice(40,48),16)|1,vt=Math.floor(p0*32),Fe=Math.floor(p0*8),oe=1.5,et=0,Ie=0;const ot=()=>(I0^=I0<<13,I0^=I0>>>17,I0^=I0<<5,(I0>>>0)/4294967296),S1=mt?[1,.72,.44]:pt?[1,.8,.58]:[1,.6,.3],Ue=[.95,1.7,1.05,1.4][o0],A1=[.09,.006,.05,.02][o0],B1=xt?.0042:pt?.0016:.003,W1=xt?.009:pt?.0016:.0045,F1=[0,2,4,5,7,9,11,12,14,16],ae=n0.map((t,e)=>{let r=(c1*1e9|0)+e*7919;const s=()=>(r=r*1103515245+12345&2147483647,r/2147483647),i=64+[0,2,5,7,-3][Math.floor(s()*5)%5],d=[];let c=4;for(let n=0;n<8;n++)c=Math.max(0,Math.min(9,c+[-2,-1,-1,0,1,1,2][Math.floor(s()*7)%7])),d.push(s()<.78?c:-1);d[0]=4,d[7]=-1;const h=[];for(let n=0;n<4;n++)for(let f=0;f<8;f++){let y=d[f];n===1&&f>=4&&y>=0&&(y=Math.max(0,y-1)),n===2&&y>=0&&(y=Math.min(9,y+2)),n===3&&f===6&&(y=0),h.push(y<0?-1:i+F1[y])}return{seq:h,root:i}}),u0=$.sound;let Xe=null;const yt=new Float32Array(44),d0=(t,e,r,s,i)=>{yt[t*4]=e,yt[t*4+1]=r,yt[t*4+2]=s,yt[t*4+3]=i},Ge={},He=()=>{Dt(N),a.uniform1i(p(N,"uG"),0),a.uniform1i(p(N,"uA"),1),a.uniform1i(p(N,"uNz"),2),a.uniform1i(p(N,"uDr"),3),a.uniform1i(p(N,"uW"),4),a.uniform4f(p(N,"uWn"),T.x0,T.x1,T.y0,T.y1),a.uniform4f(p(N,"uCt"),X.a0,X.a1,X.b0,X.b1),a.uniform4f(p(N,"uCt2"),X.yb,X.yr,0,0),a.uniform4f(p(N,"uL1x"),A.cx,A.cz,2,o0),a.uniform3fv(p(N,"uDc0"),N1),a.uniform3fv(p(N,"uDc1"),D1),a.uniform3fv(p(N,"uLc"),S1),a.uniform2f(p(N,"uDim"),Y,B),a.uniform4f(p(N,"uMn"),F0[0],F0[1],F0[2],_0===0?.3:.16),a.uniform4f(p(N,"uFs"),Ae[0],1-Ae[1],Be[0],1-Be[1]),a.uniform4fv(p(N,"uBq"),f1),a.uniform4fv(p(N,"uBr[0]")||p(N,"uBr"),u1),N.__own=Ge},Oe=t=>{a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,w0,w0),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.useProgram(N),N.__own!==Ge&&He(),q0(0,a.TEXTURE_2D,Zt),q0(1,a.TEXTURE_2D,E1),q0(2,a.TEXTURE_2D,jt),q0(3,a.TEXTURE_2D_ARRAY,Jt),q0(4,a.TEXTURE_2D,C1);const e=(tt-.5)*.0018,r=Je;if(d0(0,x.cx+e,x.fy,x.cz+e*.6,Ue*f0*J0*r),d0(1,x.R,x.y0-x.fy,x.y1-x.y0,p0),d0(2,x.cx,x.cz,0,o0),d0(3,B1*(.7+.3*f0),W1*(.6+.4*f0),St?2:1,A1),K){const i=K.f;d0(4,i.u,i.hw,K.du,1),d0(5,i.v0,i.v1,K.ang,K.hop)}else d0(4,0,0,0,0);d0(6,_0,Ie,T0===3?.04+.22*(1-f0*r):0,1.3*(1+1.9*(1-f0*(.4+.6*r))));const s=Nt[P0].avg;d0(7,s[0],s[1],s[2],1),d0(8,t,me[0],me[1],0),d0(9,A.cx,A.by+(x.fy-x.by)*A.sc,A.cz,St?Ue*.85*f0*(1.9-J0)*r:0),d0(10,x.R*A.sc,(x.y0-x.fy)*A.sc,(x.y1-x.y0)*A.sc,We),a.uniform4fv(Xe,yt),At()},Qe=[],Ye=[],F=(t,e,r,s,i,d,c,h=0)=>Qe.push(t,e,r,c,s,i,d,h),U0=(t,e,r,s,i,d,c,h=0)=>Ye.push(t,e,r,d,s,i,c?1:0,h);{const t=(R0-N0)/D0;J===2&&F(t-.07,R0-.17,0,t+.07,R0+.01,4,24,1),F(0,0,0,.016,.11,4,6),F(0,0,0,4,.11,.016,6);const e=(T.x0+T.x1)/2,r=T.y0+.62*(T.y1-T.y0),s=-.115,i=-.07;F(T.x0,T.y0,s,T.x0+.055,T.y1,i,13),F(T.x1-.055,T.y0,s,T.x1,T.y1,i,13),F(T.x0,T.y0,s,T.x1,T.y0+.06,i,13),F(T.x0,T.y1-.055,s,T.x1,T.y1,i,13),F(e-.017,T.y0,s+.01,e+.017,T.y1,i-.005,13),F(T.x0,r-.017,s+.01,T.x1,r+.017,i-.005,13),F(T.x0-.07,T.y0-.04,-.02,T.x1+.07,T.y0,.065,15,1),F(X.a0-.09,X.yr+.005,.07,X.b1+.09,X.yr+.028,.092,26),F(X.a0-.12,X.yr-.005,.064,X.a0-.08,X.yr+.038,.098,26),F(X.b1+.08,X.yr-.005,.064,X.b1+.12,X.yr+.038,.098,26);const d=(M.z0+M.z1)/2;F(M.x0,qt-.032,M.z0,M.x1,qt,M.z1,7,1),F(M.x0+.02,.13,M.z0+.02,M.x1-.025,qt-.032,M.z1-.02,7,1),F(M.x1-.03,.33,d-.016,M.x1-.005,.36,d+.016,8);for(const[c,h]of[[M.x0+.02,M.z0+.02],[M.x1-.065,M.z0+.02],[M.x0+.02,M.z1-.06],[M.x1-.065,M.z1-.06]])F(c,0,h,c+.04,.13,h+.04,7);F(H.x1,0,0,H.x1+.045,.86,H.z1+.03,17,1),F(H.x1-.015,.82,-.005,H.x1+.06,.85,H.z1+.045,17),F(H.x0,.13,0,H.x1,.27,H.z1,17,1),F(H.x0-.04,0,0,H.x0,.44,H.z1+.02,17,1),F(H.x0-.05,.42,-.005,H.x0+.01,.45,H.z1+.035,17);for(let c=0;c<(St?2:1);c++){const h=c?A.cx:x.cx,n=c?A.cz:x.cz,f=c?A.by:x.by,y=c?A.sc:1,w=x.R*y,E=f+(x.y0-x.by)*y,C=f+(x.y1-x.by)*y,L=x.bR*y,q=c?1:0;U0(h,n,L,f,E,9,1,q),U0(h,n,L*1.05,f,f+.007*y,9,1),U0(h,n,w*1.012,E,E+.008*y,21,0),U0(h,n,w*1.012,C-.008*y,C,21,0),U0(h,n,w,E,C,10,0,q),U0(h,n,.011*y,C,C+.045*y,21,1);const k=w*1.09,I=.0024*y;F(h-k-I,f,n-I,h-k+I,C+.038*y,n+I,21),F(h+k-I,f,n-I,h+k+I,C+.038*y,n+I,21),F(h-k-I,C+.034*y,n-I*.6,h+k+I,C+.038*y,n+I*.6,21)}s0===2&&U0(x.cx,x.cz,.0035,x.y1+.04,J===2?N0+D0*x.cx+.01:R0+.01,21,0)}const Ve=new Float32Array(Qe),Ke=new Float32Array(Ye),je=null,$e=()=>!je||[ft,j0,...Yt,N].every(t=>a.getProgramParameter(t,je.COMPLETION_STATUS_KHR));let re=!1,Ze=0,I1=0,Je=.12;const t1=()=>{for(const e of[ft,j0,...Yt,N])if(!a.getProgramParameter(e,a.LINK_STATUS)){const r="037 "+e.__n+": "+a.getProgramInfoLog(e)+" "+a.getShaderInfoLog(e.__f)+" "+a.getShaderInfoLog(Pe);throw delete v0[e.__n],new Error(r)}a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.viewport(0,0,w0,w0);const t=e=>{q0(0,a.TEXTURE_2D,jt),a.uniform1i(p(e,"uNz"),0),a.uniform4f(p(e,"uRm"),J,R0,N0,D0),a.uniform4f(p(e,"uTb"),M.x0,M.z0,M.x1,M.z1),a.uniform4f(p(e,"uLn"),x.cx,x.cz,x.by,x.R),a.uniform4f(p(e,"uLn2"),x.y0,x.y1,x.fy,x.bR),a.uniform4f(p(e,"uWn"),T.x0,T.x1,T.y0,T.y1),a.uniform4f(p(e,"uCt"),X.a0,X.a1,X.b0,X.b1),a.uniform4f(p(e,"uCt2"),X.yb,X.yr,0,0),a.uniform4f(p(e,"uBd"),H.x0,H.x1,H.z1,H.top),a.uniform4f(p(e,"uRr"),T0,Pt,[.16,.09,.16,.33][Pt],[.011,0,.003,.016][Pt]),a.uniform4f(p(e,"uL2"),A.cx,A.cz,A.by,A.sc),a.uniform4fv(p(e,"uBx[0]"),Ve),a.uniform4fv(p(e,"uCy[0]"),Ke),a.uniform1i(p(e,"uNB"),Ve.length/8),a.uniform1i(p(e,"uNC"),Ke.length/8),a.uniform1i(p(e,"uSt"),124),a.uniform1i(p(e,"uCn"),24),a.uniform1i(p(e,"uNL"),St?2:1),a.uniform1i(p(e,"uR3"),3),a.uniform1i(p(e,"uR4"),4),a.uniform1i(p(e,"uR6"),6),a.uniform1i(p(e,"uR2"),2),a.uniform3f(p(e,"uLf"),x.cx,x.fy,x.cz),a.uniform3fv(p(e,"uMd"),F0)};a.bindFramebuffer(a.FRAMEBUFFER,R1),a.useProgram(ft),Dt(ft),t(ft),At(),a.bindFramebuffer(a.FRAMEBUFFER,L1),a.useProgram(j0),Dt(j0),t(j0),q0(1,a.TEXTURE_2D,Zt),a.uniform1i(p(j0,"uGq"),1),At();for(const e of Yt)a.bindFramebuffer(a.FRAMEBUFFER,M1),a.useProgram(e),Dt(e),q0(0,a.TEXTURE_2D,Zt),q0(1,a.TEXTURE_2D,jt),a.uniform1i(p(e,"uG"),0),a.uniform1i(p(e,"uNz"),1),a.uniform4f(p(e,"uRm"),J,R0,N0,D0),a.uniform4f(p(e,"uTb"),M.x0,M.z0,M.x1,M.z1),a.uniform4f(p(e,"uBd"),H.x0,H.x1,H.z1,H.top),a.uniform4f(p(e,"uWn"),T.x0,T.x1,T.y0,T.y1),a.uniform4f(p(e,"uLn"),x.cx,x.cz,qt,x.R),a.uniform3fv(p(e,"uWall"),h1),a.uniform3fv(p(e,"uPa"),ge[0]),a.uniform3fv(p(e,"uPb"),ge[1]),a.uniform3fv(p(e,"uTab"),p1),a.uniform3fv(p(e,"uCur"),x1),a.uniform3fv(p(e,"uQ0"),Et[0]),a.uniform3fv(p(e,"uQ1"),Et[1]),a.uniform3fv(p(e,"uQ2"),Et[2]),a.uniform3fv(p(e,"uQ3"),Et[3]),a.uniform3fv(p(e,"uTa"),we[0]),a.uniform3fv(p(e,"uTb2"),we[1]),a.uniform4f(p(e,"uK"),Pt,Tt>.6?1:0,0,0),a.uniform4f(p(e,"uWx"),_0,0,0,0),a.uniform4f(p(e,"uMn"),F0[0],F0[1],F0[2],0),At();a.useProgram(N),He(),Xe=p(N,"uD[0]")||p(N,"uD"),re=!0},e1=()=>{a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,w0,w0),a.disable(a.SCISSOR_TEST),a.clearColor(.012,.009,.007,1),a.clear(a.COLOR_BUFFER_BIT)};return $e()&&t1(),re?Oe(0):e1(),(t,e)=>{if(e=Math.min(e,.25),!re)if($e()||++I1>20)t1(),Ze=t;else{e1();return}{const n=Math.min(1,Math.max(0,(t-Ze)/1.1));Je=.12+.88*n*n*(3-2*n)*(n<1?.85+.15*Math.sin(t*23):1)}const r=$.input,s=r.taps();let i=null;if(r.inside&&r.down){if(!P.down){P.down=!0,P.x0=P.lx=r.x,P.y0=r.y,P.t0=t,P.mode=0,P.onLan=Se(r.x,r.y);const f=ee(r.x,r.y);P.ang=Math.atan2(f[2]-x.cz,f[0]-x.cx)}const n=Math.hypot(r.x-P.x0,r.y-P.y0);if(P.mode===0&&n>.025&&(P.mode=1),P.mode===0&&t-P.t0>.35&&(P.mode=2),P.mode===1){let f;if(P.onLan)f=(r.x-P.lx)*1.4;else{const w=ee(r.x,r.y),E=Math.atan2(w[2]-x.cz,w[0]-x.cx);let C=E-P.ang;C-=Math.round(C/R)*R,P.ang=E,f=C/R}p0+=f;const y=f/Math.max(e,.001);Z0+=(y-Z0)*Math.min(1,e*12)}P.mode===2&&(Wt=.06),P.lx=r.x}else P.down?(P.down=!1,P.mode===0&&(i=[P.x0,P.y0]),P.mode===2&&(Wt=1)):s.length&&(i=[s[s.length-1].x,s[s.length-1].y]);if(i)if(Se(i[0],i[1]))Y0>1&&(P0=(P0+1)%Y0,te(P0,P0,0),K=null,u0.hit("click",.5),u0.note(48,{dur:.3,vel:.3,wave:"triangle",cutoff:600}),vt=Math.floor(p0*32));else{const n=ee(i[0],i[1]),f=[n[0]-x.cx,n[1]-x.fy,n[2]-x.cz],y=Math.hypot(f[0],f[2]),w=(f[1]/y*x.R-(x.y0-x.fy))/(x.y1-x.y0);let E=Math.atan2(f[2],f[0])/R-p0;E-=Math.floor(E);let C=null,L=1e9;for(const q of Nt[P0].figs){let k=E-q.u;k-=Math.round(k);const I=w<q.v0?q.v0-w:w>q.v1?w-q.v1:0,y0=Math.max(0,Math.abs(k)-q.hw)*3+I;y0<L&&(L=y0,C=q)}if(C&&L<.07&&w>0&&w<1.05){K={f:C,t0:t,du:0,ang:0,hop:0,rot0:p0,held:0};const q=ae[P0].root+12;[0,7,12].forEach((k,I)=>u0.note(q+k,{dur:.7,vel:.14,wave:"sine",at:I*.09,pan:-.2}))}}if(f0+=(Wt-f0)*Math.min(1,e*(Wt<f0?1.6:.9)),!P.down||P.mode!==1){const n=Bt*(xt?Math.pow(f0,1.5)*(.8+.4*tt):f0);Z0+=(n-Z0)*Math.min(1,e*(mt?1.2:.35)),p0+=Z0*e}if(We-=Bt*.8*e*f0,xt?(tt+=(ot()-.5)*.5*Math.sqrt(e*30),tt=Math.max(0,Math.min(1,tt*.97+.015)),J0+=(.92+.14*tt+(ot()<.012?-.12:0)-J0)*Math.min(1,e*14)):mt?J0=.97+.03*Math.sin(t*1.3):J0=1,Ie=.04*Math.sin(t*.55)+.025*Math.sin(t*1.37+1)+.012*Math.sin(t*3.1),K){const n=t-K.t0;if(n<2.2)K.du=-(p0-K.rot0),K.ang=Math.sin(n*7)*.07*Math.exp(-n*1.8),K.hop=0,K.held=K.du;else{const f=Math.min(1,(n-2.2)/1.6);K.du=K.held*(1-f*f*(3-2*f)),K.ang=0,K.hop=0,f>=1&&(K=null)}}const d=Math.floor(p0*32);let c=0;if(d!==vt){const n=d>vt?1:-1;for(let f=vt+n;f!==d+n&&c<3;f+=n,c++){const y=ae[P0].seq[(f%32+32)%32];if(y>0){const w=.16+.1*Math.min(1,Math.abs(Z0)/Bt/3);u0.note(y,{dur:1.4,vel:w,wave:"sine",pan:-.25}),u0.note(y+24,{dur:.25,vel:w*.25,wave:"sine",pan:-.25}),(f%8+8)%8===0&&u0.note(ae[P0].root-12+((f/8|0)%2?7:0),{dur:1.8,vel:.1,wave:"sine",pan:-.2})}}vt=d}const h=Math.floor(p0*(mt?24:8));if(h!==Fe&&(Fe=h,u0.hit("click",mt?.12:.05,{pan:-.3})),oe-=e,oe<0){if(_0===0){const n=4100+ot()*400;for(let f=0;f<3;f++)u0.note(0,{freq:n,dur:.02,vel:.035,wave:"sine",at:f*.055,pan:.6})}oe=1.2+ot()*2.2}_0===2&&(et-=e,et<0&&(u0.hit("noise",.12,{dur:.6,cutoff:2600,pan:.5}),ot()<.3&&u0.hit("blip",.05,{freq:1800+ot()*1600,pan:.6}),et=.35)),_0===1&&(et-=e,et<0&&(u0.hit("noise",.05+.04*Math.sin(t*.3),{dur:1.2,cutoff:500,pan:.5}),et=.9)),pt&&c&&!(d&7)&&u0.hit("hat",.02),Oe(t)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
