import { TDepartements } from "./types";

export const DEPARTEMENTS: TDepartements = {
  MATERNITE: { code: "MAT", label: "MATERNITE" },
  SOINS_CURRATIFS: { code: "SCR", label: "SOINS CURRATIFS" },
  SALLE_D_OP: { code: "SOP", label: "SALLE D'OP" },
};

export const SLIDES = [
  "https://npr.brightspotcdn.com/dims4/default/641dde2/2147483647/strip/true/crop/800x600+0+0/resize/880x660!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fkera%2Ffiles%2F201607%2Fsouthwestern_hospital.jpg",
  "https://thumbs.dreamstime.com/b/modern-hospital-high-tech-equipment-sleek-design-including-smart-beds-touch-screens-created-generative-ai-276659372.jpg",
  "https://media.istockphoto.com/id/1364075546/photo/empty-corridor-in-modern-hospital-with-information-counter-and-hospital-bed-in-rooms-3d.jpg?s=612x612&w=0&k=20&c=xxFDmIVpH1wJaaiorpvfzec4RRggSb48PDb_dU9bTjo=",
];

export const TIME_CONST = {
  ONE_SEC: 1000,
  ONE_MIN: 1000 * 60,
  ONE_HOUR: 1000 * 60 * 60,
};

export const MEDS_FORMS = {
  tablets: {
    label: "Comprimés",
    description:
      "Doses solides contenant des ingrédients actifs, généralement prises par voie orale.",
    value: "tablets",
  },
  capsules: {
    label: "Capsules",
    description:
      "Gélules remplies de poudre, de liquide ou de granulés, prises par voie orale.",
    value: "capsules",
  },
  liquids: {
    label: "Liquides (Sirop/Élixirs)",
    description:
      "Médicaments dissous ou suspendus dans un liquide, pris par voie orale.",
    value: "liquids",
  },
  injections: {
    label: "Injections",
    description:
      "Médicaments liquides administrés par aiguille dans les veines, les muscles ou sous la peau.",
    value: "injections",
  },
  topicals: {
    label: "Topiques",
    description: "Crèmes, pommades, gels et lotions appliqués sur la peau.",
    value: "topicals",
  },
  suppositories: {
    label: "Suppositoires",
    description:
      "Formes solides insérées dans le rectum, le vagin ou l'urètre, où elles se dissolvent.",
    value: "suppositories",
  },
  inhalers: {
    label: "Inhalateurs",
    description:
      "Dispositifs délivrant des médicaments directement dans les poumons, couramment utilisés pour les affections respiratoires.",
    value: "inhalers",
  },
  patches: {
    label: "Patches",
    description:
      "Patches adhésifs appliqués sur la peau, libérant des médicaments au fil du temps.",
    value: "patches",
  },
  drops: {
    label: "Gouttes",
    description:
      "Médicaments liquides appliqués directement dans les yeux, les oreilles ou le nez.",
    value: "drops",
  },
  lozenges: {
    label: "Pastilles",
    description:
      "Comprimés médicamenteux à dissoudre lentement dans la bouche.",
    value: "lozenges",
  },
  powders: {
    label: "Poudres",
    description:
      "Médicaments finement moulus, pris secs, dissous dans un liquide ou inhalés.",
    value: "powders",
  },
  granules: {
    label: "Granulés",
    description:
      "Petits grains ou granulés de médicament, souvent pris par voie orale avec de l'eau.",
    value: "granules",
  },
  transdermal: {
    label: "Systèmes transdermiques",
    description:
      "Patches ou disques appliqués sur la peau, libérant des médicaments dans la circulation sanguine.",
    value: "transdermal",
  },
  sprays: {
    label: "Sprays",
    description:
      "Médicaments liquides délivrés sous forme de fine brume, généralement pour application nasale ou de la gorge.",
    value: "sprays",
  },
  buccal_sublingual: {
    label: "Comprimés buccaux ou sublinguaux",
    description:
      "Dissous dans la bouche, entre la joue et la gencive (buccaux) ou sous la langue (sublinguaux) pour une absorption rapide.",
    value: "buccal_sublingual",
  },
  inhalants: {
    label: "Inhalants",
    description:
      "Médicaments gazeux ou volatils inhalés par le nez ou la bouche.",
    value: "inhalants",
  },
  suspensions: {
    label: "Suspensions",
    description:
      "Forme liquide avec de petites particules de médicament dispersées, nécessitant un mélange avant utilisation.",
    value: "suspensions",
  },
  emulsions: {
    label: "Émulsions",
    description:
      "Mélange de deux liquides qui ne se mélangent généralement pas, où l'un est dispersé sous forme de gouttelettes dans l'autre.",
    value: "emulsions",
  },
};
