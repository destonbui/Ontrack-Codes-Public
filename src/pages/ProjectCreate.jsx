import {
  Box,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  Zoom,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect } from "react";
import { Outlet, useHref, useNavigate } from "react-router-dom";
import CreateProjectContext from "../components/CreateProjectContext";

function ProjectCreate() {
  const { isOpen, close, closeRef } = useContext(CreateProjectContext);
  const step = useHref().slice(-1);
  const navigate = useNavigate();

  const handleClose = () => {
    close();
    setTimeout(() => {
      navigate("/Projects");
    }, 250);
  };

  useEffect(() => {
    navigate(`/Projects/new/1`);
  }, []);

  return (
    <Zoom in={isOpen} mountOnEnter unmountOnExit>
      <Box
        component={"div"}
        sx={{
          px: { xs: 2, sm: 3, md: "20%" },
          pt: { xs: 2, sm: 3, md: 5 },
          // height: "100%",
          // width: { xs: "100vw", sm: "100vw", md: `calc(100vw - 200px)` },
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#fff",
          width: "100%",
          height: "100vh",
          zIndex: 9999,
        }}
      >
        <Toolbar />
        <Box mt={2}>
          <Box display="flex">
            <IconButton
              ref={closeRef}
              children={
                <CloseIcon
                  sx={{
                    height: { xs: "1.5rem", sm: "2rem" },
                    width: { xs: "1.5rem", sm: "2rem" },
                  }}
                />
              }
              edge="start"
              sx={{ mr: 1.5 }}
              onClick={() => {
                handleClose();
              }}
            />
            <Typography
              variant="h5"
              component="span"
              color="text.secondary"
              sx={{ alignSelf: "center", display: { xs: "none", sm: "block" } }}
            >
              {`Create a project (Step ${step} of 3)`}
            </Typography>
            <Typography
              variant="body"
              component="span"
              color="text.secondary"
              sx={{
                alignSelf: "center",
                display: { xs: "block", sm: "none" },
                ml: 0.5,
              }}
            >
              {`Create a project (Step ${step} of 3)`}
            </Typography>
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Zoom>
  );
}

export default ProjectCreate;
