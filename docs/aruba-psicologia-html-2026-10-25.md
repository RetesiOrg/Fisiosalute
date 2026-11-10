# Pubblicazione Aruba — Psicologia, HTML e SEO ORL — 25 ottobre 2026

Pubblicazione completata su https://www.fisiosalute.it/ tramite il File Manager Aruba, nella radice del dominio. Verificati via HTTPS 299 file necessari al sito: SHA256 identico alla build definitiva, nessun errore. Audit ripetuto sull’HTML pubblico: 71 pagine e 3513 riferimenti locali senza problemi. Dieci controlli HTTP superati, comprese le nuove pagine di Psicologia, le due pagine ORL, i redirect HTTPS/www e la risposta 404 personalizzata.

## Contenuti pubblicati

- Area Psicologia, quattro schede di servizio e profilo di Enrico Francesco Pillitteri, con la biografia versione 3 del documento fornito.
- Tag HTML semantici, gerarchia dei titoli, metadati SEO/social, JSON-LD, correzione degli attributi duplicati delle immagini, date e moduli.
- Adeguamento del menu alla fascia di schermi fino a 900 px, verificato visivamente sul dominio pubblico.
- Ottimizzazione locale delle pagine ORL, mantenendo gli URL già esistenti.

| Pagina | Title | H1 |
| --- | --- | --- |
| `/servizi/area/otorinolaringoiatria/` | Otorinolaringoiatra a Sondrio &#124; FisioSalute | Otorinolaringoiatria a Sondrio |
| `/servizi/otorinolaringoiatria/` | Visita otorinolaringoiatrica a Sondrio &#124; FisioSalute | Visita otorinolaringoiatrica a Sondrio |

Le pagine ORL includono riferimenti naturali a otorinolaringoiatra, otorino, visita ORL, Sondrio e Valtellina, il medico effettivamente presente, indirizzo e contatti del centro. Il profilo del Dott. Elio Basso Narducci rimanda sia all’area sia alla visita; la scheda rinvia alla riabilitazione delle sindromi vertiginose. Sono aggiornati anche i testi delle schede in homepage e l’indice di ricerca.

Sono state pubblicate una release iniziale e una release finale comprensiva delle successive richieste ORL. L’ultimo pacchetto è `fisiosalute-psicologia-html-2026-10-25-v3.zip`, 73 file incrementali rispetto alla prima release. La verifica finale riguarda l’intero insieme di 299 file attivi necessari al sito, comprese le risorse preesistenti.

Nessuna modifica a `.htaccess`, `robots.txt`, API, credenziali, feed dinamici, DNS, posta o database. Non sono stati caricati sorgenti, documenti privati o file di configurazione. Le immagini esistenti corrispondevano già alle copie online e non hanno richiesto sostituzione.

## Backup e ripristino

Backup originale dei 68 file pubblici preesistenti sostituiti: `backups-private/2026-10-25/psicologia-html/fisiosalute-backup-2026-10-25.zip`. Backup del passaggio finale: `backups-private/2026-10-25/psicologia-html/finale-orl/fisiosalute-backup-2026-10-25-v3.zip`. Archivi controllati con test CRC, conservati fuori dallo spazio pubblico.

Per ripristinare la versione precedente all’intervento, estrarre il primo backup nella radice del sito. Per revocare anche le pagine nuove, archiviare separatamente le cinque cartelle relative a Psicologia e alle sue prestazioni. Le risorse aggiuntive non più referenziate possono rimanere sul server. API e configurazioni non richiedono ripristino.

Manifest finale: `aruba-psicologia-html-2026-10-25-manifest.json`. Riscontri HTTPS: `aruba-psicologia-html-2026-10-25-verifica.json`. Build, pacchetti e file di confronto: `/private/tmp/fisiosalute-release-2026-10-25/`, con la versione definitiva nella sottocartella `v3/`.

## Visibilità su Google

Le modifiche al sito sono online. Non è stata inviata una nuova richiesta tramite Search Console in questo intervento. La presenza e il posizionamento delle pagine nelle ricerche dipendono dalla scansione, dall’indicizzazione e dai sistemi di Google.

Google non usa il [tag meta keywords per il ranking](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag). La documentazione sui [titoli dei risultati](https://developers.google.com/search/docs/appearance/title-link) raccomanda titoli descrittivi e concisi e spiega che una nuova scansione ed elaborazione può richiedere giorni o settimane. Per valutare l’assenza della pagina dai risultati occorre controllarne lo stato effettivo nella proprietà Search Console del dominio; una ricerca pubblica da sola non permette di confermare l’indicizzazione.
