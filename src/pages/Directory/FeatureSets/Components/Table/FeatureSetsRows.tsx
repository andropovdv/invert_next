import {
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { SyntheticEvent } from "react";
import { Box } from "@mui/system";
import { useAppDispatch } from "hooks/store";
import { setFeatureSetCurrent } from "store/slices/featureSetsSlice";

import { IFeature, IFeatureSets } from "store/types/IFeatureSets";
import { FeatureSetsCollapseRow } from "./FeatureSetsCollapseRow";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FeatureSetDelete } from "../FeatureSetDelete";

interface Props {
  rows: IFeatureSets;
  handleEditItem: () => void;
}

export const FeatureSetsRows = (props: Props) => {
  const { rows, handleEditItem } = props;

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const clickEditButton = (row: IFeatureSets) => {
    dispatch(setFeatureSetCurrent(row));
    handleEditItem();
  };

  const clickDeleteButton = (e: MouseEvent, rows: IFeatureSets) => {
    // setAnchor(e.currentTarget)
    console.log("Row rom delete: ", rows);
  };

  const clickRow = (row: IFeatureSets) => {
    dispatch(setFeatureSetCurrent(row));
  };

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        hover
        onClick={() => clickRow(rows)}
      >
        <TableCell sx={{ width: "8px" }}>
          {rows.feature ? (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="inherit" sx={{ flex: "1 1 auto" }}>
              {rows.component.name}
            </Typography>

            <IconButton
              sx={{ flex: "0 1 auto" }}
              onClick={(e) => setAnchor(e.currentTarget)}
            >
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton
              onClick={() => clickEditButton(rows)}
              sx={{ flex: "0 1 auto" }}
            >
              <ModeEditIcon color="primary" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell sx={{ width: "50px" }}>Характеристика</TableCell>
                    <TableCell>Значения</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.feature
                    ? rows.feature.map((el: IFeature) => {
                        return (
                          <FeatureSetsCollapseRow
                            element={el}
                            rows={rows}
                            key={el.name_feature.id}
                          />
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <FeatureSetDelete anchor={anchor} setAnchor={setAnchor} row={rows} />
    </>
  );
};
