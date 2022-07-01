import { statusApi } from "services/statusApiService";
import {
  getStatusStart,
  setStatusCount,
  setStatusError,
  setStatusSuccess,
} from "store/slices/statusSlice";
import { AppDispatch } from "store/store";
import { IStatus } from "store/types/IStatus";

const convertor = (res: any): any[] => {
  return Object.keys(res).map((el: any) => res[el]);
};

export const fetchStatus = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getStatusStart());
    const res = await statusApi.getStatus();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setStatusSuccess(convertor(res)));
    dispatch(setStatusCount(convertor(res).length));
  } catch (e) {
    dispatch(setStatusError((e as Error).message));
  }
};

export const insertStatus =
  (data: IStatus) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getStatusStart());
      await statusApi.addStatus(data);
      const res = await statusApi.getStatus();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setStatusSuccess(convertor(res)));
      dispatch(setStatusCount(convertor(res).length));
    } catch (e) {
      dispatch(setStatusError((e as Error).message));
    }
  };

export const editStatus = (data: IStatus) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getStatusStart());
    await statusApi.editStatus(data);
    const res = await statusApi.getStatus();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setStatusSuccess(convertor(res)));
    dispatch(setStatusCount(convertor(res).length));
  } catch (e) {
    dispatch(setStatusError((e as Error).message));
  }
};

export const removeStatus =
  (data: IStatus[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getStatusStart());
      const query = data.map((el: IStatus) => statusApi.removeStatus(el.id));
      for (const element of query) {
        await element;
      }
      const res = await statusApi.getStatus();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setStatusSuccess(convertor(res)));
      dispatch(setStatusCount(convertor(res).length));
    } catch (e) {
      dispatch(setStatusError((e as Error).message));
    }
  };
