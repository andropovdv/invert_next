import { IComponentType } from "./../types/IComponentTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface componentTypes {
  componentTypes: IComponentType[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: componentTypes = {
  componentTypes: [] as IComponentType[],
  isLoading: false,
  error: "",
  count: 0,
};

export const componentTypesSlice = createSlice({
  name: "componentTypes",
  initialState,
  reducers: {
    getComponentTypesStart(state) {
      state.isLoading = true;
    },
    getComponentTypesSuccess(state, action: PayloadAction<IComponentType[]>) {
      state.isLoading = false;
      state.componentTypes = action.payload;
    },
    setComponentTypesError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setComponentTypesCount(state, action) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export default componentTypesSlice.reducer;
