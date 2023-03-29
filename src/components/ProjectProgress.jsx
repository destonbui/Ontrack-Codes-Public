import { Typography, LinearProgress, Box } from "@mui/material";

function ProjectProgress({ total, completed, createdAt, status }) {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography
          variant="body2"
          color="text.secondary"
        >{`Tasks completed: ${completed} / ${total}`}</Typography>
      </Box>
      <LinearProgress
        color={status === "Completed" ? "success" : "primary"}
        variant="determinate"
        value={total === 0 ? 0 : (completed / total) * 100}
        sx={{ borderRadius: 1 }}
      />
    </Box>
  );
}

export default ProjectProgress;
