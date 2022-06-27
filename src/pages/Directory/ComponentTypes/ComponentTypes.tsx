/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

import { ComponentTypesModal } from "./Components/ComponentTypesModal";
import { typeModal } from "../Vendors/Components/OperationModal";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { SnackDirectory } from "../Shared/SnackDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { ActionButtonDirectory } from "../Shared/ActionButtonDirectory";
import { TableDirectory } from "../Shared/TableDirectory";
import { InfoBlockDirectory } from "../Shared/InfoBlockDirectory";
import {
  editComponentTypes,
  fetchComponentTypes,
  insertComponentTypes,
  removeComponentTypes,
} from "store/thunks/componenTypesThunk";
import { setComponentTypesError } from "store/slices/componentTypesSlice";
import { IComponentType } from "store/types/IComponentTypes";
import { selectComponentTypesData } from "store/selectors";

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
  }, []);

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
    dispatch(setComponentTypesError(""));
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
    const uni = componentTypes.find((el) => el.name === data.name);
    if (uni) {
      dispatch(setComponentTypesError("Не уникально"));
    } else {
      dispatch(insertComponentTypes(data));
    }
  };
  const handleEditComponentTypes = (data: IComponentType) => {
    dispatch(editComponentTypes(data));
  };
  const handleRemoveComponentTypes = (data: IComponentType[]) => {
    dispatch(removeComponentTypes(data));
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
            sortField="name"
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
