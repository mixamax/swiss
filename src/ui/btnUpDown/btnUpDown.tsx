import styles from "./btnUpDown.module.css";
import arrowDownPath from "../../assets/images/arrow-down.svg";
import arrowUpPath from "../../assets/images/arrow-up.svg";
import { useState } from "react";
import warnIconPath from "../../assets/images/warn-icon.svg";

interface BtnUpDownProps extends React.HTMLAttributes<HTMLButtonElement> {
  callback: () => void;
  error: boolean;
  disabled?: boolean;
  closed?: boolean;
}

// export function BtnUpDown({
//   callback,
//   error,
//   disabled,
//   closed,
// }: BtnUpDownProps) {
//   const [state, setState] = useState(0);

//   if (closed) setState(0);

//   const onHanleClick = () => {
//     if (disabled) return;
//     // setState((state) => (state + 1) % 2);
//     callback();
//   };
//   return (
//     <div className={styles["btn-up-down"]}>
//       <button className={styles["btn-up-down-btn"]} onClick={onHanleClick}>
//         {state === 0 ? <img src={arrowUpPath} /> : <img src={arrowDownPath} />}
//       </button>
//       {error && (
//         <div className={styles["btn-up-down__warning"]}>
//           <img
//             // className={styles["btn-up-down__warning-icon"]}
//             src={warnIconPath}
//             alt="warn-icon"
//           />{" "}
//         </div>
//       )}
//     </div>
//   );
// }

export function BtnUpDown({
  callback,
  error,
  disabled,
  closed,
}: BtnUpDownProps) {
  //   const [state, setState] = useState(0);

  //   if (closed) setState(0);

  const onHanleClick = () => {
    if (disabled) return;
    callback();
  };
  return (
    <div className={styles["btn-up-down"]} onClick={onHanleClick}>
      <button className={styles["btn-up-down-btn"]}>
        {closed === true ? (
          <img src={arrowUpPath} />
        ) : (
          <img src={arrowDownPath} />
        )}
      </button>
      {error && (
        <div className={styles["btn-up-down__warning"]}>
          <img
            // className={styles["btn-up-down__warning-icon"]}
            src={warnIconPath}
            alt="warn-icon"
          />{" "}
        </div>
      )}
    </div>
  );
}
