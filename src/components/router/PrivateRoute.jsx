import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";

function PrivateRoute({ component: Component }) {
  const user = useRecoilValue(userState);

  return user.isLogin ? Component : <Navigate to="/login" replace />;
}

export default PrivateRoute;
