import { locationApi } from "services/locationApiService";
import {
  getLocationStart,
  setLocationCount,
  setLocationError,
  setLocationSuccess,
} from "store/slices/locationSlice";
import { AppDispatch } from "store/store";
import { ILocation } from "store/types/ILocations";

const convertor = (res: any): any[] => {
  return Object.keys(res).map((el: any) => res[el]);
};

export const fetchLocations = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getLocationStart());
    const res = await locationApi.getLocation();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setLocationSuccess(convertor(res)));
    dispatch(setLocationCount(convertor(res).length));
  } catch (e) {
    dispatch(setLocationError((e as Error).message));
  }
};

export const insertLocations =
  (data: ILocation) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationStart());
      await locationApi.addLocation(data);
      const res = await locationApi.getLocation();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationSuccess(convertor(res)));
      dispatch(setLocationCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationError((e as Error).message));
    }
  };

export const editLocations =
  (data: ILocation) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationStart());
      await locationApi.editLocation(data);
      const res = await locationApi.getLocation();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationSuccess(convertor(res)));
      dispatch(setLocationCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationError((e as Error).message));
    }
  };

export const removeLocations =
  (data: ILocation[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationStart());
      const query = data.map((el: ILocation) =>
        locationApi.removeLocation(el.id)
      );
      for (const element of query) {
        await element;
      }
      const res = await locationApi.getLocation();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationSuccess(convertor(res)));
      dispatch(setLocationCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationError((e as Error).message));
    }
  };
