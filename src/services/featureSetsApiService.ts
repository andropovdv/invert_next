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
import { IFeatureSets } from "store/types/IFeatureSets";
import { featureSetsData } from "dataUpload/vendors";

const db = getDatabase();
const refDB = ref(db, "sets_feature_components/");

interface UpData {
  [key: string]: IFeatureSets;
}

export const featureSetsApi = {
  fillFeatureSets: async () => {
    let updates = {} as UpData;
    featureSetsData.forEach((el) => {
      const uud = v4();
      const data = { ...el, id: uud };
      updates[`/${uud}`] = data;
    });
    await update(refDB, updates);
  },
  getFeatureSets: async () => {
    try {
      const res = await get(child(refDB, "/"));
      if (res.exists()) {
        return res.val();
      }
    } catch (e) {
      console.log(e);
    }
  },
  addFeatureSets: async (payload: IFeatureSets) => {
    try {
      const uud = v4();
      const data = { ...payload, id: uud };
      const updates = {} as UpData;
      updates["/" + uud] = data;
      await update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  editFeatureSets: async (payload: IFeatureSets) => {
    try {
      console.log("payload: ", payload);
      const updates = {} as UpData;
      updates[`/${payload.id}`] = payload;
      await update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeFeatureSets: async (id: string) => {
    try {
      await remove(ref(db, `/sets_feature_components/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
