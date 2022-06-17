import { componentTypesApi } from "services/componentTypesApiService";
import {
  getComponentTypesStart,
  setComponentTypesCount,
  setComponentTypesError,
  setComponentTypesSuccess,
} from "store/slices/componentTypesSlice";
import { AppDispatch } from "store/store";
import { IComponentType } from "store/types/IComponentTypes";

export const fetchComponentTypes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getComponentTypesStart());
    const res = await componentTypesApi.getComponentTypes();
    const listObject = Object.keys(res).map((el: any) => res[el]);
    if (res) {
      dispatch(setComponentTypesSuccess(listObject));
      dispatch(setComponentTypesCount(listObject.length));
    } else {
      dispatch(setComponentTypesError("Загрузка не удалась"));
    }
  } catch (e) {
    dispatch(setComponentTypesError((e as Error).message));
  }
};

export const insertComponentTypes =
  (data: IComponentType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getComponentTypesStart());

      await componentTypesApi.addComponentTypes(data);
      const res = await componentTypesApi.getComponentTypes();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setComponentTypesSuccess(listObject));
        dispatch(setComponentTypesCount(listObject.length));
      } else {
        dispatch(setComponentTypesError("Загрузка не удалась"));
      }
    } catch (e) {
      dispatch(setComponentTypesError((e as Error).message));
    }
  };

export const editComponentTypes =
  (data: IComponentType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getComponentTypesStart());
      await componentTypesApi.editComponentTypes(data);
      const res = await componentTypesApi.getComponentTypes();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setComponentTypesSuccess(listObject));
        dispatch(setComponentTypesCount(listObject.length));
      } else {
        dispatch(setComponentTypesError("Обновление не удалось"));
      }
    } catch (e) {
      dispatch(setComponentTypesError((e as Error).message));
    }
  };

export const removeComponentTypes =
  (data: IComponentType[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getComponentTypesStart());
      const query = data.map((el: IComponentType) =>
        componentTypesApi.removeComponentTypes(el.id)
      );

      for (const element of query) {
        await element;
      }
      const res = await componentTypesApi.getComponentTypes();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setComponentTypesSuccess(listObject));
        dispatch(setComponentTypesCount(listObject.length));
      }
    } catch (e) {
      dispatch(setComponentTypesError((e as Error).message));
    }
  };
