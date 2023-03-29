import {
  Box,
  Typography,
  Chip,
  Collapse,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Badge,
  TextField,
  Button,
  Menu,
  MenuItem,
  Divider,
  Fade,
} from "@mui/material";

import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";

import { useState, useEffect } from "react";
import { updateTaskName } from "../hooks/updateTaskName";
import { updateTaskStatus } from "../hooks/updateTaskStatus";
import { deleteTask } from "../hooks/deleteTask";
import DatePickerModal from "./DatePickerModal";
import TaskDueDateMenu from "./TaskDueDateMenu";
import TaskChecklistMenu from "./TaskChecklistMenu";
import TaskAttachmentLink from "./TaskAttachmentLink";

function Task({ data, projectId, cardColor, projectData }) {
  const [isFocus, setFocus] = useState(false);
  const [checked, setChecked] = useState(false);
  const [taskName, setName] = useState(data.taskName);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checklistAnchorEl, setChecklistAnchorEl] = useState(null);
  const [attachmentLinkAnchorEl, setAttachmentLinkAnchorEl] = useState(null);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const today = new Date().setHours(0, 0, 0, 0);

  const tomorrow = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000
  ).setHours(0, 0, 0, 0);

  const dueDate = data.due ? new Date(data.due).setHours(0, 0, 0, 0) : "";

  //
  //
  //
  const handleCloseDatePicker = () => {
    setDatePickerOpen(false);
  };
  const handleOpenDatePicker = () => {
    setDatePickerOpen(true);
  };
  const handleToggle = () => {
    setChecked((prev) => !prev);
  };
  const handleChange = (newVal) => {
    setName(newVal);
  };
  const handleSubmit = async () => {
    await updateTaskName(projectId, data.id, taskName);
    setFocus(false);
  };
  const handleStartTask = async () => {
    await updateTaskStatus(
      projectId,
      data.id,
      "In Progress",
      projectData,
      data
    );
  };
  const handleDoneTask = async () => {
    await updateTaskStatus(projectId, data.id, "Done", projectData, data);
  };
  const handleDeleteTask = async () => {
    await deleteTask(projectId, data.id, data.list, projectData, data);
  };
  const handleOpenPopover = (e) => {
    setAnchorEl(e.target);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const handleOpenChecklist = (e) => {
    setChecklistAnchorEl(e.target);
  };
  const handleCloseChecklist = () => {
    setChecklistAnchorEl(null);
  };
  const handleOpenAttachment = (e) => {
    setAttachmentLinkAnchorEl(e.target);
  };
  const handleCloseAttachment = () => {
    setAttachmentLinkAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const openChecklist = Boolean(checklistAnchorEl);
  const openAttachment = Boolean(attachmentLinkAnchorEl);

  const cardActionsPT =
    !data.checklistTotal || data.checklistTotal === 0
      ? !data.attachmentsTotal || data.attachmentsTotal === 0
        ? 0.5
        : 1.5
      : 1.5;

  const badgeColorTodo = {
    mx: 1,
    "& .MuiBadge-badge": {
      color: "#616161",
      backgroundColor: "#fafafa",
      fontSize: "0.7rem",
      fontWeight: 500,
      letterSpacing: "0.07rem",
    },
  };

  const badgeColorProgress = {
    mx: 1,
    "& .MuiBadge-badge": {
      color: "#1976d2",
      backgroundColor: "#e3f2fd",
      fontSize: "0.7rem",
      fontWeight: 500,
      letterSpacing: "0.07rem",
    },
  };

  const badgeColorDone = {
    mx: 1,
    "& .MuiBadge-badge": {
      color: "#388e3c",
      backgroundColor: "#e8f5e9",
      fontSize: "0.7rem",
      fontWeight: 500,
      letterSpacing: "0.07rem",
    },
  };

  useEffect(() => {
    if (taskName === "New task" && !data.nameSet) {
      setFocus(true);
    }
  }, []);

  return (
    <>
      <Fade in>
        <Card
          sx={{ borderRadius: 3, width: "100%", cursor: "pointer" }}
          onClick={(e) => {
            if (!data.latestEdit) {
              if (e.target.id === "content") {
                handleToggle();
              }
            } else {
              if (e.target.id === "content" || e.target.id === "task-name") {
                handleToggle();
              }
            }
          }}
        >
          <CardContent
            id="content"
            sx={{ backgroundColor: cardColor.content, py: 1 }}
          >
            {/* 
          For Chips display
         */}
            {/* {!data.checklistTotal || data.checklistTotal === 0 ? "" :  } */}

            {(!data.due || !data.checklistTotal || data.checklistTotal) ===
            false ? (
              ""
            ) : (
              <Box
                id="content"
                display="flex"
                flexWrap="wrap"
                gap={0.5}
                alignItems="center"
                mb={0.5}
              >
                {!data.attachmentsTotal || data.attachmentsTotal === 0 ? (
                  ""
                ) : (
                  <Tooltip
                    title={`${data.attachmentsTotal} ${
                      data.attachmentsTotal > 1 ? "attachments" : "attachment"
                    }`}
                  >
                    <Chip
                      size="small"
                      color="default"
                      label={data.attachmentsTotal}
                      icon={<InsertLinkOutlinedIcon />}
                      onClick={(e) => {
                        setAttachmentLinkAnchorEl(e.currentTarget);
                      }}
                    />
                  </Tooltip>
                )}
                {!data.checklistTotal || data.checklistTotal === 0 ? (
                  ""
                ) : (
                  <Tooltip title={`Checklist has ${data.checklistTotal} item`}>
                    <Chip
                      size="small"
                      color="info"
                      label={`${
                        data.checklistChecked ? data.checklistChecked : 0
                      } / ${data.checklistTotal}`}
                      icon={<PlaylistAddCheckIcon />}
                      onClick={(e) => {
                        setChecklistAnchorEl(e.currentTarget);
                      }}
                    />
                  </Tooltip>
                )}
                {!data.due ? (
                  ""
                ) : (
                  <Chip
                    label={
                      data.list !== "Done"
                        ? `${
                            dueDate === today
                              ? "Due Today - "
                              : dueDate === tomorrow
                              ? "Due Tomorrow - "
                              : dueDate < today
                              ? "Overdue - "
                              : ""
                          }${new Intl.DateTimeFormat("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          }).format(dueDate)}`
                        : `Completed on ${new Intl.DateTimeFormat("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          }).format(new Date(data.completedAt))}`
                    }
                    color={
                      data.list !== "Done"
                        ? dueDate === today || dueDate === tomorrow
                          ? "warning"
                          : dueDate < today
                          ? "error"
                          : "primary"
                        : new Date(data.due).setHours(0, 0, 0, 0) <
                          new Date(data.completedAt).setHours(0, 0, 0, 0)
                        ? "error"
                        : "success"
                    }
                    size="small"
                    icon={
                      data.list !== "Done" ? (
                        <ScheduleIcon />
                      ) : new Date(data.due).setHours(0, 0, 0, 0) <
                        new Date(data.completedAt).setHours(0, 0, 0, 0) ? (
                        <EventBusyOutlinedIcon />
                      ) : (
                        <EventAvailableOutlinedIcon />
                      )
                    }
                  />
                )}
              </Box>
            )}

            {isFocus ? (
              <Box display="flex" alignItems="center">
                <TextField
                  value={taskName}
                  variant="standard"
                  placeholder="Enter task name"
                  error={taskName === ""}
                  helperText={
                    taskName === "" ? "Task name can not be empty!" : undefined
                  }
                  autoFocus
                  sx={{ mr: 1, flexGrow: 1 }}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    handleChange(newVal);
                  }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 5 }}
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={taskName === ""}
                >
                  Confirm
                </Button>
              </Box>
            ) : (
              <Box display="flex" alignItems="center">
                <Typography
                  id="task-name"
                  children={taskName}
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 400,
                    fontSize: 18,
                    cursor: "pointer",
                    flexGrow: 1,
                  }}
                  onClick={() => {
                    if (!data.latestEdit) {
                      setFocus(true);
                    }
                  }}
                />
                {data.list === "To Do" ? (
                  <Tooltip title="Start task" enterDelay={250} arrow>
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleStartTask();
                      }}
                    >
                      <PlayArrowOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                ) : data.list === "In Progress" ? (
                  <Tooltip title="Done" enterDelay={250} arrow>
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleDoneTask();
                      }}
                    >
                      <CircleOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton
                    size="small"
                    color="success"
                    disableRipple
                    sx={{ cursor: "default" }}
                  >
                    <CheckCircleOutlineOutlinedIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </CardContent>

          <Collapse in={checked}>
            <CardActions
              sx={{
                backgroundColor: cardColor.actions,
                px: 1.5,
                pb: 0.5,
                pt: cardActionsPT,
                cursor: "default",
              }}
            >
              <Tooltip title="Attachments" enterDelay={250} arrow>
                <Badge
                  badgeContent={data.attachmentsTotal}
                  overlap="circular"
                  sx={
                    data.list === "To Do"
                      ? badgeColorTodo
                      : data.list === "In Progress"
                      ? badgeColorProgress
                      : badgeColorDone
                  }
                >
                  <IconButton
                    onClick={(e) => {
                      handleOpenAttachment(e);
                    }}
                  >
                    <InsertLinkOutlinedIcon sx={{ color: cardColor.icon }} />
                  </IconButton>
                </Badge>
              </Tooltip>
              <Tooltip title="Checklist" enterDelay={250} arrow>
                <Badge
                  badgeContent={
                    data.checklistTotal
                      ? `${data.checklistChecked ? data.checklistChecked : 0}/${
                          data.checklistTotal
                        }`
                      : undefined
                  }
                  overlap="circular"
                  sx={
                    data.list === "To Do"
                      ? badgeColorTodo
                      : data.list === "In Progress"
                      ? badgeColorProgress
                      : badgeColorDone
                  }
                >
                  <IconButton
                    onClick={(e) => {
                      handleOpenChecklist(e);
                    }}
                  >
                    <PlaylistAddCheckIcon sx={{ color: cardColor.icon }} />
                  </IconButton>
                </Badge>
              </Tooltip>
              {/* <Tooltip title="Comments" enterDelay={250} arrow>
            <IconButton>
              <QuestionAnswerOutlinedIcon sx={{ color: cardColor.icon }} />
            </IconButton>
          </Tooltip> */}
              {data.list === "Done" ? (
                ""
              ) : (
                <Tooltip
                  title={data.due ? "Edit due date" : "Add due date"}
                  enterDelay={250}
                  arrow
                >
                  <IconButton
                    onClick={(e) => {
                      handleOpenPopover(e);
                    }}
                  >
                    <CalendarMonthOutlinedIcon sx={{ color: cardColor.icon }} />
                  </IconButton>
                </Tooltip>
              )}

              <Box flexGrow={1} />
              <Tooltip title="Delete task" enterDelay={250} arrow>
                <IconButton
                  onClick={() => {
                    handleDeleteTask();
                  }}
                >
                  <DeleteOutlinedIcon sx={{ color: cardColor.icon }} />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Collapse>
        </Card>
      </Fade>

      {/* Add due date menu */}
      <TaskDueDateMenu
        open={open}
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
        handleOpenDatePicker={handleOpenDatePicker}
        data={data}
        projectId={projectId}
      />

      {/* Checklist menu */}
      <TaskChecklistMenu
        openChecklist={openChecklist}
        checklistAnchorEl={checklistAnchorEl}
        handleCloseChecklist={handleCloseChecklist}
        data={data}
        projectId={projectId}
      />

      {/* Attachment menu */}
      <TaskAttachmentLink
        openAttachment={openAttachment}
        attachmentAnchorEl={attachmentLinkAnchorEl}
        handleCloseAttachment={handleCloseAttachment}
        data={data}
        projectId={projectId}
      />

      <DatePickerModal
        isOpen={isDatePickerOpen}
        handleClose={handleCloseDatePicker}
        popoverClose={handleClosePopover}
        projectId={projectId}
        taskId={data.id}
        due={data.due}
        taskData={data}
      />
    </>
  );
}

export default Task;
