import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datePicker.module.css";
import { BtnUpDown } from "../btnUpDown/btnUpDown";
import { CalendarIcon } from "../icons/calendarIcon";
import { getAge } from "../../helpers/getAge";

type DatePickerProps = {
  setDate: (date: Date | null) => void;
  duplicate: boolean;
  isFocused: boolean;
  date: Date | null;
};

export const DatePickerInput = ({
  setDate,
  duplicate,
  isFocused,
  date,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [inputValue, setInputValue] = useState<Date | null>(() => {
    if (date) {
      return date;
    } else {
      return null;
    }
  });
  const inputRef = useRef<DatePicker>(null);
  const btnWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current?.input) {
      inputRef.current.input.focus();
      setErrorDate(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (!inputRef.current?.input) return;
    const input = inputRef.current.input;
    input.onblur = () => {
      if (validateDate(inputValue)) {
        setErrorDate(false);
        setDate(inputValue);
      } else {
        setDate(null);
        setErrorDate(true);
      }
    };
  }, [inputValue]);

  return (
    <div
      className={`${styles["date-picker"]} ${
        errorDate || duplicate ? styles["date-picker__error"] : ""
      }`}
    >
      <div className={styles["date-picker__icon-input-wrapper"]}>
        <CalendarIcon warning={errorDate || duplicate} />
        <div className={styles["date-picker__input-wrapper"]}>
          <span className={styles["date-picker__input-title"]}>
            Дата рождения
          </span>
          <DatePicker
            ref={inputRef}
            disabled={duplicate}
            className={`${styles["date-picker__input"]} ${
              errorDate || duplicate ? styles["date-picker__input__error"] : ""
            }`}
            placeholderText="Дата рождения"
            open={isOpen}
            onClickOutside={(e) => {
              if (btnWrapperRef.current?.contains(e.target as Node)) {
                return;
              } else {
                setIsOpen(false);
              }
            }}
            onInputClick={() => setIsOpen(true)}
            dateFormat="dd.MM.yyyy"
            selected={inputValue}
            onChange={(date) => {
              setInputValue(date);
              setIsOpen(false);
              setErrorDate(false);
            }}
          />
        </div>
      </div>
      <div ref={btnWrapperRef}>
        <BtnUpDown
          callback={() => {
            setIsOpen(!isOpen);
          }}
          error={errorDate || duplicate}
          disabled={duplicate}
          closed={!isOpen}
        />
      </div>
    </div>
  );
};

function validateDate(date: Date | null) {
  if (!date) return false;
  if (typeof date === "string") return false;
  if (getAge(date) < 18) return false;
  return true;
}
