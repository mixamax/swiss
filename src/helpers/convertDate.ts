import { parse } from "date-fns";

export function dateToString(date: Date): string {
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

export function stringToDate(date: string|undefined): Date | null {
  return date ? parse(date, "dd.MM.yyyy", new Date()) : null;
}
