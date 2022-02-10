import React, { useState, useEffect } from "react";
import styles from "../Authentication.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Container, Row, Col } from "react-bootstrap";
import { loginUser, getIsAuthenticated } from "features/user/authSlice";
import { createCart } from "features/user/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const [errorMessage, setErrorMessage] = useState(false);
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Bạn thiếu mật khẩu"),
    email: Yup.string()
      .required("Bạn thiếu email")
      .email("Hãy nhập đúng email của bạn"),
  });

  const formOptios = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptios);

  const onSubmit = async (data) => {
    const res = await dispatch(loginUser(data));
    if (res.payload === undefined) {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(createCart());

      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <div className={clsx(styles.login, styles.formItem)}>
              <h3 className={styles.heading}>Đăng Nhập</h3>
              <p className={styles.description}>
                Vui lòng đăng nhập để sử dụng
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div
                  className={clsx(styles.message, styles.singleForm, {
                    [styles.active]: errorMessage,
                  })}
                >
                  <p>Tài khoản hoặc mật khẩu không chính xác</p>
                </div>
                <div
                  className={clsx(styles.singleForm, {
                    [styles.error]: errors.email,
                  })}
                >
                  <input
                    name='email'
                    {...register("email", { required: true })}
                    type='text'
                    className={styles.formControl}
                    placeholder='Nhập email của bạn...'
                  />
                  {<p className={styles.errorInput}>{errors.email?.message}</p>}
                </div>
                <div
                  className={clsx(styles.singleForm, {
                    [styles.error]: errors.password,
                  })}
                >
                  <input
                    name='password'
                    {...register("password", { required: true })}
                    type='password'
                    className={clsx(styles.formControl)}
                    placeholder='Nhập mật khẩu của bạn...'
                  />
                  {
                    <p className={styles.errorInput}>
                      {errors.password?.message}
                    </p>
                  }
                </div>
                <div className={clsx(styles.feature, styles.singleForm)}>
                  <div className={styles.featureItem}>
                    <label className={styles.label}>
                      <input type='checkbox' className={styles.checkbox} />
                      <span className={styles.checkmark}></span>
                      Nhớ mật khẩu
                    </label>
                  </div>
                  <div className={styles.featureItem}>
                    <Link to='/' className={styles.link}>
                      Bạn quên mật khẩu ?
                    </Link>
                  </div>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className={clsx(
                    "primary-btn",
                    styles.btnSubmit,
                    styles.singleForm
                  )}
                >
                  Đăng Nhập
                </button>
              </form>
              <div className={styles.linkWrap}>
                <Link to='/register' className={styles.link}>
                  Đăng ký tài khoản
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
