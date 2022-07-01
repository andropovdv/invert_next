/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/store";
import React from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import {
  selectComponentTypesData,
  selectFeatureSetsData,
  selectFeatureTypesData,
  selectVendorData,
} from "store/selectors";
import { fetchComponentTypes } from "store/thunks/componenTypesThunk";
import { fetchFeatureSets } from "store/thunks/featureSetsThunk";
import { fetchFeaturesTypes } from "store/thunks/featureTypesThunk";
import { fetchVendors } from "store/thunks/vendorsThunk";
import { IComponent } from "store/types/IComponent";
import { IFeatureSets } from "store/types/IFeatureSets";
import { IVendor } from "store/types/IVendor";

type Props = {
  isOpen: boolean;
  mode: typeModal;
  title?: string;
  row?: IComponent[];
  isLoading: boolean;
  handleClose: () => void;
  handleInsertComponent: (data: IComponent) => void;
  handleEditComponent: (data: IComponent) => void;
  handleDeleteComponent: (data: IComponent[]) => void;
};

export type typeModal = "add" | "edit" | "delete";

export const ComponentModal = (props: Props) => {
  const {
    isOpen,
    mode,
    row = [],
    title = "Header",
    isLoading,
    handleClose,
    handleInsertComponent,
    handleEditComponent,
    handleDeleteComponent,
  } = props;

  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector(selectVendorData);
  const { featureSets } = useAppSelector(selectFeatureSetsData);
  const { featureTypes } = useAppSelector(selectFeatureTypesData);
  const { componentTypes } = useAppSelector(selectComponentTypesData);

  React.useEffect(() => {
    if (featureSets.length === 0) {
      dispatch(fetchFeatureSets());
    }
    dispatch(fetchComponentTypes());
    dispatch(fetchVendors());
    dispatch(fetchFeaturesTypes());
  }, []);

  const {
    handleSubmit,
    reset,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<IComponent>({ mode: "onChange" });

  const { fields, replace } = useFieldArray<IComponent>({
    control,
    name: "featureSet.feature",
  });

  const watchComponentType = useWatch({ control, name: "typeComponent.id" });

  const [localRow, setLocalRow] = React.useState<IFeatureSets>();

  let arr: any[];
  React.useEffect(() => {
    if (mode === "edit" && row) {
      setValue("typeComponent.id", row[0].typeComponent.id, {
        shouldDirty: true,
      });
      setValue("vendor.id", row[0].vendor.id, { shouldDirty: true });
      setValue("model", row[0].model, { shouldDirty: true });
      arr = row[0].featureSet.feature.map((el) => {
        return { id: el.id, label: el.value, value: el.value };
      });
      replace(arr);
    }
  }, [isOpen]);

  // обновление полей при смене типа комплетующей
  React.useEffect(() => {
    if (watchComponentType) {
      let currentFS: IFeatureSets = {} as IFeatureSets;

      if (featureSets) {
        currentFS = featureSets.find(
          (el: any) => el.component.id === watchComponentType
        )!;
        setLocalRow(currentFS);
      }
      let arr: any[];
      if (mode === "add") {
        arr = currentFS.feature.map((el) => ({
          id: el.name_feature.id,
          label: getComponentTypeById(el.name_feature.id),
          value: "",
        }));
        replace(arr);
      } else if (mode === "edit" && row) {
        arr = row[0].featureSet.feature.map((el) => {
          return {
            id: el.id,
            label: getComponentTypeById(el.id),
            value: el.value,
          };
        });
        replace(arr);
      }
    }
  }, [watchComponentType]);

  const preLoadData = (data: any): IComponent => {
    let result: IComponent = {} as IComponent;
    const nameVendorById = vendors.find((el) => el.id === data.vendor.id);
    const nameComponentTypeById = componentTypes.find(
      (el) => el.id === data.typeComponent.id
    );
    const idFeatureSet = localRow?.id;

    let arr: any = [];
    data.featureSet.feature.forEach((el: any) => {
      let row = { id: el.id, value: el.value };
      arr.push(row);
    });

    if (nameVendorById && nameComponentTypeById && idFeatureSet && row) {
      result = {
        id: mode === "add" ? "" : row[0].id,
        typeComponent: {
          id: data.typeComponent.id,
          name: nameComponentTypeById?.name,
        },
        vendor: {
          id: data.vendor.id,
          name: nameVendorById.name,
        },
        model: data.model,
        featureSet: {
          id: idFeatureSet,
          feature: arr,
        },
      };
    }
    return result;
  };

  const onSubmit = (data: any) => {
    const final = preLoadData(data);
    if (mode === "add") {
      handleInsertComponent(final);
    } else if (mode === "edit") {
      handleEditComponent(final);
    }
    reset({
      featureSet: { feature: [] },
      model: "",
      typeComponent: { id: "" },
      vendor: { id: "" },
    });
    handleClose();
  };

  const onDelete = (row: IComponent[]) => {
    if (row) {
      handleDeleteComponent(row);
    }
    reset({
      featureSet: { feature: [] },
      model: "",
      typeComponent: { id: "" },
      vendor: { id: "" },
    });
    handleClose();
  };

  const getComponentTypeById = (id: string) => {
    const res = featureTypes.find((el) => el.id === id);
    return res?.feature;
  };
  const getTypeField = (feature?: string) => {
    const res = featureTypes.find((el) => el.feature === feature);
    if (res?.field_type === "STRING") {
      return false;
    } else if (res?.field_type === "DROPDOWN") {
      return true;
    }
  };
  const getValueFeature = (feature?: string): any[] => {
    let res: any;
    if (feature && localRow) {
      res = localRow.feature.find((e1) => e1.name_feature.name === feature);
      return res.value_feature;
    } else {
      return [];
    }
  };
  const clickClose = (e?: Object, r?: string) => {
    if (r !== "backdropClick") {
    }
    reset({
      featureSet: { feature: [] },
      model: "",
      typeComponent: { id: "" },
      vendor: { id: "" },
    });
    handleClose();
  };

  return (
    <>
      {mode === "delete" ? (
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
                ? row.map((el: IComponent) => (
                    <ListItem key={el.id}>
                      <ListItemText
                        primary={`${el.vendor.name} - ${el.model}`}
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
              onClick={() => onDelete(row)}
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
              <FormControl fullWidth sx={{ marginTop: 1 }}>
                <InputLabel htmlFor="typeComponent">Тип компонента</InputLabel>
                <Controller
                  name="typeComponent.id"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value}
                      onChange={onChange}
                      label="Тип компонента"
                      labelId="typeComponent"
                    >
                      {featureSets.map((el: IFeatureSets) => (
                        <MenuItem key={el.component.id} value={el.component.id}>
                          {el.component.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 1 }}>
                <InputLabel htmlFor="vendor">Производитель</InputLabel>
                <Controller
                  name="vendor.id"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value}
                      onChange={onChange}
                      label="Производитель"
                      labelId="vendor"
                    >
                      {vendors.map((el: IVendor) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <TextField
                id="model"
                label="Модель"
                fullWidth
                margin="dense"
                {...register("model")}
              />
              <Divider />
              <List dense disablePadding>
                {fields.map((item, index) => {
                  return (
                    <ListItem key={item.id} disableGutters dense>
                      <Typography sx={{ minWidth: "170px" }}>
                        {item.label}
                      </Typography>
                      {getTypeField(item.label) ? (
                        <>
                          <Controller
                            name={`featureSet.feature.${index}.value`}
                            defaultValue=""
                            control={control}
                            render={({ field: { onChange, value } }) => {
                              return (
                                <Select
                                  fullWidth
                                  value={value}
                                  onChange={onChange}
                                >
                                  {getValueFeature(item.label).length === 0 ? (
                                    <b>Вголову</b>
                                  ) : Array.isArray(
                                      getValueFeature(item.label)
                                    ) ? (
                                    getValueFeature(item.label).map(
                                      (el, idx) => {
                                        return (
                                          <MenuItem key={idx} value={el}>
                                            {el}
                                          </MenuItem>
                                        );
                                      }
                                    )
                                  ) : null}
                                </Select>
                              );
                            }}
                          />
                        </>
                      ) : (
                        <TextField
                          fullWidth
                          margin="dense"
                          {...register(`featureSet.feature.${index}.value`)}
                        />
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>

            <DialogActions>
              <Button onClick={clickClose}>Отменить</Button>
              <LoadingButton type="submit" color="success" loading={isLoading}>
                Сохранить
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};
