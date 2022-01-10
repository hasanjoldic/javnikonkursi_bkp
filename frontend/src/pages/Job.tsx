import React from "react";
import { Chip, Typography, Paper, Divider, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Place as PlaceIcon,
  People as PeopleIcon,
  BusinessRounded as BusinessRoundedIcon,
} from "@material-ui/icons";
import { IJob } from "store/jobs/types";
import { useSelector } from "react-redux";
import { IApplicationState } from "store";
import { momentFormat, EDateFormat } from "utils/dates";

interface IJobProps {
  job: IJob;
  // occupation: EJobType;
}

const Job = (props: IJobProps) => {
  const { job } = props;
  const classes = useStyles();

  const companies = useSelector(
    (state: IApplicationState) => state.companies.data
  );
  const company = companies.find((c) => c.id === job.company_id);
  return (
    <Paper className={classes.root} square={true}>
      <Typography variant="h5">{job.title}</Typography>
      <Divider />
      <div className={classes.header}>
        <div className={classes.chipsContainer}>
          <Chip
            className={classes.chip}
            icon={<PlaceIcon />}
            label={job.location}
          />
          {/* <Chip className={classes.chip} icon={<PeopleIcon />} label={job.occupation} /> */}
          <Chip
            className={classes.chip}
            icon={<BusinessRoundedIcon />}
            label={company?.title}
          />
        </div>
        <div></div>
      </div>
      <Divider />
      <div className={classes.body}>
        <Typography>
          Objavljeno: {momentFormat(job.start, EDateFormat["DD.MM.yyyy"])}
        </Typography>
        <br />
        <Typography>
          Ističe: {momentFormat(job.end, EDateFormat["DD.MM.yyyy"])}
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
      </div>
    </Paper>
  );
};

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: "100%",
    padding: "2rem 1rem",
    marginBottom: 20,
  },
  header: {
    padding: "1rem 0",
    [theme.breakpoints.up("md")]: {
      "& > div": {
        display: "flex",
        alignItems: "center",
      },
    },
  },
  chipsContainer: {
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
  },
  chip: {
    backgroundColor: "#fff",
  },
  body: {
    paddingTop: "1rem",
  },
}));

export default Job;
