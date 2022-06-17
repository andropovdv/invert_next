import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeatureTypes } from "../types/IFeatureTypes";

interface featureTypesState {
  featureTypes: IFeatureTypes[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: featureTypesState = {
  featureTypes: [] as IFeatureTypes[],
  isLoading: false,
  error: "",
  count: 0,
};

export const featureTypesSlice = createSlice({
  name: "featureTypes",
  initialState,
  reducers: {
    getFeatureTypesStart(state) {
      state.isLoading = true;
    },
    setFeatureTypesSuccess(state, action: PayloadAction<IFeatureTypes[]>) {
      state.isLoading = false;
      state.featureTypes = action.payload;
    },
    setFeatureTypesError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFeatureTypesCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const {
  getFeatureTypesStart,
  setFeatureTypesSuccess,
  setFeatureTypesCount,
  setFeatureTypesError,
} = featureTypesSlice.actions;

export default featureTypesSlice.reducer;
