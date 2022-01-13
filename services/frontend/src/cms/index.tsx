import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { makeStyles, createStyles } from "@material-ui/core/styles";

import { IApplicationState } from "store";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import Notifier from "components/Notifier";

const selector = (state: IApplicationState) => ({
  accessToken: state.auth.accessToken,
  isEmailVerified: state.auth.user?.isEmailVerified,
});

const Cms = () => {
  const classes = useStyles({});

  const { accessToken, isEmailVerified } = useSelector<
    IApplicationState,
    ReturnType<typeof selector>
  >(selector, shallowEqual);

  return (
    <>
      {accessToken ? <LoggedIn /> : <LoggedOut />}
      <Notifier />
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ["App-scene"]: {
      display: "flex",
      minHeight: "100%",
      transition: "all .5s",

      "& > :not(.nav)": {
        flexGrow: 1,
      },
    },
  })
);

export default Cms;
