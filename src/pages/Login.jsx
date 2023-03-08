import React from "react";
import { Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const handleSignIn = () => {
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Button
        variant="outlined"
        onClick={() => {
          handleSignIn();
        }}
        startIcon={<GoogleIcon color="primary" />}
      >
        Sign in with Google
      </Button>
    </Box>
  );
}

export default Login;
