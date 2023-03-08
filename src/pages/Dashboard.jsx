import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import UserActionsDisplay from "../components/UserActionsDisplay";

import { useEffect, useState } from "react";

import { getUserStats } from "../hooks/getUserStats";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    const result = getUserStats();
    result.then((data) => {
      setStats(data);
      setFetched(true);
    });
  }, []);

  return (
    <Box
      component={"main"}
      sx={{
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
        height: "100%",
        width: { xs: "100vw", sm: "100vw", md: `calc(100vw - 200px)` },
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar />

      <Box
        mt={2}
        flexGrow={1}
        display="flex"
        flexDirection={{ xs: "column", sm: "column-reverse" }}
        justifyContent={{ xs: "flex-start", sm: "flex-end" }}
        gap={2}
      >
        <Typography
          variant="h3"
          component="span"
          fontWeight={500}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          Dashboard
        </Typography>

        <UserActionsDisplay />

        <Paper>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            justifyContent={{ xs: "space-evenly", sm: "space-evenly" }}
          >
            <Box
              py={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
              >
                Projects
              </Typography>
              {!isFetched ? (
                <CircularProgress />
              ) : (
                <Typography
                  color="primary"
                  variant="h3"
                  sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
                >
                  {stats.projectsTotal ? stats.projectsTotal : 0}
                </Typography>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
              >
                Tasks
              </Typography>
              {!isFetched ? (
                <CircularProgress />
              ) : (
                <Typography
                  color="primary"
                  variant="h3"
                  sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
                >
                  {stats.tasksTotal ? stats.tasksTotal : 0}
                </Typography>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
              >
                On-time
              </Typography>
              {!isFetched ? (
                <CircularProgress />
              ) : (
                <Typography
                  color={
                    !stats.lateTotal
                      ? "primary"
                      : Math.abs(
                          Math.round(
                            (1 - stats.lateTotal / stats.tasksTotal) * 100
                          )
                        ) > 79
                      ? "primary"
                      : "error"
                  }
                  variant="h3"
                  sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
                >
                  {stats.tasksTotal
                    ? stats.lateTotal
                      ? `${Math.abs(
                          Math.round(
                            (1 - stats.lateTotal / stats.tasksTotal) * 100
                          )
                        )}%`
                      : "100%"
                    : "100%"}
                </Typography>
              )}
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;
