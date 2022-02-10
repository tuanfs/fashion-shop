import React from "react";
import styles from "./PageNotFound.module.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className={styles.pageNotFound}>
        <Container className='d-flex'>
          <div className={styles.container}>
            <h2 className={styles.title}>404</h2>
            <h3 className={styles.subTitle}>Không tìm thấy trang</h3>
            <p className={styles.description}>
              Xin lỗi trang này không tồn tại, có thể đã bị xoá hoặc không có
              sẵn. Bạn vui lòng xem lại đường dẫn{" "}
            </p>

            <Link to='/' className={styles.link}>
              Quay lại trang chủ
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
