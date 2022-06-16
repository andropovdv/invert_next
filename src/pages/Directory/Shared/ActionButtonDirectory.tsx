import { Button, Paper, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  isDisabled?: boolean;
  isEnabledEditBtn?: boolean;
  handleInsertItem?: () => void;
  handleEditItem?: () => void;
  handleRemoveItem?: () => void;
}

export const ActionButtonDirectory = ({
  isDisabled,
  isEnabledEditBtn,
  handleInsertItem,
  handleEditItem,
  handleRemoveItem,
}: Props) => {
  return (
    <>
      <Paper elevation={7} sx={{ padding: "8px", mb: "8px" }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            disabled={!isDisabled}
            onClick={handleInsertItem}
          >
            New
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!isEnabledEditBtn}
            onClick={handleEditItem}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isDisabled}
            onClick={handleRemoveItem}
            startIcon={<DeleteIcon />}
          >
            Remove
          </Button>
        </Stack>
      </Paper>
    </>
  );
};
