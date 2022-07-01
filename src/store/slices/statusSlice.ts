import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatus } from "store/types/IStatus";

interface statusState {
  status: IStatus[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: statusState = {
  status: [] as IStatus[],
  isLoading: false,
  error: "",
  count: 0,
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    getStatusStart(state: statusState) {
      state.isLoading = true;
    },
    setStatusSuccess(state: statusState, action: PayloadAction<IStatus[]>) {
      state.isLoading = false;
      state.status = action.payload;
    },
    setStatusError(state: statusState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setStatusCount(state: statusState, action: PayloadAction<number>) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const {
  getStatusStart,
  setStatusSuccess,
  setStatusError,
  setStatusCount,
} = statusSlice.actions;

export default statusSlice.reducer;
