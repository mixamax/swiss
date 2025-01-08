import React, { useEffect, useState } from "react";
import styles from "./sortBtn.module.css";
import { Sort } from "../../App";

interface SortBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: Sort["name"];
  setSort: (sort: Sort) => void;
  sortName: string;
  initSort: Sort;
}

export function SortBtn({ name, setSort, sortName, initSort }: SortBtnProps) {
  const [state, setState] = useState(0);

  const handleOnClick = () => {
    setState((state) => (state + 1) % 3);
    const newState = (state + 1) % 3;
    if (newState === 0) {
      setSort(initSort);
    } else {
      setSort({ name: name, type: newState === 1 ? "up" : "down" });
    }
  };

  useEffect(() => {
    if (name !== sortName) {
      setState(0);
    }
  }, [sortName]);

  return (
    <button className={styles["sort-btn"]} onClick={handleOnClick}>
      <div
        className={`${styles["sort-btn__item"]} ${
          styles["sort-btn__item__up"]
        } ${state === 1 ? styles["sort-btn__item__active"] : ""}`}
      ></div>
      <div
        className={`${styles["sort-btn__item"]} ${
          styles["sort-btn__item__down"]
        } ${state === 2 ? styles["sort-btn__item__active"] : ""}`}
      ></div>
    </button>
  );
}
