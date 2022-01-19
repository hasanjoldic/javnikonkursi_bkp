import React from "react";

import { Chip } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import SearchSelect, {
  ReactSelectMaterialUiProps,
} from "react-select-material-ui";

interface IProps extends ReactSelectMaterialUiProps {}

export const MultipleSearchSelectInput = ({
  SelectProps,
  ...props
}: IProps) => {
  const classes = useStyles();

  return (
    <SearchSelect
      {...props}
      SelectProps={{
        ...SelectProps,
        isMulti: true,
        renderValue: (selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        ),
      }}
    />
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  })
);
