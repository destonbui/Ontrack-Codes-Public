import {
  Typography,
  Box,
  Divider,
  Chip,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import ScheduleIcon from "@mui/icons-material/Schedule";
import { getOverdueTasks } from "../hooks/getOverdueTasks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasksByDate } from "../hooks/getTasksByDate";
import dayjs from "dayjs";

function UpcomingTasksDisplay() {
  const navigate = useNavigate();

  const [overdue, setOverdue] = useState(null);
  const [today, setToday] = useState(null);
  const [tomorrow, setTomorrow] = useState(null);

  if (!overdue) {
    const overdueTasks = getOverdueTasks();

    overdueTasks.then((data) => {
      setOverdue(data);
    });
  }
  if (!today) {
    const date = dayjs().format("DD/MM/YYYY");
    const todayTasks = getTasksByDate(date);

    todayTasks.then((data) => {
      setToday(data);
    });
  }
  if (!tomorrow) {
    const date = dayjs(new Date().getTime() + 24 * 60 * 60 * 1000).format(
      "DD/MM/YYYY"
    );
    const tomorrowTasks = getTasksByDate(date);

    tomorrowTasks.then((data) => {
      setTomorrow(data);
    });
  }

  const loadingOverdue = Boolean(!overdue);
  const loadingToday = Boolean(!today);
  const loadingTomorrow = Boolean(!tomorrow);

  const dateDiff = (first, second) => {
    const firstDMY = {
      day: Number(first.split("/")[0]),
      month: Number(first.split("/")[1]),
      year: Number(first.split("/")[2]),
    };
    const secondDMY = {
      day: Number(second.split("/")[0]),
      month: Number(second.split("/")[1]),
      year: Number(second.split("/")[2]),
    };

    const diff = {
      day: Math.abs(firstDMY.day - secondDMY.day),
      month: Math.abs(firstDMY.month - secondDMY.month),
      year: Math.abs(firstDMY.year - secondDMY.year),
    };

    return diff;
  };

  return (
    <Paper
      sx={{
        height: "100%",
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
        width={{ xs: "300px", sm: "100%" }}
      >
        <Grid container>
          <Grid xs={12}>
            <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
              <Typography variant="h5">Upcoming Tasks</Typography>
              <ScheduleIcon
                sx={{
                  color: "red",
                  width: "1.1em",
                  height: "1.1em",
                  ml: 0.5,
                }}
              />
            </Box>

            <Grid
              container
              sx={{ p: 0, mt: 1, overflowY: "auto" }}
              maxHeight={{ xl: "525px" }}
            >
              {/* Overdue */}
              <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="red"
                    fontSize={"1rem"}
                  >
                    Overdue
                  </Typography>
                  <Chip
                    color="error"
                    label={!overdue ? 0 : overdue.length}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Divider />

                {/* Tasks display */}
                <Grid container direction="column" mt={0.5}>
                  {loadingOverdue ? (
                    <CircularProgress size="1.5rem" />
                  ) : overdue.length === 0 ? (
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      lineHeight={1.2}
                      fontSize={"0.9rem"}
                      color="text.secondary"
                    >
                      No overdue task
                    </Typography>
                  ) : (
                    overdue.map((task) => {
                      const dmyAgo = dateDiff(
                        task.due,
                        dayjs().format("DD/MM/YYYY")
                      );
                      return (
                        <Grid key={task.id} xs={12} p={0} my={0.5}>
                          <Card
                            elevation={2}
                            sx={{ backgroundColor: "#ffebee", borderRadius: 4 }}
                            onClick={() => {
                              navigate(`/Project/${task.projectId}`);
                            }}
                          >
                            <CardActionArea>
                              <CardContent sx={{ py: 1.2, px: 2 }}>
                                <Typography
                                  variant="h6"
                                  fontWeight={400}
                                  lineHeight={1.2}
                                  fontSize={"1rem"}
                                  gutterBottom
                                >
                                  {task.taskName}
                                </Typography>
                                <Box display="flex" flexDirection="row-reverse">
                                  <Typography
                                    variant="caption"
                                    fontWeight={400}
                                    color="text.secondary"
                                  >
                                    {dmyAgo.year > 0
                                      ? `${dmyAgo.year} ${
                                          dmyAgo.year > 1 ? "years" : "year"
                                        } ago`
                                      : dmyAgo.month > 0
                                      ? `${dmyAgo.month} ${
                                          dmyAgo.month > 1 ? "months" : "month"
                                        } ago`
                                      : `${dmyAgo.day} ${
                                          dmyAgo.day > 1 ? "days" : "day"
                                        } ago`}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              {/* Today */}
              <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="#fbc02d"
                    fontSize={"1rem"}
                  >
                    Today
                  </Typography>
                  <Chip
                    color="warning"
                    label={!today ? 0 : today.length}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Divider />

                {/* Tasks display */}
                <Grid container direction="column" mt={0.5}>
                  {loadingToday ? (
                    <CircularProgress size="1.5rem" />
                  ) : today.length === 0 ? (
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      lineHeight={1.2}
                      fontSize={"0.9rem"}
                      color="text.secondary"
                    >
                      No task due today
                    </Typography>
                  ) : (
                    today.map((task) => {
                      return (
                        <Grid key={task.id} xs={12} p={0} my={0.5}>
                          <Card
                            elevation={2}
                            sx={{ backgroundColor: "#fffde7", borderRadius: 4 }}
                            onClick={() => {
                              navigate(`/Project/${task.projectId}`);
                            }}
                          >
                            <CardActionArea>
                              <CardContent sx={{ py: 1.2, px: 2 }}>
                                <Typography
                                  variant="h6"
                                  fontWeight={400}
                                  lineHeight={1.2}
                                  fontSize={"1rem"}
                                >
                                  {task.taskName}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      );
                    })
                  )}
                </Grid>
              </Grid>

              {/* Tomorrow */}
              <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    color="primary"
                    fontSize={"1rem"}
                  >
                    Tomorrow
                  </Typography>
                  <Chip
                    color="primary"
                    label={!tomorrow ? 0 : tomorrow.length}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Divider />

                {/* Tasks display */}
                <Grid container direction="column" mt={0.5}>
                  {loadingTomorrow ? (
                    <CircularProgress size="1.5rem" />
                  ) : tomorrow.length === 0 ? (
                    <Typography
                      variant="h6"
                      fontWeight={400}
                      lineHeight={1.2}
                      fontSize={"0.9rem"}
                      color="text.secondary"
                    >
                      No task due tomorrow
                    </Typography>
                  ) : (
                    tomorrow.map((task) => {
                      return (
                        <Grid key={task.id} xs={12} p={0} my={0.5}>
                          <Card
                            elevation={2}
                            sx={{ backgroundColor: "#e3f2fd", borderRadius: 4 }}
                            onClick={() => {
                              navigate(`/Project/${task.projectId}`);
                            }}
                          >
                            <CardActionArea>
                              <CardContent sx={{ py: 1.2, px: 2 }}>
                                <Typography
                                  variant="h6"
                                  fontWeight={400}
                                  lineHeight={1.2}
                                  fontSize={"1rem"}
                                >
                                  {task.taskName}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      );
                    })
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default UpcomingTasksDisplay;
