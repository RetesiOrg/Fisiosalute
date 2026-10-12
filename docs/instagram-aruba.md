# Instagram su Aruba

## Stato verificato — 5 ottobre 2026

Collegamento attivo del profilo professionale `_fisiosalute_` all’app FisioSalute News. L’utente ha confermato lettura e conservazione del token nella cartella privata Aruba, creato personalmente l’app e accettato l’invito tester. Dopo il nuovo accesso, disattivati esplicitamente i quattro permessi facoltativi: commenti, messaggi, pubblicazione e insight. Il debugger ufficiale Meta conferma token valido con la sola autorizzazione `instagram_business_basic`, scadenza 1796395612 (circa due mesi), scadenza accesso dati 1798987610 (circa tre mesi).

Identificativi non segreti:
- App Meta FisioSalute News: 1388729233346912.
- App Instagram FisioSalute News-IG: 1622050706603938.
- Account Instagram per endpoint media: 17841439825582438.

Configurazione salvata direttamente in `api/_private/config.php` su Aruba, senza includere token o chiave cron nei sorgenti, negli archivi o in questo documento. API Instagram Login v23.0; chiave cron casuale da 32 byte. File privati protetti da `.htaccess`: config.php e state.json restituiscono HTTP 403. Endpoint senza chiave restituisce 403.

Prima sincronizzazione reale riuscita: HTTP 200, `ok:true`, due post, aggiornamento 2026-10-05T14:48:49+00:00. Feed pubblico e foto locali verificati HTTP 200. Foto Nicolussi 112063 byte; formazione 873566 byte. Pagina produzione https://www.fisiosalute.it/news/ verificata in Chrome: entrambe le foto caricate, date corrette e link allineati.

## Cron e rinnovo

Cron Aruba aggiunto e confermato dal pannello: **Aggiorna news Instagram FisioSalute**, tipo PHP, percorso `./api/update-instagram.php`, ogni ora al minuto 0 UTC. Nessun altro cron presente. La prima esecuzione pianificata non è ancora avvenuta durante la verifica; il primo aggiornamento è stato eseguito via HTTPS autenticato. Esito e log si controllano in Hosting Linux > Processi Cron. Il comando PHP evita una chiave privata nell’URL del cron.

Lo script PHP 7.4 scarica i due post più recenti restituiti dall’API, incluse copertine video, e salva foto e feed locali. Il feed precedente rimane intatto se un aggiornamento fallisce. La pagina legge il JSON senza ricompilare Astro. Il token Instagram Login viene rinnovato settimanalmente dopo il primo aggiornamento riuscito. Revoca, scadenza già avvenuta o richieste Meta di nuova autorizzazione richiedono un nuovo collegamento; non promettere funzionamento indefinito senza controlli.

## Limite dei post collaborativi

L’API `/media` restituisce come due più recenti Nicolussi (30 settembre 2026) e formazione (27 settembre 2026). Verificati i primi 25 risultati direttamente dall’API. Il post MGM `Dd6LaopDVUv`, pubblicato da `mgm2000_morbegno` in collaborazione con `_fisiosalute_`, è visibile sul profilo ma assente dai risultati. Confermati gli autori in Chrome. Il tentativo di lettura `collaborative_media` con Instagram Login v26.0 restituisce campo inesistente (HTTP 400, codice 100); nessun nuovo permesso concesso.

L’utente ha scelto esplicitamente «Solo post automatici». Produzione usa quindi esclusivamente i due post più recenti restituiti dall’API, senza integrare manualmente MGM. Il feed manuale precedente e le foto di MGM/Nicolussi rimangono nei sorgenti e nell’anteprima `/new/`; non sono cancellati.

## Verifiche locali precedenti

`node --test tests/instagram-feed.test.mjs`: 3 test passati. `npm run check`: zero errori. `tests/instagram-sync.php` con PHP WASM 7.4: ordinamento, copertine video, conservazione del feed su errore, URL immagini e rinnovo token passati. La connessione reale Meta e cURL su Aruba è ora verificata dal primo aggiornamento riuscito.

Google Business Profile rimane in attesa dell’approvazione; questa configurazione non modifica le recensioni. Il nuovo sito Astro è in produzione; il vecchio WordPress è conservato nei backup privati.
