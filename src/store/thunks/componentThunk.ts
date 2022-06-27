import { componentApi } from "services/componentApiService";
import {
  getComponentStart,
  setComponentCount,
  setComponentError,
  setComponentSuccess,
} from "store/slices/componentsSlice";
import { AppDispatch } from "store/store";
import { IComponent } from "store/types/IComponent";

const convertor = (res: any): any[] => {
  return Object.keys(res).map((el: any) => res[el]);
};

export const getComponent = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getComponentStart());
    const res = await componentApi.getComponents();
    if (res) {
      dispatch(setComponentSuccess(convertor(res)));
      dispatch(setComponentCount(convertor(res).length));
    }
  } catch (e) {
    dispatch(setComponentError((e as Error).message));
  }
};

export const insertComponent =
  (data: IComponent) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getComponentStart());
      await componentApi.addComponents(data);
      const res = await componentApi.getComponents();
      if (res) {
        dispatch(setComponentSuccess(convertor(res)));
        dispatch(setComponentCount(convertor(res).length));
      }
    } catch (e) {
      dispatch(setComponentError((e as Error).message));
    }
  };

export const editComponent =
  (data: IComponent) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getComponentStart());
      await componentApi.editComponents(data);
      const res = await componentApi.getComponents();
      if (res) {
        dispatch(setComponentSuccess(convertor(res)));
        dispatch(setComponentCount(convertor(res).length));
      }
    } catch (e) {
      dispatch(setComponentError((e as Error).message));
    }
  };

export const removeComponent =
  (data: IComponent[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getComponentStart());
      const query = data.map((el: IComponent) =>
        componentApi.removeComponents(el.id)
      );
      for (const element of query) {
        await element;
      }
      const res = await componentApi.getComponents();
      if (res) {
        dispatch(setComponentSuccess(convertor(res)));
        dispatch(setComponentCount(convertor(res).length));
      }
    } catch (e) {
      dispatch(setComponentError((e as Error).message));
    }
  };
