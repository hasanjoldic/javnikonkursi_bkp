import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { QueryResult } from "@apollo/client";

import { Box, Drawer, CssBaseline, List, ListItem, ListItemText, Theme } from "@mui/material";
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

export const LoggedIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  useGetRegions();
  const { refetch: refetchCompanies } = useGetCompanies();
  const { refetch: refetchJobs } = useGetJobs();
  const { refetch: refetchJobTypes } = useGetJobTypes();
  const { refetch: refetchJobTags } = useGetJobTags();

  React.useEffect(() => {
    if (!pathname.includes("add") && !pathname.includes("edit")) {
    }
  }, [pathname]);

  return (
    <CmsContext.Provider value={{ refetchCompanies, refetchJobs, refetchJobTypes, refetchJobTags }}>
      <Box display="flex">
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <List>
            {Object.entries(ENavTab).map((tab) => (
              <ListItem
                key={tab[0]}
                button
                selected={pathname.includes(tab[1])}
                onClick={() => history.push(`/cms/${tab[1]}`)}
              >
                <ListItemText primary={tab[0]} />
              </ListItem>
            ))}
          </List>
        </Drawer>
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
