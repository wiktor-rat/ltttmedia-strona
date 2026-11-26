// Generuje stronę zapisu na webinar: /webinar-domknij-2026/ oraz stronę po zapisie /webinar-domknij-2026/dziekujemy/
// Uruchom: node scripts/build-webinar-page.js
// Treści edytuj w stałych na górze pliku. NIE edytuj ręcznie wygenerowanych plików index.html.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const SITE = "https://ltttmedia.pl";
const SLUG = "webinar-domknij-2026";
const URL_PAGE = `${SITE}/${SLUG}/`;
const URL_THANKS = `${URL_PAGE}dziekujemy/`;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ===== USTAWIENIA DO UZUPEŁNIENIA =====
// ID formularza z CRM (GoHighLevel): wklej ID z kodu osadzenia (…/widget/form/<ID>). Puste = strona pokaże telefon zamiast formularza.
const WEBINAR_FORM_ID = "FKaCnZv9rd6orNCFerGI";
// Link do transmisji na YouTube (niepubliczny). Używany tylko na stronie "dziękujemy", jeśli podany.
const LIVE_URL = "";

// ===== TREŚĆ =====
const EVENT_ISO_START = "20261203T180000Z"; // czwartek 3.12.2026, 19:00 czasu polskiego (CET = UTC+1)
const EVENT_ISO_END = "20261203T190000Z";
const EVENT_DATE_LABEL = "czwartek 3.12.2026, godz. 19:00";
const TITLE_PAGE = "Domknij 2026 w 4 krokach: jak wrócić do bazy zapytań i zamienić ją w rezerwacje";
const TITLE = "Webinar dla deweloperów: Domknij 2026 w 4 krokach | LTTT MEDIA";
const DESC = "Bezpłatny webinar na żywo dla deweloperów mieszkaniowych, 3.12.2026 o 19:00. 4 kroki, jak wrócić do bazy zapytań i zamienić ją w rezerwacje przed końcem roku.";
// Pytanie w hero (pod datą). HERO_Q_ACCENT = końcówka wyróżniona kolorem.
const HERO_Q = "Jak domknąć otwarte leady w CRM";
const HERO_Q_ACCENT = "przed końcem 2026?";
const LEAD = "Bezpłatny webinar na żywo dla deweloperów z własnym działem sprzedaży. Dostaniesz plan na ostatnie tygodnie roku: jak przejrzeć zapytania z ostatnich miesięcy, do kogo zadzwonić w pierwszej kolejności i jak sprawdzić, które działania faktycznie kończą się rezerwacją.";

// Sekcja „O wydarzeniu”: akapity przed listą, punkty listy, akapity po liście
const ABOUT_INTRO = [
  "Koniec roku to ostatni moment, żeby poprawić wynik sprzedaży inwestycji w 2026. Większość deweloperów szuka go w nowych reklamach. Tymczasem w bazie zapytań z ostatnich miesięcy leżą osoby, które już pytały o mieszkanie, a nikt do nich nie wrócił albo wrócił za późno.",
  "Wiktor Rataj pokaże w czterech krokach, jak wrócić do tej bazy i zamienić ją w rezerwacje przed końcem roku. Powie między innymi o tym:",
];
const ABOUT_POINTS = [
  "jak w ciągu jednego-dwóch dni zebrać zapytania z ostatnich 6 miesięcy w jednym miejscu i zobaczyć, do ilu z nich nikt nie wrócił,",
  "jak podzielić je na gorące, ciepłe i zimne i od kogo zacząć,",
  "z jakim powodem wrócić do osoby, która już pytała (telefon, SMS, e-mail), żeby wiadomość nie wyglądała na masową,",
  "jak domknąć spotkania i rezerwacje oraz mierzyć, które źródło zapytań naprawdę sprzedało.",
];
const ABOUT_OUTRO = [
  "Na końcu kilka minut o tym, jak LTTT MEDIA może pomóc, jeśli będziesz chciał, oraz czas na pytania na czacie.",
  "Webinar jest dla dyrektorów sprzedaży i marketingu oraz zarządów deweloperów, którzy chcą wykorzystać ostatnią szansę w tym roku na domknięcie sprzedaży z zapytań, które już mają w bazie.",
];

// FAQ (te same teksty trafiają do JSON-LD FAQPage)
const FAQ = [
  ["Czy to będzie godzina sprzedaży Waszej agencji?", "Nie. Ok. 45 minut to konkrety, które możesz wdrożyć sam, bez nas. Na końcu jest kilka minut o tym, jak możemy pomóc, bez żadnych zobowiązań."],
  ["Gdzie odbędzie się webinar?", "Na żywo na YouTube. Link dostaniesz w e-mailu po zapisie i w przypomnieniach, nie musisz niczego instalować ani się logować."],
  ["Czy podczas webinaru będzie można zadać pytanie?", "Tak, na czacie w trakcie transmisji. Na końcu odpowiem na pytania. Jeśli chcesz zapytać o coś wcześniej, napisz na kontakt@ltttmedia.pl lub zadzwoń: +48 511 205 230."],
  ["Na co mogę liczyć po webinarze?", "Pokażę, jak wdrożyć każdy z czterech kroków. Po webinarze napisz na kontakt@ltttmedia.pl, a wyślę Ci checklistę w PDF i wzory wiadomości."],
  ["Czy mogę zaprosić dyrektora sprzedaży lub handlowców?", "Tak, webinar jest bezpłatny. Każdy powinien zapisać się własnym adresem e-mail, żeby dostać link i przypomnienia."],
];

// Sekcja prowadzącego
const HOST_NAME = "Wiktor Rataj";
const HOST_ROLE = "Founder & Owner LTTT MEDIA";
const HOST_BIO = [
  "Przedsiębiorca i założyciel LTTT MEDIA – agencji marketingowej specjalizującej się w sektorze nieruchomości, która obsłużyła ponad 200 firm z branży. Specjalizuje się w tworzeniu strategii marketingowych oraz systemów pozyskiwania klientów wspierających sprzedaż nieruchomości.",
  "Realizowane przez jego agencję kampanie pozwoliły m.in. pozyskać kupującego na nieruchomość o wartości 1,29 mln zł w ciągu 7 dni, przy wydatkach na reklamę wynoszących zaledwie 455 zł.",
  "W swojej pracy koncentruje się na całym procesie pozyskiwania klienta – od analizy grupy docelowej i komunikacji oferty, przez realizację kampanii reklamowych i kwalifikację kontaktów, aż po przekazanie potencjalnego nabywcy do działu sprzedaży.",
  "Pomaga firmom z sektora nieruchomości rozwiązywać problemy związane z wysokimi kosztami pozyskania klientów, niską jakością zapytań oraz brakiem przewidywalności w pozyskiwaniu potencjalnych nabywców.",
];
const HOST_PHOTO = "/img/wiktor-rataj"; // .webp + .jpg, 900x1125

const ICONS = {
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h4"/>',
  message: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

const FORM_URL = `https://api.leadconnectorhq.com/widget/form/${WEBINAR_FORM_ID}`;
const FORM_NAME = "Webinar 3.12 g. 19;00"; // nazwa formularza z kodu osadzenia w CRM
const FORM_HEIGHT = 604; // wysokość z kodu osadzenia (data-height)
const formBlock = () => WEBINAR_FORM_ID
  ? `<div class="lp-crm-form" style="min-height:${FORM_HEIGHT}px">
          <iframe
            src="${FORM_URL}"
            style="width:100%;height:100%;min-height:${FORM_HEIGHT}px;border:none;border-radius:8px"
            id="inline-${WEBINAR_FORM_ID}"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="${esc(FORM_NAME)}"
            data-height="${FORM_HEIGHT}"
            data-layout-iframe-id="inline-${WEBINAR_FORM_ID}"
            data-form-id="${WEBINAR_FORM_ID}"
            data-cookie-consent="true"
            data-cookie-consent-provider="auto"
            title="Formularz zapisu na webinar"></iframe>
        </div>`
  : `<p class="lp-form-note"><strong>Formularz zostanie uruchomiony wkrótce.</strong> Zapisz się telefonicznie: <a href="tel:+48511205230">+48 511 205 230</a> albo e-mailem: <a href="mailto:kontakt@ltttmedia.pl">kontakt@ltttmedia.pl</a>.</p>`;

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      name: TITLE_PAGE,
      description: DESC,
      startDate: "2026-12-03T19:00:00+01:00",
      endDate: "2026-12-03T20:00:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: { "@type": "VirtualLocation", url: URL_PAGE },
      isAccessibleForFree: true,
      inLanguage: "pl",
      organizer: { "@type": "Organization", name: "LTTT MEDIA", url: SITE + "/" },
      performer: { "@type": "Person", name: HOST_NAME, jobTitle: HOST_ROLE, image: SITE + HOST_PHOTO + ".jpg" },
      url: URL_PAGE,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
};

const head = (title, desc, canonical, robots, extra) => `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pl_PL">
<meta property="og:site_name" content="LTTT MEDIA">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#0B1830">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<script src="/consent.js" defer></script>
${extra || ""}
</head>`;

const header = (cta) => `<a class="skip-link" href="#main">Przejdź do treści</a>
<div class="top-banner">Bezpłatny webinar na żywo · ${esc(EVENT_DATE_LABEL)}</div>
<header class="site-header lp-header">
  <div class="container">
    <a href="#" class="logo" aria-label="LTTT MEDIA">
      <span class="logo-main">LTTT MEDIA</span>
      <span class="logo-sub">LEAD TO THE TOP</span>
    </a>
    <div class="lp-header-actions">${cta}</div>
  </div>
</header>`;

const footer = `<footer class="site-footer">
  <div class="container">
    <span>© 2026 LTTT MEDIA | Lead To The Top Media Sp.&nbsp;z&nbsp;o.o.</span>
    <a href="/#polityka-prywatnosci" class="footer-link">Polityka prywatności</a>
    <button type="button" class="footer-link" data-cookie-settings>Ustawienia cookies</button>
  </div>
</footer>`;

const page = `${head(TITLE, DESC, URL_PAGE, "index, follow, max-image-preview:large", `<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(ld)}</script>`)}
<body>
${header(`<a href="#zapis" class="btn btn-primary">Zapisz się →</a>`)}
<main id="main">
  <section class="section--navy subhero lp-hero">
    <div class="container lp-hero-grid">
      <div class="lp-hero-text">
        <span class="eyebrow eyebrow--light">Bezpłatny webinar na żywo dla deweloperów z 80+ lokali</span>
        <h1>${esc(TITLE_PAGE)}</h1>
        <p class="lp-hero-lead">${esc(LEAD)}</p>
        <p class="lp-hero-price">${esc(EVENT_DATE_LABEL)} · bezpłatnie</p>
        <p class="wb-hero-q">${esc(HERO_Q)} <span>${esc(HERO_Q_ACCENT)}</span></p>
      </div>
      <div class="lp-form-card" id="zapis">
        <h2 class="lp-form-title">Zapisz się na webinar</h2>
        ${formBlock()}
        <p class="lp-form-note">Zapis jest bezpłatny. Dostaniesz potwierdzenie e-mailem i SMS-em oraz link do transmisji. Webinar trwa ok. 45 minut plus pytania.</p>
      </div>
    </div>
  </section>

  <section class="section section--bg" id="o-wydarzeniu">
    <div class="container wb-about">
      <div class="wb-about-head">
        <div class="section-head section-head--left"><h2>O wydarzeniu</h2></div>
        <p class="wb-about-lead">${esc(ABOUT_INTRO[0])}</p>
      </div>
      <div class="wb-about-body">
        <p class="wb-about-intro">${esc(ABOUT_INTRO[1])}</p>
        <ol class="lp-list wb-about-list">${ABOUT_POINTS.map((t, i) => `
          <li><span class="wb-about-num" aria-hidden="true">${i + 1}</span><span>${esc(t).replace(/e-mail/g, "e&#8209;mail")}</span></li>`).join("")}
        </ol>
        <p class="wb-about-note">${icon("message")}<span>${esc(ABOUT_OUTRO[0])}</span></p>
        <p class="wb-about-callout">${esc(ABOUT_OUTRO[1])}</p>
      </div>
    </div>
  </section>

  <section class="section section--white" id="prowadzacy">
    <div class="container wb-host">
      <figure class="wb-host-photo">
        <picture>
          <source srcset="${HOST_PHOTO}.webp" type="image/webp">
          <img src="${HOST_PHOTO}.jpg" width="900" height="1125" loading="lazy" decoding="async" alt="${esc(HOST_NAME)} podczas wystąpienia z mikrofonem">
        </picture>
        <figcaption class="wb-host-badge"><span class="wb-host-dot" aria-hidden="true"></span>Prowadzący webinar</figcaption>
      </figure>
      <div class="wb-host-text">
        <span class="eyebrow">Prowadzący</span>
        <h2>${esc(HOST_NAME)}</h2>
        <p class="wb-host-role">${esc(HOST_ROLE)}</p>
        ${HOST_BIO.map((t) => `<p>${esc(t)}</p>`).join("\n        ")}
      </div>
    </div>
  </section>

  <section class="section section--bg" id="faq">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">FAQ</span><h2>Najczęstsze pytania</h2></div>
      <div class="lp-faq">${FAQ.map(([q, a]) => `<details class="lp-faq-item"><summary><h3>${esc(q)}</h3></summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>

  <section class="section section--navy">
    <div class="container lp-narrow" style="text-align:center">
      <h2>Zarezerwuj miejsce na ${esc(EVENT_DATE_LABEL)}</h2>
      <p class="lp-hero-lead" style="margin:16px auto 24px">Zapis trwa mniej niż minutę.</p>
      <a class="btn btn-primary btn-primary--lg" href="#zapis">Zapisz się na webinar</a>
    </div>
  </section>
</main>
${footer}
${WEBINAR_FORM_ID ? '<script src="https://link.msgsndr.com/js/form_embed.js"></script>' : ""}
</body>
</html>
`;

const CAL_DETAILS = "Bezpłatny webinar na żywo LTTT MEDIA. Link do transmisji dostaniesz e-mailem i SMS-em.";
const calUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Webinar: " + TITLE_PAGE) +
  "&dates=" + EVENT_ISO_START + "/" + EVENT_ISO_END + "&details=" + encodeURIComponent(CAL_DETAILS) + "&ctz=Europe/Warsaw";
// Plik .ics dla Outlooka i kalendarza Apple
const icsEsc = (t) => String(t).replace(/\\/g, "\\\\").replace(/[,;]/g, (m) => "\\" + m);
// Zawijanie linii do 75 bajtów (RFC 5545)
const icsFold = (line) => {
  const out = []; let cur = ""; let len = 0;
  for (const ch of line) {
    const b = Buffer.byteLength(ch);
    if (len + b > (out.length ? 74 : 75)) { out.push(cur); cur = ""; len = 0; }
    cur += ch; len += b;
  }
  out.push(cur);
  return out.join("\r\n ");
};
const ICS = [
  "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//LTTT MEDIA//Webinar//PL", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
  "BEGIN:VEVENT",
  `UID:${SLUG}@ltttmedia.pl`, "DTSTAMP:20261124T000000Z",
  `DTSTART:${EVENT_ISO_START}`, `DTEND:${EVENT_ISO_END}`,
  `SUMMARY:${icsEsc("Webinar: " + TITLE_PAGE)}`,
  `DESCRIPTION:${icsEsc(CAL_DETAILS)}`,
  `URL:${URL_PAGE}`,
  "BEGIN:VALARM", "TRIGGER:-PT30M", "ACTION:DISPLAY", "DESCRIPTION:Webinar LTTT MEDIA za 30 minut", "END:VALARM",
  "END:VEVENT", "END:VCALENDAR", "",
].map(icsFold).join("\r\n");

// Kroki po zapisie: [ikona, kiedy, tytuł, opis]
const NEXT = [
  ["message", "Teraz", "Sprawdź e-mail i SMS", "W ciągu kilku minut dostaniesz potwierdzenie zapisu. Jeśli e-maila nie ma, zajrzyj do folderu spam lub „Oferty”."],
  ["bell", "Przed webinarem", "Przypomnienia z linkiem", "Wyślemy przypomnienia z linkiem do transmisji, także w dniu webinaru. Wystarczy kliknąć o 19:00."],
  ["file", "Po webinarze", "Checklista i wzory wiadomości", "Po webinarze napisz na kontakt@ltttmedia.pl, a wyślę Ci checklistę w PDF i wzory wiadomości."],
];

const thanks = `${head("Dziękujemy za zapis na webinar | LTTT MEDIA", "Dziękujemy za zapis na webinar LTTT MEDIA.", URL_THANKS, "noindex, nofollow", "")}
<body data-meta-event="CompleteRegistration">
${header("")}
<main id="main">
  <section class="section--navy ty-hero">
    <div class="container ty-hero-inner">
      <span class="ty-check" aria-hidden="true">${icon("check")}</span>
      <span class="eyebrow eyebrow--light">Zapis potwierdzony</span>
      <h1>Dziękujemy, jesteś zapisany na webinar</h1>
      <p class="ty-share">Prześlij link do webinaru dyrektorowi sprzedaży lub marketingu w swojej firmie, bo najwięcej zyskacie, gdy na transmisji będą osoby decyzyjne i handlowcy.</p>
      <p class="ty-lead">Zarezerwuj ten termin w kalendarzu, żeby nic Ci nie umknęło.</p>

      <div class="ty-ticket">
        <div class="ty-date" aria-hidden="true">
          <span class="ty-date-month">gru</span>
          <span class="ty-date-day">3</span>
          <span class="ty-date-dow">czw</span>
        </div>
        <div class="ty-ticket-body">
          <p class="ty-ticket-label">Webinar na żywo · bezpłatnie</p>
          <p class="ty-ticket-title">${esc(TITLE_PAGE)}</p>
          <p class="ty-ticket-meta">${icon("clock")}<span>${esc(EVENT_DATE_LABEL)} · ok. 45 min + pytania</span></p>
          <div class="ty-actions">
            <a class="btn btn-primary" href="${calUrl}" target="_blank" rel="noopener noreferrer">${icon("calendar")}Dodaj do Google Calendar</a>
            <a class="btn ty-btn-ghost" href="webinar.ics" download="webinar-lttt-3-12-2026.ics">${icon("calendar")}Outlook / Apple (.ics)</a>
            ${LIVE_URL ? `<a class="btn ty-btn-ghost" href="${esc(LIVE_URL)}" target="_blank" rel="noopener noreferrer">${icon("play")}Link do transmisji</a>` : ""}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--white">
    <div class="container">
      <div class="section-head section-head--left"><span class="eyebrow">Co dalej</span><h2>Co będzie się działo po zapisie</h2></div>
      <ol class="wb-steps wb-steps--3">${NEXT.map(([ic, when, t, d]) => `
        <li class="wb-step">
          <div class="wb-step-marker"><span class="wb-step-icon">${icon(ic)}</span></div>
          <div class="wb-step-body">
            <p class="wb-step-num">${esc(when)}</p>
            <h3>${esc(t)}</h3>
            <p>${esc(d)}</p>
          </div>
        </li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="section section--bg">
    <div class="container">
      <div class="ty-contact">
        <picture>
          <source srcset="${HOST_PHOTO}.webp" type="image/webp">
          <img class="ty-avatar" src="${HOST_PHOTO}.jpg" width="900" height="1125" loading="lazy" decoding="async" alt="${esc(HOST_NAME)}">
        </picture>
        <div class="ty-contact-text">
          <p class="ty-contact-title">Do zobaczenia w czwartek!</p>
          <p class="ty-contact-sub">${esc(HOST_NAME)}, ${esc(HOST_ROLE)}. Masz pytanie przed webinarem? Napisz lub zadzwoń.</p>
        </div>
        <div class="ty-contact-actions">
          <a class="btn btn-primary" href="tel:+48511205230">${icon("phone")}+48 511 205 230</a>
          <a class="btn ty-btn-line" href="mailto:kontakt@ltttmedia.pl">${icon("mail")}kontakt@ltttmedia.pl</a>
        </div>
      </div>
    </div>
  </section>
</main>
${footer}
</body>
</html>
`;

fs.mkdirSync(path.join(root, SLUG, "dziekujemy"), { recursive: true });
fs.writeFileSync(path.join(root, SLUG, "index.html"), page);
fs.writeFileSync(path.join(root, SLUG, "dziekujemy", "index.html"), thanks);
fs.writeFileSync(path.join(root, SLUG, "dziekujemy", "webinar.ics"), ICS);
console.log(`Wygenerowano /${SLUG}/ i /${SLUG}/dziekujemy/`);
