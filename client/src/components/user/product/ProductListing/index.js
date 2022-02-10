import React, { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import styles from "./ProductListing.module.scss";
import { Row, Col } from "react-bootstrap";
import clsx from "clsx";

export default function ProductListing(props) {
  const { products } = props;
  return (
    <>
      <div className={clsx(styles.productList, "product-list")}>
        <Row>
          {products.map((product) => (
            <Col
              key={product._id}
              lg={4}
              className='gx-5'
              md={6}
              xs={12}
              sm={6}
            >
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
