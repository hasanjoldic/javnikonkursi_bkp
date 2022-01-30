import { OptionsObject } from "notistack";

export enum ENotificationActionType {
  ENQUEUE_SNACKBAR = "@@notification/ENQUEUE_SNACKBAR",
  CLOSE_SNACKBAR = "@@notification/CLOSE_SNACKBAR",
  REMOVE_SNACKBAR = "@@notification/REMOVE_SNACKBAR",
}

export interface INotification {
  key?: string | number;
  message: string;
  options?: OptionsObject;
  dismissed?: boolean;
}

export interface INotificationState {
  notifications: INotification[];
}
