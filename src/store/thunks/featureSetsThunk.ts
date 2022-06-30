import { featureSetsApi } from "services/featureSetsApiService";
import {
  getFeatureSetsStart,
  setFeatureSetsCount,
  setFeatureSetsError,
  setFeatureSetsSuccess,
} from "store/slices/featureSetsSlice";
import { AppDispatch, AppStore } from "store/store";
import { IFeature, IFeatureSets } from "store/types/IFeatureSets";
import clonedeep from "lodash.clonedeep";

export interface IValuesChip {
  item: string;
  row: IFeatureSets;
  idNameFeature: string;
}

export const fetchFeatureSets =
  (id?: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getFeatureSetsStart());
      let res: any;
      if (id) {
        res = await featureSetsApi.getFeatureSetById(id);
      } else {
        res = await featureSetsApi.getFeatureSets();
      }
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setFeatureSetsSuccess(listObject));
        dispatch(setFeatureSetsCount(listObject.length));
      } else {
        dispatch(setFeatureSetsError("Загрузка не удалась"));
      }
    } catch (e) {
      dispatch(setFeatureSetsError((e as Error).message));
    }
  };

export const insertFeatureSets =
  (data: IFeatureSets) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getFeatureSetsStart());
      await featureSetsApi.addFeatureSets(data);
      const res = await featureSetsApi.getFeatureSets();
      if (res) {
        let listObject = [] as IFeatureSets[];
        listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setFeatureSetsSuccess(listObject));
        dispatch(setFeatureSetsCount(listObject.length));
      } else {
        throw new Error("Запись не удалась");
      }
    } catch (e) {
      dispatch(setFeatureSetsError((e as Error).message));
    }
  };

export const editFeatureSets =
  (data: IFeatureSets, reload: boolean = true) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(getFeatureSetsStart());
      await featureSetsApi.editFeatureSets(data);
      if (reload) {
        const res = await featureSetsApi.getFeatureSets();
        if (res) {
          const listObject = Object.keys(res).map((el: any) => res[el]);
          dispatch(setFeatureSetsSuccess(listObject));
          dispatch(setFeatureSetsCount(listObject.length));
        } else {
          throw new Error("Обновление не удалось");
        }
      }
    } catch (e) {
      dispatch(setFeatureSetsError((e as Error).message));
    }
  };

export const removeFeatureSets =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getFeatureSetsStart());
      await featureSetsApi.removeFeatureSets(id);
      const res = await featureSetsApi.getFeatureSets();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setFeatureSetsSuccess(listObject));
        dispatch(setFeatureSetsCount(listObject.length));
      } else {
        throw new Error("удаление не удалось");
      }
    } catch (e) {
      dispatch(setFeatureSetsError((e as Error).message));
    }
  };

export const fillFeatureSets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getFeatureSetsStart());
    await featureSetsApi.fillFeatureSets();
    const res = await featureSetsApi.getFeatureSets();
    if (res) {
      const listObject = Object.keys(res).map((el: any) => res[el]);
      dispatch(setFeatureSetsSuccess(listObject));
    }
  } catch (e) {
    dispatch(setFeatureSetsError((e as Error).message));
  }
};

export const handleEditValueFeatureSet =
  (item: string, row: IFeatureSets, idNameFeature: string) =>
  (dispatch: AppDispatch, getState: AppStore) => {
    const state = getState();

    const indexFeature = row.feature.findIndex(
      (el: IFeature) => el.name_feature.id === idNameFeature
    );

    const arr = [...row.feature[indexFeature].value_feature];
    const idx = arr.indexOf(item);
    if (!(idx === -1)) {
      arr.splice(idx, 1);
    }

    const { copyRow, copyFeatureSet } = changeFeatureValue(
      state,
      row,
      indexFeature,
      arr
    );

    dispatch(editFeatureSets(copyRow, false));
    dispatch(setFeatureSetsSuccess(copyFeatureSet));
  };

export const handleAddValueFeature =
  (data: IValuesChip) => (dispatch: AppDispatch, getState: AppStore) => {
    console.log(data);
    const { item, row, idNameFeature } = data;

    const state = getState();

    const indexFeature = row.feature.findIndex(
      (el: IFeature) => el.name_feature.id === idNameFeature
    );

    const postData = item.toLowerCase().trim();
    const postData1 = postData.charAt(0).toUpperCase() + postData.slice(1);

    let arr: string[] = [];
    let uni: string | undefined;
    if (row.feature[indexFeature].value_feature) {
      arr = [...row.feature[indexFeature].value_feature];
      uni = arr.find((el) => el === postData1);
    }

    if (!uni) {
      arr.push(postData1);
    } else {
      dispatch(setFeatureSetsError(" Не уникально"));
    }

    const { copyRow, copyFeatureSet } = changeFeatureValue(
      state,
      row,
      indexFeature,
      arr
    );

    dispatch(editFeatureSets(copyRow, false));
    dispatch(setFeatureSetsSuccess(copyFeatureSet));
  };

const changeFeatureValue = (
  state: any,
  row: IFeatureSets,
  indexFeature: number,
  arr: string[]
) => {
  let featureItem: IFeature = {} as IFeature;

  if (indexFeature !== undefined && state.featureSetsSlice.current) {
    featureItem = {
      name_feature: {
        id: row.feature[indexFeature].name_feature.id,
        name: row.feature[indexFeature].name_feature.name,
      },
      type: row.feature[indexFeature].type,
      unit: row.feature[indexFeature].unit,
      value_feature: arr,
    };
  }

  const copyRow = clonedeep(row);
  copyRow.feature[indexFeature] = featureItem;

  const copyFeatureSet = clonedeep(state.featureSetsSlice.featureSets);
  copyFeatureSet.find((el: any) => el.id === row.id)!.feature[indexFeature] =
    featureItem;

  return { copyRow, copyFeatureSet };
};
