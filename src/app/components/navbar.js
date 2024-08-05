"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { UserAuth } from "../auth/authcontext";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const { user, logOut } = UserAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('../auth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Pantry Tracker
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit">
              <AccountCircle />
              <Typography variant="body1">
                {user ? user.displayName : "User"}
              </Typography>
            </IconButton>
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
}));


export default Navbar;
