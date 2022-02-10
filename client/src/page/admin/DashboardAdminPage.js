import React from "react";
import NavbarHeader from "components/admin/Navbar";
import CartList from "components/admin/CartList";
import ReviewProduct from "components/admin/ReviewProduct";

export default function DashboardAdminPage() {
  return (
    <>
      <NavbarHeader />
      <CartList />
      <ReviewProduct />
    </>
  );
}
