import { IconButton, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch } from "hooks/store";
import React from "react";
import { IFeatureSets } from "store/types/IFeatureSets";

import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { removeFeatureSets } from "store/thunks/featureSetsThunk";

type Props = {
  anchor: null | HTMLElement;
  setAnchor: (d: any) => void;
  row: IFeatureSets;
};

export const FeatureSetDelete = (props: Props) => {
  const { anchor, setAnchor, row } = props;

  console.log("props: ", props);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setAnchor(null);
  };

  const handleDelete = (row: IFeatureSets) => {
    dispatch(removeFeatureSets(row.id));
  };

  return (
    <>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handleCancel}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          sx={{
            padding: 1,
            display: "flex",
            width: "100%",
            alignItems: "center",
            backgroundColor: "#ff9e80",
            // backgroundColor: "#42a5f5",
          }}
        >
          <Typography
            sx={{ marginRight: 2, marginLeft: 2 }}
          >{`Вы хотите удалить "${row.component.name}" ?`}</Typography>
          <IconButton color="primary" onClick={() => handleDelete(row)}>
            <DoneIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleCancel()}>
            <CancelIcon />
          </IconButton>
        </Box>
      </Popover>
    </>
  );
};
