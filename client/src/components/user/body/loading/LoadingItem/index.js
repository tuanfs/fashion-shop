import React from "react";
import styles from "./LoadingItem.module.scss";

export default function LoadingItem() {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.list}>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
        </div>
      </div>
    </>
  );
}
