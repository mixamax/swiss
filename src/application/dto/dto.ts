export type UserDTO = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UsersDTO = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDTO[];
};

export type UpdatedUserResponseDTO = {
  updatedAt: string;
};

export type registerResponseDTO = {
  id: "string";
  token: "string";
};
