import { eventSApi } from "services/eventSApiService";
import {
  getEventsStart,
  setEventsCount,
  setEventsError,
  setEventsSuccess,
} from "store/slices/eventSSlice";
import { AppDispatch } from "store/store";
import { IEvents } from "store/types/IEvents";

const convertor = (res: any): any[] => {
  return Object.keys(res).map((el: any) => res[el]);
};

export const fetchEvents = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getEventsStart());
    const res = await eventSApi.getEvents();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setEventsSuccess(convertor(res)));
    dispatch(setEventsCount(convertor(res).length));
  } catch (e) {
    dispatch(setEventsError((e as Error).message));
  }
};

export const insertEvents =
  (data: IEvents) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getEventsStart());
      await eventSApi.addEvents(data);
      const res = await eventSApi.getEvents();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setEventsSuccess(convertor(res)));
      dispatch(setEventsCount(convertor(res).length));
    } catch (e) {
      dispatch(setEventsError((e as Error).message));
    }
  };

export const editEvents = (data: IEvents) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getEventsStart());
    await eventSApi.editEvents(data);
    const res = await eventSApi.getEvents();
    if (!res) {
      throw new Error("Данные не получены");
    }
    dispatch(setEventsSuccess(convertor(res)));
    dispatch(setEventsCount(convertor(res).length));
  } catch (e) {
    dispatch(setEventsError((e as Error).message));
  }
};

export const removeEvents =
  (data: IEvents[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getEventsStart());
      const query = data.map((el: IEvents) => eventSApi.removeEvents(el.id));
      for (const element of query) {
        await element;
      }
      const res = await eventSApi.getEvents();
      if (!res) {
        throw new Error("Данные не получены");
      }
      dispatch(setEventsSuccess(convertor(res)));
      dispatch(setEventsCount(convertor(res).length));
    } catch (e) {
      dispatch(setEventsError((e as Error).message));
    }
  };
