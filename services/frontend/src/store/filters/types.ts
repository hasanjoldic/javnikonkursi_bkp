import { ISelectOption } from "components";

export enum EFiltersActionTypes {
  SET_FILTERS = "@@filters/SET_FILTERS",
  UPDATE_FILTERS = "@@filters/UPDATE_FILTERS",
  RESET_FILTERS = "@@filters/RESET_FILTERS",
}

export interface IFiltersState {
  regions: ISelectOption[];
  jobTypes: ISelectOption[];
  companies: ISelectOption[];
  shouldIncludeExpired: boolean;
}
