import styles from "./header.module.css";
import { Button } from "../button/button";
import { useStore } from "../../services/store";
import { plural } from "../../helpers/plural";

const title = "Пользователи клиники";

type HeaderProps = {
  openModal: () => void;
};

export function Header({ openModal }: HeaderProps) {
  const store = useStore();

  const userCount = store?.userList?.length;

  return (
    <header className={styles.header}>
      <h1 className={styles["header-title"]}>
        <span>{title}</span>
        <span
          className={styles["header-title__light"]}
        >{` ${userCount} ${plural(userCount ?? 0, {
          one: "человек",
          other: "человек",
          zero: "человек",
          two: "человека",
          few: "человека",
          many: "человек",
        })}`}</span>
      </h1>
      <Button variant="accent" size="l" onClick={openModal}>
        Добавить нового пользователя
      </Button>
    </header>
  );
}
