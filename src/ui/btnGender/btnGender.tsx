import styles from "./btnGender.module.css";
import maleBPath from "../../assets/images/male-black.svg";
import femaleBPath from "../../assets/images/female-black.svg";
import maleWPath from "../../assets/images/male-w.svg";
import femaleWPath from "../../assets/images/female-w.svg";

type Props = {
    setIsFemale: React.Dispatch<React.SetStateAction<boolean>>
    isFemale: boolean
};

export function BtnGender({ setIsFemale, isFemale }: Props) {

  const v50 = !isFemale ? 50 : 0;
  const v0 = isFemale ? 50 : 0;

  return (
    <div className={styles["btnGender"]} onClick={() => setIsFemale(!isFemale)}>
      <div
        className={styles["btnGender__content"]}
      >
        <div className={styles["btnGender__item"]}>
          <img src={femaleBPath} alt="female-black" />
          <span>Женский</span>
        </div>
        <div className={styles["btnGender__item"]}>
          <img src={maleBPath} alt="male-black" />
          <span>Мужской</span>
        </div>
      </div>

      <div
        className={styles["btnGender__content"]}
        style={{ clipPath: `inset(0 ${v0}% 0 ${v50}%)`, zIndex: 200 }}
      >
        <div className={styles["btnGender__item"]}>
          <img src={femaleWPath} alt="female-black" />
          <span className={styles["btnGender__item__light"]}>Женский</span>
        </div>
        <div className={styles["btnGender__item"]}>
          <img src={maleWPath} alt="male-black" />
          <span className={styles["btnGender__item__light"]}>Мужской</span>
        </div>
      </div>
      <div
        className={`${styles["btnGender__overlay"]} ${
          !isFemale ? styles["btnGender__overlay__right"] : ""
        }`}
      ></div>
    </div>
  );
}
