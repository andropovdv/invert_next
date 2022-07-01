import { eventApi } from "services/eventApiService";
import {
  getEventStart,
  setEventCount,
  setEventError,
  setEventSuccess,
} from "store/slices/eventSlice";
import { AppDispatch } from "store/store";
import { IEvent } from "store/types/IEvent";

const convertor = (res: any): any[] => {
  return Object.keys(res).map((el: any) => res[el]);
};

export const fetchEvent = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getEventStart());
    const res = await eventApi.getEvent();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setEventSuccess(convertor(res)));
    dispatch(setEventCount(convertor(res).length));
  } catch (e) {
    dispatch(setEventError((e as Error).message));
  }
};

export const insertEvent = (data: IEvent) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getEventStart());
    await eventApi.addEvent(data);
    const res = await eventApi.getEvent();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setEventSuccess(convertor(res)));
    dispatch(setEventCount(convertor(res).length));
  } catch (e) {
    dispatch(setEventError((e as Error).message));
  }
};

export const editEvent = (data: IEvent) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getEventStart());
    await eventApi.editEvent(data);
    const res = await eventApi.getEvent();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setEventSuccess(convertor(res)));
    dispatch(setEventCount(convertor(res).length));
  } catch (e) {
    dispatch(setEventError((e as Error).message));
  }
};

export const removeEvent =
  (data: IEvent[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getEventStart());
      const query = data.map((el: IEvent) => eventApi.removeEvent(el.id));
      for (const element of query) {
        await element;
      }
      const res = await eventApi.getEvent();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setEventSuccess(convertor(res)));
      dispatch(setEventCount(convertor(res).length));
    } catch (e) {
      dispatch(setEventError((e as Error).message));
    }
  };
