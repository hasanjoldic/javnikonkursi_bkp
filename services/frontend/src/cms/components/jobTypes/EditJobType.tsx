import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Grid, Button as MuiButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { updateJobTypeBodyType } from "@javnikonkursi/shared";

import { IApplicationState, updateJobType, deleteJobType } from "store";
import { useApiClient } from "api";

import { TextInput } from "components";

const EditJobType: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const apiClient = useApiClient();

  const jobs = useSelector((state: IApplicationState) => state.jobs.data);
  const job = jobs.find((j) => j.id === id);

  return (
    <Formik
      initialValues={job}
      validationSchema={Yup.object({
        title: Yup.string().min(5).required("Obavezno polje"),
        notes: Yup.string().nullable(),
      })}
      onSubmit={async (fullInput, { setSubmitting }) => {
        setSubmitting(true);
        const input = Object.keys(fullInput).reduce(
          (prev: updateJobTypeBodyType, current) => {
            if (fullInput[current] !== job[current]) {
              prev[current] = fullInput[current];
            }
            return prev;
          },
          {} as updateJobTypeBodyType
        );
        dispatch(
          updateJobType(apiClient, id, input, () => {
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
          <div className={classes.buttonsContainer}>
            <MuiButton
              size="large"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() =>
                dispatch(
                  deleteJobType(apiClient, id, () => {
                    history.push("/cms/vrste-poslova/list");
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

export default EditJobType;
