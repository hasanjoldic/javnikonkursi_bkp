import React from "react";
import { Route } from "react-router-dom";

import { ENavTab } from "../navTabs";

import JobTypes from "./List";
import AddJobType from "./AddJobType";
import EditJobType from "./EditJobType";

export const JobTypeRoutes: React.FC = () => (
  <>
    <Route
      exact
      path={`/cms/${ENavTab["Vrste poslova"]}/add`}
      component={AddJobType}
    />
    <Route
      exact
      path={`/cms/${ENavTab["Vrste poslova"]}/edit/:id`}
      component={EditJobType}
    />
    <Route
      exact
      path={`/cms/${ENavTab["Vrste poslova"]}/list`}
      component={JobTypes}
    />
  </>
);
