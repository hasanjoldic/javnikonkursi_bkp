import { EJobType } from "shared/jobTypes";
import { TLocation } from "shared/locations";

export enum EFiltersActionTypes {
  SET_FILTERS = "@@filters/SET_FILTERS",
  UPDATE_FILTERS = "@@filters/UPDATE_FILTERS",
  RESET_FILTERS = "@@filters/RESET_FILTERS",
}

export interface IFiltersState {
  locations: TLocation[];
  jobTypes: EJobType[];
  companies: string[];
  shouldIncludeExpired: boolean;
}
