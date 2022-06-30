/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ILocation } from "store/types/ILocations";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box } from "@mui/system";
import { LocationForm } from "./LocationForm";
import { LocationCityTable } from "./City/LocationCityTable";
import { LocationStreetTable } from "./Street/LocationStreetTable";

export type typeModal = "add" | "edit" | "delete";

type Props = {
  isOpen: boolean;
  mode: typeModal;
  title?: string;
  isLoading: boolean;
  row?: ILocation[];
  infoRow?: ILocation;
  handleClose: () => void;
  handleInsertLocation: (data: ILocation) => void;
  handleEditLocation: (data: ILocation) => void;
  handleRemoveLocation: (data: ILocation[]) => void;
};

export const LocationModal = (props: Props) => {
  const {
    isOpen,
    mode,
    title,
    isLoading,
    row,
    infoRow,
    handleClose,
    handleInsertLocation,
    handleEditLocation,
    handleRemoveLocation,
  } = props;

  const { reset } = useForm();

  let currentRow: ILocation = {} as ILocation;
  if (row) {
    currentRow = Object.assign({}, ...row.map((el) => ({ ...el })));
  }

  const clickClose = (e?: Object, r?: string) => {
    if (r !== "backdropClick") {
      reset({
        city: {},
        street: {},
        alias: "",
        floor: "",
        house: "",
        room: "",
      });
      currentRow = {} as ILocation;
      handleClose();
    }
  };

  const [tab, setTab] = React.useState("1");
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      {mode === "delete" ? null : (
        <Dialog
          open={isOpen}
          onClose={clickClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: { minHeight: 625 }, // TODO подобрать высоту
          }}
        >
          <DialogTitle>{title}</DialogTitle>

          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChangeTab} sx={{ marginLeft: "8px" }}>
                <Tab label="Расположение" value="1" />
                <Tab label="Города" value="2" />
                <Tab label="Улицы" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: 0 }}>
              <LocationForm
                setTab={setTab}
                isLoading={isLoading}
                row={row}
                handleClose={handleClose}
                handleInsertLocation={handleInsertLocation}
                handleEditLocation={handleEditLocation}
                handleRemoveLocation={handleRemoveLocation}
              />
            </TabPanel>
            <TabPanel value="2">
              {/* sx={{ display: "flex", flexGrow: 1 }} */}
              <LocationCityTable handleClose={handleClose} />
            </TabPanel>
            <TabPanel value="3">
              <LocationStreetTable handleClose={handleClose} />
            </TabPanel>
          </TabContext>
        </Dialog>
      )}
    </>
  );
};
