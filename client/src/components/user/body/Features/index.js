import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Features.module.scss";

export default function Features() {
  return (
    <>
      <div data-aos='fade-up' className='section'>
        <Container>
          <Row className='gx-5 gy-5'>
            <Col lg={3} md={6} sm={6}>
              <div className={styles.item}>
                <div>
                  <img
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641545358/fashion-shop/feature-icon-2_hnymzj.webp'
                    className={styles.img}
                    alt='Feature'
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Miễn phí giao hàng</h3>
                  <p className={styles.description}>
                    Miễn phí giao hàng tất cả đơn đặt hàng
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <div className={styles.item}>
                <div>
                  <img
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641545358/fashion-shop/feature-icon-3_loeihk.webp'
                    className={styles.img}
                    alt='Feature'
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Hỗ trợ 24/7</h3>
                  <p className={styles.description}>Hỗ trợ 24 giờ một ngày</p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <div className={styles.item}>
                <div>
                  <img
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641545358/fashion-shop/feature-icon-4_makbgz.webp'
                    className={styles.img}
                    alt='Feature'
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Chính sách hoàn trả</h3>
                  <p className={styles.description}>
                    Đảm bảo trả lại dưới 5 ngày
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <div className={styles.item}>
                <div>
                  <img
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641545358/fashion-shop/feature-icon-1_mupchs.webp'
                    className={styles.img}
                    alt='Feature'
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.heading}>Giảm giá đơn hàng</h3>
                  <p className={styles.description}>
                    Đơn hàng có tổng số tiền trên 3 triệu đồng
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
