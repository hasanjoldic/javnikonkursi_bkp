import { Dispatch } from "redux";

import { User } from "shared";
import { sendRequest } from "api";

import { EAuthActionTypes } from "./types";

export const loginRequest = () => ({
  type: EAuthActionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (payload: {
  user: User;
  accessToken: string;
  refreshToken: string;
}) => ({
  type: EAuthActionTypes.LOGIN_SUCCESS,
  payload,
});

export const registerSuccess = (email: string) => ({
  type: EAuthActionTypes.REGISTER_SUCCESS,
  payload: {
    email,
  },
});

export const loginFailure = () => ({
  type: EAuthActionTypes.LOGIN_FAILURE,
});

export const logout = () => ({
  type: EAuthActionTypes.LOGOUT,
});

export const login = (
  email: string,
  password: string,
  callback: () => void
) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    sendRequest<any>({
      dispatch,
      url: "/api/v1/login",
      request: {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      successCallback: (res) => {
        dispatch(loginSuccess(res));
      },
      failMessage: "Doslo je do greske prilikom prijave",
      optionalCallback: callback,
    });
  };
};

export const register = (
  {
    email,
    password,
    fullName,
  }: { email: string; password: string; fullName: string },
  callback: () => void
) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    sendRequest<any>({
      dispatch,
      url: "/api/v1/register",
      request: {
        method: "POST",
        body: JSON.stringify({ email, password, fullName }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      successCallback: (email) => dispatch(registerSuccess(email)),
      failMessage: "Doslo je do greske prikom registracije",
      optionalCallback: callback,
    });
  };
};
