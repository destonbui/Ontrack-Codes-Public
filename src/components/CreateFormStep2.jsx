import React, { useContext } from "react";
import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  Slide,
  Zoom,
  Fade,
  InputAdornment,
  OutlinedInput,
  Input,
} from "@mui/material";
import CreateProjectContext from "./CreateProjectContext";
import { useHref, useNavigate } from "react-router-dom";

function CreateFormStep2() {
  const { desc, updateDesc, isError, errorMsg } =
    useContext(CreateProjectContext);

  const navigate = useNavigate();
  const currentPath = useHref().slice(0, -1);

  const handleContinue = () => {
    let next = `${currentPath}3`;
    navigate(next);
  };
  const handleBack = () => {
    let prev = `${currentPath}1`;
    navigate(prev);
  };

  const count = desc.length;

  return (
    <Fade in>
      <Box sx={{ mx: 6, mt: 1 }}>
        <Divider sx={{ mb: 10 }} />
        <Typography
          variant="h3"
          gutterBottom
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Give your project a description
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          Give your project a description
        </Typography>
        <Input
          required
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              updateDesc(e.target.value);
            }
          }}
          value={desc}
          variant="standard"
          type="text"
          error={isError}
          // helperText={errorMsg}
          autoFocus
          fullWidth
          placeholder={"Enter your project description"}
          inputProps={{
            sx: {
              fontSize: { xs: "1rem", sm: "1.5rem" },
              fontWeight: 500,
              color: "text.secondary",
            },
          }}
          endAdornment={
            <InputAdornment position="end">{`${count}/100`}</InputAdornment>
          }
          sx={{ mb: 6 }}
        />
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              textTransform: "none",
              px: { xs: 4, sm: 8 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
            }}
            onClick={() => {
              handleBack();
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              px: { xs: 4, sm: 8 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
            }}
            disabled={!isError && desc !== "" ? false : true}
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

export default CreateFormStep2;
