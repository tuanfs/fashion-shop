import React from "react";
import styles from "./ProductNotFound.module.scss";

export default function ProductNotFound() {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <p className={styles.description}>Không tìm thấy sản phẩm</p>
      </div>
    </div>
  );
}
