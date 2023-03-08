import {
  Modal,
  Box,
  TextField,
  Fade,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../hooks/deleteProject";

function DeleteModal({
  isOpen,
  handleClose,
  projectName,
  projectId,
  projectTasksTotal,
}) {
  const [confirmName, setConfirmName] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (newVal) => {
    setConfirmName(newVal);
  };

  const handleDelete = async () => {
    try {
      navigate("/Projects");
      await deleteProject(projectId, projectName, projectTasksTotal);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Modal
      open={isOpen}
      in={"false"}
      onClose={() => {
        handleClose();
      }}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            width: { xs: "350px", sm: "400px" },
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Typography variant="h4" color="error">
              Delete project
            </Typography>
            <FormControl>
              <Typography variant="body2" gutterBottom>
                Do you want to delete this project pernamently?
              </Typography>
              <TextField
                value={confirmName}
                placeholder={projectName}
                color={confirmName === projectName ? "success" : "error"}
                error={confirmName === projectName ? false : true}
                onChange={(e) => {
                  let newVal = e.target.value;
                  handleChange(newVal);
                }}
                helperText={
                  confirmName === projectName
                    ? ""
                    : "* Please input your project name to confirm"
                }
                autoFocus
                autoComplete="false"
                fullWidth
              />
            </FormControl>
            {!error ? (
              <Box display="flex" flexDirection="row-reverse">
                <Button
                  color="error"
                  disabled={confirmName === projectName ? false : true}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="inherit"
                  sx={{ color: "#a2a2a2" }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button variant="contained" color="error" fullWidth>
                Oops! Something went wrong.
              </Button>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DeleteModal;
