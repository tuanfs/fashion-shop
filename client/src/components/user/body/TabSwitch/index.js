import React from "react";
import styles from "./TabSwitch.module.scss";
import clsx from "clsx";
import { Container } from "react-bootstrap";
export default function TabSwitch(props) {
  const { tabContent, handleTab, heading } = props;
  return (
    <>
      {" "}
      <Container>
        <div className={clsx("d-flex", styles.tab)}>
          {heading && (
            <h3 className={clsx(styles.heading, "me-auto")}>{heading}</h3>
          )}
          <ul className={styles.tabList}>
            <li className={styles.tabItem}>
              <span
                onClick={() => handleTab("tabNew")}
                className={clsx(
                  { [styles.active]: tabContent === "tabNew" ? "active" : "" },
                  styles.link
                )}
              >
                Hàng mới về
              </span>
            </li>
            <li className={styles.tabItem}>
              <span
                onClick={() => handleTab("tabSeller")}
                className={clsx(
                  {
                    [styles.active]: tabContent === "tabSeller" ? "active" : "",
                  },
                  styles.link
                )}
              >
                Bán chạy nhất
              </span>
            </li>
            <li className={styles.tabItem}>
              <span
                onClick={() => handleTab("tabSale")}
                className={clsx(
                  { [styles.active]: tabContent === "tabSale" ? "active" : "" },
                  styles.link
                )}
              >
                Hàng giảm giá
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
}
