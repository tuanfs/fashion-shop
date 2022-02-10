import clsx from "clsx";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./HomeBanner.module.scss";

export default function HomeBanner() {
  return (
    <div className='section'>
      <Container>
        <div data-aos='fade-up' className={styles.banner}>
          <Row className='gy-4'>
            <Col lg={4} md={6} sm={6}>
              <div className={styles.bannerItem}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641489869/fashion-shop/banner-1_k8nzzj.webp'
                    alt='Banner'
                  />
                </div>
                <div className={styles.content}>
                  <p className={styles.description}>Mũ nắng</p>
                  <h3 className={styles.heading}>Nhận ưu đãi cho mùa hè</h3>
                  <button className={clsx("btn-cm", styles.btn)}>
                    Mua ngay
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={6}>
              <div className={styles.bannerItem}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641489869/fashion-shop/banner-2_rw1bf2.webp'
                    alt='Banner'
                  />
                </div>
                <div className={styles.content}>
                  <p className={styles.description}>Balo</p>
                  <h3 className={styles.heading}>Nhận ưu đãi cho học sinh</h3>
                  <button className={clsx("btn-cm", styles.btn)}>
                    Mua ngay
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={6}>
              <div className={styles.bannerItem}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    alt='Banner'
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641489869/fashion-shop/banner-3_wblgft.webp'
                  />
                </div>
                <div className={styles.content}>
                  <p className={styles.description}>Smart watch</p>
                  <h3 className={styles.heading}>Nhận ưu đãi cho mùa hè</h3>
                  <button className={clsx("btn-cm", styles.btn)}>
                    Mua ngay
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
