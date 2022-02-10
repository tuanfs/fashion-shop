import React, { useEffect } from "react";
import { Container, Table, Button, Col, Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "./ProductHome.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProduct,
  getAllProduct,
  getLoading,
} from "features/admin/productSlice";

export default function ProductHome() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProduct);
  const loading = useSelector(getLoading);
  let body = null;
  useEffect(() => {
    dispatch(fetchAsyncProduct());
  }, [dispatch]);

  if (loading) {
    body = <div>Loading</div>;
  } else {
    body = (
      <>
        <h3 className={styles.heading}>Danh sách sản phẩm</h3>
        <Table striped bordered hover className={styles.table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Giá sản phẩm</th>
              <th>Danh mục</th>
              <th>Mô tả sản phẩm</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td className={styles.description}>{product.description}</td>
                <td>
                  <Link
                    size='lg'
                    to={`/admin/product/edit/${product._id}`}
                    className={clsx(styles.btnEdit, "btn btn-primary")}
                  >
                    Sửa
                  </Link>
                  <Button variant='danger' size='lg'>
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
  return (
    <>
      <Container className={styles.productHome}>
        <Row lg={2}>
          <Col>
            <Link to='/admin/product/add'>
              <Button size='lg' variant='primary'>
                Thêm sản phẩm
              </Button>
            </Link>
          </Col>
          <Col>
            <div>
              <form className={styles.formSearch}>
                <input
                  className={clsx(styles.input, "me-4")}
                  placeholder='Nhập từ khoá cần tìm kiếm'
                  type='text'
                />
                <Button size='lg' variant='primary'>
                  Tìm kiếm
                </Button>
              </form>
            </div>
          </Col>
        </Row>
        {body}
      </Container>
    </>
  );
}
