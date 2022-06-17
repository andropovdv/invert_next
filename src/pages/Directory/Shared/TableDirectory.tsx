import { Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridSelectionModel,
} from "@mui/x-data-grid";

interface Props {
  isLoading: boolean;
  rows: GridRowsProp;
  columns: GridColDef[];
  setSelectedRows: (data: any) => void;
  page: number;
  rowCount: number;
  setPage: (page: number) => void;
  setInfoRow: (data: any) => void;
}

export const TableDirectory = (props: Props) => {
  const {
    rows,
    rowCount,
    columns,
    setSelectedRows,
    page,
    setPage,
    isLoading,
    setInfoRow,
  } = props;

  return (
    <>
      <Paper elevation={7} sx={{ padding: "8px" }}>
        <div style={{ width: "100%", height: "470px" }}>
          <DataGrid
            pagination
            pageSize={10}
            rowsPerPageOptions={[10]}
            page={page}
            onPageChange={(p) => setPage(p)}
            rowCount={rowCount}
            // paginationMode="server"
            density="compact"
            loading={isLoading}
            autoHeight
            rows={rows}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={(row: GridSelectionModel) => {
              const selectedIds = new Set(row);
              const selectedData = rows.filter((el) => selectedIds.has(el.id));
              setSelectedRows(selectedData);
            }}
            disableColumnMenu={true}
            onRowClick={(rowData) => setInfoRow(rowData.row)} //TODO подумать о реализации
            disableSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [{ field: "name", sort: "asc" }],
              },
            }}
          />
        </div>
      </Paper>
    </>
  );
};
