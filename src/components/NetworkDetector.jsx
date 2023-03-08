import { Box, Typography } from "@mui/material";
import CloudOffTwoToneIcon from "@mui/icons-material/CloudOffTwoTone";
import { useEffect, useState } from "react";

function NetworkDetector({ children }) {
  const [isConnected, setConnected] = useState(true);

  const setOnline = () => {
    setConnected(true);
  };
  const setOffline = () => {
    setConnected(false);
  };

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return isConnected ? (
    <>{children}</>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CloudOffTwoToneIcon sx={{ fontSize: "5rem" }} />
      <Typography variant="h4" color="primary">
        Oops! You're currently offline
      </Typography>
      <Typography variant="body">
        Please check your internet connection. You'll be back online immediately
        after your connection is restored.
      </Typography>
    </Box>
  );
}

export default NetworkDetector;
