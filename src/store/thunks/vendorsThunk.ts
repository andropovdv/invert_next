import { IVendor } from "store/types/IVendor";
import {
  getVendorStart,
  setVendorSuccess,
  setVendorError,
  setVendorCount,
} from "../slices/vendorsSlice";
import { vendorApi } from "services/vendorsApiService";
import { AppDispatch } from "../store";

export const fetchVendors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getVendorStart());
    const res = await vendorApi.getVendor();
    const listObject = Object.keys(res).map((el: any) => res[el]);
    if (res) {
      dispatch(setVendorCount(listObject.length));
      dispatch(setVendorSuccess(listObject));
    } else {
      dispatch(setVendorError("Загрузка не удалась"));
    }
  } catch (error) {
    dispatch(setVendorError("Some error from fetch vendors"));
  }
};
export const fillVendor = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getVendorStart());
    await vendorApi.fillVendors();
    const res = await vendorApi.getVendor();
    const listObject = Object.keys(res).map((el: any) => res[el]);
    if (res) {
      dispatch(setVendorSuccess(listObject));
    }
  } catch (e) {
    dispatch(setVendorError("Some error from full vendors"));
  }
};
// TODO проработать кол-во записей в ответе сервера
// export const getCountVendors = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(getVendorStart());
//     const { data } = await VendorsService.getAllVendrors();
//     dispatch(setVendorCount(data.length));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const insertVendorApi =
  (data: IVendor) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getVendorStart());

      await vendorApi.addVendor(data);
      const res = await vendorApi.getVendor();
      if (res) {
        let listObject = [] as IVendor[];
        listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setVendorSuccess(listObject));
        dispatch(setVendorCount(listObject.length));
      } else {
        dispatch(setVendorError("Запись не удалась"));
      }
    } catch (e) {
      dispatch(setVendorError((e as Error).message));
    }
  };

export const editVendorApi =
  (data: IVendor) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getVendorStart());
      await vendorApi.editVendor(data);
      const res = await vendorApi.getVendor();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setVendorSuccess(listObject));
        dispatch(setVendorCount(listObject.length));
      } else {
        dispatch(setVendorError("Запись не удалась"));
      }
    } catch (error) {
      dispatch(setVendorError("Some error from edit vendors"));
    }
  };

export const removeVendorApi =
  (data: IVendor[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getVendorStart());
      const query = data.map((el: IVendor) => vendorApi.removeVendor(el.id));

      for (const element of query) {
        await element;
      }
      const res = await vendorApi.getVendor();
      if (res) {
        const listObject = Object.keys(res).map((el: any) => res[el]);
        dispatch(setVendorSuccess(listObject));
        dispatch(setVendorCount(listObject.length));
      } else {
        dispatch(setVendorError("Удаление не удалось"));
      }
    } catch (error) {
      dispatch(setVendorError("Some error from remove endors"));
    }
  };
