// Generuje /silnik-sprzedazy-inwestycji/index.html (landing dla deweloperów).
// Uruchom: node scripts/build-developers-page.js
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const SITE = "https://ltttmedia.pl";
const URL_PAGE = `${SITE}/silnik-sprzedazy-inwestycji/`;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const TITLE = "Marketing dla deweloperów: Silnik Sprzedaży Inwestycji | LTTT MEDIA";
const DESC = "Agencja marketingowa dla deweloperów mieszkaniowych. Reklamy Meta i Google plus obsługa każdego zapytania do rozmowy handlowca. Od 7 500 zł netto miesięcznie. Bezpłatna rozmowa diagnozująca.";
const H1 = "LTTT MEDIA pomaga deweloperom mieszkaniowym przyspieszyć sprzedaż lokali dzięki Silnikowi Sprzedaży Inwestycji: reklamom Meta i Google oraz opiece nad każdym zapytaniem aż do rozmowy handlowca.";
const LEAD = "Pierwsze 30% lokali sprzedaje się samo: z listy zapisów, z poleceń i z bazy dewelopera. Potem zapytań ubywa, handlowcy tracą czas na słabe kontakty, a część dobrych zapytań ginie, bo nikt nie odpowiedział na czas. Silnik Sprzedaży Inwestycji jest dla deweloperów z własnym działem sprzedaży i inwestycją od ok. 80 lokali, którzy chcą przyspieszyć sprzedaż, zanim zostaną trudniejsze lokale. Po 30 dniach widzisz w jednym raporcie, ile zapytań, spotkań i rezerwacji dały reklamy i ile to kosztowało.";

const FORWHO_LEAD = "Dla deweloperów mieszkaniowych zatrudniających 10–25 osób, z własnym działem sprzedaży i inwestycją od ok. 80 lokali, którzy sprzedali ok. 30% lokali i widzą, że tempo sprzedaży nie rośnie tak, jak zakładali.";
const FORWHO = [
  ["Deweloperzy mieszkaniowi (rynek pierwotny)", "10–25 pracowników, ok. 50–100 mln zł przychodu rocznie, min. 2 inwestycje, inwestycja 80–100 lokali", "Pierwsza fala sprzedaży (ok. 30% lokali) się wyczerpała, zapytań ubywa, a zarząd pyta o plan"],
  ["Deweloperzy z własnym działem sprzedaży", "Zespół handlowców i własny CRM", "Zapytania z reklam trafiają do handlowców z opóźnieniem albo nikt do nich nie wraca"],
  ["Deweloperzy z budżetem marketingowym od ok. 20–25 tys. zł miesięcznie", "Reklamy prowadzone przez agencję lub we własnym zakresie", "Dużo zapytań, mało spotkań, a nikt nie wie, co realnie przynosi kupujących"],
];
const NOTFOR = ["dla deweloperów, którzy chcą oddać sprzedaż na zewnątrz (zostawiamy ją Waszemu zespołowi),", "dla inwestycji, w których problemem jest produkt, cena lub lokalizacja, bo reklamy tego nie naprawią."];

const DELIV = [
  ["Co naprawić w sprzedaży w pierwszej kolejności?", "Zanim ruszymy z reklamami, sprawdzamy, czy sprzedaż zwolniła przez ruch, ofertę, stronę czy obsługę zapytań, i dajemy plan na 30/60/90 dni. Wiesz, co poprawiać najpierw, i nie przepalasz budżetu na kampanie, które nie mają szans zadziałać."],
  ["Jak mieć zapytania od osób z budżetem?", "Ustawiamy formularz, wykluczenia i optymalizację pod jakość zapytań, nie pod ich liczbę. Handlowcy rozmawiają z osobami z realną szansą zakupu i zdolnością kredytową, a nie z przypadkowymi kontaktami."],
  ["Jak zrobić, żeby żadne zapytanie nie zginęło?", "W naszym CRM każde zapytanie dostaje ocenę, natychmiastową pierwszą odpowiedź (SMS i mailing), a handlowiec alert. Przeglądamy też obsługę zapytań u Was i wracamy do osób, które już pytały."],
  ["Czy da się zobaczyć drogę od reklamy do rezerwacji?", "Tak. Dostajesz raport od reklamy do rezerwacji: wydatki, liczba i koszt zapytań, spotkań i rezerwacji. Zarząd widzi, co przynosi kupujących, i decyduje na liczbach, nie na przeczuciach."],
  ["Gdzie szukać kupujących, żeby nie polegać na jednym kanale?", "Przygotowujemy stronę inwestycji i prowadzimy kampanie w Meta (dogrzewanie i grupy kupujących) oraz Google (osoby aktywnie szukające mieszkania). Co tydzień optymalizujemy budżet pod to, co daje spotkania."],
  ["Ile pracy spadnie na Twój zespół?", "Niewiele. Masz jednego opiekuna i odpowiedź w 24 godziny. Start nie wymaga zmiany Waszego CRM ani długich briefów, a dostępy, piksele i formularze ustawiamy za Was."],
];

const STEPS = [
  ["Rozmowa diagnozująca", "20–30 minut, online. Sprawdzamy, gdzie hamuje sprzedaż inwestycji: ruch, oferta, strona czy obsługa zapytań. Nie przygotowujesz żadnych materiałów.", "20–30 minut"],
  ["Plan pierwszych 30 dni", "Dostajesz plan jako krótkie nagranie wideo e-mailem: co zmieniamy, w jakiej kolejności i jak to wpłynie na zapytania. Możesz go przesłać zarządowi.", "do 3 dni roboczych od rozmowy"],
  ["Oferta i krótka umowa", "Dopiero po akceptacji planu wysyłamy jedną ofertę z ceną, zakresem, harmonogramem i zasadami wyjścia.", "1–2 dni robocze od akceptacji planu"],
  ["Wdrożenie", "Zbieramy dostępy, analizujemy dane, konfigurujemy nasz CRM, formularze i pomiar, ustalamy dzień startowy.", "ok. 7–10 dni roboczych"],
  ["Start kampanii i pierwszy raport", "Uruchamiamy reklamy Meta i Google oraz obsługę każdego zapytania. Po ok. 30 dniach dostajesz pierwszy raport od reklamy do rezerwacji.", "ok. 30 dni do pierwszego raportu"],
];

const PRICE = [
  ["W cenie", "Wszystkie wartości z oferty: plan 30 dni, reklamy Meta i Google, strona inwestycji, obsługa zapytań w naszym CRM, raport od reklamy do rezerwacji, jeden opiekun, spotkanie miesięczne. Spotkania online."],
  ["Osobno", "Budżet reklamowy na Meta i Google, płacony platformom reklamowym. Wiadomości SMS do osób pytających o inwestycję: płacicie za faktycznie wysłane."],
  ["Na życzenie", "Wizyty naszego zespołu na inwestycji (dzień startowy, wspólny przegląd): wycena osobno, wraz z dojazdem."],
];

const COMPARE = [
  ["Więcej ogłoszeń na portalach", "Więcej zapytań z tego samego źródła, konkurencja ceną za m², nikt nie pilnuje, co się dzieje po zapytaniu", "Reklamy Meta i Google plus obsługa każdego zapytania w naszym CRM: ocena, alert dla handlowca, SMS, follow-upy"],
  ["Wzmocnienie własnego działu sprzedaży", "Dodatkowy handlowiec albo szkolenie, ale bez nowych zapytań", "Nie zmieniamy Waszego zespołu. Dostarczamy zapytania od osób z budżetem i pilnujemy, żeby handlowiec dostał je na czas"],
  ["Zwykła agencja marketingowa lub freelancer", "Raport z kliknięć i kosztu leada, bez wiedzy o rynku pierwotnym i o tym, co dzieje się po kliknięciu", "Działamy tylko w nieruchomościach (ponad 200 firm z branży) i raportujemy aż do rezerwacji, nie tylko do leada"],
  ["Marketingowiec na etat", "Stały koszt, długie wdrożenie, jedna osoba rzadko zna Meta, Google, lejki i automatyzacje", "Zespół i gotowe procesy od pierwszego dnia, jeden opiekun z odpowiedzią w 24 h"],
  ["Nic nie zmieniać, poczekać", "Zero kosztu, ale tempo sprzedaży może samo nie wzrosnąć", "Plan 30 dni z diagnozą pokazuje, ile kosztuje zwlekanie i co zmienić najpierw"],
];

const FAQ = [
  ["Ile kosztuje współpraca z agencją przy sprzedaży inwestycji deweloperskiej i za co płacę?", "Od 7 500 zł netto miesięcznie, w pierwszym miesiącu 9 000 zł netto (z pełnym wdrożeniem). Osobno płacisz budżet reklamowy Meta i Google bezpośrednio platformom oraz SMS-y po faktycznie wysłanych. Wizyty na inwestycji są opcją za dodatkową opłatą."],
  ["Czy gwarantujecie sprzedaż lokali?", "Nie obiecujemy liczby sprzedanych lokali, bo zależy od ceny, lokalizacji i pracy handlowców. Gwarantujemy przejrzystość: raport od reklamy do rezerwacji pokazuje, co działa, a gdy coś nie działa, mówimy to wprost."],
  ["Jak szybko zobaczę pierwsze efekty?", "Po rozmowie diagnozującej dostajesz plan pierwszych 30 dni, po wdrożeniu startujemy z kampanią, a pierwszy raport masz po ok. 30 dniach od startu. Dokładne terminy podajemy w planie dla Twojej inwestycji."],
  ["Czy musimy zmieniać nasz CRM i ile pracy spadnie na handlowców?", "Nie musisz zmieniać swojego CRM. Zapytania obsługujemy w naszym CRM i przekazujemy handlowcom z oceną i alertem. Handlowcy rozmawiają z osobami z realną szansą zakupu, a nie przepisują kontaktów ręcznie."],
  ["Jak wygląda rezygnacja ze współpracy?", "Umowa jest krótka: minimum 3 miesiące, potem miesięczne wypowiedzenie. Konta reklamowe i dane zostają u Ciebie, a kontakty z naszego CRM można wyeksportować. Po okresie minimalnym nie ma kar."],
  ["Czym różnicie się od zwykłej agencji marketingowej?", "Działamy tylko w branży nieruchomości i odpowiadamy nie tylko za reklamy, ale za całą drogę zapytania do rozmowy handlowca. Raport kończy się na rezerwacji, nie na koszcie leada."],
  ["Dla jakiego dewelopera jest Silnik Sprzedaży Inwestycji?", "Dla deweloperów mieszkaniowych z własnym działem sprzedaży, inwestycją od ok. 80 lokali, którzy sprzedali ok. 20–40% lokali i chcą przyspieszyć sprzedaż."],
  ["Jak zacząć współpracę?", "Umów rozmowę diagnozującą (20–30 minut, online, bezpłatna). Potem dostajesz plan pierwszych 30 dni, a ofertę wysyłamy dopiero po jego akceptacji."],
];

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": SITE + "/#organization",
      name: "LTTT MEDIA",
      legalName: "Lead To The Top Media Sp. z o.o.",
      url: SITE + "/",
      logo: SITE + "/favicon-192.png",
      image: SITE + "/og-image.png",
      description: "Wyspecjalizowana agencja marketingowa dla firm z branży nieruchomości w Polsce: Meta Ads, Google Ads, lejki i automatyzacje w modelu abonamentowym.",
      telephone: "+48511205230",
      email: "kontakt@ltttmedia.pl",
      address: { "@type": "PostalAddress", streetAddress: "Plac Bankowy 2", postalCode: "00-095", addressLocality: "Warszawa", addressCountry: "PL" },
      areaServed: { "@type": "Country", name: "Polska" },
      knowsAbout: ["marketing nieruchomości", "Meta Ads", "Google Ads", "marketing dla deweloperów", "sprzedaż inwestycji deweloperskich"],
      sameAs: ["https://www.instagram.com/ltttmedia/", "https://www.facebook.com/profile.php?id=61555868486029", "https://youtube.com/@ltttmedia"],
    },
    {
      "@type": "Service",
      "@id": URL_PAGE + "#service",
      name: "Silnik Sprzedaży Inwestycji",
      serviceType: "Marketing i obsługa zapytań dla deweloperów mieszkaniowych",
      description: DESC,
      url: URL_PAGE,
      provider: { "@id": SITE + "/#organization" },
      areaServed: { "@type": "Country", name: "Polska" },
      audience: { "@type": "BusinessAudience", name: "Deweloperzy mieszkaniowi" },
      offers: {
        "@type": "Offer",
        priceCurrency: "PLN",
        priceSpecification: { "@type": "UnitPriceSpecification", price: 7500, priceCurrency: "PLN", unitText: "MON", valueAddedTaxIncluded: false },
        url: URL_PAGE + "#cena",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Dla deweloperów", item: URL_PAGE },
      ],
    },
  ],
};

const tbl = (head, rows) =>
  `<div class="lp-table-wrap"><table class="lp-table"><thead><tr>${head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join("")}</tr>`)
    .join("")}</tbody></table></div>`;

const html = `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(TITLE)}</title>
<meta name="description" content="${esc(DESC)}">
<link rel="canonical" href="${URL_PAGE}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:locale" content="pl_PL">
<meta property="og:site_name" content="LTTT MEDIA">
<meta property="og:title" content="${esc(TITLE)}">
<meta property="og:description" content="${esc(DESC)}">
<meta property="og:url" content="${URL_PAGE}">
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
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip-link" href="#main">Przejdź do treści</a>
<div class="top-banner">Partner w rozwoju Twojej firmy</div>
<header class="site-header">
  <div class="container">
    <a href="#" class="logo" aria-label="LTTT MEDIA">
      <span class="logo-main">LTTT MEDIA</span>
      <span class="logo-sub">LEAD TO THE TOP</span>
    </a>
    <div class="header-actions"><a href="#rozmowa" class="btn btn-primary">Umów rozmowę →</a></div>
  </div>
</header>
<main id="main">
  <section class="section--navy subhero lp-hero">
    <div class="container">
      <span class="eyebrow eyebrow--light">Dla deweloperów mieszkaniowych</span>
      <h1>${esc(H1)}</h1>
      <p class="lp-hero-lead">${esc(LEAD)}</p>
      <div class="lp-hero-actions">
        <a class="btn btn-primary btn-primary--lg" href="#rozmowa">Zarezerwuj rozmowę diagnozującą</a>
        <span class="lp-hero-price">od 7 500 zł netto miesięcznie · rozmowa bezpłatna</span>
      </div>
      <p class="lp-hero-how">Telefon: <a href="tel:+48511205230">+48 511 205 230</a> · e-mail: <a href="mailto:kontakt@ltttmedia.pl">kontakt@ltttmedia.pl</a></p>
    </div>
  </section>

  <section class="section section--white" id="dla-kogo">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">Dla kogo</span><h2>Dla deweloperów, którym tempo sprzedaży przestało rosnąć</h2></div>
      <p class="lp-lead">${esc(FORWHO_LEAD)}</p>
      ${tbl(["Branża / sektor", "Wielkość firmy", "Symptom problemu"], FORWHO)}
      <h3 class="lp-h3">Dla kogo to nie jest</h3>
      <ul class="lp-list">${NOTFOR.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
    </div>
  </section>

  <section class="section section--bg" id="co-dostajesz">
    <div class="container">
      <div class="section-head section-head--left"><span class="eyebrow">Co konkretnie dostajesz</span><h2>Efekty, nie funkcje</h2></div>
      <div class="grid-3 lp-cards">${DELIV.map(([q, a]) => `<article class="card"><h3>${esc(q)}</h3><p>${esc(a)}</p></article>`).join("")}</div>
    </div>
  </section>

  <section class="section section--white" id="jak-to-dziala">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">Jak to działa</span><h2>Pięć kroków od pierwszej rozmowy do pierwszego raportu</h2></div>
      ${tbl(["Krok", "Co się dzieje", "Czas trwania"], STEPS.map(([t, d, c], i) => [`${i + 1}. ${t}`, d, c]))}
      <p class="lp-note">Po starcie spotykamy się raz w miesiącu, żeby omówić wyniki i plan na kolejny miesiąc. Wszystkie spotkania odbywają się online.</p>
    </div>
  </section>

  <!-- TODO: case studies (min. 2: branża i kontekst, liczba przed, liczba po, czas, co zrobiliśmy) -->

  <section class="section section--bg" id="cena">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">Cena</span><h2>Od 7 500 zł netto miesięcznie</h2></div>
      <p class="lp-lead"><strong>Pierwszy miesiąc: 9 000 zł netto, z pełnym wdrożeniem.</strong> Od drugiego miesiąca 7 500 zł netto miesięcznie.</p>
      ${tbl(["", "Co obejmuje"], PRICE)}
      <p><strong>Umowa:</strong> minimum 3 miesiące, potem miesięczne wypowiedzenie. Konta reklamowe i dane zostają u dewelopera, kontakty z naszego CRM można wyeksportować, a po okresie minimalnym nie ma kar za zakończenie współpracy.</p>
      <p><strong>Czy się zwróci?</strong> Policzymy to na liczbach Waszej inwestycji w planie 30 dni: ile dodatkowo trzeba sprzedać lokali, żeby pakiet się zwrócił, przy wartości jednego lokalu u Was.</p>
    </div>
  </section>

  <section class="section section--white" id="dlaczego-my">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">Dlaczego my</span><h2>Czym różnimy się od innych sposobów na przyspieszenie sprzedaży</h2></div>
      ${tbl(["Alternatywa", "Ich podejście", "Nasze podejście"], COMPARE)}
      <p class="lp-note">Lead To The Top Media Sp. z o.o., Plac Bankowy 2, 00-095 Warszawa. Tel. <a href="tel:+48511205230">+48 511 205 230</a>, <a href="mailto:kontakt@ltttmedia.pl">kontakt@ltttmedia.pl</a>.</p>
    </div>
  </section>

  <section class="section section--bg" id="faq">
    <div class="container lp-narrow">
      <div class="section-head section-head--left"><span class="eyebrow">FAQ</span><h2>Najczęstsze pytania deweloperów</h2></div>
      <div class="lp-faq">${FAQ.map(([q, a]) => `<details class="lp-faq-item"><summary><h3>${esc(q)}</h3></summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>

  <!-- TODO: opinie (min. 2 z konkretnym wynikiem, autorem, datą z ostatnich 12 miesięcy i źródłem zewnętrznym) -->

  <section class="section section--navy" id="rozmowa">
    <div class="container lp-cta">
      <div>
        <span class="eyebrow eyebrow--light">Jak zacząć</span>
        <h2>Jak zacząć? Umów 20–30-minutową rozmowę diagnozującą.</h2>
        <ol class="lp-cta-steps">
          <li><strong>Krok 1.</strong> Wybierz termin rozmowy online albo wypełnij formularz.</li>
          <li><strong>Krok 2.</strong> Odpowiadamy najszybciej, jak się da, i ustalamy termin.</li>
          <li><strong>Krok 3.</strong> Na rozmowie sprawdzamy, gdzie hamuje sprzedaż Twojej inwestycji. Potem dostajesz plan pierwszych 30 dni jako krótkie nagranie wideo.</li>
        </ol>
        <p class="lp-contact">Telefon: <a href="tel:+48511205230">+48 511 205 230</a><br>E-mail: <a href="mailto:kontakt@ltttmedia.pl">kontakt@ltttmedia.pl</a></p>
      </div>
      <div class="lp-form-card">
        <form id="devForm" novalidate>
          <div class="form-field"><label for="dfName">Imię i nazwisko</label><input type="text" id="dfName" name="name" autocomplete="name" required></div>
          <div class="form-field"><label for="dfCompany">Firma deweloperska</label><input type="text" id="dfCompany" name="company" autocomplete="organization" required></div>
          <div class="form-field"><label for="dfPhone">Telefon</label><input type="tel" id="dfPhone" name="phone" autocomplete="tel" required></div>
          <div class="form-field"><label for="dfEmail">E-mail</label><input type="email" id="dfEmail" name="email" autocomplete="email" required></div>
          <div class="form-field"><label for="dfMessage">Krótka wiadomość (opcjonalnie)</label><textarea id="dfMessage" name="message" rows="3"></textarea></div>
          <label class="lp-consent"><input type="checkbox" id="dfConsent" name="consent" required> <span>Zgadzam się na kontakt w sprawie oferty. <a href="/#polityka-prywatnosci">Polityka prywatności</a></span></label>
          <p class="form-error-message" id="dfError" role="alert"></p>
          <button type="submit" class="btn btn-primary btn-block" id="dfSubmit">Zarezerwuj rozmowę diagnozującą</button>
          <p class="lp-form-note">Rozmowa jest bezpłatna i niczego nie zobowiązuje. Ofertę wysyłamy dopiero po akceptacji planu.</p>
        </form>
        <div class="lp-form-ok" id="dfOk" hidden><h3>Dziękujemy!</h3><p>Zapytanie zostało zapisane. Odezwiemy się najszybciej, jak to możliwe.</p></div>
      </div>
    </div>
  </section>
</main>
<footer class="site-footer">
  <div class="container">
    <span>© 2026 LTTT MEDIA | Lead To The Top Sp. z o.o.</span>
    <a href="/#polityka-prywatnosci" class="footer-link">Polityka prywatności</a>
    <button type="button" class="footer-link" data-cookie-settings>Ustawienia cookies</button>
  </div>
</footer>
<script>
(function(){
  // TODO: podstaw adres wysyłki (webhook albo formularz z naszego CRM). Puste = tryb "wkrótce".
  var FORM_ENDPOINT = "";
  var f = document.getElementById("devForm"); if (!f) return;
  var err = document.getElementById("dfError"), ok = document.getElementById("dfOk"), btn = document.getElementById("dfSubmit");
  function show(m){ err.textContent = m; err.classList.add("is-visible"); }
  f.addEventListener("submit", function(e){
    e.preventDefault(); err.classList.remove("is-visible");
    var v = {name:f.name.value.trim(), company:f.company.value.trim(), phone:f.phone.value.trim(), email:f.email.value.trim(), message:f.message.value.trim()};
    var bad = false;
    ["name","company","phone","email"].forEach(function(k){ var el=f[k]; if(!v[k]){el.classList.add("is-invalid"); bad=true;} else el.classList.remove("is-invalid"); });
    if (!bad && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v.email)) { f.email.classList.add("is-invalid"); bad = true; }
    if (bad) return show("Uzupełnij wszystkie wymagane pola poprawnymi danymi.");
    if (!f.consent.checked) return show("Zaznacz zgodę na kontakt, żebyśmy mogli odpowiedzieć.");
    if (!FORM_ENDPOINT) return show("Formularz zostanie uruchomiony wkrótce, zadzwoń: +48 511 205 230.");
    btn.disabled = true;
    fetch(FORM_ENDPOINT, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({source:"landing-deweloperzy", name:v.name, company:v.company, phone:v.phone, email:v.email, message:v.message, consent:true})})
      .then(function(r){ if(!r.ok) throw new Error(r.status); f.hidden = true; ok.hidden = false; })
      .catch(function(){ show("Nie udało się wysłać. Zadzwoń: +48 511 205 230 albo napisz na kontakt@ltttmedia.pl."); })
      .then(function(){ btn.disabled = false; });
  });
})();
</script>
</body>
</html>
`;

fs.mkdirSync(path.join(root, "silnik-sprzedazy-inwestycji"), { recursive: true });
fs.writeFileSync(path.join(root, "silnik-sprzedazy-inwestycji", "index.html"), html);
console.log("Wygenerowano /silnik-sprzedazy-inwestycji/");
