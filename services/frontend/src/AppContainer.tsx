import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SnackbarProvider } from "notistack";

import { IApplicationState, enqueueSnackbar, loginFailure } from "store";
import { createApiClient, ApiProvider } from "api";

import { App } from "App";

const AppContainer = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state: IApplicationState) => state.auth.accessToken
  );

  const apiClient = React.useMemo(() => {
    return createApiClient({
      accessToken: accessToken ? `bearer ${accessToken}` : null,
      onError: (err: Error, title: string) => {
        dispatch(
          enqueueSnackbar({
            message: title,
            options: {
              variant: "error",
            },
          })
        );
      },
      onUnauthorized: (hideError) => {
        if (!hideError) dispatch(loginFailure());
        // if (window.location.pathname !== "/login") {
        //   window.location.href = "/login";
        // }
      },
    });
  }, [dispatch, accessToken]);

  return (
    <BrowserRouter>
      <SnackbarProvider>
        <ApiProvider value={{ apiClient }}>
          <App />
        </ApiProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default hot(AppContainer);
