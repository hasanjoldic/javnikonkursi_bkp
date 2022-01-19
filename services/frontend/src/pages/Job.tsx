import React from "react";
import { useSelector } from "react-redux";

import {
  Chip,
  Typography,
  Paper,
  Divider,
  Button,
  styled,
  Box,
} from "@mui/material";
import {
  Place as PlaceIcon,
  People as PeopleIcon,
  BusinessRounded as BusinessRoundedIcon,
} from "@mui/icons-material";

import { Job as IJob } from "@javnikonkursi/shared";

import { IApplicationState } from "store";
import { momentFormat, EDateFormat } from "utils";

const Header = styled("div")(({ theme }) => ({
  padding: "1rem 0",
  [theme.breakpoints.up("md")]: {
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

const Chips = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("md")]: {
    "& > .MuiChip-root": {
      marginRight: "2rem",
    },
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",

    "& > .MuiChip-root": {
      marginBottom: ".5rem",
    },
  },
  "& > *": {
    backgroundColor: "#fff",
  },
}));

interface IProps {
  job: IJob;
  // occupation: EJobType;
}

export const Job: React.FC<IProps> = (props) => {
  const { job } = props;

  const companies = useSelector(
    (state: IApplicationState) => state.companies.data
  );
  const company = companies.find((c) => c.id === job.company_id);
  return (
    <Paper
      sx={{ width: "100%", padding: "2rem 1rem", marginBottom: 20 }}
      square={true}
    >
      <Typography variant="h5">{job.title}</Typography>
      <Divider />
      <Header>
        <Chips>
          <Chip icon={<PlaceIcon />} label={job.location} />
          {/* <Chip  icon={<PeopleIcon />} label={job.occupation} /> */}
          <Chip icon={<BusinessRoundedIcon />} label={company?.title} />
        </Chips>
        <div></div>
      </Header>
      <Divider />
      <Box sx={{ paddingTop: "1rem" }}>
        <Typography>
          Objavljeno: {momentFormat(job.start_date, EDateFormat["DD.MM.yyyy"])}
        </Typography>
        <br />
        <Typography>
          Ističe: {momentFormat(job.end_date, EDateFormat["DD.MM.yyyy"])}
        </Typography>
        <br />
        <div>
          <Button
            href={job.external_url}
            target="_blank"
            variant="contained"
            color="primary"
            style={{ marginRight: "2rem" }}
          >
            Link
          </Button>
          <Button
            href={`${process.env.AWS_S3_PATH}/${job.id}`}
            // href={`/static/${job.id}.${job.internal_filetype}`}
            target="_blank"
            variant="contained"
            color="primary"
          >
            Link (arhiva)
          </Button>
        </div>
      </Box>
    </Paper>
  );
};
