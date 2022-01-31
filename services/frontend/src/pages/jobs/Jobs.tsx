import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { isAfter } from "date-fns";
import _orderBy from "lodash/orderBy";

import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { IApplicationState } from "store";

import { Main } from "components";
import { Job } from "./job";
import { Filters } from "./Filters";

const Content = styled("main")(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(3),
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const Jobs: React.FC = () => {
  const { jobs, regionsFilter, jobTypesFilter, companiesFilter, shouldIncludeExpired } = useSelector(
    (state: IApplicationState) => ({
      jobs: state.jobs.data,
      regionsFilter: state.filters.regions,
      jobTypesFilter: state.filters.jobTypes,
      companiesFilter: state.filters.companies,
      shouldIncludeExpired: state.filters.shouldIncludeExpired,
    }),
    shallowEqual
  );

  const filteredJobs = _orderBy(
    jobs.filter((job) => {
      if (regionsFilter.length && !regionsFilter.includes(job.region.id)) {
        return false;
      }
      if (jobTypesFilter.length && !jobTypesFilter.includes(job.jobType?.id)) {
        return false;
      }
      if (companiesFilter.length && !companiesFilter.includes(job.company.id)) {
        return false;
      }
      if (!shouldIncludeExpired && isAfter(new Date(), new Date(job.endDate))) {
        return false;
      }
      return true;
    }),
    (job) => job._createdAt,
    "desc"
  );

  return (
    <Main>
      <Content>
        <Toolbar />
        <Box
          sx={{
            width: {
              xl: "50%",
            },
          }}
        >
          <Filters />
          <Box marginY={2}>
            <Divider />
          </Box>
          {!filteredJobs.length && (
            <Typography variant="h3" padding={1}>
              Nema konkursa za date filtere.
            </Typography>
          )}
          {filteredJobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </Box>
      </Content>
    </Main>
  );
};
