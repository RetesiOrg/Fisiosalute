# Accesso Google Business Profile — verifica del 22 ottobre 2026

Verifica in Chrome, account Erika, in sola lettura.

- Il progetto **FisioSalute Website**, `lunar-nuance-509613-u5`, ha My Business Account Management API attivata ma quota Requests per minute = **0**.
- Email Google del **15 ottobre 2026**, pratica `5-2008000041676`: la richiesta è stata identificata come duplicata; Google consente un solo progetto per attività e indica il numero progetto **720933842268** come già attivo per `https://www.fisiosalute.it`. Google chiede di utilizzare il progetto già approvato.
- Il progetto da usare è quindi **My Maps Project**, `northern-gasket-509613-j8`, numero **720933842268**, relativo alla prima richiesta `1-0590000041188`. Non attendere l'approvazione del secondo progetto né inviare altre richieste duplicate.
- Aprendo la pagina quote di My Business Account Management API nel progetto approvato, Google reindirizza alla libreria e mostra **abilita questa API**. L'API non è ancora abilitata; la quota di questo progetto non è stata verificata. Nessun pulsante di abilitazione premuto, nessun consenso OAuth concesso.
- Endpoint pubblici Aruba verificati nella stessa sessione: `/api/google-reviews.php` HTTP 503 `not_available`; `/api/update-google-reviews.php` HTTP 503 `not_configured`. Home ancora con i quattro estratti del 6 ottobre e conteggio 208.

Prossimi passaggi: usare il progetto approvato; abilitare le API necessarie con le accettazioni richieste; configurare e autorizzare OAuth; individuare account e sede tramite API; configurare i segreti privati e il cron Aruba; verificare il recupero delle quattro recensioni con testo più recenti. L'approvazione del progetto non equivale al collegamento operativo del sito.

Riferimento Google sul significato della quota 0/300 QPM:
https://developers.google.com/my-business/content/prereqs

## Attivazione avviata su richiesta dell’utente

- Accettazione termini Google APIs e Business Profile API confermata esplicitamente dall’utente in chat.
- My Business Account Management API abilitata nel progetto approvato; quota **300 richieste/minuto** verificata in console.
- Eseguita l’abilitazione di My Business Business Information API e Google My Business API; Google ha reindirizzato alle pagine dettagli servizio. Verifica finale dell’elenco API ancora da completare.
- Identità OAuth **FisioSalute Recensioni** creata, contatto account Erika, pubblico esterno. Norme sui dati utente accettate dopo conferma esplicita.
- Modulo client web **FisioSalute Recensioni Aruba** compilato con redirect `http://127.0.0.1:8765/oauth/callback`; creazione ancora in attesa di conferma. Nessun accesso OAuth alla scheda ancora concesso.
- Test JavaScript integrazione: **5/5 superati**. Test PHP non eseguito localmente perché l’interprete PHP non è disponibile.

## Collegamento Google completato, caricamento Aruba in preparazione

- Creazione client OAuth confermata dall’utente; JSON conservato in `backups-private/google-business-2026-10-22/` (ignorata da Git, permessi privati).
- Branding salvato con sito e privacy FisioSalute. Passaggio **In produzione** confermato dall’utente e verificato in console.
- Consenso continuativo `business.manage` confermato dall’utente e completato. Il codice usa solo lettura. Refresh token ricevuto e scambio token verificato.
- Account e sede recuperati via API e verificati per nome e indirizzo di FisioSalute a Sondrio. Configurazione completa salvata nel `.env` privato e in `aruba/api/_private/google-config.php` (ignorati da Git).
- Recupero reale con il loader esistente riuscito: **5/5, 208 recensioni**; quattro pubblicazioni con testo più recenti: Matteo Galli (13 ottobre), Sara Muffatti (12 ottobre), Davide Pozzoni (8 ottobre), valentina contrio (7 ottobre).
- Cartella server `/api/_private/` e file esempio: **HTTP 403** verificato prima del caricamento. File Manager aperto nella directory corretta; il file `google-config.php` non è presente sul server. Upload delle credenziali ancora in attesa di conferma specifica.

## Attivazione completata sul sito live

- Upload del solo `google-config.php` nella directory server `/api/_private/` confermato esplicitamente dall’utente ed eseguito tramite File Manager Aruba. Presenza del file di 643 byte verificata nel pannello.
- Configurazione privata: **HTTP 403**; aggiornamento senza chiave: **HTTP 403**.
- Primo aggiornamento HTTPS con `X-Cron-Key`: **HTTP 200**, `ok: true`, quattro recensioni. Cache aggiornata il **22 ottobre 2026 alle 15:00:31 Europe/Rome** (13:00:31 UTC).
- Feed pubblico `/api/google-reviews.php`: **HTTP 200**, quattro autori nuovi, voto 5 e conteggio 208. Assenza di client secret, refresh token e chiave cron verificata nel JSON pubblico.
- Cron Aruba **Aggiorna recensioni Google FisioSalute** creato e confermato dal pannello: tipo **PHP**, comando `./api/update-google-reviews.php`, espressione **`0 */6 * * *`**, ore 00:00, 06:00, 12:00 e 18:00 UTC. Nessun segreto nell’URL o nel comando. Cron Instagram preesistente conservato.
- La prima esecuzione pianificata del nuovo cron non è ancora avvenuta durante la verifica; il primo aggiornamento è stato eseguito via HTTPS autenticato. Controllare gli esiti successivi in Hosting Linux > Processi Cron.
- Verifica reale in Chrome sulla homepage pubblica: presenti Matteo Galli, Sara Muffatti, Davide Pozzoni e valentina contrio, date corrette e attribuzione “Recensioni fornite da Google · aggiornate il 22 ottobre 2026”. Riquadri verificati visivamente. Google restituisce nei commenti anche la traduzione inglese, attualmente conservata integralmente.
- Nessuna ripubblicazione della homepage o degli asset necessaria: lo script già online legge il feed funzionante. Senza JavaScript o con feed indisponibile resta il fallback statico datato.

## Visualizzazione del solo originale — 22 ottobre 2026

Su richiesta dell’utente eliminata dalla visualizzazione la traduzione automatica aggiunta da Google. La libreria PHP rimuove solo le sezioni marcate da Google e conserva l’originale nella lingua dell’autore; la stessa logica è applicata al loader della build. Non vengono tradotti i commenti né modificati i contenuti della scheda Google.

Pubblicata su Aruba la sola `api/_private/google-reviews-lib.php` e rigenerata la cache tramite aggiornamento autenticato. Feed HTTP 200 con quattro originali senza il marcatore di traduzione; homepage verificata in Chrome dopo ricaricamento. Il cron ogni sei ore mantiene la nuova elaborazione.

Test JavaScript: 6/6 superati, con dieci casi sui formati di traduzione, paragrafi, accenti e recensioni in altre lingue. Aggiunti gli stessi casi al test PHP; PHP non disponibile localmente e Docker non avviato, quindi il test PHP locale non è stato eseguito. La libreria PHP pubblicata è stata verificata sul feed reale Aruba.

Backup precedente della libreria: `backups-private/google-business-2026-10-22/original-text/google-reviews-lib-before.php`. Report pubblico senza testi o segreti: `google-reviews-original-text-2026-10-22.json`.
