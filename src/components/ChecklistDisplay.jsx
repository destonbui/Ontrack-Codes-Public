import { Box, CircularProgress, Divider, Fade } from "@mui/material";
import React from "react";
import { fetchChecklist } from "../hooks/fetchChecklist";
import CheckItem from "./CheckItem";

function ChecklistDisplay({ projectId, taskId, taskData }) {
  const { checkitems } = fetchChecklist(projectId, taskId);

  const compare = (a, b) => {
    if (a.checked < b.checked) {
      return -1;
    }
    if (a.checked > b.checked) {
      return 1;
    }
    if (a.checked === b.checked) {
      if (a.title < b.title) {
        return -1;
      } else {
        return 1;
      }
      return 0;
    }
  };
  return (
    <Box>
      {!checkitems ? (
        <CircularProgress />
      ) : (
        <Fade in>
          <Box px={2} py={1}>
            {checkitems.sort(compare).map((item) => {
              return (
                <CheckItem
                  key={item.id}
                  data={item}
                  projectId={projectId}
                  taskId={taskId}
                  taskData={taskData}
                />
              );
            })}
          </Box>
        </Fade>
      )}
      <Divider sx={{ my: 1 }} />
    </Box>
  );
}

export default ChecklistDisplay;
