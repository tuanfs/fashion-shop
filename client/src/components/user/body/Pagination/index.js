import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { setParams } from "commons/fcCommons";

export default function PaginationCPN(props) {
  const pageCount = props.pageCount;
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");
  const priceDecrease = searchParams.get("priceDecrease");
  const page = searchParams.get("page");

  const [pageValue, setPageValue] = useState(Number(page) || 1);

  let paramsValue = {
    keyword: keyword || "",
    priceDecrease: priceDecrease || "",
    page: pageValue || 1,
    category: category || "",
    gender: gender || "",
  };

  const onPageChange = (e) => {
    setPageValue(Number(e.selected + 1));
  };

  useEffect(() => {
    const search = setParams(paramsValue);

    navigate(`${location.pathname}${search}`);
  }, [pageValue]);
  return (
    <>
      <Container className={styles.paginationWrap}>
        {pageCount > 1 ? (
          <ReactPaginate
            pageRangeDisplayed={4}
            nextLabel='>'
            previousLabel='<'
            pageCount={pageCount || 1}
            initialPage={page - 1 || 1}
            disableInitialCallback
            onPageChange={onPageChange}
            className={styles.pagination}
            pageLinkClassName={styles.item}
            activeLinkClassName={clsx(styles.itemActive, styles.item)}
            nextLinkClassName={clsx(styles.itemNext, styles.item)}
            previousLinkClassName={clsx(styles.itemPrevious, styles.item)}
          />
        ) : (
          ""
        )}
      </Container>
    </>
  );
}
