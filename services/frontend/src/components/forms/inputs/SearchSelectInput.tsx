import React from "react";
import clsx from "clsx";
import SearchSelect, {
  ReactSelectMaterialUiProps,
} from "react-select-material-ui";
import { FieldConfig, useField, useFormikContext } from "formik";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

interface ISearchSelectInputProps extends ReactSelectMaterialUiProps {}

export const SearchSelectInput = ({
  SelectProps,
  ...props
}: ISearchSelectInputProps) => {
  // const classes = useStyles();

  return (
    <SearchSelect
      {...props}
      SelectProps={{
        ...SelectProps,
        isMulti: false,
      }}
    />
  );
};

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    border: `1px ${grey[400]} solid`,
    borderRadius: theme.shape.borderRadius,
    padding: 5,
  },
}));

type TInputProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any>;

type IProps = TInputProps & {
  searchSelectProps: Omit<ISearchSelectInputProps, "value" | "onChange">;
};

export const SearchSelectFormikInput = (props: IProps) => {
  const classes = useStyles(props);

  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const hasError = meta.touched === true && meta.error != null;
  const helperText = hasError ? meta.error : null;

  const inputProps = { ...props };
  delete inputProps.searchSelectProps;

  return (
    <SearchSelectInput
      {...props.searchSelectProps}
      {...field}
      onChange={(value) => {
        setFieldValue(field.name, value);
      }}
      className={clsx(props.searchSelectProps?.className, classes.root)}
      SelectProps={{
        inputProps: inputProps,
      }}
      error={hasError}
      helperText={helperText}
    />
  );
};
