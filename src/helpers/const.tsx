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
