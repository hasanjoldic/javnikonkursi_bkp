import { Reducer } from "redux";

import { ECompaniesActionType, ICompaniesState } from "./types";
import { setCompanies, setCompany } from "./actions";

const INITIAL_STATE: ICompaniesState = {
  data: [],
};

const reducer: Reducer<ICompaniesState> = (
  state = INITIAL_STATE,
  action
): ICompaniesState => {
  switch (action.type) {
    case ECompaniesActionType.SET_COMPANIES: {
      const { data } = (action as ReturnType<typeof setCompanies>).payload;
      return { ...INITIAL_STATE, data: data || [] };
    }

    case ECompaniesActionType.SET_COMPANY: {
      const { id, company } = (action as ReturnType<typeof setCompany>).payload;
      const newData = state.data.filter((c) => c.id === id);
      if (company) {
        newData.push(company);
      }
      return { ...INITIAL_STATE, data: newData };
    }

    default:
      return state;
  }
};

export default reducer;
