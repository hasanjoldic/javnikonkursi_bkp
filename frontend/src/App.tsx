import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import Auth from "components/auth/Auth";
import { IApplicationState } from "store";
import Notifier from "components/Notifier";
import VerifyEmail from "pages/VerifyEmail";
import Main from "pages/Main";
import Cms from "cms";

const selector = (state: IApplicationState) => ({
  accessToken: state.auth.accessToken,
  isEmailVerified: state.auth.user?.isEmailVerified,
});

const App = () => {
  const classes = useStyles({});

  const { accessToken, isEmailVerified } = useSelector<
    IApplicationState,
    ReturnType<typeof selector>
  >(selector, shallowEqual);

  return (
    <Switch>
      <Route exact path="/verify-email" component={VerifyEmail} />
      <Route path="/cms" component={Cms} />
      <Route path="/" component={Main} />
      <Notifier />
    </Switch>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ["App-scene"]: {
      display: "flex",
      minHeight: "100%",
      transition: "all .5s",

      "& > :not(.nav)": {
        flexGrow: 1,
      },
    },
  })
);

export default App;
