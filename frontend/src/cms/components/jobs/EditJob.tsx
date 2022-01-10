import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";

import { Grid, Button as MuiButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { locations, updateJobBodyType } from "shared";
import { IApplicationState, updateJob, deleteJob } from "store";
import { useApiClient } from "api";

import TextInput from "components/forms/inputs/TextInput";
import { SearchSelectFormikInput } from "components/forms/inputs/SearchSelectInput";
import DateInput from "components/forms/inputs/DateInput";
import FileUpload from "components/forms/inputs/FileUpload";

const Button = (props) => {
  const classes = useStyles(props);
  const { isSubmitting } = useFormik(props);

  return (
    <MuiButton
      type="submit"
      size="large"
      variant="contained"
      color="primary"
      className={classes.button}
      disabled={isSubmitting}
    >
      Posalji
    </MuiButton>
  );
};

interface IAddJobProps {}

const AddJob = (props: IAddJobProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const apiClient = useApiClient();

  const companies = useSelector(
    (state: IApplicationState) => state.companies.data
  );
  const jobs = useSelector((state: IApplicationState) => state.jobs.data);
  const job = jobs.find((j) => j.id === id);

  return (
    <Formik
      initialValues={job}
      validationSchema={Yup.object({
        title: Yup.string().min(5).required("Obavezno polje"),
        company_id: Yup.string()
          .oneOf(companies.map((c) => c.id))
          .required("Obavezno polje"),
        location: Yup.string().oneOf(locations).required("Obavezno polje"),
        // type: Yup.string().oneOf(jobTypes).required("Obavezno polje"),
        start: Yup.string().required("Obavezno polje"),
        end: Yup.date().required("Obavezno polje"),
        external_url: Yup.string()
          .url("Mora biti url, npm: https://www.bhtelecom.ba/karijere.html")
          .required("Obavezno polje"),
        internal_file: Yup.mixed(),
      })}
      onSubmit={async (fullInput, { setSubmitting }) => {
        setSubmitting(true);
        const input = Object.keys(fullInput).reduce(
          (prev: Partial<updateJobBodyType>, current) => {
            if (fullInput[current] !== job[current]) {
              prev[current] = fullInput[current];
            }
            return prev;
          },
          {}
        );
        dispatch(
          updateJob(apiClient, id, input, () => {
            setSubmitting(false);
            history.push("/cms/javni-konkursi/list");
          })
        );
      }}
    >
      <div className={classes.paper}>
        <Form className={classes.form}>
          <Grid className={classes.inputFieldsContainer} container spacing={2}>
            <Grid item xs={12}>
              <TextInput
                name="title"
                type="text"
                placeholder="Strucni saradnik za pravne poslove"
                textFieldProps={{
                  className: classes.textInput,
                  label: "Naziv radnog mjesta",
                  variant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <SearchSelectFormikInput
                name="company_id"
                placeholder="https://www.bhtelecom.ba/karijere.html"
                searchSelectProps={{
                  className: classes.textInput,
                  options: companies.map((c) => ({
                    value: c.id,
                    label: c.title,
                  })),
                  label: "Javna ustanova/preduzece",
                  variant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <SearchSelectFormikInput
                name="location"
                placeholder="Tuzlanski Kanton"
                searchSelectProps={{
                  className: classes.textInput,
                  options: locations.map((l) => ({
                    value: l,
                    label: l,
                  })),
                  label: "Lokacija",
                  variant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <DateInput
                name="start"
                placeholder="01.01.2000"
                datePickerProps={{
                  className: classes.textInput,
                  label: "Pocetak konkursa",
                  inputVariant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <DateInput
                name="end"
                placeholder="01.01.2000"
                datePickerProps={{
                  className: classes.textInput,
                  label: "Kraj konkursa",
                  inputVariant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput
                name="external_url"
                type="url"
                placeholder="https://www.bhtelecom.ba/karijere.html"
                textFieldProps={{
                  className: classes.textInput,
                  label: "Web stranica konkursa",
                  variant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FileUpload name="internal_file" label="Interni dokument" />
            </Grid>
          </Grid>
          <div className={classes.buttonsContainer}>
            <MuiButton
              size="large"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() =>
                dispatch(
                  deleteJob(apiClient, id, () => {
                    history.push("/cms/javni-konkursi/list");
                  })
                )
              }
            >
              Izbrisi
            </MuiButton>
            <MuiButton
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Posalji
            </MuiButton>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

const useStyles = makeStyles<Theme>((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    "& a": {
      display: "block",
    },
  },
  inputFieldsContainer: {
    marginBottom: "1rem",
  },
  textInput: {
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default AddJob;
