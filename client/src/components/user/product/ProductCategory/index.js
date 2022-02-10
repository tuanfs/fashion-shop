import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ProductListing from "../ProductListing";
import Sidebar from "components/user/body/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
import {
  getAllProduct,
  fetchAllProduct,
  getPageCount,
  getLoadingProduct,
  productCategoryOption,
} from "features/user/productSlice";
import Pagination from "components/user/body/Pagination";
import LoadingItem from "components/user/body/loading/LoadingItem";
import ProductNotFound from "components/user/product/ProductNotFound";

export default function ProductCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryPath } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingProduct);
  const products = useSelector(getAllProduct);
  const pageCount = useSelector(getPageCount);
  let category = null;
  let gender = null;
  let body = null;
  if (productCategoryOption[categoryPath]) {
    category = productCategoryOption[categoryPath].category;
    gender = productCategoryOption[categoryPath].gender;
  }

  const page = searchParams.get("page");
  const priceDecrease = searchParams.get("priceDecrease");
  const keyword = searchParams.get("keyword");
  if (loading) {
    body = <LoadingItem />;
  } else if (!productCategoryOption[categoryPath]) {
    body = <ProductNotFound />;
  } else if (products.length === 0) {
    body = <ProductNotFound />;
  } else {
    body = (
      <>
        <ProductListing products={products} />
        <Pagination pageCount={pageCount} />
      </>
    );
  }
  useEffect(() => {
    dispatch(
      fetchAllProduct({ keyword, priceDecrease, page, category, gender })
    );
  }, [dispatch, keyword, priceDecrease, page, category, gender]);

  return (
    <>
      <Container>
        <Row>
          <Col lg={3}>
            <Sidebar genderEl={false} categoryEl={false} />
          </Col>
          <Col lg={9}>{body}</Col>
        </Row>
      </Container>
    </>
  );
}
