# Favicon — 13 ottobre 2026

Sostituito public/favicon.webp con una copia esatta di public/brand/FisioSalute_logo-1.webp. Il layout esistente punta già a /favicon.webp. Verificata identità dei file, SHA256 1bc911b486c97045590ba00801517b47f6d335bf108f6731f0096054b3be4b16.

Copia della precedente favicon in backups-private/2026-10-13/favicon/favicon.webp.

Pubblicata la sola favicon.webp nella radice www.fisiosalute.it tramite File Manager Aruba, dopo autorizzazione esplicita dell’utente per l’accesso alla schermata. Confermata sostituzione del file esistente. Verifica HTTPS: HTTP 200, contenuto identico al logo locale (SHA256 e confronto byte per byte). Nessuna modifica agli altri file del sito.

## Versione definitiva: solo simbolo

Su richiesta dell’utente, favicon sostituita con l’immagine public/Favicon.png (291 × 291), convertita in WebP lossless: 9831 → 2966 byte, con pixel RGBA identici. Pubblicata la sola favicon.webp tramite File Manager Aruba. Verifica pubblica HTTPS HTTP 200 e contenuto identico al file locale. Versione con logo completo conservata in backups-private/2026-10-13/favicon/favicon-logo-completo.webp.

## Ricaricamento e formato PNG

In seguito alla segnalazione di icona precedente ancora visibile, verificata risposta HTTPS 200 di /favicon.webp: SHA256 identico alla versione definitiva con solo simbolo. Le pagine richiamavano ancora lo stesso URL WebP. Aggiornato BaseLayout per usare /Favicon.png?v=20261013, type image/png e dimensioni 291x291: immagine originale fornita dall’utente, percorso distinto per evitare il riuso della cache precedente.

Pubblicate le 66 pagine HTML, i due asset Astro e Favicon.png tramite archivio fisiosalute-favicon-refresh-2026-10-13.zip nel File Manager Aruba. Backup dei 69 file e delle risorse referenziate in backups-private/2026-10-13/pre-favicon-refresh. Verifica SHA256 HTTPS dei 69 file pubblicati. Manifest e report aruba-favicon-refresh-2026-10-13-*.json. Build e audit completati: nessun errore nei 3205 riferimenti.
