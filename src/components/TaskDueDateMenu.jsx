import { Box, Typography, Menu, MenuItem, Divider } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

import { updateTaskDue } from "../hooks/updateTaskDue";
import { deleteTaskDue } from "../hooks/deleteTaskDue";

function TaskDueDateMenu({
  open,
  anchorEl,
  handleClosePopover,
  handleOpenDatePicker,
  data,
  projectId,
}) {
  const handleSetDueToday = async () => {
    await updateTaskDue(projectId, data.id, new Date(), data);
    handleClosePopover();
  };
  const handleSetDueTomorrow = async () => {
    await updateTaskDue(
      projectId,
      data.id,
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      data
    );
    handleClosePopover();
  };
  const handleDeleteDue = async () => {
    await deleteTaskDue(projectId, data.id, data);
    handleClosePopover();
  };
  return (
    <Menu
      key="due date"
      onClose={() => {
        handleClosePopover();
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuItem
        onClick={() => {
          handleSetDueToday();
        }}
      >
        <TodayOutlinedIcon sx={{ color: "text.secondary", mr: 1 }} />
        <Typography component="span">Today</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleSetDueTomorrow();
        }}
      >
        <EventOutlinedIcon sx={{ color: "text.secondary", mr: 1 }} />
        <Typography component="span">Tomorrow</Typography>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleOpenDatePicker();
        }}
      >
        <CalendarMonthOutlinedIcon sx={{ color: "text.secondary", mr: 1 }} />
        <Typography component="span">Pick a date</Typography>
      </MenuItem>
      {data.due ? (
        <Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={() => {
              handleDeleteDue();
            }}
          >
            <DeleteOutlinedIcon sx={{ color: "#d32f2f", mr: 1 }} />
            <Typography component="span" color="error">
              Remove due date
            </Typography>
          </MenuItem>
        </Box>
      ) : (
        ""
      )}
    </Menu>
  );
}

export default TaskDueDateMenu;
