import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./HomeSlider.module.scss";
import clsx from "clsx";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper";

SwiperCore.use([EffectFade, Navigation, Pagination]);

export default function HomeSlider() {
  const swiperRef = useRef(null);
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        loopFillGroupWithBlank={true}
        className={clsx(styles.swiper, "mySwiper")}
        ref={swiperRef}
        loop={true}
      >
        <SwiperSlide>
          <div data-aos='fade-up' className={styles.itemSlide}>
            <div className={styles.content}>
              <h3 className={styles.heading}>Bộ sưu tập mới của nữ</h3>
              <p className={styles.description}>Giảm sốc tới 70% </p>
              <button className={clsx(styles.btn, "btn-cm")}>Mua ngay</button>
            </div>
            <img
              src='https://res.cloudinary.com/tuanfs/image/upload/v1641485280/fashion-shop/slide-1_zyqsz6.webp'
              alt='Slide'
              className={styles.slide}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div data-aos='fade-up' className={styles.itemSlide}>
            <div className={styles.content}>
              <h3 className={styles.heading}>Bộ sưu tập thời trang xu hướng</h3>
              <p className={styles.description}>Giảm sốc tới 40% </p>
              <button className={clsx(styles.btn, "btn-cm")}>Mua ngay</button>
            </div>
            <img
              src='https://res.cloudinary.com/tuanfs/image/upload/v1641485329/fashion-shop/slide-1-2_w46fir.webp'
              alt='Slide'
              className={styles.slide}
            />
          </div>
        </SwiperSlide>
        <div
          id='previousButton'
          className={clsx(styles.btnLeft, styles.btnSlide)}
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <i className={clsx("fas fa-chevron-left", styles.icon)}></i>
        </div>
        <div
          id='nextButton'
          className={clsx(styles.btnRight, styles.btnSlide)}
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <i className={clsx("fas fa-chevron-right", styles.icon)}></i>
        </div>
      </Swiper>
    </>
  );
}
