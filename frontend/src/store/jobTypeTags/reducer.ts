import { Reducer } from "redux";

import { EJobTypeTagsActionType, IJobTypeTagsState } from "./types";
import { setJobTypeTags, setJobTypeTag } from "./actions";

const INITIAL_STATE: IJobTypeTagsState = {
  data: [],
};

const reducer: Reducer<IJobTypeTagsState> = (
  state = INITIAL_STATE,
  action
): IJobTypeTagsState => {
  switch (action.type) {
    case EJobTypeTagsActionType.SET_JOB_TYPE_TAGS: {
      const { data } = (action as ReturnType<typeof setJobTypeTags>).payload;
      return { ...INITIAL_STATE, data };
    }

    case EJobTypeTagsActionType.SET_JOB_TYPE_TAG: {
      const { id, jobTypeTag } = (action as ReturnType<typeof setJobTypeTag>)
        .payload;
      const newData = state.data.filter((c) => c.id === id);
      if (jobTypeTag) {
        newData.push(jobTypeTag);
      }
      return { ...INITIAL_STATE, data: newData };
    }

    default:
      return state;
  }
};

export default reducer;
