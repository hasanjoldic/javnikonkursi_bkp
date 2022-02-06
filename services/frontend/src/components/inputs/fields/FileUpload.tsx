import React from "react";
import { useField, FieldConfig, useFormikContext } from "formik";

import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { grey } from "@mui/material/colors";

type TInputProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any>;

type TProps = TInputProps & {
  label: string;
  link?: string;
};

export const FileUpload: React.FC<TProps> = ({ label, link, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const hasError = meta.touched === true && meta.error != null;
  const helperText = hasError ? meta.error : null;

  return (
    <FormControl>
      <div
        style={{
          padding: "20px 15px",
          border: `1px solid ${grey[400]}`,
          borderRadius: 4,
        }}
      >
        <FormLabel>{label}</FormLabel>
        <br />
        <input
          {...props}
          type="file"
          onChange={(event) => {
            setFieldValue(field.name, event.currentTarget.files[0]);
          }}
          accept=".jpg,.jpeg,.png,,.pdf"
        />
        <br />
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </div>

      <FormHelperText error={hasError}>{helperText}</FormHelperText>
    </FormControl>
  );
};
