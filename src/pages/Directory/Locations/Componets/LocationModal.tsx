/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ILocation } from "store/types/ILocations";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Tab,
} from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
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
    row = [],
    handleClose,
    handleInsertLocation,
    handleEditLocation,
    handleRemoveLocation,
  } = props;

  const { reset } = useForm();

  const [tab, setTab] = React.useState("1");
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const onDelete = (row: ILocation[]) => {
    if (row) {
      handleRemoveLocation(row);
    }
    reset({
      city: {},
      street: {},
      alias: "",
      floor: "",
      house: "",
      room: "",
    });
    handleClose();
  };

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
      setTab("1");
      handleClose();
    }
  };

  return (
    <>
      {mode === "delete" ? (
        <Dialog
          open={isOpen}
          onClose={(e, r) => clickClose(e, r)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText variant="body1" component="span">
              Вы действительно хотите удалить
            </DialogContentText>
            <List dense>
              {row
                ? row.map((el: ILocation) => (
                    <ListItem key={el.id}>
                      <ListItemText
                        primary={`${el.alias}`}
                        primaryTypographyProps={{ fontWeight: 700 }}
                      />
                    </ListItem>
                  ))
                : null}
            </List>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              color="error"
              loading={isLoading}
              onClick={() => onDelete(row)}
            >
              Удалить
            </LoadingButton>
            <Button onClick={clickClose}>Отмена</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={isOpen}
          onClose={clickClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: { minHeight: 625 },
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
                isOpen={isOpen}
                mode={mode}
                setTab={setTab}
                isLoading={isLoading}
                row={row}
                handleClose={clickClose}
                handleInsertLocation={handleInsertLocation}
                handleEditLocation={handleEditLocation}
              />
            </TabPanel>
            <TabPanel value="2">
              <LocationCityTable handleClose={clickClose} />
            </TabPanel>
            <TabPanel value="3">
              <LocationStreetTable handleClose={clickClose} />
            </TabPanel>
          </TabContext>
        </Dialog>
      )}
    </>
  );
};
