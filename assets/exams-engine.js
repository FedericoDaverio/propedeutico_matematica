/* Exam engine — one exam-N.html page renders ONE topic exam (TOPIC_INDEX, 0-5). */
(function(){
  "use strict";
  var i = TOPIC_INDEX;
  var tpl = PM.tpl;

  function renderHead(){
    var d = PM.dict();
    var eyebrow = document.getElementById("topicEyebrow");
    var title = document.getElementById("topicTitle");
    if (eyebrow) eyebrow.textContent = d.exam.titlePrefix + " " + (i+1);
    if (title) title.textContent = d.units[i][0];
    document.title = d.exam.titlePrefix + " " + (i+1) + " · PropeMate";
  }

  function build(){
    var d = PM.dict();
    var questions = EXAM_DATA[i];
    var container = document.getElementById("examContainer");
    var qHtml = questions.map(function(q, qi){
      var opts = q[1].map(function(opt, oi){
        return '<label class="exam-opt"><input type="radio" name="examq' + qi + '" value="' + oi + '"><span>' + (oi+1) + ') ' + opt + '</span></label>';
      }).join("");
      return '<div class="exam-q" data-correct="' + q[2] + '"><div class="exam-q-text">' + (qi+1) + '. ' + q[0] + '</div><div class="exam-opts">' + opts + '</div></div>';
    }).join("");
    container.innerHTML =
      '<p class="exam-intro">' + d.exam.intro + '</p>' +
      '<form id="examForm">' +
        '<div class="exam-fields">' +
          '<div class="ctrl-col"><label>' + d.exam.nombre + '</label><input type="text" required data-f="nombre"></div>' +
          '<div class="ctrl-col"><label>' + d.exam.apellido + '</label><input type="text" required data-f="apellido"></div>' +
          '<div class="ctrl-col"><label>' + d.exam.correo + '</label><input type="email" required data-f="correo"></div>' +
        '</div>' +
        '<p class="exam-disclaimer">' + d.exam.disclaimer + '</p>' +
        qHtml +
        '<div class="exam-submit-row"><button class="drill-btn primary" type="submit">' + d.exam.submit + '</button></div>' +
        '<div class="exam-msg" id="examMsg"></div>' +
      '</form>';
    document.getElementById("examForm").addEventListener("submit", function(ev){ ev.preventDefault(); grade(ev.target); });
  }

  function grade(form){
    var d = PM.dict();
    var nombre = form.querySelector('[data-f="nombre"]').value.trim();
    var apellido = form.querySelector('[data-f="apellido"]').value.trim();
    var correo = form.querySelector('[data-f="correo"]').value.trim();
    var qEls = form.querySelectorAll(".exam-q");
    var allAnswered = true;
    var results = [];
    qEls.forEach(function(qEl, qi){
      var correctIdx = parseInt(qEl.getAttribute("data-correct"), 10);
      var checked = qEl.querySelector('input[type=radio]:checked');
      var opts = qEl.querySelectorAll(".exam-opt");
      Array.prototype.forEach.call(opts, function(o){ o.classList.remove("correct","incorrect"); });
      if (!checked){ allAnswered = false; return; }
      var chosen = parseInt(checked.value, 10);
      opts[correctIdx].classList.add("correct");
      if (chosen !== correctIdx) opts[chosen].classList.add("incorrect");
      results.push({ q: qi+1, chosen: chosen+1, correctAns: correctIdx+1, ok: chosen===correctIdx });
    });
    var msg = document.getElementById("examMsg");
    if (!nombre || !apellido || !correo || !allAnswered){
      msg.innerHTML = '<span class="warn">' + d.exam.incomplete + '</span>';
      return;
    }
    var score = results.filter(function(r){ return r.ok; }).length;
    var bodyLines = [
      "Alumno: " + nombre + " " + apellido,
      "Correo: " + correo,
      "Examen: " + d.exam.titlePrefix + " " + (i+1) + " - " + d.units[i][0],
      "Puntaje: " + score + "/" + results.length,
      ""
    ].concat(results.map(function(r){
      return "Pregunta " + r.q + ": " + (r.ok ? "correcta" : ("incorrecta (marco " + r.chosen + ", correcta " + r.correctAns + ")"));
    }));
    var subject = encodeURIComponent("Examen PropeMate - " + d.units[i][0] + " - " + nombre + " " + apellido);
    var body = encodeURIComponent(bodyLines.join("\n"));
    var mailto = "mailto:daveriofederico@gmail.com?subject=" + subject + "&body=" + body;
    msg.innerHTML =
      '<div class="exam-score">' + tpl(d.exam.score, {s:score, t:results.length}) + '</div>' +
      '<a class="mail-link" href="' + mailto + '">' + d.exam.mail + '</a>';
  }

  PM.initNav();
  renderHead();
  build();
  PM.onLangChange(function(){ renderHead(); build(); });
})();
