# Prova su Aruba

URL previsto: https://www.fisiosalute.it/new/

La copia statica vive soltanto nella cartella `new`, separata da WordPress.
Non modificare `.htaccess`, `index.php`, `robots.txt` o le cartelle del sito principale.

Per rigenerare il pacchetto, dalla cartella del progetto:

```sh
npm run build -- --base /new/ --outDir ./dist-prova
python3 scripts/prepare-aruba-preview.py
```

Il secondo comando adatta i percorsi della sola copia compilata, verifica i
collegamenti a pagine e risorse locali e crea `../fisiosalute-new.zip`.
Il pacchetto contiene la cartella `new/`, con meta robots noindex e un
`.htaccess` locale. Caricare ed estrarre il pacchetto nella radice web crea solo
questa cartella. Non caricare sorgenti, `.env` o `node_modules`.

Le recensioni vengono recuperate durante la build: controllare che il log non
segnali errori Google Places prima di caricare una nuova copia. Il modulo contatti
prepara una mail nell'app del visitatore, senza inviarla automaticamente.

La copia è pubblicamente accessibile tramite URL; noindex non è una password.
