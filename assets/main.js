// Simple helpers (safe even if not used on every page)
(function(){
  // cookie notice dismiss
  window.acceptCookies = function(){
    localStorage.setItem("lm_cookies_ok","1");
    const el = document.getElementById("cookieBanner");
    if(el) el.style.display = "none";
  };

  window.addEventListener("load", function(){
    const ok = localStorage.getItem("lm_cookies_ok");
    const el = document.getElementById("cookieBanner");
    if(el && ok === "1") el.style.display = "none";
  });
})();
