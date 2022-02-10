import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./CartList.module.scss";
import { Container, Col, Row } from "react-bootstrap";

export default function CartList() {
  console.log("vhhghg");
  return (
    <>
      <div className={styles.cartList}>
        <Container>
          <Row lg={4}>
            <Col>
              <div className={clsx(styles.cartItem, styles.product)}>
                <div className={styles.top}>
                  <div>
                    <h3 className={styles.heading}>150</h3>
                    <p className={styles.description}>Sản Phẩm</p>
                  </div>
                  <div className={styles.topIcon}>
                    <i className='fas fa-box-open'></i>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <Link to='/admin/product' className={styles.link}>
                    Xem thêm <i className='fas fa-arrow-circle-right'></i>
                  </Link>
                </div>
              </div>
            </Col>
            <Col>
              <div className={clsx(styles.cartItem, styles.order)}>
                <div className={styles.top}>
                  <div>
                    <h3 className={styles.heading}>150</h3>
                    <p className={styles.description}>Đơn hàng mới</p>
                  </div>
                  <div className={styles.topIcon}>
                    <i className='fas fa-shopping-bag'></i>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <Link to='/admin/dashboard' className={styles.link}>
                    Xem thêm <i className='fas fa-arrow-circle-right'></i>
                  </Link>
                </div>
              </div>
            </Col>
            <Col>
              <div className={clsx(styles.cartItem, styles.shipping)}>
                <div className={styles.top}>
                  <div>
                    <h3 className={styles.heading}>150</h3>
                    <p className={styles.description}>Đơn hàng mới</p>
                  </div>
                  <div className={styles.topIcon}>
                    <i className='fas fa-shopping-bag'></i>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <Link to='/admin/dashboard' className={styles.link}>
                    Xem thêm <i className='fas fa-arrow-circle-right'></i>
                  </Link>
                </div>
              </div>
            </Col>
            <Col>
              <div className={clsx(styles.cartItem, styles.shipped)}>
                <div className={styles.top}>
                  <div>
                    <h3 className={styles.heading}>150</h3>
                    <p className={styles.description}>Đơn hàng mới</p>
                  </div>
                  <div className={styles.topIcon}>
                    <i className='fas fa-shopping-bag'></i>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <Link to='/admin/dashboard' className={styles.link}>
                    Xem thêm <i className='fas fa-arrow-circle-right'></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
