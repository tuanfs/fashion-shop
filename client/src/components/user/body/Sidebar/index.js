import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import ReactStars from "react-rating-stars-component";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setParams } from "commons/fcCommons";

export default function Sidebar(props) {
  const { categoryEl, genderEl } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryShow, setCategoryShow] = useState({
    category: false,
    gender: false,
    price: false,
  });

  const onShowCategory = (category, key) => {
    if (category[key]) {
      setCategoryShow({ ...categoryShow, [key]: false });
    } else {
      setCategoryShow({ ...categoryShow, [key]: true });
    }
  };

  const keywordRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");
  const priceDecrease = searchParams.get("priceDecrease");
  const page = searchParams.get("page");

  const [showMore, setShowMore] = useState(false);
  const [keywordValue, setKeywordValue] = useState(keyword);

  const [paramsValue, setParamsValue] = useState({
    keyword: keyword || "",
    priceDecrease: priceDecrease || "",
    page: page || 1,
    category: category || "",
    gender: gender || "",
  });

  useEffect(() => {
    const inputs = document.querySelectorAll("input[name=category]");
    const inputsPrice = document.querySelectorAll("input[name=price]");
    inputs.forEach((input) => {
      if (paramsValue["category"]) {
        const categoryList = paramsValue["category"].split("%");
        if (categoryList.indexOf(input.value) !== -1) {
          input.checked = true;
        }
      } else {
        input.checked = false;
      }
    });
    inputsPrice.forEach((input) => {
      if (input.value === paramsValue["priceDecrease"]) {
        input.checked = true;
      }
    });
  }, [paramsValue]);

  const handleClick = (e) => {
    let categoryValue = paramsValue["category"];
    if (e.target.checked) {
      if (categoryValue) {
        if (!categoryValue.match(e.target.value)) {
          categoryValue = `${categoryValue}%${e.target.value}`;
        }
      } else {
        categoryValue = e.target.value;
      }
    } else {
      if (categoryValue) {
        const categoryList = categoryValue.split("%");
        if (categoryValue.indexOf(e.target.value) !== -1) {
          const result = categoryList.filter(
            (category) => category !== e.target.value
          );
          categoryValue = result.join("%");
        }
      }
    }
    setParamsValue({ ...paramsValue, category: categoryValue });
  };

  const handleChange = (e) => {
    setParamsValue({ ...paramsValue, gender: e.target.value });
  };

  useEffect(() => {
    const search = setParams(paramsValue);

    navigate(`${location.pathname}${search}`);
  }, [paramsValue]);

  const handlePriceDecreaseChange = (e) => {
    setParamsValue({ ...paramsValue, priceDecrease: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paramsValue["keyword"] !== keywordValue) {
      setParamsValue({
        priceDecrease: "",
        category: "",
        gender: "",
        keyword: keywordValue,
        page: 1,
      });
    }
    keywordRef.current.blur();
  };

  return (
    <>
      <div className={styles.sidebar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <h3 className={styles.heading}>Tìm kiếm</h3>
            <div className={clsx(styles.content, styles.search)}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                  <input
                    type='text'
                    placeholder='Nhập để tìm kiếm'
                    className={styles.formControl}
                    value={keywordValue || ""}
                    ref={keywordRef}
                    onChange={(e) => setKeywordValue(e.target.value)}
                  ></input>
                </div>
                <button className={clsx(styles.submit)}>
                  <i className={clsx("fas fa-search", styles.icon)}></i>
                </button>
              </form>
            </div>
          </li>
          {categoryEl && (
            <li className={styles.item}>
              <h3 className={styles.heading}>
                Danh mục{" "}
                <i
                  className={clsx("fa-solid fa-angle-down", styles.btnShow)}
                  onClick={() => onShowCategory(categoryShow, "category")}
                ></i>
              </h3>
              <div className={clsx(styles.content, styles.nav)}>
                <ul
                  className={clsx(styles.navList, {
                    [styles.active]: categoryShow["category"],
                  })}
                >
                  <li className={styles.navItem}>
                    <label className={styles.label}>
                      <input
                        name='category'
                        type='checkbox'
                        value='shirt'
                        className={styles.checkbox}
                        onClick={handleClick}
                      />
                      <span className={styles.box}></span>
                      Áo sơ mi
                    </label>
                  </li>
                  <li className={styles.navItem}>
                    <label className={styles.label}>
                      <input
                        name='category'
                        type='checkbox'
                        value='t-shirt'
                        onClick={handleClick}
                        className={styles.checkbox}
                        onClick={handleClick}
                      />
                      <span className={styles.box}></span>
                      Áo thun
                    </label>
                  </li>{" "}
                  <li className={styles.navItem}>
                    <label className={styles.label}>
                      <input
                        onClick={handleClick}
                        name='category'
                        type='checkbox'
                        value='sweater'
                        className={styles.checkbox}
                        onClick={handleClick}
                      />
                      <span className={styles.box}></span>
                      Áo len
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          )}
          {genderEl && (
            <li className={styles.item}>
              <h3 className={styles.heading}>
                Giới tính{" "}
                <i
                  className={clsx("fa-solid fa-angle-down", styles.btnShow)}
                  onClick={() => onShowCategory(categoryShow, "gender")}
                ></i>
              </h3>
              <div className={clsx(styles.content)}>
                <ul
                  className={clsx(styles.navList, {
                    [styles.active]: categoryShow["gender"],
                  })}
                >
                  <li className={styles.navItem}>
                    <label className={styles.label}>
                      <input
                        name='gender'
                        type='radio'
                        value='men'
                        className={styles.checkbox}
                        checked={paramsValue["gender"] === "men"}
                        onChange={handleChange}
                      />
                      <span className={styles.box}></span>
                      Nam
                    </label>
                  </li>
                  <li className={styles.navItem}>
                    <label className={styles.label}>
                      <input
                        name='gender'
                        type='radio'
                        value='women'
                        className={styles.checkbox}
                        checked={paramsValue["gender"] === "women"}
                        onChange={handleChange}
                      />
                      <span className={styles.box}></span>
                      Nữ
                    </label>
                  </li>{" "}
                </ul>
              </div>
            </li>
          )}
          <li className={clsx(styles.item, styles.aroundPrice)}>
            <h3 className={styles.heading}>
              Khoảng giá{" "}
              <i
                className={clsx("fa-solid fa-angle-down", styles.btnShow)}
                onClick={() => onShowCategory(categoryShow, "price")}
              ></i>
            </h3>
            <div className={clsx(styles.content)}>
              <ul
                className={clsx(styles.navList, {
                  [styles.active]: categoryShow["price"],
                })}
              >
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='price'
                      type='radio'
                      value='0to100000'
                      className={styles.checkbox}
                      onChange={handlePriceDecreaseChange}
                    />
                    <span className={styles.box}></span>
                    Nhỏ hơn 100.000đ
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='price'
                      type='radio'
                      value='100000to300000'
                      className={styles.checkbox}
                      onChange={handlePriceDecreaseChange}
                    />
                    <span className={styles.box}></span>
                    Từ 100.000đ - 300.000đ
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='price'
                      type='radio'
                      value='300000to500000'
                      className={styles.checkbox}
                      onChange={handlePriceDecreaseChange}
                    />
                    <span className={styles.box}></span>
                    Từ 300.000đ - 500.000đ
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='price'
                      type='radio'
                      value='500000to700000'
                      className={styles.checkbox}
                      onChange={handlePriceDecreaseChange}
                    />
                    <span className={styles.box}></span>
                    Từ 500.000đ - 700.000đ
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='price'
                      type='radio'
                      value='700000to1000000'
                      className={styles.checkbox}
                      onChange={handlePriceDecreaseChange}
                    />
                    <span className={styles.box}></span>
                    Từ 700.000đ - 1.000.000đ
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='price'
                      type='radio'
                      value='1000000to'
                      className={styles.checkbox}
                      onChange={handlePriceDecreaseChange}
                    />
                    <span className={styles.box}></span>
                    Lớn hơn 1.000.000đ
                  </label>
                </li>{" "}
              </ul>
            </div>
          </li>
          <li className={clsx(styles.material, styles.item, "d-xs-md-none")}>
            <h3 className={styles.heading}>Chất liệu</h3>
            <div className={clsx(styles.content)}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='men'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Cotton
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='women'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Nano
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='men'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Umi
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='women'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Vải tơ
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='men'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Cotton
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='women'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Nano
                  </label>
                </li>{" "}
              </ul>
              <button
                className={clsx(styles.btnNav, {
                  [styles.btnNavActive]: !showMore,
                })}
                onClick={() => setShowMore(true)}
              >
                Xem thêm <i className='fas fa-arrow-down'></i>
              </button>
              <ul
                className={clsx(
                  styles.navList,
                  {
                    [styles.navList2]: showMore,
                  },
                  styles.navMore
                )}
              >
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='men'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Cotton
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='women'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Nano
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='men'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Umi
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='women'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Vải tơ
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='men'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Cotton
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='gender'
                      type='checkbox'
                      value='women'
                      className={styles.checkbox}
                    />
                    <span className={styles.tag}>
                      <i className={clsx("fas fa-times", styles.icon)}></i>
                    </span>
                    Nano
                  </label>
                </li>{" "}
                <button
                  className={clsx(styles.btnNav, {
                    [styles.btnNavActive]: showMore,
                  })}
                  onClick={() => setShowMore(false)}
                >
                  Thu gọn <i className='fas fa-arrow-up'></i>
                </button>
              </ul>
            </div>
          </li>
          <li className={clsx(styles.item, styles.ratings, "d-xs-md-none")}>
            <h3 className={styles.heading}>Đánh giá </h3>
            <div className={clsx(styles.content)}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='rating'
                      type='radio'
                      value='5'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    <ReactStars
                      count={5}
                      size={20}
                      isHalf={true}
                      value={5}
                      edit={false}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                      fullIcon={<i className='fa fa-star'></i>}
                      activeColor='#ff4545'
                    />
                    <span className={styles.text}>trở lên</span>
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='rating'
                      type='radio'
                      value='4'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    <ReactStars
                      count={5}
                      size={20}
                      isHalf={true}
                      value={4}
                      edit={false}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                      fullIcon={<i className='fa fa-star'></i>}
                      activeColor='#ff4545'
                    />
                    <span className={styles.text}>trở lên</span>
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='rating'
                      type='radio'
                      value='3'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    <ReactStars
                      count={5}
                      size={20}
                      isHalf={true}
                      value={3}
                      edit={false}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                      fullIcon={<i className='fa fa-star'></i>}
                      activeColor='#ff4545'
                    />
                    <span className={styles.text}>trở lên</span>
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='rating'
                      type='radio'
                      value='2'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    <ReactStars
                      count={5}
                      size={20}
                      isHalf={true}
                      value={2}
                      edit={false}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                      fullIcon={<i className='fa fa-star'></i>}
                      activeColor='#ff4545'
                    />
                    <span className={styles.text}>trở lên</span>
                  </label>
                </li>{" "}
              </ul>
            </div>
          </li>
          <li className={clsx(styles.item, styles.ratings, "d-xs-md-none")}>
            <h3 className={styles.heading}>Dịch vụ {"&"} khuyến mãi</h3>
            <div className={clsx(styles.content)}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='promotion'
                      type='checkbox'
                      value='5'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    Freeship extra
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='promotion'
                      type='checkbox'
                      value='4'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    Đang giảm giá
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='promotion'
                      type='checkbox'
                      value='3'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    Miễn phí vận chuyển
                  </label>
                </li>
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='promotion'
                      type='checkbox'
                      value='2'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    Hàng có sẵn
                  </label>
                </li>{" "}
                <li className={styles.navItem}>
                  <label className={styles.label}>
                    <input
                      name='promotion'
                      type='checkbox'
                      value='2'
                      className={styles.checkbox}
                    />
                    <span className={styles.box}></span>
                    Mua giá bán buôn
                  </label>
                </li>{" "}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
