import "../firebase";
import { v4 } from "uuid";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";
import { ILocationData } from "store/types/ILocations";

const db = getDatabase();
const refDB = ref(db, "locationStreet/");

interface UpDate {
  [key: string]: ILocationData;
}

export const locationStreetApi = {
  getLocationStreet: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addLocationStreet: async (payload: ILocationData) => {
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
  editLocationStreet: async (payload: ILocationData) => {
    try {
      const updates = {} as UpDate;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeLocationStreet: async (id: string) => {
    try {
      await remove(ref(db, `/locationStreet/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
