/* Zgoda na cookies analityczne + Google Analytics 4 (Consent Mode v2).
   Google Analytics ładuje się dopiero po kliknięciu „Akceptuję”. */
(function () {
  var GA_ID = "G-28GQYBY4RZ";
  var KEY = "lttt_cookie_consent";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    window["ga-disable-" + GA_ID] = false;
    gtag("consent", "update", { analytics_storage: "granted" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);
    window.addEventListener("hashchange", function () {
      gtag("event", "page_view", {
        page_location: location.href,
        page_path: location.pathname + location.hash
      });
    });
  }

  function clearGaCookies() {
    var host = location.hostname;
    var domains = [host, "." + host, "." + host.replace(/^www\./, "")];
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name.indexOf("_ga") === 0) {
        domains.forEach(function (d) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + d;
        });
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }
    });
  }

  function deny() {
    window["ga-disable-" + GA_ID] = true;
    gtag("consent", "update", { analytics_storage: "denied" });
    clearGaCookies();
  }

  var banner;
  function hideBanner() { if (banner) { banner.remove(); banner = null; } }

  function showBanner() {
    hideBanner();
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Zgoda na pliki cookies");
    banner.innerHTML =
      '<p>Używamy plików cookies Google Analytics, żeby mierzyć ruch na stronie i ulepszać jej treść. ' +
      'Zgoda jest dobrowolna i możesz ją w każdej chwili zmienić. ' +
      '<a href="/#polityka-prywatnosci">Polityka prywatności</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-primary" data-consent="granted">Akceptuję</button>' +
      '<button type="button" class="btn cookie-reject" data-consent="denied">Odrzucam</button>' +
      "</div>";
    banner.addEventListener("click", function (e) {
      var v = e.target && e.target.getAttribute && e.target.getAttribute("data-consent");
      if (!v) return;
      save(v);
      hideBanner();
      if (v === "granted") loadGA(); else deny();
    });
    document.body.appendChild(banner);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var v = read();
    if (v === "granted") loadGA();
    else if (v !== "denied") showBanner();
    document.addEventListener("click", function (e) {
      var t = e.target && e.target.closest && e.target.closest("[data-cookie-settings]");
      if (t) { e.preventDefault(); showBanner(); }
    });
  });
})();
