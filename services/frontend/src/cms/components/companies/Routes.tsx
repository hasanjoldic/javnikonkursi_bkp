import React from "react";
import { Route } from "react-router-dom";

import { ENavTab } from "../navTabs";

import { Companies } from "./List";
import { AddCompany } from "./AddCompany";
import { EditCompany } from "./EditCompany";

export const CompanyRoutes: React.FC = () => (
  <>
    <Route
      exact
      path={`/cms/${ENavTab["Javne ustanove/preduzeca"]}/list`}
      component={Companies}
    />
    <Route
      exact
      path={`/cms/${ENavTab["Javne ustanove/preduzeca"]}/add`}
      component={AddCompany}
    />
    <Route
      path={`/cms/${ENavTab["Javne ustanove/preduzeca"]}/edit/:id`}
      component={EditCompany}
    />
  </>
);
