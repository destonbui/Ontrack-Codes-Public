import React from "react";
import { Box, Button, Paper, Divider, Typography, Link } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const handleSignIn = () => {
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignInAnonymously = () => {
    try {
      signInAnonymously(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      backgroundColor="#eceff1"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      m={-1}
    >
      <Paper
        elevation={3}
        sx={{
          py: 4,
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box mb={4}>
          <img
            alt="ontrack logo"
            src="/Ontrack-logo-full.png"
            style={{ height: "50px" }}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={() => {
            handleSignIn();
          }}
          startIcon={<GoogleIcon color="primary" />}
        >
          Sign in with Google
        </Button>

        <Divider flexItem variant="middle" sx={{ mt: 4, mb: 1, mx: "90px" }} />
        <Typography color="text.secondary">or</Typography>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "gray" }}
          onClick={() => {
            handleSignInAnonymously();
          }}
          startIcon={<AccountCircleIcon sx={{ color: "gray" }} />}
        >
          Use a demo account
        </Button>
      </Paper>
      <Box position="absolute" bottom={10}>
        <Typography variant="overline" color="gray">
          &copy; 2023 by{" "}
          <Link
            underline="hover"
            href="https://github.com/destonbui"
            target="_blank"
          >
            Deston Bui
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
