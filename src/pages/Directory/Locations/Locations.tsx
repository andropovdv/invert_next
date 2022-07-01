/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectLocationsData } from "store/selectors";
import { setLocationError } from "store/slices/locationSlice";
import {
  editLocations,
  fetchLocations,
  insertLocations,
  removeLocations,
} from "store/thunks/locationsThunk";
import { ILocation } from "store/types/ILocations";
import { typeModal } from "../Components/Components/ComponentModal";
import { ActionButtonDirectory } from "../Shared/ActionButtonDirectory";
import { InfoBlockDirectory } from "../Shared/InfoBlockDirectory";
import { SnackDirectory } from "../Shared/SnackDirectory";
import { TableDirectory } from "../Shared/TableDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { LocationModal } from "./Componets/LocationModal";

interface Props {}

interface IModal {
  isOpen: boolean;
  title?: string;
  row?: ILocation[];
  infoRow?: ILocation;
  mode: typeModal;
}

export const Locations = (props: Props) => {
  const [page, setPage] = React.useState(0);

  const [selectedRow, setSelectedRow] = React.useState<ILocation[]>([]);
  const [infoRow, setInfoRow] = React.useState<ILocation>();

  const [snack, setSnack] = React.useState(false);

  const [visibly, setVisibly] = React.useState<IModal>({
    isOpen: false,
    title: "",
    row: [],
    infoRow: {} as ILocation,
    mode: "add",
  });

  // store
  const dispatch = useAppDispatch();
  const { isLoading, locations, count, error } =
    useAppSelector(selectLocationsData);
  // =====

  // table ====
  React.useEffect(() => {
    dispatch(fetchLocations());
  }, []);

  const columnsApi: GridColDef[] = [
    { field: "alias", headerName: "Описание", flex: 1 },
  ];
  // ==========

  // snack
  React.useEffect(() => {
    if (error.length !== 0) {
      setSnack(true);
    }
  }, [error]);

  const handleSnackClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setLocationError(""));
    setSnack(false);
  };
  //

  // info block
  let rowToInfoBlock;
  if (infoRow) {
    rowToInfoBlock = {
      alias: infoRow.alias,
      city: infoRow.city.name,
      street: infoRow.street.name,
      house: infoRow.house,
      floor: infoRow.floor,
      room: infoRow.room,
    };
  }

  let mapTitle = new Map<string, string>();
  mapTitle.set("alias", "Описание");
  mapTitle.set("city", "Город");
  mapTitle.set("street", "Улица");
  mapTitle.set("floor", "Этаж");
  mapTitle.set("house", "Дом");
  mapTitle.set("room", "Офис");
  mapTitle.set("street", "Улица");
  // ==========

  // action button
  const isDisabled: boolean = selectedRow.length === 0;
  const isEnabledEditBtn: boolean = selectedRow.length === 1;

  const handleInsertModal = () => {
    setVisibly({
      isOpen: true,
      title: "Add location",
      mode: "add",
    });
  };
  const handleEditModal = () => {
    setVisibly({
      isOpen: true,
      title: "Edit location",
      mode: "edit",
      row: selectedRow,
      infoRow: infoRow,
    });
  };
  const handleRemovetModal = () => {
    setVisibly({
      isOpen: true,
      title: "Remove location",
      mode: "delete",
      row: selectedRow,
    });
  };
  // ============
  //  action modal
  const handleClose = () => {
    setVisibly({
      isOpen: false,
      mode: "add",
    });
  };
  const handleInsertLocation = (data: ILocation) => {
    const uni = locations.find((el) => el.alias === data.alias);
    if (uni) {
      dispatch(setLocationError("Не уникально"));
    } else {
      dispatch(insertLocations(data));
    }
  };
  const handleEditLocation = (data: ILocation) => {
    dispatch(editLocations(data));
  };
  const handleRemoveLocation = (data: ILocation[]) => {
    dispatch(removeLocations(data));
  };
  // ============

  return (
    <>
      <SnackDirectory
        error={error}
        snack={snack}
        handleSnackClose={handleSnackClose}
      />
      <TitleDirectory title="Размещение" />
      <ActionButtonDirectory
        isDisabled={isDisabled}
        isEnabledEditBtn={isEnabledEditBtn}
        handleInsertItem={handleInsertModal}
        handleEditItem={handleEditModal}
        handleRemoveItem={handleRemovetModal}
      />
      <Grid container spacing={1}>
        <Grid item md={8}>
          <TableDirectory
            sortField="alias"
            rows={locations}
            columns={columnsApi}
            page={page}
            isLoading={isLoading}
            rowCount={count}
            setSelectedRows={setSelectedRow}
            setInfoRow={setInfoRow}
            setPage={setPage}
          />
        </Grid>
        <Grid item md={4}>
          <InfoBlockDirectory row={rowToInfoBlock} mapTitle={mapTitle} />
        </Grid>
      </Grid>
      <LocationModal
        {...visibly}
        isLoading={isLoading}
        handleClose={handleClose}
        handleInsertLocation={handleInsertLocation}
        handleEditLocation={handleEditLocation}
        handleRemoveLocation={handleRemoveLocation}
      />
    </>
  );
};
