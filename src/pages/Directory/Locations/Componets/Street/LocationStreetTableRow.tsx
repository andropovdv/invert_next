import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { selectLocationsStreetData } from "store/selectors";
import { setLocationStreetError } from "store/slices/locationStreetSlice";
import { editLocationStreet } from "store/thunks/locationStreetThunk";
import { ILocationData } from "store/types/ILocations";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { LocationStreetTableDelete } from "./LocationStreetTableDelete";

type Props = {
  element: ILocationData;
};

export const LocationStreetTableRow = (props: Props) => {
  const { element } = props;

  const dispatch = useAppDispatch();
  const { locationStreet, error } = useAppSelector(selectLocationsStreetData);

  const [isEdit, setEdit] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleEdit = (row: ILocationData) => {
    setValue(row.name);
    setEdit((prev) => !prev);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClose = () => {
    setEdit(false);
    setValue("");
    dispatch(setLocationStreetError(""));
  };

  const onSubmit = (row: ILocationData) => {
    const uni = locationStreet.find((el) => el.name === value);
    if (!uni) {
      const res = { id: row.id, name: value };
      dispatch(editLocationStreet(res));
      setEdit(false);
    } else {
      dispatch(setLocationStreetError("Не уникально"));
    }
  };

  const pressKeyEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: ILocationData
  ) => {
    if (e.key === "Enter") {
      onSubmit(row);
    }
  };

  return (
    <>
      {isEdit ? (
        <TableRow key={element.id} hover>
          <TableCell>
            <TextField
              value={value}
              size="small"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                pressKeyEnter(e, element)
              }
              error={error.length !== 0 ? true : false}
              label={error.length !== 0 ? error : null}
            />
            <IconButton color="success" onClick={() => onSubmit(element)}>
              <DoneIcon />
            </IconButton>
            <IconButton color="error" onClick={onClose} edge="start">
              <CancelIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton color="primary" onClick={() => handleEdit(element)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" disabled={isEdit}>
              <DeleteOutlineIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow key={element.id} hover>
          <TableCell>{element.name}</TableCell>
          <TableCell align="right">
            <IconButton color="primary" onClick={() => handleEdit(element)}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                setAnchor(e.currentTarget)
              }
            >
              <DeleteOutlineIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )}
      <LocationStreetTableDelete
        anchor={anchor}
        setAnchor={setAnchor}
        row={element}
      />
    </>
  );
};
