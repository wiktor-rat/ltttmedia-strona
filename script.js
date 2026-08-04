(function () {
  "use strict";

  /* ==========================================================
     Dane usług
     ========================================================== */
  var ICONS = {
    house:
      '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10v10h14V10"></path><path d="M9.5 20v-6h5v6"></path>',
    key:
      '<circle cx="7" cy="15" r="4"></circle><path d="M10 12 20 2"></path><path d="M17 5l2 2"></path><path d="M14 8l2 2"></path>',
    search:
      '<circle cx="10" cy="10" r="6.5"></circle><line x1="20" y1="20" x2="14.6" y2="14.6"></line>',
    apartments:
      '<rect x="4" y="3" width="16" height="18" rx="1"></rect><line x1="8" y1="7" x2="8" y2="7"></line><line x1="12" y1="7" x2="12" y2="7"></line><line x1="16" y1="7" x2="16" y2="7"></line><line x1="8" y1="11.5" x2="8" y2="11.5"></line><line x1="12" y1="11.5" x2="12" y2="11.5"></line><line x1="16" y1="11.5" x2="16" y2="11.5"></line><line x1="8" y1="16" x2="8" y2="16"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line>',
    userPlus:
      '<circle cx="9" cy="8" r="4"></circle><path d="M2 21v-2a6 6 0 0 1 6-6h2a6 6 0 0 1 4 1.6"></path><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line>',
    skyscraper:
      '<rect x="9" y="3" width="10" height="18" rx="1"></rect><rect x="3" y="9" width="6" height="12" rx="1"></rect><line x1="12" y1="7" x2="12" y2="7"></line><line x1="16" y1="7" x2="16" y2="7"></line><line x1="12" y1="11.5" x2="12" y2="11.5"></line><line x1="16" y1="11.5" x2="16" y2="11.5"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line>',
    globe:
      '<circle cx="12" cy="12" r="9"></circle><line x1="3" y1="12" x2="21" y2="12"></line><path d="M12 3c3 3.3 3 14.7 0 18-3-3.3-3-14.7 0-18Z"></path>',
    monitor:
      '<rect x="3" y="4" width="18" height="13" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>'
  };

  var SERVICES = [
    {
      id: 1,
      code: "System 01",
      icon: "house",
      title: "Klienci sprzedający",
      short: "Stały dopływ ofert na wyłączność — bez losowości i zimnych telefonów.",
      tagline: "Stały dopływ ofert na wyłączność — bez losowości i zimnych telefonów.",
      pain: "Agenci polują na oferty ręcznie. Wyniki są nieprzewidywalne — raz jest dobrze, raz cisza.",
      solution: "Budujemy system, który dociera do właścicieli myślących o sprzedaży, zanim zadzwonią do konkurencji — i prowadzi ich do podpisania umowy na wyłączność.",
      scope: [
        "Dedykowany landing page budujący wiarygodność firmy",
        "Kampanie Meta Ads + Google Ads",
        "Kwalifikacja leada i natychmiastowe powiadomienie agenta",
        "Cotygodniowy raport leadów i konwersji"
      ]
    },
    {
      id: 2,
      code: "System 02",
      icon: "key",
      title: "Wynajmujący",
      short: "Właściciele mieszkań na wynajem trafiają prosto do Ciebie — nie do konkurencji.",
      tagline: "Właściciele mieszkań na wynajem trafiają prosto do Ciebie — nie do konkurencji.",
      pain: "Właściciel mieszkania na wynajem szuka najemcy sam albo idzie do pierwszego biura, jakie znajdzie.",
      solution: "System kierujący właścicieli mieszkań do wynajęcia prosto do Twojego biura — z jasnym przekazem: oddaj nam proces, znajdziemy sprawdzonego najemcę.",
      scope: [
        "Landing page z przekazem dopasowanym do wynajmujących",
        "Kampania targetowana na inwestorów i właścicieli drugich mieszkań",
        "Kwalifikacja leada przed przekazaniem do agenta"
      ]
    },
    {
      id: 3,
      code: "System 03",
      icon: "search",
      title: "Klienci kupujący",
      short: "Baza zakwalifikowanych kupujących gotowa na Twoją następną ofertę.",
      tagline: "Baza zakwalifikowanych kupujących gotowa na Twoją następną ofertę.",
      pain: "Masz oferty do sprzedania, ale dotarcie do kupującego jest przypadkowe.",
      solution: "Kampania kierująca na formularz, gdzie klient wpisuje parametry poszukiwanego mieszkania — każde zgłoszenie trafia od razu do bazy z tagami wg preferencji.",
      scope: [
        "Formularz parametrów mieszkania (lokalizacja, metraż, budżet)",
        "Kampania Meta/Google targetowana na aktywnie szukających",
        "Segmentacja bazy pod nowe oferty wchodzące do sprzedaży"
      ]
    },
    {
      id: 4,
      code: "System 04",
      icon: "apartments",
      title: "Zarządzanie najmem",
      short: "Docieramy do inwestorów, którzy chcą oddać zarządzanie najmem.",
      tagline: "Docieramy do inwestorów, którzy chcą oddać zarządzanie najmem.",
      pain: "Właściciele wynajmowanych mieszkań nie mają czasu na najemców, płatności i usterki.",
      solution: "System docierający do właścicieli-inwestorów z jasną ofertą: zdejmij z siebie zarządzanie najmem, przychód zostaje pasywny.",
      scope: [
        "Landing page skierowany do inwestorów i właścicieli wielu mieszkań",
        "Kampania targetowana na profil inwestora",
        "Przekaz oparty na rezultacie: przychód bez zaangażowania"
      ]
    },
    {
      id: 5,
      code: "System 05",
      icon: "userPlus",
      title: "Rekrutacja agentów",
      short: "Kandydaci na agentów trafiają prosto do rozmowy rekrutacyjnej.",
      tagline: "Kandydaci na agentów trafiają prosto do rozmowy rekrutacyjnej.",
      pain: "Rekrutacja przez portale pracy przyciąga niewłaściwych kandydatów albo nie przyciąga nikogo.",
      solution: "System pozyskiwania kandydatów na agentów nieruchomości, prowadzący zainteresowanych prosto do rozmowy z Twoim biurem.",
      scope: [
        "Landing page rekrutacyjny (employer branding biura)",
        "Kampania targetowana na osoby rozważające zmianę pracy",
        "Formularz kwalifikujący kandydatów przed rozmową"
      ]
    },
    {
      id: 6,
      code: "System 06",
      icon: "skyscraper",
      title: "Inwestycje deweloperskie",
      short: "Stały dopływ zainteresowanych kupujących na Twoją inwestycję.",
      tagline: "Stały dopływ zainteresowanych kupujących na Twoją inwestycję.",
      pain: "Ogólne kampanie nie dają wystarczającej liczby kwalifikowanych leadów na konkretną inwestycję.",
      solution: "Dedykowany system promocji inwestycji, z lejkiem dopasowanym do etapu: przedsprzedaż, budowa, gotowe do odbioru.",
      scope: [
        "Landing page dedykowany inwestycji (wizualizacje, plan mieszkań)",
        "Kampania Meta/Google z remarketingiem",
        "Wycena indywidualna dopasowana do skali inwestycji"
      ]
    },
    {
      id: 7,
      code: "System 07",
      icon: "globe",
      title: "Nieruchomości za granicą",
      short: "Docieramy do wąskiej grupy zainteresowanej rynkiem zagranicznym.",
      tagline: "Docieramy do wąskiej grupy zainteresowanej rynkiem zagranicznym.",
      pain: "Grupa docelowa jest specyficzna i trudna do dotarcia standardowymi kanałami reklamowymi.",
      solution: "Dedykowany system targetowany na konkretną grupę zainteresowaną zakupem nieruchomości za granicą.",
      scope: [
        "Zakres ustalany indywidualnie po weryfikacji popytu",
        "Konsultacja wstępna zamiast gotowego pakietu"
      ]
    },
    {
      id: 8,
      code: "System 08",
      icon: "monitor",
      title: "Strony i LP",
      short: "Strona, która sprzedaje — nie tylko wygląda dobrze.",
      tagline: "Strona, która sprzedaje — nie tylko wygląda dobrze.",
      pain: "Obecna strona nie generuje leadów, jest przestarzała albo nie odzwierciedla jakości Twojego biura.",
      solution: "Budujemy stronę lub landing page na własnym kodzie, zaprojektowane pod konwersję.",
      scope: [
        "Projekt i wdrożenie na własnym kodzie",
        "Integracja formularza z systemem obsługi leadów",
        "Abonament utrzymania: nadzór techniczny i drobne poprawki"
      ]
    }
  ];

  var CHECK_SVG =
    '<svg class="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  function iconBadge(name) {
    return (
      '<div class="icon-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONS[name] +
      "</svg></div>"
    );
  }

  function serviceCardHTML(service) {
    return (
      '<a class="card service-card" href="#usluga/' +
      service.id +
      '" data-nav-link data-service="' +
      service.id +
      '">' +
      iconBadge(service.icon) +
      "<h3>" +
      service.title +
      "</h3>" +
      "<p>" +
      service.short +
      "</p>" +
      '<span class="card-link">Dowiedz się więcej →</span>' +
      "</a>"
    );
  }

  function renderServiceGrids() {
    var homeGrid = document.getElementById("home-services-grid");
    var allGrid = document.getElementById("all-services-grid");

    if (homeGrid) {
      homeGrid.innerHTML = SERVICES.slice(0, 4).map(serviceCardHTML).join("");
    }
    if (allGrid) {
      allGrid.innerHTML = SERVICES.map(serviceCardHTML).join("");
    }
  }

  function renderServiceDetail(id) {
    var service = SERVICES.filter(function (s) {
      return s.id === Number(id);
    })[0];

    if (!service) {
      service = SERVICES[0];
    }

    document.getElementById("service-code").textContent = service.code;
    document.getElementById("service-title").textContent = service.title;

    var scopeItems = service.scope
      .map(function (item) {
        return "<li>" + CHECK_SVG + "<span>" + item + "</span></li>";
      })
      .join("");

    var html =
      '<p class="service-tagline">' +
      service.tagline +
      "</p>" +
      '<div class="service-columns">' +
      "<div>" +
      '<div class="service-block">' +
      "<h3>Ból</h3><p>" +
      service.pain +
      "</p>" +
      "</div>" +
      '<div class="service-block">' +
      "<h3>Rozwiązanie</h3><p>" +
      service.solution +
      "</p>" +
      "</div>" +
      "</div>" +
      "<div>" +
      '<div class="service-block">' +
      "<h3>Co wchodzi w skład</h3>" +
      '<ul class="scope-list">' +
      scopeItems +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<button type="button" class="btn btn-primary btn-primary--lg" id="askOfferBtn">Zapytaj o ofertę</button>';

    document.getElementById("service-detail-content").innerHTML = html;

    var askBtn = document.getElementById("askOfferBtn");
    if (askBtn) {
      askBtn.addEventListener("click", function () {
        openModal(service.title);
      });
    }
  }

  /* ==========================================================
     Routing / nawigacja między "stronami"
     ========================================================== */
  var HASH_TO_PAGE = {
    "": "home",
    home: "home",
    "o-nas": "about",
    wyniki: "results",
    uslugi: "services"
  };

  var pages = document.querySelectorAll(".page");
  var navLinks = document.querySelectorAll("[data-nav-link]");

  function showPage(pageKey) {
    pages.forEach(function (page) {
      page.classList.toggle("is-active", page.getAttribute("data-page") === pageKey);
    });

    navLinks.forEach(function (link) {
      var linkPage = link.getAttribute("data-page");
      link.classList.toggle("is-active", !!linkPage && linkPage === pageKey);
    });
  }

  function closeMobileNav() {
    var nav = document.getElementById("mainNav");
    var toggle = document.getElementById("navToggle");
    if (nav && toggle) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  }

  function scrollToId(id, smooth) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  }

  function route() {
    var hash = window.location.hash.replace(/^#/, "");
    closeMobileNav();
    closeModal();

    if (hash === "faq" || hash === "kontakt") {
      showPage("home");
      window.requestAnimationFrame(function () {
        scrollToId(hash, true);
      });
      return;
    }

    if (hash.indexOf("usluga/") === 0) {
      var serviceId = hash.split("/")[1];
      renderServiceDetail(serviceId);
      showPage("service-detail");
      window.scrollTo(0, 0);
      return;
    }

    var pageKey = HASH_TO_PAGE[hash] || "home";
    showPage(pageKey);
    window.scrollTo(0, 0);
  }

  /* ==========================================================
     Mobilne menu
     ========================================================== */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ==========================================================
     FAQ akordeon
     ========================================================== */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      var answer = item.querySelector(".faq-answer");

      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        items.forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("is-open");
          question.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ==========================================================
     Modal "Zapytaj o ofertę"
     ========================================================== */
  var modalOverlay, offerForm, formSuccess, modalFormWrap;

  function openModal(serviceTitle) {
    if (!modalOverlay) return;
    var title = document.getElementById("offerModalTitle");
    if (title) {
      title.textContent = serviceTitle
        ? "Zapytaj o ofertę: " + serviceTitle
        : "Zapytaj o ofertę";
    }
    modalFormWrap.style.display = "block";
    formSuccess.style.display = "none";
    offerForm.reset();
    modalOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function initModal() {
    modalOverlay = document.getElementById("offerModal");
    offerForm = document.getElementById("offerForm");
    formSuccess = document.getElementById("formSuccess");
    modalFormWrap = document.getElementById("modalFormWrap");

    if (!modalOverlay) return;

    document.getElementById("modalClose").addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay.classList.contains("is-open")) {
        closeModal();
      }
    });

    offerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      modalFormWrap.style.display = "none";
      formSuccess.style.display = "block";
    });
  }

  /* ==========================================================
     Wideo case study (YouTube, ładowane dopiero po kliknięciu)
     ========================================================== */
  function initVideoTile() {
    var tile = document.getElementById("videoTile");
    if (!tile) return;

    var videoId = tile.getAttribute("data-youtube-id");
    if (!videoId) return;

    tile.style.backgroundImage =
      "linear-gradient(160deg, rgba(11,24,48,0.65) 0%, rgba(19,35,69,0.75) 100%), url('https://img.youtube.com/vi/" +
      videoId +
      "/hqdefault.jpg')";

    tile.addEventListener("click", function () {
      if (tile.classList.contains("is-playing")) return;

      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&rel=0";
      iframe.title = "Case study LTTT MEDIA — wideo";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      tile.innerHTML = "";
      tile.style.backgroundImage = "none";
      tile.classList.add("is-playing");
      tile.appendChild(iframe);
    });
  }

  /* ==========================================================
     Init
     ========================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    renderServiceGrids();
    initMobileNav();
    initFaq();
    initModal();
    initVideoTile();

    window.addEventListener("hashchange", route);
    route();
  });
})();
