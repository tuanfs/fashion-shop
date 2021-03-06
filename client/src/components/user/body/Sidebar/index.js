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
            <h3 className={styles.heading}>T??m ki???m</h3>
            <div className={clsx(styles.content, styles.search)}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                  <input
                    type='text'
                    placeholder='Nh???p ????? t??m ki???m'
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
                Danh m???c{" "}
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
                      ??o s?? mi
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
                      />
                      <span className={styles.box}></span>
                      ??o thun
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
                      />
                      <span className={styles.box}></span>
                      ??o len
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          )}
          {genderEl && (
            <li className={styles.item}>
              <h3 className={styles.heading}>
                Gi???i t??nh{" "}
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
                      N???
                    </label>
                  </li>{" "}
                </ul>
              </div>
            </li>
          )}
          <li className={clsx(styles.item, styles.aroundPrice)}>
            <h3 className={styles.heading}>
              Kho???ng gi??{" "}
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
                    Nh??? h??n 100.000??
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
                    T??? 100.000?? - 300.000??
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
                    T??? 300.000?? - 500.000??
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
                    T??? 500.000?? - 700.000??
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
                    T??? 700.000?? - 1.000.000??
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
                    L???n h??n 1.000.000??
                  </label>
                </li>{" "}
              </ul>
            </div>
          </li>
          <li className={clsx(styles.material, styles.item, "d-xs-md-none")}>
            <h3 className={styles.heading}>Ch???t li???u</h3>
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
                    V???i t??
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
                Xem th??m <i className='fas fa-arrow-down'></i>
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
                    V???i t??
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
                  Thu g???n <i className='fas fa-arrow-up'></i>
                </button>
              </ul>
            </div>
          </li>
          <li className={clsx(styles.item, styles.ratings, "d-xs-md-none")}>
            <h3 className={styles.heading}>????nh gi?? </h3>
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
                    <span className={styles.text}>tr??? l??n</span>
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
                    <span className={styles.text}>tr??? l??n</span>
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
                    <span className={styles.text}>tr??? l??n</span>
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
                    <span className={styles.text}>tr??? l??n</span>
                  </label>
                </li>{" "}
              </ul>
            </div>
          </li>
          <li className={clsx(styles.item, styles.ratings, "d-xs-md-none")}>
            <h3 className={styles.heading}>D???ch v??? {"&"} khuy???n m??i</h3>
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
                    ??ang gi???m gi??
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
                    Mi???n ph?? v???n chuy???n
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
                    H??ng c?? s???n
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
                    Mua gi?? b??n bu??n
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
