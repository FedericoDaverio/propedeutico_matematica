/* Lab + exercise engine — one lab-N.html page renders ONE topic (TOPIC_INDEX, 0-5). */
(function(){
  "use strict";
  var i = TOPIC_INDEX;
  var fmt = PM.fmt, gcd = PM.gcd, lcm = PM.lcm, tpl = PM.tpl, randInt = PM.randInt;
  var LABCANVAS = [];

  /* ---------- page head + lab shell ---------- */
  function renderHead(){
    var d = PM.dict();
    var eyebrow = document.getElementById("topicEyebrow");
    var title = document.getElementById("topicTitle");
    if (eyebrow) eyebrow.textContent = "0" + (i+1) + " — " + d.exam.titlePrefix.split(" ")[0];
    if (title) title.textContent = d.units[i][0];
    document.title = d.units[i][0] + " · PropeMate";
  }

  function labShell(extraHtml){
    return '<div class="lab" id="lab-el">' +
      '<div class="lab-head"><span class="lab-num mono" id="labNum"></span><span class="lab-title" data-lab-title></span></div>' +
      '<p class="lab-blurb" data-lab-blurb></p>' + extraHtml + '</div>';
  }

  function labShellFor(idx){
    switch(idx){
      case 0: return labShell(
        '<div class="preset-row" id="l1-presets"></div>' +
        '<div class="ctrl-row"><div class="ctrl-col"><label data-l="value"></label><input type="number" id="l1-value" value="20000" step="any"></div></div>' +
        '<div class="lab-out" id="l1-out"></div>');
      case 1: return labShell(
        '<div class="ctrl-row">' +
          '<div class="ctrl-col"><label data-l="s1"></label><input type="range" id="l2-s1" min="-20" max="40" step="0.5" value="30"></div>' +
          '<div class="ctrl-col"><label data-l="s2"></label><input type="range" id="l2-s2" min="-20" max="40" step="0.5" value="-4"></div>' +
          '<div class="ctrl-col"><label data-l="s3"></label><input type="range" id="l2-s3" min="-20" max="40" step="0.5" value="24"></div>' +
        '</div><div class="lab-out" id="l2-out"></div>');
      case 2: return labShell(
        '<div class="ctrl-row">' +
          '<div class="ctrl-col"><label data-l="pulseA"></label><select id="l3-a"></select></div>' +
          '<div class="ctrl-col"><label data-l="pulseB"></label><select id="l3-b"></select></div>' +
          '<div class="ctrl-col"><button class="ctrl-btn" id="l3-play" type="button" style="margin-top:18px;"></button></div>' +
        '</div><div class="lab-canvas-holder"><canvas id="l3-canvas" height="110"></canvas></div><div class="lab-out" id="l3-out"></div>');
      case 3: return labShell(
        '<div class="ctrl-row"><div class="ctrl-col" style="min-width:280px;"><label data-l="ratio"></label><input type="range" id="l4-ratio" min="-3" max="3" step="0.02" value="0"></div></div>' +
        '<div class="lab-canvas-holder"><canvas id="l4-canvas" height="170"></canvas></div><div class="lab-out" id="l4-out"></div>');
      case 4: return labShell(
        '<div class="ctrl-row">' +
          '<div class="ctrl-col" style="min-width:260px;"><label data-l="sigA"></label>' +
            '<div class="slider-row"><span class="slider-tag" data-l="amp"></span><input type="range" id="l5-ampA" min="0" max="1" step="0.02" value="0.8"><span class="slider-val" id="l5-ampA-val">0.80</span></div>' +
            '<div class="slider-row"><span class="slider-tag" data-l="phase"></span><input type="range" id="l5-phA" min="0" max="360" step="1" value="0"><span class="slider-val" id="l5-phA-val">0°</span></div>' +
          '</div>' +
          '<div class="ctrl-col" style="min-width:260px;"><label data-l="sigB"></label>' +
            '<div class="slider-row"><span class="slider-tag" data-l="amp"></span><input type="range" id="l5-ampB" min="0" max="1" step="0.02" value="0.6"><span class="slider-val" id="l5-ampB-val">0.60</span></div>' +
            '<div class="slider-row"><span class="slider-tag" data-l="phase"></span><input type="range" id="l5-phB" min="0" max="360" step="1" value="90"><span class="slider-val" id="l5-phB-val">90°</span></div>' +
          '</div>' +
        '</div><div class="lab-canvas-holder"><canvas id="l5-canvas" height="220"></canvas></div><div class="lab-out" id="l5-out"></div>');
      case 5: return labShell(
        '<div class="matrix-eq"><span class="bracket">[</span><span class="matrix-grid">' +
            '<input type="number" id="l6-m11" value="1" step="0.05"><input type="number" id="l6-m12" value="0.3" step="0.05">' +
            '<input type="number" id="l6-m21" value="0.3" step="0.05"><input type="number" id="l6-m22" value="1" step="0.05">' +
          '</span><span class="bracket">]</span></div>' +
        '<div class="ctrl-row">' +
          '<div class="ctrl-col"><label data-l="busL"></label><input type="range" id="l6-b1" min="0" max="1" step="0.02" value="0.9"></div>' +
          '<div class="ctrl-col"><label data-l="busR"></label><input type="range" id="l6-b2" min="0" max="1" step="0.02" value="0.5"></div>' +
        '</div><div class="lab-out" id="l6-out"></div>');
    }
  }

  function applyLabText(){
    var d = PM.dict();
    var l = d.labs[i];
    var shell = document.getElementById("lab-el");
    shell.querySelector("[data-lab-title]").textContent = l.title;
    shell.querySelector("[data-lab-blurb]").textContent = l.blurb;
    document.getElementById("labNum").textContent = "LAB 0" + (i+1);
    shell.querySelectorAll("[data-l]").forEach(function(el){
      var key = el.getAttribute("data-l");
      var map = l;
      if (key === "amp") { el.textContent = l.amp || d.labs[4].amp || (d === STR.es ? "Amplitud" : "Amplitude"); return; }
      if (key === "phase") { el.textContent = (d === STR.es ? "Fase" : "Phase"); return; }
      if (map[key] !== undefined) el.textContent = map[key];
    });
    if (i === 0){
      var presetRow = document.getElementById("l1-presets");
      presetRow.innerHTML = "";
      l.presets.forEach(function(p){
        var b = document.createElement("button");
        b.className = "preset-btn"; b.type = "button"; b.textContent = p[2];
        b.addEventListener("click", function(){ document.getElementById("l1-value").value = p[0]; refreshLab(); });
        presetRow.appendChild(b);
      });
    }
    if (i === 2){
      document.getElementById("l3-play").textContent = l3Playing ? l.pause : l.play;
    }
  }

  /* ---------- per-lab refresh logic ---------- */
  function refreshLab(){
    var d = PM.dict(); var l = d.labs[i];
    if (i === 0){
      var v = parseFloat(document.getElementById("l1-value").value);
      var out = document.getElementById("l1-out");
      if (!isFinite(v)){ out.innerHTML = ""; return; }
      var eng = PM.formatEng(v);
      out.innerHTML = '<div class="line">' + l.std + ': <span class="hi">' + v + '</span></div>' +
        '<div class="line">' + l.sci + ': <span class="hi">' + PM.formatSci(v) + '</span></div>' +
        '<div class="line">' + l.eng + ': <span class="hi">' + eng.text + '</span>' +
        (eng.prefix ? ' &nbsp;(' + l.prefix + ': "' + eng.prefix + '")' : '') + '</div>';
    } else if (i === 1){
      var db1 = parseFloat(document.getElementById("l2-s1").value), db2 = parseFloat(document.getElementById("l2-s2").value), db3 = parseFloat(document.getElementById("l2-s3").value);
      var g1 = Math.pow(10, db1/20), g2 = Math.pow(10, db2/20), g3 = Math.pow(10, db3/20);
      var gTotal = g1*g2*g3, dbTotal = db1+db2+db3;
      document.getElementById("l2-out").innerHTML =
        '<div class="line mono">G = 10^(' + db1 + '/20) · 10^(' + db2 + '/20) · 10^(' + db3 + '/20)</div>' +
        '<div class="line mono">G = ' + fmt(g1,2) + ' · ' + fmt(g2,2) + ' · ' + fmt(g3,2) + '</div>' +
        '<div class="line">' + l.totalLin + ': <span class="hi">' + fmt(gTotal,2) + '×</span></div>' +
        '<div class="line">' + l.totalDb + ': <span class="hi">' + fmt(dbTotal,1) + ' dB</span></div>';
    } else if (i === 2){
      fillL3Selects();
      var a = parseInt(document.getElementById("l3-a").value,10), b = parseInt(document.getElementById("l3-b").value,10);
      document.getElementById("l3-out").innerHTML =
        '<div class="line">' + l.lcm + ': <span class="hi">' + lcm(a,b) + '</span></div>' +
        '<div class="line">' + l.gcd + ': <span class="hi">' + gcd(a,b) + '</span></div>';
      drawL3(l3Playing ? (performance.now()/1000) : null);
    } else if (i === 3){
      var exp = parseFloat(document.getElementById("l4-ratio").value), ratio = Math.pow(10, exp), db = 20 * exp;
      document.getElementById("l4-out").innerHTML =
        '<div class="line">' + l.ratio + ': <span class="hi">' + (ratio<1?ratio.toFixed(4):fmt(ratio,1)) + '</span></div>' +
        '<div class="line mono">dB = 20·log₁₀(' + (ratio<1?ratio.toFixed(4):fmt(ratio,1)) + ')</div>' +
        '<div class="line">' + l.level + ': <span class="hi">' + fmt(db,1) + ' dB</span></div>';
      drawL4();
    } else if (i === 4){
      var aA = parseFloat(document.getElementById("l5-ampA").value), pA = parseFloat(document.getElementById("l5-phA").value);
      var aB = parseFloat(document.getElementById("l5-ampB").value), pB = parseFloat(document.getElementById("l5-phB").value);
      document.getElementById("l5-ampA-val").textContent = aA.toFixed(2);
      document.getElementById("l5-phA-val").textContent = pA.toFixed(0) + "°";
      document.getElementById("l5-ampB-val").textContent = aB.toFixed(2);
      document.getElementById("l5-phB-val").textContent = pB.toFixed(0) + "°";
      var pAr = pA*Math.PI/180, pBr = pB*Math.PI/180;
      var Sx = aA*Math.cos(pAr) + aB*Math.cos(pBr), Sy = aA*Math.sin(pAr) + aB*Math.sin(pBr);
      var R = Math.sqrt(Sx*Sx+Sy*Sy), P = Math.atan2(Sy,Sx) * 180/Math.PI; if (P < 0) P += 360;
      document.getElementById("l5-out").innerHTML =
        '<div class="line">' + l.resultant + ' — ' + l.amp + ': <span class="hi">' + fmt(R,2) + '</span>, ' +
        l.phase + ': <span class="hi">' + fmt(P,1) + '°</span></div>';
      drawL5();
    } else if (i === 5){
      var m11 = parseFloat(document.getElementById("l6-m11").value), m12 = parseFloat(document.getElementById("l6-m12").value);
      var m21 = parseFloat(document.getElementById("l6-m21").value), m22 = parseFloat(document.getElementById("l6-m22").value);
      var b1 = parseFloat(document.getElementById("l6-b1").value), b2 = parseFloat(document.getElementById("l6-b2").value);
      var det = m11*m22 - m12*m21; var out = document.getElementById("l6-out");
      if (Math.abs(det) < 1e-6){ out.innerHTML = '<div class="line warn">' + l.singular + '</div>'; return; }
      var x1 = (b1*m22 - m12*b2) / det, x2 = (m11*b2 - b1*m21) / det;
      out.innerHTML =
        '<div class="line mono">' + l.det + ' = ' + fmt(m11,2) + '·' + fmt(m22,2) + ' − ' + fmt(m12,2) + '·' + fmt(m21,2) + ' = ' + fmt(det,3) + '</div>' +
        '<div class="line">' + l.need + ':</div>' +
        '<div class="line">&nbsp;&nbsp;' + l.ch1 + ' x₁ = <span class="hi">' + fmt(x1,2) + '</span></div>' +
        '<div class="line">&nbsp;&nbsp;' + l.ch2 + ' x₂ = <span class="hi">' + fmt(x2,2) + '</span></div>';
    }
  }

  var l3RAF = null, l3Playing = false, l3Start = null;
  function fillL3Selects(){
    var opts = [2,3,4,6,8,12,16];
    ["l3-a","l3-b"].forEach(function(id, idx){
      var sel = document.getElementById(id);
      if (sel.childElementCount) return;
      opts.forEach(function(o){
        var opt = document.createElement("option"); opt.value = o; opt.textContent = "1/" + o;
        if ((idx === 0 && o === 4) || (idx === 1 && o === 6)) opt.selected = true;
        sel.appendChild(opt);
      });
    });
  }
  function drawL3(t){
    var canvas = document.getElementById("l3-canvas"); var holder = canvas.parentElement;
    var dpr = window.devicePixelRatio || 1; var w = holder.clientWidth;
    canvas.width = w * dpr; canvas.height = 110 * dpr;
    var ctx = canvas.getContext("2d"); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,110);
    var a = parseInt(document.getElementById("l3-a").value,10), b = parseInt(document.getElementById("l3-b").value,10);
    var accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    var accent2 = getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim();
    var dim = getComputedStyle(document.documentElement).getPropertyValue("--text-dim").trim();
    function row(y, n, otherN, color){
      ctx.strokeStyle = dim; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(8,y); ctx.lineTo(w-8,y); ctx.stroke();
      for (var k=0;k<=n;k++){
        var x = 8 + (k/n) * (w-16); var val = k * otherN / n;
        var isCoincidePoint = Math.abs(val - Math.round(val)) < 1e-6;
        ctx.fillStyle = isCoincidePoint ? accent2 : color;
        ctx.beginPath(); ctx.arc(x,y, isCoincidePoint?5:3.5, 0, Math.PI*2); ctx.fill();
      }
    }
    row(34, a, b, accent); row(78, b, a, accent);
    if (t !== null){
      var frac = (t % 1); var x = 8 + frac * (w-16);
      ctx.strokeStyle = accent2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x,10); ctx.lineTo(x,100); ctx.stroke();
    }
  }
  document.addEventListener("input", function(e){ if (i===2 && e.target && (e.target.id === "l3-a" || e.target.id === "l3-b")) refreshLab(); });
  function l3Tick(ts){ if (l3Start === null) l3Start = ts; var t = (ts - l3Start) / 1800; drawL3(t); l3RAF = requestAnimationFrame(l3Tick); }

  function drawL4(){
    var canvas = document.getElementById("l4-canvas"); var holder = canvas.parentElement;
    var dpr = window.devicePixelRatio || 1; var w = holder.clientWidth, h = 170;
    canvas.width = w*dpr; canvas.height = h*dpr;
    var ctx = canvas.getContext("2d"); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
    var accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    var accent2 = getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim();
    var dim = getComputedStyle(document.documentElement).getPropertyValue("--text-dim").trim();
    var pad = 14, minExp=-3, maxExp=3, minDb=-60, maxDb=60;
    function xOf(exp){ return pad + (exp - minExp)/(maxExp-minExp) * (w - 2*pad); }
    function yOf(db){ return h - pad - (db - minDb)/(maxDb-minDb) * (h - 2*pad); }
    ctx.strokeStyle = dim; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, yOf(0)); ctx.lineTo(w-pad, yOf(0)); ctx.stroke();
    ctx.beginPath();
    for (var e = minExp; e <= maxExp; e += 0.05){
      var db = 20 * e, x = xOf(e), y = yOf(db);
      if (e === minExp) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.stroke();
    var exp = parseFloat(document.getElementById("l4-ratio").value), db2 = 20*exp;
    var px = xOf(exp), py = yOf(db2);
    ctx.fillStyle = accent2; ctx.beginPath(); ctx.arc(px,py,5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = accent2; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(px, yOf(0)); ctx.lineTo(px,py); ctx.lineTo(pad,py); ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawL5(){
    var canvas = document.getElementById("l5-canvas"); var holder = canvas.parentElement;
    var dpr = window.devicePixelRatio || 1; var w = holder.clientWidth, h = 220;
    canvas.width = w*dpr; canvas.height = h*dpr;
    var ctx = canvas.getContext("2d"); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
    var cx = w/2, cy = h/2, R = Math.min(w,h)/2 - 16;
    var accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    var accent2 = getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim();
    var dim = getComputedStyle(document.documentElement).getPropertyValue("--text-dim").trim();
    ctx.strokeStyle = dim; ctx.globalAlpha = 0.5; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx-R,cy); ctx.lineTo(cx+R,cy); ctx.moveTo(cx,cy-R); ctx.lineTo(cx,cy+R); ctx.stroke();
    ctx.globalAlpha = 1;
    var aA = parseFloat(document.getElementById("l5-ampA").value), pA = parseFloat(document.getElementById("l5-phA").value) * Math.PI/180;
    var aB = parseFloat(document.getElementById("l5-ampB").value), pB = parseFloat(document.getElementById("l5-phB").value) * Math.PI/180;
    var Ax = aA*Math.cos(pA), Ay = aA*Math.sin(pA), Bx = aB*Math.cos(pB), By = aB*Math.sin(pB), Sx = Ax+Bx, Sy = Ay+By;
    function arrow(x1,y1,x2,y2,color){
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      var ang = Math.atan2(y2-y1, x2-x1);
      ctx.beginPath(); ctx.moveTo(x2,y2);
      ctx.lineTo(x2 - 9*Math.cos(ang-0.4), y2 - 9*Math.sin(ang-0.4));
      ctx.lineTo(x2 - 9*Math.cos(ang+0.4), y2 - 9*Math.sin(ang+0.4));
      ctx.closePath(); ctx.fill();
    }
    arrow(cx,cy, cx+Ax*R, cy-Ay*R, accent); arrow(cx,cy, cx+Bx*R, cy-By*R, accent2);
    ctx.save(); ctx.globalAlpha = 0.9;
    arrow(cx,cy, cx+Sx*R, cy-Sy*R, getComputedStyle(document.documentElement).getPropertyValue("--text").trim());
    ctx.restore();
  }

  function initLabInputs(){
    if (i === 0) document.getElementById("l1-value").addEventListener("input", refreshLab);
    if (i === 1) ["l2-s1","l2-s2","l2-s3"].forEach(function(id){ document.getElementById(id).addEventListener("input", refreshLab); });
    if (i === 2){
      fillL3Selects();
      document.getElementById("l3-play").addEventListener("click", function(){
        l3Playing = !l3Playing; var d = PM.dict().labs[2];
        this.textContent = l3Playing ? d.pause : d.play;
        if (l3Playing){ l3Start = null; l3RAF = requestAnimationFrame(l3Tick); }
        else { if (l3RAF) cancelAnimationFrame(l3RAF); drawL3(null); }
      });
      LABCANVAS.push(function(){ drawL3(l3Playing ? (performance.now()/1000) : null); });
    }
    if (i === 3){
      document.getElementById("l4-ratio").addEventListener("input", refreshLab);
      LABCANVAS.push(drawL4);
    }
    if (i === 4){
      ["l5-ampA","l5-phA","l5-ampB","l5-phB"].forEach(function(id){ document.getElementById(id).addEventListener("input", refreshLab); });
      LABCANVAS.push(drawL5);
    }
    if (i === 5){
      ["l6-m11","l6-m12","l6-m21","l6-m22","l6-b1","l6-b2"].forEach(function(id){ document.getElementById(id).addEventListener("input", refreshLab); });
    }
  }

  /* ================= GENERIC DRILL ENGINE ================= */
  var DRILLS = [];
  function renderDrillShell(el, num){
    el.innerHTML =
      '<div class="drill-head"><span class="drill-num mono">EJ. ' + num + '</span><span class="drill-title" data-dt></span></div>' +
      '<p class="drill-blurb" data-dq></p>' +
      '<div class="drill-fields" data-df></div>' +
      '<div class="drill-choices" data-dc style="display:none;"></div>' +
      '<div class="ctrl-row"><button class="drill-btn primary" data-check type="button"></button><button class="drill-btn" data-next type="button"></button></div>' +
      '<div class="drill-out" data-dout></div>';
  }
  function makeNumericDrill(el, slot, titleIdx, genFn){
    renderDrillShell(el, slot+1);
    var state = {};
    function regen(){ state = genFn(); render(); el.querySelector("[data-dout]").innerHTML = ""; }
    function render(){
      var d = PM.dict(); var lang = PM.getLang();
      el.querySelector("[data-dt]").textContent = d.drills[titleIdx][0];
      el.querySelector("[data-dq]").innerHTML = state.prompt[lang];
      var fieldsEl = el.querySelector("[data-df]"); fieldsEl.innerHTML = "";
      state.fields.forEach(function(f, idx){
        var col = document.createElement("div"); col.className = "ctrl-col";
        col.innerHTML = '<label>' + f.label[lang] + '</label><input type="number" step="any" data-fi="' + idx + '">';
        fieldsEl.appendChild(col);
      });
      el.querySelector("[data-check]").textContent = d.drillUi.check;
      el.querySelector("[data-next]").textContent = d.drillUi.next;
    }
    el.querySelector("[data-check]").addEventListener("click", function(){
      var d = PM.dict(); var lang = PM.getLang(); var ok = true; var answerStrs = [];
      state.fields.forEach(function(f, idx){
        var input = el.querySelector('[data-fi="'+idx+'"]');
        var v = parseFloat(input.value);
        var good = isFinite(v) && Math.abs(v - f.value) <= (f.tol !== undefined ? f.tol : 0.01);
        input.style.borderColor = good ? "var(--good)" : "var(--danger)";
        if (!good) ok = false;
        answerStrs.push(f.label[lang] + " = " + fmt(f.value, f.decimals !== undefined ? f.decimals : 2));
      });
      var out = el.querySelector("[data-dout]");
      out.innerHTML = ok ? ('<span class="hi">' + d.drillUi.correct + '</span>')
                          : ('<span class="warn">' + tpl(d.drillUi.incorrect, {a: answerStrs.join(", ")}) + '</span>');
    });
    el.querySelector("[data-next]").addEventListener("click", regen);
    regen();
    DRILLS.push({ relabel: render });
  }
  function makeChoiceDrill(el, slot, titleIdx, genFn){
    renderDrillShell(el, slot+1);
    el.querySelector("[data-df]").style.display = "none";
    el.querySelector("[data-dc]").style.display = "flex";
    var state = {};
    function regen(){ state = genFn(); render(); el.querySelector("[data-dout]").innerHTML = ""; }
    function render(){
      var d = PM.dict(); var lang = PM.getLang();
      el.querySelector("[data-dt]").textContent = d.drills[titleIdx][0];
      el.querySelector("[data-dq]").innerHTML = state.prompt[lang];
      var ch = el.querySelector("[data-dc]"); ch.innerHTML = "";
      state.options.forEach(function(opt, idx){
        var btn = document.createElement("button");
        btn.className = "choice-btn"; btn.type = "button"; btn.textContent = opt[lang];
        btn.addEventListener("click", function(){
          var d2 = PM.dict();
          Array.prototype.forEach.call(ch.children, function(c){ c.classList.remove("correct","incorrect"); });
          var out = el.querySelector("[data-dout]");
          if (idx === state.correct){ btn.classList.add("correct"); out.innerHTML = '<span class="hi">' + d2.drillUi.correct + '</span>'; }
          else { btn.classList.add("incorrect"); ch.children[state.correct].classList.add("correct");
            out.innerHTML = '<span class="warn">' + tpl(d2.drillUi.incorrect, {a: state.options[state.correct][PM.getLang()]}) + '</span>'; }
        });
        ch.appendChild(btn);
      });
      el.querySelector("[data-check]").style.display = "none";
      el.querySelector("[data-next]").textContent = d.drillUi.next;
    }
    el.querySelector("[data-next]").addEventListener("click", regen);
    regen();
    DRILLS.push({ relabel: render });
  }

  var SCI_CTX = [
    {es:"frecuencia de resonancia", en:"resonant frequency", unit:"Hz"},
    {es:"potencia de salida", en:"output power", unit:"W"},
    {es:"duración de una muestra", en:"sample duration", unit:"s"},
    {es:"impedancia de entrada", en:"input impedance", unit:"Ω"}
  ];
  var CONVERSIONS = [ [1000,"Hz","kHz"], [1000,"W","kW"], [1000,"ms","s"], [100,"cm","m"], [1000,"mV","V"] ];
  var SI_NAMES = {"-9":{es:"nano (n)",en:"nano (n)"}, "-6":{es:"micro (µ)",en:"micro (µ)"}, "-3":{es:"mili (m)",en:"milli (m)"},
    "0":{es:"(sin prefijo)",en:"(no prefix)"}, "3":{es:"kilo (k)",en:"kilo (k)"}, "6":{es:"mega (M)",en:"mega (M)"}, "9":{es:"giga (G)",en:"giga (G)"}};

  function buildDrillsForTopic(){
    var c0 = document.getElementById("drill-0"), c1 = document.getElementById("drill-1"), c2 = document.getElementById("drill-2");
    if (i === 0){
      makeNumericDrill(c0,0,0, function(){
        var ctx = SCI_CTX[randInt(0,SCI_CTX.length-1)];
        var exp0 = randInt(-6,6), mant = (randInt(110,980)/100);
        var v = Math.round(mant*Math.pow(10,exp0)*1e8)/1e8;
        var realExp = PM.sciParts(v).exp;
        return { prompt:{es: tpl(STR.es.drills[0][1], {ctx:ctx.es, v:v, unit:ctx.unit}), en: tpl(STR.en.drills[0][1], {ctx:ctx.en, v:v, unit:ctx.unit})},
          fields:[{label:{es:"Exponente",en:"Exponent"}, value: realExp, tol:0.001, decimals:0}] };
      });
      makeNumericDrill(c1,1,1, function(){
        var s = CONVERSIONS[randInt(0,CONVERSIONS.length-1)]; var v = randInt(2,9999); var r = v / s[0];
        return { prompt:{es: tpl(STR.es.drills[1][1], {v:v, from:s[1], to:s[2]}), en: tpl(STR.en.drills[1][1], {v:v, from:s[1], to:s[2]})},
          fields:[{label:{es:"Resultado",en:"Result"}, value:r, tol: Math.max(0.001, Math.abs(r)*0.01)}] };
      });
      makeChoiceDrill(c2,2,2, function(){
        var exps = [-9,-6,-3,0,3,6,9]; var e = exps[randInt(0,exps.length-1)]; var u = ["F","H","Ω","W"][randInt(0,3)];
        var correctName = SI_NAMES[String(e)];
        var pool = Object.keys(SI_NAMES).filter(function(k){return k!==String(e);});
        var distractors = []; while (distractors.length<3){ var k = pool[randInt(0,pool.length-1)]; if (distractors.indexOf(k)===-1) distractors.push(k); }
        var opts = [correctName].concat(distractors.map(function(k){return SI_NAMES[k];}));
        opts.sort(function(){return Math.random()-0.5;});
        return { prompt:{es: tpl(STR.es.drills[2][1],{e:e,u:u}), en: tpl(STR.en.drills[2][1],{e:e,u:u})}, options: opts, correct: opts.indexOf(correctName) };
      });
    } else if (i === 1){
      makeNumericDrill(c0,0,3, function(){
        var a=randInt(6,9), b=randInt(1,4); if(b>=a) b=a-2;
        var c=randInt(2,5), e=randInt(2,4), k=randInt(1,4), d=e*k;
        var r = (a-b)*c - d/e;
        return { prompt:{es: tpl(STR.es.drills[3][1],{a:a,b:b,c:c,d:d,e:e}), en: tpl(STR.en.drills[3][1],{a:a,b:b,c:c,d:d,e:e})},
          fields:[{label:{es:"Resultado",en:"Result"}, value:r, tol:0.01}] };
      });
      makeChoiceDrill(c1,1,4, function(){
        var correct = {es:"Paréntesis → Potencias y raíces → Multiplicación y división → Suma y resta",
                       en:"Parentheses → Powers and roots → Multiplication and division → Addition and subtraction"};
        var wrong = [
          {es:"Suma y resta → Multiplicación y división → Paréntesis", en:"Addition and subtraction → Multiplication and division → Parentheses"},
          {es:"Corchetes y paréntesis → Suma y resta → Potencias y raíces", en:"Brackets and parentheses → Addition and subtraction → Powers and roots"},
          {es:"Multiplicación y división → Potencias y raíces → Suma y resta", en:"Multiplication and division → Powers and roots → Addition and subtraction"}
        ];
        var opts = [correct].concat(wrong); opts.sort(function(){return Math.random()-0.5;});
        return { prompt:{es: STR.es.drills[4][1], en: STR.en.drills[4][1]}, options: opts, correct: opts.indexOf(correct) };
      });
      makeNumericDrill(c2,2,5, function(){
        var modes = ["pow2","sqrt","pow3","cbrt"]; var mode = modes[randInt(0,3)];
        var b = randInt(2,7); var p={}, ans;
        if (mode==="pow2"){ ans=b*b;
          p.es="La potencia relativa de una señal es proporcional al cuadrado de su amplitud. Si la amplitud es "+b+", ¿cuál es la potencia relativa (amplitud²)?";
          p.en="A signal's relative power is proportional to the square of its amplitude. If the amplitude is "+b+", what is the relative power (amplitude²)?";
        } else if (mode==="sqrt"){ var n=b*b; ans=b;
          p.es="La potencia relativa de una señal es "+n+". ¿Cuál es su amplitud (raíz cuadrada de la potencia)?";
          p.en="A signal's relative power is "+n+". What is its amplitude (square root of the power)?";
        } else if (mode==="pow3"){ ans=b*b*b;
          p.es="Un bloque cúbico de espuma acústica mide "+b+" cm de lado. ¿Cuál es su volumen (cm³)?";
          p.en="A cubic block of acoustic foam measures "+b+" cm on each side. What is its volume (cm³)?";
        } else { var n3=b*b*b; ans=b;
          p.es="El volumen de un bloque cúbico de espuma acústica es "+n3+" cm³. ¿Cuánto mide su lado (cm)?";
          p.en="The volume of a cubic block of acoustic foam is "+n3+" cm³. How long is each side (cm)?";
        }
        return { prompt:{es: tpl(STR.es.drills[5][1],{p:p.es}), en: tpl(STR.en.drills[5][1],{p:p.en})},
          fields:[{label:{es:"Resultado",en:"Result"}, value:ans, tol:0.01}] };
      });
    } else if (i === 2){
      makeNumericDrill(c0,0,6, function(){
        var b=randInt(2,9), d=randInt(2,9); var a=randInt(1,b-1), c=randInt(1,d-1);
        var num = a*d + c*b, den = b*d; var g = gcd(num,den); num/=g; den/=g;
        return { prompt:{es: tpl(STR.es.drills[6][1],{a:a,b:b,c:c,d:d}), en: tpl(STR.en.drills[6][1],{a:a,b:b,c:c,d:d})},
          fields:[{label:{es:"Numerador",en:"Numerator"}, value:num, tol:0.001, decimals:0},
                  {label:{es:"Denominador",en:"Denominator"}, value:den, tol:0.001, decimals:0}] };
      });
      makeNumericDrill(c1,1,7, function(){
        var a=randInt(15,60), b=randInt(15,60);
        return { prompt:{es: tpl(STR.es.drills[7][1],{a:a,b:b}), en: tpl(STR.en.drills[7][1],{a:a,b:b})},
          fields:[{label:{es:"MCM",en:"LCM"}, value: lcm(a,b), tol:0.001, decimals:0}] };
      });
      makeNumericDrill(c2,2,8, function(){
        var a=randInt(10,99), b=randInt(10,99);
        return { prompt:{es: tpl(STR.es.drills[8][1],{a:a,b:b}), en: tpl(STR.en.drills[8][1],{a:a,b:b})},
          fields:[{label:{es:"MCD",en:"GCD"}, value: gcd(a,b), tol:0.001, decimals:0}] };
      });
    } else if (i === 3){
      makeNumericDrill(c0,0,9, function(){
        var m=randInt(-6,6); if(m===0) m=2; var b=randInt(-9,9), x=randInt(-5,5);
        return { prompt:{es: tpl(STR.es.drills[9][1],{m:m,b:b,x:x}), en: tpl(STR.en.drills[9][1],{m:m,b:b,x:x})},
          fields:[{label:{es:"Ganancia g(x)",en:"Gain g(x)"}, value: m*x+b, tol:0.01}] };
      });
      makeNumericDrill(c1,1,10, function(){
        var a=randInt(-5,5); if(a===0) a=2; var b=randInt(-6,6), c=randInt(-4,4), x=randInt(-4,4);
        return { prompt:{es: tpl(STR.es.drills[10][1],{a:a,b:b,c:c,x:x}), en: tpl(STR.en.drills[10][1],{a:a,b:b,c:c,x:x})},
          fields:[{label:{es:"Salida (f∘g)(x)",en:"Output (f∘g)(x)"}, value: a*(x*x+c)+b, tol:0.01}] };
      });
      makeNumericDrill(c2,2,11, function(){
        var m=randInt(-6,6); if(m===0) m=3; var b=randInt(-9,9); var askSlope = Math.random()<0.5;
        var ask = askSlope ? STR.es.drillUi.slope : STR.es.drillUi.intercept;
        var askEn = askSlope ? STR.en.drillUi.slope : STR.en.drillUi.intercept;
        return { prompt:{es: tpl(STR.es.drills[11][1],{m:m,b:b,ask:ask}), en: tpl(STR.en.drills[11][1],{m:m,b:b,ask:askEn})},
          fields:[{label:{es:"Valor",en:"Value"}, value: askSlope?m:b, tol:0.01}] };
      });
    } else if (i === 4){
      makeNumericDrill(c0,0,12, function(){
        var triples=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[7,24,25]]; var t = triples[randInt(0,triples.length-1)];
        var sx = Math.random()<0.5?1:-1, sy = Math.random()<0.5?1:-1;
        var x = sx*t[0], y = sy*t[1], r = t[2], ang = Math.atan2(y,x)*180/Math.PI;
        return { prompt:{es: tpl(STR.es.drills[12][1],{x:x,y:y}), en: tpl(STR.en.drills[12][1],{x:x,y:y})},
          fields:[{label:{es:"Magnitud",en:"Magnitude"}, value:r, tol:0.05},{label:{es:"Fase (°)",en:"Phase (°)"}, value:ang, tol:0.3}] };
      });
      makeNumericDrill(c1,1,13, function(){
        var r = randInt(5,20), t = randInt(0,359), rad=t*Math.PI/180;
        var x = r*Math.cos(rad), y = r*Math.sin(rad);
        return { prompt:{es: tpl(STR.es.drills[13][1],{r:r,t:t}), en: tpl(STR.en.drills[13][1],{r:r,t:t})},
          fields:[{label:{es:"Parte real",en:"Real part"}, value:x, tol:Math.max(0.05,Math.abs(x)*0.01)},{label:{es:"Parte imaginaria",en:"Imaginary part"}, value:y, tol:Math.max(0.05,Math.abs(y)*0.01)}] };
      });
      makeNumericDrill(c2,2,14, function(){
        var x1=randInt(-9,9), y1=randInt(-9,9), x2=randInt(-9,9), y2=randInt(-9,9);
        return { prompt:{es: tpl(STR.es.drills[14][1],{x1:x1,y1:y1,x2:x2,y2:y2}), en: tpl(STR.en.drills[14][1],{x1:x1,y1:y1,x2:x2,y2:y2})},
          fields:[{label:{es:"Parte real",en:"Real part"}, value:x1+x2, tol:0.001, decimals:0},{label:{es:"Parte imaginaria",en:"Imaginary part"}, value:y1+y2, tol:0.001, decimals:0}] };
      });
    } else if (i === 5){
      makeNumericDrill(c0,0,15, function(){
        var a=randInt(2,9), x0=randInt(-9,9), b=randInt(-9,9), c=a*x0+b;
        return { prompt:{es: tpl(STR.es.drills[15][1],{a:a,b:(b>=0?"+":"")+b,c:c}), en: tpl(STR.en.drills[15][1],{a:a,b:(b>=0?"+":"")+b,c:c})},
          fields:[{label:{es:"Nivel de entrada x",en:"Input level x"}, value:x0, tol:0.001, decimals:0}] };
      });
      makeNumericDrill(c1,1,16, function(){
        var x0=randInt(-6,6), y0=randInt(-6,6); var a1,b1,a2,b2,det;
        do { a1=randInt(-5,5); b1=randInt(-5,5); a2=randInt(-5,5); b2=randInt(-5,5); det=a1*b2-b1*a2; } while (det===0 || (a1===0 && b1===0));
        var c1v=a1*x0+b1*y0, c2v=a2*x0+b2*y0;
        return { prompt:{es: tpl(STR.es.drills[16][1],{a1:a1,b1:(b1>=0?"+":"")+b1,c1:c1v,a2:a2,b2:(b2>=0?"+":"")+b2,c2:c2v}),
                         en: tpl(STR.en.drills[16][1],{a1:a1,b1:(b1>=0?"+":"")+b1,c1:c1v,a2:a2,b2:(b2>=0?"+":"")+b2,c2:c2v})},
          fields:[{label:{es:"x (canal 1)",en:"x (channel 1)"}, value:x0, tol:0.01},{label:{es:"y (canal 2)",en:"y (channel 2)"}, value:y0, tol:0.01}] };
      });
      makeNumericDrill(c2,2,17, function(){
        var a=randInt(-9,9), b=randInt(-9,9), c=randInt(-9,9), d=randInt(-9,9);
        return { prompt:{es: tpl(STR.es.drills[17][1],{a:a,b:b,c:c,d:d}), en: tpl(STR.en.drills[17][1],{a:a,b:b,c:c,d:d})},
          fields:[{label:{es:"Determinante",en:"Determinant"}, value:a*d-b*c, tol:0.001, decimals:0}] };
      });
    }
  }

  /* ---------- boot ---------- */
  PM.initNav();
  renderHead();
  document.getElementById("labContainer").innerHTML = labShellFor(i);
  applyLabText();
  initLabInputs();
  refreshLab();
  buildDrillsForTopic();

  PM.onLangChange(function(){
    renderHead();
    applyLabText();
    refreshLab();
    DRILLS.forEach(function(dr){ dr.relabel(); });
  });
  PM.onThemeChange(function(){
    refreshLab();
    LABCANVAS.forEach(function(fn){ fn(); });
  });
  window.addEventListener("resize", function(){ LABCANVAS.forEach(function(fn){ fn(); }); });
})();
