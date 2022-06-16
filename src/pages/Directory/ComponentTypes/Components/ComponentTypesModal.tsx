/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { IComponentType } from "../../../../store/types/IComponentTypes";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  handleInsertComponentTypes: (data: IComponentType) => void;
  handleEditComponentTypes: (data: IComponentType) => void;
  handleRemoveComponentTypes: (data: IComponentType[]) => void;
  handleClose: () => void;
  isOpen: boolean;
  mode: string;
  title?: string;
  isLoading: boolean;
  row?: IComponentType[];
  infoRow?: IComponentType;
}

export enum typeModal {
  add = "add",
  edit = "edit",
  delete = "delete",
}

const ComponentTypesSchema = yup.object({
  name: yup.string().required("Обязательное поле"),
});

export const ComponentTypesModal = (props: Props) => {
  const {
    isOpen,
    isLoading,
    mode,
    title,
    row = [],
    // infoRow,
    handleClose,
    handleEditComponentTypes,
    handleInsertComponentTypes,
    handleRemoveComponentTypes,
  } = props;

  let currentRow: IComponentType = {} as IComponentType;
  if (row) {
    currentRow = Object.assign({}, ...row.map((el) => ({ ...el })));
  }

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors },
  } = useForm<IComponentType>({
    mode: "onChange",
    resolver: yupResolver(ComponentTypesSchema),
  });

  const upDateFormFields = (currentRow: IComponentType) => {
    setValue("name", currentRow.name, { shouldDirty: true });
  };
  React.useEffect(() => {
    upDateFormFields(currentRow);
  }, [isOpen]);

  const onSubmit = (data: any) => {
    if (mode === typeModal.add) {
      handleInsertComponentTypes(data);
    } else if (mode === typeModal.edit) {
      const toApi = { ...data, id: currentRow.id };
      handleEditComponentTypes(toApi);
    } else if (mode === typeModal.delete) {
      handleRemoveComponentTypes(row);
    }
    reset({
      name: "",
    });
    currentRow = {} as IComponentType;
    handleClose();
  };

  const clickClose = (e?: Object, r?: string) => {
    if (r !== "backdropClick") {
      reset({
        name: "",
      });
      currentRow = {} as IComponentType;
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
                ? row.map((el: IComponentType) => (
                    <ListItem key={el.id}>
                      <ListItemText
                        primary={el.name}
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
                autoFocus
                id="name"
                label={errors.name ? errors.name.message : "Тип"}
                fullWidth
                margin="dense"
                {...register("name")}
                error={errors.name ? true : false}
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
