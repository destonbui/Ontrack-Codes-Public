import { useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  Zoom,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams } from "react-router-dom";
import { fetchProject } from "../hooks/fetchProject";
import { useState } from "react";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import TasksDisplay from "../components/TasksDisplay";
import ProjectStatusChip from "../components/ProjectStatusChip";

function ProjectDetails() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const closeEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const closeDelete = () => {
    setOpenDelete(false);
  };

  const projectId = useParams().projectId;
  const navigate = useNavigate();

  const { projectData } = fetchProject(projectId);

  return (
    <>
      <Zoom in>
        <Box
          component={"div"}
          display="flex"
          flexDirection="column"
          sx={{
            px: { xs: 2, sm: 3 },
            pt: { xs: 1 },
            pb: 3,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#f4f4f4",
            width: "100vw",
            minHeight: "100vh",
            zIndex: 9999,
          }}
        >
          <Toolbar />
          <Box>
            {!projectData.name ? (
              <CircularProgress />
            ) : (
              <Box>
                <Box component="nav" display="flex" alignItems="center">
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    onClick={() => {
                      navigate("/Projects");
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <Tooltip
                      title="Back to projects"
                      enterDelay={500}
                      leaveDelay={250}
                    >
                      <IconButton sx={{ p: 0 }} color="primary">
                        <ChevronLeftIcon sx={{ fontSize: "1.5rem" }} />
                      </IconButton>
                    </Tooltip>
                    <Typography color="primary" variant="body">
                      Back to projects
                    </Typography>
                  </Box>

                  <Box flexGrow={1} />

                  <Box display="flex" gap={2}>
                    {/* Edit btn start */}
                    <Tooltip
                      title="Edit project info"
                      enterDelay={500}
                      leaveDelay={250}
                    >
                      <IconButton
                        onClick={() => {
                          handleOpenEdit();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Edit btn end */}

                    {/* History btn start */}
                    {/* <Tooltip title="History" enterDelay={500} leaveDelay={250}>
                      <IconButton>
                        <HistoryIcon />
                      </IconButton>
                    </Tooltip> */}
                    {/* History btn end */}

                    {/* Delete btn start */}
                    <Tooltip
                      title="Delete project"
                      enterDelay={500}
                      leaveDelay={250}
                    >
                      <IconButton
                        onClick={() => {
                          handleOpenDelete();
                        }}
                      >
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </Tooltip>
                    {/* Delete btn end */}
                  </Box>
                </Box>

                <Box mt={1} mx={{ xs: 2, sm: 3 }}>
                  <Box display="flex" gap={0.5} mb={1} alignItems="center">
                    <Chip
                      size="medium"
                      variant="outlined"
                      color={
                        projectData.priority === "Normal"
                          ? undefined
                          : projectData.priority === "Moderate"
                          ? "warning"
                          : "error"
                      }
                      label={`${projectData.priority} priority`}
                    />

                    <ProjectStatusChip
                      status={projectData.status}
                      projectId={projectId}
                      projectName={projectData.name}
                    />
                  </Box>

                  <Typography
                    variant={"h3"}
                    fontWeight={700}
                    sx={{ lineHeight: 1, mb: 0.5, ml: -0.25 }}
                  >
                    {projectData.name}
                  </Typography>
                  <Typography variant="body">{projectData.desc}</Typography>
                </Box>
              </Box>
            )}
          </Box>
          <TasksDisplay projectId={projectId} projectData={projectData} />
        </Box>
      </Zoom>
      {!openEdit ? (
        ""
      ) : (
        <EditModal
          isOpen={openEdit}
          handleClose={closeEdit}
          data={projectData}
          projectId={projectId}
        />
      )}
      {!openDelete ? (
        ""
      ) : (
        <DeleteModal
          isOpen={openDelete}
          handleClose={closeDelete}
          projectName={projectData.name}
          projectId={projectId}
          projectTasksTotal={projectData.total}
        />
      )}
    </>
  );
}

export default ProjectDetails;
