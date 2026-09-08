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
      { label: "Area Otorinolaringoiatria", href: "/servizi/area/otorinolaringoiatria" },
      { label: "Riabilitazione delle sindromi vertiginose", href: "/servizi/sindromi-vertiginose" },
    ],
    href: "/equipe-medica#elio-basso-narducci",
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
      { label: "Area Ortopedia", href: "/servizi/area/ortopedia" },
      { label: "Terapie infiltrative", href: "/servizi/terapie-infiltrative" },
    ],
    href: "/equipe-medica#alberto-giuffrida",
  },
];

export const medicalSpecialistRefs = {
  narducci: {
    name: "Dott. Elio Basso Narducci",
    role: "Otorinolaringoiatra",
    href: "/equipe-medica#elio-basso-narducci",
  },
  giuffrida: {
    name: "Dott. Alberto Giuffrida",
    role: "Ortopedico e traumatologo",
    href: "/equipe-medica#alberto-giuffrida",
  },
} satisfies Record<string, MedicalSpecialistRef>;

export const medicalSpecialtyOptions = [...new Set(medicalSpecialists.flatMap((specialist) => specialist.specialties))];
