import {
  alpha,
  Box,
  IconButton,
  TablePagination,
  Toolbar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  count: number;
  page: number;
  setAdd: (data: boolean) => void;
  onPageChange: (event: unknown, newPage: number) => void;
}

export const EnhancedTableLocation = (props: Props) => {
  const { count, page, onPageChange, setAdd } = props;

  const handleAdd = () => {
    setAdd(true);
  };

  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={{
        backgroundColor: (theme: any) =>
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", flexGrow: 1 }}
      >
        <TablePagination
          component="span"
          count={count}
          page={page}
          rowsPerPage={10}
          onPageChange={onPageChange}
          rowsPerPageOptions={[10]}
          labelDisplayedRows={({ page }: any) => {
            return `Page: ${page + 1}`;
          }}
        />
        <IconButton
          color="primary"
          onClick={handleAdd}
          sx={{ paddingRight: "24px" }}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};
