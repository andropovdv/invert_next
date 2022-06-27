import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComponent } from "store/types/IComponent";

interface componentState {
  components: IComponent[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: componentState = {
  components: [] as IComponent[],
  isLoading: false,
  error: "",
  count: 0,
};

export const componentsSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    getComponentStart(state) {
      state.isLoading = true;
    },
    setComponentSuccess(state, action: PayloadAction<IComponent[]>) {
      state.isLoading = false;
      state.components = action.payload;
    },
    setComponentError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setComponentCount(state, action: PayloadAction<number>) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const {
  getComponentStart,
  setComponentCount,
  setComponentError,
  setComponentSuccess,
} = componentsSlice.actions;

export default componentsSlice.reducer;
