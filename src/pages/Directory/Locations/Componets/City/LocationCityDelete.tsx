import { IconButton, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch } from "hooks/store";
import { removeLocationCity } from "store/thunks/locationCityThunk";
import { ILocationData } from "store/types/ILocations";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  anchor: null | HTMLElement;
  setAnchor: (data: any) => void;
  row: ILocationData;
};

export const LocationCityDelete = (props: Props) => {
  const { anchor, setAnchor, row } = props;

  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setAnchor(null);
  };

  const handleDelete = (row: ILocationData[]) => {
    dispatch(removeLocationCity(row));
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
          }}
        >
          <Typography sx={{ marginRight: 2, marginLeft: 2 }}>
            {`Вы хотите удалить "${row.name}" ?`}
          </Typography>
          <IconButton color="error" onClick={() => handleCancel()}>
            <CancelIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleDelete([row])}>
            <DoneIcon />
          </IconButton>
        </Box>
      </Popover>
    </>
  );
};
