# Recensioni Google automatiche su Aruba

Stato al 9 ottobre 2026: gli endpoint PHP e la libreria sono installati su Aruba in `/api/`; la regola `.htaccess` consente i due endpoint. Verificati: home HTTP 200, cartella privata HTTP 403, lettura recensioni HTTP 503 `not_available`, aggiornamento HTTP 503 `not_configured`. Mancano approvazione/accesso Google Business Profile, credenziali OAuth, configurazione cron e pubblicazione del frontend aggiornato. Il 9 ottobre 2026, su istruzione dell’utente, è stata completata e inviata la richiesta di accesso per FisioSalute Website, numero progetto `352416521067`, dall’account Erika. Google ha confermato la ricezione con ID richiesta `5-2008000041676` e indica circa 7–10 giorni lavorativi per la revisione. Il requisito di scheda verificata da oltre 60 giorni è stato confermato dall’utente. Attendere la risposta a questa pratica senza nuove richieste duplicate. Places API e la relativa chiave non autorizzano le API Business Profile. Verifica in Chrome Erika: My Business Account Management API abilitata su FisioSalute Website (`lunar-nuance-509613-u5`), quota Requests per minute = 0. Secondo Google, quota 0 significa progetto non ancora approvato; non richiedere un semplice aumento quota né duplicare la richiesta esistente.

## Comportamento

Verifica del 12 ottobre 2026 in Chrome, account Erika: My Business Account
Management API mostra servizio «Attivato», ma la quota «Requests per minute»
è ancora 0 nel progetto FisioSalute Website. L'accesso Business Profile non
risulta quindi ancora approvato. Lo stato della pratica `5-2008000041676`
non è stato verificato: la lettura del Centro assistenza è stata interrotta
da un errore tecnico 429 della revisione automatica. Nessuna richiesta duplicata
inviata e nessuna configurazione Google modificata.

Un cron ogni sei ore recupera tutte le pagine delle recensioni, seleziona le quattro più recenti con testo per data di pubblicazione (senza filtrare per voto), e aggiorna voto medio e conteggio. Il sito legge `api/google-reviews.php` senza ripubblicare le pagine e senza chiamare Google dal browser. Il testo è inserito come testo, mai come HTML.

La cache è privata, aggiornata in modo atomico e valida al massimo 24 ore. Un errore non sovrascrive l'ultima cache valida; una cache scaduta viene rimossa alla lettura o all'aggiornamento. Se il feed non è disponibile, rimangono gli estratti statici con la loro data di verifica. Senza JavaScript si vedono gli estratti statici. La lettura pubblica non esegue chiamate Google e non espone credenziali. Per la gestione dell'accesso e della cache consultare anche le policy Business Profile: https://developers.google.com/my-business/content/policies.

## Google: prerequisiti prima dell'attivazione

1. Usare il progetto **FisioSalute Website**, ID `lunar-nuance-509613-u5`, nell'account Erika che gestisce la scheda verificata.
2. Verificare/richiedere l'approvazione alle API Business Profile. Il numero progetto numerico richiesto nel modulo si trova nella dashboard Google Cloud; non è l'ID alfanumerico. Google indica quota 0 QPM come non approvata e 300 QPM come approvata: https://developers.google.com/my-business/content/prereqs.
3. Abilitare le API Business Profile necessarie (Google My Business API per le recensioni, Account Management e Business Information per trovare account/sede).
4. Configurare il consenso OAuth e un client OAuth. Richiedere l'accesso offline con scope `https://www.googleapis.com/auth/business.manage`, poi ottenere un refresh token con il consenso dell'account Erika. Non usare la chiave Places come token OAuth. Evitare una configurazione OAuth che faccia scadere il refresh token dopo sette giorni (app esterna in testing); completare il percorso di produzione/verifica richiesto dalla console.
5. Individuare la risorsa della sede `accounts/ACCOUNT_ID/locations/LOCATION_ID`; non usare CID o Place ID. La lista recensioni funziona per sedi verificate: https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list.

## Installazione sul server

Caricare i due endpoint PHP e la libreria in `api/`, conservando le altre integrazioni. Caricare `_private/.htaccess` con `Require all denied` PRIMA delle credenziali. Verificare che una richiesta HTTP a un file di prova in `_private/` restituisca 403.

Copiare `_private/google-config.example.php` in `_private/google-config.php` e compilare client ID, client secret, refresh token e location. Creare una chiave cron casuale separata di almeno 32 caratteri (esempio locale: `openssl rand -hex 32`). Usare permessi 600 per configurazione e cache quando disponibili; PHP deve poter scrivere nella directory privata. Non caricare `.env`, non incollare segreti nella chat e non includerli negli archivi di rilascio.

Il pacchetto produzione consente questi soli endpoint Google nella `.htaccess` principale, prima del blocco generale PHP:

```apache
RewriteRule ^api/(?:update-instagram|update-google-reviews|google-reviews)\.php$ - [L]
```

La pagina deve includere il nuovo script frontend: il solo upload dei PHP non aggiorna la homepage esistente. Pubblicare anche la build aggiornata e i suoi asset. In una prova sotto `/new/`, i PHP vanno sotto `/new/api/` e l'endpoint del cron deve usare lo stesso percorso.

## Cron Aruba

Nel pannello Hosting Linux > Processi Cron, programmare ogni sei ore la chiamata HTTPS a:

```text
https://www.fisiosalute.it/api/update-google-reviews.php?key=CHIAVE_CRON
```

La chiave nell'URL può comparire nei log del cron/server: trattare l'URL come un segreto. Se lo scheduler permette header, preferire `X-Cron-Key` e omettere `?key=...`. Se è disponibile il cron CLI sul server, eseguire direttamente PHP sul percorso effettivo di `api/update-google-reviews.php` (non serve chiave nella riga di comando).

Guida Aruba: https://guide.aruba.it/hosting-e-domini/hosting/hosting-linux/pannello-controllo-linux/processi-cron. Verificare nel piano effettivo quali modalità e frequenze sono disponibili. Non pianificare il cron finché le credenziali non sono complete.

## Verifica e manutenzione

- Primo aggiornamento autenticato: risposta `ok: true`, quattro recensioni o meno.
- `api/google-reviews.php`: restituisce solo voto, conteggio, autori/testi pubblici e data aggiornamento; nessun token.
- Aggiornamento senza chiave: HTTP 403; configurazione non presente: HTTP 503.
- Sito: ultime quattro recensioni con testo e data, nell'ordine corretto. Conteggio comprensivo anche delle recensioni senza testo.
- Un guasto OAuth/API mantiene la cache per massimo 24 ore e restituisce un errore generico; verificare gli esiti del cron e rinnovare l'autorizzazione se revocata.
- Prima di sostituire il sito live, salvare il rilascio e la `.htaccess` esistenti. Un rilascio successivo non deve cancellare `api/_private/google-config.php` o la cache attiva.


Cronologia Codex recuperata il 9 ottobre 2026: una precedente richiesta era stata inviata il 5 ottobre 2026 con ID `1-0590000041188` per **My Maps Project**, ID `northern-gasket-509613-j8`, numero `720933842268` (vedi `google-business-reviews-setup.md`). Nella cronologia del 5 ottobre risultava “In corso”; questo non è uno stato verificato oggi. La richiesta del 9 ottobre `5-2008000041676` riguarda invece **FisioSalute Website**, numero `352416521067`.
