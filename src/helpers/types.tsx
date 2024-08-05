export type TUser = {
  id?: number;
  created_at?: Date;
  phone: string;
  password: string;
  deactivated: string | null;
  error?: boolean;
};

export type TPatient = {
  id?: number;
  created_at?: Date;
  nom: string;
  postnom: string;
  prenom: string;
  phone: string;
  dob: string;
  entered_at?: string;
  left_at?: string;
  dep: string;
  photo?: string;
};

export interface IDepartment {
  code: string;
  label: string;
}

export type TDepartements = { [key: string]: IDepartment };

export type TMed = {
  id?: number;
  created_at?: number;
  updated_at?: number;
  nom: string; // "Aspirine";
  nom_generique?: string; // "Acide Acétylsalicylique";
  dosage: string; // "500 mg";
  forme: string; // "Comprimé";
  fabricant?: string; // "Bayer";
  exp_date?: string; // "2025-01-01";
  need_presc?: string; // "Non";
  quantity: number; // 100;
  price: number; // 5.99;
  remarques?: string; // "Utilisé pour soulager la douleur";
  photo?: string;
};

export interface IFormSelectField {
  label: string;
  description: string;
  value: string;
}
