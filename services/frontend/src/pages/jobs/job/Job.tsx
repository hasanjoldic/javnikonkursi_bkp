import React from "react";

import { Box, Divider, Chip, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import {
  Place as PlaceIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  BusinessRounded as BusinessRoundedIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";

import { ArrayElement } from "@javnikonkursi/shared";

import { GetJobsQuery } from "generated/types";
import { dateFormat, EDateFormat } from "utils";

import { RouterButton } from "components";
import { useLocation } from "react-router-dom";
import { getJobInternalUrl } from "store";

const Chips = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& > .MuiChip-root": {
    backgroundColor: "white",
    height: "unset",
    minHeight: theme.spacing(4),
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0.125rem",
    "& > .MuiChip-label": {
      whiteSpace: "normal",
    },
  },
  [theme.breakpoints.up("lg")]: {
    display: "block",
    margin: "0.25rem",
  },
}));

const Buttons = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("md")]: {
    display: "grid",
    ".MuiButton-root": {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
  },
}));

const Root = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "50rem",
  padding: theme.spacing(4, 2),
  margin: "0 auto",
  marginBottom: theme.spacing(2),
}));

interface IProps {
  job: ArrayElement<GetJobsQuery["jobs"]["nodes"]>;
  // occupation: EJobType;
}

export const Job: React.FC<IProps> = (props) => {
  const { pathname } = useLocation();
  const { job } = props;

  const isDetailPage = pathname.includes("job");

  return (
    <Root id={job?.id} elevation={4}>
      <Typography variant="h5">{job?.title}</Typography>
      <Divider />
      <Box paddingY={1}>
        <Chips>
          <Chip icon={<PlaceIcon />} label={job?.region.title} />
          <Chip icon={<BusinessRoundedIcon />} label={job?.company.title} />
          {job?.jobType && <Chip icon={<WorkIcon />} label={job?.jobType.title} />}
          <Chip icon={<PeopleIcon />} label={job?.numberOfOpenings} />
        </Chips>
        <div></div>
      </Box>
      <Divider />
      <Box paddingY={1}>
        <Typography>Objavljeno: {dateFormat(job?.startDate, EDateFormat["dd.MM.yyyy"])}</Typography>
        <Typography>Ističe: {dateFormat(job?.endDate, EDateFormat["dd.MM.yyyy"])}</Typography>
      </Box>
      {isDetailPage && job?.notes && (
        <Box paddingY={1}>
          <Divider />
          <Box paddingY={1}>
            <Typography>{job.notes}</Typography>
          </Box>
          <Divider />
        </Box>
      )}
      <Box pt={2}>
        <Buttons>
          <Box>
            {!isDetailPage && (
              <RouterButton variant="contained" color="primary" id={job?.id} link={`job/${job?.id}`}>
                Otvori
              </RouterButton>
            )}
          </Box>
          <Box>
            {job?.externalUrl && (
              <Button
                target="_blank"
                href={job?.externalUrl}
                variant="outlined"
                color="primary"
                endIcon={<OpenInNewIcon />}
                sx={{ mr: 2 }}
              >
                Izvorni oglas
              </Button>
            )}
            <Button
              target="_blank"
              href={getJobInternalUrl(job?.id)}
              variant="outlined"
              color="primary"
              endIcon={<OpenInNewIcon />}
            >
              Arhivirani oglas
            </Button>
          </Box>
        </Buttons>
      </Box>
    </Root>
  );
};
