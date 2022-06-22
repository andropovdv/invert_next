import { PayloadAction } from "@reduxjs/toolkit";
import { IFeatureSets } from "./../types/IFeatureSets";
import { createSlice } from "@reduxjs/toolkit";

interface featureSets {
  featureSets: IFeatureSets[];
  isLoading: boolean;
  error: string;
  count: number;
  current: IFeatureSets;
}

const initialState: featureSets = {
  featureSets: [] as IFeatureSets[],
  isLoading: false,
  error: "",
  count: 0,
  current: {} as IFeatureSets,
};

export const featureSetsSlice = createSlice({
  name: "featureSets",
  initialState,
  reducers: {
    getFeatureSetsStart(state) {
      state.isLoading = true;
    },
    setFeatureSetsSuccess(state, action: PayloadAction<IFeatureSets[]>) {
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
    setFeatureSetCurrent(state, action: PayloadAction<IFeatureSets>) {
      state.current = action.payload;
    },
  },
});

export const {
  getFeatureSetsStart,
  setFeatureSetsSuccess,
  setFeatureSetsError,
  setFeatureSetsCount,
  setFeatureSetCurrent,
} = featureSetsSlice.actions;

export default featureSetsSlice.reducer;
