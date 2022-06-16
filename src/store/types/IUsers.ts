export type UserName = {
  first_name: string;
  last_name: string;
};

export interface Users {
  id: number;
  email: string;
  password?: string;
  name: UserName;
  location: string;
  length?: number;
}
