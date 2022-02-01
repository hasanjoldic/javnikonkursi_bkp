import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
// import { blueGrey, grey } from "@mui/material/colors";

const defaultTheme = createTheme();

const sharedThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    allVariants: {
      [defaultTheme.breakpoints.down("md")]: {
        // textAlign: "center",
      },
    },
  },
};

export const theme = createTheme({
  ...sharedThemeOptions,
});

export const darkTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    background: {
      default: "#FCF9F6",
    },
  },
});
