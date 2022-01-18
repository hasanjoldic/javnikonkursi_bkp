import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import {
  TAnyVoidFunction,
  JobType,
  createJobTypeBodyType,
  updateJobTypeBodyType,
} from "@javnikonkursi/shared";

import { TApiClient, useApiClient } from "api";

import { IJobTypesState, EJobTypesActionType } from "./types";

export const setJobTypes = (data: IJobTypesState["data"]) => ({
  type: EJobTypesActionType.SET_JOB_TYPES,
  payload: { data },
});

export const setJobType = (id: string, jobType: JobType) => ({
  type: EJobTypesActionType.SET_JOB_TYPE,
  payload: { id, jobType },
});

export const getJobTypes = (apiClient: TApiClient, cb?: TAnyVoidFunction) => {
  return async (dispatch: Dispatch) => {
    const jobTypes = await apiClient.get<JobType>({ key: "job_types" });
    dispatch(setJobTypes(jobTypes));
    if (cb) cb();
  };
};

export const useGetJobTypes = () => {
  const dispatch = useDispatch();
  const apiClient = useApiClient();

  useEffect(() => {
    dispatch(getJobTypes(apiClient));
  }, [dispatch, apiClient]);
};

export const createJobType = (
  apiClient: TApiClient,
  input: createJobTypeBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const job = await apiClient.create<JobType, createJobTypeBodyType>({
      key: "job_types",
      input,
    });
    dispatch(getJobTypes(apiClient));
    if (cb) cb();
  };
};

export const updateJobType = (
  apiClient: TApiClient,
  id: string,
  input: updateJobTypeBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const jobType = await apiClient.update<JobType, updateJobTypeBodyType>({
      key: "job_types",
      id,
      input,
    });
    dispatch(getJobTypes(apiClient));
    if (cb) cb();
  };
};

export const deleteJobType = (
  apiClient: TApiClient,
  id: string,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const isDeleted = await apiClient.delete({
      key: "job_types",
      id,
    });
    dispatch(getJobTypes(apiClient));
    if (cb) cb();
  };
};
