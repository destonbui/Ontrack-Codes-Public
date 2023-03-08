import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createTask } from "../hooks/createTask";

function TaskAdd({ projectId, list, projectData }) {
  const handleAdd = () => {
    createTask(projectId, list, projectData);
  };
  return (
    <Box display="flex" flexDirection="row-reverse" flexGrow={1}>
      <IconButton
        onClick={() => {
          handleAdd();
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default TaskAdd;
