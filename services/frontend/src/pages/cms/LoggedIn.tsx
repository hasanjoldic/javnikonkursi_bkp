import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { QueryResult } from "@apollo/client";

import { Box, CssBaseline, Theme, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useGetCompanies, useGetJobs, useGetJobTypes, useGetJobTags, useGetRegions } from "store";

import { drawerWidth } from "components";

import { CompanyRoutes } from "./components/companies/Routes";
import { JobRoutes } from "./components/jobs/Routes";
import { JobTypeRoutes } from "./components/jobTypes/Routes";
import { JobTagRoutes } from "./components/jobTags/Routes";
import { ENavTab } from "./components/navTabs";

export const CmsContext = React.createContext<{
  refetchCompanies: QueryResult["refetch"];
  refetchJobs: QueryResult["refetch"];
  refetchJobTypes: QueryResult["refetch"];
  refetchJobTags: QueryResult["refetch"];
}>({
  refetchCompanies: () => null,
  refetchJobs: () => null,
  refetchJobTypes: () => null,
  refetchJobTags: () => null,
});

export const useCmsContext = () => {
  return React.useContext(CmsContext);
};

const tabs = Object.entries(ENavTab);

export const LoggedIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const [value, setValue] = React.useState(tabs.findIndex((o) => pathname.includes(o[1])));

  useGetRegions();
  const { refetch: refetchCompanies } = useGetCompanies();
  const { refetch: refetchJobs } = useGetJobs();
  const { refetch: refetchJobTypes } = useGetJobTypes();
  const { refetch: refetchJobTags } = useGetJobTags();

  const handleChange = (_event, value) => {
    setValue(value);
    history.push(`/cms/${tabs[value][1]}`);
  };

  return (
    <CmsContext.Provider value={{ refetchCompanies, refetchJobs, refetchJobTypes, refetchJobTags }}>
      <Box display="flex" flexDirection="column">
        <CssBaseline />
        <Tabs value={value} onChange={handleChange} centered>
          {tabs.map((tab) => (
            <Tab key={tab[0]} label={tab[0]} />
          ))}
        </Tabs>
        <main className={classes.content}>
          {/* <Switch> */}
          <CompanyRoutes />
          <JobRoutes />
          <JobTypeRoutes />
          <JobTagRoutes />
          {/* </Switch> */}
        </main>
      </Box>
    </CmsContext.Provider>
  );
};

const useStyles = makeStyles<Theme>((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
