import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILocationData } from "store/types/ILocations";

interface locationCityState {
  locationCity: ILocationData[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: locationCityState = {
  locationCity: [] as ILocationData[],
  isLoading: false,
  error: "",
  count: 0,
};

export const locationCitySlice = createSlice({
  name: "locationCity",
  initialState,
  reducers: {
    getLocationCityStart(state: locationCityState) {
      state.isLoading = true;
    },
    setLocationCitySuccess(
      state: locationCityState,
      action: PayloadAction<ILocationData[]>
    ) {
      state.isLoading = false;
      state.locationCity = action.payload;
    },
    setLocationCityError(
      state: locationCityState,
      action: PayloadAction<string>
    ) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setLocationCityCount(
      state: locationCityState,
      action: PayloadAction<number>
    ) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const {
  getLocationCityStart,
  setLocationCitySuccess,
  setLocationCityError,
  setLocationCityCount,
} = locationCitySlice.actions;

export default locationCitySlice.reducer;
