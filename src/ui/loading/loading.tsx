import styles from "./loading.module.css";
import { BeatLoader } from "react-spinners";

export function Loading() {
  return (
    <div className={styles.loading}>
      <BeatLoader color="#47B26B" size={20} />
    </div>
  );
}
