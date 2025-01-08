import { useEffect, useRef, useState } from "react";
import { BtnUpDown } from "../btnUpDown/btnUpDown";
import styles from "./btnRole.module.css";
import { Role } from "../../domain/user";

const roles: Role[] = ["Админ", "Доктор", "Медсестра", "Медбрат"];

type Props = {
  isFemale: boolean;
  duplicate: boolean;
  setRole: (role: Role) => void;
  isFocused: boolean;
  role: Role | undefined;
};

export function BtnRole({
  setRole,
  isFemale,
  duplicate,
  isFocused,
  role,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(() => {
    if (role) {
      return role;
    } else {
      return "";
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const roleListRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFemale && inputValue === "Медбрат") {
      setInputValue("Медсестра");
      setRole("Медсестра");
    }
    if (!isFemale && inputValue === "Медсестра") {
      setInputValue("Медбрат");
      setRole("Медбрат");
    }
  }, [isFemale]);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
      setError(true);
    }
  }, [isFocused]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roleListRef.current && roleRef.current) {
        if (
          !roleRef.current.contains(event.target as Node) &&
          !roleListRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={roleRef}
      className={`${styles["btn-role"]} ${
        error || duplicate ? styles["btn-role__error"] : ""
      }`}
    >
      <div className={styles["btn-role__value"]}>
        {inputValue !== "Роль" && (
          <span className={`${styles["btn-role__title"]}`}>Роль</span>
        )}
        <input
          ref={inputRef}
          disabled={duplicate}
          value={inputValue}
          placeholder="Роль"
          className={`${styles["btn-role__input"]} ${
            error ? styles["btn-role__input__error"] : ""
          }`}
          onClick={() => {
            setIsOpen(true);
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(false);
          }}
          onBlur={(e) => {
            if (roles.includes(e.target.value as Role)) {
              setRole(e.target.value as Role);
              setError(false);
            } else {
              setError(true);
            }
          }}
        />
      </div>
      <BtnUpDown
        callback={() => {
          setIsOpen(!isOpen);
        }}
        error={error || duplicate}
        disabled={duplicate}
        closed={!isOpen}
      />
      <div
        ref={roleListRef}
        className={`${styles["btn-role__list"]} ${
          !isOpen ? styles["btn-role__list__hidden"] : ""
        }`}
      >
        {roles
          .filter((item) =>
            isFemale ? item !== "Медбрат" : item !== "Медсестра"
          )
          .map((item) => (
            <div
              key={item}
              className={styles["btn-role__item"]}
              onClick={() => {
                setInputValue(item);
                setError(false);
                setRole(item);
                setIsOpen(false);
              }}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}
