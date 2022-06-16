/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { selectComponentTypesData } from "../../../store/selectors";
import { componentTypesSlice } from "../../../store/slices/componentTypesSlice";
import {
  fetchComponentTypes,
  getCountComponentTypes,
  insertComponentTypes,
  editComponentTypes,
  removeComponentTypes,
} from "../../../store/thunks/fetchComponenTypes";
import { IComponentType } from "../../../store/types/IComponentTypes";
import { ActionButtonDirectory } from "../Shared/ActionButtonDirectory";
import { InfoBlockDirectory } from "../Shared/InfoBlockDirectory";
import { SnackDirectory } from "../Shared/SnackDirectory";
import { TableDirectory } from "../Shared/TableDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { ComponentTypesModal } from "./Components/ComponentTypesModal";
import { typeModal } from "../Vendors/Components/OperationModal";

interface Props {}

interface IModal {
  isOpen: boolean;
  title?: string;
  row?: IComponentType[];
  infoRow?: IComponentType;
  mode: string;
}

export const ComponentTypes = (props: Props) => {
  const [page, setPage] = React.useState(0);

  const [selectedRow, setSelectedRow] = React.useState<IComponentType[]>([]);
  const [infoRow, setInfoRow] = React.useState<IComponentType>();

  const [snack, setSnack] = React.useState(false);

  const [visibly, setVisibly] = React.useState<IModal>({
    isOpen: false,
    title: "",
    row: [],
    infoRow: {} as IComponentType,
    mode: typeModal.add,
  });
  // Store ==========
  const dispatch = useAppDispatch();
  const { isLoading, componentTypes, count, error } = useAppSelector(
    selectComponentTypesData
  );
  // ================
  // Table ==========
  React.useEffect(() => {
    dispatch(fetchComponentTypes());
    dispatch(getCountComponentTypes());
  }, []);
  React.useEffect(() => {
    dispatch(fetchComponentTypes(page + 1));
  }, [page]);
  const columnsApi: GridColDef[] = [
    { field: "name", headerName: "Тип характеристики", flex: 1 },
  ];
  // ================
  // InfoBlock ======
  let mapTitle = new Map<string, string>();
  mapTitle.set("name", "Наименование");
  // ================
  // Snack ==========
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
    dispatch(componentTypesSlice.actions.setComponentTypesError(""));
    setSnack(false);
  };
  // ================
  // ActionButton ===
  const isDisabled: boolean = selectedRow.length === 0;
  const isEnabledEditBtn: boolean = selectedRow.length === 1;

  const handleInsertItem = () => {
    setVisibly({
      isOpen: true,
      title: "Add component type",
      mode: typeModal.add,
    });
  };
  const handleEditItem = () => {
    setVisibly({
      isOpen: true,
      title: "Edit component type",
      mode: typeModal.edit,
      row: selectedRow,
      infoRow: infoRow,
    });
  };
  const handleRemoveItem = () => {
    setVisibly({
      isOpen: true,
      title: "Remove component type",
      mode: typeModal.delete,
      row: selectedRow,
    });
  };
  // ================
  // Action Modal Window=
  const handleClose = () => [
    setVisibly({ isOpen: false, mode: typeModal.add }),
  ];
  const handleInsertComponentTypes = (data: IComponentType) => {
    dispatch(insertComponentTypes(data, page + 1));
  };
  const handleEditComponentTypes = (data: IComponentType) => {
    dispatch(editComponentTypes(data, page + 1));
  };
  const handleRemoveComponentTypes = (data: IComponentType[]) => {
    dispatch(removeComponentTypes(data, page + 1));
  };
  // ====================
  return (
    <>
      <SnackDirectory
        error={error}
        snack={snack}
        handleSnackClose={handleSnackClose}
      />
      <TitleDirectory title="Типы комплектующих" />
      <ActionButtonDirectory
        isDisabled={isDisabled}
        isEnabledEditBtn={isEnabledEditBtn}
        handleInsertItem={handleInsertItem}
        handleEditItem={handleEditItem}
        handleRemoveItem={handleRemoveItem}
      />
      <Grid container spacing={1}>
        <Grid item md={8}>
          <TableDirectory
            rows={componentTypes}
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
          <InfoBlockDirectory row={infoRow} mapTitle={mapTitle} />
        </Grid>
      </Grid>
      <ComponentTypesModal
        {...visibly}
        isLoading={isLoading}
        handleClose={handleClose}
        handleInsertComponentTypes={handleInsertComponentTypes}
        handleEditComponentTypes={handleEditComponentTypes}
        handleRemoveComponentTypes={handleRemoveComponentTypes}
      />
    </>
  );
};
