import React from "react";

import {
  CssBaseline,
  Typography,
  Hidden,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import { locations, Location } from "@javnikonkursi/shared";

import MultipleSearchSelectInput from "components/forms/inputs/MultipleSearchSelectInput";
import { grey } from "@material-ui/core/colors";
import { IApplicationState } from "store";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { updateFilters } from "store/filters/actions";
import { getJobs } from "store/jobs/actions";
import { getCompanies } from "store/companies/actions";
import { Link } from "react-router-dom";
import Footer from "components/Footer";
import { useApiClient } from "api";

const drawerWidth = 400;

interface ISidebarProps {}

const selector = (state: IApplicationState) => ({
  companies: state.companies.data,

  companiesFilter: state.filters.companies,
  locationsFilter: state.filters.locations,
  shouldIncludeExpired: state.filters.shouldIncludeExpired,
});

const Sidebar = (props: React.PropsWithChildren<ISidebarProps>) => {
  const classes = useStyles();
  const theme = useTheme();
  const client = useApiClient();

  const dispatch = useDispatch();
  const { companies, companiesFilter, locationsFilter, shouldIncludeExpired } =
    useSelector(selector, shallowEqual);

  const companyOptions = companies.map((c) => ({
    value: c.id,
    label: c.title,
  }));

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    dispatch(getJobs(client));
    dispatch(getCompanies(client));
  }, [client]);

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography variant="h6">Filteri</Typography>
      </div>
      <div className={classes.filtersContainer}>
        <FormGroup row style={{ padding: "0 16px", minHeight: 48 }}>
          <FormControlLabel
            control={
              <Switch
                checked={shouldIncludeExpired}
                onChange={(event, checked) => {
                  dispatch(updateFilters({ shouldIncludeExpired: checked }));
                }}
                color="primary"
              />
            }
            label="Istekli konkursi"
          />
        </FormGroup>
        <Accordion square={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Lokacija</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MultipleSearchSelectInput
              className={classes["Sidebar-input"]}
              label="Izaberi..."
              options={
                locations.length === locationsFilter.length
                  ? ["Ukloni sve", ...locations]
                  : ["Izaberi sve", ...locations]
              }
              values={locationsFilter}
              onChange={(
                value: Array<Location | "Izaberi sve" | "Ukloni sve">
              ) => {
                if (value?.includes("Izaberi sve")) {
                  dispatch(
                    updateFilters({
                      locations: locations,
                    })
                  );
                } else if (value?.includes("Ukloni sve")) {
                  dispatch(
                    updateFilters({
                      locations: [],
                    })
                  );
                } else {
                  dispatch(
                    updateFilters({ locations: (value as Location[]) || [] })
                  );
                }
              }}
            />
          </AccordionDetails>
        </Accordion>
        {/* <Accordion square={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Zanimanje</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MultipleSearchSelectInput
              className={classes["Sidebar-input"]}
              label="Izaberi..."
              options={
                jobTypes.length === jobTypes.length
                  ? ["Ukloni sve", ...jobTypes]
                  : ["Izaberi sve", ...jobTypes]
              }
              values={jobTypes}
              onChange={(value) => {
                if (value.includes("Izaberi sve")) {
                  dispatch(
                    updateFilters({
                      jobTypes: jobTypes,
                    })
                  );
                } else if (value.includes("Ukloni sve")) {
                  dispatch(
                    updateFilters({
                      jobTypes: [],
                    })
                  );
                } else {
                  dispatch(updateFilters({ jobTypes: value }));
                }
              }}
            />
          </AccordionDetails>
        </Accordion> */}
        <Accordion square={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Ustanova/Preduzeće</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MultipleSearchSelectInput
              className={classes["Sidebar-input"]}
              label="Izaberi..."
              options={
                companyOptions.length === companiesFilter.length
                  ? [
                      { value: "Ukloni sve", label: "Ukloni sve" },
                      ...companyOptions,
                    ]
                  : [
                      { value: "Izaberi sve", label: "Izaberi sve" },
                      ...companyOptions,
                    ]
              }
              values={companiesFilter}
              onChange={(value) => {
                if (value?.includes("Izaberi sve")) {
                  dispatch(
                    updateFilters({
                      companies: companyOptions.map((c) => c.value),
                    })
                  );
                } else if (value?.includes("Ukloni sve")) {
                  dispatch(
                    updateFilters({
                      companies: [],
                    })
                  );
                } else {
                  dispatch(updateFilters({ companies: value || [] }));
                }
              }}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            Konkursi
          </Typography>
          <Typography variant="subtitle1" className={classes.subheading}>
            Svi javni konkursi na jednom mjestu
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <main className={classes.main}>
          <div className={classes.appBarSpacer} />
          {props.children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    subheading: {
      marginLeft: "5rem",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: {
      ...theme.mixins.toolbar,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    filtersContainer: {
      paddingTop: "2rem",
    },
    drawerPaper: {
      width: drawerWidth,
      maxWidth: "75vw",
    },
    content: {
      flexGrow: 1,
      padding: `0 ${theme.spacing(3)}px`,
      alignItems: "center",
      backgroundColor: grey[100],
      maxWidth: "100vw",
      minHeight: "100vh",
    },
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing(3)}px 0`,
      minHeight: "100%",
    },
    ["Sidebar-input"]: {
      width: "100%",
    },
  })
);

export default Sidebar;
