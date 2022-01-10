import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import {
  Job,
  createJobTypeTagBodyType,
  updateJobTypeTagBodyType,
  TAnyVoidFunction,
  JobTypeTag,
} from "shared";
import { TApiClient, useApiClient } from "api";

import { IJobTypeTagsState, EJobTypeTagsActionType } from "./types";

export const setJobTypeTags = (data: IJobTypeTagsState["data"]) => ({
  type: EJobTypeTagsActionType.SET_JOB_TYPE_TAGS,
  payload: { data },
});

export const setJobTypeTag = (id: string, jobTypeTag: JobTypeTag) => ({
  type: EJobTypeTagsActionType.SET_JOB_TYPE_TAG,
  payload: { id, jobTypeTag },
});

export const getJobTypeTags = (
  apiClient: TApiClient,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch) => {
    const jobTypeTags = await apiClient.get<JobTypeTag>({
      key: "job_type_tags",
    });
    dispatch(setJobTypeTags(jobTypeTags));
    if (cb) cb();
  };
};

export const useGetJobTypeTags = () => {
  const dispatch = useDispatch();
  const apiClient = useApiClient();

  useEffect(() => {
    dispatch(getJobTypeTags(apiClient));
  }, [dispatch, apiClient]);
};

export const createJobTypeTag = (
  apiClient: TApiClient,
  input: createJobTypeTagBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const jobTypeTag = await apiClient.create<
      JobTypeTag,
      createJobTypeTagBodyType
    >({
      key: "job_type_tags",
      input,
    });
    dispatch(getJobTypeTags(apiClient));
    if (cb) cb();
  };
};

export const updateJobTypeTag = (
  apiClient: TApiClient,
  id: string,
  input: updateJobTypeTagBodyType,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const jobTypeTag = await apiClient.update<
      JobTypeTag,
      updateJobTypeTagBodyType
    >({
      key: "job_type_tags",
      id,
      input,
    });
    dispatch(getJobTypeTags(apiClient));
    if (cb) cb();
  };
};

export const deleteJobTypeTag = (
  apiClient: TApiClient,
  id: string,
  cb?: TAnyVoidFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    const isDeleted = await apiClient.delete({
      key: "job_type_tags",
      id,
    });
    dispatch(getJobTypeTags(apiClient));
    if (cb) cb();
  };
};
