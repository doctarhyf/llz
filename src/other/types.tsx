export type User = {
  id: number;
  phone: string;
  password: string;
  deactivated: string | null;
  error?: boolean;
};
