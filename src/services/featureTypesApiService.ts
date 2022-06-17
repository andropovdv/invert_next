import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  update,
} from "firebase/database";
import "../firebase";
import { v4 } from "uuid";
import { IFeatureTypes } from "store/types/IFeatureTypes";
import { featureTypesData } from "dataUpload/vendors";

const db = getDatabase();
const refDB = ref(db, "types_feature");

interface UpData {
  [key: string]: IFeatureTypes;
}

export const featureTypesApi = {
  fillFeatureSets: async () => {
    let updates = {} as UpData;
    featureTypesData.forEach((el) => {
      const uud = v4();
      const data = { ...el, id: uud };
      updates[`/${uud}`] = data;
    });
    update(refDB, updates);
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
  addFeatureSets: async (payload: IFeatureTypes) => {
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
  editFeatureSets: async (payload: IFeatureTypes) => {
    try {
      const updates = {} as UpData;
      updates[`/${payload.id}`] = payload;
      update(refDB, updates);
    } catch (e) {
      console.log(e);
    }
  },
  removeFeatureSets: async (id: string) => {
    try {
      await remove(ref(db, `/types_feature/${id}`));
    } catch (e) {
      console.log(e);
    }
  },
};
