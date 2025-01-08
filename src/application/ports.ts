import { UserList } from "../domain/userList";
import { UserDTO, UpdatedUserResponseDTO } from "./dto/dto";

export interface UserStorageService {
  userList: UserList;
  updateUserList: (userList: UserList) => void;
  newUserId: number | undefined;
  setNewUserId: (id: number | undefined) => void;
}

export interface NotifyStorageService {
  isSuccessNotify: boolean;
  isErrorNotify: boolean;
  setIsSuccessNotify: (value: boolean) => void;
  setIsErrorNotify: (value: boolean) => void;
}

export interface UpdateUserApiService {
  updateUserApi: (data: UserDTO) => Promise<UpdatedUserResponseDTO | undefined>;
  isLoading: boolean;
  isError: boolean;
}

export interface DeleteUserApiService {
  deleteUserApi: (userID: number) => Promise<true | undefined>;
  isLoading: boolean;
  isError: boolean;
}
