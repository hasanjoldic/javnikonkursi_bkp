import React from "react";
import { useField, FieldConfig, useFormikContext } from "formik";

import { DatePicker, DatePickerProps } from "@mui/lab";
import { TextField } from "@mui/material";

type TInputProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any>;

type TProps = TInputProps & {
  datePickerProps: Omit<DatePickerProps, "value" | "onChange" | "renderInput">;
};

export const DateInput: React.FC<TProps> = ({ color, datePickerProps, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const hasError = meta.touched === true && meta.error != null;
  const helperText = hasError ? meta.error : null;

  return (
    <DatePicker
      {...datePickerProps}
      {...field}
      onChange={(val: Date) => {
        setFieldValue(field.name, val?.toISOString());
      }}
      renderInput={(params) => <TextField {...params} error={hasError} helperText={helperText} />}
      mask="__.__.____"
      inputFormat="dd.MM.yyyy"
    />
  );
};
