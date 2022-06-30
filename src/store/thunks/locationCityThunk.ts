import { locationCityApi } from "services/locationCityApiService";
import {
  getLocationCityStart,
  setLocationCityCount,
  setLocationCityError,
  setLocationCitySuccess,
} from "store/slices/locationCitySlice";
import { AppDispatch } from "store/store";
import { ILocationData } from "store/types/ILocations";

const convertor = (res: any): any[] => {
  return Object.keys(res).map((el: any) => res[el]);
};

export const fetchLocationCity = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getLocationCityStart());
    const res = await locationCityApi.getLoactionCity();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setLocationCitySuccess(convertor(res)));
    dispatch(setLocationCityCount(convertor(res).length));
  } catch (e) {
    dispatch(setLocationCityError((e as Error).message));
  }
};
export const insertLocationCity =
  (data: ILocationData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationCityStart());
      await locationCityApi.addLoactionCity(data);
      const res = await locationCityApi.getLoactionCity();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationCitySuccess(convertor(res)));
      dispatch(setLocationCityCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationCityError((e as Error).message));
    }
  };
export const editLocationCity =
  (data: ILocationData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationCityStart());
      await locationCityApi.editLoactionCity(data);
      const res = await locationCityApi.getLoactionCity();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationCitySuccess(convertor(res)));
      dispatch(setLocationCityCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationCityError((e as Error).message));
    }
  };
export const removeLocationCity =
  (data: ILocationData[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationCityStart());
      const query = data.map((el: ILocationData) =>
        locationCityApi.removeLoactionCity(el.id)
      );
      for (const element of query) {
        await element;
      }
      const res = await locationCityApi.getLoactionCity();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationCitySuccess(convertor(res)));
      dispatch(setLocationCityCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationCityError((e as Error).message));
    }
  };
