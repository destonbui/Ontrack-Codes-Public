import { CircularProgress, Box, Toolbar } from "@mui/material";

function Loading({ type }) {
  if (type === "fullscreen") {
    return (
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent="center"
        minHeight={"100vh"}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (type === "page") {
    return (
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          height: "100%",
          width: { xs: "100vw", sm: "100vw", md: `calc(100vw - 200px)` },
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          minHeight={"100vh"}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }
}

export default Loading;
