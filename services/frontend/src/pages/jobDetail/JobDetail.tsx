import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { Box, Toolbar } from "@mui/material";

import { IApplicationState } from "store";
import { Main } from "components";
import { Job } from "pages/jobs/job";

export const JobDetail: React.FC = () => {
  const { id: jobId } = useParams<{ id: string }>();
  const jobs = useSelector((state: IApplicationState) => state.jobs.data);
  const job = jobs.find((job) => job.id === jobId);

  return (
    <>
      <Toolbar />
      <Box>
        <Main noMenu>
          <Box width="100%" display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Job job={job} />
          </Box>
        </Main>
      </Box>
    </>
  );
};
