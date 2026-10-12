# Migrazione Aruba — preparazione del 5 ottobre 2026

## Stato verificato

- Dominio: www.fisiosalute.it, Hosting Easy Linux, PHP 7.4.33.
- Produzione attuale WordPress nella radice, con .htaccess WordPress.
- File Manager: backup giornaliero e settimanale disponibili. Il giornaliero mostra wp-content aggiornato oggi alle 00:00.
- MySQL: backup giornalieri disponibili per i cinque database associati al dominio.
- Scaricato Sql1617690_1_Mon.gz, datato dal pannello 04/10/2026 22:09:17. Copia locale in backups-private/2026-10-05, esclusa da Git e dal pacchetto del sito. Decompressione verificata, 36 tabelle con struttura WordPress. Non è stata provata un'importazione e non è ancora verificato quale installazione WordPress usi questo database.
- Il nuovo sito è statico: sul server si caricano solo HTML, CSS, JavaScript, immagini e font. Non occorre eseguire Astro o Node su Aruba.
- Nessun file della produzione è stato modificato o cancellato.

## Anteprima pubblicata

Il 5 ottobre 2026 è stata caricata l'anteprima autorizzata in https://www.fisiosalute.it/new/ (Aruba reindirizza al dominio senza www). Archivio spostato in /new/fisiosalute-new.zip; estrazione eseguita dentro /new/, poi file statici trasferiti da /new/new/ al livello /new/. La sottocartella new/new è rimasta vuota. Non è stato estratto alcun file nella radice WordPress.

Verifica HTTPS dell'archivio effettivamente caricato: 63 pagine e 460 file pubblici confrontati tramite SHA256, nessuna differenza o errore; header X-Robots-Tag noindex presente sulle pagine. Homepage WordPress ancora servita alla radice. Report: aruba-preview-verifica.json. Nessun passaggio alla produzione o cron eseguito. Le news mostrano attualmente i riquadri di riserva senza foto Instagram; il feed va completato prima del lancio se le foto sono richieste.

## Pacchetti

Produzione: dalla cartella del progetto eseguire:

```sh
npm run build
python3 scripts/audit-static.py
python3 scripts/prepare-aruba-production.py
```

Pacchetto `../fisiosalute-produzione.zip`, contenuto alla radice, con .htaccess statico, robots.txt, sitemap.xml e pagina 404. Il controllo esclude sorgenti, file privati, collegamenti /new/, noindex della preview e credenziali note nei file generati.

Preview separata: seguire ARUBA-PREVIEW.md. Il pacchetto `../fisiosalute-new.zip` va estratto come cartella /new/. Contiene noindex e non va usato per sostituire la produzione.

## Ordine del passaggio

1. Scaricare una copia permanente dell'intero spazio web via FTP o una funzione di esportazione dell'hosting. Conservarla sul computer, fuori dallo spazio pubblico. I backup giornaliero/settimanale ruotano e non costituiscono un archivio permanente. Non creare un archivio pubblico di WordPress: contiene wp-config.php e credenziali.
2. Identificare il database effettivo del WordPress e conservare un'esportazione corrente completa. Il Backup Hosting dei file non comprende MySQL: https://guide.aruba.it/hosting-e-domini/backup-sito-web/Gestione-Backup-Hosting/caratteristiche-backup-hosting
3. Salvare separatamente .htaccess e robots.txt originali. Conservare il file googlef011b7401a30b47d.html già sul server.
4. Caricare la preview /new/ e verificarla sul vero hosting: immagini, navigazione, contatti, preferenze cookie, mappa e recensioni. Non sostituire alcun file della radice in questa fase.
5. Prima di pubblicare, verificare i backup e il recupero dei file, e predisporre i redirect. Già previsti /chi-siamo/ → /erika-voltan/ e /recensioni/ → /#recensioni. Staff, servizi, collaborazioni, contatti e policy mantengono il percorso principale. Gli eventuali frammenti dei vecchi servizi richiedono un controllo separato.
6. Caricare i file statici mantenendo i file WordPress. Applicare .htaccess statico per ultimo: dà priorità a index.html e impedisce l'esecuzione dei vecchi file PHP. Verificare questo comportamento su Aruba prima della pubblicazione; la configurazione non è ancora stata provata sul server. Non cambiare DNS, posta, database o versione PHP.
7. Verificare HTTP/HTTPS, dominio www/senza www, home, sottopagine, risposte 404, redirect, immagini e contatti in produzione. Verificare la sitemap. Confermare l'assenza di noindex fuori /new/.

## Ripristino

Con i file WordPress mantenuti e il database non modificato: ripristinare .htaccess e robots.txt originali, spostare fuori dalla radice index.html e le cartelle statiche che coincidono con i vecchi percorsi (per esempio servizi, staff, contatti, collaborazioni e policy). Togliere soltanto index.html non basta: le cartelle statiche possono continuare a intercettare le vecchie pagine. Conservare un elenco completo dei file caricati e verificare il ritorno di WordPress. Il backup permanente permette di ripristinare anche eventuali file sovrascritti.

## Automazioni successive

- Il cron è disponibile nel pannello, ma una chiamata periodica da sola non aggiorna l'HTML statico.
- Instagram: il workflow locale recupera dati e fa commit; non contiene build e pubblicazione su Aruba. Le immagini sono ancora URL remoti: programmare recupero, copia locale delle immagini, build e deploy, con gestione delle scadenze dei token. Non considerare il workflow attuale un aggiornamento automatico della produzione.
- Google: attualmente la build usa Places, che offre una selezione di recensioni. Per le ultime recensioni è preparato il loader Business Profile, ma l'accesso Google è ancora in attesa (pratica 1-0590000041188). Consultare google-business-reviews-setup.md. Dopo l'approvazione servono OAuth e segreti privati, poi build/deploy periodici oppure un endpoint PHP dedicato con cache; da scegliere dopo il lancio.
- Nessun cron è stato creato, né alcuna automazione di deploy attivata.

## Passaggio in produzione richiesto il 5 ottobre 2026

L'utente ha scelto di conservare il vecchio sito solo come backup ZIP e pubblicare il nuovo su www.fisiosalute.it; old.fisiosalute.it non va attivato.

- Build definitiva in /private/tmp/fisiosalute-production-20261005, 63 pagine, 2.989 riferimenti controllati senza problemi. Astro check: 0 errori, 0 warning.
- Pacchetti separati fisiosalute-produzione-file.zip e fisiosalute-attiva-produzione.zip. Il secondo contiene index.html, .htaccess, robots.txt e sitemap.xml.
- Manifest SHA256: aruba-produzione-manifest.json, 473 file.
- Esportazione corrente via phpMyAdmin: Sql1617690_1.sql, 36 tabelle, SQL completo con COMMIT, copia gzip verificata in backups-private/2026-10-05/Sql1617690_1-pre-pubblicazione.sql.gz.
- Sul server creata /backups-private/ protetta con Require all denied e Deny from all. HTTP 403 confermato prima di copiare file privati.
- Copia completa della radice (esclusa backups-private stessa) avviata in /backups-private/sito-originale-2026-10-05/. La copia è ancora in corso: ZIP dei file non ancora creato né scaricato.
- Il dominio principale serve ancora WordPress. Nessuna attivazione del nuovo sito eseguita.

### Pubblicazione completata — 5 ottobre 2026

- Nuovo sito attivo alla radice https://www.fisiosalute.it/. HTTP e dominio senza www reindirizzano a HTTPS www. Nessuna modifica a DNS, posta, PHP o database.
- Scelta finale dell’utente: vecchio sito conservato come backup, senza sottodominio old.
- TGZ completo spostato sul server in /backups-private/wordpress-originale-2026-10-5.tgz, 945.390.485 byte. Scaricato e conservato localmente in backups-private/2026-10-05/wordpress-originale-2026-10-05.tgz.
- ZIP locale: backups-private/2026-10-05/fisiosalute-wordpress-backup-2026-10-05.zip, 921.460.007 byte, 13.951 file originali, database corrente e istruzioni di ripristino. Controllo completo CRC ZIP e lettura TGZ passati; wp-config.php coincide con l’originale. Hash e dimensioni in verifica-backup.json nella stessa cartella privata.
- Il TGZ comprende anche i file statici caricati durante la preparazione; lo ZIP filtra i percorsi originali e conserva la .htaccess WordPress originale. La precedente copia server sito-originale-2026-10-05 era incompleta e non va usata per il ripristino.
- File WordPress ancora conservati alla radice; esecuzione PHP bloccata dalla nuova .htaccess, eccetto l’endpoint Instagram previsto. Database originale inalterato.
- Pacchetto finale estratto e redirect /chi-siamo/ e /recensioni/ corretti con destinazioni HTTPS esplicite: Aruba costruiva altrimenti una destinazione HTTP dai percorsi relativi.
- Verifica HTTPS: 466 file pubblici identici al manifest SHA256, nessun errore. Redirect, pagina 404 personalizzata, verifica Google, blocco WordPress PHP, archivio e cartelle private tutti verificati. Risultati in aruba-produzione-verifica.json.
- Controllo visivo Chrome su homepage e /news/: immagini caricate, due post MGM e Benedetta Nicolussi presenti, titoli e link allineati.
- Instagram automatico ancora senza credenziali: endpoint risponde 503 not_configured; nessun cron attivato. I due post attuali sono pubblicati con immagini locali. Google Business Profile resta in attesa dell’approvazione già richiesta.
