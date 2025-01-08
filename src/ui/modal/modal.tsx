import { useState } from "react";
import { UserDTO } from "../../application/dto/dto";
import { BtnGender } from "../btnGender/btnGender";
import { BtnRole } from "../btnRole/btnRole";
import { Button } from "../button/button";
import { DatePickerInput } from "../datePicker/datePicker";
import UserInput from "../userInput/userInput";
import styles from "./modal.module.css";
import { Role, User } from "../../domain/user";
import {
  useAddUser,
  useFindUser,
  useUpdateUser,
} from "../../application/userListCases";
import { AddUserForm } from "../addUserForm/addUserForm";
import { Loading } from "../loading/loading";
import { dateToString, stringToDate } from "../../helpers/convertDate";

const title = {
  add: "Добавить нового пользователя",
  edit: "Редактировать пользователя",
};

type ModalProps = {
  closeModal: () => void;
  user: User | null;
  type?: "edit";
};

type UserData = {
  user: UserDTO | null;
  date: Date | null;
  role: Role | null;
};

const initUserData: UserData = { user: null, date: null, role: null };
const initFocused = { user: false, date: false, role: false };
const getInitGender = (gender: User["gender"] | undefined) =>
  gender !== "мужской";

export function Modal({ closeModal, user, type }: ModalProps) {
  const [isFemale, setIsFemale] = useState(() => getInitGender(user?.gender));
  const [duplicate, setDuplicate] = useState(false);
  const [userData, setUserData] = useState<UserData>(() =>
    getInitUserData(user, initUserData)
  );
  const [focused, setFocused] = useState(initFocused);
  const { findUserInList } = useFindUser();
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const { addUsertoList } = useAddUser();
  const { isLoading, updateUserInList } = useUpdateUser();

  const setData = (name: keyof UserData, value: UserData[typeof name]) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const addOrEditUser = (userData: UserData) => {
    let error = false;
    Object.keys(userData).forEach((key) => {
      if (error) return;
      if (!userData[key as keyof UserData]) {
        setFocused((prev) => ({ ...prev, [key]: true }));
        error = true;
      } else {
        setFocused((prev) => ({ ...prev, [key]: false }));
      }
    });

    if (error || !isUserDataValid(userData)) return;

    const newUser: User = {
      ...userData.user!,
      birthdate: dateToString(userData.date!),
      role: userData.role!,
      gender: isFemale ? "женский" : "мужской",
    };
    if (type === "edit") {
      updateUserInList(newUser);
    } else {
      addUsertoList(newUser);
    }
    closeModal();
  };

  const isDuplicate = (user: UserDTO | null) => {
    if (!user) return false;
    if (findUserInList(user.id)) {
      setDuplicate(true);
      return true;
    } else {
      setDuplicate(false);
      return false;
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className={styles.modal}>
      <div className={styles["modal__content"]}>
        <div className={styles["modal__header"]}>
          <h2>{title[type || "add"]}</h2>
          <button onClick={closeModal}>✕</button>
        </div>
        <span className={styles["modal__subtitle"]}>Найти в списке</span>
        <UserInput
          disabled={type === "edit"}
          setUser={(value) => setData("user", value)}
          isDuplicate={isDuplicate}
          isFocused={focused.user}
          setDuplicate={setDuplicate}
          openAddUserForm={() => setIsAddUserFormOpen(true)}
          user={{
            id: user?.id,
            email: user?.email,
            first_name: user?.first_name,
            last_name: user?.last_name,
            avatar: user?.avatar,
          }}
        />
        <div className={styles["modal__input-group"]}>
          <DatePickerInput
            setDate={(value) => setData("date", value)}
            duplicate={duplicate}
            isFocused={focused.date}
            date={stringToDate(user?.birthdate)}
          />
          <BtnGender setIsFemale={setIsFemale} isFemale={isFemale} />
          <BtnRole
            setRole={(value) => setData("role", value)}
            isFemale={isFemale}
            duplicate={duplicate}
            isFocused={focused.role}
            role={user?.role}
          />
        </div>
        <div className={styles["modal__btn-group"]}>
          <Button
            variant="primary"
            size="m"
            onClick={
              type
                ? () => addOrEditUser(userData)
                : () => addOrEditUser(userData)
            }
          >
            {type ? "Редактировать" : "Добавить"}
          </Button>
          <Button variant="secondary" size="m" onClick={closeModal}>
            Отменить
          </Button>
        </div>
      </div>
      {isAddUserFormOpen && (
        <AddUserForm close={() => setIsAddUserFormOpen(false)} />
      )}
    </div>
  );
}

function getInitUserData(user: User | null, initUserData: UserData) {
  if (user) {
    return {
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      },
      date: stringToDate(user.birthdate),
      role: user.role,
    };
  } else {
    return initUserData;
  }
}

function isUserDataValid(userData: UserData): boolean {
  if (!userData.date) return false;
  if (!userData.role) return false;
  if (!userData.user) return false;
  if (!userData.user.id) return false;
  if (!userData.user.email) return false;
  if (!userData.user.first_name) return false;
  if (!userData.user.last_name) return false;
  if (!userData.user.avatar) return false;
  return true;
}
