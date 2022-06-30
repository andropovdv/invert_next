import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILocation } from "../types/ILocations";

interface locationState {
  locations: ILocation[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: locationState = {
  locations: [] as ILocation[],
  isLoading: false,
  error: "",
  count: 0,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    getLocationStart(state: locationState) {
      state.isLoading = true;
    },
    setLocationSuccess(
      state: locationState,
      action: PayloadAction<ILocation[]>
    ) {
      state.isLoading = false;
      state.locations = action.payload;
    },
    setLocationError(state: locationState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setLocationCount(state: locationState, action: PayloadAction<number>) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const {
  getLocationStart,
  setLocationSuccess,
  setLocationError,
  setLocationCount,
} = locationSlice.actions;

export default locationSlice.reducer;
