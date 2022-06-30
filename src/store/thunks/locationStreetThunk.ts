import { locationStreetApi } from "services/locationStreetApiService";
import {
  getLocationStreetStart,
  setLocationStreetCount,
  setLocationStreetError,
  setLocationStreetSuccess,
} from "store/slices/locationStreetSlice";

import { AppDispatch } from "store/store";
import { ILocationData } from "store/types/ILocations";

const convertor = (res: any): any[] => {
  return Object.keys(res).map((el: any) => res[el]);
};

export const fetchLocationStreet = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getLocationStreetStart());
    const res = await locationStreetApi.getLocationStreet();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setLocationStreetSuccess(convertor(res)));
    dispatch(setLocationStreetCount(convertor(res).length));
  } catch (e) {
    dispatch(setLocationStreetError((e as Error).message));
  }
};

export const insertLocationStreet =
  (data: ILocationData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationStreetStart());
      await locationStreetApi.addLocationStreet(data);
      const res = await locationStreetApi.getLocationStreet();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationStreetSuccess(convertor(res)));
      dispatch(setLocationStreetCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationStreetError((e as Error).message));
    }
  };

export const editLocationStreet =
  (data: ILocationData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationStreetStart());
      await locationStreetApi.editLocationStreet(data);
      const res = await locationStreetApi.getLocationStreet();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationStreetSuccess(convertor(res)));
      dispatch(setLocationStreetCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationStreetError((e as Error).message));
    }
  };

export const removeLocationStreet =
  (data: ILocationData[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getLocationStreetStart());
      const query = data.map((el: ILocationData) =>
        locationStreetApi.removeLocationStreet(el.id)
      );
      for (const element of query) {
        await element;
      }
      const res = await locationStreetApi.getLocationStreet();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setLocationStreetSuccess(convertor(res)));
      dispatch(setLocationStreetCount(convertor(res).length));
    } catch (e) {
      dispatch(setLocationStreetError((e as Error).message));
    }
  };
