import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import ProductSearch from "components/user/product/ProductSearch";

export default function SearchPage() {
  return (
    <>
      <Breadcrumb title='Tìm kiếm' />
      <ProductSearch />
    </>
  );
}
