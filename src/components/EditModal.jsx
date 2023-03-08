import {
  Modal,
  Box,
  TextField,
  CircularProgress,
  Fade,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import { useMemo, useState } from "react";
import { updateProject } from "../hooks/updateProject";

function EditModal({ isOpen, handleClose, data, projectId }) {
  const { name } = data;
  const [desc, setDesc] = useState(data.desc);
  const [priority, setPriority] = useState(data.priority);
  const [status, setStatus] = useState(data.status);
  const [error, setError] = useState(false);

  const handleChange = (setFunc, newVal) => {
    setFunc(newVal);
  };

  const editData = useMemo(() => {
    return {
      desc: desc,
      priority: priority,
      priorityLevel: priority === "Low" ? 0 : priority === "Medium" ? 1 : 2,
      status: status,
    };
  }, [desc, priority, status]);

  const handleEdit = async () => {
    const isSuccess = await updateProject(projectId, editData, name);
    if (isSuccess) {
      handleClose();
    } else {
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
            maxHeight: { xs: "500px", sm: "600px", md: "700px" },
            overflowY: "scroll",
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
          {!name ? (
            <CircularProgress />
          ) : (
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Typography variant="h4" color="primary">
                Edit Project
              </Typography>
              <TextField
                label={"Project name"}
                value={name}
                disabled
                fullWidth
              />
              <TextField
                label={"Project description"}
                value={desc}
                onChange={(e) => {
                  let newVal = e.target.value;
                  handleChange(setDesc, newVal);
                }}
                error={desc === ""}
                helperText={desc === "" ? "Description must not be empty!" : ""}
                multiline
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  label="Priority"
                  labelId="priority-label"
                  value={priority}
                  onChange={(e) => {
                    let newVal = e.target.value;
                    handleChange(setPriority, newVal);
                  }}
                >
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  label="Status"
                  labelId="status-label"
                  value={status}
                  onChange={(e) => {
                    let newVal = e.target.value;
                    handleChange(setStatus, newVal);
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Suspended">Suspended</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                color={error ? "error" : "primary"}
                onClick={() => {
                  handleEdit();
                }}
                disabled={!error.toString()}
              >
                {!error ? "Confirm edit" : "Error! Please try again later."}
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditModal;
