import React, { useRef } from "react";
import styles from "./ProductColumn.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "swiper/css/navigation";

import SwiperCore, { Navigation, Grid, Pagination } from "swiper";

SwiperCore.use([Grid, Navigation, Pagination]);

export default function ProductColumn() {
  const swiperRef = useRef(null);
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        grid={{
          rows: 3,
        }}
        pagination={{
          clickable: true,
        }}
        className='mySwiper'
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      <div className='section wrap'>
        <div className='abc'></div>
      </div>
    </>
  );
}
