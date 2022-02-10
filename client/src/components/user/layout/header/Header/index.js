import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { BsSuitHeart, BsSearch, BsBag } from "react-icons/bs";
import Search from "../Search";
import ModalCart from "../ModalCart";
import clsx from "clsx";
import { getIsAuthenticated, logoutUser } from "features/user/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { allCart, removeAllCart } from "features/user/cartSlice";

export default function Header() {
  const [showModal, setShowModal] = useState("");
  const cart = useSelector(allCart);
  const location = useLocation();
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState("");
  const [showModalNav, setShowModalNav] = useState(false);
  const onHideModalNav = () => {
    setShowModalNav(false);
  };
  const onModalNav = () => {
    setShowModalNav(true);
  };

  const isAuthenticated = useSelector(getIsAuthenticated);
  let searchIcon = false;
  const handleClickSearch = () => {
    setShowModal("show");
  };

  if (location.pathname === "/search") {
    searchIcon = true;
  }
  const hideModal = () => {
    setShowModal("");
  };

  const handleShowCart = () => {
    setShowCart("show");
  };

  const handleHideCart = () => {
    setShowCart("");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(removeAllCart());
  };

  return (
    <>
      <div className={styles.headerWrap}>
        <Container className={styles.header}>
          <Row className={styles.headerRow}>
            <Col lg={3} md={6} sm={6} xs={4}>
              <div className={styles.wrapLogo}>
                <Link to='/' className={styles.logo}>
                  Fashion
                </Link>
              </div>
            </Col>
            <Col lg={6} className={styles.navWrap}>
              <Navbar
                showModalNav={showModalNav}
                onHideModalNav={onHideModalNav}
              />
            </Col>
            <Col lg={3} md={6} xs={8} sm={{ span: 6 }}>
              <div className={styles.actions}>
                <div
                  className={clsx(styles.icon, { [styles.hide]: searchIcon })}
                  onClick={handleClickSearch}
                >
                  <BsSearch />
                </div>
                <div className={styles.user}>
                  {isAuthenticated ? (
                    <>
                      <div className={styles.avatar}>
                        <img
                          className={styles.img}
                          src='https://res.cloudinary.com/tuanfs/image/upload/v1642872166/fashion-shop/rose_vittua.jpg'
                          alt='Ảnh đại diện'
                        />
                      </div>
                      <ul className={clsx(styles.dropdown)}>
                        <li className={styles.item}>
                          <div className={styles.avatar}>
                            <img
                              className={styles.img}
                              src='https://res.cloudinary.com/tuanfs/image/upload/v1642872166/fashion-shop/rose_vittua.jpg'
                              alt='Ảnh đại diện'
                            />
                          </div>
                          <div className={styles.info}>
                            <h3 className={styles.name}>
                              {localStorage.getItem("USER_NAME")}
                            </h3>
                          </div>
                        </li>
                        <li className={styles.item}>
                          <Link to='/' className={styles.link}>
                            Cài đặt
                          </Link>
                        </li>
                        <li className={styles.item}>
                          <Link to='/change-password' className={styles.link}>
                            Đổi mật khẩu
                          </Link>
                        </li>
                        <li className={styles.item}>
                          <Link
                            to='/'
                            className={styles.link}
                            onClick={handleLogout}
                          >
                            Đăng xuất
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <div className={styles.icon}>
                      <Link to='/login'>
                        <i className='far fa-user-circle'></i>
                      </Link>
                    </div>
                  )}
                </div>
                <div className={styles.icon}>
                  <BsSuitHeart />
                </div>

                <div className={styles.icon} onClick={handleShowCart}>
                  <BsBag />
                  <span className={styles.numberOfCart}>
                    {cart.cartItems ? cart.cartItems.length : 0}
                  </span>
                </div>
                <div
                  className={clsx(styles.icon, styles.bars)}
                  onClick={onModalNav}
                >
                  <i className='fas fa-bars'></i>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Search showModal={showModal} onHide={hideModal} />
      <ModalCart showCart={showCart} onHide={handleHideCart} />
    </>
  );
}
