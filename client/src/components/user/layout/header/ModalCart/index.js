import React, { useEffect, useState } from "react";
import styles from "./ModalCart.module.scss";
import clsx from "clsx";
import { BsX, BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCart,
  allCart,
  loadingCart,
  updateCart,
  deleteCart,
} from "features/user/cartSlice";
import { getIsAuthenticated } from "features/user/authSlice";
import LoadingItem from "components/user/body/loading/LoadingItem";

export default function ModalCart(props) {
  const dispatch = useDispatch();
  const cart = useSelector(allCart);
  const loading = useSelector(loadingCart);
  const [quantityList, setQuantityList] = useState({});
  const isAuthenticated = useSelector(getIsAuthenticated);

  const { showCart, onHide } = props;
  const numberWithCommas = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllCart());
    }
  }, [dispatch, isAuthenticated]);
  const onClickQuantity = async (product, quantity) => {
    await setQuantityList({ ...quantityList, [product]: quantity });
    await dispatch(updateCart({ id: product, quantity }));
    dispatch(getAllCart());
  };

  const onBlurQuantity = async (product, quantity) => {
    await dispatch(updateCart({ id: product, quantity }));
    dispatch(getAllCart());
  };

  const onDeleteProduct = async (id) => {
    const res = await dispatch(deleteCart(id));
    if (res.payload.success === true) {
      if (Object.keys(cart).length > 0) {
        dispatch(getAllCart());
      }
    }
  };
  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const result = {};
      cart.cartItems.forEach((cart) => {
        result[cart.product] = cart.quantity;
      });
      setQuantityList({ ...result });
    }
  }, [cart]);

  let body = null;

  if (Object.keys(cart).length === 0) {
    body = <LoadingItem />;
  } else if (cart.cartItems.length === 0) {
    body = <div>Giỏ hàng trống</div>;
  } else {
    body = cart.cartItems.map((cart, index) => {
      return (
        <li key={index} className={styles.cartItem}>
          <div className={styles.imgWrap}>
            <img className={styles.img} src={cart.img} alt='Ảnh sản phẩm' />
          </div>
          <div className={styles.body}>
            <h4 className={styles.name}>{cart.name}</h4>
            <div className={styles.price}>
              <span className={styles.discount}>
                {numberWithCommas(cart.price)}₫
              </span>
            </div>
            <div className={clsx(styles.quantity)}>
              <button
                className={clsx(styles.quantityBtn, styles.quantityMinus)}
                disabled={quantityList[cart.product] < 1}
                onClick={() =>
                  onClickQuantity(
                    [cart.product],
                    quantityList[cart.product] - 1
                  )
                }
              >
                <i className={clsx("fas fa-minus", styles.icon)}></i>
              </button>
              <div className={styles.quantityText}>
                <input
                  type='text'
                  className={styles.input}
                  value={quantityList[cart.product] || 0}
                  onBlur={() =>
                    onBlurQuantity([cart.product], quantityList[cart.product])
                  }
                  onChange={(e) => {
                    setQuantityList({
                      ...quantityList,
                      [cart.product]: Number(e.target.value),
                    });
                  }}
                />
              </div>
              <button
                className={clsx(styles.quantityBtn, styles.quantityPlus)}
                onClick={() =>
                  onClickQuantity(
                    [cart.product],
                    quantityList[cart.product] + 1
                  )
                }
              >
                <i className={clsx("fas fa-plus", styles.icon)}></i>
              </button>
            </div>
          </div>
          <div
            className={styles.delete}
            onClick={() => onDeleteProduct(cart.product)}
          >
            <BsTrashFill />
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <div className={clsx({ [styles.show]: showCart })}>
        <div className={styles.overlay} onClick={onHide}></div>
        <div className={styles.cart}>
          <div className={styles.btnClose} onClick={onHide}>
            <BsX className={styles.icons} />
          </div>
          <h3 className={styles.heading}>Giỏ hàng của bạn</h3>
          <ul className={styles.cartList}>{body}</ul>
          <div className={styles.total}>
            <h4 className={styles.text}>Tổng cộng</h4>
            <h4 className={styles.text}>
              {!loading ? numberWithCommas(cart.cartTotal || 0) : "0"}₫
            </h4>
          </div>
          <button className={clsx("primary-btn", styles.btn)}>
            Xem giỏ hàng
          </button>
          <button className={clsx("primary-btn", styles.btn)}>
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
}
