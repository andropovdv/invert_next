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
    getComponentTypesStart(state: componentTypes) {
      state.isLoading = true;
    },
    setComponentTypesSuccess(
      state: componentTypes,
      action: PayloadAction<IComponentType[]>
    ) {
      state.isLoading = false;
      state.componentTypes = action.payload;
    },
    setComponentTypesError(
      state: componentTypes,
      action: PayloadAction<string>
    ) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setComponentTypesCount(
      state: componentTypes,
      action: PayloadAction<number>
    ) {
      state.isLoading = false;
      state.count = action.payload;
    },
  },
});

export const {
  getComponentTypesStart,
  setComponentTypesCount,
  setComponentTypesError,
  setComponentTypesSuccess,
} = componentTypesSlice.actions;

export default componentTypesSlice.reducer;
