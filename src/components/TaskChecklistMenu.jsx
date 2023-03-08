import { Box, TextField, Button, Fade, Popover } from "@mui/material";

import { useState } from "react";
import { addCheckItems } from "../hooks/addCheckItems";
import ChecklistDisplay from "./ChecklistDisplay";

function TaskChecklistMenu({
  openChecklist,
  checklistAnchorEl,
  handleCloseChecklist,
  data,
  projectId,
}) {
  const [isAdding, setAdding] = useState(false);
  const [checkitemsInput, setCheckitemsInput] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleSetAdding = () => {
    setAdding(true);
  };
  const handleCloseAdding = () => {
    setCheckitemsInput("");
    setErrMsg(null);
    setAdding(false);
  };

  const handleChange = (newVal) => {
    setCheckitemsInput(newVal);
    if (!isValid(newVal)) {
      setErrMsg("Special characters is not allowed, except for comma.");
    } else setErrMsg(null);
  };

  const isValid = (string) => {
    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
    return !format.test(string);
  };

  const handleAdd = async () => {
    if (isValid(checkitemsInput)) {
      await addCheckItems(projectId, data, checkitemsInput);
      handleCloseAdding();
    } else {
      setCheckitemsInput("");
    }
  };

  return (
    <Popover
      sx={{ overflowY: "scroll" }}
      marginThreshold={100}
      key="checklist"
      onClose={() => {
        handleCloseChecklist();
        handleCloseAdding();
      }}
      open={openChecklist}
      anchorEl={checklistAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {/* Check items display */}
      <Box maxWidth="250px" p={1}>
        {!data.checklistTotal || data.checklistTotal === 0 ? (
          ""
        ) : (
          <ChecklistDisplay
            projectId={projectId}
            taskId={data.id}
            taskData={data}
          />
        )}
        {isAdding ? (
          <Fade in={isAdding}>
            <Box display="flex" alignItems="flex-start" px={2} py={1}>
              <TextField
                variant="standard"
                value={checkitemsInput}
                error={errMsg ? true : false}
                type="text"
                placeholder="Ex: item 1,item 2"
                helperText={errMsg ? errMsg : undefined}
                sx={{ mr: 1 }}
                spellCheck={false}
                autoComplete={"false"}
                onKeyDown={(e) => {
                  const key = e.key;
                  if (key === "Enter") {
                    handleAdd();
                  }
                }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  handleChange(newVal);
                }}
              />
              <Button
                disabled={errMsg || checkitemsInput === "" ? true : false}
                variant="outlined"
                onClick={() => {
                  handleAdd();
                }}
              >
                Add
              </Button>
            </Box>
          </Fade>
        ) : (
          ""
        )}
        {!isAdding ? (
          <Fade in={!isAdding}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={2}
            >
              <Button
                onClick={() => {
                  handleSetAdding();
                }}
              >
                Add check items
              </Button>
            </Box>
          </Fade>
        ) : (
          ""
        )}
      </Box>
    </Popover>
  );
}

export default TaskChecklistMenu;
