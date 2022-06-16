import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVendor } from "../types/IVendor";

interface vendorStore {
  vendors: IVendor[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: vendorStore = {
  vendors: [] as IVendor[],
  isLoading: false,
  error: "",
  count: 0,
};

export const vendors = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    getVendorStart(state) {
      state.isLoading = true;
    },
    getVendorSuccess(state, action: PayloadAction<IVendor[]>) {
      state.isLoading = false;
      state.vendors = action.payload;
    },
    setVendorCount(state, action) {
      state.count = action.payload;
    },
    setVendorError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default vendors.reducer;
