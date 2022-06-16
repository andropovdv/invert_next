export interface IAuth {
  id: string;
  email: string | null;
  name?: string | null;
  token: string;
}
