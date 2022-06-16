import { Paper, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

export const TitleDirectory = ({ title }: Props) => {
  return (
    <>
      <Paper elevation={7}>
        <Typography
          variant="h4"
          color="gray"
          sx={{ mb: "8px", padding: "8px" }}
        >
          {title}:
        </Typography>
      </Paper>
    </>
  );
};
