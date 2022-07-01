/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectLocationsStreetData } from "store/selectors";
import { setLocationStreetError } from "store/slices/locationStreetSlice";
import {
  fetchLocationStreet,
  insertLocationStreet,
} from "store/thunks/locationStreetThunk";
import { EnhancedTableLocation } from "../EnhancedTableCity";
import { ILocationData } from "store/types/ILocations";
import { LocationStreetTableRow } from "./LocationStreetTableRow";

type Props = {
  handleClose: () => void;
};

export const LocationStreetTable = ({ handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { locationStreet, count, error } = useAppSelector(
    selectLocationsStreetData
  );

  const [page, setPage] = React.useState<number>(0);
  const [isAdd, setAdd] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    dispatch(fetchLocationStreet());
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    const uni = locationStreet.find((el) => el.name === value);
    if (!uni) {
      const res = { id: "", name: value };
      dispatch(insertLocationStreet(res));
      setValue("");
      setAdd(false);
    } else {
      dispatch(setLocationStreetError("Не уникально"));
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
    dispatch(setLocationStreetError(""));
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
              {locationStreet.map((el: ILocationData) => (
                <LocationStreetTableRow element={el} key={el.id} />
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
