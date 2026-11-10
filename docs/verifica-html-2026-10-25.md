# Verifica HTML e metadati — 25 ottobre 2026

Verificate tutte le 71 pagine HTML generate da Astro e 3515 riferimenti locali. Esito: nessun problema nei controlli eseguiti.

Pubblicazione su Aruba completata il 25 ottobre 2026. Verifica ripetuta sulle pagine scaricate dal dominio pubblico: 71 pagine e 3515 riferimenti, senza problemi. Dettagli nel [report iniziale di pubblicazione](aruba-psicologia-html-2026-10-25.md) e nel [successivo aggiornamento vertigini e ORL](aruba-vertigini-2026-10-25.md).

Ultima revisione: [titoli dei servizi senza «a Sondrio»](aruba-titoli-servizi-2026-10-25.md), pubblicata e verificata su tutte le 57 pagine dei servizi. Metadati SEO locali conservati.

## Controlli e correzioni

- Un solo H1 per pagina, struttura dei titoli senza salti, lingua italiana, charset UTF-8 e viewport responsive.
- Title e meta description presenti e univoci; URL canonici coerenti con ogni percorso.
- Open Graph completo, URL assoluti delle immagini social, dimensioni e descrizioni alternative; metadati Twitter Card coerenti.
- Direttive robots: pagine pubbliche indicizzabili e pagina 404 con noindex e canonical corretto.
- Header e footer esterni al main; profili e relative sottosezioni con livelli di titolo coerenti.
- Breadcrumb con nav e lista ordinata nelle schede dei servizi; etichette ARIA e relativi ID verificati.
- Campi dei moduli associati alle etichette e pulsanti con tipo esplicito.
- Immagini con alt e dimensioni intrinseche; eliminati attributi duplicati nel componente ResponsiveImage. La foto nel dialog della galleria viene popolata quando aperta.
- Date con time/datetime; i post Instagram senza data verificata non generano un time vuoto.
- Collegamenti interni, frammenti, immagini e srcset con destinazioni esistenti.
- Ordine HTML delle informazioni per il paziente allineato all’ordine visivo già presente.

## Dati strutturati

JSON-LD presente nelle 70 pagine indicizzabili: MedicalClinic, WebSite e WebPage. BreadcrumbList nelle 56 pagine di aree e prestazioni; Service nelle 46 schede di servizio, comprese le quattro di Psicologia.

I dati del centro riprendono denominazione, indirizzo, contatti e orari già pubblicati nel sito. La qualifica dello psicologo rimane quella fornita nel documento.

## Verifica

- `npm run check`: 0 errori, 0 avvisi.
- `npm run build`: completata.
- `npm run audit:html`: 71 pagine, 3515 riferimenti, 0 problemi.
- Suite JavaScript esistente: 16 test superati.
- Verifica del controllo su sette regressioni introdotte in memoria: metadato mancante, H1 duplicato, footer nel main, ID duplicato, JSON-LD non valido, alt mancante e salto dei livelli dei titoli. Tutte rilevate.
- Verifica visiva nel browser su desktop e telefono per le strutture modificate.

Il controllo automatico verifica la struttura e le regole del progetto. Non certifica la conformità all’intero standard HTML e non sostituisce il Rich Results Test o la verifica di indicizzazione su Google.

Per ripetere la verifica dopo modifiche: eseguire prima `npm run build`, poi `npm run audit:html`. Il report dettagliato JSON è disponibile con `npm run audit:html -- --report /private/tmp/fisiosalute-html-audit.json`.

Riferimenti: [standard HTML](https://html.spec.whatwg.org/multipage/sections.html), [Open Graph](https://ogp.me/), [MedicalClinic](https://schema.org/MedicalClinic), [Service](https://schema.org/Service), [breadcrumb di Google](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

## Pagine controllate

| Percorso | H1 | Esito |
| --- | --- | --- |
| `/404.html` | Pagina non trovata. | OK |
| `/altri-professionisti/` | Altri professionisti. | OK |
| `/carta-dei-servizi/` | Carta dei servizi. | OK |
| `/collaborazioni/` | Collaborazioni. | OK |
| `/contatti/` | Contatti e dove siamo. | OK |
| `/cookie-policy/` | Cookie Policy | OK |
| `/dove-siamo/` | Dove siamo. | OK |
| `/equipe-medica/` | I medici specialisti. | OK |
| `/erika-voltan/` | Erika Voltan. | OK |
| `/` | La tua salute,  al centro della nostra attenzione. | OK |
| `/informazioni-paziente/` | Informazioni per il paziente. | OK |
| `/news/` | Le ultime da  FisioSalute. | OK |
| `/privacy-policy/` | Privacy Policy | OK |
| `/servizi/area/fisiatria/` | Fisiatria | OK |
| `/servizi/area/fisioterapia-riabilitazione/` | Fisioterapia e riabilitazione | OK |
| `/servizi/area/nutrizione-dieta/` | Nutrizione e dieta | OK |
| `/servizi/area/ortopedia/` | Ortopedia | OK |
| `/servizi/area/otorinolaringoiatria/` | Otorinolaringoiatria | OK |
| `/servizi/area/pilates-postura/` | Pilates e rieducazione posturale | OK |
| `/servizi/area/psicologia/` | Psicologia | OK |
| `/servizi/area/salute-benessere-donna/` | Salute e benessere donna | OK |
| `/servizi/area/terapie-fisiche-infiltrative/` | Terapie fisiche e infiltrative | OK |
| `/servizi/area/urologia/` | Urologia | OK |
| `/servizi/articolazione-temporo-mandibolare/` | Riabilitazione temporo-mandibolare | OK |
| `/servizi/cefalee-muscolo-tensive/` | Riabilitazione delle cefalee muscolo-tensive | OK |
| `/servizi/composizione-corporea/` | Analisi della composizione corporea | OK |
| `/servizi/diastasi-cicatrice-cesareo/` | Addome, diastasi e cicatrice del cesareo | OK |
| `/servizi/ecografia-urologica-femminile/` | Ecografia urologica femminile e maschile | OK |
| `/servizi/educazione-alimentare/` | Educazione alimentare | OK |
| `/servizi/fisiatria/` | Visita fisiatrica | OK |
| `/servizi/fisiopilates-macchinari/` | FisioPilates con Reformer e Cadillac | OK |
| `/servizi/fisioterapia-domiciliare/` | Fisioterapia e riabilitazione domiciliare | OK |
| `/servizi/fisioterapia-muscoloscheletrica/` | Fisioterapia muscoloscheletrica | OK |
| `/servizi/fisioterapia-neurologica/` | Fisioterapia neurologica | OK |
| `/servizi/fisioterapia-prevenzione/` | Fisioterapia e prevenzione | OK |
| `/servizi/fisioterapia-reumatologica/` | Fisioterapia reumatologica | OK |
| `/servizi/fisioterapia-sportiva/` | Fisioterapia sportiva | OK |
| `/servizi/idrokinesiterapia/` | Idrokinesiterapia | OK |
| `/servizi/` | I nostri servizi | OK |
| `/servizi/laserterapia/` | Laserterapia ad alta potenza | OK |
| `/servizi/linfodrenaggio/` | Linfodrenaggio manuale | OK |
| `/servizi/movimento-benessere-femminile/` | Prevenzione, movimento e benessere al femminile | OK |
| `/servizi/nutrizione-condizioni-fisiologiche/` | Nutrizione nelle diverse fasi della vita | OK |
| `/servizi/nutrizione-gastrointestinale/` | Nutrizione e disturbi gastrointestinali | OK |
| `/servizi/nutrizione-patologie/` | Nutrizione e condizioni patologiche | OK |
| `/servizi/nutrizione-sportiva/` | Nutrizione sportiva | OK |
| `/servizi/ortopedia/` | Ortopedia e traumatologia | OK |
| `/servizi/otorinolaringoiatria/` | Visita otorinolaringoiatrica | OK |
| `/servizi/parent-training-cognitivo-comportamentale/` | Parent training cognitivo comportamentale | OK |
| `/servizi/pavimento-pelvico/` | Riabilitazione del pavimento pelvico | OK |
| `/servizi/percorso-nutrizionale/` | Ricomposizione corporea e gestione del peso | OK |
| `/servizi/pilates-clinico/` | Pilates clinico a corpo libero | OK |
| `/servizi/pilates-clinico-aperto/` | Pilates clinico all’aria aperta | OK |
| `/servizi/preparazione-parto/` | Preparazione al parto | OK |
| `/servizi/pressoterapia/` | Pressoterapia | OK |
| `/servizi/prevenzione-pavimento-pelvico/` | Prevenzione e salute del pavimento pelvico | OK |
| `/servizi/primo-colloquio-psicologico/` | Primo colloquio psicologico | OK |
| `/servizi/recupero-post-partum/` | Recupero post-partum | OK |
| `/servizi/riabilitazione/` | Riabilitazione ed esercizio terapeutico | OK |
| `/servizi/riabilitazione-post-oncologica/` | Riabilitazione post oncologica | OK |
| `/servizi/riatletizzazione-esercizio-specifico/` | Riatletizzazione ed esercizio specifico | OK |
| `/servizi/rieducazione-posturale/` | Rieducazione posturale | OK |
| `/servizi/salute-donna-fasi-vita/` | La salute della donna nelle diverse fasi della vita | OK |
| `/servizi/sindromi-vertiginose/` | Trattamento delle vertigini | OK |
| `/servizi/supporto-genitorialita-circolo-sicurezza/` | Supporto alla genitorialità – Circolo della Sicurezza Parenting | OK |
| `/servizi/supporto-psicologico/` | Seduta di supporto psicologico | OK |
| `/servizi/tecarterapia/` | Tecarterapia | OK |
| `/servizi/terapie-infiltrative/` | Terapie infiltrative | OK |
| `/servizi/visita-dietistica/` | Visita dietistica e valutazione nutrizionale | OK |
| `/servizi/visita-urologica/` | Prima visita e controllo urologico | OK |
| `/staff/` | Persone che si prendono cura del tuo movimento. | OK |
