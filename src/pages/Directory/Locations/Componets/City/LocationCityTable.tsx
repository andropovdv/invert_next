/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import DoneIcon from "@mui/icons-material/Done";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectLocationsCityData } from "store/selectors";
import {
  fetchLocationCity,
  insertLocationCity,
} from "store/thunks/locationCityThunk";
import { ILocationData } from "store/types/ILocations";
import { LocationCityTableRow } from "./LocationCityTableRow";
import { EnhancedTableLocation } from "./EnhancedTableCity";
import { setLocationCityError } from "store/slices/locationCitySlice";
import { Box } from "@mui/system";

interface Props {
  handleClose: () => void;
}

export const LocationCityTable = ({ handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { locationCity, count, error } = useAppSelector(
    selectLocationsCityData
  );

  const [page, setPage] = React.useState(0);
  const [isAdd, setAdd] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    dispatch(fetchLocationCity());
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    const uni = locationCity.find((el) => el.name === value);
    if (!uni) {
      const res = { id: "", name: value };
      dispatch(insertLocationCity(res));
      setValue("");
      setAdd(false);
    } else {
      dispatch(setLocationCityError("Не уникально"));
    }
  };

  const pressKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onClose = () => {
    setAdd(false);
    setValue("");
    dispatch(setLocationCityError(""));
  };

  const addRow = () => {
    if (!isAdd) {
      return null;
    }
    return (
      <>
        {isAdd ? (
          <TableRow>
            <TableCell>
              <TextField
                value={value}
                size="small"
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  pressKeyEnter(e)
                }
                error={error.length !== 0 ? true : false}
                label={error.length !== 0 ? error : null}
              />
              <IconButton color="success" onClick={() => onSubmit()}>
                <DoneIcon />
              </IconButton>
              <IconButton color="error" onClick={onClose} edge="start">
                <CancelIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ) : null}
      </>
    );
  };
  return (
    <Box sx={{ height: "464px", display: "flex", flexDirection: "column" }}>
      <DialogContent sx={{ padding: 0, flex: "1 1 auto" }}>
        <EnhancedTableLocation
          setAdd={setAdd}
          count={count}
          page={page}
          onPageChange={handleChangePage}
        />
        <TableContainer>
          <Table size="small">
            <TableBody>
              {locationCity.map((el: ILocationData) => (
                <LocationCityTableRow element={el} key={el.id} />
              ))}
              {addRow()}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Закрыть</Button>
      </DialogActions>
    </Box>
  );
};
