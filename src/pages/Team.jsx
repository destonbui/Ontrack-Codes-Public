import { Box, Toolbar, Typography } from "@mui/material";

function Team(props) {
  return (
    <Box
      component={"main"}
      sx={{
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
        height: "100%",
        width: { xs: "100vw", sm: "100vw", md: `calc(100vw - 200px)` },
      }}
    >
      <Toolbar />
      <Box mt={2} display="flex" flexDirection="column">
        <Typography variant="h3" component="span" fontWeight={500}>
          Team
        </Typography>
      </Box>
      <Typography variant="body">
        Sorry, this feature is not available at the moment. You will be able to
        create team projects, add people to your team, assign tasks to a team
        member or a specific group of team member, etc in the future version of
        this app.
      </Typography>
    </Box>
  );
}

export default Team;
