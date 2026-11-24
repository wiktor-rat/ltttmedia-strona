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
const LEAD = "Bezpłatny webinar na żywo dla deweloperów z własnym działem sprzedaży. Dostaniesz plan na ostatnie tygodnie roku: jak przejrzeć zapytania z ostatnich miesięcy, do kogo zadzwonić w pierwszej kolejności i jak sprawdzić, które działania faktycznie kończą się rezerwacją.";

const STEPS = [
  ["list", "Krok 1", "Spis bazy zapytań", "Zbierasz w jednym miejscu zapytania, listy zapisów i osoby po prezentacjach z ostatnich 6 miesięcy. Pokażę, jakie dane zapisać przy każdym kontakcie."],
  ["filter", "Krok 2", "Podział na gorące, ciepłe i zimne", "Każda grupa wymaga innego pierwszego ruchu. Pokażę, po czym je rozpoznać i kto powinien zadzwonić w ciągu 48 godzin."],
  ["bell", "Krok 3", "Powrót do bazy z prawdziwym powodem", "Telefon, SMS i e-mail w kolejności, która działa, plus reklama w Meta do osób z Twojej listy. Dostajesz gotowe wzory wiadomości."],
  ["chart", "Krok 4", "Domknięcie i pomiar", "Spotkania, kredyt, rezerwacja. Jak sprawdzić w jednym raporcie, które źródło faktycznie sprzedało, i co zostawić na pierwszy kwartał."],
];
// [ikona, tekst]
const BONUS = [
  ["file", "Checklista „5 miejsc, w których deweloper traci kupujących” (PDF)."],
  ["message", "Wzory wiadomości do powrotu do bazy: SMS, e\u2011mail i skrypt rozmowy."],
  ["play", "Nagranie webinaru dla wszystkich, którzy się zapiszą."],
];
const FORWHO = [
  "Masz inwestycję od ok. 80 lokali i własny dział sprzedaży.",
  "W Twojej bazie leżą zapytania z ostatnich miesięcy, do których nikt już nie wrócił.",
  "Sprzedałeś pierwsze ok. 30% lokali i tempo sprzedaży przestało rosnąć.",
];

// Sekcja prowadzącego
const HOST_NAME = "Wiktor Rataj";
const HOST_ROLE = "Founder & CEO LTTT MEDIA";
const HOST_BIO = [
  "Przedsiębiorca i założyciel LTTT MEDIA – agencji marketingowej specjalizującej się w branży nieruchomości. Ekspert w zakresie pozyskiwania klientów, strategii marketingowych oraz budowania skutecznych systemów wspierających sprzedaż nieruchomości.",
  "Na co dzień pomaga firmom z sektora nieruchomości wykorzystywać nowoczesne technologie i marketing internetowy do zwiększania efektywności działań sprzedażowych oraz budowania przewagi konkurencyjnej.",
  "W swojej pracy stawia na podejście oparte na danych, mierzalnych rezultatach i realnym zwrocie z inwestycji. Łączy kompetencje marketingowe z biznesowym spojrzeniem na rozwój przedsiębiorstw.",
];
const HOST_LINKEDIN = "https://pl.linkedin.com/in/wiktor-rataj-66a68a34b";
const HOST_PHOTO = "/img/wiktor-rataj"; // .webp + .jpg, 900x1125

const ICONS = {
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M9 13h6M9 17h4"/>',
  message: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
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
      performer: { "@type": "Person", name: HOST_NAME, jobTitle: HOST_ROLE, image: SITE + HOST_PHOTO + ".jpg", sameAs: [HOST_LINKEDIN] },
      url: URL_PAGE,
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

const page = `${head(TITLE, DESC, URL_PAGE, "index, follow, max-image-preview:large", `<script type="application/ld+json">${JSON.stringify(ld)}</script>`)}
<body>
${header(`<a href="#zapis" class="btn btn-primary">Zapisz się →</a>`)}
<main id="main">
  <section class="section--navy subhero lp-hero">
    <div class="container lp-hero-grid">
      <div class="lp-hero-text">
        <span class="eyebrow eyebrow--light">Webinar na żywo · dla deweloperów</span>
        <h1>${esc(TITLE_PAGE)}</h1>
        <p class="lp-hero-lead">${esc(LEAD)}</p>
        <p class="lp-hero-price">${esc(EVENT_DATE_LABEL)} · bezpłatnie</p>
      </div>
      <div class="lp-form-card" id="zapis">
        <h2 class="lp-form-title">Zapisz się na webinar</h2>
        ${formBlock()}
        <p class="lp-form-note">Zapis jest bezpłatny. Dostaniesz potwierdzenie e-mailem i SMS-em oraz link do transmisji. Webinar trwa ok. 45 minut plus pytania. Nie możesz być na żywo? Wyślemy nagranie.</p>
      </div>
    </div>
  </section>

  <section class="section section--white" id="program">
    <div class="container">
      <div class="section-head section-head--left"><span class="eyebrow">Program</span><h2>4 kroki, które pokażę na webinarze</h2></div>
      <ol class="wb-steps">${STEPS.map(([ic, tag, q, a]) => `
        <li class="wb-step">
          <div class="wb-step-marker"><span class="wb-step-icon">${icon(ic)}</span></div>
          <div class="wb-step-body">
            <p class="wb-step-num">${esc(tag)}</p>
            <h3>${esc(q)}</h3>
            <p>${esc(a)}</p>
          </div>
        </li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="section section--bg" id="dla-kogo">
    <div class="container wb-fit">
      <div class="wb-fit-card">
        <span class="eyebrow">Dla kogo</span>
        <h2>Ten webinar jest dla Ciebie, jeśli</h2>
        <ul class="wb-fit-list">${FORWHO.map((t) => `
          <li><span class="wb-fit-check">${icon("check")}</span><span>${esc(t)}</span></li>`).join("")}
        </ul>
        <a class="btn btn-primary wb-fit-cta" href="#zapis">Zapisz się na webinar</a>
      </div>
      <div class="wb-fit-card wb-fit-card--dark">
        <span class="eyebrow eyebrow--light">Po webinarze</span>
        <h2>Co dostajesz oprócz wiedzy</h2>
        <ul class="wb-bonus-list">${BONUS.map(([ic, t]) => `
          <li><span class="wb-bonus-icon">${icon(ic)}</span><span>${esc(t)}</span></li>`).join("")}
        </ul>
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
        <a class="wb-host-link" href="${HOST_LINKEDIN}" target="_blank" rel="noopener noreferrer">${icon("linkedin")}Profil na LinkedIn</a>
      </div>
    </div>
  </section>

  <section class="section section--navy">
    <div class="container lp-narrow" style="text-align:center">
      <h2>Zarezerwuj miejsce na ${esc(EVENT_DATE_LABEL)}</h2>
      <p class="lp-hero-lead" style="margin:16px auto 24px">Zapis trwa mniej niż minutę. Jeśli nie możesz być na żywo, wyślemy nagranie.</p>
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
  ["play", "Po webinarze", "Nagranie i materiały", "Dostaniesz nagranie, checklistę „5 miejsc, w których deweloper traci kupujących” i wzory wiadomości."],
];

const thanks = `${head("Dziękujemy za zapis na webinar | LTTT MEDIA", "Dziękujemy za zapis na webinar LTTT MEDIA.", URL_THANKS, "noindex, nofollow", "")}
<body data-meta-event="CompleteRegistration">
${header(`<a href="tel:+48511205230" class="lp-header-phone">+48 511 205 230</a>`)}
<main id="main">
  <section class="section--navy ty-hero">
    <div class="container ty-hero-inner">
      <span class="ty-check" aria-hidden="true">${icon("check")}</span>
      <span class="eyebrow eyebrow--light">Zapis potwierdzony</span>
      <h1>Dziękujemy, jesteś zapisany na webinar</h1>
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
