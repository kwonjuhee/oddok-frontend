import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";

function PublicRoute() {
  const user = useRecoilValue(userState);

  return user.isLogin ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
