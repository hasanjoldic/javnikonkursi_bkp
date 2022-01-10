import { Job } from "shared";

export enum EJobsActionType {
  SET_JOBS = "@@jobs/SET_JOBS",
  SET_JOB = "@@jobs/SET_JOB",
}

export interface IJobsState {
  data: Job[];
}
