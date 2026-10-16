// Encodes one animated GIF off the main thread. The page sends frames one at a
// time and waits for each to be acknowledged, so at most one frame is queued.
import { GIFEncoder, quantize, applyPalette } from './vendor/gifenc.esm.js';

let gif = null, width = 0, height = 0, delay = 100, count = 0;

self.onmessage = e => {
  const m = e.data;
  if (m.type === 'start') {
    gif = GIFEncoder(); width = m.width; height = m.height; delay = m.delay; count = 0;
  } else if (m.type === 'frame') {
    const rgba = new Uint8Array(m.buffer), palette = quantize(rgba, 256, { format: 'rgb565' });
    gif.writeFrame(applyPalette(rgba, palette, 'rgb565'), width, height, { palette, delay, repeat: 0 });
    self.postMessage({ type: 'encoded', index: count++ });
  } else if (m.type === 'finish') {
    gif.finish();
    const bytes = gif.bytes();
    gif = null;
    self.postMessage({ type: 'done', buffer: bytes.buffer }, [bytes.buffer]);
  }
};
