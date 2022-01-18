import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Grid, Button as MuiButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { locations, createJobBodyType } from "@javnikonkursi/shared";

import { useApiClient } from "api";
import { IApplicationState, createJob } from "store";

import {
  TextInput,
  SearchSelectFormikInput,
  DateInput,
  FileUpload,
} from "components";

const initialValues: createJobBodyType = {
  title: null,
  company_id: null,
  job_type_id: null,
  location: null,
  start_date: null,
  end_date: null,
  external_url: null,
  internalFile: null,
  // ext: null,
};

const locationOptions = locations.map((o) => ({
  value: o,
  label: o,
}));

const AddJob = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const apiClient = useApiClient();

  const companies = useSelector(
    (state: IApplicationState) => state.companies.data
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        // title: Yup.string().min(5).required("Obavezno polje"),
        // company_id: Yup.string()
        //   .oneOf(companies.map((c) => c.id))
        //   .required("Obavezno polje"),
        // location: Yup.string().oneOf(locations).required("Obavezno polje"),
        // start: Yup.string().required("Obavezno polje"),
        // end: Yup.date().required("Obavezno polje"),
        // external_url: Yup.string()
        //   .url("Mora biti url, npm: https://www.bhtelecom.ba/karijere.html")
        //   .required("Obavezno polje"),
        internalFile: Yup.mixed().required(),
        // ext: Yup.string().required(),
      })}
      onSubmit={async (input, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(
          createJob(apiClient, input, () => {
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
                  options: locationOptions,
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

            {/* <Grid item xs={12}>
              <SearchSelectFormikInput
                name="ext"
                placeholder="png"
                searchSelectProps={{
                  className: classes.textInput,
                  options: ["pdf", "png", "jpg"].map((o) => ({
                    value: o,
                    label: o,
                  })),
                  label: "Filetype",
                  variant: "outlined",
                }}
              />
            </Grid> */}
          </Grid>
          <MuiButton
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Posalji
          </MuiButton>
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
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default AddJob;
