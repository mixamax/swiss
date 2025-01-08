import { SortBtn } from "../sortBtn/sortBtn";
import style from "./tableHeader.module.css";
import searchIconPath from "../../assets/images/search-icon.svg";
import { Sort } from "../../App";
import { useDebounce } from "../../helpers/useDebounce";
import { useEffect, useState } from "react";

const titles = [
  { title: "ФИО пользователя", sorted: true, name: "name" },
  { title: "Контактные данные", sorted: false, name: "mail" },
  { title: "Дата рождения", sorted: true, name: "date" },
  { title: "Пол", sorted: true, name: "gender" },
  { title: "Роль", sorted: false, name: "role" },
  { title: "", sorted: false, name: "btns" },
];

type Props = {
  sort: Sort;
  setSort: (sort: Sort) => void;
  initSort: Sort;
  onSearchChange: (query: string) => void;
};
export function TableHeader({
  sort,
  setSort,
  initSort,
  onSearchChange,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchQuery = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearchChange]);

  return (
    <div className={style["table-header-wrapper"]}>
      <div className={style["table-header-search"]}>
        <img src={searchIconPath} alt="search-icon" />
        <input
          className={style["table-header-search__input"]}
          placeholder="Поиск..."
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className={style["table-header"]}>
        {titles.map((item, idx) => (
          <div
            className={`${style["table-header__item"]} ${
              style[`table-header__item__${item.name}`]
            }`}
            key={item.title}
          >
            {item.title}
            {idx === 0 && (
              <span className={style["table-header__item__light"]}>
                По алфавиту А-Я
              </span>
            )}
            {item.sorted && (
              <SortBtn
                name={item.name as Sort["name"]}
                setSort={setSort}
                sortName={sort.name}
                initSort={initSort}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
