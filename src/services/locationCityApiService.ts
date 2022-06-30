import "../firebase";
import { v4 } from "uuid";
import { ILocationData } from "store/types/ILocations";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";

const db = getDatabase();
const refDB = ref(db, "locationCity/");

interface UpDate {
  [key: string]: ILocationData;
}

export const locationCityApi = {
  getLoactionCity: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addLoactionCity: async (payload: ILocationData) => {
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
  editLoactionCity: async (payload: ILocationData) => {
    try {
      const updates = {} as UpDate;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeLoactionCity: async (id: string) => {
    try {
      await remove(ref(db, `/locationCity/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
