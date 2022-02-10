import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import Login from "components/user/auth/Login";

export default function LoginPage() {
  return (
    <div>
      <Breadcrumb title={"Login"} />
      <Login />
    </div>
  );
}
