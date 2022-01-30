import React from "react";

import { Box, Typography, IconButton, AppBar as MuiAppBar, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { drawerWidth } from "components";

interface IProps {
  onMenuClick: VoidFunction;
  noMenu?: boolean;
}

export const AppBar: React.FC<IProps> = ({ onMenuClick, noMenu }) => {
  return (
    <MuiAppBar
      position="fixed"
      sx={
        !noMenu && {
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }
      }
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box width="100%" display="flex" justifyContent="center">
          <Typography variant="h6" noWrap component="div">
            Konkursi za zapošljavanje u javnim ustanovama i preduzećima u Bosni i Hercegovini
          </Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
