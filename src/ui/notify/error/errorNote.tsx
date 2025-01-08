import styles from "./errorNote.module.css";
import errorIconPath from "../../../assets/images/server-icon.png";
import { Button } from "../../button/button";
import { useNotifyStorage } from "../../../services/storageAdapter";

const note = "Произошла ошибка на сервере";

export function ErrorNote() {
  const { setIsErrorNotify } = useNotifyStorage();
  return (
    <div className={styles["error-note"]}>
      <div className={styles["error-note__content"]}>
        <img
          className={styles["error-note__icon"]}
          src={errorIconPath}
          alt="error-icon"
        ></img>
        <span className={styles["error-note__text"]}>{note}</span>
        <Button variant="primary" onClick={() => setIsErrorNotify(false)}>
          Вернуться к списку
        </Button>
      </div>
    </div>
  );
}
