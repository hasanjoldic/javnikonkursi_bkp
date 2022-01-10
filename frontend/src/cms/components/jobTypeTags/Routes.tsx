import React from "react";
import { Route } from "react-router-dom";

import { ENavTab } from "../navTabs";

import JobTypeTags from "./List";
import AddJobTypeTag from "./AddJobTypeTag";
import EditJobTypeTag from "./EditJobTypeTag";

export const JobTypeTagRoutes: React.FC = () => (
  <>
    <Route
      exact
      path={`/cms/${ENavTab["Oznake poslova"]}/list`}
      component={JobTypeTags}
    />
    <Route
      exact
      path={`/cms/${ENavTab["Oznake poslova"]}/add`}
      component={AddJobTypeTag}
    />
    <Route
      exact
      path={`/cms/${ENavTab["Oznake poslova"]}/edit/:id`}
      component={EditJobTypeTag}
    />
  </>
);
