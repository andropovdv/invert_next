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
import { IComponent } from "store/types/IComponent";

const db = getDatabase();
const refDB = ref(db, "components/");

interface UpData {
  [key: string]: IComponent;
}

export const componentApi = {
  getComponents: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addComponents: async (payload: IComponent) => {
    try {
      const uud = v4();
      const data = { ...payload, id: uud };
      const updates = {} as UpData;
      updates["/" + uud] = data;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  editComponents: async (payload: IComponent) => {
    try {
      const updates = {} as UpData;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeComponents: async (id: string) => {
    try {
      await remove(ref(db, `/components/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
