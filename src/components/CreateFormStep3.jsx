import React, { useContext } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  Zoom,
  Fade,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CreateProjectContext from "./CreateProjectContext";
import { useHref, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function CreateFormStep3() {
  const { priority, updatePriority, loading, isDone, handleSubmit } =
    useContext(CreateProjectContext);
  const [priorityColor, setColor] = useState(undefined);

  const navigate = useNavigate();
  const currentPath = useHref().slice(0, -1);

  const handleBack = () => {
    let prev = `${currentPath}2`;
    navigate(prev);
  };

  useEffect(() => {
    if (priority === "Normal") {
      setColor("gray");
    } else {
      if (priority === "Moderate") {
        setColor("orange");
      } else {
        setColor("red");
      }
    }
  }, [priority]);

  return (
    <Fade in>
      <Box sx={{ mx: 6, mt: 1 }}>
        <Divider sx={{ mb: 10 }} />
        <Typography
          variant="h3"
          gutterBottom
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Choose your project priority
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          Choose your project priority
        </Typography>
        <Select
          label="Priority"
          value={priority}
          variant="standard"
          onChange={(e) => {
            updatePriority(e.target.value);
          }}
          sx={{
            mb: 6,
            fontSize: { xs: "1rem", sm: 24 },
            color: priorityColor,
          }}
        >
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="Moderate">Moderate</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>

        <Box display="flex" gap={2}>
          <Zoom in={!loading && !isDone} unmountOnExit>
            <Button
              variant="outlined"
              size="large"
              sx={{
                textTransform: "none",
                px: { xs: 4, sm: 8 },
                py: { xs: 0.8, sm: 1.5 },
                borderRadius: 2,
              }}
              onClick={() => {
                handleBack();
              }}
            >
              Back
            </Button>
          </Zoom>
          <Zoom in>
            <Button
              variant="contained"
              size="large"
              color={!isDone ? "primary" : "success"}
              sx={{
                textTransform: "none",
                px: { xs: 4, sm: 8 },
                py: { xs: 0.8, sm: 1.5 },
                borderRadius: 2,
              }}
              onClick={() => {
                isDone ? null : handleSubmit();
              }}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                ) : isDone ? (
                  <DoneIcon />
                ) : null
              }
              disableRipple={isDone}
              disableElevation={isDone}
            >
              {loading ? "Creating" : isDone ? "Created" : "Create"}
            </Button>
          </Zoom>
        </Box>
      </Box>
    </Fade>
  );
}

export default CreateFormStep3;
