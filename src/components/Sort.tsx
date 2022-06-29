import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSort,
  selectSort,
  SortProppertyEnum,
} from "../redux/slices/filterSlice";

type ListItem = {
  name: string;
  sortProperty: SortProppertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const list: ListItem[] = [
  {
    name: "популярности возрастанию",
    sortProperty: SortProppertyEnum.RATING_DESC,
  },
  { name: "популярности убыванию", sortProperty: SortProppertyEnum.RATING_ASC },
  { name: "цене возрастанию", sortProperty: SortProppertyEnum.PRICE_DESC },
  { name: "цене убыванию", sortProperty: SortProppertyEnum.PRICE_ASC },
  { name: "алфавиту возрастанию", sortProperty: SortProppertyEnum.TITLE_ASC },
  { name: "алфавиту убыванию", sortProperty: SortProppertyEnum.TITLE_DESC },
];

export const SortPopup: React.FC = React.memo(() => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: ListItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOuside = (e: MouseEvent) => {
      const _e = e as PopupClick;
      if (sortRef.current && !_e.path.includes(sortRef.current)) setOpen(false);
    };
    document.body.addEventListener("click", handleClickOuside);
    return () => document.body.removeEventListener("click", handleClickOuside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
