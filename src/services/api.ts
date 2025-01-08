import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../constants";
import {
  UsersDTO,
  UserDTO,
  UpdatedUserResponseDTO,
  registerResponseDTO,
} from "../application/dto/dto";
import { User } from "../domain/user";

export const api = axios.create({
  baseURL: baseUrl,
});

export const API = {
  getUsers: (
    page: number,
    per_page: number
  ): Promise<AxiosResponse<UsersDTO>> =>
    api.get("/users", { params: { page, per_page } }),
  getUser: (id: number): Promise<AxiosResponse<UserDTO>> =>
    api.get(`/users/${id}`),
  //   registerNewUser: (user: {
  //     username: string;
  //     email: string;
  //     password: string;
  //   }): Promise<AxiosResponse<registerResponseDTO>> =>
  //     api.post("/register", user),
  removeUser: (id: User["id"]) => api.delete(`/users/${id}`),
  updateUser: (user: UserDTO): Promise<AxiosResponse<UpdatedUserResponseDTO>> =>
    api.patch(`/users/${user.id}`, {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    }),

  registerNewUser: (user: {
    name: string;
    job: string;
  }): Promise<
    AxiosResponse<{ name: string; job: string; id: string; createdAt: string }>
  > => api.post("/users", user),
};
