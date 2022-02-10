import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import ProductDetail from "components/user/product/ProductDetail";
import MetaData from "components/user/layout/MetaData";

export default function ProductDetailPage() {
  return (
    <>
      <MetaData title='Chi tiết sản phẩm' />
      <Breadcrumb title='Chi tiết sản phẩm' />
      <ProductDetail />
    </>
  );
}
