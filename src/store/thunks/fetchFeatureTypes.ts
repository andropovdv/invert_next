import { FeatureTypesService } from "../../services/featureTypesService";
import { featureTypes } from "../slices/featuresTypesSlice";
import { AppDispatch } from "../store";
import { IFeatureTypes } from "../types/IFeatureTypes";

export const fetchFeaturesTypesApi =
  (page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureTypes.actions.getFeatureTypesStart());
      const res = await FeatureTypesService.getFeatureTypes(page, limit);
      const { data } = await FeatureTypesService.getAllFeatureTypes();
      if (res.status === 200) {
        dispatch(featureTypes.actions.getFeatureTypesSuccess(res.data));
        dispatch(featureTypes.actions.setFeatureTypesCount(data.length));
      } else {
        dispatch(
          featureTypes.actions.setFeatureTypesError("Загрузка не удалась")
        );
      }
    } catch (error) {
      dispatch(
        featureTypes.actions.setFeatureTypesError(
          "Some error from fetch featureTypes"
        )
      );
    }
  };

export const getCountFeatureTypes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(featureTypes.actions.getFeatureTypesStart());
    const { data } = await FeatureTypesService.getAllFeatureTypes();
    dispatch(featureTypes.actions.setFeatureTypesCount(data.length));
  } catch (e) {
    dispatch(
      featureTypes.actions.setFeatureTypesError(
        "Some error from fetch featureTypes"
      )
    );
  }
};

export const insertFeatureTypes =
  (data: IFeatureTypes, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureTypes.actions.getFeatureTypesStart());
      const uni = await FeatureTypesService.findFeatureTypesByFeature(data);
      if (uni.data.length !== 0) {
        dispatch(
          featureTypes.actions.setFeatureTypesError("Значение не уникально")
        );
        throw new Error("Значение не уникально");
      }
      const insert = await FeatureTypesService.insertFeatureTypes(data);
      if (insert.status === 201) {
        const res = await FeatureTypesService.getFeatureTypes(page, limit);
        if (res.status === 200) {
          dispatch(featureTypes.actions.getFeatureTypesSuccess(res.data));
          getCountFeatureTypes();
        } else {
          dispatch(
            featureTypes.actions.setFeatureTypesError("Запись не удалась")
          );
        }
      } else {
        dispatch(
          featureTypes.actions.setFeatureTypesError("Запись не удалась")
        );
      }
    } catch (error) {
      dispatch(
        featureTypes.actions.setFeatureTypesError((error as Error).message)
      );
    }
  };

export const editFeatureTypes =
  (data: IFeatureTypes, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureTypes.actions.getFeatureTypesStart());
      // TODO Нужна предварительная проверка на изменение поля feature и только после этого проверять уникальность
      // const uni = await FeatureTypesService.findFeatureTypesByFeature(data);
      // if (uni.data.length !== 0) {
      //   dispatch(
      //     featureTypes.actions.setFeatureTypesError("Значение не уникально")
      //   );
      //   throw new Error("Значение не уникально");
      // }
      const { status } = await FeatureTypesService.editFeatureTypes(data);
      if (status === 200) {
        const res = await FeatureTypesService.getFeatureTypes(page, limit);
        if (res.status === 200) {
          dispatch(featureTypes.actions.getFeatureTypesSuccess(res.data));
        } else {
          dispatch(
            featureTypes.actions.setFeatureTypesError("Загрузка на удалась")
          );
        }
      } else {
        dispatch(
          featureTypes.actions.setFeatureTypesError("Обновление не удалось")
        );
      }
    } catch (error) {
      dispatch(
        featureTypes.actions.setFeatureTypesError((error as Error).message)
      );
    }
  };

export const removeFeatureTypes =
  (data: IFeatureTypes[], page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureTypes.actions.getFeatureTypesStart());
      const query = data.map((el: IFeatureTypes) =>
        FeatureTypesService.deleteFeatureTypes(el.id)
      );

      for (const element of query) {
        let { status } = await element;
        if (status === 200) {
          const res = await FeatureTypesService.getFeatureTypes(page, limit);
          const { data } = await FeatureTypesService.getAllFeatureTypes();
          if (res.status === 200) {
            dispatch(featureTypes.actions.getFeatureTypesSuccess(res.data));
            dispatch(featureTypes.actions.setFeatureTypesCount(data.length));
          }
        } else {
          dispatch(
            featureTypes.actions.setFeatureTypesError("Загрузка не удалась")
          );
        }
      }
    } catch (error) {
      dispatch(
        featureTypes.actions.setFeatureTypesError((error as Error).message)
      );
    }
  };
