import { useState, useEffect, useCallback, useRef, useReducer } from "react";

import { ArrayElement, Timestamp } from "shared";

import { useApiClient } from "./context";
import { resource, TRestUrlParams } from "./client";

export const useGetData = <T extends Timestamp>(args: {
  key: ArrayElement<typeof resource>;
  params?: TRestUrlParams<T>;
  lazy?: boolean;
}) => {
  const client = useApiClient();

  const { key, params, lazy } = args;

  const result = useRef<{
    data?: T[];
    isLoading?: boolean;
    refetch?: (_: Omit<typeof args, "key" | "lazy">) => void;
  }>({
    data: [],
    isLoading: null,
    refetch: (_args: Omit<typeof args, "key" | "lazy">) => {
      fetch(_args);
    },
  });

  const [tick, forceUpdate] = useReducer((x) => x + 1, 0);

  const fetch = useCallback(
    (innerArgs: Omit<typeof args, "key" | "lazy">) => {
      const _params = innerArgs?.params || params;
      if (!result.current.isLoading) {
        result.current.isLoading = true;
        forceUpdate();
        client
          .get<T>({ key, params: _params })
          .then((data) => {
            if (data) {
              result.current.data = data;
              forceUpdate();
            }
          })
          .finally(() => {
            result.current.isLoading = false;
            forceUpdate();
          });
      }
    },
    [client, key]
  );

  useEffect(() => {
    if (!lazy) fetch({ params });
  }, []);

  return result.current;
};

export const useGetOneData = <T extends Timestamp>({
  key,
  id,
  params,
}: {
  key: ArrayElement<typeof resource>;
  id: string;
  params?: TRestUrlParams<T>;
}) => {
  const client = useApiClient();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

  const fetch = useCallback(() => {
    setIsLoading(true);
    client
      .getOne<T>({ key, id, params })
      .then((data) => {
        if (data) setData(data);
      })
      .finally(() => setIsLoading(false));
  }, [key, id, client, setIsLoading]);

  useEffect(fetch, [id]);

  return { isLoading, data, refetch: fetch };
};
