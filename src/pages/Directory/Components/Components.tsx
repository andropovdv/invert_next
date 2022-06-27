/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectComponetsData } from "store/selectors";
import { setComponentError } from "store/slices/componentsSlice";
import {
  editComponent,
  getComponent,
  insertComponent,
  removeComponent,
} from "store/thunks/componentThunk";
import { IComponent } from "store/types/IComponent";
import { ActionButtonDirectory } from "../Shared/ActionButtonDirectory";
import { SnackDirectory } from "../Shared/SnackDirectory";
import { TableDirectory } from "../Shared/TableDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { ComponentInfoBlock } from "./Components/ComponentInfoBlock";
import { ComponentModal, typeModal } from "./Components/ComponentModal";

type Props = {};

interface IModal {
  isOpen: boolean;
  title?: string;
  row?: IComponent[];
  infoRow?: IComponent;
  mode: typeModal;
}

export const Components = (props: Props) => {
  const dispatch = useAppDispatch();

  const { error, components, count, isLoading } =
    useAppSelector(selectComponetsData);

  const [page, setPage] = React.useState(0);

  const [selectedRow, setSelectedRow] = React.useState<IComponent[]>([]);
  const [infoRow, setInfoRow] = React.useState<IComponent>();

  const [snack, setSnack] = React.useState(false);

  const [modal, setModal] = React.useState<IModal>({
    isOpen: false,
    title: "",
    row: [],
    infoRow: {} as IComponent,
    mode: "add",
  });

  // Snack =====
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
    dispatch(setComponentError(""));
    setSnack(false);
  };
  // ===========
  // Action button ====
  const isDisabled: boolean = selectedRow.length === 0;
  const isEnabledEditBtn: boolean = selectedRow.length === 1;

  const handleInsertItem = () => {
    setModal({
      isOpen: true,
      title: "Add component",
      mode: "add",
    });
  };
  const handleEditItem = () => {
    setModal({
      isOpen: true,
      title: "Edit component",
      mode: "edit",
      row: selectedRow,
      infoRow: infoRow,
    });
  };
  const handleRemoveItem = () => {
    setModal({
      isOpen: true,
      title: "Remove component",
      mode: "delete",
      row: selectedRow,
    });
  };
  // ==================
  // Table ============
  React.useEffect(() => {
    dispatch(getComponent());
  }, []);
  const columnsApi: GridColDef[] = [
    {
      field: "typeComponent",
      headerName: "Тип",
      flex: 0.25,
      valueGetter: (params) => {
        if (params.row.typeComponent) {
          return params.row.typeComponent.name;
        } else {
          return undefined;
        }
      },
    },
    {
      field: "vendor",
      headerName: "Поизводитель",
      flex: 0.25,
      valueGetter: (params) => {
        if (params.row.vendor) {
          return params.row.vendor.name;
        } else {
          return undefined;
        }
      },
    },
    { field: "model", headerName: "Модель", flex: 0.5 },
  ];
  // ==================
  //  Modal ============
  const handleClose = () => {
    setModal({ isOpen: false, mode: "add" });
  };
  const handleInsertComponent = (data: IComponent) => {
    const uni = components.find((el) => el.model === data.model);
    if (uni) {
      dispatch(setComponentError("Не уникально"));
    } else {
      dispatch(insertComponent(data));
    }
  };
  const handleEditComponent = (data: IComponent) => {
    dispatch(editComponent(data));
    console.log("data from edit: ", data);
  };

  const handleRemoveComponent = (row: IComponent[]) => {
    dispatch(removeComponent(row));
  };
  // ===================
  return (
    <>
      <SnackDirectory
        error={error}
        snack={snack}
        handleSnackClose={handleSnackClose}
      />
      <TitleDirectory title="Компоненты" />
      <ActionButtonDirectory
        isDisabled={isDisabled}
        isEnabledEditBtn={isEnabledEditBtn}
        handleEditItem={handleEditItem}
        handleInsertItem={handleInsertItem}
        handleRemoveItem={handleRemoveItem}
      />
      <Grid container spacing={1}>
        <Grid item md={8}>
          <TableDirectory
            sortField="vendor"
            rows={components}
            columns={columnsApi}
            page={page}
            isLoading={isLoading}
            setSelectedRows={setSelectedRow}
            setInfoRow={setInfoRow}
            setPage={setPage}
            rowCount={count}
          />
        </Grid>
        <Grid item md={4}>
          <ComponentInfoBlock row={infoRow} />
        </Grid>
      </Grid>
      <ComponentModal
        {...modal}
        isLoading={isLoading}
        handleClose={handleClose}
        handleInsertComponent={handleInsertComponent}
        handleEditComponent={handleEditComponent}
        handleDeleteComponent={handleRemoveComponent}
      />
    </>
  );
};
