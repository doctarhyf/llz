export type User = {
  id?: number;
  created_at?: Date;
  phone: string;
  password: string;
  deactivated: string | null;
  error?: boolean;
};

export type Patient = {
  id?: number;
  created_at?: Date;
  nom: string;
  postnom: string;
  prenom: string;
  phone: string;
  dob: string;
  entered_at: string;
  left_at: string;
  dep: string;
  photo: string;
};
