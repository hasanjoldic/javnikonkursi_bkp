import { Reducer } from "redux";

import { EJobsActionType, IJobsState } from "./types";
import { setJobs, setJob } from "./actions";

const INITIAL_STATE: IJobsState = {
  data: [],
};

const reducer: Reducer<IJobsState> = (
  state = INITIAL_STATE,
  action
): IJobsState => {
  switch (action.type) {
    case EJobsActionType.SET_JOBS: {
      const { data } = (action as ReturnType<typeof setJobs>).payload;
      return { ...INITIAL_STATE, data: data || [] };
    }

    case EJobsActionType.SET_JOB: {
      const { id, job } = (action as ReturnType<typeof setJob>).payload;
      const newData = state.data.filter((c) => c.id === id);
      if (job) {
        newData.push(job);
      }
      return { ...INITIAL_STATE, data: newData };
    }

    default:
      return state;
  }
};

export default reducer;
