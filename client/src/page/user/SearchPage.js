import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import ProductSearch from "components/user/product/ProductSearch";
import MetaData from "components/user/layout/MetaData";

export default function SearchPage() {
  return (
    <>
      <MetaData title='Tìm kiếm sản phẩm' />
      <Breadcrumb title='Tìm kiếm' />
      <ProductSearch />
    </>
  );
}
