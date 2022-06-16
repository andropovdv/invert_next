/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { selectFeatureTypesData } from "../../../store/selectors";
import { featureTypes as featureAct } from "../../../store/slices/featuresTypesSlice";
import {
  editFeatureTypes,
  fetchFeaturesTypesApi,
  getCountFeatureTypes,
  insertFeatureTypes,
  removeFeatureTypes,
} from "../../../store/thunks/fetchFeatureTypes";
import { IFeatureTypes } from "../../../store/types/IFeatureTypes";
import { ActionButtonDirectory } from "../Shared/ActionButtonDirectory";
import { InfoBlockDirectory } from "../Shared/InfoBlockDirectory";
import { SnackDirectory } from "../Shared/SnackDirectory";
import { TableDirectory } from "../Shared/TableDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { FeatureTypesModal, typeModal } from "./Components/FeatureTypesModal";

interface Props {}

interface IModal {
  isOpen: boolean;
  title?: string;
  row?: IFeatureTypes[];
  infoRow?: IFeatureTypes;
  mode: string;
}

export const FeatureTypes = (props: Props) => {
  const [page, setPage] = React.useState(0);

  const [infoRow, setInfoRow] = React.useState<IFeatureTypes>();
  const [selectedRow, setSelectedRow] = React.useState<IFeatureTypes[]>([]);

  const [snack, setSnack] = React.useState(false);

  const [visibly, setVisibly] = React.useState<IModal>({
    isOpen: false,
    title: "",
    row: [],
    infoRow: {} as IFeatureTypes,
    mode: typeModal.add,
  });
  // Store ========================
  const dispatch = useAppDispatch();
  const { isLoading, featureTypes, count, error } = useAppSelector(
    selectFeatureTypesData
  );
  // ==============================
  // Snack ========================
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
    dispatch(featureAct.actions.setFeatureTypesError(""));
    setSnack(false);
  };
  // ==============================
  // Table ========================
  React.useEffect(() => {
    dispatch(fetchFeaturesTypesApi());
    dispatch(getCountFeatureTypes());
  }, []);
  React.useEffect(() => {
    dispatch(fetchFeaturesTypesApi(page + 1));
  }, [page]);
  const columnsApi: GridColDef[] = [
    { field: "feature", headerName: "Характеристика", flex: 0.5 },
    { field: "field_type", headerName: "Тип поля", flex: 0.25 },
    { field: "unit", headerName: "Единица измерения", flex: 0.25 },
  ];
  // ===============================

  // InfoBlock======================
  let mapTitle = new Map<string, string>();
  mapTitle.set("feature", "Характристика");
  mapTitle.set("field_type", "Тип поля");
  mapTitle.set("unit", "Ед. изм.");
  // ===============================

  // ActionButton===================
  const isDisabled: boolean = selectedRow.length === 0;
  const isEnabledEditBtn: boolean = selectedRow.length === 1;
  const handleClose = () => {
    setVisibly({ isOpen: false, mode: typeModal.add });
  };
  const handleInsertItem = () => {
    setVisibly({
      isOpen: true,
      title: "Add feature type",
      mode: typeModal.add,
    });
  };
  const handleEditItem = () => {
    setVisibly({
      isOpen: true,
      title: "Edit feature type",
      row: selectedRow,
      infoRow: infoRow,
      mode: typeModal.edit,
    });
  };
  const handleRemoveItem = () => {
    setVisibly({
      isOpen: true,
      title: "Remove feature type",
      row: selectedRow,
      mode: typeModal.delete,
    });
  };
  // ===============================
  // Action Modal Window============
  const handleInsertFeatureTypes = (data: IFeatureTypes) => {
    dispatch(insertFeatureTypes(data, page + 1));
  };
  const handleEditFeatureTypes = (data: IFeatureTypes) => {
    dispatch(editFeatureTypes(data, page + 1));
  };
  const handleRemoveFeatureTypes = (data: IFeatureTypes[]) => {
    dispatch(removeFeatureTypes(data, page + 1));
  };
  // ===============================

  return (
    <>
      <SnackDirectory
        error={error}
        snack={snack}
        handleSnackClose={handleSnackClose}
      />
      <TitleDirectory title="Типы характеристик" />
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
            rows={featureTypes}
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
      <FeatureTypesModal
        {...visibly}
        isLoading={isLoading}
        handleClose={handleClose}
        handleInsertFeatureTypes={handleInsertFeatureTypes}
        handleEditFeatureTypes={handleEditFeatureTypes}
        handleRemoveFeatureTypes={handleRemoveFeatureTypes}
      />
    </>
  );
};
