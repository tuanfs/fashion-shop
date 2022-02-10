import React from "react";
import styles from "./ModalRegister.module.scss";
import clsx from "clsx";

export default function ModalRegister(props) {
  const { showModal, onSuccess, onClose, contentType } = props;
  return (
    <>
      <div className={clsx(styles.modal, { [styles.active]: showModal })}>
        <div
          className={clsx(styles.content, {
            [styles.success]: contentType === "success",
          })}
        >
          <div className={styles.iconWrap}>
            <i className={clsx("far fa-check-circle", styles.bigIcon)}></i>
          </div>
          <h3 className={styles.heading}>Đăng ký tài khoản thành công</h3>
          <div className={styles.description}>
            <p className={styles.text}>
              <i className='fas fa-check-circle'></i> Chúc mừng bạn đã tạo tài
              khoản thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
            </p>
          </div>
          <button className={styles.btn} onClick={onSuccess}>
            Đăng nhập
          </button>
          <div className={styles.close} onClick={onClose}>
            <i className={clsx("fas fa-times", styles.icon)}></i>
          </div>
        </div>
        <div
          className={clsx(styles.content, {
            [styles.failed]: contentType === "failed",
          })}
        >
          <div className={styles.iconWrap}>
            <i className={clsx("far fa-check-circle", styles.bigIcon)}></i>
          </div>
          <h3 className={styles.heading}>Đăng ký tài khoản thất bại</h3>
          <div className={styles.description}>
            <p className={styles.text}>
              <i className='fas fa-check-circle'></i> Đăng ký tài khoản thất
              bại. Xin vui lòng thử lại
            </p>
          </div>
          <button className={styles.btn} onClick={onClose}>
            Thử lại
          </button>
          <div className={styles.close} onClick={onClose}>
            <i className={clsx("fas fa-times", styles.icon)}></i>
          </div>
        </div>
      </div>
    </>
  );
}
