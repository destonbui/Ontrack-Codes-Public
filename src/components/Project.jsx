import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Grow,
  Box,
  Chip,
  CardActions,
} from "@mui/material";
import ProjectProgress from "./ProjectProgress";
import ProjectAssignees from "./ProjectAssignees";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useNavigate } from "react-router-dom";

function Project({ data, index, isExpanded }) {
  const navigate = useNavigate();

  const bgColor =
    data.status === "Pending"
      ? "#eceff1"
      : data.status === "Ongoing"
      ? undefined
      : data.status === "Suspended"
      ? "#ffebee"
      : "#e8f5e9";

  return (
    <Grow
      in={isExpanded}
      style={{ transformOrigin: "0 0 0" }}
      {...(isExpanded ? { timeout: 200 * index } : {})}
    >
      <Grid
        item
        xs={12}
        sm={11.5 / 2}
        md={11.5 / 2}
        lg={11.5 / 3}
        xl={11.5 / 4}
        display="flex"
      >
        <Card
          sx={{
            width: "100%",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: bgColor,
          }}
          elevation={4}
        >
          <CardActionArea
            sx={{ height: "100%", p: 0.5 }}
            onClick={() => {
              navigate(`/Project/${data.id}`);
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <Box display="flex" mb={1} gap={0.5}>
                <Chip
                  size="small"
                  variant="outlined"
                  color={
                    data.priority === "Normal"
                      ? undefined
                      : data.priority === "Moderate"
                      ? "warning"
                      : "error"
                  }
                  label={`${data.priority} priority`}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  color={
                    data.status === "Pending"
                      ? undefined
                      : data.status === "Ongoing"
                      ? "primary"
                      : data.status === "Suspended"
                      ? "error"
                      : "success"
                  }
                  label={data.status}
                  icon={
                    data.status === "Pending" ? null : data.status ===
                      "Ongoing" ? (
                      <PlayArrowIcon />
                    ) : data.status === "Suspended" ? (
                      <PauseIcon />
                    ) : (
                      <DoneAllIcon />
                    )
                  }
                />
              </Box>
              <Typography
                variant="h5"
                fontWeight={500}
                component="div"
                lineHeight={1.2}
                color="text.primary"
                sx={{ mb: 1 }}
              >
                {data.name}
              </Typography>

              <Typography variant="body2" lineHeight={1.2} mb={2}>
                {data.desc}
              </Typography>
              <Box flexGrow={1} />
              <ProjectProgress
                total={data.total ? data.total : 0}
                completed={data.completed ? data.completed : 0}
                createdAt={data.createdAt ? data.createdAt.toDate() : ""}
                status={data.status}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grow>
  );
}

export default Project;
