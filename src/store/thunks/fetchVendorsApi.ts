import { IVendor } from "./../types/IVendor";
import { VendorsService } from "./../../services/vendorsService";
import { vendors } from "../slices/vendorsSlice";
import { AppDispatch } from "./../store";

export const fetchVendorsApi =
  (page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(vendors.actions.getVendorStart());
      const res = await VendorsService.getVendrors(page, limit);
      const { data } = await VendorsService.getAllVendrors();
      if (res.status === 200) {
        // const count: number = res.data.length;
        dispatch(vendors.actions.getVendorSuccess(res.data));
        dispatch(vendors.actions.setVendorCount(data.length));
        // dispatch(vendors.actions.setVendorCount(count));
      } else {
        dispatch(vendors.actions.setVendorError("Загрузка не удалась"));
      }
    } catch (error) {
      dispatch(vendors.actions.setVendorError("Some error from fetch vendors"));
    }
  };

export const getCountVendors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(vendors.actions.getVendorStart());
    const { data } = await VendorsService.getAllVendrors();
    dispatch(vendors.actions.setVendorCount(data.length));
  } catch (error) {
    console.log(error);
  }
};

export const insertVendorApi =
  (data: IVendor, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(vendors.actions.getVendorStart());
      const uni = await VendorsService.findVendorByName(data);
      if (uni.data.length !== 0) {
        dispatch(vendors.actions.setVendorError("Значение не уникально"));
        throw new Error("Значение не уникально");
      }
      const insert = await VendorsService.insertVendor(data);
      if (insert.status === 201) {
        const res = await VendorsService.getVendrors(page, limit);
        if (res.status === 200) {
          dispatch(vendors.actions.getVendorSuccess(res.data));
          getCountVendors();
        } else {
          dispatch(vendors.actions.setVendorError("Загрузка не удалась"));
        }
      } else {
        dispatch(vendors.actions.setVendorError("Запись не удалась"));
      }
    } catch (e) {
      dispatch(vendors.actions.setVendorError((e as Error).message));
    }
  };

export const editVendorApi =
  (data: IVendor, page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(vendors.actions.getVendorStart());
      const { status } = await VendorsService.editVendor(data);
      if (status === 200) {
        const res = await VendorsService.getVendrors(page, limit);
        if (res.status === 200) {
          dispatch(vendors.actions.getVendorSuccess(res.data));
        } else {
          dispatch(vendors.actions.setVendorError("Загрузка не удалась"));
        }
      } else {
        dispatch(vendors.actions.setVendorError("Обновление не удалось"));
      }
    } catch (error) {
      dispatch(vendors.actions.setVendorError("Some error from edit vendors"));
    }
  };

export const removeVendorApi =
  (data: IVendor[], page?: number, limit: number = 10) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(vendors.actions.getVendorStart());
      const query = data.map((el: IVendor) =>
        VendorsService.deleteVendor(el.id)
      );

      for (const element of query) {
        let { status } = await element;
        if (status === 200) {
          const res = await VendorsService.getVendrors(page, limit);
          const { data } = await VendorsService.getAllVendrors();
          if (res.status === 200) {
            dispatch(vendors.actions.getVendorSuccess(res.data));
            dispatch(vendors.actions.setVendorCount(data.length));
          } else {
            dispatch(vendors.actions.setVendorError("Загрузка не удалась"));
          }
        } else {
          dispatch(vendors.actions.setVendorError("Удаление не удалось"));
        }
      }
    } catch (error) {
      dispatch(vendors.actions.setVendorError("Some error from remove endors"));
    }
  };
