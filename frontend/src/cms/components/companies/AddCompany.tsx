import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Button as MuiButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { Formik, Form, useField, useFormik } from "formik";
import * as Yup from "yup";

import { Company, CompanyField } from "../../../../../backend/src/shared";

import TextInput from "components/forms/inputs/TextInput";
import { createCompany } from "store/companies/actions";
import { useHistory } from "react-router-dom";
import { SearchSelectFormikInput } from "components/forms/inputs/SearchSelectInput";
import { locations } from "shared/locations";
import { useApiClient } from "api";

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

export const addCompanyInitialValues: Pick<
  Company,
  CompanyField.title | CompanyField.url | CompanyField.location
> = { title: "", url: "", location: null };

const validationSchema = Yup.object({
  title: Yup.string().min(5).required("Obavezno polje"),
  url: Yup.string()
    .url("Mora biti url, npm: https://www.bhtelecom.ba/karijere.html")
    .required("Obavezno polje"),
  location: Yup.string().nullable(),
});

const locationOptions = locations.map((o) => ({
  value: o,
  label: o,
}));

interface IProps {}

const AddCompany = (props: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const apiClient = useApiClient();

  return (
    <Formik
      initialValues={addCompanyInitialValues}
      validationSchema={validationSchema}
      onSubmit={async (input, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(
          createCompany(apiClient, input, () => {
            setSubmitting(false);
            history.push("/cms/javne-ustanove-preduzeca");
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
                placeholder="BH Telecom d.d. Sarajevo"
                textFieldProps={{
                  className: classes.textInput,
                  label: "Ime javne ustanove/preduzeca",
                  variant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput
                name="url"
                type="url"
                placeholder="https://www.bhtelecom.ba/karijere.html"
                textFieldProps={{
                  className: classes.textInput,
                  label: "Web stranica",
                  variant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <SearchSelectFormikInput
                name="location"
                placeholder="Tuzlanski kanton"
                searchSelectProps={{
                  className: classes.textInput,
                  options: locationOptions,
                  label: "Lokacija (ako je ogranicena na jedan kanton/regiju)",
                  variant: "outlined",
                }}
              />
            </Grid>
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

export default AddCompany;
