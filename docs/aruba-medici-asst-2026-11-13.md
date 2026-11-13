# Medici ASST e sfondo bianco — 13 novembre 2026

Versione 1.6.0. Su richiesta dell'utente aggiunti alla pagina equipe-medica due ortopedici in servizio presso ASST Valtellina e Alto Lario, dopo Giuffrida e prima di Paiusco.

## Vincolo ASST

La convenzione con ASST non consente di pubblicizzare il nome dei medici. Per questo:

- nome mostrato solo con le iniziali («Dott. Y. G.», «Dott. M. B.»); slug, ancore e file immagine usano solo le iniziali (`ortopedico-yg`, `ortopedico-mb`);
- volto sfocato in modo morbido (sagoma, capelli ed espressione leggibili, volto non riconoscibile);
- avviso in evidenza nella scheda: per informazioni e prenotazioni contattare la segreteria FisioSalute; collegamento «Contatta la segreteria»;
- rimossi i nomi completi dei due medici dalle keyword meta (`src/data/professional-tags.ts`). Verificato che la build non contenga i nomi completi.

Le foto originali non sfocate sono conservate solo in `backups-private/2026-11-13/medici-asst-originali/` (esclusa da git: i repository sono pubblici). Non pubblicarle e non aggiungerle al repository.

## Sfondo bianco

Tutte le sei foto dei medici scontornate (rembg, modello u2net, alpha matting) e composte su bianco puro. Inquadratura M. B. ritagliata a 1179 × 1376 come le altre; regolazioni CSS per allineare altezza e dimensione dei volti. Foto precedenti in `backups-private/2026-11-13/foto-medici-prima-sfondo-bianco/`.

## Verifiche

Astro check zero errori/warning, build completata, audit HTML senza problemi. Controllo visivo in Chrome headless a 1600 px e a larghezza mobile.
