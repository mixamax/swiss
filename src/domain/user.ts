export type Role = "Доктор" | "Админ" | "Медбрат" | "Медсестра";
export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: Role;
  birthdate: string;
  gender: "мужской" | "женский";
};
