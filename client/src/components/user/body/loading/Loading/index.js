import React from "react";
import styles from "./Loading.module.scss";
import LoadingItem from "../Loading";
export default function Loading() {
  return (
    <>
      <div className={styles.loading}>
        <LoadingItem />
      </div>
    </>
  );
}
