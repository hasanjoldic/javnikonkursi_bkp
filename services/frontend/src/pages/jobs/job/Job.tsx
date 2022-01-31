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

const Header = styled("div")(({ theme }) => ({
  padding: "1rem 0",
  [theme.breakpoints.up("lg")]: {
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

const Chips = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("lg")]: {
    "& > .MuiChip-root": {
      marginRight: "2rem",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",

    "& > .MuiChip-root": {
      marginBottom: ".5rem",
    },
  },
  "& > *": {
    backgroundColor: "#fff",
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

interface IProps {
  job: ArrayElement<GetJobsQuery["jobs"]["nodes"]>;
  // occupation: EJobType;
}

export const Job: React.FC<IProps> = (props) => {
  const { pathname } = useLocation();
  const { job } = props;

  const isDetailPage = pathname.includes("job");

  return (
    <Paper
      id={job?.id}
      elevation={4}
      sx={{ maxWidth: "50rem", padding: "2rem 1rem", margin: "0 auto", marginBottom: "2rem" }}
      // square={true}
    >
      <Typography variant="h5">{job?.title}</Typography>
      <Divider />
      <Header>
        <Chips>
          <Chip icon={<PlaceIcon />} label={job?.region.title} />
          <Chip icon={<BusinessRoundedIcon />} label={job?.company.title} />
          {job?.jobType && <Chip icon={<WorkIcon />} label={job?.jobType.title} />}
          <Chip icon={<PeopleIcon />} label={job?.numberOfOpenings} />
        </Chips>
        <div></div>
      </Header>
      <Divider />
      <Box pt={1}>
        <Typography>Objavljeno: {dateFormat(job?.startDate, EDateFormat["dd.MM.yyyy"])}</Typography>
        <Typography>Ističe: {dateFormat(job?.endDate, EDateFormat["dd.MM.yyyy"])}</Typography>
        <br />
        <Buttons>
          <Box>
            {!isDetailPage && (
              <RouterButton variant="contained" color="primary" id={job?.id} link={`job/${job?.id}`}>
                Otvori
              </RouterButton>
            )}
          </Box>
          <Box>
            <Button
              target="_blank"
              href={job?.externalUrl}
              variant="outlined"
              color="primary"
              endIcon={<OpenInNewIcon />}
              sx={{ mr: 2 }}
            >
              Link (izvorni oglas)
            </Button>
            <Button
              target="_blank"
              href={job?.internalUrl}
              variant="outlined"
              color="primary"
              endIcon={<OpenInNewIcon />}
            >
              Link (arhivirani oglas)
            </Button>
          </Box>
        </Buttons>
      </Box>
    </Paper>
  );
};
