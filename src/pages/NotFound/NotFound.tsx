import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export const NotFound = (props: Props) => {
  const nav = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">в разработке</Typography>
        <Button variant="contained" color="primary" onClick={() => nav(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
