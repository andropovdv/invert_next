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
import { IComponentType } from "store/types/IComponentTypes";
import { componentTypesData } from "dataUpload/vendors";

const db = getDatabase();
const refDB = ref(db, "types_component/");

interface UpDate {
  [key: string]: IComponentType;
}

export const componentTypesApi = {
  fillContent: async () => {
    let updates = {} as UpDate;
    componentTypesData.forEach((el) => {
      const uud = v4();
      const data = { ...el, id: uud };
      updates[`/${uud}`] = data;
    });
    update(refDB, updates);
  },
  getComponentTypes: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addComponentTypes: async (payload: IComponentType) => {
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
  editComponentTypes: async (payload: IComponentType) => {
    try {
      const updates = {} as UpDate;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeComponentTypes: async (id: string) => {
    try {
      await remove(ref(db, `/types_component/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
