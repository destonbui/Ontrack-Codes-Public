import React, { useContext } from "react";
import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  Fade,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import CreateProjectContext from "./CreateProjectContext";
import ProjectsContext from "./ProjectsContext";
import { useHref, useNavigate } from "react-router-dom";
// import { fetchProjectNames } from "../hooks/fetchProjectNames";

function CreateFormStep1() {
  const { chipLabel, name, updateName, isError, errorMsg } =
    useContext(CreateProjectContext);
  const { projects } = useContext(ProjectsContext);

  const projectNames = projects.map((project) => {
    return project.name;
  });

  const navigate = useNavigate();
  const currentPath = useHref().slice(0, -1);

  const handleContinue = () => {
    let next = `${currentPath}2`;
    navigate(next);
  };

  return (
    <Fade in>
      <Box sx={{ mx: 6, mt: 1 }}>
        <Divider sx={{ mb: 10 }} />
        <Typography
          variant="h3"
          gutterBottom
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Let's start with a project name
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          Let's start with a project name
        </Typography>
        <TextField
          onChange={(e) => {
            updateName(e.target.value, projectNames);
          }}
          value={name}
          variant="standard"
          type="text"
          error={isError}
          helperText={errorMsg}
          autoFocus
          fullWidth
          placeholder={"Enter your project name"}
          inputProps={{
            sx: {
              fontSize: { xs: "1rem", sm: "1.5rem" },
              fontWeight: 500,
              color: "text.secondary",
            },
          }}
          sx={{ mb: 2 }}
        />
        <Fade in={name !== ""}>
          <Chip
            icon={isError ? <CancelIcon /> : <CheckCircleIcon />}
            label={chipLabel}
            variant="outlined"
            color={isError ? "error" : "success"}
            sx={{ mb: 6, fontSize: "1rem" }}
          />
        </Fade>
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              px: { xs: 4, sm: 8 },
              py: { xs: 0.8, sm: 1.5 },
              borderRadius: 2,
            }}
            disabled={!isError && name !== "" ? false : true}
            onClick={() => {
              handleContinue();
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

export default CreateFormStep1;
