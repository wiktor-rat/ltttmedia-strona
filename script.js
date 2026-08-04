// ID filmów YouTube (fragment z adresu po "v=" lub "youtu.be/").
// Kolejność celowa (główne wideo na środku — po 3 pozostałe z każdej strony):
// [2] = drugie najważniejsze wideo (po lewej od głównego),
// [3] = główne wideo — wyśrodkowane domyślnie po wejściu na stronę (patrz FEATURED_VIDEO_INDEX),
// [4] = trzecie najważniejsze wideo (po prawej od głównego), reszta rozłożona po obu stronach.
const videoIds = [
  "XNaKz0Yq-ak",
  "cVmIVW5q2AI",
  "Zzghsi8MwtU",
  "9SzxkG5YioY",
  "_yhVZ27_udU",
  "RBxBoc_0NgA",
  "5kpnEq59mkg"
];

// Indeks (0-based) w tablicy videoIds, który ma być wyśrodkowany domyślnie po wejściu na podstronę.
const FEATURED_VIDEO_INDEX = 3;

// Opinie klientów (podstrona Wyniki) — dopisuj kolejne obiekty na końcu tablicy
const reviews = [
  {
    name: "Biuro Nieruchomości RE/MAX Impact",
    company: "Opinia z Google",
    rating: 5,
    date: "7 miesięcy temu",
    text: "Zdecydowanie polecamy współpracę z LTTT Media! To świetnie zorganizowany zespół specjalistów, w pełni skoncentrowany na rozwiązaniach. Pełni energii i pozytywnego nastawienia, co realnie przekłada się na osiągane rezultaty. Skupiają się na celach i potrzebach klientów, wykazując przy tym ogromną cierpliwość i wyrozumiałość — cechy dziś naprawdę rzadko spotykane. Skuteczność oraz wysoka jakość obsługi klienta to ich najmocniejsze strony."
  },
  {
    name: "Gabriela",
    company: "Opinia z Google",
    rating: 5,
    date: "6 miesięcy temu",
    text: "Polecam :) Współpracuję z agencją od kilku miesięcy. Bardzo doceniam ich zaangażowanie w to, by kampania rzeczywiście przynosiła wymierne rezultaty. Szybki kontakt, jasne i uczciwe warunki współpracy, trzymanie ręki na pulsie i stała optymalizacja kampanii, by nie przepalać budżetu, a także regularne dodawanie nowych kreacji — to mocne strony agencji. Polecam współpracę :)"
  },
  {
    name: "Szymon Marczynski",
    company: "Soma Nieruchomości",
    rating: 5,
    date: "4 miesiące temu",
    text: "Jesteśmy bardzo zadowoleni ze współpracy reklamowej. Od pierwszego kontaktu z Nikodemem wszystko przebiegało sprawnie i profesjonalnie. Po rozpoczęciu współpracy opiekę nad projektem przejął Wiktor, który czuwa nad wszystkimi działaniami. Na dalszym etapie współpraca jest również prowadzona przez Dorotę. Całość przebiega bardzo dobrze i jesteśmy zadowoleni z efektów."
  },
  {
    name: "Przemysław Podolak",
    company: "Opinia z Google",
    rating: 5,
    date: "6 miesięcy temu",
    text: "LTTT Media to agencja, która stawia na konkrety i realne efekty, a nie puste obietnice. Wiktor dba o wszystko od A do Z, a kontakt z nim jest bardzo dobry i bezproblemowy. Duży plus za gotowe scenariusze do reklam oraz estetyczne, dopracowane grafiki. Współpraca przebiega sprawnie, wszystko jest jasno tłumaczone i dopasowane do potrzeb klienta. Polecam serdecznie."
  },
  {
    name: "Wiktoria Lakoma",
    company: "Opinia z Google",
    rating: 5,
    date: "miesiąc temu",
    text: "Każdemu kto się zastanawia, nie traćcie czasu tylko podejmujcie współpracę z Wiktorem! Jesteśmy więcej niż zadowoleni, ilość leadów jaką wygenerowali świetna, kontakt na bieżąco również świetny. Odpowiedzi na każde nasze pytanie, czy zmiany błyskawiczne! Polecam, polecam, polecam! :)"
  },
  {
    name: "Artur Buchowicz",
    company: "Opinia z Google",
    rating: 5,
    date: "11 miesięcy temu",
    text: "Długo zastanawiałem się co napisać o współpracy z LTTT MEDIA.. I w sumie wypada napisać samą prawdę! Dzięki współpracy przez 1 miesiąc mam pracy na kilka miesięcy, LTTT Media pozyskało dla mnie ponad 60 leadów od klientów chętnych do współpracy w zakresie sprzedaży swoich nieruchomości. Tym samym wyniki kampanii przerosły moje oczekiwania wielokrotnie, zaskoczyły mnie pozytywnie i ze 100% pewnością polecam Firmę Wiktora Rataja do działań marketingowych w sieci i na portalach internetowych! 6 gwiazdek na 5 możliwych! ;) Polecam!"
  },
  {
    name: "Łukasz Leibasz",
    company: "Opinia z Google",
    rating: 5,
    date: "6 miesięcy temu",
    text: "Zdecydowanie polecam współpracę z LTTT MEDIA. To co cenię sobie najbardziej to zaangażowanie i kreatywne podejście do prowadzonych kampanii reklamowych. Bardzo dobry kontakt i mega profesjonalizm :)"
  },
  {
    name: "Marcin Zawistowski",
    company: "Opinia z Google",
    rating: 5,
    date: "7 miesięcy temu",
    text: "LTTT MEDIA Agencja marketingowa to profesjonalny i kreatywny zespół, który realnie wspiera rozwój biznesu. Współpraca przebiega sprawnie, a efekty są widoczne – kampanie są dobrze dopasowane do grupy docelowej, a komunikacja z klientem bardzo dobra. Z pełnym przekonaniem polecam LTTT MEDIA każdemu, kto szuka rzetelnej agencji marketingowej! 💼🚀"
  },
  {
    name: "Wojciech Kołakowski",
    company: "Opinia z Google",
    rating: 5,
    date: "6 miesięcy temu",
    text: "Gorąco polecam współpracę z LTTT media! Po 2 latach przepalania budżetu z innymi agencjami, dopiero LTTT pokazało jak się powinno robić reklamy w social mediacjach!"
  },
  {
    name: "Prospera Nieruchomości",
    company: "Opinia z Google",
    rating: 5,
    date: "6 miesięcy temu",
    text: "Polecamy serdecznie współpracę! Bardzo rzetelny firma, kontakt zawsze na czas (a nawet przed czasem ;)) Wiktor przesympatyczny i wywiązuje się w 100% z założonych planów."
  },
  {
    name: "Marek Ozimek",
    company: "Opinia z Google",
    rating: 5,
    date: "4 miesiące temu",
    text: "Polecam. Świetna agencja. Dobra skuteczność!"
  },
  {
    name: "Aron Półtorak",
    company: "Opinia z Google",
    rating: 5,
    date: "6 miesięcy temu",
    text: "Polecam! Profesjonalna obsługa, skuteczne działanie. Dokładnie tego oczekiwałem i w LTTT to dostałem."
  },
  {
    name: "Biuro WRO",
    company: "Opinia z Google",
    rating: 5,
    date: "7 miesięcy temu",
    text: "Fantastyczny zespół ludzi. Zaangażowanie, które realnie przynosi rezultaty, oraz pełen profesjonalizm na każdym etapie współpracy. Fenomenalny kontakt — szybkie odpowiedzi na pytania i natychmiastowe rozwiązywanie problemów. Do tego indywidualne podejście do klienta. Gorąco polecam!"
  },
  {
    name: "Anna B",
    company: "Opinia z Google",
    rating: 5,
    date: "9 miesięcy temu",
    text: "Polecam z całego serca firmę LTTT Media! Dzięki nim udało mi się rozpocząć prowadzenie biura nieruchomości bez jakiejkolwiek bazy klientów. Wpada dużo leadów, które zamieniam w umowy na wyłączność. Jestem bardzo zadowolona. Ponadto pomagają mi na każdym kroku rozwijać mój biznes, aby cały czas iść do przodu. Polecam firmę każdemu."
  }
  // 14 opinii — komplet
];

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
      '<rect x="3" y="4" width="18" height="13" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
    paintRoller:
      '<rect x="2" y="3" width="14" height="6" rx="1"></rect><line x1="9" y1="9" x2="9" y2="13"></line><path d="M9 13h7a3 3 0 0 1 3 3v4"></path>',
    searchTarget:
      '<circle cx="10" cy="10" r="6.5"></circle><circle cx="10" cy="10" r="2.5"></circle><line x1="20" y1="20" x2="14.6" y2="14.6"></line>'
  };

  var SERVICES = [
    {
      id: 1,
      code: "System 01",
      icon: "house",
      title: "Klienci sprzedający",
      short: "Stały dopływ ofert na wyłączność — bez losowości i zimnych telefonów.",
      tagline: "Stały dopływ ofert na wyłączność — bez losowości i zimnych telefonów.",
      jakDziala: [
        "Wykorzystujemy kampanie w Meta Ads i Google Ads do generowania leadów. Ruch z kampanii Meta kierujemy na dedykowany landing page, który buduje wiarygodność firmy — dzięki temu klient sprzedający może w pełni zapoznać się z ofertą biura i zostawić kontakt lub zadzwonić bezpośrednio.",
        "Gdy klient zostawia dane, trafiają one od razu do automatyzacji: klient otrzymuje SMS potwierdzający, Twój zespół dostaje powiadomienie na Slacku, a lead automatycznie uzupełnia się w arkuszu, który pełni rolę CRM.",
        "Kampania Google Ads przechwytuje ruch z wysoką intencją zakupową — najlepiej działa skierowana na główną stronę www klienta lub na stronę dedykowaną klientom sprzedającym."
      ],
      coRobimy: [
        "Wdrażamy landing page",
        "Tworzymy kreacje, treści i nagłówki, wdrażamy, zarządzamy i optymalizujemy kampanie w Meta Ads i Google Ads",
        "Wdrażamy automatyzacje SMS i e-mail oraz powiadomienia na Slacku i w CRM",
        "Raportujemy wyniki — raz w tygodniu i na koniec miesiąca",
        "Zapewniamy doradztwo — stały kontakt i wsparcie"
      ]
    },
    {
      id: 2,
      code: "System 02",
      icon: "key",
      title: "Wynajmujący",
      short: "Właściciele mieszkań na wynajem trafiają prosto do Ciebie — nie do konkurencji.",
      tagline: "Właściciele mieszkań na wynajem trafiają prosto do Ciebie — nie do konkurencji.",
      jakDziala: [
        "Tworzymy kampanię w Meta Ads kierowaną na formularz kontaktowy — nie na landing page. Dzięki temu zbieramy zapytania od osób chcących wynająć swoją nieruchomość bez konieczności inwestowania przez klienta w budowę dedykowanej strony.",
        "Kampania na formularz sprawdza się w tym systemie lepiej niż na landing page — dla klienta to niższy koszt startu, a dla właściciela mieszkania mniejsze tarcie przy zostawieniu kontaktu."
      ],
      coRobimy: [
        "Tworzymy kreacje, treści i nagłówki, wdrażamy, zarządzamy i optymalizujemy kampanię w Meta Ads",
        "Wdrażamy automatyzacje SMS i e-mail oraz powiadomienia na Slacku i w CRM",
        "Raportujemy wyniki — raz w tygodniu i na koniec miesiąca",
        "Zapewniamy doradztwo — stały kontakt i wsparcie"
      ]
    },
    {
      id: 3,
      code: "System 03",
      icon: "search",
      title: "Klienci kupujący",
      short: "Baza zakwalifikowanych kupujących gotowa na Twoją następną ofertę.",
      tagline: "Baza zakwalifikowanych kupujących gotowa na Twoją następną ofertę.",
      jakDziala: [
        "Kampania Meta Ads kieruje ruch osób poszukujących mieszkania na dedykowany landing page. Tam klient wypełnia dokładne parametry, które go interesują — lokalizację, metraż, liczbę pokoi, budżet i ewentualny termin zakupu — i wysyła zapytanie.",
        "Po wypełnieniu formularza klient może od razu przejrzeć dostępne oferty biura. Mając go w bazie kupujących, biuro może zaproponować dopasowane oferty przez system wymiany ofert (MLS) albo poszukać nieruchomości indywidualnie.",
        "Skupiamy się wyłącznie na kampanii Meta Ads, która generuje duży ruch i dociera do nowych odbiorców jeszcze nieznających biura."
      ],
      coRobimy: [
        "Budujemy landing page z formularzem parametrów poszukiwanego mieszkania",
        "Prowadzimy i optymalizujemy kampanię Meta Ads pod jakość wypełnień, nie tylko liczbę kliknięć",
        "Wdrażamy automatyzację: każdy formularz trafia na Slacka i do arkusza CRM",
        "Wysyłamy klientowi automatyczne potwierdzenie wysłania zapytania"
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
      title: "Strony Internetowe i Landing Page",
      short: "Strona, która sprzedaje — nie tylko wygląda dobrze.",
      tagline: "Strona, która sprzedaje — nie tylko wygląda dobrze.",
      pain: "Obecna strona nie generuje leadów, jest przestarzała albo nie odzwierciedla jakości Twojego biura.",
      solution: "Budujemy stronę lub landing page na własnym kodzie, zaprojektowane pod konwersję.",
      scope: [
        "Projekt i wdrożenie na własnym kodzie",
        "Integracja formularza z systemem obsługi leadów",
        "Abonament utrzymania: nadzór techniczny i drobne poprawki"
      ]
    },
    {
      id: 9,
      code: "System 09",
      icon: "paintRoller",
      title: "Wykończenia wnętrz",
      short: "Klienci szukający wykończenia mieszkania pod klucz trafiają prosto do Ciebie.",
      tagline: "Klienci szukający wykończenia mieszkania pod klucz trafiają prosto do Ciebie.",
      pain: "Firmy wykończeniowe polegają głównie na poleceniach i przypadkowych zapytaniach — trudno o stały, przewidywalny napływ zleceń.",
      solution: "System kierujący do Ciebie osoby planujące wykończenie lub remont mieszkania, zanim jeszcze zaczną szukać wykonawcy przez znajomych.",
      scope: [
        "Landing page prezentujący realizacje i zakres usług",
        "Kampania Meta/Google targetowana na świeżych właścicieli mieszkań i osoby planujące remont",
        "Kwalifikacja leada (zakres prac, budżet, termin) przed przekazaniem"
      ]
    },
    {
      id: 10,
      code: "System 10",
      icon: "searchTarget",
      title: "Google Ads",
      short: "Bądź widoczny dokładnie w momencie, gdy klient Cię szuka.",
      tagline: "Bądź widoczny dokładnie w momencie, gdy klient Cię szuka.",
      pain: "Klienci szukający agenta, dewelopera czy wykonawcy w Google trafiają do konkurencji, która jest widoczna wyżej w wynikach.",
      solution: "Kampania w wyszukiwarce Google, która pojawia się dokładnie wtedy, gdy potencjalny klient aktywnie szuka Twoich usług — niezależnie od segmentu, jaki obsługujesz.",
      scope: [
        "Kampania Google Ads dopasowana do słów kluczowych Twojej branży i lokalizacji",
        "Optymalizacja pod jakość i koszt kliknięcia",
        "Raportowanie konwersji"
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

  // "jakDziala"/"coRobimy" to docelowe pola treści. Dla systemów, które mają
  // jeszcze tylko stare pola (pain/solution/scope), budujemy z nich
  // prowizoryczną treść w nowym układzie, do czasu dostarczenia finalnych opisów.
  function getJakDzialaParagraphs(service) {
    if (service.jakDziala) {
      return Array.isArray(service.jakDziala) ? service.jakDziala : [service.jakDziala];
    }
    return [service.pain, service.solution].filter(Boolean);
  }

  function getCoRobimyItems(service) {
    return service.coRobimy || service.scope || [];
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

    var jakDzialaHtml = getJakDzialaParagraphs(service)
      .map(function (paragraph) {
        return "<p>" + paragraph + "</p>";
      })
      .join("");

    var coRobimyHtml = getCoRobimyItems(service)
      .map(function (item) {
        return "<li>" + CHECK_SVG + "<span>" + item + "</span></li>";
      })
      .join("");

    var html =
      '<p class="service-tagline">' +
      service.tagline +
      "</p>" +
      '<div class="service-block">' +
      "<h3>Jak działa system</h3>" +
      jakDzialaHtml +
      "</div>" +
      '<div class="service-block">' +
      "<h3>Co robimy</h3>" +
      '<ul class="scope-list">' +
      coRobimyHtml +
      "</ul>" +
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

    if (pageKey === "results") {
      window.requestAnimationFrame(centerResultsCarousels);
    }
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

    var servicesAskBtn = document.getElementById("servicesAskBtn");
    if (servicesAskBtn) {
      servicesAskBtn.addEventListener("click", function () {
        openModal();
      });
    }
  }

  /* ==========================================================
     Wideo case study (YouTube, ładowane dopiero po kliknięciu)
     ========================================================== */
  function initVideoTiles() {
    var tiles = document.querySelectorAll(".js-video-tile");

    tiles.forEach(function (tile) {
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
    });
  }

  /* ==========================================================
     Karuzele (Wyniki: case studies wideo + opinie)
     ========================================================== */
  var GOOGLE_G_SVG =
    '<svg viewBox="0 0 48 48" aria-hidden="true">' +
    '<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>' +
    '<path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>' +
    '<path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>' +
    '<path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>' +
    "</svg>";

  function initials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .map(function (part) {
        return part[0];
      })
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function renderVideoCarousel() {
    var el = document.getElementById("videoCarousel");
    if (!el) return;

    el.innerHTML = videoIds
      .map(function (id) {
        return (
          '<div class="video-card">' +
          '<iframe src="https://www.youtube-nocookie.com/embed/' +
          id +
          '" title="Case study LTTT MEDIA" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
          "</div>"
        );
      })
      .join("");
  }

  function centerCarouselOnIndex(carouselId, index) {
    var carousel = document.getElementById(carouselId);
    if (!carousel) return;

    var card = carousel.children[index];
    if (!card) return;

    scrollCarouselToCard(carousel, card, false);
  }

  function centerResultsCarousels() {
    centerCarouselOnIndex("videoCarousel", FEATURED_VIDEO_INDEX);
    // Startowa pozycja pośrodku listy opinii, żeby przewijanie w lewo i w prawo
    // odsłaniało z grubsza tyle samo kart w obie strony.
    centerCarouselOnIndex("reviewCarousel", Math.floor(reviews.length / 2));
  }

  function renderReviewCarousel() {
    var el = document.getElementById("reviewCarousel");
    if (!el) return;

    el.innerHTML = reviews
      .map(function (review) {
        var rating = Math.max(0, Math.min(5, review.rating || 0));
        var stars = "★".repeat(rating) + "☆".repeat(5 - rating);
        var isPlaceholder = review.text.indexOf("PLACEHOLDER") === 0;
        var textClass = isPlaceholder ? " review-text--placeholder" : "";

        return (
          '<div class="review-card">' +
          '<div class="review-card-head">' +
          '<div class="review-avatar">' +
          initials(review.name) +
          "</div>" +
          "<div>" +
          '<div class="review-name">' +
          review.name +
          "</div>" +
          '<div class="review-company">' +
          review.company +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="review-google-badge" aria-hidden="true">' +
          GOOGLE_G_SVG +
          "</div>" +
          '<div class="stars" aria-label="Ocena ' +
          rating +
          ' na 5 gwiazdek">' +
          stars +
          "</div>" +
          '<div class="review-date">' +
          review.date +
          "</div>" +
          '<p class="review-text' +
          textClass +
          '">' +
          review.text +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function getCarouselAlignment(carousel) {
    var firstCard = carousel.children[0];
    if (!firstCard) return "start";
    return getComputedStyle(firstCard).scrollSnapAlign || "start";
  }

  function findNearestCardIndex(carousel) {
    var alignment = getCarouselAlignment(carousel);
    var carouselRect = carousel.getBoundingClientRect();
    var reference =
      alignment === "center" ? carouselRect.left + carousel.clientWidth / 2 : carouselRect.left;

    var cards = carousel.children;
    var nearestIndex = 0;
    var nearestDist = Infinity;

    for (var i = 0; i < cards.length; i++) {
      var rect = cards[i].getBoundingClientRect();
      var point = alignment === "center" ? rect.left + rect.width / 2 : rect.left;
      var dist = Math.abs(point - reference);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestIndex = i;
      }
    }

    return nearestIndex;
  }

  function scrollCarouselToCard(carousel, card, smooth) {
    var alignment = getCarouselAlignment(carousel);
    var carouselRect = carousel.getBoundingClientRect();
    var cardRect = card.getBoundingClientRect();
    var cardLeftWithinCarousel = cardRect.left - carouselRect.left + carousel.scrollLeft;

    var target =
      alignment === "center"
        ? cardLeftWithinCarousel + cardRect.width / 2 - carousel.clientWidth / 2
        : cardLeftWithinCarousel;

    target = Math.max(0, Math.min(target, carousel.scrollWidth - carousel.clientWidth));

    if (smooth) {
      carousel.scrollTo({ left: target, behavior: "smooth" });
    } else {
      carousel.scrollLeft = target;
    }
  }

  // Karuzela zapętlona: strzałka za ostatnią/przed pierwszą kartą
  // przeskakuje (bez animacji) na przeciwny koniec. Granice wykrywane
  // po surowej pozycji scrolla (nie po "najbliższej karcie"), bo przy
  // małej liczbie kart bywa jednocześnie widocznych kilka na raz.
  function scrollCarouselByCard(carousel, direction) {
    var cards = carousel.children;
    if (!cards.length) return;

    var epsilon = 2;
    var maxScroll = carousel.scrollWidth - carousel.clientWidth;
    var atStart = carousel.scrollLeft <= epsilon;
    var atEnd = carousel.scrollLeft >= maxScroll - epsilon;

    if (direction === 1 && atEnd) {
      scrollCarouselToCard(carousel, cards[0], false);
      return;
    }
    if (direction === -1 && atStart) {
      scrollCarouselToCard(carousel, cards[cards.length - 1], false);
      return;
    }

    var currentIndex = findNearestCardIndex(carousel);
    var nextIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
    scrollCarouselToCard(carousel, cards[nextIndex], true);
  }

  function initCarouselArrows() {
    var arrows = document.querySelectorAll(".carousel-arrow");
    arrows.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var carousel = document.getElementById(btn.getAttribute("data-carousel-target"));
        if (!carousel) return;

        var direction = btn.classList.contains("carousel-arrow--prev") ? -1 : 1;
        scrollCarouselByCard(carousel, direction);
      });
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
    initVideoTiles();
    renderVideoCarousel();
    renderReviewCarousel();
    initCarouselArrows();

    window.addEventListener("hashchange", route);
    window.addEventListener("resize", function () {
      if (window.location.hash.replace(/^#/, "") === "wyniki") {
        centerResultsCarousels();
      }
    });
    route();
  });
})();
