import React, { useState, useEffect } from "react";
import ProductForm from "../ProductForm";
import styles from "./ProductEdit.module.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import {
  fetchOneAsyncProduct,
  getProduct,
  resetProduct,
  getLoading,
  setLoading,
} from "features/admin/productSlice";
import { useParams } from "react-router-dom";

export default function ProductEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProduct);
  const loading = useSelector(getLoading);
  console.log(loading);
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    img1: "",
    img2: "",
    img3: "",
  });

  useEffect(() => {
    dispatch(fetchOneAsyncProduct(id));
    return () => {
      dispatch(resetProduct());
      dispatch(setLoading(true));
    };
  }, [dispatch]);

  useEffect(() => {
    if (product)
      setFormValue({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        // img1: product.img[0].url || "",
        // img2: product.img[2].url || "",
        // img3: product.img[3].url || "",
      });
  }, [product]);
  const { name, price, category, description, img1, img2, img3 } = formValue;
  const handleChange = (e) => {
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
      img: [{ url: img1 }, { url: img2 }, { url: img3 }],
    };
  };
  let body = null;
  if (loading) {
    body = <div>Loading</div>;
  } else if (product.name !== "" && product !== undefined) {
    body = (
      <ProductForm
        formValue={formValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  }
  return <Container>{body}</Container>;
}
