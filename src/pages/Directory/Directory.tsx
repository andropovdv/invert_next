import { Masonry } from "@mui/lab";
import { Box, Button, Paper } from "@mui/material";
import { useAppDispatch } from "hooks/store";
import React from "react";
import { insertComponent } from "store/thunks/componentThunk";
import { IComponent } from "store/types/IComponent";

interface Props {}

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100];

const upLoadData: IComponent = {
  id: "#######",
  typeComponent: { id: "#######", name: "typeComponent" },
  vendor: { id: "#######", name: "Asus" },
  model: "GA-400BX",
  featureSet: {
    id: "#######",
    feature: [
      { id: "idTypeFeature #######", value: "Socket 7" },
      { id: "idTypeFeature #######", value: "DDR 3" },
    ],
  },
};

export const Directory = (props: Props) => {
  const dispatch = useAppDispatch();

  const handleUpload = (data: IComponent) => {
    dispatch(insertComponent(data));
  };

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Masonry columns={2} spacing={2}>
          {heights.map((height, index) => (
            <Paper elevation={7} key={index} sx={{ height, width: "150px" }}>
              {index + 1}
              <Button onClick={() => handleUpload(upLoadData)}>
                upload data
              </Button>
            </Paper>
          ))}
        </Masonry>
      </Box>
    </>
  );
};
