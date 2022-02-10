import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { BsXLg } from "react-icons/bs";

export default function Navbar(props) {
  const { showModalNav, onHideModalNav } = props;

  const navOnClick = (e) => {
    console.log(e.target);
    if (
      e.target.className.includes("subLink") ||
      e.target.className.includes("text")
    ) {
      onHideModalNav();
    }
  };

  const handleMenu = (e) => {};
  return (
    <>
      <div
        className={clsx(styles.modal, { [styles.active]: showModalNav })}
        onClick={onHideModalNav}
      ></div>
      <ul
        className={clsx(styles.navList, { [styles.active]: showModalNav })}
        onClick={navOnClick}
      >
        <div className={styles.btnClose} onClick={onHideModalNav}>
          <i className={clsx("fas fa-times", styles.iconClose)}></i>
        </div>
        <li className={styles.navItem}>
          <Link to='/' className={styles.link}>
            <span className={styles.text}>Trang chủ</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <div to='/' className={clsx(styles.link)} onClick={handleMenu}>
            <span className={styles.text}>Đồ nam</span>
            <i className={clsx("fas fa-angle-down", styles.icon)}></i>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Áo</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/category/shirt-men' className={styles.subLink}>
                    Áo sơ mi
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/category/t-shirt-men' className={styles.subLink}>
                    Áo phông
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/category/sweater-men' className={styles.subLink}>
                    Áo len
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/category/jacket-men' className={styles.subLink}>
                    Áo khoác
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Áo nỉ có mũ
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Áo polo
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Quần</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quần vải
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quẩn shots
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quần jeans
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quần nỉ
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quần khaki
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Giày</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày da
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày lười
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày thể thao
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày vải
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày boot
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày Tây
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <div to='/' className={styles.link} onClick={handleMenu}>
            <span className={styles.text}>Đồ nữ</span>
            <i className={clsx("fas fa-angle-down", styles.icon)}></i>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Áo</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/category/shirt-women' className={styles.subLink}>
                    Áo sơ mi
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/category/t-shirt-women' className={styles.subLink}>
                    Áo phông
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/category/sweater-women' className={styles.subLink}>
                    Áo len
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Áo khoác
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Áo nỉ có mũ
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Áo polo
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Quần {"&"} Váy</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quần vải
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quẩn shots
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quần jeans
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Chân váy
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Quần Legging
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Giày</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày cao gót
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày lười
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày thể thao
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày sandal
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày búp bê
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Giày vải
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <div to='/' className={styles.link} onClick={handleMenu}>
            <span className={styles.text}>Phụ kiện</span>
            <i className={clsx("fas fa-angle-down", styles.icon)}></i>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Mũ</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Mũ lưỡi trai
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Mũ len
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Mũ thêu
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Mũ carot
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Mũ thuỷ thủ
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Mũ bucket
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Túi {"&"} Balo</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Túi chéo một bên
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Túi chéo ngực
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Balo đựng laptop
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Balo đeo vai
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Ba lô học sinh
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.menuItem}>
              <h3 className={styles.heading}>Phụ kiện khác</h3>
              <span className={styles.separate}></span>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Dây đồng hồ
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Kẹp tóc nơ
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Khăn len
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Tất nam
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link to='/' className={styles.subLink}>
                    Tất nữ
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className={styles.navItem}>
          <Link to='/' className={styles.link}>
            <span className={styles.text}>Liên hệ</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
