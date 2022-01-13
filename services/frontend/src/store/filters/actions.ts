import { IFiltersState, EFiltersActionTypes } from "./types";

export const setFilters = (filters: IFiltersState) => ({
  type: EFiltersActionTypes.SET_FILTERS,
  payload: { filters },
});

export const updateFilters = (filters: Partial<IFiltersState>) => ({
  type: EFiltersActionTypes.UPDATE_FILTERS,
  payload: { filters },
});

export const resetFilters = () => ({
  type: EFiltersActionTypes.RESET_FILTERS,
});
