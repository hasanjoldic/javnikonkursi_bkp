import { Reducer } from "redux";

import { ENotificationActionType, INotificationState } from "./types";
import { enqueueSnackbar, removeSnackbar, closeSnackbar } from "./actions";

const INITIAL_STATE: INotificationState = {
  notifications: [],
};

const reducer: Reducer<INotificationState> = (state = INITIAL_STATE, _action) => {
  switch (_action.type) {
    case ENotificationActionType.ENQUEUE_SNACKBAR: {
      const action = _action as ReturnType<typeof enqueueSnackbar>;
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
            options: action.notification?.options || {},
          },
        ],
      };
    }

    case ENotificationActionType.CLOSE_SNACKBAR: {
      const action = _action as ReturnType<typeof closeSnackbar>;
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          return action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification };
        }),
      };
    }

    case ENotificationActionType.REMOVE_SNACKBAR: {
      const action = _action as ReturnType<typeof removeSnackbar>;
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.key !== action.key),
      };
    }

    default:
      return state;
  }
};

export default reducer;
