import { Button } from "../../button/button";
import styles from "./successNote.module.css";
import successIconPath from "../../../assets/images/success-icon.svg";
import { useNotifyStorage } from "../../../services/storageAdapter";

const note = "Данные успешно сохранены";

export function SuccessNote() {
  const { setIsSuccessNotify } = useNotifyStorage();
  return (
    <div className={styles["success-note"]}>
      <div className={styles["success-note__content"]}>
        <img src={successIconPath} alt="success-icon" height={80}></img>
        <span className={styles["success-note__text"]}>{note}</span>
        <Button variant="secondary" onClick={() => setIsSuccessNotify(false)}>
          Закрыть
        </Button>
      </div>
    </div>
  );
}
