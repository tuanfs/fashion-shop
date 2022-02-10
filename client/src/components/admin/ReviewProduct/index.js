import React from "react";
import styles from "./ReviewProduct.module.scss";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ReviewProduct() {
  const star = (number) => {
    let html = [];
    for (let i = 1; i <= number; i++) {
      html.push(<i className='fas fa-star' key={i}></i>);
    }
    return html;
  };
  return (
    <Container className={styles.reviewProduct}>
      <h3 className={styles.heading}>Đánh giá sản phẩm mới nhất</h3>
      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Họ tên</th>
            <th>Đánh giá</th>
            <th>Bình luận</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>tuanpro4@gmail.com</td>
            <td>Lê Văn Tuấn</td>
            <td>
              <div className={styles.starList}>{star(5)}</div>
            </td>
            <td className={styles.comment}>
              Sản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng hơn
              nữaSản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng
              hơn nữa
            </td>
            <td>
              <Button variant='primary'>
                <Link to='/' className={styles.link}>
                  Chi tiết
                </Link>
              </Button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>tuanpro4@gmail.com</td>
            <td>Lê Văn Tuấn</td>
            <td>
              <div className={styles.starList}>{star(5)}</div>
            </td>
            <td className={styles.comment}>
              Sản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng hơn
              nữaSản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng
              hơn nữa
            </td>
            <td>
              <Button variant='primary'>
                <Link to='/' className={styles.link}>
                  Chi tiết
                </Link>
              </Button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>tuanpro4@gmail.com</td>
            <td>Lê Văn Tuấn</td>
            <td>
              <div className={styles.starList}>{star(5)}</div>
            </td>
            <td className={styles.comment}>
              Sản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng hơn
              nữaSản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng
              hơn nữa
            </td>
            <td>
              <Button variant='primary'>
                <Link to='/' className={styles.link}>
                  Chi tiết
                </Link>
              </Button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>tuanpro4@gmail.com</td>
            <td>Lê Văn Tuấn</td>
            <td>
              <div className={styles.starList}>{star(5)}</div>
            </td>
            <td className={styles.comment}>
              Sản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng hơn
              nữaSản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng
              hơn nữa
            </td>
            <td>
              <Button variant='primary'>
                <Link to='/' className={styles.link}>
                  Chi tiết
                </Link>
              </Button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>tuanpro4@gmail.com</td>
            <td>Lê Văn Tuấn</td>
            <td>
              <div className={styles.starList}>{star(5)}</div>
            </td>
            <td className={styles.comment}>
              Sản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng hơn
              nữaSản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng
              hơn nữa
            </td>
            <td>
              <Button variant='primary'>
                <Link to='/' className={styles.link}>
                  Chi tiết
                </Link>
              </Button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>tuanpro4@gmail.com</td>
            <td>Lê Văn Tuấn</td>
            <td>
              <div className={styles.starList}>{star(5)}</div>
            </td>
            <td className={styles.comment}>
              Sản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng hơn
              nữaSản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng
              hơn nữa
            </td>
            <td>
              <Button variant='primary'>
                <Link to='/' className={styles.link}>
                  Chi tiết
                </Link>
              </Button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>tuanpro4@gmail.com</td>
            <td>Lê Văn Tuấn</td>
            <td>
              <div className={styles.starList}>{star(5)}</div>
            </td>
            <td className={styles.comment}>
              Sản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng hơn
              nữaSản phẩm rất tốt , hy vọng nó sẽ đến được tay nhiều khách hàng
              hơn nữa
            </td>
            <td>
              <Button variant='primary'>
                <Link to='/' className={styles.link}>
                  Chi tiết
                </Link>
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
