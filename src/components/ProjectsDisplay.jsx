import {
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  Collapse,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Project from "./Project";
import ProjectAdd from "./ProjectAdd";
import ProjectsContext from "../components/ProjectsContext";
import { useContext, useEffect, useState } from "react";

function ProjectsDisplay({ state, category, createPermission }) {
  const [isExpanded, setExpanded] = state;
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("All");

  const { projects } = useContext(ProjectsContext);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };
  const handleChangeFilter = (filterVal) => {
    setFilter(filterVal);
  };

  const filterStyleDefault = {
    textTransform: "none",
    fontWeight: 400,
    color: "text.secondary",
    p: 0,
    borderRadius: 5,
  };
  const filterStyleHighlighted = {
    textTransform: "none",
    p: 0,
    borderRadius: 5,
  };

  const compare = (a, b) => {
    const aProgress =
      a.status === "Pending"
        ? 0
        : a.status === "Ongoing"
        ? 1
        : a.status === "Suspended"
        ? 2
        : 3;
    const bProgress =
      b.status === "Pending"
        ? 0
        : b.status === "Ongoing"
        ? 1
        : b.status === "Suspended"
        ? 2
        : 3;

    if (aProgress < bProgress) {
      return -1;
    }
    if (aProgress > bProgress) {
      return 1;
    }
    if (aProgress === bProgress) {
      if (a.priorityLevel > b.priorityLevel) {
        return -1;
      }
      if (a.priorityLevel < b.priorityLevel) {
        return 1;
      }
      if (a.priorityLevel === b.priorityLevel) {
        return 0;
      }
    }
  };

  useEffect(() => {
    switch (filter) {
      case "All":
        setFilteredProjects(projects);
        break;
      case "Pending":
        setFilteredProjects(
          projects.filter((project) => {
            return project.status === "Pending";
          })
        );
        break;
      case "Ongoing":
        setFilteredProjects(
          projects.filter((project) => {
            return project.status === "Ongoing";
          })
        );
        break;
      case "Suspended":
        setFilteredProjects(
          projects.filter((project) => {
            return project.status === "Suspended";
          })
        );
        break;
      case "Completed":
        setFilteredProjects(
          projects.filter((project) => {
            return project.status === "Completed";
          })
        );
        break;
      default:
        console.log("Projects filter error!");
        break;
    }
  }, [filter, projects]);

  return (
    <>
      <Box
        display="flex"
        mt={2}
        alignItems={"center"}
        width="100%"
        flexWrap="wrap"
      >
        <Typography color="primary" variant="h6">
          {category}
        </Typography>
        <IconButton
          onClick={() => {
            handleToggle();
          }}
          sx={{ ml: 1 }}
        >
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <Box
          display={{ xs: "none", sm: "flex" }}
          gap={1}
          flexDirection="row-reverse"
          flexGrow={1}
        >
          <Button
            variant="text"
            sx={
              filter === "Completed"
                ? filterStyleHighlighted
                : filterStyleDefault
            }
            onClick={() => {
              handleChangeFilter("Completed");
            }}
          >
            Completed
          </Button>
          <Button
            variant="text"
            sx={
              filter === "Suspended"
                ? filterStyleHighlighted
                : filterStyleDefault
            }
            onClick={() => {
              handleChangeFilter("Suspended");
            }}
          >
            Suspended
          </Button>
          <Button
            variant="text"
            sx={
              filter === "Ongoing" ? filterStyleHighlighted : filterStyleDefault
            }
            onClick={() => {
              handleChangeFilter("Ongoing");
            }}
          >
            Ongoing
          </Button>

          <Button
            variant="text"
            sx={
              filter === "Pending" ? filterStyleHighlighted : filterStyleDefault
            }
            onClick={() => {
              handleChangeFilter("Pending");
            }}
          >
            Pending
          </Button>
          <Button
            variant="text"
            sx={filter === "All" ? filterStyleHighlighted : filterStyleDefault}
            onClick={() => {
              handleChangeFilter("All");
            }}
          >
            All
          </Button>
        </Box>
        <Box
          display={{ xs: "flex", sm: "none" }}
          flexDirection="row-reverse"
          flexGrow={1}
        >
          <Select
            value={filter}
            variant="standard"
            disableUnderline
            sx={{ fontWeight: 500, color: "#1976d2" }}
            onChange={(e) => {
              const newVal = e.target.value;
              handleChangeFilter(newVal);
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Suspended">Suspended</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />
      <Collapse in={isExpanded}>
        <Grid
          container
          rowGap={2}
          columnGap={2}
          mb={4}
          justifyContent={{
            xs: "space-between",
            sm: "space-between",
            md: "space-between",
            lg: "flex-start",
            xl: "flex-start",
          }}
        >
          {createPermission ? (
            <ProjectAdd key="add" id={category} isExpanded={isExpanded} />
          ) : (
            ""
          )}
          {filteredProjects.sort(compare).map((projectInfo, index) => {
            return (
              <Project
                key={index}
                data={projectInfo}
                index={index}
                isExpanded={isExpanded}
              />
            );
          })}
        </Grid>
      </Collapse>
    </>
  );
}

export default ProjectsDisplay;
