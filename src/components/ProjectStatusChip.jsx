import { Chip, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { updateProject } from "../hooks/updateProject";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function ProjectStatusChip({ status, projectId, projectName }) {
  const [stat, setStat] = useState(status);

  const handleChange = async (newVal) => {
    setStat(newVal);
    try {
      await updateProject(projectId, { status: newVal }, projectName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setStat(status);
  }, [status]);

  return (
    <Select
      value={stat}
      variant="standard"
      onChange={(e) => {
        const newVal = e.target.value;
        handleChange(newVal);
      }}
      disableUnderline
    >
      <MenuItem value="Pending">
        <Chip
          label="Pending"
          size="medium"
          variant="outlined"
          sx={{ cursor: "pointer" }}
        />
      </MenuItem>
      <MenuItem value="Ongoing">
        <Chip
          label="Ongoing"
          size="medium"
          variant="outlined"
          color="primary"
          icon={<PlayArrowIcon />}
          sx={{ cursor: "pointer" }}
        />
      </MenuItem>
      <MenuItem value="Suspended">
        <Chip
          label="Suspended"
          size="medium"
          variant="outlined"
          color="error"
          icon={<PauseIcon />}
          sx={{ cursor: "pointer" }}
        />
      </MenuItem>
      <MenuItem value="Completed">
        <Chip
          label="Completed"
          size="medium"
          variant="outlined"
          color="success"
          icon={<DoneAllIcon />}
          sx={{ cursor: "pointer" }}
        />
      </MenuItem>
    </Select>
  );
}

export default ProjectStatusChip;
