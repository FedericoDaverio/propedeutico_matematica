/* Shared engine: language/theme state, number helpers, generic i18n apply. */
var PM = (function(){
  var lang = localStorage.getItem("propemate-lang") || "es";
  var langListeners = [];
  var themeListeners = [];

  var SUPER = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
  function sup(s){ return String(s).split("").map(function(c){ return SUPER[c] !== undefined ? SUPER[c] : c; }).join(""); }
  function sciParts(value){
    if (value === 0) return {mantissa:0, exp:0};
    var sign = value < 0 ? -1 : 1, abs = Math.abs(value), exp = Math.floor(Math.log10(abs));
    var mantissa = sign * (abs / Math.pow(10, exp));
    mantissa = Math.round(mantissa * 100) / 100;
    if (Math.abs(mantissa) >= 10){ mantissa = mantissa / 10; exp += 1; }
    return {mantissa:mantissa, exp:exp};
  }
  function formatSci(value){ var p = sciParts(value); return p.mantissa.toFixed(2) + " × 10" + sup(p.exp); }
  var SI_PREFIX = {"-24":"y","-21":"z","-18":"a","-15":"f","-12":"p","-9":"n","-6":"µ","-3":"m","0":"","3":"k","6":"M","9":"G","12":"T","15":"P"};
  function formatEng(value){
    if (value === 0) return {text:"0.00 × 10⁰", prefix:""};
    var sign = value < 0 ? -1 : 1, abs = Math.abs(value), exp = Math.floor(Math.log10(abs));
    var exp3 = Math.floor(exp / 3) * 3, mantissa = sign * (abs / Math.pow(10, exp3));
    mantissa = Math.round(mantissa * 100) / 100;
    if (Math.abs(mantissa) >= 1000){ mantissa = mantissa / 1000; exp3 += 3; }
    var prefix = SI_PREFIX[String(exp3)];
    return { text: mantissa.toFixed(2) + " × 10" + sup(exp3), prefix: prefix === undefined ? "" : prefix };
  }
  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=b; b=a%b; a=t; } return a || 1; }
  function lcm(a,b){ return Math.abs(a*b) / gcd(a,b); }
  function fmt(n, d){ return (Math.round(n * Math.pow(10,d)) / Math.pow(10,d)).toFixed(d); }
  function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function tpl(str, vars){ return str.replace(/\{(\w+)\}/g, function(_,k){ return vars[k] !== undefined ? vars[k] : ""; }); }

  function dict(){ return STR[lang]; }

  function applyI18n(){
    var d = dict();
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      if (d[key] !== undefined) el.innerHTML = d[key];
    });
    var langBtn = document.getElementById("langBtn");
    if (langBtn) langBtn.textContent = lang === "es" ? "EN" : "ES";
  }

  function onLangChange(fn){ langListeners.push(fn); }
  function onThemeChange(fn){ themeListeners.push(fn); }

  function initNav(){
    var langBtn = document.getElementById("langBtn");
    var themeBtn = document.getElementById("themeBtn");
    var savedTheme = localStorage.getItem("propemate-theme");
    if (!savedTheme) savedTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (themeBtn) themeBtn.textContent = savedTheme === "light" ? "☀" : "☾";

    if (themeBtn) themeBtn.addEventListener("click", function(){
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("propemate-theme", next);
      themeBtn.textContent = next === "light" ? "☀" : "☾";
      themeListeners.forEach(function(fn){ fn(next); });
    });
    if (langBtn) langBtn.addEventListener("click", function(){
      lang = lang === "es" ? "en" : "es";
      localStorage.setItem("propemate-lang", lang);
      applyI18n();
      langListeners.forEach(function(fn){ fn(lang); });
    });
    applyI18n();
  }

  return {
    getLang: function(){ return lang; },
    dict: dict, applyI18n: applyI18n, initNav: initNav,
    onLangChange: onLangChange, onThemeChange: onThemeChange,
    sup: sup, sciParts: sciParts, formatSci: formatSci, formatEng: formatEng,
    gcd: gcd, lcm: lcm, fmt: fmt, randInt: randInt, tpl: tpl
  };
})();
