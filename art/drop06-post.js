// after drop06's pieces: their runtime is window.ProtoD06 (each piece knows it as def.rt), and Drop 01 gets window.Proto back
window.ProtoD06 = window.Proto;
for (const d of window.ProtoD06.list) d.rt = window.ProtoD06;
window.Proto = window.__protoMain;
delete window.__protoMain;
// (a piece at a time: the pieces that load later find their runtime here)
(window.PrintsRtReal = window.PrintsRtReal || {})['drop06'] = window.ProtoD06;
