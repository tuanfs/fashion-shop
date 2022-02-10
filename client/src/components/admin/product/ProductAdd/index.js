import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import styles from "./ProductAdd.module.scss";
import clsx from "clsx";
import { addProductFc } from "features/admin/productSlice";
import ProductForm from "../ProductForm";
import { Link } from "react-router-dom";

export default function ProductAdd() {
  const [show, setShow] = useState(false);
  const [abc, setAbc] = useState("");

  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    mainImg: "",
    subImg: "",
  });
  const { name, price, category, description, mainImg, subImg } = formValue;
  const formChange = (e) => {
    e.preventDefault();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formAdd = {
      name,
      price,
      category,
      description,
      mainImg: abc,
      subImg,
    };
    const status = addProductFc(formAdd);
    if (status) {
      setShow(true);
      setFormValue({
        name: "",
        price: "",
        category: "",
        description: "",
        mainImg: "",
        subImg: "",
      });
    } else {
      setShow(false);
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  const onChangeFile = (e) => {
    e.preventDefault();
    setAbc(e.target.files[0]);
  };
  console.log(abc);
  return (
    <>
      <Container>
        <h3 className={clsx(styles.heading, "mb-4 mt-4")}>Thêm sản phẩm</h3>
        <ProductForm
          formValue={formValue}
          onChange={formChange}
          onSubmit={handleSubmit}
          abc={abc}
          onChangeFile={onChangeFile}
        />
        <Modal
          className={styles.modal}
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn đã tạo sản phẩm thành công</Modal.Body>
          <Modal.Footer>
            <Button
              className={styles.btnModal}
              variant='secondary'
              onClick={handleClose}
            >
              Thêm sản phẩm
            </Button>
            <Link to='/admin/product'>
              <Button className={styles.btnModal} variant='primary'>
                Danh mục sản phẩm
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
