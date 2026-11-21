// Generuje statyczne podstrony usług: /uslugi/<slug>/index.html oraz sitemap.xml.
// Dane usług pochodzą z tablicy SERVICES w script.js (jedno źródło prawdy).
// Po każdej zmianie treści usług uruchom: node scripts/build-service-pages.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "script.js"), "utf8");
const grab = (name) => {
  const start = src.indexOf("var " + name + " =");
  const end = src.indexOf("\n  };", start) !== -1 && name === "ICONS" ? src.indexOf("\n  };", start) + 5 : src.indexOf("\n  ];", start) + 5;
  return src.slice(start, end);
};
const ctx = {};
vm.createContext(ctx);
vm.runInContext(grab("ICONS") + "\n" + grab("SERVICES") + "\nthis.ICONS=ICONS;this.SERVICES=SERVICES;", ctx);
const { ICONS, SERVICES } = ctx;

const SITE = "https://ltttmedia.pl";
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const CHECK =
  '<svg class="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

const paras = (s) => (s.jakDziala ? (Array.isArray(s.jakDziala) ? s.jakDziala : [s.jakDziala]) : [s.pain, s.solution].filter(Boolean));
const items = (s) => s.coRobimy || s.scope || [];

function page(s) {
  const url = `${SITE}/uslugi/${s.slug}/`;
  const title = `${s.title} | LTTT MEDIA`;
  const desc = s.tagline;
  const proces = s.proces && s.proces.length
    ? `<div class="service-block"><h3>Proces budowy strony</h3><ol class="process-list">${s.proces.map((p, i) => `<li><span class="process-number">${i + 1}</span><span>${p}</span></li>`).join("")}</ol>${s.procesNote ? `<p class="process-note">${s.procesNote}</p>` : ""}</div>`
    : "";
  const cena = s.cena ? `<div class="service-block"><h3>Cena</h3><p>${s.cena}</p></div>` : "";
  const others = SERVICES.filter((o) => o.id !== s.id && !o.hidden)
    .map((o) => `<li><a href="/uslugi/${o.slug}/">${o.title}</a></li>`)
    .join("");
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.title,
        description: desc,
        url,
        serviceType: s.title,
        areaServed: { "@type": "Country", name: "Polska" },
        provider: { "@type": "Organization", name: "LTTT MEDIA", url: SITE + "/" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "LTTT MEDIA", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: "Usługi", item: SITE + "/#uslugi" },
          { "@type": "ListItem", position: 3, name: s.title, item: url },
        ],
      },
    ],
  };
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:locale" content="pl_PL">
<meta property="og:site_name" content="LTTT MEDIA">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
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
    <a href="/" class="logo" aria-label="LTTT MEDIA — strona główna">
      <span class="logo-main">LTTT MEDIA</span>
      <span class="logo-sub">LEAD TO THE TOP</span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav" aria-label="Otwórz menu nawigacji"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="mainNav" aria-label="Nawigacja główna">
      <a href="/#o-nas">O nas</a>
      <a href="/#wyniki">Wyniki</a>
      <a href="/#uslugi">Usługi</a>
      <a href="/#faq">FAQ</a>
      <a href="/#kontakt">Kontakt</a>
      <a href="/#kontakt" class="btn btn-primary mobile-nav-cta">Skontaktuj się z nami →</a>
    </nav>
    <div class="header-actions"><a href="/#kontakt" class="btn btn-primary">Skontaktuj się z nami →</a></div>
  </div>
</header>
<main id="main">
  <section class="section--navy subhero">
    <div class="container">
      <a href="/#uslugi" class="subhero-back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg> Wszystkie usługi</a>
      <span class="eyebrow eyebrow--light">${esc(s.code)}</span>
      <h1>${s.title}</h1>
    </div>
  </section>
  <div class="container page-content">
    <p class="service-tagline">${s.tagline}</p>
    <div class="service-block"><h3>Jak działa usługa</h3>${paras(s).map((p) => `<p>${p}</p>`).join("")}</div>
    ${proces}${cena}
    <div class="service-block"><h3>Co robimy</h3><ul class="scope-list">${items(s).map((i) => `<li>${CHECK}<span>${i}</span></li>`).join("")}</ul></div>
    <a class="btn btn-primary btn-primary--lg" href="/#kontakt">Zapytaj o ofertę</a>
    <div class="service-block" style="margin-top:48px"><h3>Pozostałe usługi</h3><ul class="scope-list">${others}</ul></div>
  </div>
</main>
<footer class="site-footer">
  <div class="container">
    <span>© 2026 LTTT MEDIA | Lead To The Top Sp. z o.o.</span>
    <a href="/#polityka-prywatnosci" class="footer-link">Polityka prywatności</a>
    <button type="button" class="footer-link" data-cookie-settings>Ustawienia cookies</button>
  </div>
</footer>
<script>
(function(){var t=document.getElementById("navToggle"),n=document.getElementById("mainNav");if(t&&n){t.addEventListener("click",function(){var o=n.classList.toggle("is-open");t.setAttribute("aria-expanded",o?"true":"false");});}})();
</script>
</body>
</html>
`;
}

SERVICES.forEach((s) => {
  const dir = path.join(root, "uslugi", s.slug);
  if (s.hidden) { fs.rmSync(dir, { recursive: true, force: true }); return; }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(s));
});

const today = new Date().toISOString().slice(0, 10);
const urls = [["/", "1.0"], ["/silnik-sprzedazy-inwestycji/", "0.9"], ...SERVICES.filter((s) => !s.hidden).map((s) => [`/uslugi/${s.slug}/`, "0.7"])];
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(([u, p]) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`).join("\n") +
    `\n</urlset>\n`
);
console.log("Wygenerowano " + SERVICES.filter((s) => !s.hidden).length + " stron usług i sitemap.xml");
