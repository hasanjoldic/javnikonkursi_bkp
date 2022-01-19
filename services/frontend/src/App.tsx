import React from "react";
import { Switch, Route } from "react-router-dom";

import Notifier from "components/Notifier";
import { Main, VerifyEmail } from "./pages";
import { Cms } from "cms";

export const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/verify-email" component={VerifyEmail} />
      <Route path="/cms" component={Cms} />
      <Route path="/" component={Main} />
      <Notifier />
    </Switch>
  );
};
