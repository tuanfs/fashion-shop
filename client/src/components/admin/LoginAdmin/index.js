import React, { useState, useEffect } from "react";
import styles from "./LoginAdmin.module.scss";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, getIsAuthenticatedAdmin } from "features/admin/authSlice";

export default function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticatedAdmin);
  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
  });
  const { name, password } = formValue;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(formValue));
  };
  const formChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/product");
    }
  }, [dispatch, isAuthenticated]);
  console.log("cfccv");
  return (
    <Container>
      <div className={styles.loginForm}>
        <h3 className={clsx(styles.heading, "mb-4")}>Đăng Nhập</h3>
        <p className={styles.description}>
          Hãy đăng nhập tài khoản của bạn ở bên dưới
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className={clsx("form-control mb-5 mt-5", styles.formControl)}
              placeholder='Name...'
              type='text'
              value={name}
              name='name'
              onChange={formChange}
            />
          </div>
          <div>
            <input
              className={clsx("form-control mb-5 mt-5", styles.formControl)}
              placeholder='Password...'
              type='password'
              name='password'
              value={password}
              onChange={formChange}
            />
          </div>
          <button className={clsx(styles.btnLogin, "btn")}>Login</button>
        </form>
      </div>
    </Container>
  );
}
