import styles from "./userInput.module.css";
import addUserPath from "../../assets/images/add-user.svg";
import { useRef, useEffect, useState, Dispatch } from "react";
import { BtnUpDown } from "../btnUpDown/btnUpDown";
import { UserDTO } from "../../application/dto/dto";
import { highlightSubstring } from "../../helpers/highlightSubstring";
import { SearchIcon } from "../icons/searchIcon";
import { useGetUsers } from "../../services/apiServices";
import { BeatLoader } from "react-spinners";

type Props = {
  setUser: (user: UserDTO | null) => void;
  isDuplicate: (user: UserDTO | null) => boolean;
  isFocused: boolean;
  openAddUserForm: () => void;
  setDuplicate: Dispatch<React.SetStateAction<boolean>>;
  user: Partial<UserDTO>;
  disabled: boolean;
};

const getInitUserValue = (user: Partial<UserDTO>) => {
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  } else {
    return "";
  }
};
const userNotFound =
  "Пользователь с такими параметрами не найден, проверьте правильность написнаия или создайте нового!";

export default function UserInput({
  setUser,
  isDuplicate,
  isFocused,
  openAddUserForm,
  setDuplicate,
  user,
  disabled,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(() => getInitUserValue(user));
  const [users, setUsers] = useState<UserDTO[]>([]);
  const { getUsersApi, isLoading, isError } = useGetUsers();
  const [errorValue, setErrorValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  async function getUsers() {
    const res = await getUsersApi();
    if (res) setUsers((prev) => [...prev, ...res]);
  }

  useEffect(() => {
    if (dropdownRef.current && targetRef.current) {
      const options = {
        root: dropdownRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const callback = function () {
        getUsers();
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(targetRef.current);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && searchInputRef.current) {
        if (
          !searchInputRef.current.contains(event.target as Node) &&
          !dropdownRef.current.contains(event.target as Node)
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

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
      setErrorValue(true);
    }
  }, [isFocused]);

  return (
    <div ref={searchInputRef} className={styles["user-input"]}>
      <div
        className={`${styles["user-input__input"]} ${
          errorValue ? styles["user-input__input__error"] : ""
        }`}
      >
        <SearchIcon warning={errorValue} />
        <input
          disabled={disabled}
          ref={inputRef}
          className={errorValue ? styles["user-input__input-field__focus"] : ""}
          type="text"
          placeholder="Поиск..."
          value={value}
          onClick={() => setIsOpen(true)}
          onFocus={() => setUser(null)}
          onChange={(e) => {
            setValue(e.target.value);
            setErrorValue(false);
            setIsOpen(true);
            setDuplicate(false);
          }}
          onBlur={(e) => {
            if (e.target.value.trim() === "") {
              setErrorValue(true);
            } else {
              setErrorValue(false);
            }
          }}
        />
        <BtnUpDown
          disabled={disabled}
          callback={() => {
            setIsOpen(!isOpen);
          }}
          error={errorValue}
          closed={!isOpen}
        />
      </div>
      <div
        ref={dropdownRef}
        className={`${styles["user-input__dropdown"]} ${
          !isOpen ? styles["user-input__dropdown__hidden"] : ""
        }`}
      >
        {users.length > 0 &&
          users
            .filter((user) => {
              const fullName = user.first_name + " " + user.last_name;
              return fullName.includes(value);
            })
            .map((user) => (
              <div
                key={user.id}
                className={styles["user-input__dropdown-item"]}
                onClick={() => {
                  setValue(`${user.first_name} ${user.last_name}`);
                  setUser(user);
                  setErrorValue(false);
                  const duplicate = isDuplicate(user);
                  if (duplicate) setErrorValue(true);
                  setIsOpen(false);
                }}
              >
                {highlightSubstring(
                  `${user.first_name} ${user.last_name}`,
                  value
                )}
              </div>
            ))}
        <div ref={targetRef} id="user-input__observe-target"></div>
        {isLoading && (
          <div className={styles["user-input__dropdown-item"]}>
            <BeatLoader color="#47B26B" size={10} />
          </div>
        )}
        {isError && (
          <div className={styles["user-input__dropdown-item"]}>
            Ошибка загрузки...
          </div>
        )}
        {!isError &&
          !users.some((user) => {
            return value.split(" ").includes(user.last_name);
          }) && (
            <>
              <div className={styles["user-input__dropdown-item"]}>
                <span>{highlightSubstring(userNotFound, "не найден")}</span>
              </div>
              <button
                className={styles["user-input__dropdown-btn"]}
                onClick={() => {
                  openAddUserForm();
                  setIsOpen(false);
                }}
              >
                <img src={addUserPath} alt="add-user" />
                <span>Добавить пользователя</span>
              </button>
            </>
          )}
      </div>
    </div>
  );
}
