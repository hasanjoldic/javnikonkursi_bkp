import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import {
  Job,
  TAnyVoidFunction,
  updateJobBodyType,
  createJobBodyType,
} from "@javnikonkursi/shared";

import { TApiClient, useApiClient } from "api";

import { IJobsState, EJobsActionType } from "./types";

export const setJobs = (data: IJobsState["data"]) => ({
  type: EJobsActionType.SET_JOBS,
  payload: { data },
});

export const setJob = (id: string, job: Job) => ({
  type: EJobsActionType.SET_JOB,
  payload: { id, job },
});

export const getJobs = (apiClient: TApiClient, cb?: TAnyVoidFunction) => {
  return async (dispatch: Dispatch) => {
    const jobs = await apiClient.get<Job>({ key: "jobs" });
    dispatch(setJobs(jobs));
    if (cb) cb();
  };
};

export const useGetJobs = () => {
  const dispatch = useDispatch();
  const apiClient = useApiClient();

  useEffect(() => {
    dispatch(getJobs(apiClient));
  }, [dispatch, apiClient]);
};

export const createJob = (
  apiClient: TApiClient,
  input: createJobBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const job = await apiClient.create<Job, createJobBodyType>({
      key: "jobs",
      input,
    });
    dispatch(getJobs(apiClient));
    if (cb) cb();
  };
};

export const updateJob = (
  apiClient: TApiClient,
  id: string,
  input: updateJobBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const job = await apiClient.update<Job, updateJobBodyType>({
      key: "jobs",
      id,
      input,
    });
    dispatch(getJobs(apiClient));
    if (cb) cb();
  };
};

export const deleteJob = (
  apiClient: TApiClient,
  id: string,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const isDeleted = await apiClient.delete({
      key: "jobs",
      id,
    });
    dispatch(getJobs(apiClient));
    if (cb) cb();
  };
};
