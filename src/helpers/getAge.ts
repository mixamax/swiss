import { differenceInYears } from "date-fns";

export function getAge(birthDate: Date) {
  const currentDate = new Date();
  const age = differenceInYears(currentDate, birthDate);
  return age;
}
