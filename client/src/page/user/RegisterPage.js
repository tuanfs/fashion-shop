import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import Register from "components/user/auth/Register";

export default function RegisterPage() {
  return (
    <div>
      <Breadcrumb title={"Register"} />
      <Register />
    </div>
  );
}
