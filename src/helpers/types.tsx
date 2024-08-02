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
  entered_at?: Date;
  left_at?: Date;
  dep: string;
  photo?: string;
};

export interface IDepartment {
  code: string;
  label: string;
}

export type TDepartements = { [key: string]: IDepartment };
