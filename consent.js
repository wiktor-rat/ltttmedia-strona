/* Zgoda na cookies: dwie osobne zgody (Consent Mode v2) + Google Tag Manager.
   - Statystyki: Google Analytics 4 (ładowany bezpośrednio, dopiero po zgodzie)
   - Marketing: tagi reklamowe w GTM (np. Meta Pixel) – w GTM muszą wymagać zgody ad_storage
   Kolejność: consent default = denied → zapisana wcześniej zgoda (update) → GTM.
   GTM ładuje się na każdej stronie, ale tagi w nim respektują stan zgód.
   Po każdej decyzji na banerze do dataLayer trafia zdarzenie „cookie_consent_update”.
   Wybór jest zapisany w localStorage, zmienia się go przyciskiem „Ustawienia cookies”
   w stopce (atrybut data-cookie-settings).
   Zdarzenie Meta na konkretnej stronie (tylko przy Pixelu wpiętym tu, nie w GTM):
   <body data-meta-event="CompleteRegistration">. */
(function () {
  var GA_ID = "G-28GQYBY4RZ";
  // ID Pixela Meta (sam numer). Puste = Pixel wyłączony, a baner nie pyta o zgodę marketingową.
  // Pixel docelowo konfigurowany w GTM, więc tu zostaje pusty.
  var META_PIXEL_ID = "";
  var GTM_ID = "GTM-MW8FG9PM";
  // Baner pyta o zgodę marketingową (tagi reklamowe w GTM).
  var MARKETING_ENABLED = true;
  var WITH_MARKETING = MARKETING_ENABLED || !!META_PIXEL_ID;

  var KEY = "lttt_consent_v3";
  // Starsze zapisy: v2 powstawał, gdy baner nie pytał o marketing, więc bierzemy z niego tylko statystyki.
  var OLD_KEYS = ["lttt_consent_v2", "lttt_cookie_consent"];

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });

  function read() {
    var v = null;
    try { v = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    if (v && typeof v === "object") return v;
    var v2 = null, old = null;
    try { v2 = JSON.parse(localStorage.getItem(OLD_KEYS[0])); } catch (e) {}
    if (v2 && typeof v2.analytics === "boolean") return { analytics: v2.analytics };
    try { old = localStorage.getItem(OLD_KEYS[1]); } catch (e) {}
    if (old === "granted" || old === "denied") return { analytics: old === "granted" };
    return {};
  }
  function save(v) {
    try {
      localStorage.setItem(KEY, JSON.stringify(v));
      OLD_KEYS.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }
  // Czy trzeba zapytać: brak decyzji o statystykach albo o marketingu.
  function needsAsking(v) {
    return typeof v.analytics !== "boolean" || (WITH_MARKETING && typeof v.marketing !== "boolean");
  }

  function clearCookies(prefixes) {
    var host = location.hostname;
    var domains = [host, "." + host, "." + host.replace(/^www\./, "")];
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      var match = prefixes.some(function (p) { return name.indexOf(p) === 0; });
      if (!match) return;
      domains.forEach(function (d) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + d;
      });
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    });
  }

  // ----- Google Analytics -----
  var gaLoaded = false;
  function loadGA() {
    window["ga-disable-" + GA_ID] = false;
    gtag("consent", "update", { analytics_storage: "granted" });
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);
  }
  function denyGA() {
    window["ga-disable-" + GA_ID] = true;
    gtag("consent", "update", { analytics_storage: "denied" });
    clearCookies(["_ga"]);
  }

  // ----- Marketing (Consent Mode dla tagów reklamowych w GTM) + opcjonalny Pixel -----
  var pixelLoaded = false;
  function grantMarketing() {
    gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
    loadPixel();
  }
  function loadPixel() {
    if (!META_PIXEL_ID) return;
    if (pixelLoaded) { window.fbq("consent", "grant"); return; }
    pixelLoaded = true;
    /* Standardowy kod bazowy Meta Pixel */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
    var ev = document.body && document.body.getAttribute("data-meta-event");
    if (ev) window.fbq("track", ev);
  }
  function denyPixel() {
    gtag("consent", "update", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    if (pixelLoaded && window.fbq) window.fbq("consent", "revoke");
    clearCookies(["_fbp", "_fbc"]);
  }

  function apply(v) {
    if (v.analytics === true) loadGA(); else if (v.analytics === false) denyGA();
    if (v.marketing === true) grantMarketing(); else if (v.marketing === false) denyPixel();
  }

  // Zgoda zapisana przy poprzedniej wizycie trafia do dataLayer jeszcze przed GTM,
  // żeby tagi z GTM od razu widziały właściwy stan (skrypt ma „defer”, więc DOM już istnieje).
  var stored = read();
  apply(stored);

  // ----- Google Tag Manager (jeden raz na stronę) -----
  if (GTM_ID && !window.__ltttGtmLoaded && !document.querySelector('script[src*="gtm.js?id=' + GTM_ID + '"]')) {
    window.__ltttGtmLoaded = true;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',GTM_ID);
  }

  // Zdarzenie dla wyzwalaczy w GTM po decyzji na banerze.
  function pushConsentEvent(v) {
    window.dataLayer.push({
      event: "cookie_consent_update",
      consent_analytics: v.analytics ? "granted" : "denied",
      consent_marketing: v.marketing ? "granted" : "denied"
    });
  }

  // Strona główna działa na # (podstrony bez przeładowania): liczymy odsłony przy zmianie #.
  window.addEventListener("hashchange", function () {
    if (gaLoaded && !window["ga-disable-" + GA_ID]) {
      gtag("event", "page_view", { page_location: location.href, page_path: location.pathname + location.hash });
    }
  });

  // ----- Baner -----
  var banner;
  function hideBanner() { if (banner) { banner.remove(); banner = null; } }

  function showBanner(openSettings) {
    hideBanner();
    var v = read();
    var withMarketing = WITH_MARKETING;
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Zgoda na pliki cookies");
    banner.innerHTML =
      "<p>" + (withMarketing
        ? "Używamy plików cookies do statystyk odwiedzin (Google Analytics) i do pomiaru oraz dopasowania reklam (Meta Pixel). "
        : "Używamy plików cookies Google Analytics, żeby mierzyć ruch na stronie i ulepszać jej treść. ") +
      "Zgoda jest dobrowolna i możesz ją w każdej chwili zmienić. " +
      '<a href="/#polityka-prywatnosci">Polityka prywatności</a></p>' +
      '<div class="cookie-settings"' + (openSettings ? "" : " hidden") + ">" +
      '<label class="cookie-option"><input type="checkbox" name="analytics"' + (v.analytics ? " checked" : "") + ">" +
      "<span><strong>Statystyki</strong> Google Analytics: liczba odwiedzin, odwiedzane podstrony.</span></label>" +
      (withMarketing
        ? '<label class="cookie-option"><input type="checkbox" name="marketing"' + (v.marketing ? " checked" : "") + ">" +
          "<span><strong>Marketing</strong> Meta Pixel: pomiar skuteczności reklam na Facebooku i Instagramie oraz dopasowanie reklam do osób, które odwiedziły stronę.</span></label>"
        : "") +
      "</div>" +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-primary" data-consent="all">Akceptuję wszystkie</button>' +
      '<button type="button" class="btn cookie-reject" data-consent="none">Odrzucam</button>' +
      '<button type="button" class="btn cookie-reject" data-consent="' + (openSettings ? "save" : "settings") + '">' +
      (openSettings ? "Zapisz wybór" : "Ustawienia") + "</button>" +
      "</div>";
    banner.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest("[data-consent]");
      if (!btn) return;
      var action = btn.getAttribute("data-consent");
      if (action === "settings") {
        banner.querySelector(".cookie-settings").hidden = false;
        btn.setAttribute("data-consent", "save");
        btn.textContent = "Zapisz wybór";
        var first = banner.querySelector(".cookie-option input");
        if (first) first.focus();
        return;
      }
      var choice;
      if (action === "all") choice = { analytics: true, marketing: withMarketing };
      else if (action === "none") choice = { analytics: false, marketing: false };
      else {
        var a = banner.querySelector('input[name="analytics"]');
        var m = banner.querySelector('input[name="marketing"]');
        choice = { analytics: !!(a && a.checked), marketing: !!(m && m.checked) };
      }
      save(choice);
      hideBanner();
      apply(choice);
      pushConsentEvent(choice);
    });
    document.body.appendChild(banner);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (needsAsking(stored)) showBanner(false);
    document.addEventListener("click", function (e) {
      var t = e.target && e.target.closest && e.target.closest("[data-cookie-settings]");
      if (t) { e.preventDefault(); showBanner(true); }
    });
  });
})();
