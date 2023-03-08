import {
  Box,
  TextField,
  Button,
  Fade,
  Popover,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { addAttachmentLink } from "../hooks/addAttachmentLink";
import AttachmentsDisplay from "./AttachmentsDisplay";

function TaskAttachmentLink({
  openAttachment,
  attachmentAnchorEl,
  handleCloseAttachment,
  data,
  projectId,
}) {
  const [urlInput, setInput] = useState("");
  const [url, setUrl] = useState(null);
  const [desc, setDesc] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [isAdding, setAdding] = useState(false);

  const handleChangeUrl = (newVal) => {
    setInput(newVal);
    setErrMsg(null);
    setUrl(null);
    try {
      const input = new URL(newVal).href;
      setUrl(input);
    } catch (error) {
      setUrl(null);
      setErrMsg(error.message.split(":")[1].slice(1));
    }
  };

  const handleChangeDesc = (newVal) => {
    setDesc(newVal);
  };

  const handleClose = () => {
    handleCloseAttachment();
    setInput("");
    setDesc("");
    setErrMsg(null);
    setUrl(null);
    setAdding(false);
  };

  const handleAdd = async () => {
    await addAttachmentLink(projectId, data, desc, url);
    handleClose();
  };

  return (
    <Popover
      sx={{ overflowY: "scroll" }}
      marginThreshold={100}
      key="attachment"
      onClose={() => {
        handleClose();
      }}
      open={openAttachment}
      anchorEl={attachmentAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {/* Attachment links view */}
      {!isAdding ? (
        <AttachmentsDisplay
          projectId={projectId}
          taskId={data.id}
          setAdding={setAdding}
          taskData={data}
        />
      ) : (
        ""
      )}

      {/* Add attachment Link */}
      <Fade in={isAdding} unmountOnExit>
        <Box width="300px" p={2}>
          <Typography variant="h6" gutterBottom color="primary">
            New attachment link
          </Typography>
          <TextField
            label="Description"
            placeholder="Attachment description"
            variant="standard"
            fullWidth
            onChange={(e) => {
              const newVal = e.target.value;
              handleChangeDesc(newVal);
            }}
            required
            sx={{ mb: 1 }}
          />
          <TextField
            value={urlInput}
            error={errMsg ? true : false}
            helperText={errMsg ? errMsg : undefined}
            variant="standard"
            label="Attachment link"
            placeholder="Ex: https://drive.google.com/your_file_link"
            type="url"
            autoCorrect="false"
            fullWidth
            required
            onChange={(e) => {
              const newVal = e.target.value;
              handleChangeUrl(newVal);
            }}
            sx={{ mb: 3 }}
          />
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            disabled={!url || desc === ""}
            fullWidth
            onClick={() => {
              handleAdd();
            }}
          >
            Add link
          </Button>
        </Box>
      </Fade>
    </Popover>
  );
}

export default TaskAttachmentLink;
