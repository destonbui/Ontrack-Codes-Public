import { Box, Fade, Divider, Typography, IconButton } from "@mui/material";

import AddLinkIcon from "@mui/icons-material/AddLink";

import { fetchAttachments } from "../hooks/fetchAttachments";
import Attachment from "./Attachment";

function AttachmentsDisplay({ projectId, taskId, setAdding, taskData }) {
  const { attachments } = fetchAttachments(projectId, taskId);

  return (
    <Fade in unmountOnExit>
      <Box width="300px" p={2}>
        <Box display="flex" alignItems="flex-end" mb={0.5}>
          <Typography
            variant="h6"
            fontSize="1rem"
            color="text.primary"
            sx={{ flexGrow: 1 }}
          >
            Attachment links
          </Typography>
          <IconButton
            size="small"
            color="text.primary"
            onClick={() => {
              setAdding(true);
            }}
          >
            <AddLinkIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 1 }} />

        {/* Display attachments */}
        {!attachments[0] ? (
          <Typography variant="caption" color="text.secondary">
            No attachment link to display.
          </Typography>
        ) : (
          attachments.map((attachment) => {
            return (
              <Attachment
                key={attachment.id}
                projectId={projectId}
                taskId={taskId}
                taskData={taskData}
                data={attachment}
              />
            );
          })
        )}
      </Box>
    </Fade>
  );
}

export default AttachmentsDisplay;
