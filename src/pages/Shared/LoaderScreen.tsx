import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {};

const LoaderScreen = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        // opacity: 0.2,
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
};

export default LoaderScreen;
