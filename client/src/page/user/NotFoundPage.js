import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import PageNotFound from "components/user/PageNotFound";
import MetaData from "components/user/layout/MetaData";

export default function NotFoundPage() {
  return (
    <>
      <MetaData title='Không tìm thấy trang' />
      <Breadcrumb title='Lỗi 404' />
      <PageNotFound />
    </>
  );
}
