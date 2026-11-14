// before drop06's runtime: keep Drop 01's art library (window.Proto), which the runtime would replace
window.__protoMain = window.Proto;
// (a piece at a time: no runtime of an earlier run for its pieces until this one's post script)
if (window.PrintsRtReal) delete window.PrintsRtReal['drop06'];
