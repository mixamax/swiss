type Props = {
  warning?: boolean;
};
export function SearchIcon({ warning }: Props) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.68361 14.6104C11.3749 14.6104 14.3672 11.618 14.3672 7.92677C14.3672 4.23552 11.3749 1.24316 7.68361 1.24316C3.99235 1.24316 1 4.23552 1 7.92677C1 11.618 3.99235 14.6104 7.68361 14.6104Z"
        stroke={warning ? "#FF4A33" : "#4DA2D6"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.14746 7.92671C4.14746 6.98896 4.51999 6.08952 5.18309 5.42643C5.84618 4.76333 6.74555 4.39087 7.68331 4.39087"
        stroke={warning ? "#FF4A33" : "#4DA2D6"}
        strokeWidth="0.6"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M12.6426 12.3992L17.0002 16.7568"
        stroke={warning ? "#FF4A33" : "#4DA2D6"}
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}