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
const WEBINAR_FORM_ID = "";
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
const BONUS = [
  "Checklista „5 miejsc, w których deweloper traci kupujących” (PDF).",
  "Wzory wiadomości do powrotu do bazy: SMS, e-mail i skrypt rozmowy.",
  "Nagranie webinaru dla wszystkich, którzy się zapiszą.",
];
const FORWHO = [
  "Masz inwestycję od ok. 80 lokali i własny dział sprzedaży.",
  "W Twojej bazie leżą zapytania z ostatnich miesięcy, do których nikt już nie wrócił.",
  "Sprzedałeś pierwsze ok. 30% lokali i tempo sprzedaży przestało rosnąć.",
];
const FAQ = [
  ["Czy webinar jest płatny?", "Nie. Udział jest bezpłatny. Na końcu zapraszamy na bezpłatną rozmowę diagnozującą, ale nie ma żadnego obowiązku."],
  ["Gdzie odbędzie się webinar?", "Na żywo na YouTube. Link do transmisji dostaniesz e-mailem i SMS-em po zapisie oraz przed rozpoczęciem."],
  ["Ile to trwa?", "Ok. 45 minut treści i czas na pytania. Całość nie powinna zająć dłużej niż godzinę."],
  ["Co jeśli nie będę mógł być na żywo?", "Zapisz się, a wyślemy Ci nagranie wraz z checklistą."],
  ["Czy to sprzedaż usług?", "Większość webinaru to konkretna wiedza do zastosowania od razu. Na końcu jest ok. 5 minut o tym, jak możemy pomóc, jeśli chcesz."],
];

const ICONS = {
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

const FORM_URL = `https://api.leadconnectorhq.com/widget/form/${WEBINAR_FORM_ID}`;
const formBlock = () => WEBINAR_FORM_ID
  ? `<div class="lp-crm-form">
          <iframe
            src="${FORM_URL}"
            style="width:100%;height:100%;border:none;border-radius:8px"
            id="inline-${WEBINAR_FORM_ID}"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Webinar 3.12"
            data-height="560"
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
        <p class="lp-hero-price">${esc(EVENT_DATE_LABEL)} · YouTube Live · bezpłatnie</p>
      </div>
      <div class="lp-form-card" id="zapis">
        <h2 class="lp-form-title">Zapisz się na webinar</h2>
        ${formBlock()}
        <p class="lp-form-note">Dostaniesz potwierdzenie e-mailem i SMS-em oraz link do transmisji. Zapis jest bezpłatny.</p>
      </div>
    </div>
  </section>

  <section class="section section--white" id="program">
    <div class="container">
      <div class="section-head section-head--left"><span class="eyebrow">Program</span><h2>4 kroki, które pokażę na webinarze</h2></div>
      <div class="lp-deliv">${STEPS.map(([ic, tag, q, a]) => `
        <article class="lp-deliv-card">
          <span class="lp-deliv-icon">${icon(ic)}</span>
          <p class="lp-deliv-tag">${esc(tag)}</p>
          <h3>${esc(q)}</h3>
          <p class="lp-deliv-text">${esc(a)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>

  <section class="section section--bg" id="dla-kogo">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">Dla kogo</span><h2>Ten webinar jest dla Ciebie, jeśli</h2></div>
      <ul class="lp-list">${FORWHO.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="section-head section-head--left" style="margin-top:36px"><span class="eyebrow">Po webinarze</span><h2>Co dostajesz oprócz wiedzy</h2></div>
      <ul class="lp-list">${BONUS.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>
  </section>

  <section class="section section--white" id="prowadzacy">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">Prowadzący</span><h2>Wiktor Rataj, założyciel LTTT MEDIA</h2></div>
      <p>LTTT MEDIA to wyspecjalizowana agencja marketingowa dla branży nieruchomości. Zaufało nam ponad 200 firm z branży nieruchomości. Pomagamy deweloperom sprzedawać inwestycje dzięki reklamom Meta i Google oraz obsłudze każdego zapytania do rozmowy handlowca. Wiktor prowadzi webinar sam i odpowiada na pytania na żywo.</p>
      <p><a href="https://pl.linkedin.com/in/wiktor-rataj-66a68a34b" target="_blank" rel="noopener noreferrer">Profil na LinkedIn: Wiktor Rataj</a></p>
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

const calUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Webinar: " + TITLE_PAGE) +
  "&dates=" + EVENT_ISO_START + "/" + EVENT_ISO_END + "&details=" + encodeURIComponent("Webinar na żywo na YouTube. Link do transmisji dostaniesz e-mailem i SMS-em.") + "&ctz=Europe/Warsaw";

const thanks = `${head("Dziękujemy za zapis na webinar | LTTT MEDIA", "Dziękujemy za zapis na webinar LTTT MEDIA.", URL_THANKS, "noindex, nofollow", "")}
<body>
${header(`<a href="tel:+48511205230" class="lp-header-phone">+48 511 205 230</a>`)}
<main id="main">
  <section class="section--navy subhero lp-hero">
    <div class="container lp-narrow">
      <span class="eyebrow eyebrow--light">Zapis potwierdzony</span>
      <h1>Dziękujemy, jesteś zapisany na webinar</h1>
      <p class="lp-hero-lead">${esc(TITLE_PAGE)}<br><strong>${esc(EVENT_DATE_LABEL)}</strong>, YouTube Live.</p>
      <div class="lp-hero-actions">
        <a class="btn btn-primary btn-primary--lg" href="${calUrl}" target="_blank" rel="noopener noreferrer">Dodaj do kalendarza</a>
        ${LIVE_URL ? `<a class="btn btn-secondary" href="${esc(LIVE_URL)}" target="_blank" rel="noopener noreferrer">Link do transmisji</a>` : ""}
      </div>
    </div>
  </section>
  <section class="section section--white">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">Co dalej</span><h2>Co będzie się działo po zapisie</h2></div>
      <ol class="lp-list">
        <li>W ciągu kilku minut dostaniesz potwierdzenie e-mailem i SMS-em.</li>
        <li>Przed webinarem wyślemy przypomnienia z linkiem do transmisji.</li>
        <li>Po webinarze dostaniesz nagranie, checklistę i wzory wiadomości.</li>
      </ol>
      <p>Pytania? Zadzwoń: <a href="tel:+48511205230">+48 511 205 230</a> lub napisz: <a href="mailto:kontakt@ltttmedia.pl">kontakt@ltttmedia.pl</a>.</p>
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
console.log(`Wygenerowano /${SLUG}/ i /${SLUG}/dziekujemy/`);
