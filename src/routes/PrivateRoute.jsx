import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";

function PrivateRoute() {
  const user = useRecoilValue(userState);

  return user.isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
