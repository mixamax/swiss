import { useNotifyStorage, useUserStorage } from "../services/storageAdapter";
import {
  DeleteUserApiService,
  NotifyStorageService,
  UpdateUserApiService,
  UserStorageService,
} from "./ports";
import { User } from "../domain/user";
import { addUser, removeUser, updateUser, findUser } from "../domain/userList";
import {
  useDeleteUserApiService,
  useUpdateUserApiService,
} from "../services/apiServices";

export function useAddUser() {
  const { userList, updateUserList, setNewUserId }: UserStorageService =
    useUserStorage();

  function addUsertoList(user: User) {
    const newUserList = addUser(userList, user);
    updateUserList(newUserList);
    setNewUserId(user.id);
  }

  return { addUsertoList };
}

export function useFindUser() {
  const { userList }: UserStorageService = useUserStorage();
  function findUserInList(id: number) {
    return findUser(userList, id);
  }
  return { findUserInList };
}

export function useUpdateUser() {
  const { userList, updateUserList }: UserStorageService = useUserStorage();
  const { setIsErrorNotify, setIsSuccessNotify }: NotifyStorageService =
    useNotifyStorage();
  const { updateUserApi, isLoading, isError }: UpdateUserApiService =
    useUpdateUserApiService();

  async function updateUserInList(user: User) {
    const response = await updateUserApi({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    });
    if (response) {
      setIsSuccessNotify(true);
      const newUserList = updateUser(userList, user);
      updateUserList(newUserList);
    } else {
      setIsErrorNotify(true);
    }
  }

  return { updateUserInList, isLoading, isError };
}

export function useDeleteUser() {
  const { userList, updateUserList }: UserStorageService = useUserStorage();
  const { setIsErrorNotify, setIsSuccessNotify }: NotifyStorageService =
    useNotifyStorage();
  const { deleteUserApi, isLoading, isError }: DeleteUserApiService =
    useDeleteUserApiService();

  async function deleteUserFromList(user: User) {
    const response = await deleteUserApi(user.id);
    if (response) {
      setIsSuccessNotify(true);
      const newUserList = removeUser(userList, user);
      updateUserList(newUserList);
    } else {
      setIsErrorNotify(true);
    }
  }

  return { deleteUserFromList, isLoading, isError };
}
