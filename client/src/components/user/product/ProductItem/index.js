import React from "react";
import styles from "./ProductItem.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { BsSuitHeart, BsSearch, BsShuffle } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

export default function index(props) {
  const { product } = props;
  const numberWithCommas = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className={clsx(styles.productItem, "mt-5", "product-item")}>
      <div className={styles.thumb}>
        <Link to={`/product-detail/${product._id}`} className={styles.link}>
          <img
            className={styles.imgFirst}
            src={product.img[0].url}
            alt='Product thumb'
          />
          <img
            className={styles.imgSecond}
            src={product.img[1].url}
            alt='Product thumb'
          />
        </Link>
        <div className={styles.actions}>
          <Link to='/' className={styles.actionLink}>
            <BsSuitHeart className={styles.icon} />
          </Link>
          <Link to='/' className={styles.actionLink}>
            <BsSearch className={styles.icon} />
          </Link>
          <Link to='/' className={styles.actionLink}>
            <BsShuffle className={styles.icon} />
          </Link>
        </div>
      </div>
      <div className='product-content'>
        <h3 className='product-name'>
          <Link className='product-link' to={`/product-detail/${product._id}`}>
            {product.name}
          </Link>
        </h3>
        <div className={clsx("product-ratings", styles.ratings)}>
          <ReactStars
            count={5}
            size={20}
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

        <span className='product-price-new'>
          {numberWithCommas(product.priceDecrease)}₫
        </span>
        <span className='product-price-old'>
          {numberWithCommas(product.price)}₫
        </span>

        <br />
        <button className='product-btn-add'>ADD TO CART</button>
      </div>
    </div>
  );
}
