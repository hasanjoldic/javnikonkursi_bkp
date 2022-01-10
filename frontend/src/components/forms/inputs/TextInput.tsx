import React from "react";
import { useField, FieldConfig } from "formik";
import { TextField, TextFieldProps } from "@material-ui/core";

type TInputProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any>;

type TTextInputProps = TInputProps & { textFieldProps: TextFieldProps };

const TextInput = (props: TTextInputProps) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched === true && meta.error != null;
  const helperText = hasError ? meta.error : null;
  const inputProps = { ...props };
  delete inputProps.textFieldProps;
  return (
    <TextField
      {...props.textFieldProps}
      inputProps={{ ...field, ...inputProps }}
      error={hasError}
      helperText={helperText}
    />
  );
};

export default TextInput;
