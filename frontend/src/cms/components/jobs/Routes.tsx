import React from "react";
import { Route } from "react-router-dom";

import { ENavTab } from "../navTabs";

import Jobs from "./List";
import AddJob from "./AddJob";
import EditJob from "./EditJob";

export const JobRoutes: React.FC = () => (
  <>
    <Route
      exact
      path={`/cms/${ENavTab["Javni konkursi"]}/list`}
      component={Jobs}
    />
    <Route
      exact
      path={`/cms/${ENavTab["Javni konkursi"]}/add`}
      component={AddJob}
    />
    <Route
      exact
      path={`/cms/${ENavTab["Javni konkursi"]}/edit/:id`}
      component={EditJob}
    />
  </>
);
