import { IconButton, Box, Typography } from "@mui/material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useState } from "react";
import { toggleCheckitemChecked } from "../hooks/toggleCheckitemChecked";
import { deleteCheckItem } from "../hooks/deleteCheckItem";

function CheckItem({ data, projectId, taskId, taskData }) {
  const [isHover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };
  const handleMouseOut = () => {
    setHover(false);
  };

  const handleToggleCheck = async () => {
    handleMouseOut();
    await toggleCheckitemChecked(projectId, taskId, data, taskData);
  };
  const handleDelete = async () => {
    await deleteCheckItem(projectId, taskId, data.id, taskData, data);
  };

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      onMouseOver={() => {
        handleMouseOver();
      }}
      onMouseOut={() => {
        handleMouseOut();
      }}
    >
      {data.checked ? (
        <IconButton
          sx={{ mr: 1 }}
          size="small"
          onClick={() => {
            handleToggleCheck();
          }}
        >
          <CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} />
        </IconButton>
      ) : (
        <IconButton
          sx={{ mr: 1 }}
          size="small"
          onClick={() => {
            handleToggleCheck();
          }}
        >
          <CircleOutlinedIcon />
        </IconButton>
      )}
      <Typography
        variant="body"
        sx={{ flexGrow: 1, pt: 0.6, cursor: "pointer" }}
        color={data.checked ? "text.secondary" : "text.primary"}
        onClick={() => {
          handleToggleCheck();
        }}
      >
        {data.title}
      </Typography>
      {isHover ? (
        <IconButton
          size="small"
          sx={{ ml: 1 }}
          onClick={() => {
            handleDelete();
          }}
        >
          <ClearOutlinedIcon />
        </IconButton>
      ) : (
        ""
      )}
    </Box>
  );
}

export default CheckItem;
