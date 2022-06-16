import { IAuth } from "store/types/IAuth";
import { authApi } from "services/authApiService";
import {
  fetchAuthEnd,
  fetchAuthStart,
  removeUser,
  setErrorUser,
  setUser,
} from "store/slices/authSlice";
import { AppDispatch } from "store/store";

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchAuthStart());
      const { user } = await authApi.login(email, password);
      if (user) {
        const final: IAuth = {
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
          name: user.displayName,
        };
        dispatch(setUser(final));
      }
    } catch (e) {
      dispatch(setErrorUser((e as Error).message));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchAuthStart());
    await authApi.logout();
    dispatch(removeUser());
  } catch (e) {
    dispatch(setErrorUser((e as Error).message));
  }
};

export const register =
  (email: string, password: string, name: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchAuthStart());
      const { user } = await authApi.register(email, password, name);
      if (user) {
        const final: IAuth = {
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
          name: user.displayName,
        };
        dispatch(setUser(final));
      }
    } catch (e) {
      dispatch(setErrorUser((e as Error).message));
    }
  };

export const checkUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchAuthStart());
    const tmp = (user: any) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            name: user.displayName,
          })
        );
      } else {
        dispatch(fetchAuthEnd());
      }
    };
    await authApi.checkAuth(tmp);
    // dispatch(fetchAuthEnd());
  } catch (e) {
    dispatch(setErrorUser((e as Error).message));
  }
};
