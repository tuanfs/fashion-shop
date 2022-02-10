import React from "react";
import styles from "./BannerSale.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";

export default function BannerSale() {
  return (
    <div className='section'>
      <Container>
        <Row className='gx-5 gy-5'>
          <Col lg={4} md={6} sm={6}>
            <div className={styles.banner} data-aos='fade-right'>
              <div className={styles.imgWrap}>
                <img
                  className={styles.img}
                  src='https://res.cloudinary.com/tuanfs/image/upload/v1641751888/fashion-shop/banner-4_kfzhau.webp'
                  alt='Váy công sở'
                />
              </div>
              <div className={styles.content}>
                <h4 className={styles.subTitle}>
                  Giảm giá tới <span className={styles.percent}>50%</span>
                </h4>
                <h3 className={styles.title}>Váy công sở</h3>
                <button className={clsx(styles.btn, "primary-btn")}>
                  Mua Ngay
                </button>
              </div>
            </div>
          </Col>
          <Col lg={4} md={6} sm={6}>
            <div className={styles.banner} data-aos='fade-left'>
              <div className={styles.imgWrap}>
                <img
                  className={styles.img}
                  src='https://res.cloudinary.com/tuanfs/image/upload/v1641751887/fashion-shop/banner-5_ndhqnl.webp'
                  alt='Giày công sở'
                />
              </div>
              <div className={styles.content}>
                <h4 className={styles.subTitle}>
                  Giảm giá tới <span className={styles.percent}>40%</span>
                </h4>
                <h3 className={styles.title}>Giày công sở</h3>
                <button className={clsx(styles.btn, "primary-btn")}>
                  Mua Ngay
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
