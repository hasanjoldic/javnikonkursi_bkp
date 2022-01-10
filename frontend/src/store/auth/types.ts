import { IUser } from "store/users/types";

export enum EAuthActionTypes {
  LOGIN_REQUEST = "@@auth/LOGIN_REQUEST",
  LOGIN_SUCCESS = "@@auth/LOGIN_SUCCESS",
  LOGIN_FAILURE = "@@auth/LOGIN_FAILURE",
  LOGOUT = "@@auth/LOGOUT",

  REGISTER_SUCCESS = "@@auth/REGISTER_SUCCESS",
}

export interface IAuthState {
  isLoading: boolean;
  accessToken: string;
  refreshToken: string;
  user: Partial<IUser>;
}
