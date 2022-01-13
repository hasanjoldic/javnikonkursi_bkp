import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import { Company, TAnyVoidFunction } from "@javnikonkursi/shared";
import {
  createCompanyBodyType,
  updateCompanyBodyType,
} from "@javnikonkursi/backend";

import { TApiClient, useApiClient } from "api";

import { ICompaniesState, ECompaniesActionType } from "./types";

export const setCompanies = (data: ICompaniesState["data"]) => ({
  type: ECompaniesActionType.SET_COMPANIES,
  payload: { data },
});

export const setCompany = (id: string, company: Company) => ({
  type: ECompaniesActionType.SET_COMPANY,
  payload: { id, company },
});

export const getCompanies = (apiClient: TApiClient) => {
  return async (dispatch: Dispatch) => {
    const companies = await apiClient.get<Company>({ key: "companies" });
    dispatch(setCompanies(companies));
  };
};

export const useGetCompanies = () => {
  const dispatch = useDispatch();
  const apiClient = useApiClient();

  useEffect(() => {
    dispatch(getCompanies(apiClient));
  }, [dispatch, apiClient]);
};

export const createCompany = (
  apiClient: TApiClient,
  input: createCompanyBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const company = await apiClient.create<Company, createCompanyBodyType>({
      key: "companies",
      input,
    });
    dispatch(getCompanies(apiClient));
    if (cb) cb();
  };
};

export const updateCompany = (
  apiClient: TApiClient,
  id: string,
  input: updateCompanyBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const company = await apiClient.update<Company, updateCompanyBodyType>({
      key: "companies",
      id,
      input,
    });
    dispatch(getCompanies(apiClient));
    if (cb) cb();
  };
};

export const deleteCompany = (
  apiClient: TApiClient,
  id: string,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const isDeleted = await apiClient.delete({
      key: "companies",
      id,
    });
    dispatch(getCompanies(apiClient));
    if (cb) cb();
  };
};
