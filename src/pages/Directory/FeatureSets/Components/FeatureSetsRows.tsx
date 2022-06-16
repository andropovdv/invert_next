import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { IFeature, IFeatureSets } from "../../../../store/types/IFeatureSets";
import { Box } from "@mui/system";

interface Props {
  rows: IFeatureSets;
}

export const FeatureSetsRows = (props: Props) => {
  const { rows } = props;

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [infoRow, setInfoRow] = React.useState<IFeature>();

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} hover>
        {/* <TableCell padding="checkbox"> */}
        <TableCell sx={{ width: "8px" }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {rows.component.name}
            <Button>Add feature</Button>
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
                  {rows.feature.map((el: IFeature) => {
                    const isItemSelected = isSelected(el.name_feature.id);
                    return (
                      <TableRow
                        hover
                        key={el.name_feature.id}
                        selected={isItemSelected}
                        onClick={(event) => setInfoRow(el)}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) =>
                            handleClick(event, el.name_feature.id)
                          }
                        >
                          <Checkbox color="primary" checked={isItemSelected} />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ cursor: "default" }}
                        >
                          {el.name_feature.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Stack direction="row" spacing={1}>
                            {el.value_feature.length !== 0
                              ? el.value_feature.map((e) => (
                                  <Chip key={e} label={e} variant="outlined" />
                                ))
                              : null}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
