import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Grid, Button as MuiButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { createJobTypeBodyType } from "shared";
import { createJobType } from "store";
import { useApiClient } from "api";

import TextInput from "components/forms/inputs/TextInput";

const initialValues: createJobTypeBodyType = {
  title: "",
  notes: "",
};

const AddJob: React.FC = () => {
  const classes = useStyles();
  const apiClient = useApiClient();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().min(5).required("Obavezno polje"),
        notes: Yup.string(),
      })}
      onSubmit={async (input, { setSubmitting }) => {
        setSubmitting(true);
        dispatch(
          createJobType(apiClient, input, () => {
            setSubmitting(false);
            history.push("/cms/vrste-poslova/list");
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
                placeholder="Doktor medicine"
                textFieldProps={{
                  className: classes.textInput,
                  label: "Vrsta posla",
                  variant: "outlined",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput
                name="notes"
                type="text"
                textFieldProps={{
                  className: classes.textInput,
                  label: "Opis",
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

export default AddJob;
