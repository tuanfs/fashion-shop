import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductListing from "../ProductListing";
import Sidebar from "components/user/body/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getAllProduct,
  fetchAllProduct,
  getPageCount,
  getLoadingProduct,
} from "features/user/productSlice";
import Pagination from "components/user/body/Pagination";
import LoadingItem from "components/user/body/loading/LoadingItem";
import ProductNotFound from "components/user/product/ProductNotFound";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProduct);
  const pageCount = useSelector(getPageCount);
  const loading = useSelector(getLoadingProduct);

  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const priceDecrease = searchParams.get("priceDecrease");
  const page = searchParams.get("page");

  let body = null;

  if (loading) {
    body = <LoadingItem />;
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
      fetchAllProduct({ keyword, category, gender, priceDecrease, page })
    );
  }, [dispatch, keyword, category, gender, priceDecrease, page]);

  return (
    <>
      <Container>
        <Row>
          <Col lg={3}>
            <Sidebar genderEl={true} categoryEl={true} />
          </Col>
          <Col lg={9}>{body}</Col>
        </Row>
      </Container>
    </>
  );
}
