import { UserService } from "../../services/userService";
import { getUsersSlice } from "../slices/usersSlice";
import { AppDispatch } from "../store";

export const fetchUsersApi = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getUsersSlice.actions.fetchUser());
    const res = await UserService.getUsers();
    if (res.status === 200) {
      dispatch(getUsersSlice.actions.fetchUserSuccess(res.data));
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};
