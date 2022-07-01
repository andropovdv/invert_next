import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "store/types/IEvent";

interface eventState {
  events: IEvent[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: eventState = {
  events: [] as IEvent[],
  isLoading: false,
  error: "",
  count: 0,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    getEventStart(state: eventState) {
      state.isLoading = true;
    },
    setEventSuccess(state: eventState, action: PayloadAction<IEvent[]>) {
      state.isLoading = false;
      state.events = action.payload;
    },
    setEventError(state: eventState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setEventCount(state: eventState, action: PayloadAction<number>) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const { getEventStart, setEventSuccess, setEventError, setEventCount } =
  eventSlice.actions;

export default eventSlice.reducer;
