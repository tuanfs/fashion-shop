import React, { useState } from "react";
import styles from "./Search.module.scss";
import { BsX } from "react-icons/bs";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export default function Search(props) {
  const { showModal, onHide } = props;

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?${keyword && `keyword=${keyword}`}`);
    onHide();
  };
  return (
    <div className={clsx(styles.modalSearch, { [styles.show]: showModal })}>
      <div className={styles.searchWrap}>
        <div className={styles.search}>
          <form className={styles.searchForm} onSubmit={onSubmit}>
            <div className={styles.formControl}>
              <input
                type='text'
                placeholder='Nhập từ khoá của bạn...'
                name='keyword'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.input}
              />
            </div>
          </form>
          <button className={styles.btnClose} onClick={onHide}>
            <BsX className={styles.icons} />
          </button>
          <div className={styles.box}></div>
        </div>
      </div>
    </div>
  );
}
