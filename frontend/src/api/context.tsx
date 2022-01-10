import React, { createContext, useContext } from "react";

import { TApiClient } from "./client";

export interface IWithApi {
  apiClient: TApiClient;
}

export const ApiContext = createContext<IWithApi>(null);

export const useApiClient = () => {
  const { apiClient } = useContext(ApiContext);
  return apiClient;
};

export function withApi<P>(
  WrappedComponent: React.ComponentType<P>
): React.FC<Omit<P, keyof IWithApi>> {
  return (props) => {
    const apiClient = useApiClient();
    return <WrappedComponent apiClient={apiClient} {...(props as any)} />;
  };
}

export const ApiProvider = ApiContext.Provider;
