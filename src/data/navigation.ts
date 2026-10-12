export const navigation = [
  { label: "Erika Voltan", href: "/erika-voltan/" },
  { label: "Servizi", href: "/servizi/" },
  { label: "Fisioterapisti", href: "/staff/" },
  { label: "Medici specialisti", href: "/equipe-medica/" },
  { label: "Altri professionisti", href: "/altri-professionisti/" },
  { label: "News", href: "/news/" },
  { label: "Recensioni", href: "/#recensioni" },
  { label: "Contatti", href: "/contatti/" },
] as const;

const professionalLabels = ["Erika Voltan", "Fisioterapisti", "Medici specialisti", "Altri professionisti"];
export const professionalNavigation = navigation.filter(({ label }) => professionalLabels.includes(label));
export const mainNavigation = navigation.filter(({ label }) => !professionalLabels.includes(label));
