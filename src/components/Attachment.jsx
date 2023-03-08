import { Box, Typography, IconButton, Link, Tooltip } from "@mui/material";

import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteAttachment } from "../hooks/deleteAttachment";

function Attachment({ projectId, taskId, data, taskData }) {
  const { id, createdAt, desc, href } = data;

  const handleDelete = async () => {
    await deleteAttachment(projectId, taskId, id, taskData);
  };

  return (
    <Box display="flex" flexDirection="column" flexWrap="wrap">
      <Box display="flex" alignItems="flex-end">
        <Typography variant="caption">
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(createdAt))}
        </Typography>
        <Tooltip title="Remove attachment link" enterDelay={500}>
          <IconButton
            size="small"
            sx={{ ml: 1 }}
            onClick={() => {
              handleDelete();
            }}
          >
            <DeleteOutlinedIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex" alignItems="center" flexWrap="wrap" overflow="hidden">
        <InsertLinkOutlinedIcon color="primary" sx={{ mr: 1 }} />
        <Link href={href} target="_blank" underline="hover">
          {desc}
        </Link>
      </Box>
    </Box>
  );
}

export default Attachment;
