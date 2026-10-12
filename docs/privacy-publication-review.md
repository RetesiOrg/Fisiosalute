# Informative del nuovo sito — revisione prima della pubblicazione

Pagine implementate: /privacy-policy e /cookie-policy. Link nel footer comune e
richiamo privacy vicino al modulo della homepage. Testi riferiti al sito Astro,
non al vecchio WordPress. Nessun aggiornamento pubblicato su Aruba.

Il 2 ottobre 2026 l'utente ha confermato società titolare e sede legale con una
risposta «sì» a una domanda multipla. È stata chiesta una precisazione separata
sull'esistenza del DPO e sul recapito da pubblicare. Non inventare il recapito.

Punti ancora da finalizzare con il titolare/referente privacy:
- Confermati dall’utente: società titolare rappresentata da Erika Voltan e
  assenza attuale di DPO. Entrambi i dati sono inseriti nella Privacy Policy.
- Tempi effettivi di conservazione dei log di Aruba e delle richieste via email;
  i testi attuali esprimono criteri, non scadenze inventate.
- Fornitori effettivi della posta, ruoli, accordi e garanzie per trasferimenti.
- Valutazione del legittimo interesse per sicurezza e ripubblicazione recensioni;
  eventuali dati sanitari nelle recensioni richiedono valutazione specifica.
- Scansione cookie e richieste di rete su hosting finale, prima e dopo interazioni,
  con sessione pulita. Non è stata eseguita una scansione cookie completa.
- Implementato blocco preventivo Google Maps, consenso revocabile dal footer,
  memorizzazione locale per sei mesi. Font Lato e Montserrat ora locali.
  Verificare nuovamente le richieste di rete sul deployment finale.
- Completare inventario cookie effettivamente riscontrati (nome, fornitore,
  finalità, durata) se restano integrazioni che li installano.

Le pagine sono contrassegnate come bozze in PolicyLayout finché questi punti non
sono chiusi. Non importare automaticamente dichiarazioni del vecchio sito su
assenza di DPO, conservazione decennale generalizzata o assenza di trasferimenti.

Riferimenti:
- https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/8981258
- https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876
- https://policies.google.com/privacy?hl=it
- https://policies.google.com/technologies/cookies?hl=it

## Confronto con le informative del vecchio sito

Consultate il 2 ottobre 2026:
https://www.fisiosalute.it/privacy-policy/
https://www.fisiosalute.it/cookie-policy/

La privacy del 15 aprile 2022 indica Erika Voltan come titolare, dichiara assenza
di DPO e di trasferimenti verso paesi terzi, cita marketing/profilazione e una
conservazione di 10 anni per finalità fiscali. Il footer riporta P.IVA 01000440147.
Questi elementi non attestano la situazione attuale della società e non sono
stati trasferiti automaticamente nelle nuove informative. Nella bozza Astro
restano diritti, recapiti, destinatari, finalità e gestione delle richieste,
adattati alle funzioni effettive del sito.

La vecchia Cookie Policy elenca i cookie cookielawinfo-checkbox-* e
viewed_cookie_policy del plugin WordPress, con durata indicata di 11 mesi.
Descrive categorie statistiche, funzionali e preferenze. Non basta questa lista
per dimostrare quali tracker siano effettivamente attivi. Nel nuovo sito questi
cookie non sono implementati: la scelta è salvata in localStorage per sei mesi,
le mappe sono facoltative e i font sono locali. Aggiunto un pulsante di riapertura
delle preferenze anche nel corpo della nuova Cookie Policy.

Esito: conservare le nuove informative specifiche per Astro. Non considerare
il testo del 2022 una conferma dell'attuale assenza di DPO o delle procedure
operative della società. La verifica riguarda testi e codice, non è una scansione
completa dei cookie installati dal vecchio sito.

Successiva risposta «y»: interpretata come conferma alla domanda esplicita
sull’assenza attuale di DPO; non risolve la scelta tra i due possibili titolari.
La denominazione del titolare nella bozza resta invariata in attesa di chiarimento.

L’utente ha successivamente scelto esplicitamente l’opzione 2: FisioSalute di
Erika Voltan S.r.l. unipersonale, rappresentata da Erika Voltan. La Privacy Policy
è stata aggiornata; il dubbio precedente sul titolare è risolto.

## Verifica dopo pubblicazione su Aruba — 5 ottobre 2026

Controllati direttamente via HTTPS /privacy-policy/, /cookie-policy/, /contatti/, /news/ e /api/instagram.json con parametro anti-cache. Tutti HTTP 200, identici al build pubblicato. Nessun header Set-Cookie nelle cinque risposte. La copia del motore di ricerca mostra ancora il vecchio WordPress: non usarla per valutare le informative attuali.

Esito: i testi descrivono correttamente le principali funzioni Astro, ma richiedono aggiornamenti prima di essere considerati definitivi:
- PolicyLayout mostra ancora “Versione del 2 ottobre 2026 · Bozza in revisione prima della pubblicazione”. Aggiornare data e stato dopo aver chiuso la revisione.
- Privacy §5: sostituire “hosting previsto” con hosting effettivo Aruba S.p.A.; distinguere hosting italiano dai servizi Google/Meta. Aruba dichiara data center italiani per hosting; le condizioni generali art.23 disciplinano il ruolo di responsabile/sub-responsabile. Verificare la documentazione contrattuale applicabile all’account.
- Privacy §5 e Cookie §4: le immagini Instagram attuali sono locali (images/instagram/Dd6LaopDVUv.jpg e Dd5xyyFjhbG.jpg); anche il codice dell’updater PHP copia le immagini sul server. Specificare che le anteprime non richiedono il caricamento delle immagini dai server Meta nel browser.
- Confermare tempi effettivi di conservazione dei log e delle richieste, inventario cookie di Google Maps nella sessione/browser applicabile e revisione del trattamento delle recensioni contenenti informazioni sanitarie. Il controllo degli header non sostituisce una scansione completa delle richieste e dello storage del browser.

Verifica codice: Google Maps viene creato solo con maps=true, rimosso alla revoca; rifiuto e personalizzazione presenti; localStorage tecnico fisiosalute-consent-v1, versione 1, scadenza sei mesi. Nessun Analytics/Meta Pixel trovato nel codice controllato; font locali; form mailto e ricerca elaborati nel browser. La migrazione hosting da sola non richiede una nuova categoria di consenso per i log tecnici.

Il titolare societario e l’assenza attuale di DPO sono stati confermati dall’utente nei passaggi precedenti; la verifica non rivaluta l’obbligo di nomina in relazione all’organizzazione sanitaria.

Nessuna modifica alle policy pubbliche eseguita in questa verifica.
Fonti: https://www.aruba.it/gdpr-regolamento-europeo-privacy.aspx ; https://hosting.aruba.it/documents/tc-files/it/28_it_condizionifornituraserviziohostingarubav-3-9.pdf ; https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876 .

### Correzione Aruba pubblicata — 5 ottobre 2026

Su richiesta dell’utente aggiornata e pubblicata soltanto la parte hosting della Privacy Policy: hosting effettivo Aruba S.p.A., infrastruttura e dati tecnici, ruolo di responsabile secondo le condizioni contrattuali e articolo 28 GDPR, data center italiani secondo la dichiarazione ufficiale Aruba, distinzione dai servizi esterni Google/Meta. Aggiunto collegamento alla fonte ufficiale. Pagina online HTTP 200 identica alla build; nessun nuovo asset. Versione precedente salvata privatamente. Gli altri punti della revisione restano aperti.
