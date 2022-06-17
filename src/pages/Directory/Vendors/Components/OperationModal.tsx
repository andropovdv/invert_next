/* eslint-disable react-hooks/exhaustive-deps */
import LoadingButton from "@mui/lab/LoadingButton";
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
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IVendor } from "../../../../store/types/IVendor";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const VendorSchema = yup
  .object({
    name: yup.string().required("Обязательное поле"),
    full_name: yup.string().defined(),
    url: yup.string().url().defined(),
  })
  .required();

type Props = {
  handleInsertVendor: (data: IVendor) => void;
  handleEditVendor: (data: IVendor) => void;
  handleRemoveVendor: (data: IVendor[]) => void;
  handleClose: () => void;
  row?: IVendor[];
  infoRow?: IVendor;
  isOpen: boolean;
  title?: string;
  mode: string;
  isLoading: boolean;
};

export enum typeModal {
  add = "add",
  edit = "edit",
  delete = "delete",
}

export const OperationModal = (props: Props) => {
  const {
    isLoading,
    handleClose,
    isOpen,
    title,
    handleInsertVendor,
    mode,
    row = [],
    infoRow = {} as IVendor,
    handleEditVendor,
    handleRemoveVendor,
  } = props;

  let currentRow: IVendor = {} as IVendor;
  if (row) {
    currentRow = Object.assign({}, ...row.map((el) => ({ ...el })));
  }

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    formState: { errors },
  } = useForm<IVendor>({
    mode: "onChange",
    resolver: yupResolver(VendorSchema),
  });

  const updateForm = (currentRow: IVendor) => {
    setValue("name", currentRow.name, { shouldDirty: true });
    setValue("full_name", currentRow.full_name, { shouldDirty: true });
    setValue("url", currentRow.url, { shouldDirty: true });
  };

  useEffect(() => {
    updateForm(currentRow);
  }, [isOpen]);

  const onSubmit = (data: any) => {
    if (mode === typeModal.add) {
      handleInsertVendor(data);
    } else if (mode === typeModal.edit) {
      const toApi = { ...data, id: currentRow.id };
      handleEditVendor(toApi);
    } else if (mode === typeModal.delete) {
      handleRemoveVendor(row);
    }

    reset({
      name: "",
      full_name: "",
      url: "",
    });
    currentRow = {} as IVendor;
    handleClose();
  };

  const clickClose = (e?: Object, r?: string) => {
    if (r !== "backdropClick") {
      reset({
        name: "",
        full_name: "",
        url: "",
      });
      currentRow = {} as IVendor;
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
            <DialogContentText>
              <Typography variant="body1" component="span">
                Вы действительно хотите удалить
              </Typography>
            </DialogContentText>
            <List dense>
              {row
                ? row.map((el: IVendor) => (
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
              onClick={() => onSubmit(infoRow)}
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
              <DialogContentText>Наименование:</DialogContentText>
              <TextField
                id="name"
                label={errors.name ? "Обязательное поле" : "Краткое"}
                fullWidth
                margin="dense"
                {...register("name")}
                error={errors.name ? true : false}
              />
              <TextField
                id="full_name"
                label={"Полное"}
                fullWidth
                margin="dense"
                {...register("full_name")}
                error={errors.full_name ? true : false}
              />
              <TextField
                id="url"
                label={errors.name ? "Некорректный URL" : "Сайт"}
                fullWidth
                margin="dense"
                {...register("url")}
                error={errors.url ? true : false}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={clickClose}>Отменить</Button>
              {/* <Button type="submit">Сохранить</Button> */}
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
