import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import SearchPizzaParams from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import { list, SortPopup } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

import {
  setCategoryId,
  setCurrentPage,
  setfilters,
} from "../redux/slices/filterSlice";

export const Home: React.FC = () => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const sortProperty = useSelector(
    (state: any) => state.filter.sort.sortProperty
  );
  const setSearchValue = useSelector((state: any) => state.filter.searchValue);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    const order = sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = setSearchValue ? `&search=${setSearchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    setIsLoading(false);

    window.scrollTo(0, 0);
  };

  //если изменили параметры и был первый рендер,
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, currentPage]);

  //если был первый рендер, то проверяем URL и сохр в redux
  React.useEffect(() => {
    /*  if (!window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setfilters({
          searchValue: params.search,
          currentPage: Number(params.currentPage),
          categoryId: Number(params.category),
          sort: sort || list[0],
        })
      );
      isSearch.current = true;
    }*/
  }, []);

  //если был первый рендер, то запрос массива данных
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortProperty, setSearchValue, currentPage]);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzas = items
    /* .filter((obj) => {
      if (obj.title.toLowerCase().includes(setSearchValue.toLowerCase())) {
        return true;
      }
      return false;
    })*/
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <h1>Ошибка загрузки данных</h1>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
