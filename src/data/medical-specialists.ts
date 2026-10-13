export type MedicalSpecialistRef = {
  name: string;
  role: string;
  href: string;
};

export type MedicalSpecialist = MedicalSpecialistRef & {
  slug: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  specialties: string[];
  summary: string;
  education: string[];
  expertise: string[];
  serviceLinks: { label: string; href: string }[];
};

export const medicalSpecialists: MedicalSpecialist[] = [
  {
    slug: "elio-basso-narducci",
    name: "Dott. Elio Basso Narducci",
    role: "Medico chirurgo specialista in Otorinolaringoiatria · Direttore sanitario",
    image: "/images/medical-elio-basso-narducci.webp",
    imageWidth: 1080,
    imageHeight: 1456,
    specialties: ["Otorinolaringoiatria", "Distretto cervico-facciale", "Vertigini ed equilibrio", "Direzione sanitaria"],
    summary: "Si occupa della diagnosi e del trattamento delle principali patologie di orecchio, naso, gola e del distretto cervico-facciale, con particolare attenzione a udito, equilibrio, respirazione e voce.",
    education: ["Medico chirurgo", "Specialista in Otorinolaringoiatria", "Direttore sanitario di FisioSalute"],
    expertise: ["Otiti, ipoacusia e acufeni", "Vertigini e disturbi dell’equilibrio", "Sinusiti, poliposi e deviazione del setto nasale", "Patologie della gola e disturbi della voce", "Problemi respiratori e apnee notturne"],
    serviceLinks: [
      { label: "Area Otorinolaringoiatria", href: "/servizi/area/otorinolaringoiatria/" },
      { label: "Riabilitazione delle sindromi vertiginose", href: "/servizi/sindromi-vertiginose/" },
    ],
    href: "/equipe-medica/#elio-basso-narducci",
  },
  {
    slug: "gregorio-baldini",
    name: "Dott. Gregorio Baldini",
    role: "Fisiatra",
    image: "/images/medical-gregorio-baldini.webp",
    imageWidth: 1179,
    imageHeight: 1376,
    specialties: ["Fisiatria", "Riabilitazione ortopedica e funzionale", "Medicina manuale", "Riabilitazione respiratoria"],
    summary: "Il dott. Gregorio Baldini, Medico fisiatra con una lunga esperienza ospedaliera, ha lavorato per oltre 30 anni nei reparti di Recupero e Riabilitazione Funzionale e di Riabilitazione Ortopedica presso gli ospedali di Sondrio e Sondalo. La sua esperienza in ambito ospedaliero e riabilitativo arricchisce l’équipe FisioSalute, con l’obiettivo di offrire al paziente un percorso di cura personalizzato e multidisciplinare.",
    education: ["Medico fisiatra", "Specializzazione in fisiopatologia e fisiochinesiterapia respiratoria", "Oltre 30 anni di esperienza ospedaliera a Sondrio e Sondalo"],
    expertise: ["Riabilitazione ortopedica e funzionale", "Valutazione e trattamento delle problematiche dell’apparato muscolo-scheletrico", "Medicina manuale", "Riabilitazione respiratoria, grazie alla specializzazione in fisiopatologia e fisiochinesiterapia respiratoria"],
    serviceLinks: [
      { label: "Area Fisiatria", href: "/servizi/area/fisiatria/" },
    ],
    href: "/equipe-medica/#gregorio-baldini",
  },
  {
    slug: "alberto-giuffrida",
    name: "Dott. Alberto Giuffrida",
    role: "Medico chirurgo specialista in Ortopedia e Traumatologia",
    image: "/images/medical-alberto-giuffrida.webp",
    imageWidth: 1162,
    imageHeight: 1354,
    specialties: ["Ortopedia e traumatologia", "Chirurgia protesica", "Traumatologia dello sport", "Medicina rigenerativa"],
    summary: "Si occupa di chirurgia protesica di anca e ginocchio e di traumatologia dello sport, con un approccio personalizzato e integrato con il percorso riabilitativo.",
    education: ["Laurea in Medicina e Chirurgia · Università Cattolica del Sacro Cuore di Roma, 2017", "Specializzazione in Ortopedia e Traumatologia · Humanitas University di Milano, 2023"],
    expertise: ["Protesi d’anca con tecnica anteriore mininvasiva senza sezione muscolare", "Protesi di ginocchio con allineamento personalizzato", "Chirurgia robotica nella protesica di ginocchio", "Traumatologia dello sport", "Medicina rigenerativa della cartilagine", "Pubblicazioni scientifiche e partecipazione a congressi nazionali e internazionali"],
    serviceLinks: [
      { label: "Area Ortopedia", href: "/servizi/area/ortopedia/" },
      { label: "Terapie infiltrative", href: "/servizi/terapie-infiltrative/" },
    ],
    href: "/equipe-medica/#alberto-giuffrida",
  },
  {
    slug: "alberta-paiusco",
    name: "Dott.ssa Alberta Paiusco",
    role: "Medico chirurgo specialista in Urologia",
    image: "/images/medical-alberta-paiusco.webp",
    imageWidth: 1179,
    imageHeight: 1376,
    specialties: ["Urologia", "Disturbi della minzione", "Urodinamica", "Uro-oncologia"],
    summary: "La Dott.ssa Alberta Paiusco è specialista in Urologia, con una significativa esperienza ospedaliera maturata presso l’Ospedale di Sondrio. Nel corso della sua carriera ha ricoperto il ruolo di dirigente medico urologo e ha svolto attività specialistica in ambito ambulatoriale, occupandosi in particolare di urodinamica e uro-oncologia.",
    education: [
      "Laurea in Medicina e Chirurgia presso l’Università degli Studi di Milano.",
      "Specializzazione in Urologia presso l’Università degli Studi di Milano.",
      "Esperienza come dirigente medico urologo presso l’Ospedale di Sondrio.",
      "Responsabile dell’ambulatorio di urodinamica e dell’ambulatorio uro-oncologico.",
      "Responsabile dell’ambulatorio urologico distrettuale di Chiavenna.",
    ],
    expertise: [
      "Valutazione delle patologie dell’apparato urinario femminile e maschile.",
      "Disturbi della minzione e della funzionalità vescicale.",
      "Diagnostica urodinamica.",
      "Patologie urologiche in ambito uro-oncologico.",
    ],
    serviceLinks: [
      { label: "Area Urologia", href: "/servizi/area/urologia/" },
      { label: "Prima visita e controllo urologico", href: "/servizi/visita-urologica/" },
      { label: "Ecografia urologica femminile e maschile", href: "/servizi/ecografia-urologica-femminile/" },
    ],
    href: "/equipe-medica/#alberta-paiusco",
  },
];

export const medicalSpecialistRefs = {
  paiusco: {
    name: "Dott.ssa Alberta Paiusco",
    role: "Medico chirurgo specialista in Urologia",
    href: "/equipe-medica/#alberta-paiusco",
  },
  narducci: {
    name: "Dott. Elio Basso Narducci",
    role: "Otorinolaringoiatra",
    href: "/equipe-medica/#elio-basso-narducci",
  },
  giuffrida: {
    name: "Dott. Alberto Giuffrida",
    role: "Ortopedico e traumatologo",
    href: "/equipe-medica/#alberto-giuffrida",
  },
} satisfies Record<string, MedicalSpecialistRef>;

export const medicalSpecialtyOptions = [...new Set(medicalSpecialists.flatMap((specialist) => specialist.specialties))];
