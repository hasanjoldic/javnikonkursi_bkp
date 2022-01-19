import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import moment from "moment";
import _orderBy from "lodash/orderBy";

import { Box } from "@mui/material";

import { IApplicationState } from "store";

import { Sidebar } from "./Sidebar";
import { Job } from "./Job";

export const Main: React.FC = () => {
  const { jobs, locationsFilter, companiesFilter, shouldIncludeExpired } =
    useSelector(
      (state: IApplicationState) => ({
        jobs: state.jobs.data,
        locationsFilter: state.filters.locations,
        companiesFilter: state.filters.companies,
        shouldIncludeExpired: state.filters.shouldIncludeExpired,
      }),
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
      if (!shouldIncludeExpired && moment().isAfter(job.end_date)) {
        return false;
      }
      return true;
    }),
    (job) => job._created_at,
    "desc"
  );

  return (
    <div>
      <Sidebar>
        <Box
          sx={{
            width: 960,
            maxWidth: "100vw",
            // padding: "4rem 2rem",
          }}
        >
          {filteredJobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </Box>
      </Sidebar>
    </div>
  );
};
