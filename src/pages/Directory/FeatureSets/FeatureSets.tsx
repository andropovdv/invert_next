/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { selectFeatureSetsData } from "../../../store/selectors";
import {
  fetchFeatureSets,
  getCountFeatureSets,
  insertFeatureSets,
} from "../../../store/thunks/fetchFeatureSets";
import { IFeatureSets } from "../../../store/types/IFeatureSets";
import { ActionButtonDirectory } from "../Shared/ActionButtonDirectory";
import { TableDirectory } from "../Shared/TableDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { FeatureSetsActionButton } from "./Components/FeatureSetsActionButton";
import { FeatureSetsModal, typeModal } from "./Components/FeatureSetsModal";
import { FeatureSetsTable } from "./Components/FeatureSetsTable";

interface Props {}

interface IModal {
  isOpen: boolean;
  title: string;
  mode: string;
}

export const FeatureSets = (props: Props) => {
  const [page, setPage] = React.useState(0);

  const [selectedRow, setSelectedRow] = React.useState<IFeatureSets[]>([]);
  const [infoRow, setInfoRow] = React.useState<IFeatureSets>();

  const [modal, setModal] = React.useState<IModal>({
    isOpen: false,
    title: "",
    mode: typeModal.add,
  });

  // Store ====
  const dispatch = useAppDispatch();
  const { isLoading, featureSets, count, error } = useAppSelector(
    selectFeatureSetsData
  );
  // ==========
  // Table ====
  React.useEffect(() => {
    dispatch(fetchFeatureSets());
    dispatch(getCountFeatureSets());
  }, []);
  React.useEffect(() => {
    dispatch(fetchFeatureSets(page + 1));
  }, [page]);
  // ==========
  // Modal window ====
  const handleInsertItem = () => {
    setModal({
      isOpen: true,
      title: "Create set features",
      mode: typeModal.add,
    });
  };
  const handleClose = () => {
    setModal({
      isOpen: false,
      title: "",
      mode: typeModal.add,
    });
  };
  // =================
  // Action modal window ===
  const handleInsertFeatureSet = (data: IFeatureSets) => {
    dispatch(insertFeatureSets(data, page + 1));
  };
  // =======================
  return (
    <>
      <TitleDirectory title="Наборы характеристик" />
      <FeatureSetsActionButton handleInsertItem={handleInsertItem} />
      <Grid container spacing={1}>
        <Grid item md={12}>
          <FeatureSetsTable
            rows={featureSets}
            page={page}
            setPage={setPage}
            rowCount={count}
          />
        </Grid>
        {/* <Grid item md={4}>
          info
        </Grid> */}
      </Grid>
      <FeatureSetsModal
        {...modal}
        handleClose={handleClose}
        handleInsertFeatureSets={handleInsertFeatureSet}
      />
    </>
  );
};
