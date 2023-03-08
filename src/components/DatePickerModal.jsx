import { useState } from "react";
import { Modal, Box, Fade, TextField, Button } from "@mui/material";
import { DesktopDatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import { updateTaskDue } from "../hooks/updateTaskDue";

function DatePickerModal({
  isOpen,
  handleClose,
  popoverClose,
  projectId,
  taskId,
  due,
  taskData,
}) {
  const [selectedDate, setSelectedDate] = useState(due ? due : null);

  const handleSetDueDate = async () => {
    await updateTaskDue(projectId, taskId, selectedDate, taskData);
    handleClose();
    popoverClose();
  };

  return (
    <Modal
      open={isOpen}
      in={"false"}
      onClose={() => {
        handleClose();
      }}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            width: { xs: "350px", sm: "400px" },
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <DesktopDatePicker
            label="Pick a due date"
            value={selectedDate}
            onChange={(newVal) => {
              setSelectedDate(newVal);
            }}
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ display: { xs: "none", sm: "block" } }}
                disabled
                fullWidth
              />
            )}
            disablePast
          />
          <MobileDatePicker
            label="Pick a due date"
            value={selectedDate}
            onChange={(newVal) => {
              setSelectedDate(newVal);
            }}
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ display: { xs: "block", sm: "none" } }}
                disabled
                fullWidth
              />
            )}
            disablePast
          />
          <Box display="flex" flexDirection="row-reverse" gap={1} mt={3}>
            <Button
              variant="contained"
              size="medium"
              disabled={!selectedDate}
              onClick={() => {
                handleSetDueDate();
              }}
            >
              Set
            </Button>
            <Button
              variant="text"
              size="medium"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default DatePickerModal;
