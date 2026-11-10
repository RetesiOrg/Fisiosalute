# Pubblicazione Aruba — Vertigini e revisione titolo ORL — 25 ottobre 2026

Aggiornamenti pubblicati su https://www.fisiosalute.it/ tramite il File Manager Aruba e verificati sul dominio pubblico.

## Contenuti

Ottimizzata la pagina esistente `/servizi/sindromi-vertiginose/`, mantenendone URL e canonical:

- Title: `Trattamento vertigini a Sondrio | FisioSalute`.
- H1: `Trattamento delle vertigini a Sondrio`.
- Descrizione, Open Graph e dati strutturati coerenti con il percorso fisioterapico effettivamente descritto.
- Testi su riabilitazione vestibolare, valutazione fisioterapica, collaborazione ORL quando indicata, sede e contatti del centro.
- Collegamenti descrittivi dalle pagine ORL, dal profilo del Dott. Elio Basso Narducci e dal profilo di Erika Voltan; collegamento di ritorno alla visita ORL.
- Aggiornati i testi delle schede dei servizi e la ricerca interna.

Su successiva indicazione dell’utente, rimossa la dicitura «a Sondrio» dal titolo e dal sottotitolo visibili dell’area Otorinolaringoiatria. Ora l’H1 è `Otorinolaringoiatria` e il sottotitolo è `Visite con l’otorinolaringoiatra per orecchio, naso, gola, udito ed equilibrio.` Il title SEO e la meta description conservano il riferimento locale.

## Verifiche

- `npm run check`: 0 errori, 0 avvisi sulle modifiche alla pagina vertigini.
- Build finale completata dopo la correzione ORL.
- Audit locale e sul sito scaricato via HTTPS: 71 pagine, 3515 riferimenti, 0 problemi.
- Confronto SHA256 finale: tutti i 299 file necessari al sito corrispondono alla build.
- Undici controlli HTTP superati, comprese vertigini, ORL, Psicologia, redirect e pagina 404.
- Verifica nel browser del contenuto vertigini pubblicato e del titolo/sottotitolo ORL corretti.

La build ha utilizzato i dati di recensioni di riserva già disponibili perché l’API Google Places non era raggiungibile dall’ambiente locale.

Non sono stati modificati configurazione Aruba, API, DNS, posta o database. Il pacchetto finale contiene 72 file incrementali: i 71 HTML con l’indice di ricerca condiviso e `search-index.json`.

## Backup e riscontri

Backup prima dell’intervento vertigini: `backups-private/2026-10-25/vertigini/fisiosalute-vertigini-backup-2026-10-25.zip`. Backup prima della correzione ORL: `backups-private/2026-10-25/vertigini/correzione-orl/fisiosalute-vertigini-orl-backup-2026-10-25.zip`. Archivi verificati con controllo CRC e conservati fuori dallo spazio pubblico. Il ripristino di ciascun passaggio consiste nell’estrarre il relativo backup nella radice del sito; non sono stati aggiunti nuovi URL.

Manifest finale: `aruba-vertigini-2026-10-25-manifest.json`. Riscontri HTTPS: `aruba-vertigini-2026-10-25-verifica.json`. Build e pacchetti: `/private/tmp/fisiosalute-vertigini-2026-10-25/`, versione finale nella sottocartella `finale/`.

Non è stata inviata una richiesta Search Console. Le modifiche sono online; la nuova scansione e l’elaborazione dei titoli possono richiedere giorni o settimane secondo la [documentazione Google](https://developers.google.com/search/docs/appearance/title-link). Il posizionamento per una specifica ricerca non è garantito.
