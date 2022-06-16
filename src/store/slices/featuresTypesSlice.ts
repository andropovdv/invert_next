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

export const featureTypes = createSlice({
  name: "featureTypes",
  initialState,
  reducers: {
    getFeatureTypesStart(state) {
      state.isLoading = true;
    },
    getFeatureTypesSuccess(state, action: PayloadAction<IFeatureTypes[]>) {
      state.isLoading = false;
      state.featureTypes = action.payload;
    },
    setFeatureTypesError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFeatureTypesCount(state, action) {
      state.count = action.payload;
    },
  },
});

export default featureTypes.reducer;
