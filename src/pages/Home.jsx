import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import { list, Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setfilters,
} from "../redux/slices/filterSlice";

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const sortProperty = useSelector((state) => state.filter.sort.sortProperty);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setfilters({
          ...params,
          sort,
        })
      );
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://629f37c8461f8173e4e44389.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortProperty, searchValue, currentPage]);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortProperty, currentPage]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  /*
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
*/
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
