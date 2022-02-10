import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import Register from "components/user/auth/Register";
import MetaData from "components/user/layout/MetaData";

export default function RegisterPage() {
  return (
    <div>
      <MetaData title='Đăng ký' />
      <Breadcrumb title={"Register"} />
      <Register />
    </div>
  );
}
