import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "store/types/IAuth";

interface authStore {
  user: IAuth;
  isLoading: boolean;
  error: string;
}

const initialState: authStore = {
  user: {} as IAuth,
  isLoading: true,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchAuthStart(state) {
      state.isLoading = true;
    },
    fetchAuthEnd(state) {
      state.isLoading = false;
    },
    setUser(state, action: PayloadAction<IAuth>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    removeUser(state) {
      state.isLoading = false;
      state.user = {} as IAuth;
    },
    setErrorUser(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAuthStart,
  setUser,
  removeUser,
  setErrorUser,
  fetchAuthEnd,
} = authSlice.actions;

export default authSlice.reducer;
