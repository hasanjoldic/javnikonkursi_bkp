import { combineReducers } from "redux";

import auth from "store/auth/reducer";
import filters from "store/filters/reducer";
import notifications from "store/notifications/reducer";

import companies from "store/companies/reducer";
import jobs from "store/jobs/reducer";
import jobTypes from "store/jobTypes/reducer";
import jobTypeTags from "store/jobTypeTags/reducer";

import { EAuthActionTypes } from "./auth/types";

const appReducer = combineReducers({
  auth,
  filters,
  notifications,

  companies,
  jobs,
  jobTypes,
  jobTypeTags,
});

export type IApplicationState = ReturnType<typeof appReducer>;

function rootReducer(state = {}, action) {
  switch (action.type) {
    case EAuthActionTypes.LOGOUT:
      return appReducer({} as any, { type: null });
    default:
      return appReducer(state as any, action);
  }
}

export default rootReducer;

export type getStateFuncType = () => IApplicationState;

export * from "./auth";
export * from "./companies";
export * from "./filters";
export * from "./jobs";
export * from "./jobTypes";
export * from "./jobTypeTags";
