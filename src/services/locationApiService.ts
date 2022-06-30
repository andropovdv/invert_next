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
import { ILocation } from "store/types/ILocations";

const db = getDatabase();
const refDB = ref(db, "locations/");

interface UpDate {
  [key: string]: ILocation;
}

export const locationApi = {
  getLocation: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addLocation: async (payload: ILocation) => {
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
  editLocation: async (payload: ILocation) => {
    try {
      const updates = {} as UpDate;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeLocation: async (id: string) => {
    try {
      await remove(ref(db, `/locations/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
