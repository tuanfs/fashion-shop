import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import styles from "./LogoBrand.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

export default function LogoBrand() {
  const swiperRef = useRef(null);

  return (
    <>
      <div className={clsx("section")}>
        <Container className={styles.logoBanner} data-aos='fade-up'>
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            className='mySwiper'
            ref={swiperRef}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide>
              <div className={styles.imgWrap}>
                <Link to='/' className={styles.link}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641892371/fashion-shop/1_1_ufda1t.webp'
                    alt='Thương hiệu Hipster'
                  />
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.imgWrap}>
                <Link to='/' className={styles.link}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641892370/fashion-shop/2_vbbvqn.webp'
                    alt='Thương hiệu Hipster'
                  />
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.imgWrap}>
                <Link to='/' className={styles.link}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641892372/fashion-shop/3_assynb.webp'
                    alt='Thương hiệu Hipster'
                  />
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.imgWrap}>
                <Link to='/' className={styles.link}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641892374/fashion-shop/4_1_at3eaz.webp'
                    alt='Thương hiệu Hipster'
                  />
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.imgWrap}>
                <Link to='/' className={styles.link}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641892376/fashion-shop/5_njbayh.webp'
                    alt='Thương hiệu Hipster'
                  />
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.imgWrap}>
                <Link to='/' className={styles.link}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641892374/fashion-shop/4_1_at3eaz.webp'
                    alt='Thương hiệu Hipster'
                  />
                </Link>
              </div>
            </SwiperSlide>{" "}
            <SwiperSlide>
              <div className={styles.imgWrap}>
                <Link to='/' className={styles.link}>
                  <img
                    className={styles.img}
                    src='https://res.cloudinary.com/tuanfs/image/upload/v1641892374/fashion-shop/4_1_at3eaz.webp'
                    alt='Thương hiệu Hipster'
                  />
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
          <div
            id='previousButton'
            className={clsx("btn-slide btn-slide-left", styles.btnSlide)}
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <i className='fas fa-angle-left btn-slide-icon'></i>
          </div>
          <div
            id='nextButton'
            className={clsx("btn-slide btn-slide-right", styles.btnSlide)}
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <i className='fas fa-angle-right btn-slide-icon'></i>
          </div>
        </Container>
      </div>
    </>
  );
}
