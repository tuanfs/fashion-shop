import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "features/user/authSlice";

export default function LoadUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("ACCESS_TOKEN") === undefined ||
      localStorage.getItem("ACCESS_TOKEN") === null
    ) {
      dispatch(loadUser(false));
    } else {
      dispatch(loadUser(true));
    }
  }, [dispatch]);

  return <></>;
}
