import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";
import { IEvent } from "store/types/IEvent";
import "../firebase";
import { v4 } from "uuid";

const db = getDatabase();
const refDB = ref(db, "events/");

interface UpDate {
  [key: string]: IEvent;
}

export const eventApi = {
  getEvent: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addEvent: async (payload: IEvent) => {
    try {
      const uud = v4();
      const data = { ...payload, id: uud };
      const updates = {} as UpDate;
      updates["/" + uud] = data;
      await update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  editEvent: async (payload: IEvent) => {
    try {
      const updates = {} as UpDate;
      updates[`/${payload.id}`] = payload;
      await update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeEvent: async (id: string) => {
    try {
      await remove(ref(db, `/events/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
