import React, { useRef, useState } from "react";
import styles from "./ProductDetailThumbs.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ProductDetailThumbs(props) {
  const { product } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(false);
  const swiperRef = useRef(null);

  return (
    <>
      <div className={styles.thumbs}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          ref={swiperRef}
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className={clsx("mySwiper2", styles.mySwiper2)}
        >
          {product.img.map((img, index) => (
            <SwiperSlide key={index} className={styles.slide2}>
              <img className={styles.img} src={img.url} alt='Ảnh sản phẩm' />
            </SwiperSlide>
          ))}
          {product.img.map((img, index) => (
            <SwiperSlide key={index} className={styles.slide2}>
              <img className={styles.img} src={img.url} alt='Ảnh sản phẩm' />
            </SwiperSlide>
          ))}
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
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={clsx("mySwiper swiper-product-detail", styles.mySwiper)}
        >
          {product.img.map((img, index) => (
            <SwiperSlide key={index} className={styles.slide2}>
              <img className={styles.img} src={img.url} alt='Ảnh sản phẩm' />
            </SwiperSlide>
          ))}
          {product.img.map((img, index) => (
            <SwiperSlide key={index} className={styles.slide2}>
              <img className={styles.img} src={img.url} alt='Ảnh sản phẩm' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
