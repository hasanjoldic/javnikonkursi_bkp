import React from "react";

import { Box, Typography, AppBar as MuiAppBar, Toolbar, Slide, useScrollTrigger } from "@mui/material";

const HideOnScroll: React.FC = ({ children }) => {
  // // Note that you normally won't need to set the window ref as useScrollTrigger
  // // will default to window.
  // // This is only being set here because the demo is in an iframe.
  // const trigger = useScrollTrigger({
  //   target: window ? window() : undefined,
  // });

  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children as any}
    </Slide>
  );
};

interface IProps {
  onMenuClick: VoidFunction;
  noMenu?: boolean;
}

export const AppBar: React.FC<IProps> = ({ onMenuClick, noMenu, ...props }) => {
  return (
    <HideOnScroll {...props}>
      <MuiAppBar>
        <Toolbar>
          {/* <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box width="100%" display="flex" justifyContent="center">
            <Typography variant="h6" textAlign="center" component="div">
              Javni konkursi u Bosni i Hercegovini
            </Typography>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </HideOnScroll>
  );
};
