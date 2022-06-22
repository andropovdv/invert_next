import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FeatureSetsRows } from "./FeatureSetsRows";
import { IFeatureSets } from "store/types/IFeatureSets";
import { EnhancedTableToolbar } from "pages/Directory/Shared/EnhancedTableToolbar";

interface Props {
  rows: IFeatureSets[];
  page: number;
  setPage: (page: number) => void;
  rowCount: number;
  isLoading: boolean;
  handleEditItem: () => void;
}

export const FeatureSetsTable = (props: Props) => {
  const { rows, page, rowCount, setPage, isLoading, handleEditItem } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper elevation={7} sx={{ padding: "8px" }}>
      <EnhancedTableToolbar
        count={rowCount}
        page={page}
        onPageChange={handleChangePage}
        isLoading={isLoading}
      />
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
              <FeatureSetsRows
                key={el.component.name}
                rows={el}
                handleEditItem={handleEditItem}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
