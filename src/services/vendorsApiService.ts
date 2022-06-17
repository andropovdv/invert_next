import "../firebase";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";
import { v4 } from "uuid";
import { IVendor } from "store/types/IVendor";
import { vendorsData } from "dataUpload/vendors";

const db = getDatabase();
const refDB = ref(db, "vendors/");
const newId = v4();

interface UpData {
  [key: string]: IVendor;
}

export const vendorApi = {
  fillVendors: async () => {
    let updates = {} as UpData;
    vendorsData.forEach((el) => {
      const uud = v4();
      const data = { ...el, id: uud };
      // const updates = {} as UpData;
      updates[`/${uud}`] = data;
      // update(refDB, updates);
    });
    // console.log("updates: ", updates);
    update(refDB, updates);
  },
  getVendor: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addVendor: async (payload: IVendor) => {
    try {
      const data = { ...payload, id: newId };
      const updates = {} as UpData;
      updates["/" + newId] = data;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  editVendor: async (payload: IVendor) => {
    try {
      const updates = {} as UpData;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeVendor: async (id: string) => {
    try {
      await remove(ref(db, `/vendors/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
