import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { fetchTasks } from "../hooks/fetchTasks";
import Task from "./Task";
import TaskAdd from "./TaskAdd";

function TasksDisplay({ projectId, projectData }) {
  const { todo, progress, done } = fetchTasks(projectId);

  function compare(a, b) {
    if (!a.due && !b.due) {
      return 0;
    }
    if (a.due && !b.due) {
      return -1;
    }
    if (!a.due && b.due) {
      return 1;
    }
  }

  return (
    <Box
      width="100%"
      flexGrow={1}
      display="flex"
      mt={2}
      backgroundColor="#fff"
      p={{ xs: 2, sm: 3 }}
      borderRadius={2}
      sx={{ boxShadow: 3 }}
    >
      <Grid container gap={2} flexGrow={1}>
        {/* To do List */}
        <Grid item xs={12} md>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="text.secondary">
              To Do
            </Typography>
            <TaskAdd
              list="To Do"
              projectId={projectId}
              projectData={projectData}
            />
          </Box>

          <Divider />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            {/* Display tasks with To Do status */}
            {!todo ? (
              <CircularProgress size="1.5rem" />
            ) : todo.length === 0 ? (
              <Typography variant="body" fontWeight={400} color="#bdbdbd">
                No task to display.
              </Typography>
            ) : (
              todo.sort(compare).map((task) => {
                return (
                  <Task
                    key={task.id}
                    data={task}
                    projectId={projectId}
                    cardColor={{
                      content: "#f5f5f5",
                      actions: "#e0e0e0",
                      icon: "inherit",
                    }}
                    projectData={projectData}
                  />
                );
              })
            )}
          </Box>
        </Grid>

        <Divider
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
          orientation="vertical"
          flexItem
        />

        {/* In Progress List */}
        <Grid item xs={12} md>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="primary">
              In Progress
            </Typography>
            <TaskAdd
              list="In Progress"
              projectId={projectId}
              projectData={projectData}
            />
          </Box>

          <Divider />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            {/* Display tasks with In Progress status */}
            {!progress ? (
              <CircularProgress size="1.5rem" />
            ) : !progress[0] ? (
              <Typography variant="body" fontWeight={400} color="#bdbdbd">
                No task to display.
              </Typography>
            ) : (
              progress.sort(compare).map((task) => {
                return (
                  <Task
                    key={task.id}
                    data={task}
                    projectId={projectId}
                    cardColor={{
                      content: "#bbdefb",
                      actions: "#1976d2",
                      icon: "#e0e0e0",
                    }}
                    projectData={projectData}
                  />
                );
              })
            )}
          </Box>
        </Grid>

        <Divider
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
          orientation="vertical"
          flexItem
        />

        {/* Done List */}
        <Grid item xs={12} md>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" color="green">
              Done
            </Typography>
            <TaskAdd
              list="Done"
              projectId={projectId}
              projectData={projectData}
            />
          </Box>

          <Divider />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            {/* Display tasks with Done status */}
            {!done ? (
              <CircularProgress size="1.5rem" />
            ) : !done[0] ? (
              <Typography variant="body" fontWeight={400} color="#bdbdbd">
                No task to display.
              </Typography>
            ) : (
              done.map((task) => {
                return (
                  <Task
                    key={task.id}
                    data={task}
                    projectId={projectId}
                    cardColor={{
                      content: "#c8e6c9",
                      actions: "#388e3c",
                      icon: "#e0e0e0",
                    }}
                    projectData={projectData}
                  />
                );
              })
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TasksDisplay;
