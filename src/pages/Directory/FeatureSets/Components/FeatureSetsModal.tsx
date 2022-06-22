/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "hooks/store";
import {
  selectComponentTypesData,
  selectFeatureSetsData,
  selectFeatureTypesData,
} from "store/selectors";
import { fetchComponentTypes } from "store/thunks/componenTypesThunk";
import { fetchFeaturesTypes } from "store/thunks/featureTypesThunk";
import { IFeatureSets } from "store/types/IFeatureSets";
import { IComponentType } from "store/types/IComponentTypes";
import { IFeatureTypes } from "store/types/IFeatureTypes";
import { useDisabled } from "utils/useDisabled";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";

interface Props {
  isOpen: boolean;
  title: string;
  mode: string;
  handleClose: () => void;
  handleInsertFeatureSets: (data: IFeatureSets) => void;
  handleEditFeatureSets: (data: IFeatureSets) => void;
}

export enum typeModal {
  add = "add",
  edit = "edit",
  delete = "delete",
}

const FeatureSetSchema = yup.object({
  // component: yup.string().required("Обязательное поле"),
  component: yup.object().required("Обязательное поле"),
});

export const FeatureSetsModal = (props: Props) => {
  const {
    isOpen,
    title,
    handleClose,
    mode,
    handleInsertFeatureSets,
    handleEditFeatureSets,
  } = props;

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(FeatureSetSchema),
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "feature",
  });

  const dispatch = useAppDispatch();
  const { componentTypes } = useAppSelector(selectComponentTypesData);
  const { featureTypes } = useAppSelector(selectFeatureTypesData);
  const { current, isLoading } = useAppSelector(selectFeatureSetsData);

  const disabledField = useDisabled(mode);
  console.log("errors: ", errors);

  // API =====
  React.useEffect(() => {
    dispatch(fetchComponentTypes());
    dispatch(fetchFeaturesTypes());
  }, []);

  let arr: any[];

  React.useEffect(() => {
    let c1;

    if (current?.component) {
      c1 = componentTypes.find((el) => el.name === current.component.name);
    }
    if (current?.feature) {
      arr = current.feature.map((el) => {
        let nameToID;
        nameToID = featureTypes.find(
          (e) => e.feature === el.name_feature.name
        )!;
        return { feature: [], id: nameToID.id };
      });
    }
    if (mode === typeModal.edit) {
      setValue("component.id", c1?.id, { shouldDirty: true });
    }
    replace(arr);
  }, [isOpen, current]);

  // =========

  const preLoadData = (data: any) => {
    let result = {} as IFeatureSets;
    console.log("In:", data);
    const nameComp = componentTypes.find((el) => el.id === data.component.id)!;
    let res = {} as any;
    let fin = [];

    for (let el of data.feature) {
      res = featureTypes.find((e) => el.id === e.id)!;
      fin.push({
        name_feature: { id: res.id, name: res.feature },
        type: res.field_type,
        unit: res.unit,
        value_feature: ["FirstRecord"],
        // value_feature: [],
      });
    }
    result = {
      id: current?.id || "",
      component: { id: data.component.id, name: nameComp.name },
      feature: fin,
    };
    return result;
  };

  const onSubmit = (data: any) => {
    const result = preLoadData(data);
    console.log(result);
    if (mode === typeModal.add) {
      handleInsertFeatureSets(result);
      handleClose();
    } else if (mode === typeModal.edit) {
      handleEditFeatureSets(result);
      handleClose();
    } else if (mode === typeModal.delete) {
    }
    reset({
      component: { id: "" },
      feature: [],
    });
    handleClose();
  };

  const clickCancel = () => {
    reset({
      component: { id: "" },
      feature: [],
    });
    handleClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <FormControl
              fullWidth
              sx={{ marginTop: "4px" }}
              disabled={disabledField}
            >
              <InputLabel
                htmlFor="comp"
                error={errors.component?.name ? true : false}
              >
                {errors.component?.name
                  ? errors.component.name.message
                  : "Тип компонента"}
              </InputLabel>
              <Controller
                name="component.id"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    // disabled={disabledField}
                    error={errors.component?.name ? true : false}
                    value={value}
                    onChange={onChange}
                    label={
                      errors.component?.name
                        ? errors.component.name.message
                        : "Тип компонента"
                    }
                    labelId="comp"
                  >
                    {componentTypes.map((el: IComponentType) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Button
              onClick={() => append({ id: "" })}
              fullWidth
              variant="outlined"
              sx={{ marginTop: "8px", marginBottom: "8px" }}
            >
              Add
            </Button>

            <List dense disablePadding>
              {fields.map((item, index) => {
                return (
                  <ListItem key={item.id} disableGutters>
                    <FormControl fullWidth sx={{ marginTop: "4px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // direction: "row",
                        }}
                      >
                        <InputLabel htmlFor="comp">
                          {errors.feature
                            ? errors.feature.message
                            : "Характеристика"}
                        </InputLabel>
                        <Controller
                          name={`feature.${index}.id`}
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Select
                              // disabled={disabledField}
                              fullWidth
                              error={errors.feature ? true : false}
                              value={value}
                              onChange={onChange}
                              label={
                                errors.feature
                                  ? errors.feature.message
                                  : "Характеристика"
                              }
                              labelId="comp"
                            >
                              {featureTypes.map((el: IFeatureTypes) => (
                                <MenuItem key={el.id} value={el.id}>
                                  {el.feature}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        <IconButton
                          onClick={() => remove(index)}
                          color="warning"
                          size="large"
                          edge="end"
                        >
                          <RemoveCircleOutlineIcon fontSize="inherit" />
                        </IconButton>
                      </Box>
                    </FormControl>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={clickCancel}>Отменить</Button>
            <LoadingButton type="submit" color="success" loading={isLoading}>
              Сохранить
            </LoadingButton>
            {/* <Button type="submit">Save</Button> */}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
