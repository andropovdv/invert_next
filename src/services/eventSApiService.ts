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
import { IEvents } from "store/types/IEvents";

const db = getDatabase();
const refDB = ref(db, "events");

interface UpDate {
  [key: string]: IEvents;
}

export const eventSApi = {
  getEvents: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addEvents: async (payload: IEvents) => {
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
  editEvents: async (payload: IEvents) => {
    try {
      const updates = {} as UpDate;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeEvents: async (id: string) => {
    try {
      await remove(ref(db, `/events/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
