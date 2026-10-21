/* Hero oscilloscope — index.html only. */
(function(){
  "use strict";
  var canvas = document.getElementById("scope");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var holder = document.getElementById("scopeHolder");
  var eqText = document.getElementById("eqText");
  var waveName = document.getElementById("waveName");
  var shapeIndex = 0;
  var shapes = ["sine", "square", "triangle", "sawtooth"];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function waveValue(shape, phase){
    var s = Math.sin(2 * Math.PI * phase);
    switch(shape){
      case "sine": return s;
      case "square": return s >= 0 ? 1 : -1;
      case "triangle": return (2/Math.PI) * Math.asin(s);
      case "sawtooth": var f = phase - Math.floor(phase + 0.5); return 2 * f;
      default: return s;
    }
  }
  function updateWaveLabels(){
    var dict = PM.dict();
    waveName.textContent = dict.waves[shapeIndex];
    eqText.textContent = dict.eqs[shapeIndex];
  }
  function cycleShape(){ shapeIndex = (shapeIndex + 1) % shapes.length; updateWaveLabels(); if (reduceMotion) drawFrame(0); }
  holder.addEventListener("click", cycleShape);
  holder.addEventListener("keydown", function(e){ if (e.key === "Enter" || e.key === " "){ e.preventDefault(); cycleShape(); } });

  var canvasCssW = 1200;
  function resizeCanvas(){
    var rect = holder.getBoundingClientRect(); var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr; canvas.height = 260 * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); canvasCssW = rect.width;
  }
  function accentColor(){ return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(); }
  function drawFrame(t){
    var w = canvasCssW, h = 260; ctx.clearRect(0, 0, w, h);
    var cycles = 3, speed = 0.35, color = accentColor();
    ctx.lineWidth = 2.2; ctx.strokeStyle = color; ctx.lineJoin = "round"; ctx.beginPath();
    var steps = 300;
    for (var i = 0; i <= steps; i++){
      var x = (i / steps) * w, phase = (i / steps) * cycles - t * speed, v = waveValue(shapes[shapeIndex], phase);
      var y = h/2 - v * (h * 0.34);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.save(); ctx.globalAlpha = 0.25; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  }
  var start = null;
  function tick(ts){ if (start === null) start = ts; var t = (ts - start) / 1000; drawFrame(t); if (!reduceMotion) requestAnimationFrame(tick); }

  window.addEventListener("resize", function(){ resizeCanvas(); if (reduceMotion) drawFrame(0); });
  PM.onThemeChange(function(){ if (reduceMotion) drawFrame(0); });
  PM.onLangChange(updateWaveLabels);

  resizeCanvas();
  updateWaveLabels();
  if (reduceMotion) drawFrame(0); else requestAnimationFrame(tick);
})();
