import React, { useState, useEffect } from "react";
import styles from "../Authentication.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  registerUser,
  checkEmailUser,
  getIsEmail,
} from "features/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalRegister from "../ModalRegister";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [contentType, setContentType] = useState("");
  const isEmail = useSelector(getIsEmail);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Bạn thiếu mật khẩu")
      .min(8, "Mật khẩu phải chưa tối thiểu 8 ký tự"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu nhập lại không chính xác"
    ),
    email: Yup.string()
      .required("Bạn thiếu email")
      .email("Vui lòng nhập đúng email của bạn"),
    firstName: Yup.string().required("Bạn thiếu họ"),
    lastName: Yup.string().required("Bạn thiếu tên"),
    checkbox: Yup.boolean().oneOf(
      [true],
      "Vui lòng đồng ý với điều khoản của chúng tôi"
    ),
  });

  const formOptios = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptios);

  const onSubmit = async (data) => {
    if (data.checkbox) {
      const { firstName, lastName, email, password } = data;
      const res = await dispatch(
        registerUser({
          name: `${firstName} ${lastName}`,
          email,
          password,
        })
      );
      console.log(res);
      if (res.payload.success === true) {
        setShowModal(true);
        setContentType("success");
      } else {
        setShowModal(true);
        setContentType("failed");
      }
    }
  };

  useEffect(() => {
    if (!isEmail) {
      setMessageEmail("Email đã tồn tại. Vui lòng thử lại email khác");
    }
    return () => {
      setMessageEmail("");
    };
  }, [isEmail]);
  const handleSuccess = () => {
    setShowModal(false);
    navigate("/login");
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleOnBlur = (e) => {
    e.preventDefault();
    const email = e.target.value;
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const valid = emailRegex.test(email);
    if (valid) {
      dispatch(checkEmailUser(email));
      setMessageEmail("");
    } else {
      setMessageEmail("Vui lòng nhập đúng email của bạn");
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <div className={clsx(styles.register, styles.formItem)}>
              <h3 className={styles.heading}>Đăng Ký</h3>
              <p className={styles.description}>Vui lòng đăng ký để sử dụng</p>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div
                  className={clsx(styles.singleForm, {
                    [styles.error]: errors.firstName,
                  })}
                >
                  <input
                    name='firstName'
                    {...register("firstName", { required: true })}
                    type='text'
                    className={styles.formControl}
                    placeholder='Nhập họ của bạn...'
                  />
                  {
                    <p className={styles.errorInput}>
                      {errors.firstName?.message}
                    </p>
                  }
                </div>{" "}
                <div
                  className={clsx(styles.singleForm, {
                    [styles.error]: errors.lastName,
                  })}
                >
                  <input
                    name='lastName'
                    {...register("lastName", { required: true })}
                    type='text'
                    className={styles.formControl}
                    placeholder='Nhập tên của bạn...'
                  />
                  {
                    <p className={styles.errorInput}>
                      {errors.lastName?.message}
                    </p>
                  }
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
                    onBlur={handleOnBlur}
                  />
                  {
                    <p className={styles.errorInput}>
                      {errors.email?.message || messageEmail}
                    </p>
                  }
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
                <div
                  className={clsx(styles.singleForm, {
                    [styles.error]: errors.password,
                  })}
                >
                  <input
                    name='passwordConfirm'
                    {...register("passwordConfirm", { required: true })}
                    type='password'
                    className={clsx(styles.formControl)}
                    placeholder='Nhập lại mật khẩu của bạn...'
                  />
                  {
                    <p className={styles.errorInput}>
                      {errors.passwordConfirm?.message}
                    </p>
                  }
                </div>
                <div className={clsx(styles.feature, styles.singleForm)}>
                  <div className={styles.featureItem}>
                    <label className={styles.label}>
                      <input
                        type='checkbox'
                        name='checkbox'
                        className={styles.checkbox}
                        {...register("checkbox", { required: true })}
                      />
                      <span className={styles.checkmark}></span>
                      Bạn đã đồng ý với{" "}
                      <span className={styles.policy}> Điều khoản </span> của
                      chúng tôi
                    </label>
                    {
                      <p className={styles.errorInput}>
                        {errors.checkbox?.message}
                      </p>
                    }
                  </div>
                </div>
                <button
                  onClick={onSubmit}
                  className={clsx(
                    "primary-btn",
                    styles.btnSubmit,
                    styles.singleForm
                  )}
                >
                  Đăng Ký
                </button>
              </form>
              <div className={styles.linkWrap}>
                <Link to='/login' className={styles.link}>
                  Đăng nhập
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalRegister
        onSuccess={handleSuccess}
        showModal={showModal}
        onClose={handleClose}
        contentType={contentType}
      />
    </>
  );
}
