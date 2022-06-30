import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import React from "react";
import { ILocationData } from "store/types/ILocations";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { selectLocationsCityData } from "store/selectors";
import { editLocationCity } from "store/thunks/locationCityThunk";
import { setLocationCityError } from "store/slices/locationCitySlice";
import { LocationCityDelete } from "./LocationCityDelete";

interface Props {
  element: ILocationData;
}

export const LocationCityTableRow = (props: Props) => {
  const { element } = props;

  const dispatch = useAppDispatch();
  const { locationCity, error } = useAppSelector(selectLocationsCityData);

  const [isEdit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState("");

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
    dispatch(setLocationCityError(""));
  };

  const onSubmit = (row: ILocationData) => {
    const uni = locationCity.find((el) => el.name === value);
    if (!uni) {
      const res = { id: row.id, name: value };
      dispatch(editLocationCity(res));
      setEdit(false);
    } else {
      dispatch(setLocationCityError("Не уникально"));
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
          <TableCell align="right">
            <IconButton color="primary" onClick={() => handleEdit(element)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" disabled={isEdit}>
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
      <LocationCityDelete anchor={anchor} setAnchor={setAnchor} row={element} />
    </>
  );
};
