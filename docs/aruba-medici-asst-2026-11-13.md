# Medici ASST e sfondo bianco — 13 novembre 2026

Versione 1.6.0. Su richiesta dell'utente aggiunti alla pagina equipe-medica due ortopedici in servizio presso ASST Valtellina e Alto Lario, dopo Giuffrida e prima di Paiusco.

## Vincolo ASST

La convenzione con ASST non consente di pubblicizzare il nome dei medici. Per questo:

- nessun nome né iniziali: le schede si intitolano «Medico ortopedico», ruolo «ASST Valtellina e Alto Lario»; slug, ancore e file immagine sono neutri (`ortopedico-asst-1`, `ortopedico-asst-2`);
- volto con sfocatura leggera, quasi simbolica (richiesta della titolare dopo una prima versione più marcata);
- avviso in evidenza nella scheda: per informazioni e prenotazioni contattare la segreteria FisioSalute; collegamento «Contatta la segreteria»;
- rimossi i nomi completi dei due medici dalle keyword meta (`src/data/professional-tags.ts`). Verificato che la build non contenga i nomi completi.

Le foto originali non sfocate sono conservate solo in `backups-private/2026-11-13/medici-asst-originali/` (esclusa da git: i repository sono pubblici). Non pubblicarle e non aggiungerle al repository.

## Sfondo bianco

Tutte le sei foto dei medici scontornate (rembg, modello u2net, alpha matting) e composte su bianco puro. Inquadratura M. B. ritagliata a 1179 × 1376 come le altre; regolazioni CSS per allineare altezza e dimensione dei volti. Foto precedenti in `backups-private/2026-11-13/foto-medici-prima-sfondo-bianco/`.

## Verifiche

Astro check zero errori/warning, build completata, audit HTML senza problemi. Controllo visivo in Chrome headless a 1600 px e a larghezza mobile.

## Pubblicazione

Pubblicazione completata il 13 novembre 2026 su https://www.fisiosalute.it/ tramite il File Manager Aruba, sessione Chrome Erika, nella radice del dominio. Backup preventivo eseguito dall'utente prima della pubblicazione.

Il pacchetto `/private/tmp/fisiosalute-release-2026-11-13/fisiosalute-medici-asst-2026-11-13.zip` (539 file, 27,5 MB) supera il limite di 10 MB per upload dell'estensione Chrome: è stato diviso, con gli stessi 539 file, in quattro archivi da circa 7 MB (`fisiosalute-medici-asst-2026-11-13-parte1.zip` … `parte4.zip`, copia in `/private/tmp/fisiosalute-release-2026-11-13/parti/`), caricati ed estratti nella cartella corrente con sostituzione. Gli archivi restano sul server (HTTP 403 dall'esterno).

- Il File Manager ha restituito il solito «Risposta non valida dal backend. I dati non sono nel formato JSON.»; in due casi l'upload non era però avvenuto ed è stato ripetuto dopo aver ricaricato il File Manager. Dopo ogni operazione verificare la presenza e la dimensione del file.
- Verifica HTTPS: 539 file su 539 identici alla build (SHA256).
- Home ed equipe-medica HTTP 200, pagina inesistente 404 personalizzata, footer «Versione 1.6.0». Le schede mostrano solo «Dott. Y. G.» e «Dott. M. B.».
- Controllo visivo in Chrome della scheda Y. G.: volto sfocato e avviso ASST presenti.
