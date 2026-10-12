# Collegamento recensioni Google Business Profile

Stato al 5 ottobre 2026: richiesta ricevuta da Google, collegamento non ancora
attivo. ID richiesta di assistenza: `1-0590000041188`. Google indica tempi di
revisione di circa 7-10 giorni lavorativi. La procedura mostra il 100% e conferma
l'apertura della richiesta. L'utente ha confermato il requisito dei 60 giorni;
alla domanda se l'organizzazione possieda già un progetto attivo e consentito
è stato indicato No, trattandosi di una prima richiesta di accesso Business Profile.

Controllo della data: le impostazioni avanzate del profilo non mostrano la data
di verifica. Nella casella dell'account è stata letta la notifica Google My Business
del 10 marzo 2022, ore 12:02, «Ora sei un proprietario di FisioSalute | Studio di
Fisioterapia dott.ssa Erika Voltan». Conferma l'accesso come proprietario in quella
data, non la data di verifica. La ricerca mirata delle email di verifica non ha
trovato una conferma di completamento: non indicare il 10 marzo come data di verifica.

Account verificato in Chrome: Erika Voltan, gestisce FisioSalute a Sondrio.
Progetto aperto: My Maps Project, `northern-gasket-509613-j8`, numero `720933842268`.

Richiesta ufficiale aperta in Chrome:
https://support.google.com/business/workflow/16726127

Scopo della richiesta: recuperare le recensioni pubbliche dell'attività FisioSalute
per visualizzare sul sito https://www.fisiosalute.it le quattro pubblicate più
recentemente. Il codice non modifica il profilo e non invia risposte alle recensioni.

Passaggi ancora necessari:

1. Attendere l'esito della richiesta `1-0590000041188`, inviata il 5 ottobre 2026
   dall'account di Erika per il progetto sopra indicato.
2. Dopo l'esito, verificare la quota delle API:
   zero richieste/minuto indica progetto non approvato.
3. Abilitare le API necessarie, dopo approvazione delle condizioni mostrate da Google.
4. Configurare un client OAuth e autorizzare il collegamento. Google usa lo scope
   `https://www.googleapis.com/auth/business.manage`, che consente anche modifiche:
   il consenso deve essere esplicito anche se il codice usa solo lettura.
5. Individuare tramite API l'account e la sede corretti. Non assumere che gli ID
   visibili negli URL dell'interfaccia siano quelli da utilizzare nell'API.
6. Conservare client ID, client secret, refresh token e percorso della sede soltanto
   nelle variabili private indicate in `.env.example`. Mai nel pacchetto Aruba.
7. Verificare dal vivo il recupero delle recensioni di Sara Scenini ed Ernesto Martina.

Il sito resta statico. In sviluppo recupera i dati durante la preparazione della
pagina; su Aruba serve rigenerare e caricare il sito per aggiornare le recensioni.
La pianificazione di build e pubblicazione resta da configurare, in base all'hosting.

Senza configurazione Business Profile continua a funzionare il collegamento Places
esistente, che restituisce una selezione per rilevanza. Con Business Profile legge
tutte le pagine delle recensioni e ordina per data di pubblicazione, non modifica.
Un errore OAuth/API interrompe la build senza ripiegare silenziosamente su Places.

Riferimenti:
- https://developers.google.com/my-business/content/prereqs
- https://developers.google.com/my-business/content/basic-setup
- https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list

## Nuovo controllo del 5 ottobre 2026

Controllato in Chrome nell’account Erika: la pagina del Centro didattico Business Profile mostra ID richiesta 1-0590000041188, stato «In corso», ultimo aggiornamento «6 h fa». In Gmail dello stesso account, ricerca in tutta la posta del numero pratica: nessun risultato. Ricerca delle notifiche recenti (dal 4 ottobre) per Business Profile, Google My Business, accesso API e numero progetto: nessuna email di approvazione trovata, soltanto una notifica di nuova recensione. Non risulta ancora approvazione; quota Cloud non ricontrollata in questa sessione. Nessuna nuova richiesta inviata e nessuna configurazione modificata.

## Verifica del 6 ottobre 2026

- Google Places: richiesta diretta con la configurazione privata esistente riuscita (HTTP 200). Attività corretta FisioSalute; valutazione 5/5, 205 recensioni totali, 5 recensioni selezionate dall’API.
- Business Profile: nel Centro assistenza dell’account Erika, pratica 1-0590000041188 ancora «In corso», ultimo aggiornamento «1 g fa». Nessuna nuova richiesta inviata.
- Variabili OAuth Business Profile tutte non configurate; test del loader 3/3 superati. Non è stato effettuato un collegamento OAuth né modificato il profilo.
- Mappa sul sito: iframe presente dopo consenso e rimosso al rifiuto, nessun errore console rilevato.
- File pubblico di verifica Google googlef011b7401a30b47d.html raggiungibile e contenuto corretto; non è stata verificata la proprietà dall’interno di Search Console.
- Recensioni online presenti e conteggio 205. Sono HTML statico: nessun aggiornamento automatico su Aruba configurato. Places seleziona per rilevanza, quindi riordinare la selezione per data non garantisce le ultime recensioni dell’attività.
- Nessun Google Analytics o Tag Manager individuato nel codice del sito.

## Aggiornamento manuale delle recensioni — 6 ottobre 2026

Verificate nel profilo Google, ordinato per più recenti, le recensioni di Silvia Paruscio, SARA SCENINI, Ernesto Martina e Maria Camilla Colombini. Pubblicati quattro estratti fedeli con link ai profili/autori Google e data della verifica. La selezione è conservata in `src/data/google-reviews-verified.ts`: Places aggiorna valutazione e conteggio, ma non sostituisce questa selezione con recensioni per rilevanza; Business Profile resta prioritario quando configurato.

Caricati su Aruba solo `index.html` e `search-index.json`, preservando il resto della home online. Entrambi confrontati byte per byte con i file preparati. Verificati i quattro riquadri (griglia statica, due colonne desktop e una mobile), i link Google e l’assenza di errori console o overflow a 390 px. Build e controllo Astro completati senza errori.
