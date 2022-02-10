import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import Login from "components/user/auth/Login";
import MetaData from "components/user/layout/MetaData";

export default function LoginPage() {
  return (
    <div>
      <MetaData title='Đăng nhập' />
      <Breadcrumb title={"Login"} />
      <Login />
    </div>
  );
}
