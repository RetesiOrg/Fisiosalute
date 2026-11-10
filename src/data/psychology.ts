import type { ServiceArea, Specialist } from "./services";

// Fonte: “Area Psicologica Sito - FS.pdf”; per il profilo è usata la biografia, versione 3.
export const psychologySpecialist: Specialist = {
  name: "Enrico Francesco Pillitteri",
  role: "Psicologo",
  href: "/altri-professionisti/#enrico-francesco-pillitteri",
};

export const psychologistProfile = {
  ...psychologySpecialist,
  id: "enrico-francesco-pillitteri",
  paragraphs: [
    "Il dott. Enrico Francesco Pillitteri è psicologo, iscritto all’Ordine degli Psicologi della Lombardia. Crede in un ascolto attento e senza giudizio. Sa che chiedere aiuto non è sempre facile, e per questo offre uno spazio tranquillo in cui prendersi il tempo necessario e costruire insieme i passi da fare.",
    "Lavora da anni con bambini, ragazzi e famiglie, in particolare nell’ambito dello spettro autistico, collaborando con équipe multidisciplinari. Con i più piccoli coinvolge i genitori come alleati, perché sono le persone più importanti nella vita dei figli. Accompagna anche gli adulti nei momenti di difficoltà e di cambiamento.",
    "Alla cura per la relazione unisce una formazione solida. Ha conseguito all’Università di Padova la laurea magistrale in Psicologia Cognitiva Applicata e il Master di II livello in Psicologia Quantitativa, dedicato alla misurazione e alla valutazione in psicologia. Frequenta la Scuola di Specializzazione in Psicoterapia Cognitiva dell’Infanzia e dell’Adolescenza «Attaccamento e Sviluppo» del Centro Clinico Crocetta – Istituto M.In.D. di Torino. È inoltre facilitatore registrato del Circolo della Sicurezza Parenting, un programma di supporto alla genitorialità.",
  ],
  quote: "Non serve sapere già cosa dire per iniziare: le parole possiamo cercarle insieme.",
};

export const psychologyArea: ServiceArea = {
  slug: "psicologia",
  number: "10",
  title: "Psicologia",
  shortTitle: "Psicologia",
  lead: "Uno spazio di ascolto e supporto psicologico per adulti, ragazzi e famiglie.",
  specialists: [psychologySpecialist],
  services: [
    {
      slug: "primo-colloquio-psicologico",
      title: "Primo colloquio psicologico",
      summary: "Un primo incontro per accogliere la richiesta, comprendere la situazione e valutare insieme come procedere.",
      paragraphs: [
        "Il primo colloquio è uno spazio riservato in cui portare una difficoltà, un dubbio o una domanda, anche quando non è ancora chiaro come definirli.",
        "L’incontro serve a conoscere la persona e la sua storia, comprendere il motivo della richiesta e individuare le risorse già presenti.",
        "Al termine si condivide una prima lettura della situazione e si valuta insieme il passo più adatto. Può essere un percorso di supporto, un intervento rivolto ai genitori o l’indicazione di un altro professionista. Il colloquio non impegna a proseguire.",
        "Quando la richiesta riguarda un figlio minorenne, il primo incontro si svolge di solito con i genitori. Per iniziare serve il consenso di chi esercita la responsabilità genitoriale, in genere entrambi i genitori.",
      ],
      sections: [{
        title: "Il colloquio può comprendere",
        items: [
          "Accoglienza della richiesta",
          "Raccolta della storia personale e del contesto di vita",
          "Esplorazione di difficoltà e risorse",
          "Questionari, quando utili",
          "Restituzione di una prima lettura",
          "Definizione condivisa dei passi successivi",
        ],
      }],
      specialists: [psychologySpecialist],
    },
    {
      slug: "supporto-psicologico",
      title: "Seduta di supporto psicologico",
      summary: "Colloqui per adulti, ragazzi e bambini nei momenti di difficoltà, stress o cambiamento, con obiettivi condivisi.",
      paragraphs: [
        "Il supporto psicologico accompagna la persona nei momenti di fatica emotiva, stress o cambiamento, per comprendere ciò che sta vivendo e ritrovare un equilibrio.",
        "Può riguardare ansia e preoccupazioni, difficoltà nelle relazioni, a scuola o al lavoro, ed eventi di vita impegnativi. Anche un problema di salute, un infortunio o un dolore che dura nel tempo possono pesare sull’umore e sulla quotidianità.",
        "Con bambini e ragazzi il lavoro tiene conto della fase di sviluppo e delle caratteristiche di ciascuno, anche in caso di neurodivergenza. I genitori vengono coinvolti nei modi e nei tempi più adatti.",
        "Frequenza e obiettivi si concordano all’inizio e si rivedono nel tempo. Con il consenso della persona, è possibile un confronto con gli altri professionisti dell’équipe che la seguono.",
      ],
      sections: [{
        title: "Il percorso può comprendere",
        items: [
          "Colloqui individuali",
          "Obiettivi definiti insieme",
          "Strumenti per affrontare emozioni e stress",
          "Incontri con i genitori, per bambini e ragazzi",
          "Verifiche periodiche del percorso",
          "Confronto con l’équipe, previo consenso",
        ],
      }],
      specialists: [psychologySpecialist],
    },
    {
      slug: "supporto-psicologico-coppia",
      title: "Seduta di supporto psicologico per la coppia",
      summary: "Incontri per la coppia nei momenti di difficoltà, conflitto o cambiamento, per comprendere cosa accade nella relazione e affrontarlo insieme.",
      paragraphs: [
        "Il supporto psicologico per la coppia offre ai partner uno spazio condiviso in cui fermarsi a guardare la relazione, quando le difficoltà si ripetono o diventano faticose da affrontare da soli.",
        "Può riguardare litigi e incomprensioni ricorrenti, distanza emotiva o fatica a comunicare. Anche i cambiamenti della vita possono mettere alla prova l’equilibrio della coppia, come la nascita di un figlio, un trasferimento, un lutto o un problema di salute di uno dei partner. Il percorso può accompagnare la coppia anche quando si interroga sul proprio futuro.",
        "Gli incontri aiutano a riconoscere i bisogni e le emozioni di ciascuno, che spesso restano nascosti dietro i conflitti. Si osservano anche le dinamiche che si ripetono, per cercare insieme modi diversi di comunicare e di rispondere l’uno all’altro. Lo psicologo non si schiera con nessuno dei due: aiuta entrambi a dare voce al proprio punto di vista e ad ascoltare quello dell’altro.",
        "Le sedute si svolgono con entrambi i partner. Frequenza e obiettivi si concordano all’inizio e si rivedono nel tempo. Quando le difficoltà riguardano soprattutto il ruolo di genitori, i percorsi più indicati sono il parent training o il supporto alla genitorialità.",
      ],
      sections: [{
        title: "Il percorso può comprendere",
        items: [
          "Incontri con entrambi i partner",
          "Obiettivi condivisi dalla coppia",
          "Ascolto dei bisogni e delle emozioni di ciascuno",
          "Comprensione delle dinamiche che si ripetono",
          "Comunicazione e gestione dei conflitti",
          "Verifiche periodiche del percorso",
        ],
      }],
      relatedServices: [
        { title: "Parent training cognitivo comportamentale", href: "/servizi/parent-training-cognitivo-comportamentale/" },
        { title: "Supporto alla genitorialità – Circolo della Sicurezza Parenting", href: "/servizi/supporto-genitorialita-circolo-sicurezza/" },
      ],
      specialists: [psychologySpecialist],
    },
    {
      slug: "parent-training-cognitivo-comportamentale",
      title: "Parent training cognitivo comportamentale",
      summary: "Per genitori, da soli o in coppia: tecniche e procedure concrete per lavorare sul comportamento dei figli.",
      paragraphs: [
        "Il parent training cognitivo comportamentale insegna ai genitori tecniche, metodi e procedure per lavorare sul comportamento dei figli. È indicato in caso di crisi frequenti, oppositività o difficoltà con regole e routine, anche in presenza di neurodivergenza.",
        "Si parte dall’analisi funzionale. Con il modello ABC si osserva cosa precede il comportamento, come si manifesta e cosa lo segue, per capire a cosa serve.",
        "Su questa base si costruiscono strategie mirate, come il rinforzo dei comportamenti adeguati e la gestione delle conseguenze. Tra un incontro e l’altro i genitori le applicano a casa e raccolgono osservazioni, utili per verificare i risultati.",
        "È tra gli interventi rivolti ai genitori più studiati dalla ricerca. Se l’obiettivo è soprattutto comprendere i bisogni emotivi del figlio, il percorso più indicato è il supporto alla genitorialità.",
      ],
      sections: [{
        title: "Il percorso può comprendere",
        items: [
          "Analisi funzionale del comportamento",
          "Modello ABC: antecedenti, comportamento, conseguenze",
          "Obiettivi concreti e misurabili",
          "Rinforzo dei comportamenti adeguati",
          "Gestione delle conseguenze e delle crisi",
          "Monitoraggio dei progressi a casa",
        ],
      }],
      relatedServices: [{ title: "Supporto alla genitorialità – Circolo della Sicurezza Parenting", href: "/servizi/supporto-genitorialita-circolo-sicurezza/" }],
      specialists: [psychologySpecialist],
    },
    {
      slug: "supporto-genitorialita-circolo-sicurezza",
      title: "Supporto alla genitorialità – Circolo della Sicurezza Parenting",
      summary: "Per genitori, da soli o in coppia: imparare a riconoscere i bisogni dei figli, anche dietro i comportamenti più difficili.",
      paragraphs: [
        "Il supporto alla genitorialità aiuta i genitori a riconoscere i bisogni che si nascondono dietro i comportamenti dei figli. Passare da «mio figlio ce l’ha con me» a «mio figlio ha bisogno di me» permette di vedere con più lucidità ciò di cui ha bisogno.",
        "Il percorso segue il programma Circolo della Sicurezza Parenting (Circle of Security® Parenting), basato sulla teoria e sulla ricerca sull’attaccamento. Si articola in otto capitoli, con brevi video e momenti di riflessione guidata.",
        "Al centro c’è un’immagine semplice, il cerchio: i figli hanno bisogno di un adulto che sostenga le loro esplorazioni e li accolga quando tornano in cerca di conforto. Lavorare su questa relazione può aiutare i genitori a sentirsi meno impotenti di fronte alle crisi emotive e comportamentali.",
        "Si svolge con un solo genitore o con la coppia ed è condotto da un facilitatore registrato del programma. Se l’obiettivo è imparare tecniche specifiche per lavorare su un comportamento, il percorso più indicato è il parent training.",
      ],
      sections: [{
        title: "Il percorso può comprendere",
        items: [
          "I bisogni dei figli tra esplorazione e conforto",
          "L’«essere con» i figli nelle loro emozioni",
          "Le emozioni che i bisogni dei figli attivano nel genitore",
          "Rotture e riparazioni nella relazione",
          "Autorevolezza e gentilezza nel ruolo di guida",
          "Brevi video e riflessione guidata",
        ],
      }],
      relatedServices: [{ title: "Parent training cognitivo comportamentale", href: "/servizi/parent-training-cognitivo-comportamentale/" }],
      specialists: [psychologySpecialist],
    },
  ],
};
