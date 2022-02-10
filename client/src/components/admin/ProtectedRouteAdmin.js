import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAdmin,
  getIsAuthenticatedAdmin,
  getLoadingAdmin,
} from "features/admin/authSlice";

export default function ProtectedRouteAdmin() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticatedAdmin);
  const loading = useSelector(getLoadingAdmin);
  useEffect(() => dispatch(loadAdmin()), [dispatch, isAuthenticated]);

  return (
    <>
      {loading ? (
        ""
      ) : isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to='/admin/login' />
      )}
    </>
  );
}
