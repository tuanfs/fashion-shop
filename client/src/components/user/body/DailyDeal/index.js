import React, { useRef, useState, useEffect } from "react";
import styles from "./DailyDeal.module.scss";
import { Container } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import TabSwitch from "components/user/body/TabSwitch";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getAllProduct,
  fetchAllProduct,
  getLoadingProduct,
} from "features/user/productSlice";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";

import SwiperCore, { Navigation } from "swiper";
import LoadingItem from "components/user/body/loading/LoadingItem";

SwiperCore.use([Navigation]);

export default function DailyDeal() {
  const [tabContent, setTabContent] = useState("tabNew");
  const dispatch = useDispatch();
  const products = useSelector(getAllProduct);
  const loading = useSelector(getLoadingProduct);
  const [query, setQuery] = useState({
    category: "shirt",
  });
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const [secs, setSecs] = useState("");

  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllProduct(query));
  }, [dispatch, query]);

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

  const dateFuture = new Date("September 1, 2022 00:00:00");
  useEffect(() => {
    const futureTime = dateFuture.getTime();
    const interval = setInterval(() => {
      const dateNow = new Date().getTime();
      const t = futureTime - dateNow;
      if (t > 0) {
        const daysNew = Math.floor(t / (1000 * 60 * 60 * 24));
        const hoursNew = Math.floor(
          (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minsNew = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const secsNew = Math.floor((t % (1000 * 60)) / 1000);
        setHours(hoursNew);
        setMins(minsNew);
        setSecs(secsNew);
        setDays(daysNew);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const numberWithCommas = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let body = null;
  if (loading) {
    body = <LoadingItem />;
  } else if (products.length > 0) {
    body = products.map((product) => (
      <SwiperSlide key={product._id}>
        <div className={clsx(styles.cardItem, "product-card")}>
          <div className={styles.tagSale}>
            <span className={styles.percent}>-{product.sale}%</span>
          </div>
          <div className={styles.imgWrap}>
            <img
              src={product.img[0].url}
              alt='Ảnh sản phẩm'
              className={styles.img}
            />
          </div>
          <div className={clsx("product-content text-start", styles.content)}>
            <h3 className={styles.heading}>Nhanh lên! Ưu đãi kết thúc vào </h3>
            <div className={styles.date}>
              <div className={styles.boxDate}>
                <span className={styles.number}>{days}</span>
                <span className={styles.text}>Ngày</span>
              </div>
              <div className={styles.boxDate}>
                <span className={styles.number}>
                  {hours < 10 ? `0${hours}` : hours}
                </span>
                <span className={styles.text}>Giờ</span>
              </div>
              <div className={styles.boxDate}>
                <span className={styles.number}>
                  {mins < 10 ? `0${mins}` : mins}
                </span>
                <span className={styles.text}>Phút</span>
              </div>
              <div className={styles.boxDate}>
                <span className={styles.number}>
                  {secs < 10 ? `0${secs}` : secs}
                </span>
                <span className={styles.text}>Dây</span>
              </div>
            </div>

            <h3 className={clsx(styles.name, "product-name")}>
              {product.name}
            </h3>
            <div className={clsx(styles.ratings, "product-ratings")}>
              <ReactStars
                count={5}
                size={18}
                isHalf={true}
                value={product.ratings}
                edit={false}
                emptyIcon={<i className='far fa-star'></i>}
                halfIcon={<i className='fa fa-star-half-alt'></i>}
                fullIcon={<i className='fa fa-star'></i>}
                activeColor='#ff4545'
              />
              <span className='product-count-review'>
                ({product.reviews.length})
              </span>
            </div>
            <div className={clsx(styles.price)}>
              <span className='product-price-new'>
                {numberWithCommas(product.priceDecrease)}₫
              </span>
              <span className='product-price-old'>
                {numberWithCommas(product.price)}₫
              </span>
            </div>

            <button className='product-btn-add'>ADD TO CART</button>
          </div>
        </div>
      </SwiperSlide>
    ));
  }
  return (
    <div className='section' data-aos='fade-up'>
      <TabSwitch
        heading={"Daily Deals"}
        handleTab={handleTab}
        tabContent={tabContent}
      />
      <Container className={styles.container}>
        <Swiper
          slidesPerView={1}
          className='mySwiper'
          ref={swiperRef}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          breakpoints={{
            575: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1114: {
              slidesPerView: 2,
              spaceBetween: 30,
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
