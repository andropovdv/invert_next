import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import React from "react";

interface Props {
  error: string;
  snack: boolean;
  handleSnackClose: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}
type TransitionProps = Omit<SlideProps, "direction">;

const TransitionDown = (prop: TransitionProps) => {
  return <Slide {...prop} direction="down" />;
};

export const SnackDirectory = (props: Props) => {
  const { error, snack, handleSnackClose } = props;
  return (
    <>
      <Snackbar
        open={snack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        TransitionComponent={TransitionDown}
        // message={error}
        // action={action}
      >
        <Alert
          onClose={handleSnackClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
