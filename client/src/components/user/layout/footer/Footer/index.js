import React from "react";
import styles from "./Footer.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import clsx from "clsx";
export default function Footer() {
  return (
    <>
      <div className={clsx(styles.footer, "footer")}>
        <Container>
          <Row className='gx-4'>
            <Col data-aos='fade-right' lg={3} md={6} sm={6}>
              <div className={styles.footerItem}>
                <h3 className={styles.heading}>Liên hệ</h3>
                <ul className={styles.list}>
                  <li className={styles.item}>
                    <span className={styles.title}>Địa chỉ :</span>
                    <span className={styles.text}>
                      112 ,Phan Đình Phùng, TP.Hà Tĩnh
                    </span>
                  </li>
                  <li className={styles.item}>
                    <span className={styles.title}>Điện thoại :</span>
                    <span className={styles.text}> 0829-675-675</span>
                  </li>
                  <li className={styles.item}>
                    <span className={styles.title}>Điện thoại cố định :</span>
                    <span className={styles.text}> 02253-456-789</span>
                  </li>
                  <li className={styles.item}>
                    <span className={styles.title}>Email :</span>
                    <span className={styles.text}> tuanfs.vn@gmail.com</span>
                  </li>
                  <li className={styles.iconList}></li>
                </ul>
              </div>
            </Col>
            <Col data-aos='fade-right' lg={3} md={6} sm={6}>
              <div className={styles.footerItem}>
                <h3 className={styles.heading}>Thông tin</h3>
                <ul className={styles.list}>
                  <li className={styles.item}>
                    <Link to='/' className={styles.link}>
                      Giới thiệu
                    </Link>
                  </li>
                  <li className={styles.item}>
                    <Link to='/' className={styles.link}>
                      Thông tin vận chuyển
                    </Link>
                  </li>
                  <li className={styles.item}>
                    <Link to='/' className={styles.link}>
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li className={styles.item}>
                    {" "}
                    <Link to='/' className={styles.link}>
                      Điều khoản và điều kiện
                    </Link>
                  </li>
                  <li className={styles.item}>
                    {" "}
                    <Link to='/' className={styles.link}>
                      Dịch vụ khách hàng
                    </Link>
                  </li>
                  <li className={styles.item}>
                    {" "}
                    <Link to='/' className={styles.link}>
                      Chính sách hoàn trả
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col data-aos='fade-left' lg={3} md={6} sm={6}>
              <div className={styles.footerItem}>
                <h3 className={styles.heading}>Tài khoản</h3>
                <ul className={styles.list}>
                  <li className={styles.item}>
                    <Link to='/' className={styles.link}>
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li className={styles.item}>
                    <Link to='/' className={styles.link}>
                      Danh sách yêu thích
                    </Link>
                  </li>
                  <li className={styles.item}>
                    <Link to='/' className={styles.link}>
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li className={styles.item}>
                    {" "}
                    <Link to='/' className={styles.link}>
                      Trung tâm hỗ trợ
                    </Link>
                  </li>
                  <li className={styles.item}>
                    {" "}
                    <Link to='/' className={styles.link}>
                      Bản tin
                    </Link>
                  </li>
                  <li className={styles.item}>
                    {" "}
                    <Link to='/' className={styles.link}>
                      Điều khoản sử dụng
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col data-aos='fade-left' lg={3} md={6} sm={6}>
              <div className={styles.footerItem}>
                <h3 className={styles.heading}>Bản tin</h3>
                <div className={styles.list}>
                  <h4 className={styles.description}>
                    Cập nhật email của bạn để nhận thông tin khuyến mãi sớm nhất
                  </h4>
                  <form>
                    <div>
                      <input
                        placeholder='Nhập email của bạn...'
                        name='email'
                        type='email'
                        className={styles.formControl}
                      />
                      <button className={clsx(styles.btnSubscribe, "btn-cm")}>
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
