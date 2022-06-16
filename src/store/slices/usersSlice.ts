import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../types/IUsers";

interface FetchUsers {
  users: Users[];
  isLoading: boolean;
}

const initialState: FetchUsers = {
  users: [] as Users[],
  isLoading: false,
};

export const getUsersSlice = createSlice({
  name: "get_users",
  initialState,
  reducers: {
    fetchUser(state) {
      state.isLoading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<Users[]>) {
      state.isLoading = false;
      state.users = action.payload;
    },
  },
});

export default getUsersSlice.reducer;
