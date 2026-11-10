# FisioSalute

Sito statico realizzato esclusivamente con Astro per lo studio FisioSalute di Erika Voltan.

## Sviluppo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Il risultato statico viene generato nella cartella `dist/`. Le chiamate Google avvengono durante la build; le credenziali non vengono inviate al browser.

Dopo la build, `npm run audit:html` controlla su tutte le pagine metadati SEO e social, dati strutturati, titoli, struttura semantica, etichette dei moduli, immagini e collegamenti locali. Il comando termina con errore se trova problemi. Per un report JSON dettagliato: `npm run audit:html -- --report /private/tmp/fisiosalute-html-audit.json`.

## Google Maps e recensioni

I collegamenti Maps e la mappa incorporata non usano la chiave Places. La mappa viene caricata solo dopo il consenso.

Per aggiornare voto medio e numero di recensioni, configurare `GOOGLE_PLACES_API_KEY` e `GOOGLE_PLACE_ID` nel `.env` locale. La chiave del progetto Google Cloud “FisioSalute Website” è limitata a Places API (New). Non utilizzare il prefisso `PUBLIC_` e non includere il `.env` nei file pubblicati. I dati si aggiornano a ogni nuova build; in caso di errore Places vengono usati i dati locali.

I testi delle recensioni restano quelli verificati manualmente. Per recuperarli automaticamente tramite Business Profile servono tutte le variabili `GOOGLE_BUSINESS_*` del file `.env.example`, con approvazione API e autorizzazione OAuth dell'account che gestisce lo studio.

Per l’aggiornamento automatico senza build tramite PHP e cron Aruba, vedere [la guida di installazione](docs/google-recensioni-aruba.md). I file sono predisposti; occorre completare approvazione Business Profile/OAuth, configurazione privata e installazione sul server.
