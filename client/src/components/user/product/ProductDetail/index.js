import React, { useState, useEffect } from "react";
import styles from "./ProductDetail.module.scss";
import { Container, Row, Col, Table } from "react-bootstrap";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import LoadingItem from "components/user/body/loading/LoadingItem";
import ProductDetailThumbs from "../ProductDetailThumbs";
import {
  fetchOneProduct,
  removeProduct,
  getOneProduct,
  getLoadingProduct,
  addReviewProduct,
} from "features/user/productSlice";
import { Toast } from "react-bootstrap";

import { addProductToCart, getAllCart } from "features/user/cartSlice";

import { getIsAuthenticated } from "features/user/authSlice";

import ProductNotFound from "../ProductNotFound";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const product = useSelector(getOneProduct);
  const [nameAddReview, setNameAddReview] = useState("");
  const [emailAddReview, setEmailAddReview] = useState("");
  const [commentAddReview, setCommentAddReview] = useState("");
  const [ratingReview, setRatingReivew] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [messageErrQuantity, setMessageErrQuantity] = useState("");
  const [messageErrSize, setMessageErrSize] = useState("");
  const [addStatus, setAddStatus] = useState(false);

  const isAuthenticated = useSelector(getIsAuthenticated);
  const loading = useSelector(getLoadingProduct);
  const [tabContent, setTabContent] = useState("review");
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const numberWithCommas = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    dispatch(fetchOneProduct(id));
    return dispatch(removeProduct());
  }, [id, dispatch]);

  const onChangeSize = (size) => {
    setMessageErrSize("");
    setSize(size);
  };
  const onSubmitReview = (e) => {
    e.preventDefault();
    if (ratingReview < 1) {
      setMessageErr("Vui l??ng ??i???n ????nh gi?? c???a b???n");
    } else {
      const formValue = {
        name: nameAddReview,
        email: emailAddReview,
        comment: commentAddReview,
        rating: ratingReview,
      };
      dispatch(addReviewProduct({ id, formValue }));
      dispatch(removeProduct());
      dispatch(fetchOneProduct(id));
    }
  };

  const onChangeRatingReview = (rating) => {
    setMessageErr("");
    setRatingReivew(rating);
  };

  const onAddProductToCart = async (product) => {
    if (!size) {
      setMessageErrSize("Vui l??ng ??i???n size");
    } else if (quantity < 1) {
      setMessageErrQuantity("Vui v??ng ??i???n s??? s???n ph???m");
    } else {
      const valueCart = {
        quantity,
        size,
        name: product.name,
        price: product.priceDecrease,
        img: product.img[0].url,
      };
      const res = await dispatch(addProductToCart({ id, valueCart }));
      console.log(res);
      if (res.payload.success === true) {
        setAddStatus(true);
        setShowToast(true);
      } else {
        setShowToast(true);
        setAddStatus(false);
      }
      dispatch(getAllCart());
    }
  };

  let body = null;

  if (loading) {
    body = <LoadingItem />;
  } else if (Object.keys(product).length === 0) {
    body = <ProductNotFound />;
  } else {
    body = (
      <div className={styles.productDetail}>
        <Row>
          <Col lg={4}>
            <ProductDetailThumbs product={product} />
          </Col>

          <Col lg={8}>
            <div className={styles.content}>
              <h3
                className={clsx(
                  styles.name,
                  "product-name",
                  styles.contentItem
                )}
              >
                {product.name}
              </h3>
              <p
                className={clsx(
                  styles.priceNew,
                  "product-price-new",
                  styles.contentItem
                )}
              >
                {numberWithCommas(product.priceDecrease)}???
              </p>
              <p
                className={clsx(
                  styles.priceOld,
                  "product-price-old",
                  styles.contentItem
                )}
              >
                {numberWithCommas(product.price)}???
              </p>
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
              <p className={clsx(styles.contentItem, styles.sku)}>SKU: 12345</p>
              <p
                className={clsx(
                  styles.description,
                  "product-description",
                  styles.contentItem
                )}
              >
                {product.description}
              </p>
              <div className={clsx(styles.size, styles.contentItem)}>
                <label className={clsx(styles.label)}>Size:</label>
                <span
                  onClick={() => onChangeSize("s")}
                  className={clsx(styles.sizeText, {
                    [styles.activeSize]: size === "s",
                  })}
                >
                  S
                </span>
                <span
                  onClick={() => onChangeSize("m")}
                  className={clsx(styles.sizeText, {
                    [styles.activeSize]: size === "m",
                  })}
                >
                  M
                </span>
                <span
                  onClick={() => onChangeSize("l")}
                  className={clsx(styles.sizeText, {
                    [styles.activeSize]: size === "l",
                  })}
                >
                  L
                </span>
                <span
                  onClick={() => onChangeSize("xl")}
                  className={clsx(styles.sizeText, {
                    [styles.activeSize]: size === "xl",
                  })}
                >
                  Xl
                </span>
              </div>
              {messageErrSize && (
                <p className={styles.messageErrCount}>{messageErrSize}</p>
              )}
              <div className={clsx(styles.count, styles.contentItem)}>
                <button
                  className={clsx(styles.countBtn, styles.countMinus)}
                  disabled={quantity < 1}
                  onClick={() => setQuantity(Number(quantity) - 1)}
                >
                  <i className={clsx("fas fa-minus", styles.icon)}></i>
                </button>
                <div className={styles.countText}>
                  <input
                    type='text'
                    className={styles.input}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                    }}
                  />
                </div>
                <button
                  className={clsx(styles.countBtn, styles.countPlus)}
                  onClick={() => {
                    setMessageErrQuantity("");
                    setQuantity(Number(quantity) + 1);
                  }}
                >
                  <i className={clsx("fas fa-plus", styles.icon)}></i>
                </button>
              </div>
              {messageErrQuantity && (
                <p className={styles.messageErrCount}>{messageErrQuantity}</p>
              )}
              <div className={styles.btnAddWrap}>
                <button
                  className={clsx(styles.btnAdd, "product-btn-add")}
                  onClick={() => onAddProductToCart(product)}
                >
                  Th??m v??o gi??? h??ng
                </button>
              </div>
              <div className={clsx(styles.share, styles.contentItem)}>
                <label className={styles.label}>Chia s???:</label>
                <i className={clsx("fab fa-facebook-square", styles.icon)}></i>
                <i className={clsx("fab fa-twitter-square", styles.icon)}></i>
                <i className={clsx("fab fa-invision", styles.icon)}></i>
                <i className={clsx("fab fa-pinterest-square", styles.icon)}></i>
              </div>
              <div className={clsx(styles.policy, styles.contentItem)}>
                <div className={styles.item}>
                  <i className={clsx("fas fa-check-square", styles.icon)}></i>
                  <p className={styles.description}>Ch??nh s??ch b???o m???t</p>
                </div>
                <div className={styles.item}>
                  <i className={clsx("fas fa-truck-moving", styles.icon)}></i>
                  <p className={styles.description}>Ch??nh s??ch v???n chuy???n</p>
                </div>
                <div className={styles.item}>
                  <i className={clsx("fas fa-sync-alt", styles.icon)}></i>
                  <p className={styles.description}>Ch??nh s??ch ho??n tr???</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <ul className={styles.tabList}>
          <li className={styles.tabItem}>
            <span
              className={clsx(styles.tabLink, {
                [styles.active]: tabContent === "review",
              })}
              onClick={() => setTabContent("review")}
            >
              ????nh gi??
            </span>
          </li>
          <li className={styles.tabItem}>
            <span
              className={clsx(styles.tabLink, {
                [styles.active]: tabContent === "shipping",
              })}
              onClick={() => setTabContent("shipping")}
            >
              Ch??nh s??ch v???n chuy???n
            </span>
          </li>
          <li className={styles.tabItem}>
            <span
              className={clsx(styles.tabLink, {
                [styles.active]: tabContent === "tableSize",
              })}
              onClick={() => setTabContent("tableSize")}
            >
              B???ng size
            </span>
          </li>
        </ul>
        <div className={styles.tabContent}>
          <div
            className={clsx(styles.tabPane, styles.reviews, {
              [styles.active]: tabContent === "review",
            })}
          >
            <ul className={styles.reviewsList}>
              {product.reviews.map((review, index) => (
                <li key={index} className={styles.reviewItem}>
                  <Row className='gx-5'>
                    <Col lg={1}>
                      <div className={styles.avatar}>
                        <img
                          className={styles.avatarItem}
                          src='https://res.cloudinary.com/tuanfs/image/upload/v1642872166/fashion-shop/rose_vittua.jpg'
                          alt='???nh ?????i di???n'
                        />
                      </div>
                    </Col>
                    <Col lg={10} md={12} sm={12}>
                      <div className={styles.content}>
                        <div className={styles.ratings}>
                          <ReactStars
                            size={20}
                            isHalf={true}
                            value={review.rating}
                            edit={false}
                            emptyIcon={<i className='far fa-star'></i>}
                            halfIcon={<i className='fa fa-star-half-alt'></i>}
                          />
                        </div>
                        <div className={styles.name}>{review.name}</div>
                        <div className={styles.date}>
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            DATE_OPTIONS
                          )}
                        </div>
                        <div className={styles.comment}>
                          <p className={styles.text}>{review.comment}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>
            {isAuthenticated && (
              <>
                {" "}
                <div className={styles.addReview}>
                  <h3 className={styles.heading}>Th??m ????nh gi??</h3>
                  <div className={styles.ratings}>
                    <p className={styles.description}>????nh gi?? c???a b???n:</p>
                    <ReactStars
                      count={5}
                      size={20}
                      isHalf={true}
                      onChange={(rating) => onChangeRatingReview(rating)}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                    />
                    {messageErr && (
                      <p className={styles.messageErr}>{messageErr}</p>
                    )}
                  </div>
                </div>
                <div className={styles.form}>
                  <form onSubmit={onSubmitReview}>
                    <Row>
                      <Col>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Name*</label>
                          <input
                            type='text'
                            required
                            className={styles.formControl}
                            value={nameAddReview}
                            onChange={(e) => setNameAddReview(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className={styles.formGroup}>
                          <label className={styles.label}>Email*</label>
                          <input
                            type='email'
                            required
                            className={styles.formControl}
                            value={emailAddReview}
                            onChange={(e) => setEmailAddReview(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Comment</label>
                      <textarea
                        type='text'
                        className={styles.formControl}
                        value={commentAddReview}
                        onChange={(e) => setCommentAddReview(e.target.value)}
                      />
                    </div>
                    <button className={clsx(styles.btnSubmit, "btn-cm")}>
                      ????nh gi??
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
          <div
            className={clsx(styles.tabPane, styles.shipping, {
              [styles.active]: tabContent === "shipping",
            })}
          >
            <h3 className={styles.heading}>
              Ch??nh s??ch v???n chuy???n c???a c???a h??ng ch??ng t??i
            </h3>
            <p className={styles.description}>
              {" "}
              Theo quy ?????nh c???a Shop Kh??ch h??ng s??? KH??NG ???????C XEM H??NG tr?????c khi
              thanh to??n nh??ng ???????c ?????i tr??? sau 24h n???u s???n ph???m b??? l???i t??nh t???
              th???i ??i???m nh???n ???????c h??ng. H??y ch???c ch???n nh???n h??ng v?? ????? th??ng tin
              ch??nh x??c khi ???n Mua h??ng tr??nh tr?????ng h???p giao ??i r???i l???i quay
              v???.
            </p>
            <ul className={styles.noteList}>
              <h4 className={styles.heading}>L??u ??:</h4>
              <li className={styles.noteItem}>
                + Giao h??ng t???n n??i. Nh???n h??ng thanh to??n
              </li>
              <li className={styles.noteItem}>
                + Cam k???t: Ch???t l?????ng v?? m???u m?? s???n ph???m gi???ng v???i h??nh ???nh
              </li>
              <li className={styles.noteItem}>
                + Tr??? h??ng ho??n ti???n trong 24h n???u s???n ph???m b??? l???i
              </li>
              <li className={styles.noteItem}>
                + Ti???t ki???m h??n khi mua nhi???u s???n ph???m
              </li>
              <li className={styles.noteItem}>
                + H??ng s??? ???????c ????ng g??i v?? g???i ??i li???n h??m sau
              </li>
            </ul>
          </div>
          <div
            className={clsx(styles.tabPane, styles.tableSize, {
              [styles.active]: tabContent === "tableSize",
            })}
          >
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>UK</td>
                  <td>18</td>
                  <td>20</td>
                  <td>22</td>
                  <td>24</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>European</td>
                  <td>46</td>
                  <td>48</td>
                  <td>50</td>
                  <td>52</td>
                  <td>54</td>
                </tr>
                <tr>
                  <td>Usa</td>
                  <td>14</td>
                  <td>16</td>
                  <td>18</td>
                  <td>20</td>
                  <td>22</td>
                </tr>
                <tr>
                  <td>Australia</td>
                  <td>10</td>
                  <td>12</td>
                  <td>14</td>
                  <td>16</td>
                  <td>18</td>
                </tr>
                <tr>
                  <td>Canada</td>
                  <td>24</td>
                  <td>18</td>
                  <td>14</td>
                  <td>12</td>
                  <td>10</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.toast}>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src='holder.js/20x20?text=%20'
                className='rounded me-2'
                alt=''
                onClick={() => setShowToast(false)}
              />
              <strong className={clsx("me-auto", styles.textHeader)}>
                Th??ng b??o
              </strong>
            </Toast.Header>
            <Toast.Body>
              {addStatus ? (
                <span
                  className={clsx(styles.toastSuccess, styles.toastMessage)}
                >
                  Th??m v??o gi??? h??ng th??nh c??ng
                </span>
              ) : (
                <span className={clsx(styles.toastFailed, styles.toastMessage)}>
                  {isAuthenticated
                    ? "S???n ph???m ???? c?? trong gi??? h??ng"
                    : "B???n vui l??ng ????ng nh???p ????? mua s???n ph???m"}
                </span>
              )}
            </Toast.Body>
          </Toast>
        </div>

        <Container>{body}</Container>
      </div>
    </>
  );
}
