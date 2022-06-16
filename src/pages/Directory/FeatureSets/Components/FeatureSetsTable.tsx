import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter,
} from "@mui/material";
import { IFeatureSets } from "../../../../store/types/IFeatureSets";
import { FeatureSetsRows } from "./FeatureSetsRows";

interface Props {
  rows: IFeatureSets[];
  page: number;
  setPage: (page: number) => void;
  rowCount: number;
}

export const FeatureSetsTable = (props: Props) => {
  const { rows, page, rowCount, setPage } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper elevation={7} sx={{ padding: "8px" }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Компонент</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((el) => (
              <FeatureSetsRows key={el.component.name} rows={el} />
              // <CustomRow key={el.component.name} row={el} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <TablePagination
                  component="div"
                  count={rowCount}
                  page={page}
                  rowsPerPage={10}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[10]}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};
