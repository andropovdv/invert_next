import { PayloadAction } from "@reduxjs/toolkit";
import { IFeatureSets } from "./../types/IFeatureSets";
import { createSlice } from "@reduxjs/toolkit";

interface featureSets {
  featureSets: IFeatureSets[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: featureSets = {
  featureSets: [] as IFeatureSets[],
  isLoading: false,
  error: "",
  count: 0,
};

export const featureSetsSlice = createSlice({
  name: "featureSets",
  initialState,
  reducers: {
    getFeatureSetsStart(state) {
      state.isLoading = true;
    },
    getFeatureSetsSuccess(state, action: PayloadAction<IFeatureSets[]>) {
      state.isLoading = false;
      state.featureSets = action.payload;
    },
    setFeatureSetsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFeatureSetsCount(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export default featureSetsSlice.reducer;
