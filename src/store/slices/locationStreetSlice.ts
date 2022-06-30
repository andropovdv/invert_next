import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILocationData } from "store/types/ILocations";

interface locationStreetState {
  locationStreet: ILocationData[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: locationStreetState = {
  locationStreet: [] as ILocationData[],
  isLoading: false,
  error: "",
  count: 0,
};

export const locationStreetSlice = createSlice({
  name: "locationStreet",
  initialState,
  reducers: {
    getLocationStreetStart(state: locationStreetState) {
      state.isLoading = true;
    },
    setLocationStreetSuccess(
      state: locationStreetState,
      action: PayloadAction<ILocationData[]>
    ) {
      state.isLoading = false;
      state.locationStreet = action.payload;
    },
    setLocationStreetError(
      state: locationStreetState,
      action: PayloadAction<string>
    ) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setLocationStreetCount(
      state: locationStreetState,
      action: PayloadAction<number>
    ) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const {
  getLocationStreetStart,
  setLocationStreetSuccess,
  setLocationStreetError,
  setLocationStreetCount,
} = locationStreetSlice.actions;

export default locationStreetSlice.reducer;
