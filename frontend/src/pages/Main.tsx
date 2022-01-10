import React from "react";
import moment from "moment";
import _orderBy from "lodash/orderBy";

import Sidebar from "./Sidebar";
import Job from "./Job";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, shallowEqual } from "react-redux";
import { IApplicationState } from "store";

const selector = (state: IApplicationState) => ({
  locationsFilter: state.filters.locations,
  companiesFilter: state.filters.companies,
  shouldIncludeExpired: state.filters.shouldIncludeExpired,
});

const Main = () => {
  const classes = useStyles();

  const jobs = useSelector((state: IApplicationState) => state.jobs.data);

  const { locationsFilter, companiesFilter, shouldIncludeExpired } =
    useSelector<IApplicationState, ReturnType<typeof selector>>(
      selector,
      shallowEqual
    );

  const filteredJobs = _orderBy(
    jobs.filter((job) => {
      if (
        locationsFilter.length > 0 &&
        !locationsFilter.includes(job.location)
      ) {
        return false;
      }
      if (
        companiesFilter.length > 0 &&
        !companiesFilter.includes(job.company_id)
      ) {
        return false;
      }
      if (!shouldIncludeExpired && moment().isAfter(job.end)) {
        return false;
      }
      return true;
    }),
    (job) => job.created_at,
    "desc"
  );

  return (
    <div>
      <Sidebar>
        <div className={classes.content}>
          {filteredJobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>
      </Sidebar>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  content: {
    width: 960,
    maxWidth: "100vw",
    // padding: "4rem 2rem",
  },
  chip: {
    marginRight: 20,
  },
}));

export default Main;
