import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Tooltip,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar(props) {
  const { handleDrawerToggle, user } = props;

  const navigate = useNavigate();

  const greeting = () => {
    const hours = new Date().getHours();

    if (hours >= 5) {
      if (hours < 12) {
        return "Good morning";
      }
      if (hours < 17) {
        return "Good afternoon";
      }
      if (hours <= 23) {
        return "Good evening";
      }
    } else {
      return "Goodnight";
    }
  };

  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <AppBar
      elevation={1}
      sx={{
        position: "fixed",
        zIndex: 1,
        backgroundColor: "#fff",
        color: "#1976d2",
        display: "flex",
      }}
    >
      <Toolbar>
        <Stack direction="row" flexGrow={1} alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 1, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h5"
            fontWeight={700}
            component="span"
            color="#1976d2"
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Ontrack
            </Link>
          </Typography> */}
          <Box
            onClick={() => {
              navigate("/");
            }}
            display={{ xs: "none", sm: "flex" }}
            alignItems="center"
          >
            <img
              alt="Ontrack"
              src="/Ontrack-logo-full.png"
              style={{ height: "30px", cursor: "pointer" }}
            />
          </Box>
          <Box
            onClick={() => {
              navigate("/");
            }}
            display={{ xs: "flex", sm: "none" }}
            alignItems="center"
          >
            <img
              alt="Ontrack"
              src="/Ontrack-logo-300x300.png"
              style={{ height: "40px", cursor: "pointer" }}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {user.isAnonymous ? (
            <Typography
              display={{ xs: "none", sm: "block" }}
              variant="body"
              component="span"
              color="#000"
            >
              Welcome, User!
            </Typography>
          ) : (
            <Typography
              display={{ xs: "none", sm: "block" }}
              variant="body"
              component="span"
              color="#000"
            >
              {user
                ? `${greeting()}, ${user.displayName.split(" ").at(0)}`
                : ""}
            </Typography>
          )}

          <Avatar
            alt={user ? user.displayName : undefined}
            src={user ? user.photoURL : undefined}
          />
          <Tooltip title="Sign out" arrow enterDelay={200}>
            <IconButton onClick={handleSignout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
