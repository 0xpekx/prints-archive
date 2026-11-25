// Encodes one animated GIF off the main thread. The page sends frames one at a time and waits for each to be
// acknowledged. A frame may carry its own delay (ms): a Maquette's 30 a second are 30, 30 and 40 (app.js makeGif)
// One palette for the whole GIF (2026-11-25, the Humwhere launch print): a palette quantized per frame made busy prints
// shimmer, a pixel that didn't change coming out another colour from frame to frame. Frames are held until frame 20 (or
// the end), then one 256-colour palette is quantized from frames 0, 10 and 20 together and every frame is mapped to it,
// written once as the GIF's global table (gifenc: only the first frame carries it). At most 21 frames are held at once.
// Each colour's entry is looked up by its rgb565 bucket and kept for the whole GIF (gifenc's applyPalette keeps it only
// for a frame, from whichever colour of the bucket comes first in it, so a still pixel could still change colour).
import { GIFEncoder, quantize, nearestColorIndex } from './vendor/gifenc.esm.js';

const SAMPLE = [0, 10, 20];
let gif = null, width = 0, height = 0, delay = 100, count = 0, held = [], palette = null, lut = null;

const index = rgba => {
  const out = new Uint8Array(rgba.length >> 2);
  for (let i = 0, j = 0; j < out.length; i += 4, j++) {
    const key = ((rgba[i] << 8) & 0xf800) | ((rgba[i + 1] << 3) & 0x07e0) | (rgba[i + 2] >> 3);
    out[j] = lut[key] >= 0 ? lut[key] : (lut[key] = nearestColorIndex(palette, [rgba[i], rgba[i + 1], rgba[i + 2]]));
  }
  return out;
};
const write = (rgba, d) => gif.writeFrame(index(rgba), width, height, { ...(count++ ? {} : { palette, repeat: 0 }), delay: d });
// the palette from the sampled frames held so far, then every held frame written with it
const flush = () => {
  const parts = SAMPLE.filter(i => i < held.length).map(i => held[i].rgba), all = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  parts.reduce((o, p) => (all.set(p, o), o + p.length), 0);
  palette = quantize(all, 256, { format: 'rgb565' }); lut = new Int16Array(65536).fill(-1);
  for (const f of held) write(f.rgba, f.delay);
  held = [];
};

self.onmessage = e => {
  const m = e.data;
  if (m.type === 'start') {
    gif = GIFEncoder(); width = m.width; height = m.height; delay = m.delay; count = 0; held = []; palette = null; lut = null;
  } else if (m.type === 'frame') {
    const f = { rgba: new Uint8Array(m.buffer), delay: m.delay ?? delay };
    if (palette) write(f.rgba, f.delay);
    else { held.push(f); if (held.length > SAMPLE[SAMPLE.length - 1]) flush(); }
    self.postMessage({ type: 'encoded', index: count + held.length - 1 });
  } else if (m.type === 'finish') {
    if (!palette && held.length) flush();
    gif.finish();
    const bytes = gif.bytes();
    gif = null; palette = null; lut = null;
    self.postMessage({ type: 'done', buffer: bytes.buffer }, [bytes.buffer]);
  }
};
