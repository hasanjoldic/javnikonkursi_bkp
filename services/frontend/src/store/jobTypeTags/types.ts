import { JobTypeTag } from "@javnikonkursi/shared";

export enum EJobTypeTagsActionType {
  SET_JOB_TYPE_TAGS = "@@job-type-tags/SET_JOB_TYPE_TAGS",
  SET_JOB_TYPE_TAG = "@@job-type-tags/SET_JOB_TYPE_TAG",
}

export interface IJobTypeTagsState {
  data: JobTypeTag[];
}
