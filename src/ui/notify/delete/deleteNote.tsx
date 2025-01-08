import styles from "./deleteNote.module.css";
import deleteIconPath from "../../../assets/images/delete-icon.png";
import { Button } from "../../button/button";

const note = "Вы хотите удалить пользователя:";

type Props = {
  name: string;
  deleteUser: () => void;
  close: () => void;
};

export function DeleteNote({ name, deleteUser, close }: Props) {
  return (
    <div className={styles["delete-note"]}>
      <div className={styles["delete-note__content"]}>
        <img
          className={styles["delete-note__icon"]}
          src={deleteIconPath}
          alt="error-icon"
        ></img>
        <div className={styles["delete-note__text-wrapper"]}>
          <span className={styles["delete-note__text"]}>{note}</span>
          <span className={styles["delete-note__text__big"]}>{name}</span>
        </div>
        <div className={styles["delete-note__btns"]}>
          <Button variant="critic" size="s" onClick={() => deleteUser()}>
            Удалить
          </Button>
          <Button variant="critic-wl" size="s" onClick={() => close()}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
}
