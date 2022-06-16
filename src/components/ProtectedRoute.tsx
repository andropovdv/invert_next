import { useAuth } from "hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {};

export const ProtectedRoute = (props: Props) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
};
