import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import clsx from "clsx";
import styles from "./ProductForm.module.scss";

export default function ProductForm(props) {
  const { formValue, onSubmit, onChange, abc, onChangeFile } = props;
  const { name, price, category, description, subImg, mainImg } = formValue;

  return (
    <>
      <Form method='post' className={styles.form} onSubmit={onSubmit}>
        <Form.Group className='mb-3' controlId=''>
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={name || ""}
            onChange={onChange}
            // required
            placeholder='Nhập tên sản phẩm'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId=''>
          <Form.Label>Giá sản phẩm</Form.Label>
          <Form.Control
            // required
            type='text'
            name='price'
            value={price || ""}
            onChange={onChange}
            placeholder='Nhập giá sản phẩm'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId=''>
          <Form.Label>Danh muc sản phẩm</Form.Label>
          <Form.Control
            // required
            type='text'
            name='category'
            value={category || ""}
            onChange={onChange}
            placeholder='Nhập danh mục sản phẩm'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId=''>
          <Form.Label>Mô tả sản phẩm</Form.Label>
          <Form.Control
            // required
            as='textarea'
            name='description'
            value={description || ""}
            onChange={onChange}
            placeholder='Nhập mô tả sản phẩm'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId=''>
          <Form.Label>Ảnh sản phẩm</Form.Label>
          <Form.Control
            type='file'
            placeholder='Nhập đường dẫn ảnh sản phẩm 1'
            name='mainImg'
            onChange={onChangeFile}
            // required
          />
          {/* <Form.Control
            className='mb-2 mt-2'
            type='file'
            multiple='multiple'
            name='subImg'
            value={subImg || ""}
            onChange={onChange}
            placeholder='Nhập đường ảnh dẫn sản phẩm 2'
          /> */}
        </Form.Group>

        <Button size='lg' variant='primary' type='submit'>
          Thêm sản phẩm
        </Button>
      </Form>
    </>
  );
}
