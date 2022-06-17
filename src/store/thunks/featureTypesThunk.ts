import { featureTypesApi } from "services/featureTypesApiService";
import {
  getFeatureTypesStart,
  setFeatureTypesCount,
  setFeatureTypesError,
  setFeatureTypesSuccess,
} from "store/slices/featuresTypesSlice";
import { AppDispatch } from "store/store";
import { IFeatureTypes } from "store/types/IFeatureTypes";

export const fetchFeaturesTypes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getFeatureTypesStart());
    const res = await featureTypesApi.getFeatureSets();
    const listObject = Object.keys(res).map((el: any) => res[el]);
    if (res) {
      dispatch(setFeatureTypesSuccess(listObject));
      dispatch(setFeatureTypesCount(listObject.length));
    } else {
      dispatch(setFeatureTypesError("Загрузка не удалась"));
    }
  } catch (error) {
    dispatch(setFeatureTypesError("Some error from fetch featureTypes"));
  }
};

export const insertFeatureTypes =
  (data: IFeatureTypes) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getFeatureTypesStart());
      await featureTypesApi.addFeatureSets(data);
      const res = await featureTypesApi.getFeatureSets();
      if (res) {
        let listObject = [] as IFeatureTypes[];
        listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setFeatureTypesSuccess(listObject));
        dispatch(setFeatureTypesCount(listObject.length));
      } else {
        dispatch(setFeatureTypesError("Запись не удалась"));
      }
    } catch (error) {
      dispatch(setFeatureTypesError((error as Error).message));
    }
  };

export const editFeatureTypes =
  (data: IFeatureTypes) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getFeatureTypesStart());
      await featureTypesApi.editFeatureSets(data);
      const res = await featureTypesApi.getFeatureSets();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setFeatureTypesSuccess(listObject));
        dispatch(setFeatureTypesCount(listObject.length));
      } else {
        dispatch(setFeatureTypesError("Обновление не удалось"));
      }
    } catch (error) {
      dispatch(setFeatureTypesError((error as Error).message));
    }
  };

export const removeFeatureTypes =
  (data: IFeatureTypes[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getFeatureTypesStart());
      const query = data.map((el: IFeatureTypes) =>
        featureTypesApi.removeFeatureSets(el.id)
      );

      for (const element of query) {
        await element;
      }
      const res = await featureTypesApi.getFeatureSets();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setFeatureTypesSuccess(listObject));
        dispatch(setFeatureTypesCount(listObject.length));
      } else {
        dispatch(setFeatureTypesError("Удаление не удалось"));
      }
    } catch (error) {
      dispatch(setFeatureTypesError((error as Error).message));
    }
  };

export const fillFeatureSets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getFeatureTypesStart());
    await featureTypesApi.fillFeatureSets();
    const res = await featureTypesApi.getFeatureSets();
    if (res) {
      const listObject = Object.keys(res).map((el: any) => res[el]);
      dispatch(setFeatureTypesSuccess(listObject));
    }
  } catch (e) {
    dispatch(setFeatureTypesError((e as Error).message));
  }
};
