import { RootState } from "./store";

export const selectUserData = (state: RootState) => state.getUsersSlice;
export const selectAuthData = (state: RootState) => state.auth;
export const selectVendorData = (state: RootState) => state.vendors;
export const selectFeatureTypesData = (state: RootState) => state.featureTypes;
export const selectComponentTypesData = (state: RootState) =>
  state.componentTypesSlice;
export const selectFeatureSetsData = (state: RootState) =>
  state.featureSetsSlice;
export const selectComponetsData = (state: RootState) => state.componentsSlice;
