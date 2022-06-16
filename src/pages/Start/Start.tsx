/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectUserData } from "../../store/selectors";
import { fetchUsersApi } from "../../store/thunks/fetchUsersApi";

type Props = {};

export const Start = (props: Props) => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector(selectUserData);

  React.useEffect(() => {
    dispatch(fetchUsersApi());
  }, []);

  return (
    <div>
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <pre>{JSON.stringify(users, null, 2)}</pre>
      )}
    </div>
  );
};
