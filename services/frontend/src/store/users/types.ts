export interface IUser {
  id: string;
  email: string;
  isEmailVerified: boolean;
  password: string;

  _created_at: string;
  _updated_at: string;
}
