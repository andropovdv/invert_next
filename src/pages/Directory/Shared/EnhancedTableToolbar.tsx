import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { Skeleton, TablePagination } from "@mui/material";
import { alpha } from "@mui/material/styles";

type Props = {
  count: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  isLoading: boolean;
};

export const EnhancedTableToolbar = (props: Props) => {
  const { count, page, onPageChange, isLoading } = props;

  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={{
        backgroundColor: (theme) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }}
    >
      {isLoading ? (
        <Skeleton animation="wave" />
      ) : (
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={10}
          onPageChange={onPageChange}
          rowsPerPageOptions={[10]}
          labelDisplayedRows={({ page }) => {
            return `Page: ${page + 1}`;
          }}
        />
      )}

      {/* <Typography variant="h6" id="tableTitle" component="div">
        Pagination
      </Typography> */}
    </Toolbar>
  );
};
