import { IconButton, Popover, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { IFeatureSets } from "store/types/IFeatureSets";
import {
  handleAddValueFeature,
  IValuesChip,
} from "store/thunks/featureSetsThunk";
import { useAppDispatch } from "hooks/store";

interface Props {
  anchorEl: null | HTMLElement;
  setAnchorEl: (d: any) => void;
  row: IFeatureSets;
  idNameFeature: string;
}

export const FeatureSetsMenuField = (props: Props) => {
  const { anchorEl, setAnchorEl, row, idNameFeature } = props;

  const [value, setValue] = React.useState<string>("");

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddChip = () => {
    const data: IValuesChip = {
      item: value,
      row: row,
      idNameFeature,
    };
    dispatch(handleAddValueFeature(data));
    setValue("");
    setAnchorEl(null);
  };

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: "8px" }}>
          <TextField
            size="small"
            label="Значение"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <IconButton color="primary" onClick={() => handleAddChip()}>
            <SaveIcon />
          </IconButton>
        </Box>
      </Popover>
    </>
  );
};
