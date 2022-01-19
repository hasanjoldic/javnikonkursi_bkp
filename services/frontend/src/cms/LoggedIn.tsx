import React from "react";
import { useLocation, useHistory, Switch } from "react-router-dom";

import {
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
  useGetCompanies,
  useGetJobs,
  useGetJobTypes,
  useGetJobTypeTags,
} from "store";

import { CompanyRoutes } from "./components/companies/Routes";
import { JobRoutes } from "./components/jobs/Routes";
import { JobTypeRoutes } from "./components/jobTypes/Routes";
import { JobTypeTagRoutes } from "./components/jobTypeTags/Routes";
import { ENavTab } from "./components/navTabs";

const drawerWidth = 240;

const LoggedIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  useGetCompanies();
  useGetJobs();
  useGetJobTypes();
  useGetJobTypeTags();

  return (
    <div className={classes.root}>
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
              selected={location.pathname.includes(tab[1])}
              onClick={() => history.push(`/cms/${tab[1]}/list`)}
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
        <JobTypeTagRoutes />
        {/* </Switch> */}
      </main>
    </div>
  );
};

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default LoggedIn;
