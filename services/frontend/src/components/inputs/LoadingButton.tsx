import * as React from "react";

import { LoadingButton as MuiLoadingButton, LoadingButtonProps } from "@mui/lab";

interface IProps extends LoadingButtonProps {}

export const LoadingButton: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <MuiLoadingButton {...props} loadingPosition="start">
      {children}
    </MuiLoadingButton>
  );
};
