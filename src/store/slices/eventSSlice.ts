import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvents } from "store/types/IEvents";

interface eventsState {
  enents: IEvents[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: eventsState = {
  enents: [] as IEvents[],
  isLoading: false,
  error: "",
  count: 0,
};

export const eventSSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEventsStart(state: eventsState) {
      state.isLoading = true;
    },
    setEventsSuccess(state: eventsState, action: PayloadAction<IEvents[]>) {
      state.isLoading = false;
      state.enents = action.payload;
    },
    setEventsError(state: eventsState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setEventsCount(state: eventsState, action: PayloadAction<number>) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const {
  getEventsStart,
  setEventsSuccess,
  setEventsError,
  setEventsCount,
} = eventSSlice.actions;

export default eventSSlice.reducer;
