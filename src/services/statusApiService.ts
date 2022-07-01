import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";
import { IStatus } from "store/types/IStatus";
import "../firebase";
import { v4 } from "uuid";

const db = getDatabase();
const refDB = ref(db, "status/");

interface UpDate {
  [key: string]: IStatus;
}

export const statusApi = {
  getStatus: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addStatus: async (payload: IStatus) => {
    try {
      const uud = v4();
      const data = { ...payload, id: uud };
      const updates = {} as UpDate;
      updates["/" + uud] = data;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  editStatus: async (payload: IStatus) => {
    try {
      const updates = {} as UpDate;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeStatus: async (id: string) => {
    try {
      await remove(ref(db, `/status/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
