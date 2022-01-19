import { Dispatch } from "redux";
import { enqueueSnackbar } from "store/notifications/actions";
import { logout } from "store/auth/actions";

import env from "env";

export const sendRequest = async <T>({
  dispatch,
  url,
  request,
  successCallback,
  failMessage,
  optionalCallback,
}: {
  dispatch: Dispatch;
  url: RequestInfo;
  request: RequestInit;
  successCallback: (response: T) => void;
  failMessage: string;
  optionalCallback?: (response: T) => void;
}) => {
  let err;
  try {
    const response = await fetch(`${env.API_FULL_PATH}${url}`, request);
    // const response = await fetch(url, request);
    if (response.status === 401) {
      dispatch(
        enqueueSnackbar({
          message: "Sesija je istekla. Molimo, prijavite se ponovo.",
          options: {
            variant: "error",
          },
        })
      );
      dispatch(logout());
      return;
    }
    if (response.ok) {
      response.json().then((responseJSON) => {
        successCallback(responseJSON);
        if (optionalCallback) {
          optionalCallback(responseJSON);
        }
      });
    } else {
      err = await response.json();
    }
  } catch (err) {
    err = err;
  }
  if (err) {
    dispatch(
      enqueueSnackbar({
        message: failMessage,
        options: {
          variant: "error",
        },
      })
    );
  }
};

import { ArrayElement, Timestamp } from "@javnikonkursi/shared";

export type TRestUrlParams<T> = {
  [key in keyof T]?: string;
} & {
  "createdAt>"?: string;
  "createdAt<"?: string;
};

export const resource = ["companies", "job_type_tags", "job_types", "jobs"];

export function createApiClient({
  accessToken,
  onError,
  onUnauthorized,
}: {
  accessToken: string;
  onError: (err: unknown, label: string) => void;
  onUnauthorized: (hideError?: boolean) => void;
}) {
  const headers: Record<string, string> = { authorization: accessToken };

  const createUrl = <T extends Timestamp>(
    urlStr: string,
    params?: TRestUrlParams<T>
  ) => {
    const url = new URL([API_FULL_PATH, urlStr].join("/"));
    if (params)
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

    return url.href;
  };

  const handleServerError = async (
    res: Response,
    errorMessage: string
  ): Promise<void> => {
    if (res?.status === 401) return onUnauthorized();
    const err = await res.json();
    onError(err, errorMessage);
  };

  return {
    getOne: async <T extends Timestamp>({
      id,
      key,
      params,
    }: {
      id: string;
      key: ArrayElement<typeof resource>;
      params?: TRestUrlParams<T>;
    }): Promise<T> => {
      if (!headers?.authorization) {
        onUnauthorized(true);
        return;
      }
      const errorMessage = `Error loading ${key}`;
      try {
        const url = createUrl([key, id].join("/"), params);
        const res = await fetch(url, { headers });
        if (!res.ok) handleServerError(res, errorMessage);
        else {
          return res.json();
        }
      } catch (err) {
        onError(err, errorMessage);
      }
    },
    get: async <T extends Timestamp>({
      key,
      params,
    }: {
      key: ArrayElement<typeof resource>;
      params?: TRestUrlParams<T>;
    }): Promise<T[]> => {
      if (!headers?.authorization) {
        onUnauthorized(true);
        return;
      }
      const errorMessage = `Error loading ${key}`;
      try {
        const url = createUrl(key, params);
        const res = await fetch(url, { headers });
        if (!res.ok) {
          handleServerError(res, errorMessage);
        } else {
          return res.json();
        }
      } catch (err) {
        onError(err, errorMessage);
      }
    },
    create: async <T extends Timestamp, TCreate>({
      key,
      input,
    }: {
      key: ArrayElement<typeof resource>;
      input: TCreate;
    }): Promise<T> => {
      if (!headers?.authorization) {
        onUnauthorized(true);
        return;
      }
      const errorMessage = `Error creating a ${key}`;
      try {
        const url = createUrl(key);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        if (!res.ok) handleServerError(res, errorMessage);
        else return res.json();
      } catch (err) {
        onError(err, errorMessage);
      }
    },
    update: async <T extends Timestamp, TUpdate>({
      key,
      id,
      input,
    }: {
      key: ArrayElement<typeof resource>;
      id: string;
      input: TUpdate;
    }): Promise<T> => {
      if (!headers?.authorization) {
        onUnauthorized(true);
        return;
      }
      const errorMessage = `Error updating a ${key}`;
      try {
        const url = createUrl([key, id].join("/"));
        const res = await fetch(url, {
          method: "PATCH",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        if (!res.ok) handleServerError(res, errorMessage);
        else return res.json();
      } catch (err) {
        onError(err, errorMessage);
      }
    },
    delete: async ({
      key,
      id,
    }: {
      key: ArrayElement<typeof resource>;
      id: string;
    }): Promise<boolean> => {
      if (!headers?.authorization) {
        onUnauthorized(true);
        return;
      }
      const errorMessage = `Error deleting a ${key}`;
      try {
        const url = createUrl([key, id].join("/"));
        const res = await fetch(url, {
          method: "DELETE",
          headers,
        });
        if (!res.ok) handleServerError(res, errorMessage);
        else return true;
      } catch (err) {
        onError(err, errorMessage);
      }
      return false;
    },
    request: async <T>({ path }: { path: string }): Promise<T> => {
      if (!headers?.authorization) {
        onUnauthorized(true);
        return;
      }
      const errorMessage = `Error with request ${path}`;
      try {
        const url = createUrl(path);
        const res = await fetch(url, { headers });
        if (!res.ok) {
          handleServerError(res, errorMessage);
        } else {
          return res.json();
        }
      } catch (err) {
        onError(err, errorMessage);
      }
    },
  };
}

export type TApiClient = ReturnType<typeof createApiClient>;
