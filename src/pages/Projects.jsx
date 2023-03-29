import { Box, Toolbar, Typography } from "@mui/material";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import ProjectsDisplay from "../components/ProjectsDisplay";

function Projects() {
  return (
    <>
      <Box
        component={"main"}
        sx={{
          pl: { xs: 2, sm: 3, md: 4 },
          pr: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          minHeight: "100vh",
          width: { xs: "100vw", sm: "100vw", md: `calc(100vw - 200px)` },
          backgroundColor: "#f4f4f4",
        }}
      >
        <Toolbar />
        <Box mt={1} display={{ xs: "block", sm: "block", md: "none" }}>
          <Typography
            variant="h3"
            component="span"
            fontWeight={500}
            gutterBottom
          >
            Projects
          </Typography>
        </Box>

        {[
          {
            title: "Your Projects",
            isExpandedDefault: true,
            createPermission: true,
          },
        ].map((category, index) => {
          return (
            <ProjectsDisplay
              key={index}
              state={useState(category.isExpandedDefault)}
              category={category.title}
              createPermission={category.createPermission}
            />
          );
        })}
      </Box>
      <Outlet />
    </>
  );
}

export default Projects;
