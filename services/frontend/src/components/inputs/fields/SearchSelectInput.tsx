import React from "react";
import Select from "react-select";
import { FieldConfig, useField, useFormikContext } from "formik";

type TProps = FieldConfig<any> & {
  selectProps: React.ComponentProps<Select>;
};

export const SearchSelectInput: React.FC<TProps> = ({ selectProps, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [{ name, onBlur }] = useField(props);
  // const hasError = meta.touched === true && meta.error != null;
  // const helperText = hasError ? meta.error : null;
  const { onChange } = selectProps;
  return (
    <Select
      {...selectProps}
      name={name}
      onChange={(value) => {
        if (onChange) {
          onChange(value, null);
        } else {
          setFieldValue(props.name, value, true);
        }
      }}
      onBlur={onBlur}
    />
  );
};
