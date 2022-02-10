import React from "react";
import Breadcrumb from "components/user/layout/Breadcrumb";
import PageNotFound from "components/user/PageNotFound";

export default function NotFoundPage() {
  return (
    <>
      <Breadcrumb title='Lỗi 404' />
      <PageNotFound />
    </>
  );
}
