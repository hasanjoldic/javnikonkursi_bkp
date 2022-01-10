import React from "react";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select, { SelectProps } from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { FormHelperText } from "@material-ui/core";
import { FieldConfig, useField } from "formik";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name: string, personName: string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
//   };
// }

type TInputProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> &
  FieldConfig<any>;

type TMultipleSelectInputProps = TInputProps & { selectFieldProps: SelectProps } & {
  options: string[];
  isCheckedFn: (value: string[], option: string) => boolean;
  // compareFn: (value: IMultipleSelectInputProps["value"], option: ISelectOption) => boolean;
};

const MultipleSelectInput = (props: TMultipleSelectInputProps) => {
  const { options, isCheckedFn } = props;
  const classes = useStyles();

  const inputProps = { ...props };
  delete inputProps.selectFieldProps;

  const selectFieldProps = { ...props.selectFieldProps };
  delete selectFieldProps.label;

  const value = selectFieldProps.value as string[];

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.selectFieldProps?.label}</InputLabel>
      <Select
        {...props.selectFieldProps}
        inputProps={inputProps}
        multiple
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        // MenuProps={MenuProps}
      >
        {options.map((option) => {
          const isChecked = isCheckedFn ? isCheckedFn(value, option) : value.includes(option);
          return (
            <MenuItem key={option} value={option} /*style={getStyles(name, personName, theme)}*/>
              <Checkbox checked={isChecked} />
              <ListItemText primary={option} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "95%",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

export default MultipleSelectInput;
