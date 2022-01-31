import React from "react";
import { Formik, Form as FormikForm, FormikProps, FormikConfig } from "formik";

import { Box, Grid } from "@mui/material";
import { Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material";

import { LoadingButton } from "components";

interface IProps<T extends object> {
  initialValues: T;
  validationSchema: FormikConfig<T>["validationSchema"];
  onSubmit: FormikConfig<T>["onSubmit"];

  onDelete?: () => void;
  isDeleting?: boolean;
}

export const Form = <T extends object>({
  initialValues,
  validationSchema,
  onSubmit,

  onDelete,
  isDeleting,

  children,
}: React.PropsWithChildren<IProps<T>>): React.ReactElement => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }: FormikProps<any>) => (
        <div>
          <FormikForm>
            <Grid container spacing={2}>
              {children}
            </Grid>
            <Box display="grid" gridTemplateColumns="1fr 1fr" mt={2}>
              {onDelete && (
                <Box justifySelf="flex-start">
                  <LoadingButton
                    type="button"
                    size="large"
                    variant="outlined"
                    color="secondary"
                    onClick={onDelete}
                    loading={false}
                    startIcon={<DeleteIcon />}
                  >
                    Izbriši
                  </LoadingButton>
                </Box>
              )}
              <Box justifySelf="flex-end">
                <LoadingButton
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  disabled={!isValid}
                  startIcon={<SaveIcon />}
                >
                  Zapamti
                </LoadingButton>
              </Box>
            </Box>
          </FormikForm>
        </div>
      )}
    </Formik>
  );
};

export function parseFormValues(input: any, sanitize?: (input: any) => any) {
  const inputWithFlatValues = Object.keys(input).reduce((sum, curr) => {
    sum[curr] = input[curr]?.value || input[curr];
    if (sum[curr] === "") {
      sum[curr] = null;
    }
    return sum;
  }, {} as any);

  return sanitize ? sanitize(inputWithFlatValues) : inputWithFlatValues;
}
