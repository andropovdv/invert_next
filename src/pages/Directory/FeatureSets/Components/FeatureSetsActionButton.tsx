import { Button, Paper, Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
        </Stack>
      </Paper>
    </>
  );
};
