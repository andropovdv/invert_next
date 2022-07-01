/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { ILocation, ILocationData } from "store/types/ILocations";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "hooks/store";
import {
  selectLocationsCityData,
  selectLocationsStreetData,
} from "store/selectors";
import { fetchLocationCity } from "store/thunks/locationCityThunk";
import { fetchLocationStreet } from "store/thunks/locationStreetThunk";
import { typeModal } from "pages/Directory/Components/Components/ComponentModal";

interface Props {
  setTab: (data: string) => void;
  isLoading: boolean;
  row?: ILocation[];
  mode: typeModal;
  isOpen: boolean;
  handleClose: () => void;
  handleInsertLocation: (data: ILocation) => void;
  handleEditLocation: (data: ILocation) => void;
}

const LocationSchema = yup.object().shape({
  alias: yup
    .string()
    .required("Обязательное поле")
    .min(3, "не менее 3-х символов"),
  city: yup.object().shape({
    id: yup.string().required("Обязательное поле"),
  }),
  street: yup.object().shape({
    id: yup.string().required("Обязательное поле"),
  }),
  house: yup.string().required("Обязательное поле"),
  floor: yup.string().defined(),
  room: yup.string().required("Обязательное поле"),
});

export const LocationForm = (props: Props) => {
  const {
    mode,
    setTab,
    isLoading,
    row,
    handleClose,
    isOpen,
    handleInsertLocation,
    handleEditLocation,
  } = props;

  const dispatch = useAppDispatch();
  const { locationCity } = useAppSelector(selectLocationsCityData);
  const { locationStreet } = useAppSelector(selectLocationsStreetData);

  React.useEffect(() => {
    dispatch(fetchLocationCity());
    dispatch(fetchLocationStreet());
  }, []);

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LocationSchema),
  });

  React.useEffect(() => {
    if (mode === "edit" && row) {
      setValue("city.id", row[0].city.id, { shouldDirty: true });
      setValue("street.id", row[0].street.id, { shouldDirty: true });
      setValue("alias", row[0].alias, { shouldDirty: true });
      setValue("floor", row[0].floor, { shouldDirty: true });
      setValue("house", row[0].house, { shouldDirty: true });
      setValue("room", row[0].room, { shouldDirty: true });
    }
  }, [isOpen]);

  const revisionData = (data: ILocation) => {
    const cityName = locationCity.find(
      (el: ILocationData) => el.id === data.city.id
    );
    const streetName = locationStreet.find(
      (el: ILocationData) => el.id === data.street.id
    );

    let final: ILocation = {} as ILocation;
    if (cityName && streetName && row) {
      final = {
        id: mode === "add" ? "" : row[0].id,
        city: { id: data.city.id, name: cityName.name },
        street: { id: data.street.id, name: streetName.name },
        alias: data.alias,
        floor: data.floor,
        house: data.house,
        room: data.room,
      };
    }
    return final;
  };

  const onSubmit = (data: any) => {
    const res = revisionData(data);
    if (mode === "add") {
      handleInsertLocation(res);
    } else if (mode === "edit") {
      handleEditLocation(res);
    }
    reset({
      city: {},
      street: {},
      alias: "",
      floor: "",
      house: "",
      room: "",
    });
    handleClose();
  };

  const clickClose = (e?: Object, r?: string) => {
    if (r !== "backdropClick") {
      reset({
        city: {},
        street: {},
        alias: "",
        floor: "",
        house: "",
        room: "",
      });
      handleClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <TextField
          autoFocus
          label={
            errors.alias
              ? `Наименование -- ${errors.alias.message}`
              : "Наименование"
          }
          id="alias"
          fullWidth
          margin="dense"
          error={errors.alias ? true : false}
          {...register("alias")}
        />
        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputLabel htmlFor="city" error={errors.city ? true : false}>
              {errors.city?.id ? `Город --${errors.city.id.message}` : "Город"}
            </InputLabel>
            <Controller
              name="city.id"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  error={errors.city ? true : false}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label={
                    errors.city?.id
                      ? `Город --${errors.city.id.message}`
                      : "Город"
                  }
                  labelId="city"
                >
                  {locationCity.map((el: ILocationData) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <IconButton
              color="info"
              size="large"
              edge="end"
              onClick={() => setTab("2")}
            >
              <MenuIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputLabel htmlFor="street" error={errors.street ? true : false}>
              {errors.street?.id
                ? `Улица -- ${errors.street.id.message}`
                : "Улица"}
            </InputLabel>
            <Controller
              name="street.id"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  error={errors.street ? true : false}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label={
                    errors.street?.id
                      ? `Улица -- ${errors.street.id.message}`
                      : "Улица"
                  }
                  labelId="street"
                >
                  {locationStreet.map((el: ILocationData) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <IconButton
              color="info"
              size="large"
              edge="end"
              onClick={() => setTab("3")}
            >
              <MenuIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </FormControl>
        <TextField
          label={errors.house ? `Дом -- ${errors.house.message}` : "Дом"}
          id="house"
          fullWidth
          margin="dense"
          error={errors.house ? true : false}
          {...register("house")}
        />
        <TextField
          label={errors.floor ? `${errors.floor.message}` : "Этаж"}
          id="floor"
          fullWidth
          margin="dense"
          error={errors.floor ? true : false}
          {...register("floor")}
        />
        <TextField
          label={
            errors.room ? `Помещение -- ${errors.room.message}` : "Помещение"
          }
          id="floor"
          fullWidth
          margin="dense"
          error={errors.room ? true : false}
          {...register("room")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={clickClose}>Отменить</Button>
        <LoadingButton color="success" loading={isLoading} type="submit">
          Сохранить
        </LoadingButton>
      </DialogActions>
    </form>
  );
};
