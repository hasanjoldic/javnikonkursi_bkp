import React from "react";
import { useField, FieldConfig, useFormikContext } from "formik";

import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from "@mui/material";

export interface ISelectOption {
  value: string;
  label: string;
}

type TProps = FieldConfig<any> & {
  autocompleteProps: Omit<AutocompleteProps<ISelectOption, boolean, false, false>, "renderInput">;
  textFieldProps: TextFieldProps;
};

export const AutoCompleteInput: React.FC<TProps> = ({ autocompleteProps, textFieldProps, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const hasError = meta.touched === true && meta.error != null;
  const helperText = hasError ? meta.error : null;

  const value = field.value || undefined;

  return (
    <Autocomplete
      {...autocompleteProps}
      value={value}
      onChange={(e, value) => {
        setFieldValue(props.name, value, true);
      }}
      renderInput={(params) => (
        <TextField
          name={props.name}
          {...textFieldProps}
          {...params}
          {...field}
          error={hasError}
          helperText={helperText}
        />
      )}
    />
  );
};
