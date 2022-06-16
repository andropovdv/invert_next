import { Button, Paper, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

interface Props {
  handleInsertItem?: () => void;
}

export const FeatureSetsActionButton = (props: Props) => {
  const { handleInsertItem } = props;
  return (
    <>
      <Paper elevation={7} sx={{ padding: "8px", mb: "8px" }}>
        <Stack direction="row" spacing={1}>
          <Button
            onClick={handleInsertItem}
            variant="contained"
            startIcon={<AddBoxIcon />}
          >
            Create
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />}>
            Remove
          </Button>
        </Stack>
      </Paper>
    </>
  );
};
