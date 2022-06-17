/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { TableDirectory } from "../Shared/TableDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { InfoBlockDirectory } from "../Shared/InfoBlockDirectory";

// import { useDemoData } from "@mui/x-data-grid-generator";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { selectVendorData } from "../../../store/selectors";
import {
  editVendorApi,
  fetchVendors,
  insertVendorApi,
  removeVendorApi,
} from "../../../store/thunks/vendorsThunk";
import { IVendor } from "../../../store/types/IVendor";
import { GridColDef } from "@mui/x-data-grid";
import { ActionButtonDirectory } from "../Shared/ActionButtonDirectory";
import { typeModal, OperationModal } from "./Components/OperationModal";

import { vendorsSlice as venAction } from "../../../store/slices/vendorsSlice";
import { SnackDirectory } from "../Shared/SnackDirectory";

interface Props {}

interface IModal {
  isOpen: boolean;
  title?: string;
  row?: IVendor[];
  infoRow?: IVendor;
  mode: string;
}

let mapTitle = new Map<string, string>();
mapTitle.set("name", "Наименование");
mapTitle.set("full_name", "Полное наименование");
mapTitle.set("url", "Web");

export const Vendors = (props: Props) => {
  const [selectedRow, setSelectedRow] = useState<IVendor[]>([]); // массив выбранных строк
  const [infoRow, setInfoRow] = useState<IVendor>(); // объект с выделенной стокой
  const [page, setPage] = useState(0);
  const [snack, setSnack] = useState(false);
  const [visibly, setVisibly] = useState<IModal>({
    isOpen: false,
    title: "",
    row: [],
    infoRow: {} as IVendor,
    mode: typeModal.add,
  });

  const dispatch = useAppDispatch();
  const { isLoading, vendors, count, error } = useAppSelector(selectVendorData);

  React.useEffect(() => {
    dispatch(fetchVendors());
  }, []);

  React.useEffect(() => {
    if (error.length !== 0) {
      setSnack(true);
    }
  }, [error]);

  const columnsApi: GridColDef[] = [
    { field: "name", headerName: "Наименование", flex: 1, minWidth: 150 },
  ];

  const isDisabled: boolean = selectedRow.length === 0;
  const isEnabledEditBtn: boolean = selectedRow.length === 1;

  const handleClose = () => {
    setVisibly({ isOpen: false, mode: typeModal.add });
  };

  const handleInsertItem = () => {
    setVisibly({
      isOpen: true,
      title: "Add vendor",
      mode: typeModal.add,
    });
  };
  const handleEditItem = () => {
    setVisibly({
      isOpen: true,
      title: "Edit vendor",
      row: selectedRow,
      infoRow: infoRow,
      mode: typeModal.edit,
    });
  };
  const handleRemoveItem = () => {
    setVisibly({
      isOpen: true,
      title: "Remove vendor",
      row: selectedRow,
      mode: typeModal.delete,
    });
  };

  const handleInsertVendor = (data: IVendor) => {
    dispatch(insertVendorApi(data));
  };

  const handleEditVendor = (data: IVendor) => {
    dispatch(editVendorApi(data));
  };

  const handleRemoveVendor = (data: IVendor[]) => {
    dispatch(removeVendorApi(data));
  };

  const handleSnackClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(venAction.actions.setVendorError(""));
    setSnack(false);
  };

  return (
    <>
      <SnackDirectory
        error={error}
        snack={snack}
        handleSnackClose={handleSnackClose}
      />
      <TitleDirectory title="Производители" />
      <ActionButtonDirectory
        isEnabledEditBtn={isEnabledEditBtn}
        isDisabled={isDisabled}
        handleInsertItem={handleInsertItem}
        handleEditItem={handleEditItem}
        handleRemoveItem={handleRemoveItem}
      />
      <Grid container spacing={1}>
        <Grid item md={8}>
          <TableDirectory
            rows={vendors}
            rowCount={count}
            columns={columnsApi}
            setSelectedRows={setSelectedRow}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            setInfoRow={setInfoRow}
          />
        </Grid>
        <Grid item md={4}>
          <InfoBlockDirectory
            title="Подробно"
            row={infoRow}
            mapTitle={mapTitle}
          />
        </Grid>
      </Grid>
      <OperationModal
        {...visibly}
        isLoading={isLoading}
        handleClose={handleClose}
        handleInsertVendor={handleInsertVendor}
        handleEditVendor={handleEditVendor}
        handleRemoveVendor={handleRemoveVendor}
      />
    </>
  );
};
