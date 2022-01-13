import { Reducer } from "redux";

import { EJobTypesActionType, IJobTypesState } from "./types";
import { setJobTypes, setJobType } from "./actions";

const INITIAL_STATE: IJobTypesState = {
  data: [],
};

const reducer: Reducer<IJobTypesState> = (
  state = INITIAL_STATE,
  action
): IJobTypesState => {
  switch (action.type) {
    case EJobTypesActionType.SET_JOB_TYPES: {
      const { data } = (action as ReturnType<typeof setJobTypes>).payload;
      return { ...INITIAL_STATE, data: data || [] };
    }

    case EJobTypesActionType.SET_JOB_TYPE: {
      const { id, jobType } = (action as ReturnType<typeof setJobType>).payload;
      const newData = state.data.filter((c) => c.id === id);
      if (jobType) {
        newData.push(jobType);
      }
      return { ...INITIAL_STATE, data: newData };
    }

    default:
      return state;
  }
};

export default reducer;
