import { Masonry } from "@mui/lab";
import { Box, Button, Paper } from "@mui/material";
import { useAppDispatch } from "hooks/store";
import React from "react";
import { insertComponent } from "store/thunks/componentThunk";
import { insertLocationCity } from "store/thunks/locationCityThunk";
import { insertLocations } from "store/thunks/locationsThunk";
import { insertLocationStreet } from "store/thunks/locationStreetThunk";
import { IComponent } from "store/types/IComponent";
import { ILocation, ILocationData } from "store/types/ILocations";

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

const uploadLoaction: ILocation = {
  id: "######",
  city: { id: "######", name: "Нижний Новгород" },
  street: { id: "######", name: "Б. Покровская" },
  house: "33w",
  floor: "123",
  room: "1234",
  alias: "server room",
};

const uploadCity: ILocationData = {
  id: "####",
  name: "Москва",
};

export const Directory = (props: Props) => {
  const dispatch = useAppDispatch();

  const handleUpload = (data: IComponent) => {
    dispatch(insertComponent(data));
  };
  const handleLoadLoacation = (data: ILocation) => {
    dispatch(insertLocations(data));
  };
  const handleLoadCity = (data: ILocationData) => {
    dispatch(insertLocationCity(data));
  };

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Masonry columns={2} spacing={2}>
          {heights.map((height, index) => (
            <Paper elevation={7} key={index} sx={{ height, width: "150px" }}>
              {index + 1}
              <Button onClick={() => handleUpload(upLoadData)} sx={{ mr: 1 }}>
                upload data
              </Button>
              <Button
                onClick={() => handleLoadLoacation(uploadLoaction)}
                sx={{ mr: 1 }}
              >
                upload location
              </Button>
              <Button onClick={() => handleLoadCity(uploadCity)} sx={{ mr: 1 }}>
                upload street
              </Button>
            </Paper>
          ))}
        </Masonry>
      </Box>
    </>
  );
};
