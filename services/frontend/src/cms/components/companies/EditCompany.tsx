import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Grid, Button as MuiButton, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { updateCompanyBodyType } from "@javnikonkursi/shared";

import { IApplicationState, updateCompany, deleteCompany } from "store";
import { useApiClient } from "api";

import { TextInput } from "components";

const validationSchema = Yup.object({
  title: Yup.string().min(5).required("Obavezno polje"),
  url: Yup.string()
    .url("Mora biti url, npm: https://www.bhtelecom.ba/karijere.html")
    .required("Obavezno polje"),
});

export const EditCompany: React.FC = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const apiClient = useApiClient();

  const companies = useSelector(
    (state: IApplicationState) => state.companies.data
  );
  const company = companies.find((c) => c.id === id);

  return (
    <Formik
      initialValues={company}
      validationSchema={validationSchema}
      onSubmit={async (fullInput, { setSubmitting }) => {
        setSubmitting(true);
        const input = Object.keys(fullInput).reduce(
          (prev: updateCompanyBodyType, current) => {
            if (fullInput[current] !== company[current]) {
              prev[current] = fullInput[current];
            }
            return prev;
          },
          {} as updateCompanyBodyType
        );
        dispatch(
          updateCompany(apiClient, id, input, () => {
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
          </Grid>
          <div className={classes.buttonsContainer}>
            <MuiButton
              size="large"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() =>
                dispatch(
                  deleteCompany(apiClient, id, () => {
                    history.push("/cms/javne-ustanove-preduzeca");
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
