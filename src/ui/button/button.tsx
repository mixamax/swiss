import styles from "./button.module.css";
import plusIconPath from "../../assets/images/green-plus.svg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "s" | "m" | "l";
  variant?: "primary" | "secondary" | "accent" | "critic" | "critic-wl";
  iconPath?: string;
}

export function Button({
  size = "l",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${
        props.className || ""
      }`}
    >
      {variant === "accent" && <img src={plusIconPath} />}
      {props.children}
    </button>
  );
}
