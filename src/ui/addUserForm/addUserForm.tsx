// import { useState } from "react";
import styles from "./addUserForm.module.css";
import {
  registerNewUserservice,
  updateUserApi,
} from "../../services/apiServices";
import { useNotifyStorage } from "../../services/storageAdapter";

type Props = {
  close: () => void;
};

export function AddUserForm({ close }: Props) {
  const { setIsSuccessNotify, setIsErrorNotify } = useNotifyStorage();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const first_name = e.currentTarget.first_name.value;
    const last_name = e.currentTarget.last_name.value;
    const email = e.currentTarget.job.value;
    const job = e.currentTarget.job.value;

    if (!first_name || !last_name || !email) return;

    const addNewUser = async () => {
      const response = await registerNewUserservice({
        name: first_name + " " + last_name,
        job,
      });
      if (!response) {
        setIsErrorNotify(true)
        close();;
        return;
      }
      const userId = Number(response.id);
      if (!userId) {
        setIsErrorNotify(true);
        close();
        return;
      }
      const updateResponse = await updateUserApi({
        id: userId,
        first_name,
        last_name,
        email,
        avatar: "",
      });
      if (!updateResponse) {
        setIsErrorNotify(true);
        close();
        return;
      }
      close();
      setIsSuccessNotify(true);
    };

    addNewUser();
  };

  return (
    <div className={styles["add-user-form"]}>
      <form onSubmit={onSubmit} className={styles["add-user-form__form"]}>
        <div className={styles["add-user-form__input"]}>
          <label htmlFor="first_name">Имя</label>
          <input type="text" name="name" id="first_name" />
        </div>
        <div className={styles["add-user-form__input"]}>
          <label htmlFor="last_name">Фамилия</label>
          <input type="text" name="lastName" id="last_name" />
        </div>
        <div className={styles["add-user-form__input"]}>
          <label htmlFor="last_name">Место работы</label>
          <input type="text" name="job" id="job" />
        </div>
        <button
          type="submit"
          className={`${styles["add-user-form__btn"]} ${styles["add-user-form__btn__primary"]}`}
        >
          Добавить
        </button>
        <button className={styles["add-user-form__btn"]} onClick={close}>
          Отмена
        </button>
      </form>
    </div>
  );
}
