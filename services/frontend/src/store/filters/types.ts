import { JobType, Location } from "@javnikonkursi/shared";

export enum EFiltersActionTypes {
  SET_FILTERS = "@@filters/SET_FILTERS",
  UPDATE_FILTERS = "@@filters/UPDATE_FILTERS",
  RESET_FILTERS = "@@filters/RESET_FILTERS",
}

export interface IFiltersState {
  locations: Location[];
  jobTypes: JobType[];
  companies: string[];
  shouldIncludeExpired: boolean;
}
