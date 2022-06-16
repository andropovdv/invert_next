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
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import {
  selectComponentTypesData,
  selectFeatureTypesData,
} from "../../../../store/selectors";
import { fetchComponentTypes } from "../../../../store/thunks/fetchComponenTypes";
import { fetchFeaturesTypesApi } from "../../../../store/thunks/fetchFeatureTypes";
import { IComponentType } from "../../../../store/types/IComponentTypes";
import { IFeature, IFeatureSets } from "../../../../store/types/IFeatureSets";
import { IFeatureTypes } from "../../../../store/types/IFeatureTypes";
import { Box } from "@mui/system";
import { CleaningServicesTwoTone } from "@mui/icons-material";

// import firebase from "firebase/database";
// import database from "../../../../services/fireBaseInit";
// import { ref, set, push } from "firebase/database";

interface Props {
  isOpen: boolean;
  title: string;
  mode: string;
  handleClose: () => void;
  handleInsertFeatureSets: (data: IFeatureSets) => void;
}

export enum typeModal {
  add = "add",
  edit = "edit",
  delete = "delete",
}

export const FeatureSetsModal = (props: Props) => {
  const { isOpen, title, handleClose, mode, handleInsertFeatureSets } = props;

  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "feature",
  });

  const dispatch = useAppDispatch();
  const { componentTypes } = useAppSelector(selectComponentTypesData);
  const { featureTypes } = useAppSelector(selectFeatureTypesData);

  // API =====
  React.useEffect(() => {
    dispatch(fetchComponentTypes());
    dispatch(fetchFeaturesTypesApi());
  }, []);

  // =========

  const preLoadData = (data: any) => {
    let result = {} as IFeatureSets;
    console.log("In:", data);
    const nameComp = componentTypes.find((el) => el.id === data.component.id)!;
    let res = {} as any;
    let fin = [];

    for (let el of data.feature) {
      // res.push(featureTypes.find((e) => el.id === e.id));
      res = featureTypes.find((e) => el.id === e.id)!;
      fin.push({
        name_feature: { id: res.id, name: res.feature },
        type: res.field_type,
        unit: res.unit,
        value_feature: [],
      });
    }
    // console.log("featureName", fin);
    result = {
      id: "",
      component: { id: data.component.id, name: nameComp.name },
      feature: fin,
    };
    // console.log("Out", result);
    return result;
  };

  const onSubmit = (data: any) => {
    const result = preLoadData(data);
    console.log(result);
    if (mode === typeModal.add) {
      // const ref = database.ref("featureSets/");
      // ref.push(result);
      // handleInsertFeatureSets(result);
    } else if (mode === typeModal.edit) {
    } else if (mode === typeModal.delete) {
    }
    handleClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <FormControl fullWidth sx={{ marginTop: "4px" }}>
              <InputLabel htmlFor="comp">
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

                    {/* <Controller
                      render={({ field }) => <input {...field} />}
                      name={`feature.${index}.name_feature`}
                      control={control}
                    />
                    <Button onClick={() => remove(index)}>Del</Button> */}
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отменить</Button>
            <Button color="success" type="submit">
              Записать
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
