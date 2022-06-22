import { Box, Chip, IconButton, TableCell, TableRow } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useAppDispatch } from "hooks/store";
import React from "react";
import { setFeatureSetCurrent } from "store/slices/featureSetsSlice";
import { handleEditValueFeatureSet } from "store/thunks/featureSetsThunk";
import { IFeature, IFeatureSets } from "store/types/IFeatureSets";
import { FeatureSetsMenuField } from "../FeatureSetMenuField";

type Props = {
  element: IFeature;
  rows: IFeatureSets;
};

export const FeatureSetsCollapseRow = ({ element, rows }: Props) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const clickRow = (row: IFeatureSets) => {
    console.log("rows: ", row);
    dispatch(setFeatureSetCurrent(row));
  };

  const handleDeleteChip = (
    item: string,
    idNameFeature: string,
    row: IFeatureSets
  ) => {
    dispatch<any>(handleEditValueFeatureSet(item, row, idNameFeature));
  };

  return (
    <TableRow
      hover
      key={element.name_feature.id}
      // selected={isItemSelected}
      onClick={() => clickRow(rows)}
    >
      <TableCell padding="checkbox" />
      <TableCell component="th" scope="row" sx={{ cursor: "default" }}>
        {element.name_feature.name}
      </TableCell>
      <TableCell component="th" scope="row">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: "1 1 auto" }}>
            {element.value_feature
              ? element.value_feature.map((e) => (
                  <Chip
                    key={e}
                    label={e}
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                    onDelete={() =>
                      handleDeleteChip(e, element.name_feature.id, rows)
                    }
                  />
                ))
              : null}
          </div>
          {element.type === "DROPDOWN" ? (
            <IconButton
              color="primary"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ flex: "0 1 auto" }}
            >
              <AddCardIcon />
            </IconButton>
          ) : null}

          <FeatureSetsMenuField
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            row={rows}
            idNameFeature={element.name_feature.id}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};
