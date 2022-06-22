/* eslint-disable react-hooks/exhaustive-deps */

import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectFeatureSetsData } from "store/selectors";
import {
  setFeatureSetCurrent,
  setFeatureSetsError,
} from "store/slices/featureSetsSlice";
import {
  editFeatureSets,
  fetchFeatureSets,
  insertFeatureSets,
} from "store/thunks/featureSetsThunk";
import { IFeatureSets } from "store/types/IFeatureSets";
import { SnackDirectory } from "../Shared/SnackDirectory";
import { TitleDirectory } from "../Shared/TitleDirectory";
import { FeatureSetsActionButton } from "./Components/FeatureSetsActionButton";
import { FeatureSetsModal, typeModal } from "./Components/FeatureSetsModal";
import { FeatureSetsTable } from "./Components/Table/FeatureSetsTable";

interface Props {}

interface IModal {
  isOpen: boolean;
  title: string;
  mode: string;
}

export const FeatureSets = (props: Props) => {
  const [page, setPage] = React.useState(0);
  const [snack, setSnack] = React.useState(false);

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
    dispatch(setFeatureSetsError(""));
    setSnack(false);
  };
  // ===========
  // Table ====
  React.useEffect(() => {
    dispatch(fetchFeatureSets());
  }, []);
  // ==========
  // Modal window ====
  const handleInsertItem = () => {
    setModal({
      isOpen: true,
      title: "Create set features",
      mode: typeModal.add,
    });
  };
  const handleEditItem = () => {
    setModal({
      isOpen: true,
      title: `Edit set features`,
      mode: typeModal.edit,
    });
  };
  const handleClose = () => {
    setModal({
      isOpen: false,
      title: "",
      mode: typeModal.add,
    });
    dispatch(setFeatureSetCurrent({} as IFeatureSets));
  };
  // =================
  // Action modal window ===
  const handleInsertFeatureSet = (data: IFeatureSets) => {
    const uni = featureSets.find((el) => el.component.id === data.component.id);
    if (uni) {
      dispatch(setFeatureSetsError("Не уникально"));
    } else {
      dispatch(insertFeatureSets(data));
    }
  };
  const handleEditFeatureSet = (data: IFeatureSets) => {
    dispatch(editFeatureSets(data));
  };
  // =======================

  return (
    <>
      <SnackDirectory
        error={error}
        snack={snack}
        handleSnackClose={handleSnackClose}
      />
      <TitleDirectory title="Наборы характеристик" />
      <FeatureSetsActionButton handleInsertItem={handleInsertItem} />
      <Grid container spacing={1}>
        <Grid item md={12}>
          <FeatureSetsTable
            rows={featureSets}
            page={page}
            setPage={setPage}
            rowCount={count}
            isLoading={isLoading}
            handleEditItem={handleEditItem}
          />
        </Grid>
      </Grid>
      <FeatureSetsModal
        {...modal}
        handleClose={handleClose}
        handleInsertFeatureSets={handleInsertFeatureSet}
        handleEditFeatureSets={handleEditFeatureSet}
      />
    </>
  );
};
