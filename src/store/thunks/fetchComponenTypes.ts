import { componentTypesSlice } from "./../slices/componentTypesSlice";
import { ComponentTypesService } from "./../../services/componentTypesService";
import { AppDispatch } from "./../store";
import { IComponentType } from "../types/IComponentTypes";

export const fetchComponentTypes =
  (page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(componentTypesSlice.actions.getComponentTypesStart());
      const res = await ComponentTypesService.getComponentTypes(page, limit);
      const { data } = await ComponentTypesService.getAllComponentTypes();
      if (res.status === 200) {
        dispatch(
          componentTypesSlice.actions.getComponentTypesSuccess(res.data)
        );
        dispatch(
          componentTypesSlice.actions.setComponentTypesCount(data.length)
        );
      } else {
        dispatch(
          componentTypesSlice.actions.setComponentTypesError(
            "Загрузка не удалась"
          )
        );
      }
    } catch (e) {
      dispatch(
        componentTypesSlice.actions.setComponentTypesError((e as Error).message)
      );
    }
  };

export const getCountComponentTypes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(componentTypesSlice.actions.getComponentTypesStart());
    const { data } = await ComponentTypesService.getAllComponentTypes();
    dispatch(componentTypesSlice.actions.setComponentTypesCount(data.length));
  } catch (e) {
    dispatch(
      componentTypesSlice.actions.setComponentTypesError((e as Error).message)
    );
  }
};

export const insertComponentTypes =
  (data: IComponentType, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(componentTypesSlice.actions.getComponentTypesStart());
      const uni = await ComponentTypesService.findTypeByName(data);
      if (uni.data.length !== 0) {
        // FIXME а насколько нужено два раза писать ошибку
        dispatch(
          componentTypesSlice.actions.setComponentTypesError(
            "Значение не уникально"
          )
        );
        throw new Error("Значение не уникально");
      }
      const insert = await ComponentTypesService.insertComponentTypes(data);
      if (insert.status === 201) {
        const res = await ComponentTypesService.getComponentTypes(page, limit);
        if (res.status === 200) {
          dispatch(
            componentTypesSlice.actions.getComponentTypesSuccess(res.data)
          );
          getCountComponentTypes();
        } else {
          dispatch(
            componentTypesSlice.actions.setComponentTypesError(
              "Загрузка не удалась"
            )
          );
        }
      } else {
        dispatch(
          componentTypesSlice.actions.setComponentTypesError(
            "Запись не удалась"
          )
        );
      }
    } catch (e) {
      dispatch(
        componentTypesSlice.actions.setComponentTypesError((e as Error).message)
      );
    }
  };

export const editComponentTypes =
  (data: IComponentType, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(componentTypesSlice.actions.getComponentTypesStart());
      const { status } = await ComponentTypesService.editComponentTypes(data);
      if (status === 200) {
        const res = await ComponentTypesService.getComponentTypes(page, limit);
        if (res.status === 200) {
          dispatch(
            componentTypesSlice.actions.getComponentTypesSuccess(res.data)
          );
        } else {
          dispatch(
            componentTypesSlice.actions.setComponentTypesError(
              "Загрузка на удалась"
            )
          );
        }
      } else {
        dispatch(
          componentTypesSlice.actions.setComponentTypesError(
            "Обновление не удалось"
          )
        );
      }
    } catch (e) {
      dispatch(
        componentTypesSlice.actions.setComponentTypesError((e as Error).message)
      );
    }
  };

export const removeComponentTypes =
  (data: IComponentType[], page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(componentTypesSlice.actions.getComponentTypesStart());
      const query = data.map((el: IComponentType) =>
        ComponentTypesService.removeComponentTypes(el.id)
      );

      for (const element of query) {
        let { status } = await element;
        if (status === 200) {
          const res = await ComponentTypesService.getComponentTypes(
            page,
            limit
          );
          const { data } = await ComponentTypesService.getAllComponentTypes();
          if (res.status === 200) {
            dispatch(
              componentTypesSlice.actions.getComponentTypesSuccess(res.data)
            );
            dispatch(
              componentTypesSlice.actions.setComponentTypesCount(data.length)
            );
          } else {
            dispatch(
              componentTypesSlice.actions.setComponentTypesError(
                "Загрузка не удалась"
              )
            );
          }
        } else {
          dispatch(
            componentTypesSlice.actions.setComponentTypesError(
              "Удаление не удалось"
            )
          );
        }
      }
    } catch (e) {
      dispatch(
        componentTypesSlice.actions.setComponentTypesError((e as Error).message)
      );
    }
  };
