# Pubblicazione Aruba — 10 novembre 2026

Pubblicazione completata su https://www.fisiosalute.it/ tramite il File Manager Aruba, sessione Chrome Erika, nella radice del dominio.

Novità: nuova pagina «Seduta di supporto psicologico per la coppia» (`/servizi/supporto-psicologico-coppia/`), collegata da Servizi e presente in sitemap e indice di ricerca. Le altre pagine cambiano nel markup e nei dati di navigazione/ricerca, senza variazioni nel testo visibile.

Archivio pubblicato: `/private/tmp/fisiosalute-release-2026-11-10/fisiosalute-pubblicazione-2026-11-10.zip`, 74 file (72 pagine HTML, `search-index.json`, `sitemap.xml`), estratto nella cartella corrente con sostituzione dei file. Nessun CSS, JavaScript o immagine nell'archivio: i 292 riferimenti a risorse locali delle pagine rispondevano già HTTP 200 sul sito pubblico prima della pubblicazione.

## Verifiche

- Il File Manager ha restituito «Risposta non valida dal backend. I dati non sono nel formato JSON.» dopo l'estrazione; l'estrazione è comunque avvenuta.
- Verifica HTTPS: 74 file su 74 con risposta HTTP 200 e contenuto identico all'archivio (confronto byte per byte).
- Nuova pagina HTTP 200, titolo corretto, collegata due volte da /servizi/. Pagina inesistente: 404 personalizzata. Archivi ZIP nella radice: HTTP 403.
- Controllo visivo in Chrome della nuova pagina.

## Backup e ripristino

Copia HTTPS dei 73 file pubblici preesistenti sostituiti in `backups-private/2026-11-10/pubblicazione/snapshot/`. Archivio: `backups-private/2026-11-10/pubblicazione/fisiosalute-backup-2026-11-10.zip`, verificato con controllo CRC. Per ripristinare, estrarre l'archivio nella radice del sito ed eliminare `servizi/supporto-psicologico-coppia/`.

## Versione 1.5.1 — footer con versione e data

Su richiesta dell'utente aggiunte al footer la versione (da `package.json`) e la data della build: «Versione 1.5.1 · Aggiornato il 10 novembre 2026». Schema delle versioni e storico ricostruito in `CHANGELOG.md`.

Pacchetto `/private/tmp/fisiosalute-release-2026-11-10/fisiosalute-footer-versione-2026-11-10.zip`, 72 pagine HTML, estratto nella radice con sostituzione. Stesso errore «Risposta non valida dal backend» del File Manager, estrazione comunque avvenuta. Astro check zero errori/warning, audit 72 pagine senza problemi; differenze rispetto alla versione online limitate alla riga del footer. Verifica HTTPS: 72 file su 72 identici alla build; 404 personalizzata e ZIP in radice (403) verificati.

Ripristino alla 1.5.0: estrarre nella radice `fisiosalute-pubblicazione-2026-11-10.zip`, ancora presente sul server.
