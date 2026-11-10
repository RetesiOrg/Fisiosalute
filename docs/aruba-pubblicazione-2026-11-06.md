# Pubblicazione Aruba — 6 novembre 2026

Pubblicazione completata su https://www.fisiosalute.it/ tramite il File Manager Aruba, sessione Chrome Erika, nella radice del dominio.

La pagina «Altri professionisti» presenta la foto di Enrico Francesco Pillitteri accanto alla biografia, con sfondo grigio chiaro coordinato alla fotografia di Elisa Pedrolini. Sono pubblicate anche le varianti responsive e l’indice di ricerca aggiornato.

Il confronto completo della build con il sito online ha individuato cinque file da aggiornare:

- `altri-professionisti/index.html`
- `images/enrico-francesco-pillitteri-grigio.webp`
- `images/responsive/enrico-francesco-pillitteri-grigio-480.webp`
- `images/responsive/enrico-francesco-pillitteri-grigio-800.webp`
- `search-index.json`

Gli altri file necessari al sito corrispondevano già alla build. Archivio pubblicato: `fisiosalute-pubblicazione-2026-11-06.zip`, estratto nella cartella corrente con sostituzione dei file.

## Verifiche

- Astro check: 43 file, zero errori, avvisi o suggerimenti.
- Build completata: 71 pagine.
- Audit locale e sull’HTML scaricato dal sito pubblico: 71 pagine, 3519 riferimenti, zero problemi.
- Verifica HTTPS: 303 file con risposta HTTP 200 e SHA256 identico alla build, inclusi tutti e cinque i file aggiornati.
- Verifica visiva in Chrome del profilo pubblicato e della foto con sfondo grigio.

La build ha utilizzato i dati di riserva delle recensioni perché Google Places non era raggiungibile dall’ambiente locale. Il confronto ha confermato che la homepage pubblicata era già identica alla build; i feed dinamici esistenti restano attivi.

## Backup e ripristino

Copia preventiva dei 300 file pubblici preesistenti in `backups-private/2026-11-06/pubblicazione/snapshot/`. Archivio dei file preesistenti sostituiti: `backups-private/2026-11-06/pubblicazione/fisiosalute-backup-2026-11-06.zip`, verificato con controllo CRC. Per ripristinare i testi e il profilo precedenti, estrarre questo archivio nella radice del sito; le nuove immagini rimangono prive di riferimenti dopo il ripristino.

Manifest: `aruba-pubblicazione-2026-11-06-manifest.json`. Verifica HTTPS: `aruba-pubblicazione-2026-11-06-verifica.json`. Audit pubblico: `aruba-pubblicazione-2026-11-06-audit.json`. Pacchetto e copia pubblica verificata: `/private/tmp/fisiosalute-release-2026-11-06/`.
