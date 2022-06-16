import { Masonry } from "@mui/lab";
import { Box, Paper } from "@mui/material";
import React from "react";

interface Props {}

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100];

export const Directory = (props: Props) => {
  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Masonry columns={2} spacing={2}>
          {heights.map((height, index) => (
            <Paper elevation={7} key={index} sx={{ height, width: "150px" }}>
              {index + 1}
            </Paper>
          ))}
        </Masonry>
      </Box>
    </>
  );
};
