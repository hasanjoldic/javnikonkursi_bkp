import { ENotificationActionType, INotification } from "./types";

export const enqueueSnackbar = (
  notification: INotification
): {
  type: ENotificationActionType.ENQUEUE_SNACKBAR;
  notification: INotification;
} => ({
  type: ENotificationActionType.ENQUEUE_SNACKBAR,
  notification: {
    ...notification,
    options: { ...notification?.options },
    key: notification?.options?.key || new Date().getTime() + Math.random(),
  },
});

export const closeSnackbar = (key: string | number) => ({
  type: ENotificationActionType.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key: string | number) => ({
  type: ENotificationActionType.REMOVE_SNACKBAR,
  key,
});
