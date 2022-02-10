import React from "react";
import ProductCategory from "components/user/product/ProductCategory";
import Breadcrumb from "components/user/layout/Breadcrumb";
import { useParams } from "react-router-dom";
import { productCategoryOption } from "features/user/productSlice";
import MetaData from "components/user/layout/MetaData";

export default function ProductCategoryPage() {
  const { categoryPath } = useParams();
  let title = null;
  if (productCategoryOption[categoryPath]) {
    title = productCategoryOption[categoryPath].title;
  }
  return (
    <div>
      <MetaData title='Danh mục sản phẩm' />
      <Breadcrumb title={title} />
      <ProductCategory />
    </div>
  );
}
