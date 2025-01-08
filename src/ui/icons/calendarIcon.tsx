type Props = {
  warning?: boolean;
};

export function CalendarIcon({ warning }: Props) {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.08008 6.91992H15.32"
        stroke={warning ? "#FF4A33" : "#4DA2D6"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4795 1V3.63998"
        stroke={warning ? "#FF4A33" : "#4DA2D6"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 1V3.63998"
        stroke={warning ? "#FF4A33" : "#4DA2D6"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6399 2.28003H4.83997C2.51999 2.28003 1 3.56002 1 5.96V13.2399C1 15.7199 2.43999 16.9999 4.83997 16.9999H11.6399C13.9599 16.9999 15.4799 15.7199 15.4799 13.2399V5.96C15.4799 3.56002 13.9599 2.28003 11.6399 2.28003Z"
        stroke={warning ? "#FF4A33" : "#4DA2D6"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}