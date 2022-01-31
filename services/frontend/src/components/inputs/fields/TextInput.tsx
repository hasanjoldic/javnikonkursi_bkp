import React from "react";
import { useField, FieldConfig } from "formik";

import { TextField, TextFieldProps } from "@mui/material";

type TInputProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any>;

type TProps = TInputProps & { textFieldProps: TextFieldProps };

export const TextInput: React.FC<TProps> = ({ textFieldProps, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched === true && meta.error != null;
  const helperText = hasError ? meta.error : null;
  const inputProps = { ...props };

  return (
    <TextField {...textFieldProps} inputProps={{ ...field, ...inputProps }} error={hasError} helperText={helperText} />
  );
};
