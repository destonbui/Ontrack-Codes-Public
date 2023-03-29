import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Chip,
  IconButton,
  Divider,
  Tooltip,
  Collapse,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import BoltIcon from "@mui/icons-material/Bolt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import dayjs from "dayjs";
import { getActivitiesCount } from "../hooks/getActivitiesCount";
import { getActivitiesByType } from "../hooks/getActivitiesByType";

function ActivitiesDisplay({ selectedDate }) {
  const [activitiesCount, setCount] = useState({});
  const [loading, setLoading] = useState(false);

  const [projectExpanded, setProjectExpanded] = useState(false);
  const [taskExpanded, setTaskExpanded] = useState(false);

  const [projectActivities, setProjectActivities] = useState(null);
  const [taskActivities, setTaskActivities] = useState(null);

  if (projectExpanded) {
    if (projectActivities === null) {
      const result = getActivitiesByType(
        dayjs(selectedDate).month(),
        dayjs(selectedDate).date(),
        "Project"
      );

      result.then((data) => {
        setProjectActivities(data);
      });
    }
  }

  if (taskExpanded) {
    if (taskActivities === null) {
      const result = getActivitiesByType(
        dayjs(selectedDate).month(),
        dayjs(selectedDate).date(),
        "Task"
      );

      result.then((data) => {
        setTaskActivities(data);
      });
    }
  }

  const handleToggleProject = () => {
    setProjectExpanded((prev) => !prev);
  };
  const handleToggleTask = () => {
    setTaskExpanded((prev) => !prev);
  };

  useEffect(() => {
    setLoading(true);
    setProjectActivities(null);
    setTaskActivities(null);
    setProjectExpanded(false);
    setTaskExpanded(false);

    const result = getActivitiesCount(
      dayjs(selectedDate).month(),
      dayjs(selectedDate).date()
    );
    result.then((data) => {
      setCount(data);
      setLoading(false);
    });
  }, [selectedDate]);
  return (
    <Paper
      sx={{
        height: "100%",
        maxHeight: { xl: "334px" },
        minHeight: "200px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        mb={1}
        pb={{ xs: 1, sm: 0.5 }}
        pt={{ xs: 1, sm: 0.5 }}
        px={{ xs: 2, sm: 3 }}
        height="100%"
        maxHeight={{ xs: "400px" }}
        width={{ xs: "300px", sm: "100%" }}
      >
        <Grid container>
          <Grid xs={12}>
            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="h5">Activities</Typography>
              <BoltIcon
                sx={{
                  color: "#ffd600",
                  width: "1.1em",
                  height: "1.1em",
                  ml: 0.5,
                }}
              />
            </Box>

            {loading ? (
              <CircularProgress size="1.5rem" />
            ) : (
              <Grid
                container
                sx={{
                  mt: { xs: -0.5, lg: 0.5 },
                  p: 0,
                  maxHeight: { xs: "270px" },
                  overflowY: "auto",
                }}
              >
                {/* For project */}
                <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                  <Box display="flex" alignItems="center" mb={0.5}>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      color="#fbc02d"
                      fontSize={"1rem"}
                    >
                      Project
                    </Typography>
                    <Chip
                      color="warning"
                      label={activitiesCount.project}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                    {activitiesCount.project === 0 ? (
                      ""
                    ) : !projectExpanded ? (
                      <Tooltip title="Show project activities" enterDelay={400}>
                        <IconButton
                          size="small"
                          sx={{ ml: 1, p: 0 }}
                          onClick={() => handleToggleProject()}
                        >
                          <ExpandMoreIcon sx={{ fontSize: "1.25rem" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Collapse" enterDelay={400}>
                        <IconButton
                          size="small"
                          sx={{ ml: 1, p: 0 }}
                          onClick={() => handleToggleProject()}
                        >
                          <ExpandLessIcon sx={{ fontSize: "1.25rem" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>

                  <Divider />
                  {activitiesCount.project === 0 ? (
                    <Box mt={1}>
                      <Typography
                        variant="h6"
                        fontWeight={400}
                        lineHeight={1.2}
                        fontSize={"0.9rem"}
                        color="text.secondary"
                      >
                        No activity
                      </Typography>
                    </Box>
                  ) : (
                    <Collapse in={projectExpanded}>
                      {!projectActivities ? (
                        <CircularProgress size="1.5rem" />
                      ) : (
                        <Box
                          height={{
                            xs: "auto",
                            sm: "auto",
                            md: "auto",
                            lg: "210px",
                            xl: "210px",
                          }}
                          mt={1}
                          sx={{ overflowY: { xs: "none", lg: "auto" } }}
                          py={0.5}
                          display="flex"
                          flexDirection="column"
                          gap={1}
                        >
                          {projectActivities.map((activity) => {
                            return (
                              <Box
                                key={activity.timestamp.toDate()}
                                display="flex"
                                flexDirection="column"
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Intl.DateTimeFormat("en-US", {
                                    weekday: "long",
                                    hour: "numeric",
                                    minute: "numeric",
                                  }).format(dayjs(activity.timestamp.toDate()))}
                                </Typography>
                                <Typography
                                  variant="body"
                                  lineHeight={1.2}
                                  fontSize={"0.9rem"}
                                >
                                  {activity.desc}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Collapse>
                  )}
                </Grid>

                {/* For task */}
                <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                  <Box display="flex" alignItems="center" mb={0.5}>
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      color="#fbc02d"
                      fontSize={"1rem"}
                    >
                      Task
                    </Typography>
                    <Chip
                      color="warning"
                      label={activitiesCount.task}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                    {activitiesCount.task === 0 ? (
                      ""
                    ) : !taskExpanded ? (
                      <Tooltip title="Show task activities" enterDelay={400}>
                        <IconButton
                          size="small"
                          sx={{ ml: 1, p: 0 }}
                          onClick={() => handleToggleTask()}
                        >
                          <ExpandMoreIcon sx={{ fontSize: "1.25rem" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Collapse" enterDelay={400}>
                        <IconButton
                          size="small"
                          sx={{ ml: 1, p: 0 }}
                          onClick={() => handleToggleTask()}
                        >
                          <ExpandLessIcon sx={{ fontSize: "1.25rem" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>

                  <Divider />
                  {activitiesCount.task === 0 ? (
                    <Box mt={1}>
                      <Typography
                        variant="h6"
                        fontWeight={400}
                        lineHeight={1.2}
                        fontSize={"0.9rem"}
                        color="text.secondary"
                      >
                        No activity
                      </Typography>
                    </Box>
                  ) : (
                    <Collapse in={taskExpanded}>
                      {!taskActivities ? (
                        <CircularProgress size="1.5rem" />
                      ) : (
                        <Box
                          height={{
                            xs: "auto",
                            sm: "auto",
                            md: "auto",
                            lg: "210px",
                            xl: "210px",
                          }}
                          mt={1}
                          sx={{ overflowY: { xs: "none", lg: "auto" } }}
                          py={0.5}
                          display="flex"
                          flexDirection="column"
                          gap={1}
                        >
                          {taskActivities.map((activity) => {
                            return (
                              <Box
                                key={activity.timestamp.toDate()}
                                display="flex"
                                flexDirection="column"
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Intl.DateTimeFormat("en-US", {
                                    weekday: "long",
                                    hour: "numeric",
                                    minute: "numeric",
                                  }).format(dayjs(activity.timestamp.toDate()))}
                                </Typography>
                                <Typography
                                  variant="body"
                                  lineHeight={1.2}
                                  fontSize={"0.9rem"}
                                >
                                  {activity.desc}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Collapse>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default ActivitiesDisplay;
