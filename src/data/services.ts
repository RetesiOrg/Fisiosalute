import { medicalSpecialistRefs } from "./medical-specialists";

export type Specialist = { name: string; role: string; href?: string };
export type ServiceImage = { src: string; alt: string };
export type Service = { slug: string; title: string; summary: string; paragraphs?: string[]; sections?: { title: string; items: string[] }[]; specialists?: Specialist[]; images?: ServiceImage[] };
export type ServiceArea = { slug: string; number: string; title: string; shortTitle: string; lead: string; services: Service[] };

const physios: Specialist[] = [
  { name: "Erika Voltan", role: "Fisioterapista", href: "/erika-voltan" },
  { name: "Silvia Simonini", role: "Fisioterapista", href: "/staff#silvia-simonini" },
  { name: "Alessandra Cao", role: "Fisioterapista", href: "/staff#alessandra-cao" },
];

export const serviceAreas: ServiceArea[] = [
  { slug: "fisioterapia-riabilitazione", number: "01", title: "Fisioterapia e riabilitazione", shortTitle: "Fisioterapia", lead: "Valutazione, trattamento ed esercizio terapeutico per recuperare movimento, autonomia e fiducia.", services: [
    { slug: "fisioterapia-muscoloscheletrica", title: "Fisioterapia muscoloscheletrica", summary: "Terapia manuale ed esercizio per problematiche muscolari, articolari e posturali.", paragraphs: ["Le tecniche manuali, passive e attive, vengono scelte dopo la valutazione per migliorare il movimento, diminuire il dolore e favorire il recupero dei tessuti.", "Il percorso comprende educazione e strategie attive per rendere il paziente parte del proprio recupero."], sections: [{ title: "Il percorso può comprendere", items: ["Terapia manuale ortopedica", "Mobilizzazioni e manipolazioni vertebrali", "Trattamento miofasciale", "Massoterapia", "Educazione e gestione attiva"] }], specialists: physios },
    { slug: "fisioterapia-sportiva", title: "Fisioterapia sportiva", summary: "Recupero dopo infortuni e ritorno graduale, sicuro e consapevole all’attività sportiva.", specialists: physios },
    { slug: "fisioterapia-reumatologica", title: "Fisioterapia reumatologica", summary: "Un percorso personalizzato per gestire dolore, rigidità e limitazioni legate alle patologie reumatologiche.", paragraphs: ["La fisioterapia reumatologica aiuta a mantenere o recuperare la funzionalità e a migliorare la qualità di vita, nel rispetto della fase della malattia e in coordinamento con il percorso medico.", "FisioSalute ha attivato una convenzione con ALOMAR – Associazione Lombarda Malati Reumatici, con condizioni dedicate agli associati."], sections: [{ title: "Patologie e condizioni trattate", items: ["Artrite reumatoide e artrite psoriasica", "Spondilite anchilosante e spondiloartriti", "Fibromialgia, artrosi e osteoporosi", "Connettiviti e altre patologie reumatologiche o autoimmuni"] }], specialists: physios },
    { slug: "fisioterapia-neurologica", title: "Fisioterapia neurologica", summary: "Riabilitazione personalizzata per recuperare e mantenere autonomia, equilibrio, coordinazione e sicurezza.", paragraphs: ["Il percorso è rivolto alle persone con problematiche del sistema nervoso centrale o periferico. Parte dalla valutazione delle capacità residue, delle difficoltà presenti e degli obiettivi della persona."], sections: [{ title: "Il percorso può comprendere", items: ["Recupero di forza e mobilità", "Lavoro su equilibrio e coordinazione", "Training del cammino e dei passaggi posturali", "Attività della vita quotidiana", "Educazione del paziente e del caregiver", "Programma domiciliare personalizzato"] }], specialists: physios },
    { slug: "fisioterapia-prevenzione", title: "Fisioterapia e prevenzione", summary: "Valutazione ed esercizio per intervenire prima del dolore e mantenere movimento, forza e autonomia.", paragraphs: ["Prevenire significa riconoscere i fattori modificabili prima che diventino un limite: mobilità, forza, controllo del movimento, gestione dei carichi e abitudini quotidiane."], sections: [{ title: "Su cosa possiamo lavorare", items: ["Mal di schiena e salute della colonna", "Osteoporosi e perdita di massa ossea", "Sarcopenia e mantenimento della forza", "Equilibrio e prevenzione delle cadute", "Prevenzione degli infortuni sportivi"] }], specialists: physios },
    { slug: "riabilitazione", title: "Riabilitazione ed esercizio terapeutico", summary: "Programmi personalizzati per recuperare movimento, forza e funzionalità e ridurre il rischio di recidive.", sections: [{ title: "Ambiti di intervento", items: ["Riabilitazione pre e post intervento chirurgico", "Riabilitazione post infortunio e post traumatica", "Riabilitazione motoria", "Esercizio terapeutico e Pilates"] }], specialists: physios },
    { slug: "articolazione-temporo-mandibolare", title: "Riabilitazione temporo-mandibolare", summary: "Valutazione e trattamento dei disturbi dell’articolazione della mandibola e dei sintomi collegati.", sections: [{ title: "Quando può essere indicata", items: ["Dolore peri-mandibolare o durante la masticazione", "Limitazione dell’apertura della bocca", "Click, scrosci o deviazioni", "Cefalee, bruxismo e serramento", "Percorsi pre e post bite o chirurgia maxillo-facciale"] }], specialists: physios },
    { slug: "pavimento-pelvico", title: "Riabilitazione del pavimento pelvico", summary: "Un trattamento specialistico rivolto a donne e uomini per recuperare la funzionalità del pavimento pelvico.", paragraphs: ["Il percorso viene costruito sulla persona e può intervenire su incontinenza, dolore pelvico, disfunzioni sessuali, problematiche post-partum o post-chirurgiche e alterazioni della funzione intestinale.", "La valutazione iniziale permette di definire obiettivi e strumenti adatti alla specifica condizione."], sections: [{ title: "Il trattamento può combinare", items: ["Terapia manuale", "Esercizi di rinforzo o rilassamento", "Biofeedback e radiofrequenza", "Educazione comportamentale", "Tecniche di respirazione e rilassamento"] }], specialists: [{ name: "Erika Voltan", role: "Fisioterapista", href: "/erika-voltan" }] },
    { slug: "sindromi-vertiginose", title: "Riabilitazione delle sindromi vertiginose", summary: "Valutazione specialistica e programma personalizzato per vertigini vestibolari e cervicogeniche.", paragraphs: ["La riabilitazione mira a ridurre i sintomi, migliorare equilibrio e orientamento e recuperare sicurezza nelle attività quotidiane.", "Le componenti vestibolare e cervicale possono coesistere: per questo il percorso parte sempre da una valutazione globale."], sections: [{ title: "Il percorso può comprendere", items: ["Manovre di riposizionamento quando indicate", "Esercizi vestibolari e di stabilizzazione dello sguardo", "Terapia manuale cervicale", "Esercizi di equilibrio e controllo motorio", "Programma domiciliare personalizzato"] }], specialists: physios },
    { slug: "cefalee-muscolo-tensive", title: "Riabilitazione delle cefalee muscolo-tensive", summary: "Un percorso sui fattori muscoloscheletrici e funzionali che possono contribuire al mal di testa ricorrente.", paragraphs: ["Le cefalee sono spesso multifattoriali. La valutazione considera la regione cervicale, le tensioni muscolari, l’articolazione temporo-mandibolare, il movimento e le abitudini quotidiane."], sections: [{ title: "Come può aiutare la fisioterapia", items: ["Terapia manuale cervicale e dei tessuti molli", "Recupero della mobilità e del controllo motorio", "Valutazione e trattamento dell’ATM quando indicato", "Educazione alla gestione dei fattori modificabili", "Esercizi domiciliari personalizzati"] }], specialists: physios },
    { slug: "linfodrenaggio", title: "Linfodrenaggio manuale", summary: "Gestione specialistica di linfedema, lipedema e condizioni correlate.", paragraphs: ["Dopo una valutazione fisioterapica viene definito un percorso per ridurre il gonfiore, favorire il drenaggio e migliorare funzionalità e benessere."], sections: [{ title: "Possibili strumenti", items: ["Linfodrenaggio manuale", "Educazione all’autogestione", "Esercizio terapeutico", "Bendaggio elastocompressivo e linfotaping", "Pressoterapia terapeutica"] }], specialists: physios },
    { slug: "riabilitazione-post-oncologica", title: "Riabilitazione post oncologica", summary: "Un percorso attento e progressivo per accompagnare il recupero dopo le terapie oncologiche.", specialists: physios },
    { slug: "idrokinesiterapia", title: "Idrokinesiterapia", summary: "Esercizio riabilitativo in acqua per facilitare movimento, carico graduale e recupero funzionale.", specialists: physios },
    { slug: "fisioterapia-domiciliare", title: "Fisioterapia e riabilitazione domiciliare", summary: "Il percorso riabilitativo a casa per chi ha difficoltà a raggiungere il centro.", paragraphs: ["Il trattamento viene svolto nell’ambiente quotidiano della persona e adattato agli spazi, alle abitudini e agli obiettivi concreti di autonomia.", "Può essere utile dopo interventi, ricoveri, traumi o in presenza di condizioni neurologiche, ortopediche, croniche e di fragilità."], sections: [{ title: "Quando può essere indicata", items: ["Difficoltà nel cammino o negli spostamenti", "Recupero post-operatorio o dopo un ricovero", "Esiti di traumi e fratture", "Patologie neurologiche", "Persone anziane o fragili", "Recupero delle autonomie quotidiane"] }], specialists: physios },
    { slug: "riatletizzazione-esercizio-specifico", title: "Riatletizzazione ed esercizio specifico", summary: "Progressione dal recupero funzionale al ritorno sicuro al gesto sportivo e ai carichi della propria disciplina.", specialists: physios },
  ]},
  { slug: "terapie-fisiche-infiltrative", number: "02", title: "Terapie fisiche e infiltrative", shortTitle: "Terapie", lead: "Tecnologie e trattamenti medici integrati nel percorso quando clinicamente indicati.", services: [
    { slug: "laserterapia", title: "Laserterapia ad alta potenza", summary: "ILUX XP Mectronic® supporta la gestione del dolore, dei processi infiammatori e il recupero dei tessuti.", paragraphs: ["La laserterapia ad alta potenza permette di lavorare a diverse profondità e può essere impiegata nelle problematiche muscolari, tendinee e muscoloscheletriche.", "Non viene proposta come trattamento isolato: è uno strumento che il fisioterapista integra, quando indicato, con esercizio terapeutico e terapia manuale."], sections: [{ title: "Può essere utilizzata per", items: ["Contribuire alla riduzione del dolore", "Supportare la gestione dei processi infiammatori", "Favorire riparazione e recupero dei tessuti", "Accompagnare il recupero dopo traumi e interventi"] }] },
    { slug: "tecarterapia", title: "Tecarterapia", summary: "Doctor Tecar PLUS Mectronic® è un supporto strumentale di ultima generazione inserito nel progetto riabilitativo.", paragraphs: ["L’utilizzo della tecarterapia viene definito in relazione alle caratteristiche della persona, al quadro clinico e agli obiettivi del percorso."], sections: [{ title: "Obiettivi del trattamento", items: ["Contribuire alla riduzione del dolore", "Favorire drenaggio e gestione dell’edema", "Supportare il recupero dei tessuti", "Accompagnare il recupero dopo traumi, interventi o sovraccarichi", "Supportare prevenzione e ritorno all’attività sportiva"] }] },
    { slug: "pressoterapia", title: "Pressoterapia", summary: "Compressione pneumatica controllata per favorire il drenaggio dei liquidi e il ritorno venoso e linfatico.", paragraphs: ["Il trattamento utilizza applicatori che esercitano una pressione sequenziale e graduata sugli arti.", "Nel linfedema non viene considerata un trattamento unico, ma può essere inserita in un percorso con terapia manuale, esercizio, bendaggio e altre strategie specifiche."], sections: [{ title: "Quando può essere indicata", items: ["Edema e gonfiore degli arti", "Pesantezza e tensione agli arti inferiori", "Alterazioni del ritorno venoso", "Gestione del linfedema", "Recupero dopo interventi selezionati"] }] },
    { slug: "terapie-infiltrative", title: "Terapie infiltrative", summary: "Trattamenti eseguiti dal medico specialista dopo un’accurata valutazione ortopedica.", paragraphs: ["La scelta dipende dalla diagnosi, dal distretto coinvolto, dalla fase della problematica e dalle caratteristiche del paziente.", "Quando appropriate, infiltrazione, fisioterapia ed esercizio terapeutico lavorano insieme: il trattamento medico facilita la gestione dei sintomi, mentre la riabilitazione recupera movimento, forza e funzione."], sections: [{ title: "Tipologie", items: ["Farmaci antidolorifici", "Farmaci antinfiammatori", "Acido ialuronico intra-articolare"] }], specialists: [medicalSpecialistRefs.giuffrida] },
  ]},
  { slug: "pilates-postura", number: "03", title: "Pilates e rieducazione posturale", shortTitle: "Pilates e postura", lead: "Movimento guidato per migliorare controllo, forza, mobilità e consapevolezza.", services: [
    { slug: "fisiopilates-macchinari", title: "FisioPilates con Reformer e Cadillac", summary: "Sedute individuali 1:1 con il fisioterapista e un programma costruito sulla valutazione della persona.", paragraphs: ["Reformer e Cadillac Worldpilates® permettono di modulare assistenze e resistenze, adattando ogni esercizio alle capacità e agli obiettivi della persona."], specialists: physios },
    { slug: "pilates-clinico", title: "Pilates clinico a corpo libero", summary: "Attività individuale o in piccoli gruppi, adattata alle esigenze dei partecipanti e seguita dal fisioterapista.", paragraphs: ["I piccoli gruppi riuniscono persone con esigenze analoghe e permettono al fisioterapista di seguire l’esecuzione e personalizzare gli esercizi. Quando serve un lavoro più mirato, il percorso può essere individuale."], specialists: physios },
    { slug: "pilates-clinico-aperto", title: "Pilates clinico all’aria aperta", summary: "Durante l’estate, movimento e benessere al Parco Bertesagni con attività a corpo libero.", paragraphs: ["Le lezioni uniscono attività fisica, natura e socialità. Gli esercizi vengono adattati al gruppo, con attenzione alla postura, al controllo del corpo e alla qualità del movimento."], specialists: physios },
    { slug: "rieducazione-posturale", title: "Rieducazione posturale", summary: "Un percorso attivo per migliorare gestione del corpo, mobilità e controllo del movimento.", specialists: physios },
  ]},
  { slug: "salute-benessere-donna", number: "04", title: "Salute e benessere donna", shortTitle: "Donna", lead: "Percorsi dedicati alle diverse fasi della vita e al benessere femminile.", services: [
    { slug: "salute-donna-fasi-vita", title: "La salute della donna nelle diverse fasi della vita", summary: "Prevenzione, fisioterapia ed esercizio dalla crescita alla maternità e alla menopausa.", paragraphs: ["Il corpo della donna cambia continuamente. Crescita, lavoro, gravidanza, maternità e menopausa sottopongono muscoli, ossa, articolazioni e pavimento pelvico a richieste differenti.", "L’obiettivo è arrivare a ogni fase con un corpo forte, mobile e funzionale, integrando quando necessario movimento, rieducazione del pavimento pelvico, linfodrenaggio e corretti stili alimentari."], sections: [{ title: "Le fasi della vita", items: ["Crescita: postura, forza e sviluppo muscoloscheletrico", "Età adulta: sedentarietà, lavoro e gestione dei carichi", "Gravidanza e maternità", "Menopausa: muscoli, ossa e metabolismo", "Prevenzione del pavimento pelvico"] }] },
    { slug: "preparazione-parto", title: "Preparazione al parto", summary: "Un percorso di consapevolezza, movimento e preparazione del pavimento pelvico." },
    { slug: "recupero-post-partum", title: "Recupero post-partum", summary: "Valutazione e recupero graduale della funzione dopo la gravidanza e il parto." },
    { slug: "diastasi-cicatrice-cesareo", title: "Addome, diastasi e cicatrice del cesareo", summary: "Recupero di forza, controllo, mobilità e funzionalità della parete addominale e dei tessuti." },
    { slug: "prevenzione-pavimento-pelvico", title: "Prevenzione e salute del pavimento pelvico", summary: "Valutazione e movimento per preparare il pavimento pelvico ai carichi della vita, dello sport e delle diverse fasi femminili." },
    { slug: "movimento-benessere-femminile", title: "Prevenzione, movimento e benessere al femminile", summary: "Fisioterapia, attività fisica, Pilates, alimentazione ed ergonomia adattati alla fase della vita." },
  ]},
  { slug: "fisiatria", number: "05", title: "Fisiatria", shortTitle: "Fisiatria", lead: "Inquadramento clinico e funzionale per definire un progetto riabilitativo coordinato.", services: [
    { slug: "fisiatria", title: "Visita fisiatrica", summary: "Valutazione medica delle problematiche che limitano movimento, funzione e qualità di vita.", paragraphs: ["La Fisiatria, o Medicina Fisica e Riabilitativa, si occupa di problematiche muscoloscheletriche, neurologiche e articolari e degli esiti di traumi o interventi.", "Fisiatra e fisioterapista hanno competenze differenti e complementari: il medico definisce l’inquadramento clinico e il progetto, il fisioterapista realizza il percorso riabilitativo."], sections: [{ title: "La visita può essere utile per", items: ["Mal di schiena e dolore cervicale", "Problematiche muscolari, articolari e neurologiche", "Dolore irradiato, acuto o cronico", "Infortuni sportivi e traumi", "Recupero pre e post chirurgico", "Problematiche posturali e del movimento"] }] },
  ]},
  { slug: "ortopedia", number: "06", title: "Ortopedia", shortTitle: "Ortopedia", lead: "Valutazione specialistica dell’apparato muscoloscheletrico e integrazione con il percorso riabilitativo.", services: [
    { slug: "ortopedia", title: "Ortopedia e traumatologia", summary: "Diagnosi e trattamento delle problematiche di ossa, articolazioni, muscoli, tendini e legamenti.", paragraphs: ["La valutazione ortopedica è importante per inquadrare una problematica strutturale, gli esiti di un trauma o un dolore persistente e stabilire se sia indicato un trattamento conservativo o chirurgico.", "FisioSalute favorisce un’équipe di ortopedici con competenze nei diversi distretti corporei, per indirizzare ogni paziente verso il professionista più indicato."], sections: [{ title: "Ambiti principali", items: ["Traumi, fratture, distorsioni e instabilità", "Artrosi e problematiche degenerative", "Lesioni muscolari, tendinee, meniscali e legamentose", "Problematiche della colonna", "Dolore di spalla, gomito, mano, anca, ginocchio, caviglia e piede", "Percorsi pre e post operatori"] }], specialists: [medicalSpecialistRefs.giuffrida] },
  ]},
  { slug: "otorinolaringoiatria", number: "07", title: "Otorinolaringoiatria", shortTitle: "ORL", lead: "Valutazione di orecchio, naso, gola, equilibrio, voce e deglutizione.", services: [
    { slug: "otorinolaringoiatria", title: "Visita otorinolaringoiatrica", summary: "Valutazione specialistica delle funzioni di udito, equilibrio, respirazione, voce e deglutizione.", paragraphs: ["La visita analizza sintomi e storia clinica per individuare il percorso più appropriato e gli eventuali approfondimenti.", "Nelle vertigini e nei disturbi dell’equilibrio, la valutazione medica può integrarsi con la riabilitazione vestibolare svolta da fisioterapisti specializzati."], sections: [{ title: "Quando rivolgersi allo specialista", items: ["Disturbi dell’udito, acufeni e sensazione di orecchio chiuso", "Vertigini e instabilità", "Otiti, riniti, sinusiti e poliposi", "Russamento e apnee del sonno", "Disturbi di voce e deglutizione", "Problematiche del distretto testa-collo"] }], specialists: [medicalSpecialistRefs.narducci] },
  ]},
  { slug: "nutrizione-dieta", number: "08", title: "Nutrizione e dieta", shortTitle: "Nutrizione e dieta", lead: "Un supporto nutrizionale personalizzato, integrato agli obiettivi di salute e benessere.", services: [
    { slug: "visita-dietistica", title: "Visita dietistica e valutazione nutrizionale", summary: "Anamnesi clinica, alimentare e dello stile di vita per comprendere bisogni e obiettivi della persona." },
    { slug: "educazione-alimentare", title: "Educazione alimentare", summary: "Strumenti concreti per costruire un’alimentazione equilibrata, varia e sostenibile nel tempo.", images: [{ src: "/images/services-generated/educazione-alimentare-1.webp", alt: "Dietista insegna a comporre un piatto equilibrato" }, { src: "/images/services-generated/educazione-alimentare-2.webp", alt: "Confronto pratico delle porzioni alimentari" }] },
    { slug: "composizione-corporea", title: "Analisi della composizione corporea", summary: "Circonferenze, bioimpedenziometria e plicometria, quando indicate, per andare oltre il numero sulla bilancia." },
    { slug: "percorso-nutrizionale", title: "Ricomposizione corporea e gestione del peso", summary: "Piano alimentare personalizzato e controlli periodici per perdita, aumento o ricomposizione del peso corporeo." },
    { slug: "nutrizione-condizioni-fisiologiche", title: "Nutrizione nelle diverse fasi della vita", summary: "Supporto personalizzato in gravidanza, menopausa e nei percorsi di prevenzione." },
    { slug: "nutrizione-patologie", title: "Nutrizione e condizioni patologiche", summary: "Gestione nutrizionale integrata di patologie diagnosticate, in confronto con il medico curante.", images: [{ src: "/images/services-generated/nutrizione-patologie-1.webp", alt: "Colloquio di nutrizione clinica per una condizione diagnosticata" }, { src: "/images/services-generated/nutrizione-patologie-2.webp", alt: "Adattamento di un piano nutrizionale clinico" }] },
    { slug: "nutrizione-gastrointestinale", title: "Nutrizione e disturbi gastrointestinali", summary: "Percorsi per reflusso, intestino irritabile, stipsi e gastrite già diagnosticati." },
    { slug: "nutrizione-sportiva", title: "Nutrizione sportiva", summary: "Alimentazione, composizione corporea ed eventuale integrazione coerenti con allenamenti e obiettivi dell’atleta." },
  ]},
];

const areaDetails: Record<string, { paragraphs: string[]; section: { title: string; items: string[] }; images: ServiceImage[] }> = {
  "fisioterapia-riabilitazione": {
    paragraphs: [
      "Il primo incontro parte dall’ascolto: raccogliamo la storia clinica, osserviamo il movimento e individuiamo insieme le attività che oggi risultano più difficili.",
      "Il trattamento viene poi adattato nel tempo, alternando tecniche manuali, esercizio terapeutico ed educazione per rendere i progressi concreti anche nella vita quotidiana.",
    ],
    section: { title: "Come si svolge il percorso", items: ["Valutazione funzionale iniziale", "Obiettivi concordati e misurabili", "Trattamento individuale", "Esercizi e indicazioni per casa", "Verifiche periodiche dei progressi"] },
    images: [{ src: "/images/services-generated/fisioterapia-1.webp", alt: "Fisioterapista guida un esercizio di mobilità" }, { src: "/images/services-generated/fisioterapia-2.webp", alt: "Valutazione fisioterapica del movimento" }],
  },
  "fisiatria": {
    paragraphs: [
      "La visita specialistica approfondisce i sintomi, la storia clinica e gli eventuali esami già eseguiti, per arrivare a un inquadramento chiaro e comprensibile.",
      "Quando utile, il medico dialoga con i professionisti del centro per integrare la valutazione con un percorso fisioterapico o riabilitativo coordinato.",
    ],
    section: { title: "Cosa portare alla visita", items: ["Referti ed esami recenti", "Elenco dei farmaci assunti", "Indicazioni del medico curante", "Domande e dubbi da approfondire"] },
    images: [{ src: "/images/services-generated/fisiatria-1.webp", alt: "Consulto fisiatrico con modello anatomico" }, { src: "/images/services-generated/fisiatria-2.webp", alt: "Valutazione clinica del movimento" }],
  },
  "ortopedia": {
    paragraphs: [
      "La visita specialistica approfondisce i sintomi, la storia clinica e gli esami già eseguiti per definire il percorso più appropriato.",
      "Quando utile, lo specialista dialoga con i fisioterapisti del centro per coordinare trattamento medico e recupero funzionale.",
    ],
    section: { title: "Cosa portare alla visita", items: ["Referti ed esami recenti", "Elenco dei farmaci assunti", "Indicazioni del medico curante", "Domande e dubbi da approfondire"] },
    images: [{ src: "/images/services-generated/ortopedia-1.webp", alt: "Consulto ortopedico con modello anatomico" }, { src: "/images/services-generated/ortopedia-2.webp", alt: "Esame ortopedico dell’arto superiore" }],
  },
  "otorinolaringoiatria": {
    paragraphs: [
      "La valutazione specialistica considera la persona e le diverse funzioni del distretto testa-collo, per individuare eventuali esami, terapie o percorsi integrati.",
      "La collaborazione con la fisioterapia è particolarmente utile quando vertigini, equilibrio e componenti cervicali richiedono competenze complementari.",
    ],
    section: { title: "Un percorso coordinato", items: ["Inquadramento specialistico", "Approfondimenti quando indicati", "Confronto con il fisioterapista", "Indicazioni chiare per il percorso"] },
    images: [{ src: "/images/services-generated/orl-1.webp", alt: "Strumenti per la valutazione otorinolaringoiatrica" }, { src: "/images/services-generated/orl-2.webp", alt: "Valutazione dell’equilibrio" }],
  },
  "pilates-postura": {
    paragraphs: [
      "Il lavoro parte da una valutazione del movimento e viene costruito sulle capacità della persona, senza protocolli uguali per tutti.",
      "Gli esercizi progrediscono gradualmente per migliorare mobilità, forza, controllo e consapevolezza, con la guida costante del fisioterapista.",
    ],
    section: { title: "Gli obiettivi del lavoro", items: ["Muoversi con maggiore consapevolezza", "Migliorare mobilità e controllo", "Rinforzare in modo graduale", "Gestire meglio posture e carichi", "Consolidare i risultati nel tempo"] },
    images: [{ src: "/images/services-generated/pilates-1.webp", alt: "Sessione di Pilates clinico su Reformer" }, { src: "/images/services-generated/pilates-2.webp", alt: "Esercizi di Pilates clinico a corpo libero" }],
  },
  "terapie-fisiche-infiltrative": {
    paragraphs: [
      "La terapia strumentale non viene proposta in modo isolato: il fisioterapista ne valuta l’indicazione e la inserisce, quando utile, in un progetto terapeutico più ampio.",
      "Parametri, frequenza e durata vengono definiti in base alla condizione, alla fase del recupero e alla risposta della persona al trattamento.",
    ],
    section: { title: "Un trattamento su indicazione", items: ["Valutazione prima del trattamento", "Parametri personalizzati", "Monitoraggio della risposta", "Integrazione con esercizio e terapia manuale"] },
    images: [{ src: "/images/services-generated/terapie-1.webp", alt: "Trattamento con laserterapia ad alta potenza" }, { src: "/images/services-generated/terapie-2.webp", alt: "Pressoterapia con compressione pneumatica" }],
  },
  "salute-benessere-donna": {
    paragraphs: [
      "Ogni fase della vita può portare esigenze diverse. Il colloquio iniziale permette di affrontarle con ascolto, riservatezza e obiettivi condivisi.",
      "Il percorso integra educazione, esercizio e trattamento fisioterapico, rispettando i tempi della persona e favorendo autonomia e consapevolezza.",
    ],
    section: { title: "Un percorso pensato per te", items: ["Colloquio e valutazione individuale", "Obiettivi condivisi", "Esercizi personalizzati", "Indicazioni per la quotidianità", "Controlli e progressione graduale"] },
    images: [{ src: "/images/services-generated/donna-1.webp", alt: "Percorso di movimento durante la gravidanza" }, { src: "/images/services-generated/donna-2.webp", alt: "Esercizio riabilitativo dedicato alla salute femminile" }],
  },
  "nutrizione-dieta": {
    paragraphs: [
      "Il percorso nutrizionale parte dalle abitudini reali, dalla storia clinica e dagli obiettivi personali, per costruire indicazioni compatibili con la vita di tutti i giorni.",
      "Gli incontri di controllo servono a leggere i cambiamenti, affrontare le difficoltà e adattare il piano senza rigidità, lavorando sulla sostenibilità nel tempo.",
    ],
    section: { title: "Le fasi del percorso", items: ["Anamnesi clinica e alimentare", "Definizione degli obiettivi", "Indicazioni personalizzate", "Controlli periodici", "Adattamento del piano nel tempo"] },
    images: [{ src: "/images/services-generated/nutrizione-1.webp", alt: "Consulenza nutrizionale con alimenti freschi" }, { src: "/images/services-generated/nutrizione-2.webp", alt: "Pianificazione di un’alimentazione personalizzata" }],
  },
};

const serviceEnhancements: Record<string, Partial<Pick<Service, "paragraphs" | "sections">>> = {
  "fisioterapia-muscoloscheletrica": {
    paragraphs: [
      "La terapia manuale è uno degli strumenti disponibili per le problematiche muscolari, articolari e funzionali. Le tecniche vengono scelte dopo la valutazione per lavorare su mobilità, tessuti e gestione del dolore.",
      "Il trattamento manuale non è un intervento isolato: viene integrato, quando necessario, con esercizio terapeutico, educazione e partecipazione attiva, per favorire un recupero completo e duraturo.",
    ],
    sections: [{ title: "Le principali tecniche", items: ["Terapia manuale ortopedica", "Mobilizzazioni e manipolazioni vertebrali", "Trattamento miofasciale", "Massoterapia", "Educazione del paziente e gestione attiva della problematica"] }],
  },
  "fisioterapia-sportiva": {
    paragraphs: [
      "La fisioterapia sportiva è dedicata a chi pratica attività fisica, dallo sportivo amatoriale all’atleta agonista. Il percorso previene gli infortuni, accompagna il recupero e prepara il ritorno graduale alla disciplina praticata.",
      "La Dott.ssa Voltan e il suo staff lavorano da anni al fianco di sportivi, squadre di calcio, pallavoliste, karatechi e atleti di altre discipline. Questa esperienza permette di considerare gesto atletico, carichi, prevenzione e ritorno alla competizione.",
      "La valutazione iniziale individua limitazioni, deficit di forza o mobilità e aspetti tecnici sui quali lavorare. L’obiettivo non è solo tornare a fare sport, ma farlo nel modo più sicuro e specifico possibile.",
    ],
    sections: [
      { title: "Il percorso sportivo", items: ["Prevenzione degli infortuni e delle recidive", "Recupero post-infortunio", "Riatletizzazione e recupero del gesto sportivo", "Taping e bendaggio sportivo", "Terapie fisiche quando indicate"] },
      { title: "Running Clinic", items: ["Valutazione delle caratteristiche del runner", "Educazione al gesto della corsa", "Gestione progressiva dei carichi", "Prevenzione degli infortuni", "Ritorno graduale alla corsa dopo un infortunio"] },
    ],
  },
  "fisioterapia-reumatologica": {
    paragraphs: [
      "Dolore, rigidità, affaticamento e limitazioni del movimento possono incidere a lungo sulla qualità di vita. La fisioterapia, integrata nel percorso medico e reumatologico, aiuta a mantenere o recuperare la funzionalità con un programma adattato alla fase della malattia.",
      "La convenzione con ALOMAR – Associazione Lombarda Malati Reumatici prevede condizioni dedicate agli associati e vuole rendere più accessibile un percorso fisioterapico specialistico e continuativo.",
    ],
    sections: [{ title: "Condizioni che possono beneficiare del percorso", items: ["Artrite reumatoide e artrite psoriasica", "Spondilite anchilosante e spondiloartriti", "Fibromialgia, artrosi e osteoporosi", "Connettiviti", "Lupus eritematoso sistemico", "Sclerosi sistemica e sindrome di Sjögren", "Altre patologie reumatologiche e autoimmuni"] }],
  },
  "fisioterapia-neurologica": {
    paragraphs: [
      "Il percorso è rivolto a persone con problematiche del sistema nervoso centrale o periferico che possono avere difficoltà nel movimento, nell’equilibrio, nella coordinazione o nelle attività quotidiane.",
      "La valutazione considera capacità residue, difficoltà e obiettivi personali. Il programma viene modificato nel tempo in base all’evoluzione della condizione e ai risultati raggiunti.",
    ],
    sections: [
      { title: "Condizioni trattate", items: ["Ictus e suoi esiti", "Sclerosi multipla", "Morbo di Parkinson", "SLA", "Traumi cranici e lesioni midollari", "Neuropatie periferiche", "Patologie neuromuscolari", "Atassie e disturbi della coordinazione"] },
      { title: "Come si svolge", items: ["Esercizio terapeutico specifico", "Recupero di forza e mobilità", "Equilibrio e coordinazione", "Cammino e passaggi posturali", "Attività della vita quotidiana", "Educazione di paziente e caregiver", "Programma domiciliare personalizzato"] },
    ],
  },
  "fisioterapia-prevenzione": {
    paragraphs: [
      "Prendersi cura del corpo significa intervenire prima della comparsa del problema, attraverso movimento, esercizio e consapevolezza. La valutazione può individuare limitazioni di mobilità, deficit di forza e abitudini che nel tempo favoriscono dolore o perdita di funzione.",
      "L’obiettivo non è attribuire ogni problema a una postura, ma migliorare i fattori modificabili: movimento, forza, controllo, gestione dei carichi e varietà delle posizioni.",
    ],
    sections: [{ title: "Su cosa possiamo lavorare", items: ["Prevenzione e gestione del mal di schiena", "Salute della colonna e gestione dei carichi", "Osteoporosi e perdita di massa ossea", "Sarcopenia e mantenimento della forza", "Equilibrio e prevenzione delle cadute", "Prevenzione degli infortuni nello sport"] }],
  },
  "riabilitazione": {
    paragraphs: ["L’esercizio terapeutico è una componente fondamentale della riabilitazione. Un programma specifico accompagna il recupero del movimento, della forza e della funzione e aiuta a mantenere nel tempo i risultati, riducendo il rischio di recidive."],
    sections: [{ title: "Comprende", items: ["Riabilitazione pre e post intervento chirurgico", "Riabilitazione post infortunio", "Riabilitazione post traumatica", "Riabilitazione motoria", "Esercizio terapeutico e Pilates"] }],
  },
  "pavimento-pelvico": {
    paragraphs: [
      "La riabilitazione del pavimento pelvico è rivolta a donne e uomini e viene costruita sulla specifica funzione da recuperare. L’obiettivo è migliorare benessere, controllo e qualità di vita.",
      "Il trattamento considera i tessuti, la coordinazione muscolare, la respirazione e i comportamenti quotidiani, adattando gli strumenti alla valutazione iniziale.",
    ],
    sections: [
      { title: "A chi si rivolge", items: ["Incontinenza urinaria o fecale", "Vaginismo e dispareunia", "Vulvodinia e neuropatia del pudendo", "Lichen vaginale", "Preparazione al parto e recupero post-gravidanza", "Dolore pelvico cronico", "Esiti post-chirurgici", "Problematiche prostatiche e post-prostatectomia", "Prolassi", "Disfunzioni intestinali e stipsi cronica"] },
      { title: "Il trattamento può combinare", items: ["Terapia manuale", "Esercizi di rinforzo o rilassamento", "Biofeedback", "Radiofrequenza", "Educazione comportamentale", "Respirazione e tecniche di rilassamento"] },
    ],
  },
  "sindromi-vertiginose": {
    paragraphs: [
      "La valutazione distingue e mette in relazione possibili componenti vestibolari e cervicogeniche. Le due condizioni possono coesistere e richiedere un programma integrato e progressivo.",
      "Oltre ai sintomi fisici, vertigini e instabilità possono generare paura del movimento. Il percorso aiuta a recuperare fiducia, equilibrio e autonomia nelle attività quotidiane.",
    ],
    sections: [
      { title: "Riabilitazione vestibolare", items: ["Manovre di riposizionamento quando indicate", "Esercizi di adattamento e compensazione", "Stabilizzazione dello sguardo", "Lavoro sull’equilibrio", "Educazione e programma domiciliare", "Collaborazione con l’otorinolaringoiatra"] },
      { title: "Componente cervicogenica", items: ["Terapia manuale cervicale", "Recupero del movimento del collo", "Coordinazione tra sistema cervicale, visivo e vestibolare", "Controllo motorio", "Progressione delle attività quotidiane"] },
    ],
  },
  "cefalee-muscolo-tensive": {
    paragraphs: [
      "Emicrania e cefalea muscolo-tensiva sono condizioni differenti ma possono coesistere. La valutazione considera regione cervicale, tensioni muscolari, articolazione temporo-mandibolare, postura, movimento e abitudini quotidiane.",
      "L’obiettivo è lavorare sui fattori muscoloscheletrici modificabili per ridurre frequenza e intensità degli episodi e migliorare la gestione nel tempo, sempre in accordo con il medico quando è coinvolta una terapia farmacologica.",
    ],
    sections: [{ title: "Come può aiutare la fisioterapia", items: ["Terapia manuale cervicale", "Trattamento dei tessuti molli", "Recupero della mobilità", "Valutazione e trattamento dell’ATM", "Esercizi di controllo motorio", "Educazione sulle abitudini rilevanti", "Programma domiciliare"] }],
  },
  "linfodrenaggio": {
    paragraphs: ["Una valutazione specialistica aiuta a comprendere la natura del gonfiore e a distinguere condizioni come linfedema e lipedema. Il percorso mira a favorire il drenaggio, la funzione e l’autogestione."],
    sections: [{ title: "Approccio multidisciplinare", items: ["Linfodrenaggio manuale", "Educazione alla patologia e all’autogestione", "Esercizio terapeutico", "Bendaggio elastocompressivo", "Linfotaping", "Pressoterapia terapeutica", "Correzione alimentare quando indicata"] }],
  },
  "riabilitazione-post-oncologica": {
    paragraphs: [
      "Interventi chirurgici, radioterapia, chemioterapia e altri trattamenti possono determinare dolore, rigidità, perdita di forza, aderenze cicatriziali, linfedema e riduzione della capacità fisica.",
      "Il percorso considera il tipo di tumore, i trattamenti effettuati, le eventuali complicanze e le condizioni cliniche attuali, nel rispetto delle indicazioni dell’équipe oncologica.",
    ],
    sections: [{ title: "Il percorso può comprendere", items: ["Esercizio terapeutico personalizzato", "Recupero della mobilità articolare e funzionale", "Trattamento di cicatrici e aderenze", "Riabilitazione del linfedema", "Progressione della resistenza allo sforzo", "Gestione di dolore e rigidità", "Recupero delle attività quotidiane e dell’autonomia"] }],
  },
  "idrokinesiterapia": {
    paragraphs: [
      "L’idrokinesiterapia sfrutta le proprietà dell’acqua per facilitare il movimento, ridurre il carico articolare e lavorare gradualmente su forza e funzionalità.",
      "FisioSalute si appoggia a una piscina riabilitativa con acqua calda e accesso tramite scala a gradini. Il lavoro in acqua viene integrato, quando indicato, con il percorso fisioterapico a terra.",
    ],
    sections: [{ title: "Quando può essere utile", items: ["Esiti di interventi chirurgici", "Traumi e infortuni", "Dolore o limitazione articolare", "Rigidità e riduzione della forza", "Difficoltà nel carico e nel cammino", "Condizioni neurologiche", "Linfedema e disturbi linfatici", "Recupero dell’autonomia"] }],
  },
  "fisioterapia-domiciliare": {
    paragraphs: [
      "Il servizio è rivolto a chi, per condizioni cliniche o difficoltà motorie, non riesce a raggiungere facilmente il centro. Il trattamento a casa mantiene la continuità della cura e lavora sulle difficoltà concrete della quotidianità.",
      "Nelle patologie neurologiche il domicilio permette di adattare esercizi e strategie agli spazi reali. Dopo interventi, ricoveri o immobilità consente di recuperare progressivamente mobilità, forza e sicurezza senza spostamenti difficili.",
      "Quando il paziente non riesce ad arrivare da noi, siamo noi ad arrivare da lui: gli spazi, le abitudini e le attività quotidiane diventano parte integrante di una riabilitazione personalizzata.",
    ],
    sections: [{ title: "A chi è rivolto", items: ["Persone con difficoltà nel cammino o negli spostamenti", "Recupero dopo interventi, ricoveri, traumi o fratture", "Patologie neurologiche", "Riduzione di forza e mobilità", "Condizioni croniche o degenerative", "Persone anziane o fragili", "Recupero delle autonomie quotidiane"] }],
  },
  "riatletizzazione-esercizio-specifico": {
    paragraphs: ["La fase finale del recupero collega la riabilitazione alle richieste reali dello sport. Il programma riproduce progressivamente gesti, intensità e carichi della disciplina, verificando sicurezza, controllo e tolleranza allo sforzo."],
    sections: [{ title: "Obiettivi", items: ["Recupero della forza specifica", "Progressione dei carichi", "Controllo del gesto atletico", "Prevenzione delle recidive", "Ritorno graduale ad allenamento e competizione"] }],
  },
  "fisiopilates-macchinari": {
    paragraphs: [
      "Il FisioPilates unisce i principi del Pilates alle competenze del fisioterapista. Le sedute con Reformer e Cadillac Worldpilates® si svolgono in rapporto 1:1 e partono da una valutazione fisioterapica e posturale.",
      "Resistenze e assistenze vengono adattate alle capacità della persona. Il macchinario è uno strumento al servizio del percorso, che può fare da ponte tra riabilitazione, prevenzione e attività fisica.",
    ],
    sections: [{ title: "Il lavoro può comprendere", items: ["Rinforzo muscolare", "Stabilità e controllo motorio", "Mobilità articolare", "Postura e allineamento", "Coordinazione e consapevolezza corporea", "Controllo del tronco", "Progressione individuale dell’esercizio"] }],
  },
  "pilates-clinico": {
    paragraphs: [
      "Il Pilates clinico può essere svolto individualmente o in piccoli gruppi omogenei. La dimensione ridotta consente al fisioterapista di controllare l’esecuzione e adattare gli esercizi alle capacità dei partecipanti.",
      "Quando serve un lavoro più mirato, la seduta individuale permette di modulare il programma sulla presenza di dolore, limitazioni e obiettivi specifici.",
    ],
    sections: [{ title: "Benefici e obiettivi", items: ["Postura e consapevolezza corporea", "Forza e controllo muscolare", "Mobilità e flessibilità", "Stabilità di colonna e bacino", "Mantenimento dei risultati riabilitativi", "Contrasto alla sedentarietà"] }],
  },
  "pilates-clinico-aperto": {
    paragraphs: [
      "Durante la stagione estiva FisioSalute organizza attività a corpo libero al Parco Bertesagni due volte alla settimana, unendo movimento, benessere e contatto con la natura.",
      "Nel corso dell’anno possono essere proposte anche esperienze e ritiri dedicati al benessere, con attività fisica, tempo all’aria aperta, relax e convivialità.",
    ],
    sections: [{ title: "Un’esperienza condivisa", items: ["Esercizi adattati al gruppo", "Attenzione alla postura", "Controllo e qualità del movimento", "Attività fisica all’aria aperta", "Socialità e benessere"] }],
  },
  "rieducazione-posturale": {
    paragraphs: [
      "La rieducazione posturale migliora consapevolezza, qualità del movimento e gestione delle posizioni quotidiane e lavorative.",
      "Il problema non è sempre una singola postura sbagliata, ma il mantenimento prolungato della stessa posizione. Il percorso analizza abitudini, carichi e attività per costruire strategie realmente applicabili nella quotidianità.",
    ],
    sections: [{ title: "Su cosa si lavora", items: ["Mobilità e controllo del movimento", "Posture lavorative", "Dolori cervicali, dorsali e lombari", "Tensioni muscolari e cefalee", "Educazione ergonomica", "Variazione delle posizioni durante la giornata"] }],
  },
  "preparazione-parto": {
    paragraphs: [
      "Prepararsi al parto significa conoscere e gestire pavimento pelvico, respiro, addome, bacino e posture durante gravidanza, nascita e recupero.",
      "Il lavoro non riguarda solo la contrazione: il pavimento pelvico deve saper anche rilassarsi, allungarsi e coordinarsi con respirazione e spinta. Il percorso è utile sia in previsione di parto vaginale sia di cesareo.",
    ],
    sections: [{ title: "Il percorso", items: ["Controllo neuromotorio del pavimento pelvico", "Mobilità del bacino", "Posizioni per travaglio e parto", "Respirazione e gestione della spinta", "Coordinazione tra addome e pavimento pelvico", "Postura e gestione del mal di schiena", "Preparazione al recupero post-partum"] }],
  },
  "recupero-post-partum": {
    paragraphs: [
      "Il recupero dopo la gravidanza parte dalla valutazione di pavimento pelvico, parete addominale, postura e movimento, considerando tipo di parto, tempi ed eventuali disturbi.",
      "La progressione accompagna la donna dalle attività quotidiane al ritorno allo sport, includendo i carichi reali della maternità come sollevare e portare il bambino.",
    ],
    sections: [{ title: "Aree di recupero", items: ["Attivazione e rilassamento del pavimento pelvico", "Coordinazione con respiro e addome", "Controllo della diastasi", "Trattamento della cicatrice del cesareo", "Forza, mobilità e stabilità", "Ritorno progressivo all’attività fisica"] }],
  },
  "diastasi-cicatrice-cesareo": {
    paragraphs: [
      "Una certa separazione dei retti è fisiologica in gravidanza e nei primi mesi dopo il parto. Quando persiste o si associa a perdita di controllo addominale, la valutazione considera addome, respirazione, postura e pavimento pelvico.",
      "Dopo la guarigione, la cicatrice del cesareo può essere trattata per rigidità, aderenze, sensibilità e tensioni. Quando opportuno, il percorso può integrarsi con la dietista per alimentazione, gonfiore e composizione corporea.",
    ],
    sections: [{ title: "Obiettivi", items: ["Controllo della parete addominale", "Attivazione del trasverso", "Gestione della pressione intra-addominale", "Coordinazione con pavimento pelvico e respiro", "Mobilità della cicatrice", "Recupero di forza e tono", "Ritorno all’attività fisica"] }],
  },
  "prevenzione-pavimento-pelvico": {
    paragraphs: [
      "Il pavimento pelvico deve essere forte, elastico e capace di coordinarsi con addome, respirazione e movimento durante cammino, corsa, salti, sport e sollevamento di carichi.",
      "Non è necessario attendere perdite urinarie, senso di peso o prolasso: prevenire significa prepararlo prima dei periodi di maggiore stress, come gravidanza, post-partum, sport ad alto impatto e menopausa.",
    ],
    sections: [{ title: "Prevenzione attiva", items: ["Valutazione della funzione", "Controllo di contrazione e rilassamento", "Gestione delle pressioni", "Coordinazione con il movimento", "Preparazione ai carichi quotidiani e sportivi"] }],
  },
  "movimento-benessere-femminile": {
    paragraphs: [
      "La prevenzione unisce fisioterapia, attività fisica, Pilates, alimentazione ed educazione ergonomica, adattandoli alla fase della vita e alle esigenze della donna.",
      "Gli esercizi personalizzati da svolgere anche a casa aiutano a consolidare i risultati. Quando sono presenti variazioni di peso, gonfiore o cambiamenti della composizione corporea, il supporto della dietista può integrare il lavoro sul movimento.",
    ],
    sections: [{ title: "Strumenti quotidiani", items: ["Esercizio terapeutico", "Pilates individuale o in piccoli gruppi", "Programmi domiciliari", "Supporto nutrizionale", "Educazione ergonomica", "Strategie contro sedentarietà e posture mantenute"] }],
  },
  "visita-dietistica": {
    paragraphs: [
      "La nutrizione sostiene salute fisica e mentale e può contribuire alla prevenzione e alla gestione integrata delle principali condizioni croniche.",
      "La prima visita raccoglie anamnesi clinica, patologica, farmacologica e alimentare, insieme a stile di vita, attività fisica, sedentarietà, sonno e obiettivi personali.",
    ],
    sections: [{ title: "La valutazione può comprendere", items: ["Peso e altezza", "Circonferenze corporee", "Bioimpedenziometria (BIA)", "Plicometria", "Analisi delle abitudini alimentari", "Definizione condivisa degli obiettivi"] }],
  },
  "educazione-alimentare": {
    paragraphs: ["Il percorso aiuta la persona o la famiglia a comprendere le proprie necessità e acquisire strumenti concreti, senza imporre una dieta rigida. Si analizzano ritmi, preferenze, abitudini e difficoltà per costruire scelte equilibrate, varie e sostenibili."],
    sections: [{ title: "Obiettivi", items: ["Maggiore consapevolezza alimentare", "Scelte applicabili alla quotidianità", "Prevenzione", "Equilibrio e varietà", "Rapporto più sereno con l’alimentazione"] }],
  },
  "composizione-corporea": {
    paragraphs: ["Peso e altezza non raccontano tutto. Circonferenze, BIA e plicometria permettono, quando indicate, di osservare distribuzione dei fluidi, massa grassa, massa magra e cambiamenti nel tempo."],
    sections: [{ title: "Strumenti", items: ["Circonferenze per monitorare variazioni e distribuzione delle masse", "BIA, esame rapido e non invasivo dello stato di idratazione e della composizione corporea", "Plicometria per stimare il tessuto adiposo sottocutaneo", "Monitoraggio nei percorsi di dimagrimento, ricomposizione e sport"] }],
  },
  "percorso-nutrizionale": {
    paragraphs: ["Dopo la prima visita viene elaborato un piano alimentare personalizzato per perdita, aumento o ricomposizione del peso. Obiettivi e frequenza dei controlli vengono concordati e il piano viene adattato in base a progressi e difficoltà."],
    sections: [{ title: "Le fasi", items: ["Raccolta dei dati anamnestici", "Obiettivi condivisi", "Piano alimentare personalizzato", "Visite di controllo", "Adattamento alle esigenze reali"] }],
  },
  "nutrizione-patologie": {
    paragraphs: ["In presenza di una condizione diagnosticata, il piano alimentare viene elaborato secondo le evidenze disponibili e in confronto con il medico e gli obiettivi terapeutici."],
    sections: [{ title: "Esempi di condizioni", items: ["Patologie cardiovascolari", "Diabete", "Celiachia", "Allergie", "Lipedema", "Altre condizioni diagnosticate"] }],
  },
  "nutrizione-condizioni-fisiologiche": {
    paragraphs: ["Il percorso adatta l’alimentazione alle richieste delle diverse fasi della vita e alle esigenze di prevenzione, evitando schemi standardizzati e considerando storia clinica, stile di vita e familiarità."],
    sections: [{ title: "Quando può essere utile", items: ["Gravidanza", "Menopausa", "Prevenzione in presenza di elevata familiarità per patologie", "Cambiamenti dello stile di vita", "Supporto alla salute muscolare e ossea"] }],
  },
  "nutrizione-gastrointestinale": {
    paragraphs: ["La nutrizione è importante nella gestione dei sintomi attribuibili a disturbi gastrointestinali diagnosticati. La sinergia tra alimentazione e fisioterapia può offrire un supporto integrato."],
    sections: [{ title: "Disturbi affrontati", items: ["Reflusso", "Sindrome dell’intestino irritabile", "Stipsi", "Gastrite"] }],
  },
  "nutrizione-sportiva": {
    paragraphs: ["Nutrizione, allenamento e recupero sono tre pilastri della performance. Il percorso considera composizione corporea, abitudini, eventuale integrazione, tipologia e volume degli allenamenti, orari, livello sportivo, competizioni e preferenze personali."],
    sections: [{ title: "Il piano considera", items: ["Tipologia e volume degli allenamenti", "Orari di allenamento", "Livello sportivo", "Eventuali competizioni", "Obiettivi di composizione corporea", "Gusti e preferenze personali", "Eventuale integrazione"] }],
  },
};

const generatedServiceImages: Record<string, ServiceImage[]> = Object.fromEntries([
  ["fisioterapia-sportiva", "fisioterapia-reumatologica", "fisioterapia-neurologica", "fisioterapia-prevenzione", "riabilitazione", "articolazione-temporo-mandibolare", "pavimento-pelvico", "sindromi-vertiginose", "cefalee-muscolo-tensive", "linfodrenaggio", "riabilitazione-post-oncologica", "idrokinesiterapia", "fisioterapia-domiciliare", "riatletizzazione-esercizio-specifico", "laserterapia", "tecarterapia", "pressoterapia", "terapie-infiltrative", "fisiopilates-macchinari", "pilates-clinico", "pilates-clinico-aperto", "rieducazione-posturale", "preparazione-parto", "recupero-post-partum"].map((slug) => [slug, [{ src: `/images/services-generated/${slug}.webp`, alt: `Immagine dedicata a ${slug.replaceAll("-", " ")}` }, { src: `/images/services-generated/${slug}-2.webp`, alt: `Seconda immagine dedicata a ${slug.replaceAll("-", " ")}` }]]),
  ["fisioterapia-muscoloscheletrica", "salute-donna-fasi-vita", "diastasi-cicatrice-cesareo", "prevenzione-pavimento-pelvico", "movimento-benessere-femminile", "fisiatria", "ortopedia", "otorinolaringoiatria", "visita-dietistica", "composizione-corporea", "percorso-nutrizionale", "nutrizione-condizioni-fisiologiche", "nutrizione-gastrointestinale", "nutrizione-sportiva"].map((slug) => [slug, [1, 2].map((index) => ({ src: `/images/services-generated/${slug}-${index}.webp`, alt: `Immagine dedicata a ${slug.replaceAll("-", " ")}` }))])
].flat());

export const allServices = serviceAreas.flatMap((area) => area.services.map((service) => {
  const defaults = areaDetails[area.slug];
  const enhancement = serviceEnhancements[service.slug];
  return {
    ...service,
    area,
    paragraphs: [...(enhancement?.paragraphs ?? service.paragraphs ?? []), ...defaults.paragraphs],
    sections: enhancement?.sections ?? (service.sections?.length ? service.sections : [defaults.section]),
    images: service.images ?? generatedServiceImages[service.slug] ?? defaults.images,
  };
}));
