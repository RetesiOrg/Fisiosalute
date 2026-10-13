# Riordino spazio web Aruba — 13 ottobre 2026

Su richiesta dell’utente raccolti gli elementi obsoleti nella cartella unica `/vecchi file/`, tramite File Manager Aruba. Nessun file eliminato.

Prima del trasferimento creata `.htaccess` interna con accesso negato e `Options -Indexes`. Verificato HTTP 403 usando il file non riservato `LEGGIMI.txt` della nuova cartella.

Spostati 42 elementi della radice: 19 archivi ZIP di pubblicazione/preparazione; cartelle `backups-private`, `new`, `wp-admin`, `wp-content`, `wp-includes`; 16 file PHP del precedente sito WordPress; `license.txt` e `readme.html`. Poi spostati cinque CSS obsoleti dalla cartella `_astro`: equipe-medica.BYsT4gEf.css, equipe-medica.C5Py_Ae8.css, equipe-medica.CuKbDStc.css, Footer.DjoxmS-G.css, Footer.uouNL3-n.css.

L’archivio contiene 49 elementi: 47 trasferiti più `.htaccess` e `LEGGIMI.txt`. Radice ridotta da 74 a 32 elementi. Mantenuti i file attivi, le immagini distribuite con il sito, API e configurazioni, verifica Google e le cartelle hosting `cgi-bin` e `softaculous`. Quest’ultima contiene le sottocartelle di servizio `backup` e `datadir`.

Backup locale dei 478 file pubblici attivi prima del riordino: `backups-private/2026-10-13/pre-riordino`. Verifica SHA256 dopo entrambi i trasferimenti: tutti i 478 file ancora identici al manifest della release. Pagine principali, Urologia, équipe, favicon e feed Instagram HTTP 200. Endpoint pubblico Google recensioni HTTP 503, già non configurato secondo la documentazione di progetto; pagine con recensioni statiche restano disponibili. Cartella archivio HTTP 403.

Ripristino dei percorsi precedenti: tramite File Manager, spostare i singoli elementi da `vecchi file` alla posizione originale. I cinque CSS vanno in `_astro`; tutti gli altri 42 elementi tornano in radice. Il backup completo WordPress è ora sotto `vecchi file/backups-private/` sul server; le copie private locali già scaricate restano inalterate.

Report: aruba-riordino-2026-10-13-manifest-attivo.json, aruba-riordino-2026-10-13-backup.json, aruba-riordino-2026-10-13-verify.json, aruba-riordino-2026-10-13-http.json.
