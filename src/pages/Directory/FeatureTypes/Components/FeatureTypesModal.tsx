/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { IFeatureTypes } from "../../../../store/types/IFeatureTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  handleInsertFeatureTypes: (data: IFeatureTypes) => void;
  handleEditFeatureTypes: (data: IFeatureTypes) => void;
  handleRemoveFeatureTypes: (data: IFeatureTypes[]) => void;
  handleClose: () => void;
  isOpen: boolean;
  mode: string;
  title?: string;
  isLoading: boolean;
  row?: IFeatureTypes[];
  infoRow?: IFeatureTypes;
}

export enum typeModal {
  add = "add",
  edit = "edit",
  delete = "delete",
}

const FeatureTypesSchema = yup.object({
  feature: yup.string().required("Обязательное поле"),
  field_type: yup.string().required("Обязательное поле"),
  unit: yup.string().defined(),
});

export const FeatureTypesModal = (props: Props) => {
  const {
    mode,
    row = [],
    handleClose,
    title,
    isOpen,
    isLoading,
    handleInsertFeatureTypes,
    handleEditFeatureTypes,
    handleRemoveFeatureTypes,
  } = props;

  let currentRow: IFeatureTypes = {} as IFeatureTypes;
  if (row) {
    currentRow = Object.assign({}, ...row.map((el) => ({ ...el })));
  }

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<IFeatureTypes>({
    mode: "onChange",
    resolver: yupResolver(FeatureTypesSchema),
  });

  const updateFormFields = (currentRow: IFeatureTypes) => {
    setValue("feature", currentRow.feature, { shouldDirty: true });
    setValue("field_type", currentRow.field_type, { shouldDirty: true });
    setValue("unit", currentRow.unit, { shouldDirty: true });
  };

  React.useEffect(() => {
    updateFormFields(currentRow);
  }, [isOpen]);

  const onSubmit = (data: any) => {
    if (mode === typeModal.add) {
      handleInsertFeatureTypes(data);
    } else if (mode === typeModal.edit) {
      const toApi = { ...data, id: currentRow.id };
      handleEditFeatureTypes(toApi);
    } else if (mode === typeModal.delete) {
      handleRemoveFeatureTypes(row);
    }
    reset({
      feature: "",
      field_type: "",
      unit: "",
    });
    currentRow = {} as IFeatureTypes;
    handleClose();
  };

  const clickClose = (e?: Object, r?: string) => {
    if (r !== "backdropClick") {
      reset({
        feature: "",
        field_type: "",
        unit: "",
      });
      currentRow = {} as IFeatureTypes;
      handleClose();
    }
  };

  return (
    <>
      {mode === typeModal.delete ? (
        <Dialog
          open={isOpen}
          onClose={(e, r) => clickClose(e, r)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText variant="body1" component="span">
              Вы действительно хотите удалить
            </DialogContentText>
            <List dense>
              {row
                ? row.map((el: IFeatureTypes) => (
                    <ListItem key={el.id}>
                      <ListItemText
                        primary={el.feature}
                        primaryTypographyProps={{ fontWeight: 700 }}
                      />
                    </ListItem>
                  ))
                : null}
            </List>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              color="error"
              loading={isLoading}
              onClick={() => onSubmit(currentRow)}
            >
              Удалить
            </LoadingButton>
            <Button onClick={clickClose}>Отменить</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={isOpen} onClose={clickClose} fullWidth maxWidth="sm">
          <DialogTitle>{title}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent dividers>
              <TextField
                id="feature"
                label={
                  errors.feature ? errors.feature.message : "Характеристика"
                }
                fullWidth
                margin="dense"
                {...register("feature")}
                error={errors.feature ? true : false}
              />
              <FormControl fullWidth sx={{ marginTop: "4px" }}>
                <InputLabel htmlFor="type_field">
                  {errors.field_type ? errors.field_type.message : "Тип поля"}
                </InputLabel>
                <Controller
                  defaultValue=""
                  name="field_type"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      error={errors.field_type ? true : false}
                      value={value}
                      onChange={onChange}
                      label={
                        errors.field_type
                          ? errors.field_type.message
                          : "Тип поля"
                      }
                      labelId="type_field"
                    >
                      <MenuItem value="DROPDOWN">DROPDOWN</MenuItem>
                      <MenuItem value="STRING">STRING</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              <TextField
                id="unit"
                label={errors.feature ? errors.feature.message : "Ед. изм."}
                fullWidth
                margin="dense"
                {...register("unit")}
                error={errors.feature ? true : false}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={clickClose}>Отменить</Button>
              <LoadingButton color="success" loading={isLoading} type="submit">
                Сохранить
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};
