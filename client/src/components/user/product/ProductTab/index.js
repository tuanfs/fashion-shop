import React, { useRef, useState, useEffect } from "react";
import styles from "./ProductTab.module.scss";
import clsx from "clsx";
import { Container } from "react-bootstrap";
import ProductItem from "../ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import TabSwitch from "components/user/body/TabSwitch";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProduct,
  getAllProduct,
  getLoadingProduct,
} from "features/user/productSlice";
import LoadingItem from "components/user/body/loading/LoadingItem";

import "swiper/css";
import "swiper/css/navigation";

import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

export default function ProductTab() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProduct);
  const loading = useSelector(getLoadingProduct);
  const [query, setQuery] = useState({
    category: "shirt",
  });
  const swiperRef = useRef(null);
  const [tabContent, setTabContent] = useState("tabNew");
  const handleTab = (tab) => {
    setTabContent(tab);
    switch (tab) {
      case "tabNew":
        setQuery({
          category: "shirt",
        });
        break;
      case "tabSale":
        setQuery({
          category: "sweater",
        });
        break;
      case "tabSeller":
        setQuery({
          category: "t-shirt",
        });
        break;
      default:
        return setQuery({ category: "" });
    }
  };

  useEffect(() => {
    dispatch(fetchAllProduct(query));
  }, [dispatch, query]);
  let content = [];
  const loadBody = (products) => {
    for (let i = 0; i < products.length; i++) {
      if (i % 2 !== 0) {
        content.push(
          <SwiperSlide key={i}>
            {products
              .filter((product, index) => index === i - 1 || i === index)
              .map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
          </SwiperSlide>
        );
      } else if (i === products.length - 1) {
        const product = products[i];
        content.push(
          <SwiperSlide key={product._id}>
            <ProductItem product={product} />
          </SwiperSlide>
        );
      }
    }
    return content;
  };

  let body = null;
  if (loading) {
    body = <LoadingItem />;
  } else if (products.length === 0) {
    body = <LoadingItem />;
  } else {
    body = loadBody(products);
  }

  return (
    <div className='section' data-aos='fade-up'>
      <TabSwitch tabContent={tabContent} handleTab={handleTab} />
      <Container className={styles.container}>
        <Swiper
          slidesPerView={1}
          className='mySwiper'
          ref={swiperRef}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          breakpoints={{
            500: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            994: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {body}
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
  );
}
