import React from "react";
import styles from "./Breadcrumb.module.scss";
import { Link } from "react-router-dom";

export default function Breadcrumb(props) {
  const { title } = props;
  return (
    <>
      <div className={styles.breadcrumb}>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.body}>
            <Link to='/' className={styles.link}>
              <span className={styles.text}>Home</span> /{" "}
            </Link>
            <p className={styles.description}> {title}</p>
          </div>
        </div>
      </div>
    </>
  );
}
