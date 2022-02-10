import React from "react";
import { Container } from "react-bootstrap";
import styles from "./BigBanner.module.scss";
import { Link } from "react-router-dom";

export default function BigBanner() {
  return (
    <div className='section' data-aos='fade-up'>
      <Container>
        <div className={styles.banner}>
          <Link to='/'>
            <img
              className={styles.img}
              src='https://res.cloudinary.com/tuanfs/image/upload/v1641664030/fashion-shop/big-banner_ltd12f.webp'
              alt='Banner'
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}
