import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import ProductDetail from "components/user/product/ProductDetail";

export default function ProductDetailPage() {
  return (
    <>
      <Breadcrumb title='Chi tiết sản phẩm' />
      <ProductDetail />
    </>
  );
}
