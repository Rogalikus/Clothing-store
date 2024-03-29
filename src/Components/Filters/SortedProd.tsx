import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSortProd, SortIdType } from "../../redux/reducers/filter-reducer";

export type SelectedType = { name: string; sortId: SortIdType };

export const selectedType: SelectedType[] = [
  { name: "популярності(По спаданню)", sortId: SortIdType.RATING_DESC },
  { name: "популярності(По зростанню)", sortId: SortIdType.RATING_ASC },
  { name: "ціні(По спаданню)", sortId: SortIdType.PRICE_DESC },
  { name: "ціні(По зростанню)", sortId: SortIdType.PRICE_ASC },
  { name: "алфавіту(По спаданню)", sortId: SortIdType.TITLE_DESC },
  { name: "алфавіту(По зростанню)", sortId: SortIdType.TITLE_ASC },
];

type SortedType = {
  sortProd: {
    name: string;
    sortId: string;
  };
};

type PopUpType = MouseEvent & {
  path: Node[];
};

export const SortedProd: React.FC<SortedType> = React.memo(({ sortProd }) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopUpType;
      if (sortRef.current && _event && _event.path && !_event.path.includes(sortRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
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
        <b>Сортування по:</b>
        <span onClick={() => setVisible(!isVisible)}>{sortProd.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {selectedType.map((el, index) => (
              <li
                onClick={() => {
                  dispatch(setSortProd(el));
                  setVisible(false);
                }}
                key={index}
                className={sortProd.sortId === el.sortId ? "active" : ""}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
