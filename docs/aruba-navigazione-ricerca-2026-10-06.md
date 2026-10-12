# Aggiornamento Aruba — 6 ottobre 2026

Pubblicate 62 pagine aggiornate, 404, indice completo della ricerca, CSS e logo locale Self Defense. I contenuti sono stati recuperati dalla produzione prima di sostituire la navigazione, per conservare recensioni Google, news e testi già pubblicati.

- Link interni, canonical e sitemap con slash finale.
- Redirect delle directory direttamente a HTTPS; verificato `/staff` → `https://www.fisiosalute.it/staff/`.
- Header HSTS senza includeSubDomains, nosniff, SAMEORIGIN, Referrer-Policy, Permissions-Policy e CSP compatibile con gli script inline presenti e Maps.
- Menu Professionisti con pulsante, aria-expanded, tastiera e chiusura con Escape; voce attiva e link Salta al contenuto.
- Ricerca con focus immediato, Escape che chiude e restituisce il focus al pulsante; indice dei contenuti generato automaticamente dopo ogni build.
- Runner restituisce Erika Voltan, Fisioterapia sportiva e Staff.
- Logo Self Defense servito localmente.

Verifiche: 68 file pubblicati confrontati byte per byte, nessuna differenza. Astro check senza errori o warning. Build in cartella temporanea: 63 pagine e 3054 riferimenti locali, nessun problema. Browser su produzione: ricerca funzionante, console senza errori, viewport mobile 390 px senza overflow, menu con aree di tocco di circa 49 px. WordPress PHP e archivi ancora 403; URL inesistente 404.

CSP consente ancora script/style inline perché richiesti dal sito attuale. Non equivale a una policy senza unsafe-inline. HTTP e dominio senza www ricevono un primo redirect dal proxy Aruba verso HTTPS www, poi eventualmente lo slash finale; nessun downgrade HTTP.

Copia precedente delle 62 pagine conservata nella sessione in `/private/tmp/fisio-nav-live`. Pacchetto aggiornamento in `/private/tmp/fisiosalute-navigazione-ricerca.zip`. Il nuovo sito resta statico; nessuna modifica a DNS, database, posta o endpoint privato Instagram.
