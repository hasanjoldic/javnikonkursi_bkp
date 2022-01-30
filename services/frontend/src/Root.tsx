import React from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SnackbarProvider } from "notistack";

import { IApplicationState, enqueueSnackbar, loginFailure } from "store";
import { createApiClient, ApiProvider } from "api";

import { Notifier, Footer, ScrollToTop } from "components";
import { Jobs, JobDetail, Cms, VerifyEmail } from "./pages";

export const Root: React.FC = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state: IApplicationState) => state.auth.accessToken);

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
    <SnackbarProvider>
      <ApiProvider value={{ apiClient }}>
        <ScrollToTop />
        <div>
          <Switch>
            <Route exact path="/verify-email" component={VerifyEmail} />
            <Route path="/cms" component={Cms} />
            <Route path="/job/:id" component={JobDetail} />
            <Route path="/" component={Jobs} />
            <Notifier />
          </Switch>
        </div>
        <Footer />
      </ApiProvider>
    </SnackbarProvider>
  );
};
