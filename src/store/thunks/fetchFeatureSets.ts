import { FeatureSetsService } from "./../../services/featureSetsService";
import { featureSetsSlice } from "./../slices/featureSetsSlice";
import { AppDispatch } from "../store";
import { IFeatureSets } from "../types/IFeatureSets";

export const fetchFeatureSets =
  (page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureSetsSlice.actions.getFeatureSetsStart());
      const res = await FeatureSetsService.getFeatureSets(page, limit);
      const { data } = await FeatureSetsService.getAllFeatureSets();
      if (res.status === 200) {
        dispatch(featureSetsSlice.actions.getFeatureSetsSuccess(res.data));
        dispatch(featureSetsSlice.actions.setFeatureSetsCount(data.length));
      } else {
        dispatch(
          featureSetsSlice.actions.setFeatureSetsError("Загрузка не удалась")
        );
      }
    } catch (e) {
      dispatch(
        featureSetsSlice.actions.setFeatureSetsError((e as Error).message)
      );
    }
  };

export const getCountFeatureSets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(featureSetsSlice.actions.getFeatureSetsStart());
    const { data } = await FeatureSetsService.getAllFeatureSets();
    dispatch(featureSetsSlice.actions.setFeatureSetsCount(data.length));
  } catch (e) {
    dispatch(
      featureSetsSlice.actions.setFeatureSetsError((e as Error).message)
    );
  }
};

export const insertFeatureSets =
  (data: IFeatureSets, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureSetsSlice.actions.getFeatureSetsStart());
      //* const uni = await FeatureSetsService.findFeatureSetsByComponent(data);
      //* if (uni.data.length !== 0) {
      //*   throw new Error("Значение не уникально");
      //* }
      const { status } = await FeatureSetsService.insertFeatureSets(data);
      if (status === 201) {
        const { data, status } = await FeatureSetsService.getFeatureSets(
          page,
          limit
        );
        if (status === 200) {
          dispatch(featureSetsSlice.actions.getFeatureSetsSuccess(data));
        } else {
          throw new Error("Загрузка не удалась");
        }
      } else {
        throw new Error("Запись не удалась");
      }
    } catch (e) {
      dispatch(
        featureSetsSlice.actions.setFeatureSetsError((e as Error).message)
      );
    }
  };

export const editFeatureSets =
  (data: IFeatureSets, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureSetsSlice.actions.getFeatureSetsStart());
      const { status } = await FeatureSetsService.editFeatureSets(data);
      if (status === 200) {
        const { data, status } = await FeatureSetsService.getFeatureSets(
          page,
          limit
        );
        if (status === 200) {
          dispatch(featureSetsSlice.actions.getFeatureSetsSuccess(data));
        } else {
          throw new Error("Загрузка на удалась");
        }
      } else {
        throw new Error("Обновление не удалось");
      }
    } catch (e) {
      dispatch(
        featureSetsSlice.actions.setFeatureSetsError((e as Error).message)
      );
    }
  };

export const removeFeatureSets =
  (data: IFeatureSets[], page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(featureSetsSlice.actions.getFeatureSetsStart());
      const query = data.map((el: IFeatureSets) =>
        FeatureSetsService.removeFeatureSets(el.id)
      );
      for (const element of query) {
        let { status } = await element;
        if (status === 200) {
          const res = await FeatureSetsService.getFeatureSets(page, limit);
          const { data } = await FeatureSetsService.getAllFeatureSets();
          if (res.status === 200) {
            dispatch(featureSetsSlice.actions.getFeatureSetsSuccess(res.data));
            dispatch(featureSetsSlice.actions.setFeatureSetsCount(data.length));
          } else {
            throw new Error("Загрузка не удалась");
          }
        } else {
          throw new Error("Удаление не удалось");
        }
      }
    } catch (e) {
      dispatch(
        featureSetsSlice.actions.setFeatureSetsError((e as Error).message)
      );
    }
  };
